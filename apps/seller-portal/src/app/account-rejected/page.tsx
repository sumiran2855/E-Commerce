import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';
import { Badge, Button } from '@nextcommerce/ui';
import { SellerAuthShell } from '@/components/seller-auth-shell';

export default function SellerAccountRejectedPage() {
  return (
    <SellerAuthShell
      title="Additional Information Required"
      subtitle="Your seller application could not be approved with the submitted details"
    >
      <div className="space-y-4 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-[var(--nc-danger)]">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <Badge variant="danger">Status: Action Required</Badge>
        <p className="text-sm leading-relaxed text-[var(--nc-text-secondary)]">
          The submitted GSTIN and registered business name did not match official records. Please
          resubmit your verification details.
        </p>
        <div className="space-y-2">
          <Button className="h-10 w-full" asChild>
            <Link href="/register">Update &amp; Resubmit Application</Link>
          </Button>
          <Button variant="outline" className="h-10 w-full" asChild>
            <Link href="/login">Back to Sign In</Link>
          </Button>
        </div>
      </div>
    </SellerAuthShell>
  );
}
