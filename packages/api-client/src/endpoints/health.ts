import type { ApiResponse } from '@nextcommerce/shared-types';
import type { BrowserApiClient } from '../clients/browser-client';

export interface HealthStatus {
  status: 'ok' | 'degraded';
  service: string;
  timestamp: string;
}

export async function fetchGatewayHealth(
  client: BrowserApiClient,
): Promise<ApiResponse<HealthStatus>> {
  return client.get<ApiResponse<HealthStatus>>('/health');
}
