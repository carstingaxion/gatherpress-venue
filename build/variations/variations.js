/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/VenueContext.js":
/*!****************************************!*\
  !*** ./src/components/VenueContext.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VenueContext: () => (/* binding */ VenueContext)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const VenueContext = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createContext)({
  postId: 0
});

/***/ }),

/***/ "./src/components/VenuePostsCombobox.js":
/*!**********************************************!*\
  !*** ./src/components/VenuePostsCombobox.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VenuePostsCombobox: () => (/* binding */ VenuePostsCombobox)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _helpers_globals__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../helpers/globals */ "./src/helpers/globals.js");
/* harmony import */ var _helpers_event__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../helpers/event */ "./src/helpers/event.js");
/* harmony import */ var _helpers_namespace__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./../helpers/namespace */ "./src/helpers/namespace.js");

/**
 * WordPress dependencies
 */






/**
 * Internal dependencies.
 */



// const PT_EVENT = 'gp_event';
// const PT_VENUE = 'gp_venue';
// const TAX_VENUE_SHADOW = '_gp_venue';


/**
 * This component shows a list of selectable venues.
 * 
 * If shown within a 'gp_event' post context it will save the selected venue as '_gp_venue' taxonomy.
 * 
 * Used in all other post contexts it will not save anything to the currently edited post, 
 * but instead just change the attributes of the related block to show the selcted venue.
 * 
 * @param {Object} props Properties of the 'venue'-core/group-block-variation.
 * @returns Combobox component with our venues selectable.
 */
const VenuePostsCombobox = props => {
  const [search, setSearch] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)('');
  const {
    isResolvingPosts,
    records: venuePosts
  } = (0,_wordpress_core_data__WEBPACK_IMPORTED_MODULE_2__.useEntityRecords)('postType', _helpers_namespace__WEBPACK_IMPORTED_MODULE_8__.PT_VENUE, {
    context: 'view',
    per_page: 10,
    search
  });
  const update = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useCallback)(value => {
    // Setup the 'gp_venue' post to provide context for,
    // after a new 'gp_venue' post was selected.

    const newAttributes = {
      ...props.attributes,
      selectedPostId: value,
      selectedPostType: _helpers_namespace__WEBPACK_IMPORTED_MODULE_8__.PT_VENUE
    };
    props.setAttributes(newAttributes);
  }, [props]);
  const setSearchDebounced = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_4__.useDebounce)(value => {
    setSearch(value);
  }, 300);
  const setOptions = () => {
    /**
     * Using useMemo will cause a re-render only when the raw venuePosts really change.
     */
    const venuePostsAsOptions = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useMemo)(() => {
      return venuePosts?.map(post => ({
        label: 'POST ' + post?.title.rendered,
        value: post?.id
      })) || [];
    }, [venuePosts]);
    return isResolvingPosts ? [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Loading&hellip;', 'gatherpress'),
      value: 'loading'
    }] : venuePostsAsOptions;
  };
  const setValue = () => {
    return props?.attributes?.selectedPostId || 'loading';
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ComboboxControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Choose a venue', 'gatherpress'),
    __next40pxDefaultSize: true
    // onChange={(value) => {
    // 	// console.log('onChange',{value, props});
    // 	update(value);
    // }}
    ,
    onChange: update
    // onFilterValueChange={(value) => {
    // 	setSearchDebounced(value);
    // }}
    ,
    onFilterValueChange: setSearchDebounced,
    options: setOptions(),
    value: setValue()
  }));
};


/***/ }),

/***/ "./src/components/VenueTermsCombobox.js":
/*!**********************************************!*\
  !*** ./src/components/VenueTermsCombobox.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VenueTermsCombobox: () => (/* binding */ VenueTermsCombobox)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _helpers_globals__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../helpers/globals */ "./src/helpers/globals.js");
/* harmony import */ var _helpers_event__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../helpers/event */ "./src/helpers/event.js");
/* harmony import */ var _helpers_namespace__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./../helpers/namespace */ "./src/helpers/namespace.js");

/**
 * WordPress dependencies
 */






/**
 * Internal dependencies.
 */



// const PT_EVENT = 'gp_event';
// const PT_VENUE = 'gp_venue';
// const TAX_VENUE_SHADOW = '_gp_venue';


