export type ProductBadge = 'Best Seller' | 'New Arrival' | 'Limited Offer' | 'Trending';

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  categorySlug: string;
  categoryName: string;
  /** Price in paise (e.g. 149900 = ₹1,499) */
  priceInPaise: number;
  /** Original MRP in paise */
  originalPriceInPaise: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  badge?: ProductBadge;
  isTrending?: boolean;
  isBestSeller?: boolean;
  isDealOfTheDay?: boolean;
  isNewArrival?: boolean;
  isRecommended?: boolean;
  inStock: boolean;
  stockCount: number;
  sellerName: string;
  sellerRating: number;
  shortDescription: string;
  description: string;
  offers: string[];
  specifications: ProductSpecification[];
  highlights: string[];
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
  accentColor: string;
}

export interface FeaturedBrand {
  id: string;
  name: string;
  tagline: string;
  discountText: string;
  categorySlug: string;
}

export interface DeliveryLocation {
  city: string;
  pincode: string;
  state: string;
  etaText: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface CatalogFilterParams {
  query?: string;
  category?: string;
  brands?: string[];
  minPriceInPaise?: number;
  maxPriceInPaise?: number;
  minRating?: number;
  sortBy?: 'popularity' | 'price-asc' | 'price-desc' | 'newest' | 'rating';
  page?: number;
  limit?: number;
}

export type AuthErrorCode =
  | 'invalid_credentials'
  | 'oauth_failed'
  | 'oauth_cancelled'
  | 'session_expired'
  | 'verification_failed'
  | 'account_not_verified'
  | 'account_exists'
  | 'reset_link_expired'
  | 'too_many_attempts'
  | 'network_error'
  | 'account_unavailable'
  | 'general';
