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

const PT_EVENT = 'gp_event';
const PT_VENUE = 'gp_venue';
const TAX_VENUE_SHADOW = '_gp_venue';

const GPV_CLASS_NAME   = 'gp-venue-v2'; // maybe better: 'gp-venue-portal-query'


/*
 * New `core/query` block variation.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-variations/
 */
const venuePortalQuery = {
	name: GPV_CLASS_NAME,
	title: __('Venue Details (v2)', 'gatherpress'),
	description: __( 'Queries information for a venue.', 'gatherpress' ),
	category: 'gatherpress',
	icon: 'nametag',
	keywords: [
		__('website', 'gatherpress'),
		__('location', 'gatherpress'),
		__('city', 'gatherpress'),
	],
	scope: ['inserter', 'block'],
	allowedControls: [],
	attributes: {
		query: {
			namespace: GPV_CLASS_NAME, // important for isActive callback fn
			perPage: 1,
			pages: 0,
			offset: 0,
			postType: PT_VENUE,
			inherit: false,

			// include: [0], // ardnjhfvghklhewfdboiu1n sl¹!!ô67B!!1!
			// selectedPostId: 0,
		},
		displayLayout: {
			type: 'flex', // list | flex
			columns: 1,
		},
		className: GPV_CLASS_NAME, // important for isActive callback fn
	},

	isActive: ( blockAttrs, variationAttrs) => {
		return (
			blockAttrs?.className?.includes(GPV_CLASS_NAME) // check if className contains GPV_CLASS_NAME and not equals. incase you add additional css classes it will still work
		);
	},

	innerBlocks: [
		[
			'core/post-template',
			{
				className: 'venuePortalQueryPostTemplate',
			},
			[
				['core/post-title'],
			],
		],
		[
			'core/query-no-results',
			{
				className: 'venuePortalQueryNoResults',
			},
			[
				[
					'core/paragraph',
					{
						placeholder: __(
							'Add text or blocks that will display when a VENUE query returns no results.'
						),
					},
				],
			]
		],
	],
};

registerBlockVariation('core/query', venuePortalQuery);



addFilter(
    'blocks.registerBlockType',
    'gatherpress/extend-query-block',
    extendQueryBlock
);

