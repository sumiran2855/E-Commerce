'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button, Input, Label, useToast } from '@nextcommerce/ui';
import { emailSchema } from '@nextcommerce/validation';
import { SellerAuthShell } from '@/components/seller-auth-shell';

export default function SellerForgotPasswordPage() {
  const router = useRouter();
  const { notify } = useToast();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!emailSchema.safeParse(email).success) {
      setError('Enter a valid seller email address');
      return;
    }
    notify({ title: 'OTP sent', description: `Verification code sent to ${email}.` });
    router.push('/verify-otp');
  }

  return (
    <SellerAuthShell
      title="Reset Seller Password"
      subtitle="Enter your registered business email to receive a 6-digit OTP"
      footer={
        <Link href="/login" className="font-medium text-[var(--nc-primary)] hover:underline">
          Back to Seller Sign In
        </Link>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div className="space-y-1.5">
          <Label htmlFor="sf-email">Business Email</Label>
          <Input
            id="sf-email"
            type="email"
            placeholder="store@company.in"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {error ? <p className="text-xs text-[var(--nc-danger)]">{error}</p> : null}
        </div>
        <Button type="submit" className="h-10 w-full">
          Send OTP
        </Button>
      </form>
    </SellerAuthShell>
  );
}
