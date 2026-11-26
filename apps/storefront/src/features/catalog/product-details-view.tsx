'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Heart,
  MapPin,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  Star,
  Store,
  Tag,
  Truck,
  ZoomIn,
} from 'lucide-react';
import { Badge, Button, Input, useToast } from '@nextcommerce/ui';
import { cn, formatINR } from '@nextcommerce/utilities';
import { ProductCard } from '@/components/product/product-card';
import { pincodeSchema } from '@/schemas/auth.schema';
import { checkDeliveryPincode } from '@/services/catalog.service';
import { useMarketplaceStore } from '@/store/marketplace-store';
import type { Product } from '@/types/storefront';

export interface ProductDetailsViewProps {
  product: Product;
  relatedProducts: Product[];
}

const EDITION_OPTIONS = ['Standard Edition', 'Matte Midnight', 'Silver Mist'] as const;

export function ProductDetailsView({ product, relatedProducts }: ProductDetailsViewProps) {
  const router = useRouter();
  const { notify } = useToast();
  const prefersReducedMotion = useReducedMotion();

  const addToCart = useMarketplaceStore((s) => s.addToCart);
  const toggleWishlist = useMarketplaceStore((s) => s.toggleWishlist);
  const wishlistIds = useMarketplaceStore((s) => s.wishlistIds);
  const recordProductView = useMarketplaceStore((s) => s.recordProductView);

  const isWishlisted = wishlistIds.includes(product.id);
  const images = product.gallery.length > 0 ? product.gallery : [product.image];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [selectedEdition, setSelectedEdition] = useState<string>(EDITION_OPTIONS[0]);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('560001');
  const [pincodeResult, setPincodeResult] = useState<{
    serviceable: boolean;
    codAvailable: boolean;
    etaText: string;
  } | null>(null);
  const [pincodeError, setPincodeError] = useState<string | null>(null);
  const [checkingPincode, setCheckingPincode] = useState(false);

  const selectedImage = images[activeImageIndex] ?? product.image;
  const savingsInPaise = Math.max(0, product.originalPriceInPaise - product.priceInPaise);

  useEffect(() => {
    recordProductView(product.id);
  }, [product.id, recordProductView]);

  function handleAddToCart() {
    addToCart(product.id, quantity);
    notify({
      title: 'Added to cart',
      description: `${quantity} × ${product.name} (${selectedEdition}) added to your cart.`,
    });
  }

  function handleBuyNow() {
    addToCart(product.id, quantity);
    router.push('/cart');
  }

  function handleWishlist() {
    const added = toggleWishlist(product.id);
    notify({
      title: added ? 'Saved to wishlist' : 'Removed from wishlist',
      description: product.name,
    });
  }

  async function handleCheckPincode(e: React.FormEvent) {
    e.preventDefault();
    const parsed = pincodeSchema.safeParse({ pincode });
    if (!parsed.success) {
      setPincodeError(parsed.error.issues[0]?.message ?? 'Invalid PIN code');
      return;
    }
    setPincodeError(null);
    setCheckingPincode(true);
    const res = await checkDeliveryPincode(parsed.data.pincode);
    setCheckingPincode(false);
    setPincodeResult(res);
  }

  return (
    <div className="mx-auto max-w-7xl space-y-14 px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-2 text-xs text-slate-500"
      >
        <Link href="/" className="hover:text-indigo-600">
          Home
        </Link>
        <span>/</span>
        <Link href={`/category/${product.categorySlug}`} className="hover:text-indigo-600">
          {product.categoryName}
        </Link>
        <span>/</span>
        <span className="truncate font-semibold text-slate-900">{product.name}</span>
      </nav>

      {/* Main Product Split */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* Sticky Multi-Image Gallery */}
        <div className="lg:col-span-6">
          <div className="space-y-4 lg:sticky lg:top-24">
            <div className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-100 shadow-lg shadow-slate-900/5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={prefersReducedMotion ? false : { opacity: 0.35, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={prefersReducedMotion ? undefined : { opacity: 0.35 }}
                  transition={{ duration: 0.2 }}
                  className="relative aspect-square overflow-hidden"
                >
                  <Image
                    src={selectedImage}
                    alt={`${product.name} - view ${activeImageIndex + 1}`}
                    width={700}
                    height={700}
                    priority
                    onClick={() => setZoomed((z) => !z)}
                    className={cn(
                      'h-full w-full cursor-zoom-in object-cover transition-transform duration-300',
                      zoomed ? 'scale-125 cursor-zoom-out' : 'group-hover:scale-105',
                    )}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Top Overlay Pills */}
              <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2">
                {product.badge ? (
                  <Badge variant="primary" className="shadow-sm">
                    {product.badge}
                  </Badge>
                ) : null}
                <span className="rounded-full bg-slate-900/75 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-xs">
                  {activeImageIndex + 1} / {images.length}
                </span>
              </div>

              {/* Zoom Toggle Button */}
              <button
                type="button"
                aria-label={zoomed ? 'Reset zoom' : 'Zoom product image'}
                onClick={() => setZoomed((z) => !z)}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/50 bg-white/90 text-slate-700 shadow-sm backdrop-blur-xs transition-transform hover:scale-105"
              >
                <ZoomIn className="h-4 w-4" />
              </button>

              {/* Prev / Next Gallery Arrows */}
              {images.length > 1 ? (
                <>
                  <button
                    type="button"
                    aria-label="Previous product image"
                    onClick={() => {
                      setZoomed(false);
                      setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
                    }}
                    className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white/90 text-slate-800 shadow-md backdrop-blur-xs transition-all hover:scale-105 hover:bg-white"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next product image"
                    onClick={() => {
                      setZoomed(false);
                      setActiveImageIndex((prev) => (prev + 1) % images.length);
                    }}
                    className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white/90 text-slate-800 shadow-md backdrop-blur-xs transition-all hover:scale-105 hover:bg-white"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </>
              ) : null}
            </div>

            {/* Thumbnail Strip */}
            <div className="grid grid-cols-4 gap-3">
              {images.map((img, idx) => {
                const active = idx === activeImageIndex;
                return (
                  <button
                    key={`${img}-${idx}`}
                    type="button"
                    onClick={() => {
                      setZoomed(false);
                      setActiveImageIndex(idx);
                    }}
                    aria-label={`View product image ${idx + 1}`}
                    aria-pressed={active}
                    className={cn(
                      'group relative overflow-hidden rounded-2xl border-2 bg-slate-100 transition-all duration-200',
                      active
                        ? 'border-indigo-600 ring-4 ring-indigo-500/15 shadow-md'
                        : 'border-slate-200 opacity-80 hover:-translate-y-0.5 hover:border-indigo-300 hover:opacity-100',
                    )}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      width={160}
                      height={160}
                      className="aspect-square w-full object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6 lg:col-span-6">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-indigo-700">
                {product.brand}
              </span>
              <Badge variant={product.inStock ? 'success' : 'danger'}>
                {product.inStock ? `In Stock (${product.stockCount} left)` : 'Out of Stock'}
              </Badge>
            </div>

            <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              {product.name}
            </h1>

            <div className="mt-3 flex items-center gap-3">
              <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1 text-sm font-bold text-emerald-700">
                {product.rating.toFixed(1)}
                <Star className="h-3.5 w-3.5 fill-current" />
              </span>
              <span className="text-sm font-medium text-slate-600">
                {product.reviewCount.toLocaleString('en-IN')} verified ratings
              </span>
            </div>
          </div>

          {/* Pricing Card */}
          <div className="rounded-2xl border border-indigo-100 bg-gradient-to-br from-slate-50 via-indigo-50/40 to-white p-5 shadow-xs">
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="text-3xl font-black text-slate-900">
                {formatINR(product.priceInPaise)}
              </span>
              <span className="text-base text-slate-400 line-through">
                {formatINR(product.originalPriceInPaise)}
              </span>
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                {product.discountPercent}% OFF · Save {formatINR(savingsInPaise)}
              </span>
            </div>
            <p className="mt-1.5 text-xs text-slate-500">
              Inclusive of all taxes (GST) · No-cost EMI options available
            </p>
          </div>

          <p className="text-sm leading-relaxed text-slate-600">{product.description}</p>

          {/* Edition / Finish Selector */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Select Variant: <span className="text-slate-900">{selectedEdition}</span>
            </span>
            <div className="flex flex-wrap gap-2">
              {EDITION_OPTIONS.map((edition) => (
                <button
                  key={edition}
                  type="button"
                  onClick={() => setSelectedEdition(edition)}
                  className={cn(
                    'rounded-xl border px-3.5 py-2 text-xs font-semibold transition-all',
                    selectedEdition === edition
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-xs'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300',
                  )}
                >
                  {edition}
                </button>
              ))}
            </div>
          </div>

          {/* Offers */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Available Bank &amp; Store Offers
            </h2>
            <ul className="space-y-2">
              {product.offers.map((offer) => (
                <li key={offer} className="flex items-start gap-2 text-xs text-slate-700">
                  <Tag className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" />
                  <span>{offer}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quantity + Actions */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-slate-800">Quantity:</span>
              <div className="inline-flex items-center rounded-xl border border-slate-200 bg-white">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-9 w-9 items-center justify-center text-slate-700 hover:bg-slate-50"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center text-sm font-bold text-slate-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  className="flex h-9 w-9 items-center justify-center text-slate-700 hover:bg-slate-50"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                className="h-12 flex-1 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 font-bold shadow-md shadow-indigo-500/20 transition-all hover:scale-[1.01] hover:opacity-95"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="h-4 w-4" /> Add to Cart
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="h-12 flex-1 rounded-xl border-slate-300 bg-slate-900 font-bold text-white hover:bg-slate-800"
                onClick={handleBuyNow}
                disabled={!product.inStock}
              >
                Buy Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                onClick={handleWishlist}
                className={cn(
                  'h-12 rounded-xl',
                  isWishlisted && 'border-rose-500 bg-rose-50 text-rose-600',
                )}
              >
                <Heart className={cn('h-4 w-4', isWishlisted && 'fill-current')} />
              </Button>
            </div>
          </div>

          {/* Trust Assurance Strip */}
          <div className="grid grid-cols-3 gap-2 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3 text-center text-[11px] font-medium text-slate-600">
            <div className="flex flex-col items-center gap-1">
              <Truck className="h-4 w-4 text-indigo-600" />
              <span>Free Delivery</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <RotateCcw className="h-4 w-4 text-indigo-600" />
              <span>7-Day Returns</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Verified Warranty</span>
            </div>
          </div>

          {/* Delivery PIN Code Checker */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-4">
            <form
              onSubmit={handleCheckPincode}
              className="flex flex-col gap-2 sm:flex-row sm:items-center"
            >
              <label
                htmlFor="pincode-input"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-800"
              >
                <MapPin className="h-4 w-4 text-indigo-600" /> Delivery Check:
              </label>
              <div className="flex flex-1 gap-2">
                <Input
                  id="pincode-input"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  maxLength={6}
                  placeholder="Enter 6-digit PIN"
                  className="h-9 max-w-[160px]"
                />
                <Button type="submit" variant="outline" size="sm" disabled={checkingPincode}>
                  {checkingPincode ? 'Checking...' : 'Check'}
                </Button>
              </div>
            </form>
            {pincodeError ? <p className="mt-2 text-xs text-rose-600">{pincodeError}</p> : null}
            {pincodeResult ? (
              <div className="mt-2.5 flex flex-wrap items-center gap-3 text-xs">
                <span
                  className={cn(
                    'inline-flex items-center gap-1 font-medium',
                    pincodeResult.serviceable ? 'text-emerald-700' : 'text-rose-600',
                  )}
                >
                  <Truck className="h-3.5 w-3.5" /> {pincodeResult.etaText}
                </span>
                {pincodeResult.codAvailable ? (
                  <span className="text-slate-500">· Cash on Delivery available</span>
                ) : null}
              </div>
            ) : null}
          </div>

          {/* Seller Info */}
          <div className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-slate-50 px-4 py-3 text-xs">
            <div className="flex items-center gap-2">
              <Store className="h-4 w-4 text-indigo-600" />
              <span>
                Sold by <strong className="text-slate-900">{product.sellerName}</strong>
              </span>
            </div>
            <span className="inline-flex items-center gap-1 font-bold text-slate-900">
              <ShieldCheck className="h-4 w-4 text-emerald-600" /> {product.sellerRating}★ Seller
            </span>
          </div>
        </div>
      </div>

      {/* Highlights & Specifications */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
          <h2 className="text-lg font-bold text-slate-900">Key Highlights</h2>
          <ul className="mt-4 space-y-2.5">
            {product.highlights.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
          <h2 className="text-lg font-bold text-slate-900">Specifications</h2>
          <dl className="mt-4 divide-y divide-slate-100 text-sm">
            {product.specifications.map((spec) => (
              <div key={spec.label} className="flex justify-between gap-4 py-2.5">
                <dt className="text-slate-500">{spec.label}</dt>
                <dd className="text-right font-semibold text-slate-900">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      {/* Related Products */}
      <section className="space-y-5">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Related &amp; Frequently Bought Together
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {relatedProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
