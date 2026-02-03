import type { INodeProperties } from "n8n-workflow";
import {
  createBirthDataFields,
  createLocationFields,
  createSimplifyField,
} from "../shared";
import {
  createAstrocartographyPlanetsField,
  createLineTypesField,
  createCoordinateDensityField,
  createCoordinatePrecisionField,
  createTargetLocationFields,
  createMapVisualOptionsFields,
  createPowerTypeField,
} from "../shared/astrocartography.fields";

/**
 * Operation selector for astrocartography resource
 */
const astrocartographyOperationField: INodeProperties = {
  displayName: "Operation",
  name: "operation",
  type: "options",
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ["astrocartography"],
    },
  },
  options: [
    {
      name: "Astrodynes",
      value: "astrodynes",
      description: "Calculate astrodynes (planetary power) for a location",
      action: "Calculate astrodynes",
    },
    {
      name: "Astrodynes Compare",
      value: "astrodynesCompare",
      description: "Compare astrodynes between multiple locations",
      action: "Compare astrodynes",
    },
    {
      name: "Compare Locations",
      value: "compareLocations",
      description: "Compare astrocartography influences for multiple locations",
      action: "Compare locations",
    },
    {
      name: "Line Meanings",
      value: "lineMeanings",
      description:
        "Get reference information about astrocartography line meanings",
      action: "Get line meanings",
    },
    {
      name: "Lines",
      value: "lines",
      description: "Get raw astrocartography line coordinate data",
      action: "Get lines",
    },
    {
      name: "Location Analysis",
      value: "locationAnalysis",
      description:
        "Analyze astrocartography influences for a specific location",
      action: "Analyze location",
    },
    {
      name: "Map",
      value: "map",
      description: "Generate an astrocartography map as SVG",
      action: "Generate map",
    },
    {
      name: "Paran Map",
      value: "paranMap",
      description: "Generate a paran (latitude crossing) map",
      action: "Generate paran map",
    },
    {
      name: "Power Zones",
      value: "powerZones",
      description: "Find locations with strongest planetary influences",
      action: "Find power zones",
    },
    {
      name: "Relocation Chart",
      value: "relocationChart",
      description: "Calculate a relocated chart for a new location",
      action: "Get relocation chart",
    },
    {
      name: "Render",
      value: "render",
      description: "Render astrocartography map as image (PNG/JPG)",
      action: "Render map",
    },
    {
      name: "Search Locations",
      value: "searchLocations",
      description: "Search for optimal locations based on criteria",
      action: "Search locations",
    },
    {
      name: "Supported Features",
      value: "supportedFeatures",
      description: "Get available astrocartography features and options",
      action: "Get supported features",
    },
  ],
  default: "map",
};

/**
 * Operations that require birth data
 */
const BIRTH_DATA_OPERATIONS = [
  "map",
  "render",
  "lines",
  "locationAnalysis",
  "searchLocations",
  "compareLocations",
  "relocationChart",
  "powerZones",
  "paranMap",
  "astrodynes",
  "astrodynesCompare",
];

/**
 * Operations that use planets selection
 */
const PLANETS_OPERATIONS = ["map", "render", "lines", "paranMap"];

/**
 * Operations that use line types
 */
const LINE_TYPES_OPERATIONS = ["map", "render", "lines"];

/**
 * Operations that use target location
 */
const TARGET_LOCATION_OPERATIONS = [
  "locationAnalysis",
  "relocationChart",
  "astrodynes",
];

/**
 * Operations that use map visual options
 */
const MAP_VISUAL_OPERATIONS = ["map", "render", "paranMap"];

/**
 * All properties for the astrocartography resource
 */
export const astrocartographyOperations: INodeProperties[] = [
  // Operation selector
  astrocartographyOperationField,

  // Birth data fields (for most operations)
  ...createBirthDataFields("astrocartography", BIRTH_DATA_OPERATIONS),

  // Location fields (for most operations)
  ...createLocationFields("astrocartography", BIRTH_DATA_OPERATIONS),

  // Planets field
  createAstrocartographyPlanetsField("astrocartography", PLANETS_OPERATIONS),

  // Line types field
  createLineTypesField("astrocartography", LINE_TYPES_OPERATIONS),

  // Coordinate density field (for lines operation)
  createCoordinateDensityField("astrocartography", ["lines"]),

  // Coordinate precision field (for lines operation)
  createCoordinatePrecisionField("astrocartography", ["lines"]),

  // Target location fields
  ...createTargetLocationFields("astrocartography", TARGET_LOCATION_OPERATIONS),

  // Map visual options
  ...createMapVisualOptionsFields("astrocartography", MAP_VISUAL_OPERATIONS),

  // Power type field (for power zones)
  createPowerTypeField("astrocartography", ["powerZones", "searchLocations"]),

  // Simplify output (for all operations)
  createSimplifyField("astrocartography"),
];
