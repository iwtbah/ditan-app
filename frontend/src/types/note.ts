import type { BasicUserProfile, LocatedUserProfile, TimedUserProfile } from "./user";

export interface NoteCardData {
  author: string;
  authorAvatar?: string;
  height: string;
  id: number;
  image?: string;
  liked?: boolean;
  likes: number;
  title: string;
}

export interface NoteComment {
  author: string;
  content: string;
  hasReply: boolean;
  id: number;
  liked: boolean;
  likes: number;
  time: string;
}

export interface NoteDetailData {
  author: LocatedUserProfile;
  collected: number;
  content: string[];
  images: string[];
  likedAvatars: string[];
  likes: number;
  tags: string[];
  title: string;
}

export interface NoteRecommendationData {
  author: string;
  avatar: string;
  id: number;
  image: string;
  likes: number;
  title: string;
}

export interface MasonryNoteData extends NoteRecommendationData {
  height?: string;
}

export type FollowingFeedType = "全部" | "笔记" | "店铺";

export interface FollowingFeedStats {
  comments: number;
  isLiked: boolean;
  likes: number;
  stars: number;
}

export interface FollowingFeedData {
  author: BasicUserProfile;
  content: string;
  id: number;
  image: string;
  shopInfo?: {
    city: string;
    name: string;
  };
  stats: FollowingFeedStats;
  time: TimedUserProfile["time"];
  title: string;
  type: Exclude<FollowingFeedType, "全部">;
}
