# Example Workflows

Ready-to-use n8n workflows demonstrating the Astrology node capabilities.

## Quick Start

1. Build the node: `npm run build`
2. Start n8n with Docker: `cd docker && docker compose up`
3. Import workflow: Workflows → Import from File
4. Configure credentials (Astrology API, OpenAI if needed)
5. Run!

---

## Available Examples

| File | Resource | Description |
|------|----------|-------------|
| `personal-horoscope-workflow.json` | Data | Natal chart + transits with AI interpretation |
| `cosmic-tarot-reading.json` | Data | Tarot reading based on planetary positions |
| `tarot-reading-workflow.json` | Data | Alternative tarot workflow |
| `daily-horoscope-bot.json` | Horoscope | Daily sign horoscope bot for Telegram |
| `personal-weekly-forecast.json` | Horoscope | Personalized weekly forecast |
| `zodiac-content-generator.json` | Horoscope | Generate horoscopes for all 12 signs |
| `chinese-bazi-reading.json` | Horoscope | Chinese Bazi with AI interpretation |

---

## Data Resource Examples

### 1. Personal Horoscope with Transits

**File:** `personal-horoscope-workflow.json`

Generates personalized astrological forecasts by comparing natal chart with current planetary transits.

```
Manual Trigger
      │
      ▼
Set Birth Data ──────── birth date, time, location, language, period
      │
      ▼
Natal Positions ─────── planetary positions at birth
      │
      ▼
Natal Aspects ───────── aspects between natal planets
      │
      ▼
Current Transits ────── today's planetary positions
      │
      ▼
Lunar Metrics ───────── current moon phase
      │
      ▼
AI Horoscope Generator ─ OpenAI interprets all data
```

**Configuration** (Set Birth Data node):

| Field | Type | Default |
|-------|------|---------|
| `birth_year` | number | 1990 |
| `birth_month` | number | 1 |
| `birth_day` | number | 1 |
| `birth_hour` | number | 12 |
| `birth_minute` | number | 0 |
| `birth_city` | string | London |
| `birth_country` | string | GB |
| `horoscope_type` | string | day |

---

### 2. Cosmic Tarot Reading

**File:** `cosmic-tarot-reading.json`

Performs tarot card readings influenced by current planetary positions and moon phase.

```
Manual Trigger
      │
      ▼
Set Reading Intent ──── question, spread type, deck style
      │
      ▼
Current Planetary Energy ── positions via Data resource
      │
      ▼
Moon Phase ───────────── lunar metrics
      │
      ▼
AI Tarot Reader ──────── draws and interprets cards
```

**Spread Types:** `single_card`, `three_cards`, `celtic_cross`, `love_spread`, `career_spread`

**Deck Styles:** `Rider-Waite`, `Thoth`, `Marseille`, `Modern`

---

## Horoscope Resource Examples

### 3. Daily Horoscope Bot

**File:** `daily-horoscope-bot.json`

Automated daily horoscope delivery via Telegram.

```
Schedule (8 AM daily)
      │
      ▼
Set Zodiac Sign ─────── sign, language
      │
      ▼
Get Daily Horoscope ─── signDailyText operation
      │
      ▼
Send to Telegram ────── formatted message
```

**Operations used:** `signDailyText`

**Configuration:**

| Field | Value |
|-------|-------|
| sign | aries (or any zodiac sign) |
| language | en |
| textFormat | markdown |
| emoji | true |

**Note:** Telegram node is disabled by default. Enable and configure with your chat ID.

---

### 4. Personal Weekly Forecast

**File:** `personal-weekly-forecast.json`

Personalized weekly horoscope based on birth data.

```
Manual Trigger
      │
      ▼
Set Birth Data ───────── year, month, day, hour, minute, city, country
      │
      ▼
Weekly Forecast Data ─── personalWeekly (structured data)
      │
      ▼
Weekly Forecast Text ─── personalWeeklyText (formatted)
      │
      ▼
Combine Results ──────── both data and text
```

**Operations used:** `personalWeekly`, `personalWeeklyText`

**Configuration:**

