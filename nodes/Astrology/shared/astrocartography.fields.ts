import type { INodeProperties } from "n8n-workflow";

/**
 * Creates a planets multi-select field for astrocartography
 *
 * @param resourceName - The resource value to show this field for
 * @param showForOperations - Operations that should show this field (optional)
 */
export function createAstrocartographyPlanetsField(
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
    displayName: "Planets",
    name: "acPlanets",
    type: "multiOptions",
    displayOptions,
    options: [
      { name: "Jupiter", value: "Jupiter" },
      { name: "Mars", value: "Mars" },
      { name: "Mercury", value: "Mercury" },
      { name: "Moon", value: "Moon" },
      { name: "Neptune", value: "Neptune" },
      { name: "Pluto", value: "Pluto" },
      { name: "Saturn", value: "Saturn" },
      { name: "Sun", value: "Sun" },
      { name: "Uranus", value: "Uranus" },
      { name: "Venus", value: "Venus" },
    ],
    default: ["Sun", "Moon", "Venus", "Mars", "Jupiter"],
    description: "Planets to include in the astrocartography calculation",
  };
}

/**
 * Creates a line types multi-select field for astrocartography
 *
 * @param resourceName - The resource value to show this field for
 * @param showForOperations - Operations that should show this field (optional)
 */
export function createLineTypesField(
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
    displayName: "Line Types",
    name: "lineTypes",
    type: "multiOptions",
    displayOptions,
    options: [
      {
        name: "AC (Ascendant)",
        value: "AC",
        description: "Where planet rises on eastern horizon",
      },
      {
        name: "DS (Descendant)",
        value: "DS",
        description: "Where planet sets on western horizon",
      },
      {
        name: "IC (Imum Coeli)",
        value: "IC",
        description: "Where planet reaches lowest point",
      },
      {
        name: "MC (Midheaven)",
        value: "MC",
        description: "Where planet reaches highest point",
      },
    ],
    default: ["AC", "MC"],
    description: "Types of angular lines to calculate",
  };
}

/**
 * Creates a coordinate density field for astrocartography lines
 *
 * @param resourceName - The resource value to show this field for
 * @param showForOperations - Operations that should show this field (optional)
 */
export function createCoordinateDensityField(
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
    displayName: "Coordinate Density",
    name: "coordinateDensity",
    type: "number",
    displayOptions,
    default: 100,
    typeOptions: {
      minValue: 20,
      maxValue: 500,
    },
    description:
      "Number of coordinate points per line (20-100: basic, 100-300: standard, 300-500: high precision)",
  };
}

/**
 * Creates a coordinate precision field
 *
 * @param resourceName - The resource value to show this field for
 * @param showForOperations - Operations that should show this field (optional)
 */
export function createCoordinatePrecisionField(
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
    displayName: "Coordinate Precision",
    name: "coordinatePrecision",
    type: "number",
    displayOptions,
    default: 4,
    typeOptions: {
      minValue: 2,
      maxValue: 6,
    },
    description: "Decimal places for coordinates (2-6)",
  };
}

/**
 * Creates target location fields for location analysis
 *
 * @param resourceName - The resource value to show this field for
 * @param showForOperations - Operations that should show this field (optional)
 */
export function createTargetLocationFields(
  resourceName: string,
  showForOperations?: string[],
): INodeProperties[] {
  const displayOptions: INodeProperties["displayOptions"] = {
    show: {
      resource: [resourceName],
    },
  };

  if (showForOperations && showForOperations.length > 0) {
    displayOptions.show!.operation = showForOperations;
  }

  return [
    {
      displayName: "Target City",
      name: "targetCity",
      type: "string",
      displayOptions,
      default: "",
      placeholder: "e.g. New York",
      description: "City name for location analysis",
    },
    {
      displayName: "Target Country Code",
      name: "targetCountryCode",
      type: "string",
      displayOptions,
      default: "",
      placeholder: "e.g. US",
      description: "ISO 3166-1 alpha-2 country code (e.g., US, GB, FR)",
    },
    {
      displayName: "Target Latitude",
      name: "targetLatitude",
      type: "number",
      displayOptions,
      default: 0,
      typeOptions: {
        minValue: -90,
        maxValue: 90,
        numberPrecision: 6,
      },
      description: "Target latitude in decimal degrees (-90 to 90)",
    },
    {
      displayName: "Target Longitude",
      name: "targetLongitude",
      type: "number",
      displayOptions,
      default: 0,
      typeOptions: {
        minValue: -180,
        maxValue: 180,
        numberPrecision: 6,
      },
      description: "Target longitude in decimal degrees (-180 to 180)",
    },
  ];
}

/**
 * Creates a map visual options collection
 *
 * @param resourceName - The resource value to show this field for
 * @param showForOperations - Operations that should show this field (optional)
 */
export function createMapVisualOptionsFields(
  resourceName: string,
  showForOperations?: string[],
): INodeProperties[] {
  const displayOptions: INodeProperties["displayOptions"] = {
    show: {
      resource: [resourceName],
    },
  };

  if (showForOperations && showForOperations.length > 0) {
    displayOptions.show!.operation = showForOperations;
  }

  return [
    {
      displayName: "Map Theme",
      name: "mapTheme",
      type: "options",
      displayOptions,
      options: [
        { name: "Dark", value: "dark" },
        { name: "Light", value: "light" },
        { name: "Satellite", value: "satellite" },
      ],
      default: "light",
      description: "Visual theme for the map",
    },
    {
      displayName: "Map Width",
      name: "mapWidth",
      type: "number",
      displayOptions,
      default: 1200,
      typeOptions: {
        minValue: 400,
        maxValue: 4000,
      },
      description: "Width of the map in pixels (400-4000)",
    },
    {
      displayName: "Map Height",
      name: "mapHeight",
      type: "number",
      displayOptions,
      default: 800,
      typeOptions: {
        minValue: 300,
        maxValue: 3000,
      },
      description: "Height of the map in pixels (300-3000)",
    },
  ];
}

/**
 * Creates power type field for power zones
 *
 * @param resourceName - The resource value to show this field for
 * @param showForOperations - Operations that should show this field (optional)
 */
export function createPowerTypeField(
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
    displayName: "Power Type",
    name: "powerType",
    type: "options",
    displayOptions,
    options: [
      {
        name: "Career",
        value: "career",
        description: "Best locations for career advancement",
      },
      {
        name: "Creativity",
        value: "creativity",
        description: "Best locations for creative pursuits",
      },
      {
        name: "Love",
        value: "love",
        description: "Best locations for relationships",
      },
      {
        name: "Overall",
        value: "overall",
        description: "Best locations overall",
      },
      {
        name: "Wealth",
        value: "wealth",
        description: "Best locations for financial success",
      },
    ],
    default: "overall",
    description: "Type of power/influence to analyze",
  };
}
