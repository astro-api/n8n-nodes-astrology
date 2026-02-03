import type { INodeProperties } from "n8n-workflow";
import {
  createBirthDataFields,
  createLocationFields,
  createSecondSubjectFields,
  createTransitTimeFields,
} from "../shared";
import {
  createRenderFormatField,
  createRenderThemeField,
  createRenderOptionsFields,
} from "../shared/render.fields";

/**
 * Operation selector for render resource
 */
const renderOperationField: INodeProperties = {
  displayName: "Operation",
  name: "operation",
  type: "options",
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ["render"],
    },
  },
  options: [
    {
      name: "Composite Chart",
      value: "composite",
      description:
        "Render a composite (midpoint) chart combining two birth charts",
      action: "Render composite chart",
    },
    {
      name: "Natal Chart",
      value: "natal",
      description:
        "Render a natal (birth) chart showing planetary positions at birth",
      action: "Render natal chart",
    },
    {
      name: "Synastry Chart",
      value: "synastry",
      description:
        "Render a synastry chart comparing two birth charts for compatibility",
      action: "Render synastry chart",
    },
    {
      name: "Transit Chart",
      value: "transit",
      description:
        "Render a transit chart showing current planetary positions against natal chart",
      action: "Render transit chart",
    },
  ],
  default: "natal",
};

/**
 * All properties for the render resource
 */
export const renderOperations: INodeProperties[] = [
  // Operation selector
  renderOperationField,

  // Birth data fields (for all operations)
  ...createBirthDataFields("render"),

  // Location fields (for all operations)
  ...createLocationFields("render"),

  // Second subject fields (for synastry and composite)
  ...createSecondSubjectFields("render", ["synastry", "composite"]),

  // Transit time fields (for transit operation)
  ...createTransitTimeFields("render", ["transit"]),

  // Render format field
  createRenderFormatField("render"),

  // Render theme field
  createRenderThemeField("render"),

  // Render options (width, height, colors, etc.)
  ...createRenderOptionsFields("render"),
];
