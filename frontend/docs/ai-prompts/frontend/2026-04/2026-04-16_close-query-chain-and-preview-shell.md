# 收口 Query 链路与预览壳层职责

- 日期：2026-04-16
- 来源范围：frontend 工程结构优化协作
- 主题标签：`react-query` `hooks` `mocks` `preview-shell` `low-risk-refactor`

## 原始提示词

api/modules + feature hooks 已经建好，但大多数 feature 还没有接入这条链路，仍直接吃 mocks。典型例子见 src/features/search/index.tsx、src/features/following/index.tsx、src/features/notes/note-detail/index.tsx、src/features/shops/store-detail/index.tsx
hooks 骨架存在，但运行时基本没有消费，说明“正式目录存在，但职责未闭环”。例如 src/features/home/hooks/use-home-notes-query.ts、src/features/search/hooks/use-search-notes-query.ts
WorkspaceLayout + ViewStateContext 仍然承担原型态状态模拟器职责，这是目前最明显的原型残留：src/layouts/workspace-layout.tsx、src/contexts/view-state-context.tsx ，将这三点优化，直至完成

## 补充上下文

本轮实现要求：

- 继续保持页面 UI、布局、交互、文案、视觉层次、动效完全不变
- 优先把 hooks 运行链路接到 feature 顶层
- hooks 允许在接口未就绪时做 mock fallback，避免页面表现回退
- 将 view-state 明确收口为 preview-state 语义，但不改变当前工作台可见界面
