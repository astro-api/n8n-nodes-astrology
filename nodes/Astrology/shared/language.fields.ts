import type { INodeProperties } from "n8n-workflow";

/**
 * Language options for API responses
 */
export const languageOptions: INodeProperties["options"] = [
  { name: "English", value: "en" },
  { name: "Russian", value: "ru" },
  { name: "German", value: "de" },
  { name: "Spanish", value: "es" },
  { name: "French", value: "fr" },
  { name: "Italian", value: "it" },
  { name: "Portuguese", value: "pt" },
  { name: "Chinese", value: "zh" },
  { name: "Japanese", value: "ja" },
  { name: "Korean", value: "ko" },
];

/**
 * Creates a language selection field
 *
 * @param resourceName - The resource value to show this field for
 * @param showForOperations - Operations that should show this field (optional)
 * @param hideForOperations - Operations that should hide this field (optional)
 */
export function createLanguageField(
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
    displayName: "Language",
    name: "language",
    type: "options",
    displayOptions: baseDisplayOptions,
    options: languageOptions,
    default: "en",
    description: "Language for response text and interpretations",
  };
}

/**
 * Creates an include interpretations toggle field
 *
 * @param resourceName - The resource value to show this field for
 * @param showForOperations - Operations that should show this field (optional)
 * @param hideForOperations - Operations that should hide this field (optional)
 */
export function createIncludeInterpretationsField(
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
    displayName: "Include Interpretations",
    name: "includeInterpretations",
    type: "boolean",
    displayOptions: baseDisplayOptions,
    default: true,
    description: "Whether to include textual interpretations in the response",
  };
}
