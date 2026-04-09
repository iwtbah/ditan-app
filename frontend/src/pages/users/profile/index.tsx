import { useParams } from 'react-router-dom';
import { PageContainer } from '@/components/common/page-container';
import { UserProfileSection } from '@/features/users/components/user-profile-section';
import { usePageTitle } from '@/hooks/use-page-title';

export function UserProfilePage() {
  const { userId = '' } = useParams();
  usePageTitle('用户主页');

  return (
    <PageContainer>
      <UserProfileSection userId={userId} />
    </PageContainer>
  );
}
