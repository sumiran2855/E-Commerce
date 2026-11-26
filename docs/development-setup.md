# Development Setup

1. Install Node.js `>= 20.11.0` and `pnpm >= 10.0.0`.
2. Copy `.env.example` to `.env.local` in `apps/storefront`, `apps/seller-portal`, and `apps/admin-portal` if customizing URLs.
3. Run `pnpm install` at the repository root.
4. Run `pnpm dev` to start all 6 applications concurrently on ports `3000–3002` and `5174–5176`.
5. To add a new shared package, create `packages/<name>` with `package.json`, `tsconfig.json`, and `eslint.config.mjs`, then reference it via `"@nextcommerce/<name>": "workspace:*"`.
