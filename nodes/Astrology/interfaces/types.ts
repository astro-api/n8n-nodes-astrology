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
export type ResourceType = "data" | "horoscope" | "charts";

/**
 * Data resource operations
 */
export type DataOperation =
  | "now"
  | "positions"
  | "houseCusps"
  | "aspects"
  | "lunarMetrics";

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
export type ChartsOperation = "natal";

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
