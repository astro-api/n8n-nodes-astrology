import type { INodeProperties } from "n8n-workflow";

/**
 * Create fixed stars preset field
 */
export function createFixedStarsPresetField(
  resource: string,
  operations: string[],
): INodeProperties {
  return {
    displayName: "Star Presets",
    name: "starPresets",
    type: "multiOptions",
    displayOptions: {
      show: {
        resource: [resource],
        operation: operations,
      },
    },
    options: [
      {
        name: "Essential (10 Stars)",
        value: "essential",
        description: "Most important fixed stars including Royal Stars",
      },
      {
        name: "Traditional (13 Stars)",
        value: "traditional",
        description: "Traditional astrological fixed stars",
      },
      {
        name: "Behenian (15 Stars)",
        value: "behenian",
        description: "15 Behenian stars used in magical timing",
      },
      {
        name: "Extended (20+ Stars)",
        value: "extended",
        description: "Extended set with additional significant stars",
      },
    ],
    default: ["essential"],
    description: "Select star preset groups to include",
  };
}

/**
 * Create conjunction orb field
 */
export function createConjunctionOrbField(
  resource: string,
  operations: string[],
): INodeProperties {
  return {
    displayName: "Conjunction Orb",
    name: "conjunctionOrb",
    type: "number",
    displayOptions: {
      show: {
        resource: [resource],
        operation: operations,
      },
    },
    default: 2.0,
    typeOptions: {
      minValue: 0.5,
      maxValue: 5.0,
      numberPrecision: 1,
    },
    description: "Maximum orb in degrees for conjunction aspects (0.5-5.0)",
  };
}

/**
 * Create opposition orb field
 */
export function createOppositionOrbField(
  resource: string,
  operations: string[],
): INodeProperties {
  return {
    displayName: "Opposition Orb",
    name: "oppositionOrb",
    type: "number",
    displayOptions: {
      show: {
        resource: [resource],
        operation: operations,
      },
    },
    default: 1.5,
    typeOptions: {
      minValue: 0.5,
      maxValue: 3.0,
      numberPrecision: 1,
    },
    description: "Maximum orb in degrees for opposition aspects (0.5-3.0)",
  };
}

/**
 * Create include interpretations field
 */
export function createIncludeStarInterpretationsField(
  resource: string,
  operations: string[],
): INodeProperties {
  return {
    displayName: "Include Interpretations",
    name: "includeStarInterpretations",
    type: "boolean",
    displayOptions: {
      show: {
        resource: [resource],
        operation: operations,
      },
    },
    default: true,
    description: "Whether to include interpretations for star placements",
  };
}
