import type { IDataObject } from "n8n-workflow";
import type { IHandlerContext, AnalysisOperation } from "../interfaces/types";
import {
  buildBirthData,
  buildSecondSubjectBirthData,
  buildTransitTime,
  makeApiRequest,
  createSubjectRequest,
  applySimplifyIfEnabled,
} from "../shared/helpers";

/**
 * Endpoint mapping for analysis operations
 */
const ANALYSIS_ENDPOINTS: Record<AnalysisOperation, string> = {
  natalReport: "/api/v3/analysis/natal-report",
  synastryReport: "/api/v3/analysis/synastry-report",
  transitReport: "/api/v3/analysis/transit-report",
  compositeReport: "/api/v3/analysis/composite-report",
  solarReturnReport: "/api/v3/analysis/solar-return-report",
  lunarReturnReport: "/api/v3/analysis/lunar-return-report",
  progressionReport: "/api/v3/analysis/progression-report",
  directionReport: "/api/v3/analysis/direction-report",
  natalTransitReport: "/api/v3/analysis/natal-transit-report",
  solarReturnTransitReport: "/api/v3/analysis/solar-return-transit-report",
  lunarReturnTransitReport: "/api/v3/analysis/lunar-return-transit-report",
  lunarAnalysis: "/api/v3/analysis/lunar-analysis",
  compatibility: "/api/v3/analysis/compatibility",
  compatibilityScore: "/api/v3/analysis/compatibility-score",
  relationship: "/api/v3/analysis/relationship",
  relationshipScore: "/api/v3/analysis/relationship-score",
  career: "/api/v3/analysis/career",
  vocational: "/api/v3/analysis/vocational",
  health: "/api/v3/analysis/health",
  psychological: "/api/v3/analysis/psychological",
  spiritual: "/api/v3/analysis/spiritual",
  karmic: "/api/v3/analysis/karmic",
  predictive: "/api/v3/analysis/predictive",
  relocation: "/api/v3/analysis/relocation",
};

/**
 * Operations that require two subjects
 */
const TWO_SUBJECT_OPERATIONS: AnalysisOperation[] = [
  "synastryReport",
  "compositeReport",
  "compatibility",
  "compatibilityScore",
  "relationship",
  "relationshipScore",
];

/**
 * Operations that require transit time
 */
const TRANSIT_OPERATIONS: AnalysisOperation[] = [
  "transitReport",
  "natalTransitReport",
  "solarReturnTransitReport",
  "lunarReturnTransitReport",
];

/**
 * Builds report options from node parameters
 */
function buildReportOptions(context: IHandlerContext): IDataObject {
  const { executeFunctions, itemIndex } = context;

  const reportOptions: IDataObject = {};

  // Tradition (Western/Vedic)
  const tradition = executeFunctions.getNodeParameter(
    "tradition",
    itemIndex,
    "western",
  ) as string;
  if (tradition) {
    reportOptions.tradition = tradition;
  }

  // Language
  const language = executeFunctions.getNodeParameter(
    "language",
    itemIndex,
    "en",
  ) as string;
  if (language) {
    reportOptions.language = language;
  }

  return reportOptions;
}

/**
 * Handles all analysis resource operations
 *
 * @param context - Handler context with execution functions and credentials
 * @param operation - The operation to execute
 * @returns API response data
 */
export async function handleAnalysisResource(
  context: IHandlerContext,
  operation: string,
): Promise<IDataObject> {
  const { executeFunctions, itemIndex, baseUrl, apiKey } = context;
  const op = operation as AnalysisOperation;

  const birthData = buildBirthData(executeFunctions, itemIndex);
  const reportOptions = buildReportOptions(context);
  const includeAspectPatterns = executeFunctions.getNodeParameter(
    "includeAspectPatterns",
    itemIndex,
    false,
  ) as boolean;

  const endpoint = ANALYSIS_ENDPOINTS[op] || ANALYSIS_ENDPOINTS.natalReport;

  let body: IDataObject;

  // Two-subject operations
  if (TWO_SUBJECT_OPERATIONS.includes(op)) {
    const secondBirthData = buildSecondSubjectBirthData(
      executeFunctions,
      itemIndex,
    );
    body = {
      subject1: {
        birth_data: birthData,
      },
      subject2: {
        birth_data: secondBirthData,
      },
      report_options: reportOptions,
      include_aspect_patterns: includeAspectPatterns,
    };
  }
  // Transit operations
  else if (TRANSIT_OPERATIONS.includes(op)) {
    const transitTime = buildTransitTime(executeFunctions, itemIndex);

    // Check if date range is provided
    let startDate: string | undefined;
    let endDate: string | undefined;

    try {
      startDate = executeFunctions.getNodeParameter(
        "startDate",
        itemIndex,
        "",
      ) as string;
      endDate = executeFunctions.getNodeParameter(
        "endDate",
        itemIndex,
        "",
      ) as string;
    } catch {
      // Date range fields may not be available for all transit operations
    }

    body = {
      ...createSubjectRequest(birthData),
      transit_time: {
        datetime: transitTime,
      },
      report_options: reportOptions,
      include_aspect_patterns: includeAspectPatterns,
    };

    if (startDate && endDate) {
      body.start_date = startDate;
      body.end_date = endDate;
    }
  }
  // Single subject operations
  else {
    body = {
      ...createSubjectRequest(birthData),
      report_options: reportOptions,
      include_aspect_patterns: includeAspectPatterns,
    };
  }

  const responseData = await makeApiRequest(
    executeFunctions,
    "POST",
    baseUrl,
    endpoint,
    apiKey,
    body,
  );

  return applySimplifyIfEnabled(executeFunctions, itemIndex, responseData);
}
