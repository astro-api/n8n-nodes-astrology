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
      description: "Calculate angular relationships between celestial bodies",
      action: "Get aspects data",
    },
    {
      name: "Current Time",
      value: "now",
      description: "Get current UTC time data for astrological calculations",
      action: "Get current time data",
    },
    {
      name: "House Cusps",
      value: "houseCusps",
      description: "Calculate astrological house boundaries",
      action: "Get house cusps data",
    },
    {
      name: "Lunar Metrics",
      value: "lunarMetrics",
      description: "Calculate moon phase cycles and illumination",
      action: "Get lunar metrics data",
    },
    {
      name: "Planetary Positions",
      value: "positions",
      description:
        "Calculate planetary positions with zodiac signs and degrees",
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
    "Whether to return a simplified version of the response instead of the raw data",
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
