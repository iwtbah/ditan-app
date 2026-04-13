/**
 * 认证页布局。
 * 与主应用布局分离，便于登录、注册、找回密码等页面后续独立扩展。
 */
import { Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
}
