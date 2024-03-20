/**
 * WordPress dependencies
 */

/**
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-variations/
 */
import { registerBlockVariation } from '@wordpress/blocks';



/**
 * Internal dependencies
 */
// const GPV = 'gatherpress-venue';
// const GPV_CLASS_NAME   = 'gp-venue-v2'; // maybe better: 'gp-venue-portal-query'

/* 
registerBlockVariation( 'core/group', {
	name: GPV,
	title: __( 'Event venue', 'gatherpress' ) + ' (v2)',
	description: __( 'Displays the venue for an event.', 'gatherpress' ),
	category: 'gatherpress',
	icon: 'nametag',
	// isActive: [ 'namespace', 'className' ],
	// @source https://github.com/WordPress/gutenberg/issues/41303#issuecomment-1760985709 
	isActive: ({ className }) => {
		// console.log(className);
		return (
			className.includes(GPV_CLASS_NAME) // check if className contains GPV_CLASS_NAME and not equals. incase you add additional css classes it will still work
		);
	},
	// attributes: { className: GPV_CLASS_NAME, },
	attributes: {
		layout: {
			type: 'flex',
			orientation: 'nonsense'
		},
		className: GPV_CLASS_NAME
	},
	// allowedControls: [],
	scope: [ 'inserter', 'block' ], // Defaults to 'block' and 'inserter'.
	example: {},
	innerBlocks: [
		[ 'core/post-title' ],
	]

} );
 */










// import { getEntityRecord  } from '@wordpress/core-data';
import { select, useSelect } from '@wordpress/data';

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


/**
 * Internal dependencies
 */
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
	icon: 'nametag', // default: loop
	attributes: {
		query: {
			perPage: 1,
			pages: 1,
			offset: 0,
			postType: PT_VENUE,
			//		order:		"asc",
			//		orderBy:	"title",
			//		author: 	"",
			//      search: 	"",
			// exclude: [], // or pass multiple values in an array, e.g. [ 1, 9098 ]
			sticky: 'exclude',
			inherit: false,
			// taxQuery: {
			// 	[TAX_VENUE_SHADOW]: [],
			// },
			//		parents: 	[] // important to be empty, to make the filter work

			include: [],
		},
		displayLayout: {
			type: 'flex', // list | flex
			columns: 1,
		},
		// align:		"wide",
		className: GPV_CLASS_NAME, // important for isActive callback fn
		// customClassName: false,
	},
	innerBlocks: [
		[
			'core/post-template',
			{},
			[
				['core/post-title'],
			],
		],
	],
	// scope: [ 'inserter', 'block', 'transform' ],
	scope: ['inserter', 'transform'],
	// scope: [ 'inserter'],
	isActive: (blockAttributes) =>
		GPV_CLASS_NAME === blockAttributes.className,
	usesContext: ['core/post-template/postId'],
	allowedControls: [ 'include' ],
};

registerBlockVariation('core/query', venuePortalQuery);

const venuePortalQueryEngine = createHigherOrderComponent(
	(BlockListBlock) => {
		return (props) => {
			if ('core/query' !== props.name) {
				return <BlockListBlock {...props} />;
			}
			
			// if ( GPV_CLASS_NAME !== props.attributes.className ) {
			// 	return <BlockListBlock {...props} />;
			// }

			if ( !props?.attributes?.className?.includes(GPV_CLASS_NAME) ) {
				return <BlockListBlock {...props} />
			}
			
// console.log(props);

			// VARIANT 1 // run only one time
			if (
				0 !==
				props.attributes.query.include.length
			)
				// VARIANT 2 // run everytime and update previous block
				// if ( 1 !== props.attributes.query.taxQuery.length )
				return <BlockListBlock {...props} />;

			const currentPost = select('core/editor').getCurrentPost();
			// console.log(currentPost);
			// go on if it's a 'gp_event' and if current post can have '_gp_venue' terms
			// otherwise exit
			if (
				PT_EVENT !== currentPost.type &&
				!currentPost.TAX_VENUE_SHADOW
			)
				return <BlockListBlock {...props} />;

			// empty default,
			// like in the block-variation/template
			let shadowedVenues = [];

			if (PT_EVENT === currentPost.type) {
				shadowedVenues = [
					// currentPost._gp_venue,
					currentPost[[TAX_VENUE_SHADOW]],
				];
				// console.log(shadowedVenues);
			} else {
				/**
				 * HOly holy holy
				 *
				 * @param {Function} select Current posts terms of production-shadow taxonomy.
				 * @return  Array           List of term-IDs
				 */
				shadowedVenues = useSelect(() => {
					// const innerSelect = select('core/editor');
					// Rename the inner select variable to avoid the linting error
					// const _shadowedVenues =
					// 	innerSelect.getEditedPostAttribute(
					// 		TAX_VENUE_SHADOW
					// 	);
					// return _shadowedVenues;
					const { getEditedPostAttribute } = select('core/editor');
					// const { getEditedPostAttribute } = innerSelect;
					return getEditedPostAttribute(TAX_VENUE_SHADOW);
				}, []);
			}

			// still using the defaults
			if (0 === shadowedVenues.length)
				return <BlockListBlock {...props} />;

			// Use Lodash's assign to gracefully handle if attributes are undefined
			// props.attributes.query = assign( props.attributes.query, {
			// assign(props.attributes.query, {
			// 	exclude: [currentPost.id],
			// 	taxQuery: {
			// 		[TAX_VENUE_SHADOW]: shadowedVenues,
			// 	},
			// });

/* 			
			let newAttrs;
			newAttrs = {
				...props.attributes,
				query: {
					...props.attributes.query,
					include: shadowedVenues,
				}
			} */

			let newProps;
			newProps = {
				...props,
				attributes: {
					...props.attributes,
					query: {
						...props.attributes.query,
						include: shadowedVenues,
					}
				}
			}
console.log(newProps, 'newProps');


			return <BlockListBlock {...newProps} />;
		};
	},
	'venuePortalQueryEngine'
);

addFilter(
	'editor.BlockListBlock',
	'gatherpress/gp-venue-portal-query',
	venuePortalQueryEngine
);