/**
 * This component shows a list of selectable venues.
 * 
 * If shown within a 'gp_event' post context it will save the selected venue as '_gp_venue' taxonomy.
 * 
 * Used in all other post contexts it will not save anything to the currently edited post, 
 * but instead just change the attributes of the related block to show the selcted venue.
 * 
 * @param {Object} props Properties of the 'venue'-core/group-block-variation.
 * @returns Combobox component with our venues selectable.
 */
const VenueTermsCombobox = (props = null) => {
  const [search, setSearch] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useState)('');
  const cId = (0,_helpers_globals__WEBPACK_IMPORTED_MODULE_6__.getCurrentContextualPostId)(props?.context?.postId);
  const [venueTaxonomyIds, updateVenueTaxonomyIds] = (0,_wordpress_core_data__WEBPACK_IMPORTED_MODULE_2__.useEntityProp)('postType', _helpers_namespace__WEBPACK_IMPORTED_MODULE_8__.PT_EVENT, _helpers_namespace__WEBPACK_IMPORTED_MODULE_8__.TAX_VENUE_SHADOW, cId);
  const {
    isResolvingTerms,
    records: venueTerms
  } = (0,_wordpress_core_data__WEBPACK_IMPORTED_MODULE_2__.useEntityRecords)('taxonomy', _helpers_namespace__WEBPACK_IMPORTED_MODULE_8__.TAX_VENUE_SHADOW, {
    context: 'view',
    per_page: 10,
    search
  });
  const setSearchDebounced = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_4__.useDebounce)(value => {
    setSearch(value);
  }, 300);

  // console.log('venueTaxonomyIds',venueTaxonomyIds);
  const setOptions = () => {
    /**
     * Using useMemo will cause a re-render only when the raw venueTerms really change.
     */
    const venueTermsAsOptions = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useMemo)(() => {
      return venueTerms?.map(term => ({
        label: 'TERM ' + term?.name,
        value: term?.id
      })) || [];
    }, [venueTerms]);
    return isResolvingTerms ? [{
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Loading&hellip;', 'gatherpress'),
      value: 'loading'
    }]
    // : terms?.map((term) => ({

    // 		label: 'TERM ' + term?.name,
    // 		value: term?.id,
    // })) || [];
    : venueTermsAsOptions;
  };
  const update = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_3__.useCallback)(value => {
    // console.log('handleVenueTaxChange = useCallback',{value, props});

    // console.log(value);
    // console.log(Number.isFinite( value ));

    // Could be no real termID if "Choose a venue" was selected
    // const save = ( Number.isFinite( value ) ) ? [ value ] : []; // !! works well when changing terms, BUT: when all venues are removed by "x", value is null. but this empty array leads to <react> errors-.
    // const save = ( Number.isFinite( value ) ) ? [ value ] : [0]; // having "0" works against the react error, but leads to showing wrong venues, where there shouldnt be any.
    const save = Number.isFinite(value) ? [value] : []; // 

    updateVenueTaxonomyIds(save);
  }, [updateVenueTaxonomyIds]);
  const setValue = () => {
    return venueTaxonomyIds?.[0] || 'loading';
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ComboboxControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Choose a venue', 'gatherpress'),
    __next40pxDefaultSize: true
    // onChange={(value) => {
    // 	// console.log('onChange',{value, props});
    // 	update(value);
    // }}
    ,
    onChange: update
    // onFilterValueChange={(value) => {
    // 	setSearchDebounced(value);
    // }}
    ,
    onFilterValueChange: setSearchDebounced,
    options: setOptions(),
    value: setValue()
  }));
};


/***/ }),

/***/ "./src/edit.js":
/*!*********************!*\
  !*** ./src/edit.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   venueEdit: () => (/* binding */ venueEdit)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_VenuePostsCombobox__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/VenuePostsCombobox */ "./src/components/VenuePostsCombobox.js");
/* harmony import */ var _components_VenueTermsCombobox__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/VenueTermsCombobox */ "./src/components/VenueTermsCombobox.js");
/* harmony import */ var _helpers_globals__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./helpers/globals */ "./src/helpers/globals.js");
/* harmony import */ var _helpers_event__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./helpers/event */ "./src/helpers/event.js");
/* harmony import */ var _helpers_venue__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./helpers/venue */ "./src/helpers/venue.js");
/* harmony import */ var _components_VenueContext__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/VenueContext */ "./src/components/VenueContext.js");
/* harmony import */ var _helpers_namespace__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./helpers/namespace */ "./src/helpers/namespace.js");

