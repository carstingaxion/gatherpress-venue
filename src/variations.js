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
import { registerPlugin } from '@wordpress/plugins';


import { useContext } from '@wordpress/element'



/**
 * Internal dependencies
 */
import { getCurrentContextualPostId } from './helpers/globals';

import { VenueContext } from './components/VenueContext';


import VenueBlockPluginFill from './slotfill';
import { venueEdit } from './edit';
import { PT_EVENT, PT_VENUE, TAX_VENUE_SHADOW, GPV_CLASS_NAME, VARIATION_OF } from './components/namespace';


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
		layout: { type: 'flex', orientation: 'nonsense' }, // works
		// layout: { type: 'constrained' }, // does not work!
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


const childBlockContextProvider = 	createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		const VenueContextId = useContext(VenueContext)

		const useModifiedProps = Number.isFinite( VenueContextId );
		// const newId = ( useModifiedProps ) ? VenueContextId : props?.context?.postId;
		// const newType = ( useModifiedProps ) ? 'gp_venue' : props?.context?.postType;
		const modifiedProps = {
			...props,
			context: {
				...props.context,
				postId: VenueContextId,
				postType: 'gp_venue'
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
});


/**
 * 
 *
 * @param {function} BlockEdit Original component
 * @returns {function} Wrapped component
 *
 * @see https://developer.wordpress.org/block-editor/developers/filters/block-filters/#editor-blockedit
 */
addFilter(
	"editor.BlockEdit",
	"gatherpress-venue/post-title-block-variation",
	childBlockContextProvider
);




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




registerPlugin(
	'venue-block-slot-fill',
	{
		render: VenueBlockPluginFill
	}
);