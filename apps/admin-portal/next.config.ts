import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: [
    '@nextcommerce/ui',
    '@nextcommerce/design-system',
    '@nextcommerce/shared-types',
    '@nextcommerce/api-client',
    '@nextcommerce/auth-client',
    '@nextcommerce/utilities',
    '@nextcommerce/validation',
  ],
};

export default nextConfig;
