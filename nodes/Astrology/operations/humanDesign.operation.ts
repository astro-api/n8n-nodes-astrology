import type { INodeProperties } from "n8n-workflow";
import {
  createBirthDataFields,
  createLocationFields,
  createSecondSubjectFields,
  createLanguageField,
  createIncludeInterpretationsField,
} from "../shared";

/**
 * Operation groups for displayOptions
 */
const glossaryOperations = [
  "glossaryChannels",
  "glossaryGates",
  "glossaryTypes",
];
const birthDataOperations = [
  "bodygraph",
  "compatibility",
  "designDate",
  "transits",
  "typeOnly",
];
const locationOperations = [
  "bodygraph",
  "compatibility",
  "designDate",
  "transits",
  "typeOnly",
];
const compatibilityOperations = ["compatibility"];
const transitOperations = ["transits"];

/**
 * Operation selector for Human Design resource
 */
const humanDesignOperationField: INodeProperties = {
  displayName: "Operation",
  name: "operation",
  type: "options",
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ["humanDesign"],
    },
  },
  options: [
    {
      name: "BodyGraph",
      value: "bodygraph",
      description:
        "Generate complete Human Design BodyGraph chart with type, strategy, authority, centers, channels, and gates",
      action: "Calculate bodygraph",
    },
    {
      name: "Compatibility",
      value: "compatibility",
      description:
        "Human Design compatibility analysis between two people showing connection dynamics",
      action: "Calculate compatibility",
    },
    {
      name: "Design Date",
      value: "designDate",
      description:
        "Calculate the Design date (when Sun was 88° of arc earlier than birth) for Human Design calculations",
      action: "Calculate design date",
    },
    {
      name: "Glossary - Channels",
      value: "glossaryChannels",
      description:
        "Get information about all 36 Human Design channels with descriptions",
      action: "Get channels glossary",
    },
    {
      name: "Glossary - Gates",
      value: "glossaryGates",
      description:
        "Get information about all 64 Human Design gates with descriptions",
      action: "Get gates glossary",
    },
    {
      name: "Glossary - Types",
      value: "glossaryTypes",
      description:
        "Get information about the 5 Human Design types (Generator, Projector, Manifestor, etc.)",
      action: "Get types glossary",
    },
    {
      name: "Transits",
      value: "transits",
      description:
        "Calculate transit overlay showing how current planetary positions activate gates and channels",
      action: "Calculate transit overlay",
    },
    {
      name: "Type Only",
      value: "typeOnly",
      description:
        "Quick calculation of Human Design Type, Strategy, and Authority only (faster than full BodyGraph)",
      action: "Get type only",
    },
  ],
  default: "bodygraph",
};

/**
 * Circuit filter for channels glossary
 */
const circuitFilterField: INodeProperties = {
  displayName: "Filter by Circuit",
  name: "circuit",
  type: "options",
  displayOptions: {
    show: {
      resource: ["humanDesign"],
      operation: ["glossaryChannels"],
    },
  },
  options: [
    { name: "All Circuits", value: "" },
    { name: "Individual", value: "individual" },
    { name: "Collective", value: "collective" },
    { name: "Tribal", value: "tribal" },
  ],
  default: "",
  description: "Filter channels by circuit type",
};

/**
 * Center filter for gates glossary
 */
const centerFilterField: INodeProperties = {
  displayName: "Filter by Center",
  name: "center",
  type: "options",
  displayOptions: {
    show: {
      resource: ["humanDesign"],
      operation: ["glossaryGates"],
    },
  },
  options: [
    { name: "Ajna", value: "ajna" },
    { name: "All Centers", value: "" },
    { name: "G Center (Identity)", value: "g_center" },
    { name: "Head", value: "head" },
    { name: "Heart (Will)", value: "heart" },
    { name: "Root", value: "root" },
    { name: "Sacral", value: "sacral" },
    { name: "Solar Plexus (Emotional)", value: "solar_plexus" },
    { name: "Spleen (Intuition)", value: "spleen" },
    { name: "Throat", value: "throat" },
  ],
  default: "",
  description: "Filter gates by center",
};

/**
 * Subject name field for Human Design
 */
const subjectNameField: INodeProperties = {
  displayName: "Name",
  name: "subjectName",
  type: "string",
  displayOptions: {
    show: {
      resource: ["humanDesign"],
      operation: birthDataOperations,
    },
  },
  default: "",
  placeholder: "e.g. John Doe",
  description: "Optional name for the subject (used in report titles)",
};

/**
 * Transit datetime field
 */
const transitDatetimeField: INodeProperties = {
  displayName: "Transit Date/Time",
  name: "transitDatetime",
  type: "dateTime",
  displayOptions: {
    show: {
      resource: ["humanDesign"],
      operation: transitOperations,
    },
  },
  default: "",
  description:
    "Date and time for transit calculation. Leave empty for current time.",
};

/**
 * HD-specific options: Include channels
 */
const includeChannelsField: INodeProperties = {
  displayName: "Include Channels",
  name: "includeChannels",
  type: "boolean",
  displayOptions: {
    show: {
      resource: ["humanDesign"],
      operation: ["bodygraph", "compatibility"],
    },
  },
  default: true,
  description:
    "Whether to include detailed channel information in the response",
};

/**
 * HD-specific options: Include design chart
 */
const includeDesignChartField: INodeProperties = {
  displayName: "Include Design Chart",
  name: "includeDesignChart",
  type: "boolean",
  displayOptions: {
    show: {
      resource: ["humanDesign"],
      operation: ["bodygraph"],
    },
  },
  default: true,
  description:
    "Whether to include the Design (unconscious) chart data alongside Personality",
};

/**
 * HD-specific options: Include variables
 */
const includeVariablesField: INodeProperties = {
  displayName: "Include Variables",
  name: "includeVariables",
  type: "boolean",
  displayOptions: {
    show: {
      resource: ["humanDesign"],
      operation: ["bodygraph"],
    },
  },
  default: false,
  description: "Whether to include variable (arrow) analysis in the response",
};

/**
 * Simplify output toggle for Human Design
 */
const simplifyField: INodeProperties = {
  displayName: "Simplify",
  name: "simplify",
  type: "boolean",
  displayOptions: {
    show: {
      resource: ["humanDesign"],
    },
    hide: {
      operation: glossaryOperations,
    },
  },
  default: true,
  description:
    "Whether to return simplified response with key data only. Disable for full API response.",
};

/**
 * All properties for the Human Design resource
 */
export const humanDesignOperations: INodeProperties[] = [
  // Operation selector
  humanDesignOperationField,

  // Glossary filters
  createLanguageField("humanDesign"),
  circuitFilterField,
  centerFilterField,

  // Subject name (optional, for POST operations)
  subjectNameField,

  // Birth data fields (for POST operations only)
  ...createBirthDataFields("humanDesign", birthDataOperations),

  // Location fields (for POST operations only)
  ...createLocationFields("humanDesign", locationOperations),

  // Second subject fields (for compatibility)
  ...createSecondSubjectFields("humanDesign", compatibilityOperations),

  // Transit datetime (for transits operation)
  transitDatetimeField,

  // HD-specific options
  includeChannelsField,
  includeDesignChartField,
  includeVariablesField,
  createIncludeInterpretationsField("humanDesign", birthDataOperations),

  // Simplify output
  simplifyField,
];
