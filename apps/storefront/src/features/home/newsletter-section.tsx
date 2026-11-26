'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button, Input, useToast } from '@nextcommerce/ui';
import { newsletterSchema } from '@/schemas/auth.schema';

export function NewsletterSection() {
  const { notify } = useToast();
  const [subscribed, setSubscribed] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<{ email: string }>({
    resolver: zodResolver(newsletterSchema),
  });

  async function onSubmit(values: { email: string }) {
    await new Promise((r) => setTimeout(r, 350));
    setSubscribed(true);
    reset();
    notify({
      title: 'Subscribed to DMarket',
      description: `Weekly deals and launch alerts will be sent to ${values.email}.`,
    });
  }

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="rounded-2xl border border-[var(--nc-border)] bg-[var(--nc-text)] px-6 py-10 text-white sm:px-10"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-blue-300">
          <Mail className="h-5 w-5" aria-hidden="true" />
        </div>
        <h2 id="newsletter-heading" className="mt-4 text-2xl font-bold tracking-tight">
          Get Exclusive Deals &amp; Early Festive Access
        </h2>
        <p className="mt-2 max-w-xl text-sm text-gray-300">
          Join 2,50,000+ shoppers across India receiving curated price-drop alerts and new brand
          launches. Unsubscribe anytime.
        </p>

        {subscribed ? (
          <div className="mt-6 inline-flex items-center gap-2 rounded-lg bg-green-500/20 px-4 py-2.5 text-sm font-medium text-green-300">
            <CheckCircle2 className="h-4 w-4" />
            You&apos;re subscribed! Watch your inbox for our next deal drop.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 flex w-full max-w-md flex-col gap-2 sm:flex-row"
            noValidate
          >
            <div className="flex-1 text-left">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <Input
                id="newsletter-email"
                type="email"
                placeholder="you@example.com"
                {...register('email')}
                className="h-10 border-white/20 bg-white text-[var(--nc-text)]"
              />
              {errors.email ? (
                <p className="mt-1 text-xs text-red-300">{errors.email.message}</p>
              ) : null}
            </div>
            <Button type="submit" size="md" className="h-10 px-6" disabled={isSubmitting}>
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
