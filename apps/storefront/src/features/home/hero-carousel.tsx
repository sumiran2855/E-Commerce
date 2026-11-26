'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck, Sparkles } from 'lucide-react';
import { HERO_SLIDES } from '@/constants/storefront';
import { cn } from '@nextcommerce/utilities';

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[activeIndex]!;

  return (
    <section
      aria-label="Featured promotions"
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white shadow-xl"
    >
      {/* Subtle decorative radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 right-1/3 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl"
      />

      <div className="relative grid grid-cols-1 items-center gap-8 p-6 sm:p-10 lg:grid-cols-12 lg:p-12">
        <div className="space-y-5 lg:col-span-6">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-400/30 bg-indigo-500/15 px-3.5 py-1 text-xs font-semibold text-indigo-200 backdrop-blur-xs">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
            {slide.badge}
          </span>

          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                {slide.title}
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
                {slide.subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href={slide.primaryCta.href}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 px-6 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition-all hover:scale-[1.02] hover:from-indigo-400 hover:to-blue-400"
            >
              {slide.primaryCta.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={slide.secondaryCta.href}
              className="inline-flex h-11 items-center rounded-xl border border-white/20 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur-xs transition-colors hover:bg-white/20"
            >
              {slide.secondaryCta.label}
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-3 text-xs text-slate-300">
            <div>
              <span className="block text-base font-bold text-amber-400">
                {slide.highlightStat}
              </span>
              <span>{slide.highlightSub}</span>
            </div>
            <div className="h-8 w-px bg-white/15" aria-hidden="true" />
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-400" aria-hidden="true" />
              <div>
                <span className="block text-sm font-bold text-white">100% Genuine</span>
                <span>Verified Indian Sellers</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative lg:col-span-6">
          <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-slate-900/50 shadow-2xl">
            <Image
              src={slide.image}
              alt={slide.title}
              width={800}
              height={520}
              priority
              className="aspect-[16/10] w-full object-cover"
            />
            <div className="absolute bottom-3 left-3 rounded-xl border border-white/20 bg-slate-950/75 px-3.5 py-2 backdrop-blur-md">
              <p className="text-[11px] font-medium text-slate-300">Featured Collection</p>
              <p className="text-xs font-bold text-white">{slide.highlightStat} · Free Delivery</p>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Controls */}
      <div className="relative flex items-center justify-between border-t border-white/10 bg-slate-950/40 px-6 py-3 backdrop-blur-xs">
        <div className="flex items-center gap-2" role="tablist" aria-label="Hero slides">
          {HERO_SLIDES.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={idx === activeIndex}
              aria-label={`Show slide ${idx + 1}: ${item.title}`}
              onClick={() => setActiveIndex(idx)}
              className={cn(
                'h-2 rounded-full transition-all',
                idx === activeIndex ? 'w-8 bg-amber-400' : 'w-2 bg-white/30 hover:bg-white/60',
              )}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() =>
              setActiveIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
            }
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
