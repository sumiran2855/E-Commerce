# Environment Configuration

All public variables are validated with Zod (`validateEnv` from `@nextcommerce/validation`) at startup.

## Storefront (`apps/storefront/.env.example`)

- `NEXT_PUBLIC_APP_NAME` (public)
- `NEXT_PUBLIC_API_BASE_URL` (public, same-origin BFF route `/api/v1`)
- `NEXT_PUBLIC_CATALOG_REMOTE_URL` (public)
- `NEXT_PUBLIC_CART_REMOTE_URL` (public)
- `NEXT_PUBLIC_ACCOUNT_REMOTE_URL` (public)
- `INTERNAL_API_GATEWAY_URL` (server-only, never exposed to browser)
- `SENTRY_DSN` (server-only)

## Seller & Admin Portals

- `NEXT_PUBLIC_APP_NAME` (public)
- `NEXT_PUBLIC_API_BASE_URL` (public)
- `INTERNAL_API_GATEWAY_URL` (server-only)
