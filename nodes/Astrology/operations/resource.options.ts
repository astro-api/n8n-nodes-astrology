import type { INodeProperties } from "n8n-workflow";

/**
 * Resource selector - shared across all operations
 * This is the first field shown in the node UI
 */
export const resourceField: INodeProperties = {
  displayName: "Resource",
  name: "resource",
  type: "options",
  noDataExpression: true,
  options: [
    {
      name: "Analysis",
      value: "analysis",
      description:
        "AI-powered astrological reports and interpretations: natal, synastry, transit, career, health, psychological profiles",
    },
    {
      name: "Chart",
      value: "charts",
      description:
        "Generate natal (birth) charts with planetary positions, houses, and aspects for a given birth time and location",
    },
    {
      name: "Data",
      value: "data",
      description:
        "Get raw astrological calculations: planetary positions, house cusps, aspects between planets, and lunar phase data",
    },
    {
      name: "Horoscope",
      value: "horoscope",
      description:
        "Generate horoscope predictions by zodiac sign or personalized by birth data (daily, weekly, monthly, yearly)",
    },
    {
      name: "Human Design",
      value: "humanDesign",
      description:
        "Human Design System calculations: BodyGraph, type/strategy/authority, channels, gates, and compatibility analysis",
    },
    {
      name: "Lunar",
      value: "lunar",
      description:
        "Lunar calculations: precise moon phases, void-of-course periods, lunar mansions, events, and calendars",
    },
    {
      name: "Numerology",
      value: "numerology",
      description:
        "Numerology calculations: Life Path, Expression, Soul Urge numbers, comprehensive readings, and compatibility analysis",
    },
    {
      name: "Render",
      value: "render",
      description:
        "Chart rendering: generate professional-quality SVG/PNG images of natal, transit, synastry, and composite charts",
    },
    {
      name: "Tarot",
      value: "tarot",
      description:
        "Tarot card readings and analysis: daily cards, spreads (single, three-card, Celtic Cross), birth cards, and astrological integration",
    },
    {
      name: "Vedic",
      value: "vedic",
      description:
        "Vedic (Jyotish) astrology: Kundli charts, Dasha systems, Nakshatra analysis, doshas, Panchang, and compatibility matching",
    },
  ],
  default: "data",
};
