import { AnimatePresence, motion } from "motion/react";
import { Compass, Heart, Home, User } from "lucide-react";
import { Toaster } from "sonner";
import { useLocation, useOutlet } from "react-router-dom";
import { TabBar } from "@/components/ditan";
import { ROUTE_PATHS } from "@/constants/routes";
import { useViewStateContext } from "@/contexts/view-state-context";

export function MobileAppLayout() {
  const location = useLocation();
  const outlet = useOutlet();
  const { appState, subState } = useViewStateContext();
  const noteDetailPrefix = ROUTE_PATHS.noteDetail("").replace(/\/$/, "");
  const shopDetailPrefix = ROUTE_PATHS.shopDetail("").replace(/\/$/, "");

  const getPageName = () => {
    if (location.pathname === ROUTE_PATHS.home) return "首页";
    if (location.pathname === ROUTE_PATHS.following) return "关注页";
    if (location.pathname === ROUTE_PATHS.my) return "我的页";
    if (location.pathname === ROUTE_PATHS.ditan) return "迪探页";
    if (location.pathname === ROUTE_PATHS.publish) return "发布页";
    if (location.pathname === ROUTE_PATHS.search) return "搜索页";
    if (location.pathname.startsWith(noteDetailPrefix)) return "笔记详情";
    if (location.pathname.startsWith(shopDetailPrefix)) return "店铺详情";
    return "页面";
  };

  const navItems = [
    { name: "首页", path: ROUTE_PATHS.home, icon: Home },
    { name: "迪探", path: ROUTE_PATHS.ditan, icon: Compass },
    { name: "发布", path: ROUTE_PATHS.publish, special: true },
    { name: "关注", path: ROUTE_PATHS.following, icon: Heart },
    { name: "我的", path: ROUTE_PATHS.my, icon: User },
  ];

  return (
    <div className="w-full max-w-[430px] h-[100dvh] md:h-full md:max-h-[850px] bg-background relative flex flex-col shadow-2xl overflow-hidden md:rounded-[3rem] md:border-[12px] border-gray-900 mx-auto transform transition-all ring-1 ring-border/40">
      <div className="bg-yellow-300 text-yellow-900 text-[10px] font-bold py-1.5 px-3 flex justify-between items-center z-50 shadow-sm sticky top-0 font-mono tracking-tight uppercase">
        <span>FRAME: {getPageName()}_{appState}</span>
        <span className="opacity-60 bg-yellow-900/10 px-1.5 py-0.5 rounded">SUB: {subState}</span>
      </div>

      <Toaster position="top-center" richColors theme="light" />

      <div className="flex-1 overflow-hidden bg-background relative flex flex-col perspective-[1200px]">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 20, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full h-full absolute inset-0 flex flex-col z-10"
            style={{ transformOrigin: "center center" }}
          >
            {outlet}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {location.pathname !== ROUTE_PATHS.publish &&
          !location.pathname.startsWith(noteDetailPrefix) &&
          !location.pathname.startsWith(shopDetailPrefix) && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="absolute bottom-[12px] inset-x-0 pointer-events-none h-[68px] z-[100]"
            >
              <TabBar items={navItems} />
            </motion.div>
          )}
      </AnimatePresence>
    </div>
  );
}
