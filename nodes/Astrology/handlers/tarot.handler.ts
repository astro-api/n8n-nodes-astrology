import { NodeOperationError } from "n8n-workflow";
import type { IDataObject, IExecuteFunctions } from "n8n-workflow";
import type { IHandlerContext, TarotOperation } from "../interfaces/types";
import {
  buildBirthData,
  makeApiRequest,
  applySimplifyIfEnabled,
  buildSecondSubjectBirthData,
} from "../shared";

/**
 * Endpoint mapping for Tarot operations
 */
const TAROT_ENDPOINTS: Record<TarotOperation, string> = {
  // Glossary (GET)
  glossaryCards: "/api/v3/tarot/glossary/cards",
  glossarySpreads: "/api/v3/tarot/glossary/spreads",
  glossaryCardDetail: "/api/v3/tarot/glossary/cards/{card_id}",
  searchCards: "/api/v3/tarot/cards/search",
  dailyCard: "/api/v3/tarot/cards/daily",
  // Draw (POST)
  drawCards: "/api/v3/tarot/cards/draw",
  // Reports (POST)
  reportSingle: "/api/v3/tarot/reports/single",
  reportThreeCard: "/api/v3/tarot/reports/three-card",
  reportCelticCross: "/api/v3/tarot/reports/celtic-cross",
  reportSynastry: "/api/v3/tarot/reports/synastry",
  reportHouses: "/api/v3/tarot/reports/houses",
  reportTreeOfLife: "/api/v3/tarot/reports/tree-of-life",
  // Analysis (POST)
  analysisQuintessence: "/api/v3/tarot/analysis/quintessence",
  analysisBirthCards: "/api/v3/tarot/analysis/birth-cards",
  analysisDignities: "/api/v3/tarot/analysis/dignities",
  analysisTiming: "/api/v3/tarot/analysis/timing",
  analysisOptimalTimes: "/api/v3/tarot/analysis/optimal-times",
  analysisTransitReport: "/api/v3/tarot/analysis/transit-report",
  analysisNatalReport: "/api/v3/tarot/analysis/natal-report",
};

/**
 * Handles all Tarot resource operations
 */
export async function handleTarotResource(
  context: IHandlerContext,
  operation: string,
): Promise<IDataObject> {
  const op = operation as TarotOperation;

  switch (op) {
    // Glossary operations (GET)
    case "glossaryCards":
      return handleGlossaryCards(context);
    case "glossarySpreads":
      return handleGlossarySpreads(context);
    case "glossaryCardDetail":
      return handleGlossaryCardDetail(context);
    case "searchCards":
      return handleSearchCards(context);
    case "dailyCard":
      return handleDailyCard(context);

    // Draw operation (POST)
    case "drawCards":
      return handleDrawCards(context);

    // Report operations (POST)
    case "reportSingle":
    case "reportThreeCard":
    case "reportCelticCross":
    case "reportHouses":
    case "reportTreeOfLife":
      return handleReport(context, op);
    case "reportSynastry":
      return handleReportSynastry(context);

    // Analysis operations (POST)
    case "analysisQuintessence":
    case "analysisDignities":
    case "analysisTiming":
      return handleAnalysisWithCards(context, op);
    case "analysisBirthCards":
      return handleAnalysisBirthCards(context);
    case "analysisOptimalTimes":
      return handleAnalysisOptimalTimes(context);
    case "analysisTransitReport":
      return handleAnalysisTransitReport(context);
    case "analysisNatalReport":
      return handleAnalysisNatalReport(context);

    default:
      throw new NodeOperationError(
        context.executeFunctions.getNode(),
        `The operation '${operation}' is not supported for the tarot resource`,
        { itemIndex: context.itemIndex },
      );
  }
}

/**
 * Builds common tarot options from node parameters
 */
function buildTarotOptions(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
): IDataObject {
  return {
    use_reversals: executeFunctions.getNodeParameter(
      "useReversals",
      itemIndex,
      true,
    ) as boolean,
    tradition: executeFunctions.getNodeParameter(
      "tradition",
      itemIndex,
      "universal",
    ) as string,
    include_dignities: executeFunctions.getNodeParameter(
      "includeDignities",
      itemIndex,
      false,
    ) as boolean,
    include_timing: executeFunctions.getNodeParameter(
      "includeTiming",
      itemIndex,
      false,
    ) as boolean,
    include_astro_context: executeFunctions.getNodeParameter(
      "includeAstroContext",
      itemIndex,
      false,
    ) as boolean,
    include_birth_cards: executeFunctions.getNodeParameter(
      "includeBirthCards",
      itemIndex,
      false,
    ) as boolean,
    interpretation_depth: executeFunctions.getNodeParameter(
      "interpretationDepth",
      itemIndex,
      "detailed",
    ) as string,
    language: executeFunctions.getNodeParameter(
      "language",
      itemIndex,
      "en",
    ) as string,
  };
}

