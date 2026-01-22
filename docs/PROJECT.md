# Technical Details: n8n-nodes-astrology

## Project Structure

```
n8n-nodes-astrology/
├── credentials/
│   └── AstrologyApi.credentials.ts    # API credentials (base URL)
├── nodes/Astrology/
│   ├── Astrology.node.ts              # Main node implementation
│   ├── astrology.svg                  # Node icon
│   └── operations/
│       └── data.operation.ts          # UI parameters for all operations
├── examples/
│   ├── README.md                      # Workflow documentation
│   ├── personal-horoscope-workflow.json
│   └── tarot-reading-workflow.json
├── docker/
│   └── docker-compose.yml             # Test n8n instance
└── dist/                              # Compiled output
```

## Credentials

- **Type:** `astrologyApi`
- **Fields:**
  - `apiKey` – RapidAPI Key (required)
  - `baseUrl` – RapidAPI host URL (default: `https://best-astrology-api-natal-charts-transits-synastry.p.rapidapi.com`)
- **Headers sent:**
  - `x-rapidapi-host` – Extracted from baseUrl
  - `x-rapidapi-key` – From credentials

## Node Operations

### Current Time (`now`)

Returns current UTC time data for astrological calculations.

- **Endpoint:** `GET /api/v3/data/now`
- **Parameters:** None

### Planetary Positions (`positions`)

Returns planetary positions with zodiac signs and degrees.

- **Endpoint:** `POST /api/v3/data/positions`
- **Parameters:**
  - `year`, `month`, `day`, `hour`, `minute` – Date/time
  - Location: `city` + `countryCode` OR `latitude` + `longitude`

### House Cusps (`houseCusps`)

Returns astrological house boundaries (supports 23+ house systems).

- **Endpoint:** `POST /api/v3/data/house-cusps`
- **Parameters:** Same as positions

### Aspects (`aspects`)

Returns angular relationships between celestial bodies.

- **Endpoint:** `POST /api/v3/data/aspects`
- **Parameters:** Same as positions

### Lunar Metrics (`lunarMetrics`)

Returns moon phase cycles and illumination data.

- **Endpoint:** `POST /api/v3/data/lunar-metrics`
- **Parameters:** Same as positions

## API Request Format

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
      "city": "London",
      "country_code": "GB"
    }
  }
}
```

Or with coordinates:

```json
{
  "subject": {
    "birth_data": {
      "year": 1990,
      "month": 6,
      "day": 15,
      "hour": 12,
      "minute": 0,
      "latitude": 51.5074,
      "longitude": -0.1278
    }
  }
}
```

## Location Input

The node supports two location types:

1. **City Name** (default)
   - `city` – City name (e.g., "London")
   - `countryCode` – ISO 3166-1 alpha-2 code (e.g., "GB")
   - API automatically geocodes to coordinates

2. **Coordinates**
   - `latitude` – -90 to 90
   - `longitude` – -180 to 180

## Test Environment

### Docker Compose

```yaml
# docker/docker-compose.yml
services:
  n8n:
    image: docker.n8n.io/n8nio/n8n:latest
    ports:
      - "5678:5678"
    volumes:
      - ../dist:/home/node/.n8n/custom/n8n-nodes-astrology
    environment:
      - N8N_CUSTOM_EXTENSIONS=/home/node/.n8n/custom
```

### Running Tests

```bash
npm run build              # Build TypeScript
cd docker && docker compose up   # Start n8n
# Access at http://localhost:5678
```

## Build Commands

| Command | Description |
|---------|-------------|
| `npm run build` | Compile TypeScript to `dist/` |
| `npm run lint` | Run ESLint on `nodes/` and `credentials/` |
| `npm run dev` | Watch mode for development |

## Example Workflows

### Personal Horoscope with Transits

Generates personalized astrological forecasts by comparing natal chart with current transits.

**Flow:**
```
Set Birth Data → Natal Positions → Natal Aspects → Current Transits → Lunar Metrics → AI Generator
```

**Features:**
- Multiple forecast periods (day/week/month/year)
- Multi-language support
- Transit-to-natal aspect analysis

### Cosmic Tarot Reading

Performs tarot card readings influenced by current planetary positions.

**Flow:**
```
Set Reading Intent → Current Planetary Energy → Moon Phase → AI Tarot Reader
```

**Features:**
- 5 spread types (single card, three cards, celtic cross, love, career)
- 4 deck styles (Rider-Waite, Thoth, Marseille, Modern)
- Astrologically-influenced card selection

## API Documentation

Full API documentation: https://rapidapi.com/developer-developer-default/api/best-astrology-api-natal-charts-transits-synastry

### Additional Endpoints (not yet implemented)

- `POST /api/v3/data/global-positions` – Location-independent ephemeris
- `POST /api/v3/data/positions/enhanced` – Positions with dignity analysis
- `POST /api/v3/data/aspects/enhanced` – Aspects with reception analysis
