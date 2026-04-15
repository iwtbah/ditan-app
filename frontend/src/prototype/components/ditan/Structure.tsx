import React from 'react';
import { MapPin, Search, PlusSquare, Plus } from 'lucide-react';
import { EmptyState, ErrorState } from '../WireframeUI';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';

export const Header = ({ city, placeholder, onSearch, onClick, className = '', readOnly = false, autoFocus = false }: any) => (
  <div className={`flex items-center px-lg py-md gap-md bg-background/80 backdrop-blur-xl border-b border-border z-50 ${className}`}>
    <div className="flex items-center text-body font-bold gap-xs text-text-primary shrink-0">
      <MapPin size={18} strokeWidth={2.5} className="text-primary" />
      <span>{city}</span>
    </div>
    <div 
      className="flex-1 bg-input h-[36px] rounded-full flex items-center px-md gap-sm cursor-pointer shadow-inner border border-border/50"
      onClick={onClick}
    >
      <Search size={16} className="text-text-tertiary" strokeWidth={2.5} />
      <input
        type="text"
        placeholder={placeholder}
        onChange={onSearch}
        readOnly={readOnly}
        autoFocus={autoFocus}
        className={`bg-transparent border-none outline-none text-body w-full placeholder:text-text-tertiary text-text-primary ${readOnly ? 'pointer-events-none' : ''}`}
      />
    </div>
  </div>
);

export const CategoryTabs = ({ tabs, activeTab, onChange, className = '' }: any) => (
  <div className={`flex px-lg overflow-x-auto no-scrollbar gap-xl pt-sm pb-0 bg-background ${className}`}>
    {tabs.map((tab: string, idx: number) => {
      const isActive = activeTab === tab || (activeTab === undefined && idx === 0);
      return (
        <div
          key={tab}
          onClick={() => onChange && onChange(tab)}
          className={`whitespace-nowrap pb-sm text-body font-medium relative cursor-pointer transition-colors ${
            isActive ? "text-text-primary font-bold" : "text-text-secondary hover:text-text-primary"
          }`}
        >
          {tab}
          {isActive && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[3px] bg-primary rounded-full" />
          )}
        </div>
      );
    })}
  </div>
);

export const CategoryChips = ({ tags, activeTag, onChange, className = '' }: any) => (
  <div className={`flex px-lg py-[10px] overflow-x-auto no-scrollbar gap-2 bg-transparent ${className}`}>
    {tags.map((tag: string, idx: number) => {
      const isActive = activeTag === tag || (activeTag === undefined && idx === 0);
      return (
        <button
          key={tag}
          onClick={() => onChange && onChange(tag)}
          className={`relative whitespace-nowrap px-[14px] py-[6px] text-[13px] font-bold rounded-[10px] transition-colors shrink-0 ${
            isActive ? "text-background" : "text-text-secondary hover:text-text-primary"
          }`}
        >
          {isActive && (
            <motion.div
              layoutId="activeCategory"
              className="absolute inset-0 bg-text-primary rounded-[10px] shadow-sm"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          {!isActive && (
            <div className="absolute inset-0 bg-card rounded-[10px] shadow-[0_1px_4px_rgba(0,0,0,0.02)] border border-border/40 -z-10" />
          )}
          <span className="relative z-10">{tag}</span>
        </button>
      );
    })}
  </div>
);

export const ListContainer = ({ state, loadingComponent, emptyMessage = '暂无内容', errorMessage = '加载失败', onRetry, children, className = '' }: any) => {
  if (state === 'Loading') {
    return <div className={className}>{loadingComponent}</div>;
  }
  if (state === 'Empty') {
    return <div className={`h-full flex items-center justify-center ${className}`}><EmptyState message={emptyMessage} /></div>;
  }
  if (state === 'Error') {
    return <div className={`h-full flex items-center justify-center ${className}`}><ErrorState message={errorMessage} onRetry={onRetry} /></div>;
  }
  return <div className={className}>{children}</div>;
};

export const TabBar = ({ items }: any) => {
  const location = useLocation();
  // Find current active index to position the indicator, exclude the special publish button
  const standardItems = items.filter((item: any) => !item.special);
  
  // Custom logic to determine active index ignoring the special button
  const getActiveIndex = () => {
    let index = -1;
    let mapIndex = 0;
    for (let i = 0; i < items.length; i++) {
      if (items[i].special) continue;
      
      const isActive = location.pathname === items[i].path || (items[i].path !== '/' && location.pathname.startsWith(items[i].path));
      if (isActive) {
        index = mapIndex;
        break;
      }
      mapIndex++;
    }
    return index;
  };
  
  const activeIndex = getActiveIndex();
  
  return (
    <div className="absolute inset-0 left-[16px] right-[16px] h-[68px] pointer-events-auto">
      {/* Glassmorphism Background Container */}
      <div className="absolute inset-0 bg-background/70 dark:bg-[#14181c]/60 backdrop-blur-[24px] rounded-[26px] shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)] border border-border/40 dark:border-white/10 overflow-hidden">
        
        {/* Sliding Indicator (Rendered behind items) */}
        {activeIndex !== -1 && (
          <div 
            className="absolute top-0 bottom-0 pointer-events-none z-0 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{ 
              width: `${100 / items.length}%`,
              transform: `translateX(${
                // Adjust position calculation to jump over the center button (index 2)
                (activeIndex >= 2 ? activeIndex + 1 : activeIndex) * 100
              }%)` 
            }}
          >
            {/* Top Border Glow */}
            <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-[32px] h-[3px] bg-primary rounded-b-full opacity-90 shadow-[0_2px_8px_rgba(0,0,0,0.1)]" />
            
            {/* Subtle background glow for active item */}
            <div className="absolute inset-0 top-0 w-full h-full bg-gradient-to-b from-primary/10 to-transparent opacity-40 dark:opacity-20" />
          </div>
        )}
      </div>

      {/* Tab Items */}
      <div className="absolute inset-0 flex items-center justify-between px-2">
        {items.map((item: any, idx: number) => {
          const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex-1 flex flex-col items-center justify-center h-full gap-1 relative ${item.special ? "z-20 -mt-[28px]" : "z-10"}`}
            >
              {item.special ? (
                // Center Publish Button
                <div className="relative group flex items-center justify-center mt-3">
                  <div className="absolute inset-0 bg-primary/20 blur-md rounded-full group-hover:bg-primary/30 transition-colors" />
                  <div className="w-[52px] h-[52px] bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-[0_6px_16px_rgba(0,0,0,0.15)] border border-white/20 dark:border-white/10 hover:scale-[1.03] active:scale-[0.97] transition-all duration-250 ease-out relative z-10">
                    <Plus size={26} strokeWidth={2.5} />
                  </div>
                </div>
              ) : (
                // Standard Icons
                <div className="flex flex-col items-center justify-center relative w-full h-full mt-1.5">
                  {/* Icon with scale animation */}
                  <motion.div 
                    initial={false}
                    animate={{ 
                      scale: isActive ? 1.05 : 0.95,
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className={`relative z-10 mb-[3px] transition-colors duration-200 ${isActive ? "text-primary" : "text-text-tertiary"}`}
                  >
                    {React.createElement(item.icon, { 
                      size: 24, 
                      strokeWidth: isActive ? 2.2 : 1.8 
                    })}
                  </motion.div>
                  
                  {/* Text Label */}
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
