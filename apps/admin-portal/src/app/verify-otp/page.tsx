'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button, Input, Label, useToast } from '@nextcommerce/ui';
import { AdminAuthShell } from '@/components/admin-auth-shell';

export default function AdminVerifyOtpPage() {
  const router = useRouter();
  const { notify } = useToast();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\d{6}$/.test(otp.trim())) {
      setError('Enter the 6-digit MFA verification code');
      return;
    }
    notify({ title: 'MFA verified', description: 'Proceed to reset your admin password.' });
    router.push('/reset-password');
  }

  return (
    <AdminAuthShell
      title="Verify Admin OTP"
      subtitle="Enter the 6-digit security code from your authenticator or corporate email"
      footer={
        <Link href="/login" className="font-medium text-[var(--nc-primary)] hover:underline">
          Back to Sign In
        </Link>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div className="space-y-1.5">
          <Label htmlFor="a-otp">6-Digit Security Code</Label>
          <Input
            id="a-otp"
            inputMode="numeric"
            maxLength={6}
            placeholder="123456"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
            className="h-11 text-center text-lg font-bold tracking-widest"
          />
          {error ? <p className="text-xs text-[var(--nc-danger)]">{error}</p> : null}
        </div>
        <Button type="submit" className="h-10 w-full">
          Verify &amp; Continue
        </Button>
      </form>
    </AdminAuthShell>
  );
}
