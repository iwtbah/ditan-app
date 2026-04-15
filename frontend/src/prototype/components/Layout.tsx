import { useLocation, useOutlet } from "react-router-dom";
import { Home, Compass, Heart, User } from "lucide-react";
import { useStateContext } from "../context/StateContext";
import { TabBar } from "./ditan";
import { Toaster } from "sonner";
import { AnimatePresence, motion } from "motion/react";

export const Layout = () => {
  const location = useLocation();
  const outlet = useOutlet();
  const { appState, subState } = useStateContext();

  const getPageName = () => {
    if (location.pathname === '/') return '首页';
    if (location.pathname === '/following') return '关注页';
    if (location.pathname === '/profile') return '我的页';
    if (location.pathname === '/ditan') return '迪探页';
    if (location.pathname === '/publish') return '发布页';
    if (location.pathname === '/search') return '搜索页';
    if (location.pathname.startsWith('/note/')) return '笔记详情';
    if (location.pathname.startsWith('/store/')) return '店铺详情';
    return '页面';
  };

  const navItems = [
    { name: "首页", path: "/", icon: Home },
    { name: "迪探", path: "/ditan", icon: Compass },
    { name: "发布", path: "/publish", special: true },
    { name: "关注", path: "/following", icon: Heart },
    { name: "我的", path: "/profile", icon: User },
  ];

  return (
    <div className="w-full max-w-[430px] h-[100dvh] md:h-full md:max-h-[850px] bg-background relative flex flex-col shadow-2xl overflow-hidden md:rounded-[3rem] md:border-[12px] border-gray-900 mx-auto transform transition-all ring-1 ring-border/40">
      
      {/* Wireframe Frame Label (Debugging / State Design Tool) */}
      <div className="bg-yellow-300 text-yellow-900 text-[10px] font-bold py-1.5 px-3 flex justify-between items-center z-50 shadow-sm sticky top-0 font-mono tracking-tight uppercase">
        <span>FRAME: {getPageName()}_{appState}</span>
        <span className="opacity-60 bg-yellow-900/10 px-1.5 py-0.5 rounded">SUB: {subState}</span>
      </div>

      <Toaster position="top-center" richColors theme="light" />

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden bg-background relative flex flex-col perspective-[1200px]">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 20, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full h-full absolute inset-0 flex flex-col z-10"
            style={{ transformOrigin: 'center center' }}
          >
            {outlet}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Tab Bar Component is now floating inside absolute positioned within the layout relative parent */}
      <AnimatePresence>
        {location.pathname !== '/publish' && !location.pathname.startsWith('/note') && !location.pathname.startsWith('/store') && (
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
};
