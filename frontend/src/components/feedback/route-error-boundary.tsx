import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { ROUTE_PATHS } from '@/constants/routes';

export function RouteErrorBoundary() {
  const error = useRouteError();

  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : '页面发生未知错误';

  return (
    <div className="mx-auto flex min-h-screen max-w-lg items-center px-4">
      <div className="card-surface w-full rounded-xl2 p-8">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Route Error</p>
        <h1 className="mt-3 text-2xl font-semibold text-slate-900">页面加载失败</h1>
        <p className="mt-3 text-sm text-slate-600">{message}</p>
        <Link
          className="mt-6 inline-flex rounded-full bg-brand-600 px-4 py-2 text-sm font-medium text-white"
          to={ROUTE_PATHS.home}
        >
          返回首页
        </Link>
      </div>
    </div>
  );
}
