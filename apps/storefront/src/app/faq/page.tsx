import { StaticInfoPage } from '@/components/common/static-info-page';

export const metadata = { title: 'Frequently Asked Questions' };

const FAQS = [
  {
    q: 'Do I need an account to browse products on DMarket?',
    a: 'No. Visitors can browse categories, search products, and add items to their cart or wishlist as a guest. Signing in is only required when placing an order or managing saved addresses.',
  },
  {
    q: 'What payment methods are accepted?',
    a: 'We support UPI (GPay, PhonePe, Paytm), RuPay, Visa, Mastercard, NetBanking, and Cash on Delivery across eligible Indian PIN codes.',
  },
  {
    q: 'How long does delivery take?',
    a: 'Metro cities (Bengaluru, Mumbai, Delhi NCR, Hyderabad) qualify for next-day delivery on eligible items. Standard delivery across India takes 2–5 business days.',
  },
  {
    q: 'How do returns and refunds work?',
    a: 'Eligible products can be returned within 7 days of delivery. Refunds to UPI/bank accounts are processed within 3–5 business days after quality check.',
  },
];

export default function FaqPage() {
  return (
    <StaticInfoPage
      title="Frequently Asked Questions"
      subtitle="Common questions about shopping, payments, delivery, and returns on DMarket."
    >
      <div className="space-y-4">
        {FAQS.map((item) => (
          <details
            key={item.q}
            className="rounded-xl border border-[var(--nc-border)] bg-[var(--nc-bg)] p-4"
            open
          >
            <summary className="cursor-pointer font-semibold text-[var(--nc-text)]">
              {item.q}
            </summary>
            <p className="mt-2 text-sm text-[var(--nc-text-secondary)]">{item.a}</p>
          </details>
        ))}
      </div>
    </StaticInfoPage>
  );
}
