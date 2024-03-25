/**
 * WordPress dependencies
 */
import { useEntityProp } from '@wordpress/core-data';
import { useEffect } from '@wordpress/element';

/**
 * Internal dependencies.
 */
import { getCurrentContextualPostId } from './../helpers/globals';
import { isEventPostType } from './../helpers/event';
import { getVenuePostFromTermId } from './../helpers/venue';

/**
 * EditUpdater component for GatherPress.
 *
 * This component is used to ...
 *
 * @since 0.30.0
 *
 * @param {Object}  props            - Component properties.
 *
 * @return {JSX.Element} The rendered React component.
 */
const EditUpdater = (props) => {

// console.log(isEventPostType(props?.context?.postType));
	// Checks to see if either the given contextual 
	// or the currently edited post is of type 'gp_event'.
	if( ! isEventPostType(props?.context?.postType) ){
		return (
			<>
				{props.children}
			</>
		);
	}
// console.log(props);	
	// If this 'venue' block is on the root-level of a 'gp_event' post,
	// the desired post is the currently edited post.
	// Alternatively the block could be part of a `core/query` block, 
	// then props.context provides `postType` and `postId` to use.
	const cId = getCurrentContextualPostId(props?.context?.postId) 

	const [ venueTaxonomyIds, updateVenueTaxonomyIds ] = useEntityProp(
		'postType',
		'gp_event',
		'_gp_venue',
		cId
	);


	const isDescendentOfQueryLoop = Number.isFinite( props?.context?.queryId );

	let venuePost = getVenuePostFromTermId( venueTaxonomyIds[0] );
	// console.log('getVenuePostFromTermId( null )');
// console.log(getVenuePostFromTermId( null ));
useEffect(() => {
	// console.log(venueTaxonomyIds.length);
	console.info(cId);
	console.info(venuePost);
	console.log(venueTaxonomyIds);
	console.warn(props?.context?.queryId);
	console.warn(isDescendentOfQueryLoop);
	
		// Previewing 
		if (
			// venuePost && 
			// venuePost.length && 
			// typeof venuePost[0].id === 'number' && 
			// venueTaxonomyIds.length &&
			isDescendentOfQueryLoop
		) {
		
console.log('PREVIEWING: isDescendentOfQueryLoop.');		
			const newAttributes = {
				...props.attributes,
				query: {
					...props.attributes.query,
					// include: [ venuePost[0].id ],
					// selectedPostId: venuePost[0].id,
					previewContext: cId,
				},
			};
			props.setAttributes(newAttributes);
			return;
		}
	
		// Setup the 'gp_venue' post to query,
		// after a new '_gp_venue' taxonomy term was selected.
		// if (venuePost && venuePost.length && typeof venuePost[0].id === 'number' ) {
		if (
			venuePost && 
			venuePost.length && 
			typeof venuePost[0].id === 'number' && 
			venueTaxonomyIds.length
		) {
		
console.log('We have a new physical venue.');		
			const newAttributes = {
				...props.attributes,
				query: {
					...props.attributes.query,
					include: [ venuePost[0].id ],
					selectedPostId: venuePost[0].id,
				},
			};
			props.setAttributes(newAttributes);
		}
	
		// Unset any 'gp_venue' post from the query,
		// after a new ONLINEEVENT '_gp_venue' taxonomy term was selected.
		else if (venuePost && venuePost.length === 0 ) {
		// if (venuePost.length === 0 ) {
console.log('This should happen only for ONLINEEVENTS selected.');		
		
			const newAttributes = {
				...props.attributes,
				query: {
					...props.attributes.query,
					include: [],
					selectedPostId: '',
				},
			};
			props.setAttributes(newAttributes);
		}	

		// if (venuePost && venuePost.length === 0 ) {
		// if (!venuePost) {
		// else if (null===venueTaxonomyIds[0]) {
		// Handle the case where "Choose a venue" was selected,
		// or the '_gp_venue' term was removed otherwise.
		else if (!venueTaxonomyIds.length) {
console.log('We are unsetting the query attrs.');		
			const newAttributes = {
				...props.attributes,
				query: {
					...props.attributes.query,
					include: [],
					selectedPostId: '',
				},
			};
			props.setAttributes(newAttributes);
		}	

	}, [
		venueTaxonomyIds,
		venuePost,
	]);


	return (
		<>
			{props.children}
		</>
	);
};

export default EditUpdater;
