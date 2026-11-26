import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '@/data/mock-catalog';
import { BenefitsSection } from '@/features/home/benefits-section';
import { CategoryGrid } from '@/features/home/category-grid';
import { DealsSection } from '@/features/home/deals-section';
import { FeaturedBrandsSection } from '@/features/home/featured-brands';
import { HeroCarousel } from '@/features/home/hero-carousel';
import { NewsletterSection } from '@/features/home/newsletter-section';
import { ProductSection } from '@/features/home/product-section';
import { PromoBannersSection } from '@/features/home/promo-banners';
import { RecentlyViewedSection } from '@/features/home/recently-viewed-section';

export default function HomePage() {
  const trendingProducts = MOCK_PRODUCTS.filter((p) => p.isTrending).slice(0, 4);
  const bestSellers = MOCK_PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);
  const dealsOfTheDay = MOCK_PRODUCTS.filter((p) => p.isDealOfTheDay).slice(0, 4);
  const newArrivals = MOCK_PRODUCTS.filter((p) => p.isNewArrival).slice(0, 4);
  const recommendedProducts = MOCK_PRODUCTS.filter((p) => p.isRecommended).slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl space-y-14 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <HeroCarousel />

      <CategoryGrid categories={MOCK_CATEGORIES} />

      <ProductSection
        id="trending-heading"
        title="Trending Now"
        subtitle="Most-viewed electronics, cookware, and daily essentials this week"
        products={trendingProducts}
        viewAllHref="/products?sort=popularity"
      />

      <DealsSection products={dealsOfTheDay} />

      <ProductSection
        id="bestsellers-heading"
        title="Best Sellers"
        subtitle="Customer-favorite products with top ratings across India"
        products={bestSellers}
        viewAllHref="/products?sort=rating"
      />

      <PromoBannersSection />

      <ProductSection
        id="new-arrivals-heading"
        title="New Arrivals"
        subtitle="Fresh drops from verified Indian and global brands"
        products={newArrivals}
        viewAllHref="/products?sort=newest"
      />

      <FeaturedBrandsSection />

      <ProductSection
        id="recommended-heading"
        title="Recommended for You"
        subtitle="Curated picks tailored to everyday lifestyle and value"
        products={recommendedProducts}
        viewAllHref="/products"
      />

      <RecentlyViewedSection />

      <BenefitsSection />

      <NewsletterSection />
    </div>
  );
}
