import type { INodeProperties } from "n8n-workflow";
import {
  createBirthDataFields,
  createLocationFields,
  createSimplifyField,
  createLanguageField,
} from "../shared";
import {
  createEclipseIdField,
  createEclipseOrbField,
  createEclipseDateRangeFields,
  createEclipseCountField,
  createIncludePersonalField,
} from "../shared/eclipses.fields";

/**
 * Operation selector for eclipses resource
 */
const eclipsesOperationField: INodeProperties = {
  displayName: "Operation",
  name: "operation",
  type: "options",
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ["eclipses"],
    },
  },
  options: [
    {
      name: "Interpretation",
      value: "interpretation",
      description:
        "Get detailed eclipse interpretation with Saros series context",
      action: "Get eclipse interpretation",
    },
    {
      name: "Natal Check",
      value: "natalCheck",
      description: "Check eclipse impact on natal chart within date range",
      action: "Check natal eclipse impact",
    },
    {
      name: "Upcoming",
      value: "upcoming",
      description: "Get list of upcoming eclipses with NASA format IDs",
      action: "Get upcoming eclipses",
    },
  ],
  default: "upcoming",
};

/**
 * Operations that require birth data
 */
const BIRTH_DATA_OPERATIONS = ["natalCheck"];

/**
 * Operations that optionally include birth data
 */
const OPTIONAL_BIRTH_DATA_OPERATIONS = ["interpretation"];

/**
 * All properties for the eclipses resource
 */
export const eclipsesOperations: INodeProperties[] = [
  // Operation selector
  eclipsesOperationField,

  // Eclipse count for upcoming
  createEclipseCountField("eclipses", ["upcoming"]),

  // Eclipse ID for interpretation
  createEclipseIdField("eclipses", ["interpretation"]),

  // Include personal analysis toggle
  createIncludePersonalField("eclipses", ["interpretation"]),

  // Birth data fields for natal check
  ...createBirthDataFields("eclipses", BIRTH_DATA_OPERATIONS),

  // Location fields for natal check
  ...createLocationFields("eclipses", BIRTH_DATA_OPERATIONS),

  // Optional birth data fields for interpretation (when includePersonal is true)
  {
    displayName: "Birth Year",
    name: "birthYear",
    type: "number",
    displayOptions: {
      show: {
        resource: ["eclipses"],
        operation: OPTIONAL_BIRTH_DATA_OPERATIONS,
        includePersonal: [true],
      },
    },
    default: 1990,
    required: true,
    description: "Year of birth",
  },
  {
    displayName: "Birth Month",
    name: "birthMonth",
    type: "number",
    displayOptions: {
      show: {
        resource: ["eclipses"],
        operation: OPTIONAL_BIRTH_DATA_OPERATIONS,
        includePersonal: [true],
      },
    },
    default: 1,
    typeOptions: { minValue: 1, maxValue: 12 },
    required: true,
    description: "Month of birth (1-12)",
  },
  {
    displayName: "Birth Day",
    name: "birthDay",
    type: "number",
    displayOptions: {
      show: {
        resource: ["eclipses"],
        operation: OPTIONAL_BIRTH_DATA_OPERATIONS,
        includePersonal: [true],
      },
    },
    default: 1,
    typeOptions: { minValue: 1, maxValue: 31 },
    required: true,
    description: "Day of birth (1-31)",
  },
  {
    displayName: "Birth Hour",
    name: "birthHour",
    type: "number",
    displayOptions: {
      show: {
        resource: ["eclipses"],
        operation: OPTIONAL_BIRTH_DATA_OPERATIONS,
        includePersonal: [true],
      },
    },
    default: 12,
    typeOptions: { minValue: 0, maxValue: 23 },
    required: true,
    description: "Hour of birth (0-23)",
  },
  {
    displayName: "Birth Minute",
    name: "birthMinute",
    type: "number",
    displayOptions: {
      show: {
        resource: ["eclipses"],
        operation: OPTIONAL_BIRTH_DATA_OPERATIONS,
        includePersonal: [true],
      },
    },
    default: 0,
    typeOptions: { minValue: 0, maxValue: 59 },
    required: true,
    description: "Minute of birth (0-59)",
  },
  {
    displayName: "Birth City",
    name: "birthCity",
    type: "string",
    displayOptions: {
      show: {
        resource: ["eclipses"],
        operation: OPTIONAL_BIRTH_DATA_OPERATIONS,
        includePersonal: [true],
      },
    },
    default: "",
    required: true,
    description: "City of birth",
  },
  {
    displayName: "Birth Country Code",
    name: "birthCountryCode",
    type: "string",
    displayOptions: {
      show: {
        resource: ["eclipses"],
        operation: OPTIONAL_BIRTH_DATA_OPERATIONS,
        includePersonal: [true],
      },
    },
    default: "",
    placeholder: "US, GB, UA...",
    required: true,
    description: "ISO 3166-1 alpha-2 country code",
  },

  // Date range fields for natal check
  ...createEclipseDateRangeFields("eclipses", ["natalCheck"]),

  // Eclipse orb for natal check
  createEclipseOrbField("eclipses", ["natalCheck"]),

  // Language field
  createLanguageField("eclipses"),

  // Simplify output
  createSimplifyField("eclipses"),
];
