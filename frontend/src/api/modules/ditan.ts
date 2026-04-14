import { request } from '@/api/client';
import { ditanDiscoveryMock } from '@/mocks/ditan';
import type { DitanDiscoveryPayload } from '@/types';

const shouldUseDitanMock = import.meta.env.DEV && import.meta.env.VITE_DISABLE_DITAN_MOCK !== 'true';

export async function fetchDitanDiscovery() {
  try {
    return await request<DitanDiscoveryPayload>('/ditan/discovery');
  } catch (error) {
    if (shouldUseDitanMock) {
      return ditanDiscoveryMock;
    }

    throw error;
  }
}
