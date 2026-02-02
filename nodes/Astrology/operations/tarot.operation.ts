import type { INodeProperties } from "n8n-workflow";
import {
  createBirthDataFields,
  createLocationFields,
  createSecondSubjectFields,
  createLanguageField,
  tarotArcanaOptions,
  tarotSuitOptions,
  tarotElementOptions,
  createTarotTraditionField,
  createInterpretationDepthField,
  createTarotOptionsFields,
} from "../shared";

/**
 * Operation groups for displayOptions
 */
const glossaryOperations = [
  "glossaryCards",
  "glossarySpreads",
  "glossaryCardDetail",
  "searchCards",
  "dailyCard",
];
const birthDataOperations = [
  "dailyCard",
  "reportSingle",
  "reportThreeCard",
  "reportCelticCross",
  "reportSynastry",
  "reportHouses",
  "reportTreeOfLife",
  "analysisBirthCards",
  "analysisTransitReport",
  "analysisNatalReport",
];
const locationOperations = [
  "dailyCard",
  "reportSingle",
  "reportThreeCard",
  "reportCelticCross",
  "reportSynastry",
  "reportHouses",
  "reportTreeOfLife",
  "analysisBirthCards",
  "analysisTransitReport",
  "analysisNatalReport",
];
const synastryOperations = ["reportSynastry"];
const reportOperations = [
  "reportSingle",
  "reportThreeCard",
  "reportCelticCross",
  "reportSynastry",
  "reportHouses",
  "reportTreeOfLife",
];
const analysisOperations = [
  "analysisQuintessence",
  "analysisBirthCards",
  "analysisDignities",
  "analysisTiming",
  "analysisOptimalTimes",
  "analysisTransitReport",
  "analysisNatalReport",
];
const cardsInputOperations = [
  "analysisQuintessence",
  "analysisDignities",
  "analysisTiming",
];
const filterOperations = ["glossaryCards", "searchCards"];
const postOperations = [
  "drawCards",
  ...reportOperations,
  ...analysisOperations,
];

/**
 * Operation selector for Tarot resource
 */
const tarotOperationField: INodeProperties = {
  displayName: "Operation",
  name: "operation",
  type: "options",
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ["tarot"],
    },
  },
  options: [
    // Analysis operations
    {
      name: "Analysis - Birth Cards",
      value: "analysisBirthCards",
      description: "Calculate personal birth cards based on date of birth",
      action: "Calculate birth cards",
    },
    {
      name: "Analysis - Dignities",
      value: "analysisDignities",
      description: "Analyze elemental dignities between cards in a spread",
      action: "Analyze elemental dignities",
    },
    {
      name: "Analysis - Natal Report",
      value: "analysisNatalReport",
      description:
        "Tarot reading integrated with natal chart for deep personal insights",
      action: "Get natal integration report",
    },
    {
      name: "Analysis - Optimal Times",
      value: "analysisOptimalTimes",
      description:
        "Find optimal timing for specific activities based on tarot and astrology",
      action: "Find optimal times",
    },
    {
      name: "Analysis - Quintessence",
      value: "analysisQuintessence",
      description: "Calculate the quintessence (essence card) from a spread",
      action: "Calculate quintessence",
    },
    {
      name: "Analysis - Timing",
      value: "analysisTiming",
      description: "Timing analysis and predictions based on card positions",
      action: "Analyze timing",
    },
    {
      name: "Analysis - Transit Report",
      value: "analysisTransitReport",
      description:
        "Tarot reading aligned with current planetary transits for timely guidance",
      action: "Get transit report",
    },
    // Daily Card
    {
      name: "Daily Card",
      value: "dailyCard",
      description:
        "Get a personalized daily tarot card for guidance (consistent per user/day)",
      action: "Get daily card",
    },
    // Draw Cards
    {
      name: "Draw Cards",
      value: "drawCards",
      description: "Draw random tarot cards for a reading (1-78 cards)",
      action: "Draw random cards",
    },
    // Glossary operations
    {
      name: "Glossary - Card Detail",
      value: "glossaryCardDetail",
      description: "Get detailed information about a specific tarot card by ID",
      action: "Get card detail",
    },
    {
      name: "Glossary - Cards",
      value: "glossaryCards",
      description:
        "Get tarot cards glossary with optional filters (arcana, suit, element, planet, sign)",
      action: "Get cards glossary",
    },
    {
      name: "Glossary - Spreads",
      value: "glossarySpreads",
      description:
        "Get available tarot spread types and their position descriptions",
      action: "Get spreads glossary",
    },
    // Report operations
    {
      name: "Report - Celtic Cross",
      value: "reportCelticCross",
      description:
        "Full Celtic Cross spread (10 cards) for comprehensive life situation analysis",
      action: "Get celtic cross report",
    },
    {
      name: "Report - Houses",
      value: "reportHouses",
      description: "12-house astrological spread covering all life areas",
      action: "Get houses report",
    },
    {
      name: "Report - Single Card",
      value: "reportSingle",
      description: "Single card tarot reading for focused guidance",
      action: "Get single card report",
    },
    {
      name: "Report - Synastry",
      value: "reportSynastry",
      description:
        "Two-person relationship tarot reading for compatibility insights",
      action: "Get synastry report",
    },
    {
      name: "Report - Three Card",
      value: "reportThreeCard",
      description:
        "Classic three card spread (past/present/future or situation/action/outcome)",
      action: "Get three card report",
    },
    {
      name: "Report - Tree of Life",
      value: "reportTreeOfLife",
      description: "Kabbalah Tree of Life spread for spiritual insight",
      action: "Get tree of life report",
    },
    // Search Cards
    {
      name: "Search Cards",
      value: "searchCards",
      description:
        "Search tarot cards by keyword, life area, element, or astrological correspondence",
      action: "Search cards",
    },
  ],
  default: "reportSingle",
};

