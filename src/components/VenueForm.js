
import { __ } from '@wordpress/i18n';

import {
	Spinner,
	Button,
	TextControl,
	__experimentalInputControl as InputControl,
	__experimentalHStack as HStack,
	__experimentalUseNavigator as useNavigator,
} from '@wordpress/components';

import { useState, useEffect, useRef } from 'react';
import { select, useSelect, useDispatch } from '@wordpress/data';

import apiFetch from '@wordpress/api-fetch';

import {
	useEntityProp,
	useEntityRecords,
	store as coreDataStore
} from '@wordpress/core-data';

import { PT_EVENT, PT_VENUE, TAX_VENUE_SHADOW, GPV_CLASS_NAME, VARIATION_OF } from './../helpers/namespace';

import { isEventPostType } from '../helpers/event';
import { getCurrentContextualPostId } from '../helpers/globals';
import { getVenueTermFromPostId } from '../helpers/venue';


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



function CreateVenueForm( props=null ) {

	const [title, setTitle] = useState();
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
			// @TODO: This will only work for the VenuePostsCombobox !!
			const newAttributes = {
				...props.attributes,
				selectedPostId: post_id,
				selectedPostType: PT_VENUE,
			};
			props.setAttributes(newAttributes);
		}
	}

	const { saveEntityRecord } = useDispatch( coreDataStore );
	const handleVenueSave = async () => {


		const savedRecord = await saveEntityRecord(
			'postType',
			PT_VENUE,
			{
				title,
				status: 'publish',
				meta: {
					// @TODO: Should become 'geo_address', when #560 is resolved!
					gatherpress_venue_information: JSON.stringify({
						fullAddress: address
					})
				}
			}
		);
		if ( savedRecord ) {

			console.log( savedRecord.title.rendered + ' Venue saved successfully.' );

			updateVenueDetailsBlockAttributes( savedRecord.id, props );
		}
	};



	/**
	 * A functional component for the block editor that creates a new venue post,
	 * finds the venue term with the same slug as the newly created venue post,
	 * and updates the currently edited event post with the ID of the queried venue term.
	 */
    // Get the editPost function from the core/editor store to update the post.
    // const { editPost } = useDispatch('core/editor');
    const updateVenueTermOnEventPost = () => {

		// Create a new venue post with the provided title & address.
        apiFetch({
            path: '/wp/v2/gatherpress_venues',
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
        })
        .then((newPost) => {
			console.log( newPost.title.rendered + ' Venue saved successfully.' );
            // Fetch the term based on the slug of the newly created venue post.
			console.log(newPost);
            const newPostSlug = '_' + newPost.slug;
            return apiFetch({ path: `/wp/v2/_gatherpress_venue?slug=${newPostSlug}` });
        })
        .then((terms) => {
            if (terms.length > 0) {
                const term = terms[0];
                // Update the currently edited event with the venue taxonomy term.
                // editPost( {
				// 	taxonomies: {
				// 		_gatherpress_venue: [ term.id ]
				// 	}
				// } );
				updateVenueTaxonomyIds( [ term.id ] );
				console.log('Updates the event with the venue taxonomy term.', term );
            }
        })
        .catch((error) => {
            console.error('Error creating post or fetching term:', error);
        });
    };

	// const saveBogus = ( newVenue ) => {
	const saveBogus = async () => {

		if ( isEventPostType() ) {

			// This should only work for the VenueTermsCombobox !!
			updateVenueTermOnEventPost();

		} else {
			await handleVenueSave();
			// updateVenueDetailsBlockAttributes( newVenue.id, props );
		}
		// for both
		navigateBack();
	}	

	return (
		<VenueForm
			title={ title ?? '' }
			onChangeTitle={ setTitle }
			address={ address ?? '' }
			onChangeAddress={ setAddress }
			hasEdits={ !!title }
			// onSave={ handleSave }
			onSave={ saveBogus }
/* 			onSave={ () => {
				// This should only work for the VenueTermsCombobox !!
				updateVenueTermOnEventPost();
				// for both
				navigateBack();
			} } */
			lastError={ lastError }
			onCancel={ navigateBack }
			isSaving={ isSaving }
		/>
	);
}


export default CreateVenueForm;
