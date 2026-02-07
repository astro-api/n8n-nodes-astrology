import { NodeApiError } from "n8n-workflow";
import type {
  IDataObject,
  IExecuteFunctions,
  IHttpRequestOptions,
  JsonObject,
} from "n8n-workflow";
import type {
  IBirthData,
  ITransitTime,
  IDateTimeLocation,
} from "../interfaces/types";

/**
 * Builds birth data object from node parameters
 *
 * @param executeFunctions - n8n execute functions context
 * @param itemIndex - Current item index
 * @returns Birth data object for API requests
 */
export function buildBirthData(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
): IBirthData {
  const birthData: IBirthData = {
    year: executeFunctions.getNodeParameter("year", itemIndex) as number,
    month: executeFunctions.getNodeParameter("month", itemIndex) as number,
    day: executeFunctions.getNodeParameter("day", itemIndex) as number,
    hour: executeFunctions.getNodeParameter("hour", itemIndex) as number,
    minute: executeFunctions.getNodeParameter("minute", itemIndex) as number,
  };

  const locationType = executeFunctions.getNodeParameter(
    "locationType",
    itemIndex,
  ) as string;

  if (locationType === "city") {
    birthData.city = executeFunctions.getNodeParameter(
      "city",
      itemIndex,
    ) as string;
    birthData.country_code = executeFunctions.getNodeParameter(
      "countryCode",
      itemIndex,
    ) as string;
  } else {
    birthData.latitude = executeFunctions.getNodeParameter(
      "latitude",
      itemIndex,
    ) as number;
    birthData.longitude = executeFunctions.getNodeParameter(
      "longitude",
      itemIndex,
    ) as number;
  }

  return birthData;
}

/**
 * Makes an authenticated API request
 *
 * @param executeFunctions - n8n execute functions context
 * @param method - HTTP method
 * @param baseUrl - API base URL
 * @param endpoint - API endpoint path
 * @param apiKey - API authentication key
 * @param body - Optional request body
 * @returns API response data
 */
export async function makeApiRequest(
  executeFunctions: IExecuteFunctions,
  method: "GET" | "POST",
  baseUrl: string,
  endpoint: string,
  apiKey: string,
  body?: IDataObject,
): Promise<IDataObject> {
  const options: IHttpRequestOptions = {
    method,
    url: `${baseUrl}${endpoint}`,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    json: true,
    returnFullResponse: false,
  };

  if (body) {
    options.body = body;
  }

  try {
    const response = await executeFunctions.helpers.httpRequest(options);

    // Ensure we return only serializable data (no circular references)
    if (typeof response === "object" && response !== null) {
      return JSON.parse(JSON.stringify(response)) as IDataObject;
    }

    return response as IDataObject;
  } catch (error) {
    throw new NodeApiError(executeFunctions.getNode(), error as JsonObject);
  }
}

/**
 * Creates a subject request body wrapper
 *
 * @param birthData - Birth data object
 * @param additionalFields - Additional fields to include in the request
 * @returns Request body with subject wrapper
 */
export function createSubjectRequest(
  birthData: IBirthData,
  additionalFields?: IDataObject,
): IDataObject {
  return {
    subject: {
      birth_data: birthData,
    },
    ...additionalFields,
  };
}

/**
 * Simplifies a response object by keeping only top-level keys
 * up to the specified maximum number of fields.
 *
 * Note: Nested objects are returned as-is; no flattening is performed.
 *
 * @param data - The full API response
 * @param maxFields - Maximum number of top-level fields to return (default 10)
 * @returns Simplified data object
 */
export function simplifyResponse(
  data: IDataObject,
  maxFields = 10,
): IDataObject {
  const keys = Object.keys(data);
  if (keys.length <= maxFields) {
    return data;
  }
  const simplified: IDataObject = {};
  for (let i = 0; i < maxFields; i++) {
    simplified[keys[i]] = data[keys[i]];
  }
  return simplified;
}

/**
 * Conditionally simplifies API response based on node parameter.
 * Consolidates the repeated pattern of checking 'simplify' parameter
 * and applying simplifyResponse.
 *
 * @param executeFunctions - n8n execute functions context
 * @param itemIndex - Current item index
 * @param responseData - API response to potentially simplify
 * @returns Simplified or full response based on user preference
 */
export function applySimplifyIfEnabled(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  responseData: IDataObject,
): IDataObject {
  const simplify = executeFunctions.getNodeParameter(
    "simplify",
    itemIndex,
    true,
  ) as boolean;
  return simplify ? simplifyResponse(responseData) : responseData;
}

/**
 * Builds second subject birth data from subject2* prefixed fields.
 * Used for synastry, compatibility, and other two-person operations.
 *
 * @param executeFunctions - n8n execute functions context
 * @param itemIndex - Current item index
 * @param dateOnly - If true, only extract year/month/day (for numerology)
 * @returns Birth data object for second subject
 */
