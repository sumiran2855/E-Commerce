import Link from 'next/link';
import type { ReactNode } from 'react';
import { CheckCircle2, ShieldCheck, Store, TrendingUp } from 'lucide-react';
import { Badge } from '@nextcommerce/ui';

export function SellerAuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 via-indigo-50/40 to-slate-100 px-4 py-10">
      <div className="grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-2xl shadow-slate-900/5 lg:grid-cols-12">
        {/* Left Seller Showcase */}
        <div className="relative hidden flex-col justify-between bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-8 text-white lg:col-span-5 lg:flex">
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 font-bold text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md">
                <Store className="h-5 w-5" />
              </span>
              <span className="text-xl font-extrabold">DMarket</span>
              <Badge variant="primary">Seller Central</Badge>
            </Link>
            <h2 className="pt-2 text-2xl font-extrabold leading-snug">
              Scale your brand across 19,000+ Indian PIN codes.
            </h2>
            <p className="text-xs leading-relaxed text-slate-300">
              Manage inventory, automate GST-compliant invoicing, and receive fast 7-day INR payouts
              directly to your bank account.
            </p>
          </div>

          <div className="my-6 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xs">
              <TrendingUp className="h-5 w-5 text-amber-400" />
              <p className="mt-2 text-lg font-extrabold">0% Setup</p>
              <p className="text-[11px] text-slate-300">Zero onboarding fee</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xs">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
              <p className="mt-2 text-lg font-extrabold">7-Day</p>
              <p className="text-[11px] text-slate-300">Fast INR settlements</p>
            </div>
          </div>

          <div className="space-y-2 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>GSTIN &amp; PAN guided verification</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Dedicated seller support &amp; logistics</span>
            </div>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="flex flex-col justify-center p-6 sm:p-10 lg:col-span-7">
          <div className="mx-auto w-full max-w-md space-y-6">
            <div>
              <Link
                href="/"
                className="mb-4 inline-flex items-center gap-2 font-bold text-slate-900 lg:hidden"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                  <Store className="h-4 w-4" />
                </span>
                <span className="text-lg font-extrabold">DMarket</span>
                <Badge variant="primary">Seller Central</Badge>
              </Link>
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">{title}</h1>
              <p className="mt-1.5 text-sm text-slate-600">{subtitle}</p>
            </div>

            {children}

            {footer ? <div className="text-center text-sm">{footer}</div> : null}

            <div className="flex items-center justify-center gap-1.5 border-t border-slate-100 pt-4 text-xs text-slate-400">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Verified Seller Onboarding · GSTIN &amp; Compliance Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
