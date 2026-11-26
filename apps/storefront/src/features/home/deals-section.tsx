import Link from 'next/link';
import { ArrowRight, Clock, Flame } from 'lucide-react';
import { Badge } from '@nextcommerce/ui';
import { ProductCard } from '@/components/product/product-card';
import type { Product } from '@/types/storefront';

export function DealsSection({ products }: { products: Product[] }) {
  return (
    <section
      aria-labelledby="todays-deals-heading"
      className="rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50/80 via-white to-amber-50/60 p-6 shadow-xs sm:p-8"
    >
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="inline-flex items-center gap-2.5">
            <Badge variant="danger" className="gap-1 px-2.5 py-1">
              <Flame className="h-3 w-3" /> Flash Deals
            </Badge>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600">
              <Clock className="h-3.5 w-3.5 text-amber-600" /> Refreshes at midnight IST
            </span>
          </div>
          <h2
            id="todays-deals-heading"
            className="mt-2 text-2xl font-bold tracking-tight text-slate-900"
          >
            Today&apos;s Deals
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Handpicked price drops with up to 42% off MRP
          </p>
        </div>

        <Link
          href="/products?sort=price-asc"
          className="inline-flex items-center gap-1 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-indigo-600"
        >
          See all deals <ArrowRight className="h-3.5 w-3.5" />
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
