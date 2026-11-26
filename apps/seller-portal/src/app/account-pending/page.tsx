import Link from 'next/link';
import { Clock } from 'lucide-react';
import { Badge, Button } from '@nextcommerce/ui';
import { SellerAuthShell } from '@/components/seller-auth-shell';

export default function SellerAccountPendingPage() {
  return (
    <SellerAuthShell
      title="Verification Pending"
      subtitle="Your seller onboarding application is currently under compliance review"
    >
      <div className="space-y-4 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-50 text-amber-600">
          <Clock className="h-6 w-6" />
        </div>
        <Badge variant="warning">Status: Pending Review (24–48 hrs)</Badge>
        <p className="text-sm leading-relaxed text-[var(--nc-text-secondary)]">
          Our onboarding team is verifying your GSTIN, PAN, and bank details. You will receive an
          email notification once your store is approved.
        </p>
        <Button variant="outline" className="h-10 w-full" asChild>
          <Link href="/login">Back to Seller Sign In</Link>
        </Button>
      </div>
    </SellerAuthShell>
  );
}
