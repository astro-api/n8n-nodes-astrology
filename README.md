# @astroapi/n8n-nodes-astrology

[![npm version](https://badge.fury.io/js/@astroapi%2Fn8n-nodes-astrology.svg)](https://www.npmjs.com/package/@astroapi/n8n-nodes-astrology)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Official n8n community node for [Astrology API](https://astrology-api.io) — professional astrological calculations powered by Swiss Ephemeris.

![Astrology Node](https://img.shields.io/badge/n8n-community--node-ff6d5a)

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
- **Transit Charts** — Current planetary transits overlay
- **Synastry** — Relationship compatibility analysis
- **Multiple House Systems** — Placidus, Koch, Equal, Whole Sign, and 20+ more

## Installation

### n8n Community Nodes (Recommended)

1. Open your n8n instance
2. Go to **Settings** → **Community Nodes**
3. Select **Install**
4. Enter `@astroapi/n8n-nodes-astrology`
5. Click **Install**

### Manual Installation

```bash
npm install @astroapi/n8n-nodes-astrology
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

### Get Planetary Positions

```json
{
  "resource": "data",
  "operation": "positions",
  "year": 1990,
  "month": 6,
  "day": 15,
  "hour": 14,
  "minute": 30,
  "locationType": "city",
  "city": "Kyiv",
  "countryCode": "UA"
}
```

### Get Daily Horoscope

```json
{
  "resource": "horoscope",
  "operation": "signDaily",
  "sign": "aries",
  "language": "en",
  "tradition": "universal"
}
```

### Generate Natal Chart

```json
{
  "resource": "charts",
  "operation": "natal",
  "year": 1990,
  "month": 6,
  "day": 15,
  "hour": 14,
  "minute": 30,
  "city": "London",
  "countryCode": "GB"
}
```

## Resources & Operations

| Resource | Operations |
|----------|------------|
| **Data** | Current Time, Planetary Positions, House Cusps, Aspects, Lunar Metrics |
| **Horoscope** | Sign Daily/Weekly/Monthly/Yearly, Personal Daily/Weekly/Monthly/Yearly, Chinese Bazi |
| **Charts** | Natal Chart (more coming soon) |

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
git clone https://github.com/astroapi/n8n-nodes-astrology.git
cd n8n-nodes-astrology
npm install
npm run build
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

## Support

- **Documentation**: [astrology-api.io/docs](https://astrology-api.io/docs)
- **Issues**: [GitHub Issues](https://github.com/astroapi/n8n-nodes-astrology/issues)
- **Email**: support@astrology-api.io

## License

MIT License — see [LICENSE](LICENSE) for details.

---

Made with ☿ by [Astrology API](https://astrology-api.io)
