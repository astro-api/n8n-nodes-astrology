import type { INodeProperties } from "n8n-workflow";
import { createSimplifyField, createLanguageField } from "../shared";
import {
  createSearchField,
  createCountryCodeField,
  createPaginationFields,
  createSortFields,
} from "../shared/glossary.fields";

/**
 * Operation selector for glossary resource
 */
const glossaryOperationField: INodeProperties = {
  displayName: "Operation",
  name: "operation",
  type: "options",
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ["glossary"],
    },
  },
  options: [
    {
      name: "Active Points",
      value: "activePoints",
      description:
        "Get all astrological active points (planets, angles, nodes)",
      action: "Get active points",
    },
    {
      name: "Active Points (Primary)",
      value: "activePointsPrimary",
      description: "Get primary active points only (main planets)",
      action: "Get primary active points",
    },
    {
      name: "Cities",
      value: "cities",
      description: "Search cities database (15,000+ cities with coordinates)",
      action: "Search cities",
    },
    {
      name: "Countries",
      value: "countries",
      description: "Get list of all countries with codes",
      action: "Get countries",
    },
    {
      name: "Elements",
      value: "elements",
      description: "Get Fire, Earth, Air, Water element meanings",
      action: "Get elements",
    },
    {
      name: "Fixed Stars",
      value: "fixedStars",
      description: "Get fixed stars reference database",
      action: "Get fixed stars glossary",
    },
    {
      name: "Horary Categories",
      value: "horaryCategories",
      description: "Get horary question category meanings",
      action: "Get horary categories",
    },
    {
      name: "House Systems",
      value: "houseSystems",
      description: "Get reference for 23+ house systems",
      action: "Get house systems",
    },
    {
      name: "Houses",
      value: "houses",
      description: "Get 12 house interpretations and meanings",
      action: "Get houses",
    },
    {
      name: "Keywords",
      value: "keywords",
      description: "Get astrological keyword reference",
      action: "Get keywords",
    },
    {
      name: "Languages",
      value: "languages",
      description: "Get list of supported languages",
      action: "Get languages",
    },
    {
      name: "Life Areas",
      value: "lifeAreas",
      description: "Get house-related life area definitions",
      action: "Get life areas",
    },
    {
      name: "Themes",
      value: "themes",
      description: "Get astrological theme interpretations",
      action: "Get themes",
    },
    {
      name: "Zodiac Types",
      value: "zodiacTypes",
      description: "Get zodiac sign details and characteristics",
      action: "Get zodiac types",
    },
  ],
  default: "cities",
};

/**
 * Operations that support search
 */
const SEARCH_OPERATIONS = ["cities"];

/**
 * Operations that support country code filter
 */
const COUNTRY_CODE_OPERATIONS = ["cities"];

/**
 * Operations that support pagination
 */
const PAGINATION_OPERATIONS = ["cities", "countries"];

/**
 * Operations that support sorting
 */
const SORT_OPERATIONS = ["cities"];

/**
 * All properties for the glossary resource
 */
export const glossaryOperations: INodeProperties[] = [
  // Operation selector
  glossaryOperationField,

  // Search field (for cities)
  createSearchField("glossary", SEARCH_OPERATIONS),

  // Country code field (for cities)
  createCountryCodeField("glossary", COUNTRY_CODE_OPERATIONS),

  // Pagination fields
  ...createPaginationFields("glossary", PAGINATION_OPERATIONS),

  // Sort fields (for cities)
  ...createSortFields("glossary", SORT_OPERATIONS),

  // Language field (for most endpoints)
  createLanguageField("glossary"),

  // Simplify output (for all operations)
  createSimplifyField("glossary"),
];
