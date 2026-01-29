import type { INodeProperties } from "n8n-workflow";

/**
 * Resource selector - shared across all operations
 * This is the first field shown in the node UI
 */
export const resourceField: INodeProperties = {
  displayName: "Resource",
  name: "resource",
  type: "options",
  noDataExpression: true,
  options: [
    {
      name: "Chart",
      value: "charts",
      description:
        "Generate natal (birth) charts with planetary positions, houses, and aspects for a given birth time and location",
    },
    {
      name: "Data",
      value: "data",
      description:
        "Get raw astrological calculations: planetary positions, house cusps, aspects between planets, and lunar phase data",
    },
    {
      name: "Horoscope",
      value: "horoscope",
      description:
        "Generate horoscope predictions by zodiac sign or personalized by birth data (daily, weekly, monthly, yearly)",
    },
  ],
  default: "data",
};
