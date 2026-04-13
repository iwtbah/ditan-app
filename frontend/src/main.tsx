/**
 * 应用浏览器入口。
 * 只保留 React 挂载和全局样式引入，避免把业务初始化堆在这里。
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
