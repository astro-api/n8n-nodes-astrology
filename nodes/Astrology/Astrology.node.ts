import type {
  IDataObject,
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';

import { astrologyDataOperations } from './operations/data.operation';
import { horoscopeOperations } from './operations/horoscope.operation';

const DEFAULT_API_BASE_URL = 'https://api.astrology-api.io';

function getBaseUrl(credentials: IDataObject | undefined): string {
  const credentialUrl = (credentials?.baseUrl as string) || '';
  return credentialUrl.length > 0 ? credentialUrl : DEFAULT_API_BASE_URL;
}

export class Astrology implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Astrology',
    name: 'astrology',
    icon: 'file:astrology.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Get astrological data from Astrology API',
    defaults: {
      name: 'Astrology',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'astrologyApi',
        required: true,
      },
    ],
    properties: [...astrologyDataOperations, ...horoscopeOperations],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: IDataObject[] = [];

    const credentials = await this.getCredentials('astrologyApi');
    const baseUrl = getBaseUrl(credentials as IDataObject);
    const apiKey = credentials.apiKey as string;

    for (let itemIndex = 0; itemIndex < items.length; itemIndex += 1) {
      const resource = this.getNodeParameter('resource', itemIndex) as string;
      const operation = this.getNodeParameter('operation', itemIndex) as string;
      let responseData: IDataObject;

      if (resource === 'data') {
        if (operation === 'now') {
          responseData = await this.helpers.httpRequest({
            method: 'GET',
            url: `${baseUrl}/api/v3/data/now`,
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
            json: true,
          });
        } else {
          // Build birth data object
          const birthData: IDataObject = {
            year: this.getNodeParameter('year', itemIndex) as number,
            month: this.getNodeParameter('month', itemIndex) as number,
            day: this.getNodeParameter('day', itemIndex) as number,
            hour: this.getNodeParameter('hour', itemIndex) as number,
            minute: this.getNodeParameter('minute', itemIndex) as number,
          };

          // Add location based on type
          const locationType = this.getNodeParameter('locationType', itemIndex) as string;
          if (locationType === 'city') {
            birthData.city = this.getNodeParameter('city', itemIndex) as string;
            birthData.country_code = this.getNodeParameter('countryCode', itemIndex) as string;
          } else {
            birthData.latitude = this.getNodeParameter('latitude', itemIndex) as number;
            birthData.longitude = this.getNodeParameter('longitude', itemIndex) as number;
          }

          const body = {
            subject: {
              birth_data: birthData,
            },
          };

          let endpoint: string;
          switch (operation) {
            case 'positions':
              endpoint = '/api/v3/data/positions';
              break;
            case 'houseCusps':
              endpoint = '/api/v3/data/house-cusps';
              break;
            case 'aspects':
              endpoint = '/api/v3/data/aspects';
              break;
            case 'lunarMetrics':
              endpoint = '/api/v3/data/lunar-metrics';
              break;
            default:
              endpoint = '/api/v3/data/positions';
          }

          responseData = await this.helpers.httpRequest({
            method: 'POST',
            url: `${baseUrl}${endpoint}`,
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
            body,
            json: true,
          });
        }
      } else if (resource === 'horoscope') {
        // Helper function to build birth data
        const buildBirthData = (): IDataObject => {
          const birthData: IDataObject = {
            year: this.getNodeParameter('year', itemIndex) as number,
            month: this.getNodeParameter('month', itemIndex) as number,
            day: this.getNodeParameter('day', itemIndex) as number,
            hour: this.getNodeParameter('hour', itemIndex) as number,
            minute: this.getNodeParameter('minute', itemIndex) as number,
          };

          const locationType = this.getNodeParameter('locationType', itemIndex) as string;
          if (locationType === 'city') {
            birthData.city = this.getNodeParameter('city', itemIndex) as string;
            birthData.country_code = this.getNodeParameter('countryCode', itemIndex) as string;
          } else {
            birthData.latitude = this.getNodeParameter('latitude', itemIndex) as number;
            birthData.longitude = this.getNodeParameter('longitude', itemIndex) as number;
          }

          return birthData;
        };

        // Sign-based operations
        if (operation.startsWith('sign')) {
          const sign = this.getNodeParameter('sign', itemIndex) as string;
          const language = this.getNodeParameter('language', itemIndex) as string;
          const targetDate = this.getNodeParameter('targetDate', itemIndex) as string;
          const tradition = this.getNodeParameter('tradition', itemIndex) as string;
          const isTextOperation = operation.endsWith('Text');

          // Extract period from operation name (e.g., signDaily -> daily, signDailyText -> daily)
          const period = operation.replace('sign', '').replace('Text', '').toLowerCase();

          let endpoint = `/api/v3/horoscope/sign/${period}`;
          if (isTextOperation) {
            endpoint += '/text';
          }

          const body: IDataObject = {
            sign,
            language,
            tradition,
          };

          if (targetDate) {
            body.date = targetDate;
          }

          // Add text-specific options
          if (isTextOperation) {
            body.format = this.getNodeParameter('textFormat', itemIndex) as string;
            body.emoji = this.getNodeParameter('emoji', itemIndex) as boolean;
          }

          responseData = await this.helpers.httpRequest({
            method: 'POST',
            url: `${baseUrl}${endpoint}`,
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
            body,
            json: true,
          });
        }

        // Personal operations
        else if (operation.startsWith('personal')) {
          const birthData = buildBirthData();
          const language = this.getNodeParameter('language', itemIndex) as string;
          const targetDate = this.getNodeParameter('targetDate', itemIndex) as string;
          const tradition = this.getNodeParameter('tradition', itemIndex) as string;
          const isTextOperation = operation.endsWith('Text');

          // Extract period from operation name
          const period = operation.replace('personal', '').replace('Text', '').toLowerCase();

          let endpoint = `/api/v3/horoscope/personal/${period}`;
          if (isTextOperation) {
            endpoint += '/text';
          }

          const body: IDataObject = {
            subject: {
              birth_data: birthData,
            },
            language,
            tradition,
          };

          if (targetDate) {
            body.target_date = targetDate;
          }

          // Add text-specific options
          if (isTextOperation) {
            body.format = this.getNodeParameter('textFormat', itemIndex) as string;
            body.emoji = this.getNodeParameter('emoji', itemIndex) as boolean;
          }

          responseData = await this.helpers.httpRequest({
            method: 'POST',
            url: `${baseUrl}${endpoint}`,
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
            body,
            json: true,
          });
        }

        // Chinese Bazi
        else if (operation === 'chineseBazi') {
          const birthData = buildBirthData();
          const baziYear = this.getNodeParameter('baziYear', itemIndex) as number;
          const language = this.getNodeParameter('language', itemIndex) as string;

          responseData = await this.helpers.httpRequest({
            method: 'POST',
            url: `${baseUrl}/api/v3/horoscope/chinese/bazi`,
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
            body: {
              subject: {
                birth_data: birthData,
              },
              year: baziYear,
              language,
            },
            json: true,
          });
        } else {
          throw new Error(`Operation "${operation}" is not supported for horoscope`);
        }
      } else {
        throw new Error(`Resource "${resource}" is not supported`);
      }

      returnData.push(responseData);
    }

    return [this.helpers.returnJsonArray(returnData)];
  }
}
