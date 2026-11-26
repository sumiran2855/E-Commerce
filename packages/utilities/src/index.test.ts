import { describe, expect, it } from 'vitest';
import { cn, formatINR, redactSensitiveData, safeExternalLinkProps } from './index';

describe('utilities', () => {
  it('merges tailwind classes cleanly', () => {
    expect(cn('px-2 py-1', 'px-4')).toBe('py-1 px-4');
  });

  it('formats INR amounts from paise', () => {
    expect(formatINR(199900)).toContain('1,999');
  });

  it('redacts sensitive keys', () => {
    expect(redactSensitiveData({ email: 'a@b.com', token: 'secret-jwt' })).toEqual({
      email: 'a@b.com',
      token: '[REDACTED]',
    });
  });

  it('builds safe external link props and rejects javascript: URLs', () => {
    expect(safeExternalLinkProps('https://www.nextcommerce.in')).toEqual({
      href: 'https://www.nextcommerce.in/',
      target: '_blank',
      rel: 'noopener noreferrer',
    });
    expect(() => safeExternalLinkProps('javascript:alert(1)')).toThrow();
  });
});
