# System Architecture

NextCommerce uses a **Hybrid Micro Frontend Architecture**:

- **Storefront** (`apps/storefront`) is a Next.js App Router host responsible for SSR, SEO metadata, routing, authentication shell, and lazy client-side composition of federated remotes.
- **Seller Portal** (`apps/seller-portal`) and **Admin Portal** (`apps/admin-portal`) are independently deployed Next.js applications to isolate privileged business surfaces.
- **Catalog**, **Cart**, and **Account** remotes are Vite + React + `@module-federation/vite` applications exposing client-side micro-frontends over `remoteEntry.js`.
- **Shared Packages** (`packages/*`) provide compile-time shared contracts, UI primitives, design tokens, API clients, and event bus utilities.