/**
 * WordPress dependencies
 */

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */


/**
 * Get stuff to filter block attributes on the fly
 *
 * @see https://github.com/WordPress/gutenberg/issues/10082#issuecomment-642786811
 */





/**
 * Internal dependencies
 */







const VenueComboboxProvider = (props = null) => {
  const isEventContext = (0,_helpers_event__WEBPACK_IMPORTED_MODULE_9__.isEventPostType)(props?.context?.postType);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, isEventContext && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_VenueTermsCombobox__WEBPACK_IMPORTED_MODULE_7__.VenueTermsCombobox, {
    ...props
  }), !isEventContext && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_VenuePostsCombobox__WEBPACK_IMPORTED_MODULE_6__.VenuePostsCombobox, {
    ...props
  }));
};
const venueEdit = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_2__.createHigherOrderComponent)(BlockEdit => {
  return props => {
    if (props.name !== _helpers_namespace__WEBPACK_IMPORTED_MODULE_12__.VARIATION_OF) {
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockEdit, {
        ...props
      });
    }
    if (!props?.attributes?.className?.includes(_helpers_namespace__WEBPACK_IMPORTED_MODULE_12__.GPV_CLASS_NAME)) {
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockEdit, {
        ...props
      });
    }

    // If this 'venue' block is on the root-level of a 'gp_event' post,
    // the desired post is the currently edited post.
    // Alternatively the block could be part of a `core/query` block, 
    // then props.context provides `postType` and `postId` to use.
    const cId = (0,_helpers_globals__WEBPACK_IMPORTED_MODULE_8__.getCurrentContextualPostId)(props?.context?.postId);
    const [venueTaxonomyIds, updateVenueTaxonomyIds] = (0,_wordpress_core_data__WEBPACK_IMPORTED_MODULE_5__.useEntityProp)('postType', _helpers_namespace__WEBPACK_IMPORTED_MODULE_12__.PT_EVENT, _helpers_namespace__WEBPACK_IMPORTED_MODULE_12__.TAX_VENUE_SHADOW, cId);
    const {
      isSelected
    } = props;
    const isDescendentOfQueryLoop = Number.isFinite(props?.context?.queryId);
    const isEventContext = (0,_helpers_event__WEBPACK_IMPORTED_MODULE_9__.isEventPostType)(props?.context?.postType);
    const venuePostFromEventId = (0,_helpers_venue__WEBPACK_IMPORTED_MODULE_10__.getVenuePostFromEventId)(cId);

    // const isEditableEventContext = ! isDescendentOfQueryLoop && venueTaxonomyIds && venueTaxonomyIds.length >= 1 && Number.isFinite( venueTaxonomyIds[0] );
    const isEditableEventContext = !isDescendentOfQueryLoop && venueTaxonomyIds instanceof Array;
    const taxIds = venueTaxonomyIds && venueTaxonomyIds.length >= 1 && Number.isFinite(venueTaxonomyIds[0]) ? venueTaxonomyIds[0] : null;
    const venuePostFromTermId = (0,_helpers_venue__WEBPACK_IMPORTED_MODULE_10__.getVenuePostFromTermId)(taxIds);

    // console.log('isEditableEventContext', isEditableEventContext  );
    // let venuePost;
    // console.log(venuePost);
    let venuePost = isEditableEventContext ? venuePostFromTermId : isEventContext ? venuePostFromEventId : null;

    // console.log(venuePost);

    let venuePostContext = venuePost && venuePost.length >= 1 && Number.isFinite(venuePost[0].id) ? venuePost[0].id // working !
    : props?.attributes?.selectedPostId;
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, venuePostContext && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_VenueContext__WEBPACK_IMPORTED_MODULE_11__.VenueContext.Provider, {
      value: venuePostContext
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockEdit, {
      ...props
    })), !venuePostContext && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("em", null, "What to show, when (1) no venues or (2) an online-event is selected?"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("br", null), " (At least, add a placeholder here to provide help)."), !isDescendentOfQueryLoop && isSelected &&
    // https://github.com/carstingaxion/gutenberg/blob/964bf6dbc7a2c357a2383e145bbd3cf561cf2ae4/packages/block-library/src/query/edit/inspector-controls/index.js#L29-L30
    // import { unlock } from '../../../lock-unlock';
    // const { BlockInfo } = unlock( blockEditorPrivateApis );
    // <BlockInfo>
    // 	<PanelBody
    // 		title={__('Venue settings', 'gatherpress')}
    // 		initialOpen={true}
    // 	>
    // 		<PanelRow>
    // 			<VenueCombobox {...props} />
    // 		</PanelRow>
    // 	</PanelBody>
    // </BlockInfo>

    (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Venue settings', 'gatherpress'),
      initialOpen: true
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(VenueComboboxProvider, {
      ...props
    })))));
  };
}, 'venueEdit');


