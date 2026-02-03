import type { INodeProperties } from "n8n-workflow";
import {
  createBirthDataFields,
  createLocationFields,
  createSimplifyField,
  createLanguageField,
} from "../shared";
import {
  createKabbalahSystemField,
  createGematriaTextField,
  createGematriaMethodsField,
  createFindEquivalentsField,
  createIncludeDaatField,
  createIncludePathsField,
} from "../shared/kabbalah.fields";

/**
 * Operation selector for kabbalah resource
 */
const kabbalahOperationField: INodeProperties = {
  displayName: "Operation",
  name: "operation",
  type: "options",
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ["kabbalah"],
    },
  },
  options: [
    {
      name: "Birth Angels",
      value: "birthAngels",
      description: "Get guardian angels based on birth date and time",
      action: "Get birth angels",
    },
    {
      name: "Gematria",
      value: "gematria",
      description: "Calculate gematria values for Hebrew or English text",
      action: "Calculate gematria",
    },
    {
      name: "Glossary: 72 Angels",
      value: "glossaryAngels72",
      description:
        "Get reference information about the 72 angels of the Kabbalah",
      action: "Get angels glossary",
    },
    {
      name: "Glossary: Hebrew Letters",
      value: "glossaryHebrewLetters",
      description:
        "Get reference information about Hebrew letters and their meanings",
      action: "Get hebrew letters glossary",
    },
    {
      name: "Glossary: Sephiroth",
      value: "glossarySephiroth",
      description:
        "Get reference information about the 10 Sephiroth of the Tree of Life",
      action: "Get sephiroth glossary",
    },
    {
      name: "Tikkun",
      value: "tikkun",
      description: "Get soul correction (Tikkun) analysis based on birth chart",
      action: "Get tikkun analysis",
    },
    {
      name: "Tree of Life Chart",
      value: "treeOfLifeChart",
      description: "Map natal chart to the 10 Sephiroth of the Tree of Life",
      action: "Get tree of life chart",
    },
  ],
  default: "treeOfLifeChart",
};

/**
 * Operations that require birth data
 */
const BIRTH_DATA_OPERATIONS = ["treeOfLifeChart", "birthAngels", "tikkun"];

/**
 * All properties for the kabbalah resource
 */
export const kabbalahOperations: INodeProperties[] = [
  // Operation selector
  kabbalahOperationField,

  // Birth data fields (for birth-based operations)
  ...createBirthDataFields("kabbalah", BIRTH_DATA_OPERATIONS),

  // Location fields (for birth-based operations)
  ...createLocationFields("kabbalah", BIRTH_DATA_OPERATIONS),

  // Kabbalah system field (for tree of life and birth angels)
  createKabbalahSystemField("kabbalah", ["treeOfLifeChart", "birthAngels"]),

  // Include Da'at field (for tree of life)
  createIncludeDaatField("kabbalah", ["treeOfLifeChart"]),

  // Include paths field (for tree of life)
  createIncludePathsField("kabbalah", ["treeOfLifeChart"]),

  // Gematria text field
  createGematriaTextField("kabbalah", ["gematria"]),

  // Gematria methods field
  createGematriaMethodsField("kabbalah", ["gematria"]),

  // Find equivalents field
  createFindEquivalentsField("kabbalah", ["gematria"]),

  // Language field
  createLanguageField("kabbalah"),

  // Simplify output (for all operations)
  createSimplifyField("kabbalah"),
];
