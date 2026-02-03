import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from "n8n-workflow";
import { NodeOperationError } from "n8n-workflow";

import {
  resourceField,
  dataOperations,
  horoscopeOperations,
  chartsOperations,
  humanDesignOperations,
  numerologyOperations,
  tarotOperations,
  lunarOperations,
  vedicOperations,
  analysisOperations,
  renderOperations,
} from "./operations";
import {
  handleDataResource,
  handleHoroscopeResource,
  handleChartsResource,
  handleHumanDesignResource,
  handleNumerologyResource,
  handleTarotResource,
  handleLunarResource,
  handleVedicResource,
  handleAnalysisResource,
  handleRenderResource,
} from "./handlers";
import type { IHandlerContext, ResourceType } from "./interfaces";

const DEFAULT_API_BASE_URL = "https://api.astrology-api.io";

/**
 * Gets the API base URL from credentials or returns default
 */
function getBaseUrl(credentials: IDataObject | undefined): string {
  const credentialUrl = (credentials?.baseUrl as string) || "";
  return credentialUrl.length > 0 ? credentialUrl : DEFAULT_API_BASE_URL;
}

/**
 * Resource handler router - maps resources to their handlers
 */
const resourceHandlers: Record<ResourceType, typeof handleDataResource> = {
  data: handleDataResource,
  horoscope: handleHoroscopeResource,
  charts: handleChartsResource,
  humanDesign: handleHumanDesignResource,
  numerology: handleNumerologyResource,
  tarot: handleTarotResource,
  lunar: handleLunarResource,
  vedic: handleVedicResource,
  analysis: handleAnalysisResource,
  render: handleRenderResource,
};

export class Astrology implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Astrology",
    name: "astrology",
    icon: "file:astrology.svg",
    group: ["transform"],
    version: 1,
    usableAsTool: true,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: "Perform astrological calculations via Astrology API",
    defaults: {
      name: "Astrology",
    },
    inputs: ["main"],
    outputs: ["main"],
    credentials: [
      {
        name: "astrologyApi",
        required: true,
      },
    ],
    properties: [
      resourceField,
      ...dataOperations,
      ...horoscopeOperations,
      ...chartsOperations,
      ...humanDesignOperations,
      ...numerologyOperations,
      ...tarotOperations,
      ...lunarOperations,
      ...vedicOperations,
      ...analysisOperations,
      ...renderOperations,
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: IDataObject[] = [];

    const credentials = await this.getCredentials("astrologyApi");
    const baseUrl = getBaseUrl(credentials as IDataObject);
    const apiKey = credentials.apiKey as string;

    for (let itemIndex = 0; itemIndex < items.length; itemIndex += 1) {
      try {
        const resource = this.getNodeParameter(
          "resource",
          itemIndex,
        ) as ResourceType;
        const operation = this.getNodeParameter(
          "operation",
          itemIndex,
        ) as string;

        // Build handler context
        const context: IHandlerContext = {
          executeFunctions: this,
          itemIndex,
          baseUrl,
          apiKey,
        };

        // Route to appropriate handler
        const handler = resourceHandlers[resource];
        if (!handler) {
          throw new NodeOperationError(
            this.getNode(),
            `The resource '${resource}' is not supported`,
            { itemIndex },
          );
        }

        const responseData = await handler(context, operation);
        returnData.push(responseData);
      } catch (error) {
        if (this.continueOnFail()) {
          returnData.push({
            error: (error as Error).message,
            itemIndex,
          });
          continue;
        }
        throw error;
      }
    }

    return [this.helpers.returnJsonArray(returnData)];
  }
}
