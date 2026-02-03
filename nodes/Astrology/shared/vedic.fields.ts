import type { INodeProperties } from "n8n-workflow";

/**
 * Creates an ayanamsa field for Vedic calculations
 *
 * @param resourceName - The resource value to show this field for
 * @param showForOperations - Operations that should show this field (optional)
 */
export function createAyanamsaField(
  resourceName: string,
  showForOperations?: string[],
): INodeProperties {
  const displayOptions: INodeProperties["displayOptions"] = {
    show: {
      resource: [resourceName],
    },
  };

  if (showForOperations && showForOperations.length > 0) {
    displayOptions.show!.operation = showForOperations;
  }

  return {
    displayName: "Ayanamsa",
    name: "ayanamsa",
    type: "options",
    displayOptions,
    options: [
      {
        name: "Fagan-Bradley",
        value: "fagan_bradley",
        description: "Western sidereal (Fagan-Bradley)",
      },
      {
        name: "Galactic Center 0 Sag",
        value: "galactic_center_0_sag",
        description: "Galactic center at 0 degrees Sagittarius",
      },
      {
        name: "J.N. Bhasin",
        value: "jn_bhasin",
        description: "J.N. Bhasin ayanamsa.",
      },
      {
        name: "Krishnamurti (KP)",
        value: "krishnamurti",
        description: "Used in Krishnamurti Paddhati system",
      },
      {
        name: "Lahiri (Chitrapaksha)",
        value: "lahiri",
        description:
          "Most commonly used in India - official Indian government standard",
      },
      {
        name: "Raman",
        value: "raman",
        description: "B.V. Raman ayanamsa - popular in South India.",
      },
      {
        name: "True Citra",
        value: "true_citra",
        description: "True Citra ayanamsa based on Spica star",
      },
      {
        name: "True Pushya",
        value: "true_pushya",
        description: "True Pushya ayanamsa",
      },
      {
        name: "True Revati",
        value: "true_revati",
        description: "True Revati ayanamsa based on Zeta Piscium",
      },
      {
        name: "Yukteshwar",
        value: "yukteshwar",
        description: "Sri Yukteshwar ayanamsa",
      },
    ],
    default: "lahiri",
    description:
      "Ayanamsa (precession correction) system for Vedic calculations",
  };
}

/**
 * Creates a Vedic chart style field
 *
 * @param resourceName - The resource value to show this field for
 * @param showForOperations - Operations that should show this field (optional)
 */
export function createVedicStyleField(
  resourceName: string,
  showForOperations?: string[],
): INodeProperties {
  const displayOptions: INodeProperties["displayOptions"] = {
    show: {
      resource: [resourceName],
    },
  };

  if (showForOperations && showForOperations.length > 0) {
    displayOptions.show!.operation = showForOperations;
  }

  return {
    displayName: "Chart Style",
    name: "vedicStyle",
    type: "options",
    displayOptions,
    options: [
      {
        name: "North Indian",
        value: "north_indian",
        description:
          "Diamond-shaped chart with 12 triangular houses - Ascendant always at top",
      },
      {
        name: "South Indian",
        value: "south_indian",
        description:
          "Square chart with fixed signs - Ascendant marked with diagonal line",
      },
    ],
    default: "north_indian",
    description: "Visual style for the Vedic chart",
  };
}

/**
 * Creates a divisional chart field
 *
 * @param resourceName - The resource value to show this field for
 * @param showForOperations - Operations that should show this field (optional)
 */
