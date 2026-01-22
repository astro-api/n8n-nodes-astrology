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

This follows n8n community node conventions with modular structure for scalability:

```
nodes/Astrology/
├── Astrology.node.ts       # Main node file with router pattern
├── astrology.svg           # Node icon
├── interfaces/             # TypeScript types
│   ├── index.ts            # Barrel export
│   └── types.ts            # IBirthData, IHandlerContext, ResourceType, etc.
├── shared/                 # Reusable field definitions and helpers
│   ├── index.ts            # Barrel export
│   ├── birthData.fields.ts # createBirthDataFields()
│   ├── location.fields.ts  # createLocationFields()
│   ├── zodiac.fields.ts    # createZodiacSignField(), createTraditionField()
│   └── helpers.ts          # buildBirthData(), makeApiRequest()
├── operations/             # UI parameter definitions by resource
│   ├── index.ts            # Barrel export
│   ├── resource.options.ts # Resource selector field
│   ├── data.operation.ts   # Data resource operations
│   └── horoscope.operation.ts # Horoscope resource operations
└── handlers/               # Execute logic by resource
    ├── index.ts            # Barrel export
    ├── data.handler.ts     # handleDataResource()
    └── horoscope.handler.ts # handleHoroscopeResource()
```

### Key Components

- **credentials/** - Credential type definitions. `AstrologyApi.credentials.ts` defines API key and base URL fields.
- **interfaces/** - TypeScript interfaces and types for type safety across the module.
- **shared/** - Reusable field creators (`createBirthDataFields()`, `createLocationFields()`) to avoid code duplication when adding new resources.
- **operations/** - UI parameter definitions organized by resource type. These export `INodeProperties[]` arrays that are spread into the main node's properties.
- **handlers/** - Execute logic separated by resource. The main node uses a router pattern to delegate to the appropriate handler.

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

The node uses n8n's standard pattern with router-based architecture:

- `description: INodeTypeDescription` defines UI and metadata
- `execute()` method uses a router pattern to delegate to resource handlers
- Resource handlers are in `handlers/` directory, one per resource type
- Operations are conditionally shown via `displayOptions.show.resource`
- Shared fields use factory functions from `shared/` to avoid duplication

### Adding a New Resource

1. Create `operations/newResource.operation.ts` with operation definitions
2. Create `handlers/newResource.handler.ts` with execute logic
3. Add resource to `operations/resource.options.ts`
4. Export from barrel files (`operations/index.ts`, `handlers/index.ts`)
5. Add handler to `resourceHandlers` map in `Astrology.node.ts`
6. Use shared field creators for common fields (birthData, location, etc.)

## Documentation & Best Practices

Use **Context7 MCP** to look up documentation and best practices for n8n node development. Before implementing new features or making significant changes:

1. Use `resolve-library-id` to find the n8n library ID
2. Use `get-library-docs` to fetch current documentation on relevant topics (e.g., "community nodes", "credentials", "node properties")

This ensures code follows current n8n conventions and API patterns.

## Examples

See the `examples/` folder for ready-to-use n8n workflows:

- **personal-horoscope-workflow.json** - Generates personalized horoscopes (day/week/month/year) by comparing natal chart with current transits. Includes AI interpretation.
- **tarot-reading-workflow.json** - Performs tarot card readings influenced by current planetary positions and moon phase. Supports multiple spread types.

