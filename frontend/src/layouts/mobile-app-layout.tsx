import { AnimatePresence, motion } from "motion/react";
import { Compass, Heart, Home, User } from "lucide-react";
import { useMemo, useRef } from "react";
import { Toaster } from "sonner";
import { useLocation, useMatches, useOutlet } from "react-router-dom";
import { ROUTE_PATHS } from "@/constants/routes";
import { usePreviewStateContext } from "@/contexts/preview-state-context";
import { TabBar } from "@/layouts/components/tab-bar";
import type { PageRouteMeta } from "@/types/page";

interface MobileAppLayoutProps {
  showPreviewMeta?: boolean;
}

function isNoteDetailRoute(pathname: string) {
  return pathname.startsWith("/notes/");
}

function isShopDetailRoute(pathname: string) {
  return pathname.startsWith("/shops/");
}

export function MobileAppLayout({ showPreviewMeta = false }: MobileAppLayoutProps) {
  const location = useLocation();
  const matches = useMatches();
  const outlet = useOutlet();
  const { appState, subState } = usePreviewStateContext();
  const previousPathnameRef = useRef(location.pathname);
  const currentPageMatch = [...matches].reverse().find((match) => {
    const handle = match.handle as { pageMeta?: PageRouteMeta } | undefined;
    return Boolean(handle?.pageMeta);
  }) as ({ handle?: { pageMeta?: PageRouteMeta } } | undefined);
  const currentPageMeta = currentPageMatch?.handle?.pageMeta;
  const isAuthRoute = location.pathname.startsWith(ROUTE_PATHS.login);
  const isSettingsRoute = location.pathname.startsWith(ROUTE_PATHS.settings);
  const isDetailRoute =
    isNoteDetailRoute(location.pathname) || isShopDetailRoute(location.pathname);
  const previousPathname = previousPathnameRef.current;
  const isAuthTransition =
    isAuthRoute || previousPathname.startsWith(ROUTE_PATHS.login);
  const wasDetailRoute =
    isNoteDetailRoute(previousPathname) || isShopDetailRoute(previousPathname);
  const isSettingsTransition =
    isSettingsRoute || previousPathname.startsWith(ROUTE_PATHS.settings);
  const isOverlayRoute = isSettingsRoute || isDetailRoute;
  const wasOverlayRoute = previousPathname.startsWith(ROUTE_PATHS.settings) || wasDetailRoute;
  const isOpeningOverlay = isOverlayRoute && !wasOverlayRoute;
  const isClosingOverlay = !isOverlayRoute && wasOverlayRoute;

  const pageTransition = useMemo(
    () =>
      isAuthTransition
        ? {
            initial: { opacity: 0.01 },
            animate: { opacity: 1 },
            exit: { opacity: 0.01 },
            transition: { duration: 0.12, ease: "easeOut" as const },
          }
        : isOpeningOverlay
          ? {
              initial: { opacity: 1, x: 24 },
              animate: { opacity: 1, x: 0 },
              exit: { opacity: 1, x: 24 },
              transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] as const },
            }
        : isClosingOverlay
          ? {
              initial: { opacity: 1, x: 0, scale: 1 },
              animate: { opacity: 1, x: 0, scale: 1 },
              exit: { opacity: 1, x: 0, scale: 1 },
              transition: { duration: 0.08, ease: "linear" as const },
            }
        : {
            initial: { opacity: 0.88, x: 8, scale: 0.998 },
            animate: { opacity: 1, x: 0, scale: 1 },
            exit: { opacity: 0.96, x: -4, scale: 0.998 },
            transition: { duration: 0.14, ease: [0.22, 1, 0.36, 1] as const },
          },
    [isAuthTransition, isClosingOverlay, isOpeningOverlay],
  );

  previousPathnameRef.current = location.pathname;

  const navItems = [
    { name: "首页", path: ROUTE_PATHS.home, icon: Home },
    { name: "迪探", path: ROUTE_PATHS.ditan, icon: Compass },
    { name: "发布", path: ROUTE_PATHS.publish, special: true },
    { name: "关注", path: ROUTE_PATHS.following, icon: Heart },
    { name: "我的", path: ROUTE_PATHS.my, icon: User },
  ];

  return (
    <div className="w-full max-w-[430px] h-[100dvh] md:h-full md:max-h-[850px] bg-background relative flex flex-col shadow-2xl overflow-hidden md:rounded-[3rem] md:border-[12px] border-gray-900 mx-auto transform transition-all ring-1 ring-border/40">
      {showPreviewMeta && (
        <div className="bg-yellow-300 text-yellow-900 text-[10px] font-bold py-1.5 px-3 flex justify-between items-center z-50 shadow-sm sticky top-0 font-mono tracking-tight uppercase">
          <span>FRAME: {currentPageMeta?.frameName ?? "页面"}_{appState}</span>
          <span className="opacity-60 bg-yellow-900/10 px-1.5 py-0.5 rounded">SUB: {subState}</span>
        </div>
      )}

      <Toaster position="top-center" richColors theme="light" />

      <div className="flex-1 overflow-hidden bg-background relative flex flex-col">
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={location.pathname}
            initial={pageTransition.initial}
            animate={pageTransition.animate}
            exit={pageTransition.exit}
            transition={pageTransition.transition}
            className="w-full h-full absolute inset-0 flex flex-col z-10 will-change-transform"
          >
            {outlet}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence initial={false}>
        {currentPageMeta?.showTabBar !== false && (
            <motion.div
              initial={false}
              animate={{ y: 0, opacity: 1 }}
              exit={
                isAuthTransition
                  ? { opacity: 0 }
                  : isSettingsTransition
                    ? { opacity: 0 }
                  : { y: 72, opacity: 0 }
              }
              transition={
                isAuthTransition
                  ? { duration: 0.12, ease: "easeOut" }
                  : isSettingsTransition
                    ? { duration: 0.1, ease: "easeOut" }
                    : { duration: 0.18, ease: "easeOut" }
              }
              className="absolute bottom-[12px] inset-x-0 pointer-events-none h-[68px] z-[100]"
            >
              <TabBar items={navItems} />
            </motion.div>
          )}
      </AnimatePresence>
    </div>
  );
}
