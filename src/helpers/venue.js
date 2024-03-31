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

export function getVenueSlugFromTermSlug( termSlug ) {
	
	return termSlug.replace(/^_/, '');
} */

/**
 * Retrieve a 'gp_venue' post from a given '_gp_venue' term ID.
 *
 * @since 0.30.0
 *
 * @return {Object} WP_Post 
 */
export function getVenuePostFromTermId( termId ) {


	
	const { venuePost } = useSelect((select) =>{
		
		console.log('termId', termId);
		if(null === termId) {
			return [];
		}
    	const venueTerm = select('core').getEntityRecord('taxonomy', '_gp_venue', termId);
		const venueSlug = venueTerm?.slug.replace(/^_/, '');
		return {
			// venuePost: ( ! Number.isFinite( termId ) ) ? [] : select('core').getEntityRecords('postType', 'gp_venue', {
			venuePost: select('core').getEntityRecords('postType', 'gp_venue', {
				per_page: 1,
				slug: venueSlug,
			}),
		}
	}, [ termId ] );

	// console.log('venuePost', venuePost);

	return venuePost;
}

/**
 * Retrieve a 'gp_venue' post from a given 'gp_event' post ID.
 *
 * @since 0.30.0
 *
 * @return {Object} WP_Post 
 */
export function getVenuePostFromEventId( eventId ) {

	const { termId } = useSelect((select) =>{
	// const { venuePost } = useSelect((select) =>{
	// console.log(eventId);
	const eventPost = select('core').getEntityRecord('postType', 'gp_event', eventId);
	return {
		termId: ( eventPost && eventPost._gp_venue.length >= 1 ) ? eventPost?._gp_venue?.[0] : null,
		// venuePost: ( eventPost && eventPost._gp_venue.length >= 1 ) ? getVenuePostFromTermId( eventPost?._gp_venue?.[0] ) : [],
	};
}, [ eventId ] );

// console.log('termId',termId);
	return getVenuePostFromTermId( termId );
	// return venuePost;
}
