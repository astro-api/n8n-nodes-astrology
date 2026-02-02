import type { IDataObject, IExecuteFunctions } from "n8n-workflow";
import type { IHandlerContext, ChartsOperation } from "../interfaces/types";
import {
  buildBirthData,
  makeApiRequest,
  applySimplifyIfEnabled,
  buildSecondSubjectBirthData,
  buildTransitTime,
  buildReturnLocation,
} from "../shared";

/**
 * Endpoint mapping for chart operations
 */
const CHARTS_ENDPOINTS: Record<ChartsOperation, string> = {
  natal: "/api/v3/charts/natal",
  synastry: "/api/v3/charts/synastry",
  transit: "/api/v3/charts/transit",
  composite: "/api/v3/charts/composite",
  solarReturn: "/api/v3/charts/solar-return",
  solarReturnTransits: "/api/v3/charts/solar-return-transits",
  lunarReturn: "/api/v3/charts/lunar-return",
  lunarReturnTransits: "/api/v3/charts/lunar-return-transits",
  progressions: "/api/v3/charts/progressions",
  natalTransits: "/api/v3/charts/natal-transits",
  directions: "/api/v3/charts/directions",
};

/**
 * Active points presets mapping
 */
const ACTIVE_POINTS_PRESETS: Record<string, string[]> = {
  basic: [
    "Sun",
    "Moon",
    "Mercury",
    "Venus",
    "Mars",
    "Jupiter",
    "Saturn",
    "Ascendant",
    "Medium_Coeli",
  ],
  modern: [
    "Sun",
    "Moon",
    "Mercury",
    "Venus",
    "Mars",
    "Jupiter",
    "Saturn",
    "Uranus",
    "Neptune",
    "Pluto",
    "Ascendant",
    "Medium_Coeli",
  ],
  traditional: [
    "Sun",
    "Moon",
    "Mercury",
    "Venus",
    "Mars",
    "Jupiter",
    "Saturn",
    "Mean_Node",
    "True_Node",
    "Part_of_Fortune",
    "Ascendant",
    "Medium_Coeli",
  ],
  full: [
    // Planets
    "Sun",
    "Moon",
    "Mercury",
    "Venus",
    "Mars",
    "Jupiter",
    "Saturn",
    "Uranus",
    "Neptune",
    "Pluto",
    "Earth",
    "Chiron",
    // Asteroids
    "Ceres",
    "Pallas",
    "Juno",
    "Vesta",
    "Aphrodite",
    "Persephone",
    "Artemis",
    // Nodes
    "Mean_Node",
    "True_Node",
    "Mean_South_Node",
    "True_South_Node",
    // Lilith
    "Mean_Lilith",
    "True_Lilith",
    // Angles
    "Ascendant",
    "Medium_Coeli",
    "Descendant",
    "Imum_Coeli",
    "Vertex",
    // Arabic Parts
    "Part_of_Fortune",
    "Part_of_Spirit",
    // Fixed Stars
    "Aldebaran",
    "Regulus",
    "Antares",
    "Fomalhaut",
    "Sirius",
    "Arcturus",
    "Vega",
    "Capella",
    "Spica",
    "Procyon",
    "Algol",
    "Rigel",
    "Betelgeuse",
    "Altair",
    "Pollux",
    "Deneb",
    "Castor",
    "Bellatrix",
    "Alnilam",
    "Alioth",
    "Mirach",
    "Hamal",
    "Achernar",
  ],
};

/**
 * Handles all charts resource operations
 *
 * @param context - Handler context with execution functions and credentials
 * @param operation - The operation to execute
 * @returns API response data
 */
export async function handleChartsResource(
  context: IHandlerContext,
  operation: string,
): Promise<IDataObject> {
  const op = operation as ChartsOperation;

  switch (op) {
    case "natal":
      return handleNatalChart(context);
    case "synastry":
      return handleSynastryChart(context);
    case "transit":
      return handleTransitChart(context);
    case "composite":
      return handleCompositeChart(context);
    case "solarReturn":
      return handleSolarReturnChart(context);
    case "solarReturnTransits":
      return handleSolarReturnTransits(context);
    case "lunarReturn":
      return handleLunarReturnChart(context);
    case "lunarReturnTransits":
      return handleLunarReturnTransits(context);
    case "progressions":
      return handleProgressionsChart(context);
    case "natalTransits":
      return handleNatalTransits(context);
    case "directions":
      return handleDirectionsChart(context);
    default:
      throw new Error(
        `The operation '${operation}' is not supported for the charts resource`,
      );
  }
}

