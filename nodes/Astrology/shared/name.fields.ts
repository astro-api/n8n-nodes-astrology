import type { INodeProperties } from "n8n-workflow";

/**
 * Creates a name field for numerology calculations
 *
 * @param resourceName - The resource value to show this field for
 * @param showForOperations - Operations that should show this field (optional)
 * @param hideForOperations - Operations that should hide this field (optional)
 */
export function createNameField(
  resourceName: string,
  showForOperations?: string[],
  hideForOperations?: string[],
): INodeProperties {
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

  return {
    displayName: "Full Name",
    name: "subjectName",
    type: "string",
    displayOptions: baseDisplayOptions,
    default: "",
    placeholder: "e.g. John Doe",
    description:
      "Full name for numerology calculations (required for name-based numbers)",
    required: true,
  };
}

/**
 * Creates a second subject name field for compatibility operations
 *
 * @param resourceName - The resource value to show this field for
 * @param showForOperations - Operations that should show this field (optional)
 */
export function createSecondSubjectNameField(
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
    displayName: "Second Person Name",
    name: "subject2Name",
    type: "string",
    displayOptions,
    default: "",
    placeholder: "e.g. Jane Smith",
    description: "Full name for the second person (required for compatibility)",
    required: true,
  };
}