function extendQueryBlock(settings, name) {
    if (name !== 'core/query' && name !== 'core/paragraph') {
        return settings;
    }
	// console.log(name);
	// console.info(settings);
	settings.usesContext.indexOf('postId') === -1 && settings.usesContext.push('queryId');
	settings.usesContext.indexOf('postId') === -1 && settings.usesContext.push('postId');
	settings.usesContext.indexOf('postType') === -1 && settings.usesContext.push('postType');
	const newSettings = {
        ...settings,
        supports: {
            ...settings.supports,
			className: false, // Removes "Additional CSS classes" panel for blocks that support it
			// customClassName: false // **Updated** For blocks that don't have className
        },
        // usesContext: settings.usesContext.push('postId'),
	
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
	"gatherpress-venue/query-block-variation",
	createHigherOrderComponent((BlockEdit) => {
		return (props) => {
			if (props.name !== "core/query") {
				return <BlockEdit {...props} />;
			}
			if ( !props?.attributes?.className?.includes(GPV_CLASS_NAME) ) {
				return <BlockEdit {...props} />
			}
			const { isSelected } = props;


			// addFilter(
			// 	// 'blocks.getSaveContent.extraProps',
			// 	'blocks.getSaveContent',
			// 	'jetpack/videopress',
			// 	preventBlockClassOnDeprecations,
			// 	20
			// );

			return (
				<>
					<EditUpdater {...props} >
						<BlockEdit {...props} />
					</EditUpdater>
					
					{ isSelected && (
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
	}),
);

function wrapCoverBlockInContainer( element, blockType, attributes ) {
    // skip if element is undefined
    if ( ! element ) {
        return;
    }

    // only apply to cover blocks
    if ( blockType.name !== 'core/query' ) {
        return element;
    }

	console.log('getSaveElement for custom query blockj.')	
console.log(element)
    // return the element wrapped in a div
    return element;
}

// addFilter(
//     'blocks.getSaveElement',
//     'my-plugin/wrap-cover-block-in-container',
//     wrapCoverBlockInContainer
// );

/**
 * COPIED from 
 * @source https://github.com/Automattic/jetpack/blob/fb912fede775e2851e326b3e0991b62696badabb/projects/plugins/jetpack/extensions/blocks/videopress/editor.js#L107C1-L142C3
 * 
 * Gutenberg introduced a change that causes a `wp-block-video` class to be
 * applied to the block via the `blocks.getSaveContent.extraProps` hook. This
 * results in all prior deprecations being unable to generate what was
 * previously valid content.
 *
 * This filter removes that introduced class so the deprecations can produce
 * content that matches the originally saved post content and successfully
 * migrate deprecated blocks to the current version.
 *
 * @param   {object} props      - Additional props applied to the save element.
 * @param   {object} blockType  - Block type definition.
 * @param   {object} attributes - Block's attributes.
 * @returns {object}            - Filtered props applied to the save element.
 */
const preventBlockClassOnDeprecations = ( props, blockType, attributes ) => {

	if ( blockType.name !== 'core/query' ) {
		return props;
	}
	if ( ! attributes?.className?.includes(GPV_CLASS_NAME) ) {
		return props;
	}
	
	// Skip manipulating the block's className prop if:
	// - Is a placeholder query block ( no guid )
	// if ( ! attributes.guid ) {
	// 	return props;
	// }
	console.log('Saving the custom query blockj.')
	console.log(props)

	// Prevent `wp-block-video` class being applied.
	// props.attributes.query = props.className.replace( 'wp-block-video', '' ).trim();
	// delete props.attributes.query.include;
	// delete props.attributes.query.selectedPostId;

	console.log('AFTER delete')
	// console.log(props.attributes.query)
	return props;
};





// import './assets/css/blocks/query-variation--venue.scss'


/*
 * New `core/post-template` block variation.
 * 
 * This is not needed, but nice to have.
 * The normal block-renaming feature is nice, but only 'renames' the block inside the block list,
 * not on its InspectorControls. A block-variation can do both.
 * 
 * A custom icon is also nice for our use-case.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-variations/
 */
const venuePortalQueryPostTemplate = {
	// name: GPV_CLASS_NAME,
	name: 'venuePortalQueryPostTemplate',
	title: __('Venue Details Post Template (v2)', 'gatherpress'),
	description: __( 'Contains the block elements used to render a VENUE post, like the title, date, featured image, content or excerpt, and more.', 'gatherpress' ),
	category: 'gatherpress',
	icon: 'nametag',
	scope: [],
	attributes: {
		className: 'venuePortalQueryPostTemplate', // important for isActive callback fn
		// gpName: 'venuePortalQueryPostTemplate', // important for isActive callback fn
		// namespace: 'venuePortalQueryPostTemplate', // important for isActive callback fn
	},

	isActive: [ 'className' ],
	// isActive: [ 'namespace' ],
	// isActive: [ 'gpName' ],

	// innerBlocks: [
	// 	[
	// 		'core/post-template',
	// 		{},
	// 		[
	// 			['core/post-title'],
	// 		],
	// 	],
	// 	[
	// 		'core/query-no-results',
	// 		{},
	// 		[
	// 			[
	// 				'core/paragraph',
	// 				{
	// 					placeholder: __(
	// 						'Add text or blocks that will display when a VENUE query returns no results.'
	// 					),
	// 				},
	// 			],
	// 		]
	// 	],
	// ],
};

registerBlockVariation('core/post-template', venuePortalQueryPostTemplate);



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
	"gatherpress-venue/post-template-block-variation",
	createHigherOrderComponent((BlockEdit) => {
		return (props) => {
			if (props.name !== "core/post-template") {
				return <BlockEdit {...props} />;
			}
			if ( !props?.attributes?.className?.includes('venuePortalQueryPostTemplate') ) {
				return <BlockEdit {...props} />
			}

			return (
				<>
					<PostTemplateUpdater {...props} >
						<BlockEdit {...props} />
					</PostTemplateUpdater>
				</>
			);
		};
	}),
);









/*
 * New `core/post-template` block variation.
 * 
 * This is not needed, but nice to have.
 * The normal block-renaming feature is nice, but only 'renames' the block inside the block list,
 * not on its InspectorControls. A block-variation can do both.
 * 
 * A custom icon is also nice for our use-case.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-variations/
 */
const venuePortalQueryNoResults = {
	// name: GPV_CLASS_NAME,
	name: 'venuePortalQueryNoResults',
	title: __('Venue Details No Results (v2)', 'gatherpress'),
	description: __( 'Contains the block elements used to render content when no VENUE query results are found.', 'gatherpress' ),
	category: 'gatherpress',
	icon: 'nametag',
	scope: [],
	attributes: {
		className: 'venuePortalQueryNoResults', // important for isActive callback fn
	},

	isActive: [ 'className' ],

	// innerBlocks: [
	// 	[
	// 		'core/post-template',
	// 		{},
	// 		[
	// 			['core/post-title'],
	// 		],
	// 	],
	// 	[
	// 		'core/query-no-results',
	// 		{},
	// 		[
	// 			[
	// 				'core/paragraph',
	// 				{
	// 					placeholder: __(
	// 						'Add text or blocks that will display when a VENUE query returns no results.'
	// 					),
	// 				},
	// 			],
	// 		]
	// 	],
	// ],
};

registerBlockVariation('core/query-no-results', venuePortalQueryNoResults);


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
	"gatherpress-venue/query-no-results-block-variation",
	createHigherOrderComponent((BlockEdit) => {
		return (props) => {
			if (props.name !== "core/query-no-results") {
				return <BlockEdit {...props} />;
			}
			if ( !props?.attributes?.className?.includes('venuePortalQueryNoResults') ) {
				return <BlockEdit {...props} />
			}

			return (
				<>
					<NoResultsUpdater {...props} >
						<BlockEdit {...props} />
					</NoResultsUpdater>
				</>
			);
		};
	}),
);
/* 
addFilter(
	"editor.BlockListBlock",
	"gatherpress-venue/query-no-results-block-variation",
	createHigherOrderComponent((BlockListBlock) => {
		return (props) => {
			if (props.name !== "core/query-no-results") {
				return <BlockListBlock {...props} />;
			}
			if ( !props?.attributes?.className?.includes('venuePortalQueryNoResults') ) {
				return <BlockListBlock {...props} />
			}

			return (
				<>
					<NoResultsUpdater {...props} >
						<BlockListBlock {...props} />
					</NoResultsUpdater>
				</>
			);
		};
	}),
); */



