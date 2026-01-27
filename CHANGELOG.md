# @astro-api/n8n-nodes-astrology

## 0.1.5

### Patch Changes

- 39b5ea7: Update author email to dev@astrology-api.io

## 0.1.4

### Patch Changes

- 7a76048: Update node icon to match brand logo

## 0.1.3

### Patch Changes

- 145a962: - Added eslint-plugin-n8n-nodes-base to ESLint configuration for improved linting of n8n nodes and credentials.
  - Modified CI workflow to use Node.js version 22 for better compatibility.
  - Refactored Astrology node operations to enhance user experience and streamline options.

## 0.1.1

### Patch Changes

- 5976b46: Fix circular JSON serialization error and add credential validation

  - Fix "Converting circular structure to JSON" error in API requests by ensuring only serializable data is returned
  - Add credential validation to test API key before saving credentials