/**
 * Handles natal chart generation
 *
 * @param context - Handler context
 * @returns Natal chart data from API
 */
async function handleNatalChart(
  context: IHandlerContext,
): Promise<IDataObject> {
  const { executeFunctions, itemIndex, baseUrl, apiKey } = context;

  // Build birth data using shared helper
  const birthData = buildBirthData(executeFunctions, itemIndex);

  // Add optional second field
  const second = executeFunctions.getNodeParameter(
    "second",
    itemIndex,
    0,
  ) as number;

  // Build birth data object with optional second
  const birthDataWithSecond: IDataObject = {
    ...birthData,
    ...(second > 0 && { second }),
  };

  // Get subject name (optional)
  const subjectName = executeFunctions.getNodeParameter(
    "subjectName",
    itemIndex,
    "",
  ) as string;

  // Build subject object
  const subject: IDataObject = {
    birth_data: birthDataWithSecond,
  };
  if (subjectName) {
    subject.name = subjectName;
  }

  // Get chart options
  const houseSystem = executeFunctions.getNodeParameter(
    "houseSystem",
    itemIndex,
  ) as string;
  const zodiacType = executeFunctions.getNodeParameter(
    "zodiacType",
    itemIndex,
  ) as string;
  const perspective = executeFunctions.getNodeParameter(
    "perspective",
    itemIndex,
  ) as string;
  const precision = executeFunctions.getNodeParameter(
    "precision",
    itemIndex,
  ) as number;

  // Determine active points based on preset or custom selection
  const activePointsPreset = executeFunctions.getNodeParameter(
    "activePointsPreset",
    itemIndex,
  ) as string;
  let activePoints: string[];

  if (activePointsPreset === "custom") {
    activePoints = executeFunctions.getNodeParameter(
      "customActivePoints",
      itemIndex,
    ) as string[];
  } else {
    activePoints =
      ACTIVE_POINTS_PRESETS[activePointsPreset] || ACTIVE_POINTS_PRESETS.modern;
  }

  // Build options object
  const options: IDataObject = {
    house_system: houseSystem,
    zodiac_type: zodiacType,
    active_points: activePoints,
    precision,
    perspective,
  };

  // Handle advanced options
  const showAdvancedOptions = executeFunctions.getNodeParameter(
    "showAdvancedOptions",
    itemIndex,
    false,
  ) as boolean;

  if (showAdvancedOptions) {
    const useCache = executeFunctions.getNodeParameter(
      "useCache",
      itemIndex,
      true,
    ) as boolean;
    options.use_cache = useCache;

    const enableFixedStars = executeFunctions.getNodeParameter(
      "enableFixedStars",
      itemIndex,
      false,
    ) as boolean;

    if (enableFixedStars) {
      const fixedStarPresets = executeFunctions.getNodeParameter(
        "fixedStarPresets",
        itemIndex,
      ) as string[];
      const includeParans = executeFunctions.getNodeParameter(
        "includeParans",
        itemIndex,
        false,
      ) as boolean;
      const includeHeliacal = executeFunctions.getNodeParameter(
        "includeHeliacal",
        itemIndex,
        false,
      ) as boolean;

      options.fixed_stars = {
        presets: fixedStarPresets,
        include_parans: includeParans,
        include_heliacal: includeHeliacal,
      };
    }
  }

  // Build final request body
  const body: IDataObject = {
    subject,
    options,
  };

  const responseData = await makeApiRequest(
    executeFunctions,
    "POST",
    baseUrl,
    "/api/v3/charts/natal",
    apiKey,
    body,
  );

  return applySimplifyIfEnabled(executeFunctions, itemIndex, responseData);
}

/**
 * Gets common chart options
 */
function getChartOptions(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
): IDataObject {
  const houseSystem = executeFunctions.getNodeParameter(
    "houseSystem",
    itemIndex,
  ) as string;
  const zodiacType = executeFunctions.getNodeParameter(
    "zodiacType",
    itemIndex,
  ) as string;
  const perspective = executeFunctions.getNodeParameter(
    "perspective",
    itemIndex,
  ) as string;
  const precision = executeFunctions.getNodeParameter(
    "precision",
    itemIndex,
  ) as number;

  const activePointsPreset = executeFunctions.getNodeParameter(
    "activePointsPreset",
    itemIndex,
  ) as string;
  let activePoints: string[];

  if (activePointsPreset === "custom") {
    activePoints = executeFunctions.getNodeParameter(
      "customActivePoints",
      itemIndex,
    ) as string[];
  } else {
    activePoints =
      ACTIVE_POINTS_PRESETS[activePointsPreset] || ACTIVE_POINTS_PRESETS.modern;
  }

  return {
    house_system: houseSystem,
    zodiac_type: zodiacType,
    active_points: activePoints,
    precision,
    perspective,
  };
}

