'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { useAuth } from '@nextcommerce/auth-client';
import { Button, Skeleton, useToast } from '@nextcommerce/ui';
import { AuthShell } from '@/features/auth/auth-shell';
import { OtpInput } from '@/features/auth/otp-input';
import { otpSchema } from '@/schemas/auth.schema';
import { verifyOtp } from '@/services/auth.service';

function VerifyOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const { notify } = useToast();

  const target = searchParams.get('target') ?? 'your registered contact';
  const flow = searchParams.get('flow') ?? 'register';

  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [cooldown, setCooldown] = useState(30);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((c) => Math.max(0, c - 1)), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    const parsed = otpSchema.safeParse({ otp });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'Enter a valid 6-digit OTP');
      return;
    }

    setError(null);
    setSubmitting(true);
    const result = await verifyOtp(otp);
    setSubmitting(false);

    if (!result.success) {
      if (result.errorCode === 'too_many_attempts') {
        router.push('/auth/error?code=too_many_attempts');
        return;
      }
      setError(result.message);
      return;
    }

    notify({ title: 'Verified', description: result.message });

    if (flow === 'reset') {
      router.push('/reset-password');
    } else {
      await login();
      router.push('/auth/success?flow=register');
    }
  }

  function handleResend() {
    setCooldown(30);
    setError(null);
    notify({ title: 'OTP resent', description: `A new 6-digit code was sent to ${target}.` });
  }

  return (
    <AuthShell
      title="Verify OTP"
      subtitle={`Enter the 6-digit verification code sent to ${target}`}
      footer={
        <Link
          href={flow === 'reset' ? '/forgot-password' : '/register'}
          className="font-medium text-[var(--nc-primary)] hover:underline"
        >
          Change email or mobile number
        </Link>
      }
    >
      <form onSubmit={handleVerify} className="space-y-5" noValidate>
        {error ? (
          <div
            role="alert"
            className="flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-[var(--nc-danger)]"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        ) : null}

        <div className="space-y-2">
          <OtpInput value={otp} onChange={setOtp} disabled={submitting} hasError={Boolean(error)} />
          <p className="text-center text-xs text-[var(--nc-text-muted)]">
            Tip: You can paste the 6-digit code directly. (Use{' '}
            <code className="font-mono">000000</code> to test invalid OTP)
          </p>
        </div>

        <Button type="submit" className="h-10 w-full" disabled={submitting}>
          {submitting ? 'Verifying...' : 'Verify & Continue'}
        </Button>

        <div className="text-center text-xs text-[var(--nc-text-secondary)]">
          {cooldown > 0 ? (
            <span>Resend code in {cooldown}s</span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="font-semibold text-[var(--nc-primary)] hover:underline"
            >
              Resend OTP
            </button>
          )}
        </div>
      </form>
    </AuthShell>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-md px-4 py-16">
          <Skeleton className="h-80 w-full rounded-2xl" />
        </div>
      }
    >
      <VerifyOtpContent />
    </Suspense>
  );
}
