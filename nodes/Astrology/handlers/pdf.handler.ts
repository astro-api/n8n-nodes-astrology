import type { IDataObject } from "n8n-workflow";
import type { IHandlerContext, PdfOperation } from "../interfaces/types";
import {
  buildBirthData,
  makeApiRequest,
  applySimplifyIfEnabled,
} from "../shared/helpers";

/**
 * Endpoint mapping for pdf operations
 */
const PDF_ENDPOINTS: Record<PdfOperation, string> = {
  horoscopeDaily: "/api/v3/pdf/horoscope/daily",
  horoscopeWeekly: "/api/v3/pdf/horoscope/weekly",
  horoscopeData: "/api/v3/pdf/horoscope/data",
  natalReport: "/api/v3/pdf/natal-report",
};

/**
 * Horoscope operations that support sun-sign mode
 */
const HOROSCOPE_OPERATIONS: PdfOperation[] = [
  "horoscopeDaily",
  "horoscopeWeekly",
];

/**
 * Build sections object from node parameters
 */
function buildSections(context: IHandlerContext): IDataObject {
  const { executeFunctions, itemIndex } = context;

  const sections: IDataObject = {
    general_overview: executeFunctions.getNodeParameter(
      "sectionGeneralOverview",
      itemIndex,
      true,
    ) as boolean,
    love_relationships: executeFunctions.getNodeParameter(
      "sectionLoveRelationships",
      itemIndex,
      true,
    ) as boolean,
    career_finance: executeFunctions.getNodeParameter(
      "sectionCareerFinance",
      itemIndex,
      true,
    ) as boolean,
    health_wellness: executeFunctions.getNodeParameter(
      "sectionHealthWellness",
      itemIndex,
      true,
    ) as boolean,
    lucky_elements: executeFunctions.getNodeParameter(
      "sectionLuckyElements",
      itemIndex,
      true,
    ) as boolean,
    daily_affirmation: executeFunctions.getNodeParameter(
      "sectionDailyAffirmation",
      itemIndex,
      true,
    ) as boolean,
    planetary_influences: executeFunctions.getNodeParameter(
      "sectionPlanetaryInfluences",
      itemIndex,
      true,
    ) as boolean,
    moon_phase: executeFunctions.getNodeParameter(
      "sectionMoonPhase",
      itemIndex,
      true,
    ) as boolean,
    compatibility_tip: executeFunctions.getNodeParameter(
      "sectionCompatibilityTip",
      itemIndex,
      false,
    ) as boolean,
  };

  // Add max planetary influences if planetary influences is enabled
  if (sections.planetary_influences) {
    sections.max_planetary_influences = executeFunctions.getNodeParameter(
      "maxPlanetaryInfluences",
      itemIndex,
      5,
    ) as number;
  }

  return sections;
}

/**
 * Build PDF options object from node parameters
 */
function buildPdfOptions(context: IHandlerContext): IDataObject {
  const { executeFunctions, itemIndex } = context;

  const pageSize = executeFunctions.getNodeParameter(
    "pageSize",
    itemIndex,
    "A4",
  ) as string;

  const marginMm = executeFunctions.getNodeParameter(
    "marginMm",
    itemIndex,
    15,
  ) as number;

  const orientation = executeFunctions.getNodeParameter(
    "orientation",
    itemIndex,
    "portrait",
  ) as string;

  const theme = executeFunctions.getNodeParameter(
    "pdfTheme",
    itemIndex,
    "modern",
  ) as string;

  const language = executeFunctions.getNodeParameter(
    "language",
    itemIndex,
    "en",
  ) as string;

  return {
    page_settings: {
      page_size: pageSize,
      margin_mm: marginMm,
      orientation,
    },
    design: {
      theme,
      language,
    },
  };
}

/**
 * Handles all pdf resource operations
 *
 * @param context - Handler context with execution functions and credentials
 * @param operation - The operation to execute
 * @returns API response data
 */
export async function handlePdfResource(
  context: IHandlerContext,
  operation: string,
): Promise<IDataObject> {
  const { executeFunctions, itemIndex, baseUrl, apiKey } = context;
  const op = operation as PdfOperation;

  // Handle horoscope data (GET - returns JSON, not PDF)
  if (op === "horoscopeData") {
    const sign = executeFunctions.getNodeParameter(
      "horoscopeSign",
      itemIndex,
      "Ari",
    ) as string;

    const targetDate = executeFunctions.getNodeParameter(
      "targetDate",
      itemIndex,
      "",
    ) as string;

    const date = targetDate || new Date().toISOString().split("T")[0];
    const endpoint = `${PDF_ENDPOINTS.horoscopeData}/${sign}/${date}`;

    const responseData = await makeApiRequest(
      executeFunctions,
      "GET",
      baseUrl,
      endpoint,
      apiKey,
    );

    return applySimplifyIfEnabled(executeFunctions, itemIndex, responseData);
  }

  // Handle horoscope PDF generation
  if (HOROSCOPE_OPERATIONS.includes(op)) {
    const pdfMode = executeFunctions.getNodeParameter(
      "pdfMode",
      itemIndex,
      "sunSign",
    ) as string;

    const targetDate = executeFunctions.getNodeParameter(
      "targetDate",
      itemIndex,
      "",
    ) as string;

    const sections = buildSections(context);
    const pdfOptions = buildPdfOptions(context);

    const body: IDataObject = {
      sections,
      pdf_options: pdfOptions,
    };

    if (targetDate) {
      body.target_date = targetDate;
    }

    // Sun-sign mode
    if (pdfMode === "sunSign") {
      const sign = executeFunctions.getNodeParameter(
        "sunSign",
        itemIndex,
        "Ari",
      ) as string;
      body.sign = sign;
    } else {
      // Personalized mode
      const birthYear = executeFunctions.getNodeParameter(
        "pdfBirthYear",
        itemIndex,
      ) as number;
      const birthMonth = executeFunctions.getNodeParameter(
        "pdfBirthMonth",
        itemIndex,
      ) as number;
      const birthDay = executeFunctions.getNodeParameter(
        "pdfBirthDay",
        itemIndex,
      ) as number;
      const birthHour = executeFunctions.getNodeParameter(
        "pdfBirthHour",
        itemIndex,
      ) as number;
      const birthMinute = executeFunctions.getNodeParameter(
        "pdfBirthMinute",
        itemIndex,
      ) as number;
      const birthCity = executeFunctions.getNodeParameter(
        "pdfBirthCity",
        itemIndex,
      ) as string;
      const birthCountryCode = executeFunctions.getNodeParameter(
        "pdfBirthCountryCode",
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
      PDF_ENDPOINTS[op],
      apiKey,
      body,
    );

    return responseData;
  }

  // Handle natal report PDF
  if (op === "natalReport") {
    const birthData = buildBirthData(executeFunctions, itemIndex);

    const name = executeFunctions.getNodeParameter(
      "name",
      itemIndex,
      "",
    ) as string;

    const pdfOptions = buildPdfOptions(context);

    const body: IDataObject = {
      subject: {
        birth_data: birthData,
      },
      pdf_options: pdfOptions,
    };

    if (name) {
      (body.subject as IDataObject).name = name;
    }

    const responseData = await makeApiRequest(
      executeFunctions,
      "POST",
      baseUrl,
      PDF_ENDPOINTS.natalReport,
      apiKey,
      body,
    );

    return responseData;
  }

  // Fallback
  const responseData = await makeApiRequest(
    executeFunctions,
    "GET",
    baseUrl,
    PDF_ENDPOINTS.horoscopeData,
    apiKey,
  );

  return responseData;
}
