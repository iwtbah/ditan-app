import type { NoteCard } from '@/types/note';
import type { ShopSummary } from '@/types/shop';
import type { UserSummary } from '@/types/user';

export type SearchTab = 'all' | 'shops' | 'notes' | 'users';
export type SearchSort = 'comprehensive' | 'rating' | 'latest';

export interface SearchFilters {
  keyword: string;
  tab: SearchTab;
  district?: string;
  category?: string;
  sortBy?: SearchSort;
}

export interface SearchResult {
  shops: ShopSummary[];
  notes: NoteCard[];
  users: UserSummary[];
}
