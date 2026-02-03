import type { IDataObject } from "n8n-workflow";
import type { IHandlerContext, RenderOperation } from "../interfaces/types";
import {
  buildBirthData,
  buildSecondSubjectBirthData,
  buildTransitTime,
  makeApiRequest,
  createSubjectRequest,
} from "../shared/helpers";

/**
 * Endpoint mapping for render operations
 */
const RENDER_ENDPOINTS: Record<RenderOperation, string> = {
  natal: "/api/v3/render/natal",
  transit: "/api/v3/render/transit",
  synastry: "/api/v3/render/synastry",
  composite: "/api/v3/render/composite",
};

/**
 * Builds render options from node parameters
 */
function buildRenderOptions(context: IHandlerContext): IDataObject {
  const { executeFunctions, itemIndex } = context;

  return {
    format: executeFunctions.getNodeParameter(
      "renderFormat",
      itemIndex,
      "svg",
    ) as string,
    width: executeFunctions.getNodeParameter(
      "renderWidth",
      itemIndex,
      800,
    ) as number,
    height: executeFunctions.getNodeParameter(
      "renderHeight",
      itemIndex,
      800,
    ) as number,
    theme: executeFunctions.getNodeParameter(
      "renderTheme",
      itemIndex,
      "light",
    ) as string,
    background_color: executeFunctions.getNodeParameter(
      "backgroundColor",
      itemIndex,
      "#ffffff",
    ) as string,
    show_aspects: executeFunctions.getNodeParameter(
      "showAspects",
      itemIndex,
      true,
    ) as boolean,
    show_house_numbers: executeFunctions.getNodeParameter(
      "showHouseNumbers",
      itemIndex,
      true,
    ) as boolean,
    show_degrees: executeFunctions.getNodeParameter(
      "showDegrees",
      itemIndex,
      true,
    ) as boolean,
  };
}

/**
 * Handles all render resource operations
 *
 * @param context - Handler context with execution functions and credentials
 * @param operation - The operation to execute
 * @returns API response data (including chart data and optionally base64 image)
 */
export async function handleRenderResource(
  context: IHandlerContext,
  operation: string,
): Promise<IDataObject> {
  const { executeFunctions, itemIndex, baseUrl, apiKey } = context;
  const op = operation as RenderOperation;

  const birthData = buildBirthData(executeFunctions, itemIndex);
  const renderOptions = buildRenderOptions(context);
  const endpoint = RENDER_ENDPOINTS[op] || RENDER_ENDPOINTS.natal;

  let body: IDataObject;

  switch (op) {
    case "natal": {
      body = {
        ...createSubjectRequest(birthData),
        render_options: renderOptions,
      };
      break;
    }

    case "transit": {
      const transitTime = buildTransitTime(executeFunctions, itemIndex);
      body = {
        ...createSubjectRequest(birthData),
        transit_time: {
          datetime: transitTime,
        },
        render_options: renderOptions,
      };
      break;
    }

    case "synastry":
    case "composite": {
      const secondBirthData = buildSecondSubjectBirthData(
        executeFunctions,
        itemIndex,
      );
      body = {
        subject1: {
          birth_data: birthData,
        },
        subject2: {
          birth_data: secondBirthData,
        },
        render_options: renderOptions,
      };
      break;
    }

    default:
      body = {
        ...createSubjectRequest(birthData),
        render_options: renderOptions,
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

  return responseData;
}
