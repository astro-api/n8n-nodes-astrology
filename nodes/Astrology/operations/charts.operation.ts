import type { INodeProperties } from "n8n-workflow";
import { createBirthDataFields, createLocationFields } from "../shared";

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
      name: "Natal Chart",
      value: "natal",
      description:
        "Generate a complete natal (birth) chart with planetary positions, house cusps, and aspects",
      action: "Generate natal chart",
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
  description: "Astrological house calculation system",
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
      description: "Equinox-based zodiac used in Western astrology",
    },
    {
      name: "Sidereal (Vedic)",
      value: "Sidereal",
      description: "Constellation-based zodiac used in Vedic astrology",
    },
  ],
  default: "Tropic",
  description: "Zodiac calculation method",
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
    "Whether to return a simplified version of the response instead of the raw data",
};

/**
 * Combined charts operations export
 */
export const chartsOperations: INodeProperties[] = [
  chartsOperationField,
  subjectNameField,
  ...createBirthDataFields("charts"),
  secondField,
  ...createLocationFields("charts"),
  houseSystemField,
  zodiacTypeField,
  activePointsPresetField,
  customActivePointsField,
  perspectiveField,
  precisionField,
  simplifyField,
  showAdvancedOptionsField,
  enableFixedStarsField,
  fixedStarPresetsField,
  includeParansField,
  includeHeliacalField,
  useCacheField,
];
