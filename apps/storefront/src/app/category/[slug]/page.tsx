import { notFound } from 'next/navigation';
import { MOCK_CATEGORIES } from '@/data/mock-catalog';
import { CatalogExplorer } from '@/features/catalog/catalog-explorer';

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = MOCK_CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  return (
    <CatalogExplorer
      title={category.name}
      subtitle={category.description}
      initialCategory={category.slug}
    />
  );
}
