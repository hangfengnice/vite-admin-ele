# Vite + Frontend & Backend Monorepo

### 弄这个项目缘由

本想学习下vue3 的后台管理项目, 借鉴了vbtn-admin [github地址](https://github.com/vbenjs/vue-vben-admin) [线上地址](https://www.vben.pro/#/analytics), 颜值在线, 但是封装太骚了改代码太累。就自己额外处理了下。

做到简单易懂 开箱即用

这是一个前后端分离的 monorepo 示例项目，使用 **pnpm workspace** 管理前端（Vite + Tailwind + shadcn-ui）和后端（Node/Express 或自定义后端）。

## 项目结构

```
.
├── 📁 backend/                    # 后端项目
├── 📁 frontend/                   # 前端项目
├── 📄 deploy.sh                   # 部署脚本
├── 📄 pnpm-lock.yaml              # pnpm 锁文件
└── 📄 pnpm-workspace.yaml         # pnpm 工作区配置
```

## 🚀 快速开始

### 1. 克隆仓库

```bash
git clone https://github.com/hangfengnice/vite-admin-ele.git
cd vite-admin-ele
```

### 2. 安装依赖

```bash
npm install -g pnpm
pnpm install
```

### 3. 启动项目

```bash
#同时启动前后端
pnpm run all

#启动前端
pnpm run dev
# 或者
pnpm --filter frontend dev

#启动后端
pnpm run back
# 或者
pnpm --filter backend dev
```

### 4. 一键部署阿里云

```bash
# 使用 chmod 添加执行权限（第一次）
chmod +x deploy.sh

# 部署
./deploy.sh
```

### 5. 开发配置

[阿里云地址 获取服务器 付费](https://www.aliyun.com/benefit?spm=5176.28536895.J_4VYgf18xNlTAyFFbOuOQe.d_menu_3.53a4586c0rEqbG&tid=cloud)

阿里云需要装

```bash
# 镜像 Ubuntu Server 24.04 LTS

# 安装 Node.js 24 LTS
curl -fsSL https://deb.nodesource.com/setup_24.x | bash -
sudo apt install -y nodejs

# 安装 PM2
sudo npm install -g pm2

# 安装 Nginx
sudo apt install -y nginx

# 安装 myswl
sudo apt install -y mysql-server
```

### 6.本地配置

```bash
# 电脑 mac

# node -v
# v24.12.0

# pnpm -v
# 10.28.1

# 本地额外装了mysql
```

### 依赖快照

```bash
pnpm --filter frontend list --depth=0 > deps.txt
```
