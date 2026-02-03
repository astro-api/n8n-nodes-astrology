import type { INodeProperties } from "n8n-workflow";
import {
  createBirthDataFields,
  createLocationFields,
  createSimplifyField,
  createLanguageField,
  createSecondSubjectFields,
  createDateRangeFields,
} from "../shared";
import {
  createPetSpeciesField,
  createPetBreedField,
  createBusinessActivityField,
  createIncludeOwnerField,
  createOwnerBirthDataFields,
  createMarketTypeField,
  createWellnessFocusField,
} from "../shared/insights.fields";

/**
 * Operation selector for insights resource
 */
const insightsOperationField: INodeProperties = {
  displayName: "Operation",
  name: "operation",
  type: "options",
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ["insights"],
    },
  },
  options: [
    // Business (6)
    {
      name: "Business: Department Compatibility",
      value: "businessDepartmentCompatibility",
      description: "Analyze compatibility between departments or teams",
      action: "Analyze department compatibility",
    },
    {
      name: "Business: Hiring Compatibility",
      value: "businessHiringCompatibility",
      description: "Analyze hiring compatibility between candidate and team",
      action: "Analyze hiring compatibility",
    },
    {
      name: "Business: Leadership Style",
      value: "businessLeadershipStyle",
      description: "Analyze leadership style and management approach",
      action: "Analyze leadership style",
    },
    {
      name: "Business: Succession Planning",
      value: "businessSuccessionPlanning",
      description: "Analyze succession planning compatibility",
      action: "Analyze succession planning",
    },
    {
      name: "Business: Team Dynamics",
      value: "businessTeamDynamics",
      description: "Analyze team dynamics and interpersonal patterns",
      action: "Analyze team dynamics",
    },
    {
      name: "Business: Timing",
      value: "businessTiming",
      description: "Calculate optimal timing for business activities",
      action: "Calculate business timing",
    },
    // Discovery (2)
    {
      name: "Discover Insights",
      value: "discover",
      description: "Get available insights categories and capabilities",
      action: "Discover insights",
    },
    {
      name: "Discover Relationship Insights",
      value: "discoverRelationship",
      description: "Get available relationship insights capabilities",
      action: "Discover relationship insights",
    },
    // Financial (6)
    {
      name: "Financial: Bradley Siderograph",
      value: "financialBradleySiderograph",
      description: "Calculate Bradley Siderograph turning points",
      action: "Calculate bradley turns",
    },
    {
      name: "Financial: Crypto Timing",
      value: "financialCryptoTiming",
      description: "Analyze cryptocurrency market timing",
      action: "Analyze crypto timing",
    },
    {
      name: "Financial: Forex Timing",
      value: "financialForexTiming",
      description: "Analyze forex market timing",
      action: "Analyze forex timing",
    },
    {
      name: "Financial: Gann Analysis",
      value: "financialGannAnalysis",
      description: "Calculate Gann cycles and timing",
      action: "Calculate gann cycles",
    },
    {
      name: "Financial: Market Timing",
      value: "financialMarketTiming",
      description: "Analyze general market timing patterns",
      action: "Analyze market timing",
    },
    {
      name: "Financial: Personal Trading",
      value: "financialPersonalTrading",
      description: "Analyze personal trading windows based on birth chart",
      action: "Analyze personal trading",
    },
    // Pet (5)
    {
      name: "Pet: Compatibility",
      value: "petCompatibility",
      description: "Calculate pet-human compatibility",
      action: "Calculate pet compatibility",
    },
    {
      name: "Pet: Health Sensitivities",
      value: "petHealthSensitivities",
      description: "Analyze pet health sensitivities based on birth chart",
      action: "Analyze pet health",
    },
    {
      name: "Pet: Multi-Pet Dynamics",
      value: "petMultiPetDynamics",
      description: "Analyze dynamics in multi-pet households",
      action: "Analyze multi pet dynamics",
    },
    {
      name: "Pet: Personality",
      value: "petPersonality",
      description: "Analyze pet personality based on birth chart",
      action: "Analyze pet personality",
    },
    {
      name: "Pet: Training Windows",
      value: "petTrainingWindows",
      description: "Find optimal training windows for pets",
      action: "Get training windows",
    },
    // Relationship (6)
    {
      name: "Relationship: Compatibility",
      value: "relationshipCompatibility",
      description: "Comprehensive compatibility analysis between two people",
      action: "Calculate compatibility",
    },
    {
      name: "Relationship: Compatibility Score",
      value: "relationshipCompatibilityScore",
      description: "Quick numerical compatibility score",
      action: "Get compatibility score",
    },
    {
      name: "Relationship: Davison Chart",
      value: "relationshipDavison",
      description: "Calculate Davison relationship chart",
      action: "Calculate davison chart",
    },
    {
      name: "Relationship: Love Languages",
      value: "relationshipLoveLanguages",
      description: "Analyze love languages compatibility",
      action: "Analyze love languages",
    },
    {
      name: "Relationship: Red/Green Flags",
      value: "relationshipRedFlags",
      description: "Identify relationship red and green flags",
      action: "Analyze red green flags",
    },
    {
      name: "Relationship: Timing",
      value: "relationshipTiming",
      description: "Calculate optimal relationship timing windows",
      action: "Calculate relationship timing",
    },
    // Wellness (6)
    {
      name: "Wellness: Biorhythms",
      value: "wellnessBiorhythms",
      description: "Calculate biorhythm cycles",
      action: "Calculate biorhythms",
    },
    {
      name: "Wellness: Body Mapping",
      value: "wellnessBodyMapping",
      description: "Analyze astrological body mapping for health",
      action: "Analyze body mapping",
    },
    {
      name: "Wellness: Energy Patterns",
      value: "wellnessEnergyPatterns",
      description: "Analyze personal energy patterns",
      action: "Analyze energy patterns",
    },
    {
      name: "Wellness: Moon Calendar",
      value: "wellnessMoonCalendar",
      description: "Get lunar wellness calendar",
      action: "Get moon wellness calendar",
    },
    {
      name: "Wellness: Score",
      value: "wellnessScore",
      description: "Calculate overall wellness score",
      action: "Calculate wellness score",
    },
    {
      name: "Wellness: Timing",
      value: "wellnessTiming",
      description: "Find optimal wellness activity timing",
      action: "Find wellness timing",
    },
  ],
  default: "wellnessBiorhythms",
};

