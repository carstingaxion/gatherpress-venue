/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/EditUpdater.js":
/*!***************************************!*\
  !*** ./src/components/EditUpdater.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _helpers_globals__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../helpers/globals */ "./src/helpers/globals.js");
/* harmony import */ var _helpers_event__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../helpers/event */ "./src/helpers/event.js");
/* harmony import */ var _helpers_venue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../helpers/venue */ "./src/helpers/venue.js");

/**
 * WordPress dependencies
 */



/**
 * Internal dependencies.
 */




/**
 * EditUpdater component for GatherPress.
 *
 * This component is used to ...
 *
 * @since 0.30.0
 *
 * @param {Object}  props            - Component properties.
 *
 * @return {JSX.Element} The rendered React component.
 */
const EditUpdater = props => {
  // console.log(isEventPostType(props?.context?.postType));
  // Checks to see if either the given contextual 
  // or the currently edited post is of type 'gp_event'.
  if (!(0,_helpers_event__WEBPACK_IMPORTED_MODULE_4__.isEventPostType)(props?.context?.postType)) {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, props.children);
  }
  // console.log(props);	
  // If this 'venue' block is on the root-level of a 'gp_event' post,
  // the desired post is the currently edited post.
  // Alternatively the block could be part of a `core/query` block, 
  // then props.context provides `postType` and `postId` to use.
  const cId = (0,_helpers_globals__WEBPACK_IMPORTED_MODULE_3__.getCurrentContextualPostId)(props?.context?.postId);
  const [venueTaxonomyIds, updateVenueTaxonomyIds] = (0,_wordpress_core_data__WEBPACK_IMPORTED_MODULE_1__.useEntityProp)('postType', 'gp_event', '_gp_venue', cId);
  const isDescendentOfQueryLoop = Number.isFinite(props?.context?.queryId);
  let venuePost = (0,_helpers_venue__WEBPACK_IMPORTED_MODULE_5__.getVenuePostFromTermId)(venueTaxonomyIds[0]);
  // console.log('getVenuePostFromTermId( null )');
  // console.log(getVenuePostFromTermId( null ));
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    // console.log(venueTaxonomyIds.length);
    console.info(cId);
    console.info(venuePost);
    console.log(venueTaxonomyIds);
    console.warn(props?.context?.queryId);
    console.warn(isDescendentOfQueryLoop);

    // Previewing 
    if (
    // venuePost && 
    // venuePost.length && 
    // typeof venuePost[0].id === 'number' && 
    // venueTaxonomyIds.length &&
    isDescendentOfQueryLoop) {
      console.log('PREVIEWING: isDescendentOfQueryLoop.');
      const newAttributes = {
        ...props.attributes,
        query: {
          ...props.attributes.query,
          // include: [ venuePost[0].id ],
          // selectedPostId: venuePost[0].id,
          previewContext: cId
        }
      };
      props.setAttributes(newAttributes);
      return;
    }

    // Setup the 'gp_venue' post to query,
    // after a new '_gp_venue' taxonomy term was selected.
    // if (venuePost && venuePost.length && typeof venuePost[0].id === 'number' ) {
    if (venuePost && venuePost.length && typeof venuePost[0].id === 'number' && venueTaxonomyIds.length) {
      console.log('We have a new physical venue.');
      const newAttributes = {
        ...props.attributes,
        query: {
          ...props.attributes.query,
          include: [venuePost[0].id],
          selectedPostId: venuePost[0].id
        }
      };
      props.setAttributes(newAttributes);
    }

    // Unset any 'gp_venue' post from the query,
    // after a new ONLINEEVENT '_gp_venue' taxonomy term was selected.
    else if (venuePost && venuePost.length === 0) {
      // if (venuePost.length === 0 ) {
      console.log('This should happen only for ONLINEEVENTS selected.');
      const newAttributes = {
        ...props.attributes,
        query: {
          ...props.attributes.query,
          include: [],
          selectedPostId: ''
        }
      };
      props.setAttributes(newAttributes);
    }

    // if (venuePost && venuePost.length === 0 ) {
    // if (!venuePost) {
    // else if (null===venueTaxonomyIds[0]) {
    // Handle the case where "Choose a venue" was selected,
    // or the '_gp_venue' term was removed otherwise.
    else if (!venueTaxonomyIds.length) {
      console.log('We are unsetting the query attrs.');
      const newAttributes = {
        ...props.attributes,
        query: {
          ...props.attributes.query,
          include: [],
          selectedPostId: ''
        }
      };
      props.setAttributes(newAttributes);
    }
  }, [venueTaxonomyIds, venuePost]);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, props.children);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EditUpdater);

