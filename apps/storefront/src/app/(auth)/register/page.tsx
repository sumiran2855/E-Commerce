'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button, Input, Label, useToast } from '@nextcommerce/ui';
import { AuthShell } from '@/features/auth/auth-shell';
import { GoogleAuthButton } from '@/features/auth/google-auth-button';
import { PasswordField } from '@/features/auth/password-field';
import { registerSchema, type RegisterFormValues } from '@/schemas/auth.schema';
import { registerCustomer } from '@/services/auth.service';

export default function RegisterPage() {
  const router = useRouter();
  const { notify } = useToast();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      mobile: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  });

  const passwordValue = watch('password');

  async function onSubmit(values: RegisterFormValues) {
    setServerError(null);
    const result = await registerCustomer({
      fullName: values.fullName,
      email: values.email,
      mobile: values.mobile,
    });

    if (!result.success) {
      setServerError(result.message);
      return;
    }

    notify({
      title: 'Verification code sent',
      description: result.message,
    });
    router.push(`/verify-otp?target=${encodeURIComponent(values.mobile)}&flow=register`);
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="Join DMarket for fast delivery, order tracking & exclusive offers"
      footer={
        <p className="text-[var(--nc-text-secondary)]">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-[var(--nc-primary)] hover:underline">
            Sign in
          </Link>
        </p>
      }
    >
      <div className="space-y-5">
        <GoogleAuthButton label="Sign up with Google" />

        <div className="relative flex items-center justify-center">
          <div className="w-full border-t border-[var(--nc-border)]" />
          <span className="bg-[var(--nc-bg)] px-3 text-xs font-medium text-[var(--nc-text-muted)]">
            or register with your details
          </span>
        </div>

        {serverError ? (
          <div
            role="alert"
            className="flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-[var(--nc-danger)]"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{serverError}</span>
          </div>
        ) : null}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div className="space-y-1.5">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              placeholder="Aarav Sharma"
              {...register('fullName')}
              className="h-10"
              aria-invalid={Boolean(errors.fullName)}
            />
            {errors.fullName ? (
              <p role="alert" className="text-xs font-medium text-[var(--nc-danger)]">
                {errors.fullName.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="aarav@example.com"
              {...register('email')}
              className="h-10"
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email ? (
              <p role="alert" className="text-xs font-medium text-[var(--nc-danger)]">
                {errors.email.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="mobile">Mobile Number (India)</Label>
            <Input
              id="mobile"
              type="tel"
              placeholder="9876543210"
              {...register('mobile')}
              className="h-10"
              aria-invalid={Boolean(errors.mobile)}
            />
            {errors.mobile ? (
              <p role="alert" className="text-xs font-medium text-[var(--nc-danger)]">
                {errors.mobile.message}
              </p>
            ) : null}
          </div>

          <PasswordField
            id="password"
            label="Password"
            placeholder="Minimum 8 characters"
            showStrength
            watchedValue={passwordValue}
            error={errors.password?.message}
            {...register('password')}
          />

          <PasswordField
            id="confirmPassword"
            label="Confirm Password"
            placeholder="Re-enter your password"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />

          <div className="space-y-1">
            <label className="flex cursor-pointer items-start gap-2.5 text-xs text-[var(--nc-text-secondary)]">
              <input
                type="checkbox"
                {...register('acceptTerms')}
                className="mt-0.5 h-4 w-4 rounded border-[var(--nc-border)] accent-[var(--nc-primary)]"
              />
              <span>
                I agree to the{' '}
                <Link href="/terms" className="font-medium text-[var(--nc-primary)] underline">
                  Terms &amp; Conditions
                </Link>{' '}
                and{' '}
                <Link
                  href="/privacy-policy"
                  className="font-medium text-[var(--nc-primary)] underline"
                >
                  Privacy Policy
                </Link>
                .
              </span>
            </label>
            {errors.acceptTerms ? (
              <p role="alert" className="text-xs font-medium text-[var(--nc-danger)]">
                {errors.acceptTerms.message}
              </p>
            ) : null}
          </div>

          <Button type="submit" className="h-10 w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Creating account...' : 'Create Account'}
          </Button>
        </form>
      </div>
    </AuthShell>
  );
}
