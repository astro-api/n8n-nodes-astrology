import type { INodeProperties } from "n8n-workflow";

/**
 * Create eclipse ID field for interpretation endpoint
 */
export function createEclipseIdField(
  resource: string,
  operations: string[],
): INodeProperties {
  return {
    displayName: "Eclipse ID",
    name: "eclipseId",
    type: "string",
    default: "",
    displayOptions: {
      show: {
        resource: [resource],
        operation: operations,
      },
    },
    required: true,
    placeholder: "2025Sep21P",
    description:
      "NASA format eclipse ID (e.g., 2025Sep21P for Partial eclipse on September 21, 2025)",
  };
}

/**
 * Create eclipse orb field for natal check
 */
export function createEclipseOrbField(
  resource: string,
  operations: string[],
): INodeProperties {
  return {
    displayName: "Maximum Orb",
    name: "maxOrb",
    type: "number",
    default: 5,
    displayOptions: {
      show: {
        resource: [resource],
        operation: operations,
      },
    },
    typeOptions: {
      minValue: 1,
      maxValue: 10,
      numberPrecision: 1,
    },
    description: "Maximum orb in degrees for eclipse aspects (1-10)",
  };
}

/**
 * Create eclipse date range fields
 */
export function createEclipseDateRangeFields(
  resource: string,
  operations: string[],
): INodeProperties[] {
  return [
    {
      displayName: "Start Year",
      name: "startYear",
      type: "number",
      default: 2025,
      displayOptions: {
        show: {
          resource: [resource],
          operation: operations,
        },
      },
      required: true,
      description: "Start year for eclipse search",
    },
    {
      displayName: "Start Month",
      name: "startMonth",
      type: "number",
      default: 1,
      displayOptions: {
        show: {
          resource: [resource],
          operation: operations,
        },
      },
      typeOptions: {
        minValue: 1,
        maxValue: 12,
      },
      required: true,
      description: "Start month (1-12)",
    },
    {
      displayName: "Start Day",
      name: "startDay",
      type: "number",
      default: 1,
      displayOptions: {
        show: {
          resource: [resource],
          operation: operations,
        },
      },
      typeOptions: {
        minValue: 1,
        maxValue: 31,
      },
      required: true,
      description: "Start day (1-31)",
    },
    {
      displayName: "End Year",
      name: "endYear",
      type: "number",
      default: 2026,
      displayOptions: {
        show: {
          resource: [resource],
          operation: operations,
        },
      },
      required: true,
      description: "End year for eclipse search",
    },
    {
      displayName: "End Month",
      name: "endMonth",
      type: "number",
      default: 12,
      displayOptions: {
        show: {
          resource: [resource],
          operation: operations,
        },
      },
      typeOptions: {
        minValue: 1,
        maxValue: 12,
      },
      required: true,
      description: "End month (1-12)",
    },
    {
      displayName: "End Day",
      name: "endDay",
      type: "number",
      default: 31,
      displayOptions: {
        show: {
          resource: [resource],
          operation: operations,
        },
      },
      typeOptions: {
        minValue: 1,
        maxValue: 31,
      },
      required: true,
      description: "End day (1-31)",
    },
  ];
}

/**
 * Create eclipse count field for upcoming endpoint
 */
export function createEclipseCountField(
  resource: string,
  operations: string[],
): INodeProperties {
  return {
    displayName: "Count",
    name: "count",
    type: "number",
    default: 10,
    displayOptions: {
      show: {
        resource: [resource],
        operation: operations,
      },
    },
    typeOptions: {
      minValue: 1,
      maxValue: 50,
    },
    description: "Number of upcoming eclipses to return (1-50)",
  };
}

/**
 * Create include birth data toggle for interpretation
 */
export function createIncludePersonalField(
  resource: string,
  operations: string[],
): INodeProperties {
  return {
    displayName: "Include Personal Analysis",
    name: "includePersonal",
    type: "boolean",
    default: false,
    displayOptions: {
      show: {
        resource: [resource],
        operation: operations,
      },
    },
    description:
      "Whether to include personal interpretation based on birth data",
  };
}
