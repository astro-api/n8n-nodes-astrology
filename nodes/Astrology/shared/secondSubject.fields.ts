import type { INodeProperties } from "n8n-workflow";

/**
 * Creates second subject fields (subject2*) for synastry/composite charts
 * Includes birth data and location with subject2 prefix
 *
 * @param resourceName - The resource value to show these fields for
 * @param showForOperations - Operations that should show these fields
 */
export function createSecondSubjectFields(
  resourceName: string,
  showForOperations: string[],
): INodeProperties[] {
  const baseDisplayOptions: INodeProperties["displayOptions"] = {
    show: {
      resource: [resourceName],
      operation: showForOperations,
    },
  };

  // City-based location displayOptions for subject2
  const cityDisplayOptions: INodeProperties["displayOptions"] = {
    show: {
      ...baseDisplayOptions.show,
      subject2LocationType: ["city"],
    },
  };

  // Coordinate-based location displayOptions for subject2
  const coordDisplayOptions: INodeProperties["displayOptions"] = {
    show: {
      ...baseDisplayOptions.show,
      subject2LocationType: ["coordinates"],
    },
  };

  return [
    // Section header
    {
      displayName: "Second Person Birth Data",
      name: "subject2Notice",
      type: "notice",
      displayOptions: { ...baseDisplayOptions },
      default: "",
    },

    // Optional name
    {
      displayName: "Name (Subject 2)",
      name: "subject2Name",
      type: "string",
      displayOptions: { ...baseDisplayOptions },
      default: "",
      placeholder: "e.g. Partner",
      description:
        "Optional name for the second person (used in report titles)",
    },

    // Birth data fields
    {
      displayName: "Year (Subject 2)",
      name: "subject2Year",
      type: "number",
      displayOptions: { ...baseDisplayOptions },
      default: 1990,
      placeholder: "e.g. 1990",
      description: "Birth year of the second person (e.g., 1990)",
      required: true,
    },
    {
      displayName: "Month (Subject 2)",
      name: "subject2Month",
      type: "number",
      displayOptions: { ...baseDisplayOptions },
      default: 1,
      placeholder: "e.g. 6",
      typeOptions: {
        minValue: 1,
        maxValue: 12,
      },
      description: "Birth month of the second person (1-12)",
      required: true,
    },
    {
      displayName: "Day (Subject 2)",
      name: "subject2Day",
      type: "number",
      displayOptions: { ...baseDisplayOptions },
      default: 1,
      placeholder: "e.g. 15",
      typeOptions: {
        minValue: 1,
        maxValue: 31,
      },
      description: "Birth day of the second person (1-31)",
      required: true,
    },
    {
      displayName: "Hour (Subject 2)",
      name: "subject2Hour",
      type: "number",
      displayOptions: { ...baseDisplayOptions },
      default: 12,
      placeholder: "e.g. 14",
      typeOptions: {
        minValue: 0,
        maxValue: 23,
      },
      description: "Birth hour of the second person in 24-hour format (0-23)",
      required: true,
    },
    {
      displayName: "Minute (Subject 2)",
      name: "subject2Minute",
      type: "number",
      displayOptions: { ...baseDisplayOptions },
      default: 0,
      placeholder: "e.g. 30",
      typeOptions: {
        minValue: 0,
        maxValue: 59,
      },
      description: "Birth minute of the second person (0-59)",
      required: true,
    },

    // Location type selector
    {
      displayName: "Location Type (Subject 2)",
      name: "subject2LocationType",
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
      description: "How to specify the second person's birth location",
    },

    // City-based location fields
    {
      displayName: "City (Subject 2)",
      name: "subject2City",
      type: "string",
      displayOptions: cityDisplayOptions,
      default: "",
      placeholder: "London",
      description: "Birth city of the second person",
      required: true,
    },
    {
      displayName: "Country Code (Subject 2)",
      name: "subject2CountryCode",
      type: "string",
      displayOptions: cityDisplayOptions,
      default: "",
      placeholder: "GB",
      description:
        "2-letter ISO country code for the second person's birth city",
      required: true,
    },

    // Coordinate-based location fields
    {
      displayName: "Latitude (Subject 2)",
      name: "subject2Latitude",
      type: "number",
      displayOptions: coordDisplayOptions,
      default: 0,
      placeholder: "e.g. 50.45",
      typeOptions: {
        minValue: -90,
        maxValue: 90,
      },
      description: "Latitude of the second person's birth location (-90 to 90)",
      required: true,
    },
    {
      displayName: "Longitude (Subject 2)",
      name: "subject2Longitude",
      type: "number",
      displayOptions: coordDisplayOptions,
      default: 0,
      placeholder: "e.g. 30.52",
      typeOptions: {
        minValue: -180,
        maxValue: 180,
      },
      description:
        "Longitude of the second person's birth location (-180 to 180)",
      required: true,
    },
  ];
}
