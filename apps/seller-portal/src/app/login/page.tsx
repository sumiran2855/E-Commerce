'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@nextcommerce/auth-client';
import { Button, Input, Label, useToast } from '@nextcommerce/ui';
import { emailSchema } from '@nextcommerce/validation';
import { SellerAuthShell } from '@/components/seller-auth-shell';

export default function SellerLoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { notify } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const emailParsed = emailSchema.safeParse(email);
    if (!emailParsed.success) {
      setError(emailParsed.error.issues[0]?.message ?? 'Enter a valid business email');
      return;
    }
    if (!password) {
      setError('Password is required');
      return;
    }

    setError(null);
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);

    const normalized = email.trim().toLowerCase();
    if (normalized === 'pending@seller.in') {
      router.push('/account-pending');
      return;
    }
    if (normalized === 'rejected@seller.in') {
      router.push('/account-rejected');
      return;
    }
    if (normalized === 'invalid@seller.in') {
      setError('Invalid seller credentials. Please check your email and password.');
      return;
    }

    await login();
    notify({ title: 'Welcome to Seller Central', description: 'Signed in as verified seller.' });
    router.push('/');
  }

  return (
    <SellerAuthShell
      title="Seller Sign In"
      subtitle="Manage your catalog, fulfill orders, and track INR settlements"
      footer={
        <p className="text-[var(--nc-text-secondary)]">
          New seller on DMarket?{' '}
          <Link href="/register" className="font-semibold text-[var(--nc-primary)] hover:underline">
            Register your store
          </Link>
        </p>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {error ? (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-[var(--nc-danger)]"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        ) : null}

        <div className="space-y-1.5">
          <Label htmlFor="seller-email">Business Email</Label>
          <Input
            id="seller-email"
            type="email"
            placeholder="store@company.in"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-10"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="seller-password">Password</Label>
            <Link
              href="/forgot-password"
              className="text-xs font-semibold text-[var(--nc-primary)] hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="seller-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-10 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--nc-text-muted)]"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <Button type="submit" className="h-10 w-full" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In to Seller Central'}
        </Button>

        <p className="text-center text-[11px] text-[var(--nc-text-muted)]">
          Demo states: <code className="font-mono">pending@seller.in</code> or{' '}
          <code className="font-mono">rejected@seller.in</code>
        </p>
      </form>
    </SellerAuthShell>
  );
}
