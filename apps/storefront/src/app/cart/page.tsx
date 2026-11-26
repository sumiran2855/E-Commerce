'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Bookmark, Minus, Plus, ShieldCheck, ShoppingBag, Trash2 } from 'lucide-react';
import { Button, EmptyState, useToast } from '@nextcommerce/ui';
import { formatINR } from '@nextcommerce/utilities';
import { MOCK_PRODUCTS } from '@/data/mock-catalog';
import { useMarketplaceStore } from '@/store/marketplace-store';

export default function CartPage() {
  const router = useRouter();
  const { notify } = useToast();

  const cartItems = useMarketplaceStore((s) => s.cartItems);
  const savedForLaterIds = useMarketplaceStore((s) => s.savedForLaterIds);
  const updateCartQuantity = useMarketplaceStore((s) => s.updateCartQuantity);
  const removeFromCart = useMarketplaceStore((s) => s.removeFromCart);
  const saveForLater = useMarketplaceStore((s) => s.saveForLater);
  const moveToCartFromSaved = useMarketplaceStore((s) => s.moveToCartFromSaved);

  const detailedItems = cartItems
    .map((item) => {
      const product = MOCK_PRODUCTS.find((p) => p.id === item.productId);
      return product ? { ...item, product } : null;
    })
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  const savedProducts = savedForLaterIds
    .map((id) => MOCK_PRODUCTS.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const totalMrp = detailedItems.reduce(
    (sum, item) => sum + item.product.originalPriceInPaise * item.quantity,
    0,
  );
  const subtotal = detailedItems.reduce(
    (sum, item) => sum + item.product.priceInPaise * item.quantity,
    0,
  );
  const discount = Math.max(0, totalMrp - subtotal);
  const deliveryCharge = subtotal >= 49900 || subtotal === 0 ? 0 : 4900;
  const totalAmount = subtotal + deliveryCharge;

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--nc-border)] pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--nc-text)] sm:text-3xl">
            Shopping Cart
          </h1>
          <p className="mt-1 text-sm text-[var(--nc-text-secondary)]">
            {detailedItems.reduce((sum, item) => sum + item.quantity, 0)} item(s) in your bag
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>

      {detailedItems.length === 0 ? (
        <EmptyState
          title="Your shopping cart is empty"
          description="Looks like you haven't added anything yet. Explore today's deals and top brands."
          action={
            <Button asChild>
              <Link href="/products">
                <ShoppingBag className="h-4 w-4" /> Start Shopping
              </Link>
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Cart Items */}
          <div className="space-y-4 lg:col-span-8">
            {detailedItems.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex flex-col gap-4 rounded-xl border border-[var(--nc-border)] bg-[var(--nc-bg)] p-4 sm:flex-row sm:items-center"
              >
                <Link
                  href={`/product/${product.slug}`}
                  className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-[var(--nc-bg-secondary)]"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={96}
                    height={96}
                    className="h-full w-full object-cover"
                  />
                </Link>

                <div className="min-w-0 flex-1 space-y-1">
                  <p className="text-xs font-semibold uppercase text-[var(--nc-text-muted)]">
                    {product.brand}
                  </p>
                  <Link
                    href={`/product/${product.slug}`}
                    className="line-clamp-1 text-base font-semibold text-[var(--nc-text)] hover:text-[var(--nc-primary)]"
                  >
                    {product.name}
                  </Link>
                  <p className="text-xs text-[var(--nc-text-muted)]">
                    Sold by {product.sellerName}
                  </p>

                  <div className="flex flex-wrap items-baseline gap-2 pt-1">
                    <span className="text-base font-bold text-[var(--nc-text)]">
                      {formatINR(product.priceInPaise * quantity)}
                    </span>
                    <span className="text-xs text-[var(--nc-text-muted)] line-through">
                      {formatINR(product.originalPriceInPaise * quantity)}
                    </span>
                    <span className="text-xs font-semibold text-[var(--nc-success)]">
                      {product.discountPercent}% off
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 sm:flex-col sm:items-end">
                  <div className="inline-flex items-center rounded-lg border border-[var(--nc-border)]">
                    <button
                      type="button"
                      aria-label={`Decrease quantity of ${product.name}`}
                      onClick={() => updateCartQuantity(product.id, quantity - 1)}
                      className="flex h-8 w-8 items-center justify-center hover:bg-[var(--nc-bg-secondary)]"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-semibold">{quantity}</span>
                    <button
                      type="button"
                      aria-label={`Increase quantity of ${product.name}`}
                      onClick={() => updateCartQuantity(product.id, quantity + 1)}
                      className="flex h-8 w-8 items-center justify-center hover:bg-[var(--nc-bg-secondary)]"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <button
                      type="button"
                      onClick={() => {
                        saveForLater(product.id);
                        notify({ title: 'Saved for later', description: product.name });
                      }}
                      className="inline-flex items-center gap-1 font-medium text-[var(--nc-text-secondary)] hover:text-[var(--nc-primary)]"
                    >
                      <Bookmark className="h-3.5 w-3.5" /> Save
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        removeFromCart(product.id);
                        notify({ title: 'Removed from cart', description: product.name });
                      }}
                      className="inline-flex items-center gap-1 font-medium text-[var(--nc-danger)] hover:underline"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Price Summary */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 rounded-xl border border-[var(--nc-border)] bg-[var(--nc-bg)] p-6 shadow-xs">
              <h2 className="text-base font-bold text-[var(--nc-text)]">Price Breakdown</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-[var(--nc-text-secondary)]">Total MRP</dt>
                  <dd className="font-medium text-[var(--nc-text)]">{formatINR(totalMrp)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[var(--nc-text-secondary)]">Product Discount</dt>
                  <dd className="font-medium text-[var(--nc-success)]">−{formatINR(discount)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[var(--nc-text-secondary)]">Delivery Charges</dt>
                  <dd className="font-medium text-[var(--nc-text)]">
                    {deliveryCharge === 0 ? (
                      <span className="text-[var(--nc-success)]">FREE</span>
                    ) : (
                      formatINR(deliveryCharge)
                    )}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-[var(--nc-border)] pt-3 text-base font-bold text-[var(--nc-text)]">
                  <dt>Total Amount</dt>
                  <dd>{formatINR(totalAmount)}</dd>
                </div>
              </dl>

              {discount > 0 ? (
                <p className="mt-3 rounded-lg bg-green-50 px-3 py-2 text-xs font-medium text-[var(--nc-success)]">
                  You save {formatINR(discount)} on this order!
                </p>
              ) : null}

              <Button size="lg" className="mt-5 w-full" onClick={() => router.push('/checkout')}>
                Proceed to Checkout
              </Button>

              <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-[var(--nc-text-muted)]">
                <ShieldCheck className="h-4 w-4 text-[var(--nc-success)]" />
                <span>Safe &amp; Secure Payments · 100% Authentic</span>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* Saved for Later */}
      {savedProducts.length > 0 ? (
        <section className="space-y-4 border-t border-[var(--nc-border)] pt-8">
          <h2 className="text-lg font-bold text-[var(--nc-text)]">
            Saved for Later ({savedProducts.length})
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {savedProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 rounded-xl border border-[var(--nc-border)] p-4"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded-lg object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-[var(--nc-text)]">
                    {product.name}
                  </p>
                  <p className="text-xs font-bold text-[var(--nc-text)]">
                    {formatINR(product.priceInPaise)}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 h-7 text-xs"
                    onClick={() => {
                      moveToCartFromSaved(product.id);
                      notify({ title: 'Moved to cart', description: product.name });
                    }}
                  >
                    Move to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
