import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ROUTE_PATHS } from '@/constants/routes';
import { useAuthStore } from '@/stores/auth-store';
import {
  AUTH_REDIRECT_QUERY_KEY,
  buildLoginRedirectPath,
} from '@/features/auth/utils';

export function RequireAuth() {
  const location = useLocation();
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const isLogin = useAuthStore((state) => state.isLogin);

  if (!isHydrated) {
    return (
      <div className="flex h-full items-center justify-center bg-background px-6 text-center text-[13px] text-text-secondary">
        正在恢复登录状态...
      </div>
    );
  }

  if (isLogin) {
    return <Outlet />;
  }

  const redirectTarget = buildLoginRedirectPath(location);
  const searchParams = new URLSearchParams({
    [AUTH_REDIRECT_QUERY_KEY]: redirectTarget,
  });

  return <Navigate replace to={`${ROUTE_PATHS.login}?${searchParams.toString()}`} />;
}