/**
 * Card ID field for glossaryCardDetail
 */
const cardIdField: INodeProperties = {
  displayName: "Card ID",
  name: "cardId",
  type: "string",
  displayOptions: {
    show: {
      resource: ["tarot"],
      operation: ["glossaryCardDetail"],
    },
  },
  default: "",
  placeholder: "e.g. the_fool, ace_of_wands, major_04",
  description: "The card identifier to get details for",
  required: true,
};

/**
 * User ID field for daily card
 */
const userIdField: INodeProperties = {
  displayName: "User ID",
  name: "userId",
  type: "string",
  displayOptions: {
    show: {
      resource: ["tarot"],
      operation: ["dailyCard"],
    },
  },
  default: "",
  placeholder: "e.g. user-123, email@example.com",
  description:
    "Unique user identifier for consistent daily card (same user gets same card per day)",
  required: true,
};

/**
 * Draw count field
 */
const drawCountField: INodeProperties = {
  displayName: "Number of Cards",
  name: "drawCount",
  type: "number",
  displayOptions: {
    show: {
      resource: ["tarot"],
      operation: ["drawCards"],
    },
  },
  default: 1,
  typeOptions: {
    minValue: 1,
    maxValue: 78,
  },
  description: "Number of cards to draw (1-78)",
  required: true,
};

/**
 * Exclude reversed cards toggle
 */
const excludeReversedField: INodeProperties = {
  displayName: "Exclude Reversed",
  name: "excludeReversed",
  type: "boolean",
  displayOptions: {
    show: {
      resource: ["tarot"],
      operation: ["drawCards"],
    },
  },
  default: false,
  description: "Whether to exclude reversed card orientations from draw",
};

/**
 * Exclude Major Arcana toggle
 */
const excludeMajorsField: INodeProperties = {
  displayName: "Exclude Major Arcana",
  name: "excludeMajors",
  type: "boolean",
  displayOptions: {
    show: {
      resource: ["tarot"],
      operation: ["drawCards"],
    },
  },
  default: false,
  description: "Whether to exclude Major Arcana cards from draw",
};

/**
 * Exclude Minor Arcana toggle
 */
const excludeMinorsField: INodeProperties = {
  displayName: "Exclude Minor Arcana",
  name: "excludeMinors",
  type: "boolean",
  displayOptions: {
    show: {
      resource: ["tarot"],
      operation: ["drawCards"],
    },
  },
  default: false,
  description: "Whether to exclude Minor Arcana cards from draw",
};

/**
 * Arcana filter field
 */
const arcanaFilterField: INodeProperties = {
  displayName: "Filter by Arcana",
  name: "arcana",
  type: "options",
  displayOptions: {
    show: {
      resource: ["tarot"],
      operation: filterOperations,
    },
  },
  options: tarotArcanaOptions,
  default: "",
  description: "Filter cards by arcana type",
};

/**
 * Suit filter field
 */
const suitFilterField: INodeProperties = {
  displayName: "Filter by Suit",
  name: "suit",
  type: "options",
  displayOptions: {
    show: {
      resource: ["tarot"],
      operation: filterOperations,
    },
  },
  options: tarotSuitOptions,
  default: "",
  description: "Filter Minor Arcana cards by suit",
};

/**
 * Element filter field
 */
const elementFilterField: INodeProperties = {
  displayName: "Filter by Element",
  name: "element",
  type: "options",
  displayOptions: {
    show: {
      resource: ["tarot"],
      operation: filterOperations,
    },
  },
  options: tarotElementOptions,
  default: "",
  description: "Filter cards by elemental correspondence",
};

/**
 * Planet filter field
 */
