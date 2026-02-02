import type { INodeProperties } from "n8n-workflow";
import {
  createBirthDataFields,
  createLocationFields,
  createSecondSubjectFields,
  createTransitTimeFields,
  createDateRangeFields,
} from "../shared";

/**
 * Operation groups for displayOptions
 */
// Operations that use birth data (almost all except maybe specific ones)
const birthDataOperations = [
  "natal",
  "synastry",
  "transit",
  "composite",
  "solarReturn",
  "solarReturnTransits",
  "lunarReturn",
  "lunarReturnTransits",
  "progressions",
  "natalTransits",
  "directions",
];

// Operations requiring two subjects
const twoPersonOperations = ["synastry", "composite"];

// Operations requiring transit time
const transitOperations = ["transit"];

// Solar return operations
const solarReturnOperations = ["solarReturn", "solarReturnTransits"];

// Lunar return operations
const lunarReturnOperations = ["lunarReturn", "lunarReturnTransits"];

// Return transit operations (need orb field)
const returnTransitOperations = ["solarReturnTransits", "lunarReturnTransits"];

// Date-based operations (single target date)
const dateBasedOperations = ["progressions", "directions"];

// Date range operations
const dateRangeOperations = [
  "natalTransits",
  "solarReturnTransits",
  "lunarReturnTransits",
];

/**
 * All available active points for natal chart
 */
const activePointsOptions: INodeProperties["options"] = [
  // Planets
  { name: "Sun", value: "Sun" },
  { name: "Moon", value: "Moon" },
  { name: "Mercury", value: "Mercury" },
  { name: "Venus", value: "Venus" },
  { name: "Mars", value: "Mars" },
  { name: "Jupiter", value: "Jupiter" },
  { name: "Saturn", value: "Saturn" },
  { name: "Uranus", value: "Uranus" },
  { name: "Neptune", value: "Neptune" },
  { name: "Pluto", value: "Pluto" },
  { name: "Earth", value: "Earth" },
  { name: "Chiron", value: "Chiron" },
  // Asteroids
  { name: "Ceres", value: "Ceres" },
  { name: "Pallas", value: "Pallas" },
  { name: "Juno", value: "Juno" },
  { name: "Vesta", value: "Vesta" },
  { name: "Aphrodite", value: "Aphrodite" },
  { name: "Persephone", value: "Persephone" },
  { name: "Artemis", value: "Artemis" },
  // Nodes
  { name: "Mean Node (North)", value: "Mean_Node" },
  { name: "True Node (North)", value: "True_Node" },
  { name: "Mean South Node", value: "Mean_South_Node" },
  { name: "True South Node", value: "True_South_Node" },
  // Lilith
  { name: "Mean Lilith", value: "Mean_Lilith" },
  { name: "True Lilith", value: "True_Lilith" },
  // Angles
  { name: "Ascendant", value: "Ascendant" },
  { name: "Medium Coeli (MC)", value: "Medium_Coeli" },
  { name: "Descendant", value: "Descendant" },
  { name: "Imum Coeli (IC)", value: "Imum_Coeli" },
  { name: "Vertex", value: "Vertex" },
  // Arabic Parts
  { name: "Part of Fortune", value: "Part_of_Fortune" },
  { name: "Part of Spirit", value: "Part_of_Spirit" },
  // Fixed Stars
  { name: "Aldebaran", value: "Aldebaran" },
  { name: "Regulus", value: "Regulus" },
  { name: "Antares", value: "Antares" },
  { name: "Fomalhaut", value: "Fomalhaut" },
  { name: "Sirius", value: "Sirius" },
  { name: "Arcturus", value: "Arcturus" },
  { name: "Vega", value: "Vega" },
  { name: "Capella", value: "Capella" },
  { name: "Spica", value: "Spica" },
  { name: "Procyon", value: "Procyon" },
  { name: "Algol", value: "Algol" },
  { name: "Rigel", value: "Rigel" },
  { name: "Betelgeuse", value: "Betelgeuse" },
  { name: "Altair", value: "Altair" },
  { name: "Pollux", value: "Pollux" },
  { name: "Deneb", value: "Deneb" },
  { name: "Castor", value: "Castor" },
  { name: "Bellatrix", value: "Bellatrix" },
  { name: "Alnilam", value: "Alnilam" },
  { name: "Alioth", value: "Alioth" },
  { name: "Mirach", value: "Mirach" },
  { name: "Hamal", value: "Hamal" },
  { name: "Achernar", value: "Achernar" },
];

