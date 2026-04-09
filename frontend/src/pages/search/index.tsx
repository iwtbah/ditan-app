import { PageContainer } from '@/components/common/page-container';
import { SearchPanel } from '@/features/search/components/search-panel';
import { usePageTitle } from '@/hooks/use-page-title';

export function SearchPage() {
  usePageTitle('搜索');

  return (
    <PageContainer>
      <SearchPanel />
    </PageContainer>
  );
}
