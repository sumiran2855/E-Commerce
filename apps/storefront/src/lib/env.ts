import { validateEnv, z } from '@nextcommerce/validation';

const storefrontEnvSchema = z.object({
  NEXT_PUBLIC_APP_NAME: z.string().min(1).default('DMarket'),
  NEXT_PUBLIC_API_BASE_URL: z.string().min(1).default('/api/v1'),
  NEXT_PUBLIC_CATALOG_REMOTE_URL: z.string().url().default('http://localhost:5174/remoteEntry.js'),
  NEXT_PUBLIC_CART_REMOTE_URL: z.string().url().default('http://localhost:5175/remoteEntry.js'),
  NEXT_PUBLIC_ACCOUNT_REMOTE_URL: z.string().url().default('http://localhost:5176/remoteEntry.js'),
});

export const storefrontEnv = validateEnv(
  storefrontEnvSchema,
  {
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_CATALOG_REMOTE_URL: process.env.NEXT_PUBLIC_CATALOG_REMOTE_URL,
    NEXT_PUBLIC_CART_REMOTE_URL: process.env.NEXT_PUBLIC_CART_REMOTE_URL,
    NEXT_PUBLIC_ACCOUNT_REMOTE_URL: process.env.NEXT_PUBLIC_ACCOUNT_REMOTE_URL,
  },
  'storefront',
);
