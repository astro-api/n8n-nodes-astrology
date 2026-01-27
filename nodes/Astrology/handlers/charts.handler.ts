import type { IDataObject } from "n8n-workflow";
import type { IHandlerContext, ChartsOperation } from "../interfaces/types";
import { buildBirthData, makeApiRequest, simplifyResponse } from "../shared";

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

  if (op === "natal") {
    return await handleNatalChart(context);
  }

  throw new Error(
    `The operation '${operation}' is not supported for the charts resource`,
  );
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

  const simplify = executeFunctions.getNodeParameter(
    "simplify",
    itemIndex,
    true,
  ) as boolean;

  return simplify ? simplifyResponse(responseData) : responseData;
}
