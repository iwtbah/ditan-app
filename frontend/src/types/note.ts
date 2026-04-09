import type { ShopSummary } from '@/types/shop';
import type { UserSummary } from '@/types/user';

export interface NoteCard {
  id: string;
  title: string;
  excerpt: string;
  coverUrl?: string;
  author: UserSummary;
  shop?: ShopSummary;
  likedCount: number;
  commentCount: number;
  publishedAt: string;
  isLiked?: boolean;
}

export interface NoteDetail extends NoteCard {
  content: string;
  imageUrls: string[];
  tags: string[];
}
