import type { INodeProperties } from "n8n-workflow";
import {
  createBirthDataFields,
  createLocationFields,
  createLanguageField,
  createNameField,
} from "../shared";
import {
  createPdfModeField,
  createTargetDateField,
  createPdfSectionsFields,
  createPdfPageSettingsFields,
  createPdfThemeField,
} from "../shared/pdf.fields";

/**
 * Operation selector for pdf resource
 */
const pdfOperationField: INodeProperties = {
  displayName: "Operation",
  name: "operation",
  type: "options",
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ["pdf"],
    },
  },
  options: [
    {
      name: "Horoscope: Daily",
      value: "horoscopeDaily",
      description: "Generate daily horoscope PDF (sun-sign or personalized)",
      action: "Generate daily horoscope PDF",
    },
    {
      name: "Horoscope: Data",
      value: "horoscopeData",
      description: "Get horoscope data for PDF generation (JSON, not PDF)",
      action: "Get horoscope data",
    },
    {
      name: "Horoscope: Weekly",
      value: "horoscopeWeekly",
      description: "Generate weekly horoscope PDF",
      action: "Generate weekly horoscope PDF",
    },
    {
      name: "Natal Report",
      value: "natalReport",
      description: "Generate comprehensive natal chart PDF report",
      action: "Generate natal report PDF",
    },
  ],
  default: "horoscopeDaily",
};

/**
 * Operations that support sun-sign mode
 */
const HOROSCOPE_OPERATIONS = ["horoscopeDaily", "horoscopeWeekly"];

/**
 * Operations that require birth data
 */
const BIRTH_DATA_OPERATIONS = ["natalReport"];

/**
 * Operations that support PDF sections
 */
const SECTIONS_OPERATIONS = ["horoscopeDaily", "horoscopeWeekly"];

/**
 * Operations that support page settings
 */
const PAGE_SETTINGS_OPERATIONS = [
  "horoscopeDaily",
  "horoscopeWeekly",
  "natalReport",
];

/**
 * Zodiac sign field for horoscope data
 */
const horoscopeDataSignField: INodeProperties = {
  displayName: "Zodiac Sign",
  name: "horoscopeSign",
  type: "options",
  displayOptions: {
    show: {
      resource: ["pdf"],
      operation: ["horoscopeData"],
    },
  },
  options: [
    { name: "Aquarius", value: "Aqu" },
    { name: "Aries", value: "Ari" },
    { name: "Cancer", value: "Can" },
    { name: "Capricorn", value: "Cap" },
    { name: "Gemini", value: "Gem" },
    { name: "Leo", value: "Leo" },
    { name: "Libra", value: "Lib" },
    { name: "Pisces", value: "Pis" },
    { name: "Sagittarius", value: "Sag" },
    { name: "Scorpio", value: "Sco" },
    { name: "Taurus", value: "Tau" },
    { name: "Virgo", value: "Vir" },
  ],
  default: "Ari",
  required: true,
  description: "Zodiac sign for the horoscope",
};

/**
 * Sun sign field for horoscope PDFs
 */
const sunSignField: INodeProperties = {
  displayName: "Zodiac Sign",
  name: "sunSign",
  type: "options",
  displayOptions: {
    show: {
      resource: ["pdf"],
      operation: HOROSCOPE_OPERATIONS,
      pdfMode: ["sunSign"],
    },
  },
  options: [
    { name: "Aquarius", value: "Aqu" },
    { name: "Aries", value: "Ari" },
    { name: "Cancer", value: "Can" },
    { name: "Capricorn", value: "Cap" },
    { name: "Gemini", value: "Gem" },
    { name: "Leo", value: "Leo" },
    { name: "Libra", value: "Lib" },
    { name: "Pisces", value: "Pis" },
    { name: "Sagittarius", value: "Sag" },
    { name: "Scorpio", value: "Sco" },
    { name: "Taurus", value: "Tau" },
    { name: "Virgo", value: "Vir" },
  ],
  default: "Ari",
  required: true,
  description: "Zodiac sign for the horoscope",
};

/**
 * Personalized birth data fields
 */
