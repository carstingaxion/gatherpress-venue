/**
 * WordPress dependencies
 */

/**
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-variations/
 */
import { registerBlockVariation } from '@wordpress/blocks';

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
import { addFilter } from '@wordpress/hooks';


import {
	useBlockProps,
} from '@wordpress/block-editor';


import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, PanelRow } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { VenueCombobox } from './components/VenueCombobox';
import EditUpdater from './components/EditUpdater';
import NoResultsUpdater from './components/NoResultsUpdater';
import PostTemplateUpdater from './components/PostTemplateUpdater';

import { getCurrentContextualPostId } from './helpers/globals';

import { isEventPostType } from './helpers/event'
import { getVenuePostFromEventId } from './helpers/venue'





import { VenueContext } from './components/VenueContext';
import { useContext } from '@wordpress/element'




import { useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';



import { useEntityProp } from '@wordpress/core-data';


import { getVenuePostFromTermId } from './helpers/venue';



const PT_EVENT = 'gp_event';
const PT_VENUE = 'gp_venue';
const TAX_VENUE_SHADOW = '_gp_venue';

const GPV_CLASS_NAME   = 'gp-venue-v3'; // maybe better: 'gp-venue-portal-group'

const VARIATION_OF = 'core/group';


/*
 * New `core/group` block variation.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-variations/
 */
const venuePortalGroup = {
	name: GPV_CLASS_NAME,
	title: __('Venue Details (v3)', 'gatherpress'),
	description: __( 'Queries information for a venue.', 'gatherpress' ),
	category: 'gatherpress',
	icon: 'nametag',
	keywords: [
		__('website', 'gatherpress'),
		__('location', 'gatherpress'),
		__('city', 'gatherpress'),
	],
	scope: ['inserter', 'block'],

	attributes: {
		className: GPV_CLASS_NAME, // important for isActive callback fn

		// is neccessary to make isActive work !!
		// @see https://github.com/WordPress/gutenberg/issues/41303#issuecomment-1526193087
		// layout: { type: 'flex', orientation: 'nonsense' }, // works
		layout: { type: 'constrained' }, // does not work!
	},

	isActive: ( blockAttrs, variationAttrs ) => {
// console.warn('blockAttrs',blockAttrs);
// console.warn('variationAttrs',variationAttrs);
		return (
			blockAttrs?.className.includes(GPV_CLASS_NAME) // check if className contains GROUP_CARD_VARIATION and not equals. incase you add additional css classes it will still work
		);
	},

	innerBlocks: [
		['core/post-title'],
		[
			'core/paragraph',
			{
				placeholder: __(
					'Add text or blocks that will display in the context of the selected VENUE.'
				),
			},
		],
	],
};

registerBlockVariation(VARIATION_OF, venuePortalGroup);



addFilter(
    'blocks.registerBlockType',
    'gatherpress/extend-group-block',
    extendGroupBlock
);

function extendGroupBlock(settings, name) {
    if (name !== VARIATION_OF) {
        return settings;
    }
	// console.warn(name);
	// console.warn(settings);

	settings.usesContext.indexOf('queryId') === -1 && settings.usesContext.push('queryId');
	settings.usesContext.indexOf('postId') === -1 && settings.usesContext.push('postId');
	settings.usesContext.indexOf('postType') === -1 && settings.usesContext.push('postType');
	
	const cId = getCurrentContextualPostId(null);


	const newSettings = {
        ...settings,
		attributes: {
			...settings.attributes,
			selectedPostId: { 
				type: 'integer',
				// default: cId,
			},
			selectedPostType: { 
				type: 'string',
				// default: 'gp_venue',
			}
		},
        supports: {
            ...settings.supports,
			className: false, // Removes "Additional CSS classes" panel for blocks that support it
			// customClassName: false // **Updated** For blocks that don't have className
        },
		// providesContext: {
		// 	...settings.providesContext,
		// 	'postId': 'selectedPostId', // this allow to overwrite context with a static value
		// 	'postType': 'selectedPostType'
		// }
	
    }
	// console.log(newSettings);
	return newSettings;
}



/**
 * Add the edit component to the block.
 * This is the component that will be rendered in the editor.
 * It will be rendered after the original block edit component.
 *
 * @param {function} BlockEdit Original component
 * @returns {function} Wrapped component
 *
 * @see https://developer.wordpress.org/block-editor/developers/filters/block-filters/#editor-blockedit
 */
addFilter(
	"editor.BlockEdit",
	"gatherpress-venue/post-title-block-variation",
	createHigherOrderComponent((BlockEdit) => {
		return (props) => {
			// if (props.name !== 'core/post-title') {
			// 	return <BlockEdit {...props} />;
			// }
			const x = useContext(VenueContext)

// console.log(props.name, x)
// console.log(props.name, props?.context);


			const useModifiedProps = Number.isFinite( x );
			const newId = ( Number.isFinite( x ) ) ? x : props?.context?.postId;
			const newType = ( Number.isFinite( x ) ) ? 'gp_venue' : props?.context?.postType;
			const modifiedProps = {
				...props,
				context: {
					...props.context,
					postId: newId,
					postType: newType
				}
			}
// console.log(props.name,modifiedProps.context);
			return (
				<>
					{useModifiedProps && (
						<BlockEdit {...modifiedProps} />
					)}
					{! useModifiedProps && (
						<BlockEdit {...props} />
					)}
				</>
			);
		};
	}),
);

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

		const isAutoContext = ( 
			( isDescendentOfQueryLoop || isEventContext )
		)

// console.log(props.name, props);

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
				{/* <EditUpdater {...props} >
	</EditUpdater> */}
		
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
								<VenueCombobox {...props} />
							</PanelRow>
						</PanelBody>
					</InspectorControls>
				) }
			</>
		);
	};
}, 'venueEdit' );

/**
 * Add the edit component to the block.
 * This is the component that will be rendered in the editor.
 * It will be rendered after the original block edit component.
 *
 * @param {function} BlockEdit Original component
 * @returns {function} Wrapped component
 *
 * @see https://developer.wordpress.org/block-editor/developers/filters/block-filters/#editor-blockedit
 */
addFilter(
	"editor.BlockEdit",
	"gatherpress-venue/group-block-variation",
	venueEdit
);


