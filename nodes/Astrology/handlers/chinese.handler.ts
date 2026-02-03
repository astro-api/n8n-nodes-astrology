import type { IDataObject } from "n8n-workflow";
import type { IHandlerContext, ChineseOperation } from "../interfaces/types";
import {
  buildBirthData,
  buildSecondSubjectBirthData,
  makeApiRequest,
  applySimplifyIfEnabled,
} from "../shared/helpers";

/**
 * Endpoint mapping for chinese operations
 */
const CHINESE_ENDPOINTS: Record<ChineseOperation, string> = {
  zodiacAnimal: "/api/v3/chinese/zodiac", // + /{animal}
  solarTerms: "/api/v3/chinese/calendar/solar-terms", // + /{year}
  elementsBalance: "/api/v3/chinese/elements/balance", // + /{year}
  bazi: "/api/v3/chinese/bazi",
  compatibility: "/api/v3/chinese/compatibility",
  luckPillars: "/api/v3/chinese/luck-pillars",
  mingGua: "/api/v3/chinese/ming-gua",
  yearlyForecast: "/api/v3/chinese/yearly-forecast",
};

/**
 * GET operations with path parameters
 */
const GET_WITH_PATH_OPERATIONS: ChineseOperation[] = [
  "zodiacAnimal",
  "solarTerms",
  "elementsBalance",
];

/**
 * Operations that require birth data
 */
const BIRTH_DATA_OPERATIONS: ChineseOperation[] = [
  "bazi",
  "luckPillars",
  "mingGua",
  "yearlyForecast",
];

/**
 * Handles all chinese resource operations
 *
 * @param context - Handler context with execution functions and credentials
 * @param operation - The operation to execute
 * @returns API response data
 */
export async function handleChineseResource(
  context: IHandlerContext,
  operation: string,
): Promise<IDataObject> {
  const { executeFunctions, itemIndex, baseUrl, apiKey } = context;
  const op = operation as ChineseOperation;

  // GET operations with path parameters
  if (GET_WITH_PATH_OPERATIONS.includes(op)) {
    let endpoint = CHINESE_ENDPOINTS[op];

    if (op === "zodiacAnimal") {
      const animal = executeFunctions.getNodeParameter(
        "zodiacAnimal",
        itemIndex,
        "dragon",
      ) as string;
      endpoint = `${endpoint}/${animal}`;
    } else if (op === "solarTerms" || op === "elementsBalance") {
      const year = executeFunctions.getNodeParameter(
        "chineseYear",
        itemIndex,
        2024,
      ) as number;
      endpoint = `${endpoint}/${year}`;
    }

    const responseData = await makeApiRequest(
      executeFunctions,
      "GET",
      baseUrl,
      endpoint,
      apiKey,
    );

    return applySimplifyIfEnabled(executeFunctions, itemIndex, responseData);
  }

  // Compatibility operation - two subjects
  if (op === "compatibility") {
    const birthData = buildBirthData(executeFunctions, itemIndex);
    const secondBirthData = buildSecondSubjectBirthData(
      executeFunctions,
      itemIndex,
    );

    const language = executeFunctions.getNodeParameter(
      "language",
      itemIndex,
      "en",
    ) as string;

    const body: IDataObject = {
      subject1: {
        birth_data: birthData,
      },
      subject2: {
        birth_data: secondBirthData,
      },
      language,
    };

    const responseData = await makeApiRequest(
      executeFunctions,
      "POST",
      baseUrl,
      CHINESE_ENDPOINTS[op],
      apiKey,
      body,
    );

    return applySimplifyIfEnabled(executeFunctions, itemIndex, responseData);
  }

  // Birth data operations
  if (BIRTH_DATA_OPERATIONS.includes(op)) {
    const birthData = buildBirthData(executeFunctions, itemIndex);

    const language = executeFunctions.getNodeParameter(
      "language",
      itemIndex,
      "en",
    ) as string;

    const body: IDataObject = {
      subject: {
        birth_data: birthData,
      },
      language,
    };

    // BaZi specific options
    if (op === "bazi") {
      const gender = executeFunctions.getNodeParameter(
        "gender",
        itemIndex,
        "male",
      ) as string;

      const includeLuckPillars = executeFunctions.getNodeParameter(
        "includeLuckPillars",
        itemIndex,
        false,
      ) as boolean;

      const includeAnnualPillars = executeFunctions.getNodeParameter(
        "includeAnnualPillars",
        itemIndex,
        false,
      ) as boolean;

      const tradition = executeFunctions.getNodeParameter(
        "chineseTradition",
        itemIndex,
        "classical",
      ) as string;

      const analysisDepth = executeFunctions.getNodeParameter(
        "analysisDepth",
        itemIndex,
        "standard",
      ) as string;

      (body.subject as IDataObject).gender = gender;
      body.include_luck_pillars = includeLuckPillars;
      body.include_annual_pillars = includeAnnualPillars;
      body.tradition = tradition;
      body.analysis_depth = analysisDepth;
    }

    // Luck pillars specific options
    if (op === "luckPillars") {
      const gender = executeFunctions.getNodeParameter(
        "gender",
        itemIndex,
        "male",
      ) as string;
      (body.subject as IDataObject).gender = gender;
    }

    // Yearly forecast specific options
    if (op === "yearlyForecast") {
      const tradition = executeFunctions.getNodeParameter(
        "chineseTradition",
        itemIndex,
        "classical",
      ) as string;

      const analysisDepth = executeFunctions.getNodeParameter(
        "analysisDepth",
        itemIndex,
        "standard",
      ) as string;

      body.tradition = tradition;
      body.analysis_depth = analysisDepth;
    }

    const responseData = await makeApiRequest(
      executeFunctions,
      "POST",
      baseUrl,
      CHINESE_ENDPOINTS[op],
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
    CHINESE_ENDPOINTS[op] || CHINESE_ENDPOINTS.bazi,
    apiKey,
    {},
  );

  return applySimplifyIfEnabled(executeFunctions, itemIndex, responseData);
}
