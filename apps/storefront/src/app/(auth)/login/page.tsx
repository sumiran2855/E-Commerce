'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@nextcommerce/auth-client';
import { Button, Input, Label, useToast } from '@nextcommerce/ui';
import { AuthShell } from '@/features/auth/auth-shell';
import { GoogleAuthButton } from '@/features/auth/google-auth-button';
import { PasswordField } from '@/features/auth/password-field';
import { loginSchema, type LoginFormValues } from '@/schemas/auth.schema';
import { loginWithPassword } from '@/services/auth.service';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { notify } = useToast();
  const [serverError, setServerError] = useState<{ message: string; code?: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: '',
      password: '',
      rememberMe: true,
    },
  });

  async function onSubmit(values: LoginFormValues) {
    setServerError(null);
    const result = await loginWithPassword(values.identifier, values.password);

    if (!result.success) {
      if (result.errorCode === 'account_not_verified') {
        router.push(
          `/verify-email?email=${encodeURIComponent(values.identifier)}&reason=unverified`,
        );
        return;
      }
      if (result.errorCode === 'account_unavailable') {
        router.push('/auth/error?code=account_unavailable');
        return;
      }
      setServerError({ message: result.message, code: result.errorCode });
      return;
    }

    await login();
    notify({
      title: 'Welcome back!',
      description: 'You are now signed in to DMarket.',
    });
    router.push('/');
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to track orders, manage your wishlist, and checkout faster"
      footer={
        <p className="text-[var(--nc-text-secondary)]">
          New to DMarket?{' '}
          <Link href="/register" className="font-semibold text-[var(--nc-primary)] hover:underline">
            Create an account
          </Link>
        </p>
      }
    >
      <div className="space-y-5">
        <GoogleAuthButton />

        <div className="relative flex items-center justify-center">
          <div className="w-full border-t border-[var(--nc-border)]" />
          <span className="bg-[var(--nc-bg)] px-3 text-xs font-medium text-[var(--nc-text-muted)]">
            or sign in with email / mobile
          </span>
        </div>

        {serverError ? (
          <div
            role="alert"
            className="flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-[var(--nc-danger)]"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{serverError.message}</span>
          </div>
        ) : null}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div className="space-y-1.5">
            <Label htmlFor="identifier">Email Address or Mobile Number</Label>
            <Input
              id="identifier"
              type="text"
              autoComplete="username"
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

          <PasswordField
            id="password"
            label="Password"
            autoComplete="current-password"
            placeholder="Enter your password"
            error={errors.password?.message}
            {...register('password')}
          />

          <div className="flex items-center justify-between text-xs">
            <label className="inline-flex cursor-pointer items-center gap-2 text-[var(--nc-text-secondary)]">
              <input
                type="checkbox"
                {...register('rememberMe')}
                className="h-4 w-4 rounded border-[var(--nc-border)] accent-[var(--nc-primary)]"
              />
              <span>Remember me</span>
            </label>

            <Link
              href="/forgot-password"
              className="font-semibold text-[var(--nc-primary)] hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="h-10 w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <p className="text-center text-xs leading-relaxed text-[var(--nc-text-muted)]">
          By continuing, you agree to DMarket&apos;s{' '}
          <Link href="/terms" className="underline hover:text-[var(--nc-text)]">
            Terms &amp; Conditions
          </Link>{' '}
          and{' '}
          <Link href="/privacy-policy" className="underline hover:text-[var(--nc-text)]">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </AuthShell>
  );
}
