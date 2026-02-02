# @astro-api/n8n-nodes-astrology

## 0.6.0

### Minor Changes

- 64fd235: Add Human Design (8 operations) and Numerology (3 operations) resources

  **Human Design:**

  - Glossary Channels - Get all 36 channels with descriptions (filterable by circuit)
  - Glossary Gates - Get all 64 gates with descriptions (filterable by center)
  - Glossary Types - Get information about 5 Human Design types
  - BodyGraph - Generate complete Human Design chart with type, strategy, authority
  - Compatibility - Two-person Human Design analysis
  - Design Date - Calculate the Design date (88° Sun before birth)
  - Transits - Transit overlay on natal BodyGraph
  - Type Only - Quick type/strategy/authority calculation

  **Numerology:**

  - Core Numbers - Calculate Life Path, Expression, Soul Urge, Personality numbers
  - Comprehensive Reading - Full numerology reading with cycles and interpretations
  - Compatibility - Two-person numerology compatibility analysis

  API coverage: 37/237 → 48/237

## 0.5.0

### Minor Changes

- f9bb768: Add 2 new Charts operations to complete API coverage (9/11 → 11/11):

  - **Solar Return Transits** - analyze transits to solar return chart over a date range for timing events within your birthday year
  - **Lunar Return Transits** - analyze transits to lunar return chart over a date range for timing events within your lunar month

## 0.4.0

### Minor Changes

- 688c2b2: Add 4 new Data operations to complete API coverage (5/9 → 9/9):

  - **Planetary Positions (Enhanced)** - positions with essential dignities and traditional reception data
  - **Aspects (Enhanced)** - aspects with mutual/single reception quality analysis
  - **Lunar Metrics (Enhanced)** - lunar data with Void of Course and traditional timing
  - **Global Positions** - location-independent ephemeris for batch processing

## 0.3.0

### Minor Changes

- da7aca5: Add extended chart operations: synastry, transit, composite, solar return, lunar return, progressions, natal transits, and directions

## 0.2.0

### Minor Changes

- c5ced38: Enhance Astrology Node for AI Integration and Update Dependencies

  - Updated package versions in `package.json` and `package-lock.json` to ensure compatibility with n8n workflow.
  - Improved descriptions for various fields in the Astrology node operations for clarity.
  - Introduced new examples demonstrating the use of the Astrology node with AI Agents.

## 0.1.6

### Patch Changes

- c441458: Update Docker Compose and example JSON files to use new astrology node type and adjust volume paths. Replace 'CUSTOM.astrology' with '@astro-api/n8n-nodes-astrology.astrology' in multiple example workflows. Enable community package tool usage in Docker configuration.

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
