/**
 * 路由配置中心。
 * 初始化阶段仅维护页面骨架路由，后续新增页面时统一在此扩展。
 */
import { createBrowserRouter } from 'react-router-dom';
import { RouteErrorBoundary } from '@/components/feedback/route-error-boundary';
import { ROUTE_PATHS } from '@/constants/routes';
import { AppShellLayout } from '@/layouts/app-shell-layout';
import { AuthLayout } from '@/layouts/auth-layout';
import { LoginPage } from '@/pages/auth/login';
import { DitanPage } from '@/pages/ditan';
import { FollowingPage } from '@/pages/following';
import { HomePage } from '@/pages/home';
import { MyPage } from '@/pages/me';
import { NoteDetailPage } from '@/pages/notes/detail';
import { NotFoundPage } from '@/pages/not-found';
import { PublishPage } from '@/pages/publish';
import { SearchPage } from '@/pages/search';
import { ShopDetailPage } from '@/pages/shops/detail';
import { UserProfilePage } from '@/pages/users/profile';

export const router = createBrowserRouter([
  {
    path: ROUTE_PATHS.home,
    element: <AppShellLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'ditan',
        element: <DitanPage />,
      },
      {
        path: 'publish',
        element: <PublishPage />,
      },
      {
        path: 'following',
        element: <FollowingPage />,
      },
      {
        path: 'search',
        element: <SearchPage />,
      },
      {
        path: 'shops/:shopId',
        element: <ShopDetailPage />,
      },
      {
        path: 'notes/:noteId',
        element: <NoteDetailPage />,
      },
      {
        path: 'users/:userId',
        element: <UserProfilePage />,
      },
      {
        path: 'me',
        element: <MyPage />,
      },
    ],
  },
  {
    path: ROUTE_PATHS.login,
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
