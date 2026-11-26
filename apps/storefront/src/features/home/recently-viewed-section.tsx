'use client';

import { ProductCard } from '@/components/product/product-card';
import { MOCK_PRODUCTS } from '@/data/mock-catalog';
import { useMarketplaceStore } from '@/store/marketplace-store';

export function RecentlyViewedSection() {
  const recentlyViewedIds = useMarketplaceStore((s) => s.recentlyViewedIds);
  const products = recentlyViewedIds
    .map((id) => MOCK_PRODUCTS.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .slice(0, 4);

  if (products.length === 0) return null;

  return (
    <section aria-labelledby="recently-viewed-heading" className="space-y-5">
      <div>
        <h2
          id="recently-viewed-heading"
          className="text-2xl font-bold tracking-tight text-[var(--nc-text)]"
        >
          Recently Viewed
        </h2>
        <p className="mt-1 text-sm text-[var(--nc-text-secondary)]">
          Pick up right where you left off
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} compact />
        ))}
      </div>
    </section>
  );
}
