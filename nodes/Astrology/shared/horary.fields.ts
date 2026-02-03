import type { INodeProperties } from "n8n-workflow";

/**
 * Create horary question field
 */
export function createQuestionField(
  resource: string,
  operations: string[],
): INodeProperties {
  return {
    displayName: "Question",
    name: "question",
    type: "string",
    displayOptions: {
      show: {
        resource: [resource],
        operation: operations,
      },
    },
    default: "",
    required: true,
    typeOptions: {
      rows: 3,
    },
    description: "The horary question to analyze",
  };
}

/**
 * Create horary question category field
 */
export function createQuestionCategoryField(
  resource: string,
  operations: string[],
): INodeProperties {
  return {
    displayName: "Question Category",
    name: "questionCategory",
    type: "options",
    displayOptions: {
      show: {
        resource: [resource],
        operation: operations,
      },
    },
    options: [
      {
        name: "Career & Work",
        value: "career",
        description: "Questions about job, business, career",
      },
      {
        name: "General",
        value: "general",
        description: "General questions",
      },
      {
        name: "Health",
        value: "health",
        description: "Questions about health and wellness",
      },
      {
        name: "Lost Objects",
        value: "lost_objects",
        description: "Questions about finding lost items",
      },
      {
        name: "Love & Relationships",
        value: "love",
        description: "Questions about love, marriage, partnerships",
      },
      {
        name: "Money & Finance",
        value: "money",
        description: "Questions about finances, investments",
      },
      {
        name: "Travel",
        value: "travel",
        description: "Questions about journeys and travel",
      },
    ],
    default: "general",
    description: "Category of the horary question",
  };
}

/**
 * Create question time fields (when the question was asked)
 */
export function createQuestionTimeFields(
  resource: string,
  operations: string[],
): INodeProperties[] {
  return [
    {
      displayName: "Question Year",
      name: "questionYear",
      type: "number",
      displayOptions: {
        show: {
          resource: [resource],
          operation: operations,
        },
      },
      default: new Date().getFullYear(),
      required: true,
      description: "Year when the question was asked",
    },
    {
      displayName: "Question Month",
      name: "questionMonth",
      type: "number",
      default: "0",
      displayOptions: {
        show: {
          resource: [resource],
          operation: operations,
        },
      },
      default: new Date().getMonth() + 1,
      typeOptions: {
        minValue: 1,
        maxValue: 12,
      },
      required: true,
      description: "Month when the question was asked (1-12)",
    },
    {
      displayName: "Question Day",
      name: "questionDay",
      type: "number",
      displayOptions: {
        show: {
          resource: [resource],
          operation: operations,
        },
      },
      default: new Date().getDate(),
      typeOptions: {
        minValue: 1,
        maxValue: 31,
      },
      required: true,
      description: "Day when the question was asked (1-31)",
    },
    {
      displayName: "Question Hour",
      name: "questionHour",
      type: "number",
      displayOptions: {
        show: {
          resource: [resource],
          operation: operations,
        },
      },
      default: new Date().getHours(),
      typeOptions: {
        minValue: 0,
        maxValue: 23,
      },
      required: true,
      description: "Hour when the question was asked (0-23)",
    },
    {
      displayName: "Question Minute",
      name: "questionMinute",
      type: "number",
      displayOptions: {
        show: {
          resource: [resource],
          operation: operations,
        },
      },
      default: new Date().getMinutes(),
      typeOptions: {
        minValue: 0,
        maxValue: 59,
      },
      required: true,
      description: "Minute when the question was asked (0-59)",
    },
  ];
}

/**
 * Create question location fields
 */
export function createQuestionLocationFields(
  resource: string,
  operations: string[],
): INodeProperties[] {
  return [
    {
      displayName: "Question City",
      name: "questionCity",
      type: "string",
      displayOptions: {
        show: {
          resource: [resource],
          operation: operations,
        },
      },
      default: "",
      required: true,
      description: "City where the question was asked",
    },
    {
      displayName: "Question Country Code",
      name: "questionCountryCode",
      type: "string",
      displayOptions: {
        show: {
          resource: [resource],
          operation: operations,
        },
      },
      default: "",
      placeholder: "US, GB, UA...",
      required: true,
      description: "ISO 3166-1 alpha-2 country code",
    },
  ];
}

/**
 * Create include fixed stars option for horary
 */
export function createHoraryIncludeFixedStarsField(
  resource: string,
  operations: string[],
): INodeProperties {
  return {
    displayName: "Include Fixed Stars",
    name: "horaryIncludeFixedStars",
    type: "boolean",
    displayOptions: {
      show: {
        resource: [resource],
        operation: operations,
      },
    },
    default: false,
    description: "Whether to include fixed stars in the horary analysis",
  };
}
