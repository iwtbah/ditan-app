import { HomeDiscoverySection } from '@/features/home/components/home-discovery-section';
import { usePageTitle } from '@/hooks/use-page-title';

export function HomePage() {
  usePageTitle('首页');

  return <HomeDiscoverySection />;
}
