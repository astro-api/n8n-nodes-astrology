import type { INodeProperties } from "n8n-workflow";
import {
  createLanguageField,
  createIncludeInterpretationsField,
  createSimplifyField,
} from "../shared";

/**
 * Operation groups for displayOptions
 */
const allOperations = ["coreNumbers", "comprehensive", "compatibility"];
const compatibilityOperations = ["compatibility"];

/**
 * Operation selector for Numerology resource
 */
const numerologyOperationField: INodeProperties = {
  displayName: "Operation",
  name: "operation",
  type: "options",
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ["numerology"],
    },
  },
  options: [
    {
      name: "Compatibility",
      value: "compatibility",
      description:
        "Numerology compatibility analysis between two people based on their core numbers",
      action: "Analyze compatibility",
    },
    {
      name: "Comprehensive Reading",
      value: "comprehensive",
      description:
        "Complete numerology reading with all core numbers, cycles, periods, and interpretations",
      action: "Get comprehensive reading",
    },
    {
      name: "Core Numbers",
      value: "coreNumbers",
      description:
        "Calculate Life Path, Expression, Soul Urge, Personality, and Birth Day numbers",
      action: "Get core numbers",
    },
  ],
  default: "coreNumbers",
};

/**
 * Name field for first subject (required for numerology)
 */
const subjectNameField: INodeProperties = {
  displayName: "Full Name",
  name: "subjectName",
  type: "string",
  displayOptions: {
    show: {
      resource: ["numerology"],
      operation: allOperations,
    },
  },
  default: "",
  placeholder: "e.g. John Michael Doe",
  description:
    "Full birth name for numerology calculations (required for name-based numbers)",
  required: true,
};

/**
 * Birth date fields for numerology (only date, no time needed)
 */
const birthYearField: INodeProperties = {
  displayName: "Birth Year",
  name: "year",
  type: "number",
  displayOptions: {
    show: {
      resource: ["numerology"],
      operation: allOperations,
    },
  },
  default: 1990,
  placeholder: "e.g. 1990",
  description: "Birth year in 4-digit format (e.g., 1990)",
  required: true,
};

const birthMonthField: INodeProperties = {
  displayName: "Birth Month",
  name: "month",
  type: "number",
  displayOptions: {
    show: {
      resource: ["numerology"],
      operation: allOperations,
    },
  },
  default: 1,
  placeholder: "e.g. 6",
  typeOptions: {
    minValue: 1,
    maxValue: 12,
  },
  description: "Birth month as number 1-12 (January=1, December=12)",
  required: true,
};

const birthDayField: INodeProperties = {
  displayName: "Birth Day",
  name: "day",
  type: "number",
  displayOptions: {
    show: {
      resource: ["numerology"],
      operation: allOperations,
    },
  },
  default: 1,
  placeholder: "e.g. 15",
  typeOptions: {
    minValue: 1,
    maxValue: 31,
  },
  description: "Birth day of month (1-31)",
  required: true,
};

/**
 * Second subject fields for compatibility
 */
const subject2NoticeField: INodeProperties = {
  displayName: "Second Person Data",
  name: "subject2Notice",
  type: "notice",
  displayOptions: {
    show: {
      resource: ["numerology"],
      operation: compatibilityOperations,
    },
  },
  default: "",
};

const subject2NameField: INodeProperties = {
  displayName: "Second Person Name",
  name: "subject2Name",
  type: "string",
  displayOptions: {
    show: {
      resource: ["numerology"],
      operation: compatibilityOperations,
    },
  },
  default: "",
  placeholder: "e.g. Jane Elizabeth Smith",
  description: "Full birth name for the second person",
  required: true,
};

const subject2YearField: INodeProperties = {
  displayName: "Birth Year (Subject 2)",
  name: "subject2Year",
  type: "number",
  displayOptions: {
    show: {
      resource: ["numerology"],
      operation: compatibilityOperations,
    },
  },
  default: 1990,
  placeholder: "e.g. 1992",
  description: "Birth year of the second person",
  required: true,
};

const subject2MonthField: INodeProperties = {
  displayName: "Birth Month (Subject 2)",
  name: "subject2Month",
  type: "number",
  displayOptions: {
    show: {
      resource: ["numerology"],
      operation: compatibilityOperations,
    },
  },
  default: 1,
  placeholder: "e.g. 8",
  typeOptions: {
    minValue: 1,
    maxValue: 12,
  },
  description: "Birth month of the second person (1-12)",
  required: true,
};

const subject2DayField: INodeProperties = {
  displayName: "Birth Day (Subject 2)",
  name: "subject2Day",
  type: "number",
  displayOptions: {
    show: {
      resource: ["numerology"],
      operation: compatibilityOperations,
    },
  },
  default: 1,
  placeholder: "e.g. 22",
  typeOptions: {
    minValue: 1,
    maxValue: 31,
  },
  description: "Birth day of the second person (1-31)",
  required: true,
};

/**
 * All properties for the Numerology resource
 */
export const numerologyOperations: INodeProperties[] = [
  // Operation selector
  numerologyOperationField,

  // First subject data
  subjectNameField,
  birthYearField,
  birthMonthField,
  birthDayField,

  // Second subject data (for compatibility)
  subject2NoticeField,
  subject2NameField,
  subject2YearField,
  subject2MonthField,
  subject2DayField,

  // Options
  createLanguageField("numerology"),
  createIncludeInterpretationsField("numerology"),

  // Simplify output
  createSimplifyField("numerology"),
];
