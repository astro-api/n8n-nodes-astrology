import type { IDataObject } from "n8n-workflow";
import type { IHandlerContext, HoraryOperation } from "../interfaces/types";
import { makeApiRequest, applySimplifyIfEnabled } from "../shared/helpers";

/**
 * Endpoint mapping for horary operations
 */
const HORARY_ENDPOINTS: Record<HoraryOperation, string> = {
  analyze: "/api/v3/horary/analyze",
  aspects: "/api/v3/horary/aspects",
  chart: "/api/v3/horary/chart",
  fertilityAnalysis: "/api/v3/horary/fertility-analysis",
  glossaryCategories: "/api/v3/horary/glossary/categories",
  glossaryConsiderations: "/api/v3/horary/glossary/considerations",
};

/**
 * GET operations (no body required)
 */
const GET_OPERATIONS: HoraryOperation[] = [
  "glossaryCategories",
  "glossaryConsiderations",
];

/**
 * Operations that require question time
 */
const QUESTION_TIME_OPERATIONS: HoraryOperation[] = [
  "analyze",
  "aspects",
  "chart",
  "fertilityAnalysis",
];

/**
 * Operations that require question text
 */
const QUESTION_TEXT_OPERATIONS: HoraryOperation[] = ["analyze", "aspects"];

/**
 * Operations that support question category
 */
const QUESTION_CATEGORY_OPERATIONS: HoraryOperation[] = ["analyze"];

/**
 * Build question time object from node parameters
 */
function buildQuestionTime(context: IHandlerContext): IDataObject {
  const { executeFunctions, itemIndex } = context;

  const year = executeFunctions.getNodeParameter(
    "questionYear",
    itemIndex,
  ) as number;
  const month = executeFunctions.getNodeParameter(
    "questionMonth",
    itemIndex,
  ) as number;
  const day = executeFunctions.getNodeParameter(
    "questionDay",
    itemIndex,
  ) as number;
  const hour = executeFunctions.getNodeParameter(
    "questionHour",
    itemIndex,
  ) as number;
  const minute = executeFunctions.getNodeParameter(
    "questionMinute",
    itemIndex,
  ) as number;
  const city = executeFunctions.getNodeParameter(
    "questionCity",
    itemIndex,
  ) as string;
  const countryCode = executeFunctions.getNodeParameter(
    "questionCountryCode",
    itemIndex,
  ) as string;

  return {
    year,
    month,
    day,
    hour,
    minute,
    city,
    country_code: countryCode,
  };
}

/**
 * Handles all horary resource operations
 *
 * @param context - Handler context with execution functions and credentials
 * @param operation - The operation to execute
 * @returns API response data
 */
export async function handleHoraryResource(
  context: IHandlerContext,
  operation: string,
): Promise<IDataObject> {
  const { executeFunctions, itemIndex, baseUrl, apiKey } = context;
  const op = operation as HoraryOperation;

  const endpoint = HORARY_ENDPOINTS[op] || HORARY_ENDPOINTS.analyze;

  // GET operations
  if (GET_OPERATIONS.includes(op)) {
    const language = executeFunctions.getNodeParameter(
      "language",
      itemIndex,
      "en",
    ) as string;

    const finalEndpoint = `${endpoint}?language=${language}`;

    const responseData = await makeApiRequest(
      executeFunctions,
      "GET",
      baseUrl,
      finalEndpoint,
      apiKey,
    );

    return applySimplifyIfEnabled(executeFunctions, itemIndex, responseData);
  }

  // POST operations with question time
  if (QUESTION_TIME_OPERATIONS.includes(op)) {
    const questionTime = buildQuestionTime(context);

    const language = executeFunctions.getNodeParameter(
      "language",
      itemIndex,
      "en",
    ) as string;

    const includeFixedStars = executeFunctions.getNodeParameter(
      "horaryIncludeFixedStars",
      itemIndex,
      false,
    ) as boolean;

    const body: IDataObject = {
      question_time: questionTime,
      options: {
        include_fixed_stars: includeFixedStars,
        language,
      },
    };

    // Add question text for applicable operations
    if (QUESTION_TEXT_OPERATIONS.includes(op)) {
      const question = executeFunctions.getNodeParameter(
        "question",
        itemIndex,
        "",
      ) as string;
      body.question = question;
    }

    // Add question category for applicable operations
    if (QUESTION_CATEGORY_OPERATIONS.includes(op)) {
      const questionCategory = executeFunctions.getNodeParameter(
        "questionCategory",
        itemIndex,
        "general",
      ) as string;
      body.question_category = questionCategory;
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
