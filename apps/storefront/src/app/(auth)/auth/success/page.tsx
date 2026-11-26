'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button, Skeleton } from '@nextcommerce/ui';
import { AuthShell } from '@/features/auth/auth-shell';

function AuthSuccessContent() {
  const searchParams = useSearchParams();
  const flow = searchParams.get('flow') ?? 'login';

  const copy =
    flow === 'register'
      ? {
          title: 'Account Created!',
          subtitle: 'Your DMarket account is verified and ready for shopping.',
        }
      : {
          title: 'Signed In Successfully',
          subtitle: 'Welcome back to DMarket India.',
        };

  return (
    <AuthShell title={copy.title} subtitle={copy.subtitle}>
      <div className="space-y-5 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-[var(--nc-success)]">
          <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
        </div>
        <p className="text-sm text-[var(--nc-text-secondary)]">
          You can now explore products, save items to your wishlist, and track your orders.
        </p>
        <div className="space-y-2.5">
          <Button className="h-10 w-full" asChild>
            <Link href="/">
              Continue Shopping <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" className="h-10 w-full" asChild>
            <Link href="/account">Go to My Account</Link>
          </Button>
        </div>
      </div>
    </AuthShell>
  );
}

export default function AuthSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-md px-4 py-16">
          <Skeleton className="h-72 w-full rounded-2xl" />
        </div>
      }
    >
      <AuthSuccessContent />
    </Suspense>
  );
}
