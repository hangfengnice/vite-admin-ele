# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个**全栈企业级后台管理系统**（Monorepo 架构），基于 **Vue3 + Vite + Element Plus**（前端）和 **Node.js + Express + MySQL**（后端）。

项目布局架构参考 [vue-vben-admin](https://github.com/vbenjs/vue-vben-admin) 设计。

---

## 开发命令

### 根项目（Monorepo）
```bash
# 并行启动前后端开发服务器
pnpm run dev

# 仅启动后端
pnpm run backend

# 仅启动前端
pnpm run frontend
```

### 前端开发
```bash
cd frontend

# 开发服务器（端口 5777）
pnpm run dev

# 生产构建
pnpm run build

# 预览构建结果
pnpm run preview
```

### 后端开发
```bash
cd backend

# 开发服务器（端口 3000，使用 nodemon 热重载）
pnpm run dev
```

### 数据库初始化
```bash
# 本地初始化
mysql -u root -p < ./backend/sql/test_db_2026-01-25.sql

# 服务器初始化
cd /var/www/node-api/sql
mysql -u root -p < test_db_2026-01-25.sql
```

### 部署
```bash
# 一键部署到 Linux 服务器（需先配置 SSH 免密登录）
./deploy.sh
```

---

## 架构概述

### 前端架构 (`frontend/`)

**核心设计模式**：
- **模块化路由系统**：核心路由（`router/routes/core.ts`）+ 动态路由模块（`router/routes/modules/`）
- **路由守卫**：`router/guard.ts` 处理认证和权限验证
- **状态管理**：Pinia 模块化 Store（`stores/modules/`），支持持久化
- **API 层分离**：按功能模块组织 API（`api/core/`, `api/system/`）

**关键目录**：
- `packages/` - 核心包和工具
  - `core/preferences/` - 偏好设置系统
  - `effects/` - 副作用和指令（权限指令、UI效果）
  - `adapter/` - 组件适配器
  - `plugins/` - 插件（应用加载注入、动画）
- `layouts/` - 页面布局（基础布局、认证布局）
- `locales/` - 国际化配置
- `utils/` - 工具函数（缓存、颜色、辅助函数）

**重要配置**：
- `vite.config.ts` - Vite 构建配置，包含 API 代理到 `http://localhost:3000/`
- `tailwind.config.ts` - Tailwind CSS 配置
- `bootstrap.ts` - 应用启动入口（在 `main.ts` 之前执行）

### 后端架构 (`backend/`)

**MVC 模式**：
- `routes/` - 路由层（定义 API 端点）
- `controllers/` - 控制器层（业务逻辑）
- `middlewares/` - 中间件（认证、CORS、日志、错误处理）
- `utils/` - 工具类（数据库连接池、响应封装）

**认证流程**：
- JWT Token 认证（`middlewares/auth.js`）
- Token 刷新机制（前端 `api/core/`）
- 路由守卫验证（前端 `router/guard.ts`）

---

## 技术栈

### 前端
- **框架**: Vue 3.5 + TypeScript 5.9
- **构建**: Vite 7.2
- **UI**: Element Plus 2.13 + Tailwind CSS 3.4
- **状态**: Pinia 3.0（持久化）
- **路由**: Vue Router 4.6
- **HTTP**: Axios 1.13
- **工具**: VueUse 14.1

### 后端
- **运行时**: Node.js ≥ 24
- **框架**: Express 4.18
- **数据库**: MySQL 8.4 + mysql2 3.3
- **认证**: jsonwebtoken 9.0
- **日志**: Morgan 1.10

---

## 环境配置

### 前端环境变量 (`frontend/.env`)
```
VITE_APP_TITLE=vue3 vite Ele
VITE_APP_NAMESPACE=vite-admin-ele
VITE_APP_STORE_SECURE_KEY=js
```

### 后端配置 (`backend/utils/db.js`)
- 默认端口: 3000
- 数据库: test_db
- JWT 密钥: jwt_secret_key

---

## 重构指南

根据 `colipot.md`，重构时应：
- 在不改变行为的前提下提升可读性
- 消除隐式副作用
- 明确数据流向
- 对关键设计点补充注释

---

## 相关资源

- 在线演示: http://47.118.22.231/auth/login
- 配套教程: https://juejin.cn/post/7598447519823183913
- 参考项目: https://github.com/vbenjs/vue-vben-admin
