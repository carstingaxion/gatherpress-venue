/**
 * WordPress dependencies
 */

/**
 * Internal dependencies.
 */
import { isEventPostType } from './../helpers/event';

/**
 * NoResultsUpdater component for GatherPress.
 *
 * This component is used to ...
 *
 * @since 0.30.0
 *
 * @param {Object}  props            - Component properties.
 *
 * @return {JSX.Element} The rendered React component.
 */
const NoResultsUpdater = (props) => {

	// Add an explicit "Add new venue"-Button.
	const isEvent = isEventPostType(props?.context?.postType);
	const includes = ( props?.context?.query?.include?.length >= 1 );
	return (
		<>
			{/* { ( isEvent && ! includes ) && props.children } */}
			{ props.children }
			
		</>
	);
};

export default NoResultsUpdater;
