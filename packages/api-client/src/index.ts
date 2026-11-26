export { createBrowserApiClient } from './clients/browser-client';
export type { BrowserApiClient } from './clients/browser-client';
export { createServerApiClient } from './clients/server-client';
export type { ServerApiClient, ServerRequestOptions } from './clients/server-client';
export { ApiClientError, normalizeApiError } from './errors/api-error';
export type { ApiErrorDetails } from './errors/api-error';
export type { ApiClientConfig, RequestOptions } from './types';
export { fetchGatewayHealth } from './endpoints/health';
export type { HealthStatus } from './endpoints/health';
