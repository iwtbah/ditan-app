export interface UserSummary {
  id: string;
  nickname: string;
  avatarUrl?: string;
  bio?: string;
  city?: string;
}

export interface UserProfile extends UserSummary {
  followerCount: number;
  followingCount: number;
  noteCount: number;
  likeCount: number;
  isFollowing?: boolean;
}
