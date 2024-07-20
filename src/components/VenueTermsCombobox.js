/**
 * WordPress dependencies
 */
import { ComboboxControl } from '@wordpress/components';
import { useEntityRecords, useEntityProp } from '@wordpress/core-data';

import { select, useSelect, useDispatch } from '@wordpress/data';

// import { useState, useEffect, useRef } from 'react';
import { useState, useCallback, useMemo, useEffect } from '@wordpress/element';
import { useDebounce } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies.
 */
import { getCurrentContextualPostId } from './../helpers/globals'
import { isEventPostType } from './../helpers/event'

import { PT_EVENT, PT_VENUE, TAX_VENUE_SHADOW, GPV_CLASS_NAME, VARIATION_OF } from './../helpers/namespace';

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

	// @TODO: Unify queryParams for VenueTermsCombobox and VenuePostsCombobox
	const { isResolvingTerms, records: venueTerms } = useEntityRecords(
		'taxonomy',
		TAX_VENUE_SHADOW,
		{
			context: 'view',
			per_page: 10,
			search,
			orderby: 'id',
			order: 'desc'
		}
	);

	const setSearchDebounced = useDebounce((value) => {
		setSearch(value);
	}, 300);

	const setOptions = () => {

		/**
		 * Using useMemo will cause a re-render only when the raw venueTerms really change.
		 */
		const venueTermsAsOptions = useMemo( () => {
			return venueTerms?.map(( term ) => ({
				// label: 'TERM ' + term?.name,
				label: term?.name,
				value: term?.id,
			})) || [];
		}, [ venueTerms ] );

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
			: venueTermsAsOptions;

	}
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

	const { invalidateResolution } = useDispatch('core/data');

	/**
	 * Pass invalidateResolution the same parameters as isResolving
	 * and it will tell the datastore that it needs to provide a new request.
	 * 
	 * @see https://ryanwelcher.com/2021/08/18/requesting-data-in-gutenberg-with-getentityrecords/
	 */
	const invalidateResolver = () => {
		invalidateResolution('core', 'getEntityRecords', [
			'taxonomy',
			TAX_VENUE_SHADOW,
			{
				context: 'view',
				per_page: 10,
				search,
				orderby: 'id',
				order: 'desc'
			}
		]);
	};

	// Perfom actions on state change
	useEffect(() => {
		// venueTerm value change, do someting
		if (venueTaxonomyIds) {
			// console.log(venueTaxonomyIds);
			// console.log(venueTerms);
			invalidateResolver();
			// console.log(venueTerms);
		} else {
			// console.log('empty');
		}
		// Dependency array, every time updateVenueTaxonomyIds() is called (somewhere),
		//  the useEffect callback will be called.
	// }, [venueTaxonomyIds]);
	}, [updateVenueTaxonomyIds]);

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
				options={ setOptions() }
				value={ setValue() }
			/>	
		</>
		
	);
};

export { VenueTermsCombobox };

