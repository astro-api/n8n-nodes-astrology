import type { IDataObject } from 'n8n-workflow';
import type { IHandlerContext, DataOperation } from '../interfaces/types';
import { buildBirthData, makeApiRequest, createSubjectRequest } from '../shared';

/**
 * Endpoint mapping for data operations
 */
const DATA_ENDPOINTS: Record<DataOperation, string> = {
	now: '/api/v3/data/now',
	positions: '/api/v3/data/positions',
	houseCusps: '/api/v3/data/house-cusps',
	aspects: '/api/v3/data/aspects',
	lunarMetrics: '/api/v3/data/lunar-metrics',
};

/**
 * Handles all data resource operations
 *
 * @param context - Handler context with execution functions and credentials
 * @param operation - The operation to execute
 * @returns API response data
 */
export async function handleDataResource(
	context: IHandlerContext,
	operation: string,
): Promise<IDataObject> {
	const { executeFunctions, itemIndex, baseUrl, apiKey } = context;
	const op = operation as DataOperation;

	// "now" operation doesn't require birth data
	if (op === 'now') {
		return await makeApiRequest(
			executeFunctions,
			'GET',
			baseUrl,
			DATA_ENDPOINTS.now,
			apiKey,
		);
	}

	// All other operations require birth data
	const birthData = buildBirthData(executeFunctions, itemIndex);
	const body = createSubjectRequest(birthData);
	const endpoint = DATA_ENDPOINTS[op] || DATA_ENDPOINTS.positions;

	return await makeApiRequest(
		executeFunctions,
		'POST',
		baseUrl,
		endpoint,
		apiKey,
		body,
	);
}
