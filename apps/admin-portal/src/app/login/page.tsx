'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@nextcommerce/auth-client';
import { Button, Input, Label, useToast } from '@nextcommerce/ui';
import { emailSchema } from '@nextcommerce/validation';
import { AdminAuthShell } from '@/components/admin-auth-shell';

export default function AdminLoginPage() {
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
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      setError('Enter a valid DMarket corporate email');
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
    if (normalized === 'unauthorized@dmarket.in') {
      router.push('/unauthorized');
      return;
    }
    if (normalized === 'invalid@dmarket.in') {
      setError('Invalid administrator credentials.');
      return;
    }

    await login();
    notify({ title: 'Admin session started', description: 'Signed in to Platform Admin Console.' });
    router.push('/');
  }

  return (
    <AdminAuthShell
      title="Administrator Sign In"
      subtitle="Restricted access to DMarket platform operations"
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
          <Label htmlFor="admin-email">Corporate Email</Label>
          <Input
            id="admin-email"
            type="email"
            placeholder="admin@dmarket.in"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-10"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="admin-password">Password</Label>
            <Link
              href="/forgot-password"
              className="text-xs font-semibold text-[var(--nc-primary)] hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="admin-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter administrator password"
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
          {loading ? 'Verifying...' : 'Sign In to Admin Console'}
        </Button>

        <p className="text-center text-[11px] text-[var(--nc-text-muted)]">
          Admin accounts are provisioned internally. Public registration is disabled.
        </p>
      </form>
    </AdminAuthShell>
  );
}
