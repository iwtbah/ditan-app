import React from "react";
import { MapPin, PenTool, Settings } from "lucide-react";
import type { ProfileSummary } from "@/types/user";

type MeProfileCardProps = {
  profile: ProfileSummary;
};

export const ProfileHeader = ({ profile }: MeProfileCardProps) => {
  return (
    <section className="relative isolate overflow-hidden px-5 pb-5 pt-safe">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[300px] bg-gradient-to-b from-[#E8F0ED] via-[#F4F7F6] to-background" />
      <div className="pointer-events-none absolute left-[-48px] top-[18px] h-[170px] w-[170px] rounded-full bg-primary/14 blur-3xl" />
      <div className="pointer-events-none absolute right-[-24px] top-[56px] h-[150px] w-[150px] rounded-full bg-white/60 blur-3xl" />

      <div className="absolute right-5 top-[calc(env(safe-area-inset-top)+12px)] z-20 flex items-center gap-2">
        <button className="inline-flex h-10 items-center justify-center gap-1 rounded-full border border-white/45 bg-background/72 px-3 text-[12px] font-bold text-text-primary shadow-sm backdrop-blur-xl transition-all active:scale-95">
          <PenTool size={14} strokeWidth={2.5} />
          <span>编辑</span>
        </button>
        <button
          aria-label="打开设置"
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/45 bg-background/70 text-text-primary shadow-[0_2px_10px_rgba(0,0,0,0.05)] backdrop-blur-xl transition-transform active:scale-[0.96]"
        >
          <Settings size={18} strokeWidth={2.4} />
        </button>
      </div>

      <div className="relative z-10 pt-[72px]">
        <div className="flex items-center gap-4">
          <img
            src={profile.avatar}
            alt="Avatar"
            className="h-[88px] w-[88px] rounded-full bg-muted object-cover ring-4 ring-background/90 shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
          />
          <div className="min-w-0 flex-1 pr-[72px]">
            <h1 className="mb-1 truncate text-[clamp(18px,5.2vw,22px)] font-bold tracking-tight text-text-primary">
              {profile.name}
            </h1>

            <div className="mb-2 flex flex-wrap items-center gap-2 text-[12px] font-medium text-text-tertiary">
              <div className="flex items-center gap-[3px] rounded-full bg-background/54 px-2.5 py-1 backdrop-blur-sm">
                <MapPin size={12} strokeWidth={2.5} />
                <span>{profile.city}</span>
              </div>
              {profile.badge && (
                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-bold text-primary/90">
                  {profile.badge}
                </span>
              )}
            </div>

            <p className="max-w-none text-[14px] leading-[20px] text-text-secondary line-clamp-2">
              {profile.bio}
            </p>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-1 border-y border-white/35 py-2">
          <button className="flex flex-col items-center rounded-[18px] px-2 py-2 transition-transform active:scale-[0.97]">
            <span className="text-[18px] font-bold text-text-primary">{profile.followingCount}</span>
            <span className="mt-1 text-[11px] font-medium text-text-tertiary">关注</span>
          </button>
          <button className="flex flex-col items-center rounded-[18px] px-2 py-2 transition-transform active:scale-[0.97]">
            <span className="text-[18px] font-bold text-text-primary">{profile.followerCount}</span>
            <span className="mt-1 text-[11px] font-medium text-text-tertiary">粉丝</span>
          </button>
          <button className="flex flex-col items-center rounded-[18px] px-2 py-2 transition-transform active:scale-[0.97]">
            <span className="text-[18px] font-bold text-text-primary">{profile.likesAndCollections}</span>
            <span className="mt-1 text-[11px] font-medium text-text-tertiary">获赞与收藏</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export const MeProfileCard = ProfileHeader;
