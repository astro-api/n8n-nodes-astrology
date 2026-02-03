import type { IDataObject } from "n8n-workflow";
import type { IHandlerContext, GlossaryOperation } from "../interfaces/types";
import { makeApiRequest, applySimplifyIfEnabled } from "../shared/helpers";

/**
 * Endpoint mapping for glossary operations
 */
const GLOSSARY_ENDPOINTS: Record<GlossaryOperation, string> = {
  cities: "/api/v3/glossary/cities",
  countries: "/api/v3/glossary/countries",
  houseSystems: "/api/v3/glossary/house-systems",
  houses: "/api/v3/glossary/houses",
  zodiacTypes: "/api/v3/glossary/zodiac-types",
  elements: "/api/v3/glossary/elements",
  keywords: "/api/v3/glossary/keywords",
  activePoints: "/api/v3/glossary/active-points",
  activePointsPrimary: "/api/v3/glossary/active-points/primary",
  fixedStars: "/api/v3/glossary/fixed-stars",
  horaryCategories: "/api/v3/glossary/horary-categories",
  lifeAreas: "/api/v3/glossary/life-areas",
  themes: "/api/v3/glossary/themes",
  languages: "/api/v3/glossary/languages",
};

/**
 * Operations that support search parameter
 */
const SEARCH_OPERATIONS: GlossaryOperation[] = ["cities"];

/**
 * Operations that support country code filter
 */
const COUNTRY_CODE_OPERATIONS: GlossaryOperation[] = ["cities"];

/**
 * Operations that support pagination
 */
const PAGINATION_OPERATIONS: GlossaryOperation[] = ["cities", "countries"];

/**
 * Operations that support sorting
 */
const SORT_OPERATIONS: GlossaryOperation[] = ["cities"];

/**
 * Handles all glossary resource operations
 *
 * @param context - Handler context with execution functions and credentials
 * @param operation - The operation to execute
 * @returns API response data
 */
export async function handleGlossaryResource(
  context: IHandlerContext,
  operation: string,
): Promise<IDataObject> {
  const { executeFunctions, itemIndex, baseUrl, apiKey } = context;
  const op = operation as GlossaryOperation;

  const endpoint = GLOSSARY_ENDPOINTS[op] || GLOSSARY_ENDPOINTS.cities;

  // Build query parameters
  const queryParams: string[] = [];

  // Search parameter
  if (SEARCH_OPERATIONS.includes(op)) {
    const search = executeFunctions.getNodeParameter(
      "search",
      itemIndex,
      "",
    ) as string;
    if (search) {
      queryParams.push(`search=${encodeURIComponent(search)}`);
    }
  }

  // Country code filter
  if (COUNTRY_CODE_OPERATIONS.includes(op)) {
    const countryCode = executeFunctions.getNodeParameter(
      "countryCode",
      itemIndex,
      "",
    ) as string;
    if (countryCode) {
      queryParams.push(`country_code=${encodeURIComponent(countryCode)}`);
    }
  }

  // Pagination parameters
  if (PAGINATION_OPERATIONS.includes(op)) {
    const limit = executeFunctions.getNodeParameter(
      "limit",
      itemIndex,
      50,
    ) as number;
    const offset = executeFunctions.getNodeParameter(
      "offset",
      itemIndex,
      0,
    ) as number;
    queryParams.push(`limit=${limit}`);
    queryParams.push(`offset=${offset}`);
  }

  // Sort parameters
  if (SORT_OPERATIONS.includes(op)) {
    const sortBy = executeFunctions.getNodeParameter(
      "sortBy",
      itemIndex,
      "name",
    ) as string;
    const sortOrder = executeFunctions.getNodeParameter(
      "sortOrder",
      itemIndex,
      "asc",
    ) as string;
    queryParams.push(`sort_by=${sortBy}`);
    queryParams.push(`sort_order=${sortOrder}`);
  }

  // Language parameter (for most endpoints except languages)
  if (op !== "languages") {
    const language = executeFunctions.getNodeParameter(
      "language",
      itemIndex,
      "en",
    ) as string;
    queryParams.push(`language=${language}`);
  }

  // Build final endpoint with query parameters
  const finalEndpoint =
    queryParams.length > 0 ? `${endpoint}?${queryParams.join("&")}` : endpoint;

  // All glossary operations are GET requests
  const responseData = await makeApiRequest(
    executeFunctions,
    "GET",
    baseUrl,
    finalEndpoint,
    apiKey,
  );

  return applySimplifyIfEnabled(executeFunctions, itemIndex, responseData);
}
