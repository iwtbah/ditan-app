import { Navigate, createBrowserRouter, useParams } from 'react-router-dom';
import { RouteErrorBoundary } from '@/components/feedback/route-error-boundary';
import { ROUTE_PATHS } from '@/constants/routes';
import { NotFoundPage } from '@/pages/not-found';
import { Layout as PrototypeMobileLayout } from '@/prototype/components/Layout';
import { PrototypeWorkspaceLayout } from '@/prototype/layouts/workspace-layout';
import { ComponentsShowcase } from '@/prototype/pages/ComponentsShowcase';
import { Ditan } from '@/prototype/pages/Ditan';
import { Following } from '@/prototype/pages/Following';
import { Home } from '@/prototype/pages/Home';
import { NoteDetail } from '@/prototype/pages/NoteDetail';
import { Profile } from '@/prototype/pages/Profile';
import { Publish } from '@/prototype/pages/Publish';
import { Search } from '@/prototype/pages/Search';
import { StoreDetail } from '@/prototype/pages/StoreDetail';

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
    element: <PrototypeWorkspaceLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        path: ROUTE_PATHS.components.slice(1),
        element: <ComponentsShowcase />,
      },
      {
        element: <PrototypeMobileLayout />,
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
            element: <Profile />,
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
