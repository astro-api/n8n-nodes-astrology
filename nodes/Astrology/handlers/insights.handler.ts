import type { IDataObject } from "n8n-workflow";
import type { IHandlerContext, InsightsOperation } from "../interfaces/types";
import {
  buildBirthData,
  buildSecondSubjectBirthData,
  makeApiRequest,
  createSubjectRequest,
  applySimplifyIfEnabled,
} from "../shared/helpers";

/**
 * Endpoint mapping for insights operations
 */
const INSIGHTS_ENDPOINTS: Record<InsightsOperation, string> = {
  // Discovery
  discover: "/api/v3/insights/",
  discoverRelationship: "/api/v3/insights/relationship/",
  // Relationship
  relationshipCompatibility: "/api/v3/insights/relationship/compatibility",
  relationshipCompatibilityScore:
    "/api/v3/insights/relationship/compatibility-score",
  relationshipLoveLanguages: "/api/v3/insights/relationship/love-languages",
  relationshipDavison: "/api/v3/insights/relationship/davison",
  relationshipTiming: "/api/v3/insights/relationship/timing",
  relationshipRedFlags: "/api/v3/insights/relationship/red-flags",
  // Pet
  petPersonality: "/api/v3/insights/pet/personality",
  petCompatibility: "/api/v3/insights/pet/compatibility",
  petTrainingWindows: "/api/v3/insights/pet/training-windows",
  petHealthSensitivities: "/api/v3/insights/pet/health-sensitivities",
  petMultiPetDynamics: "/api/v3/insights/pet/multi-pet-dynamics",
  // Wellness
  wellnessBodyMapping: "/api/v3/insights/wellness/body-mapping",
  wellnessBiorhythms: "/api/v3/insights/wellness/biorhythms",
  wellnessTiming: "/api/v3/insights/wellness/wellness-timing",
  wellnessEnergyPatterns: "/api/v3/insights/wellness/energy-patterns",
  wellnessScore: "/api/v3/insights/wellness/wellness-score",
  wellnessMoonCalendar: "/api/v3/insights/wellness/moon-wellness",
  // Financial
  financialMarketTiming: "/api/v3/insights/financial/market-timing",
  financialPersonalTrading: "/api/v3/insights/financial/personal-trading",
  financialGannAnalysis: "/api/v3/insights/financial/gann-analysis",
  financialBradleySiderograph: "/api/v3/insights/financial/bradley-siderograph",
  financialCryptoTiming: "/api/v3/insights/financial/crypto-timing",
  financialForexTiming: "/api/v3/insights/financial/forex-timing",
  // Business
  businessTeamDynamics: "/api/v3/insights/business/team-dynamics",
  businessHiringCompatibility: "/api/v3/insights/business/hiring-compatibility",
  businessLeadershipStyle: "/api/v3/insights/business/leadership-style",
  businessTiming: "/api/v3/insights/business/business-timing",
  businessDepartmentCompatibility:
    "/api/v3/insights/business/department-compatibility",
  businessSuccessionPlanning: "/api/v3/insights/business/succession-planning",
};

/**
 * GET operations (no body required)
 */
const GET_OPERATIONS: InsightsOperation[] = [
  "discover",
  "discoverRelationship",
];

/**
 * Operations that require two subjects
 */
const TWO_SUBJECT_OPERATIONS: InsightsOperation[] = [
  "businessHiringCompatibility",
  "businessSuccessionPlanning",
  "petCompatibility",
  "relationshipCompatibility",
  "relationshipCompatibilityScore",
  "relationshipLoveLanguages",
  "relationshipDavison",
  "relationshipRedFlags",
  "relationshipTiming",
];

/**
 * Pet operations
 */
const PET_OPERATIONS: InsightsOperation[] = [
  "petPersonality",
  "petCompatibility",
  "petTrainingWindows",
  "petHealthSensitivities",
  "petMultiPetDynamics",
];

/**
 * Operations that use date range
 */
const DATE_RANGE_OPERATIONS: InsightsOperation[] = [
  "businessTiming",
  "financialMarketTiming",
  "financialCryptoTiming",
  "financialForexTiming",
  "financialGannAnalysis",
  "financialBradleySiderograph",
  "relationshipTiming",
  "wellnessTiming",
];

/**
 * Builds pet options from node parameters
 */
function buildPetOptions(context: IHandlerContext): IDataObject {
  const { executeFunctions, itemIndex } = context;

  const species = executeFunctions.getNodeParameter(
    "petSpecies",
    itemIndex,
    "dog",
  ) as string;

  const breed = executeFunctions.getNodeParameter(
    "petBreed",
    itemIndex,
    "",
  ) as string;

  const petOptions: IDataObject = { species };
  if (breed) petOptions.breed = breed;

  return petOptions;
}

/**
 * Builds owner data from node parameters if enabled
 */
