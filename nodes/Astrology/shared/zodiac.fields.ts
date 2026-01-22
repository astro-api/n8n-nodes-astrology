import type { INodeProperties } from 'n8n-workflow';

/**
 * Zodiac sign options for selection fields
 */
export const zodiacSignOptions: INodeProperties['options'] = [
	{ name: 'Aries', value: 'aries' },
	{ name: 'Taurus', value: 'taurus' },
	{ name: 'Gemini', value: 'gemini' },
	{ name: 'Cancer', value: 'cancer' },
	{ name: 'Leo', value: 'leo' },
	{ name: 'Virgo', value: 'virgo' },
	{ name: 'Libra', value: 'libra' },
	{ name: 'Scorpio', value: 'scorpio' },
	{ name: 'Sagittarius', value: 'sagittarius' },
	{ name: 'Capricorn', value: 'capricorn' },
	{ name: 'Aquarius', value: 'aquarius' },
	{ name: 'Pisces', value: 'pisces' },
];

/**
 * Creates a zodiac sign selection field
 *
 * @param resourceName - The resource value to show this field for
 * @param showForOperations - Operations that should show this field
 */
export function createZodiacSignField(
	resourceName: string,
	showForOperations: string[],
): INodeProperties {
	return {
		displayName: 'Zodiac Sign',
		name: 'sign',
		type: 'options',
		displayOptions: {
			show: {
				resource: [resourceName],
				operation: showForOperations,
			},
		},
		options: zodiacSignOptions,
		default: 'aries',
		description: 'The zodiac sign for the horoscope',
		required: true,
	};
}

/**
 * Tradition options for astrological calculations
 */
export const traditionOptions: INodeProperties['options'] = [
	{ name: 'Universal', value: 'universal' },
	{ name: 'Classical', value: 'classical' },
	{ name: 'Psychological', value: 'psychological' },
	{ name: 'Event Oriented', value: 'event_oriented' },
	{ name: 'Vedic', value: 'vedic' },
	{ name: 'Chinese', value: 'chinese' },
];

/**
 * Creates a tradition selection field
 *
 * @param resourceName - The resource value to show this field for
 * @param hideForOperations - Operations that should hide this field (optional)
 */
export function createTraditionField(
	resourceName: string,
	hideForOperations?: string[],
): INodeProperties {
	const displayOptions: INodeProperties['displayOptions'] = {
		show: {
			resource: [resourceName],
		},
	};

	if (hideForOperations && hideForOperations.length > 0) {
		displayOptions.hide = {
			operation: hideForOperations,
		};
	}

	return {
		displayName: 'Tradition',
		name: 'tradition',
		type: 'options',
		displayOptions,
		options: traditionOptions,
		default: 'universal',
		description: 'Astrological tradition to use',
	};
}
