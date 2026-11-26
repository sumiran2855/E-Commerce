import { validateEnv, z } from '@nextcommerce/validation';

const adminEnvSchema = z.object({
  NEXT_PUBLIC_APP_NAME: z.string().min(1).default('DMarket Admin'),
  NEXT_PUBLIC_API_BASE_URL: z.string().min(1).default('/api/v1'),
});

export const adminEnv = validateEnv(
  adminEnvSchema,
  {
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
  'admin-portal',
);
