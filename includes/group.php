<?php
/**
 * Handles the filters we need to add to the query.
 *
 * @package GatherPressVenueBlock
 */

namespace GatherPressVenueBlock;

const CLASS_NAME = 'gp-venue-v3';

use GatherPress\Core\Venue;
use WP_Block;
use WP_Post;

/**
 * Shouldnt this be part of the event-list block?
 * 
 * Show "Venues" as "Venues" inside the taxonomy-filter of the query block,
 * and do not show "Tags" instead, because there were (for understandable reasons) no lables set.
 */
\add_filter(
	// 'register_' . Venue::TAXONOMY . '_taxonomy_args',
	'register_' . '_gatherpress_venue' . '_taxonomy_args',
	function ( $args ) {

		$args['labels'] = array(
			'name' => _x( 'Venues', 'taxonomy general name', 'gatherpress' ),
		);

		return $args;
	}
);

/**
 * Updates the group-block on the front end based on context attributes.
 * 
 * @see https://developer.wordpress.org/reference/hooks/render_block/
 */
\add_filter(
	'render_block_core/group',
	__NAMESPACE__ . '\render_group_block',
	10,
	3
);


/**
 * Filters the content of the core/group block.
 * 
 * @see https://developer.wordpress.org/reference/hooks/render_block_this-name/
 *
 * @param string   $block_content The block content.
 * @param array    $block         The full block, including name and attributes.
 * @param WP_Block $instance      The block instance.
 */
function render_group_block( $block_content, $block, $instance ) {
	// $block_content and $block can become null, 
	// so be sure to handle these cases.
	// https://developer.wordpress.org/reference/hooks/render_block/#comment-6606
	if ( is_null( $block_content ) ) {
		return $block_content;
	}
	if ( ! isset( $block['attrs']['className'] ) || CLASS_NAME !== $block['attrs']['className'] ) {
		return $block_content;
	}

	$current_post = \get_post();

	// Check that this is either an event,
	// which should have some venue data.
	//
	// Or alternatively, if this another post type,
	// look for the existence of a manually selected ID inside the blocks' attributes.
	if ( 'gatherpress_event' !== \get_post_type( $current_post ) && ( ! isset( $block['attrs']['selectedPostId'] ) ) ) {
		return $block_content;
	}

	require_once __DIR__ . '/core/classes/class-venue.php';
	
	// Variant A: The block is somehow within an event.
	if ( 'gatherpress_event' === \get_post_type( $current_post ) ) {
		$venue_post_id = Venue\get_venue_post_id_from_event_post_id( $current_post->ID );
	
	// Variant B: The block is NOT within an event, but has a venue selected to create a context of.
	} elseif ( \is_int( $block['attrs']['selectedPostId'] ) ) {
		$venue_post_id = $block['attrs']['selectedPostId'];
	}
	
	$venue_post    = \get_post( $venue_post_id );
	if ( ! $venue_post instanceof WP_Post || 'gatherpress_venue' !== $venue_post->post_type ) {
		return $block_content;
	}

	// \setup_postdata( $venue_post ); 
global $post;
$post = $venue_post;
// "The `$post` argument is intentionally omitted" on the core/post-title block.
// (source: render_block_core_post_title())
// 
// That's reason for overwriting globals over here.
// See: https://github.com/WordPress/gutenberg/pull/37622#issuecomment-1000932816.



		// Get an instance of the current Post Template block.
		$block_instance = $instance->parsed_block;

		// Set the block name to one that does not correspond to an existing registered block.
		// This ensures that for the inner instances of the Post Template block, we do not render any block supports.
		$block_instance['blockName'] = 'core/null';

		$post_id              = $venue_post->ID;
		$post_type            = $venue_post->post_type;
		$filter_block_context = static function ( $context ) use ( $post_id, $post_type ) {
			$context['postType'] = $post_type;
			$context['postId']   = $post_id;
			return $context;
		};


		// Use an early priority to so that other 'render_block_context' filters have access to the values.
		add_filter( 'render_block_context', $filter_block_context, 1 );
		// Render the inner blocks of the Post Template block with `dynamic` set to `false` to prevent calling
		// `render_callback` and ensure that no wrapper markup is included.
		// $block_content = ( new WP_Block( $block_instance ) )->render( array( 'dynamic' => false ) );
		$block_content = ( new WP_Block( $block_instance ) )->render();
		remove_filter( 'render_block_context', $filter_block_context, 1 );


		// $block_content = '<pre>' . \var_export(
		// 	[
		// 		$block['attrs'],
		// 		// $instance->context,
		// 		// $venue_post,
		// 	],
		// 	true 
		// ) . '</pre>' . $block_content;
	
	/*
	 * Use this function to restore the context of the template tags
	 * from a secondary query loop back to the main query loop.
	 * Since we use two custom loops, it's safest to always restore.
	*/
	// wp_reset_postdata();
$post = $current_post;

	return $block_content;
}
