import { CatalogExplorer } from '@/features/catalog/catalog-explorer';

export const metadata = {
  title: 'All Products',
};

export default function ProductsPage() {
  return (
    <CatalogExplorer
      title="All Marketplace Products"
      subtitle="Browse verified electronics, fashion, kitchenware, and daily essentials across India"
    />
  );
}
