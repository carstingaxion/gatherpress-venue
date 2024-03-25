/**
 * WordPress dependencies.
 */
import { useSelect } from '@wordpress/data';

/**
 * Get slug of venue post by providing a venue term slug.
 * 
 * @since 0.30.0
 * 
 * @param {String} termSlug Slug of a '_gp_venue' taxonomy term.
 * 
 * @returns Slug of the corresponding 'gp_venue' post.
 */
export function getVenueSlugFromTermSlug( termSlug ) {
	
	return termSlug.replace(/^_/, '');
}

/**
 * Retrieve a 'gp_venue' post from a given '_gp_venue' term ID.
 *
 * @since 0.30.0
 *
 * @return {Object} WP_Post 
 */
export function getVenuePostFromTermId( termId ) {
// console.log(termId);
	if(null === termId) {
		return [];
	}
	
	const venueTerm = useSelect((select) =>
    	select('core').getEntityRecord('taxonomy', '_gp_venue', termId)
	);
// console.log(venueTerm);
	// const slug = getVenueSlugFromTermSlug( venueTerm?.slug );
	const slug = venueTerm?.slug.replace(/^_/, '');

	const venuePost = useSelect((select) =>
		select('core').getEntityRecords('postType', 'gp_venue', {
			per_page: 1,
			slug: slug,
		})
	);

	return venuePost;
}
