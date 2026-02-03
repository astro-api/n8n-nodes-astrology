import type { IDataObject } from "n8n-workflow";
import type { IHandlerContext, FixedStarsOperation } from "../interfaces/types";
import {
  buildBirthData,
  makeApiRequest,
  applySimplifyIfEnabled,
} from "../shared/helpers";

/**
 * Endpoint mapping for fixedStars operations
 */
const FIXED_STARS_ENDPOINTS: Record<FixedStarsOperation, string> = {
  positions: "/api/v3/fixed-stars/positions",
  conjunctions: "/api/v3/fixed-stars/conjunctions",
  report: "/api/v3/fixed-stars/report",
  presets: "/api/v3/fixed-stars/presets",
};

/**
 * GET operations (no body required)
 */
const GET_OPERATIONS: FixedStarsOperation[] = ["presets"];

/**
 * Operations that require birth data
 */
const BIRTH_DATA_OPERATIONS: FixedStarsOperation[] = [
  "positions",
  "conjunctions",
  "report",
];

/**
 * Operations that use orb settings
 */
const ORB_OPERATIONS: FixedStarsOperation[] = ["conjunctions", "report"];

/**
 * Handles all fixedStars resource operations
 *
 * @param context - Handler context with execution functions and credentials
 * @param operation - The operation to execute
 * @returns API response data
 */
export async function handleFixedStarsResource(
  context: IHandlerContext,
  operation: string,
): Promise<IDataObject> {
  const { executeFunctions, itemIndex, baseUrl, apiKey } = context;
  const op = operation as FixedStarsOperation;

  const endpoint = FIXED_STARS_ENDPOINTS[op] || FIXED_STARS_ENDPOINTS.report;

  // GET operations
  if (GET_OPERATIONS.includes(op)) {
    const responseData = await makeApiRequest(
      executeFunctions,
      "GET",
      baseUrl,
      endpoint,
      apiKey,
    );

    return applySimplifyIfEnabled(executeFunctions, itemIndex, responseData);
  }

  // POST operations with birth data
  if (BIRTH_DATA_OPERATIONS.includes(op)) {
    const birthData = buildBirthData(executeFunctions, itemIndex);

    const name = executeFunctions.getNodeParameter(
      "name",
      itemIndex,
      "",
    ) as string;

    const starPresets = executeFunctions.getNodeParameter(
      "starPresets",
      itemIndex,
      ["essential"],
    ) as string[];

    const includeInterpretations = executeFunctions.getNodeParameter(
      "includeStarInterpretations",
      itemIndex,
      true,
    ) as boolean;

    // Build fixed_stars options
    const fixedStarsOptions: IDataObject = {
      presets: starPresets,
      include_interpretations: includeInterpretations,
    };

    // Add orb settings for operations that use them
    if (ORB_OPERATIONS.includes(op)) {
      const conjunctionOrb = executeFunctions.getNodeParameter(
        "conjunctionOrb",
        itemIndex,
        2.0,
      ) as number;

      const oppositionOrb = executeFunctions.getNodeParameter(
        "oppositionOrb",
        itemIndex,
        1.5,
      ) as number;

      fixedStarsOptions.custom_orbs = {
        conjunction: conjunctionOrb,
        opposition: oppositionOrb,
      };
    }

    // Build request body
    const body: IDataObject = {
      subject: {
        birth_data: birthData,
      },
      fixed_stars: fixedStarsOptions,
    };

    // Add name if provided
    if (name) {
      (body.subject as IDataObject).name = name;
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

  // Fallback
  const responseData = await makeApiRequest(
    executeFunctions,
    "GET",
    baseUrl,
    endpoint,
    apiKey,
  );

  return applySimplifyIfEnabled(executeFunctions, itemIndex, responseData);
}
