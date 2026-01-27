import type { INodeProperties } from "n8n-workflow";

// All sign-based operations (for displayOptions)
const signOperations = [
  "signDaily",
  "signDailyText",
  "signWeekly",
  "signWeeklyText",
  "signMonthly",
  "signMonthlyText",
  "signYearly",
  "signYearlyText",
];

// All personal operations (for displayOptions)
const personalOperations = [
  "personalDaily",
  "personalDailyText",
  "personalWeekly",
  "personalWeeklyText",
  "personalMonthly",
  "personalMonthlyText",
  "personalYearly",
  "personalYearlyText",
];

// All text operations (for displayOptions)
const textOperations = [
  "signDailyText",
  "signWeeklyText",
  "signMonthlyText",
  "signYearlyText",
  "personalDailyText",
  "personalWeeklyText",
  "personalMonthlyText",
  "personalYearlyText",
];

export const horoscopeOperations: INodeProperties[] = [
  // Operation selector
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["horoscope"],
      },
    },
    options: [
      {
        name: "Chinese Bazi",
        value: "chineseBazi",
        description: "Get Chinese Bazi (Four Pillars) horoscope",
        action: "Get chinese bazi horoscope",
      },
      {
        name: "Personal Daily",
        value: "personalDaily",
        description: "Get personalized daily horoscope based on birth data",
        action: "Get personalized daily horoscope",
      },
      {
        name: "Personal Daily Text",
        value: "personalDailyText",
        description: "Get personalized daily horoscope as formatted text",
        action: "Get personalized daily horoscope text",
      },
      {
        name: "Personal Monthly",
        value: "personalMonthly",
        description: "Get personalized monthly horoscope based on birth data",
        action: "Get personalized monthly horoscope",
      },
      {
        name: "Personal Monthly Text",
        value: "personalMonthlyText",
        description: "Get personalized monthly horoscope as formatted text",
        action: "Get personalized monthly horoscope text",
      },
      {
        name: "Personal Weekly",
        value: "personalWeekly",
        description: "Get personalized weekly horoscope based on birth data",
        action: "Get personalized weekly horoscope",
      },
      {
        name: "Personal Weekly Text",
        value: "personalWeeklyText",
        description: "Get personalized weekly horoscope as formatted text",
        action: "Get personalized weekly horoscope text",
      },
      {
        name: "Personal Yearly",
        value: "personalYearly",
        description: "Get personalized yearly horoscope based on birth data",
        action: "Get personalized yearly horoscope",
      },
      {
        name: "Personal Yearly Text",
        value: "personalYearlyText",
        description: "Get personalized yearly horoscope as formatted text",
        action: "Get personalized yearly horoscope text",
      },
      {
        name: "Sign Daily",
        value: "signDaily",
        description: "Get daily sun sign horoscope",
        action: "Get daily sign horoscope",
      },
      {
        name: "Sign Daily Text",
        value: "signDailyText",
        description: "Get daily sun sign horoscope as formatted text",
        action: "Get daily sign horoscope text",
      },
      {
        name: "Sign Monthly",
        value: "signMonthly",
        description: "Get monthly sun sign horoscope",
        action: "Get monthly sign horoscope",
      },
      {
        name: "Sign Monthly Text",
        value: "signMonthlyText",
        description: "Get monthly sun sign horoscope as formatted text",
        action: "Get monthly sign horoscope text",
      },
      {
        name: "Sign Weekly",
        value: "signWeekly",
        description: "Get weekly sun sign horoscope",
        action: "Get weekly sign horoscope",
      },
      {
        name: "Sign Weekly Text",
        value: "signWeeklyText",
        description: "Get weekly sun sign horoscope as formatted text",
        action: "Get weekly sign horoscope text",
      },
      {
        name: "Sign Yearly",
        value: "signYearly",
        description: "Get yearly sun sign horoscope",
        action: "Get yearly sign horoscope",
      },
      {
        name: "Sign Yearly Text",
        value: "signYearlyText",
        description: "Get yearly sun sign horoscope as formatted text",
        action: "Get yearly sign horoscope text",
      },
    ],
    default: "signDaily",
  },

  // Zodiac Sign (for sign-based operations)
  {
    displayName: "Zodiac Sign",
    name: "sign",
    type: "options",
    displayOptions: {
      show: {
        resource: ["horoscope"],
        operation: signOperations,
      },
    },
    options: [
      { name: "Aquarius", value: "aquarius" },
      { name: "Aries", value: "aries" },
      { name: "Cancer", value: "cancer" },
      { name: "Capricorn", value: "capricorn" },
      { name: "Gemini", value: "gemini" },
      { name: "Leo", value: "leo" },
      { name: "Libra", value: "libra" },
      { name: "Pisces", value: "pisces" },
      { name: "Sagittarius", value: "sagittarius" },
      { name: "Scorpio", value: "scorpio" },
      { name: "Taurus", value: "taurus" },
      { name: "Virgo", value: "virgo" },
    ],
    default: "aries",
    description: "The zodiac sign for the horoscope",
    required: true,
  },

  // Birth data fields (for personal operations and Chinese Bazi)
  {
    displayName: "Year",
    name: "year",
    type: "number",
    displayOptions: {
      show: {
        resource: ["horoscope"],
        operation: [...personalOperations, "chineseBazi"],
      },
    },
    default: 1990,
    placeholder: "e.g. 1990",
    description: "Birth year",
    required: true,
  },
  {
    displayName: "Month",
    name: "month",
    type: "number",
    displayOptions: {
      show: {
        resource: ["horoscope"],
        operation: [...personalOperations, "chineseBazi"],
      },
    },
    default: 1,
    placeholder: "e.g. 6",
    typeOptions: {
      minValue: 1,
      maxValue: 12,
    },
    description: "Birth month (1-12)",
    required: true,
  },
  {
    displayName: "Day",
    name: "day",
    type: "number",
    displayOptions: {
      show: {
        resource: ["horoscope"],
        operation: [...personalOperations, "chineseBazi"],
      },
    },
    default: 1,
    placeholder: "e.g. 15",
    typeOptions: {
      minValue: 1,
      maxValue: 31,
    },
    description: "Birth day (1-31)",
    required: true,
  },
  {
    displayName: "Hour",
    name: "hour",
    type: "number",
    displayOptions: {
      show: {
        resource: ["horoscope"],
        operation: [...personalOperations, "chineseBazi"],
      },
    },
    default: 12,
    placeholder: "e.g. 14",
    typeOptions: {
      minValue: 0,
      maxValue: 23,
    },
    description: "Birth hour (0-23)",
    required: true,
  },
  {
    displayName: "Minute",
    name: "minute",
    type: "number",
    displayOptions: {
      show: {
        resource: ["horoscope"],
        operation: [...personalOperations, "chineseBazi"],
      },
    },
    default: 0,
    placeholder: "e.g. 30",
    typeOptions: {
      minValue: 0,
      maxValue: 59,
    },
    description: "Birth minute (0-59)",
    required: true,
  },

  // Location type selector (for personal operations)
  {
    displayName: "Location Type",
    name: "locationType",
    type: "options",
    displayOptions: {
      show: {
        resource: ["horoscope"],
        operation: [...personalOperations, "chineseBazi"],
      },
    },
    options: [
      {
        name: "City Name",
        value: "city",
        description:
          "Enter city and country - coordinates detected automatically",
      },
      {
        name: "Coordinates",
        value: "coordinates",
        description: "Enter exact latitude and longitude",
      },
    ],
    default: "city",
    description: "How to specify the birth location",
  },

  // City-based location
  {
    displayName: "City",
    name: "city",
    type: "string",
    displayOptions: {
      show: {
        resource: ["horoscope"],
        operation: [...personalOperations, "chineseBazi"],
        locationType: ["city"],
      },
    },
    default: "",
    placeholder: "London",
    description: "City name",
    required: true,
  },
  {
    displayName: "Country Code",
    name: "countryCode",
    type: "string",
    displayOptions: {
      show: {
        resource: ["horoscope"],
        operation: [...personalOperations, "chineseBazi"],
        locationType: ["city"],
      },
    },
    default: "",
    placeholder: "GB",
    description: "ISO 3166-1 alpha-2 country code (e.g., UA, US, GB, DE)",
    required: true,
  },

  // Coordinate-based location
  {
    displayName: "Latitude",
    name: "latitude",
    type: "number",
    displayOptions: {
      show: {
        resource: ["horoscope"],
        operation: [...personalOperations, "chineseBazi"],
        locationType: ["coordinates"],
      },
    },
    default: 0,
    placeholder: "e.g. 50.45",
    typeOptions: {
      minValue: -90,
      maxValue: 90,
    },
    description: "Latitude of birth place (-90 to 90)",
    required: true,
  },
  {
    displayName: "Longitude",
    name: "longitude",
    type: "number",
    displayOptions: {
      show: {
        resource: ["horoscope"],
        operation: [...personalOperations, "chineseBazi"],
        locationType: ["coordinates"],
      },
    },
    default: 0,
    placeholder: "e.g. 30.52",
    typeOptions: {
      minValue: -180,
      maxValue: 180,
    },
    description: "Longitude of birth place (-180 to 180)",
    required: true,
  },

  // Target date (for all horoscope operations)
  {
    displayName: "Target Date",
    name: "targetDate",
    type: "string",
    displayOptions: {
      show: {
        resource: ["horoscope"],
      },
      hide: {
        operation: ["chineseBazi"],
      },
    },
    default: "",
    placeholder: "2024-01-15",
    description:
      "Target date for prediction (YYYY-MM-DD). Leave empty for today.",
  },

  // Bazi Year (for Chinese Bazi)
  {
    displayName: "Forecast Year",
    name: "baziYear",
    type: "number",
    displayOptions: {
      show: {
        resource: ["horoscope"],
        operation: ["chineseBazi"],
      },
    },
    default: new Date().getFullYear(),
    description: "Year for the Bazi forecast",
  },

  // Language (for all horoscope operations)
  {
    displayName: "Language",
    name: "language",
    type: "string",
    displayOptions: {
      show: {
        resource: ["horoscope"],
      },
    },
    default: "en",
    placeholder: "en",
    description: "Response language code (en, uk, ru, es, de, etc.)",
  },

  // Tradition (for all horoscope operations)
  {
    displayName: "Tradition",
    name: "tradition",
    type: "options",
    displayOptions: {
      show: {
        resource: ["horoscope"],
      },
      hide: {
        operation: ["chineseBazi"],
      },
    },
    options: [
      { name: "Chinese", value: "chinese" },
      { name: "Classical", value: "classical" },
      { name: "Event Oriented", value: "event_oriented" },
      { name: "Psychological", value: "psychological" },
      { name: "Universal", value: "universal" },
      { name: "Vedic", value: "vedic" },
    ],
    default: "universal",
    description: "Astrological tradition to use",
  },

  // Text format (for text operations)
  {
    displayName: "Text Format",
    name: "textFormat",
    type: "options",
    displayOptions: {
      show: {
        resource: ["horoscope"],
        operation: textOperations,
      },
    },
    options: [
      { name: "Bullets", value: "bullets" },
      { name: "Long", value: "long" },
      { name: "Paragraph", value: "paragraph" },
      { name: "Short", value: "short" },
      { name: "Structured", value: "structured" },
    ],
    default: "paragraph",
    description: "Text output style",
  },

  // Include emoji (for text operations)
  {
    displayName: "Include Emoji",
    name: "emoji",
    type: "boolean",
    displayOptions: {
      show: {
        resource: ["horoscope"],
        operation: textOperations,
      },
    },
    default: true,
    description: "Whether to include emoji markers in the output",
  },
];
