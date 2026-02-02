---
"@astro-api/n8n-nodes-astrology": patch
---

Refactor: consolidate duplicated code into shared utilities

- Add shared helper functions: `applySimplifyIfEnabled`, `buildSecondSubjectBirthData`, `buildTransitTime`, `buildReturnLocation`
- Add `createSimplifyField` factory for operations
- Update all handlers to use shared utilities
- Update CLAUDE.md with Code Reuse Guidelines
- Net reduction of ~300 lines of duplicated code
