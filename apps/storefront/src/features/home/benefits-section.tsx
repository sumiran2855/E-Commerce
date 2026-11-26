import {
  Banknote,
  CreditCard,
  Headphones,
  PackageCheck,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';

const BENEFITS = [
  {
    icon: ShieldCheck,
    title: 'Secure Payments',
    description: '256-bit SSL encrypted checkout with PCI-DSS compliant gateways.',
  },
  {
    icon: CreditCard,
    title: 'Multiple Payment Options',
    description: 'Pay seamlessly via UPI, RuPay, Credit/Debit Cards, or NetBanking.',
  },
  {
    icon: Banknote,
    title: 'Cash on Delivery',
    description: 'Pay at your doorstep across 19,000+ serviceable Indian PIN codes.',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: 'Hassle-free 7-day returns & instant refunds on eligible products.',
  },
  {
    icon: PackageCheck,
    title: 'Live Order Tracking',
    description: 'Real-time dispatch and courier updates from warehouse to doorstep.',
  },
  {
    icon: Headphones,
    title: '24/7 Customer Support',
    description: 'Dedicated India-based support via chat, email, and phone.',
  },
] as const;

export function BenefitsSection() {
  return (
    <section
      aria-labelledby="benefits-heading"
      className="rounded-2xl border border-[var(--nc-border)] bg-[var(--nc-bg-secondary)] p-6 sm:p-8"
    >
      <div className="mb-6 text-center">
        <h2
          id="benefits-heading"
          className="text-2xl font-bold tracking-tight text-[var(--nc-text)]"
        >
          Why Shop with DMarket
        </h2>
        <p className="mt-1 text-sm text-[var(--nc-text-secondary)]">
          Built for reliability, transparency, and convenience across India
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {BENEFITS.map((benefit) => {
          const Icon = benefit.icon;
          return (
            <div
              key={benefit.title}
              className="flex items-start gap-3.5 rounded-xl border border-[var(--nc-border)] bg-[var(--nc-bg)] p-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[var(--nc-primary)]">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[var(--nc-text)]">{benefit.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-[var(--nc-text-secondary)]">
                  {benefit.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
