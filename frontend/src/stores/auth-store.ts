import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { AuthUserProfile } from '@/types/user';

const AUTH_STORAGE_KEY = 'ditan-auth';

type LoginWithPhoneCodePayload = {
  phone: string;
};

type AuthStoreState = {
  isHydrated: boolean;
  isLogin: boolean;
  redirectAfterLogin: string | null;
  token: string | null;
  userInfo: AuthUserProfile | null;
  clearRedirectAfterLogin: () => void;
  loginWithPhoneCode: (payload: LoginWithPhoneCodePayload) => void;
  logout: () => void;
  markHydrated: () => void;
  setRedirectAfterLogin: (redirectAfterLogin: string | null) => void;
};

function createMockAvatar(name: string) {
  const label = name.slice(-2);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96" fill="none">
      <rect width="96" height="96" rx="28" fill="#E8ECEB" />
      <circle cx="48" cy="36" r="18" fill="#C7D0CD" />
      <path d="M22 78c3.8-15.3 16.1-23 26-23s22.2 7.7 26 23" fill="#4A5D5A" opacity="0.92" />
      <text x="48" y="55" text-anchor="middle" font-size="20" font-weight="700" fill="#4A5D5A">${label}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function createMockUserInfo(phone: string): AuthUserProfile {
  const suffix = phone.slice(-4);
  const name = `迪探用户${suffix}`;

  return {
    id: `mock-user-${suffix}`,
    avatar: createMockAvatar(name),
    name,
    phone,
  };
}

function createMockToken(phone: string) {
  return `mock_token_${phone}_${Date.now()}`;
}

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set) => ({
      isHydrated: false,
      isLogin: false,
      redirectAfterLogin: null,
      token: null,
      userInfo: null,
      clearRedirectAfterLogin: () => set({ redirectAfterLogin: null }),
      loginWithPhoneCode: ({ phone }) => {
        // TODO: 后续接入真实验证码登录接口时，用服务端返回的 token / userInfo 替换这里的 mock 数据。
        set({
          isLogin: true,
          redirectAfterLogin: null,
          token: createMockToken(phone),
          userInfo: createMockUserInfo(phone),
        });
      },
      logout: () =>
        set({
          isLogin: false,
          redirectAfterLogin: null,
          token: null,
          userInfo: null,
        }),
      markHydrated: () => set({ isHydrated: true }),
      setRedirectAfterLogin: (redirectAfterLogin) => set({ redirectAfterLogin }),
    }),
    {
      name: AUTH_STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isLogin: state.isLogin,
        token: state.token,
        userInfo: state.userInfo,
      }),
      onRehydrateStorage: () => (state) => {
        state?.markHydrated();
      },
    },
  ),
);
