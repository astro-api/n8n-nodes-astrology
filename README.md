## n8n-nodes-astrology

Custom n8n community node for working with Astrology API: natal charts, horoscopes, and current data.

### Features

- **Natal chart**: calls `POST /api/v3/charts/natal`
- **Horoscopes**: daily, weekly, monthly endpoints
- **Current data**: calls `GET /api/v3/data/now`
- **Configurable base URL** via `ASTROLOGY_API_BASE_URL` environment variable or credentials

### Installation

- **As local custom node**:
  - Build the project:
    - `npm run build`
  - Mount `dist` into n8n using `N8N_CUSTOM_EXTENSIONS` (see `docker/docker-compose.yml` for example).

### Usage

- Add an **Astrology** node to your workflow.
- Select **Resource**:
  - `Chart` → operation `Natal Chart`
  - `Horoscope` → operations `Daily`, `Weekly`, or `Monthly`
  - `Current Data` → no extra parameters required
- Provide required parameters (birth data or zodiac sign).

### Test environment

- Example Docker Compose configuration is provided in `docker/docker-compose.yml`.
- Set `ASTROLOGY_API_BASE_URL` in your environment or `.env` file when running Docker.


