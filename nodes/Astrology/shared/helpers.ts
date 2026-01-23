import type {
  IDataObject,
  IExecuteFunctions,
  IHttpRequestOptions,
} from "n8n-workflow";
import type { IBirthData } from "../interfaces/types";

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
    },
    json: true,
  };

  if (body) {
    options.body = body;
  }

  return await executeFunctions.helpers.httpRequest(options);
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
