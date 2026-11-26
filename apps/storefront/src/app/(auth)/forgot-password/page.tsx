'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button, Input, Label, useToast } from '@nextcommerce/ui';
import { AuthShell } from '@/features/auth/auth-shell';
import { forgotPasswordSchema, type ForgotPasswordFormValues } from '@/schemas/auth.schema';
import { requestPasswordReset } from '@/services/auth.service';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { notify } = useToast();
  const [serverError, setServerError] = useState<string | null>(null);
  const [sentTarget, setSentTarget] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  async function onSubmit(values: ForgotPasswordFormValues) {
    setServerError(null);
    const result = await requestPasswordReset(values.identifier);
    if (!result.success) {
      setServerError(result.message);
      return;
    }

    setSentTarget(values.identifier);
    notify({ title: 'Reset code sent', description: result.message });
  }

  return (
    <AuthShell
      title="Forgot your password?"
      subtitle="Enter your registered email or mobile number and we'll send a 6-digit verification code"
      footer={
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 font-medium text-[var(--nc-primary)] hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Sign In
        </Link>
      }
    >
      {sentTarget ? (
        <div className="space-y-4 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-[var(--nc-success)]">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h2 className="text-base font-semibold text-[var(--nc-text)]">
              Verification code sent
            </h2>
            <p className="text-sm text-[var(--nc-text-secondary)]">
              We&apos;ve sent a 6-digit code to <span className="font-semibold">{sentTarget}</span>.
            </p>
          </div>
          <Button
            className="h-10 w-full"
            onClick={() =>
              router.push(`/verify-otp?target=${encodeURIComponent(sentTarget)}&flow=reset`)
            }
          >
            Enter Verification Code
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          {serverError ? (
            <div
              role="alert"
              className="flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-[var(--nc-danger)]"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{serverError}</span>
            </div>
          ) : null}

          <div className="space-y-1.5">
            <Label htmlFor="identifier">Email Address or Mobile Number</Label>
            <Input
              id="identifier"
              placeholder="aarav@example.com or 9876543210"
              {...register('identifier')}
              className="h-10"
              aria-invalid={Boolean(errors.identifier)}
            />
            {errors.identifier ? (
              <p role="alert" className="text-xs font-medium text-[var(--nc-danger)]">
                {errors.identifier.message}
              </p>
            ) : null}
          </div>

          <Button type="submit" className="h-10 w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Sending code...' : 'Send Verification Code'}
          </Button>
        </form>
      )}
    </AuthShell>
  );
}
