/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

import { Fill } from '@wordpress/components';



/**
 * Internal dependencies
 */
import { VenueTermsCombobox } from './components/VenueTermsCombobox';

import { VenueComboboxProvider } from './edit';

export default function VenueBlockPluginFill() {
	return (
		<>
			<Fill name="EventPluginDocumentSettings">
				{/* <VenueTermsCombobox /> */}
				<VenueComboboxProvider />
			</Fill>
		</>
	);
}
