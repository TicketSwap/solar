"use strict";(self.webpackChunk_ticketswap_solar=self.webpackChunk_ticketswap_solar||[]).push([[6325],{"./src/components/Alert/index.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Basic:()=>Basic,Error:()=>Error,Success:()=>Success,Warning:()=>Warning,WithAction:()=>WithAction,WithTitleAndAction:()=>WithTitleAndAction,__namedExportsOrder:()=>__namedExportsOrder,default:()=>index_stories});__webpack_require__("./node_modules/react/index.js");var emotion_styled_base_browser_esm=__webpack_require__("./node_modules/@emotion/styled/base/dist/emotion-styled-base.browser.esm.js"),emotion_react_browser_esm=__webpack_require__("./node_modules/@emotion/react/dist/emotion-react.browser.esm.js"),theme=__webpack_require__("./src/theme/index.ts"),CheckmarkRounded=__webpack_require__("./src/icons/CheckmarkRounded.tsx"),CloseRounded=__webpack_require__("./src/icons/CloseRounded.tsx"),WarningRounded=__webpack_require__("./src/icons/WarningRounded.tsx"),InfoRounded=__webpack_require__("./src/icons/InfoRounded.tsx"),Heading=__webpack_require__("./src/components/Heading/index.tsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");let AlertVariant=function(AlertVariant){return AlertVariant.info="info",AlertVariant.success="success",AlertVariant.error="error",AlertVariant.warning="warning",AlertVariant}({});const textColor=props=>(0,emotion_react_browser_esm.iv)("color:",props.variant===AlertVariant.success?theme.$_.success:props.variant===AlertVariant.error?theme.$_.failure:props.variant===AlertVariant.warning?theme.$_.warning:theme.$_.info,";",""),Container=(0,emotion_styled_base_browser_esm.Z)("div",{target:"e17kjwee5"})("background-color:",(props=>props.variant===AlertVariant.success?theme.$_.successBackground:props.variant===AlertVariant.error?theme.$_.failureBackground:props.variant===AlertVariant.warning?theme.$_.warningBackground:theme.$_.infoBackground),";border-radius:",theme.q0.md,";min-block-size:",theme.Dh[44],";display:flex;align-items:flex-start;@media ",theme.Uh.tablet,"{min-block-size:",theme.Dh[56],";}a{",textColor,";}"),Adornment=(0,emotion_styled_base_browser_esm.Z)("span",{target:"e17kjwee4"})(textColor,";inline-size:",theme.Dh[44],";block-size:",theme.Dh[44],";display:flex;justify-content:center;align-items:center;flex-shrink:0;@media ",theme.Uh.tablet,"{inline-size:",theme.Dh[56],";block-size:",theme.Dh[56],";}"),Main=(0,emotion_styled_base_browser_esm.Z)("div",{target:"e17kjwee3"})("flex-basis:100%;padding-block:",11/16,"rem ",.625,"rem;padding-inline:0 ",.625,"rem;@media ",theme.Uh.tablet,"{padding-block:",15/16,"rem ",.875,"rem;padding-inline:0 ",.875,"rem;}"),Title=(0,emotion_styled_base_browser_esm.Z)(Heading.H4,{target:"e17kjwee2"})("line-height:",theme.Nv.title,";font-weight:",theme.Ue.semiBold,";margin-block-end:",6/16,"rem;@media ",theme.Uh.tablet,"{line-height:1.4;}"),Message=(0,emotion_styled_base_browser_esm.Z)("p",{target:"e17kjwee1"})("color:",theme.$_.foreground,";margin-block:0;margin-inline:0;"),Action=(0,emotion_styled_base_browser_esm.Z)("button",{target:"e17kjwee0"})(textColor,";outline:0;font-weight:",theme.Ue.semiBold,";flex-shrink:0;transition:color ",theme.eR,";margin-block-start:",6/16,"rem;@media ",theme.Uh.tablet,"{margin-block-start:",6/16,"rem;}&:focus{box-shadow:none;}&:hover,&:focus{text-decoration:underline;}"),Alert=({title,action,children,variant=AlertVariant.info,...props})=>(0,jsx_runtime.jsxs)(Container,{variant,...props,children:[(0,jsx_runtime.jsx)(Adornment,{variant,children:variant===AlertVariant.success?(0,jsx_runtime.jsx)(CheckmarkRounded.T,{size:24}):variant===AlertVariant.error?(0,jsx_runtime.jsx)(CloseRounded.Q,{size:24}):variant===AlertVariant.warning?(0,jsx_runtime.jsx)(WarningRounded.i,{size:24}):(0,jsx_runtime.jsx)(InfoRounded.m,{size:24})}),(0,jsx_runtime.jsxs)(Main,{children:[title&&(0,jsx_runtime.jsx)(Title,{as:"h4",children:title}),(0,jsx_runtime.jsx)(Message,{children}),action&&(0,jsx_runtime.jsx)(Action,{variant,onClick:event=>action.onClick(event),type:"button",children:action.label})]})]});Alert.displayName="Alert";const Basic=()=>(0,jsx_runtime.jsxs)(Alert,{children:[(0,jsx_runtime.jsx)("a",{href:"https://example.com",children:"PayPal"})," is not activated yet."]});Basic.displayName="Basic";const WithTitleAndAction=()=>(0,jsx_runtime.jsx)(Alert,{title:"Friendly reminder",action:{label:"Activate PayPal",onClick:()=>console.log("action default clicked")},children:"We’ve noticed that your PayPal is not activated yet."});WithTitleAndAction.displayName="WithTitleAndAction",WithTitleAndAction.storyName="With title and action";const WithAction=()=>(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)(Alert,{action:{label:"Continue creating",onClick:()=>console.log("action default clicked")},children:"Last time you didn’t finish your listing. You can continue below or create a new listing."}),(0,jsx_runtime.jsx)("br",{}),(0,jsx_runtime.jsx)(Alert,{variant:AlertVariant.success,action:{label:"Start sharing",onClick:()=>console.log("action success clicked")},children:"Your listing is published! You can share it on social media to increase the change of selling the ticket."}),(0,jsx_runtime.jsx)("br",{}),(0,jsx_runtime.jsx)(Alert,{variant:AlertVariant.error,action:{label:"Continue creating",onClick:()=>console.log("action error clicked")},children:"Your phone number seems to be invalid. To continue you need to verify it again."}),(0,jsx_runtime.jsx)("br",{}),(0,jsx_runtime.jsx)(Alert,{variant:AlertVariant.warning,action:{label:"Tips and tricks",onClick:()=>console.log("action warning clicked")},children:"Be aware that this is a hugely popular event, which means that lots of people are looking for tickets and the demand is very high. We put together some crucial tips and tricks on how to be first when tickets become available. Good luck! We’re pulling for you!"})]});WithAction.storyName="With action";const Success=()=>(0,jsx_runtime.jsxs)(Alert,{variant:AlertVariant.success,action:{label:"View",onClick:()=>console.log("action clicked")},children:["Wanted ",(0,jsx_runtime.jsx)("a",{href:"https://example.com",children:"listing"})," created!"]});Success.displayName="Success";const Error=()=>(0,jsx_runtime.jsxs)(Alert,{variant:AlertVariant.error,action:{label:"Fix",onClick:()=>console.log("action clicked")},children:["There’s a currency ",(0,jsx_runtime.jsx)("a",{href:"https://example.com",children:"mismatch"})]});Error.displayName="Error";const Warning=()=>(0,jsx_runtime.jsxs)(Alert,{variant:AlertVariant.warning,action:{label:"Turn on",onClick:()=>console.log("action clicked")},children:[(0,jsx_runtime.jsx)("a",{href:"https://example.com",children:"Notifications"})," are disabled"]});Warning.displayName="Warning";const index_stories={title:"Components/Feedback/Alert"};Basic.parameters={...Basic.parameters,docs:{...Basic.parameters?.docs,source:{originalSource:'() => <Alert>\n    <a href="https://example.com">PayPal</a> is not activated yet.\n  </Alert>',...Basic.parameters?.docs?.source}}},WithTitleAndAction.parameters={...WithTitleAndAction.parameters,docs:{...WithTitleAndAction.parameters?.docs,source:{originalSource:"() => <Alert title=\"Friendly reminder\" action={{\n  label: 'Activate PayPal',\n  onClick: () => console.log('action default clicked')\n}}>\n    We’ve noticed that your PayPal is not activated yet.\n  </Alert>",...WithTitleAndAction.parameters?.docs?.source}}},WithAction.parameters={...WithAction.parameters,docs:{...WithAction.parameters?.docs,source:{originalSource:"() => <>\n    <Alert action={{\n    label: 'Continue creating',\n    onClick: () => console.log('action default clicked')\n  }}>\n      Last time you didn’t finish your listing. You can continue below or create\n      a new listing.\n    </Alert>\n    <br />\n    <Alert variant={AlertVariant.success} action={{\n    label: 'Start sharing',\n    onClick: () => console.log('action success clicked')\n  }}>\n      Your listing is published! You can share it on social media to increase\n      the change of selling the ticket.\n    </Alert>\n    <br />\n    <Alert variant={AlertVariant.error} action={{\n    label: 'Continue creating',\n    onClick: () => console.log('action error clicked')\n  }}>\n      Your phone number seems to be invalid. To continue you need to verify it\n      again.\n    </Alert>\n    <br />\n    <Alert variant={AlertVariant.warning} action={{\n    label: 'Tips and tricks',\n    onClick: () => console.log('action warning clicked')\n  }}>\n      Be aware that this is a hugely popular event, which means that lots of\n      people are looking for tickets and the demand is very high. We put\n      together some crucial tips and tricks on how to be first when tickets\n      become available. Good luck! We’re pulling for you!\n    </Alert>\n  </>",...WithAction.parameters?.docs?.source}}},Success.parameters={...Success.parameters,docs:{...Success.parameters?.docs,source:{originalSource:"() => <Alert variant={AlertVariant.success} action={{\n  label: 'View',\n  onClick: () => console.log('action clicked')\n}}>\n    Wanted <a href=\"https://example.com\">listing</a> created!\n  </Alert>",...Success.parameters?.docs?.source}}},Error.parameters={...Error.parameters,docs:{...Error.parameters?.docs,source:{originalSource:"() => <Alert variant={AlertVariant.error} action={{\n  label: 'Fix',\n  onClick: () => console.log('action clicked')\n}}>\n    There’s a currency <a href=\"https://example.com\">mismatch</a>\n  </Alert>",...Error.parameters?.docs?.source}}},Warning.parameters={...Warning.parameters,docs:{...Warning.parameters?.docs,source:{originalSource:"() => <Alert variant={AlertVariant.warning} action={{\n  label: 'Turn on',\n  onClick: () => console.log('action clicked')\n}}>\n    <a href=\"https://example.com\">Notifications</a> are disabled\n  </Alert>",...Warning.parameters?.docs?.source}}};const __namedExportsOrder=["Basic","WithTitleAndAction","WithAction","Success","Error","Warning"]},"./src/components/Heading/index.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{H1:()=>H1,H2:()=>H2,H3:()=>H3,H4:()=>H4,H5:()=>H5,H6:()=>H6});var _emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@emotion/styled/base/dist/emotion-styled-base.browser.esm.js"),_theme__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./src/theme/index.ts");const H1=(0,_emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__.Z)("h1",{target:"eloqthd5"})("font-weight:",_theme__WEBPACK_IMPORTED_MODULE_1__.Ue.bold,";font-size:",_theme__WEBPACK_IMPORTED_MODULE_1__.JB[32],";line-height:",_theme__WEBPACK_IMPORTED_MODULE_1__.Nv.title,";text-wrap:balance;@media ",_theme__WEBPACK_IMPORTED_MODULE_1__.Uh.tablet,"{font-size:",_theme__WEBPACK_IMPORTED_MODULE_1__.JB[56],";line-height:",_theme__WEBPACK_IMPORTED_MODULE_1__.Nv.titleLg,";}"),H2=(0,_emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__.Z)("h2",{target:"eloqthd4"})("font-weight:",_theme__WEBPACK_IMPORTED_MODULE_1__.Ue.bold,";font-size:",_theme__WEBPACK_IMPORTED_MODULE_1__.JB[24],";line-height:",_theme__WEBPACK_IMPORTED_MODULE_1__.Nv.title,";text-wrap:balance;@media ",_theme__WEBPACK_IMPORTED_MODULE_1__.Uh.tablet,"{font-size:",_theme__WEBPACK_IMPORTED_MODULE_1__.JB[32],";}"),H3=(0,_emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__.Z)("h3",{target:"eloqthd3"})("font-weight:",_theme__WEBPACK_IMPORTED_MODULE_1__.Ue.regular,";font-size:",_theme__WEBPACK_IMPORTED_MODULE_1__.JB[20],";line-height:",_theme__WEBPACK_IMPORTED_MODULE_1__.Nv.title,";@media ",_theme__WEBPACK_IMPORTED_MODULE_1__.Uh.tablet,"{font-size:",_theme__WEBPACK_IMPORTED_MODULE_1__.JB[24],";}"),H4=(0,_emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__.Z)("h4",{target:"eloqthd2"})("font-weight:",_theme__WEBPACK_IMPORTED_MODULE_1__.Ue.regular,";font-size:",_theme__WEBPACK_IMPORTED_MODULE_1__.JB[18],";line-height:",_theme__WEBPACK_IMPORTED_MODULE_1__.Nv.copy,";@media ",_theme__WEBPACK_IMPORTED_MODULE_1__.Uh.tablet,"{font-size:",_theme__WEBPACK_IMPORTED_MODULE_1__.JB[20],";}"),H5=(0,_emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__.Z)("h5",{target:"eloqthd1"})("font-weight:",_theme__WEBPACK_IMPORTED_MODULE_1__.Ue.regular,";font-size:",_theme__WEBPACK_IMPORTED_MODULE_1__.JB[14],";@media ",_theme__WEBPACK_IMPORTED_MODULE_1__.Uh.tablet,"{font-size:",_theme__WEBPACK_IMPORTED_MODULE_1__.JB[16],";}"),H6=(0,_emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__.Z)("h6",{target:"eloqthd0"})("font-weight:",_theme__WEBPACK_IMPORTED_MODULE_1__.Ue.semiBold,";font-size:",_theme__WEBPACK_IMPORTED_MODULE_1__.JB[12],";text-transform:uppercase;letter-spacing:0.0375rem;color:",_theme__WEBPACK_IMPORTED_MODULE_1__.$_.foregroundSubtle,";@media ",_theme__WEBPACK_IMPORTED_MODULE_1__.Uh.tablet,"{font-size:",_theme__WEBPACK_IMPORTED_MODULE_1__.JB[12],";}")},"./src/icons/CheckmarkRounded.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{T:()=>CheckmarkRounded});__webpack_require__("./node_modules/react/index.js");var _SvgWrapper__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/icons/SvgWrapper.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const CheckmarkRounded=props=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_SvgWrapper__WEBPACK_IMPORTED_MODULE_2__.t,{a11yTitle:"CheckmarkRounded",...props,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path",{d:"M16 2c4.952 0 9.904 2.655 12.577 7.964a13.508 13.508 0 010 12.072C25.904 27.345 20.952 30 16 30s-9.903-2.654-12.576-7.963a13.51 13.51 0 010-12.073C6.097 4.654 11.048 2 16 2zm-4.67 13.649a2 2 0 10-2.66 2.988l4.334 3.857a2 2 0 002.852-.197l7.666-9a2 2 0 00-3.044-2.594l-6.342 7.444-2.806-2.498z"})});CheckmarkRounded.displayName="CheckmarkRounded"},"./src/icons/CloseRounded.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Q:()=>CloseRounded});__webpack_require__("./node_modules/react/index.js");var _SvgWrapper__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/icons/SvgWrapper.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const CloseRounded=props=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_SvgWrapper__WEBPACK_IMPORTED_MODULE_2__.t,{a11yTitle:"CloseRounded",...props,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path",{d:"M22.361 19.586a2.011 2.011 0 0 1 0 2.828 1.967 1.967 0 0 1-2.804 0L16 18.828l-3.556 3.586a1.967 1.967 0 0 1-2.805 0 2.011 2.011 0 0 1 0-2.828L13.196 16l-3.557-3.586a2.011 2.011 0 0 1 0-2.828 1.972 1.972 0 0 1 2.805 0L16 13.172l3.557-3.586a1.972 1.972 0 0 1 2.804 0 2.011 2.011 0 0 1 0 2.828L18.805 16l3.556 3.586zm6.216-9.622C25.904 4.654 20.952 2 16 2S6.097 4.655 3.424 9.964a13.51 13.51 0 0 0 0 12.073C6.097 27.346 11.048 30 16 30c4.952 0 9.904-2.655 12.577-7.964a13.508 13.508 0 0 0 0-12.072z"})});CloseRounded.displayName="CloseRounded"},"./src/icons/InfoRounded.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{m:()=>InfoRounded});__webpack_require__("./node_modules/react/index.js");var _SvgWrapper__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/icons/SvgWrapper.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const InfoRounded=props=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_SvgWrapper__WEBPACK_IMPORTED_MODULE_2__.t,{a11yTitle:"InfoRounded",...props,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path",{d:"M18 16a2 2 0 1 0-4 0v6a2 2 0 1 0 4 0v-6zm-2-8a2 2 0 1 0-.001 3.999A2 2 0 0 0 16 8zm0 22C8.28 30 2 23.72 2 16S8.28 2 16 2s14 6.28 14 14-6.28 14-14 14z"})});InfoRounded.displayName="InfoRounded"},"./src/icons/SvgWrapper.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{t:()=>SvgWrapper});var _emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@emotion/styled/base/dist/emotion-styled-base.browser.esm.js"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=(__webpack_require__("./node_modules/react/index.js"),__webpack_require__("./node_modules/react/jsx-runtime.js"));const Wrapper=(0,_emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__.Z)("span",{target:"e1ouvt3m1"})("display:inline-grid;place-items:center;vertical-align:middle;inline-size:",(props=>`${props.iconSize||32}px`),";block-size:",(props=>`${props.iconSize||32}px`),";min-inline-size:",(props=>`${props.iconSize||32}px`),";min-block-size:",(props=>`${props.iconSize||32}px`),";color:",(({color})=>color?`${color} !important`:"inherit"),";"),InlineSvg=(0,_emotion_styled_base__WEBPACK_IMPORTED_MODULE_0__.Z)("svg",{target:"e1ouvt3m0"})({name:"1nanc4n",styles:"color:inherit;fill:currentColor"}),SvgWrapper=({size=32,children,a11yTitle,color,...props})=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(Wrapper,{iconSize:size,className:"icon",color,...props,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(InlineSvg,{"aria-label":a11yTitle,fillRule:"evenodd",clipRule:"evenodd",strokeLinejoin:"round",strokeMiterlimit:"1.414",xmlns:"http://www.w3.org/2000/svg",role:"presentation",focusable:"false",viewBox:"0 0 32 32",preserveAspectRatio:"xMidYMid meet",children})});SvgWrapper.displayName="SvgWrapper"},"./src/icons/WarningRounded.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{i:()=>WarningRounded});__webpack_require__("./node_modules/react/index.js");var _SvgWrapper__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./src/icons/SvgWrapper.tsx"),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/react/jsx-runtime.js");const WarningRounded=props=>(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_SvgWrapper__WEBPACK_IMPORTED_MODULE_2__.t,{a11yTitle:"WarningRounded",...props,children:(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path",{d:"M18 16a2 2 0 1 1-4 0v-6a2 2 0 1 1 4 0v6zm-2 8a2 2 0 1 1-.001-3.999A2 2 0 0 1 16 24zm0-22C8.28 2 2 8.28 2 16s6.28 14 14 14 14-6.28 14-14S23.72 2 16 2z"})});WarningRounded.displayName="WarningRounded"}}]);