/**
 * Operations that require single subject birth data
 */
const SINGLE_SUBJECT_OPERATIONS = [
  // Business
  "businessLeadershipStyle",
  "businessTiming",
  // Financial
  "financialPersonalTrading",
  // Pet
  "petPersonality",
  "petTrainingWindows",
  "petHealthSensitivities",
  // Wellness
  "wellnessBiorhythms",
  "wellnessBodyMapping",
  "wellnessEnergyPatterns",
  "wellnessMoonCalendar",
  "wellnessScore",
  "wellnessTiming",
];

/**
 * Operations that require two subjects
 */
const TWO_SUBJECT_OPERATIONS = [
  // Business
  "businessHiringCompatibility",
  "businessSuccessionPlanning",
  // Pet
  "petCompatibility",
  // Relationship
  "relationshipCompatibility",
  "relationshipCompatibilityScore",
  "relationshipLoveLanguages",
  "relationshipDavison",
  "relationshipRedFlags",
  "relationshipTiming",
];

/**
 * Pet operations
 */
const PET_OPERATIONS = [
  "petPersonality",
  "petCompatibility",
  "petTrainingWindows",
  "petHealthSensitivities",
  "petMultiPetDynamics",
];

/**
 * Operations that use date range
 */
const DATE_RANGE_OPERATIONS = [
  "businessTiming",
  "financialMarketTiming",
  "financialCryptoTiming",
  "financialForexTiming",
  "financialGannAnalysis",
  "financialBradleySiderograph",
  "relationshipTiming",
  "wellnessTiming",
];

/**
 * All properties for the insights resource
 */
export const insightsOperations: INodeProperties[] = [
  // Operation selector
  insightsOperationField,

  // Birth data fields (for single subject operations)
  ...createBirthDataFields("insights", [
    ...SINGLE_SUBJECT_OPERATIONS,
    ...TWO_SUBJECT_OPERATIONS,
  ]),

  // Location fields (for single subject operations)
  ...createLocationFields("insights", [
    ...SINGLE_SUBJECT_OPERATIONS,
    ...TWO_SUBJECT_OPERATIONS,
  ]),

  // Second subject fields (for two-person operations)
  ...createSecondSubjectFields("insights", TWO_SUBJECT_OPERATIONS),

  // Pet species field
  createPetSpeciesField("insights", PET_OPERATIONS),

  // Pet breed field
  createPetBreedField("insights", PET_OPERATIONS),

  // Include owner toggle
  createIncludeOwnerField("insights", [
    "petPersonality",
    "petTrainingWindows",
    "petHealthSensitivities",
  ]),

  // Owner birth data fields
  ...createOwnerBirthDataFields("insights", [
    "petPersonality",
    "petTrainingWindows",
    "petHealthSensitivities",
  ]),

  // Business activity field
  createBusinessActivityField("insights", ["businessTiming"]),

  // Market type field
  createMarketTypeField("insights", [
    "financialMarketTiming",
    "financialPersonalTrading",
  ]),

  // Wellness focus field
  createWellnessFocusField("insights", ["wellnessTiming", "wellnessScore"]),

  // Date range fields
  ...createDateRangeFields("insights", DATE_RANGE_OPERATIONS),

  // Language field
  createLanguageField("insights"),

  // Simplify output (for all operations)
  createSimplifyField("insights"),
];
