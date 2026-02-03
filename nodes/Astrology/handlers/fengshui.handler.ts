import type { IDataObject } from "n8n-workflow";
import type { IHandlerContext, FengshuiOperation } from "../interfaces/types";
import { makeApiRequest, applySimplifyIfEnabled } from "../shared/helpers";

/**
 * Endpoint mapping for fengshui operations
 */
const FENGSHUI_ENDPOINTS: Record<FengshuiOperation, string> = {
  flyingStarsChart: "/api/v3/fengshui/flying-stars/chart",
  flyingStarsAnnual: "/api/v3/fengshui/flying-stars/annual",
  afflictions: "/api/v3/fengshui/afflictions",
  glossaryStars: "/api/v3/fengshui/glossary/stars",
};

/**
 * Handles all fengshui resource operations
 *
 * @param context - Handler context with execution functions and credentials
 * @param operation - The operation to execute
 * @returns API response data
 */
export async function handleFengshuiResource(
  context: IHandlerContext,
  operation: string,
): Promise<IDataObject> {
  const { executeFunctions, itemIndex, baseUrl, apiKey } = context;
  const op = operation as FengshuiOperation;

  // Handle glossary stars (GET with language)
  if (op === "glossaryStars") {
    const language = executeFunctions.getNodeParameter(
      "language",
      itemIndex,
      "en",
    ) as string;

    const endpoint = `${FENGSHUI_ENDPOINTS.glossaryStars}?language=${language}`;

    const responseData = await makeApiRequest(
      executeFunctions,
      "GET",
      baseUrl,
      endpoint,
      apiKey,
    );

    return applySimplifyIfEnabled(executeFunctions, itemIndex, responseData);
  }

  // Handle annual endpoints (GET with year)
  if (op === "flyingStarsAnnual" || op === "afflictions") {
    const year = executeFunctions.getNodeParameter(
      "year",
      itemIndex,
      new Date().getFullYear(),
    ) as number;

    const language = executeFunctions.getNodeParameter(
      "language",
      itemIndex,
      "en",
    ) as string;

    const endpoint = `${FENGSHUI_ENDPOINTS[op]}/${year}?language=${language}`;

    const responseData = await makeApiRequest(
      executeFunctions,
      "GET",
      baseUrl,
      endpoint,
      apiKey,
    );

    return applySimplifyIfEnabled(executeFunctions, itemIndex, responseData);
  }

  // Handle Flying Stars chart (POST)
  if (op === "flyingStarsChart") {
    const facingDegrees = executeFunctions.getNodeParameter(
      "facingDegrees",
      itemIndex,
      180,
    ) as number;

    const period = executeFunctions.getNodeParameter(
      "period",
      itemIndex,
      9,
    ) as number;

    const includeAnnual = executeFunctions.getNodeParameter(
      "includeAnnual",
      itemIndex,
      true,
    ) as boolean;

    const includeMonthly = executeFunctions.getNodeParameter(
      "includeMonthly",
      itemIndex,
      false,
    ) as boolean;

    const analysisDate = executeFunctions.getNodeParameter(
      "analysisDate",
      itemIndex,
      "",
    ) as string;

    const language = executeFunctions.getNodeParameter(
      "language",
      itemIndex,
      "en",
    ) as string;

    const body: IDataObject = {
      facing_degrees: facingDegrees,
      period,
      include_annual: includeAnnual,
      include_monthly: includeMonthly,
      language,
    };

    if (analysisDate) {
      body.analysis_date = analysisDate;
    }

    const responseData = await makeApiRequest(
      executeFunctions,
      "POST",
      baseUrl,
      FENGSHUI_ENDPOINTS.flyingStarsChart,
      apiKey,
      body,
    );

    return applySimplifyIfEnabled(executeFunctions, itemIndex, responseData);
  }

  // Fallback
  const responseData = await makeApiRequest(
    executeFunctions,
    "GET",
    baseUrl,
    FENGSHUI_ENDPOINTS.glossaryStars,
    apiKey,
  );

  return applySimplifyIfEnabled(executeFunctions, itemIndex, responseData);
}
