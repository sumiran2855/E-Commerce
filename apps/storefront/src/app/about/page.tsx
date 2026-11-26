import Link from 'next/link';
import { Button } from '@nextcommerce/ui';
import { StaticInfoPage } from '@/components/common/static-info-page';

export const metadata = { title: 'About DMarket' };

export default function AboutPage() {
  return (
    <StaticInfoPage
      title="About DMarket"
      subtitle="Building India's trusted multi-vendor marketplace for everyday essentials and flagship brands."
    >
      <section className="space-y-2">
        <h2 className="text-lg font-bold text-[var(--nc-text)]">Our Mission</h2>
        <p>
          DMarket connects verified Indian and global brands directly with shoppers across 19,000+
          PIN codes. From electronics and smart home appliances to contemporary fashion and
          single-origin groceries, every listing is backed by transparent pricing in INR and
          reliable buyer protection.
        </p>
      </section>
      <section className="space-y-2">
        <h2 className="text-lg font-bold text-[var(--nc-text)]">Marketplace Architecture</h2>
        <p>
          Engineered on a modern Hybrid Micro Frontend architecture using Next.js App Router and
          Module Federation, DMarket delivers fast server-rendered discovery alongside modular,
          independently deployable commerce experiences.
        </p>
      </section>
      <div className="pt-2">
        <Button asChild>
          <Link href="/products">Explore the Marketplace</Link>
        </Button>
      </div>
    </StaticInfoPage>
  );
}
