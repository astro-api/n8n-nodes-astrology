import type { IDataObject } from "n8n-workflow";
import type {
  IHandlerContext,
  TraditionalOperation,
} from "../interfaces/types";
import {
  buildBirthData,
  makeApiRequest,
  createSubjectRequest,
  applySimplifyIfEnabled,
} from "../shared/helpers";

/**
 * Endpoint mapping for traditional operations
 */
const TRADITIONAL_ENDPOINTS: Record<TraditionalOperation, string> = {
  capabilities: "/api/v3/traditional/capabilities",
  glossaryTraditionalPoints: "/api/v3/traditional/glossary/traditional-points",
  glossaryDignities: "/api/v3/traditional/glossary/dignities",
  glossaryProfectionHouses: "/api/v3/traditional/glossary/profection-houses",
  analysis: "/api/v3/traditional/analysis",
  annualProfection: "/api/v3/traditional/analysis/annual-profection",
  profectionTimeline: "/api/v3/traditional/analysis/profection-timeline",
  dignities: "/api/v3/traditional/dignities",
  lots: "/api/v3/traditional/lots",
  profections: "/api/v3/traditional/profections",
};

/**
 * GET operations (no body required)
 */
const GET_OPERATIONS: TraditionalOperation[] = [
  "capabilities",
  "glossaryTraditionalPoints",
  "glossaryDignities",
  "glossaryProfectionHouses",
];

/**
 * Operations that require birth data
 */
const BIRTH_DATA_OPERATIONS: TraditionalOperation[] = [
  "analysis",
  "annualProfection",
  "profectionTimeline",
  "dignities",
  "lots",
  "profections",
];

/**
 * Operations that require current age
 */
const AGE_OPERATIONS: TraditionalOperation[] = [
  "annualProfection",
  "profectionTimeline",
  "profections",
];

/**
 * Handles all traditional resource operations
 *
 * @param context - Handler context with execution functions and credentials
 * @param operation - The operation to execute
 * @returns API response data
 */
export async function handleTraditionalResource(
  context: IHandlerContext,
  operation: string,
): Promise<IDataObject> {
  const { executeFunctions, itemIndex, baseUrl, apiKey } = context;
  const op = operation as TraditionalOperation;

  const endpoint = TRADITIONAL_ENDPOINTS[op] || TRADITIONAL_ENDPOINTS.dignities;

  // GET operations - no body
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

  // Birth data operations
  if (BIRTH_DATA_OPERATIONS.includes(op)) {
    const birthData = buildBirthData(executeFunctions, itemIndex);

    const body: IDataObject = {
      ...createSubjectRequest(birthData),
    };

    // Add options for analysis and dignities
    if (op === "analysis" || op === "dignities") {
      const includeAsteroids = executeFunctions.getNodeParameter(
        "includeAsteroids",
        itemIndex,
        false,
      ) as boolean;

      const includeFixedStars = executeFunctions.getNodeParameter(
        "includeFixedStars",
        itemIndex,
        true,
      ) as boolean;

      const majorAspectsOrb = executeFunctions.getNodeParameter(
        "majorAspectsOrb",
        itemIndex,
        2.0,
      ) as number;

      body.options = {
        include_asteroids: includeAsteroids,
        include_fixed_stars: includeFixedStars,
      };

      body.orbs = {
        major_aspects_deg: majorAspectsOrb,
      };
    }

    // Add dignity system for dignities operation
    if (op === "dignities") {
      const dignitySystem = executeFunctions.getNodeParameter(
        "dignitySystem",
        itemIndex,
        "traditional",
      ) as string;

      (body.options as IDataObject).dignity_system = dignitySystem;
    }

    // Add current age for profection operations
    if (AGE_OPERATIONS.includes(op)) {
      const currentAge = executeFunctions.getNodeParameter(
        "currentAge",
        itemIndex,
        30,
      ) as number;

      body.current_age = currentAge;
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
    "POST",
    baseUrl,
    endpoint,
    apiKey,
    {},
  );

  return applySimplifyIfEnabled(executeFunctions, itemIndex, responseData);
}