const personalizedBirthFields: INodeProperties[] = [
  {
    displayName: "Birth Year",
    name: "pdfBirthYear",
    type: "number",
    displayOptions: {
      show: {
        resource: ["pdf"],
        operation: HOROSCOPE_OPERATIONS,
        pdfMode: ["personalized"],
      },
    },
    default: 1990,
    required: true,
    description: "Year of birth",
  },
  {
    displayName: "Birth Month",
    name: "pdfBirthMonth",
    type: "number",
    displayOptions: {
      show: {
        resource: ["pdf"],
        operation: HOROSCOPE_OPERATIONS,
        pdfMode: ["personalized"],
      },
    },
    default: 1,
    typeOptions: { minValue: 1, maxValue: 12 },
    required: true,
    description: "Month of birth (1-12)",
  },
  {
    displayName: "Birth Day",
    name: "pdfBirthDay",
    type: "number",
    displayOptions: {
      show: {
        resource: ["pdf"],
        operation: HOROSCOPE_OPERATIONS,
        pdfMode: ["personalized"],
      },
    },
    default: 1,
    typeOptions: { minValue: 1, maxValue: 31 },
    required: true,
    description: "Day of birth (1-31)",
  },
  {
    displayName: "Birth Hour",
    name: "pdfBirthHour",
    type: "number",
    displayOptions: {
      show: {
        resource: ["pdf"],
        operation: HOROSCOPE_OPERATIONS,
        pdfMode: ["personalized"],
      },
    },
    default: 12,
    typeOptions: { minValue: 0, maxValue: 23 },
    required: true,
    description: "Hour of birth (0-23)",
  },
  {
    displayName: "Birth Minute",
    name: "pdfBirthMinute",
    type: "number",
    displayOptions: {
      show: {
        resource: ["pdf"],
        operation: HOROSCOPE_OPERATIONS,
        pdfMode: ["personalized"],
      },
    },
    default: 0,
    typeOptions: { minValue: 0, maxValue: 59 },
    required: true,
    description: "Minute of birth (0-59)",
  },
  {
    displayName: "Birth City",
    name: "pdfBirthCity",
    type: "string",
    displayOptions: {
      show: {
        resource: ["pdf"],
        operation: HOROSCOPE_OPERATIONS,
        pdfMode: ["personalized"],
      },
    },
    default: "",
    required: true,
    description: "City of birth",
  },
  {
    displayName: "Birth Country Code",
    name: "pdfBirthCountryCode",
    type: "string",
    displayOptions: {
      show: {
        resource: ["pdf"],
        operation: HOROSCOPE_OPERATIONS,
        pdfMode: ["personalized"],
      },
    },
    default: "",
    placeholder: "US, GB, UA...",
    required: true,
    description: "ISO 3166-1 alpha-2 country code",
  },
];

/**
 * All properties for the pdf resource
 */
export const pdfOperations: INodeProperties[] = [
  // Operation selector
  pdfOperationField,

  // Mode field for horoscope
  createPdfModeField("pdf", HOROSCOPE_OPERATIONS),

  // Sun sign field
  sunSignField,

  // Horoscope data sign field
  horoscopeDataSignField,

  // Personalized birth data fields
  ...personalizedBirthFields,

  // Name field for natal report
  createNameField("pdf", BIRTH_DATA_OPERATIONS),

  // Birth data fields for natal report
  ...createBirthDataFields("pdf", BIRTH_DATA_OPERATIONS),

  // Location fields for natal report
  ...createLocationFields("pdf", BIRTH_DATA_OPERATIONS),

  // Target date field
  createTargetDateField("pdf", [...HOROSCOPE_OPERATIONS, "horoscopeData"]),

  // PDF sections fields
  ...createPdfSectionsFields("pdf", SECTIONS_OPERATIONS),

  // Page settings fields
  ...createPdfPageSettingsFields("pdf", PAGE_SETTINGS_OPERATIONS),

  // Theme field
  createPdfThemeField("pdf", PAGE_SETTINGS_OPERATIONS),

  // Language field
  createLanguageField("pdf"),
];
