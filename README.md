# @astro-api/n8n-nodes-astrology

[![Get API Key](https://img.shields.io/badge/Get%20API%20Key-6C63FF?style=for-the-badge&logoColor=white)](https://dashboard.astrology-api.io/)
[![API Documentation](https://img.shields.io/badge/API%20Documentation-FCC624?style=for-the-badge&logoColor=black)](https://api.astrology-api.io/rapidoc)
[![Postman Collection](https://img.shields.io/badge/Postman%20Collection-FF6C37?style=for-the-badge&logo=postman&logoColor=white)](https://api.astrology-api.io/best-astrology-api-postman.json)

[![npm version](https://img.shields.io/npm/v/@astro-api/n8n-nodes-astrology)](https://www.npmjs.com/package/@astro-api/n8n-nodes-astrology)
[![npm downloads](https://img.shields.io/npm/dm/@astro-api/n8n-nodes-astrology)](https://www.npmjs.com/package/@astro-api/n8n-nodes-astrology)
[![CI](https://github.com/astro-api/n8n-nodes-astrology/actions/workflows/ci.yml/badge.svg)](https://github.com/astro-api/n8n-nodes-astrology/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
![n8n community node](https://img.shields.io/badge/n8n-community--node-ff6d5a)

Official n8n community node for [Astrology API](https://astrology-api.io) — professional astrological calculations powered by Swiss Ephemeris.

## Features

### Data & Calculations
- **Planetary Positions** — Get positions with zodiac signs, degrees, and retrograde status
- **House Cusps** — Calculate house boundaries (23+ house systems supported)
- **Aspects** — Angular relationships between celestial bodies
- **Lunar Metrics** — Moon phases, illumination, and void-of-course periods
- **Current Time Data** — Real-time astrological data for current moment

### Horoscopes & Predictions
- **Sign-based Horoscopes** — Daily, weekly, monthly, yearly predictions by zodiac sign
- **Personal Horoscopes** — Customized predictions based on birth chart
- **Chinese Bazi** — Four Pillars of Destiny analysis
- **Multiple Traditions** — Western, Vedic, Chinese astrology support
- **Multi-language** — EN, RU, UK, ES, DE, FR and more

### Charts & Visualization
- **Natal Charts** — Birth chart generation with SVG output
- **Transit Charts** — Current planetary transits overlay on natal chart
- **Synastry Charts** — Relationship compatibility analysis (cross-aspects)
- **Composite Charts** — Merged midpoint chart for couples
- **Solar Return Charts** — Birthday year forecast
- **Lunar Return Charts** — Monthly forecast based on Moon return
- **Progressions Charts** — Secondary progressions for life phases
- **Natal Transits** — Transit analysis over date range
- **Directions Charts** — Primary directions for timing predictions
- **Multiple House Systems** — Placidus, Koch, Equal, Whole Sign, and 20+ more

## Installation

### n8n Community Nodes (Recommended)

1. Open your n8n instance
2. Go to **Settings** → **Community Nodes**
3. Select **Install**
4. Enter `@astro-api/n8n-nodes-astrology`
5. Click **Install**

### Manual Installation

```bash
npm install @astro-api/n8n-nodes-astrology
```

For Docker deployments, mount the package or use `N8N_CUSTOM_EXTENSIONS`.

## Configuration

### API Credentials

1. Get your API key at [astrology-api.io](https://astrology-api.io)
2. In n8n, go to **Credentials** → **New Credential**
3. Select **Astrology API**
4. Enter your API key
5. (Optional) Configure custom base URL if using self-hosted API

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| — | API key is stored in n8n credentials | — |

## Usage Examples

### Quick Start

1. Install the node via **Settings → Community Nodes** → `@astro-api/n8n-nodes-astrology`
2. Add **Astrology API** credentials with your API key from [astrology-api.io](https://astrology-api.io)
3. Add the **Astrology** node to your workflow
4. Select a resource and operation from the table below
5. Configure the required parameters and execute

### Operations Overview

| Use Case | Resource | Operation | What You Get |
|----------|----------|-----------|--------------|
| Planet positions | Data | Positions | Zodiac signs, degrees, retrograde status for each planet |
| House boundaries | Data | House Cusps | Astrological house boundaries (23+ house systems) |
| Planetary aspects | Data | Aspects | Angular relationships between celestial bodies |
| Moon data | Data | Lunar Metrics | Moon phase, illumination, void-of-course periods |
| Current sky | Data | Current Time | Real-time astrological data for the current moment |
| Daily horoscope | Horoscope | Sign Daily | Daily prediction for any zodiac sign |
| Weekly horoscope | Horoscope | Sign Weekly | Weekly prediction for any zodiac sign |
| Monthly horoscope | Horoscope | Sign Monthly | Monthly prediction for any zodiac sign |
| Yearly horoscope | Horoscope | Sign Yearly | Yearly prediction for any zodiac sign |
| Personal forecast | Horoscope | Personal Daily/Weekly/Monthly/Yearly | Birth chart-based personalized predictions |
| Chinese astrology | Horoscope | Chinese Bazi | Four Pillars of Destiny analysis |
| Birth chart | Charts | Natal | SVG natal chart with configurable house system |
| Relationship chart | Charts | Synastry | Two-person compatibility analysis (cross-aspects) |
| Combined chart | Charts | Composite | Merged midpoint chart for couples |
| Current transits | Charts | Transit | Planetary transits overlay on natal chart |
| Birthday forecast | Charts | Solar Return | Year-ahead predictions based on Sun return |
| Monthly forecast | Charts | Lunar Return | Month-ahead predictions based on Moon return |
| Life phases | Charts | Progressions | Secondary progressions for internal development |
| Period analysis | Charts | Natal Transits | Transit events over a date range |
| Timing predictions | Charts | Directions | Primary directions for life event timing |

### Common Use Cases

**Planetary Positions & Birth Data**
Configure **Data → Positions** to calculate planetary positions for any date and location. Returns zodiac signs, degrees, minutes, and retrograde status. Supports both city-based and coordinate-based location input.

**Horoscopes in Multiple Languages**
Use **Horoscope → Sign Daily/Weekly/Monthly/Yearly** for zodiac sign predictions. Supports multiple languages (EN, RU, UK, ES, DE, FR) and traditions (Western, Vedic, Chinese).

**Personal Horoscopes**
Use **Horoscope → Personal Daily/Weekly/Monthly/Yearly** for customized predictions based on birth chart data. Combines natal positions with current transits for personalized forecasts.

**Natal Chart Generation**
Generate SVG birth charts with **Charts → Natal**. Supports 23+ house systems including Placidus, Koch, Equal, and Whole Sign.

### Ready-to-Use Workflows

Import complete workflow examples from the [`examples/`](examples/) folder:

- **[AI Astrologer Assistant](examples/ai-astrologer-assistant.json)** — AI-powered chatbot with multiple Astrology tools. Demonstrates using the node with n8n AI Agent for conversational astrology queries.
- **[Personal Horoscope Workflow](examples/personal-horoscope-workflow.json)** — Generates personalized horoscopes (day/week/month/year) by comparing natal chart with current transits. Includes AI interpretation.
- **[Tarot Reading Workflow](examples/tarot-reading-workflow.json)** — Performs tarot card readings influenced by current planetary positions and moon phase. Supports multiple spread types.

### Using with AI Agent

The Astrology node supports **AI Tool mode** via n8n's `usableAsTool` feature. This allows you to connect the node to an AI Agent for conversational astrology queries.

#### How It Works

When `usableAsTool: true` is set, n8n automatically generates a companion Tool node:

| Node Type | Purpose | Connection Type |
|-----------|---------|-----------------|
| `astrology` | Standard workflow node | `main` → `main` |
| `astrologyTool` | AI Tool for Agent | `ai_tool` → `ai_tool` |

#### Creating AI Workflows

When building workflows with AI Agent:

1. **Use the Tool version** — In workflow JSON, use type `@astro-api/n8n-nodes-astrology.astrologyTool`
2. **Connect via `ai_tool`** — Connect nodes to AI Agent using `ai_tool` connection type
3. **Use `$fromAI()` expressions** — Let AI extract parameters automatically

**Example node configuration:**
```json
{
  "parameters": {
    "year": "={{ $fromAI('year', 'Birth year (e.g., 1990)') }}",
    "month": "={{ $fromAI('month', 'Month 1-12') }}",
    "city": "={{ $fromAI('city', 'City name') }}"
  },
  "type": "@astro-api/n8n-nodes-astrology.astrologyTool"
}
```

**Example connection:**
```json
"Planetary Positions": {
  "ai_tool": [[{"node": "AI Agent", "type": "ai_tool", "index": 0}]]
}
```

See [AI Astrologer Assistant](examples/ai-astrologer-assistant.json) for a complete working example.

## API Documentation

Full API documentation is available at:
- **Interactive Docs**: [api.astrology-api.io/rapidoc](https://api.astrology-api.io/rapidoc)
- **Postman Collection**: [Download](https://api.astrology-api.io/best-astrology-api-postman.json)

## Development

### Prerequisites

- Node.js v20+
- npm or pnpm

### Setup

```bash
git clone https://github.com/astro-api/n8n-nodes-astrology.git
cd n8n-nodes-astrology
npm install
npm run build
```

### Code Quality

Pre-commit hooks automatically run on staged files:
- **ESLint** — linting with auto-fix
- **Prettier** — code formatting

Available scripts:
```bash
npm run lint         # Check for lint errors
npm run lint:fix     # Fix lint errors
npm run format       # Format code
npm run format:check # Check formatting
```

### Testing with Docker

```bash
npm run build
cd docker && docker compose up
```

Access n8n at `http://localhost:5678`

### Project Structure

```
├── credentials/          # API credential definitions
├── nodes/Astrology/
│   ├── handlers/         # Execute logic by resource
│   ├── interfaces/       # TypeScript types
│   ├── operations/       # UI parameter definitions
│   └── shared/           # Reusable fields and helpers
└── dist/                 # Compiled output
```

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

### Creating a Changeset

When you make changes that should be included in a release:

```bash
npx changeset
```

Select the change type:
- **patch** (0.1.0 → 0.1.1) — bug fixes
- **minor** (0.1.0 → 0.2.0) — new features
- **major** (0.1.0 → 1.0.0) — breaking changes

Commit the generated changeset file along with your code.

## Release Process

This project uses [Changesets](https://github.com/changesets/changesets) for version management and [GitHub Actions](https://github.com/features/actions) for CI/CD.

### Automated Pipeline

| Workflow | Trigger | Actions |
|----------|---------|---------|
| **CI** | Push/PR to `master` | Lint, Build, Verify dist |
| **Release** | Push to `master` | Create release PR or publish to npm |

### How Releases Work

1. **Development**: Create PR with code changes + changeset file
2. **Merge to master**: CI validates, then Release workflow creates a "chore: release package" PR
3. **Release PR**: Contains version bump + CHANGELOG update
4. **Merge Release PR**: Triggers npm publish + GitHub Release creation

## Support

- **Documentation**: [astrology-api.io/docs](https://astrology-api.io/docs)
- **Issues**: [GitHub Issues](https://github.com/astro-api/n8n-nodes-astrology/issues)
- **Email**: support@astrology-api.io

## License

MIT License — see [LICENSE](LICENSE) for details.

---

Made with ☿ by [Astrology API](https://astrology-api.io)
