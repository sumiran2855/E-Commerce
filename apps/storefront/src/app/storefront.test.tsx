import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AppProviders } from '@/providers/app-providers';
import { RemoteModuleLoader } from '@/components/remote-module-loader';

vi.mock('@module-federation/enhanced/runtime', () => ({
  createInstance: () => ({
    loadRemote: vi.fn().mockRejectedValue(new Error('Remote offline')),
  }),
}));

describe('Storefront architecture', () => {
  it('initializes AppProviders with QueryClientProvider and AuthProvider', () => {
    render(
      <AppProviders>
        <div>Storefront Ready</div>
      </AppProviders>,
    );
    expect(screen.getByText('Storefront Ready')).toBeInTheDocument();
  });

  it('renders fallback ErrorState when remote fails to load', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <RemoteModuleLoader
        remotePath="catalog_remote/ProductGrid"
        fallbackTitle="Catalog grid unavailable"
      />,
    );

    expect(await screen.findByText('Catalog grid unavailable')).toBeInTheDocument();
    consoleSpy.mockRestore();
  });
});
