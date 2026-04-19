import LoginFeature from '@/features/auth/login';
import type { PageRouteMeta } from '@/types/page';

export const pageMeta: PageRouteMeta = {
  frameName: '登录页',
  showTabBar: false,
};

/**
 * 登录页路由承接层。
 * 当前阶段保持为薄包装，登录交互和假鉴权逻辑下沉到 auth feature。
 */
export function LoginPage() {
  return <LoginFeature />;
}

export default LoginPage;
