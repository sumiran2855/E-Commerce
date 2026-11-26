'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Button, EmptyState, useToast } from '@nextcommerce/ui';
import { formatINR } from '@nextcommerce/utilities';
import { MOCK_PRODUCTS } from '@/data/mock-catalog';
import { useMarketplaceStore } from '@/store/marketplace-store';

export default function WishlistPage() {
  const { notify } = useToast();
  const wishlistIds = useMarketplaceStore((s) => s.wishlistIds);
  const removeFromWishlist = useMarketplaceStore((s) => s.removeFromWishlist);
  const addToCart = useMarketplaceStore((s) => s.addToCart);

  const products = wishlistIds
    .map((id) => MOCK_PRODUCTS.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  function handleMoveToCart(productId: string, name: string) {
    addToCart(productId, 1);
    removeFromWishlist(productId);
    notify({
      title: 'Moved to cart',
      description: `${name} is now in your shopping cart.`,
    });
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--nc-border)] pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--nc-text)] sm:text-3xl">
            My Wishlist
          </h1>
          <p className="mt-1 text-sm text-[var(--nc-text-secondary)]">
            {products.length} saved item(s)
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/products">Explore More Products</Link>
        </Button>
      </div>

      {products.length === 0 ? (
        <EmptyState
          title="Your wishlist is empty"
          description="Save items you love while browsing to compare prices and buy later."
          action={
            <Button asChild>
              <Link href="/products">
                <Heart className="h-4 w-4" /> Browse Products
              </Link>
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col justify-between overflow-hidden rounded-xl border border-[var(--nc-border)] bg-[var(--nc-bg)]"
            >
              <div>
                <Link
                  href={`/product/${product.slug}`}
                  className="block aspect-square bg-[var(--nc-bg-secondary)]"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="h-full w-full object-cover"
                  />
                </Link>
                <div className="p-4">
                  <p className="text-xs font-semibold uppercase text-[var(--nc-text-muted)]">
                    {product.brand}
                  </p>
                  <Link
                    href={`/product/${product.slug}`}
                    className="mt-1 line-clamp-2 text-sm font-semibold text-[var(--nc-text)] hover:text-[var(--nc-primary)]"
                  >
                    {product.name}
                  </Link>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-base font-bold text-[var(--nc-text)]">
                      {formatINR(product.priceInPaise)}
                    </span>
                    <span className="text-xs text-[var(--nc-text-muted)] line-through">
                      {formatINR(product.originalPriceInPaise)}
                    </span>
                    <span className="text-xs font-semibold text-[var(--nc-success)]">
                      {product.discountPercent}% off
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 border-t border-[var(--nc-border)] p-3">
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() => handleMoveToCart(product.id, product.name)}
                >
                  <ShoppingCart className="h-3.5 w-3.5" /> Move to Cart
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label={`Remove ${product.name} from wishlist`}
                  onClick={() => {
                    removeFromWishlist(product.id);
                    notify({ title: 'Removed from wishlist', description: product.name });
                  }}
                >
                  <Trash2 className="h-4 w-4 text-[var(--nc-danger)]" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
