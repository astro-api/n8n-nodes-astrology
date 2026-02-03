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
  | "tarot"
  | "lunar"
  | "vedic"
  | "analysis"
  | "render";

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
 * Lunar resource operations
 */
export type LunarOperation =
  | "phases"
  | "voidOfCourse"
  | "mansions"
  | "events"
  | "calendar";

/**
 * Vedic resource operations
 */
export type VedicOperation =
  | "chart"
  | "chartRender"
  | "birthDetails"
  | "vimshottariDasha"
  | "charaDasha"
  | "yoginiDasha"
  | "nakshatra"
  | "divisionalChart"
  | "ashtakvarga"
  | "shadbala"
  | "yogaAnalysis"
  | "kundliMatching"
  | "manglikDosha"
  | "kaalSarpaDosha"
  | "sadeSati"
  | "transit"
  | "varshaphal"
  | "panchang"
  | "regionalPanchang"
  | "festivalCalendar"
  | "kpSystem"
  | "remedies";

/**
 * Analysis resource operations
 */
export type AnalysisOperation =
  | "natalReport"
  | "synastryReport"
  | "transitReport"
  | "compositeReport"
  | "solarReturnReport"
  | "lunarReturnReport"
  | "progressionReport"
  | "directionReport"
  | "natalTransitReport"
  | "solarReturnTransitReport"
  | "lunarReturnTransitReport"
  | "lunarAnalysis"
  | "compatibility"
  | "compatibilityScore"
  | "relationship"
  | "relationshipScore"
  | "career"
  | "vocational"
  | "health"
  | "psychological"
  | "spiritual"
  | "karmic"
  | "predictive"
  | "relocation";

/**
 * Render resource operations
 */
export type RenderOperation = "natal" | "transit" | "synastry" | "composite";

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

/**
 * DateTime location structure for Lunar API requests
 */
export interface IDateTimeLocation {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second?: number;
  city?: string;
  country_code?: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
}

/**
 * Vedic chart style
 */
export type VedicChartStyle = "north_indian" | "south_indian";

/**
 * Vedic ayanamsa types
 */
export type VedicAyanamsa =
  | "lahiri"
  | "krishnamurti"
  | "raman"
  | "yukteshwar"
  | "jn_bhasin"
  | "fagan_bradley"
  | "true_citra"
  | "true_revati"
  | "true_pushya"
  | "galactic_center_0_sag"
  | "sassanian"
  | "ushashashi";

/**
 * Vedic divisional chart types
 */
export type VedicDivisionalChart =
  | "D1"
  | "D2"
  | "D3"
  | "D4"
  | "D7"
  | "D9"
  | "D10"
  | "D12"
  | "D16"
  | "D20"
  | "D24"
  | "D27"
  | "D30"
  | "D40"
  | "D45"
  | "D60";

/**
 * Render output format
 */
export type RenderFormat = "svg" | "png" | "jpg" | "webp" | "pdf";

/**
 * Render theme
 */
export type RenderTheme =
  | "light"
  | "dark"
  | "classic"
  | "modern_light"
  | "traditional";