/**
 * Handles glossary cards request (GET with filters)
 */
async function handleGlossaryCards(
  context: IHandlerContext,
): Promise<IDataObject> {
  const { executeFunctions, itemIndex, baseUrl, apiKey } = context;

  // Build query parameters from filters
  const params: string[] = [];

  const arcana = executeFunctions.getNodeParameter(
    "arcana",
    itemIndex,
    "",
  ) as string;
  if (arcana) params.push(`arcana=${arcana}`);

  const suit = executeFunctions.getNodeParameter(
    "suit",
    itemIndex,
    "",
  ) as string;
  if (suit) params.push(`suit=${suit}`);

  const element = executeFunctions.getNodeParameter(
    "element",
    itemIndex,
    "",
  ) as string;
  if (element) params.push(`element=${element}`);

  const planet = executeFunctions.getNodeParameter(
    "planet",
    itemIndex,
    "",
  ) as string;
  if (planet) params.push(`planet=${planet}`);

  const sign = executeFunctions.getNodeParameter(
    "sign",
    itemIndex,
    "",
  ) as string;
  if (sign) params.push(`sign=${sign}`);

  const house = executeFunctions.getNodeParameter(
    "house",
    itemIndex,
    0,
  ) as number;
  if (house > 0) params.push(`house=${house}`);

  const queryString = params.length > 0 ? `?${params.join("&")}` : "";
  const endpoint = `${TAROT_ENDPOINTS.glossaryCards}${queryString}`;

  return await makeApiRequest(
    executeFunctions,
    "GET",
    baseUrl,
    endpoint,
    apiKey,
  );
}

/**
 * Handles glossary spreads request (GET)
 */
async function handleGlossarySpreads(
  context: IHandlerContext,
): Promise<IDataObject> {
  const { executeFunctions, baseUrl, apiKey } = context;

  return await makeApiRequest(
    executeFunctions,
    "GET",
    baseUrl,
    TAROT_ENDPOINTS.glossarySpreads,
    apiKey,
  );
}

/**
 * Handles glossary card detail request (GET with path parameter)
 */
async function handleGlossaryCardDetail(
  context: IHandlerContext,
): Promise<IDataObject> {
  const { executeFunctions, itemIndex, baseUrl, apiKey } = context;

  const cardId = executeFunctions.getNodeParameter(
    "cardId",
    itemIndex,
  ) as string;

  // Replace path parameter
  const endpoint = TAROT_ENDPOINTS.glossaryCardDetail.replace(
    "{card_id}",
    encodeURIComponent(cardId),
  );

  return await makeApiRequest(
    executeFunctions,
    "GET",
    baseUrl,
    endpoint,
    apiKey,
  );
}

/**
 * Handles search cards request (GET with pagination and filters)
 */
async function handleSearchCards(
  context: IHandlerContext,
): Promise<IDataObject> {
  const { executeFunctions, itemIndex, baseUrl, apiKey } = context;

  // Build query parameters
  const params: string[] = [];

  const keyword = executeFunctions.getNodeParameter(
    "keyword",
    itemIndex,
    "",
  ) as string;
  if (keyword) params.push(`keyword=${encodeURIComponent(keyword)}`);

  const lifeArea = executeFunctions.getNodeParameter(
    "lifeArea",
    itemIndex,
    "",
  ) as string;
  if (lifeArea) params.push(`life_area=${encodeURIComponent(lifeArea)}`);

  const arcana = executeFunctions.getNodeParameter(
    "arcana",
    itemIndex,
    "",
  ) as string;
  if (arcana) params.push(`arcana=${arcana}`);

  const suit = executeFunctions.getNodeParameter(
    "suit",
    itemIndex,
    "",
  ) as string;
  if (suit) params.push(`suit=${suit}`);

  const element = executeFunctions.getNodeParameter(
    "element",
    itemIndex,
    "",
  ) as string;
  if (element) params.push(`element=${element}`);

  const planet = executeFunctions.getNodeParameter(
    "planet",
    itemIndex,
    "",
  ) as string;
  if (planet) params.push(`planet=${planet}`);

  const sign = executeFunctions.getNodeParameter(
    "sign",
    itemIndex,
    "",
  ) as string;
  if (sign) params.push(`sign=${sign}`);

  const page = executeFunctions.getNodeParameter(
    "page",
    itemIndex,
    1,
  ) as number;
  params.push(`page=${page}`);

  const pageSize = executeFunctions.getNodeParameter(
    "pageSize",
    itemIndex,
    20,
  ) as number;
  params.push(`page_size=${pageSize}`);

  const queryString = params.length > 0 ? `?${params.join("&")}` : "";
  const endpoint = `${TAROT_ENDPOINTS.searchCards}${queryString}`;

  return await makeApiRequest(
    executeFunctions,
    "GET",
    baseUrl,
    endpoint,
    apiKey,
  );
}

