(()=>{"use strict";var e={20:(e,t,r)=>{var n=r(609),s=Symbol.for("react.element"),o=(Symbol.for("react.fragment"),Object.prototype.hasOwnProperty),a=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,l={key:!0,ref:!0,__self:!0,__source:!0};t.jsx=function(e,t,r){var n,i={},c=null,u=null;for(n in void 0!==r&&(c=""+r),void 0!==t.key&&(c=""+t.key),void 0!==t.ref&&(u=t.ref),t)o.call(t,n)&&!l.hasOwnProperty(n)&&(i[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps)void 0===i[n]&&(i[n]=t[n]);return{$$typeof:s,type:e,key:c,ref:u,props:i,_owner:a.current}}},848:(e,t,r)=>{e.exports=r(20)},609:e=>{e.exports=window.React}},t={};function r(n){var s=t[n];if(void 0!==s)return s.exports;var o=t[n]={exports:{}};return e[n](o,o.exports,r),o.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e=r(609);const t=window.wp.blocks,n=window.wp.i18n,s=window.wp.compose,o=window.wp.hooks,a=window.wp.plugins,l=window.wp.element,i=window.wp.primitives;var c=r(848);const u=(0,c.jsx)(i.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",children:(0,c.jsx)(i.Path,{d:"M12 9c-.8 0-1.5.7-1.5 1.5S11.2 12 12 12s1.5-.7 1.5-1.5S12.8 9 12 9zm0-5c-3.6 0-6.5 2.8-6.5 6.2 0 .8.3 1.8.9 3.1.5 1.1 1.2 2.3 2 3.6.7 1 3 3.8 3.2 3.9l.4.5.4-.5c.2-.2 2.6-2.9 3.2-3.9.8-1.2 1.5-2.5 2-3.6.6-1.3.9-2.3.9-3.1C18.5 6.8 15.6 4 12 4zm4.3 8.7c-.5 1-1.1 2.2-1.9 3.4-.5.7-1.7 2.2-2.4 3-.7-.8-1.9-2.3-2.4-3-.8-1.2-1.4-2.3-1.9-3.3-.6-1.4-.7-2.2-.7-2.5 0-2.6 2.2-4.7 5-4.7s5 2.1 5 4.7c0 .2-.1 1-.7 2.4z"})}),p=(0,l.createContext)({postId:0}),d=window.wp.components,m=window.wp.coreData,g=window.wp.data,h="gatherpress_event",v="gatherpress_venue",_="_gatherpress_venue",E="gp-venue-v3",y="core/group",w=window.wp.apiFetch;var f=r.n(w);function x(e=null){return"gatherpress_event"===(e||(0,g.select)("core/editor").getCurrentPostType())}function b(e=null){return e||(0,g.select)("core/editor").getCurrentPostId()}function S({title:t,onChangeTitle:r,address:s,onChangeAddress:o,hasEdits:a,lastError:l,isSaving:i,onCancel:c,onSave:u}){return(0,e.createElement)(e.Fragment,null,(0,e.createElement)("div",{className:"gatherpress-new-venue-form"},(0,e.createElement)(d.TextControl,{__next40pxDefaultSize:!0,__nextHasNoMarginBottom:!0,label:(0,n.__)("Venue title","gatherpress"),value:t,onChange:r}),(0,e.createElement)(d.TextControl,{__next40pxDefaultSize:!0,__nextHasNoMarginBottom:!0,label:(0,n.__)("Full Address","gatherpress"),value:s,onChange:o})),!!l&&(0,e.createElement)("div",{className:"form-error"},"Error: ",l.message),(0,e.createElement)(d.__experimentalHStack,{justify:"flex-start"},(0,e.createElement)(d.Button,{onClick:u,variant:"primary",disabled:!a||i},i?(0,e.createElement)(e.Fragment,null,(0,e.createElement)(d.Spinner,null),(0,n.__)("Saving","default")):(0,n.__)("Save","default")),(0,e.createElement)(d.Button,{onClick:c,variant:"tertiary",disabled:i},(0,n.__)("Back","default"))))}const C=function({search:t,...r}){const[n,s]=(0,l.useState)(t),[o,a]=(0,l.useState)(),{lastError:i,isSaving:c}=(0,g.useSelect)((e=>({lastError:e(m.store).getLastEntitySaveError("postType",v),isSaving:e(m.store).isSavingEntityRecord("postType",v)})),[]),u=b(r?.context?.postId),[p,E]=(0,m.useEntityProp)("postType",h,_,u),{goTo:y}=(0,d.__experimentalUseNavigator)(),w=()=>{y("/",{isBack:!0})},C=async(e,t)=>{try{return await f()({path:`/wp/v2/${v}s`,method:"POST",data:{title:e,status:"publish",meta:{gatherpress_venue_information:JSON.stringify({fullAddress:t})}}})}catch(e){throw console.error("Error creating post:",e),e}};return(0,e.createElement)(S,{title:null!=n?n:"",onChangeTitle:s,address:null!=o?o:"",onChangeAddress:a,hasEdits:!!n,onSave:async()=>{x()?await(async()=>{try{const e="_"+(await C(n,o)).slug;await(async(e,t)=>{try{const r=await f()({path:`/wp/v2/${_}?slug=${e}`});r.length>0&&t([r[0].id])}catch(e){console.error("Error fetching term:",e)}})(e,E)}catch(e){console.error("Error in the updateVenueTermOnEventPost process:",e)}})():await(async()=>{try{((e,t=null)=>{if(void 0!==t.setAttributes){const r={...t.attributes,selectedPostId:e,selectedPostType:v};t.setAttributes(r)}})((await C(n,o)).id,r)}catch(e){console.error("Error in the updateVenuePostOnBlockAttributes process:",e)}})(),w()},lastError:i,onCancel:w,isSaving:c})},P=window.wp.htmlEntities,T=(e,t)=>"taxonomy"===t?e.name:"postType"===t?e.title.rendered:"&hellip;loading";function k(e,t,r="taxonomy",n=_){const{venue:s,venues:o}=(0,g.useSelect)((s=>{const{getEntityRecord:o,getEntityRecords:a}=s(m.store),l={context:"view",per_page:10,search:e,orderby:"id",order:"desc"};return{venue:o(r,n,t),venues:a(r,n,l)}}),[e]);return{venueOptions:(0,l.useMemo)((()=>{const e=(null!=o?o:[]).map((e=>({value:e.id,label:(0,P.decodeEntities)(T(e,r))})));return e.findIndex((({value:e})=>s?.id===e))<0&&s?[{value:s.id,label:(0,P.decodeEntities)(T(s,r))},...e]:e}),[s,o])}}const I=({search:t,setSearch:r,...o})=>{const a=b(o?.context?.postId),[i,c]=(0,m.useEntityProp)("postType",h,_,a),u=i?.[0],{venueOptions:p}=k(t,u),g=(0,s.useDebounce)((e=>{r(e)}),300),v=(0,l.useCallback)((e=>{const t=Number.isFinite(e)?[e]:[];c(t)}),[c]);return(0,e.createElement)(e.Fragment,null,(0,e.createElement)(d.ComboboxControl,{label:(0,n.__)("Choose a venue","gatherpress"),__next40pxDefaultSize:!0,onChange:v,onFilterValueChange:g,options:p,value:i?.[0]||"loading"}))},O=({search:t,setSearch:r,...o})=>{const a=o?.attributes?.selectedPostId,{venueOptions:i}=k(t,a,"postType",v),c=(0,l.useCallback)((e=>{const t={...o.attributes,selectedPostId:e,selectedPostType:v};o.setAttributes(t)}),[o]),u=(0,s.useDebounce)((e=>{r(e)}),300);return(0,e.createElement)(e.Fragment,null,(0,e.createElement)(d.ComboboxControl,{label:(0,n.__)("Choose a venue","gatherpress"),__next40pxDefaultSize:!0,onChange:c,onFilterValueChange:u,options:i,value:o?.attributes?.selectedPostId||"loading"}))},F=({search:t,setSearch:r,...n})=>{const s=x(n?.context?.postType);return(0,e.createElement)(e.Fragment,null,s&&(0,e.createElement)(I,{...n,search:t,setSearch:r}),!s&&(0,e.createElement)(O,{...n,search:t,setSearch:r}))};function N(t=null){const r=(0,g.useSelect)((e=>{const{getPostType:t}=e(m.store);return t(v)?.labels?.add_new_item}),[]),n=(0,g.useSelect)((e=>e(m.store).canUser("create",v+"s")),[]),[s,o]=(0,l.useState)("");return(0,e.createElement)(d.__experimentalNavigatorProvider,{initialPath:"/",style:{width:"100%"}},(0,e.createElement)(d.__experimentalNavigatorScreen,{path:"/",style:{padding:".1em"}},(0,e.createElement)(F,{...t,search:s,setSearch:o}),n&&(0,e.createElement)(d.__experimentalNavigatorButton,{path:"/new",variant:"tertiary",text:r})),(0,e.createElement)(d.__experimentalNavigatorScreen,{path:"/new",style:{padding:".1em"}},(0,e.createElement)(C,{...t,search:s})))}const B=window.wp.blockEditor;function R(e){const{venuePost:t}=(0,g.useSelect)((t=>{if(null===e)return[];const r=t("core").getEntityRecord("taxonomy","_gatherpress_venue",e),n=r?.slug.replace(/^_/,"");return{venuePost:t("core").getEntityRecords("postType","gatherpress_venue",{per_page:1,slug:n})}}),[e]);return t}const A=(0,s.createHigherOrderComponent)((t=>r=>{if(r.name!==y)return(0,e.createElement)(t,{...r});if(!r?.attributes?.className?.includes(E))return(0,e.createElement)(t,{...r});const s=b(r?.context?.postId),[o,a]=(0,m.useEntityProp)("postType",h,_,s),{isSelected:l}=r,i=Number.isFinite(r?.context?.queryId),c=x(r?.context?.postType),u=function(e){const{termId:t}=(0,g.useSelect)((t=>{const r=t("core").getEntityRecord("postType","gatherpress_event",e);return{termId:r&&r._gatherpress_venue.length>=1?r?._gatherpress_venue?.[0]:null}}),[e]);return R(t)}(s),v=!i&&o instanceof Array,w=R(o&&o.length>=1&&Number.isFinite(o[0])?o[0]:null);let f=v?w:c?u:null,S=f&&f.length>=1&&Number.isFinite(f[0].id)?f[0].id:r?.attributes?.selectedPostId;return(0,e.createElement)(e.Fragment,null,S&&(0,e.createElement)(p.Provider,{value:S},(0,e.createElement)(t,{...r})),!S&&(0,e.createElement)("p",null,(0,e.createElement)("em",null,"What to show, when (1) no venues or (2) an online-event is selected?"),(0,e.createElement)("br",null)," (At least, add a placeholder here to provide help)."),!i&&l&&(0,e.createElement)(B.InspectorControls,null,(0,e.createElement)(d.PanelBody,{title:(0,n.__)("Venue settings","gatherpress"),initialOpen:!0},(0,e.createElement)(d.PanelRow,null,(0,e.createElement)(N,{...r})))))}),"venueEdit"),D={name:E,title:(0,n.__)("Venue Details (v3)","gatherpress"),description:(0,n.__)("Queries information for a venue.","gatherpress"),category:"gatherpress",icon:function(t){const r="string"==typeof t?20:24,s=(0,n.sprintf)("-$%dpx",r/4);return(0,e.createElement)(d.__experimentalZStack,{offset:15,isLayered:!0},(0,e.createElement)((()=>(0,e.createElement)(d.Icon,{icon:t})),null),(0,e.createElement)("div",{style:{color:"var(--wp-components-color-accent,var(--wp-admin-theme-color,#3858e9))",marginTop:s,marginRight:s}},(0,e.createElement)((()=>(0,e.createElement)(d.Icon,{icon:"nametag",size:12})),null)))}(u),keywords:[(0,n.__)("website","gatherpress"),(0,n.__)("location","gatherpress"),(0,n.__)("city","gatherpress")],scope:["inserter","block"],attributes:{className:E,layout:{type:"flex",orientation:"nonsense"}},isActive:(e,t)=>e?.className.includes(E),innerBlocks:[["core/pattern",{slug:"gatherpress/venue-details"}]]};(0,t.registerBlockVariation)(y,D),(0,o.addFilter)("blocks.registerBlockType","gatherpress-venue/extend-group-block",(function(e,t){return t!==y?e:(-1===e.usesContext.indexOf("queryId")&&e.usesContext.push("queryId"),-1===e.usesContext.indexOf("postId")&&e.usesContext.push("postId"),-1===e.usesContext.indexOf("postType")&&e.usesContext.push("postType"),{...e,attributes:{...e.attributes,selectedPostId:{type:"integer"},selectedPostType:{type:"string"}},supports:{...e.supports,className:!1}})}));const V=(0,s.createHigherOrderComponent)((t=>r=>{const n=(0,l.useContext)(p),s=Number.isFinite(n),o={...r,context:{...r.context,postId:n,postType:v}};return(0,e.createElement)(e.Fragment,null,s&&(0,e.createElement)(t,{...o}),!s&&(0,e.createElement)(t,{...r}))}));(0,o.addFilter)("editor.BlockEdit","gatherpress-venue/child-block-context-provider",V),(0,o.addFilter)("editor.BlockEdit","gatherpress-venue/group-block-variation",A,1),(0,a.registerPlugin)("venue-block-slot-fill",{render:function(){return(0,e.createElement)(e.Fragment,null,(0,e.createElement)(d.Fill,{name:"EventPluginDocumentSettings"},(0,e.createElement)(N,null)))}})})()})();