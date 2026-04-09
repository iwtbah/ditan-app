import { PageContainer } from '@/components/common/page-container';
import { MyDashboardSection } from '@/features/me/components/my-dashboard-section';
import { usePageTitle } from '@/hooks/use-page-title';

export function MyPage() {
  usePageTitle('我的');

  return (
    <PageContainer>
      <MyDashboardSection />
    </PageContainer>
  );
}
