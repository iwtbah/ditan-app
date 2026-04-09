import { NavLink, Outlet } from 'react-router-dom';
import { ROUTE_PATHS } from '@/constants/routes';
import { useUiStore } from '@/stores/ui-store';
import { cn } from '@/utils/cn';

const navItems = [
  { to: ROUTE_PATHS.home, label: '首页', end: true },
  { to: ROUTE_PATHS.search, label: '搜索' },
  { to: ROUTE_PATHS.my, label: '我的' },
];

export function AppShellLayout() {
  const pageTitle = useUiStore((state) => state.pageTitle);

  return (
    <div className="min-h-screen text-slate-900">
      <header className="sticky top-0 z-20 border-b border-black/5 bg-[rgba(255,253,248,0.92)] backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <NavLink className="text-lg font-semibold tracking-tight" to={ROUTE_PATHS.home}>
            地探
          </NavLink>
          <div className="text-sm text-slate-500">{pageTitle || '城市探店与点评社区'}</div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6 pb-24">
        <Outlet />
      </div>

      <nav className="fixed bottom-0 left-0 right-0 border-t border-black/5 bg-[rgba(255,253,248,0.96)] backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-xl items-center justify-around px-4 py-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              className={({ isActive }) =>
                cn(
                  'rounded-full px-4 py-2 text-sm transition-colors',
                  isActive ? 'bg-brand-600 text-white' : 'text-slate-500',
                )
              }
              end={item.end}
              to={item.to}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
