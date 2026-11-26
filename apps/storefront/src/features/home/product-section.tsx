import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/product/product-card';
import type { Product } from '@/types/storefront';

export interface ProductSectionProps {
  id: string;
  title: string;
  subtitle: string;
  products: Product[];
  viewAllHref?: string;
}

export function ProductSection({
  id,
  title,
  subtitle,
  products,
  viewAllHref = '/products',
}: ProductSectionProps) {
  return (
    <section aria-labelledby={id} className="space-y-5">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 id={id} className="text-2xl font-bold tracking-tight text-[var(--nc-text)]">
            {title}
          </h2>
          <p className="mt-1 text-sm text-[var(--nc-text-secondary)]">{subtitle}</p>
        </div>
        <Link
          href={viewAllHref}
          className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-[var(--nc-primary)] hover:underline"
        >
          Explore <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