/**
 * House system options
 */
const houseSystemOptions: INodeProperties["options"] = [
  { name: "Placidus", value: "P" },
  { name: "Whole Sign", value: "W" },
  { name: "Koch", value: "K" },
  { name: "Equal (Ascendant)", value: "A" },
  { name: "Regiomontanus", value: "R" },
  { name: "Campanus", value: "C" },
  { name: "Alcabitius", value: "B" },
  { name: "Morinus", value: "M" },
  { name: "Porphyrius", value: "O" },
  { name: "Equal (MC)", value: "E" },
  { name: "Vehlow Equal", value: "V" },
  { name: "Axial Rotation", value: "X" },
  { name: "Horizontal", value: "H" },
  { name: "Topocentric", value: "T" },
  { name: "Gauquelin", value: "G" },
];

/**
 * Operation selector for Charts resource
 */
const chartsOperationField: INodeProperties = {
  displayName: "Operation",
  name: "operation",
  type: "options",
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ["charts"],
    },
  },
  options: [
    {
      name: "Composite Chart",
      value: "composite",
      description:
        "Generate a merged midpoint chart representing the combined energy of two people as a relationship entity",
      action: "Generate composite chart",
    },
    {
      name: "Directions Chart",
      value: "directions",
      description:
        "Generate a primary directions chart for predictive timing of life events",
      action: "Generate directions chart",
    },
    {
      name: "Lunar Return Chart",
      value: "lunarReturn",
      description:
        "Generate a monthly forecast chart based on Moon returning to natal position",
      action: "Generate lunar return chart",
    },
    {
      name: "Lunar Return Transits",
      value: "lunarReturnTransits",
      description:
        "Analyze transits to lunar return chart - timing events within your lunar month cycle",
      action: "Get lunar return transits",
    },
    {
      name: "Natal Chart",
      value: "natal",
      description:
        "Generate a complete natal (birth) chart with planetary positions, house cusps, and aspects",
      action: "Generate natal chart",
    },
    {
      name: "Natal Transits",
      value: "natalTransits",
      description:
        "Analyze planetary transits over a date range against the natal chart for period forecasting",
      action: "Get natal transits",
    },
    {
      name: "Progressions Chart",
      value: "progressions",
      description:
        "Generate a secondary progressions chart showing internal development and life phase themes",
      action: "Generate progressions chart",
    },
    {
      name: "Solar Return Chart",
      value: "solarReturn",
      description:
        "Generate a birthday chart showing themes and predictions for the coming year based on Sun return",
      action: "Generate solar return chart",
    },
    {
      name: "Solar Return Transits",
      value: "solarReturnTransits",
      description:
        "Analyze transits to solar return chart - timing events within your birthday year",
      action: "Get solar return transits",
    },
    {
      name: "Synastry Chart",
      value: "synastry",
      description:
        "Generate a relationship compatibility chart comparing two birth charts to analyze partnership dynamics",
      action: "Generate synastry chart",
    },
    {
      name: "Transit Chart",
      value: "transit",
      description:
        "Generate a transit overlay showing planetary positions at a specific time against the natal chart",
      action: "Generate transit chart",
    },
  ],
  default: "natal",
};

/**
 * Subject name field (optional)
 */
const subjectNameField: INodeProperties = {
  displayName: "Subject Name",
  name: "subjectName",
  type: "string",
  displayOptions: {
    show: {
      resource: ["charts"],
    },
  },
  default: "",
  placeholder: "e.g. John Doe",
  description: "Optional name for the chart subject (used in report titles)",
};

/**
 * Birth second field (optional, for extra precision)
 */
const secondField: INodeProperties = {
  displayName: "Second",
  name: "second",
  type: "number",
  displayOptions: {
    show: {
      resource: ["charts"],
    },
  },
  default: 0,
  typeOptions: {
    minValue: 0,
    maxValue: 59,
  },
  description: "Birth second (0-59) - optional for extra precision",
};

/**
 * House system selector
 */
const houseSystemField: INodeProperties = {
  displayName: "House System",
  name: "houseSystem",
  type: "options",
  displayOptions: {
    show: {
      resource: ["charts"],
    },
  },
  options: houseSystemOptions,
  default: "P",
  description:
    "House calculation system. Placidus (most common), Whole Sign (traditional), Koch (time-based), Equal (simple), etc.",
};

