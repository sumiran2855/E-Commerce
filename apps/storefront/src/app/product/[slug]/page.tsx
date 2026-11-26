import { notFound } from 'next/navigation';
import { ProductDetailsView } from '@/features/catalog/product-details-view';
import { getProductBySlug, getRelatedProducts } from '@/services/catalog.service';

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product, 4);
  return <ProductDetailsView product={product} relatedProducts={relatedProducts} />;
}
