import type { IDataObject } from "n8n-workflow";
import type {
  IHandlerContext,
  HumanDesignOperation,
} from "../interfaces/types";
import {
  buildBirthData,
  makeApiRequest,
  applySimplifyIfEnabled,
  buildSecondSubjectBirthData,
} from "../shared";

/**
 * Endpoint mapping for Human Design operations
 */
const HD_ENDPOINTS: Record<HumanDesignOperation, string> = {
  glossaryChannels: "/api/v3/human-design/glossary/channels",
  glossaryGates: "/api/v3/human-design/glossary/gates",
  glossaryTypes: "/api/v3/human-design/glossary/types",
  bodygraph: "/api/v3/human-design/bodygraph",
  compatibility: "/api/v3/human-design/compatibility",
  designDate: "/api/v3/human-design/design-date",
  transits: "/api/v3/human-design/transits",
  typeOnly: "/api/v3/human-design/type",
};

/**
 * Handles all Human Design resource operations
 *
 * @param context - Handler context with execution functions and credentials
 * @param operation - The operation to execute
 * @returns API response data
 */
export async function handleHumanDesignResource(
  context: IHandlerContext,
  operation: string,
): Promise<IDataObject> {
  const op = operation as HumanDesignOperation;

  switch (op) {
    case "glossaryChannels":
      return handleGlossaryChannels(context);
    case "glossaryGates":
      return handleGlossaryGates(context);
    case "glossaryTypes":
      return handleGlossaryTypes(context);
    case "bodygraph":
      return handleBodygraph(context);
    case "compatibility":
      return handleCompatibility(context);
    case "designDate":
      return handleDesignDate(context);
    case "transits":
      return handleTransits(context);
    case "typeOnly":
      return handleTypeOnly(context);
    default:
      throw new Error(
        `The operation '${operation}' is not supported for the humanDesign resource`,
      );
  }
}

/**
 * Handles glossary channels request (GET with optional filters)
 */
async function handleGlossaryChannels(
  context: IHandlerContext,
): Promise<IDataObject> {
  const { executeFunctions, itemIndex, baseUrl, apiKey } = context;

  // Build query parameters
  const language = executeFunctions.getNodeParameter(
    "language",
    itemIndex,
    "en",
  ) as string;
  const circuit = executeFunctions.getNodeParameter(
    "circuit",
    itemIndex,
    "",
  ) as string;

  let endpoint = `${HD_ENDPOINTS.glossaryChannels}?language=${language}`;
  if (circuit) {
    endpoint += `&circuit=${circuit}`;
  }

  return await makeApiRequest(
    executeFunctions,
    "GET",
    baseUrl,
    endpoint,
    apiKey,
  );
}

/**
 * Handles glossary gates request (GET with optional filters)
 */
async function handleGlossaryGates(
  context: IHandlerContext,
): Promise<IDataObject> {
  const { executeFunctions, itemIndex, baseUrl, apiKey } = context;

  // Build query parameters
  const language = executeFunctions.getNodeParameter(
    "language",
    itemIndex,
    "en",
  ) as string;
  const center = executeFunctions.getNodeParameter(
    "center",
    itemIndex,
    "",
  ) as string;

  let endpoint = `${HD_ENDPOINTS.glossaryGates}?language=${language}`;
  if (center) {
    endpoint += `&center=${center}`;
  }

  return await makeApiRequest(
    executeFunctions,
    "GET",
    baseUrl,
    endpoint,
    apiKey,
  );
}

/**
 * Handles glossary types request (GET)
 */
async function handleGlossaryTypes(
  context: IHandlerContext,
): Promise<IDataObject> {
  const { executeFunctions, itemIndex, baseUrl, apiKey } = context;

  const language = executeFunctions.getNodeParameter(
    "language",
    itemIndex,
    "en",
  ) as string;

  const endpoint = `${HD_ENDPOINTS.glossaryTypes}?language=${language}`;

  return await makeApiRequest(
    executeFunctions,
    "GET",
    baseUrl,
    endpoint,
    apiKey,
  );
}

/**
 * Handles bodygraph calculation (POST)
 */
async function handleBodygraph(context: IHandlerContext): Promise<IDataObject> {
  const { executeFunctions, itemIndex, baseUrl, apiKey } = context;

  // Build birth data
  const birthData = buildBirthData(executeFunctions, itemIndex);
  const subjectName = executeFunctions.getNodeParameter(
    "subjectName",
    itemIndex,
    "",
  ) as string;

  // Get options
  const language = executeFunctions.getNodeParameter(
    "language",
    itemIndex,
    "en",
  ) as string;
  const includeInterpretations = executeFunctions.getNodeParameter(
    "includeInterpretations",
    itemIndex,
    true,
  ) as boolean;
  const includeChannels = executeFunctions.getNodeParameter(
    "includeChannels",
    itemIndex,
    true,
  ) as boolean;
  const includeDesignChart = executeFunctions.getNodeParameter(
    "includeDesignChart",
    itemIndex,
    true,
  ) as boolean;
  const includeVariables = executeFunctions.getNodeParameter(
    "includeVariables",
    itemIndex,
    false,
  ) as boolean;

  // Build request body
  const body: IDataObject = {
    subject: {
      birth_data: birthData,
      ...(subjectName && { name: subjectName }),
    },
    options: {
      language,
      include_interpretations: includeInterpretations,
    },
    hd_options: {
      include_channels: includeChannels,
      include_design_chart: includeDesignChart,
      include_variables: includeVariables,
    },
  };

  const responseData = await makeApiRequest(
    executeFunctions,
    "POST",
    baseUrl,
    HD_ENDPOINTS.bodygraph,
    apiKey,
    body,
  );

  return applySimplifyIfEnabled(executeFunctions, itemIndex, responseData);
}