| Field | Default |
|-------|---------|
| birth_year | 1990 |
| birth_month | 6 |
| birth_day | 15 |
| birth_hour | 14 |
| birth_minute | 30 |
| birth_city | Kyiv |
| birth_country | UA |
| language | en |
| tradition | western |

---

### 5. Zodiac Content Generator

**File:** `zodiac-content-generator.json`

Generates daily horoscopes for all 12 zodiac signs. Useful for content sites/apps.

```
Manual Trigger
      │
      ▼
All Zodiac Signs ────── loops through 12 signs
      │
      ▼
Daily Horoscope Data ── signDaily for each sign
      │
      ▼
Daily Horoscope Text ── signDailyText (HTML format)
      │
      ▼
Format Output ───────── sign, name, element, data, html
```

**Operations used:** `signDaily`, `signDailyText`

**Output per sign:**

```json
{
  "sign": "aries",
  "name": "Aries",
  "element": "Fire",
  "horoscope_data": { ... },
  "horoscope_html": "<h2>...</h2>...",
  "generated_at": "2024-01-15T10:30:00.000Z"
}
```

---

### 6. Chinese Bazi Reading

**File:** `chinese-bazi-reading.json`

Chinese Four Pillars (Bazi) horoscope with AI interpretation.

```
Manual Trigger
      │
      ▼
Set Birth Data ───────── birth date, time, location
      │
      ▼
Chinese Bazi Reading ─── chineseBazi operation
      │
      ▼
AI Interpretation ────── OpenAI analyzes the chart
```

**Operations used:** `chineseBazi`

**Configuration:**

| Field | Default |
|-------|---------|
| birth_year | 1988 |
| birth_month | 3 |
| birth_day | 21 |
| birth_hour | 10 |
| birth_minute | 0 |
| birth_city | Beijing |
| birth_country | CN |
| baziYear | (current year) |

**AI interprets:**
- Day Master element and strength
- Key personality traits
- Favorable/unfavorable elements
- Career and relationship tendencies
- Current year forecast

---

## Operations Reference

### Data Resource

| Operation | Description |
|-----------|-------------|
| `now` | Current UTC time |
| `positions` | Planetary positions |
| `houseCusps` | House boundaries |
| `aspects` | Angular relationships |
| `lunarMetrics` | Moon phase data |

### Horoscope Resource

| Operation | Description |
|-----------|-------------|
| `signDaily` | Daily sign horoscope (data) |
| `signDailyText` | Daily sign horoscope (formatted) |
| `signWeekly` | Weekly sign horoscope (data) |
| `signWeeklyText` | Weekly sign horoscope (formatted) |
| `signMonthly` | Monthly sign horoscope (data) |
| `signMonthlyText` | Monthly sign horoscope (formatted) |
| `signYearly` | Yearly sign horoscope (data) |
| `signYearlyText` | Yearly sign horoscope (formatted) |
| `personalDaily` | Personal daily horoscope (data) |
| `personalDailyText` | Personal daily horoscope (formatted) |
| `personalWeekly` | Personal weekly horoscope (data) |
| `personalWeeklyText` | Personal weekly horoscope (formatted) |
| `personalMonthly` | Personal monthly horoscope (data) |
| `personalMonthlyText` | Personal monthly horoscope (formatted) |
| `personalYearly` | Personal yearly horoscope (data) |
| `personalYearlyText` | Personal yearly horoscope (formatted) |
| `chineseBazi` | Chinese Four Pillars |

---

## Customization Ideas

### Add External Triggers

Replace manual trigger with:
- **Webhook** - Accept data from web forms
- **Schedule** - Daily/weekly automated forecasts
- **Chat** - Interactive Telegram/Slack bot

### Extend Output

Add nodes to:
- **Email** - Send readings via email
- **Database** - Store readings history
- **PDF** - Generate formatted documents
- **Google Sheets** - Log all readings

### Combine Workflows

Create a master workflow that:
1. Gets user input via webhook
2. Runs horoscope generation
3. Runs tarot reading
4. Combines into single personalized report
