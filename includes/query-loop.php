<?php
/**
 * Handles the filters we need to add to the query.
 *
 * @package GatherPressVenueBlock
 */

namespace GatherPressVenueBlock;

// use GatherPress\Core\Venue;

/**
 * Show "Venues" as "Venues" inside the taxonomy-filter of the query block,
 * and do not show "Tags" instead, because there were (for understandable reasons) no lables set.
 */
\add_filter(
	// 'register_' . Venue::TAXONOMY . '_taxonomy_args',
	'register_' . '_gp_venue' . '_taxonomy_args',
	function ( $args ) {

		$args['labels'] = array(
			'name' => _x( 'Venues', 'taxonomy general name', 'gatherpress' ),
		);

		return $args;
	}
);

function query_loop_block_query_vars( $default_query, $block ) {
	// Retrieve the query from the passed block context.
	$block_query = $block->context['query'];
	
	// Generate a new custom query with all potential query vars.
	$query_args = array();

	if ( count( $query_args ) ) {
	}
	// die( var_dump( $block_query, $query_args ) );

	if ( ! isset( $block_query['namespace'] ) || 'gp-venue-v2' !== $block_query['namespace'] ) {
		return $default_query;
	}

	// Make sure to not fallback to a query without 'include' because we are providing an empty array.
	// This empty array will be the case when
	// - it is an online-event
	// - an venue was otherwise removed.
	$query_args['post__in'] = ( ! empty( $block_query['include'] ) ) ? $block_query['include'] : [ 0 ];
	


	if ( isset( $block_query['previewContext'] ) ) {
		\error_log( 'previewContext: ' . \var_export( $block_query['previewContext'], true ) );
		// $venue_post_id          = \GatherPress\Core\Venue\get_venue_post_id_from_term_id( $block_query['previewContext'] );
	
		$venue_post_id          = \GatherPress\Core\Venue\get_venue_post_id_from_term_id( $block->context['postId'] );
		$query_args['post__in'] = [ \absint( $venue_post_id ) ];
		\error_log( '$query_args: ' . \var_export( $query_args, true ) );
	}


	// \error_log( '$block: ' . \var_export( $block, true ) );
// die();


	// if previewContext is set,
	// // we know this is a admin-preview of queried events
	// if ( isset( $block_query['previewContext'] ) ) {
	// $block->context
	// \error_log( 'previewContext' );
	// \error_log( \var_export( $block->context, true ) );
	// }

	/** This filter is documented in includes/query-loop.php */
	$filtered_query_args = \apply_filters(
		'gpv_query_vars',
		$query_args,
		$block_query,
		false
	);

	// Return the merged query.
	return array_merge(
		$default_query,
		$filtered_query_args
	);
}


/**
 * Updates the query on the front end based on custom query attributes.
 */
\add_filter(
	'pre_render_block',
	function ( $pre_render, $parsed_block ) {
		if ( isset( $parsed_block['attrs']['className'] ) && 'gp-venue-v2' === $parsed_block['attrs']['className'] ) {

			// Hijack the global query. It's a hack, but it works.
			if ( isset( $parsed_block['attrs']['query']['inherit'] ) && true === $parsed_block['attrs']['query']['inherit'] ) {
				global $wp_query;
				$query_args = array_merge(
					$wp_query->query_vars,
					array(
						'posts_per_page' => $parsed_block['attrs']['query']['perPage'],
						'order'          => $parsed_block['attrs']['query']['order'],
						'orderby'        => $parsed_block['attrs']['query']['orderBy'],
					)
				);

				/**
				 * Filter the query vars.
				 *
				 * Allows filtering query params when the query is being inherited.
				 *
				 * @since 1.5
				 *
				 * @param array   $query_args  Arguments to be passed to WP_Query.
				 * @param array   $block_query The query attribute retrieved from the block.
				 * @param boolean $inherited   Whether the query is being inherited.
				 *
				 * @param array $filtered_query_args Final arguments list.
				 */
				$filtered_query_args = \apply_filters(
					'gpv_query_vars',
					$query_args,
					$parsed_block['attrs']['query'],
					true,
				);

				$wp_query = new \WP_Query( $filtered_query_args );
			} else {
				\add_filter(
					'query_loop_block_query_vars',
					// function ( $default_query ) use ( $parsed_block ) {
					// $block_query = $parsed_block['attrs']['query'];
					__NAMESPACE__ . '\query_loop_block_query_vars',
					10,
					2
				);
			}
		}

		return $pre_render;
	},
	10,
	2
);

/**
 * Updates the query vars for the Query Loop block in the block editor
 */
// Add a filter to each rest endpoint to add our custom query params.
\add_action(
	'init',
	function () {

		// \do_action( 'qm/debug', $block );
		// \do_action( 'qm/debug', \GatherPress\Core\Venue\get_venue_post_id_from_term_id( 3 ) );
		// \do_action( 'qm/debug', \GatherPress\Core\Venue\get_venue_post_id_from_term_id( 4 ) );
		


		$registered_post_types = \get_post_types( array( 'public' => true ) );
		foreach ( $registered_post_types as $registered_post_type ) {
			\add_filter( 'rest_' . $registered_post_type . '_query', __NAMESPACE__ . '\add_custom_query_params', 10, 2 );

			// We need more sortBy options.
			\add_filter( 'rest_' . $registered_post_type . '_collection_params', __NAMESPACE__ . '\add_more_sort_by', 10, 2 );
		}
	},
	PHP_INT_MAX
);


/**
 * Override the allowed items
 *
 * @see https://developer.wordpress.org/reference/classes/wp_rest_posts_controller/get_collection_params/
 *
 * @param array $query_params The query params.
 * @param array $post_type    The post type.
 *
 * @return array
 */
function add_more_sort_by( $query_params, $post_type ) {
	$query_params['orderby']['enum'][] = 'rand';
	return $query_params;
}

/**
 * Callback to handle the custom query params. Updates the block editor.
 *
 * @param array           $args    The query args.
 * @param WP_REST_Request $request The request object.
 */
function add_custom_query_params( $args, $request ) {
	// Generate a new custom query will all potential query vars.
	$custom_args = array();
	// die( var_dump( $args, $request ) );
		// $custom_args['post_type'] = 'gp_venue';

	if ( 'gp_venue' !== $args['post_type'] ) {
		return $args;
	}

	// Type of event list: 'upcoming' or 'past'.
	// /wp-content/plugins/gatherpress/includes/core/classes/class-event-query.php
	// $custom_args['gp_events_query'] = 'upcoming';

	$custom_args['post__in'] = $request->get_param( 'include' );
	
	
	if ( $request->get_param( 'previewContext' ) ) {
		\error_log( 'REST previewContext: ' . \var_export( $request->get_param( 'previewContext' ), true ) );
		$venue_post_id           = \GatherPress\Core\Venue\get_venue_post_id_from_term_id( absint( $request->get_param( 'previewContext' ) ) );
		$custom_args['post__in'] = [ \absint( $venue_post_id ) ];
	}


	/** This filter is documented in includes/query-loop.php */
	$filtered_query_args = \apply_filters(
		'gpv_query_vars',
		$custom_args,
		$request->get_params(),
		false,
	);

	// Merge all queries.
	return array_merge(
		$args,
		array_filter( $filtered_query_args )
	);
}
