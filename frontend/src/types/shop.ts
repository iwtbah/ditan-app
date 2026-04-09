export interface ShopTag {
  id: string;
  label: string;
}

export interface ShopSummary {
  id: string;
  name: string;
  category: string;
  district: string;
  rating: number;
  averagePrice?: number;
  coverUrl?: string;
  tags: ShopTag[];
}

export interface ShopDetail extends ShopSummary {
  address: string;
  phone?: string;
  businessHours?: string;
  noteCount: number;
  commentCount: number;
  photoUrls: string[];
  liked?: boolean;
}
