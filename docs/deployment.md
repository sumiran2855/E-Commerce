# Deployment Strategy

Each application in `apps/` is independently buildable and deployable:

- **Storefront** (`apps/storefront`): Deploy to Node/Edge hosting at `www.nextcommerce.in`.
- **Seller Portal** (`apps/seller-portal`): Deploy independently at `seller.nextcommerce.in`.
- **Admin Portal** (`apps/admin-portal`): Deploy independently at `admin.nextcommerce.in` with restricted network/VPN/RBAC access.
- **Remotes** (`catalog-remote`, `cart-remote`, `account-remote`): Build static ESM bundles (`pnpm --filter @nextcommerce/catalog-remote build`) and serve from CDN with CORS enabled for `www.nextcommerce.in`.
