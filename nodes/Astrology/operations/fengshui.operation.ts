import type { INodeProperties } from "n8n-workflow";
import { createSimplifyField, createLanguageField } from "../shared";
import {
  createFacingDegreesField,
  createFengshuiPeriodField,
  createIncludeAnnualField,
  createIncludeMonthlyField,
  createAnalysisDateField,
  createFengshuiYearField,
} from "../shared/fengshui.fields";

/**
 * Operation selector for fengshui resource
 */
const fengshuiOperationField: INodeProperties = {
  displayName: "Operation",
  name: "operation",
  type: "options",
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ["fengshui"],
    },
  },
  options: [
    {
      name: "Afflictions",
      value: "afflictions",
      description:
        "Get annual afflictions (Tai Sui, Sui Po, Five Yellow, Three Killings)",
      action: "Get annual afflictions",
    },
    {
      name: "Flying Stars: Annual",
      value: "flyingStarsAnnual",
      description: "Get annual Flying Stars positions for specific year",
      action: "Get annual flying stars",
    },
    {
      name: "Flying Stars: Chart",
      value: "flyingStarsChart",
      description:
        "Calculate complete Flying Stars natal chart (9-palace grid)",
      action: "Calculate flying stars chart",
    },
    {
      name: "Glossary: Stars",
      value: "glossaryStars",
      description:
        "Get Flying Stars reference (9 stars with elements, nature, remedies)",
      action: "Get stars glossary",
    },
  ],
  default: "flyingStarsChart",
};

/**
 * All properties for the fengshui resource
 */
export const fengshuiOperations: INodeProperties[] = [
  // Operation selector
  fengshuiOperationField,

  // Facing degrees for chart
  createFacingDegreesField("fengshui", ["flyingStarsChart"]),

  // Period for chart
  createFengshuiPeriodField("fengshui", ["flyingStarsChart"]),

  // Include annual/monthly stars
  createIncludeAnnualField("fengshui", ["flyingStarsChart"]),
  createIncludeMonthlyField("fengshui", ["flyingStarsChart"]),

  // Analysis date for overlays
  createAnalysisDateField("fengshui", ["flyingStarsChart"]),

  // Year field for annual endpoints
  createFengshuiYearField("fengshui", ["flyingStarsAnnual", "afflictions"]),

  // Language field
  createLanguageField("fengshui"),

  // Simplify output
  createSimplifyField("fengshui"),
];
