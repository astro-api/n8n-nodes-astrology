import type { INodeProperties } from "n8n-workflow";

/**
 * Creates a simplify toggle field for any resource.
 * Consolidates the repeated "Simplify" field definition across all operation files.
 *
 * @param resourceName - The resource value to show this field for
 * @param hideForOperations - Operations that should hide this field (optional)
 * @returns INodeProperties for the simplify field
 */
export function createSimplifyField(
  resourceName: string,
  hideForOperations?: string[],
): INodeProperties {
  const field: INodeProperties = {
    displayName: "Simplify",
    name: "simplify",
    type: "boolean",
    displayOptions: {
      show: {
        resource: [resourceName],
      },
    },
    default: true,
    description:
      "Whether to return simplified response with key data only. Disable for full API response with all metadata.",
  };

  if (hideForOperations && hideForOperations.length > 0) {
    field.displayOptions!.hide = {
      operation: hideForOperations,
    };
  }

  return field;
}
