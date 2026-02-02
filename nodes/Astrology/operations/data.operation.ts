import type { INodeProperties } from "n8n-workflow";
import {
  createBirthDataFields,
  createLocationFields,
  createSimplifyField,
} from "../shared";

/**
 * Operation selector for data resource
 */
const dataOperationField: INodeProperties = {
  displayName: "Operation",
  name: "operation",
  type: "options",
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ["data"],
    },
  },
  options: [
    {
      name: "Aspects",
      value: "aspects",
      description:
        "Calculate angular relationships (conjunctions, squares, trines, oppositions) between planets and points for astrological interpretation",
      action: "Get aspects data",
    },
    {
      name: "Aspects (Enhanced)",
      value: "aspectsEnhanced",
      description:
        "Aspects with traditional reception analysis (mutual/single reception quality, applying/separating)",
      action: "Get enhanced aspects with traditional analysis",
    },
    {
      name: "Current Time",
      value: "now",
      description:
        "Get current UTC time with Julian Day number for real-time astrological calculations",
      action: "Get current time data",
    },
    {
      name: "Global Positions",
      value: "globalPositions",
      description:
        "Location-independent ephemeris data for batch processing and caching planetary positions",
      action: "Get global planetary positions",
    },
    {
      name: "House Cusps",
      value: "houseCusps",
      description:
        "Calculate the 12 astrological house boundaries (cusps) using specified house system (Placidus, Whole Sign, Koch, etc.)",
      action: "Get house cusps data",
    },
    {
      name: "Lunar Metrics",
      value: "lunarMetrics",
      description:
        "Get current Moon phase, illumination percentage, and lunar cycle position",
      action: "Get lunar metrics data",
    },
    {
      name: "Lunar Metrics (Enhanced)",
      value: "lunarMetricsEnhanced",
      description:
        "Lunar data with Void of Course periods, lunar mansions, and traditional timing analysis",
      action: "Get enhanced lunar metrics",
    },
    {
      name: "Planetary Positions",
      value: "positions",
      description:
        "Calculate positions of planets and points showing zodiac sign, degree, minute, retrograde status",
      action: "Get planetary positions data",
    },
    {
      name: "Planetary Positions (Enhanced)",
      value: "positionsEnhanced",
      description:
        "Planetary positions with essential dignities, receptions, and traditional Hellenistic astrology data",
      action: "Get enhanced positions with traditional astrology",
    },
  ],
  default: "positions",
};

/**
 * All properties for the data resource
 * Uses shared field creators to avoid duplication
 */
export const dataOperations: INodeProperties[] = [
  // Operation selector
  dataOperationField,

  // Birth data fields (hidden for 'now' operation)
  ...createBirthDataFields("data", undefined, ["now"]),

  // Location fields (hidden for 'now' and 'globalPositions' operations)
  ...createLocationFields("data", undefined, ["now", "globalPositions"]),

  // Simplify output (hidden for 'now' operation)
  createSimplifyField("data", ["now"]),
];
