import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatINR(amountInPaise: number): string {
  const rupees = amountInPaise / 100;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: rupees % 1 === 0 ? 0 : 2,
  }).format(rupees);
}

export function safeExternalLinkProps(url: string): {
  href: string;
  target: '_blank';
  rel: 'noopener noreferrer';
} {
  const parsed = new URL(url);
  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
    throw new Error(`Unsupported external URL protocol: ${parsed.protocol}`);
  }
  return {
    href: parsed.toString(),
    target: '_blank',
    rel: 'noopener noreferrer',
  };
}

const SENSITIVE_KEYS = new Set([
  'password',
  'token',
  'accessToken',
  'refreshToken',
  'secret',
  'cookie',
]);

export function redactSensitiveData<T extends Record<string, unknown>>(
  payload: T,
): Record<string, unknown> {
  const output: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(payload)) {
    output[key] = SENSITIVE_KEYS.has(key) ? '[REDACTED]' : value;
  }
  return output;
}
