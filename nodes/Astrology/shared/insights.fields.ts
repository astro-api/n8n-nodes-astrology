import type { INodeProperties } from "n8n-workflow";

/**
 * Creates a pet species field
 *
 * @param resourceName - The resource value to show this field for
 * @param showForOperations - Operations that should show this field (optional)
 */
export function createPetSpeciesField(
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
    displayName: "Pet Species",
    name: "petSpecies",
    type: "options",
    displayOptions,
    options: [
      { name: "Bird", value: "bird" },
      { name: "Cat", value: "cat" },
      { name: "Dog", value: "dog" },
      { name: "Horse", value: "horse" },
      { name: "Other", value: "other" },
    ],
    default: "dog",
    description: "Type of pet for the analysis",
  };
}

/**
 * Creates a pet breed field
 *
 * @param resourceName - The resource value to show this field for
 * @param showForOperations - Operations that should show this field (optional)
 */
export function createPetBreedField(
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
    displayName: "Pet Breed",
    name: "petBreed",
    type: "string",
    displayOptions,
    default: "",
    placeholder: "e.g. Golden Retriever",
    description: "Breed of the pet (optional)",
  };
}

/**
 * Creates business activity type field
 *
 * @param resourceName - The resource value to show this field for
 * @param showForOperations - Operations that should show this field (optional)
 */
export function createBusinessActivityField(
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
    displayName: "Activity Types",
    name: "businessActivities",
    type: "multiOptions",
    displayOptions,
    options: [
      {
        name: "Hiring",
        value: "hiring",
        description: "Best recruitment windows",
      },
      {
        name: "Meetings",
        value: "meetings",
        description: "Productive discussion windows",
      },
      {
        name: "Negotiations",
        value: "negotiations",
        description: "Favorable deal-making periods",
      },
      {
        name: "Product Launch",
        value: "product_launch",
        description: "Maximum impact timing",
      },
      {
        name: "Restructuring",
        value: "restructuring",
        description: "Smooth transition periods",
      },
    ],
    default: ["product_launch", "meetings"],
    description: "Business activities to analyze timing for",
  };
}

/**
 * Creates include owner data toggle for pet analysis
 *
 * @param resourceName - The resource value to show this field for
 * @param showForOperations - Operations that should show this field (optional)
 */
export function createIncludeOwnerField(
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
    displayName: "Include Owner Data",
    name: "includeOwner",
    type: "boolean",
    displayOptions,
    default: false,
    description:
      "Whether to include owner birth data for enhanced pet analysis",
  };
}

/**
 * Creates owner birth data fields (shown when includeOwner is true)
 *
 * @param resourceName - The resource value to show these fields for
 * @param showForOperations - Operations that should show these fields (optional)
 */
export function createOwnerBirthDataFields(
  resourceName: string,
  showForOperations?: string[],
): INodeProperties[] {
  const baseDisplayOptions: INodeProperties["displayOptions"] = {
    show: {
      resource: [resourceName],
      includeOwner: [true],
    },
  };

  if (showForOperations && showForOperations.length > 0) {
    baseDisplayOptions.show!.operation = showForOperations;
  }

  return [
    {
      displayName: "Owner Birth Year",
      name: "ownerBirthYear",
      type: "number",
      displayOptions: baseDisplayOptions,
      default: 1990,
      typeOptions: {
        minValue: 1900,
        maxValue: 2100,
      },
    },
    {
      displayName: "Owner Birth Month",
      name: "ownerBirthMonth",
      type: "number",
      displayOptions: baseDisplayOptions,
      default: 1,
      typeOptions: {
        minValue: 1,
        maxValue: 12,
      },
      description: "Owner birth month (1-12)",
    },
    {
      displayName: "Owner Birth Day",
      name: "ownerBirthDay",
      type: "number",
      displayOptions: baseDisplayOptions,
      default: 1,
      typeOptions: {
        minValue: 1,
        maxValue: 31,
      },
      description: "Owner birth day (1-31)",
    },
    {
      displayName: "Owner Birth Hour",
      name: "ownerBirthHour",
      type: "number",
      displayOptions: baseDisplayOptions,
      default: 12,
      typeOptions: {
        minValue: 0,
        maxValue: 23,
      },
      description: "Owner birth hour (0-23)",
    },
    {
      displayName: "Owner Birth Minute",
      name: "ownerBirthMinute",
      type: "number",
      displayOptions: baseDisplayOptions,
      default: 0,
      typeOptions: {
        minValue: 0,
        maxValue: 59,
      },
      description: "Owner birth minute (0-59)",
    },
  ];
}

/**
 * Creates a market type field for financial insights
 *
 * @param resourceName - The resource value to show this field for
 * @param showForOperations - Operations that should show this field (optional)
 */
export function createMarketTypeField(
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
    displayName: "Market Type",
    name: "marketType",
    type: "options",
    displayOptions,
    options: [
      { name: "Commodities", value: "commodities" },
      { name: "Crypto", value: "crypto" },
      { name: "Forex", value: "forex" },
      { name: "General", value: "general" },
      { name: "Stocks", value: "stocks" },
    ],
    default: "general",
    description: "Type of market to analyze",
  };
}

/**
 * Creates a wellness focus field
 *
 * @param resourceName - The resource value to show this field for
 * @param showForOperations - Operations that should show this field (optional)
 */
export function createWellnessFocusField(
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
    displayName: "Wellness Focus",
    name: "wellnessFocus",
    type: "multiOptions",
    displayOptions,
    options: [
      { name: "Diet", value: "diet" },
      { name: "Exercise", value: "exercise" },
      { name: "Mental Health", value: "mental_health" },
      { name: "Sleep", value: "sleep" },
      { name: "Stress", value: "stress" },
    ],
    default: ["exercise", "sleep"],
    description: "Areas of wellness to focus on",
  };
}
