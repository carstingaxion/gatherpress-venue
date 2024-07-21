/**
 * Adapted from useAuthorsQuery()
 * @source gutenberg/packages/editor/src/components/post-author/hook.js
 */

/**
 * WordPress dependencies
 */
import { useMemo } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { decodeEntities } from '@wordpress/html-entities';
import { store as coreStore } from '@wordpress/core-data';

/**
 * Internal dependencies
 */
import { PT_EVENT, PT_VENUE, TAX_VENUE_SHADOW, GPV_CLASS_NAME, VARIATION_OF } from './../helpers/namespace';

const getVenueTitle = ( venue, kind ) => {
	return ( kind === 'taxonomy' ) 
		? venue.name 
		: ( kind === 'postType' )
			? venue.title.rendered
			: '&hellip;loading';
}

export function useVenuesQuery( search, venueId, kind='taxonomy', name=TAX_VENUE_SHADOW ) {

	const { venue, venues } = useSelect(
		( select ) => {

			// Unified for VenueTermsCombobox and VenuePostsCombobox
			const { getEntityRecord, getEntityRecords } = select( coreStore );
			const query = {
				context: 'view',
				per_page: 10,
				search,
				orderby: 'id',
				order: 'desc'
			}

			return {
				// Query for the currently selected venue,
				// which may be a venue-term or a venue-post,
				// depending on context.
				venue: getEntityRecord( 
					kind,
					name,
					venueId
				),
				venues: getEntityRecords(
					kind,
					name,
					query
				),
			};
		},
		[ search ]
	);

	// Using useMemo will cause a re-render only when the raw venues really change.
	const venueOptions = useMemo( () => {

		// Create a combobox-friendly list as dropdown
		// from the array of venues (can be ~posts or ~terms).
		const fetchedVenues = ( venues ?? [] ).map( ( venue ) => {
			return {
				value: venue.id,
				label: decodeEntities( getVenueTitle( venue, kind ) ),
			};
		} );

		// Check if the current venue is already included in the list.
		// Will be -1 if not found.
		const foundVenue = fetchedVenues.findIndex(
			( { value } ) => venue?.id === value
		);

		// Ensure the current venue is included in the list.
		if ( foundVenue < 0 && venue ) {
			return [
				{
					value: venue.id,
					label: decodeEntities( getVenueTitle( venue, kind ) ),
				},
				...fetchedVenues,
			];
		}

		return fetchedVenues;
	},
	// Dependency array, every time venue or venues is updated,
	//  the useMemo callback will be called.
	[ venue, venues ]
	);

	return { venueOptions };
}
