import { LoginPanel } from '@/features/auth/components/login-panel';
import { usePageTitle } from '@/hooks/use-page-title';

export function LoginPage() {
  usePageTitle('登录');

  return <LoginPanel />;
}
