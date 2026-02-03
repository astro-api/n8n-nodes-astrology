import type { IDataObject } from "n8n-workflow";
import type { IHandlerContext, LunarOperation } from "../interfaces/types";
import {
  buildDateTimeLocation,
  makeApiRequest,
  applySimplifyIfEnabled,
} from "../shared/helpers";

/**
 * Endpoint mapping for lunar operations
 */
const LUNAR_ENDPOINTS: Record<LunarOperation, string> = {
  phases: "/api/v3/lunar/phases",
  voidOfCourse: "/api/v3/lunar/void-of-course",
  mansions: "/api/v3/lunar/mansions",
  events: "/api/v3/lunar/events",
  calendar: "/api/v3/lunar/calendar",
};

/**
 * Handles all lunar resource operations
 *
 * @param context - Handler context with execution functions and credentials
 * @param operation - The operation to execute
 * @returns API response data
 */
export async function handleLunarResource(
  context: IHandlerContext,
  operation: string,
): Promise<IDataObject> {
  const { executeFunctions, itemIndex, baseUrl, apiKey } = context;
  const op = operation as LunarOperation;

  // "calendar" operation uses GET with year parameter
  if (op === "calendar") {
    const year = executeFunctions.getNodeParameter(
      "calendarYear",
      itemIndex,
    ) as number;

    const responseData = await makeApiRequest(
      executeFunctions,
      "GET",
      baseUrl,
      `${LUNAR_ENDPOINTS.calendar}/${year}`,
      apiKey,
    );

    return applySimplifyIfEnabled(executeFunctions, itemIndex, responseData);
  }

  // All other operations use POST with datetime_location
  const dateTimeLocation = buildDateTimeLocation(executeFunctions, itemIndex);

  const body: IDataObject = {
    datetime_location: dateTimeLocation,
  };

  // Add days_ahead parameter for phases, voidOfCourse, events
  if (op === "phases" || op === "voidOfCourse" || op === "events") {
    const daysAhead = executeFunctions.getNodeParameter(
      "daysAhead",
      itemIndex,
      30,
    ) as number;
    body.days_ahead = daysAhead;
  }

  // Add use_modern_planets parameter for voidOfCourse
  if (op === "voidOfCourse") {
    const useModernPlanets = executeFunctions.getNodeParameter(
      "useModernPlanets",
      itemIndex,
      false,
    ) as boolean;
    body.use_modern_planets = useModernPlanets;
  }

  const endpoint = LUNAR_ENDPOINTS[op] || LUNAR_ENDPOINTS.phases;

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
