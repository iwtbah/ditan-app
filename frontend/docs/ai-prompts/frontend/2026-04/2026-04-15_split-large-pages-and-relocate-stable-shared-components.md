# 拆分超大页面并归位稳定共享组件

- 日期：2026-04-15
- 来源范围：用户本轮工程化结构优化要求
- 主题标签：frontend, architecture, features, shared-components, refactor

## 原始提示词

继续优化项目工程结构，页面UI、布局、交互、文案、视觉层次、动效表现不能发生变化
1.逐页拆分超大页面，比如 StoreDetail、NoteDetail、Publish等
2.把 prototype 目录里真正稳定的共享组件逐步归位到 features 或 components
