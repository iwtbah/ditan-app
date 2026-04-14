import { create } from 'zustand';
import type { SearchFilters, SearchTab } from '@/types';

const defaultFilters: SearchFilters = {
  keyword: '',
  tab: 'notes',
  sortBy: 'comprehensive',
};

const defaultHistory = ['咖啡馆', '下午茶', '精酿小酒馆', '露营'];

interface SearchState {
  filters: SearchFilters;
  submittedKeyword: string;
  history: string[];
  setKeyword: (keyword: string) => void;
  setTab: (tab: SearchTab) => void;
  submitSearch: (keyword?: string) => void;
  setFilters: (patch: Partial<SearchFilters>) => void;
  resetFilters: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  filters: defaultFilters,
  submittedKeyword: '',
  history: defaultHistory,
  setKeyword: (keyword) =>
    set((state) => ({
      filters: { ...state.filters, keyword },
    })),
  setTab: (tab) =>
    set((state) => ({
      filters: { ...state.filters, tab },
    })),
  submitSearch: (keyword) =>
    set((state) => {
      const nextKeyword = (keyword ?? state.filters.keyword).trim();

      if (!nextKeyword) {
        return state;
      }

      const nextHistory = [nextKeyword, ...state.history.filter((item) => item !== nextKeyword)].slice(0, 8);

      return {
        submittedKeyword: nextKeyword,
        history: nextHistory,
        filters: {
          ...state.filters,
          keyword: nextKeyword,
        },
      };
    }),
  setFilters: (patch) =>
    set((state) => ({
      filters: { ...state.filters, ...patch },
    })),
  resetFilters: () =>
    set({
      filters: defaultFilters,
      submittedKeyword: '',
      history: defaultHistory,
    }),
}));
