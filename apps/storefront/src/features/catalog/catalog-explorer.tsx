'use client';

import { useEffect, useState } from 'react';
import { Filter, SlidersHorizontal, X } from 'lucide-react';
import { Badge, Button, Checkbox, EmptyState, Pagination } from '@nextcommerce/ui';
import { ProductCard } from '@/components/product/product-card';
import { MOCK_CATEGORIES } from '@/data/mock-catalog';
import { getProducts, type ProductListResult } from '@/services/catalog.service';
import type { CatalogFilterParams } from '@/types/storefront';

export interface CatalogExplorerProps {
  title: string;
  subtitle?: string;
  initialCategory?: string;
  initialQuery?: string;
  initialSort?: CatalogFilterParams['sortBy'];
}

const PRICE_RANGES = [
  { id: 'all', label: 'All Prices', min: undefined, max: undefined },
  { id: 'under-1000', label: 'Under ₹1,000', min: undefined, max: 100000 },
  { id: '1000-3000', label: '₹1,000 – ₹3,000', min: 100000, max: 300000 },
  { id: '3000-7000', label: '₹3,000 – ₹7,000', min: 300000, max: 700000 },
  { id: 'above-7000', label: 'Above ₹7,000', min: 700000, max: undefined },
] as const;

export function CatalogExplorer({
  title,
  subtitle,
  initialCategory = '',
  initialQuery = '',
  initialSort = 'popularity',
}: CatalogExplorerProps) {
  const [category, setCategory] = useState(initialCategory);
  const [query, setQuery] = useState(initialQuery);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRangeId, setPriceRangeId] = useState<string>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<NonNullable<CatalogFilterParams['sortBy']>>(initialSort);
  const [page, setPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [result, setResult] = useState<ProductListResult>({
    items: [],
    total: 0,
    page: 1,
    totalPages: 1,
    availableBrands: [],
  });

  useEffect(() => {
    setCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    const range = PRICE_RANGES.find((r) => r.id === priceRangeId) ?? PRICE_RANGES[0];
    let active = true;
    void getProducts({
      query,
      category,
      brands: selectedBrands,
      minPriceInPaise: range.min,
      maxPriceInPaise: range.max,
      minRating,
      sortBy,
      page,
      limit: 8,
    }).then((res) => {
      if (active) setResult(res);
    });
    return () => {
      active = false;
    };
  }, [query, category, selectedBrands, priceRangeId, minRating, sortBy, page]);

  function toggleBrand(brand: string) {
    setPage(1);
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand],
    );
  }

  function clearAllFilters() {
    setCategory(initialCategory);
    setSelectedBrands([]);
    setPriceRangeId('all');
    setMinRating(0);
    setSortBy('popularity');
    setPage(1);
  }

  const activeChips: Array<{ label: string; onRemove: () => void }> = [];
  if (category && !initialCategory) {
    const catName = MOCK_CATEGORIES.find((c) => c.slug === category)?.name ?? category;
    activeChips.push({ label: `Category: ${catName}`, onRemove: () => setCategory('') });
  }
  for (const brand of selectedBrands) {
    activeChips.push({ label: `Brand: ${brand}`, onRemove: () => toggleBrand(brand) });
  }
  if (priceRangeId !== 'all') {
    const r = PRICE_RANGES.find((item) => item.id === priceRangeId);
    if (r) activeChips.push({ label: r.label, onRemove: () => setPriceRangeId('all') });
  }
  if (minRating > 0) {
    activeChips.push({ label: `${minRating}★ & above`, onRemove: () => setMinRating(0) });
  }

  const filterPanel = (
    <div className="space-y-6">
      {!initialCategory ? (
        <div>
          <h3 className="text-sm font-semibold text-[var(--nc-text)]">Category</h3>
          <div className="mt-2.5 space-y-1.5">
            <button
              type="button"
              onClick={() => {
                setCategory('');
                setPage(1);
              }}
              className={`block w-full rounded-md px-2.5 py-1.5 text-left text-xs font-medium ${
                !category
                  ? 'bg-blue-50 text-[var(--nc-primary)]'
                  : 'text-[var(--nc-text-secondary)] hover:bg-[var(--nc-bg-secondary)]'
              }`}
            >
              All Categories
            </button>
            {MOCK_CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                type="button"
                onClick={() => {
                  setCategory(cat.slug);
                  setPage(1);
                }}
                className={`block w-full rounded-md px-2.5 py-1.5 text-left text-xs font-medium ${
                  category === cat.slug
                    ? 'bg-blue-50 text-[var(--nc-primary)]'
                    : 'text-[var(--nc-text-secondary)] hover:bg-[var(--nc-bg-secondary)]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div>
        <h3 className="text-sm font-semibold text-[var(--nc-text)]">Price Range</h3>
        <div className="mt-2.5 space-y-1.5">
          {PRICE_RANGES.map((range) => (
            <label
              key={range.id}
              className="flex cursor-pointer items-center gap-2 text-xs text-[var(--nc-text-secondary)]"
            >
              <input
                type="radio"
                name="price-range"
                checked={priceRangeId === range.id}
                onChange={() => {
                  setPriceRangeId(range.id);
                  setPage(1);
                }}
                className="accent-[var(--nc-primary)]"
              />
              <span>{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-[var(--nc-text)]">Brands</h3>
        <div className="mt-2.5 space-y-2">
          {result.availableBrands.map((brand) => (
            <label
              key={brand}
              className="flex cursor-pointer items-center gap-2 text-xs text-[var(--nc-text-secondary)]"
            >
              <Checkbox
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => toggleBrand(brand)}
              />
              <span>{brand}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-[var(--nc-text)]">Customer Rating</h3>
        <div className="mt-2.5 space-y-1.5">
          {[4.5, 4, 0].map((rating) => (
            <label
              key={rating}
              className="flex cursor-pointer items-center gap-2 text-xs text-[var(--nc-text-secondary)]"
            >
              <input
                type="radio"
                name="min-rating"
                checked={minRating === rating}
                onChange={() => {
                  setMinRating(rating);
                  setPage(1);
                }}
                className="accent-[var(--nc-primary)]"
              />
              <span>{rating === 0 ? 'All Ratings' : `${rating}★ & above`}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header & Sort Bar */}
      <div className="flex flex-col justify-between gap-4 border-b border-[var(--nc-border)] pb-5 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--nc-text)] sm:text-3xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-1 text-sm text-[var(--nc-text-secondary)]">{subtitle}</p>
          ) : null}
          <p className="mt-1 text-xs font-medium text-[var(--nc-text-muted)]">
            Showing {result.items.length} of {result.total} products
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            className="lg:hidden"
            onClick={() => setMobileFiltersOpen((prev) => !prev)}
          >
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </Button>

          <label
            htmlFor="sort-select"
            className="text-xs font-medium text-[var(--nc-text-secondary)]"
          >
            Sort by:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value as NonNullable<CatalogFilterParams['sortBy']>);
              setPage(1);
            }}
            className="h-9 rounded-md border border-[var(--nc-border)] bg-[var(--nc-bg)] px-3 text-xs font-medium text-[var(--nc-text)] focus:border-[var(--nc-primary)] focus:outline-none"
          >
            <option value="popularity">Popularity</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest Arrivals</option>
            <option value="rating">Customer Rating</option>
          </select>
        </div>
      </div>

      {/* Active Filter Chips */}
      {activeChips.length > 0 ? (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {activeChips.map((chip) => (
            <Badge
              key={chip.label}
              variant="default"
              className="gap-1.5 border border-[var(--nc-border)] bg-[var(--nc-bg-secondary)] px-2.5 py-1 text-xs text-[var(--nc-text)]"
            >
              {chip.label}
              <button
                type="button"
                aria-label={`Remove ${chip.label}`}
                onClick={chip.onRemove}
                className="rounded-full hover:text-[var(--nc-danger)]"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          <button
            type="button"
            onClick={clearAllFilters}
            className="text-xs font-semibold text-[var(--nc-primary)] hover:underline"
          >
            Clear all filters
          </button>
        </div>
      ) : null}

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:col-span-3 lg:block">
          <div className="rounded-xl border border-[var(--nc-border)] bg-[var(--nc-bg)] p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--nc-text)]">
                <Filter className="h-4 w-4" /> Filters
              </span>
              <button
                type="button"
                onClick={clearAllFilters}
                className="text-xs font-medium text-[var(--nc-primary)] hover:underline"
              >
                Reset
              </button>
            </div>
            {filterPanel}
          </div>
        </aside>

        {/* Mobile Filters */}
        {mobileFiltersOpen ? (
          <div className="rounded-xl border border-[var(--nc-border)] bg-[var(--nc-bg)] p-4 lg:hidden">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-bold text-[var(--nc-text)]">Filters</span>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="text-xs font-semibold text-[var(--nc-primary)]"
              >
                Done
              </button>
            </div>
            {filterPanel}
          </div>
        ) : null}

        {/* Product Grid */}
        <div className="lg:col-span-9">
          {result.items.length === 0 ? (
            <EmptyState
              title="No matching products found"
              description="Try adjusting your search keywords or clearing active filters."
              action={
                <Button variant="outline" onClick={clearAllFilters}>
                  Clear All Filters
                </Button>
              }
            />
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {result.items.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              {result.totalPages > 1 ? (
                <div className="mt-8 flex justify-center">
                  <Pagination
                    page={result.page}
                    totalPages={result.totalPages}
                    onPageChange={setPage}
                  />
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
