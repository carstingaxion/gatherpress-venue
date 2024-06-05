(()=>{"use strict";const e=window.React,t=window.wp.blocks,n=window.wp.i18n,r=window.wp.compose,s=window.wp.hooks,o=window.wp.plugins,l=window.wp.element,a=window.wp.data;function i(e=null){return e||(0,a.select)("core/editor").getCurrentPostId()}const u=(0,l.createContext)({postId:0}),c=window.wp.components,p=window.wp.coreData;function d(e=null){return"gatherpress_event"===(e||(0,a.select)("core/editor").getCurrentPostType())}const g="gatherpress_event",m="gatherpress_venue",h="_gatherpress_venue",v="gp-venue-v3",_="core/group",E=(t=null)=>{const[s,o]=(0,l.useState)(""),a=i(t?.context?.postId),[u,d]=(0,p.useEntityProp)("postType",g,h,a),{isResolvingTerms:m,records:v}=(0,p.useEntityRecords)("taxonomy",h,{context:"view",per_page:10,search:s}),_=(0,r.useDebounce)((e=>{o(e)}),300),E=(0,l.useCallback)((e=>{const t=Number.isFinite(e)?[e]:[];d(t)}),[d]);return(0,e.createElement)(e.Fragment,null,(0,e.createElement)(c.ComboboxControl,{label:(0,n.__)("Choose a venue","gatherpress"),__next40pxDefaultSize:!0,onChange:E,onFilterValueChange:_,options:(()=>{const e=(0,l.useMemo)((()=>v?.map((e=>({label:"TERM "+e?.name,value:e?.id})))||[]),[v]);return m?[{label:(0,n.__)("Loading&hellip;","gatherpress"),value:"loading"}]:e})(),value:u?.[0]||"loading"}))},w=window.wp.blockEditor,b=t=>{const[s,o]=(0,l.useState)(""),{isResolvingPosts:a,records:i}=(0,p.useEntityRecords)("postType",m,{context:"view",per_page:10,search:s}),u=(0,l.useCallback)((e=>{const n={...t.attributes,selectedPostId:e,selectedPostType:m};t.setAttributes(n)}),[t]),d=(0,r.useDebounce)((e=>{o(e)}),300);return(0,e.createElement)(e.Fragment,null,(0,e.createElement)(c.ComboboxControl,{label:(0,n.__)("Choose a venue","gatherpress"),__next40pxDefaultSize:!0,onChange:u,onFilterValueChange:d,options:(()=>{const e=(0,l.useMemo)((()=>i?.map((e=>({label:"POST "+e?.title.rendered,value:e?.id})))||[]),[i]);return a?[{label:(0,n.__)("Loading&hellip;","gatherpress"),value:"loading"}]:e})(),value:t?.attributes?.selectedPostId||"loading"}))};function y(e){const{venuePost:t}=(0,a.useSelect)((t=>{if(null===e)return[];const n=t("core").getEntityRecord("taxonomy","_gatherpress_venue",e),r=n?.slug.replace(/^_/,"");return{venuePost:t("core").getEntityRecords("postType","gatherpress_venue",{per_page:1,slug:r})}}),[e]);return t}const x=(t=null)=>{const n=d(t?.context?.postType);return(0,e.createElement)(e.Fragment,null,n&&(0,e.createElement)(E,{...t}),!n&&(0,e.createElement)(b,{...t}))},C=(0,r.createHigherOrderComponent)((t=>r=>{if(r.name!==_)return(0,e.createElement)(t,{...r});if(!r?.attributes?.className?.includes(v))return(0,e.createElement)(t,{...r});const s=i(r?.context?.postId),[o,l]=(0,p.useEntityProp)("postType",g,h,s),{isSelected:m}=r,E=Number.isFinite(r?.context?.queryId),b=d(r?.context?.postType),C=function(e){const{termId:t}=(0,a.useSelect)((t=>{const n=t("core").getEntityRecord("postType","gatherpress_event",e);return{termId:n&&n._gatherpress_venue.length>=1?n?._gatherpress_venue?.[0]:null}}),[e]);return y(t)}(s),P=!E&&o instanceof Array,f=y(o&&o.length>=1&&Number.isFinite(o[0])?o[0]:null);let F=P?f:b?C:null,k=F&&F.length>=1&&Number.isFinite(F[0].id)?F[0].id:r?.attributes?.selectedPostId;return(0,e.createElement)(e.Fragment,null,k&&(0,e.createElement)(u.Provider,{value:k},(0,e.createElement)(t,{...r})),!k&&(0,e.createElement)("p",null,(0,e.createElement)("em",null,"What to show, when (1) no venues or (2) an online-event is selected?"),(0,e.createElement)("br",null)," (At least, add a placeholder here to provide help)."),!E&&m&&(0,e.createElement)(w.InspectorControls,null,(0,e.createElement)(c.PanelBody,{title:(0,n.__)("Venue settings","gatherpress"),initialOpen:!0},(0,e.createElement)(c.PanelRow,null,(0,e.createElement)(x,{...r})))))}),"venueEdit"),P={name:v,title:(0,n.__)("Venue Details (v3)","gatherpress"),description:(0,n.__)("Queries information for a venue.","gatherpress"),category:"gatherpress",icon:"nametag",keywords:[(0,n.__)("website","gatherpress"),(0,n.__)("location","gatherpress"),(0,n.__)("city","gatherpress")],scope:["inserter","block"],attributes:{className:v,layout:{type:"flex",orientation:"nonsense"}},isActive:(e,t)=>e?.className.includes(v),innerBlocks:[["core/pattern",{slug:"gatherpress/venue-details"}]]};(0,t.registerBlockVariation)(_,P),(0,s.addFilter)("blocks.registerBlockType","gatherpress-venue/extend-group-block",(function(e,t){return t!==_?e:(-1===e.usesContext.indexOf("queryId")&&e.usesContext.push("queryId"),-1===e.usesContext.indexOf("postId")&&e.usesContext.push("postId"),-1===e.usesContext.indexOf("postType")&&e.usesContext.push("postType"),{...e,attributes:{...e.attributes,selectedPostId:{type:"integer"},selectedPostType:{type:"string"}},supports:{...e.supports,className:!1}})}));const f=(0,r.createHigherOrderComponent)((t=>n=>{const r=(0,l.useContext)(u),s=Number.isFinite(r),o={...n,context:{...n.context,postId:r,postType:m}};return(0,e.createElement)(e.Fragment,null,s&&(0,e.createElement)(t,{...o}),!s&&(0,e.createElement)(t,{...n}))}));(0,s.addFilter)("editor.BlockEdit","gatherpress-venue/child-block-context-provider",f),(0,s.addFilter)("editor.BlockEdit","gatherpress-venue/group-block-variation",C,1),(0,o.registerPlugin)("venue-block-slot-fill",{render:function(){return(0,e.createElement)(e.Fragment,null,(0,e.createElement)(c.Fill,{name:"VenuePluginDocumentSettings"},(0,e.createElement)("p",null,'THE "VenueBlockPluginFill" in VenuePluginDocumentSettings')),(0,e.createElement)(c.Fill,{name:"VenuePluginDocumentSettings"},(0,e.createElement)(E,null)))}})})();