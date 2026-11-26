'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Mail, MapPin, Phone } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Button, Input, Label, useToast } from '@nextcommerce/ui';
import { StaticInfoPage } from '@/components/common/static-info-page';
import { contactSchema, type ContactFormValues } from '@/schemas/auth.schema';

export default function ContactPage() {
  const { notify } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(values: ContactFormValues) {
    await new Promise((r) => setTimeout(r, 400));
    setSubmitted(true);
    reset();
    notify({
      title: 'Message received',
      description: `Thanks ${values.name}, our support team will reply within 24 hours.`,
    });
  }

  return (
    <StaticInfoPage
      title="Contact Us"
      subtitle="Reach our India-based customer support or seller onboarding desk."
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
        <div className="space-y-4 md:col-span-5">
          <div className="rounded-xl border border-[var(--nc-border)] bg-[var(--nc-bg-secondary)] p-5 space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 text-[var(--nc-primary)]" />
              <div>
                <p className="font-semibold text-[var(--nc-text)]">Email Support</p>
                <p className="text-xs">support@dmarket.in</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 text-[var(--nc-primary)]" />
              <div>
                <p className="font-semibold text-[var(--nc-text)]">Helpline (IST 8 AM – 10 PM)</p>
                <p className="text-xs">+91 80 4567 8900</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 text-[var(--nc-primary)]" />
              <div>
                <p className="font-semibold text-[var(--nc-text)]">Corporate Office</p>
                <p className="text-xs">Indiranagar 100ft Road, Bengaluru, Karnataka 560038</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[var(--nc-border)] bg-[var(--nc-bg)] p-6 md:col-span-7">
          {submitted ? (
            <div className="space-y-3 py-6 text-center">
              <CheckCircle2 className="mx-auto h-10 w-10 text-[var(--nc-success)]" />
              <h2 className="text-base font-bold text-[var(--nc-text)]">Inquiry Submitted</h2>
              <p className="text-xs text-[var(--nc-text-secondary)]">
                Ticket #NC-4821 has been created. Our team will respond shortly.
              </p>
              <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              <div className="space-y-1.5">
                <Label htmlFor="contact-name">Your Name</Label>
                <Input id="contact-name" placeholder="Aarav Sharma" {...register('name')} />
                {errors.name ? (
                  <p className="text-xs text-[var(--nc-danger)]">{errors.name.message}</p>
                ) : null}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="contact-email">Email Address</Label>
                <Input
                  id="contact-email"
                  type="email"
                  placeholder="aarav@example.com"
                  {...register('email')}
                />
                {errors.email ? (
                  <p className="text-xs text-[var(--nc-danger)]">{errors.email.message}</p>
                ) : null}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="contact-subject">Subject</Label>
                <Input
                  id="contact-subject"
                  placeholder="Order inquiry / Return request"
                  {...register('subject')}
                />
                {errors.subject ? (
                  <p className="text-xs text-[var(--nc-danger)]">{errors.subject.message}</p>
                ) : null}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="contact-message">Message</Label>
                <textarea
                  id="contact-message"
                  rows={4}
                  placeholder="Describe how we can help..."
                  {...register('message')}
                  className="w-full rounded-md border border-[var(--nc-border)] bg-[var(--nc-bg)] p-3 text-sm text-[var(--nc-text)] focus:border-[var(--nc-primary)] focus:outline-none"
                />
                {errors.message ? (
                  <p className="text-xs text-[var(--nc-danger)]">{errors.message.message}</p>
                ) : null}
              </div>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </StaticInfoPage>
  );
}
