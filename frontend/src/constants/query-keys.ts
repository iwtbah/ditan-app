import type { SearchFilters } from '@/types';

export const queryKeys = {
  ditan: {
    discovery: ['ditan', 'discovery'] as const,
  },
  home: {
    discovery: ['home', 'discovery'] as const,
    feed: ['home', 'feed'] as const,
  },
  social: {
    following: ['social', 'following'] as const,
    myProfileView: ['social', 'my-profile-view'] as const,
  },
  shops: {
    detail: (shopId: string) => ['shops', 'detail', shopId] as const,
    notes: (shopId: string) => ['shops', 'notes', shopId] as const,
  },
  notes: {
    detail: (noteId: string) => ['notes', 'detail', noteId] as const,
  },
  users: {
    profile: (userId: string) => ['users', 'profile', userId] as const,
  },
  search: {
    results: (filters: SearchFilters) => ['search', 'results', filters] as const,
  },
} as const;
