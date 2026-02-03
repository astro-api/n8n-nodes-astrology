import type { INodeProperties } from "n8n-workflow";
import {
  createBirthDataFields,
  createLocationFields,
  createSimplifyField,
  createSecondSubjectFields,
  createTransitTimeFields,
  createDateRangeFields,
  createLanguageField,
  createTraditionField,
} from "../shared";

/**
 * Operation selector for analysis resource
 */
const analysisOperationField: INodeProperties = {
  displayName: "Operation",
  name: "operation",
  type: "options",
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ["analysis"],
    },
  },
  options: [
    {
      name: "Career Analysis",
      value: "career",
      description: "AI-powered career and professional path analysis",
      action: "Get career analysis",
    },
    {
      name: "Compatibility",
      value: "compatibility",
      description: "Comprehensive compatibility analysis between two people",
      action: "Get compatibility analysis",
    },
    {
      name: "Compatibility Score",
      value: "compatibilityScore",
      description: "Numerical compatibility score between two people",
      action: "Get compatibility score",
    },
    {
      name: "Composite Report",
      value: "compositeReport",
      description: "AI interpretation of composite (relationship) chart",
      action: "Get composite report",
    },
    {
      name: "Direction Report",
      value: "directionReport",
      description: "AI interpretation of primary directions chart",
      action: "Get direction report",
    },
    {
      name: "Health Analysis",
      value: "health",
      description: "Health tendencies and wellness analysis from chart",
      action: "Get health analysis",
    },
    {
      name: "Karmic Analysis",
      value: "karmic",
      description: "Karmic patterns and life lessons analysis",
      action: "Get karmic analysis",
    },
    {
      name: "Lunar Analysis",
      value: "lunarAnalysis",
      description: "Detailed Moon-focused personality and emotional analysis",
      action: "Get lunar analysis",
    },
    {
      name: "Lunar Return Report",
      value: "lunarReturnReport",
      description: "AI interpretation of lunar return chart (monthly forecast)",
      action: "Get lunar return report",
    },
    {
      name: "Lunar Return Transit Report",
      value: "lunarReturnTransitReport",
      description: "Transits to lunar return chart analysis",
      action: "Get lunar return transit report",
    },
    {
      name: "Natal Report",
      value: "natalReport",
      description: "Comprehensive AI interpretation of natal chart",
      action: "Get natal report",
    },
    {
      name: "Natal Transit Report",
      value: "natalTransitReport",
      description: "AI interpretation of transits to natal chart",
      action: "Get natal transit report",
    },
    {
      name: "Predictive Analysis",
      value: "predictive",
      description: "Future trends and predictive analysis",
      action: "Get predictive analysis",
    },
    {
      name: "Progression Report",
      value: "progressionReport",
      description: "AI interpretation of secondary progressions",
      action: "Get progression report",
    },
    {
      name: "Psychological Profile",
      value: "psychological",
      description: "Deep psychological profile from chart analysis",
      action: "Get psychological profile",
    },
    {
      name: "Relationship Analysis",
      value: "relationship",
      description: "Detailed relationship dynamics and patterns analysis",
      action: "Get relationship analysis",
    },
    {
      name: "Relationship Score",
      value: "relationshipScore",
      description: "Numerical relationship compatibility score",
      action: "Get relationship score",
    },
    {
      name: "Relocation Analysis",
      value: "relocation",
      description: "Analysis of how different locations affect the chart",
      action: "Get relocation analysis",
    },
    {
      name: "Solar Return Report",
      value: "solarReturnReport",
      description: "AI interpretation of solar return chart (annual forecast)",
      action: "Get solar return report",
    },
    {
      name: "Solar Return Transit Report",
      value: "solarReturnTransitReport",
      description: "Transits to solar return chart analysis",
      action: "Get solar return transit report",
    },
    {
      name: "Spiritual Analysis",
      value: "spiritual",
      description: "Spiritual path and soul purpose analysis",
      action: "Get spiritual analysis",
    },
    {
      name: "Synastry Report",
      value: "synastryReport",
      description: "Detailed AI interpretation of relationship synastry",
      action: "Get synastry report",
    },
    {
      name: "Transit Report",
      value: "transitReport",
      description: "AI interpretation of current transits",
      action: "Get transit report",
    },
    {
      name: "Vocational Analysis",
      value: "vocational",
      description: "Career aptitudes and vocational guidance",
      action: "Get vocational analysis",
    },
  ],
  default: "natalReport",
};

/**
 * Include aspect patterns field
 */
const includeAspectPatternsField: INodeProperties = {
  displayName: "Include Aspect Patterns",
  name: "includeAspectPatterns",
  type: "boolean",
  displayOptions: {
    show: {
      resource: ["analysis"],
    },
  },
  default: false,
  description:
    "Whether to include aspect pattern detection (Grand Trine, T-Square, Yod, Stellium, etc.)",
};

/**
 * Two-subject operations (require second person's birth data)
 */
const TWO_SUBJECT_OPERATIONS = [
  "synastryReport",
  "compositeReport",
  "compatibility",
  "compatibilityScore",
  "relationship",
  "relationshipScore",
];

/**
 * Transit operations (require transit time)
 */
const TRANSIT_OPERATIONS = [
  "transitReport",
  "natalTransitReport",
  "solarReturnTransitReport",
  "lunarReturnTransitReport",
];

/**
 * All properties for the analysis resource
 */
export const analysisOperations: INodeProperties[] = [
  // Operation selector
  analysisOperationField,

  // Birth data fields (for all operations)
  ...createBirthDataFields("analysis"),

  // Location fields (for all operations)
  ...createLocationFields("analysis"),

  // Second subject fields (for two-person operations)
  ...createSecondSubjectFields("analysis", TWO_SUBJECT_OPERATIONS),

  // Transit time fields (for transit operations)
  ...createTransitTimeFields("analysis", TRANSIT_OPERATIONS),

  // Date range fields (for transit reports)
  ...createDateRangeFields("analysis", [
    "natalTransitReport",
    "solarReturnTransitReport",
    "lunarReturnTransitReport",
  ]),

  // Tradition field (Western/Vedic)
  createTraditionField("analysis"),

  // Language field
  createLanguageField("analysis"),

  // Include aspect patterns
  includeAspectPatternsField,

  // Simplify output (for all operations)
  createSimplifyField("analysis"),
];
