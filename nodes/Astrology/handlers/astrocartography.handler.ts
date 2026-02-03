import type { IDataObject } from "n8n-workflow";
import type {
  IHandlerContext,
  AstrocartographyOperation,
} from "../interfaces/types";
import {
  buildBirthData,
  makeApiRequest,
  createSubjectRequest,
  applySimplifyIfEnabled,
} from "../shared/helpers";

/**
 * Endpoint mapping for astrocartography operations
 */
const ASTROCARTOGRAPHY_ENDPOINTS: Record<AstrocartographyOperation, string> = {
  supportedFeatures: "/api/v3/astrocartography/supported-features",
  lineMeanings: "/api/v3/astrocartography/line-meanings",
  map: "/api/v3/astrocartography/map",
  render: "/api/v3/astrocartography/render",
  lines: "/api/v3/astrocartography/lines",
  locationAnalysis: "/api/v3/astrocartography/location-analysis",
  searchLocations: "/api/v3/astrocartography/search-locations",
  compareLocations: "/api/v3/astrocartography/compare-locations",
  relocationChart: "/api/v3/astrocartography/relocation-chart",
  powerZones: "/api/v3/astrocartography/power-zones",
  paranMap: "/api/v3/astrocartography/paran-map",
  astrodynes: "/api/v3/astrocartography/astrodynes",
  astrodynesCompare: "/api/v3/astrocartography/astrodynes/compare",
};

/**
 * GET operations (no body required)
 */
const GET_OPERATIONS: AstrocartographyOperation[] = [
  "supportedFeatures",
  "lineMeanings",
];

/**
 * Operations that use planets selection
 */
const PLANETS_OPERATIONS: AstrocartographyOperation[] = [
  "map",
  "render",
  "lines",
  "paranMap",
];

/**
 * Operations that use line types
 */
const LINE_TYPES_OPERATIONS: AstrocartographyOperation[] = [
  "map",
  "render",
  "lines",
];

/**
 * Operations that use target location
 */
const TARGET_LOCATION_OPERATIONS: AstrocartographyOperation[] = [
  "locationAnalysis",
  "relocationChart",
  "astrodynes",
];

/**
 * Operations that use map visual options
 */
const MAP_VISUAL_OPERATIONS: AstrocartographyOperation[] = [
  "map",
  "render",
  "paranMap",
];

/**
 * Builds map options from node parameters
 */
function buildMapOptions(
  context: IHandlerContext,
  op: AstrocartographyOperation,
): IDataObject {
  const { executeFunctions, itemIndex } = context;
  const mapOptions: IDataObject = {};

  if (PLANETS_OPERATIONS.includes(op)) {
    const planets = executeFunctions.getNodeParameter("acPlanets", itemIndex, [
      "Sun",
      "Moon",
      "Venus",
      "Mars",
      "Jupiter",
    ]) as string[];
    mapOptions.planets = planets;
  }

  if (LINE_TYPES_OPERATIONS.includes(op)) {
    const lineTypes = executeFunctions.getNodeParameter(
      "lineTypes",
      itemIndex,
      ["AC", "MC"],
    ) as string[];
    mapOptions.line_types = lineTypes;
  }

  if (op === "lines") {
    const coordinatePrecision = executeFunctions.getNodeParameter(
      "coordinatePrecision",
      itemIndex,
      4,
    ) as number;
    mapOptions.coordinate_precision = coordinatePrecision;
  }

  return mapOptions;
}

/**
 * Builds visual options from node parameters
 */
function buildVisualOptions(context: IHandlerContext): IDataObject {
  const { executeFunctions, itemIndex } = context;

  const theme = executeFunctions.getNodeParameter(
    "mapTheme",
    itemIndex,
    "light",
  ) as string;

  const width = executeFunctions.getNodeParameter(
    "mapWidth",
    itemIndex,
    1200,
  ) as number;

  const height = executeFunctions.getNodeParameter(
    "mapHeight",
    itemIndex,
    800,
  ) as number;

  return {
    theme,
    width,
    height,
  };
}

/**
 * Builds target location from node parameters
 */
function buildTargetLocation(context: IHandlerContext): IDataObject {
  const { executeFunctions, itemIndex } = context;

  const city = executeFunctions.getNodeParameter(
    "targetCity",
    itemIndex,
    "",
  ) as string;

  const countryCode = executeFunctions.getNodeParameter(
    "targetCountryCode",
    itemIndex,
    "",
  ) as string;

  const latitude = executeFunctions.getNodeParameter(
    "targetLatitude",
    itemIndex,
    0,
  ) as number;

  const longitude = executeFunctions.getNodeParameter(
    "targetLongitude",
    itemIndex,
    0,
  ) as number;

  const location: IDataObject = {};

  if (city) location.city = city;
  if (countryCode) location.country_code = countryCode;
  if (latitude !== 0) location.latitude = latitude;
  if (longitude !== 0) location.longitude = longitude;

  return location;
}

/**
 * Handles all astrocartography resource operations
 *
 * @param context - Handler context with execution functions and credentials
 * @param operation - The operation to execute
 * @returns API response data
 */
export async function handleAstrocartographyResource(
  context: IHandlerContext,
  operation: string,
): Promise<IDataObject> {
  const { executeFunctions, itemIndex, baseUrl, apiKey } = context;
  const op = operation as AstrocartographyOperation;

  const endpoint =
    ASTROCARTOGRAPHY_ENDPOINTS[op] || ASTROCARTOGRAPHY_ENDPOINTS.map;

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

  // POST operations with birth data
  const birthData = buildBirthData(executeFunctions, itemIndex);
  const body: IDataObject = {
    ...createSubjectRequest(birthData),
  };

  // Add map options
  const mapOptions = buildMapOptions(context, op);
  if (Object.keys(mapOptions).length > 0) {
    body.map_options = mapOptions;
  }

  // Add coordinate density for lines operation
  if (op === "lines") {
    const coordinateDensity = executeFunctions.getNodeParameter(
      "coordinateDensity",
      itemIndex,
      100,
    ) as number;
    body.coordinate_density = coordinateDensity;
  }

  // Add visual options
  if (MAP_VISUAL_OPERATIONS.includes(op)) {
    body.visual_options = buildVisualOptions(context);
  }

  // Add target location
  if (TARGET_LOCATION_OPERATIONS.includes(op)) {
    const targetLocation = buildTargetLocation(context);
    if (Object.keys(targetLocation).length > 0) {
      body.target_location = targetLocation;
    }
  }

  // Add power type for power zones and search
  if (op === "powerZones" || op === "searchLocations") {
    const powerType = executeFunctions.getNodeParameter(
      "powerType",
      itemIndex,
      "overall",
    ) as string;
    body.power_type = powerType;
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
