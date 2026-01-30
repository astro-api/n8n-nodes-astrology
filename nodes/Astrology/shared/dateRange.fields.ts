import type { INodeProperties } from "n8n-workflow";

/**
 * Creates date range fields for natal transits analysis
 *
 * @param resourceName - The resource value to show these fields for
 * @param showForOperations - Operations that should show these fields
 */
export function createDateRangeFields(
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
    // Section header
    {
      displayName: "Date Range for Transit Analysis",
      name: "dateRangeNotice",
      type: "notice",
      displayOptions: { ...baseDisplayOptions },
      default: "",
    },

    {
      displayName: "Start Date",
      name: "startDate",
      type: "string",
      displayOptions: { ...baseDisplayOptions },
      default: "",
      placeholder: "2024-01-01",
      description: "Start date for transit analysis period (YYYY-MM-DD format)",
      required: true,
    },
    {
      displayName: "End Date",
      name: "endDate",
      type: "string",
      displayOptions: { ...baseDisplayOptions },
      default: "",
      placeholder: "2024-12-31",
      description: "End date for transit analysis period (YYYY-MM-DD format)",
      required: true,
    },
  ];
}
