/**
 * WordPress dependencies.
 */
import { useSelect } from '@wordpress/data';

/**
 * Get slug of venue post by providing a venue term slug.
 * 
 * @since 0.30.0
 * 
 * @param {String} termSlug Slug of a '_gatherpress_venue' taxonomy term.
 * 
 * @returns Slug of the corresponding 'gatherpress_venue' post.

export function getVenueSlugFromTermSlug( termSlug ) {
	
	return termSlug.replace(/^_/, '');
} */

/**
 * Retrieve a 'gatherpress_venue' post from a given '_gatherpress_venue' term ID.
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
    	const venueTerm = select('core').getEntityRecord('taxonomy', '_gatherpress_venue', termId);
		const venueSlug = venueTerm?.slug.replace(/^_/, '');
		return {
			// venuePost: ( ! Number.isFinite( termId ) ) ? [] : select('core').getEntityRecords('postType', 'gatherpress_venue', {
			venuePost: select('core').getEntityRecords('postType', 'gatherpress_venue', {
				per_page: 1,
				slug: venueSlug,
			}),
		}
	}, [ termId ] );

	// console.log('venuePost', venuePost);

	return venuePost;
}

/**
 * Retrieve a 'gatherpress_venue' post from a given 'gatherpress_event' post ID.
 *
 * @since 0.30.0
 *
 * @return {Object} WP_Post 
 */
export function getVenuePostFromEventId( eventId ) {

	const { termId } = useSelect((select) =>{
	// const { venuePost } = useSelect((select) =>{
	// console.log(eventId);
	const eventPost = select('core').getEntityRecord('postType', 'gatherpress_event', eventId);
	return {
		termId: ( eventPost && eventPost._gatherpress_venue.length >= 1 ) ? eventPost?._gatherpress_venue?.[0] : null,
		// venuePost: ( eventPost && eventPost._gatherpress_venue.length >= 1 ) ? getVenuePostFromTermId( eventPost?._gatherpress_venue?.[0] ) : [],
	};
}, [ eventId ] );

// console.log('termId',termId);
	return getVenuePostFromTermId( termId );
	// return venuePost;
}
