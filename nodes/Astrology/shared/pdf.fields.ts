import type { INodeProperties } from "n8n-workflow";

/**
 * Create PDF mode field (sun-sign vs personalized)
 */
export function createPdfModeField(
  resource: string,
  operations: string[],
): INodeProperties {
  return {
    displayName: "Mode",
    name: "pdfMode",
    type: "options",
    displayOptions: {
      show: {
        resource: [resource],
        operation: operations,
      },
    },
    options: [
      {
        name: "Sun Sign",
        value: "sunSign",
        description: "Generate horoscope by zodiac sign",
      },
      {
        name: "Personalized",
        value: "personalized",
        description: "Generate personalized horoscope based on birth data",
      },
    ],
    default: "sunSign",
    description: "Choose between sun-sign or personalized horoscope",
  };
}

/**
 * Create target date field for horoscope
 */
export function createTargetDateField(
  resource: string,
  operations: string[],
): INodeProperties {
  return {
    displayName: "Target Date",
    name: "targetDate",
    type: "string",
    displayOptions: {
      show: {
        resource: [resource],
        operation: operations,
      },
    },
    default: "",
    placeholder: "2025-02-03",
    description:
      "Date for the horoscope (YYYY-MM-DD format, defaults to today)",
  };
}

/**
 * Create PDF sections fields
 */
export function createPdfSectionsFields(
  resource: string,
  operations: string[],
): INodeProperties[] {
  const baseDisplayOptions = {
    show: {
      resource: [resource],
      operation: operations,
    },
  };

  return [
    {
      displayName: "Include General Overview",
      name: "sectionGeneralOverview",
      type: "boolean",
      displayOptions: baseDisplayOptions,
      default: true,
      description: "Whether to include general overview section",
    },
    {
      displayName: "Include Love & Relationships",
      name: "sectionLoveRelationships",
      type: "boolean",
      displayOptions: baseDisplayOptions,
      default: true,
      description: "Whether to include love and relationships section",
    },
    {
      displayName: "Include Career & Finance",
      name: "sectionCareerFinance",
      type: "boolean",
      displayOptions: baseDisplayOptions,
      default: true,
      description: "Whether to include career and finance section",
    },
    {
      displayName: "Include Health & Wellness",
      name: "sectionHealthWellness",
      type: "boolean",
      displayOptions: baseDisplayOptions,
      default: true,
      description: "Whether to include health and wellness section",
    },
    {
      displayName: "Include Lucky Elements",
      name: "sectionLuckyElements",
      type: "boolean",
      displayOptions: baseDisplayOptions,
      default: true,
      description:
        "Whether to include lucky colors, numbers, stones, directions, hours",
    },
    {
      displayName: "Include Daily Affirmation",
      name: "sectionDailyAffirmation",
      type: "boolean",
      displayOptions: baseDisplayOptions,
      default: true,
      description: "Whether to include daily affirmation",
    },
    {
      displayName: "Include Planetary Influences",
      name: "sectionPlanetaryInfluences",
      type: "boolean",
      displayOptions: baseDisplayOptions,
      default: true,
      description: "Whether to include planetary influences with exact times",
    },
    {
      displayName: "Max Planetary Influences",
      name: "maxPlanetaryInfluences",
      type: "number",
      displayOptions: {
        show: {
          resource: [resource],
          operation: operations,
          sectionPlanetaryInfluences: [true],
        },
      },
      default: 5,
      typeOptions: {
        minValue: 1,
        maxValue: 10,
      },
      description: "Maximum number of planetary influences to show",
    },
    {
      displayName: "Include Moon Phase",
      name: "sectionMoonPhase",
      type: "boolean",
      displayOptions: baseDisplayOptions,
      default: true,
      description: "Whether to include moon phase interpretation",
    },
    {
      displayName: "Include Compatibility Tip",
      name: "sectionCompatibilityTip",
      type: "boolean",
      displayOptions: baseDisplayOptions,
      default: false,
      description: "Whether to include daily compatibility tip",
    },
  ];
}

/**
 * Create PDF page settings fields
 */
export function createPdfPageSettingsFields(
  resource: string,
  operations: string[],
): INodeProperties[] {
  const baseDisplayOptions = {
    show: {
      resource: [resource],
      operation: operations,
    },
  };

  return [
    {
      displayName: "Page Size",
      name: "pageSize",
      type: "options",
      displayOptions: baseDisplayOptions,
      options: [
        { name: "A4", value: "A4" },
        { name: "Letter", value: "Letter" },
      ],
      default: "A4",
      description: "PDF page size",
    },
    {
      displayName: "Margin (Mm)",
      name: "marginMm",
      type: "number",
      displayOptions: baseDisplayOptions,
      default: 15,
      typeOptions: {
        minValue: 5,
        maxValue: 50,
      },
      description: "Page margin in millimeters",
    },
    {
      displayName: "Orientation",
      name: "orientation",
      type: "options",
      displayOptions: baseDisplayOptions,
      options: [
        { name: "Portrait", value: "portrait" },
        { name: "Landscape", value: "landscape" },
      ],
      default: "portrait",
      description: "Page orientation",
    },
  ];
}

/**
 * Create PDF design theme field
 */
export function createPdfThemeField(
  resource: string,
  operations: string[],
): INodeProperties {
  return {
    displayName: "Theme",
    name: "pdfTheme",
    type: "options",
    displayOptions: {
      show: {
        resource: [resource],
        operation: operations,
      },
    },
    options: [
      { name: "Modern", value: "modern" },
      { name: "Classic", value: "classic" },
    ],
    default: "modern",
    description: "PDF design theme",
  };
}
