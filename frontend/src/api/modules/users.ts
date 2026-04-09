import { request } from '@/api/client';
import type { UserProfile } from '@/types';

export function fetchUserProfile(userId: string) {
  return request<UserProfile>(`/users/${userId}`);
}