/***/ }),

/***/ "./src/components/NoResultsUpdater.js":
/*!********************************************!*\
  !*** ./src/components/NoResultsUpdater.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helpers_event__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../helpers/event */ "./src/helpers/event.js");

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies.
 */


/**
 * NoResultsUpdater component for GatherPress.
 *
 * This component is used to ...
 *
 * @since 0.30.0
 *
 * @param {Object}  props            - Component properties.
 *
 * @return {JSX.Element} The rendered React component.
 */
const NoResultsUpdater = props => {
  // Add an explicit "Add new venue"-Button.
  const isEvent = (0,_helpers_event__WEBPACK_IMPORTED_MODULE_1__.isEventPostType)(props?.context?.postType);
  const includes = props?.context?.query?.include?.length >= 1;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, props.children);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NoResultsUpdater);

/***/ }),

/***/ "./src/components/PostTemplateUpdater.js":
/*!***********************************************!*\
  !*** ./src/components/PostTemplateUpdater.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _helpers_globals__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../helpers/globals */ "./src/helpers/globals.js");
/* harmony import */ var _helpers_event__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../helpers/event */ "./src/helpers/event.js");
/* harmony import */ var _VenueCombobox__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./VenueCombobox */ "./src/components/VenueCombobox.js");
/* harmony import */ var _helpers_venue__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./../helpers/venue */ "./src/helpers/venue.js");

/**
 * WordPress dependencies
 */

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */






/**
 * Internal dependencies.
 */





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
const PostTemplateUpdater = props => {
  // Add an explicit "Add new venue"-Button.
  const isEvent = (0,_helpers_event__WEBPACK_IMPORTED_MODULE_7__.isEventPostType)(props?.context?.postType);
  const includes = props?.context?.query?.include?.length >= 1;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, props.children);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PostTemplateUpdater);

/***/ }),

/***/ "./src/components/VenueCombobox.js":
/*!*****************************************!*\
  !*** ./src/components/VenueCombobox.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VenueCombobox: () => (/* binding */ VenueCombobox)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/core-data */ "@wordpress/core-data");
/* harmony import */ var _wordpress_core_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _helpers_globals__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./../helpers/globals */ "./src/helpers/globals.js");
/* harmony import */ var _helpers_event__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./../helpers/event */ "./src/helpers/event.js");

/**
 * WordPress dependencies
 */








/**
 * Internal dependencies.
 */


const PT_EVENT = 'gp_event';
const PT_VENUE = 'gp_venue';
const TAX_VENUE_SHADOW = '_gp_venue';

/**
 * This component shows a list of selectable venues.
 * 
 * If shown within a 'gp_event' post context it will save the selected venue as '_gp_venue' taxonomy.
 * 
 * Used in all other post contexts it will not save anything to the currently edited post, 
 * but instead just change the attributes of the related block to show the selcted venue.
 * 
 * @param {Object} props Properties of the 'venue'-core/query-block-variation.
 * @returns Combobox component with our venues selectable.
 */
