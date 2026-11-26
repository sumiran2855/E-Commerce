import { useState } from 'react';
import { publish } from '@nextcommerce/event-bus';
import type { ProductSummary } from '@nextcommerce/shared-types';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@nextcommerce/ui';
import { formatINR } from '@nextcommerce/utilities';

const DEMO_PRODUCTS: ProductSummary[] = [
  {
    id: 'demo-1',
    slug: 'wireless-anc-headphones',
    title: 'Studio Wireless ANC Headphones',
    priceInPaise: 499900,
    mrpInPaise: 699900,
    currency: 'INR',
    rating: 4.6,
    reviewCount: 128,
    category: 'Electronics',
    sellerName: 'AudioCraft India',
    inStock: true,
  },
  {
    id: 'demo-2',
    slug: 'ergonomic-mechanical-keyboard',
    title: 'Compact Mechanical Keyboard',
    priceInPaise: 349900,
    currency: 'INR',
    rating: 4.8,
    reviewCount: 84,
    category: 'Peripherals',
    sellerName: 'KeyWorks Bengaluru',
    inStock: true,
  },
  {
    id: 'demo-3',
    slug: 'usb-c-hub-pro',
    title: '7-in-1 USB-C Pro Hub',
    priceInPaise: 189900,
    currency: 'INR',
    rating: 4.4,
    reviewCount: 52,
    category: 'Accessories',
    sellerName: 'TechLink Mumbai',
    inStock: true,
  },
];

export function ProductGrid() {
  const [demoCartCount, setDemoCartCount] = useState(0);

  function handleDemoAdd() {
    const nextCount = demoCartCount + 1;
    setDemoCartCount(nextCount);
    publish('cart:updated', { itemCount: nextCount });
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {DEMO_PRODUCTS.map((product) => (
        <Card key={product.id} className="flex flex-col justify-between">
          <CardHeader>
            <div className="flex items-center justify-between gap-2">
              <Badge variant="primary">{product.category}</Badge>
              <span className="text-xs text-[var(--nc-text-muted)]">★ {product.rating}</span>
            </div>
            <CardTitle className="mt-2">{product.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-bold text-[var(--nc-text)]">
              {formatINR(product.priceInPaise)}
            </p>
            <p className="mt-1 text-xs text-[var(--nc-text-secondary)]">
              Sold by {product.sellerName}
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="secondary" size="sm" className="w-full" onClick={handleDemoAdd}>
              Demo Event Bus (+1 Badge)
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default ProductGrid;
