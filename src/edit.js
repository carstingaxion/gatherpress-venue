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
import { VenuePostsCombobox } from './components/VenuePostsCombobox';
import { VenueTermsCombobox } from './components/VenueTermsCombobox';

import { getCurrentContextualPostId } from './helpers/globals';

import { isEventPostType } from './helpers/event';
import { getVenuePostFromEventId, getVenuePostFromTermId } from './helpers/venue';

import { VenueContext } from './components/VenueContext';

import { PT_EVENT, PT_VENUE, TAX_VENUE_SHADOW, GPV_CLASS_NAME, VARIATION_OF } from './helpers/namespace';


const VenueComboboxProvider = (props=null) => {
	const isEventContext = isEventPostType(props?.context?.postType);
	return (
		<>
			{ isEventContext && (
				// <VenueCombobox {...props} />
				<VenueTermsCombobox {...props} />
				)}
			{ ! isEventContext && (
				<VenuePostsCombobox {...props} />
			)}
		</>
	);
}

const venueEdit = createHigherOrderComponent( ( BlockEdit ) => {

	
	return (props) => {
		if (props.name !== VARIATION_OF) {
			return <BlockEdit {...props} />;
		}
		if ( !props?.attributes?.className?.includes(GPV_CLASS_NAME) ) {
			return <BlockEdit {...props} />
		}
		
		// If this 'venue' block is on the root-level of a 'gp_event' post,
		// the desired post is the currently edited post.
		// Alternatively the block could be part of a `core/query` block, 
		// then props.context provides `postType` and `postId` to use.
		const cId = getCurrentContextualPostId(props?.context?.postId) 

		const [ venueTaxonomyIds, updateVenueTaxonomyIds ] = useEntityProp(
			'postType',
			'gp_event',
			'_gp_venue',
			cId
		);
		
		const { isSelected } = props;
		const isDescendentOfQueryLoop = Number.isFinite( props?.context?.queryId );
		const isEventContext = isEventPostType(props?.context?.postType);


		let venuePost;
		if ( isEventContext ) {
			venuePost = getVenuePostFromEventId( cId );

			if ( ! isDescendentOfQueryLoop ) {

				if ( venueTaxonomyIds && Number.isFinite( venueTaxonomyIds[0] ) ) {
					venuePost = getVenuePostFromTermId( venueTaxonomyIds[0] );
					// console.log('venueTaxonomyIds', venueTaxonomyIds);
					// console.log('venuePost', venuePost);
				}
			}

		}

		let venuePostContext = props?.attributes?.selectedPostId;
		if (
			venuePost && 
			venuePost.length >= 1 && 
			Number.isFinite( venuePost[0].id )
		) {
			venuePostContext = venuePost[0].id; // working !
		}

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
					// https://github.com/carstingaxion/gutenberg/blob/964bf6dbc7a2c357a2383e145bbd3cf561cf2ae4/packages/block-library/src/query/edit/inspector-controls/index.js#L29-L30
					// import { unlock } from '../../../lock-unlock';
					// const { BlockInfo } = unlock( blockEditorPrivateApis );
					// <BlockInfo>
					// 	<PanelBody
					// 		title={__('Venue settings', 'gatherpress')}
					// 		initialOpen={true}
					// 	>
					// 		<PanelRow>
					// 			<VenueCombobox {...props} />
					// 		</PanelRow>
					// 	</PanelBody>
					// </BlockInfo>

					<InspectorControls>
						<PanelBody
							title={__('Venue settings', 'gatherpress')}
							initialOpen={true}
						>
							<PanelRow>
								{/* { isEventContext && (
									<VenueCombobox {...props} />
								)}
								{ ! isEventContext && (
									<VenuePostsCombobox {...props} />
								)} */}
								<VenueComboboxProvider {...props} />
							</PanelRow>
						</PanelBody>
					</InspectorControls>
				) }
			</>
		);
	};
}, 'venueEdit' );

export { venueEdit };
