import { useLocation, useOutlet } from 'react-router-dom';
import { MobileBottomNav } from '@/components/navigation/mobile-bottom-nav';

export function AppShellLayout() {
  const location = useLocation();
  const outlet = useOutlet();
  const shouldHideTabBar =
    location.pathname.startsWith('/shops/') ||
    location.pathname.startsWith('/notes/') ||
    location.pathname === '/publish';

  return (
    <div className="min-h-screen bg-background md:px-6 md:py-6">
      <div className="relative mx-auto flex min-h-screen max-w-[430px] flex-col bg-background ring-1 ring-border/40 md:min-h-[860px] md:rounded-[3rem] md:border-[12px] md:border-gray-900 md:shadow-2xl">
        <div className="flex-1 overflow-hidden md:rounded-[calc(3rem-12px)]">
          <div key={location.pathname} className="page-route-transition h-full">
            {outlet}
          </div>
        </div>
        {shouldHideTabBar ? null : <MobileBottomNav />}
      </div>
    </div>
  );
}