const VenueCombobox = props => {
  const [search, setSearch] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)('');
  const setSearchDebounced = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_5__.useDebounce)(value => {
    setSearch(value);
  }, 300);
  const {
    isResolvingTerms,
    records: terms
  } = (0,_wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__.useEntityRecords)('taxonomy', '_gp_venue', {
    context: 'view',
    per_page: 10,
    search
  });
  const {
    isResolvingPosts,
    records: posts
  } = (0,_wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__.useEntityRecords)('postType', 'gp_venue', {
    context: 'view',
    per_page: 10,
    search
  });
  const cId = (0,_helpers_globals__WEBPACK_IMPORTED_MODULE_8__.getCurrentContextualPostId)(props?.context?.postId);
  const [venueTaxonomyIds, updateVenueTaxonomyIds] = (0,_wordpress_core_data__WEBPACK_IMPORTED_MODULE_3__.useEntityProp)('postType', 'gp_event', '_gp_venue', cId);
  const setOptions = () => {
    if ((0,_helpers_event__WEBPACK_IMPORTED_MODULE_9__.isEventPostType)(props?.context?.postType)) {
      return isResolvingTerms ? [{
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Loading&hellip;', 'gatherpress'),
        value: 'loading'
      }] : terms?.map(term => ({
        label: 'TERM ' + term?.name,
        value: term?.id
      })) || [];
    } else {
      return isResolvingPosts ? [{
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Loading&hellip;', 'gatherpress'),
        value: 'loading'
      }] : posts?.map(post => ({
        label: 'POST ' + post?.title.rendered,
        value: post?.id
      })) || [];
    }
  };
  const update = value => {
    if ((0,_helpers_event__WEBPACK_IMPORTED_MODULE_9__.isEventPostType)(props?.context?.postType)) {
      // Could be no real termID if "Choose a venue" was selected
      const save = Number.isFinite(value) ? [value] : [];
      updateVenueTaxonomyIds(save);
    } else {
      // !! Duplicated code from EditUpdater.js !! Maybe chance to DRY.

      // Setup the 'gp_venue' post to query,
      // after a new '_gp_venue' taxonomy term was selected.

      const newAttributes = {
        ...props.attributes,
        query: {
          ...props.attributes.query,
          include: [value],
          selectedPostId: value
        }
      };
      props.setAttributes(newAttributes);
    }
  };
  const setValue = () => {
    if ((0,_helpers_event__WEBPACK_IMPORTED_MODULE_9__.isEventPostType)(props?.context?.postType)) {
      return venueTaxonomyIds?.[0] || 'loading';
    } else {
      return props?.attributes?.query?.selectedPostId || 'loading';
    }
  };
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ComboboxControl
  // allowReset={false}
  , {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_6__.__)('Choose a venue', 'gatherpress'),
    __next40pxDefaultSize: true,
    onChange: value => {
      update(value);
    },
    onFilterValueChange: value => {
      setSearchDebounced(value);
    },
    options: setOptions(),
    value: setValue()
  }));
};


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

/***/ "./src/helpers/venue.js":
/*!******************************!*\
  !*** ./src/helpers/venue.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getVenuePostFromTermId: () => (/* binding */ getVenuePostFromTermId),
/* harmony export */   getVenueSlugFromTermSlug: () => (/* binding */ getVenueSlugFromTermSlug)
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
 */
function getVenueSlugFromTermSlug(termSlug) {
  return termSlug.replace(/^_/, '');
}

/**
 * Retrieve a 'gp_venue' post from a given '_gp_venue' term ID.
 *
 * @since 0.30.0
 *
 * @return {Object} WP_Post 
 */
