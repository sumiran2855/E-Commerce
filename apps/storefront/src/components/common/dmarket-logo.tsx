import Link from 'next/link';
import { cn } from '@nextcommerce/utilities';

export function DMarketLogo({
  href = '/',
  subtitle,
  className,
}: {
  href?: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <Link href={href} className={cn('group inline-flex items-center gap-2.5', className)}>
      <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-blue-600 to-sky-500 shadow-md shadow-indigo-500/25 ring-1 ring-white/20 transition-all duration-200 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-indigo-500/35">
        <svg className="h-6 w-6" viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <path
            d="M23 20V17C23 12.5817 26.5817 9 31 9H33C37.4183 9 41 12.5817 41 17V20"
            stroke="white"
            strokeOpacity="0.9"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M17 20H34C42.2843 20 49 26.7157 49 35C49 43.2843 42.2843 50 34 50H17C15.8954 50 15 49.1046 15 48V22C15 20.8954 15.8954 20 17 20Z"
            fill="white"
          />
          <path
            d="M24 28H33C37.1421 28 40.5 31.3579 40.5 35.5C40.5 39.6421 37.1421 43 33 43H24V28Z"
            fill="#2563EB"
          />
          <circle cx="47" cy="17" r="5.5" fill="#F59E0B" stroke="white" strokeWidth="2.5" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="flex items-center gap-1 text-xl font-black tracking-tight text-slate-900">
          <span>D</span>
          <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
            Market
          </span>
        </span>
        {subtitle ? (
          <span className="mt-0.5 text-[9.5px] font-bold uppercase tracking-[0.14em] text-slate-400">
            {subtitle}
          </span>
        ) : null}
      </span>
    </Link>
  );
}
