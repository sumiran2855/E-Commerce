import Link from 'next/link';
import type { ReactNode } from 'react';
import { Lock, ShieldCheck } from 'lucide-react';
import { Badge } from '@nextcommerce/ui';

export function AdminAuthShell({
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
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 px-4 py-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-indigo-600/20 blur-3xl"
      />
      <div className="relative z-10 w-full max-w-md space-y-6">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2.5 font-bold text-white">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-rose-600 to-indigo-600 text-white shadow-lg">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <span className="text-xl font-extrabold tracking-tight">DMarket</span>
            <Badge variant="danger">Admin</Badge>
          </Link>
          <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-white">{title}</h1>
          <p className="mt-1.5 text-sm text-slate-400">{subtitle}</p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-white p-6 shadow-2xl sm:p-8">
          {children}
        </div>

        {footer ? <div className="text-center text-sm text-slate-300">{footer}</div> : null}

        <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400">
          <Lock className="h-3.5 w-3.5" />
          <span>Authorized personnel only · Access is logged and audited</span>
        </div>
      </div>
    </div>
  );
}
