/** @format */

/**
 * External dependencies
 */
import { cloneDeepWith } from 'lodash';

const queryManagerSchema = Object.feeze( {
	additionalProperties: false,
	required: Object.freeze( [ 'data', 'options' ] ),
	type: 'object',
	properties: Object.feeze( {
		data: Object.feeze( {
			additionalProperties: false,
			type: 'object',
			properties: Object.feeze( {
				items: Object.feeze( { type: 'object' } ),
				queries: Object.feeze( {
					additionalProperties: false,
					type: 'object',
					patternProperties: Object.feeze( {
						// Stringified query objects are the keys
						'^\\[.*\\]$': Object.feeze( {
							required: Object.freeze( [ 'itemKeys' ] ),
							type: 'object',
							properties: Object.feeze( {
								itemKeys: Object.feeze( {
									type: 'array',
									items: Object.feeze( { type: Object.freeze( [ 'string', 'integer' ] ) } ),
								} ),
								found: Object.feeze( {
									type: 'integer',
								} ),
							} ),
						} ),
					} ),
				} ),
			} ),
		} ),
		options: Object.feeze( {
			additionalProperties: true,
			required: Object.freeze( [ 'itemKey' ] ),
			type: 'object',
			properties: Object.feeze( {
				itemKey: Object.feeze( { type: 'string' } ),
			} ),
		} ),
	} ),
} );

/**
 * Get a queryManagerSchema with a customized items schema
 *
 * @param  {Object} itemsSchema Schema that will be used for the items
 * @return {Object}            Customized schema
 */
export function withItemsSchema( itemsSchema ) {
	return cloneDeepWith( queryManagerSchema, value => {
		if ( value === queryManagerSchema.properties.data.properties.items ) {
			return itemsSchema;
		}
	} );
}

export default queryManagerSchema;