/**
 * Zodiac type selector
 */
const zodiacTypeField: INodeProperties = {
  displayName: "Zodiac Type",
  name: "zodiacType",
  type: "options",
  displayOptions: {
    show: {
      resource: ["charts"],
    },
  },
  options: [
    {
      name: "Tropical (Western)",
      value: "Tropic",
      description:
        "Equinox-based zodiac used in Western astrology (signs aligned to seasons)",
    },
    {
      name: "Sidereal (Vedic)",
      value: "Sidereal",
      description:
        "Constellation-based zodiac used in Vedic/Indian astrology (signs aligned to stars)",
    },
  ],
  default: "Tropic",
  description:
    "Zodiac calculation method: Tropical (Western, season-based) or Sidereal (Vedic, star-based)",
};

/**
 * Active points preset selector
 */
const activePointsPresetField: INodeProperties = {
  displayName: "Active Points",
  name: "activePointsPreset",
  type: "options",
  displayOptions: {
    show: {
      resource: ["charts"],
    },
  },
  options: [
    {
      name: "Basic (9 Points)",
      value: "basic",
      description:
        "Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn, Ascendant, MC",
    },
    {
      name: "Custom",
      value: "custom",
      description: "Select specific points manually",
    },
    {
      name: "Full (54 Points)",
      value: "full",
      description:
        "All available celestial bodies including asteroids and fixed stars",
    },
    {
      name: "Modern (12 Points)",
      value: "modern",
      description: "Basic + Uranus, Neptune, Pluto",
    },
    {
      name: "Traditional (11 Points)",
      value: "traditional",
      description: "Classical planets + lunar nodes, Part of Fortune",
    },
  ],
  default: "modern",
  description: "Predefined set of celestial points to include in the chart",
};

/**
 * Custom active points multi-select (shown only when preset is 'custom')
 */
