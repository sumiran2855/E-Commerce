import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';
import { Button } from '@nextcommerce/ui';
import { AdminAuthShell } from '@/components/admin-auth-shell';

export default function AdminAuthErrorPage() {
  return (
    <AdminAuthShell
      title="Authentication Failed"
      subtitle="Unable to verify your administrator session"
    >
      <div className="space-y-4 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-[var(--nc-danger)]">
          <ShieldAlert className="h-6 w-6" />
        </div>
        <p className="text-sm text-[var(--nc-text-secondary)]">
          Your session expired or your MFA token could not be validated.
        </p>
        <Button className="h-10 w-full" asChild>
          <Link href="/login">Return to Admin Sign In</Link>
        </Button>
      </div>
    </AdminAuthShell>
  );
}
