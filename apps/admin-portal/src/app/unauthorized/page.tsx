import Link from 'next/link';
import { Ban } from 'lucide-react';
import { Button } from '@nextcommerce/ui';
import { AdminAuthShell } from '@/components/admin-auth-shell';

export default function AdminUnauthorizedPage() {
  return (
    <AdminAuthShell
      title="Access Denied"
      subtitle="You do not have permission to access this administrative resource"
    >
      <div className="space-y-4 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-[var(--nc-danger)]">
          <Ban className="h-6 w-6" />
        </div>
        <p className="text-sm text-[var(--nc-text-secondary)]">
          Administrative privileges are enforced by the backend authorization gateway. Contact
          Platform Security if you require role elevation.
        </p>
        <Button variant="outline" className="h-10 w-full" asChild>
          <Link href="/login">Sign In with Another Account</Link>
        </Button>
      </div>
    </AdminAuthShell>
  );
}
