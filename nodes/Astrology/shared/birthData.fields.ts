import type { INodeProperties } from "n8n-workflow";

/**
 * Creates birth data fields (year, month, day, hour, minute) with configurable displayOptions
 *
 * @param resourceName - The resource value to show these fields for
 * @param showForOperations - Operations that should show these fields (optional)
 * @param hideForOperations - Operations that should hide these fields (optional)
 */
export function createBirthDataFields(
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

  return [
    {
      displayName: "Year",
      name: "year",
      type: "number",
      displayOptions: { ...baseDisplayOptions },
      default: 1990,
      placeholder: "e.g. 1990",
      description: "Birth year",
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
      description: "Birth month (1-12)",
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
      description: "Birth day (1-31)",
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
      description: "Birth hour (0-23)",
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
      description: "Birth minute (0-59)",
      required: true,
    },
  ];
}
