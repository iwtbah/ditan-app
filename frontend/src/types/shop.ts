export interface ShopCardData {
  distance: string;
  id: number;
  image: string;
  name: string;
  price: string;
  rating: string;
  recommendation: string;
  tags: string[];
}

export interface LinkedStoreData {
  id: number;
  image: string;
  name: string;
  rating: string;
  tags: string[];
}

export interface PublishStoreOption {
  city: string;
  name: string;
}

export interface StoreCoupon {
  id: number;
  newPrice: string;
  oldPrice: string;
  sales: string;
  title: string;
  type: string;
}

export interface StoreDetailData {
  address: string;
  distance: string;
  image: string;
  images: string[];
  name: string;
  price: string;
  rating: string;
  tags: string[];
  walkTime: string;
}

export interface StoreDish {
  id: number;
  image: string;
  name: string;
  reason: string;
}

export interface StoreReview {
  author: string;
  avatar: string;
  content: string;
  id: number;
  likes: number;
  rating: number;
}