/***/ }),

/***/ "./src/helpers/event.js":
/*!******************************!*\
  !*** ./src/helpers/event.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isEventPostType: () => (/* binding */ isEventPostType)
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/**
 * WordPress dependencies.
 */


/**
 * Checks if the current post type is an event in the GatherPress application.
 *
 * This function queries the current post type using the `select` function from the `core/editor` package.
 * It returns `true` if the current post type is 'gp_event', indicating that the post is an event,
 * and `false` otherwise.
 *
 * @since 0.30.0 Added postType parameter.
 * 
 * @since 0.28.0
 * 
 * @param  {string|null} postType Post type slug to check against, instead of the current post type.
 *
 * @return {boolean} True if the current post type is 'gp_event', false otherwise.
 */
function isEventPostType(postType = null) {
  const postTypeToCheck = postType || (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.select)('core/editor').getCurrentPostType();
  // console.log(postTypeToCheck);
  return 'gp_event' === postTypeToCheck;
}

/***/ }),

/***/ "./src/helpers/globals.js":
/*!********************************!*\
  !*** ./src/helpers/globals.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getCurrentContextualPostId: () => (/* binding */ getCurrentContextualPostId),
/* harmony export */   getCurrentContextualPostType: () => (/* binding */ getCurrentContextualPostType)
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);


/**
 * 
 *
 * @return {boolean} True if the c...., false otherwise.
 */
function getCurrentContextualPostId(postId = null) {
  const post = postId || (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.select)('core/editor').getCurrentPostId();
  // console.log(post);

  return post;
}
function getCurrentContextualPostType(postType = null) {
  return postType || (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.select)('core/editor').getCurrentPostType();
}

/***/ }),

/***/ "./src/helpers/namespace.js":
/*!**********************************!*\
  !*** ./src/helpers/namespace.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GPV_CLASS_NAME: () => (/* binding */ GPV_CLASS_NAME),
/* harmony export */   PT_EVENT: () => (/* binding */ PT_EVENT),
/* harmony export */   PT_VENUE: () => (/* binding */ PT_VENUE),
/* harmony export */   TAX_VENUE_SHADOW: () => (/* binding */ TAX_VENUE_SHADOW),
/* harmony export */   VARIATION_OF: () => (/* binding */ VARIATION_OF)
/* harmony export */ });
const PT_EVENT = 'gp_event';
const PT_VENUE = 'gp_venue';
const TAX_VENUE_SHADOW = '_gp_venue';
const GPV_CLASS_NAME = 'gp-venue-v3'; // maybe better: 'gp-venue-portal-group'

const VARIATION_OF = 'core/group';

/***/ }),

/***/ "./src/helpers/venue.js":
/*!******************************!*\
  !*** ./src/helpers/venue.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getVenuePostFromEventId: () => (/* binding */ getVenuePostFromEventId),
/* harmony export */   getVenuePostFromTermId: () => (/* binding */ getVenuePostFromTermId)
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/**
 * WordPress dependencies.
 */


/**
 * Get slug of venue post by providing a venue term slug.
 * 
 * @since 0.30.0
 * 
 * @param {String} termSlug Slug of a '_gp_venue' taxonomy term.
 * 
 * @returns Slug of the corresponding 'gp_venue' post.

export function getVenueSlugFromTermSlug( termSlug ) {
	
	return termSlug.replace(/^_/, '');
} */

/**
 * Retrieve a 'gp_venue' post from a given '_gp_venue' term ID.
 *
 * @since 0.30.0
 *
 * @return {Object} WP_Post 
 */
