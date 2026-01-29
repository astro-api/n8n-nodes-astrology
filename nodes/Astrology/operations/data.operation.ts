import type { INodeProperties } from "n8n-workflow";
import { createBirthDataFields, createLocationFields } from "../shared";

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
      name: "Current Time",
      value: "now",
      description:
        "Get current UTC time with Julian Day number for real-time astrological calculations",
      action: "Get current time data",
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
      name: "Planetary Positions",
      value: "positions",
      description:
        "Calculate positions of planets and points showing zodiac sign, degree, minute, retrograde status",
      action: "Get planetary positions data",
    },
  ],
  default: "positions",
};

/**
 * All properties for the data resource
 * Uses shared field creators to avoid duplication
 */
/**
 * Simplify output toggle for data resource
 */
const simplifyField: INodeProperties = {
  displayName: "Simplify",
  name: "simplify",
  type: "boolean",
  displayOptions: {
    show: {
      resource: ["data"],
    },
    hide: {
      operation: ["now"],
    },
  },
  default: true,
  description:
    "Whether to return simplified response with key data only. Disable for full API response with all metadata.",
};

export const dataOperations: INodeProperties[] = [
  // Operation selector
  dataOperationField,

  // Birth data fields (hidden for 'now' operation)
  ...createBirthDataFields("data", undefined, ["now"]),

  // Location fields (hidden for 'now' operation)
  ...createLocationFields("data", undefined, ["now"]),

  // Simplify output (hidden for 'now' operation)
  simplifyField,
];
