# 补齐 Query hooks 与统一 mocks 策略提示词

- 日期：2026-04-16
- 来源范围：Codex 对话归档
- 主题标签：Query hooks、features hooks、mocks 策略、结构闭环

## 原始提示词

按你分析的优化点，将下面的两点进行优化
1.补齐 features/<domain>/hooks 的 Query 封装层
2.统一 mocks 的放置策略

## 补充说明

- 本轮只补结构层骨架，不把现有页面从 mocks 切到 hooks。
- mocks 的统一策略以“feature 内聚、index 导出、后续逐域退场”为核心。
