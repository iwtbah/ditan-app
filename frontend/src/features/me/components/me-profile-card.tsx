import React from "react";
import { profilePanelClassName } from "@/components/ditan";
import { MapPin, PenTool, Settings, Share } from "lucide-react";
import type { ProfileSummary } from "@/types/user";

type MeProfileCardProps = {
  profile: ProfileSummary;
};

export const MeProfileCard = ({ profile }: MeProfileCardProps) => {
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

        <div className={`${profilePanelClassName} p-5 mb-[14px] mt-6 relative z-20`}>
        <div className="flex justify-between items-start -mt-10 mb-3">
          <img
            src={profile.avatar}
            alt="Avatar"
            className="w-[84px] h-[84px] rounded-full object-cover shadow-[0_4px_16px_rgba(0,0,0,0.06)] ring-4 ring-card bg-muted"
          />
          <button className="px-4 py-1.5 mt-10 bg-muted/60 hover:bg-muted text-text-primary rounded-full text-[12px] font-bold active:scale-95 transition-all flex items-center gap-1.5 border border-border/40 shadow-sm">
            <PenTool size={14} strokeWidth={2.5} /> <span>编辑资料</span>
          </button>
        </div>

        <h1 className="text-[22px] font-bold text-text-primary mb-[4px] tracking-tight">{profile.name}</h1>

        <div className="flex items-center text-[12px] text-text-tertiary mb-[12px] gap-[6px] font-medium">
          <div className="flex items-center gap-[2px]">
            <MapPin size={12} strokeWidth={2.5} />
            <span>{profile.city}</span>
          </div>
          {profile.badge && <span className="w-1 h-1 rounded-full bg-border" />}
          <span className="text-primary/90 font-bold bg-primary/10 px-1.5 py-0.5 rounded text-[11px]">{profile.badge}</span>
        </div>

        <p className="text-[14px] text-text-secondary leading-[20px] mb-5 line-clamp-2 max-w-[90%]">
          {profile.bio}
        </p>

        <div className="flex gap-8 border-t border-border/40 pt-4">
          <div className="flex flex-col items-center">
            <span className="font-bold text-text-primary text-[18px]">{profile.followingCount}</span>
            <span className="text-[11px] font-medium text-text-tertiary mt-[2px]">关注</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-text-primary text-[18px]">{profile.followerCount}</span>
            <span className="text-[11px] font-medium text-text-tertiary mt-[2px]">粉丝</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-text-primary text-[18px]">{profile.likesAndCollections}</span>
            <span className="text-[11px] font-medium text-text-tertiary mt-[2px]">获赞与收藏</span>
          </div>
        </div>
      </div>
    </>
  );
};
