import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '@/data/mock-catalog';
import type { CatalogFilterParams, Category, Product } from '@/types/storefront';

export interface ProductListResult {
  items: Product[];
  total: number;
  page: number;
  totalPages: number;
  availableBrands: string[];
}

export async function getCategories(): Promise<Category[]> {
  return MOCK_CATEGORIES;
}

export async function getProducts(params: CatalogFilterParams = {}): Promise<ProductListResult> {
  const {
    query = '',
    category = '',
    brands = [],
    minPriceInPaise,
    maxPriceInPaise,
    minRating = 0,
    sortBy = 'popularity',
    page = 1,
    limit = 12,
  } = params;

  const normalizedQuery = query.trim().toLowerCase();

  let filtered = MOCK_PRODUCTS.filter((product) => {
    if (category && product.categorySlug !== category) return false;
    if (brands.length > 0 && !brands.includes(product.brand)) return false;
    if (minPriceInPaise !== undefined && product.priceInPaise < minPriceInPaise) return false;
    if (maxPriceInPaise !== undefined && product.priceInPaise > maxPriceInPaise) return false;
    if (minRating > 0 && product.rating < minRating) return false;
    if (normalizedQuery) {
      const hay =
        `${product.name} ${product.brand} ${product.categoryName} ${product.shortDescription}`.toLowerCase();
      if (!hay.includes(normalizedQuery)) return false;
    }
    return true;
  });

  const availableBrands = Array.from(
    new Set(
      MOCK_PRODUCTS.filter((p) => !category || p.categorySlug === category).map((p) => p.brand),
    ),
  ).sort();

  filtered = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.priceInPaise - b.priceInPaise;
      case 'price-desc':
        return b.priceInPaise - a.priceInPaise;
      case 'newest':
        return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      case 'rating':
        return b.rating - a.rating;
      case 'popularity':
      default:
        return b.reviewCount - a.reviewCount;
    }
  });

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * limit;

  return {
    items: filtered.slice(start, start + limit),
    total,
    page: safePage,
    totalPages,
    availableBrands,
  };
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return MOCK_PRODUCTS.find((product) => product.slug === slug) ?? null;
}

export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  const sameCategory = MOCK_PRODUCTS.filter(
    (p) => p.id !== product.id && p.categorySlug === product.categorySlug,
  );
  const others = MOCK_PRODUCTS.filter(
    (p) => p.id !== product.id && p.categorySlug !== product.categorySlug,
  );
  return [...sameCategory, ...others].slice(0, limit);
}

export async function getSearchSuggestions(query: string): Promise<{
  products: Product[];
  categories: Category[];
}> {
  const q = query.trim().toLowerCase();
  if (!q) {
    return {
      products: MOCK_PRODUCTS.slice(0, 4),
      categories: MOCK_CATEGORIES.slice(0, 4),
    };
  }
  const products = MOCK_PRODUCTS.filter((p) =>
    `${p.name} ${p.brand} ${p.categoryName}`.toLowerCase().includes(q),
  ).slice(0, 5);
  const categories = MOCK_CATEGORIES.filter((c) =>
    `${c.name} ${c.description}`.toLowerCase().includes(q),
  ).slice(0, 3);

  return { products, categories };
}

export async function checkDeliveryPincode(pincode: string): Promise<{
  serviceable: boolean;
  codAvailable: boolean;
  etaText: string;
}> {
  await new Promise((resolve) => setTimeout(resolve, 250));
  const firstDigit = Number(pincode[0]);
  if (firstDigit === 9) {
    return {
      serviceable: false,
      codAvailable: false,
      etaText: 'Currently unserviceable at this PIN code',
    };
  }
  return {
    serviceable: true,
    codAvailable: firstDigit !== 8,
    etaText:
      firstDigit <= 5
        ? 'Free delivery by Tomorrow, 9 PM'
        : 'Standard delivery in 2–4 business days',
  };
}
