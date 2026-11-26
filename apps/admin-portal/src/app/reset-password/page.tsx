'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button, Input, Label } from '@nextcommerce/ui';
import { AdminAuthShell } from '@/components/admin-auth-shell';

export default function AdminResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 10) {
      setError('Admin passwords must be at least 10 characters');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    setError(null);
    setDone(true);
  }

  return (
    <AdminAuthShell
      title="Reset Admin Password"
      subtitle="Choose a strong corporate password (minimum 10 characters)"
    >
      {done ? (
        <div className="space-y-4 text-center">
          <CheckCircle2 className="mx-auto h-10 w-10 text-[var(--nc-success)]" />
          <p className="text-sm text-[var(--nc-text-secondary)]">
            Administrator password updated successfully.
          </p>
          <Button className="h-10 w-full" asChild>
            <Link href="/login">Return to Admin Sign In</Link>
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="space-y-1.5">
            <Label htmlFor="ar-pass">New Password</Label>
            <Input
              id="ar-pass"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="ar-confirm">Confirm Password</Label>
            <Input
              id="ar-confirm"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>
          {error ? <p className="text-xs text-[var(--nc-danger)]">{error}</p> : null}
          <Button type="submit" className="h-10 w-full">
            Update Password
          </Button>
        </form>
      )}
    </AdminAuthShell>
  );
}
