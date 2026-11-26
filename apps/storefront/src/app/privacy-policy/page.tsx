import { StaticInfoPage } from '@/components/common/static-info-page';

export const metadata = { title: 'Privacy Policy' };

export default function PrivacyPolicyPage() {
  return (
    <StaticInfoPage
      title="Privacy Policy"
      subtitle="How DMarket collects, uses, and protects your personal information."
    >
      <section className="space-y-2">
        <h2 className="text-lg font-bold text-[var(--nc-text)]">1. Information We Collect</h2>
        <p>
          We collect only the information necessary to fulfill orders, verify accounts, and improve
          your shopping experience, including your name, delivery address, and contact details.
        </p>
      </section>
      <section className="space-y-2">
        <h2 className="text-lg font-bold text-[var(--nc-text)]">2. Data Security</h2>
        <p>
          Passwords and session credentials are never stored in plaintext in browser storage. All
          checkout and authentication traffic is encrypted in transit using TLS 1.3.
        </p>
      </section>
    </StaticInfoPage>
  );
}