function getVenuePostFromTermId(termId) {
  const {
    venuePost
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.useSelect)(select => {
    console.log('termId', termId);
    if (null === termId) {
      return [];
    }
    const venueTerm = select('core').getEntityRecord('taxonomy', '_gp_venue', termId);
    const venueSlug = venueTerm?.slug.replace(/^_/, '');
    return {
      // venuePost: ( ! Number.isFinite( termId ) ) ? [] : select('core').getEntityRecords('postType', 'gp_venue', {
      venuePost: select('core').getEntityRecords('postType', 'gp_venue', {
        per_page: 1,
        slug: venueSlug
      })
    };
  }, [termId]);

  // console.log('venuePost', venuePost);

  return venuePost;
}

/**
 * Retrieve a 'gp_venue' post from a given 'gp_event' post ID.
 *
 * @since 0.30.0
 *
 * @return {Object} WP_Post 
 */
function getVenuePostFromEventId(eventId) {
  const {
    termId
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.useSelect)(select => {
    // const { venuePost } = useSelect((select) =>{
    // console.log(eventId);
    const eventPost = select('core').getEntityRecord('postType', 'gp_event', eventId);
    return {
      termId: eventPost && eventPost._gp_venue.length >= 1 ? eventPost?._gp_venue?.[0] : null
      // venuePost: ( eventPost && eventPost._gp_venue.length >= 1 ) ? getVenuePostFromTermId( eventPost?._gp_venue?.[0] ) : [],
    };
  }, [eventId]);

  // console.log('termId',termId);
  return getVenuePostFromTermId(termId);
  // return venuePost;
}

/***/ }),

/***/ "./src/slotfill.js":
/*!*************************!*\
  !*** ./src/slotfill.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ VenueBlockPluginFill)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_VenueTermsCombobox__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/VenueTermsCombobox */ "./src/components/VenueTermsCombobox.js");

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */



/**
 * Internal dependencies
 */

function VenueBlockPluginFill() {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Fill, {
    name: "VenuePluginDocumentSettings"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, "THE \"VenueBlockPluginFill\" in VenuePluginDocumentSettings")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Fill, {
    name: "VenuePluginDocumentSettings"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_VenueTermsCombobox__WEBPACK_IMPORTED_MODULE_3__.VenueTermsCombobox, null)));
}

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/compose":
/*!*********************************!*\
  !*** external ["wp","compose"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["compose"];

/***/ }),

/***/ "@wordpress/core-data":
/*!**********************************!*\
  !*** external ["wp","coreData"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["coreData"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/hooks":
/*!*******************************!*\
  !*** external ["wp","hooks"] ***!
  \*******************************/
/***/ ((module) => {

module.exports = window["wp"]["hooks"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "@wordpress/plugins":
/*!*********************************!*\
  !*** external ["wp","plugins"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["plugins"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***************************!*\
  !*** ./src/variations.js ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/plugins */ "@wordpress/plugins");
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_plugins__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _helpers_globals__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./helpers/globals */ "./src/helpers/globals.js");
/* harmony import */ var _components_VenueContext__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/VenueContext */ "./src/components/VenueContext.js");
/* harmony import */ var _slotfill__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./slotfill */ "./src/slotfill.js");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./edit */ "./src/edit.js");
/* harmony import */ var _helpers_namespace__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./helpers/namespace */ "./src/helpers/namespace.js");

/**
 * WordPress dependencies
 */

/**
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-variations/
 */


/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */


/**
 * Get stuff to filter block attributes on the fly
 *
 * @see https://github.com/WordPress/gutenberg/issues/10082#issuecomment-642786811
 */





/**
 * Internal dependencies
 */






/*
 * New `core/group` block variation.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-variations/
 */
