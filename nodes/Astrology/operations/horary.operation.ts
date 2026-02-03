import type { INodeProperties } from "n8n-workflow";
import { createSimplifyField, createLanguageField } from "../shared";
import {
  createQuestionField,
  createQuestionCategoryField,
  createQuestionTimeFields,
  createQuestionLocationFields,
  createHoraryIncludeFixedStarsField,
} from "../shared/horary.fields";

/**
 * Operation selector for horary resource
 */
const horaryOperationField: INodeProperties = {
  displayName: "Operation",
  name: "operation",
  type: "options",
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ["horary"],
    },
  },
  options: [
    {
      name: "Analyze",
      value: "analyze",
      description: "Get comprehensive horary chart analysis with judgment",
      action: "Analyze horary question",
    },
    {
      name: "Aspects",
      value: "aspects",
      description: "Get horary aspects and planetary relationships",
      action: "Get horary aspects",
    },
    {
      name: "Chart",
      value: "chart",
      description: "Generate horary astrology chart",
      action: "Generate horary chart",
    },
    {
      name: "Fertility Analysis",
      value: "fertilityAnalysis",
      description: "Get fertility and conception timing analysis",
      action: "Analyze fertility timing",
    },
    {
      name: "Glossary: Categories",
      value: "glossaryCategories",
      description: "Get reference guide for horary question categories",
      action: "Get horary categories",
    },
    {
      name: "Glossary: Considerations",
      value: "glossaryConsiderations",
      description:
        "Get the 8 traditional considerations before judgment (chart radicality)",
      action: "Get horary considerations",
    },
  ],
  default: "analyze",
};

/**
 * Operations that require question time
 */
const QUESTION_TIME_OPERATIONS = [
  "analyze",
  "aspects",
  "chart",
  "fertilityAnalysis",
];

/**
 * Operations that require question text
 */
const QUESTION_TEXT_OPERATIONS = ["analyze", "aspects"];

/**
 * Operations that support question category
 */
const QUESTION_CATEGORY_OPERATIONS = ["analyze"];

/**
 * All properties for the horary resource
 */
export const horaryOperations: INodeProperties[] = [
  // Operation selector
  horaryOperationField,

  // Question text field
  createQuestionField("horary", QUESTION_TEXT_OPERATIONS),

  // Question category field
  createQuestionCategoryField("horary", QUESTION_CATEGORY_OPERATIONS),

  // Question time fields
  ...createQuestionTimeFields("horary", QUESTION_TIME_OPERATIONS),

  // Question location fields
  ...createQuestionLocationFields("horary", QUESTION_TIME_OPERATIONS),

  // Include fixed stars
  createHoraryIncludeFixedStarsField("horary", QUESTION_TIME_OPERATIONS),

  // Language field
  createLanguageField("horary"),

  // Simplify output
  createSimplifyField("horary"),
];
