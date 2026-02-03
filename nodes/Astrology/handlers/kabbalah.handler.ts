import type { IDataObject } from "n8n-workflow";
import type { IHandlerContext, KabbalahOperation } from "../interfaces/types";
import {
  buildBirthData,
  makeApiRequest,
  applySimplifyIfEnabled,
} from "../shared/helpers";

/**
 * Endpoint mapping for kabbalah operations
 */
const KABBALAH_ENDPOINTS: Record<KabbalahOperation, string> = {
  glossarySephiroth: "/api/v3/kabbalah/glossary/sephiroth",
  glossaryHebrewLetters: "/api/v3/kabbalah/glossary/hebrew-letters",
  glossaryAngels72: "/api/v3/kabbalah/glossary/angels-72",
  treeOfLifeChart: "/api/v3/kabbalah/tree-of-life-chart",
  birthAngels: "/api/v3/kabbalah/birth-angels",
  tikkun: "/api/v3/kabbalah/tikkun",
  gematria: "/api/v3/kabbalah/gematria",
};

/**
 * GET operations (no body required)
 */
const GET_OPERATIONS: KabbalahOperation[] = [
  "glossarySephiroth",
  "glossaryHebrewLetters",
  "glossaryAngels72",
];

/**
 * Operations that require birth data
 */
const BIRTH_DATA_OPERATIONS: KabbalahOperation[] = [
  "treeOfLifeChart",
  "birthAngels",
  "tikkun",
];

/**
 * Handles all kabbalah resource operations
 *
 * @param context - Handler context with execution functions and credentials
 * @param operation - The operation to execute
 * @returns API response data
 */
export async function handleKabbalahResource(
  context: IHandlerContext,
  operation: string,
): Promise<IDataObject> {
  const { executeFunctions, itemIndex, baseUrl, apiKey } = context;
  const op = operation as KabbalahOperation;

  const endpoint = KABBALAH_ENDPOINTS[op] || KABBALAH_ENDPOINTS.treeOfLifeChart;

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

  // Gematria operation - special handling
  if (op === "gematria") {
    const text = executeFunctions.getNodeParameter(
      "gematriaText",
      itemIndex,
      "",
    ) as string;

    const methods = executeFunctions.getNodeParameter(
      "gematriaMethods",
      itemIndex,
      ["mispar_gadol", "mispar_katan"],
    ) as string[];

    const findEquivalents = executeFunctions.getNodeParameter(
      "findEquivalents",
      itemIndex,
      false,
    ) as boolean;

    const language = executeFunctions.getNodeParameter(
      "language",
      itemIndex,
      "en",
    ) as string;

    const body: IDataObject = {
      text,
      methods,
      find_equivalents: findEquivalents,
      language,
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

  // Birth data operations
  if (BIRTH_DATA_OPERATIONS.includes(op)) {
    const birthData = buildBirthData(executeFunctions, itemIndex);

    const language = executeFunctions.getNodeParameter(
      "language",
      itemIndex,
      "en",
    ) as string;

    const body: IDataObject = {
      birth_data: birthData,
      language,
    };

    // Tree of Life specific options
    if (op === "treeOfLifeChart" || op === "birthAngels") {
      const system = executeFunctions.getNodeParameter(
        "kabbalahSystem",
        itemIndex,
        "modern_halevi",
      ) as string;
      body.system = system;
    }

    if (op === "treeOfLifeChart") {
      const includeDaat = executeFunctions.getNodeParameter(
        "includeDaat",
        itemIndex,
        true,
      ) as boolean;

      const includePaths = executeFunctions.getNodeParameter(
        "includePaths",
        itemIndex,
        true,
      ) as boolean;

      body.include_daat = includeDaat;
      body.include_paths = includePaths;
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
