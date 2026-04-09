import { Link } from 'react-router-dom';
import { ROUTE_PATHS } from '@/constants/routes';

export function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-lg items-center px-4">
      <div className="card-surface w-full rounded-xl2 p-8">
        <p className="text-sm uppercase tracking-[0.2em] text-slate-400">404</p>
        <h1 className="mt-3 text-2xl font-semibold text-slate-900">页面不存在</h1>
        <p className="mt-3 text-sm text-slate-600">当前仅完成工程底座和页面骨架，未匹配到对应路由。</p>
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
