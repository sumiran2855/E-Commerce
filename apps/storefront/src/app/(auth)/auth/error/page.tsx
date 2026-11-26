'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button, Skeleton } from '@nextcommerce/ui';
import { AuthShell } from '@/features/auth/auth-shell';
import type { AuthErrorCode } from '@/types/storefront';

const ERROR_DETAILS: Record<
  AuthErrorCode,
  { title: string; description: string; actionLabel: string; actionHref: string }
> = {
  invalid_credentials: {
    title: 'Invalid Credentials',
    description: 'The email, mobile number, or password you entered did not match our records.',
    actionLabel: 'Try Signing In Again',
    actionHref: '/login',
  },
  oauth_failed: {
    title: 'Google Sign-In Failed',
    description: 'We could not complete Google authentication. Please try again or use email.',
    actionLabel: 'Back to Sign In',
    actionHref: '/login',
  },
  oauth_cancelled: {
    title: 'Sign-In Cancelled',
    description: 'Google sign-in was cancelled before completion.',
    actionLabel: 'Return to Sign In',
    actionHref: '/login',
  },
  session_expired: {
    title: 'Session Expired',
    description: 'For your security, your session has expired. Please sign in again to continue.',
    actionLabel: 'Sign In Again',
    actionHref: '/login',
  },
  verification_failed: {
    title: 'Verification Failed',
    description: 'The verification code or link is invalid. Request a new one to continue.',
    actionLabel: 'Request New Code',
    actionHref: '/verify-otp',
  },
  account_not_verified: {
    title: 'Account Not Verified',
    description: 'Please verify your email address or mobile number before signing in.',
    actionLabel: 'Verify Email',
    actionHref: '/verify-email',
  },
  account_exists: {
    title: 'Account Already Exists',
    description: 'An account with this email or mobile number is already registered.',
    actionLabel: 'Sign In Instead',
    actionHref: '/login',
  },
  reset_link_expired: {
    title: 'Reset Link Expired',
    description: 'Your password reset link or OTP has expired. Request a fresh one.',
    actionLabel: 'Forgot Password',
    actionHref: '/forgot-password',
  },
  too_many_attempts: {
    title: 'Too Many Attempts',
    description:
      'You have exceeded the maximum verification attempts. Please try again in 15 minutes.',
    actionLabel: 'Return to Storefront',
    actionHref: '/',
  },
  network_error: {
    title: 'Network Error',
    description: 'Unable to connect to authentication services. Check your internet connection.',
    actionLabel: 'Retry Sign In',
    actionHref: '/login',
  },
  account_unavailable: {
    title: 'Account Temporarily Unavailable',
    description: 'This account is currently restricted. Please contact DMarket Support.',
    actionLabel: 'Contact Support',
    actionHref: '/contact',
  },
  general: {
    title: 'Authentication Error',
    description: 'Something went wrong while signing you in. Please try again.',
    actionLabel: 'Back to Sign In',
    actionHref: '/login',
  },
};

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const rawCode = (searchParams.get('code') ?? 'general') as AuthErrorCode;
  const info = ERROR_DETAILS[rawCode] ?? ERROR_DETAILS.general;

  return (
    <AuthShell title={info.title} subtitle="We couldn't complete your authentication request">
      <div className="space-y-5 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-[var(--nc-danger)]">
          <AlertTriangle className="h-7 w-7" aria-hidden="true" />
        </div>
        <p className="text-sm leading-relaxed text-[var(--nc-text-secondary)]">
          {info.description}
        </p>
        <div className="space-y-2.5">
          <Button className="h-10 w-full" asChild>
            <Link href={info.actionHref}>{info.actionLabel}</Link>
          </Button>
          <Button variant="outline" className="h-10 w-full" asChild>
            <Link href="/">Continue as Guest</Link>
          </Button>
        </div>
      </div>
    </AuthShell>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-md px-4 py-16">
          <Skeleton className="h-72 w-full rounded-2xl" />
        </div>
      }
    >
      <AuthErrorContent />
    </Suspense>
  );
}
