import { CatalogExplorer } from '@/features/catalog/catalog-explorer';

export const metadata = {
  title: 'Search Results',
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = '' } = await searchParams;
  return (
    <CatalogExplorer
      title={q ? `Search results for "${q}"` : 'Search Marketplace'}
      subtitle="Filter by category, brand, price range, or customer rating"
      initialQuery={q}
    />
  );
}
