import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@nextcommerce/ui';
import { FEATURED_BRANDS } from '@/constants/storefront';

export function FeaturedBrandsSection() {
  return (
    <section aria-labelledby="brands-heading" className="space-y-5">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2
            id="brands-heading"
            className="text-2xl font-bold tracking-tight text-[var(--nc-text)]"
          >
            Featured Brands
          </h2>
          <p className="mt-1 text-sm text-[var(--nc-text-secondary)]">
            Direct from authorized brand stores on DMarket
          </p>
        </div>
        <Link
          href="/products"
          className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--nc-primary)] hover:underline"
        >
          All brands <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {FEATURED_BRANDS.map((brand) => (
          <Link
            key={brand.id}
            href={`/category/${brand.categorySlug}`}
            className="group flex flex-col justify-between rounded-xl border border-[var(--nc-border)] bg-[var(--nc-bg)] p-4 transition-all hover:border-[var(--nc-primary)] hover:shadow-sm"
          >
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--nc-bg-secondary)] text-sm font-bold text-[var(--nc-primary)]">
                {brand.name.slice(0, 2).toUpperCase()}
              </div>
              <h3 className="mt-3 text-sm font-bold text-[var(--nc-text)] group-hover:text-[var(--nc-primary)]">
                {brand.name}
              </h3>
              <p className="mt-0.5 text-xs text-[var(--nc-text-muted)]">{brand.tagline}</p>
            </div>
            <Badge variant="primary" className="mt-3 w-fit text-[11px]">
              {brand.discountText}
            </Badge>
          </Link>
        ))}
      </div>
    </section>
  );
}
