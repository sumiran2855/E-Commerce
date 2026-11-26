# Testing Strategy

- **Unit & Component Tests**: Vitest + React Testing Library + `@testing-library/jest-dom` + `@testing-library/user-event` (`pnpm test`).
- **End-to-End Tests**: Playwright (`pnpm test:e2e`, configured in `playwright.config.ts`).
- **Accessibility**: `axe-core` and semantic ARIA landmarks tested in component and E2E suites.
- **Performance**: `web-vitals` reporter (LCP <= 2.5s, INP <= 200ms, CLS <= 0.1) and Lighthouse CI (`lighthouserc.json`).
