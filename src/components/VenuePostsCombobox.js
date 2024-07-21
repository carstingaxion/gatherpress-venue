/**
 * WordPress dependencies
 */
import { ComboboxControl } from '@wordpress/components';
import { useCallback } from '@wordpress/element';
import { useDebounce } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies.
 */
import { useVenuesQuery } from './hook';

import { PT_VENUE } from './../helpers/namespace';

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
const VenuePostsCombobox = ({ search, setSearch, ...props }) => {
// console.log(props);
	const venueId = props?.attributes?.selectedPostId;
	const { venueOptions } = useVenuesQuery( search, venueId, 'postType', PT_VENUE );

	const update = useCallback( (value) => { 

		// Setup the 'gatherpress_venue' post to provide context for,
		// after a new 'gatherpress_venue' post was selected.
		const newAttributes = {
			...props.attributes,
			selectedPostId: value,
			selectedPostType: PT_VENUE,
		};
		props.setAttributes(newAttributes);
	}, [props] );

	const setSearchDebounced = useDebounce((value) => {
		setSearch(value);
	}, 300 );

	const setValue = () => {
		return props?.attributes?.selectedPostId || 'loading';
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

export { VenuePostsCombobox };

