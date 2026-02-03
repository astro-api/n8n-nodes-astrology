import type { IDataObject } from "n8n-workflow";
import type { IHandlerContext, ZiweiOperation } from "../interfaces/types";
import {
  buildBirthData,
  makeApiRequest,
  applySimplifyIfEnabled,
} from "../shared/helpers";

/**
 * Endpoint mapping for ziwei operations
 */
const ZIWEI_ENDPOINTS: Record<ZiweiOperation, string> = {
  chart: "/api/v3/ziwei/chart",
};

/**
 * Handles all ziwei resource operations
 *
 * @param context - Handler context with execution functions and credentials
 * @param operation - The operation to execute
 * @returns API response data
 */
export async function handleZiweiResource(
  context: IHandlerContext,
  operation: string,
): Promise<IDataObject> {
  const { executeFunctions, itemIndex, baseUrl, apiKey } = context;
  const op = operation as ZiweiOperation;

  const endpoint = ZIWEI_ENDPOINTS[op] || ZIWEI_ENDPOINTS.chart;

  // Build birth data
  const birthData = buildBirthData(executeFunctions, itemIndex);

  // Get additional parameters
  const name = executeFunctions.getNodeParameter(
    "name",
    itemIndex,
    "",
  ) as string;

  const gender = executeFunctions.getNodeParameter(
    "gender",
    itemIndex,
    "male",
  ) as string;

  const language = executeFunctions.getNodeParameter(
    "language",
    itemIndex,
    "en",
  ) as string;

  // Build request body
  const body: IDataObject = {
    birth_data: birthData,
    gender,
    language,
  };

  if (name) {
    body.name = name;
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
