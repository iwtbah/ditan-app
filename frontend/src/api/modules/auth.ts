import { request } from '@/api/client';
import type { LoginPayload, SessionSummary } from '@/types';

export function login(payload: LoginPayload) {
  return request<SessionSummary>('/auth/login', {
    method: 'POST',
    body: payload,
    withAuth: false,
  });
}

export function logout() {
  return request<void>('/auth/logout', {
    method: 'POST',
  });
}
