/**
 * WordPress dependencies
 */
import { registerBlockVariation } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';



/**
 * Internal dependencies
 */
const GPV = 'gatherpress-venue';
const GPV_CLASS_NAME   = 'gp-venue-v2';

/**
 * 
 * 
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-variations/
 */
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

