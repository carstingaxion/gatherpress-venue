/**
 * WordPress dependencies
 */
import { ComboboxControl } from '@wordpress/components';
import { useEntityRecords, useEntityProp } from '@wordpress/core-data';
import { useState, useCallback } from '@wordpress/element';
import { useDebounce } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies.
 */
import { getCurrentContextualPostId } from './../helpers/globals'
import { isEventPostType } from './../helpers/event'


const PT_EVENT = 'gp_event';
const PT_VENUE = 'gp_venue';
const TAX_VENUE_SHADOW = '_gp_venue';

/**
 * This component shows a list of selectable venues.
 * 
 * If shown within a 'gp_event' post context it will save the selected venue as '_gp_venue' taxonomy.
 * 
 * Used in all other post contexts it will not save anything to the currently edited post, 
 * but instead just change the attributes of the related block to show the selcted venue.
 * 
 * @param {Object} props Properties of the 'venue'-core/group-block-variation.
 * @returns Combobox component with our venues selectable.
 */
const VenueTermsCombobox = (props=null) => {
	const [search, setSearch] = useState('');

	const cId = getCurrentContextualPostId(props?.context?.postId) 

	const [ venueTaxonomyIds, updateVenueTaxonomyIds ] = useEntityProp(
		'postType',
		'gp_event',
		'_gp_venue',
		cId
	);

	const { isResolvingTerms, records: terms } = useEntityRecords(
		'taxonomy',
		'_gp_venue',
		{
			context: 'view',
			per_page: 10,
			search,
		}
	);

	const setSearchDebounced = useDebounce((value) => {
		setSearch(value);
	}, 300);

	// console.log('venueTaxonomyIds',venueTaxonomyIds);
	const setOptions = () => {

		return isResolvingTerms
			? [
					{
						label: __(
							'Loading&hellip;',
							'gatherpress'
						),
						value: 'loading',
					},
			]
			: terms?.map((term) => ({

					label: 'TERM ' + term?.name,
					value: term?.id,
			})) || [];

	}
	const update = useCallback( (value) => { 


		// console.log('handleVenueTaxChange = useCallback',{value, props});
	

		// console.log(value);
		// console.log(Number.isFinite( value ));

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
				onChange={(value) => {
					// console.log('onChange',{value, props});
					update(value);
				}}
				onFilterValueChange={(value) => {
					setSearchDebounced(value);
				}}
				options={setOptions()}
				value={setValue()}
			/>	
		</>
		
	);
};

export { VenueTermsCombobox };