/**
 * Handles compatibility calculation (POST with two subjects)
 */
async function handleCompatibility(
  context: IHandlerContext,
): Promise<IDataObject> {
  const { executeFunctions, itemIndex, baseUrl, apiKey } = context;

  // Build subject 1
  const birthData1 = buildBirthData(executeFunctions, itemIndex);
  const subjectName1 = executeFunctions.getNodeParameter(
    "subjectName",
    itemIndex,
    "",
  ) as string;

  // Build subject 2
  const birthData2 = buildSecondSubjectBirthData(executeFunctions, itemIndex);
  const subjectName2 = executeFunctions.getNodeParameter(
    "subject2Name",
    itemIndex,
    "",
  ) as string;

  // Get options
  const language = executeFunctions.getNodeParameter(
    "language",
    itemIndex,
    "en",
  ) as string;
  const includeInterpretations = executeFunctions.getNodeParameter(
    "includeInterpretations",
    itemIndex,
    true,
  ) as boolean;
  const includeChannels = executeFunctions.getNodeParameter(
    "includeChannels",
    itemIndex,
    true,
  ) as boolean;

  // Build request body
  const body: IDataObject = {
    subjects: [
      {
        birth_data: birthData1,
        ...(subjectName1 && { name: subjectName1 }),
      },
      {
        birth_data: birthData2,
        ...(subjectName2 && { name: subjectName2 }),
      },
    ],
    options: {
      language,
      include_interpretations: includeInterpretations,
    },
    hd_options: {
      include_channels: includeChannels,
    },
  };

  const responseData = await makeApiRequest(
    executeFunctions,
    "POST",
    baseUrl,
    HD_ENDPOINTS.compatibility,
    apiKey,
    body,
  );

  return applySimplifyIfEnabled(executeFunctions, itemIndex, responseData);
}

/**
 * Handles design date calculation (POST)
 */
async function handleDesignDate(
  context: IHandlerContext,
): Promise<IDataObject> {
  const { executeFunctions, itemIndex, baseUrl, apiKey } = context;

  // Build birth data
  const birthData = buildBirthData(executeFunctions, itemIndex);
  const subjectName = executeFunctions.getNodeParameter(
    "subjectName",
    itemIndex,
    "",
  ) as string;

  // Build request body
  const body: IDataObject = {
    subject: {
      birth_data: birthData,
      ...(subjectName && { name: subjectName }),
    },
  };

  const responseData = await makeApiRequest(
    executeFunctions,
    "POST",
    baseUrl,
    HD_ENDPOINTS.designDate,
    apiKey,
    body,
  );

  return applySimplifyIfEnabled(executeFunctions, itemIndex, responseData);
}

/**
 * Handles transits calculation (POST with transit datetime)
 */
async function handleTransits(context: IHandlerContext): Promise<IDataObject> {
  const { executeFunctions, itemIndex, baseUrl, apiKey } = context;

  // Build birth data
  const birthData = buildBirthData(executeFunctions, itemIndex);
  const subjectName = executeFunctions.getNodeParameter(
    "subjectName",
    itemIndex,
    "",
  ) as string;

  // Get transit datetime (optional - defaults to current time)
  const transitDatetime = executeFunctions.getNodeParameter(
    "transitDatetime",
    itemIndex,
    "",
  ) as string;

  // Get options
  const language = executeFunctions.getNodeParameter(
    "language",
    itemIndex,
    "en",
  ) as string;
  const includeInterpretations = executeFunctions.getNodeParameter(
    "includeInterpretations",
    itemIndex,
    true,
  ) as boolean;

  // Build request body
  const body: IDataObject = {
    subject: {
      birth_data: birthData,
      ...(subjectName && { name: subjectName }),
    },
    options: {
      language,
      include_interpretations: includeInterpretations,
    },
  };

  // Add transit datetime if provided
  if (transitDatetime) {
    body.transit_datetime = transitDatetime;
  }

  const responseData = await makeApiRequest(
    executeFunctions,
    "POST",
    baseUrl,
    HD_ENDPOINTS.transits,
    apiKey,
    body,
  );

  return applySimplifyIfEnabled(executeFunctions, itemIndex, responseData);
}

/**
 * Handles type only calculation (POST - quick type determination)
 */
async function handleTypeOnly(context: IHandlerContext): Promise<IDataObject> {
  const { executeFunctions, itemIndex, baseUrl, apiKey } = context;

  // Build birth data
  const birthData = buildBirthData(executeFunctions, itemIndex);
  const subjectName = executeFunctions.getNodeParameter(
    "subjectName",
    itemIndex,
    "",
  ) as string;

  // Build request body
  const body: IDataObject = {
    subject: {
      birth_data: birthData,
      ...(subjectName && { name: subjectName }),
    },
  };

  const responseData = await makeApiRequest(
    executeFunctions,
    "POST",
    baseUrl,
    HD_ENDPOINTS.typeOnly,
    apiKey,
    body,
  );

  return applySimplifyIfEnabled(executeFunctions, itemIndex, responseData);
}
