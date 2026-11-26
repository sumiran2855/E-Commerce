'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AlertCircle, CheckCircle2, FileText } from 'lucide-react';
import { Button, Input, Label, useToast } from '@nextcommerce/ui';
import { emailSchema, indianPhoneSchema } from '@nextcommerce/validation';
import { SellerAuthShell } from '@/components/seller-auth-shell';

const STEPS = ['Personal', 'Business', 'Verification', 'Review'] as const;

export default function SellerRegisterPage() {
  const router = useRouter();
  const { notify } = useToast();
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    businessName: '',
    businessType: 'Private Limited',
    address: '',
    state: 'Karnataka',
    city: '',
    pincode: '',
    gstin: '',
    pan: '',
    gstDocName: 'gst-certificate-placeholder.pdf',
    panDocName: 'pan-card-placeholder.pdf',
  });

  function updateField(key: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validateStep(): boolean {
    setError(null);
    if (step === 0) {
      if (form.fullName.trim().length < 2) {
        setError('Full name is required');
        return false;
      }
      if (!emailSchema.safeParse(form.email).success) {
        setError('Enter a valid email address');
        return false;
      }
      if (!indianPhoneSchema.safeParse(form.mobile).success) {
        setError('Enter a valid 10-digit Indian mobile number');
        return false;
      }
      if (form.password.length < 8) {
        setError('Password must be at least 8 characters');
        return false;
      }
    } else if (step === 1) {
      if (!form.businessName.trim() || !form.address.trim() || !form.city.trim()) {
        setError('Please complete all business address fields');
        return false;
      }
      if (!/^[1-9][0-9]{5}$/.test(form.pincode.trim())) {
        setError('Enter a valid 6-digit PIN code');
        return false;
      }
    } else if (step === 2) {
      if (
        !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(
          form.gstin.trim().toUpperCase(),
        )
      ) {
        setError('Enter a valid 15-character GSTIN (e.g. 29ABCDE1234F1Z5)');
        return false;
      }
      if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(form.pan.trim().toUpperCase())) {
        setError('Enter a valid 10-character PAN (e.g. ABCDE1234F)');
        return false;
      }
    }
    return true;
  }

  function handleNext() {
    if (validateStep()) setStep((s) => Math.min(3, s + 1));
  }

  async function handleSubmit() {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    notify({
      title: 'Seller application submitted',
      description: 'Your store is now pending verification.',
    });
    router.push('/account-pending');
  }

  return (
    <SellerAuthShell
      title="Become a DMarket Seller"
      subtitle="Complete the 4-step onboarding to start selling across India"
      footer={
        <p className="text-[var(--nc-text-secondary)]">
          Already registered?{' '}
          <Link href="/login" className="font-semibold text-[var(--nc-primary)] hover:underline">
            Sign in to Seller Central
          </Link>
        </p>
      }
    >
      {/* Stepper */}
      <div className="mb-6 grid grid-cols-4 gap-2">
        {STEPS.map((label, idx) => (
          <div key={label} className="text-center">
            <div
              className={`h-1.5 rounded-full ${
                idx <= step ? 'bg-[var(--nc-primary)]' : 'bg-[var(--nc-bg-muted)]'
              }`}
            />
            <span
              className={`mt-1.5 block text-[11px] font-medium ${
                idx === step ? 'text-[var(--nc-primary)]' : 'text-[var(--nc-text-muted)]'
              }`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      {error ? (
        <div
          role="alert"
          className="mb-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-[var(--nc-danger)]"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      ) : null}

      {step === 0 ? (
        <div className="space-y-3.5">
          <div className="space-y-1">
            <Label htmlFor="s-name">Full Name</Label>
            <Input
              id="s-name"
              value={form.fullName}
              onChange={(e) => updateField('fullName', e.target.value)}
              placeholder="Rohan Mehta"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="s-email">Business Email</Label>
            <Input
              id="s-email"
              type="email"
              value={form.email}
              onChange={(e) => updateField('email', e.target.value)}
              placeholder="rohan@auratech.in"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="s-mobile">Mobile Number</Label>
            <Input
              id="s-mobile"
              type="tel"
              value={form.mobile}
              onChange={(e) => updateField('mobile', e.target.value)}
              placeholder="9876543210"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="s-pass">Password</Label>
            <Input
              id="s-pass"
              type="password"
              value={form.password}
              onChange={(e) => updateField('password', e.target.value)}
              placeholder="Minimum 8 characters"
            />
          </div>
        </div>
      ) : null}

      {step === 1 ? (
        <div className="space-y-3.5">
          <div className="space-y-1">
            <Label htmlFor="b-name">Registered Business Name</Label>
            <Input
              id="b-name"
              value={form.businessName}
              onChange={(e) => updateField('businessName', e.target.value)}
              placeholder="AuraTech Retail Pvt Ltd"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="b-type">Business Type</Label>
            <select
              id="b-type"
              value={form.businessType}
              onChange={(e) => updateField('businessType', e.target.value)}
              className="h-9 w-full rounded-md border border-[var(--nc-border)] bg-[var(--nc-bg)] px-3 text-sm"
            >
              <option>Proprietorship</option>
              <option>Partnership</option>
              <option>LLP</option>
              <option>Private Limited</option>
            </select>
          </div>
          <div className="space-y-1">
            <Label htmlFor="b-addr">Registered Address</Label>
            <Input
              id="b-addr"
              value={form.address}
              onChange={(e) => updateField('address', e.target.value)}
              placeholder="42 MG Road, Indiranagar"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="b-city">City</Label>
              <Input
                id="b-city"
                value={form.city}
                onChange={(e) => updateField('city', e.target.value)}
                placeholder="Bengaluru"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="b-pin">PIN Code</Label>
              <Input
                id="b-pin"
                value={form.pincode}
                onChange={(e) => updateField('pincode', e.target.value)}
                placeholder="560038"
                maxLength={6}
              />
            </div>
          </div>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="v-gstin">GSTIN (15 characters)</Label>
            <Input
              id="v-gstin"
              value={form.gstin}
              onChange={(e) => updateField('gstin', e.target.value.toUpperCase())}
              placeholder="29ABCDE1234F1Z5"
              maxLength={15}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="v-pan">Business PAN (10 characters)</Label>
            <Input
              id="v-pan"
              value={form.pan}
              onChange={(e) => updateField('pan', e.target.value.toUpperCase())}
              placeholder="ABCDE1234F"
              maxLength={10}
            />
          </div>
          <div className="rounded-lg border border-dashed border-[var(--nc-border)] bg-[var(--nc-bg-secondary)] p-3 text-xs text-[var(--nc-text-secondary)]">
            <p className="font-semibold text-[var(--nc-text)]">
              Document Placeholders (Prototype UI)
            </p>
            <div className="mt-2 space-y-1.5">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-[var(--nc-primary)]" />
                <span>GST Certificate: {form.gstDocName}</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-[var(--nc-primary)]" />
                <span>PAN Card Copy: {form.panDocName}</span>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {step === 3 ? (
        <div className="space-y-3 text-xs">
          <div className="flex items-center gap-2 rounded-lg bg-blue-50 p-3 text-[var(--nc-primary)]">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>Review your seller details before submitting for compliance review.</span>
          </div>
          <dl className="divide-y divide-[var(--nc-border)]">
            <div className="flex justify-between py-2">
              <dt className="text-[var(--nc-text-muted)]">Owner</dt>
              <dd className="font-medium text-[var(--nc-text)]">{form.fullName}</dd>
            </div>
            <div className="flex justify-between py-2">
              <dt className="text-[var(--nc-text-muted)]">Email / Mobile</dt>
              <dd className="font-medium text-[var(--nc-text)]">
                {form.email} · {form.mobile}
              </dd>
            </div>
            <div className="flex justify-between py-2">
              <dt className="text-[var(--nc-text-muted)]">Business</dt>
              <dd className="font-medium text-[var(--nc-text)]">
                {form.businessName} ({form.businessType})
              </dd>
            </div>
            <div className="flex justify-between py-2">
              <dt className="text-[var(--nc-text-muted)]">Location</dt>
              <dd className="font-medium text-[var(--nc-text)]">
                {form.city}, {form.state} - {form.pincode}
              </dd>
            </div>
            <div className="flex justify-between py-2">
              <dt className="text-[var(--nc-text-muted)]">GSTIN / PAN</dt>
              <dd className="font-medium text-[var(--nc-text)]">
                {form.gstin} / {form.pan}
              </dd>
            </div>
          </dl>
        </div>
      ) : null}

      <div className="mt-6 flex items-center justify-between gap-3">
        {step > 0 ? (
          <Button type="button" variant="outline" onClick={() => setStep((s) => s - 1)}>
            Back
          </Button>
        ) : (
          <div />
        )}
        {step < 3 ? (
          <Button type="button" onClick={handleNext}>
            Continue
          </Button>
        ) : (
          <Button type="button" onClick={handleSubmit} disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit Application'}
          </Button>
        )}
      </div>
    </SellerAuthShell>
  );
}
