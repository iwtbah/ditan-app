# Features 分层说明

`src/features` 负责业务功能编排。

## Hooks 约定

- 所有服务端状态优先通过 `features/<domain>/hooks` 或 `features/<domain>/<scene>/hooks` 暴露
- hooks 内部负责组合 `api/modules` 与 `@tanstack/react-query`
- 页面和组件不得直接写 `fetch`，也不应直接依赖 `api/modules`

## Mocks 约定

- mocks 只允许放在 `features/<domain>/mocks`
- 场景型 feature 可共享同一业务域的 `mocks/index.ts`
- feature 内部统一从 `./mocks` 或 `../mocks` 的 `index.ts` 导入，不直接引用具体 mock 文件路径
- 不再新增 `src/mocks` 这种跨域堆放目录

## Mocks 退场规则

- 当某个业务域接入真实接口后，页面优先切到对应 `hooks`
- mocks 只保留为 demo、原型或测试数据，不再作为页面主数据源
- 若某域已完全切换到真实数据，需同步清理该域不再使用的 mocks