/**
 * Handles synastry chart generation (two-person relationship chart)
 */
async function handleSynastryChart(
  context: IHandlerContext,
): Promise<IDataObject> {
  const { executeFunctions, itemIndex, baseUrl, apiKey } = context;

  // Build subject 1
  const birthData1 = buildBirthData(executeFunctions, itemIndex);
  const subjectName1 = executeFunctions.getNodeParameter(
    "subjectName",
    itemIndex,
    "",
  ) as string;

  // Build subject 2
  const birthData2 = buildSecondSubjectBirthData(executeFunctions, itemIndex);
  const subjectName2 = executeFunctions.getNodeParameter(
    "subject2Name",
    itemIndex,
    "",
  ) as string;

  // Get options
  const options = getChartOptions(executeFunctions, itemIndex);

  // Build request body
  const body: IDataObject = {
    subject1: {
      birth_data: birthData1,
      ...(subjectName1 && { name: subjectName1 }),
    },
    subject2: {
      birth_data: birthData2,
      ...(subjectName2 && { name: subjectName2 }),
    },
    options,
  };

  const responseData = await makeApiRequest(
    executeFunctions,
    "POST",
    baseUrl,
    CHARTS_ENDPOINTS.synastry,
    apiKey,
    body,
  );

  return applySimplifyIfEnabled(executeFunctions, itemIndex, responseData);
}

/**
 * Handles transit chart generation (transits overlay on natal)
 */
async function handleTransitChart(
  context: IHandlerContext,
): Promise<IDataObject> {
  const { executeFunctions, itemIndex, baseUrl, apiKey } = context;

  // Build natal subject
  const birthData = buildBirthData(executeFunctions, itemIndex);
  const subjectName = executeFunctions.getNodeParameter(
    "subjectName",
    itemIndex,
    "",
  ) as string;

  // Build transit time
  const transitTime = buildTransitTime(executeFunctions, itemIndex);

  // Get options
  const options = getChartOptions(executeFunctions, itemIndex);

  // Build request body
  const body: IDataObject = {
    subject: {
      birth_data: birthData,
      ...(subjectName && { name: subjectName }),
    },
    transit_time: {
      datetime: transitTime,
    },
    options,
  };

  const responseData = await makeApiRequest(
    executeFunctions,
    "POST",
    baseUrl,
    CHARTS_ENDPOINTS.transit,
    apiKey,
    body,
  );

  return applySimplifyIfEnabled(executeFunctions, itemIndex, responseData);
}

/**
 * Handles composite chart generation (merged relationship chart)
 */
async function handleCompositeChart(
  context: IHandlerContext,
): Promise<IDataObject> {
  const { executeFunctions, itemIndex, baseUrl, apiKey } = context;

  // Build subject 1
  const birthData1 = buildBirthData(executeFunctions, itemIndex);
  const subjectName1 = executeFunctions.getNodeParameter(
    "subjectName",
    itemIndex,
    "",
  ) as string;

  // Build subject 2
  const birthData2 = buildSecondSubjectBirthData(executeFunctions, itemIndex);
  const subjectName2 = executeFunctions.getNodeParameter(
    "subject2Name",
    itemIndex,
    "",
  ) as string;

  // Get options
  const options = getChartOptions(executeFunctions, itemIndex);

  // Build request body
  const body: IDataObject = {
    subject1: {
      birth_data: birthData1,
      ...(subjectName1 && { name: subjectName1 }),
    },
    subject2: {
      birth_data: birthData2,
      ...(subjectName2 && { name: subjectName2 }),
    },
    options,
  };

  const responseData = await makeApiRequest(
    executeFunctions,
    "POST",
    baseUrl,
    CHARTS_ENDPOINTS.composite,
    apiKey,
    body,
  );

  return applySimplifyIfEnabled(executeFunctions, itemIndex, responseData);
}

/**
 * Handles solar return chart generation (birthday year forecast)
 */
