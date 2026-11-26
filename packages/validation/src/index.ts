import { z } from 'zod';

export const emailSchema = z.string().trim().email('Please enter a valid email address');

export const indianPhoneSchema = z
  .string()
  .trim()
  .regex(/^(\+91[-\s]?)?[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number');

export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export type PaginationQuery = z.infer<typeof paginationQuerySchema>;

export function validateEnv<T extends z.ZodTypeAny>(
  schema: T,
  env: Record<string, string | undefined>,
  appName: string,
): z.infer<T> {
  const result = schema.safeParse(env);
  if (!result.success) {
    const formatted = result.error.issues
      .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
      .join('; ');
    throw new Error(`[${appName}] Invalid environment configuration: ${formatted}`);
  }
  return result.data;
}

export { z };
