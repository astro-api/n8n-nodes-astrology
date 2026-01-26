---
"@astro-api/n8n-nodes-astrology": patch
---

Fix circular JSON serialization error and add credential validation

- Fix "Converting circular structure to JSON" error in API requests by ensuring only serializable data is returned
- Add credential validation to test API key before saving credentials
