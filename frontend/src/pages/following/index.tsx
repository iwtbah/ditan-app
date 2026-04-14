import { FollowingFeedSection } from '@/features/following/components/following-feed-section';
import { usePageTitle } from '@/hooks/use-page-title';

export function FollowingPage() {
  usePageTitle('关注');

  return <FollowingFeedSection />;
}
