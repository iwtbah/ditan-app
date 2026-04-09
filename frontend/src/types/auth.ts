import type { UserSummary } from '@/types/user';

export interface LoginPayload {
  mobile: string;
  verifyCode: string;
}

export interface SessionSummary {
  accessToken: string;
  refreshToken?: string;
  currentUser: UserSummary;
}
