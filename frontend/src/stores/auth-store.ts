import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { SessionSummary } from '@/types';

interface AuthState {
  session: SessionSummary | null;
  setSession: (session: SessionSummary) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      session: null,
      setSession: (session) => set({ session }),
      clearSession: () => set({ session: null }),
    }),
    {
      name: 'ditan-auth-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