async function handleSolarReturnChart(
  context: IHandlerContext,
): Promise<IDataObject> {
  const { executeFunctions, itemIndex, baseUrl, apiKey } = context;

  // Build natal subject
  const birthData = buildBirthData(executeFunctions, itemIndex);
  const subjectName = executeFunctions.getNodeParameter(
    "subjectName",
    itemIndex,
    "",
  ) as string;

  // Get return year
  const returnYear = executeFunctions.getNodeParameter(
    "returnYear",
    itemIndex,
  ) as number;

  // Get options
  const options = getChartOptions(executeFunctions, itemIndex);

  // Build request body
  const body: IDataObject = {
    subject: {
      birth_data: birthData,
      ...(subjectName && { name: subjectName }),
    },
    return_year: returnYear,
    options,
  };

  // Handle relocated return location
  const returnLocation = buildReturnLocation(executeFunctions, itemIndex);
  if (returnLocation) {
    body.return_location = returnLocation;
  }

  const responseData = await makeApiRequest(
    executeFunctions,
    "POST",
    baseUrl,
    CHARTS_ENDPOINTS.solarReturn,
    apiKey,
    body,
  );

  return applySimplifyIfEnabled(executeFunctions, itemIndex, responseData);
}

/**
 * Handles lunar return chart generation (monthly forecast)
 */
async function handleLunarReturnChart(
  context: IHandlerContext,
): Promise<IDataObject> {
  const { executeFunctions, itemIndex, baseUrl, apiKey } = context;

  // Build natal subject
  const birthData = buildBirthData(executeFunctions, itemIndex);
  const subjectName = executeFunctions.getNodeParameter(
    "subjectName",
    itemIndex,
    "",
  ) as string;

  // Get return date (optional)
  const lunarReturnDate = executeFunctions.getNodeParameter(
    "lunarReturnDate",
    itemIndex,
    "",
  ) as string;

  // Get options
  const options = getChartOptions(executeFunctions, itemIndex);

  // Build request body
  const body: IDataObject = {
    subject: {
      birth_data: birthData,
      ...(subjectName && { name: subjectName }),
    },
    options,
  };

  if (lunarReturnDate) {
    body.return_date = lunarReturnDate;
  }

  const responseData = await makeApiRequest(
    executeFunctions,
    "POST",
    baseUrl,
    CHARTS_ENDPOINTS.lunarReturn,
    apiKey,
    body,
  );

  return applySimplifyIfEnabled(executeFunctions, itemIndex, responseData);
}

/**
 * Handles progressions chart generation (secondary progressions)
 */
async function handleProgressionsChart(
  context: IHandlerContext,
): Promise<IDataObject> {
  const { executeFunctions, itemIndex, baseUrl, apiKey } = context;

  // Build natal subject
  const birthData = buildBirthData(executeFunctions, itemIndex);
  const subjectName = executeFunctions.getNodeParameter(
    "subjectName",
    itemIndex,
    "",
  ) as string;

  // Get target date
  const targetDate = executeFunctions.getNodeParameter(
    "targetDate",
    itemIndex,
  ) as string;

  // Get options
  const options = getChartOptions(executeFunctions, itemIndex);

  // Build request body
  const body: IDataObject = {
    subject: {
      birth_data: birthData,
      ...(subjectName && { name: subjectName }),
    },
    progression_date: targetDate,
    options,
  };

  const responseData = await makeApiRequest(
    executeFunctions,
    "POST",
    baseUrl,
    CHARTS_ENDPOINTS.progressions,
    apiKey,
    body,
  );

  return applySimplifyIfEnabled(executeFunctions, itemIndex, responseData);
}

/**
 * Handles natal transits analysis (transit period over date range)
 */
async function handleNatalTransits(
  context: IHandlerContext,
): Promise<IDataObject> {
  const { executeFunctions, itemIndex, baseUrl, apiKey } = context;

  // Build natal subject
  const birthData = buildBirthData(executeFunctions, itemIndex);
  const subjectName = executeFunctions.getNodeParameter(
    "subjectName",
    itemIndex,
    "",
  ) as string;

  // Get date range
  const startDate = executeFunctions.getNodeParameter(
    "startDate",
    itemIndex,
  ) as string;
  const endDate = executeFunctions.getNodeParameter(
    "endDate",
    itemIndex,
  ) as string;

  // Build request body
  const body: IDataObject = {
    subject: {
      birth_data: birthData,
      ...(subjectName && { name: subjectName }),
    },
    start_date: startDate,
    end_date: endDate,
  };

  const responseData = await makeApiRequest(
    executeFunctions,
    "POST",
    baseUrl,
    CHARTS_ENDPOINTS.natalTransits,
    apiKey,
    body,
  );

  return applySimplifyIfEnabled(executeFunctions, itemIndex, responseData);
}

