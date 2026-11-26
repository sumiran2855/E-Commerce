import { StaticInfoPage } from '@/components/common/static-info-page';

export const metadata = { title: 'Terms & Conditions' };

export default function TermsPage() {
  return (
    <StaticInfoPage
      title="Terms & Conditions"
      subtitle="Terms governing your use of the DMarket marketplace."
    >
      <section className="space-y-2">
        <h2 className="text-lg font-bold text-[var(--nc-text)]">1. Marketplace Platform</h2>
        <p>
          DMarket operates as a multi-vendor marketplace connecting buyers with verified independent
          sellers across India. Product warranties are provided by the respective brand or seller.
        </p>
      </section>
      <section className="space-y-2">
        <h2 className="text-lg font-bold text-[var(--nc-text)]">2. Pricing &amp; Availability</h2>
        <p>
          All prices are listed in Indian Rupees (INR) inclusive of applicable GST unless stated
          otherwise.
        </p>
      </section>
    </StaticInfoPage>
  );
}
