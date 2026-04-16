# ditan-app

迪探项目仓库，当前按前后端与基础设施目录拆分，前端部分已进入“原型迁移到稳定工程结构”的收口阶段。

## 目录概览

- `frontend/`：React + TypeScript + Vite 前端工程
- `backend/`：后端工程
- `docker/`：容器与本地联调相关资源
- `nginx/`：网关与静态服务配置
- `redis/`：缓存相关配置
- `sql/`：数据库脚本
- `scripts/`：辅助脚本
- `docs/`：项目文档

## 前端说明

### 技术栈

- React 18
- TypeScript 5
- Vite 6
- React Router 6
- TanStack Query 5
- Zustand 5
- Tailwind CSS 4

常用配套库：

- `motion`
- `sonner`
- `lucide-react`
- `clsx`
- `tailwind-merge`

### 当前结构

前端目录位于 `frontend/`，核心分层如下：

- `src/app`：应用入口、路由装配、全局 Provider、QueryClient
- `src/layouts`：工作台壳与移动端应用壳
- `src/pages`：路由页面承接层，只负责页面入口与 feature 组合
- `src/features`：业务主场，按 `home / following / ditan / me / search / notes / shops` 等域组织
- `src/api`：请求封装与按业务拆分的接口模块
- `src/types`：共享领域类型
- `src/components`：跨业务复用展示组件
- `src/contexts`：当前主要承接预览工作台上下文
- `src/constants`：路由常量与 Query Keys
- `src/styles`：全局样式、主题、字体
- `src/stores`：仅保留客户端本地状态边界，不做服务端缓存

### 关键约束

- 页面层不直接写 `fetch`
- 服务端状态优先交给 TanStack Query
- Zustand 只管理本地 UI/偏好/轻量会话状态
- 共享类型集中在 `src/types`
- mocks 只放在对应 `features/<domain>/mocks`
- 新需求优先延续现有分层，不把业务逻辑堆回 `pages`

### 当前路由

- `/`
- `/following`
- `/ditan`
- `/publish`
- `/me`
- `/search`
- `/notes/:noteId`
- `/shops/:shopId`
- `/components`

兼容重定向仍保留在前端路由层，调整时不要随意删除。

### 前端常用命令

在 `frontend/` 目录执行：

- `npm install`
- `npm run dev`
- `npm run dev:mock`
- `npm run dev:api`
- `npm run typecheck`
- `npm run build`

### Mock / 联调切换

- `npm run dev`：默认本地开发，读取 `.env.local`，当前默认走 mock fallback
- `npm run dev:mock`：强制进入 mock 模式，读取 `frontend/.env.mock`
- `npm run dev:api`：强制进入联调模式，读取 `frontend/.env.api`

当前默认配置：

- `.env.mock`：`VITE_ENABLE_API_FALLBACK=true`
- `.env.api`：`VITE_ENABLE_API_FALLBACK=false`

如需本地私有覆盖，可新增：

- `frontend/.env.mock.local`
- `frontend/.env.api.local`
