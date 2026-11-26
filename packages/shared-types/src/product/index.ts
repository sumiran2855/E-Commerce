export interface ProductSummary {
  id: string;
  slug: string;
  title: string;
  priceInPaise: number;
  mrpInPaise?: number;
  currency: 'INR';
  rating: number;
  reviewCount: number;
  category: string;
  sellerName: string;
  inStock: boolean;
  thumbnailUrl?: string;
}

export interface ProductFilterState {
  category?: string;
  minPriceInPaise?: number;
  maxPriceInPaise?: number;
  inStockOnly?: boolean;
  sortBy?: 'relevance' | 'price_asc' | 'price_desc' | 'rating';
}
