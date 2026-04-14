# 前端迁移阶段的原型与工程底座对照阅读提示词

- 记录日期：2026-04-14
- 归档范围：frontend
- 主题标签：migration, prototype, frontend-foundation, architecture, routing, feature-boundary
- 来源说明：用户要求先读取原型仓库与当前前端工程底座，建立迁移认知

## 原始提示词

你现在是我的前端迁移工程师。请先大致了解，读取当前仓库中的两部分代码，路径在/Users/zhaowenzhuo/Workspace/：
1. prototype/：这是我从 Make 原型导出的前端代码，重点是页面结构、视觉层级、交互意图、模块拆分方式。
2. ditan-app/：这是我的“迪探”前端工程底座，技术栈是 React + TypeScript + Vite + React Router + Zustand + TanStack Query + Tailwind CSS，可参考Agents.md。

## 补充上下文

- 实际工作区中未发现 `/Users/zhaowenzhuo/Workspace/prototype`
- 已按现有目录 `/Users/zhaowenzhuo/Workspace/ditan-prototype` 进行读取和对照分析
