import type { INodeProperties } from "n8n-workflow";

/**
 * Creates a render format field
 *
 * @param resourceName - The resource value to show this field for
 * @param showForOperations - Operations that should show this field (optional)
 */
export function createRenderFormatField(
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
    displayName: "Output Format",
    name: "renderFormat",
    type: "options",
    displayOptions,
    options: [
      {
        name: "JPG",
        value: "jpg",
        description: "JPEG - compressed raster image",
      },
      {
        name: "PDF",
        value: "pdf",
        description: "Portable Document Format - for printing and documents",
      },
      {
        name: "PNG",
        value: "png",
        description:
          "Portable Network Graphics - raster image with transparency",
      },
      {
        name: "SVG",
        value: "svg",
        description: "Scalable Vector Graphics - best for web and print",
      },
      {
        name: "WebP",
        value: "webp",
        description: "WebP - modern web image format with better compression",
      },
    ],
    default: "svg",
    description: "Output format for the rendered chart",
  };
}

/**
 * Creates a render theme field
 *
 * @param resourceName - The resource value to show this field for
 * @param showForOperations - Operations that should show this field (optional)
 */
export function createRenderThemeField(
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
    displayName: "Theme",
    name: "renderTheme",
    type: "options",
    displayOptions,
    options: [
      {
        name: "Classic",
        value: "classic",
        description: "Traditional astrological chart style",
      },
      {
        name: "Dark",
        value: "dark",
        description: "Dark background with light elements",
      },
      {
        name: "Light",
        value: "light",
        description: "Light background with dark elements",
      },
      {
        name: "Modern Light",
        value: "modern_light",
        description: "Contemporary light design",
      },
      {
        name: "Traditional",
        value: "traditional",
        description: "Historical/classical appearance",
      },
    ],
    default: "light",
    description: "Visual theme for the chart",
  };
}

/**
 * Creates render options fields (width, height, colors, etc.)
 *
 * @param resourceName - The resource value to show these fields for
 * @param showForOperations - Operations that should show these fields (optional)
 */
export function createRenderOptionsFields(
  resourceName: string,
  showForOperations?: string[],
): INodeProperties[] {
  const displayOptions: INodeProperties["displayOptions"] = {
    show: {
      resource: [resourceName],
    },
  };

  if (showForOperations && showForOperations.length > 0) {
    displayOptions.show!.operation = showForOperations;
  }

  return [
    {
      displayName: "Width",
      name: "renderWidth",
      type: "number",
      displayOptions,
      default: 800,
      placeholder: "e.g. 800",
      typeOptions: {
        minValue: 200,
        maxValue: 4000,
      },
      description: "Width of the output image in pixels (200-4000)",
    },
    {
      displayName: "Height",
      name: "renderHeight",
      type: "number",
      displayOptions,
      default: 800,
      placeholder: "e.g. 800",
      typeOptions: {
        minValue: 200,
        maxValue: 4000,
      },
      description: "Height of the output image in pixels (200-4000)",
    },
    {
      displayName: "Background Color",
      name: "backgroundColor",
      type: "color",
      displayOptions,
      default: "#ffffff",
      description: "Background color for the chart (hex color code)",
    },
    {
      displayName: "Show Aspects",
      name: "showAspects",
      type: "boolean",
      displayOptions,
      default: true,
      description: "Whether to display aspect lines in the chart",
    },
    {
      displayName: "Show House Numbers",
      name: "showHouseNumbers",
      type: "boolean",
      displayOptions,
      default: true,
      description: "Whether to display house numbers in the chart",
    },
    {
      displayName: "Show Degrees",
      name: "showDegrees",
      type: "boolean",
      displayOptions,
      default: true,
      description: "Whether to display planetary degrees in the chart",
    },
  ];
}
