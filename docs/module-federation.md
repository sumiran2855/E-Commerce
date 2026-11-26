# Module Federation Guide

## Why `@module-federation/vite` + `@module-federation/enhanced/runtime`

Traditional Webpack-based Next.js Module Federation plugins are incompatible with Next.js App Router and React Server Components. Instead, NextCommerce:

1. Keeps Next.js Server Components outside the federated runtime boundary.
2. Uses `@module-federation/vite` in remote Vite apps (`catalog-remote`, `cart-remote`, `account-remote`) to expose ESM `remoteEntry.js` bundles with `react` and `react-dom` configured as singletons (`^19.0.0`).
3. Uses `@module-federation/enhanced/runtime` (`init` + `loadRemote`) inside a Next.js Client Component (`RemoteModuleLoader`) wrapped in `React.Suspense` and a `RemoteErrorBoundary`.

## Remote URLs

| Remote           | Development URL                        | Exposed Modules                     |
| ---------------- | -------------------------------------- | ----------------------------------- |
| `catalog_remote` | `http://localhost:5174/remoteEntry.js` | `./ProductGrid`, `./ProductFilters` |
| `cart_remote`    | `http://localhost:5175/remoteEntry.js` | `./CartDrawer`                      |
| `account_remote` | `http://localhost:5176/remoteEntry.js` | `./ProfileWidget`                   |

## Adding a New Remote

1. Create `apps/<name>-remote` with `vite.config.ts` using `federation({ name, filename: 'remoteEntry.js', exposes, shared })` and `strictPort: true`.
2. Add `NEXT_PUBLIC_<NAME>_REMOTE_URL` to `apps/storefront/.env.example` and validate it in `apps/storefront/src/lib/env.ts`.
3. Register the remote in `ensureFederationInit()` inside `apps/storefront/src/components/remote-module-loader.tsx`.
