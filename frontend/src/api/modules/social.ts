import { request } from '@/api/client';
import { followingFeedMock, myProfileViewMock } from '@/mocks/social';
import type { FollowingFeedPayload, MyProfileView } from '@/types';

const shouldUseSocialMock = import.meta.env.DEV && import.meta.env.VITE_DISABLE_SOCIAL_MOCK !== 'true';

export async function fetchFollowingFeed() {
  try {
    return await request<FollowingFeedPayload>('/social/following');
  } catch (error) {
    if (shouldUseSocialMock) {
      return followingFeedMock;
    }

    throw error;
  }
}

export async function fetchMyProfileView() {
  try {
    return await request<MyProfileView>('/users/me/profile-view');
  } catch (error) {
    if (shouldUseSocialMock) {
      return myProfileViewMock;
    }

    throw error;
  }
}
