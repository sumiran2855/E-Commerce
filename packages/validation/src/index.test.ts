import { describe, expect, it } from 'vitest';
import { emailSchema, indianPhoneSchema, paginationQuerySchema, validateEnv, z } from './index';

describe('validation schemas', () => {
  it('validates emails and Indian mobile numbers', () => {
    expect(emailSchema.safeParse('buyer@nextcommerce.in').success).toBe(true);
    expect(emailSchema.safeParse('not-an-email').success).toBe(false);

    expect(indianPhoneSchema.safeParse('9876543210').success).toBe(true);
    expect(indianPhoneSchema.safeParse('+91 9876543210').success).toBe(true);
    expect(indianPhoneSchema.safeParse('12345').success).toBe(false);
  });

  it('parses pagination defaults', () => {
    expect(paginationQuerySchema.parse({})).toEqual({ page: 1, limit: 20 });
  });

  it('validates environment variables and throws clear errors', () => {
    const schema = z.object({ NEXT_PUBLIC_APP_NAME: z.string().min(1) });
    expect(validateEnv(schema, { NEXT_PUBLIC_APP_NAME: 'NextCommerce' }, 'storefront')).toEqual({
      NEXT_PUBLIC_APP_NAME: 'NextCommerce',
    });
    expect(() => validateEnv(schema, {}, 'storefront')).toThrow(
      /Invalid environment configuration/,
    );
  });
});
