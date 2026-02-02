import type { IDataObject } from "n8n-workflow";
import type { IHandlerContext, NumerologyOperation } from "../interfaces/types";
import {
  makeApiRequest,
  applySimplifyIfEnabled,
  buildSecondSubjectBirthData,
} from "../shared";

/**
 * Endpoint mapping for Numerology operations
 */
const NUMEROLOGY_ENDPOINTS: Record<NumerologyOperation, string> = {
  coreNumbers: "/api/v3/numerology/core-numbers",
  comprehensive: "/api/v3/numerology/comprehensive",
  compatibility: "/api/v3/numerology/compatibility",
};

/**
 * Handles all Numerology resource operations
 *
 * @param context - Handler context with execution functions and credentials
 * @param operation - The operation to execute
 * @returns API response data
 */
export async function handleNumerologyResource(
  context: IHandlerContext,
  operation: string,
): Promise<IDataObject> {
  const op = operation as NumerologyOperation;

  switch (op) {
    case "coreNumbers":
      return handleCoreNumbers(context);
    case "comprehensive":
      return handleComprehensive(context);
    case "compatibility":
      return handleCompatibility(context);
    default:
      throw new Error(
        `The operation '${operation}' is not supported for the numerology resource`,
      );
  }
}

/**
 * Builds numerology birth data (date only, no time/location)
 */
function buildNumerologyBirthData(context: IHandlerContext): IDataObject {
  const { executeFunctions, itemIndex } = context;

  return {
    year: executeFunctions.getNodeParameter("year", itemIndex) as number,
    month: executeFunctions.getNodeParameter("month", itemIndex) as number,
    day: executeFunctions.getNodeParameter("day", itemIndex) as number,
  };
}

/**
 * Handles core numbers calculation (POST)
 */
async function handleCoreNumbers(
  context: IHandlerContext,
): Promise<IDataObject> {
  const { executeFunctions, itemIndex, baseUrl, apiKey } = context;

  // Get subject data
  const subjectName = executeFunctions.getNodeParameter(
    "subjectName",
    itemIndex,
  ) as string;
  const birthData = buildNumerologyBirthData(context);

  // Get options
  const language = executeFunctions.getNodeParameter(
    "language",
    itemIndex,
    "en",
  ) as string;
  const includeInterpretations = executeFunctions.getNodeParameter(
    "includeInterpretations",
    itemIndex,
    true,
  ) as boolean;

  // Build request body
  const body: IDataObject = {
    subject: {
      name: subjectName,
      birth_data: birthData,
    },
    options: {
      language,
      include_interpretations: includeInterpretations,
    },
  };

  const responseData = await makeApiRequest(
    executeFunctions,
    "POST",
    baseUrl,
    NUMEROLOGY_ENDPOINTS.coreNumbers,
    apiKey,
    body,
  );

  return applySimplifyIfEnabled(executeFunctions, itemIndex, responseData);
}

/**
 * Handles comprehensive reading (POST)
 */
async function handleComprehensive(
  context: IHandlerContext,
): Promise<IDataObject> {
  const { executeFunctions, itemIndex, baseUrl, apiKey } = context;

  // Get subject data
  const subjectName = executeFunctions.getNodeParameter(
    "subjectName",
    itemIndex,
  ) as string;
  const birthData = buildNumerologyBirthData(context);

  // Get options
  const language = executeFunctions.getNodeParameter(
    "language",
    itemIndex,
    "en",
  ) as string;
  const includeInterpretations = executeFunctions.getNodeParameter(
    "includeInterpretations",
    itemIndex,
    true,
  ) as boolean;

  // Build request body
  const body: IDataObject = {
    subject: {
      name: subjectName,
      birth_data: birthData,
    },
    options: {
      language,
      include_interpretations: includeInterpretations,
    },
  };

  const responseData = await makeApiRequest(
    executeFunctions,
    "POST",
    baseUrl,
    NUMEROLOGY_ENDPOINTS.comprehensive,
    apiKey,
    body,
  );

  return applySimplifyIfEnabled(executeFunctions, itemIndex, responseData);
}

/**
 * Handles compatibility analysis (POST with two subjects)
 */
async function handleCompatibility(
  context: IHandlerContext,
): Promise<IDataObject> {
  const { executeFunctions, itemIndex, baseUrl, apiKey } = context;

  // Get subject 1 data
  const subjectName1 = executeFunctions.getNodeParameter(
    "subjectName",
    itemIndex,
  ) as string;
  const birthData1 = buildNumerologyBirthData(context);

  // Get subject 2 data
  const subjectName2 = executeFunctions.getNodeParameter(
    "subject2Name",
    itemIndex,
  ) as string;
  const birthData2 = buildSecondSubjectBirthData(
    executeFunctions,
    itemIndex,
    true,
  );

  // Get options
  const language = executeFunctions.getNodeParameter(
    "language",
    itemIndex,
    "en",
  ) as string;
  const includeInterpretations = executeFunctions.getNodeParameter(
    "includeInterpretations",
    itemIndex,
    true,
  ) as boolean;

  // Build request body
  const body: IDataObject = {
    subjects: [
      {
        name: subjectName1,
        birth_data: birthData1,
      },
      {
        name: subjectName2,
        birth_data: birthData2,
      },
    ],
    options: {
      language,
      include_interpretations: includeInterpretations,
    },
  };

  const responseData = await makeApiRequest(
    executeFunctions,
    "POST",
    baseUrl,
    NUMEROLOGY_ENDPOINTS.compatibility,
    apiKey,
    body,
  );

  return applySimplifyIfEnabled(executeFunctions, itemIndex, responseData);
}
