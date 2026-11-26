# Frontend Architecture

## Rendering Strategy

- **React Server Components (RSC)** by default in Next.js App Router for layouts, SEO pages, and data-fetching shells.
- **Client Components (`'use client'`)** strictly at interactive leaves, providers (`QueryClientProvider`, `AuthProvider`, `Toaster`), and Module Federation boundaries (`RemoteModuleLoader`).

## State Management

- **Server State**: TanStack Query (`@tanstack/react-query`) with an intentional `QueryClient` lifecycle per independently running application.
- **Client UI State**: Zustand (`useStorefrontUiStore`) for ephemeral UI state such as cart/wishlist badge counts and mobile menu state.
- **Cross-MFE Notifications**: `@nextcommerce/event-bus` using typed browser `CustomEvent`s (`cart:updated`, `wishlist:updated`, `user:authenticated`, `user:logged-out`, `order:created`).
- **Forms & Validation**: React Hook Form + Zod (`@nextcommerce/validation`).