function buildOwnerData(context: IHandlerContext): IDataObject | undefined {
  const { executeFunctions, itemIndex } = context;

  const includeOwner = executeFunctions.getNodeParameter(
    "includeOwner",
    itemIndex,
    false,
  ) as boolean;

  if (!includeOwner) return undefined;

  return {
    birth_data: {
      year: executeFunctions.getNodeParameter(
        "ownerBirthYear",
        itemIndex,
        1990,
      ) as number,
      month: executeFunctions.getNodeParameter(
        "ownerBirthMonth",
        itemIndex,
        1,
      ) as number,
      day: executeFunctions.getNodeParameter(
        "ownerBirthDay",
        itemIndex,
        1,
      ) as number,
      hour: executeFunctions.getNodeParameter(
        "ownerBirthHour",
        itemIndex,
        12,
      ) as number,
      minute: executeFunctions.getNodeParameter(
        "ownerBirthMinute",
        itemIndex,
        0,
      ) as number,
    },
  };
}

/**
 * Handles all insights resource operations
 *
 * @param context - Handler context with execution functions and credentials
 * @param operation - The operation to execute
 * @returns API response data
 */
export async function handleInsightsResource(
  context: IHandlerContext,
  operation: string,
): Promise<IDataObject> {
  const { executeFunctions, itemIndex, baseUrl, apiKey } = context;
  const op = operation as InsightsOperation;

  const endpoint =
    INSIGHTS_ENDPOINTS[op] || INSIGHTS_ENDPOINTS.wellnessBiorhythms;

  // GET operations - no body
  if (GET_OPERATIONS.includes(op)) {
    const responseData = await makeApiRequest(
      executeFunctions,
      "GET",
      baseUrl,
      endpoint,
      apiKey,
    );

    return applySimplifyIfEnabled(executeFunctions, itemIndex, responseData);
  }

  // Two-subject operations
  if (TWO_SUBJECT_OPERATIONS.includes(op)) {
    const birthData = buildBirthData(executeFunctions, itemIndex);
    const secondBirthData = buildSecondSubjectBirthData(
      executeFunctions,
      itemIndex,
    );

    const language = executeFunctions.getNodeParameter(
      "language",
      itemIndex,
      "en",
    ) as string;

    const body: IDataObject = {
      subjects: [{ birth_data: birthData }, { birth_data: secondBirthData }],
      options: { language },
    };

    // Add pet options for pet compatibility
    if (op === "petCompatibility") {
      body.pet_options = buildPetOptions(context);
    }

    // Add date range if applicable
    if (DATE_RANGE_OPERATIONS.includes(op)) {
      try {
        const startDate = executeFunctions.getNodeParameter(
          "startDate",
          itemIndex,
          "",
        ) as string;
        const endDate = executeFunctions.getNodeParameter(
          "endDate",
          itemIndex,
          "",
        ) as string;
        if (startDate && endDate) {
          body.start_date = startDate;
          body.end_date = endDate;
        }
      } catch {
        // Date fields may not be available
      }
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

  // Single-subject operations
  const birthData = buildBirthData(executeFunctions, itemIndex);

  const language = executeFunctions.getNodeParameter(
    "language",
    itemIndex,
    "en",
  ) as string;

  const body: IDataObject = {
    ...createSubjectRequest(birthData),
    options: { language },
  };

  // Add pet options
  if (PET_OPERATIONS.includes(op)) {
    body.pet_options = buildPetOptions(context);

    // Add owner data if enabled
    const ownerData = buildOwnerData(context);
    if (ownerData) {
      body.owner = ownerData;
    }
  }

  // Add business activities for business timing
  if (op === "businessTiming") {
    const activities = executeFunctions.getNodeParameter(
      "businessActivities",
      itemIndex,
      ["product_launch", "meetings"],
    ) as string[];
    body.activities = activities;
  }

  // Add market type for financial operations
  if (op === "financialMarketTiming" || op === "financialPersonalTrading") {
    const marketType = executeFunctions.getNodeParameter(
      "marketType",
      itemIndex,
      "general",
    ) as string;
    body.market_type = marketType;
  }

  // Add wellness focus
  if (op === "wellnessTiming" || op === "wellnessScore") {
    const wellnessFocus = executeFunctions.getNodeParameter(
      "wellnessFocus",
      itemIndex,
      ["exercise", "sleep"],
    ) as string[];
    body.wellness_focus = wellnessFocus;
  }

  // Add date range if applicable
  if (DATE_RANGE_OPERATIONS.includes(op)) {
    try {
      const startDate = executeFunctions.getNodeParameter(
        "startDate",
        itemIndex,
        "",
      ) as string;
      const endDate = executeFunctions.getNodeParameter(
        "endDate",
        itemIndex,
        "",
      ) as string;
      if (startDate && endDate) {
        body.start_date = startDate;
        body.end_date = endDate;
      }
    } catch {
      // Date fields may not be available
    }
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
