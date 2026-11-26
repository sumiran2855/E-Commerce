import type { Metadata } from 'next';
import { RemoteModuleLoader } from '@/components/remote-module-loader';

export const metadata: Metadata = {
  title: 'Catalog',
  description: 'Server-rendered catalog shell with federated product discovery modules.',
};

export default function CatalogPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-[var(--nc-text)]">Catalog</h1>
      <RemoteModuleLoader
        remotePath="catalog_remote/ProductFilters"
        fallbackTitle="Catalog filters unavailable"
      />
      <RemoteModuleLoader
        remotePath="catalog_remote/ProductGrid"
        fallbackTitle="Catalog grid unavailable"
      />
    </div>
  );
}