const venuePortalGroup = {
  name: _helpers_namespace__WEBPACK_IMPORTED_MODULE_11__.GPV_CLASS_NAME,
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Venue Details (v3)', 'gatherpress'),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Queries information for a venue.', 'gatherpress'),
  category: 'gatherpress',
  icon: 'nametag',
  keywords: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('website', 'gatherpress'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('location', 'gatherpress'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('city', 'gatherpress')],
  scope: ['inserter', 'block'],
  attributes: {
    className: _helpers_namespace__WEBPACK_IMPORTED_MODULE_11__.GPV_CLASS_NAME,
    // important for isActive callback fn

    // is neccessary to make isActive work !!
    // @see https://github.com/WordPress/gutenberg/issues/41303#issuecomment-1526193087
    layout: {
      type: 'flex',
      orientation: 'nonsense'
    } // works
    // layout: { type: 'constrained' }, // does not work!
  },
  isActive: (blockAttrs, variationAttrs) => {
    // console.warn('blockAttrs',blockAttrs);
    // console.warn('variationAttrs',variationAttrs);
    return blockAttrs?.className.includes(_helpers_namespace__WEBPACK_IMPORTED_MODULE_11__.GPV_CLASS_NAME) // check if className contains GROUP_CARD_VARIATION and not equals. incase you add additional css classes it will still work
    ;
  },
  innerBlocks: [['core/post-title'], ['core/paragraph', {
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Add text or blocks that will display in the context of the selected VENUE.')
  }]]
};
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockVariation)(_helpers_namespace__WEBPACK_IMPORTED_MODULE_11__.VARIATION_OF, venuePortalGroup);
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__.addFilter)('blocks.registerBlockType', 'gatherpress/extend-group-block', extendGroupBlock);
function extendGroupBlock(settings, name) {
  if (name !== _helpers_namespace__WEBPACK_IMPORTED_MODULE_11__.VARIATION_OF) {
    return settings;
  }
  // console.warn(name);
  // console.warn(settings);

  settings.usesContext.indexOf('queryId') === -1 && settings.usesContext.push('queryId');
  settings.usesContext.indexOf('postId') === -1 && settings.usesContext.push('postId');
  settings.usesContext.indexOf('postType') === -1 && settings.usesContext.push('postType');
  const cId = (0,_helpers_globals__WEBPACK_IMPORTED_MODULE_7__.getCurrentContextualPostId)(null);
  const newSettings = {
    ...settings,
    attributes: {
      ...settings.attributes,
      selectedPostId: {
        type: 'integer'
      },
      selectedPostType: {
        type: 'string'
      }
    },
    supports: {
      ...settings.supports,
      className: false // Removes "Additional CSS classes" panel for blocks that support it
      // customClassName: false // **Updated** For blocks that don't have className
    }
    // providesContext: {
    // 	...settings.providesContext,
    // 	'postId': 'selectedPostId', // this allow to overwrite context with a static value
    // 	'postType': 'selectedPostType'
    // }
  };
  // console.log(newSettings);
  return newSettings;
}
const childBlockContextProvider = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_3__.createHigherOrderComponent)(BlockEdit => {
  return props => {
    const VenueContextId = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_6__.useContext)(_components_VenueContext__WEBPACK_IMPORTED_MODULE_8__.VenueContext);
    const useModifiedProps = Number.isFinite(VenueContextId);
    // const newId = ( useModifiedProps ) ? VenueContextId : props?.context?.postId;
    // const newType = ( useModifiedProps ) ? PT_VENUE : props?.context?.postType;
    const modifiedProps = {
      ...props,
      context: {
        ...props.context,
        postId: VenueContextId,
        postType: _helpers_namespace__WEBPACK_IMPORTED_MODULE_11__.PT_VENUE
      }
    };
    // console.log(props.name,modifiedProps.context);
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, useModifiedProps && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockEdit, {
      ...modifiedProps
    }), !useModifiedProps && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockEdit, {
      ...props
    }));
  };
});

/**
 * 
 *
 * @param {function} BlockEdit Original component
 * @returns {function} Wrapped component
 *
 * @see https://developer.wordpress.org/block-editor/developers/filters/block-filters/#editor-blockedit
 */
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__.addFilter)("editor.BlockEdit", "gatherpress-venue/post-title-block-variation", childBlockContextProvider);

/**
 * Add the edit component to the block.
 * This is the component that will be rendered in the editor.
 * It will be rendered after the original block edit component.
 *
 * @param {function} BlockEdit Original component
 * @returns {function} Wrapped component
 *
 * @see https://developer.wordpress.org/block-editor/developers/filters/block-filters/#editor-blockedit
 */
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__.addFilter)("editor.BlockEdit", "gatherpress-venue/group-block-variation", _edit__WEBPACK_IMPORTED_MODULE_10__.venueEdit, 1);
(0,_wordpress_plugins__WEBPACK_IMPORTED_MODULE_5__.registerPlugin)('venue-block-slot-fill', {
  render: _slotfill__WEBPACK_IMPORTED_MODULE_9__["default"]
});
})();

/******/ })()
;
//# sourceMappingURL=variations.js.map