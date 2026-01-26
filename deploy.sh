#!/bin/bash

# ==== 配置部分 ====
SERVER_IP="47.118.22.231"              # ECS 公网 IP
SERVER_USER="root"                     # 数据库用户名
FRONTEND_DIR="frontend"                # 本地前端目录

ROOT_DIR="$(pwd)"
BACKEND_DIR="$ROOT_DIR/backend"                  # 本地后端目录
LOCAL_BUILD_DIR="$ROOT_DIR/$FRONTEND_DIR/dist"   # 打包输出目录（Vue）或 build（React）
REMOTE_FRONTEND_DIR="/var/www/html"    # 服务器前端目录
REMOTE_BACKEND_DIR="/var/www/node-api" # 服务器后端目录
BACKEND_PORT=3000                       # Node.js 后端端口
PM2_APP_BASE="my-api"                  # PM2 应用基础名称
REMOTE_LOG_FILE="/var/log/deploy.log"  # 部署日志文件

# ==== 1. 打包前端 ====
echo "🚀 打包前端..."
pnpm --filter frontend run build
if [ $? -ne 0 ]; then
  echo "❌ 前端打包失败，退出"
  exit 1
fi
# ===== 1.1 确保远程目录存在 =====
echo "📂 创建远程目录..."
ssh $SERVER_USER@$SERVER_IP "mkdir -p $REMOTE_FRONTEND_DIR $REMOTE_BACKEND_DIR $(dirname $REMOTE_LOG_FILE)"

# ==== 2. 上传前端到服务器（增量上传） ====
echo "📤 上传前端到服务器..."
rsync -avz --delete $LOCAL_BUILD_DIR/ $SERVER_USER@$SERVER_IP:$REMOTE_FRONTEND_DIR/
if [ $? -ne 0 ]; then
  echo "❌ 上传前端失败，退出"
  exit 1
fi

# ==== 3. 上传后端到服务器（增量上传） ====
echo "📤 上传后端到服务器..."
# rsync -avz --delete $BACKEND_DIR/ $SERVER_USER@$SERVER_IP:$REMOTE_BACKEND_DIR/
rsync -az --delete \
  --exclude node_modules \
  --exclude package-lock.json \
  --exclude pnpm-lock.yaml \
  $BACKEND_DIR/ \
  $SERVER_USER@$SERVER_IP:$REMOTE_BACKEND_DIR/
if [ $? -ne 0 ]; then
  echo "❌ 上传后端失败，退出"
  exit 1
fi

# ==== 4. 配置服务器（Node.js + PM2 + Nginx + 日志） ====
echo "🛠 配置服务器并启动后端..."
ssh $SERVER_USER@$SERVER_IP bash -s << 'EOF'
# ==== 配置参数 ====
REMOTE_BACKEND_DIR="/var/www/node-api"
BACKEND_PORT=3000
PM2_APP_BASE="my-api"
REMOTE_LOG_FILE="/var/log/deploy.log"

# ==== 安装 Node.js 24 LTS（如果未安装） ====
if ! command -v node > /dev/null; then
  curl -fsSL https://deb.nodesource.com/setup_24.x | bash -
  apt install -y nodejs
fi

# ==== 安装 PM2（如果未安装） ====
if ! command -v pm2 > /dev/null; then
  npm install -g pm2
fi

# ==== 创建后端目录（防止不存在） ====
mkdir -p $REMOTE_BACKEND_DIR
cd $REMOTE_BACKEND_DIR

# ==== 生成版本号 ====
VERSION=$(date +%Y%m%d%H%M%S)
PM2_APP_NAME="${PM2_APP_BASE}-v${VERSION}"

# ==== 增量安装依赖（只安装新增/缺失依赖） ====

npm install --omit=dev

pm2 delete all

# ==== 启动新后端应用 ====
pm2 start index.js --name $PM2_APP_NAME
pm2 save
pm2 startup

# ==== 配置 Nginx ====
cat > /etc/nginx/sites-available/default << 'EOC'
server {
    listen 80;
    server_name _;

    # 前端静态资源
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri /index.html;
    }

    # Node.js API 反向代理
    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOC

systemctl restart nginx

# ==== 确保日志文件存在并记录部署日志 ====
mkdir -p $(dirname $REMOTE_LOG_FILE)
touch $REMOTE_LOG_FILE
echo "$(date '+%Y-%m-%d %H:%M:%S') | $PM2_APP_NAME | SUCCESS" >> $REMOTE_LOG_FILE

EOF

echo "🎉 部署完成！"
echo "前端访问: http://$SERVER_IP"
echo "API 测试: http://$SERVER_IP/api/hello"
echo "PM2 应用名: ${PM2_APP_BASE}-v$(date +%Y%m%d%H%M%S)"
echo "部署日志: $REMOTE_LOG_FILE"
