# Design System

All applications and federated remotes consume `@nextcommerce/design-system`:

- **Colors**: Primary text `#111827`, Brand primary `#2563EB`, Success `#16A34A`, Warning `#F59E0B`, Danger `#DC2626`, Background `#FFFFFF`, Secondary `#F9FAFB`, Border `#E5E7EB`.
- **CSS Tokens**: Imported via `@import "@nextcommerce/design-system/tokens.css";` with `.dark` mode variable overrides.
- **UI Primitives**: `@nextcommerce/ui` wraps Radix UI primitives with Tailwind CSS v4 and `class-variance-authority`.
