/**
 * WordPress dependencies
 */
import { ComboboxControl } from '@wordpress/components';
import { useEntityRecords, useEntityProp } from '@wordpress/core-data';
import { useEffect, useState, useCallback, useMemo } from '@wordpress/element';
import { useDebounce } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';

import { select, useSelect, useDispatch } from '@wordpress/data';
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
const VenuePostsCombobox = (props) => {
	const [search, setSearch] = useState('');

	// @TODO: Unify queryParams for VenueTermsCombobox and VenuePostsCombobox
	const { isResolvingPosts, records: venuePosts } = useEntityRecords(
		'postType',
		PT_VENUE,
		{
			context: 'view',
			per_page: 10,
			search,
			// include: search ? null : props?.attributes?.selectedPostId,

			// search: search ? search : props?.attributes?.selectedPostId,
			// search_columns: ['ID', 'post_title'], // ERROR 'rest_not_in_enum': search_columns[0] ist nicht eins von post_title, post_content und post_excerpt.
		}
	);
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

	const setOptions = () => {

		/**
		 * Using useMemo will cause a re-render only when the raw venuePosts really change.
		 */
		const venuePostsAsOptions = useMemo( () => {
			return venuePosts?.map(( post ) => ({
				// label: 'POST ' + post?.title.rendered,
				label: post?.title.rendered,
				value: post?.id,
			})) || [];
		}, [ venuePosts ] );

		return isResolvingPosts
			? [
					{
						label: __(
							'Loading&hellip;',
							'gatherpress'
						),
						value: 'loading',
					},
			]
			: venuePostsAsOptions;
		
	}

	const setValue = () => {
		return props?.attributes?.selectedPostId || 'loading';
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
			'postType',
			PT_VENUE,
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
		// selectedPostId value change, do someting
		if (props.attributes.selectedPostId) {
			invalidateResolver();
		} else {
			// console.log('empty');
		}
		// Dependency array, every time selectedPostIdis changed (somehow),
		//  the useEffect callback will be called.
	}, [props.attributes.selectedPostId]);

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
				options={setOptions()}
				value={ setValue() }
			/>	
		</>
		
	);
};

export { VenuePostsCombobox };

