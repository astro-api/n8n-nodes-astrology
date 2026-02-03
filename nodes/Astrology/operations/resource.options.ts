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
      name: "Astrocartography",
      value: "astrocartography",
      description:
        "Location-based astrology: planetary lines, relocation charts, power zones, and optimal location analysis",
    },
    {
      name: "Chart",
      value: "charts",
      description:
        "Generate natal (birth) charts with planetary positions, houses, and aspects for a given birth time and location",
    },
    {
      name: "Chinese",
      value: "chinese",
      description:
        "Chinese astrology: BaZi Four Pillars, zodiac animals, luck pillars, Ming Gua, and compatibility analysis",
    },
    {
      name: "Data",
      value: "data",
      description:
        "Get raw astrological calculations: planetary positions, house cusps, aspects between planets, and lunar phase data",
    },
    {
      name: "Eclipses",
      value: "eclipses",
      description:
        "Eclipse tracking: upcoming eclipses with NASA IDs, natal chart impact analysis, and Saros series interpretations",
    },
    {
      name: "Enhanced",
      value: "enhanced",
      description:
        "Enhanced analysis: complete natal chart with traditional dignities, profections, fixed stars, and sect analysis",
    },
    {
      name: "Fengshui",
      value: "fengshui",
      description:
        "Flying Stars Feng Shui: natal charts, annual/monthly overlays, afflictions (Tai Sui, Five Yellow, Three Killings)",
    },
    {
      name: "Fixed Stars",
      value: "fixedStars",
      description:
        "Fixed stars analysis: Royal Stars, Behenian stars, planetary conjunctions, and star interpretations",
    },
    {
      name: "Glossary",
      value: "glossary",
      description:
        "Reference data: cities database, house systems, zodiac signs, elements, planets, and astrological keywords",
    },
    {
      name: "Horary",
      value: "horary",
      description:
        "Horary astrology: question charts, traditional considerations, radicality testing, and William Lilly methods",
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
      name: "Insights",
      value: "insights",
      description:
        "Business, wellness, relationship, pet, and financial insights: timing, compatibility, biorhythms, and market analysis",
    },
    {
      name: "Kabbalah",
      value: "kabbalah",
      description:
        "Kabbalistic astrology: Tree of Life chart, birth angels, tikkun (soul correction), and gematria calculations",
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
      name: "PDF",
      value: "pdf",
      description:
        "PDF generation: daily/weekly horoscopes and natal reports as downloadable PDF documents",
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
      name: "Traditional",
      value: "traditional",
      description:
        "Hellenistic and traditional astrology: dignities, lots (Arabic parts), profections, and sect analysis",
    },
    {
      name: "Vedic",
      value: "vedic",
      description:
        "Vedic (Jyotish) astrology: Kundli charts, Dasha systems, Nakshatra analysis, doshas, Panchang, and compatibility matching",
    },
    {
      name: "Ziwei",
      value: "ziwei",
      description:
        "Zi Wei Dou Shu (Purple Star) astrology: 12 palaces, 14 main stars, Four Transformations, and Chinese fate analysis",
    },
  ],
  default: "data",
};
