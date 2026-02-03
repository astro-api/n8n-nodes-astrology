import type { INodeProperties } from "n8n-workflow";
import {
  createBirthDataFields,
  createLocationFields,
  createSimplifyField,
  createLanguageField,
  createNameField,
  createGenderField,
} from "../shared";

/**
 * Operation selector for ziwei resource
 */
const ziweiOperationField: INodeProperties = {
  displayName: "Operation",
  name: "operation",
  type: "options",
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ["ziwei"],
    },
  },
  options: [
    {
      name: "Chart",
      value: "chart",
      description:
        "Calculate Zi Wei Dou Shu (Purple Star) chart with 12 palaces and stars",
      action: "Calculate ziwei chart",
    },
  ],
  default: "chart",
};

/**
 * All properties for the ziwei resource
 */
export const ziweiOperations: INodeProperties[] = [
  // Operation selector
  ziweiOperationField,

  // Name field
  createNameField("ziwei", ["chart"]),

  // Birth data fields
  ...createBirthDataFields("ziwei", ["chart"]),

  // Location fields
  ...createLocationFields("ziwei", ["chart"]),

  // Gender field (required for Ziwei calculations)
  createGenderField("ziwei", ["chart"]),

  // Language field
  createLanguageField("ziwei"),

  // Simplify output
  createSimplifyField("ziwei"),
];
