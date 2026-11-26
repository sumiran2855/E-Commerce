import Link from 'next/link';
import type { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';

export interface StaticInfoPageProps {
  title: string;
  subtitle: string;
  lastUpdated?: string;
  children: ReactNode;
}

export function StaticInfoPage({
  title,
  subtitle,
  lastUpdated = 'November 2026',
  children,
}: StaticInfoPageProps) {
  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <div className="border-b border-[var(--nc-border)] pb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--nc-primary)] hover:underline"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Storefront
        </Link>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-[var(--nc-text)]">{title}</h1>
        <p className="mt-2 text-base text-[var(--nc-text-secondary)]">{subtitle}</p>
        <p className="mt-2 text-xs text-[var(--nc-text-muted)]">Last updated: {lastUpdated}</p>
      </div>

      <div className="space-y-6 text-sm leading-relaxed text-[var(--nc-text-secondary)]">
        {children}
      </div>
    </div>
  );
}
