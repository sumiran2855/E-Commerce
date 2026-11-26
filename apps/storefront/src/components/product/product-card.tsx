'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Badge, Button, useToast } from '@nextcommerce/ui';
import { cn, formatINR } from '@nextcommerce/utilities';
import { useMarketplaceStore } from '@/store/marketplace-store';
import type { Product } from '@/types/storefront';

export interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

const BADGE_VARIANTS = {
  'Best Seller': 'primary',
  'New Arrival': 'success',
  'Limited Offer': 'danger',
  Trending: 'warning',
} as const;

export function ProductCard({ product, compact = false }: ProductCardProps) {
  const { notify } = useToast();
  const addToCart = useMarketplaceStore((s) => s.addToCart);
  const toggleWishlist = useMarketplaceStore((s) => s.toggleWishlist);
  const wishlistIds = useMarketplaceStore((s) => s.wishlistIds);
  const isWishlisted = wishlistIds.includes(product.id);

  function handleAddToCart() {
    addToCart(product.id, 1);
    notify({
      title: 'Added to cart',
      description: `${product.name} has been added to your shopping cart.`,
    });
  }

  function handleWishlistToggle() {
    const added = toggleWishlist(product.id);
    notify({
      title: added ? 'Saved to wishlist' : 'Removed from wishlist',
      description: product.name,
    });
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl">
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <Link href={`/product/${product.slug}`} className="block h-full w-full">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {product.badge ? (
          <Badge
            variant={BADGE_VARIANTS[product.badge]}
            className="absolute left-3 top-3 shadow-sm"
          >
            {product.badge}
          </Badge>
        ) : null}

        <button
          type="button"
          onClick={handleWishlistToggle}
          aria-label={
            isWishlisted
              ? `Remove ${product.name} from wishlist`
              : `Add ${product.name} to wishlist`
          }
          aria-pressed={isWishlisted}
          className={cn(
            'absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/60 bg-white/90 shadow-sm backdrop-blur-xs transition-all hover:scale-105 hover:bg-white',
            isWishlisted ? 'text-rose-600' : 'text-slate-600',
          )}
        >
          <Heart className={cn('h-4 w-4', isWishlisted && 'fill-current')} />
        </button>
      </div>

      <div className={cn('flex flex-1 flex-col justify-between p-4', compact && 'p-3.5')}>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-indigo-600">
            {product.brand}
          </p>
          <Link
            href={`/product/${product.slug}`}
            className="mt-1 line-clamp-2 text-sm font-semibold text-slate-900 transition-colors hover:text-indigo-600"
          >
            {product.name}
          </Link>

          <div className="mt-2 flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-1.5 py-0.5 text-xs font-bold text-emerald-700">
              {product.rating.toFixed(1)}
              <Star className="h-3 w-3 fill-current" aria-hidden="true" />
            </span>
            <span className="text-xs text-slate-500">
              ({product.reviewCount.toLocaleString('en-IN')})
            </span>
          </div>
        </div>

        <div className="mt-3.5 space-y-3">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-base font-extrabold text-slate-900">
              {formatINR(product.priceInPaise)}
            </span>
            <span className="text-xs text-slate-400 line-through">
              {formatINR(product.originalPriceInPaise)}
            </span>
            <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[11px] font-bold text-emerald-700">
              {product.discountPercent}% OFF
            </span>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="h-9 w-full rounded-xl border-slate-200 font-semibold text-slate-800 transition-all hover:border-indigo-600 hover:bg-indigo-600 hover:text-white"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>
      </div>
    </article>
  );
}
