import { StaticInfoPage } from '@/components/common/static-info-page';

export const metadata = { title: 'Return & Refund Policy' };

export default function ReturnPolicyPage() {
  return (
    <StaticInfoPage
      title="Return & Refund Policy"
      subtitle="Transparent 7-day returns and fast refunds for eligible purchases."
    >
      <section className="space-y-2">
        <h2 className="text-lg font-bold text-[var(--nc-text)]">Eligibility</h2>
        <p>
          Most electronics, fashion, and home products can be returned or exchanged within 7 days of
          delivery provided original tags, accessories, and packaging are intact.
        </p>
      </section>
      <section className="space-y-2">
        <h2 className="text-lg font-bold text-[var(--nc-text)]">Refund Timelines</h2>
        <p>
          Prepaid refunds (UPI, Cards, NetBanking) are credited within 3–5 business days after
          pickup verification. Cash on Delivery refunds are transferred via UPI or NEFT.
        </p>
      </section>
    </StaticInfoPage>
  );
}
