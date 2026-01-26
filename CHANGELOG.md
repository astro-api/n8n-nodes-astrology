# @astro-api/n8n-nodes-astrology

## 0.1.1

### Patch Changes

- 5976b46: Fix circular JSON serialization error and add credential validation

  - Fix "Converting circular structure to JSON" error in API requests by ensuring only serializable data is returned
  - Add credential validation to test API key before saving credentials
