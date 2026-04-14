export interface CommentCardData {
  id: string;
  author: string;
  avatarUrl?: string;
  content: string;
  timeLabel: string;
  likes: number;
  liked?: boolean;
  hasReply?: boolean;
  rating?: number;
}

export interface RecommendedDish {
  id: string;
  name: string;
  reason: string;
  imageUrl: string;
}

export interface FeaturedNotePreview {
  id: string;
  title: string;
  author: string;
  avatarUrl?: string;
  likes: number;
  imageUrl: string;
}

export interface ShopCoupon {
  id: string;
  title: string;
  sales: string;
  type: string;
  oldPrice: string;
  newPrice: string;
}
