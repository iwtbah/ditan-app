import { DitanCardStack } from '@/features/ditan/components/ditan-card-stack';
import { usePageTitle } from '@/hooks/use-page-title';

export function DitanPage() {
  usePageTitle('迪探');

  return <DitanCardStack />;
}
