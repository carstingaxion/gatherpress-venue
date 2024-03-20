/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/compose":
/*!*********************************!*\
  !*** external ["wp","compose"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["compose"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["data"];

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
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/compose */ "@wordpress/compose");
/* harmony import */ var _wordpress_compose__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_compose__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_5__);

/**
 * WordPress dependencies
 */

/**
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-variations/
 */


/**
 * Internal dependencies
 */
// const GPV = 'gatherpress-venue';
// const GPV_CLASS_NAME   = 'gp-venue-v2'; // maybe better: 'gp-venue-portal-query'

/* 
registerBlockVariation( 'core/group', {
	name: GPV,
	title: __( 'Event venue', 'gatherpress' ) + ' (v2)',
	description: __( 'Displays the venue for an event.', 'gatherpress' ),
	category: 'gatherpress',
	icon: 'nametag',
	// isActive: [ 'namespace', 'className' ],
	// @source https://github.com/WordPress/gutenberg/issues/41303#issuecomment-1760985709 
	isActive: ({ className }) => {
		// console.log(className);
		return (
			className.includes(GPV_CLASS_NAME) // check if className contains GPV_CLASS_NAME and not equals. incase you add additional css classes it will still work
		);
	},
	// attributes: { className: GPV_CLASS_NAME, },
	attributes: {
		layout: {
			type: 'flex',
			orientation: 'nonsense'
		},
		className: GPV_CLASS_NAME
	},
	// allowedControls: [],
	scope: [ 'inserter', 'block' ], // Defaults to 'block' and 'inserter'.
	example: {},
	innerBlocks: [
		[ 'core/post-title' ],
	]

} );
 */

// import { getEntityRecord  } from '@wordpress/core-data';


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
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Venue Details (v2)', 'gatherpress'),
  description: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Queries information for a venue.', 'gatherpress'),
  category: 'gatherpress',
  icon: 'nametag',
  keywords: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('website', 'gatherpress'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('location', 'gatherpress'), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('city', 'gatherpress')],
  icon: 'nametag',
  // default: loop
  attributes: {
    query: {
      perPage: 1,
      pages: 1,
      offset: 0,
      postType: PT_VENUE,
      //		order:		"asc",
      //		orderBy:	"title",
      //		author: 	"",
      //      search: 	"",
      // exclude: [], // or pass multiple values in an array, e.g. [ 1, 9098 ]
      sticky: 'exclude',
      inherit: false,
      // taxQuery: {
      // 	[TAX_VENUE_SHADOW]: [],
      // },
      //		parents: 	[] // important to be empty, to make the filter work

      include: []
    },
    displayLayout: {
      type: 'flex',
      // list | flex
      columns: 1
    },
    // align:		"wide",
    className: GPV_CLASS_NAME // important for isActive callback fn
    // customClassName: false,
  },
  innerBlocks: [['core/post-template', {}, [['core/post-title']]]],
  // scope: [ 'inserter', 'block', 'transform' ],
  scope: ['inserter', 'transform'],
  // scope: [ 'inserter'],
  isActive: blockAttributes => GPV_CLASS_NAME === blockAttributes.className,
  usesContext: ['core/post-template/postId'],
  allowedControls: ['include']
};
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_1__.registerBlockVariation)('core/query', venuePortalQuery);
const venuePortalQueryEngine = (0,_wordpress_compose__WEBPACK_IMPORTED_MODULE_4__.createHigherOrderComponent)(BlockListBlock => {
  return props => {
    if ('core/query' !== props.name) {
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockListBlock, {
        ...props
      });
    }

    // if ( GPV_CLASS_NAME !== props.attributes.className ) {
    // 	return <BlockListBlock {...props} />;
    // }

    if (!props?.attributes?.className?.includes(GPV_CLASS_NAME)) {
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockListBlock, {
        ...props
      });
    }

    // console.log(props);

    // VARIANT 1 // run only one time
    if (0 !== props.attributes.query.include.length)
      // VARIANT 2 // run everytime and update previous block
      // if ( 1 !== props.attributes.query.taxQuery.length )
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockListBlock, {
        ...props
      });
    const currentPost = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.select)('core/editor').getCurrentPost();
    // console.log(currentPost);
    // go on if it's a 'gp_event' and if current post can have '_gp_venue' terms
    // otherwise exit
    if (PT_EVENT !== currentPost.type && !currentPost.TAX_VENUE_SHADOW) return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockListBlock, {
      ...props
    });

    // empty default,
    // like in the block-variation/template
    let shadowedVenues = [];
    if (PT_EVENT === currentPost.type) {
      shadowedVenues = [
      // currentPost._gp_venue,
      currentPost[[TAX_VENUE_SHADOW]]];
      // console.log(shadowedVenues);
    } else {
      /**
       * HOly holy holy
       *
       * @param {Function} select Current posts terms of production-shadow taxonomy.
       * @return  Array           List of term-IDs
       */
      shadowedVenues = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.useSelect)(() => {
        // const innerSelect = select('core/editor');
        // Rename the inner select variable to avoid the linting error
        // const _shadowedVenues =
        // 	innerSelect.getEditedPostAttribute(
        // 		TAX_VENUE_SHADOW
        // 	);
        // return _shadowedVenues;
        const {
          getEditedPostAttribute
        } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_2__.select)('core/editor');
        // const { getEditedPostAttribute } = innerSelect;
        return getEditedPostAttribute(TAX_VENUE_SHADOW);
      }, []);
    }

    // still using the defaults
    if (0 === shadowedVenues.length) return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockListBlock, {
      ...props
    });

    // Use Lodash's assign to gracefully handle if attributes are undefined
    // props.attributes.query = assign( props.attributes.query, {
    // assign(props.attributes.query, {
    // 	exclude: [currentPost.id],
    // 	taxQuery: {
    // 		[TAX_VENUE_SHADOW]: shadowedVenues,
    // 	},
    // });

    /* 			
    			let newAttrs;
    			newAttrs = {
    				...props.attributes,
    				query: {
    					...props.attributes.query,
    					include: shadowedVenues,
    				}
    			} */

    let newProps;
    newProps = {
      ...props,
      attributes: {
        ...props.attributes,
        query: {
          ...props.attributes.query,
          include: shadowedVenues
        }
      }
    };
    console.log(newProps, 'newProps');
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockListBlock, {
      ...newProps
    });
  };
}, 'venuePortalQueryEngine');
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_5__.addFilter)('editor.BlockListBlock', 'gatherpress/gp-venue-portal-query', venuePortalQueryEngine);
})();

/******/ })()
;
//# sourceMappingURL=variations.js.map