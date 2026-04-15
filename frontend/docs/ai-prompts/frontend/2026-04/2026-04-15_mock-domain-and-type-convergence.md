# 前端 mock 归域与类型收敛

- 日期：2026-04-15
- 来源范围：用户任务提示词
- 主题标签：`frontend` `mocks` `features` `types` `routing` `engineering`

## 原始提示词

接受你的下一步建议，继续做的是把 `src/mocks/prototype/*` 按业务域迁到对应 feature 下，减少 prototype 对新结构的反向依赖。
然后补 `src/types`，把 `home/following/me/notes/shops` 的数据结构收敛掉，逐步去掉 `any`。
如果继续，我建议下一轮直接做“mock 按域归位 + feature 内部 index/export 整理 + route 懒加载准备”。

## 补充上下文

- 本轮要求继续维持页面 UI、布局、交互、文案、视觉层次、动效表现不变。
- 改造目标仍然是工程结构清晰、边界明确、便于后续迁真实接口。
