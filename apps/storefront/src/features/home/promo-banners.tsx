import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function PromoBannersSection() {
  return (
    <section aria-label="Promotional offers" className="grid grid-cols-1 gap-5 md:grid-cols-2">
      <div className="group relative overflow-hidden rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-950 to-slate-900 p-6 text-white shadow-md sm:p-8">
        <div className="relative z-10 max-w-sm space-y-3">
          <span className="inline-block rounded-full bg-indigo-500/25 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-indigo-200">
            Work &amp; Travel Gear
          </span>
          <h3 className="text-2xl font-bold leading-tight">
            Smart Audio, Wearables &amp; Backpacks
          </h3>
          <p className="text-sm text-slate-300">
            Save up to 42% on AuraTech audio gear and VastraLoom commuter essentials.
          </p>
          <div className="pt-2">
            <Link
              href="/category/electronics"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-slate-900 transition-transform group-hover:translate-x-0.5"
            >
              Shop Electronics <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
        <div className="mt-5 overflow-hidden rounded-2xl border border-white/10 sm:mt-6">
          <Image
            src="/images/categories/electronics.jpg"
            alt="Electronics collection"
            width={400}
            height={200}
            className="h-36 w-full object-cover opacity-90 transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </div>

      <div className="group relative overflow-hidden rounded-3xl border border-amber-200/80 bg-gradient-to-br from-amber-50 to-orange-50/70 p-6 text-slate-900 shadow-sm sm:p-8">
        <div className="relative z-10 max-w-sm space-y-3">
          <span className="inline-block rounded-full bg-amber-200/70 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-amber-900">
            Kitchen Upgrades
          </span>
          <h3 className="text-2xl font-bold leading-tight">Cook Healthier with RasoiCraft</h3>
          <p className="text-sm text-slate-600">
            Digital air fryers and tri-ply stainless cookware backed by doorstep warranties.
          </p>
          <div className="pt-2">
            <Link
              href="/category/home-kitchen"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-indigo-600"
            >
              Explore Home &amp; Kitchen <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
        <div className="mt-5 overflow-hidden rounded-2xl border border-amber-200/60 sm:mt-6">
          <Image
            src="/images/categories/home-kitchen.jpg"
            alt="Home and Kitchen collection"
            width={400}
            height={200}
            className="h-36 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
}
