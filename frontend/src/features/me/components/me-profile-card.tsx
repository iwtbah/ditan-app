import React from "react";
import { MapPin, PenTool, Settings, Share } from "lucide-react";

export const MeProfileCard = () => {
  return (
    <>
      <div className="absolute top-0 inset-x-0 h-[180px] bg-gradient-to-b from-muted/80 to-background pointer-events-none" />

      <div className="pt-safe px-5 py-3 flex items-center justify-between z-20 sticky top-0">
        <span className="font-bold text-[16px] tracking-widest text-text-primary invisible">我的</span>
        <div className="flex gap-4 text-text-primary">
          <Share size={22} strokeWidth={2.5} className="cursor-pointer active:scale-95 transition-transform" />
          <Settings size={22} strokeWidth={2.5} className="cursor-pointer active:scale-95 transition-transform" />
        </div>
      </div>

      <div className="bg-card rounded-[20px] shadow-[0_2px_16px_rgba(0,0,0,0.04)] p-5 mb-[14px] border border-border/40 mt-6 relative z-20">
        <div className="flex justify-between items-start -mt-10 mb-3">
          <img
            src="https://images.unsplash.com/photo-1572604745465-3f65869e2c67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaXJsJTIwcG9ydHJhaXQlMjBhc2lhbnxlbnwxfHx8fDE3NzYwODk2NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Avatar"
            className="w-[84px] h-[84px] rounded-full object-cover shadow-[0_4px_16px_rgba(0,0,0,0.06)] ring-4 ring-card bg-muted"
          />
          <button className="px-4 py-1.5 mt-10 bg-muted/60 hover:bg-muted text-text-primary rounded-full text-[12px] font-bold active:scale-95 transition-all flex items-center gap-1.5 border border-border/40 shadow-sm">
            <PenTool size={14} strokeWidth={2.5} /> <span>编辑资料</span>
          </button>
        </div>

        <h1 className="text-[22px] font-bold text-text-primary mb-[4px] tracking-tight">小明的小名叫明明</h1>

        <div className="flex items-center text-[12px] text-text-tertiary mb-[12px] gap-[6px] font-medium">
          <div className="flex items-center gap-[2px]">
            <MapPin size={12} strokeWidth={2.5} />
            <span>北京</span>
          </div>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span className="text-primary/90 font-bold bg-primary/10 px-1.5 py-0.5 rounded text-[11px]">探店达人</span>
        </div>

        <p className="text-[14px] text-text-secondary leading-[20px] mb-5 line-clamp-2 max-w-[90%]">
          爱好摄影，喜欢打卡各种宝藏小店。<br />
          关注我，带你发现城市里的美好~
        </p>

        <div className="flex gap-8 border-t border-border/40 pt-4">
          <div className="flex flex-col items-center">
            <span className="font-bold text-text-primary text-[18px]">128</span>
            <span className="text-[11px] font-medium text-text-tertiary mt-[2px]">关注</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-text-primary text-[18px]">3.4k</span>
            <span className="text-[11px] font-medium text-text-tertiary mt-[2px]">粉丝</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-text-primary text-[18px]">12.5k</span>
            <span className="text-[11px] font-medium text-text-tertiary mt-[2px]">获赞与收藏</span>
          </div>
        </div>
      </div>
    </>
  );
};
