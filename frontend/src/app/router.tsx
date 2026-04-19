import type { ComponentType } from 'react';
import { Navigate, createBrowserRouter, useParams } from 'react-router-dom';
import { RouteErrorBoundary } from '@/components/feedback/route-error-boundary';
import { ROUTE_PATHS } from '@/constants/routes';
import { RequireAuth } from '@/features/auth/require-auth';
import { MobileAppLayout } from '@/layouts/mobile-app-layout';
import { PreviewWorkspaceLayout } from '@/layouts/preview-workspace-layout';
import { WorkspaceLayout } from '@/layouts/workspace-layout';
import type { PageRouteMeta } from '@/types/page';

function LegacyNoteRedirect() {
  const { id = '' } = useParams();
  return <Navigate replace to={ROUTE_PATHS.noteDetail(id)} />;
}

function LegacyStoreRedirect() {
  const { id = '' } = useParams();
  return <Navigate replace to={ROUTE_PATHS.shopDetail(id)} />;
}

type LazyPageModule = {
  default?: ComponentType;
  [key: string]: unknown;
  pageMeta: PageRouteMeta;
};

function lazyPage(
  importPage: () => Promise<LazyPageModule>,
  componentExport: string = 'default',
) {
  return async () => {
    const module = await importPage();
    const component = module[componentExport];

    if (typeof component !== 'function') {
      throw new Error(`Route component export "${componentExport}" is missing.`);
    }

    return {
      Component: component as ComponentType,
      handle: { pageMeta: module.pageMeta },
    };
  };
}

function createProtectedMobileRoute(
  path: string,
  importPage: () => Promise<LazyPageModule>,
  componentExport: string = 'default',
) {
  return {
    element: <RequireAuth />,
    children: [
      {
        path,
        lazy: lazyPage(importPage, componentExport),
      },
    ],
  };
}

function createMobileAppRoutes() {
  return [
    {
      index: true,
      lazy: lazyPage(() => import('@/pages/home')),
    },
    createProtectedMobileRoute(
      ROUTE_PATHS.following.slice(1),
      () => import('@/pages/following'),
    ),
    createProtectedMobileRoute(
      ROUTE_PATHS.ditan.slice(1),
      () => import('@/pages/ditan'),
    ),
    createProtectedMobileRoute(
      ROUTE_PATHS.publish.slice(1),
      () => import('@/pages/publish'),
    ),
    createProtectedMobileRoute(
      ROUTE_PATHS.my.slice(1),
      () => import('@/pages/me'),
    ),
    createProtectedMobileRoute(
      ROUTE_PATHS.settings.slice(1),
      () => import('@/pages/settings'),
    ),
    {
      path: ROUTE_PATHS.search.slice(1),
      lazy: lazyPage(() => import('@/pages/search')),
    },
    {
      path: ROUTE_PATHS.noteDetail().slice(1),
      lazy: lazyPage(() => import('@/pages/notes/note-detail')),
    },
    {
      path: ROUTE_PATHS.shopDetail().slice(1),
      lazy: lazyPage(() => import('@/pages/shops/store-detail')),
    },
    {
      path: ROUTE_PATHS.legacyProfile.slice(1),
      element: <Navigate replace to={ROUTE_PATHS.my} />,
    },
    {
      path: ROUTE_PATHS.legacyNoteDetail().slice(1),
      element: <LegacyNoteRedirect />,
    },
    {
      path: ROUTE_PATHS.legacyShopDetail().slice(1),
      element: <LegacyStoreRedirect />,
    },
    {
      path: ROUTE_PATHS.userProfile().slice(1),
      element: <Navigate replace to={ROUTE_PATHS.my} />,
    },
    {
      path: ROUTE_PATHS.login.slice(1),
      lazy: lazyPage(() => import('@/pages/auth/login')),
    },
  ];
}

export const router = createBrowserRouter([
  {
    path: ROUTE_PATHS.home,
    element: <WorkspaceLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        path: ROUTE_PATHS.components.slice(1),
        lazy: lazyPage(() => import('@/pages/components')),
      },
      {
        element: <MobileAppLayout />,
        children: createMobileAppRoutes(),
      },
    ],
  },
  ...(import.meta.env.DEV
    ? [
        {
          path: ROUTE_PATHS.preview,
          element: <PreviewWorkspaceLayout />,
          errorElement: <RouteErrorBoundary />,
          children: [
            {
              element: <MobileAppLayout showPreviewMeta />,
              children: createMobileAppRoutes(),
            },
          ],
        },
      ]
    : []),
  {
    path: '*',
    lazy: lazyPage(() => import('@/pages/not-found'), 'NotFoundPage'),
  },
]);
