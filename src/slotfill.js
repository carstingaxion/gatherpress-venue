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


export default function VenueBlockPluginFill() {
	return (
		<>
			<Fill name="VenuePluginDocumentSettings">
				<p>THE "VenueBlockPluginFill" in VenuePluginDocumentSettings</p>
			</Fill>
			<Fill name="VenuePluginDocumentSettings">
				<VenueTermsCombobox />
			</Fill>
		</>
	);
}
