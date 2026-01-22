import type { INodeProperties } from 'n8n-workflow';

/**
 * Resource selector - shared across all operations
 * This is the first field shown in the node UI
 */
export const resourceField: INodeProperties = {
	displayName: 'Resource',
	name: 'resource',
	type: 'options',
	noDataExpression: true,
	options: [
		{
			name: 'Data',
			value: 'data',
			description: 'Astrological data calculations',
		},
		{
			name: 'Horoscope',
			value: 'horoscope',
			description: 'Daily, weekly, monthly, and yearly predictions',
		},
	],
	default: 'data',
};
