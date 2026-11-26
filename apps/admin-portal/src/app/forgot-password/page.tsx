'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button, Input, Label, useToast } from '@nextcommerce/ui';
import { emailSchema } from '@nextcommerce/validation';
import { AdminAuthShell } from '@/components/admin-auth-shell';

export default function AdminForgotPasswordPage() {
  const router = useRouter();
  const { notify } = useToast();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!emailSchema.safeParse(email).success) {
      setError('Enter a valid corporate email address');
      return;
    }
    notify({ title: 'Security OTP sent', description: `Verification code sent to ${email}.` });
    router.push('/verify-otp');
  }

  return (
    <AdminAuthShell
      title="Admin Password Recovery"
      subtitle="Verify your corporate identity via 6-digit MFA code"
      footer={
        <Link href="/login" className="font-medium text-[var(--nc-primary)] hover:underline">
          Back to Admin Sign In
        </Link>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div className="space-y-1.5">
          <Label htmlFor="af-email">Corporate Email</Label>
          <Input
            id="af-email"
            type="email"
            placeholder="admin@dmarket.in"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error ? <p className="text-xs text-[var(--nc-danger)]">{error}</p> : null}
        </div>
        <Button type="submit" className="h-10 w-full">
          Send Security OTP
        </Button>
      </form>
    </AdminAuthShell>
  );
}
