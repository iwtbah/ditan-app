import { SectionCard } from '@/components/common/section-card';
import { AsyncState } from '@/components/feedback/async-state';
import { useUserProfileQuery } from '@/features/users/hooks/use-user-profile-query';

interface UserProfileSectionProps {
  userId: string;
}

export function UserProfileSection({ userId }: UserProfileSectionProps) {
  const profileQuery = useUserProfileQuery(userId);
  const profile = profileQuery.data;

  return (
    <SectionCard title="用户主页" description="个人主页先保持骨架，后续可继续拆关注、笔记、收藏等子模块。">
      <AsyncState
        error={profileQuery.error}
        isEmpty={!profile}
        isError={profileQuery.isError}
        isLoading={profileQuery.isLoading}
        emptyMessage="未找到用户信息"
      >
        <div className="grid gap-4 md:grid-cols-[auto,1fr]">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-100 text-2xl font-semibold text-brand-700">
            {profile?.nickname.slice(0, 1)}
          </div>
          <div className="space-y-3">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{profile?.nickname}</h1>
              <p className="text-sm text-slate-500">{profile?.bio || '这个用户还没有填写简介。'}</p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-slate-600">
              <span>粉丝 {profile?.followerCount ?? 0}</span>
              <span>关注 {profile?.followingCount ?? 0}</span>
              <span>笔记 {profile?.noteCount ?? 0}</span>
              <span>获赞 {profile?.likeCount ?? 0}</span>
            </div>
          </div>
        </div>
      </AsyncState>
    </SectionCard>
  );
}
