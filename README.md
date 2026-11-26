# NextCommerce Frontend (`nextcommerce-frontend`)

Production-oriented **Hybrid Micro Frontend (MFE)** monorepo for **NextCommerce**, a multi-vendor e-commerce marketplace targeting the Indian market.

## Architecture Overview

NextCommerce combines:

- **Next.js App Router** for SEO-critical, server-rendered host applications (`storefront`, `seller-portal`, `admin-portal`).
- **Vite + React + `@module-federation/vite`** for independently built, runtime-federated client modules (`catalog-remote`, `cart-remote`, `account-remote`).
- **`@module-federation/enhanced/runtime`** inside Next.js Client Components for lazy, fault-tolerant runtime composition (with `React.Suspense`, skeleton loading, and `ErrorBoundary` fallbacks).
- **Turborepo + pnpm workspaces** for shared packages (`ui`, `design-system`, `shared-types`, `api-client`, `auth-client`, `validation`, `event-bus`, `utilities`, `config-eslint`, `config-typescript`).

## Applications & Local Ports

| App                   | Framework          | Port   | Domain (Target)               | Purpose                                       |
| --------------------- | ------------------ | ------ | ----------------------------- | --------------------------------------------- |
| `apps/storefront`     | Next.js App Router | `3000` | `www.nextcommerce.in`         | Customer-facing SSR shell & MFE host          |
| `apps/seller-portal`  | Next.js App Router | `3001` | `seller.nextcommerce.in`      | Independent seller dashboard shell            |
| `apps/admin-portal`   | Next.js App Router | `3002` | `admin.nextcommerce.in`       | Independent platform admin console            |
| `apps/catalog-remote` | Vite + React + MF  | `5174` | `cdn.nextcommerce.in/catalog` | Federated `./ProductGrid`, `./ProductFilters` |
| `apps/cart-remote`    | Vite + React + MF  | `5175` | `cdn.nextcommerce.in/cart`    | Federated `./CartDrawer`                      |
| `apps/account-remote` | Vite + React + MF  | `5176` | `cdn.nextcommerce.in/account` | Federated `./ProfileWidget`                   |

## Shared Packages

- `@nextcommerce/design-system`: Brand colors, typography, spacing, shadows, breakpoints, and CSS custom properties (`tokens.css`).
- `@nextcommerce/ui`: Accessible Radix UI + Tailwind CSS v4 component library (`Button`, `Input`, `Label`, `Card`, `Badge`, `Dialog`, `DropdownMenu`, `Select`, `Checkbox`, `Skeleton`, `Table`, `Pagination`, `Toast`, `Spinner`, `ErrorState`, `EmptyState`).
- `@nextcommerce/shared-types`: Shared TypeScript contracts for auth, user, product, cart, order, and API responses.
- `@nextcommerce/api-client`: Split Axios browser client (`@nextcommerce/api-client/browser`) and Fetch server client (`@nextcommerce/api-client/server`) with CSRF & timeout handling.
- `@nextcommerce/auth-client`: OAuth 2.0 / OIDC BFF session abstraction (`AuthProvider`, `useAuth`, role-aware navigation, and dev-only `MockAuthAdapter`).
- `@nextcommerce/validation`: Shared Zod schemas (email, Indian phone numbers, pagination, `validateEnv`).
- `@nextcommerce/event-bus`: Typed browser `CustomEvent` bus (`cart:updated`, `wishlist:updated`, `user:authenticated`, `user:logged-out`, `order:created`).
- `@nextcommerce/utilities`: `cn`, `formatINR`, `safeExternalLinkProps`, `redactSensitiveData`.
- `@nextcommerce/config-eslint` & `@nextcommerce/config-typescript`: Shared strict linting and `tsconfig` presets.

## Prerequisites & Installation

- **Node.js**: `>= 20.11.0` (tested on `v22.22.1`)
- **pnpm**: `>= 10.0.0` (configured with `pnpm@12.23.0`)

```bash
pnpm install
```

## Development Commands

```bash
pnpm dev          # Start all 6 apps concurrently via Turborepo
pnpm build        # Build all packages and apps
pnpm typecheck    # Run TypeScript strict checks across the workspace
pnpm lint         # Run ESLint across all packages and apps
pnpm test         # Run Vitest unit & component tests
pnpm test:e2e     # Run Playwright E2E tests
pnpm format       # Format all files with Prettier
pnpm clean        # Clean build artifacts
```

## Documentation

Detailed architectural guides live in [`docs/`](./docs/architecture.md):

- [Architecture Overview](./docs/architecture.md)
- [Frontend Architecture](./docs/frontend-architecture.md)
- [Module Federation](./docs/module-federation.md)
- [Design System](./docs/design-system.md)
- [Development Setup](./docs/development-setup.md)
- [Environment Configuration](./docs/environment-configuration.md)
- [Security](./docs/security.md)
- [Testing](./docs/testing.md)
- [Deployment](./docs/deployment.md)
