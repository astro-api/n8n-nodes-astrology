---
"@astro-api/n8n-nodes-astrology": patch
---

refactor: remove apiKey from context and update API request handling

- Removed `apiKey` from the `IHandlerContext` interface and related handlers.
- Updated `makeApiRequest` to use a new authentication method without passing `apiKey` directly.
- Adjusted multiple handler functions to reflect the removal of `apiKey` from their context destructuring.
