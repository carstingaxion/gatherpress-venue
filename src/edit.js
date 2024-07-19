/**
 * WordPress dependencies
 */

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Get stuff to filter block attributes on the fly
 *
 * @see https://github.com/WordPress/gutenberg/issues/10082#issuecomment-642786811
 */
import { createHigherOrderComponent } from '@wordpress/compose';


import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, PanelRow } from '@wordpress/components';


import { useEntityProp } from '@wordpress/core-data';

/**
 * Internal dependencies
 */
import { VenueComboboxProvider } from './components/VenueComboboxProvider';

import { getCurrentContextualPostId } from './helpers/globals';

import { isEventPostType } from './helpers/event';
import { getVenuePostFromEventId, getVenuePostFromTermId } from './helpers/venue';

import { VenueContext } from './components/VenueContext';


// import VenuePanelRow from './components/VenuePanelRow';

import { PT_EVENT, PT_VENUE, TAX_VENUE_SHADOW, GPV_CLASS_NAME, VARIATION_OF } from './helpers/namespace';

const venueEdit = createHigherOrderComponent( ( BlockEdit ) => {
	return (props) => {
		if (props.name !== VARIATION_OF) {
			return <BlockEdit {...props} />;
		}
		if ( !props?.attributes?.className?.includes(GPV_CLASS_NAME) ) {
			return <BlockEdit {...props} />
		}
		
		// If this 'venue' block is on the root-level of a 'gatherpress_event' post,
		// the desired post is the currently edited post.
		// Alternatively the block could be part of a `core/query` block, 
		// then props.context provides `postType` and `postId` to use.
		const cId = getCurrentContextualPostId(props?.context?.postId) 
		
		const [ venueTaxonomyIds, updateVenueTaxonomyIds ] = useEntityProp(
			'postType',
			PT_EVENT,
			TAX_VENUE_SHADOW,
			cId
		);

		const { isSelected } = props;
		const isDescendentOfQueryLoop = Number.isFinite( props?.context?.queryId );

		const isEventContext = isEventPostType(props?.context?.postType);
		const venuePostFromEventId = getVenuePostFromEventId( cId );

		const isEditableEventContext = ( ! isDescendentOfQueryLoop && venueTaxonomyIds instanceof Array );
		const taxIds = venueTaxonomyIds && venueTaxonomyIds.length >= 1 && Number.isFinite( venueTaxonomyIds[0] ) ? venueTaxonomyIds[0] : null;
		const venuePostFromTermId = getVenuePostFromTermId( taxIds );

		let venuePost = isEditableEventContext
			? venuePostFromTermId
			: ( isEventContext ? venuePostFromEventId : null );

		let venuePostContext = 
			(
				venuePost && 
				venuePost.length >= 1 && 
				Number.isFinite( venuePost[0].id )
			)
			? venuePost[0].id // working !
			: props?.attributes?.selectedPostId;

		return (
			<>
				{ venuePostContext && (
					<VenueContext.Provider value={ venuePostContext }>
						<BlockEdit {...props} />
					</VenueContext.Provider>
				)}
				{ ! venuePostContext && (
					<p>
						<em>What to show, when (1) no venues or (2) an online-event is selected?</em><br /> (At least, add a placeholder here to provide help).
					</p>
				)}	

				{ ! isDescendentOfQueryLoop && isSelected && (
					<InspectorControls>
						<PanelBody
							title={__('Venue settings', 'gatherpress')}
							initialOpen={true}
						>
							<PanelRow>
								<VenueComboboxProvider {...props} />
							</PanelRow>
							{/* <VenuePanelRow {...props} /> */}
						</PanelBody>
					</InspectorControls>
				) }
			</>
		);
	};
}, 'venueEdit' );

export { venueEdit };