export function buildSecondSubjectBirthData(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  dateOnly = false,
): IBirthData {
  const birthData: IBirthData = {
    year: executeFunctions.getNodeParameter(
      "subject2Year",
      itemIndex,
    ) as number,
    month: executeFunctions.getNodeParameter(
      "subject2Month",
      itemIndex,
    ) as number,
    day: executeFunctions.getNodeParameter("subject2Day", itemIndex) as number,
    hour: 0,
    minute: 0,
  };

  if (dateOnly) {
    return birthData;
  }

  birthData.hour = executeFunctions.getNodeParameter(
    "subject2Hour",
    itemIndex,
  ) as number;
  birthData.minute = executeFunctions.getNodeParameter(
    "subject2Minute",
    itemIndex,
  ) as number;

  const locationType = executeFunctions.getNodeParameter(
    "subject2LocationType",
    itemIndex,
  ) as string;

  if (locationType === "city") {
    birthData.city = executeFunctions.getNodeParameter(
      "subject2City",
      itemIndex,
    ) as string;
    birthData.country_code = executeFunctions.getNodeParameter(
      "subject2CountryCode",
      itemIndex,
    ) as string;
  } else {
    birthData.latitude = executeFunctions.getNodeParameter(
      "subject2Latitude",
      itemIndex,
    ) as number;
    birthData.longitude = executeFunctions.getNodeParameter(
      "subject2Longitude",
      itemIndex,
    ) as number;
  }

  return birthData;
}

/**
 * Builds transit time object from transit* prefixed fields.
 * Used for transit chart calculations.
 *
 * @param executeFunctions - n8n execute functions context
 * @param itemIndex - Current item index
 * @returns Transit time object for API requests
 */
export function buildTransitTime(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
): ITransitTime {
  const locationType = executeFunctions.getNodeParameter(
    "transitLocationType",
    itemIndex,
  ) as string;

  const transitTime: ITransitTime = {
    year: executeFunctions.getNodeParameter("transitYear", itemIndex) as number,
    month: executeFunctions.getNodeParameter(
      "transitMonth",
      itemIndex,
    ) as number,
    day: executeFunctions.getNodeParameter("transitDay", itemIndex) as number,
    hour: executeFunctions.getNodeParameter("transitHour", itemIndex) as number,
    minute: executeFunctions.getNodeParameter(
      "transitMinute",
      itemIndex,
    ) as number,
  };

  if (locationType === "city") {
    transitTime.city = executeFunctions.getNodeParameter(
      "transitCity",
      itemIndex,
    ) as string;
    transitTime.country_code = executeFunctions.getNodeParameter(
      "transitCountryCode",
      itemIndex,
    ) as string;
  } else {
    transitTime.latitude = executeFunctions.getNodeParameter(
      "transitLatitude",
      itemIndex,
    ) as number;
    transitTime.longitude = executeFunctions.getNodeParameter(
      "transitLongitude",
      itemIndex,
    ) as number;
  }

  return transitTime;
}

/**
 * Builds return location object from return* prefixed fields.
 * Used for relocated solar/lunar returns.
 *
 * @param executeFunctions - n8n execute functions context
 * @param itemIndex - Current item index
 * @returns Location object or undefined if not using relocated return
 */
export function buildReturnLocation(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
): IDataObject | undefined {
  const useRelocatedReturn = executeFunctions.getNodeParameter(
    "useRelocatedReturn",
    itemIndex,
    false,
  ) as boolean;

  if (!useRelocatedReturn) {
    return undefined;
  }

  const locationType = executeFunctions.getNodeParameter(
    "returnLocationType",
    itemIndex,
  ) as string;

  const location: IDataObject = {};

  if (locationType === "city") {
    location.city = executeFunctions.getNodeParameter(
      "returnCity",
      itemIndex,
    ) as string;
    location.country_code = executeFunctions.getNodeParameter(
      "returnCountryCode",
      itemIndex,
    ) as string;
  } else {
    location.latitude = executeFunctions.getNodeParameter(
      "returnLatitude",
      itemIndex,
    ) as number;
    location.longitude = executeFunctions.getNodeParameter(
      "returnLongitude",
      itemIndex,
    ) as number;
  }

  return location;
}

/**
 * Builds datetime_location object for Lunar API requests.
 * Used for lunar phases, void-of-course, mansions, and events.
 *
 * @param executeFunctions - n8n execute functions context
 * @param itemIndex - Current item index
 * @returns DateTimeLocation object for API requests
 */
export function buildDateTimeLocation(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
): IDateTimeLocation {
  const dateTimeLocation: IDateTimeLocation = {
    year: executeFunctions.getNodeParameter("year", itemIndex) as number,
    month: executeFunctions.getNodeParameter("month", itemIndex) as number,
    day: executeFunctions.getNodeParameter("day", itemIndex) as number,
    hour: executeFunctions.getNodeParameter("hour", itemIndex) as number,
    minute: executeFunctions.getNodeParameter("minute", itemIndex) as number,
  };

  const locationType = executeFunctions.getNodeParameter(
    "locationType",
    itemIndex,
  ) as string;

  if (locationType === "city") {
    dateTimeLocation.city = executeFunctions.getNodeParameter(
      "city",
      itemIndex,
    ) as string;
    dateTimeLocation.country_code = executeFunctions.getNodeParameter(
      "countryCode",
      itemIndex,
    ) as string;
  } else {
    dateTimeLocation.latitude = executeFunctions.getNodeParameter(
      "latitude",
      itemIndex,
    ) as number;
    dateTimeLocation.longitude = executeFunctions.getNodeParameter(
      "longitude",
      itemIndex,
    ) as number;

    // Timezone is optional for coordinate-based locations
    const timezone = executeFunctions.getNodeParameter(
      "timezone",
      itemIndex,
      "",
    ) as string;
    if (timezone) {
      dateTimeLocation.timezone = timezone;
    }
  }

  return dateTimeLocation;
}
