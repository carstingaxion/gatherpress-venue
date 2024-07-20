
import { __ } from '@wordpress/i18n';

import {
	__experimentalNavigatorProvider as NavigatorProvider,
	__experimentalNavigatorScreen as NavigatorScreen,
	__experimentalNavigatorButton as NavigatorButton,
	// __experimentalNavigatorBackButton as NavigatorBackButton,
	// __experimentalUseNavigator as useNavigator,
} from '@wordpress/components';

import { store as coreDataStore } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { useState } from '@wordpress/element';

import { PT_EVENT, PT_VENUE, TAX_VENUE_SHADOW, GPV_CLASS_NAME, VARIATION_OF } from './../helpers/namespace';

import CreateVenueForm from './VenueForm';
import { VenueComboboxProvider } from './VenueComboboxProvider';



export default function VenueNavigator (props=null) {
	const addNewItemLabel = useSelect(
		( select ) => {
			const { getPostType } = select( coreDataStore );
			return getPostType( PT_VENUE )?.labels?.add_new_item;
		},
		[]
	);
	// const isDescendentOfQueryLoop = Number.isFinite( queryId );

	/**
	 * @TODO: Better use useResourcePermissions here!!
	 * https://developer.wordpress.org/block-editor/reference-guides/packages/packages-core-data/#useresourcepermissions
	 */
	const userCanEdit = useSelect(
		( select ) => {
			/**
			 * useCanEditEntity may trigger an OPTIONS request to the REST API
			 * via the canUser resolver. However, when the Post Title is a
			 * descendant of a Query Loop block, the title cannot be edited. In
			 * order to avoid these unnecessary requests, we call the hook
			 * without the proper data, resulting in returning early without
			 * making them.
			 */
			// if ( isDescendentOfQueryLoop ) {
			// 	return false;
			// }
			// return select( coreDataStore ).canUser( 'create', 'pages' ); // needs to be plural!
			return select( coreDataStore ).canUser( 'create', PT_VENUE + 's' ); // needs to be plural!

			/**
			 * @TODO: Last recently some changes were prepared for Gutenberg 18.9
			 *        which needs to be done, when this is merged into core.
			 * https://github.com/WordPress/gutenberg/pull/63322
			*/
			// return select( coreDataStore ).canUser( 'create', {
			// 	kind: 'postType',
			// 	name: PT_VENUE,
			// } );

		},
		// [ isDescendentOfQueryLoop, postType, postId ]
		[]
	);


	const [search, setSearch] = useState('');

	return (
		<NavigatorProvider
			initialPath="/"
			style={{
				width: '100%',
			}}
		>
			<NavigatorScreen
				path="/"
				style={{
					padding: '.1em'
				}}
			>
				<VenueComboboxProvider {...props} search={ search } setSearch={ setSearch } />
				{ userCanEdit && (
					<NavigatorButton
						path="/new"
						variant="tertiary"
						text={ addNewItemLabel }
					/>
				)}
			</NavigatorScreen>

			<NavigatorScreen
				path="/new"
				style={{
					padding: '.1em'
				}}
			>
				<CreateVenueForm {...props} search={ search } />
			</NavigatorScreen>
		</NavigatorProvider>
	);
}