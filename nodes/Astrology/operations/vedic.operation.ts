import type { INodeProperties } from "n8n-workflow";
import {
  createBirthDataFields,
  createLocationFields,
  createSimplifyField,
  createSecondSubjectFields,
  createLanguageField,
} from "../shared";
import {
  createAyanamsaField,
  createVedicStyleField,
  createDivisionalChartField,
  createVedicOptionsFields,
  createDashaYearsField,
} from "../shared/vedic.fields";

/**
 * Operation selector for vedic resource
 */
const vedicOperationField: INodeProperties = {
  displayName: "Operation",
  name: "operation",
  type: "options",
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ["vedic"],
    },
  },
  options: [
    {
      name: "Ashtakvarga",
      value: "ashtakvarga",
      description:
        "Calculate Ashtakvarga points - strength of planets in signs",
      action: "Get ashtakvarga analysis",
    },
    {
      name: "Birth Details",
      value: "birthDetails",
      description: "Get Vedic birth details - Tithi, Nakshatra, Yoga, Karana",
      action: "Get vedic birth details",
    },
    {
      name: "Chara Dasha",
      value: "charaDasha",
      description: "Calculate Chara Dasha (Jaimini) periods",
      action: "Get chara dasha",
    },
    {
      name: "Chart (Kundli)",
      value: "chart",
      description:
        "Generate Vedic birth chart (Kundli) with planetary positions",
      action: "Get vedic chart",
    },
    {
      name: "Chart Render",
      value: "chartRender",
      description: "Render Vedic chart as SVG/PNG image",
      action: "Render vedic chart",
    },
    {
      name: "Divisional Chart",
      value: "divisionalChart",
      description: "Calculate specific divisional chart (D1-D60)",
      action: "Get divisional chart",
    },
    {
      name: "Festival Calendar",
      value: "festivalCalendar",
      description: "Get Hindu festival calendar for a year",
      action: "Get festival calendar",
    },
    {
      name: "Kaal Sarpa Dosha",
      value: "kaalSarpaDosha",
      description:
        "Check for Kaal Sarpa Dosha - all planets between Rahu and Ketu",
      action: "Check kaal sarpa dosha",
    },
    {
      name: "KP System",
      value: "kpSystem",
      description: "Krishnamurti Paddhati analysis with sub-lords",
      action: "Get KP analysis",
    },
    {
      name: "Kundli Matching",
      value: "kundliMatching",
      description: "Match two Kundlis for marriage compatibility (Ashtakoot)",
      action: "Match kundlis",
    },
    {
      name: "Manglik Dosha",
      value: "manglikDosha",
      description: "Check for Manglik (Mangal) Dosha from Mars placement",
      action: "Check manglik dosha",
    },
    {
      name: "Nakshatra Predictions",
      value: "nakshatra",
      description: "Get detailed Nakshatra analysis and predictions",
      action: "Get nakshatra predictions",
    },
    {
      name: "Panchang",
      value: "panchang",
      description:
        "Get daily Panchang - Tithi, Nakshatra, Yoga, Karana, Muhurta",
      action: "Get panchang",
    },
    {
      name: "Regional Panchang",
      value: "regionalPanchang",
      description: "Get Panchang with regional sunrise/sunset times",
      action: "Get regional panchang",
    },
    {
      name: "Remedies",
      value: "remedies",
      description: "Get recommended remedies based on chart analysis",
      action: "Get remedies",
    },
    {
      name: "Sade Sati",
      value: "sadeSati",
      description: "Analyze Saturn Sade Sati periods (7.5 year Saturn transit)",
      action: "Get sade sati analysis",
    },
    {
      name: "Shadbala",
      value: "shadbala",
      description: "Calculate Shadbala (six-fold strength) of planets",
      action: "Get shadbala",
    },
    {
      name: "Transit",
      value: "transit",
      description: "Get Vedic transit analysis for current planetary positions",
      action: "Get vedic transits",
    },
    {
      name: "Varshaphal",
      value: "varshaphal",
      description: "Annual horoscope (Tajika/Solar Return in Vedic)",
      action: "Get varshaphal",
    },
    {
      name: "Vimshottari Dasha",
      value: "vimshottariDasha",
      description: "Calculate Vimshottari Dasha periods (120-year cycle)",
      action: "Get vimshottari dasha",
    },
    {
      name: "Yoga Analysis",
      value: "yogaAnalysis",
      description: "Analyze planetary Yogas (combinations) in the chart",
      action: "Get yoga analysis",
    },
    {
      name: "Yogini Dasha",
      value: "yoginiDasha",
      description: "Calculate Yogini Dasha periods (36-year cycle)",
      action: "Get yogini dasha",
    },
  ],
  default: "chart",
};

/**
 * Year field for calendar/varshaphal operations
 */
const yearField: INodeProperties = {
  displayName: "Year",
  name: "targetYear",
  type: "number",
  displayOptions: {
    show: {
      resource: ["vedic"],
      operation: ["festivalCalendar", "varshaphal"],
    },
  },
  default: new Date().getFullYear(),
  placeholder: "e.g. 2024",
  description: "Target year for the calculation",
  required: true,
};

/**
 * All properties for the vedic resource
 */
export const vedicOperations: INodeProperties[] = [
  // Operation selector
  vedicOperationField,

  // Birth data fields (for most operations)
  ...createBirthDataFields("vedic", undefined, [
    "festivalCalendar",
    "panchang",
    "regionalPanchang",
  ]),

  // Location fields (for most operations)
  ...createLocationFields("vedic", undefined, ["festivalCalendar"]),

  // Second subject fields (for kundliMatching)
  ...createSecondSubjectFields("vedic", ["kundliMatching"]),

  // Year field for calendar operations
  yearField,

  // Ayanamsa field (for all operations)
  createAyanamsaField("vedic"),

  // Vedic style field (for chart and chartRender)
  createVedicStyleField("vedic", ["chart", "chartRender"]),

  // Divisional chart field (for divisionalChart operation)
  createDivisionalChartField("vedic", ["divisionalChart"]),

  // Vedic options (node type, precision)
  ...createVedicOptionsFields("vedic"),

  // Dasha years field (for dasha operations)
  createDashaYearsField("vedic", [
    "vimshottariDasha",
    "charaDasha",
    "yoginiDasha",
  ]),

  // Language field (for text-heavy operations)
  createLanguageField("vedic", ["nakshatra", "remedies", "yogaAnalysis"]),

  // Simplify output (for all operations)
  createSimplifyField("vedic"),
];
