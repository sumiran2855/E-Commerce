import Link from 'next/link';
import { Package, RotateCcw, ShieldCheck, Truck } from 'lucide-react';
import { StaticInfoPage } from '@/components/common/static-info-page';

export const metadata = { title: 'Help Center' };

const HELP_TOPICS = [
  {
    icon: Truck,
    title: 'Shipping & Delivery',
    href: '/shipping-policy',
    desc: 'Delivery timelines, PIN code coverage, and shipping fees.',
  },
  {
    icon: RotateCcw,
    title: 'Returns & Refunds',
    href: '/return-policy',
    desc: '7-day return window, pickup scheduling, and refund timelines.',
  },
  {
    icon: Package,
    title: 'Order Tracking',
    href: '/orders',
    desc: 'Check order status, invoices, and courier tracking.',
  },
  {
    icon: ShieldCheck,
    title: 'Account & Security',
    href: '/faq',
    desc: 'Password resets, OTP verification, and privacy controls.',
  },
];

export default function HelpPage() {
  return (
    <StaticInfoPage
      title="Help Center"
      subtitle="Quick answers and self-service guides for DMarket shoppers."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {HELP_TOPICS.map((topic) => {
          const Icon = topic.icon;
          return (
            <Link
              key={topic.title}
              href={topic.href}
              className="flex items-start gap-3.5 rounded-xl border border-[var(--nc-border)] bg-[var(--nc-bg)] p-5 transition-colors hover:border-[var(--nc-primary)]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[var(--nc-primary)]">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-[var(--nc-text)]">{topic.title}</h2>
                <p className="mt-1 text-xs text-[var(--nc-text-secondary)]">{topic.desc}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </StaticInfoPage>
  );
}
