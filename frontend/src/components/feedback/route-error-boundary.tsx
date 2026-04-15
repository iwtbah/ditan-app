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
      <div className="w-full rounded-[24px] border border-border/50 bg-card p-8 shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
        <p className="text-sm uppercase tracking-[0.2em] text-text-tertiary">Route Error</p>
        <h1 className="mt-3 text-2xl font-semibold text-text-primary">页面加载失败</h1>
        <p className="mt-3 text-sm text-text-secondary">{message}</p>
        <Link
          className="mt-6 inline-flex rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          to={ROUTE_PATHS.home}
        >
          返回首页
        </Link>
      </div>
    </div>
  );
}
