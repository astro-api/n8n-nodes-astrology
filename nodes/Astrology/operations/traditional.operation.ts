import type { INodeProperties } from "n8n-workflow";
import {
  createBirthDataFields,
  createLocationFields,
  createSimplifyField,
} from "../shared";

/**
 * Operation selector for traditional resource
 */
const traditionalOperationField: INodeProperties = {
  displayName: "Operation",
  name: "operation",
  type: "options",
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ["traditional"],
    },
  },
  options: [
    {
      name: "Analysis",
      value: "analysis",
      description: "Comprehensive traditional Hellenistic astrology analysis",
      action: "Get traditional analysis",
    },
    {
      name: "Annual Profection",
      value: "annualProfection",
      description: "Calculate the annual profection for current age",
      action: "Get annual profection",
    },
    {
      name: "Capabilities",
      value: "capabilities",
      description: "Get available traditional astrology capabilities",
      action: "Get capabilities",
    },
    {
      name: "Dignities",
      value: "dignities",
      description:
        "Essential dignities analysis (domicile, exaltation, fall, detriment)",
      action: "Get dignities analysis",
    },
    {
      name: "Glossary: Dignities",
      value: "glossaryDignities",
      description: "Get reference information about essential dignities",
      action: "Get dignities glossary",
    },
    {
      name: "Glossary: Profection Houses",
      value: "glossaryProfectionHouses",
      description: "Get reference information about profection houses",
      action: "Get profection houses glossary",
    },
    {
      name: "Glossary: Traditional Points",
      value: "glossaryTraditionalPoints",
      description:
        "Get reference information about traditional points and lots",
      action: "Get traditional points glossary",
    },
    {
      name: "Lots",
      value: "lots",
      description: "Calculate Arabic Parts/Lots (Fortune, Spirit, etc.)",
      action: "Get lots analysis",
    },
    {
      name: "Profection Timeline",
      value: "profectionTimeline",
      description:
        "Get complete profection timeline from birth to specified age",
      action: "Get profection timeline",
    },
    {
      name: "Profections",
      value: "profections",
      description: "Calculate all profections for current age",
      action: "Get profections analysis",
    },
  ],
  default: "dignities",
};

/**
 * Operations that require birth data
 */
const BIRTH_DATA_OPERATIONS = [
  "analysis",
  "annualProfection",
  "dignities",
  "lots",
  "profectionTimeline",
  "profections",
];

/**
 * Current age field for profection operations
 */
const currentAgeField: INodeProperties = {
  displayName: "Current Age",
  name: "currentAge",
  type: "number",
  displayOptions: {
    show: {
      resource: ["traditional"],
      operation: ["annualProfection", "profectionTimeline", "profections"],
    },
  },
  default: 30,
  typeOptions: {
    minValue: 0,
    maxValue: 120,
  },
  description: "Current age for profection calculations",
};

/**
 * Include asteroids field
 */
const includeAsteroidsField: INodeProperties = {
  displayName: "Include Asteroids",
  name: "includeAsteroids",
  type: "boolean",
  displayOptions: {
    show: {
      resource: ["traditional"],
      operation: ["analysis", "dignities"],
    },
  },
  default: false,
  description: "Whether to include asteroid positions in the analysis",
};

/**
 * Include fixed stars field
 */
const includeFixedStarsField: INodeProperties = {
  displayName: "Include Fixed Stars",
  name: "includeFixedStars",
  type: "boolean",
  displayOptions: {
    show: {
      resource: ["traditional"],
      operation: ["analysis", "dignities"],
    },
  },
  default: true,
  description: "Whether to include fixed star analysis",
};

/**
 * Dignity system field
 */
const dignitySystemField: INodeProperties = {
  displayName: "Dignity System",
  name: "dignitySystem",
  type: "options",
  displayOptions: {
    show: {
      resource: ["traditional"],
      operation: ["dignities"],
    },
  },
  options: [
    {
      name: "Traditional",
      value: "traditional",
      description: "Traditional Hellenistic dignity system",
    },
  ],
  default: "traditional",
  description: "Dignity calculation system to use",
};

/**
 * Major aspects orb field
 */
const majorAspectsOrbField: INodeProperties = {
  displayName: "Major Aspects Orb",
  name: "majorAspectsOrb",
  type: "number",
  displayOptions: {
    show: {
      resource: ["traditional"],
      operation: ["analysis", "dignities"],
    },
  },
  default: 2.0,
  typeOptions: {
    minValue: 0.5,
    maxValue: 10,
    numberPrecision: 1,
  },
  description: "Orb in degrees for major aspects (0.5-10)",
};

/**
 * All properties for the traditional resource
 */
export const traditionalOperations: INodeProperties[] = [
  // Operation selector
  traditionalOperationField,

  // Birth data fields (for analysis operations)
  ...createBirthDataFields("traditional", BIRTH_DATA_OPERATIONS),

  // Location fields (for analysis operations)
  ...createLocationFields("traditional", BIRTH_DATA_OPERATIONS),

  // Current age field
  currentAgeField,

  // Include asteroids
  includeAsteroidsField,

  // Include fixed stars
  includeFixedStarsField,

  // Dignity system
  dignitySystemField,

  // Major aspects orb
  majorAspectsOrbField,

  // Simplify output (for all operations)
  createSimplifyField("traditional"),
];