/**
 * Handles directions chart generation (primary directions)
 */
async function handleDirectionsChart(
  context: IHandlerContext,
): Promise<IDataObject> {
  const { executeFunctions, itemIndex, baseUrl, apiKey } = context;

  // Build natal subject
  const birthData = buildBirthData(executeFunctions, itemIndex);
  const subjectName = executeFunctions.getNodeParameter(
    "subjectName",
    itemIndex,
    "",
  ) as string;

  // Get target date
  const targetDate = executeFunctions.getNodeParameter(
    "targetDate",
    itemIndex,
  ) as string;

  // Get options
  const options = getChartOptions(executeFunctions, itemIndex);

  // Build request body
  const body: IDataObject = {
    subject: {
      birth_data: birthData,
      ...(subjectName && { name: subjectName }),
    },
    direction_date: targetDate,
    options,
  };

  const responseData = await makeApiRequest(
    executeFunctions,
    "POST",
    baseUrl,
    CHARTS_ENDPOINTS.directions,
    apiKey,
    body,
  );

  return applySimplifyIfEnabled(executeFunctions, itemIndex, responseData);
}

/**
 * Handles solar return transits (transits to solar return chart over a date range)
 */
async function handleSolarReturnTransits(
  context: IHandlerContext,
): Promise<IDataObject> {
  const { executeFunctions, itemIndex, baseUrl, apiKey } = context;

  // Build natal subject
  const birthData = buildBirthData(executeFunctions, itemIndex);
  const subjectName = executeFunctions.getNodeParameter(
    "subjectName",
    itemIndex,
    "",
  ) as string;

  // Get return year
  const returnYear = executeFunctions.getNodeParameter(
    "returnYear",
    itemIndex,
  ) as number;

  // Get date range
  const startDate = executeFunctions.getNodeParameter(
    "startDate",
    itemIndex,
  ) as string;
  const endDate = executeFunctions.getNodeParameter(
    "endDate",
    itemIndex,
  ) as string;

  // Get orb
  const orb = executeFunctions.getNodeParameter(
    "orb",
    itemIndex,
    1.0,
  ) as number;

  // Build request body
  const body: IDataObject = {
    subject: {
      birth_data: birthData,
      ...(subjectName && { name: subjectName }),
    },
    return_year: returnYear,
    date_range: { start_date: startDate, end_date: endDate },
    orb,
  };

  // Handle relocated return location
  const returnLocation = buildReturnLocation(executeFunctions, itemIndex);
  if (returnLocation) {
    body.return_location = returnLocation;
  }

  const responseData = await makeApiRequest(
    executeFunctions,
    "POST",
    baseUrl,
    CHARTS_ENDPOINTS.solarReturnTransits,
    apiKey,
    body,
  );

  return applySimplifyIfEnabled(executeFunctions, itemIndex, responseData);
}

/**
 * Handles lunar return transits (transits to lunar return chart over a date range)
 */
async function handleLunarReturnTransits(
  context: IHandlerContext,
): Promise<IDataObject> {
  const { executeFunctions, itemIndex, baseUrl, apiKey } = context;

  // Build natal subject
  const birthData = buildBirthData(executeFunctions, itemIndex);
  const subjectName = executeFunctions.getNodeParameter(
    "subjectName",
    itemIndex,
    "",
  ) as string;

  // Get return date (optional)
  const lunarReturnDate = executeFunctions.getNodeParameter(
    "lunarReturnDate",
    itemIndex,
    "",
  ) as string;

  // Get date range
  const startDate = executeFunctions.getNodeParameter(
    "startDate",
    itemIndex,
  ) as string;
  const endDate = executeFunctions.getNodeParameter(
    "endDate",
    itemIndex,
  ) as string;

  // Get orb
  const orb = executeFunctions.getNodeParameter(
    "orb",
    itemIndex,
    1.0,
  ) as number;

  // Build request body
  const body: IDataObject = {
    subject: {
      birth_data: birthData,
      ...(subjectName && { name: subjectName }),
    },
    date_range: { start_date: startDate, end_date: endDate },
    orb,
  };

  if (lunarReturnDate) {
    body.return_date = lunarReturnDate;
  }

  const responseData = await makeApiRequest(
    executeFunctions,
    "POST",
    baseUrl,
    CHARTS_ENDPOINTS.lunarReturnTransits,
    apiKey,
    body,
  );

  return applySimplifyIfEnabled(executeFunctions, itemIndex, responseData);
}
