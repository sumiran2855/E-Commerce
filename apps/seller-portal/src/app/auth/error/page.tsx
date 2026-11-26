import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';
import { Button } from '@nextcommerce/ui';
import { SellerAuthShell } from '@/components/seller-auth-shell';

export default function SellerAuthErrorPage() {
  return (
    <SellerAuthShell
      title="Seller Authentication Error"
      subtitle="We couldn't verify your Seller Central session"
    >
      <div className="space-y-4 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-[var(--nc-danger)]">
          <ShieldAlert className="h-6 w-6" />
        </div>
        <p className="text-sm text-[var(--nc-text-secondary)]">
          Your session may have expired or your credentials could not be verified.
        </p>
        <Button className="h-10 w-full" asChild>
          <Link href="/login">Sign In Again</Link>
        </Button>
      </div>
    </SellerAuthShell>
  );
}
