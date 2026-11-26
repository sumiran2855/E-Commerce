# Security Foundations

- **No tokens in `localStorage` or `sessionStorage`**: Authentication uses a BFF HttpOnly cookie session model (`@nextcommerce/auth-client`).
- **CSRF Protection**: State-changing browser requests (`POST`, `PUT`, `PATCH`, `DELETE`) attach `X-CSRF-Token` from the CSRF cookie.
- **Trusted Remote Origins**: Module Federation remotes are treated as trusted executable code and must only be loaded from allowlisted HTTPS origins in production.
- **Security Headers**: Storefront configures `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, and `Permissions-Policy`.
- **Safe Logging & External Links**: `@nextcommerce/utilities` provides `redactSensitiveData` and `safeExternalLinkProps`.
