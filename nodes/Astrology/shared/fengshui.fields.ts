import type { INodeProperties } from "n8n-workflow";

/**
 * Create facing degrees field for Flying Stars chart
 */
export function createFacingDegreesField(
  resource: string,
  operations: string[],
): INodeProperties {
  return {
    displayName: "Facing Degrees",
    name: "facingDegrees",
    type: "number",
    displayOptions: {
      show: {
        resource: [resource],
        operation: operations,
      },
    },
    default: 180,
    required: true,
    typeOptions: {
      minValue: 0,
      maxValue: 360,
      numberPrecision: 1,
    },
    description:
      "Building facing direction in degrees (0-360, where 0/360 = North, 90 = East, 180 = South, 270 = West)",
  };
}

/**
 * Create Fengshui period field
 */
export function createFengshuiPeriodField(
  resource: string,
  operations: string[],
): INodeProperties {
  return {
    displayName: "Period",
    name: "period",
    type: "options",
    displayOptions: {
      show: {
        resource: [resource],
        operation: operations,
      },
    },
    options: [
      {
        name: "Period 8 (2004-2023)",
        value: 8,
      },
      {
        name: "Period 9 (2024-2043)",
        value: 9,
      },
    ],
    default: 9,
    description: "Feng Shui period based on construction/renovation date",
  };
}

/**
 * Create include annual stars field
 */
export function createIncludeAnnualField(
  resource: string,
  operations: string[],
): INodeProperties {
  return {
    displayName: "Include Annual Stars",
    name: "includeAnnual",
    type: "boolean",
    displayOptions: {
      show: {
        resource: [resource],
        operation: operations,
      },
    },
    default: true,
    description: "Whether to include annual Flying Stars overlay",
  };
}

/**
 * Create include monthly stars field
 */
export function createIncludeMonthlyField(
  resource: string,
  operations: string[],
): INodeProperties {
  return {
    displayName: "Include Monthly Stars",
    name: "includeMonthly",
    type: "boolean",
    displayOptions: {
      show: {
        resource: [resource],
        operation: operations,
      },
    },
    default: false,
    description: "Whether to include monthly Flying Stars overlay",
  };
}

/**
 * Create analysis date field
 */
export function createAnalysisDateField(
  resource: string,
  operations: string[],
): INodeProperties {
  return {
    displayName: "Analysis Date",
    name: "analysisDate",
    type: "string",
    displayOptions: {
      show: {
        resource: [resource],
        operation: operations,
      },
    },
    default: "",
    placeholder: "2025-01-15",
    description:
      "Date for annual/monthly overlay calculations (YYYY-MM-DD format, defaults to today)",
  };
}

/**
 * Create year field for annual endpoints
 */
export function createFengshuiYearField(
  resource: string,
  operations: string[],
): INodeProperties {
  return {
    displayName: "Year",
    name: "year",
    type: "number",
    displayOptions: {
      show: {
        resource: [resource],
        operation: operations,
      },
    },
    default: new Date().getFullYear(),
    required: true,
    description: "Year for annual Flying Stars or afflictions",
  };
}
