/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { ComboboxControl, PanelBody, PanelRow } from '@wordpress/components';
import { useEntityRecords, useEntityProp } from '@wordpress/core-data';
import { useState } from '@wordpress/element';
import { useDebounce } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { useDispatch, dispatch } from '@wordpress/data';

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
 * @param {Object} props Properties of the 'venue'-core/query-block-variation.
 * @returns Combobox component with our venues selectable.
 */
const VenueCombobox = (props) => {
	const [search, setSearch] = useState('');
	const setSearchDebounced = useDebounce((value) => {
		setSearch(value);
	}, 300);

	const { isResolvingTerms, records: terms } = useEntityRecords(
		'taxonomy',
		'_gp_venue',
		{
			context: 'view',
			per_page: 10,
			search,
		}
	);
	const { isResolvingPosts, records: posts } = useEntityRecords(
		'postType',
		'gp_venue',
		{
			context: 'view',
			per_page: 10,
			search,
		}
	);
	const cId = getCurrentContextualPostId(props?.context?.postId) 

	const [ venueTaxonomyIds, updateVenueTaxonomyIds ] = useEntityProp(
		'postType',
		'gp_event',
		'_gp_venue',
		cId
	);

	const setOptions = () => {

		if( isEventPostType(props?.context?.postType) ){
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
		} else {
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
				: posts?.map((post) => ({

						label: 'POST ' + post?.title.rendered,
						value: post?.id,
				})) || [];
		}
	}



	const update = (value) => {
		if( isEventPostType(props?.context?.postType) ){
			// Could be no real termID if "Choose a venue" was selected
			const save = ( Number.isFinite( value ) ) ? [ value ] : [];
			updateVenueTaxonomyIds( save );
		} else {

			// !! Duplicated code from EditUpdater.js !! Maybe chance to DRY.

			// Setup the 'gp_venue' post to query,
			// after a new '_gp_venue' taxonomy term was selected.

			const newAttributes = {
				...props.attributes,
				query: {
					...props.attributes.query,
					include: [ value ],
					selectedPostId: value,
				},
			};
			props.setAttributes(newAttributes);
		}
	};

	const setValue = () => {
		if( isEventPostType(props?.context?.postType) ){
			return venueTaxonomyIds?.[0] || 'loading'
		} else {
			return props?.attributes?.query?.selectedPostId || 'loading';
		}		
	}

	return (
		<>
			<ComboboxControl
				// allowReset={false}
				label={__(
					'Choose a venue',
					'gatherpress'
				)}
				__next40pxDefaultSize
				onChange={(value) => {
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

export { VenueCombobox };

