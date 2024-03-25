/**
 * WordPress dependencies
 */

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

import { useEntityProp } from '@wordpress/core-data';
import { useEffect } from '@wordpress/element';

import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { Placeholder } from '@wordpress/components';
/**
 * Internal dependencies.
 */
import { getCurrentContextualPostId } from './../helpers/globals';
import { isEventPostType } from './../helpers/event';
import { VenueCombobox } from './VenueCombobox';
import { getVenuePostFromTermId } from './../helpers/venue';

/**
 * PostTemplateUpdater component for GatherPress.
 *
 * This component is used to ...
 *
 * @since 0.30.0
 *
 * @param {Object}  props            - Component properties.
 *
 * @return {JSX.Element} The rendered React component.
 */
const PostTemplateUpdater = (props) => {

	// Add an explicit "Add new venue"-Button.
	const isEvent = isEventPostType(props?.context?.postType);
	const includes = ( props?.context?.query?.include?.length >= 1 );
	return (
		<>
			{/* {( ! includes ) && (
				<Placeholder
					icon='nametag'
					label={__('Venue Details (v2)', 'gatherpress')}
					instructions={__('Here are instructions you should follow', 'gatherpress')}
					isColumnLayout
					style={{height:'300px'}}
				>
				<div>
					<VenueCombobox {...props} />
					{/* <p>TODO: Add an explicit "Add new venue"-Button here. !!</p> * /}
				</div>
				</Placeholder>
			)} */}
			

			{/* Having this check here allows to avoid 
			    the hard-coded <p>No results found</p> 
				message within the editor. 
			*/}
			{/* { ( includes ) && props.children } */}
			{ props.children }
			
		</>
	);
};

export default PostTemplateUpdater;
