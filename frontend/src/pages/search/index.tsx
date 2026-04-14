import { SearchPanel } from '@/features/search/components/search-panel';
import { usePageTitle } from '@/hooks/use-page-title';

export function SearchPage() {
  usePageTitle('搜索');

  return <SearchPanel />;
}
