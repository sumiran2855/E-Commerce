import type { DeliveryLocation, FeaturedBrand } from '@/types/storefront';

export const ANNOUNCEMENTS: string[] = [
  'Free delivery on eligible orders above ₹499 across India',
  'Festive Tech & Home Sale: Up to 45% off on top brands',
  'Extra 10% instant discount with HDFC & ICICI Bank Cards',
  'Easy 7-day returns & Cash on Delivery available on 95% of PIN codes',
];

export const NAV_CATEGORIES = [
  { name: 'Electronics', slug: 'electronics' },
  { name: 'Fashion', slug: 'fashion' },
  { name: 'Home & Kitchen', slug: 'home-kitchen' },
  { name: 'Beauty & Personal Care', slug: 'beauty-personal-care' },
  { name: 'Grocery', slug: 'grocery' },
  { name: 'Sports & Fitness', slug: 'sports-fitness' },
  { name: 'Books', slug: 'books' },
  { name: 'Toys & Baby Products', slug: 'toys-baby' },
] as const;

export const DELIVERY_LOCATIONS: DeliveryLocation[] = [
  { city: 'Bengaluru', pincode: '560001', state: 'Karnataka', etaText: 'Delivery by Tomorrow' },
  { city: 'Mumbai', pincode: '400001', state: 'Maharashtra', etaText: 'Delivery by Tomorrow' },
  { city: 'New Delhi', pincode: '110001', state: 'Delhi NCR', etaText: 'Delivery in 1-2 days' },
  { city: 'Hyderabad', pincode: '500001', state: 'Telangana', etaText: 'Delivery by Tomorrow' },
  { city: 'Pune', pincode: '411001', state: 'Maharashtra', etaText: 'Delivery in 2 days' },
  { city: 'Chennai', pincode: '600001', state: 'Tamil Nadu', etaText: 'Delivery in 2 days' },
];

