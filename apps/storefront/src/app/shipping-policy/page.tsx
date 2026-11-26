import { StaticInfoPage } from '@/components/common/static-info-page';

export const metadata = { title: 'Shipping Policy' };

export default function ShippingPolicyPage() {
  return (
    <StaticInfoPage
      title="Shipping Information"
      subtitle="Delivery charges, timelines, and serviceable regions across India."
    >
      <section className="space-y-2">
        <h2 className="text-lg font-bold text-[var(--nc-text)]">Shipping Charges</h2>
        <p>
          Orders of ₹499 or more qualify for free standard delivery across India. Orders below ₹499
          incur a flat ₹49 shipping fee.
        </p>
      </section>
      <section className="space-y-2">
        <h2 className="text-lg font-bold text-[var(--nc-text)]">Dispatch &amp; Tracking</h2>
        <p>
          Orders placed before 2:00 PM IST on business days are typically dispatched the same day
          with live courier tracking.
        </p>
      </section>
    </StaticInfoPage>
  );
}
