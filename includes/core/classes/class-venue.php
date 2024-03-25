<?php
/**
 * Class responsible for managing Venue instances.
 *
 * This class handles the management of Venue instances, including actions related to Venue post types,
 * Venue taxonomies, and associated operations such as adding Venue terms, updating term slugs, and more.
 *
 * @package GatherPress\Core
 * @since 1.0.0
 */

namespace GatherPress\Core\Venue;

use WP_Post;
use WP_Term;

/**
 * get_page_by_path()
 * 
 * ... is highly discouraged due to not being cached; 
 * please use wpcom_vip_get_page_by_path() instead.
 * 
 * (WordPressVIPMinimum.Functions.RestrictedFunctions.get_page_by_path_get_page_by_path) phpcs
 */


function get_venue_post_id_from_event_post_id( int $post_id ) : ?int {
	$venue_terms = \get_the_terms( $post_id, '_gp_venue' );
	if ( ! \is_array( $venue_terms ) || empty( $venue_terms ) ) {
		return null;
	}
	// Assuming that we have only ONE venue related.
	return get_venue_post_id_from_term_id( $venue_terms[0]->ID );
}


/**
 * Retrieve the ID of a Venue Custom Post Type (CPT) from a Venue taxonomy ID.
 *
 * This method retrieves the ID of a Venue Custom Post Type (CPT) associated with a given
 * Venue taxonomy id. It allows you to obtain the Venue post id based on the
 * taxonomy slug used for venues internally.
 *
 * @since 0.30.0
 *
 * @param int $id ID of the Venue taxonomy to retrieve the Venue post.
 * @return null|int The ID of the Venue post object if found; otherwise, null.
 */
function get_venue_post_id_from_term_id( int $term_id ): ?int {
	$term = \get_term( $term_id, '_gp_venue');
	if ( ! $term instanceof \WP_Term ) {
		return null;
	}
	// Remove any leading underscores from the slug and retrieve the corresponding Venue post ID.
	return get_post_id_by_slug( ltrim( $term->slug, '_' ) );
}




function get_post_id_by_slug( $slug, $post_type = 'gp_venue' ) {
	$query = new \WP_Query(
		array(
			'name'          => $slug,
			'post_type'     => $post_type,
			'numberposts'   => 1,
			'fields'        => 'ids',
			'no_found_rows' => true,
		)
	);
	$posts = $query->get_posts();
	return array_shift( $posts );
}