const planetFilterField: INodeProperties = {
  displayName: "Filter by Planet",
  name: "planet",
  type: "string",
  displayOptions: {
    show: {
      resource: ["tarot"],
      operation: filterOperations,
    },
  },
  default: "",
  placeholder: "e.g. mars, venus, moon",
  description: "Filter cards by planetary correspondence (lowercase)",
};

/**
 * Sign filter field
 */
const signFilterField: INodeProperties = {
  displayName: "Filter by Zodiac Sign",
  name: "sign",
  type: "string",
  displayOptions: {
    show: {
      resource: ["tarot"],
      operation: filterOperations,
    },
  },
  default: "",
  placeholder: "e.g. ari, tau, gem (3-letter code)",
  description: "Filter cards by zodiac sign correspondence (3-letter code)",
};

/**
 * House filter field
 */
const houseFilterField: INodeProperties = {
  displayName: "Filter by House",
  name: "house",
  type: "number",
  displayOptions: {
    show: {
      resource: ["tarot"],
      operation: filterOperations,
    },
  },
  default: 0,
  typeOptions: {
    minValue: 0,
    maxValue: 12,
  },
  description:
    "Filter cards by astrological house correspondence (1-12, 0 for all)",
};

/**
 * Search keyword field
 */
const keywordField: INodeProperties = {
  displayName: "Keyword",
  name: "keyword",
  type: "string",
  displayOptions: {
    show: {
      resource: ["tarot"],
      operation: ["searchCards"],
    },
  },
  default: "",
  placeholder: "e.g. love, success, transformation",
  description: "Search keyword for card names (case-insensitive)",
};

/**
 * Life area field
 */
const lifeAreaField: INodeProperties = {
  displayName: "Life Area",
  name: "lifeArea",
  type: "string",
  displayOptions: {
    show: {
      resource: ["tarot"],
      operation: ["searchCards", "dailyCard", "drawCards", ...reportOperations],
    },
  },
  default: "",
  placeholder: "e.g. career, love, health, finances",
  description: "Optional life area focus for the reading or search",
};

/**
 * Page number field for search
 */
const pageField: INodeProperties = {
  displayName: "Page",
  name: "page",
  type: "number",
  displayOptions: {
    show: {
      resource: ["tarot"],
      operation: ["searchCards"],
    },
  },
  default: 1,
  typeOptions: {
    minValue: 1,
  },
  description: "Page number for pagination (1-based)",
};

/**
 * Page size field for search
 */
const pageSizeField: INodeProperties = {
  displayName: "Page Size",
  name: "pageSize",
  type: "number",
  displayOptions: {
    show: {
      resource: ["tarot"],
      operation: ["searchCards"],
    },
  },
  default: 20,
  typeOptions: {
    minValue: 1,
    maxValue: 78,
  },
  description: "Number of results per page (max 78)",
};

/**
 * Cards input field for analysis operations
 */
const cardsInputField: INodeProperties = {
  displayName: "Card IDs",
  name: "cardIds",
  type: "string",
  displayOptions: {
    show: {
      resource: ["tarot"],
      operation: cardsInputOperations,
    },
  },
  default: "",
  placeholder: "the_fool,the_magician,the_high_priestess",
  description: "Comma-separated list of card IDs for analysis",
  required: true,
};

/**
 * Simplify output toggle
 */
const simplifyField: INodeProperties = {
  displayName: "Simplify",
  name: "simplify",
  type: "boolean",
  displayOptions: {
    show: {
      resource: ["tarot"],
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
 * All properties for the Tarot resource
 */
export const tarotOperations: INodeProperties[] = [
  // Operation selector
  tarotOperationField,

  // Card ID for glossaryCardDetail
  cardIdField,

  // User ID for dailyCard
  userIdField,

  // Draw options
  drawCountField,
  excludeReversedField,
  excludeMajorsField,
  excludeMinorsField,

  // Filter fields for glossary/search
  arcanaFilterField,
  suitFilterField,
  elementFilterField,
  planetFilterField,
  signFilterField,
  houseFilterField,

  // Search fields
  keywordField,
  pageField,
  pageSizeField,

  // Life area
  lifeAreaField,

  // Cards input for analysis
  cardsInputField,

  // Birth data fields (for operations that need it)
  ...createBirthDataFields("tarot", birthDataOperations),

  // Location fields
  ...createLocationFields("tarot", locationOperations),

  // Second subject fields for synastry
  ...createSecondSubjectFields("tarot", synastryOperations),

  // Tarot-specific options
  createLanguageField("tarot", postOperations),
  createTarotTraditionField("tarot", [
    ...reportOperations,
    ...analysisOperations,
  ]),
  createInterpretationDepthField("tarot", reportOperations),
  ...createTarotOptionsFields("tarot", [
    ...reportOperations,
    ...analysisOperations,
  ]),

  // Simplify output
  simplifyField,
];
