'use client';

import Link from 'next/link';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button, useToast } from '@nextcommerce/ui';
import { AuthShell } from '@/features/auth/auth-shell';
import { PasswordField } from '@/features/auth/password-field';
import { resetPasswordSchema, type ResetPasswordFormValues } from '@/schemas/auth.schema';
import { resetPassword } from '@/services/auth.service';

export default function ResetPasswordPage() {
  const { notify } = useToast();
  const [done, setDone] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  const passwordValue = watch('password');

  async function onSubmit() {
    const res = await resetPassword();
    setDone(true);
    notify({ title: 'Password updated', description: res.message });
  }

  return (
    <AuthShell
      title="Reset your password"
      subtitle="Choose a strong new password for your DMarket account"
    >
      {done ? (
        <div className="space-y-4 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-[var(--nc-success)]">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <p className="text-sm text-[var(--nc-text-secondary)]">
            Your password has been reset successfully.
          </p>
          <Button className="h-10 w-full" asChild>
            <Link href="/login">Continue to Sign In</Link>
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <PasswordField
            id="password"
            label="New Password"
            placeholder="Minimum 8 characters"
            showStrength
            watchedValue={passwordValue}
            error={errors.password?.message}
            {...register('password')}
          />
          <PasswordField
            id="confirmPassword"
            label="Confirm New Password"
            placeholder="Re-enter your new password"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />
          <Button type="submit" className="h-10 w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Updating password...' : 'Reset Password'}
          </Button>
        </form>
      )}
    </AuthShell>
  );
}
