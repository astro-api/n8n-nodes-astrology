import type { IDataObject } from "n8n-workflow";
import type { IHandlerContext } from "../interfaces/types";
import {
  buildBirthData,
  makeApiRequest,
  createSubjectRequest,
} from "../shared";

/**
 * Handles all horoscope resource operations
 *
 * @param context - Handler context with execution functions and credentials
 * @param operation - The operation to execute
 * @returns API response data
 */
export async function handleHoroscopeResource(
  context: IHandlerContext,
  operation: string,
): Promise<IDataObject> {
  // Sign-based operations (signDaily, signDailyText, etc.)
  if (operation.startsWith("sign")) {
    return await handleSignOperation(context, operation);
  }

  // Personal operations (personalDaily, personalDailyText, etc.)
  if (operation.startsWith("personal")) {
    return await handlePersonalOperation(context, operation);
  }

  // Chinese Bazi
  if (operation === "chineseBazi") {
    return await handleChineseBaziOperation(context);
  }

  throw new Error(`Operation "${operation}" is not supported for horoscope`);
}

/**
 * Handles sign-based horoscope operations
 */
async function handleSignOperation(
  context: IHandlerContext,
  operation: string,
): Promise<IDataObject> {
  const { executeFunctions, itemIndex, baseUrl, apiKey } = context;

  const sign = executeFunctions.getNodeParameter("sign", itemIndex) as string;
  const language = executeFunctions.getNodeParameter(
    "language",
    itemIndex,
  ) as string;
  const targetDate = executeFunctions.getNodeParameter(
    "targetDate",
    itemIndex,
  ) as string;
  const tradition = executeFunctions.getNodeParameter(
    "tradition",
    itemIndex,
  ) as string;
  const isTextOperation = operation.endsWith("Text");

  // Extract period from operation name (e.g., signDaily -> daily, signDailyText -> daily)
  const period = operation
    .replace("sign", "")
    .replace("Text", "")
    .toLowerCase();

  let endpoint = `/api/v3/horoscope/sign/${period}`;
  if (isTextOperation) {
    endpoint += "/text";
  }

  const body: IDataObject = {
    sign,
    language,
    tradition,
  };

  if (targetDate) {
    body.date = targetDate;
  }

  // Add text-specific options
  if (isTextOperation) {
    body.format = executeFunctions.getNodeParameter(
      "textFormat",
      itemIndex,
    ) as string;
    body.emoji = executeFunctions.getNodeParameter(
      "emoji",
      itemIndex,
    ) as boolean;
  }

  return await makeApiRequest(
    executeFunctions,
    "POST",
    baseUrl,
    endpoint,
    apiKey,
    body,
  );
}

/**
 * Handles personal horoscope operations
 */
async function handlePersonalOperation(
  context: IHandlerContext,
  operation: string,
): Promise<IDataObject> {
  const { executeFunctions, itemIndex, baseUrl, apiKey } = context;

  const birthData = buildBirthData(executeFunctions, itemIndex);
  const language = executeFunctions.getNodeParameter(
    "language",
    itemIndex,
  ) as string;
  const targetDate = executeFunctions.getNodeParameter(
    "targetDate",
    itemIndex,
  ) as string;
  const tradition = executeFunctions.getNodeParameter(
    "tradition",
    itemIndex,
  ) as string;
  const isTextOperation = operation.endsWith("Text");

  // Extract period from operation name
  const period = operation
    .replace("personal", "")
    .replace("Text", "")
    .toLowerCase();

  let endpoint = `/api/v3/horoscope/personal/${period}`;
  if (isTextOperation) {
    endpoint += "/text";
  }

  const additionalFields: IDataObject = {
    language,
    tradition,
  };

  if (targetDate) {
    additionalFields.target_date = targetDate;
  }

  // Add text-specific options
  if (isTextOperation) {
    additionalFields.format = executeFunctions.getNodeParameter(
      "textFormat",
      itemIndex,
    ) as string;
    additionalFields.emoji = executeFunctions.getNodeParameter(
      "emoji",
      itemIndex,
    ) as boolean;
  }

  const body = createSubjectRequest(birthData, additionalFields);

  return await makeApiRequest(
    executeFunctions,
    "POST",
    baseUrl,
    endpoint,
    apiKey,
    body,
  );
}

/**
 * Handles Chinese Bazi operation
 */
async function handleChineseBaziOperation(
  context: IHandlerContext,
): Promise<IDataObject> {
  const { executeFunctions, itemIndex, baseUrl, apiKey } = context;

  const birthData = buildBirthData(executeFunctions, itemIndex);
  const baziYear = executeFunctions.getNodeParameter(
    "baziYear",
    itemIndex,
  ) as number;
  const language = executeFunctions.getNodeParameter(
    "language",
    itemIndex,
  ) as string;

  const body = createSubjectRequest(birthData, {
    year: baziYear,
    language,
  });

  return await makeApiRequest(
    executeFunctions,
    "POST",
    baseUrl,
    "/api/v3/horoscope/chinese/bazi",
    apiKey,
    body,
  );
}
