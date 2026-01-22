# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an n8n community node package that integrates with the Astrology API. It provides astrological calculations: planetary positions, house cusps, aspects, and lunar metrics.

## Commands

```bash
npm run build     # Compile TypeScript to dist/
npm run lint      # Run ESLint on nodes/ and credentials/
npm run dev       # Watch mode for development
```

## Testing with Docker

Build first, then start the n8n test instance:
```bash
npm run build
cd docker && docker compose up
```
Access n8n at http://localhost:5678. Configure the API base URL in credentials if needed.

## Architecture

This follows n8n community node conventions:

- **credentials/** - Credential type definitions. `AstrologyApi.credentials.ts` defines API key and base URL fields.
- **nodes/Astrology/** - Main node implementation in `Astrology.node.ts` which handles execute logic for all resources.
- **nodes/Astrology/operations/** - UI parameter definitions organized by resource type (chart, horoscope). These export `INodeProperties[]` arrays that are spread into the main node's properties.

### API Configuration

The node uses the native Astrology API:

- **Default Host:** `https://api.astrology-api.io`
- **Required:** API Key (from astrology-api.io subscription)
- **Authentication:** `Authorization: Bearer <api-key>`

### API Endpoints Used

API Documentation: https://api.astrology-api.io/rapidoc

- `GET /api/v3/data/now` - Current UTC time data
- `POST /api/v3/data/positions` - Planetary positions with zodiac signs and degrees
- `POST /api/v3/data/house-cusps` - Astrological house boundaries (23+ house systems)
- `POST /api/v3/data/aspects` - Angular relationships between celestial bodies
- `POST /api/v3/data/lunar-metrics` - Moon phase cycles and illumination
- `POST /api/v3/data/global-positions` - Location-independent ephemeris
- `POST /api/v3/data/positions/enhanced` - Positions with dignity analysis
- `POST /api/v3/data/aspects/enhanced` - Aspects with reception analysis

All POST endpoints require `subject.birth_data` wrapper:
```json
{
  "subject": {
    "birth_data": {
      "year": 1990,
      "month": 6,
      "day": 15,
      "hour": 12,
      "minute": 0,
      "latitude": 50.45,
      "longitude": 30.52
    }
  }
}
```

## n8n Node Structure

The node uses n8n's standard pattern:
- `description: INodeTypeDescription` defines UI and metadata
- `execute()` method processes input items and makes API calls
- Operations are conditionally shown via `displayOptions.show.resource`

## Documentation & Best Practices

Use **Context7 MCP** to look up documentation and best practices for n8n node development. Before implementing new features or making significant changes:

1. Use `resolve-library-id` to find the n8n library ID
2. Use `get-library-docs` to fetch current documentation on relevant topics (e.g., "community nodes", "credentials", "node properties")

This ensures code follows current n8n conventions and API patterns.

## Examples

See the `examples/` folder for ready-to-use n8n workflows:

- **personal-horoscope-workflow.json** - Generates personalized horoscopes (day/week/month/year) by comparing natal chart with current transits. Includes AI interpretation.
- **tarot-reading-workflow.json** - Performs tarot card readings influenced by current planetary positions and moon phase. Supports multiple spread types.

