import type { INodeProperties } from "n8n-workflow";
import {
  createBirthDataFields,
  createLocationFields,
  createSimplifyField,
  createLanguageField,
  createSecondSubjectFields,
} from "../shared";
import {
  createChineseAnimalField,
  createChineseTraditionField,
  createAnalysisDepthField,
  createGenderField,
  createIncludeLuckPillarsField,
  createIncludeAnnualPillarsField,
  createChineseYearField,
} from "../shared/chinese.fields";

/**
 * Operation selector for chinese resource
 */
const chineseOperationField: INodeProperties = {
  displayName: "Operation",
  name: "operation",
  type: "options",
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ["chinese"],
    },
  },
  options: [
    {
      name: "BaZi (Four Pillars)",
      value: "bazi",
      description: "Calculate BaZi Four Pillars analysis based on birth data",
      action: "Calculate ba zi",
    },
    {
      name: "Compatibility",
      value: "compatibility",
      description:
        "Calculate Chinese astrology compatibility between two people",
      action: "Calculate compatibility",
    },
    {
      name: "Elements Balance",
      value: "elementsBalance",
      description: "Get Five Elements balance analysis for a specific year",
      action: "Get elements balance",
    },
    {
      name: "Luck Pillars",
      value: "luckPillars",
      description: "Calculate 10-year luck periods based on BaZi",
      action: "Calculate luck pillars",
    },
    {
      name: "Ming Gua",
      value: "mingGua",
      description:
        "Calculate Ming Gua (Life Trigram) for Feng Shui compatibility",
      action: "Calculate ming gua",
    },
    {
      name: "Solar Terms",
      value: "solarTerms",
      description: "Get the 24 solar terms for a specific year",
      action: "Get solar terms",
    },
    {
      name: "Yearly Forecast",
      value: "yearlyForecast",
      description: "Get Chinese astrology yearly forecast",
      action: "Get yearly forecast",
    },
    {
      name: "Zodiac Animal Info",
      value: "zodiacAnimal",
      description: "Get information about a specific Chinese zodiac animal",
      action: "Get zodiac animal info",
    },
  ],
  default: "bazi",
};

/**
 * Operations that require birth data
 */
const BIRTH_DATA_OPERATIONS = [
  "bazi",
  "compatibility",
  "luckPillars",
  "mingGua",
  "yearlyForecast",
];

/**
 * Operations that require a year parameter
 */
const YEAR_OPERATIONS = ["solarTerms", "elementsBalance"];

/**
 * All properties for the chinese resource
 */
export const chineseOperations: INodeProperties[] = [
  // Operation selector
  chineseOperationField,

  // Zodiac animal field (for zodiacAnimal operation)
  createChineseAnimalField("chinese", ["zodiacAnimal"]),

  // Year field (for solarTerms and elementsBalance operations)
  createChineseYearField("chinese", YEAR_OPERATIONS),

  // Birth data fields (for birth-based operations)
  ...createBirthDataFields("chinese", BIRTH_DATA_OPERATIONS),

  // Location fields (for birth-based operations)
  ...createLocationFields("chinese", BIRTH_DATA_OPERATIONS),

  // Gender field (for bazi and luckPillars)
  createGenderField("chinese", ["bazi", "luckPillars"]),

  // Second subject fields (for compatibility)
  ...createSecondSubjectFields("chinese", ["compatibility"]),

  // Include luck pillars field (for bazi)
  createIncludeLuckPillarsField("chinese", ["bazi"]),

  // Include annual pillars field (for bazi)
  createIncludeAnnualPillarsField("chinese", ["bazi"]),

  // Chinese tradition field
  createChineseTraditionField("chinese", ["bazi", "yearlyForecast"]),

  // Analysis depth field
  createAnalysisDepthField("chinese", ["bazi", "yearlyForecast"]),

  // Language field
  createLanguageField("chinese"),

  // Simplify output (for all operations)
  createSimplifyField("chinese"),
];
