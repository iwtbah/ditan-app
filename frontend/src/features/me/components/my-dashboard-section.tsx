import { Link } from 'react-router-dom';
import { SectionCard } from '@/components/common/section-card';
import { ROUTE_PATHS } from '@/constants/routes';
import { useAuthStore } from '@/stores/auth-store';
import { useSearchStore } from '@/stores/search-store';

export function MyDashboardSection() {
  const session = useAuthStore((state) => state.session);
  const clearSession = useAuthStore((state) => state.clearSession);
  const filters = useSearchStore((state) => state.filters);

  return (
    <div className="space-y-6">
      <SectionCard title="本地状态示例" description="这里展示 Zustand 适合承载的客户端状态，而不是远程详情数据。">
        {session ? (
          <div className="space-y-3">
            <div className="text-sm text-slate-600">当前登录用户：{session.currentUser.nickname}</div>
            <div className="text-sm text-slate-600">最近搜索关键词：{filters.keyword || '暂无'}</div>
            <button
              className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600"
              onClick={clearSession}
              type="button"
            >
              清除本地登录态
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-slate-500">当前没有本地登录态，可跳转登录页验证状态存储流程。</p>
            <Link className="inline-flex rounded-full bg-brand-600 px-4 py-2 text-sm font-medium text-white" to={ROUTE_PATHS.login}>
              去登录
            </Link>
          </div>
        )}
      </SectionCard>
    </div>
  );
}