/**
 * Handles daily card request (GET with user_id)
 */
async function handleDailyCard(context: IHandlerContext): Promise<IDataObject> {
  const { executeFunctions, itemIndex, baseUrl, apiKey } = context;

  const userId = executeFunctions.getNodeParameter(
    "userId",
    itemIndex,
  ) as string;

  const params: string[] = [`user_id=${encodeURIComponent(userId)}`];

  const lifeArea = executeFunctions.getNodeParameter(
    "lifeArea",
    itemIndex,
    "",
  ) as string;
  if (lifeArea) params.push(`life_area=${encodeURIComponent(lifeArea)}`);

  // Optional birth data for personalization
  try {
    const year = executeFunctions.getNodeParameter(
      "year",
      itemIndex,
      0,
    ) as number;
    if (year > 0) {
      params.push(`birth_year=${year}`);
      const month = executeFunctions.getNodeParameter(
        "month",
        itemIndex,
        0,
      ) as number;
      if (month > 0) params.push(`birth_month=${month}`);
      const day = executeFunctions.getNodeParameter(
        "day",
        itemIndex,
        0,
      ) as number;
      if (day > 0) params.push(`birth_day=${day}`);
      const hour = executeFunctions.getNodeParameter(
        "hour",
        itemIndex,
        0,
      ) as number;
      if (hour > 0) params.push(`birth_hour=${hour}`);
      const minute = executeFunctions.getNodeParameter(
        "minute",
        itemIndex,
        0,
      ) as number;
      if (minute > 0) params.push(`birth_minute=${minute}`);
    }
  } catch {
    // Birth data fields are optional, ignore if not provided
  }

  const queryString = `?${params.join("&")}`;
  const endpoint = `${TAROT_ENDPOINTS.dailyCard}${queryString}`;

  return await makeApiRequest(
    executeFunctions,
    "GET",
    baseUrl,
    endpoint,
    apiKey,
  );
}

/**
 * Handles draw cards request (POST)
 */
async function handleDrawCards(context: IHandlerContext): Promise<IDataObject> {
  const { executeFunctions, itemIndex, baseUrl, apiKey } = context;

  const count = executeFunctions.getNodeParameter(
    "drawCount",
    itemIndex,
    1,
  ) as number;
  const excludeReversed = executeFunctions.getNodeParameter(
    "excludeReversed",
    itemIndex,
    false,
  ) as boolean;
  const excludeMajors = executeFunctions.getNodeParameter(
    "excludeMajors",
    itemIndex,
    false,
  ) as boolean;
  const excludeMinors = executeFunctions.getNodeParameter(
    "excludeMinors",
    itemIndex,
    false,
  ) as boolean;
  const lifeArea = executeFunctions.getNodeParameter(
    "lifeArea",
    itemIndex,
    "",
  ) as string;

  const body: IDataObject = {
    count,
    exclude_reversed: excludeReversed,
    exclude_majors: excludeMajors,
    exclude_minors: excludeMinors,
  };

  if (lifeArea) {
    body.life_area = lifeArea;
  }

  const responseData = await makeApiRequest(
    executeFunctions,
    "POST",
    baseUrl,
    TAROT_ENDPOINTS.drawCards,
    apiKey,
    body,
  );

  return applySimplifyIfEnabled(executeFunctions, itemIndex, responseData);
}

/**
 * Handles generic report requests (POST)
 */
async function handleReport(
  context: IHandlerContext,
  op: TarotOperation,
): Promise<IDataObject> {
  const { executeFunctions, itemIndex, baseUrl, apiKey } = context;

  // Build birth data
  const birthData = buildBirthData(executeFunctions, itemIndex);

  // Get options
  const lifeArea = executeFunctions.getNodeParameter(
    "lifeArea",
    itemIndex,
    "",
  ) as string;
  const options = buildTarotOptions(executeFunctions, itemIndex);

  const body: IDataObject = {
    birth_data: birthData,
    ...options,
  };

  if (lifeArea) {
    body.life_area = lifeArea;
  }

  const responseData = await makeApiRequest(
    executeFunctions,
    "POST",
    baseUrl,
    TAROT_ENDPOINTS[op],
    apiKey,
    body,
  );

  return applySimplifyIfEnabled(executeFunctions, itemIndex, responseData);
}

/**
 * Handles synastry report (POST with two subjects)
 */
