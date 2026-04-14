import type { NoteCard } from '@/types/note';
import type { ShopSummary } from '@/types/shop';

export type HomeContentType = 'notes' | 'shops';

export interface HomeNoteCard extends NoteCard {
  category: string;
}

export interface HomeShopCard extends ShopSummary {
  category: string;
  distance: string;
  priceText?: string;
  recommendation?: string;
  recommendedNoteTitle?: string;
}

export interface HomeDiscoveryPayload {
  city: string;
  categories: string[];
  notes: HomeNoteCard[];
  shops: HomeShopCard[];
}