function getVenuePostFromTermId(termId) {
  // console.log(termId);
  if (null === termId) {
    return [];
  }
  const venueTerm = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.useSelect)(select => select('core').getEntityRecord('taxonomy', '_gp_venue', termId));
  // console.log(venueTerm);
  // const slug = getVenueSlugFromTermSlug( venueTerm?.slug );
  const slug = venueTerm?.slug.replace(/^_/, '');
  const venuePost = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.useSelect)(select => select('core').getEntityRecords('postType', 'gp_venue', {
    per_page: 1,
    slug: slug
  }));
  return venuePost;
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
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _components_VenueCombobox__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/VenueCombobox */ "./src/components/VenueCombobox.js");
/* harmony import */ var _components_EditUpdater__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/EditUpdater */ "./src/components/EditUpdater.js");
/* harmony import */ var _components_NoResultsUpdater__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/NoResultsUpdater */ "./src/components/NoResultsUpdater.js");
/* harmony import */ var _components_PostTemplateUpdater__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/PostTemplateUpdater */ "./src/components/PostTemplateUpdater.js");

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




const PT_EVENT = 'gp_event';
const PT_VENUE = 'gp_venue';
const TAX_VENUE_SHADOW = '_gp_venue';
const GPV_CLASS_NAME = 'gp-venue-v2'; // maybe better: 'gp-venue-portal-query'

/*
 * New `core/query` block variation.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-variations/
 */
const venuePortalQuery = {
  name: GPV_CLASS_NAME,
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Venue Details (v2)', 'gatherpress'),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Queries information for a venue.', 'gatherpress'),
  category: 'gatherpress',
  icon: 'nametag',
  keywords: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('website', 'gatherpress'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('location', 'gatherpress'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('city', 'gatherpress')],
  scope: ['inserter', 'block'],
  allowedControls: [],
  attributes: {
    query: {
      namespace: GPV_CLASS_NAME,
      // important for isActive callback fn
      perPage: 1,
      pages: 0,
      offset: 0,
      postType: PT_VENUE,
      inherit: false

      // include: [0], // ardnjhfvghklhewfdboiu1n sl¹!!ô67B!!1!
      // selectedPostId: 0,
    },
    displayLayout: {
      type: 'flex',
      // list | flex
      columns: 1
    },
    className: GPV_CLASS_NAME // important for isActive callback fn
  },
  isActive: (blockAttrs, variationAttrs) => {
    return blockAttrs?.className?.includes(GPV_CLASS_NAME) // check if className contains GPV_CLASS_NAME and not equals. incase you add additional css classes it will still work
    ;
  },
  innerBlocks: [['core/post-template', {
    className: 'venuePortalQueryPostTemplate'
  }, [['core/post-title']]], ['core/query-no-results', {
    className: 'venuePortalQueryNoResults'
  }, [['core/paragraph', {
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Add text or blocks that will display when a VENUE query returns no results.')
  }]]]]
};
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockVariation)('core/query', venuePortalQuery);
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__.addFilter)('blocks.registerBlockType', 'gatherpress/extend-query-block', extendQueryBlock);
function extendQueryBlock(settings, name) {
  if (name !== 'core/query' && name !== 'core/paragraph') {
    return settings;
  }
  // console.log(name);
  // console.info(settings);
  settings.usesContext.indexOf('postId') === -1 && settings.usesContext.push('queryId');
  settings.usesContext.indexOf('postId') === -1 && settings.usesContext.push('postId');
  settings.usesContext.indexOf('postType') === -1 && settings.usesContext.push('postType');
  const newSettings = {
    ...settings,
    supports: {
      ...settings.supports,
      className: false // Removes "Additional CSS classes" panel for blocks that support it
      // customClassName: false // **Updated** For blocks that don't have className
    }
    // usesContext: settings.usesContext.push('postId'),
  };
  // console.log(newSettings);
  return newSettings;
}

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
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__.addFilter)("editor.BlockEdit", "gatherpress-venue/query-block-variation", (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_3__.createHigherOrderComponent)(BlockEdit => {
  return props => {
    if (props.name !== "core/query") {
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockEdit, {
        ...props
      });
    }
    if (!props?.attributes?.className?.includes(GPV_CLASS_NAME)) {
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockEdit, {
        ...props
      });
    }
    const {
      isSelected
    } = props;

    // addFilter(
    // 	// 'blocks.getSaveContent.extraProps',
    // 	'blocks.getSaveContent',
    // 	'jetpack/videopress',
    // 	preventBlockClassOnDeprecations,
    // 	20
    // );

    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_EditUpdater__WEBPACK_IMPORTED_MODULE_8__["default"], {
      ...props
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockEdit, {
      ...props
    })), isSelected && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_5__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Venue settings', 'gatherpress'),
      initialOpen: true
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_6__.PanelRow, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_VenueCombobox__WEBPACK_IMPORTED_MODULE_7__.VenueCombobox, {
      ...props
    })))));
  };
}));
function wrapCoverBlockInContainer(element, blockType, attributes) {
  // skip if element is undefined
  if (!element) {
    return;
  }

  // only apply to cover blocks
  if (blockType.name !== 'core/query') {
    return element;
  }
  console.log('getSaveElement for custom query blockj.');
  console.log(element);
  // return the element wrapped in a div
  return element;
}

