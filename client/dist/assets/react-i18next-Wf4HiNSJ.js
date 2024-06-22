import{r as d}from"./react-3WVvLOaR.js";function F(){if(console&&console.warn){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];typeof e[0]=="string"&&(e[0]=`react-i18next:: ${e[0]}`),console.warn(...e)}}const T={};function x(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];typeof e[0]=="string"&&T[e[0]]||(typeof e[0]=="string"&&(T[e[0]]=new Date),F(...e))}const v=(t,e)=>()=>{if(t.isInitialized)e();else{const n=()=>{setTimeout(()=>{t.off("initialized",n)},0),e()};t.on("initialized",n)}};function L(t,e,n){t.loadNamespaces(e,v(t,n))}function E(t,e,n,o){typeof n=="string"&&(n=[n]),n.forEach(i=>{t.options.ns.indexOf(i)<0&&t.options.ns.push(i)}),t.loadLanguages(e,v(t,o))}function k(t,e){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};const o=e.languages[0],i=e.options?e.options.fallbackLng:!1,s=e.languages[e.languages.length-1];if(o.toLowerCase()==="cimode")return!0;const c=(y,m)=>{const a=e.services.backendConnector.state[`${y}|${m}`];return a===-1||a===2};return n.bindI18n&&n.bindI18n.indexOf("languageChanging")>-1&&e.services.backendConnector.backend&&e.isLanguageChangingTo&&!c(e.isLanguageChangingTo,t)?!1:!!(e.hasResourceBundle(o,t)||!e.services.backendConnector.backend||e.options.resources&&!e.options.partialBundledLanguages||c(o,t)&&(!i||c(s,t)))}function H(t,e){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};return!e.languages||!e.languages.length?(x("i18n.languages were undefined or empty",e.languages),!0):e.options.ignoreJSONStructure!==void 0?e.hasLoadedNamespace(t,{lng:n.lng,precheck:(i,s)=>{if(n.bindI18n&&n.bindI18n.indexOf("languageChanging")>-1&&i.services.backendConnector.backend&&i.isLanguageChangingTo&&!s(i.isLanguageChangingTo,t))return!1}}):k(t,e,n)}const $=/&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g,j={"&amp;":"&","&#38;":"&","&lt;":"<","&#60;":"<","&gt;":">","&#62;":">","&apos;":"'","&#39;":"'","&quot;":'"',"&#34;":'"',"&nbsp;":" ","&#160;":" ","&copy;":"©","&#169;":"©","&reg;":"®","&#174;":"®","&hellip;":"…","&#8230;":"…","&#x2F;":"/","&#47;":"/"},A=t=>j[t],B=t=>t.replace($,A);let M={bindI18n:"languageChanged",bindI18nStore:"",transEmptyNodeValue:"",transSupportBasicHtmlNodes:!0,transWrapTextNodes:"",transKeepBasicHtmlNodesFor:["br","strong","i","p"],useSuspense:!0,unescape:B};function O(){return M}let P;function U(){return P}const q=d.createContext();class J{constructor(){this.usedNamespaces={}}addUsedNamespaces(e){e.forEach(n=>{this.usedNamespaces[n]||(this.usedNamespaces[n]=!0)})}getUsedNamespaces(){return Object.keys(this.usedNamespaces)}}const W=(t,e)=>{const n=d.useRef();return d.useEffect(()=>{n.current=e?n.current:t},[t,e]),n.current};function R(t,e,n,o){return t.getFixedT(e,n,o)}function G(t,e,n,o){return d.useCallback(R(t,e,n,o),[t,e,n,o])}function Y(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{i18n:n}=e,{i18n:o,defaultNS:i}=d.useContext(q)||{},s=n||o||U();if(s&&!s.reportNamespaces&&(s.reportNamespaces=new J),!s){x("You will need to pass in an i18next instance by using initReactI18next");const r=(l,u)=>typeof u=="string"?u:u&&typeof u=="object"&&typeof u.defaultValue=="string"?u.defaultValue:Array.isArray(l)?l[l.length-1]:l,f=[r,{},!1];return f.t=r,f.i18n={},f.ready=!1,f}s.options.react&&s.options.react.wait!==void 0&&x("It seems you are still using the old wait option, you may migrate to the new useSuspense behaviour.");const c={...O(),...s.options.react,...e},{useSuspense:y,keyPrefix:m}=c;let a=t||i||s.options&&s.options.defaultNS;a=typeof a=="string"?[a]:a||["translation"],s.reportNamespaces.addUsedNamespaces&&s.reportNamespaces.addUsedNamespaces(a);const g=(s.isInitialized||s.initializedStoreOnce)&&a.every(r=>H(r,s,c)),z=G(s,e.lng||null,c.nsMode==="fallback"?a:a[0],m),C=()=>z,w=()=>R(s,e.lng||null,c.nsMode==="fallback"?a:a[0],m),[I,h]=d.useState(C);let N=a.join();e.lng&&(N=`${e.lng}${N}`);const S=W(N),p=d.useRef(!0);d.useEffect(()=>{const{bindI18n:r,bindI18nStore:f}=c;p.current=!0,!g&&!y&&(e.lng?E(s,e.lng,a,()=>{p.current&&h(w)}):L(s,a,()=>{p.current&&h(w)})),g&&S&&S!==N&&p.current&&h(w);function l(){p.current&&h(w)}return r&&s&&s.on(r,l),f&&s&&s.store.on(f,l),()=>{p.current=!1,r&&s&&r.split(" ").forEach(u=>s.off(u,l)),f&&s&&f.split(" ").forEach(u=>s.store.off(u,l))}},[s,N]),d.useEffect(()=>{p.current&&g&&h(C)},[s,m,g]);const b=[I,s,g];if(b.t=I,b.i18n=s,b.ready=g,g||!g&&!y)return b;throw new Promise(r=>{e.lng?E(s,e.lng,a,()=>r()):L(s,a,()=>r())})}export{Y as u};
