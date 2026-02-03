import type { IDataObject } from "n8n-workflow";
import type { IHandlerContext, EnhancedOperation } from "../interfaces/types";
import {
  buildBirthData,
  makeApiRequest,
  applySimplifyIfEnabled,
} from "../shared/helpers";

/**
 * Endpoint mapping for enhanced operations
 */
const ENHANCED_ENDPOINTS: Record<EnhancedOperation, string> = {
  personalAnalysis: "/api/v3/enhanced/personal-analysis",
  globalAnalysis: "/api/v3/enhanced/global-analysis",
  chartsPersonalAnalysis: "/api/v3/enhanced_charts/personal-analysis",
  chartsGlobalAnalysis: "/api/v3/enhanced_charts/global-analysis",
};

/**
 * Operations that require birth data
 */
const BIRTH_DATA_OPERATIONS: EnhancedOperation[] = [
  "personalAnalysis",
  "chartsPersonalAnalysis",
];

/**
 * Global operations (no birth data required)
 */
const GLOBAL_OPERATIONS: EnhancedOperation[] = [
  "globalAnalysis",
  "chartsGlobalAnalysis",
];

/**
 * Handles all enhanced resource operations
 *
 * @param context - Handler context with execution functions and credentials
 * @param operation - The operation to execute
 * @returns API response data
 */
export async function handleEnhancedResource(
  context: IHandlerContext,
  operation: string,
): Promise<IDataObject> {
  const { executeFunctions, itemIndex, baseUrl, apiKey } = context;
  const op = operation as EnhancedOperation;

  const endpoint =
    ENHANCED_ENDPOINTS[op] || ENHANCED_ENDPOINTS.personalAnalysis;

  // Global operations (no birth data)
  if (GLOBAL_OPERATIONS.includes(op)) {
    const body: IDataObject = {};

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

  // Personal operations (with birth data)
  if (BIRTH_DATA_OPERATIONS.includes(op)) {
    const birthData = buildBirthData(executeFunctions, itemIndex);

    const name = executeFunctions.getNodeParameter(
      "name",
      itemIndex,
      "",
    ) as string;

    const houseSystem = executeFunctions.getNodeParameter(
      "houseSystem",
      itemIndex,
      "whole_sign",
    ) as string;

    const includeFixedStars = executeFunctions.getNodeParameter(
      "includeFixedStars",
      itemIndex,
      true,
    ) as boolean;

    const includeTraditional = executeFunctions.getNodeParameter(
      "includeTraditional",
      itemIndex,
      true,
    ) as boolean;

    // Build subject
    const subject: IDataObject = {
      birth_data: birthData,
    };

    if (name) {
      subject.name = name;
    }

    // Build options
    const options: IDataObject = {
      house_system: houseSystem,
      include_fixed_stars: includeFixedStars,
      include_traditional: includeTraditional,
    };

    const body: IDataObject = {
      subject,
      options,
    };

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

  // Fallback
  const responseData = await makeApiRequest(
    executeFunctions,
    "POST",
    baseUrl,
    endpoint,
    apiKey,
    {},
  );

  return applySimplifyIfEnabled(executeFunctions, itemIndex, responseData);
}
