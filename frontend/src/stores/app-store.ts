/**
 * 应用级本地状态。
 * 这里只存放纯客户端 UI 状态，不承载任何远程接口数据。
 */
import { create } from 'zustand';

interface AppState {
  pageTitle: string;
  mobileNavOpen: boolean;
  globalLoading: boolean;
  setPageTitle: (title: string) => void;
  setMobileNavOpen: (open: boolean) => void;
  setGlobalLoading: (loading: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  pageTitle: '',
  mobileNavOpen: false,
  globalLoading: false,
  setPageTitle: (pageTitle) => set({ pageTitle }),
  setMobileNavOpen: (mobileNavOpen) => set({ mobileNavOpen }),
  setGlobalLoading: (globalLoading) => set({ globalLoading }),
}));
