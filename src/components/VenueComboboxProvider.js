
/**
 * Internal dependencies
 */
import VenueNavigator from './VenueNavigator';

import { VenueTermsCombobox } from './VenueTermsCombobox';
import { VenuePostsCombobox } from './VenuePostsCombobox';

import { isEventPostType } from '../helpers/event';

const VenueComboboxProvider = (props=null) => {
	const isEventContext = isEventPostType(props?.context?.postType);
	return (
		<>
			<VenueNavigator {...props} >
				{ isEventContext && (
					<VenueTermsCombobox {...props} />
					)}
				{ ! isEventContext && (
					<VenuePostsCombobox {...props} />
				)}
			</VenueNavigator>
		</>
	);
}

export { VenueComboboxProvider };
