'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button, Input, Label, useToast } from '@nextcommerce/ui';
import { SellerAuthShell } from '@/components/seller-auth-shell';

export default function SellerVerifyOtpPage() {
  const router = useRouter();
  const { notify } = useToast();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^\d{6}$/.test(otp.trim())) {
      setError('Enter a valid 6-digit OTP');
      return;
    }
    notify({ title: 'OTP verified', description: 'You can now set a new password.' });
    router.push('/reset-password');
  }

  return (
    <SellerAuthShell
      title="Verify Seller OTP"
      subtitle="Enter the 6-digit security code sent to your business email"
      footer={
        <Link href="/login" className="font-medium text-[var(--nc-primary)] hover:underline">
          Back to Sign In
        </Link>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div className="space-y-1.5">
          <Label htmlFor="s-otp">6-Digit OTP</Label>
          <Input
            id="s-otp"
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
    </SellerAuthShell>
  );
}
