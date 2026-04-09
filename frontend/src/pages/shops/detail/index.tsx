import { useParams } from 'react-router-dom';
import { PageContainer } from '@/components/common/page-container';
import { ShopDetailSection } from '@/features/shops/components/shop-detail-section';
import { usePageTitle } from '@/hooks/use-page-title';

export function ShopDetailPage() {
  const { shopId = '' } = useParams();
  usePageTitle('店铺详情');

  return (
    <PageContainer>
      <ShopDetailSection shopId={shopId} />
    </PageContainer>
  );
}
