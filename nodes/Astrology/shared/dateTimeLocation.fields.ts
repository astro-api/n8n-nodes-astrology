import type { INodeProperties } from "n8n-workflow";

/**
 * Creates datetime + location fields for Lunar API requests
 * Uses IDateTimeLocation structure: year, month, day, hour, minute, second, timezone, location
 *
 * @param resourceName - The resource value to show these fields for
 * @param showForOperations - Operations that should show these fields (optional)
 * @param hideForOperations - Operations that should hide these fields (optional)
 */
export function createDateTimeLocationFields(
  resourceName: string,
  showForOperations?: string[],
  hideForOperations?: string[],
): INodeProperties[] {
  const baseDisplayOptions: INodeProperties["displayOptions"] = {
    show: {
      resource: [resourceName],
    },
  };

  if (showForOperations && showForOperations.length > 0) {
    baseDisplayOptions.show!.operation = showForOperations;
  }

  if (hideForOperations && hideForOperations.length > 0) {
    baseDisplayOptions.hide = {
      operation: hideForOperations,
    };
  }

  // City-based location displayOptions
  const cityDisplayOptions: INodeProperties["displayOptions"] = {
    show: {
      ...baseDisplayOptions.show,
      locationType: ["city"],
    },
  };
  if (baseDisplayOptions.hide) {
    cityDisplayOptions.hide = baseDisplayOptions.hide;
  }

  // Coordinate-based location displayOptions
  const coordDisplayOptions: INodeProperties["displayOptions"] = {
    show: {
      ...baseDisplayOptions.show,
      locationType: ["coordinates"],
    },
  };
  if (baseDisplayOptions.hide) {
    coordDisplayOptions.hide = baseDisplayOptions.hide;
  }

  return [
    // DateTime fields
    {
      displayName: "Year",
      name: "year",
      type: "number",
      displayOptions: { ...baseDisplayOptions },
      default: 2024,
      placeholder: "e.g. 2024",
      description: "Year for calculation (e.g., 2024)",
      required: true,
    },
    {
      displayName: "Month",
      name: "month",
      type: "number",
      displayOptions: { ...baseDisplayOptions },
      default: 1,
      placeholder: "e.g. 6",
      typeOptions: {
        minValue: 1,
        maxValue: 12,
      },
      description: "Month as number 1-12 (January=1, December=12)",
      required: true,
    },
    {
      displayName: "Day",
      name: "day",
      type: "number",
      displayOptions: { ...baseDisplayOptions },
      default: 1,
      placeholder: "e.g. 15",
      typeOptions: {
        minValue: 1,
        maxValue: 31,
      },
      description: "Day of month (1-31)",
      required: true,
    },
    {
      displayName: "Hour",
      name: "hour",
      type: "number",
      displayOptions: { ...baseDisplayOptions },
      default: 12,
      placeholder: "e.g. 14",
      typeOptions: {
        minValue: 0,
        maxValue: 23,
      },
      description: "Hour in 24-hour format (0-23)",
      required: true,
    },
    {
      displayName: "Minute",
      name: "minute",
      type: "number",
      displayOptions: { ...baseDisplayOptions },
      default: 0,
      placeholder: "e.g. 30",
      typeOptions: {
        minValue: 0,
        maxValue: 59,
      },
      description: "Minute (0-59)",
      required: true,
    },

    // Location type selector
    {
      displayName: "Location Type",
      name: "locationType",
      type: "options",
      displayOptions: { ...baseDisplayOptions },
      options: [
        {
          name: "City Name",
          value: "city",
          description:
            "Enter city and country - coordinates detected automatically",
        },
        {
          name: "Coordinates",
          value: "coordinates",
          description: "Enter exact latitude and longitude",
        },
      ],
      default: "city",
      description: "Choose how to specify location",
    },

    // City-based location fields
    {
      displayName: "City",
      name: "city",
      type: "string",
      displayOptions: cityDisplayOptions,
      default: "",
      placeholder: "London",
      description: 'City name (e.g., "London", "New York")',
      required: true,
    },
    {
      displayName: "Country Code",
      name: "countryCode",
      type: "string",
      displayOptions: cityDisplayOptions,
      default: "",
      placeholder: "GB",
      description: "2-letter ISO country code (e.g., US, GB, UA)",
      required: true,
    },

    // Coordinate-based location fields
    {
      displayName: "Latitude",
      name: "latitude",
      type: "number",
      displayOptions: coordDisplayOptions,
      default: 0,
      placeholder: "e.g. 50.45",
      typeOptions: {
        minValue: -90,
        maxValue: 90,
      },
      description: "Geographic latitude (-90 to 90, positive=North)",
      required: true,
    },
    {
      displayName: "Longitude",
      name: "longitude",
      type: "number",
      displayOptions: coordDisplayOptions,
      default: 0,
      placeholder: "e.g. 30.52",
      typeOptions: {
        minValue: -180,
        maxValue: 180,
      },
      description: "Geographic longitude (-180 to 180, positive=East)",
      required: true,
    },

    // Timezone (optional)
    {
      displayName: "Timezone",
      name: "timezone",
      type: "string",
      displayOptions: coordDisplayOptions,
      default: "",
      placeholder: "America/New_York",
      description:
        "IANA timezone identifier (e.g., America/New_York, Europe/London). Optional - auto-detected from coordinates if omitted.",
    },
  ];
}

/**
 * Creates a "days ahead" field for lunar forecasts
 *
 * @param resourceName - The resource value to show this field for
 * @param showForOperations - Operations that should show this field (optional)
 */
export function createDaysAheadField(
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
    displayName: "Days Ahead",
    name: "daysAhead",
    type: "number",
    displayOptions,
    default: 30,
    placeholder: "e.g. 30",
    typeOptions: {
      minValue: 1,
      maxValue: 365,
    },
    description: "Number of days to calculate ahead (1-365)",
  };
}

/**
 * Creates a "use modern planets" field for void-of-course calculations
 *
 * @param resourceName - The resource value to show this field for
 * @param showForOperations - Operations that should show this field (optional)
 */
export function createUseModernPlanetsField(
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
    displayName: "Use Modern Planets",
    name: "useModernPlanets",
    type: "boolean",
    displayOptions,
    default: false,
    description:
      "Whether to include Uranus, Neptune, and Pluto in void-of-course calculations. Traditional uses only Sun through Saturn.",
  };
}
