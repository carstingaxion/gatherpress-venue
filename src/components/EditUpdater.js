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

	const isDescendentOfQueryLoop = Number.isFinite( props?.context?.queryId );

	// console.log(isEventPostType(props?.context?.postType));
	// Checks to see if either the given contextual 
	// or the currently edited post is of type 'gp_event'.
	if( ! isEventPostType(props?.context?.postType) || isDescendentOfQueryLoop ){
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
console.log('We are in the right spot now.');		
console.log(props?.context);		


	const [ venueTaxonomyIds, updateVenueTaxonomyIds ] = useEntityProp(
		'postType',
		'gp_event',
		'_gp_venue',
		cId
	);
/* 
	useEffect(() => {
		// console.log(venueTaxonomyIds.length);
		console.info(cId);
		console.log(venueTaxonomyIds);
		
		const newAttributes = {
			...props.attributes,
		};
		props.setAttributes(newAttributes);

	}, [
		venueTaxonomyIds,
	]);
 */

	return (
		<>
			{props.children}
		</>
	);
};

export default EditUpdater;
