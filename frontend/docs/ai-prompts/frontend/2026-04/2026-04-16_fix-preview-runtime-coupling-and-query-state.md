# 修正预览工作台耦合、真实请求状态与 fallback 默认策略

- 日期：2026-04-16
- 来源范围：Codex 对话
- 主题标签：`frontend` `review-fix` `preview` `query-state` `api-fallback`

## 原始提示词

```text
运行时仍强耦合预览工作台，页面状态仍由预览态驱动而不是真实请求状态，环境模板默认开启接口 fallback 会掩盖联调问题，这三个问题需要改善下
```

## 补充说明

本次任务聚焦三个评审问题：

- 将预览工作台从正式运行路由中拆出
- 让页面状态回到 TanStack Query 的真实请求结果
- 将环境模板默认的接口 fallback 调整为联调优先
