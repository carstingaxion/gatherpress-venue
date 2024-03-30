/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';


// taken from https://developer.wordpress.org/block-editor/how-to-guides/metabox/
import { useEntityProp } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';

import { TextControl, Fill } from '@wordpress/components';



/**
 * Internal dependencies
 */
import { VenueTermsCombobox } from './components/VenueTermsCombobox';


export default function VenueBlockPluginFill() {
	// const post = useSelect(
	// 	(select) => select('core/editor').getCurrentPost(),
	// 	[]
	// );
	// const [meta, setMeta] = useEntityProp(
	// 	'postType',
	// 	post.type,
	// 	'meta',
	// 	post.id
	// );
	// const metaFieldValue = meta[DURATION_META];
	// const updateMetaValue = (newValue) => {
	// 	setMeta({ ...meta, [DURATION_META]: newValue });
	// };

	return (
		<>
			<Fill name="VenuePluginDocumentSettings">
				{/* <TextControl
					label={__('Duration', 'theater-production-blocks')}
					type="number"
					isShiftStepEnabled
					shiftStep="5"
					step="5"
					min={0}
					placeholder="80"
					value={metaFieldValue}
					onChange={updateMetaValue}
				/> */}
				<p>THE "VenueBlockPluginFill" in VenuePluginDocumentSettings</p>
			</Fill>
			<Fill name="VenuePluginDocumentSettings">
				<VenueTermsCombobox />
			</Fill>
		</>
	);
}
