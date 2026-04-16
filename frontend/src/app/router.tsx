import { Navigate, createBrowserRouter, useParams } from 'react-router-dom';
import { RouteErrorBoundary } from '@/components/feedback/route-error-boundary';
import { ROUTE_PATHS } from '@/constants/routes';
import { MobileAppLayout } from '@/layouts/mobile-app-layout';
import { WorkspaceLayout } from '@/layouts/workspace-layout';
import { ComponentsShowcase, pageMeta as componentsPageMeta } from '@/pages/components';
import { Ditan, pageMeta as ditanPageMeta } from '@/pages/ditan';
import { Following, pageMeta as followingPageMeta } from '@/pages/following';
import { Home, pageMeta as homePageMeta } from '@/pages/home';
import { Me, pageMeta as mePageMeta } from '@/pages/me';
import { NoteDetail, pageMeta as noteDetailPageMeta } from '@/pages/notes/note-detail';
import { NotFoundPage, pageMeta as notFoundPageMeta } from '@/pages/not-found';
import { Publish, pageMeta as publishPageMeta } from '@/pages/publish';
import { Search, pageMeta as searchPageMeta } from '@/pages/search';
import { StoreDetail, pageMeta as storeDetailPageMeta } from '@/pages/shops/store-detail';

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
        handle: { pageMeta: componentsPageMeta },
        element: <ComponentsShowcase />,
      },
      {
        element: <MobileAppLayout />,
        children: [
          {
            index: true,
            handle: { pageMeta: homePageMeta },
            element: <Home />,
          },
          {
            path: ROUTE_PATHS.following.slice(1),
            handle: { pageMeta: followingPageMeta },
            element: <Following />,
          },
          {
            path: ROUTE_PATHS.ditan.slice(1),
            handle: { pageMeta: ditanPageMeta },
            element: <Ditan />,
          },
          {
            path: ROUTE_PATHS.publish.slice(1),
            handle: { pageMeta: publishPageMeta },
            element: <Publish />,
          },
          {
            path: ROUTE_PATHS.my.slice(1),
            handle: { pageMeta: mePageMeta },
            element: <Me />,
          },
          {
            path: ROUTE_PATHS.search.slice(1),
            handle: { pageMeta: searchPageMeta },
            element: <Search />,
          },
          {
            path: ROUTE_PATHS.noteDetail().slice(1),
            handle: { pageMeta: noteDetailPageMeta },
            element: <NoteDetail />,
          },
          {
            path: ROUTE_PATHS.shopDetail().slice(1),
            handle: { pageMeta: storeDetailPageMeta },
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
    handle: { pageMeta: notFoundPageMeta },
    element: <NotFoundPage />,
  },
]);
