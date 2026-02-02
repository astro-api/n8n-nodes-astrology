import type { INodeProperties } from "n8n-workflow";

/**
 * Tarot tradition options
 */
export const tarotTraditionOptions: INodeProperties["options"] = [
  { name: "Classical", value: "classical" },
  { name: "Hermetic", value: "hermetic" },
  { name: "Psychological", value: "psychological" },
  { name: "Universal", value: "universal" },
];

/**
 * Tarot interpretation depth options
 */
export const tarotInterpretationDepthOptions: INodeProperties["options"] = [
  { name: "Keywords Only", value: "keywords" },
  { name: "Basic", value: "basic" },
  { name: "Detailed", value: "detailed" },
  { name: "Professional", value: "professional" },
];

/**
 * Tarot arcana filter options
 */
export const tarotArcanaOptions: INodeProperties["options"] = [
  { name: "All", value: "" },
  { name: "Major Arcana", value: "major" },
  { name: "Minor Arcana", value: "minor" },
];

/**
 * Tarot suit filter options
 */
export const tarotSuitOptions: INodeProperties["options"] = [
  { name: "All", value: "" },
  { name: "Cups", value: "cups" },
  { name: "Pentacles", value: "pentacles" },
  { name: "Swords", value: "swords" },
  { name: "Wands", value: "wands" },
];

/**
 * Tarot element filter options
 */
export const tarotElementOptions: INodeProperties["options"] = [
  { name: "All", value: "" },
  { name: "Air", value: "air" },
  { name: "Earth", value: "earth" },
  { name: "Fire", value: "fire" },
  { name: "Water", value: "water" },
];

/**
 * Creates a tarot tradition selection field
 */
export function createTarotTraditionField(
  resourceName: string,
  showForOperations?: string[],
): INodeProperties {
  const baseDisplayOptions: INodeProperties["displayOptions"] = {
    show: {
      resource: [resourceName],
    },
  };

  if (showForOperations && showForOperations.length > 0) {
    baseDisplayOptions.show!.operation = showForOperations;
  }

  return {
    displayName: "Tradition",
    name: "tradition",
    type: "options",
    displayOptions: baseDisplayOptions,
    options: tarotTraditionOptions,
    default: "universal",
    description: "Tarot interpretation tradition/style",
  };
}

/**
 * Creates an interpretation depth field
 */
export function createInterpretationDepthField(
  resourceName: string,
  showForOperations?: string[],
): INodeProperties {
  const baseDisplayOptions: INodeProperties["displayOptions"] = {
    show: {
      resource: [resourceName],
    },
  };

  if (showForOperations && showForOperations.length > 0) {
    baseDisplayOptions.show!.operation = showForOperations;
  }

  return {
    displayName: "Interpretation Depth",
    name: "interpretationDepth",
    type: "options",
    displayOptions: baseDisplayOptions,
    options: tarotInterpretationDepthOptions,
    default: "detailed",
    description: "Level of detail in card interpretations",
  };
}

/**
 * Creates tarot-specific boolean option fields
 */
export function createTarotOptionsFields(
  resourceName: string,
  showForOperations: string[],
): INodeProperties[] {
  const baseDisplayOptions: INodeProperties["displayOptions"] = {
    show: {
      resource: [resourceName],
      operation: showForOperations,
    },
  };

  return [
    {
      displayName: "Use Reversals",
      name: "useReversals",
      type: "boolean",
      displayOptions: baseDisplayOptions,
      default: true,
      description: "Whether to include reversed card orientations",
    },
    {
      displayName: "Include Dignities",
      name: "includeDignities",
      type: "boolean",
      displayOptions: baseDisplayOptions,
      default: false,
      description: "Whether to include elemental dignity analysis",
    },
    {
      displayName: "Include Timing",
      name: "includeTiming",
      type: "boolean",
      displayOptions: baseDisplayOptions,
      default: false,
      description: "Whether to include timing predictions",
    },
    {
      displayName: "Include Astrological Context",
      name: "includeAstroContext",
      type: "boolean",
      displayOptions: baseDisplayOptions,
      default: false,
      description: "Whether to include current astrological influences",
    },
    {
      displayName: "Include Birth Cards",
      name: "includeBirthCards",
      type: "boolean",
      displayOptions: baseDisplayOptions,
      default: false,
      description: "Whether to include personal birth cards in analysis",
    },
  ];
}
