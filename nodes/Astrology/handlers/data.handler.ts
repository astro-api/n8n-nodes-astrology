import type { IDataObject } from "n8n-workflow";
import type { IHandlerContext, DataOperation } from "../interfaces/types";
import {
  buildBirthData,
  makeApiRequest,
  createSubjectRequest,
  applySimplifyIfEnabled,
} from "../shared";

/**
 * Endpoint mapping for data operations
 */
const DATA_ENDPOINTS: Record<DataOperation, string> = {
  now: "/api/v3/data/now",
  positions: "/api/v3/data/positions",
  positionsEnhanced: "/api/v3/data/positions/enhanced",
  houseCusps: "/api/v3/data/house-cusps",
  aspects: "/api/v3/data/aspects",
  aspectsEnhanced: "/api/v3/data/aspects/enhanced",
  lunarMetrics: "/api/v3/data/lunar-metrics",
  lunarMetricsEnhanced: "/api/v3/data/lunar-metrics/enhanced",
  globalPositions: "/api/v3/data/global-positions",
};

/**
 * Handles all data resource operations
 *
 * @param context - Handler context with execution functions and credentials
 * @param operation - The operation to execute
 * @returns API response data
 */
export async function handleDataResource(
  context: IHandlerContext,
  operation: string,
): Promise<IDataObject> {
  const { executeFunctions, itemIndex, baseUrl, apiKey } = context;
  const op = operation as DataOperation;

  // "now" operation doesn't require birth data
  if (op === "now") {
    return await makeApiRequest(
      executeFunctions,
      "GET",
      baseUrl,
      DATA_ENDPOINTS.now,
      apiKey,
    );
  }

  // "globalPositions" requires only datetime, no location
  if (op === "globalPositions") {
    const year = executeFunctions.getNodeParameter("year", itemIndex) as number;
    const month = executeFunctions.getNodeParameter(
      "month",
      itemIndex,
    ) as number;
    const day = executeFunctions.getNodeParameter("day", itemIndex) as number;
    const hour = executeFunctions.getNodeParameter("hour", itemIndex) as number;
    const minute = executeFunctions.getNodeParameter(
      "minute",
      itemIndex,
    ) as number;

    // Create ISO datetime string
    const datetime = new Date(
      Date.UTC(year, month - 1, day, hour, minute),
    ).toISOString();
    const body: IDataObject = { datetime };

    const responseData = await makeApiRequest(
      executeFunctions,
      "POST",
      baseUrl,
      DATA_ENDPOINTS.globalPositions,
      apiKey,
      body,
    );

    return applySimplifyIfEnabled(executeFunctions, itemIndex, responseData);
  }

  // All other operations require birth data with location
  const birthData = buildBirthData(executeFunctions, itemIndex);
  const body = createSubjectRequest(birthData);
  const endpoint = DATA_ENDPOINTS[op] || DATA_ENDPOINTS.positions;

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