// addFilter(
//     'blocks.getSaveElement',
//     'my-plugin/wrap-cover-block-in-container',
//     wrapCoverBlockInContainer
// );

/**
 * COPIED from 
 * @source https://github.com/Automattic/jetpack/blob/fb912fede775e2851e326b3e0991b62696badabb/projects/plugins/jetpack/extensions/blocks/videopress/editor.js#L107C1-L142C3
 * 
 * Gutenberg introduced a change that causes a `wp-block-video` class to be
 * applied to the block via the `blocks.getSaveContent.extraProps` hook. This
 * results in all prior deprecations being unable to generate what was
 * previously valid content.
 *
 * This filter removes that introduced class so the deprecations can produce
 * content that matches the originally saved post content and successfully
 * migrate deprecated blocks to the current version.
 *
 * @param   {object} props      - Additional props applied to the save element.
 * @param   {object} blockType  - Block type definition.
 * @param   {object} attributes - Block's attributes.
 * @returns {object}            - Filtered props applied to the save element.
 */
const preventBlockClassOnDeprecations = (props, blockType, attributes) => {
  if (blockType.name !== 'core/query') {
    return props;
  }
  if (!attributes?.className?.includes(GPV_CLASS_NAME)) {
    return props;
  }

  // Skip manipulating the block's className prop if:
  // - Is a placeholder query block ( no guid )
  // if ( ! attributes.guid ) {
  // 	return props;
  // }
  console.log('Saving the custom query blockj.');
  console.log(props);

  // Prevent `wp-block-video` class being applied.
  // props.attributes.query = props.className.replace( 'wp-block-video', '' ).trim();
  // delete props.attributes.query.include;
  // delete props.attributes.query.selectedPostId;

  console.log('AFTER delete');
  // console.log(props.attributes.query)
  return props;
};

// import './assets/css/blocks/query-variation--venue.scss'

/*
 * New `core/post-template` block variation.
 * 
 * This is not needed, but nice to have.
 * The normal block-renaming feature is nice, but only 'renames' the block inside the block list,
 * not on its InspectorControls. A block-variation can do both.
 * 
 * A custom icon is also nice for our use-case.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-variations/
 */
