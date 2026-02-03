import type { IDataObject } from "n8n-workflow";
import type { IHandlerContext, VedicOperation } from "../interfaces/types";
import {
  buildBirthData,
  buildSecondSubjectBirthData,
  makeApiRequest,
  createSubjectRequest,
  applySimplifyIfEnabled,
} from "../shared/helpers";

/**
 * Endpoint mapping for vedic operations
 */
const VEDIC_ENDPOINTS: Record<VedicOperation, string> = {
  chart: "/api/v3/vedic/chart",
  chartRender: "/api/v3/vedic/chart/render",
  birthDetails: "/api/v3/vedic/birth-details",
  vimshottariDasha: "/api/v3/vedic/vimshottari-dasha",
  charaDasha: "/api/v3/vedic/chara-dasha",
  yoginiDasha: "/api/v3/vedic/yogini-dasha",
  nakshatra: "/api/v3/vedic/nakshatra-predictions",
  divisionalChart: "/api/v3/vedic/divisional-chart",
  ashtakvarga: "/api/v3/vedic/ashtakvarga",
  shadbala: "/api/v3/vedic/shadbala",
  yogaAnalysis: "/api/v3/vedic/yoga-analysis",
  kundliMatching: "/api/v3/vedic/kundli-matching",
  manglikDosha: "/api/v3/vedic/manglik-dosha",
  kaalSarpaDosha: "/api/v3/vedic/kaal-sarpa-dosha",
  sadeSati: "/api/v3/vedic/sade-sati",
  transit: "/api/v3/vedic/transit",
  varshaphal: "/api/v3/vedic/varshaphal",
  panchang: "/api/v3/vedic/panchang",
  regionalPanchang: "/api/v3/vedic/regional-panchang",
  festivalCalendar: "/api/v3/vedic/festival-calendar",
  kpSystem: "/api/v3/vedic/kp-system",
  remedies: "/api/v3/vedic/remedies",
};

/**
 * Builds Vedic chart options from node parameters
 */
function buildVedicOptions(context: IHandlerContext): IDataObject {
  const { executeFunctions, itemIndex } = context;

  return {
    ayanamsa: executeFunctions.getNodeParameter(
      "ayanamsa",
      itemIndex,
      "lahiri",
    ) as string,
    node_type: executeFunctions.getNodeParameter(
      "nodeType",
      itemIndex,
      "mean",
    ) as string,
    precision: executeFunctions.getNodeParameter(
      "precision",
      itemIndex,
      2,
    ) as number,
  };
}

/**
 * Handles all vedic resource operations
 *
 * @param context - Handler context with execution functions and credentials
 * @param operation - The operation to execute
 * @returns API response data
 */
