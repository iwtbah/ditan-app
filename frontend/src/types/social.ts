import type { HomeNoteCard, HomeShopCard } from '@/types/home';
import type { UserProfile } from '@/types/user';

export type FollowingFeedType = 'all' | 'notes' | 'shops';
export type ProfileContentTab = 'notes' | 'favorites' | 'liked';
export type ProfileSubFilter = 'all' | 'shops' | 'notes';

export interface FollowingFeedItem {
  id: string;
  type: '笔记' | '店铺';
  author: {
    name: string;
    avatarUrl: string;
  };
  timeLabel: string;
  title: string;
  content: string;
  imageUrl: string;
  shopInfo?: {
    name: string;
    city: string;
  };
  stats: {
    likes: number;
    comments: number;
    favorites: number;
    isLiked?: boolean;
  };
}

export interface FollowingFeedPayload {
  items: FollowingFeedItem[];
}

export interface MyProfileView {
  profile: UserProfile & {
    badge: string;
  };
  notes: HomeNoteCard[];
  favoriteNotes: HomeNoteCard[];
  favoriteShops: HomeShopCard[];
  likedNotes: HomeNoteCard[];
  likedShops: HomeShopCard[];
}
