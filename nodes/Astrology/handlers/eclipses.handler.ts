import type { IDataObject } from "n8n-workflow";
import type { IHandlerContext, EclipsesOperation } from "../interfaces/types";
import {
  buildBirthData,
  makeApiRequest,
  applySimplifyIfEnabled,
} from "../shared/helpers";

/**
 * Endpoint mapping for eclipses operations
 */
const ECLIPSES_ENDPOINTS: Record<EclipsesOperation, string> = {
  upcoming: "/api/v3/eclipses/upcoming",
  natalCheck: "/api/v3/eclipses/natal-check",
  interpretation: "/api/v3/eclipses/interpretation",
};

/**
 * Handles all eclipses resource operations
 *
 * @param context - Handler context with execution functions and credentials
 * @param operation - The operation to execute
 * @returns API response data
 */
export async function handleEclipsesResource(
  context: IHandlerContext,
  operation: string,
): Promise<IDataObject> {
  const { executeFunctions, itemIndex, baseUrl, apiKey } = context;
  const op = operation as EclipsesOperation;

  const endpoint = ECLIPSES_ENDPOINTS[op] || ECLIPSES_ENDPOINTS.upcoming;

  // Handle upcoming (GET)
  if (op === "upcoming") {
    const count = executeFunctions.getNodeParameter(
      "count",
      itemIndex,
      10,
    ) as number;

    const finalEndpoint = `${endpoint}?count=${count}`;

    const responseData = await makeApiRequest(
      executeFunctions,
      "GET",
      baseUrl,
      finalEndpoint,
      apiKey,
    );

    return applySimplifyIfEnabled(executeFunctions, itemIndex, responseData);
  }

  // Handle natalCheck (POST)
  if (op === "natalCheck") {
    const birthData = buildBirthData(executeFunctions, itemIndex);

    const startYear = executeFunctions.getNodeParameter(
      "startYear",
      itemIndex,
    ) as number;
    const startMonth = executeFunctions.getNodeParameter(
      "startMonth",
      itemIndex,
    ) as number;
    const startDay = executeFunctions.getNodeParameter(
      "startDay",
      itemIndex,
    ) as number;
    const endYear = executeFunctions.getNodeParameter(
      "endYear",
      itemIndex,
    ) as number;
    const endMonth = executeFunctions.getNodeParameter(
      "endMonth",
      itemIndex,
    ) as number;
    const endDay = executeFunctions.getNodeParameter(
      "endDay",
      itemIndex,
    ) as number;
    const maxOrb = executeFunctions.getNodeParameter(
      "maxOrb",
      itemIndex,
      5,
    ) as number;

    const body: IDataObject = {
      subject: {
        birth_data: birthData,
      },
      date_range: {
        start_date: {
          year: startYear,
          month: startMonth,
          day: startDay,
        },
        end_date: {
          year: endYear,
          month: endMonth,
          day: endDay,
        },
      },
      max_orb: maxOrb,
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

  // Handle interpretation (POST)
  if (op === "interpretation") {
    const eclipseId = executeFunctions.getNodeParameter(
      "eclipseId",
      itemIndex,
      "",
    ) as string;

    const language = executeFunctions.getNodeParameter(
      "language",
      itemIndex,
      "en",
    ) as string;

    const includePersonal = executeFunctions.getNodeParameter(
      "includePersonal",
      itemIndex,
      false,
    ) as boolean;

    const body: IDataObject = {
      eclipse_id: eclipseId,
      language,
    };

    // Add optional birth data for personal interpretation
    if (includePersonal) {
      const birthYear = executeFunctions.getNodeParameter(
        "birthYear",
        itemIndex,
      ) as number;
      const birthMonth = executeFunctions.getNodeParameter(
        "birthMonth",
        itemIndex,
      ) as number;
      const birthDay = executeFunctions.getNodeParameter(
        "birthDay",
        itemIndex,
      ) as number;
      const birthHour = executeFunctions.getNodeParameter(
        "birthHour",
        itemIndex,
      ) as number;
      const birthMinute = executeFunctions.getNodeParameter(
        "birthMinute",
        itemIndex,
      ) as number;
      const birthCity = executeFunctions.getNodeParameter(
        "birthCity",
        itemIndex,
      ) as string;
      const birthCountryCode = executeFunctions.getNodeParameter(
        "birthCountryCode",
        itemIndex,
      ) as string;

      body.birth_data = {
        year: birthYear,
        month: birthMonth,
        day: birthDay,
        hour: birthHour,
        minute: birthMinute,
        city: birthCity,
        country_code: birthCountryCode,
      };
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
