import React from "react";
import { motion } from "motion/react";
import { Plus } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import type { TabBarItem } from "@/types/common";

type TabBarProps = {
  items: TabBarItem[];
};

export const TabBar = ({ items }: TabBarProps) => {
  const location = useLocation();

  const getActiveIndex = () => {
    let index = -1;
    let mapIndex = 0;
    for (let i = 0; i < items.length; i += 1) {
      if (items[i].special) continue;
      const isActive =
        location.pathname === items[i].path ||
        (items[i].path !== "/" && location.pathname.startsWith(items[i].path));
      if (isActive) {
        index = mapIndex;
        break;
      }
      mapIndex += 1;
    }
    return index;
  };

  const activeIndex = getActiveIndex();

  return (
    <div className="absolute inset-0 left-[16px] right-[16px] h-[68px] pointer-events-auto">
      <div className="absolute inset-0 bg-background/70 dark:bg-[#14181c]/60 backdrop-blur-[24px] rounded-[26px] shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)] border border-border/40 dark:border-white/10 overflow-hidden">
        {activeIndex !== -1 && (
          <div
            className="absolute top-0 bottom-0 pointer-events-none z-0 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{
              width: `${100 / items.length}%`,
              transform: `translateX(${(activeIndex >= 2 ? activeIndex + 1 : activeIndex) * 100}%)`,
            }}
          >
            <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-[32px] h-[3px] bg-primary rounded-b-full opacity-90 shadow-[0_2px_8px_rgba(0,0,0,0.1)]" />
            <div className="absolute inset-0 top-0 w-full h-full bg-gradient-to-b from-primary/10 to-transparent opacity-40 dark:opacity-20" />
          </div>
        )}
      </div>

      <div className="absolute inset-0 flex items-center justify-between px-2">
        {items.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (item.path !== "/" && location.pathname.startsWith(item.path));

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex-1 flex flex-col items-center justify-center h-full gap-1 relative ${item.special ? "z-20 -mt-[28px]" : "z-10"}`}
            >
              {item.special ? (
                <div className="relative group flex items-center justify-center mt-3">
                  <div className="absolute inset-0 bg-primary/20 blur-md rounded-full group-hover:bg-primary/30 transition-colors" />
                  <div className="w-[52px] h-[52px] bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-[0_6px_16px_rgba(0,0,0,0.15)] border border-white/20 dark:border-white/10 hover:scale-[1.03] active:scale-[0.97] transition-all duration-250 ease-out relative z-10">
                    <Plus size={26} strokeWidth={2.5} />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center relative w-full h-full mt-1.5">
                  <motion.div
                    initial={false}
                    animate={{ scale: isActive ? 1.05 : 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className={`relative z-10 mb-[3px] transition-colors duration-200 ${isActive ? "text-primary" : "text-text-tertiary"}`}
                  >
                    {item.icon
                      ? React.createElement(item.icon, {
                          size: 24,
                          strokeWidth: isActive ? 2.2 : 1.8,
                        })
                      : null}
                  </motion.div>
                  <span className={`text-[10px] font-bold transition-colors duration-200 ${isActive ? "text-primary" : "text-text-tertiary"}`}>
                    {item.name}
                  </span>
                </div>
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default TabBar;
