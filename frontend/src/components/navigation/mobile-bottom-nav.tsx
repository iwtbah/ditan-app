import { NavLink } from 'react-router-dom';
import { CompassIcon, HeartIcon, HomeIcon, PlusIcon, UserIcon } from '@/components/common/icons';
import { ROUTE_PATHS } from '@/constants/routes';
import { cn } from '@/utils/cn';

const navItems = [
  { label: '首页', to: ROUTE_PATHS.home, Icon: HomeIcon, end: true },
  { label: '迪探', to: ROUTE_PATHS.ditan, Icon: CompassIcon },
  { label: '发布', to: ROUTE_PATHS.publish, Icon: PlusIcon, special: true },
  { label: '关注', to: ROUTE_PATHS.following, Icon: HeartIcon },
  { label: '我的', to: ROUTE_PATHS.my, Icon: UserIcon },
];

interface MobileBottomNavProps {
  className?: string;
}

export function MobileBottomNav({ className }: MobileBottomNavProps) {
  return (
    <div
      className={cn(
        'pointer-events-none fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom,0px)+12px)] z-50 flex justify-center px-4',
        className,
      )}
    >
      <div className="w-full max-w-[430px]">
        <div className="glass-float relative h-[68px] rounded-[26px] pointer-events-auto">
          <div className="grid h-full grid-cols-5">
          {navItems.map(({ label, to, Icon, end, special }) => (
            <NavLink
              key={to}
              className={({ isActive }) =>
                cn(
                  'relative flex flex-col items-center justify-center gap-1 text-[10px] font-bold transition-colors',
                  special ? 'z-20 -mt-[28px]' : '',
                  isActive ? 'text-primary' : 'text-text-tertiary',
                )
              }
              end={end}
              to={to}
            >
              {({ isActive }) => (
                <>
                  {special ? (
                    <div className="relative mt-3 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full bg-primary/20 blur-md" />
                      <div className="relative z-10 flex h-[52px] w-[52px] items-center justify-center rounded-full border border-white/20 bg-primary text-white shadow-[0_10px_24px_rgba(74,93,90,0.28)]">
                        <Icon size={26} />
                      </div>
                    </div>
                  ) : (
                    <>
                      <span
                        className={cn(
                          'absolute left-1/2 top-1.5 h-[3px] w-8 -translate-x-1/2 rounded-b-full bg-primary shadow-[0_2px_8px_rgba(74,93,90,0.2)] transition-opacity',
                          isActive ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                      <Icon size={22} />
                      <span>{label}</span>
                    </>
                  )}
                </>
              )}
            </NavLink>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}
