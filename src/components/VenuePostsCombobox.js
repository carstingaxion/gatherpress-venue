/**
 * WordPress dependencies
 */
import { ComboboxControl } from '@wordpress/components';
import { useEntityRecords, useEntityProp } from '@wordpress/core-data';
import { useState, useCallback, useMemo } from '@wordpress/element';
import { useDebounce } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies.
 */
import { getCurrentContextualPostId } from './../helpers/globals'
import { isEventPostType } from './../helpers/event'


// const PT_EVENT = 'gatherpress_event';
// const PT_VENUE = 'gatherpress_venue';
// const TAX_VENUE_SHADOW = '_gatherpress_venue';
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

	const { isResolvingPosts, records: venuePosts } = useEntityRecords(
		'postType',
		PT_VENUE,
		{
			context: 'view',
			per_page: 10,
			search,
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
				label: 'POST ' + post?.title.rendered,
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

	return (
		<>
			<ComboboxControl
				label={__(
					'Choose a venue',
					'gatherpress'
				)}
				__next40pxDefaultSize
				// onChange={(value) => {
				// 	// console.log('onChange',{value, props});
				// 	update(value);
				// }}
				onChange={ update }
				// onFilterValueChange={(value) => {
				// 	setSearchDebounced(value);
				// }}
				onFilterValueChange={ setSearchDebounced }
				options={setOptions()}
				value={ setValue() }
			/>	
		</>
		
	);
};

export { VenuePostsCombobox };