export async function handleVedicResource(
  context: IHandlerContext,
  operation: string,
): Promise<IDataObject> {
  const { executeFunctions, itemIndex, baseUrl, apiKey } = context;
  const op = operation as VedicOperation;

  const vedicOptions = buildVedicOptions(context);
  const endpoint = VEDIC_ENDPOINTS[op] || VEDIC_ENDPOINTS.chart;

  let body: IDataObject;
  let responseData: IDataObject;

  switch (op) {
    case "festivalCalendar": {
      const year = executeFunctions.getNodeParameter(
        "targetYear",
        itemIndex,
      ) as number;
      body = {
        year,
        ...vedicOptions,
      };
      responseData = await makeApiRequest(
        executeFunctions,
        "POST",
        baseUrl,
        endpoint,
        apiKey,
        body,
      );
      break;
    }

    case "panchang":
    case "regionalPanchang": {
      const birthData = buildBirthData(executeFunctions, itemIndex);
      body = {
        datetime_location: {
          year: birthData.year,
          month: birthData.month,
          day: birthData.day,
          hour: birthData.hour,
          minute: birthData.minute,
          city: birthData.city,
          country_code: birthData.country_code,
          latitude: birthData.latitude,
          longitude: birthData.longitude,
        },
        ...vedicOptions,
      };
      responseData = await makeApiRequest(
        executeFunctions,
        "POST",
        baseUrl,
        endpoint,
        apiKey,
        body,
      );
      break;
    }

    case "kundliMatching": {
      const birthData = buildBirthData(executeFunctions, itemIndex);
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
        chart_options: vedicOptions,
      };
      responseData = await makeApiRequest(
        executeFunctions,
        "POST",
        baseUrl,
        endpoint,
        apiKey,
        body,
      );
      break;
    }

    case "chartRender": {
      const birthData = buildBirthData(executeFunctions, itemIndex);
      const style = executeFunctions.getNodeParameter(
        "vedicStyle",
        itemIndex,
        "north_indian",
      ) as string;
      body = {
        ...createSubjectRequest(birthData),
        style,
        chart_options: vedicOptions,
      };
      // Append format to endpoint
      const format = "svg"; // Default to SVG
      responseData = await makeApiRequest(
        executeFunctions,
        "POST",
        baseUrl,
        `${endpoint}/${format}`,
        apiKey,
        body,
      );
      break;
    }

    case "chart": {
      const birthData = buildBirthData(executeFunctions, itemIndex);
      const style = executeFunctions.getNodeParameter(
        "vedicStyle",
        itemIndex,
        "north_indian",
      ) as string;
      body = {
        ...createSubjectRequest(birthData),
        style,
        chart_options: vedicOptions,
      };
      responseData = await makeApiRequest(
        executeFunctions,
        "POST",
        baseUrl,
        endpoint,
        apiKey,
        body,
      );
      break;
    }

    case "divisionalChart": {
      const birthData = buildBirthData(executeFunctions, itemIndex);
      const divisionalChart = executeFunctions.getNodeParameter(
        "divisionalChart",
        itemIndex,
        "D9",
      ) as string;
      body = {
        ...createSubjectRequest(birthData),
        division: divisionalChart,
        chart_options: vedicOptions,
      };
      responseData = await makeApiRequest(
        executeFunctions,
        "POST",
        baseUrl,
        endpoint,
        apiKey,
        body,
      );
      break;
    }

    case "vimshottariDasha":
    case "charaDasha":
    case "yoginiDasha": {
      const birthData = buildBirthData(executeFunctions, itemIndex);
      const dashaYears = executeFunctions.getNodeParameter(
        "dashaYears",
        itemIndex,
        120,
      ) as number;
      body = {
        ...createSubjectRequest(birthData),
        years: dashaYears,
        chart_options: vedicOptions,
      };
      responseData = await makeApiRequest(
        executeFunctions,
        "POST",
        baseUrl,
        endpoint,
        apiKey,
        body,
      );
      break;
    }

    case "varshaphal": {
      const birthData = buildBirthData(executeFunctions, itemIndex);
      const year = executeFunctions.getNodeParameter(
        "targetYear",
        itemIndex,
      ) as number;
      body = {
        ...createSubjectRequest(birthData),
        year,
        chart_options: vedicOptions,
      };
      responseData = await makeApiRequest(
        executeFunctions,
        "POST",
        baseUrl,
        endpoint,
        apiKey,
        body,
      );
      break;
    }

    case "nakshatra":
    case "remedies":
    case "yogaAnalysis": {
      const birthData = buildBirthData(executeFunctions, itemIndex);
      const language = executeFunctions.getNodeParameter(
        "language",
        itemIndex,
        "en",
      ) as string;
      body = {
        ...createSubjectRequest(birthData),
        language,
        chart_options: vedicOptions,
      };
      responseData = await makeApiRequest(
        executeFunctions,
        "POST",
        baseUrl,
        endpoint,
        apiKey,
        body,
      );
      break;
    }

    default: {
      // Standard operations with just birth data
      const birthData = buildBirthData(executeFunctions, itemIndex);
      body = {
        ...createSubjectRequest(birthData),
        chart_options: vedicOptions,
      };
      responseData = await makeApiRequest(
        executeFunctions,
        "POST",
        baseUrl,
        endpoint,
        apiKey,
        body,
      );
    }
  }

  return applySimplifyIfEnabled(executeFunctions, itemIndex, responseData);
}
