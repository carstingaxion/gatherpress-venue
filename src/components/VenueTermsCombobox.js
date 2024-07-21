/**
 * WordPress dependencies
 */
import { ComboboxControl } from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';

import { useCallback } from '@wordpress/element';
import { useDebounce } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies.
 */
import { getCurrentContextualPostId } from './../helpers/globals';

import { useVenuesQuery } from './hook';

import { PT_EVENT, TAX_VENUE_SHADOW } from './../helpers/namespace';

/**
 * This component shows a list of selectable venues.
 * 
 * If shown within a 'gatherpress_event' post context it will save the selected venue as '_gatherpress_venue' taxonomy.
 * 
 * Used in all other post contexts it will not save anything to the currently edited post, 
 * but instead just change the attributes of the related block to show the selcted venue.
 * 
 * @param {Object} props Properties of the 'venue'-core/group-block-variation.
 * @returns Combobox component with our venues selectable.
 */
const VenueTermsCombobox = ({ search, setSearch, ...props }) => {

	const cId = getCurrentContextualPostId(props?.context?.postId) 

	const [ venueTaxonomyIds, updateVenueTaxonomyIds ] = useEntityProp(
		'postType',
		PT_EVENT,
		TAX_VENUE_SHADOW,
		cId
	);

	const venueId = venueTaxonomyIds?.[0];
	const { venueOptions } = useVenuesQuery( search, venueId );

	const setSearchDebounced = useDebounce((value) => {
		setSearch(value);
	}, 300);

	const update = useCallback( (value) => { 
		// Could be no real termID if "Choose a venue" was selected
		// const save = ( Number.isFinite( value ) ) ? [ value ] : []; // !! works well when changing terms, BUT: when all venues are removed by "x", value is null. but this empty array leads to <react> errors-.
		// const save = ( Number.isFinite( value ) ) ? [ value ] : [0]; // having "0" works against the react error, but leads to showing wrong venues, where there shouldnt be any.
		const save = ( Number.isFinite( value ) ) ? [ value ] : []; // 
	
		updateVenueTaxonomyIds( save );

	}, [updateVenueTaxonomyIds] );


	const setValue = () => {
		return venueTaxonomyIds?.[0] || 'loading'
	}

	return (
		<>
			<ComboboxControl
				label={__(
					'Choose a venue',
					'gatherpress'
				)}
				__next40pxDefaultSize
				onChange={ update }
				onFilterValueChange={ setSearchDebounced }
				options={ venueOptions }
				value={ setValue() }
			/>	
		</>
		
	);
};

export { VenueTermsCombobox };

