/**
 * 应用根组件。
 * 负责在一个位置挂载全局 Provider 和路由系统，避免入口文件承担过多初始化细节。
 */
import { RouterProvider } from 'react-router-dom';
import { router } from '@/app/router';
import { AppProviders } from '@/app/providers';

export default function App() {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
}
