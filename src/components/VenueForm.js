
import { __ } from '@wordpress/i18n';

import {
	Spinner,
	Button,
	TextControl,
	__experimentalHStack as HStack,
	__experimentalUseNavigator as useNavigator,
} from '@wordpress/components';


import { useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

import apiFetch from '@wordpress/api-fetch';

import {
	useEntityProp,
	store as coreDataStore
} from '@wordpress/core-data';

import { PT_EVENT, PT_VENUE, TAX_VENUE_SHADOW } from './../helpers/namespace';

import { isEventPostType } from '../helpers/event';
import { getCurrentContextualPostId } from '../helpers/globals';


function VenueForm( { title, onChangeTitle, address, onChangeAddress, hasEdits, lastError, isSaving, onCancel, onSave } ) {
	return (
		<>
			<div className="gatherpress-new-venue-form">
				<TextControl
					__next40pxDefaultSize
					__nextHasNoMarginBottom
					label={ __('Venue title', 'gatherpress') } // Would be nice to use apply_filters('enter_title_here) on this.
					value={ title }
					onChange={ onChangeTitle }
				/>
				<TextControl
					__next40pxDefaultSize
					__nextHasNoMarginBottom
					label={ __('Full Address', 'gatherpress') }
					value={ address }
					onChange={ onChangeAddress }
				/>
			</div>
			{ lastError ? (
				<div className="form-error">Error: { lastError.message }</div>
			) : (
				false
			) }
			<HStack
				justify="flex-start"
			>
				<Button
					onClick={ onSave }
					variant="primary"
					disabled={ !hasEdits || isSaving }
				>
					{ isSaving ? (
						<>
							<Spinner/>
							{ __('Saving', 'default') }
						</>
					) : __('Save', 'default') }
				</Button>
				<Button
					onClick={ onCancel }
					variant="tertiary"
					disabled={ isSaving }
				>
					{ __('Back', 'default') }
				</Button>
			</HStack>
		</>
	);
}



function CreateVenueForm( { search, ...props } ) {

	const [title, setTitle] = useState( search );
	const [address, setAddress] = useState();

	const { lastError, isSaving } = useSelect(
		( select ) => ( {
			lastError: select( coreDataStore )
				.getLastEntitySaveError( 'postType', PT_VENUE ),
			isSaving: select( coreDataStore )
				.isSavingEntityRecord( 'postType', PT_VENUE ),
		} ),
		[]
	);

	const cId = getCurrentContextualPostId(props?.context?.postId) 

	const [ venueTaxonomyIds, updateVenueTaxonomyIds ] = useEntityProp(
		'postType',
		PT_EVENT,
		TAX_VENUE_SHADOW,
		cId
	);

	const { goTo }     = useNavigator();
	const navigateBack = () => {
		goTo( "/", { isBack: true });
	};




	const updateVenueDetailsBlockAttributes = ( post_id, props=null ) => {
	
		if ( typeof props.setAttributes !== 'undefined') {
			const newAttributes = {
				...props.attributes,
				selectedPostId: post_id,
				selectedPostType: PT_VENUE,
			};
			props.setAttributes(newAttributes);
		}
	}


	/**
	 * Creates a new venue post with the provided title and address.
	 *
	 * Have been & could also run,
	 * based on "const { saveEntityRecord } = useDispatch( coreDataStore )".
	 *
	 * @param {string} title - The title of the new venue.
	 * @param {string} address - The address of the new venue.
	 * @returns {Object} The newly created venue post.
	 */
	const createNewVenuePost = async (title, address) => {
		try {
			const newPost = await apiFetch({
				path: `/wp/v2/${PT_VENUE}s`, // !! Watch out & beware of the 's' at the end. // @TODO Make this nicer.
				method: 'POST',
				data: {
					title,
					status: 'publish', // 'draft' is the default
					meta: {
						// @TODO: Should become 'geo_address', when #560 is resolved!
						gatherpress_venue_information: JSON.stringify({
							fullAddress: address
						})
					}
				}
			});

			// console.log(`${newPost.title.rendered} Venue saved successfully.`, newPost );
			return newPost;
		} catch (error) {
			console.error('Error creating post:', error);
			throw error;
		}
	};

	/**
	 * Fetches the term based on the slug of the newly created venue post and updates the currently edited event with the venue taxonomy term.
	 *
	 * @param {string} newPostSlug - The slug of the newly created venue post.
	 * @param {function} updateVenueTaxonomyIds - Callback to update the venue taxonomy of the currently edited event with the given terms.
	 */
	// Get the editPost function from the core/editor store to update the post.
	// const { editPost } = useDispatch('core/editor');
	const fetchTermAndUpdateEvent = async (newPostSlug, updateVenueTaxonomyIds) => {
		try {
			const terms = await apiFetch({ path: `/wp/v2/${TAX_VENUE_SHADOW}?slug=${newPostSlug}` });

			if (terms.length > 0) {
				const term = terms[0];
				// Update the currently edited event with the venue taxonomy term.
				// editPost( {
				// 	taxonomies: {
				// 		_gatherpress_venue: [ term.id ]
				// 	}
				// } )
				updateVenueTaxonomyIds( [ term.id ] );
				// console.log('Updates the event with the venue taxonomy term.', term);
			}
		} catch (error) {
			console.error('Error fetching term:', error);
		}
	};

	/**
	 * A functional component for the block editor that handles the complete process of
	 * creating a new venue post and updating the event post with the venue term.
	 */
	const updateVenueTermOnEventPost = async () => {
		try {
			const newPost = await createNewVenuePost(title, address);
			const newPostSlug = '_' + newPost.slug;
			await fetchTermAndUpdateEvent(newPostSlug, updateVenueTaxonomyIds);
		} catch (error) {
			console.error('Error in the updateVenueTermOnEventPost process:', error);
		}
	};

	/**
	 * 
	 */
	const updateVenuePostOnBlockAttributes = async () => {
		try {
			const newPost = await createNewVenuePost(title, address);
			updateVenueDetailsBlockAttributes( newPost.id, props );
		} catch (error) {
			console.error('Error in the updateVenuePostOnBlockAttributes process:', error);
		}
	};

	/**
	 * Function to handle the save action for the venue form.
	 * This function is called when the save button is clicked.
	 */
	const saveBogus = async () => {

		if ( isEventPostType() ) {

			// This should only run for the VenueTermsCombobox.
			await updateVenueTermOnEventPost();

		} else {
			// This should only run for the VenuePostsCombobox.
			await updateVenuePostOnBlockAttributes();
		}
		// In both cases, go home.
		navigateBack();
	}	

	return (
		<VenueForm
			title={ title ?? '' }
			onChangeTitle={ setTitle }
			address={ address ?? '' }
			onChangeAddress={ setAddress }
			hasEdits={ !!title }
			onSave={ saveBogus }
			lastError={ lastError }
			onCancel={ navigateBack }
			isSaving={ isSaving }
		/>
	);
}


export default CreateVenueForm;
