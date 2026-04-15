import { Navigate, createBrowserRouter, useParams } from 'react-router-dom';
import { RouteErrorBoundary } from '@/components/feedback/route-error-boundary';
import { ROUTE_PATHS } from '@/constants/routes';
import { MobileAppLayout } from '@/layouts/mobile-app-layout';
import { WorkspaceLayout } from '@/layouts/workspace-layout';
import { ComponentsShowcase } from '@/pages/components';
import { Ditan } from '@/pages/ditan';
import { Following } from '@/pages/following';
import { Home } from '@/pages/home';
import { Me } from '@/pages/me';
import { NoteDetail } from '@/pages/notes/note-detail';
import { NotFoundPage } from '@/pages/not-found';
import { Publish } from '@/pages/publish';
import { Search } from '@/pages/search';
import { StoreDetail } from '@/pages/shops/store-detail';

function LegacyNoteRedirect() {
  const { id = '' } = useParams();
  return <Navigate replace to={ROUTE_PATHS.noteDetail(id)} />;
}

function LegacyStoreRedirect() {
  const { id = '' } = useParams();
  return <Navigate replace to={ROUTE_PATHS.shopDetail(id)} />;
}

export const router = createBrowserRouter([
  {
    path: ROUTE_PATHS.home,
    element: <WorkspaceLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        path: ROUTE_PATHS.components.slice(1),
        element: <ComponentsShowcase />,
      },
      {
        element: <MobileAppLayout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: ROUTE_PATHS.following.slice(1),
            element: <Following />,
          },
          {
            path: ROUTE_PATHS.ditan.slice(1),
            element: <Ditan />,
          },
          {
            path: ROUTE_PATHS.publish.slice(1),
            element: <Publish />,
          },
          {
            path: ROUTE_PATHS.my.slice(1),
            element: <Me />,
          },
          {
            path: ROUTE_PATHS.search.slice(1),
            element: <Search />,
          },
          {
            path: ROUTE_PATHS.noteDetail().slice(1),
            element: <NoteDetail />,
          },
          {
            path: ROUTE_PATHS.shopDetail().slice(1),
            element: <StoreDetail />,
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
            element: <Navigate replace to={ROUTE_PATHS.my} />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
