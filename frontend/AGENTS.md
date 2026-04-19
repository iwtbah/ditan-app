# ditan-app frontend 协作规范

## 1. 技术栈

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

## 2. 目录结构速览

### `src/app`

应用装配层：

- `router.tsx`：路由唯一入口
- `providers.tsx`：全局 Provider 聚合
- `query-client.ts`：TanStack Query 默认配置

### `src/layouts`

布局壳：

- `workspace-layout.tsx`：桌面预览容器
- `mobile-app-layout.tsx`：移动端应用壳、Tab Bar、页面切换

### `src/pages`

页面承接层，只负责：

- 路由挂载
- `pageMeta`
- 组合 feature

不要在 `pages` 里直接写请求、堆业务状态或堆大段交互逻辑。

### `src/features`

业务主目录，按域拆分，例如：

- `home`
- `following`
- `ditan`
- `me`
- `search`
- `notes`
- `shops`
- `auth`
- `components-showcase`

常见子目录：

- `components`：业务 UI
- `hooks`：Query hooks / mutation hooks
- `mocks`：该域 mock 数据

### `src/api`

请求层：

- `client.ts`：统一请求封装
- `modules/*.ts`：按业务域拆接口
- `fallback.ts`：fallback 能力

### `src/components`

跨业务复用组件，只放通用展示组件，不放强业务逻辑。

### `src/constants`

统一维护：

- 路由常量
- Query Keys

### `src/types`

共享领域类型集中维护，不要把通用类型散落到页面或 feature 文件里。

### `src/stores`

只放客户端本地状态，例如：

- 全局 UI 状态
- 本地偏好设置
- 轻量登录态

不要把服务端数据缓存进 store。

### 其他常用目录

- `src/contexts`：预览态等上下文
- `src/styles`：全局样式、主题、字体
- `docs/ai-prompts/frontend/`：提示词归档

## 3. 核心边界

- 页面层保持轻，业务逻辑下沉到 `features`
- 页面和组件不要直接调用底层 `fetch`
- 服务端状态走 TanStack Query
- 客户端本地状态才进入 Zustand
- `api/modules` 保持薄，不承载展示逻辑
- mock 数据优先放对应 feature 的 `mocks`
- 修改前先沿用现有结构，不按想象重建目录

## 4. 路由约定

- 路由定义集中在 `src/app/router.tsx`
- 路径常量集中在 `src/constants/routes.ts`
- 非必要不要删除 legacy redirect

## 5. 提示词归档

有项目价值的提示词归档到：

- `docs/ai-prompts/frontend/<YYYY-MM>/`

建议文件名：

- `<YYYY-MM-DD>_<topic>.md`

建议内容：

- 标题
- 日期
- 来源范围
- 标签
- 原始提示词
- 必要上下文

## 6. 常用命令

- 安装依赖：`npm install`
- 启动开发：`npm run dev`
- mock 预览：`npm run dev:mock`
- 类型检查：`npm run typecheck`
- 构建：`npm run build`
