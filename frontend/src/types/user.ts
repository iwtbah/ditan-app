export interface BasicUserProfile {
  avatar: string;
  name: string;
}

export interface TimedUserProfile extends BasicUserProfile {
  time: string;
}

export interface LocatedUserProfile extends TimedUserProfile {
  location: string;
}

export interface ProfileSummary {
  avatar: string;
  badge: string;
  bio: string;
  city: string;
  followerCount: string;
  followingCount: string;
  likesAndCollections: string;
  name: string;
}

export interface RecentBrowseItem {
  id: string;
  keyword: string;
  meta: string;
  targetId: number;
  title: string;
  type: "店铺" | "日记";
}