const venuePortalQueryPostTemplate = {
  // name: GPV_CLASS_NAME,
  name: 'venuePortalQueryPostTemplate',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Venue Details Post Template (v2)', 'gatherpress'),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Contains the block elements used to render a VENUE post, like the title, date, featured image, content or excerpt, and more.', 'gatherpress'),
  category: 'gatherpress',
  icon: 'nametag',
  scope: [],
  attributes: {
    className: 'venuePortalQueryPostTemplate' // important for isActive callback fn
    // gpName: 'venuePortalQueryPostTemplate', // important for isActive callback fn
    // namespace: 'venuePortalQueryPostTemplate', // important for isActive callback fn
  },
  isActive: ['className']
  // isActive: [ 'namespace' ],
  // isActive: [ 'gpName' ],

  // innerBlocks: [
  // 	[
  // 		'core/post-template',
  // 		{},
  // 		[
  // 			['core/post-title'],
  // 		],
  // 	],
  // 	[
  // 		'core/query-no-results',
  // 		{},
  // 		[
  // 			[
  // 				'core/paragraph',
  // 				{
  // 					placeholder: __(
  // 						'Add text or blocks that will display when a VENUE query returns no results.'
  // 					),
  // 				},
  // 			],
  // 		]
  // 	],
  // ],
};
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockVariation)('core/post-template', venuePortalQueryPostTemplate);

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
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__.addFilter)("editor.BlockEdit", "gatherpress-venue/post-template-block-variation", (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_3__.createHigherOrderComponent)(BlockEdit => {
  return props => {
    if (props.name !== "core/post-template") {
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockEdit, {
        ...props
      });
    }
    if (!props?.attributes?.className?.includes('venuePortalQueryPostTemplate')) {
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockEdit, {
        ...props
      });
    }
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_PostTemplateUpdater__WEBPACK_IMPORTED_MODULE_10__["default"], {
      ...props
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockEdit, {
      ...props
    })));
  };
}));

/*
 * New `core/post-template` block variation.
 * 
 * This is not needed, but nice to have.
 * The normal block-renaming feature is nice, but only 'renames' the block inside the block list,
 * not on its InspectorControls. A block-variation can do both.
 * 
 * A custom icon is also nice for our use-case.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-variations/
 */
const venuePortalQueryNoResults = {
  // name: GPV_CLASS_NAME,
  name: 'venuePortalQueryNoResults',
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Venue Details No Results (v2)', 'gatherpress'),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Contains the block elements used to render content when no VENUE query results are found.', 'gatherpress'),
  category: 'gatherpress',
  icon: 'nametag',
  scope: [],
  attributes: {
    className: 'venuePortalQueryNoResults' // important for isActive callback fn
  },
  isActive: ['className']

  // innerBlocks: [
  // 	[
  // 		'core/post-template',
  // 		{},
  // 		[
  // 			['core/post-title'],
  // 		],
  // 	],
  // 	[
  // 		'core/query-no-results',
  // 		{},
  // 		[
  // 			[
  // 				'core/paragraph',
  // 				{
  // 					placeholder: __(
  // 						'Add text or blocks that will display when a VENUE query returns no results.'
  // 					),
  // 				},
  // 			],
  // 		]
  // 	],
  // ],
};
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockVariation)('core/query-no-results', venuePortalQueryNoResults);

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
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_4__.addFilter)("editor.BlockEdit", "gatherpress-venue/query-no-results-block-variation", (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_3__.createHigherOrderComponent)(BlockEdit => {
  return props => {
    if (props.name !== "core/query-no-results") {
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockEdit, {
        ...props
      });
    }
    if (!props?.attributes?.className?.includes('venuePortalQueryNoResults')) {
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockEdit, {
        ...props
      });
    }
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_NoResultsUpdater__WEBPACK_IMPORTED_MODULE_9__["default"], {
      ...props
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockEdit, {
      ...props
    })));
  };
}));
/* 
addFilter(
	"editor.BlockListBlock",
	"gatherpress-venue/query-no-results-block-variation",
	createHigherOrderComponent((BlockListBlock) => {
		return (props) => {
			if (props.name !== "core/query-no-results") {
				return <BlockListBlock {...props} />;
			}
			if ( !props?.attributes?.className?.includes('venuePortalQueryNoResults') ) {
				return <BlockListBlock {...props} />
			}

			return (
				<>
					<NoResultsUpdater {...props} >
						<BlockListBlock {...props} />
					</NoResultsUpdater>
				</>
			);
		};
	}),
); */
})();

/******/ })()
;
//# sourceMappingURL=variations.js.map