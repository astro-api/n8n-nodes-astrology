import type { INodeProperties } from "n8n-workflow";

/**
 * Creates a Chinese zodiac animal field
 *
 * @param resourceName - The resource value to show this field for
 * @param showForOperations - Operations that should show this field (optional)
 */
export function createChineseAnimalField(
  resourceName: string,
  showForOperations?: string[],
): INodeProperties {
  const displayOptions: INodeProperties["displayOptions"] = {
    show: {
      resource: [resourceName],
    },
  };

  if (showForOperations && showForOperations.length > 0) {
    displayOptions.show!.operation = showForOperations;
  }

  return {
    displayName: "Zodiac Animal",
    name: "zodiacAnimal",
    type: "options",
    displayOptions,
    options: [
      {
        name: "Dog",
        value: "dog",
        description: "Dog (狗) - loyal, honest, faithful",
      },
      {
        name: "Dragon",
        value: "dragon",
        description: "Dragon (龙) - confident, intelligent, ambitious",
      },
      {
        name: "Goat",
        value: "goat",
        description: "Goat (羊) - calm, gentle, creative",
      },
      {
        name: "Horse",
        value: "horse",
        description: "Horse (马) - animated, active, energetic",
      },
      {
        name: "Monkey",
        value: "monkey",
        description: "Monkey (猴) - sharp, smart, curious",
      },
      {
        name: "Ox",
        value: "ox",
        description: "Ox (牛) - diligent, dependable, strong",
      },
      {
        name: "Pig",
        value: "pig",
        description: "Pig (猪) - compassionate, generous, diligent",
      },
      {
        name: "Rabbit",
        value: "rabbit",
        description: "Rabbit (兔) - quiet, elegant, kind",
      },
      {
        name: "Rat",
        value: "rat",
        description: "Rat (鼠) - quick-witted, resourceful, versatile",
      },
      {
        name: "Rooster",
        value: "rooster",
        description: "Rooster (鸡) - observant, hardworking, courageous",
      },
      {
        name: "Snake",
        value: "snake",
        description: "Snake (蛇) - enigmatic, intelligent, wise",
      },
      {
        name: "Tiger",
        value: "tiger",
        description: "Tiger (虎) - brave, competitive, unpredictable",
      },
    ],
    default: "dragon",
    description: "Chinese zodiac animal to get information about",
  };
}

/**
 * Creates a Chinese tradition field
 *
 * @param resourceName - The resource value to show this field for
 * @param showForOperations - Operations that should show this field (optional)
 */
export function createChineseTraditionField(
  resourceName: string,
  showForOperations?: string[],
): INodeProperties {
  const displayOptions: INodeProperties["displayOptions"] = {
    show: {
      resource: [resourceName],
    },
  };

  if (showForOperations && showForOperations.length > 0) {
    displayOptions.show!.operation = showForOperations;
  }

  return {
    displayName: "Tradition",
    name: "chineseTradition",
    type: "options",
    displayOptions,
    options: [
      {
        name: "Classical",
        value: "classical",
        description: "Traditional interpretation methods",
      },
      {
        name: "Modern",
        value: "modern",
        description: "Contemporary interpretation approach",
      },
      {
        name: "Simplified",
        value: "simplified",
        description: "Simplified interpretation for beginners",
      },
    ],
    default: "classical",
    description: "Interpretation tradition to use",
  };
}

/**
 * Creates an analysis depth field
 *
 * @param resourceName - The resource value to show this field for
 * @param showForOperations - Operations that should show this field (optional)
 */
export function createAnalysisDepthField(
  resourceName: string,
  showForOperations?: string[],
): INodeProperties {
  const displayOptions: INodeProperties["displayOptions"] = {
    show: {
      resource: [resourceName],
    },
  };

  if (showForOperations && showForOperations.length > 0) {
    displayOptions.show!.operation = showForOperations;
  }

  return {
    displayName: "Analysis Depth",
    name: "analysisDepth",
    type: "options",
    displayOptions,
    options: [
      {
        name: "Basic",
        value: "basic",
        description: "Essential information only",
      },
      {
        name: "Comprehensive",
        value: "comprehensive",
        description: "Detailed analysis with all elements",
      },
      {
        name: "Professional",
        value: "professional",
        description: "Full professional-grade analysis",
      },
      {
        name: "Standard",
        value: "standard",
        description: "Balanced level of detail",
      },
    ],
    default: "standard",
    description: "Level of detail in the analysis",
  };
}

/**
 * Creates a gender field
 *
 * @param resourceName - The resource value to show this field for
 * @param showForOperations - Operations that should show this field (optional)
 */
export function createGenderField(
  resourceName: string,
  showForOperations?: string[],
): INodeProperties {
  const displayOptions: INodeProperties["displayOptions"] = {
    show: {
      resource: [resourceName],
    },
  };

  if (showForOperations && showForOperations.length > 0) {
    displayOptions.show!.operation = showForOperations;
  }

  return {
    displayName: "Gender",
    name: "gender",
    type: "options",
    displayOptions,
    options: [
      {
        name: "Female",
        value: "female",
        description: "Female gender for luck pillar calculations",
      },
      {
        name: "Male",
        value: "male",
        description: "Male gender for luck pillar calculations",
      },
    ],
    default: "male",
    description:
      "Gender is required for luck pillar calculations in Chinese astrology",
  };
}

/**
 * Creates include luck pillars field
 *
 * @param resourceName - The resource value to show this field for
 * @param showForOperations - Operations that should show this field (optional)
 */
export function createIncludeLuckPillarsField(
  resourceName: string,
  showForOperations?: string[],
): INodeProperties {
  const displayOptions: INodeProperties["displayOptions"] = {
    show: {
      resource: [resourceName],
    },
  };

  if (showForOperations && showForOperations.length > 0) {
    displayOptions.show!.operation = showForOperations;
  }

  return {
    displayName: "Include Luck Pillars",
    name: "includeLuckPillars",
    type: "boolean",
    displayOptions,
    default: false,
    description:
      "Whether to include 10-year luck period analysis (requires gender)",
  };
}

/**
 * Creates include annual pillars field
 *
 * @param resourceName - The resource value to show this field for
 * @param showForOperations - Operations that should show this field (optional)
 */
export function createIncludeAnnualPillarsField(
  resourceName: string,
  showForOperations?: string[],
): INodeProperties {
  const displayOptions: INodeProperties["displayOptions"] = {
    show: {
      resource: [resourceName],
    },
  };

  if (showForOperations && showForOperations.length > 0) {
    displayOptions.show!.operation = showForOperations;
  }

  return {
    displayName: "Include Annual Pillars",
    name: "includeAnnualPillars",
    type: "boolean",
    displayOptions,
    default: false,
    description: "Whether to include yearly analysis within luck periods",
  };
}

/**
 * Creates a year field for Chinese calendar operations
 *
 * @param resourceName - The resource value to show this field for
 * @param showForOperations - Operations that should show this field (optional)
 */
export function createChineseYearField(
  resourceName: string,
  showForOperations?: string[],
): INodeProperties {
  const displayOptions: INodeProperties["displayOptions"] = {
    show: {
      resource: [resourceName],
    },
  };

  if (showForOperations && showForOperations.length > 0) {
    displayOptions.show!.operation = showForOperations;
  }

  return {
    displayName: "Year",
    name: "chineseYear",
    type: "number",
    displayOptions,
    default: 2024,
    typeOptions: {
      minValue: 1900,
      maxValue: 2100,
    },
    description: "Year for Chinese calendar analysis (1900-2100)",
  };
}
