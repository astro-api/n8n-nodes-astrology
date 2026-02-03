import type { INodeProperties } from "n8n-workflow";
import {
  createBirthDataFields,
  createLocationFields,
  createSimplifyField,
  createNameField,
} from "../shared";

/**
 * Operation selector for enhanced resource
 */
const enhancedOperationField: INodeProperties = {
  displayName: "Operation",
  name: "operation",
  type: "options",
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ["enhanced"],
    },
  },
  options: [
    {
      name: "Charts: Global Analysis",
      value: "chartsGlobalAnalysis",
      description:
        "Get enhanced global chart analysis (no birth data required)",
      action: "Get global chart analysis",
    },
    {
      name: "Charts: Personal Analysis",
      value: "chartsPersonalAnalysis",
      description:
        "Get enhanced personal chart analysis with traditional methods",
      action: "Get personal chart analysis",
    },
    {
      name: "Global Analysis",
      value: "globalAnalysis",
      description:
        "Get enhanced global astrological analysis (no birth data required)",
      action: "Get global analysis",
    },
    {
      name: "Personal Analysis",
      value: "personalAnalysis",
      description:
        "Get complete natal chart with traditional enhancements (dignities, profections)",
      action: "Get personal analysis",
    },
  ],
  default: "personalAnalysis",
};

/**
 * Operations that require birth data
 */
const BIRTH_DATA_OPERATIONS = ["personalAnalysis", "chartsPersonalAnalysis"];

/**
 * Include fixed stars option field
 */
const includeFixedStarsField: INodeProperties = {
  displayName: "Include Fixed Stars",
  name: "includeFixedStars",
  type: "boolean",
  displayOptions: {
    show: {
      resource: ["enhanced"],
      operation: BIRTH_DATA_OPERATIONS,
    },
  },
  default: true,
  description: "Whether to include fixed stars analysis",
};

/**
 * Include traditional option field
 */
const includeTraditionalField: INodeProperties = {
  displayName: "Include Traditional",
  name: "includeTraditional",
  type: "boolean",
  displayOptions: {
    show: {
      resource: ["enhanced"],
      operation: BIRTH_DATA_OPERATIONS,
    },
  },
  default: true,
  description:
    "Whether to include traditional astrology methods (dignities, profections, sect)",
};

/**
 * House system field
 */
const houseSystemField: INodeProperties = {
  displayName: "House System",
  name: "houseSystem",
  type: "options",
  displayOptions: {
    show: {
      resource: ["enhanced"],
      operation: BIRTH_DATA_OPERATIONS,
    },
  },
  options: [
    { name: "Campanus", value: "campanus" },
    { name: "Equal", value: "equal" },
    { name: "Koch", value: "koch" },
    { name: "Placidus", value: "placidus" },
    { name: "Porphyry", value: "porphyry" },
    { name: "Regiomontanus", value: "regiomontanus" },
    { name: "Whole Sign", value: "whole_sign" },
  ],
  default: "whole_sign",
  description: "House system to use for calculations",
};

/**
 * All properties for the enhanced resource
 */
export const enhancedOperations: INodeProperties[] = [
  // Operation selector
  enhancedOperationField,

  // Name field (for birth data operations)
  createNameField("enhanced", BIRTH_DATA_OPERATIONS),

  // Birth data fields
  ...createBirthDataFields("enhanced", BIRTH_DATA_OPERATIONS),

  // Location fields
  ...createLocationFields("enhanced", BIRTH_DATA_OPERATIONS),

  // House system
  houseSystemField,

  // Include options
  includeFixedStarsField,
  includeTraditionalField,

  // Simplify output
  createSimplifyField("enhanced"),
];