async function handleReportSynastry(
  context: IHandlerContext,
): Promise<IDataObject> {
  const { executeFunctions, itemIndex, baseUrl, apiKey } = context;

  // Build subject 1 birth data
  const birthData1 = buildBirthData(executeFunctions, itemIndex);

  // Build subject 2 birth data
  const birthData2 = buildSecondSubjectBirthData(executeFunctions, itemIndex);

  // Get options
  const lifeArea = executeFunctions.getNodeParameter(
    "lifeArea",
    itemIndex,
    "",
  ) as string;
  const options = buildTarotOptions(executeFunctions, itemIndex);

  const body: IDataObject = {
    birth_data: birthData1,
    partner_birth_data: birthData2,
    ...options,
  };

  if (lifeArea) {
    body.life_area = lifeArea;
  }

  const responseData = await makeApiRequest(
    executeFunctions,
    "POST",
    baseUrl,
    TAROT_ENDPOINTS.reportSynastry,
    apiKey,
    body,
  );

  return applySimplifyIfEnabled(executeFunctions, itemIndex, responseData);
}

/**
 * Handles analysis operations that require card IDs input
 */
async function handleAnalysisWithCards(
  context: IHandlerContext,
  op: TarotOperation,
): Promise<IDataObject> {
  const { executeFunctions, itemIndex, baseUrl, apiKey } = context;

  // Parse card IDs from comma-separated string
  const cardIdsStr = executeFunctions.getNodeParameter(
    "cardIds",
    itemIndex,
  ) as string;
  const cards = cardIdsStr
    .split(",")
    .map((id) => id.trim())
    .filter((id) => id);

  // Get options
  const options = buildTarotOptions(executeFunctions, itemIndex);

  const body: IDataObject = {
    cards,
    ...options,
  };

  const responseData = await makeApiRequest(
    executeFunctions,
    "POST",
    baseUrl,
    TAROT_ENDPOINTS[op],
    apiKey,
    body,
  );

  return applySimplifyIfEnabled(executeFunctions, itemIndex, responseData);
}

/**
 * Handles birth cards analysis (POST with birth data)
 */
async function handleAnalysisBirthCards(
  context: IHandlerContext,
): Promise<IDataObject> {
  const { executeFunctions, itemIndex, baseUrl, apiKey } = context;

  // Build birth data
  const birthData = buildBirthData(executeFunctions, itemIndex);

  // Get options
  const options = buildTarotOptions(executeFunctions, itemIndex);

  const body: IDataObject = {
    birth_data: birthData,
    ...options,
  };

  const responseData = await makeApiRequest(
    executeFunctions,
    "POST",
    baseUrl,
    TAROT_ENDPOINTS.analysisBirthCards,
    apiKey,
    body,
  );

  return applySimplifyIfEnabled(executeFunctions, itemIndex, responseData);
}

/**
 * Handles optimal times analysis (POST with birth data)
 */
async function handleAnalysisOptimalTimes(
  context: IHandlerContext,
): Promise<IDataObject> {
  const { executeFunctions, itemIndex, baseUrl, apiKey } = context;

  // Get options
  const options = buildTarotOptions(executeFunctions, itemIndex);

  const body: IDataObject = {
    ...options,
  };

  const responseData = await makeApiRequest(
    executeFunctions,
    "POST",
    baseUrl,
    TAROT_ENDPOINTS.analysisOptimalTimes,
    apiKey,
    body,
  );

  return applySimplifyIfEnabled(executeFunctions, itemIndex, responseData);
}

/**
 * Handles transit report analysis (POST with birth data)
 */
async function handleAnalysisTransitReport(
  context: IHandlerContext,
): Promise<IDataObject> {
  const { executeFunctions, itemIndex, baseUrl, apiKey } = context;

  // Build birth data
  const birthData = buildBirthData(executeFunctions, itemIndex);

  // Get options
  const options = buildTarotOptions(executeFunctions, itemIndex);

  const body: IDataObject = {
    birth_data: birthData,
    ...options,
  };

  const responseData = await makeApiRequest(
    executeFunctions,
    "POST",
    baseUrl,
    TAROT_ENDPOINTS.analysisTransitReport,
    apiKey,
    body,
  );

  return applySimplifyIfEnabled(executeFunctions, itemIndex, responseData);
}

/**
 * Handles natal report analysis (POST with birth data)
 */
async function handleAnalysisNatalReport(
  context: IHandlerContext,
): Promise<IDataObject> {
  const { executeFunctions, itemIndex, baseUrl, apiKey } = context;

  // Build birth data
  const birthData = buildBirthData(executeFunctions, itemIndex);

  // Get options
  const options = buildTarotOptions(executeFunctions, itemIndex);

  const body: IDataObject = {
    birth_data: birthData,
    ...options,
  };

  const responseData = await makeApiRequest(
    executeFunctions,
    "POST",
    baseUrl,
    TAROT_ENDPOINTS.analysisNatalReport,
    apiKey,
    body,
  );

  return applySimplifyIfEnabled(executeFunctions, itemIndex, responseData);
}