export const HERO_SLIDES = [
  {
    id: 'slide-1',
    badge: 'Grand India Festive Sale',
    title: 'Upgrade Your Everyday Tech & Living',
    subtitle:
      'Discover curated electronics, smart home essentials, and authentic Indian & global brands with next-day delivery across major cities.',
    primaryCta: { label: 'Shop Now', href: '/products' },
    secondaryCta: { label: 'Explore Categories', href: '#shop-by-category' },
    image: '/images/hero/hero-tech.jpg',
    highlightStat: 'Up to 45% Off',
    highlightSub: 'No-cost EMI from ₹999/mo',
  },
  {
    id: 'slide-2',
    badge: 'New Season Collection',
    title: 'Crafted Fashion & Lifestyle Essentials',
    subtitle:
      'Handpicked pure linen apparel, commuter backpacks, and everyday accessories designed for comfort, durability, and effortless style.',
    primaryCta: { label: 'Shop Fashion', href: '/category/fashion' },
    secondaryCta: { label: 'View Deals', href: '/products?sort=price-asc' },
    image: '/images/hero/hero-fashion.jpg',
    highlightStat: 'Flat 30% Off',
    highlightSub: '7-day easy exchange',
  },
  {
    id: 'slide-3',
    badge: 'Smart Kitchen & Home',
    title: 'Modernize Your Home & Kitchen',
    subtitle:
      'Energy-efficient air fryers, tri-ply cookware, and minimalist home essentials backed by verified seller warranties.',
    primaryCta: { label: 'Shop Home', href: '/category/home-kitchen' },
    secondaryCta: { label: 'Browse All', href: '/products' },
    image: '/images/hero/hero-home.jpg',
    highlightStat: 'Save ₹3,000+',
    highlightSub: 'Free doorstep warranty',
  },
  {
    id: 'slide-4',
    badge: 'Flagship Audio & Wearables',
    title: 'Studio Sound & AMOLED Smartwatches',
    subtitle:
      '45dB Hybrid ANC headphones, TWS earbuds, and fitness smartwatches engineered for work, travel, and workouts.',
    primaryCta: { label: 'Shop Electronics', href: '/category/electronics' },
    secondaryCta: { label: 'Top Rated', href: '/products?sort=rating' },
    image: '/images/categories/electronics.jpg',
    highlightStat: 'Up to 42% Off',
    highlightSub: '1-year domestic warranty',
  },
  {
    id: 'slide-5',
    badge: 'Clean Botanical Skincare',
    title: 'Glow Naturally with VedaPure',
    subtitle:
      'Dermatologist-tested Vitamin C serums, hydrating creams, and paraben-free daily skincare crafted for Indian skin.',
    primaryCta: { label: 'Shop Beauty', href: '/category/beauty-personal-care' },
    secondaryCta: { label: 'Explore All', href: '/products' },
    image: '/images/categories/beauty.jpg',
    highlightStat: 'Flat 28% Off',
    highlightSub: '100% vegan & cruelty-free',
  },
  {
    id: 'slide-6',
    badge: 'Specialty Pantry & Coffee',
    title: 'Single-Origin Nilgiri Estate Coffee',
    subtitle:
      'Small-batch roasted Arabica beans, organic spices, and everyday pantry staples delivered fresh to your doorstep.',
    primaryCta: { label: 'Shop Grocery', href: '/category/grocery' },
    secondaryCta: { label: 'Best Sellers', href: '/products?sort=popularity' },
    image: '/images/categories/grocery.jpg',
    highlightStat: 'Freshly Roasted',
    highlightSub: 'Free delivery above ₹499',
  },
  {
    id: 'slide-7',
    badge: 'Active Living Gear',
    title: 'Train Stronger at Home & Outdoors',
    subtitle:
      'SGS-certified anti-slip yoga mats, hex dumbbells, and insulated gear built for daily fitness routines.',
    primaryCta: { label: 'Shop Fitness', href: '/category/sports-fitness' },
    secondaryCta: { label: 'New Arrivals', href: '/products?sort=newest' },
    image: '/images/categories/sports.jpg',
    highlightStat: 'Up to 40% Off',
    highlightSub: 'Includes carry accessories',
  },
  {
    id: 'slide-8',
    badge: 'Curated Knowledge & Fiction',
    title: 'Bestselling Books & Tech Handbooks',
    subtitle:
      'From systems architecture guides to Indian fiction and exam prep—hardcover and paperback editions ready to ship.',
    primaryCta: { label: 'Shop Books', href: '/category/books' },
    secondaryCta: { label: 'Browse Catalog', href: '/products' },
    image: '/images/categories/books.jpg',
    highlightStat: 'Min. 30% Off',
    highlightSub: 'Free bookmark included',
  },
  {
    id: 'slide-9',
    badge: 'Safe Learning & Play',
    title: 'STEM Wooden Toys & Kids Essentials',
    subtitle:
      'BIS-certified beechwood robotics kits and creative building sets designed for ages 5+ with non-toxic finishes.',
    primaryCta: { label: 'Shop Toys & Baby', href: '/category/toys-baby' },
    secondaryCta: { label: 'All Deals', href: '/products?sort=price-asc' },
    image: '/images/categories/toys.jpg',
    highlightStat: 'Buy 2 Save 15%',
    highlightSub: 'BIS safety certified',
  },
] as const;

export const FEATURED_BRANDS: FeaturedBrand[] = [
  {
    id: 'brand-auratech',
    name: 'AuraTech',
    tagline: 'Precision audio & wearables',
    discountText: 'Up to 40% Off',
    categorySlug: 'electronics',
  },
  {
    id: 'brand-vastra',
    name: 'VastraLoom',
    tagline: 'Contemporary Indian apparel',
    discountText: 'Min. 30% Off',
    categorySlug: 'fashion',
  },
  {
    id: 'brand-rasoi',
    name: 'RasoiCraft',
    tagline: 'Modern kitchenware & appliances',
    discountText: 'Starting ₹899',
    categorySlug: 'home-kitchen',
  },
  {
    id: 'brand-vedapure',
    name: 'VedaPure',
    tagline: 'Clean botanical skincare',
    discountText: 'Flat 25% Off',
    categorySlug: 'beauty-personal-care',
  },
  {
    id: 'brand-stride',
    name: 'StridePro',
    tagline: 'Performance fitness & gear',
    discountText: 'Up to 35% Off',
    categorySlug: 'sports-fitness',
  },
  {
    id: 'brand-kiddo',
    name: 'KiddoNest',
    tagline: 'Safe learning toys & care',
    discountText: 'Buy 2 Save 15%',
    categorySlug: 'toys-baby',
  },
];

export const PAYMENT_METHODS = ['UPI', 'RuPay', 'Visa', 'Mastercard', 'NetBanking', 'COD'] as const;
