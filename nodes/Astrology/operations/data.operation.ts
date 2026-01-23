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
      name: "Current Time",
      value: "now",
      description: "Get current UTC time data for astrological calculations",
      action: "Get current time data",
    },
    {
      name: "Planetary Positions",
      value: "positions",
      description: "Get planetary positions with zodiac signs and degrees",
      action: "Get planetary positions",
    },
    {
      name: "House Cusps",
      value: "houseCusps",
      description: "Get astrological house boundaries",
      action: "Get house cusps",
    },
    {
      name: "Aspects",
      value: "aspects",
      description: "Get angular relationships between celestial bodies",
      action: "Get aspects",
    },
    {
      name: "Lunar Metrics",
      value: "lunarMetrics",
      description: "Get moon phase cycles and illumination data",
      action: "Get lunar metrics",
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

  // Location fields (hidden for 'now' operation)
  ...createLocationFields("data", undefined, ["now"]),
];
