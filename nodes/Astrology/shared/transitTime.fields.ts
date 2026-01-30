import type { INodeProperties } from "n8n-workflow";

/**
 * Creates transit time fields for transit chart overlay
 * Includes datetime and optional location fields with transit prefix
 *
 * @param resourceName - The resource value to show these fields for
 * @param showForOperations - Operations that should show these fields
 */
export function createTransitTimeFields(
  resourceName: string,
  showForOperations: string[],
): INodeProperties[] {
  const baseDisplayOptions: INodeProperties["displayOptions"] = {
    show: {
      resource: [resourceName],
      operation: showForOperations,
    },
  };

  // City-based location displayOptions for transit
  const cityDisplayOptions: INodeProperties["displayOptions"] = {
    show: {
      ...baseDisplayOptions.show,
      transitLocationType: ["city"],
    },
  };

  // Coordinate-based location displayOptions for transit
  const coordDisplayOptions: INodeProperties["displayOptions"] = {
    show: {
      ...baseDisplayOptions.show,
      transitLocationType: ["coordinates"],
    },
  };

  return [
    // Section header
    {
      displayName: "Transit Time",
      name: "transitNotice",
      type: "notice",
      displayOptions: { ...baseDisplayOptions },
      default: "",
    },

    // Transit datetime fields
    {
      displayName: "Transit Year",
      name: "transitYear",
      type: "number",
      displayOptions: { ...baseDisplayOptions },
      default: 2024,
      placeholder: "e.g. 2024",
      description: "Year for the transit calculation",
      required: true,
    },
    {
      displayName: "Transit Month",
      name: "transitMonth",
      type: "number",
      displayOptions: { ...baseDisplayOptions },
      default: 1,
      placeholder: "e.g. 6",
      typeOptions: {
        minValue: 1,
        maxValue: 12,
      },
      description: "Month for the transit calculation (1-12)",
      required: true,
    },
    {
      displayName: "Transit Day",
      name: "transitDay",
      type: "number",
      displayOptions: { ...baseDisplayOptions },
      default: 1,
      placeholder: "e.g. 15",
      typeOptions: {
        minValue: 1,
        maxValue: 31,
      },
      description: "Day for the transit calculation (1-31)",
      required: true,
    },
    {
      displayName: "Transit Hour",
      name: "transitHour",
      type: "number",
      displayOptions: { ...baseDisplayOptions },
      default: 12,
      placeholder: "e.g. 14",
      typeOptions: {
        minValue: 0,
        maxValue: 23,
      },
      description: "Hour for the transit calculation in 24-hour format (0-23)",
      required: true,
    },
    {
      displayName: "Transit Minute",
      name: "transitMinute",
      type: "number",
      displayOptions: { ...baseDisplayOptions },
      default: 0,
      placeholder: "e.g. 30",
      typeOptions: {
        minValue: 0,
        maxValue: 59,
      },
      description: "Minute for the transit calculation (0-59)",
      required: true,
    },

    // Location type selector for transit
    {
      displayName: "Transit Location Type",
      name: "transitLocationType",
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
      description: "How to specify the location for transit calculation",
    },

    // City-based location fields
    {
      displayName: "Transit City",
      name: "transitCity",
      type: "string",
      displayOptions: cityDisplayOptions,
      default: "",
      placeholder: "London",
      description: "City for the transit calculation",
      required: true,
    },
    {
      displayName: "Transit Country Code",
      name: "transitCountryCode",
      type: "string",
      displayOptions: cityDisplayOptions,
      default: "",
      placeholder: "GB",
      description: "2-letter ISO country code for the transit location",
      required: true,
    },

    // Coordinate-based location fields
    {
      displayName: "Transit Latitude",
      name: "transitLatitude",
      type: "number",
      displayOptions: coordDisplayOptions,
      default: 0,
      placeholder: "e.g. 50.45",
      typeOptions: {
        minValue: -90,
        maxValue: 90,
      },
      description: "Latitude for the transit location (-90 to 90)",
      required: true,
    },
    {
      displayName: "Transit Longitude",
      name: "transitLongitude",
      type: "number",
      displayOptions: coordDisplayOptions,
      default: 0,
      placeholder: "e.g. 30.52",
      typeOptions: {
        minValue: -180,
        maxValue: 180,
      },
      description: "Longitude for the transit location (-180 to 180)",
      required: true,
    },
  ];
}
