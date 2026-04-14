import { MyProfileSection } from '@/features/me/components/my-profile-section';
import { usePageTitle } from '@/hooks/use-page-title';

export function MyPage() {
  usePageTitle('我的');

  return <MyProfileSection />;
}
