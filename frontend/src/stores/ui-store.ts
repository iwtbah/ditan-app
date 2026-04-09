import { create } from 'zustand';

interface UiState {
  pageTitle: string;
  mobileNavOpen: boolean;
  setPageTitle: (title: string) => void;
  setMobileNavOpen: (open: boolean) => void;
}

export const useUiStore = create<UiState>((set) => ({
  pageTitle: '',
  mobileNavOpen: false,
  setPageTitle: (pageTitle) => set({ pageTitle }),
  setMobileNavOpen: (mobileNavOpen) => set({ mobileNavOpen }),
}));
