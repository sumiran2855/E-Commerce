import { describe, expect, it } from 'vitest';
import { ApiClientError, createBrowserApiClient, normalizeApiError } from './index';

describe('api-client', () => {
  it('creates a browser API client with withCredentials enabled', () => {
    const client = createBrowserApiClient({ baseUrl: '/api/v1' });
    expect(client.raw.defaults.withCredentials).toBe(true);
    expect(client.raw.defaults.baseURL).toBe('/api/v1');
  });

  it('normalizes unknown errors into ApiClientError', () => {
    const err = normalizeApiError(new Error('Network timeout'));
    expect(err).toBeInstanceOf(ApiClientError);
    expect(err.statusCode).toBe(500);
    expect(err.message).toBe('Network timeout');
  });
});
