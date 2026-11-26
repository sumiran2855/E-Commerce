'use client';

import Image from 'next/image';
import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { DMarketLogo } from '@/components/common/dmarket-logo';

export interface AuthShellProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="min-h-[calc(100vh-10rem)] bg-gradient-to-br from-slate-50 via-indigo-50/40 to-slate-100 px-4 py-8 sm:px-6 lg:py-12">
      <div className="mx-auto grid max-w-5xl grid-cols-1 overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-2xl shadow-indigo-950/5 lg:grid-cols-12">
        {/* Left Visual Showcase Panel */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-8 text-white lg:col-span-5 lg:flex">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-indigo-500/25 blur-3xl"
          />

          <div className="relative z-10 space-y-4">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-400/30 bg-indigo-500/20 px-3 py-1 text-[11px] font-semibold text-indigo-200">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              DMarket India
            </span>
            <h2 className="text-2xl font-extrabold leading-snug tracking-tight">
              Curated brands, fast delivery, and seamless checkout.
            </h2>
            <p className="text-xs leading-relaxed text-slate-300">
              Join 2,50,000+ shoppers discovering verified electronics, fashion, and smart home
              essentials across 19,000+ PIN codes.
            </p>
          </div>

          <div className="relative z-10 my-6 overflow-hidden rounded-2xl border border-white/15 shadow-lg">
            <Image
              src="/images/auth-showcase.jpg"
              alt="Curated DMarket products"
              width={480}
              height={360}
              className="h-52 w-full object-cover"
            />
          </div>

          <div className="relative z-10 space-y-2.5 text-xs text-slate-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
              <span>100% genuine products from verified sellers</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
              <span>UPI, RuPay, Cards &amp; Cash on Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
              <span>Hassle-free 7-day returns &amp; instant refunds</span>
            </div>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="flex flex-col justify-center p-6 sm:p-10 lg:col-span-7">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mx-auto w-full max-w-md space-y-6"
          >
            <div>
              <div className="mb-4 lg:hidden">
                <DMarketLogo subtitle="India Marketplace" />
              </div>
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">{title}</h1>
              <p className="mt-1.5 text-sm text-slate-600">{subtitle}</p>
            </div>

            {children}

            {footer ? <div className="pt-1 text-center text-sm">{footer}</div> : null}

            <div className="flex items-center justify-center gap-1.5 border-t border-slate-100 pt-4 text-xs text-slate-400">
              <ShieldCheck className="h-4 w-4 text-emerald-600" aria-hidden="true" />
              <span>Protected by DMarket encrypted authentication</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
