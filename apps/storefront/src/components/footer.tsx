import Link from 'next/link';
import { DMarketLogo } from '@/components/common/dmarket-logo';
import { PAYMENT_METHODS } from '@/constants/storefront';

const FOOTER_SECTIONS = [
  {
    title: 'Marketplace',
    links: [
      { label: 'About DMarket', href: '/about' },
      { label: 'All Products', href: '/products' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Help Center', href: '/help' },
      { label: 'FAQs', href: '/faq' },
    ],
  },
  {
    title: 'Customer Policies',
    links: [
      { label: 'Shipping Information', href: '/shipping-policy' },
      { label: 'Return & Refund Policy', href: '/return-policy' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms & Conditions', href: '/terms' },
    ],
  },
  {
    title: 'Sell on DMarket',
    links: [
      { label: 'Become a Seller', href: 'http://localhost:3001/register', external: true },
      { label: 'Seller Registration', href: 'http://localhost:3001/register', external: true },
      { label: 'Seller Sign In', href: 'http://localhost:3001/login', external: true },
      { label: 'Seller Help', href: '/help' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 text-slate-600">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <DMarketLogo subtitle="India Marketplace" />
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-600">
              India&apos;s curated multi-vendor marketplace for flagship electronics, modern
              fashion, smart home appliances, and everyday essentials—delivered fast with verified
              seller warranties.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-medium text-slate-500">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-600"
              >
                Instagram
              </a>
              <span>·</span>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-600"
              >
                X (Twitter)
              </a>
              <span>·</span>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-600"
              >
                LinkedIn
              </a>
              <span>·</span>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-600"
              >
                YouTube
              </a>
            </div>
          </div>

          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-bold text-slate-900">{section.title}</h3>
              <ul className="mt-3 space-y-2.5 text-sm">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {'external' in link && link.external ? (
                      <a href={link.href} className="transition-colors hover:text-indigo-600">
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className="transition-colors hover:text-indigo-600">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            © 2026 DMarket Marketplace Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-500">Payments:</span>
            {PAYMENT_METHODS.map((method) => (
              <span
                key={method}
                className="rounded-md border border-slate-200 bg-white px-2.5 py-0.5 text-[11px] font-semibold text-slate-700"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
