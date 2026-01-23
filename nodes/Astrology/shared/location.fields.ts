import type { INodeProperties } from "n8n-workflow";

/**
 * Creates location fields (locationType, city, countryCode, latitude, longitude)
 * with configurable displayOptions
 *
 * @param resourceName - The resource value to show these fields for
 * @param showForOperations - Operations that should show these fields (optional)
 * @param hideForOperations - Operations that should hide these fields (optional)
 */
export function createLocationFields(
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
      description: "How to specify the birth location",
    },

    // City-based location fields
    {
      displayName: "City",
      name: "city",
      type: "string",
      displayOptions: cityDisplayOptions,
      default: "",
      placeholder: "London",
      description: "City name",
      required: true,
    },
    {
      displayName: "Country Code",
      name: "countryCode",
      type: "string",
      displayOptions: cityDisplayOptions,
      default: "",
      placeholder: "GB",
      description: "ISO 3166-1 alpha-2 country code (e.g., UA, US, GB, DE)",
      required: true,
    },

    // Coordinate-based location fields
    {
      displayName: "Latitude",
      name: "latitude",
      type: "number",
      displayOptions: coordDisplayOptions,
      default: 0,
      typeOptions: {
        minValue: -90,
        maxValue: 90,
      },
      description: "Latitude of birth place (-90 to 90)",
      required: true,
    },
    {
      displayName: "Longitude",
      name: "longitude",
      type: "number",
      displayOptions: coordDisplayOptions,
      default: 0,
      typeOptions: {
        minValue: -180,
        maxValue: 180,
      },
      description: "Longitude of birth place (-180 to 180)",
      required: true,
    },
  ];
}
