# API 层说明

当前目录用于承接“正式数据层”。

约定：

- `client.ts` 只处理通用请求能力：序列化、query params、错误包装
- `modules/*.ts` 按业务域拆分，不混写页面逻辑
- 页面和展示组件不得直接写 `fetch`
- feature 后续应通过 `hooks` 组合 Query，再调用这里的模块函数

当前状态：

- 本轮只补齐工程骨架，不替换现有页面的 mocks 数据来源
- 等真实接口稳定后，再逐页从 mocks 迁到 `api/modules + feature hooks`