const customActivePointsField: INodeProperties = {
  displayName: "Custom Active Points",
  name: "customActivePoints",
  type: "multiOptions",
  displayOptions: {
    show: {
      resource: ["charts"],
      activePointsPreset: ["custom"],
    },
  },
  options: activePointsOptions,
  default: [
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
  description: "Select specific celestial points to include in the chart",
};

/**
 * Perspective selector
 */
const perspectiveField: INodeProperties = {
  displayName: "Perspective",
  name: "perspective",
  type: "options",
  displayOptions: {
    show: {
      resource: ["charts"],
    },
  },
  options: [
    {
      name: "Geocentric",
      value: "geocentric",
      description: "Earth-centered view (traditional)",
    },
    {
      name: "Heliocentric",
      value: "heliocentric",
      description: "Sun-centered view",
    },
    {
      name: "Draconic",
      value: "draconic",
      description: "Moon's Node as 0° Aries",
    },
    {
      name: "Barycentric",
      value: "barycentric",
      description: "Solar system center of mass",
    },
  ],
  default: "geocentric",
  description: "Reference point for calculating positions",
};

/**
 * Precision field
 */
const precisionField: INodeProperties = {
  displayName: "Precision",
  name: "precision",
  type: "number",
  displayOptions: {
    show: {
      resource: ["charts"],
    },
  },
  default: 2,
  typeOptions: {
    minValue: 0,
    maxValue: 8,
  },
  description: "Decimal precision for degree calculations (0-8)",
};

/**
 * Advanced options toggle
 */
const showAdvancedOptionsField: INodeProperties = {
  displayName: "Advanced Options",
  name: "showAdvancedOptions",
  type: "boolean",
  displayOptions: {
    show: {
      resource: ["charts"],
    },
  },
  default: false,
  description: "Whether to show advanced options like fixed stars and caching",
};

/**
 * Fixed stars enable toggle
 */
const enableFixedStarsField: INodeProperties = {
  displayName: "Include Fixed Stars Analysis",
  name: "enableFixedStars",
  type: "boolean",
  displayOptions: {
    show: {
      resource: ["charts"],
      showAdvancedOptions: [true],
    },
  },
  default: false,
  description:
    "Whether to include fixed star positions and aspects in the chart",
};

/**
 * Fixed star presets multi-select
 */
const fixedStarPresetsField: INodeProperties = {
  displayName: "Fixed Star Presets",
  name: "fixedStarPresets",
  type: "multiOptions",
  displayOptions: {
    show: {
      resource: ["charts"],
      showAdvancedOptions: [true],
      enableFixedStars: [true],
    },
  },
  options: [
    {
      name: "Essential",
      value: "essential",
      description: "Most important fixed stars (Royal Stars, etc.)",
    },
    {
      name: "Traditional",
      value: "traditional",
      description: "Stars used in traditional astrology",
    },
    {
      name: "Behenian",
      value: "behenian",
      description: "15 Behenian fixed stars used in medieval magic",
    },
    {
      name: "Extended",
      value: "extended",
      description: "Extended list of notable fixed stars",
    },
  ],
  default: ["essential"],
  description: "Preset groups of fixed stars to include",
};

/**
 * Include parans toggle
 */
const includeParansField: INodeProperties = {
  displayName: "Include Parans",
  name: "includeParans",
  type: "boolean",
  displayOptions: {
    show: {
      resource: ["charts"],
      showAdvancedOptions: [true],
      enableFixedStars: [true],
    },
  },
  default: false,
  description:
    "Whether to include paran calculations (stars co-rising, co-culminating, co-setting)",
};

/**
 * Include heliacal toggle
 */
const includeHeliacalField: INodeProperties = {
  displayName: "Include Heliacal",
  name: "includeHeliacal",
  type: "boolean",
  displayOptions: {
    show: {
      resource: ["charts"],
      showAdvancedOptions: [true],
      enableFixedStars: [true],
    },
  },
  default: false,
  description: "Whether to include heliacal rising/setting phenomena",
};

/**
 * Use cache toggle
 */
const useCacheField: INodeProperties = {
  displayName: "Use Cache",
  name: "useCache",
  type: "boolean",
  displayOptions: {
    show: {
      resource: ["charts"],
      showAdvancedOptions: [true],
    },
  },
  default: true,
  description: "Whether to use cached calculations when available",
};

/**
 * Solar Return year field
 */
const returnYearField: INodeProperties = {
  displayName: "Return Year",
  name: "returnYear",
  type: "number",
  displayOptions: {
    show: {
      resource: ["charts"],
      operation: solarReturnOperations,
    },
  },
  default: 2024,
  placeholder: "e.g. 2024",
  description: "Year for the solar return chart (year of birthday to analyze)",
  required: true,
};

/**
 * Use relocated return toggle
 */
const useRelocatedReturnField: INodeProperties = {
  displayName: "Use Relocated Location",
  name: "useRelocatedReturn",
  type: "boolean",
  displayOptions: {
    show: {
      resource: ["charts"],
      operation: solarReturnOperations,
    },
  },
  default: false,
  description:
    "Whether to calculate for a different location than birth place (relocation astrology)",
};

/**
 * Relocated return location type
 */
const returnLocationTypeField: INodeProperties = {
  displayName: "Return Location Type",
  name: "returnLocationType",
  type: "options",
  displayOptions: {
    show: {
      resource: ["charts"],
      operation: solarReturnOperations,
      useRelocatedReturn: [true],
    },
  },
  options: [
    {
      name: "City Name",
      value: "city",
      description: "Enter city and country",
    },
    {
      name: "Coordinates",
      value: "coordinates",
      description: "Enter exact latitude and longitude",
    },
  ],
  default: "city",
  description: "How to specify the relocated return location",
};

/**
 * Relocated return city
 */
const returnCityField: INodeProperties = {
  displayName: "Return City",
  name: "returnCity",
  type: "string",
  displayOptions: {
    show: {
      resource: ["charts"],
      operation: solarReturnOperations,
      useRelocatedReturn: [true],
      returnLocationType: ["city"],
    },
  },
  default: "",
  placeholder: "e.g. New York",
  description: "City where you will be on your birthday",
};

/**
 * Relocated return country code
 */
const returnCountryCodeField: INodeProperties = {
  displayName: "Return Country Code",
  name: "returnCountryCode",
  type: "string",
  displayOptions: {
    show: {
      resource: ["charts"],
      operation: solarReturnOperations,
      useRelocatedReturn: [true],
      returnLocationType: ["city"],
    },
  },
  default: "",
  placeholder: "e.g. US",
  description: "2-letter ISO country code for return location",
};

/**
 * Relocated return latitude
 */
const returnLatitudeField: INodeProperties = {
  displayName: "Return Latitude",
  name: "returnLatitude",
  type: "number",
  displayOptions: {
    show: {
      resource: ["charts"],
      operation: solarReturnOperations,
      useRelocatedReturn: [true],
      returnLocationType: ["coordinates"],
    },
  },
  default: 0,
  placeholder: "e.g. 40.71",
  typeOptions: {
    minValue: -90,
    maxValue: 90,
  },
  description: "Latitude of return location (-90 to 90)",
};

/**
 * Relocated return longitude
 */
const returnLongitudeField: INodeProperties = {
  displayName: "Return Longitude",
  name: "returnLongitude",
  type: "number",
  displayOptions: {
    show: {
      resource: ["charts"],
      operation: solarReturnOperations,
      useRelocatedReturn: [true],
      returnLocationType: ["coordinates"],
    },
  },
  default: 0,
  placeholder: "e.g. -74.01",
  typeOptions: {
    minValue: -180,
    maxValue: 180,
  },
  description: "Longitude of return location (-180 to 180)",
};

/**
 * Lunar Return date field
 */
const lunarReturnDateField: INodeProperties = {
  displayName: "Return Date",
  name: "lunarReturnDate",
  type: "string",
  displayOptions: {
    show: {
      resource: ["charts"],
      operation: lunarReturnOperations,
    },
  },
  default: "",
  placeholder: "2024-06-15",
  description:
    "Target date for lunar return (YYYY-MM-DD). Leave empty for current/next lunar return.",
};

/**
 * Progression/Direction date field
 */
const targetDateField: INodeProperties = {
  displayName: "Target Date",
  name: "targetDate",
  type: "string",
  displayOptions: {
    show: {
      resource: ["charts"],
      operation: dateBasedOperations,
    },
  },
  default: "",
  placeholder: "2024-06-15",
  description:
    "Target date for progression/direction calculation (YYYY-MM-DD format)",
  required: true,
};

/**
 * Simplify output toggle for charts resource
 */
const simplifyField: INodeProperties = {
  displayName: "Simplify",
  name: "simplify",
  type: "boolean",
  displayOptions: {
    show: {
      resource: ["charts"],
    },
  },
  default: true,
  description:
    "Whether to return simplified response with key data only. Disable for full API response with all metadata.",
};

/**
 * Orb field for return transit operations
 */
const orbField: INodeProperties = {
  displayName: "Orb (Degrees)",
  name: "orb",
  type: "number",
  displayOptions: {
    show: {
      resource: ["charts"],
      operation: returnTransitOperations,
    },
  },
  default: 1.0,
  typeOptions: {
    minValue: 0.1,
    maxValue: 10,
    numberPrecision: 1,
  },
  description:
    "Maximum orb in degrees for aspect exactness. Smaller orbs find fewer but more precise transits.",
};

/**
 * Combined charts operations export
 */
export const chartsOperations: INodeProperties[] = [
  chartsOperationField,

  // Subject 1 fields (for all operations)
  subjectNameField,
  ...createBirthDataFields("charts", birthDataOperations),
  secondField,
  ...createLocationFields("charts", birthDataOperations),

  // Subject 2 fields (for synastry, composite)
  ...createSecondSubjectFields("charts", twoPersonOperations),

  // Transit time fields (for transit operation)
  ...createTransitTimeFields("charts", transitOperations),

  // Solar Return fields
  returnYearField,
  useRelocatedReturnField,
  returnLocationTypeField,
  returnCityField,
  returnCountryCodeField,
  returnLatitudeField,
  returnLongitudeField,

  // Lunar Return fields
  lunarReturnDateField,

  // Progression/Direction date field
  targetDateField,

  // Date range fields (for natalTransits, solarReturnTransits, lunarReturnTransits)
  ...createDateRangeFields("charts", dateRangeOperations),

  // Orb field (for return transit operations)
  orbField,

  // Chart options (for most operations)
  houseSystemField,
  zodiacTypeField,
  activePointsPresetField,
  customActivePointsField,
  perspectiveField,
  precisionField,
  simplifyField,

  // Advanced options
  showAdvancedOptionsField,
  enableFixedStarsField,
  fixedStarPresetsField,
  includeParansField,
  includeHeliacalField,
  useCacheField,
];
