'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import { CheckCircle2, MailCheck } from 'lucide-react';
import { Button, Skeleton, useToast } from '@nextcommerce/ui';
import { AuthShell } from '@/features/auth/auth-shell';
import { resendVerificationEmail } from '@/services/auth.service';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const { notify } = useToast();
  const email = searchParams.get('email') ?? 'you@example.com';
  const [sending, setSending] = useState(false);
  const [resent, setResent] = useState(false);

  async function handleResend() {
    setSending(true);
    const res = await resendVerificationEmail(email);
    setSending(false);
    setResent(true);
    notify({ title: 'Verification email sent', description: res.message });
  }

  return (
    <AuthShell
      title="Check your email"
      subtitle="Verify your email address to activate your DMarket account"
      footer={
        <Link href="/register" className="font-medium text-[var(--nc-primary)] hover:underline">
          Use a different email address
        </Link>
      }
    >
      <div className="space-y-5 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-[var(--nc-primary)]">
          <MailCheck className="h-7 w-7" aria-hidden="true" />
        </div>

        <p className="text-sm leading-relaxed text-[var(--nc-text-secondary)]">
          We sent a verification link to{' '}
          <span className="font-semibold text-[var(--nc-text)]">{email}</span>. Click the link in
          your inbox to verify your account.
        </p>

        {resent ? (
          <div className="inline-flex items-center gap-1.5 rounded-md bg-green-50 px-3 py-1.5 text-xs font-medium text-[var(--nc-success)]">
            <CheckCircle2 className="h-4 w-4" /> Fresh verification link sent!
          </div>
        ) : null}

        <div className="space-y-2.5">
          <Button
            type="button"
            variant="outline"
            className="h-10 w-full"
            onClick={handleResend}
            disabled={sending}
          >
            {sending ? 'Sending...' : 'Resend Verification Email'}
          </Button>
          <Button className="h-10 w-full" asChild>
            <Link href="/login">Back to Sign In</Link>
          </Button>
        </div>
      </div>
    </AuthShell>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-md px-4 py-16">
          <Skeleton className="h-80 w-full rounded-2xl" />
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
