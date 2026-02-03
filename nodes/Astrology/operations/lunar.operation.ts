import type { INodeProperties } from "n8n-workflow";
import {
  createDateTimeLocationFields,
  createDaysAheadField,
  createUseModernPlanetsField,
} from "../shared/dateTimeLocation.fields";
import { createSimplifyField } from "../shared";

/**
 * Operation selector for lunar resource
 */
const lunarOperationField: INodeProperties = {
  displayName: "Operation",
  name: "operation",
  type: "options",
  noDataExpression: true,
  displayOptions: {
    show: {
      resource: ["lunar"],
    },
  },
  options: [
    {
      name: "Calendar",
      value: "calendar",
      description:
        "Get lunar calendar for a specific year with all phases and events",
      action: "Get lunar calendar for year",
    },
    {
      name: "Events",
      value: "events",
      description:
        "Get upcoming lunar events (eclipses, supermoons, blue moons) with timing",
      action: "Get lunar events",
    },
    {
      name: "Mansions",
      value: "mansions",
      description:
        "Calculate lunar mansions (28 Nakshatras) - traditional lunar zodiac divisions",
      action: "Get lunar mansions",
    },
    {
      name: "Phases",
      value: "phases",
      description:
        "Get precise lunar phases with Swiss Ephemeris accuracy - illumination, angle, upcoming major phases",
      action: "Get lunar phases",
    },
    {
      name: "Void-of-Course",
      value: "voidOfCourse",
      description:
        "Track Void-of-Course Moon periods - when Moon makes no major aspects before sign change",
      action: "Get void of course periods",
    },
  ],
  default: "phases",
};

/**
 * Year field for calendar operation
 */
const calendarYearField: INodeProperties = {
  displayName: "Year",
  name: "calendarYear",
  type: "number",
  displayOptions: {
    show: {
      resource: ["lunar"],
      operation: ["calendar"],
    },
  },
  default: new Date().getFullYear(),
  placeholder: "e.g. 2024",
  description: "Year for the lunar calendar (e.g., 2024)",
  required: true,
};

/**
 * All properties for the lunar resource
 */
export const lunarOperations: INodeProperties[] = [
  // Operation selector
  lunarOperationField,

  // Calendar year field (only for calendar operation)
  calendarYearField,

  // DateTime + Location fields (for phases, voidOfCourse, mansions, events - not calendar)
  ...createDateTimeLocationFields("lunar", undefined, ["calendar"]),

  // Days ahead field (for phases, voidOfCourse, events)
  createDaysAheadField("lunar", ["phases", "voidOfCourse", "events"]),

  // Use modern planets field (only for voidOfCourse)
  createUseModernPlanetsField("lunar", ["voidOfCourse"]),

  // Simplify output (for all operations)
  createSimplifyField("lunar"),
];
