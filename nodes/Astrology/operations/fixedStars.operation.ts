import type { INodeProperties } from "n8n-workflow";
import {
  createBirthDataFields,
  createLocationFields,
  createSimplifyField,
  createNameField,
} from "../shared";
import {
  createFixedStarsPresetField,
  createConjunctionOrbField,
  createOppositionOrbField,
  createIncludeStarInterpretationsField,
} from "../shared/fixedStars.fields";

/**
 * Operation selector for fixedStars resource
 */
const fixedStarsOperationField: INodeProperties = {
  displayName: "Operation",
  name: "operation",
  type: "options",
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ["fixedStars"],
    },
  },
  options: [
    {
      name: "Conjunctions",
      value: "conjunctions",
      description: "Find planetary conjunctions to fixed stars in natal chart",
      action: "Get star conjunctions",
    },
    {
      name: "Positions",
      value: "positions",
      description: "Calculate current positions of fixed stars in zodiac",
      action: "Get star positions",
    },
    {
      name: "Presets",
      value: "presets",
      description: "Get information about available star presets",
      action: "Get star presets",
    },
    {
      name: "Report",
      value: "report",
      description: "Get comprehensive fixed stars analysis report",
      action: "Get star report",
    },
  ],
  default: "report",
};

/**
 * Operations that require birth data
 */
const BIRTH_DATA_OPERATIONS = ["positions", "conjunctions", "report"];

/**
 * Operations that use star presets
 */
const PRESET_OPERATIONS = ["positions", "conjunctions", "report"];

/**
 * Operations that use orb settings
 */
const ORB_OPERATIONS = ["conjunctions", "report"];

/**
 * All properties for the fixedStars resource
 */
export const fixedStarsOperations: INodeProperties[] = [
  // Operation selector
  fixedStarsOperationField,

  // Name field
  createNameField("fixedStars", BIRTH_DATA_OPERATIONS),

  // Birth data fields
  ...createBirthDataFields("fixedStars", BIRTH_DATA_OPERATIONS),

  // Location fields
  ...createLocationFields("fixedStars", BIRTH_DATA_OPERATIONS),

  // Star presets
  createFixedStarsPresetField("fixedStars", PRESET_OPERATIONS),

  // Orb settings
  createConjunctionOrbField("fixedStars", ORB_OPERATIONS),
  createOppositionOrbField("fixedStars", ORB_OPERATIONS),

  // Include interpretations
  createIncludeStarInterpretationsField("fixedStars", BIRTH_DATA_OPERATIONS),

  // Simplify output
  createSimplifyField("fixedStars"),
];
