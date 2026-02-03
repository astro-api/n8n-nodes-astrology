import type { INodeProperties } from "n8n-workflow";

/**
 * Create search field for glossary cities endpoint
 */
export function createSearchField(
  resource: string,
  operations: string[],
): INodeProperties {
  return {
    displayName: "Search",
    name: "search",
    type: "string",
    displayOptions: {
      show: {
        resource: [resource],
        operation: operations,
      },
    },
    default: "",
    description: "Search term to filter results by name",
  };
}

/**
 * Create country code field for glossary cities endpoint
 */
export function createCountryCodeField(
  resource: string,
  operations: string[],
): INodeProperties {
  return {
    displayName: "Country Code",
    name: "countryCode",
    type: "string",
    displayOptions: {
      show: {
        resource: [resource],
        operation: operations,
      },
    },
    default: "",
    placeholder: "US, GB, UA...",
    description: "Filter cities by ISO 3166-1 alpha-2 country code",
  };
}

/**
 * Create pagination fields (limit, offset)
 */
export function createPaginationFields(
  resource: string,
  operations: string[],
): INodeProperties[] {
  return [
    {
      displayName: "Limit",
      name: "limit",
      type: "number",
      displayOptions: {
        show: {
          resource: [resource],
          operation: operations,
        },
      },
      default: 50,
      typeOptions: {
        minValue: 1,
      },
      description: "Max number of results to return",
    },
    {
      displayName: "Offset",
      name: "offset",
      type: "number",
      displayOptions: {
        show: {
          resource: [resource],
          operation: operations,
        },
      },
      default: 0,
      typeOptions: {
        minValue: 0,
      },
      description: "Number of results to skip for pagination",
    },
  ];
}

/**
 * Create sort fields (sort_by, sort_order)
 */
export function createSortFields(
  resource: string,
  operations: string[],
): INodeProperties[] {
  return [
    {
      displayName: "Sort By",
      name: "sortBy",
      type: "options",
      displayOptions: {
        show: {
          resource: [resource],
          operation: operations,
        },
      },
      options: [
        { name: "Name", value: "name" },
        { name: "Population", value: "population" },
      ],
      default: "name",
      description: "Field to sort results by",
    },
    {
      displayName: "Sort Order",
      name: "sortOrder",
      type: "options",
      displayOptions: {
        show: {
          resource: [resource],
          operation: operations,
        },
      },
      options: [
        { name: "Ascending", value: "asc" },
        { name: "Descending", value: "desc" },
      ],
      default: "asc",
      description: "Sort direction",
    },
  ];
}
