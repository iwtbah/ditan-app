# ditan-app frontend 协作规范

## 1. 项目现状

这是迪探项目的前端工程，当前不是纯初始化模板，而是“原型迁移到稳定结构”的中间态。

目标：

- 优先保证目录边界清晰，便于持续迭代和 AI 接力
- 页面层保持轻量，业务逻辑继续下沉到 feature
- 服务端状态与客户端状态严格分层
- 默认使用中文进行说明、注释、文档协作

当前技术栈以实际代码为准：

- React 18
- TypeScript 5
- Vite 6
- React Router 6
- TanStack Query 5
- Zustand 5
- Tailwind CSS 4

当前还在使用的配套库：

- `motion`
- `sonner`
- `lucide-react`
- `clsx`
- `tailwind-merge`

## 2. 当前目录结构

### `src/app`

应用入口与全局装配层：

- `router.tsx`：路由定义唯一入口
- `providers.tsx`：全局 Provider 聚合
- `query-client.ts`：TanStack Query 默认配置

### `src/layouts`

当前有两层布局：

- `workspace-layout.tsx`：桌面预览工作台壳
- `mobile-app-layout.tsx`：移动端应用壳、页面切换动画、Tab Bar、Toaster

### `src/pages`

页面层只做路由承接、页面元信息和 feature 组合。

当前已有页面：

- `home`
- `following`
- `ditan`
- `publish`
- `me`
- `search`
- `notes/note-detail`
- `shops/store-detail`
- `components`
- `not-found`

原则：

- 页面层不直接写 `fetch`
- 页面层不保存服务端数据
- 页面文件变重时，优先把状态、编排、数据读取下沉到对应 feature

### `src/features`

业务主场，当前已形成这些业务域：

- `home`
- `following`
- `ditan`
- `me`
- `search`
- `notes`
- `shops`
- `components-showcase`

当前常见子结构：

- `components`：业务专属 UI
- `hooks`：Query hooks / mutation hooks
- `mocks`：原型期或兜底数据

约定：

- 场景型 feature 可继续按 `features/<domain>/<scene>` 下钻
- hooks 内负责组合 `api/modules` 与 TanStack Query
- 页面和组件不要直接依赖底层请求实现

### `src/api`

API 按业务模块拆分：

- `client.ts`：统一请求封装、错误处理、query/body 序列化
- `modules/*.ts`：按业务域组织接口
- `fallback.ts`：当前迁移期兜底能力

规则：

- 页面层不得直接调用 `fetch`
- API 函数保持薄，不承担展示逻辑

### `src/types`

共享领域类型集中维护，当前已有：

- `api.ts`
- `common.ts`
- `page.ts`
- `note.ts`
- `shop.ts`
- `user.ts`

不要把共享类型散落到页面文件中。

### `src/components`

仅放跨业务复用组件，保持展示层属性，避免塞入强业务耦合逻辑。

### `src/contexts`

当前用于预览工作台上下文，例如 `preview-state-context.tsx`。

### `src/constants`

统一维护路由常量与 Query Keys。

### `src/styles`

集中维护全局样式、主题和字体文件。当前 Tailwind 使用 `@tailwindcss/vite`，没有单独的 `tailwind.config.*`。

### `src/stores`

当前目录保留边界说明，尚未形成稳定的全局 Zustand store。

只有这类状态允许进入 store：

- 全局 UI 状态
- 本地偏好设置
- 仅前端存在的筛选条件
- 轻量登录态概要

以下内容禁止进入 store：

- 店铺详情
- 笔记详情
- 搜索结果
- 用户主页远程数据
- 任何应由 TanStack Query 托管的服务端数据

## 3. 路由现状

路由定义集中在 `src/app/router.tsx`，路径常量集中在 `src/constants/routes.ts`。

当前主路由包含：

- `/`
- `/following`
- `/ditan`
- `/publish`
- `/me`
- `/search`
- `/notes/:noteId`
- `/shops/:shopId`
- `/components`

当前还保留了若干 legacy redirect：

- `/profile`
- `/note/:id`
- `/store/:id`
- `/users/:userId`
- `/auth/login`

修改路由时优先保持：

- `router.tsx` 为唯一装配入口
- `routes.ts` 为路径常量唯一来源
- 非必要不要随意删除兼容重定向

## 4. 状态管理边界

### TanStack Query

负责服务端状态：

- 首页流
- 关注流
- 搜索结果
- 笔记详情
- 店铺详情
- 我的页面资料

### Zustand

只负责客户端本地状态，不做接口缓存层。

规则：

- 不要把 Query 数据复制进 Zustand
- mutation 后优先通过 Query 失效或更新缓存

## 5. Mocks 与真实接口

当前项目处于 mock 与 query hooks 并存阶段。

要求：

- mocks 只放在对应 feature 域内
- 新增 mock 时优先走 `features/<domain>/mocks`
- 接入真实接口后，优先让页面走 hooks，不要继续让页面直连 mock 文件
- 某业务域完全切到真实数据后，应清理无用 mock

## 6. 协作要求

- 修改前先检查现有结构，不要按想象重建目录
- 不要擅自替换技术栈
- 不要把业务逻辑上提回 `pages`
- 不要把远程数据放进 Zustand
- 保持文件职责单一，命名可预测
- 小步改动，优先延续当前结构，而不是推倒重来

## 7. 提示词归档

具有项目价值的用户提示词必须归档到：

- `docs/ai-prompts/frontend/<YYYY-MM>/`

建议文件名：

- `<YYYY-MM-DD>_<topic>.md`

文档尽量包含：

- 标题
- 日期
- 来源范围
- 标签
- 原始提示词
- 必要的上下文说明

若同主题已归档，优先更新，不重复制造近似副本。

## 8. 常用命令

- 安装依赖：`npm install`
- 启动开发环境：`npm run dev`
- 类型检查：`npm run typecheck`
- 构建：`npm run build`

## 9. 交付标准

每次改动尽量满足：

- 目录结构可预测
- 页面职责轻
- feature 边界清晰
- API 按业务拆分
- 类型集中维护
- Query 与 Zustand 分工明确
- 后续继续补 UI 时不需要推翻当前底座
