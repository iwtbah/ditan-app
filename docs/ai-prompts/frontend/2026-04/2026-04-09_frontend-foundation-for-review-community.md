# 前端工程底座需求提示词

- 记录日期：2026-04-09
- 归档范围：frontend
- 主题标签：frontend-foundation, architecture, react, vite, zustand, tanstack-query, tailwind
- 来源说明：用户用于定义“类似大众点评的点评/内容社区项目”前端工程底座的一次完整需求提示词

## 原始提示词

你是资深前端架构师兼工程负责人，请为一个“类似大众点评的点评/内容社区项目”在ditan-app/frontend中搭建前端工程底座。

项目背景：
- 这是一个点评类 Web/App 前端项目
- 用户可以浏览店铺、查看店铺详情、查看探店笔记、点赞、评论、进入用户主页、搜索内容
- 后端核心接口已经存在，前端当前先不追求精细 UI，而是先把项目结构底座搭好
- 页面原型图我后续会补充

技术栈固定为：
- React
- TypeScript
- Vite
- React Router
- Zustand
- TanStack Query
- Tailwind CSS

你的任务目标：
1. 先设计合理的前端目录结构
2. 明确每个目录的职责
3. 设计路由分层方案
4. 设计 API 层组织方式
5. 设计 Zustand 与 TanStack Query 的职责边界
6. 设计 types、constants、utils、hooks、components、features、pages 的边界
7. 输出初始化阶段建议创建的文件
8. 生成一份适合该项目的 AGENTS.md

硬性要求：
- 这是“工程底座阶段”，不要先做精美 UI
- 页面先做骨架和占位结构即可
- pages 只承担路由页面职责，复杂业务逻辑尽量下沉
- Zustand 只管理客户端本地状态，例如登录态概要、全局 UI 状态、筛选条件等
- TanStack Query 只管理接口数据获取、缓存、失效刷新与异步状态
- API 按业务模块拆分，不要所有请求堆在一个文件
- TypeScript 类型要可扩展，避免散落在页面组件中
- Tailwind CSS 用于样式表达，但请同时考虑后续组件复用
- 结构要适合中型项目持续迭代

请按以下顺序输出：
A. 项目目录树
B. 每个目录职责说明
C. 推荐的路由结构
D. 推荐的状态管理分层
E. 推荐的 API 与类型组织方式
F. 初始化阶段最值得先创建的文件清单
G. AGENTS.md 完整内容

注意：
- 不要直接开始写所有页面代码
- 不要擅自替换技术栈
- 优先保证可维护性、清晰边界、便于后续与 AI 协作开发