export function createDivisionalChartField(
  resourceName: string,
  showForOperations?: string[],
): INodeProperties {
  const displayOptions: INodeProperties["displayOptions"] = {
    show: {
      resource: [resourceName],
    },
  };

  if (showForOperations && showForOperations.length > 0) {
    displayOptions.show!.operation = showForOperations;
  }

  return {
    displayName: "Divisional Chart",
    name: "divisionalChart",
    type: "options",
    displayOptions,
    options: [
      {
        name: "D1 - Rasi (Birth Chart)",
        value: "D1",
        description: "Main birth chart - overall life and personality",
      },
      {
        name: "D10 - Dasamsa (Career)",
        value: "D10",
        description: "Career, profession, and public life",
      },
      {
        name: "D12 - Dwadasamsa (Parents)",
        value: "D12",
        description: "Parents and ancestry",
      },
      {
        name: "D16 - Shodasamsa (Vehicles)",
        value: "D16",
        description: "Vehicles, conveyances, and comforts",
      },
      {
        name: "D2 - Hora (Wealth)",
        value: "D2",
        description: "Wealth and financial matters",
      },
      {
        name: "D20 - Vimsamsa (Spirituality)",
        value: "D20",
        description: "Spiritual progress and religious activities",
      },
      {
        name: "D24 - Chaturvimsamsa (Education)",
        value: "D24",
        description: "Education, learning, and knowledge",
      },
      {
        name: "D27 - Bhamsa (Strength)",
        value: "D27",
        description: "Strength and weakness analysis",
      },
      {
        name: "D3 - Drekkana (Siblings)",
        value: "D3",
        description: "Siblings, courage, and communication",
      },
      {
        name: "D30 - Trimsamsa (Misfortunes)",
        value: "D30",
        description: "Misfortunes, evils, and dangers",
      },
      {
        name: "D4 - Chaturthamsa (Fortune)",
        value: "D4",
        description: "Property, home, and fixed assets",
      },
      {
        name: "D40 - Khavedamsa (Auspiciousness)",
        value: "D40",
        description: "Auspicious and inauspicious effects",
      },
      {
        name: "D45 - Akshavedamsa (General)",
        value: "D45",
        description: "General indications and paternal legacy",
      },
      {
        name: "D60 - Shashtyamsa (Past Karma)",
        value: "D60",
        description:
          "Past life karma and its effects - most subtle divisional chart",
      },
      {
        name: "D7 - Saptamsa (Children)",
        value: "D7",
        description: "Children and progeny",
      },
      {
        name: "D9 - Navamsa (Marriage)",
        value: "D9",
        description:
          "Marriage, spouse, and dharma - most important divisional chart",
      },
    ],
    default: "D9",
    description: "Divisional chart (Varga) to calculate",
  };
}

/**
 * Creates Vedic calculation options fields
 *
 * @param resourceName - The resource value to show these fields for
 * @param showForOperations - Operations that should show these fields (optional)
 */
export function createVedicOptionsFields(
  resourceName: string,
  showForOperations?: string[],
): INodeProperties[] {
  const displayOptions: INodeProperties["displayOptions"] = {
    show: {
      resource: [resourceName],
    },
  };

  if (showForOperations && showForOperations.length > 0) {
    displayOptions.show!.operation = showForOperations;
  }

  return [
    {
      displayName: "Node Type",
      name: "nodeType",
      type: "options",
      displayOptions,
      options: [
        {
          name: "Mean Node (Rahu/Ketu)",
          value: "mean",
          description:
            "Average position - most commonly used in Vedic astrology",
        },
        {
          name: "True Node",
          value: "true",
          description:
            "Actual astronomical position - used in some KP calculations",
        },
      ],
      default: "mean",
      description: "Calculation method for lunar nodes (Rahu/Ketu)",
    },
    {
      displayName: "Precision",
      name: "precision",
      type: "number",
      displayOptions,
      default: 2,
      placeholder: "e.g. 2",
      typeOptions: {
        minValue: 0,
        maxValue: 6,
      },
      description: "Decimal precision for degree calculations (0-6)",
    },
  ];
}

/**
 * Creates Dasha year field for Dasha calculations
 *
 * @param resourceName - The resource value to show this field for
 * @param showForOperations - Operations that should show this field (optional)
 */
export function createDashaYearsField(
  resourceName: string,
  showForOperations?: string[],
): INodeProperties {
  const displayOptions: INodeProperties["displayOptions"] = {
    show: {
      resource: [resourceName],
    },
  };

  if (showForOperations && showForOperations.length > 0) {
    displayOptions.show!.operation = showForOperations;
  }

  return {
    displayName: "Years to Calculate",
    name: "dashaYears",
    type: "number",
    displayOptions,
    default: 120,
    placeholder: "e.g. 120",
    typeOptions: {
      minValue: 1,
      maxValue: 120,
    },
    description:
      "Number of years of Dasha periods to calculate (full Vimshottari cycle is 120 years)",
  };
}
