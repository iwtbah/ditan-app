/**
 * 认证域类型。
 * 初始化阶段先定义最小登录入参与登录态概要结构。
 */
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
