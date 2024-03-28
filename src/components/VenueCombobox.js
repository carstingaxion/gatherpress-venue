/**
 * WordPress dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { ComboboxControl, PanelBody, PanelRow } from '@wordpress/components';
import { useEntityRecords, useEntityProp } from '@wordpress/core-data';
import { useState, useCallback } from '@wordpress/element';
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
 * @param {Object} props Properties of the 'venue'-core/group-block-variation.
 * @returns Combobox component with our venues selectable.
 */
const VenueCombobox = (props) => {
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
	const { isResolvingPosts, records: posts } = useEntityRecords(
		'postType',
		'gp_venue',
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
	const update = useCallback( (value) => { 


		// console.log('handleVenueTaxChange = useCallback',{value, props});
	
		if( isEventPostType(props?.context?.postType) ){
			// console.log(value);
			// console.log(Number.isFinite( value ));

			// Could be no real termID if "Choose a venue" was selected
			// const save = ( Number.isFinite( value ) ) ? [ value ] : []; // !! works well when changing terms, BUT: when all venues are removed by "x", value is null. but this empty array leads to <react> errors-.
			// const save = ( Number.isFinite( value ) ) ? [ value ] : [0]; // having "0" works against the react error, but leads to showing wrong venues, where there shouldnt be any.
			const save = ( Number.isFinite( value ) ) ? [ value ] : []; // 
		
			updateVenueTaxonomyIds( save );

			// console.log('save AFTER',save);
		} else {

			// !! Duplicated code from EditUpdater.js !! Maybe chance to DRY.

			// Setup the 'gp_venue' post to provide context for,
			// after a new '_gp_venue' taxonomy term was selected.

			const newAttributes = {
				...props.attributes,
				selectedPostId: value,
				selectedPostType: 'gp_venue',
			};
// console.log('UPDATING...');
// console.log(props.attributes);
// console.log('... TO ...');
// console.log(newAttributes);

			props.setAttributes(newAttributes);
		}
	}, [props, updateVenueTaxonomyIds] );

	// const update = (value) => {
	// 	handleVenueTaxChange(value);
	// };

	const setValue = () => {
		if( isEventPostType(props?.context?.postType) ){
			return venueTaxonomyIds?.[0] || 'loading'
		} else {
			return props?.attributes?.selectedPostId || 'loading';
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

export { VenueCombobox };

