# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Package:** `@astro-api/n8n-nodes-astrology`

This is an official n8n community node package that integrates with the [Astrology API](https://astrology-api.io). It provides professional astrological calculations: planetary positions, house cusps, aspects, lunar metrics, horoscopes, and chart generation.

## Commands

```bash
npm run build        # Compile TypeScript to dist/
npm run lint         # Run ESLint on nodes/ and credentials/
npm run lint:fix     # Run ESLint with auto-fix
npm run format       # Format code with Prettier
npm run format:check # Check formatting without changes
npm run dev          # Watch mode for development
npm run changeset    # Create a changeset for versioning
```

## Pre-commit Hooks

The project uses **husky** and **lint-staged** for automatic code quality checks on commit.

When you commit, the following runs automatically on staged `.ts` files:
1. ESLint with auto-fix
2. Prettier formatting

If there are unfixable lint errors, the commit will be blocked.

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
│   ├── index.ts            # Barrel export for all shared utilities
│   ├── birthData.fields.ts # createBirthDataFields()
│   ├── location.fields.ts  # createLocationFields()
│   ├── zodiac.fields.ts    # createZodiacSignField(), createTraditionField()
│   ├── simplify.fields.ts  # createSimplifyField()
│   ├── secondSubject.fields.ts # createSecondSubjectFields()
│   ├── transitTime.fields.ts   # createTransitTimeFields()
│   ├── tarot.fields.ts     # Tarot-specific field creators
│   └── helpers.ts          # Shared handler utilities (see below)
├── operations/             # UI parameter definitions by resource
│   ├── index.ts            # Barrel export
│   ├── resource.options.ts # Resource selector field
│   ├── data.operation.ts   # Data resource operations
│   ├── horoscope.operation.ts # Horoscope resource operations
│   └── charts.operation.ts # Charts resource operations
└── handlers/               # Execute logic by resource
    ├── index.ts            # Barrel export
    ├── data.handler.ts     # handleDataResource()
    ├── horoscope.handler.ts # handleHoroscopeResource()
    └── charts.handler.ts   # handleChartsResource()
```

### Key Components

- **credentials/** - Credential type definitions. `AstrologyApi.credentials.ts` defines API key and base URL fields.
- **interfaces/** - TypeScript interfaces and types for type safety across the module.
- **shared/** - Reusable field creators and handler utilities to avoid code duplication:
  - **Field creators:** `createBirthDataFields()`, `createLocationFields()`, `createSimplifyField()`, `createSecondSubjectFields()`, `createTransitTimeFields()`
  - **Handler helpers:** `buildBirthData()`, `buildSecondSubjectBirthData()`, `buildTransitTime()`, `buildReturnLocation()`, `makeApiRequest()`, `applySimplifyIfEnabled()`
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

### AI Tool Integration

The node has `usableAsTool: true` (line 49 in `Astrology.node.ts`), which enables n8n to auto-generate a companion Tool node for AI Agent integration.

**Two node types are available:**

| Type | Name in JSON | Purpose | Connection |
|------|--------------|---------|------------|
| Standard | `@astro-api/n8n-nodes-astrology.astrology` | Regular workflow node | `main` → `main` |
| AI Tool | `@astro-api/n8n-nodes-astrology.astrologyTool` | AI Agent tool | `ai_tool` → `ai_tool` |

**When creating AI Agent workflows:**

1. Use node type ending with `Tool` suffix (`astrologyTool`)
2. Connect via `ai_tool` connection type (not `main`)
3. Use `$fromAI()` expressions for parameter extraction:
   ```json
   "year": "={{ $fromAI('year', 'Birth year (e.g., 1990)') }}"
   ```

**Example connection in workflow JSON:**
```json
"Planetary Positions": {
  "ai_tool": [[{"node": "AI Agent", "type": "ai_tool", "index": 0}]]
}
```

See `examples/ai-astrologer-assistant.json` for a complete working example.

### Adding a New Resource

1. **Check existing code first** - Review `shared/` for reusable utilities before writing new code
2. Create `operations/newResource.operation.ts` with operation definitions
3. Create `handlers/newResource.handler.ts` with execute logic
4. Add resource to `operations/resource.options.ts`
5. Export from barrel files (`operations/index.ts`, `handlers/index.ts`)
6. Add handler to `resourceHandlers` map in `Astrology.node.ts`
7. Use shared field creators for common fields (birthData, location, simplify, etc.)
8. Use shared handler helpers (`applySimplifyIfEnabled`, `buildBirthData`, etc.)

## Code Reuse Guidelines

**IMPORTANT:** Before writing new code, always check `shared/` directory for existing utilities.

### Available Field Creators (for operations/*.ts)

| Function | Purpose | Usage |
|----------|---------|-------|
| `createBirthDataFields(resource, operations)` | Birth date/time/location fields | All resources needing birth data |
| `createLocationFields(prefix, resource, operations)` | City/coordinates location fields | Standalone location inputs |
| `createSimplifyField(resource, hideForOps?)` | "Simplify" toggle for API responses | All resources with simplify option |
| `createSecondSubjectFields(resource, operations)` | Second person's birth data | Synastry, compatibility operations |
| `createTransitTimeFields(resource, operations)` | Transit datetime fields | Transit chart operations |
| `createZodiacSignField(resource, operations)` | Zodiac sign dropdown | Horoscope operations |

### Available Handler Helpers (for handlers/*.ts)

| Function | Purpose | Returns |
|----------|---------|---------|
| `buildBirthData(execFns, itemIndex)` | Extract birth data from node params | `IBirthData` |
| `buildSecondSubjectBirthData(execFns, itemIndex, dateOnly?)` | Extract second subject's birth data | `IBirthData` |
| `buildTransitTime(execFns, itemIndex)` | Extract transit time from params | `ITransitTime` |
| `buildReturnLocation(execFns, itemIndex)` | Extract return location (if enabled) | `IDataObject \| undefined` |
| `makeApiRequest(execFns, method, baseUrl, endpoint, apiKey, body?)` | Make authenticated API call | `Promise<IDataObject>` |
| `applySimplifyIfEnabled(execFns, itemIndex, responseData)` | Conditionally simplify response | `IDataObject` |
| `createSubjectRequest(birthData, additionalFields?)` | Wrap birth data in subject object | `IDataObject` |

### Anti-Patterns to Avoid

```typescript
// ❌ BAD: Duplicating simplify logic
const simplify = executeFunctions.getNodeParameter("simplify", itemIndex, true) as boolean;
return simplify ? simplifyResponse(responseData) : responseData;

// ✅ GOOD: Use shared helper
return applySimplifyIfEnabled(executeFunctions, itemIndex, responseData);
```

```typescript
// ❌ BAD: Inline field definitions
const simplifyField: INodeProperties = {
  displayName: "Simplify",
  name: "simplify",
  type: "boolean",
  // ... repeated in every operation file
};

// ✅ GOOD: Use factory function
createSimplifyField("data", ["now"])
```

## Documentation & Best Practices

Use **Context7 MCP** to look up documentation and best practices for n8n node development. Before implementing new features or making significant changes:

1. Use `resolve-library-id` to find the n8n library ID
2. Use `get-library-docs` to fetch current documentation on relevant topics (e.g., "community nodes", "credentials", "node properties")

This ensures code follows current n8n conventions and API patterns.

## Examples

See the `examples/` folder for ready-to-use n8n workflows:

- **ai-astrologer-assistant.json** - AI-powered chatbot demonstrating multi-tool usage with n8n AI Agent. Shows how to connect Astrology nodes as AI Tools for conversational queries. Uses `$fromAI()` expressions for automatic parameter extraction.
- **personal-horoscope-workflow.json** - Generates personalized horoscopes (day/week/month/year) by comparing natal chart with current transits. Includes AI interpretation.
- **tarot-reading-workflow.json** - Performs tarot card readings influenced by current planetary positions and moon phase. Supports multiple spread types.

## CI/CD & Releases

The project uses **Changesets** for version management and **GitHub Actions** for CI/CD.

### Workflows

| File | Trigger | Purpose |
|------|---------|---------|
| `.github/workflows/ci.yml` | Push/PR to main | Lint, build, verify dist |
| `.github/workflows/release.yml` | Push to main | Create release PR or publish |

### Release Process

1. **Make changes** to code
2. **Create changeset**: `npx changeset`
   - Select type: `patch` (bugfix), `minor` (feature), `major` (breaking)
   - Write description
3. **Commit** changeset file with your code
4. **Merge PR** to main
5. **Changesets bot** creates "chore: release package" PR
6. **Merge release PR** → publishes to npm + creates GitHub Release

### Configuration Files

- `.changeset/config.json` - Changesets configuration (baseBranch: main, access: public)
- `package.json` has `publishConfig.access: "public"` for scoped package

### npm Publishing (OIDC Trusted Publishing)

Publishing uses OIDC authentication — no npm tokens required. Configure trusted publisher on npmjs.com:
1. Go to package Settings → Access → Trusted Publishers
2. Add GitHub Actions with: repository owner, repository name, workflow: `release.yml`

