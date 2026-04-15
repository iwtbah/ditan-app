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
  const { noteId = '' } = useParams();
  return <Navigate replace to={ROUTE_PATHS.noteDetail(noteId)} />;
}

function LegacyStoreRedirect() {
  const { shopId = '' } = useParams();
  return <Navigate replace to={ROUTE_PATHS.storeDetail(shopId)} />;
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
            path: ROUTE_PATHS.profile.slice(1),
            element: <Profile />,
          },
          {
            path: ROUTE_PATHS.search.slice(1),
            element: <Search />,
          },
          {
            path: 'note/:id',
            element: <NoteDetail />,
          },
          {
            path: 'store/:id',
            element: <StoreDetail />,
          },
          {
            path: 'me',
            element: <Navigate replace to={ROUTE_PATHS.profile} />,
          },
          {
            path: 'users/:userId',
            element: <Navigate replace to={ROUTE_PATHS.profile} />,
          },
          {
            path: 'notes/:noteId',
            element: <LegacyNoteRedirect />,
          },
          {
            path: 'shops/:shopId',
            element: <LegacyStoreRedirect />,
          },
          {
            path: 'auth/login',
            element: <Navigate replace to={ROUTE_PATHS.profile} />,
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
