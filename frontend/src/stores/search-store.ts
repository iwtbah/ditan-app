import { create } from 'zustand';
import type { SearchFilters, SearchTab } from '@/types';

const defaultFilters: SearchFilters = {
  keyword: '',
  tab: 'all',
  sortBy: 'comprehensive',
};

interface SearchState {
  filters: SearchFilters;
  setKeyword: (keyword: string) => void;
  setTab: (tab: SearchTab) => void;
  setFilters: (patch: Partial<SearchFilters>) => void;
  resetFilters: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  filters: defaultFilters,
  setKeyword: (keyword) =>
    set((state) => ({
      filters: { ...state.filters, keyword },
    })),
  setTab: (tab) =>
    set((state) => ({
      filters: { ...state.filters, tab },
    })),
  setFilters: (patch) =>
    set((state) => ({
      filters: { ...state.filters, ...patch },
    })),
  resetFilters: () => set({ filters: defaultFilters }),
}));
