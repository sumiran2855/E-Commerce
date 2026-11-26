import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Category } from '@/types/storefront';

export function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <section id="shop-by-category" aria-labelledby="category-heading" className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
            Curated Departments
          </span>
          <h2
            id="category-heading"
            className="mt-1 text-2xl font-bold tracking-tight text-slate-900"
          >
            Shop by Category
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Explore authentic collections across every everyday need
          </p>
        </div>
        <Link
          href="/products"
          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-indigo-200 hover:text-indigo-600"
        >
          View all <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/category/${category.slug}`}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-3 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg"
          >
            <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-100">
              <Image
                src={category.image}
                alt={category.name}
                width={400}
                height={400}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute bottom-2 right-2 rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-bold text-slate-700 shadow-xs backdrop-blur-xs">
                {category.productCount.toLocaleString('en-IN')}+
              </span>
            </div>
            <div className="mt-3 px-1">
              <h3 className="text-sm font-bold text-slate-900 transition-colors group-hover:text-indigo-600">
                {category.name}
              </h3>
              <p className="mt-0.5 line-clamp-1 text-xs text-slate-500">{category.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
