import type { INodeProperties } from "n8n-workflow";

/**
 * Creates a Kabbalah system field
 *
 * @param resourceName - The resource value to show this field for
 * @param showForOperations - Operations that should show this field (optional)
 */
export function createKabbalahSystemField(
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
    displayName: "System",
    name: "kabbalahSystem",
    type: "options",
    displayOptions,
    options: [
      {
        name: "Classical",
        value: "classical",
        description: "Traditional 7 classical planets only",
      },
      {
        name: "Golden Dawn",
        value: "golden_dawn",
        description: "Hermetic Qabalah correspondences",
      },
      {
        name: "Modern Halevi",
        value: "modern_halevi",
        description: "Includes Uranus, Neptune, Pluto (Halevi school)",
      },
    ],
    default: "modern_halevi",
    description: "Kabbalah system to use for calculations",
  };
}

/**
 * Creates a gematria text input field
 *
 * @param resourceName - The resource value to show this field for
 * @param showForOperations - Operations that should show this field (optional)
 */
export function createGematriaTextField(
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
    displayName: "Text",
    name: "gematriaText",
    type: "string",
    displayOptions,
    default: "",
    required: true,
    placeholder: "e.g. שלום or hello",
    description:
      "Text to calculate gematria for (Hebrew or English, max 500 characters)",
  };
}

/**
 * Creates a gematria methods multi-select field
 *
 * @param resourceName - The resource value to show this field for
 * @param showForOperations - Operations that should show this field (optional)
 */
export function createGematriaMethodsField(
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
    displayName: "Methods",
    name: "gematriaMethods",
    type: "multiOptions",
    displayOptions,
    options: [
      {
        name: "Albam",
        value: "albam",
        description: "Letter substitution cipher",
      },
      {
        name: "Atbash",
        value: "atbash",
        description: "Reverse alphabet substitution",
      },
      {
        name: "Ayak Bakar",
        value: "ayak_bakar",
        description: "Three-letter groups substitution",
      },
      {
        name: "Mispar Gadol",
        value: "mispar_gadol",
        description: "Standard gematria with final letter values",
      },
      {
        name: "Mispar Katan",
        value: "mispar_katan",
        description: "Reduced gematria (single digits)",
      },
      {
        name: "Mispar Musafi",
        value: "mispar_musafi",
        description: "Standard value plus number of letters",
      },
      {
        name: "Mispar Perati",
        value: "mispar_perati",
        description: "Square of each letter value",
      },
      {
        name: "Mispar Shemi",
        value: "mispar_shemi",
        description: "Full spelled-out letter names",
      },
      {
        name: "Mispar Siduri",
        value: "mispar_siduri",
        description: "Ordinal value (position in alphabet)",
      },
    ],
    default: ["mispar_gadol", "mispar_katan"],
    description: "Gematria calculation methods to use",
  };
}

/**
 * Creates a find equivalents toggle field
 *
 * @param resourceName - The resource value to show this field for
 * @param showForOperations - Operations that should show this field (optional)
 */
export function createFindEquivalentsField(
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
    displayName: "Find Equivalents",
    name: "findEquivalents",
    type: "boolean",
    displayOptions,
    default: false,
    description:
      "Whether to find words/phrases with equivalent gematria values",
  };
}

/**
 * Creates include Da'at toggle field
 *
 * @param resourceName - The resource value to show this field for
 * @param showForOperations - Operations that should show this field (optional)
 */
export function createIncludeDaatField(
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
    displayName: "Include Da'at",
    name: "includeDaat",
    type: "boolean",
    displayOptions,
    default: true,
    description:
      "Whether to include the hidden 11th Sephirah (Da'at/Knowledge)",
  };
}

/**
 * Creates include paths toggle field
 *
 * @param resourceName - The resource value to show this field for
 * @param showForOperations - Operations that should show this field (optional)
 */
export function createIncludePathsField(
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
    displayName: "Include Paths",
    name: "includePaths",
    type: "boolean",
    displayOptions,
    default: true,
    description:
      "Whether to include the 22 paths analysis based on zodiac placements",
  };
}
