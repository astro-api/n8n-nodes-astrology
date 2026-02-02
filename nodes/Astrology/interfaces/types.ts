import type { IDataObject, IExecuteFunctions } from "n8n-workflow";

/**
 * Birth data structure for API requests
 */
export interface IBirthData {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  city?: string;
  country_code?: string;
  latitude?: number;
  longitude?: number;
}

/**
 * API request body with subject wrapper
 */
export interface ISubjectRequest {
  subject: {
    birth_data: IBirthData;
  };
  [key: string]: unknown;
}

/**
 * Resource types available in the node
 */
export type ResourceType =
  | "data"
  | "horoscope"
  | "charts"
  | "humanDesign"
  | "numerology"
  | "tarot";

/**
 * Data resource operations
 */
export type DataOperation =
  | "now"
  | "positions"
  | "positionsEnhanced"
  | "houseCusps"
  | "aspects"
  | "aspectsEnhanced"
  | "lunarMetrics"
  | "lunarMetricsEnhanced"
  | "globalPositions";

/**
 * Horoscope resource operations
 */
export type HoroscopeOperation =
  | "signDaily"
  | "signDailyText"
  | "signWeekly"
  | "signWeeklyText"
  | "signMonthly"
  | "signMonthlyText"
  | "signYearly"
  | "signYearlyText"
  | "personalDaily"
  | "personalDailyText"
  | "personalWeekly"
  | "personalWeeklyText"
  | "personalMonthly"
  | "personalMonthlyText"
  | "personalYearly"
  | "personalYearlyText"
  | "chineseBazi";

/**
 * Charts resource operations
 */
export type ChartsOperation =
  | "natal"
  | "synastry"
  | "transit"
  | "composite"
  | "solarReturn"
  | "solarReturnTransits"
  | "lunarReturn"
  | "lunarReturnTransits"
  | "progressions"
  | "natalTransits"
  | "directions";

/**
 * Human Design resource operations
 */
export type HumanDesignOperation =
  | "glossaryChannels"
  | "glossaryGates"
  | "glossaryTypes"
  | "bodygraph"
  | "compatibility"
  | "designDate"
  | "transits"
  | "typeOnly";

/**
 * Numerology resource operations
 */
export type NumerologyOperation =
  | "coreNumbers"
  | "comprehensive"
  | "compatibility";

/**
 * Tarot resource operations
 */
export type TarotOperation =
  // Glossary (GET)
  | "glossaryCards"
  | "glossarySpreads"
  | "glossaryCardDetail"
  | "searchCards"
  | "dailyCard"
  // Draw (POST)
  | "drawCards"
  // Reports (POST)
  | "reportSingle"
  | "reportThreeCard"
  | "reportCelticCross"
  | "reportSynastry"
  | "reportHouses"
  | "reportTreeOfLife"
  // Analysis (POST)
  | "analysisQuintessence"
  | "analysisBirthCards"
  | "analysisDignities"
  | "analysisTiming"
  | "analysisOptimalTimes"
  | "analysisTransitReport"
  | "analysisNatalReport";

/**
 * Tarot tradition/interpretation style
 */
export type TarotTradition =
  | "universal"
  | "psychological"
  | "classical"
  | "hermetic";

/**
 * Tarot interpretation depth levels
 */
export type TarotInterpretationDepth =
  | "keywords"
  | "basic"
  | "detailed"
  | "professional";

/**
 * Tarot arcana types for filtering
 */
export type TarotArcana = "major" | "minor";

/**
 * Tarot suits for filtering
 */
export type TarotSuit = "wands" | "cups" | "swords" | "pentacles";

/**
 * Human Design circuit types
 */
export type HumanDesignCircuit = "individual" | "collective" | "tribal";

/**
 * Human Design center types
 */
export type HumanDesignCenter =
  | "head"
  | "ajna"
  | "throat"
  | "g_center"
  | "heart"
  | "sacral"
  | "solar_plexus"
  | "spleen"
  | "root";

/**
 * Transit time structure for transit chart requests
 */
export interface ITransitTime {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  city?: string;
  country_code?: string;
  latitude?: number;
  longitude?: number;
}

/**
 * Two-subject request for synastry/composite charts
 */
export interface ITwoSubjectRequest {
  subject1: {
    name?: string;
    birth_data: IBirthData;
  };
  subject2: {
    name?: string;
    birth_data: IBirthData;
  };
  options?: IDataObject;
}

/**
 * Transit chart request structure
 */
export interface ITransitChartRequest {
  subject: {
    name?: string;
    birth_data: IBirthData;
  };
  transit_time: {
    datetime: ITransitTime;
  };
  options?: IDataObject;
}

/**
 * Solar/Lunar return request structure
 */
export interface IReturnChartRequest {
  subject: {
    name?: string;
    birth_data: IBirthData;
  };
  return_year?: number;
  return_date?: string;
  return_location?: {
    city?: string;
    country_code?: string;
    latitude?: number;
    longitude?: number;
  };
  options?: IDataObject;
}

/**
 * Progressions/Directions request structure
 */
export interface IProgressionChartRequest {
  subject: {
    name?: string;
    birth_data: IBirthData;
  };
  progression_date?: string;
  direction_date?: string;
  options?: IDataObject;
}

/**
 * Natal transits (date range) request structure
 */
export interface INatalTransitsRequest {
  subject: {
    name?: string;
    birth_data: IBirthData;
  };
  start_date: string;
  end_date: string;
  options?: IDataObject;
}

/**
 * Handler context passed to resource handlers
 */
export interface IHandlerContext {
  executeFunctions: IExecuteFunctions;
  itemIndex: number;
  baseUrl: string;
  apiKey: string;
}

/**
 * Resource handler function signature
 */
export type ResourceHandler = (
  context: IHandlerContext,
  operation: string,
) => Promise<IDataObject>;

/**
 * Zodiac signs
 */
export type ZodiacSign =
  | "aries"
  | "taurus"
  | "gemini"
  | "cancer"
  | "leo"
  | "virgo"
  | "libra"
  | "scorpio"
  | "sagittarius"
  | "capricorn"
  | "aquarius"
  | "pisces";

/**
 * Location type for birth data
 */
export type LocationType = "city" | "coordinates";

/**
 * Astrological tradition
 */
export type Tradition = "western" | "vedic";

/**
 * Text output format
 */
export type TextFormat = "plain" | "markdown" | "html";
