var jE=Object.create;var Mp=Object.defineProperty;var $E=Object.getOwnPropertyDescriptor;var tT=Object.getOwnPropertyNames;var eT=Object.getPrototypeOf,nT=Object.prototype.hasOwnProperty;var Lr=(e,t)=>()=>(e&&(t=e(e=0)),t);var Wi=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),iT=(e,t)=>{for(var n in t)Mp(e,n,{get:t[n],enumerable:!0})},sT=(e,t,n,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of tT(t))!nT.call(e,s)&&s!==n&&Mp(e,s,{get:()=>t[s],enumerable:!(i=$E(t,s))||i.enumerable});return e};var Ga=(e,t,n)=>(n=e!=null?jE(eT(e)):{},sT(t||!e||!e.__esModule?Mp(n,"default",{value:e,enumerable:!0}):n,e));var xv=Wi(ze=>{"use strict";function Ap(e,t){var n=e.length;e.push(t);t:for(;0<n;){var i=n-1>>>1,s=e[i];if(0<Mu(s,t))e[i]=t,e[n]=s,n=i;else break t}}function qi(e){return e.length===0?null:e[0]}function Eu(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;t:for(var i=0,s=e.length,a=s>>>1;i<a;){var r=2*(i+1)-1,o=e[r],l=r+1,c=e[l];if(0>Mu(o,n))l<s&&0>Mu(c,o)?(e[i]=c,e[l]=n,i=l):(e[i]=o,e[r]=n,i=r);else if(l<s&&0>Mu(c,n))e[i]=c,e[l]=n,i=l;else break t}}return t}function Mu(e,t){var n=e.sortIndex-t.sortIndex;return n!==0?n:e.id-t.id}ze.unstable_now=void 0;typeof performance=="object"&&typeof performance.now=="function"?(hv=performance,ze.unstable_now=function(){return hv.now()}):(bp=Date,fv=bp.now(),ze.unstable_now=function(){return bp.now()-fv});var hv,bp,fv,_s=[],Zs=[],aT=1,fi=null,yn=3,wp=!1,_l=!1,vl=!1,Cp=!1,mv=typeof setTimeout=="function"?setTimeout:null,gv=typeof clearTimeout=="function"?clearTimeout:null,dv=typeof setImmediate<"u"?setImmediate:null;function bu(e){for(var t=qi(Zs);t!==null;){if(t.callback===null)Eu(Zs);else if(t.startTime<=e)Eu(Zs),t.sortIndex=t.expirationTime,Ap(_s,t);else break;t=qi(Zs)}}function Rp(e){if(vl=!1,bu(e),!_l)if(qi(_s)!==null)_l=!0,Ir||(Ir=!0,Or());else{var t=qi(Zs);t!==null&&Np(Rp,t.startTime-e)}}var Ir=!1,yl=-1,_v=5,vv=-1;function yv(){return Cp?!0:!(ze.unstable_now()-vv<_v)}function Ep(){if(Cp=!1,Ir){var e=ze.unstable_now();vv=e;var t=!0;try{t:{_l=!1,vl&&(vl=!1,gv(yl),yl=-1),wp=!0;var n=yn;try{e:{for(bu(e),fi=qi(_s);fi!==null&&!(fi.expirationTime>e&&yv());){var i=fi.callback;if(typeof i=="function"){fi.callback=null,yn=fi.priorityLevel;var s=i(fi.expirationTime<=e);if(e=ze.unstable_now(),typeof s=="function"){fi.callback=s,bu(e),t=!0;break e}fi===qi(_s)&&Eu(_s),bu(e)}else Eu(_s);fi=qi(_s)}if(fi!==null)t=!0;else{var a=qi(Zs);a!==null&&Np(Rp,a.startTime-e),t=!1}}break t}finally{fi=null,yn=n,wp=!1}t=void 0}}finally{t?Or():Ir=!1}}}var Or;typeof dv=="function"?Or=function(){dv(Ep)}:typeof MessageChannel<"u"?(Tp=new MessageChannel,pv=Tp.port2,Tp.port1.onmessage=Ep,Or=function(){pv.postMessage(null)}):Or=function(){mv(Ep,0)};var Tp,pv;function Np(e,t){yl=mv(function(){e(ze.unstable_now())},t)}ze.unstable_IdlePriority=5;ze.unstable_ImmediatePriority=1;ze.unstable_LowPriority=4;ze.unstable_NormalPriority=3;ze.unstable_Profiling=null;ze.unstable_UserBlockingPriority=2;ze.unstable_cancelCallback=function(e){e.callback=null};ze.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):_v=0<e?Math.floor(1e3/e):5};ze.unstable_getCurrentPriorityLevel=function(){return yn};ze.unstable_next=function(e){switch(yn){case 1:case 2:case 3:var t=3;break;default:t=yn}var n=yn;yn=t;try{return e()}finally{yn=n}};ze.unstable_requestPaint=function(){Cp=!0};ze.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=yn;yn=e;try{return t()}finally{yn=n}};ze.unstable_scheduleCallback=function(e,t,n){var i=ze.unstable_now();switch(typeof n=="object"&&n!==null?(n=n.delay,n=typeof n=="number"&&0<n?i+n:i):n=i,e){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=n+s,e={id:aT++,callback:t,priorityLevel:e,startTime:n,expirationTime:s,sortIndex:-1},n>i?(e.sortIndex=n,Ap(Zs,e),qi(_s)===null&&e===qi(Zs)&&(vl?(gv(yl),yl=-1):vl=!0,Np(Rp,n-i))):(e.sortIndex=s,Ap(_s,e),_l||wp||(_l=!0,Ir||(Ir=!0,Or()))),e};ze.unstable_shouldYield=yv;ze.unstable_wrapCallback=function(e){var t=yn;return function(){var n=yn;yn=t;try{return e.apply(this,arguments)}finally{yn=n}}}});var Mv=Wi((WU,Sv)=>{"use strict";Sv.exports=xv()});var Iv=Wi(Wt=>{"use strict";var Lp=Symbol.for("react.transitional.element"),rT=Symbol.for("react.portal"),oT=Symbol.for("react.fragment"),lT=Symbol.for("react.strict_mode"),cT=Symbol.for("react.profiler"),uT=Symbol.for("react.consumer"),hT=Symbol.for("react.context"),fT=Symbol.for("react.forward_ref"),dT=Symbol.for("react.suspense"),pT=Symbol.for("react.memo"),wv=Symbol.for("react.lazy"),mT=Symbol.for("react.activity"),gT=Symbol.for("react.view_transition"),bv=Symbol.iterator;function _T(e){return e===null||typeof e!="object"?null:(e=bv&&e[bv]||e["@@iterator"],typeof e=="function"?e:null)}var Cv={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Rv=Object.assign,Nv={};function Br(e,t,n){this.props=e,this.context=t,this.refs=Nv,this.updater=n||Cv}Br.prototype.isReactComponent={};Br.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Br.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Dv(){}Dv.prototype=Br.prototype;function Op(e,t,n){this.props=e,this.context=t,this.refs=Nv,this.updater=n||Cv}var Ip=Op.prototype=new Dv;Ip.constructor=Op;Rv(Ip,Br.prototype);Ip.isPureReactComponent=!0;var Ev=Array.isArray;function Up(){}var De={H:null,A:null,T:null,S:null},Uv=Object.prototype.hasOwnProperty;function Pp(e,t,n){var i=n.ref;return{$$typeof:Lp,type:e,key:t,ref:i!==void 0?i:null,props:n}}function vT(e,t){return Pp(e.type,t,e.props)}function Bp(e){return typeof e=="object"&&e!==null&&e.$$typeof===Lp}function yT(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var Tv=/\/+/g;function Dp(e,t){return typeof e=="object"&&e!==null&&e.key!=null?yT(""+e.key):t.toString(36)}function xT(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch(typeof e.status=="string"?e.then(Up,Up):(e.status="pending",e.then(function(t){e.status==="pending"&&(e.status="fulfilled",e.value=t)},function(t){e.status==="pending"&&(e.status="rejected",e.reason=t)})),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}function Pr(e,t,n,i,s){var a=typeof e;(a==="undefined"||a==="boolean")&&(e=null);var r=!1;if(e===null)r=!0;else switch(a){case"bigint":case"string":case"number":r=!0;break;case"object":switch(e.$$typeof){case Lp:case rT:r=!0;break;case wv:return r=e._init,Pr(r(e._payload),t,n,i,s)}}if(r)return s=s(e),r=i===""?"."+Dp(e,0):i,Ev(s)?(n="",r!=null&&(n=r.replace(Tv,"$&/")+"/"),Pr(s,t,n,"",function(c){return c})):s!=null&&(Bp(s)&&(s=vT(s,n+(s.key==null||e&&e.key===s.key?"":(""+s.key).replace(Tv,"$&/")+"/")+r)),t.push(s)),1;r=0;var o=i===""?".":i+":";if(Ev(e))for(var l=0;l<e.length;l++)i=e[l],a=o+Dp(i,l),r+=Pr(i,t,n,a,s);else if(l=_T(e),typeof l=="function")for(e=l.call(e),l=0;!(i=e.next()).done;)i=i.value,a=o+Dp(i,l++),r+=Pr(i,t,n,a,s);else if(a==="object"){if(typeof e.then=="function")return Pr(xT(e),t,n,i,s);throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.")}return r}function Tu(e,t,n){if(e==null)return e;var i=[],s=0;return Pr(e,i,"","",function(a){return t.call(n,a,s++)}),i}function ST(e){if(e._status===-1){var t=e._result,n=t();n.then(function(i){(e._status===0||e._status===-1)&&(e._status=1,e._result=i,n.status===void 0&&(n.status="fulfilled",n.value=i))},function(i){(e._status===0||e._status===-1)&&(e._status=2,e._result=i,n.status===void 0&&(n.status="rejected",n.reason=i))}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var Av=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)};function Lv(e){var t=De.T,n={};n.types=t!==null?t.types:null,De.T=n;try{var i=e(),s=De.S;s!==null&&s(n,i),typeof i=="object"&&i!==null&&typeof i.then=="function"&&i.then(Up,Av)}catch(a){Av(a)}finally{t!==null&&n.types!==null&&(t.types=n.types),De.T=t}}function Ov(e){var t=De.T;if(t!==null){var n=t.types;n===null?t.types=[e]:n.indexOf(e)===-1&&n.push(e)}else Lv(Ov.bind(null,e))}var MT={map:Tu,forEach:function(e,t,n){Tu(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return Tu(e,function(){t++}),t},toArray:function(e){return Tu(e,function(t){return t})||[]},only:function(e){if(!Bp(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};Wt.Activity=mT;Wt.Children=MT;Wt.Component=Br;Wt.Fragment=oT;Wt.Profiler=cT;Wt.PureComponent=Op;Wt.StrictMode=lT;Wt.Suspense=dT;Wt.ViewTransition=gT;Wt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=De;Wt.__COMPILER_RUNTIME={__proto__:null,c:function(e){return De.H.useMemoCache(e)}};Wt.addTransitionType=Ov;Wt.cache=function(e){return function(){return e.apply(null,arguments)}};Wt.cacheSignal=function(){return null};Wt.cloneElement=function(e,t,n){if(e==null)throw Error("The argument must be a React element, but you passed "+e+".");var i=Rv({},e.props),s=e.key;if(t!=null)for(a in t.key!==void 0&&(s=""+t.key),t)!Uv.call(t,a)||a==="key"||a==="__self"||a==="__source"||a==="ref"&&t.ref===void 0||(i[a]=t[a]);var a=arguments.length-2;if(a===1)i.children=n;else if(1<a){for(var r=Array(a),o=0;o<a;o++)r[o]=arguments[o+2];i.children=r}return Pp(e.type,s,i)};Wt.createContext=function(e){return e={$$typeof:hT,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:uT,_context:e},e};Wt.createElement=function(e,t,n){var i,s={},a=null;if(t!=null)for(i in t.key!==void 0&&(a=""+t.key),t)Uv.call(t,i)&&i!=="key"&&i!=="__self"&&i!=="__source"&&(s[i]=t[i]);var r=arguments.length-2;if(r===1)s.children=n;else if(1<r){for(var o=Array(r),l=0;l<r;l++)o[l]=arguments[l+2];s.children=o}if(e&&e.defaultProps)for(i in r=e.defaultProps,r)s[i]===void 0&&(s[i]=r[i]);return Pp(e,a,s)};Wt.createRef=function(){return{current:null}};Wt.forwardRef=function(e){return{$$typeof:fT,render:e}};Wt.isValidElement=Bp;Wt.lazy=function(e){return{$$typeof:wv,_payload:{_status:-1,_result:e},_init:ST}};Wt.memo=function(e,t){return{$$typeof:pT,type:e,compare:t===void 0?null:t}};Wt.startTransition=Lv;Wt.unstable_useCacheRefresh=function(){return De.H.useCacheRefresh()};Wt.use=function(e){return De.H.use(e)};Wt.useActionState=function(e,t,n){return De.H.useActionState(e,t,n)};Wt.useCallback=function(e,t){return De.H.useCallback(e,t)};Wt.useContext=function(e){return De.H.useContext(e)};Wt.useDebugValue=function(){};Wt.useDeferredValue=function(e,t){return De.H.useDeferredValue(e,t)};Wt.useEffect=function(e,t){return De.H.useEffect(e,t)};Wt.useEffectEvent=function(e){return De.H.useEffectEvent(e)};Wt.useId=function(){return De.H.useId()};Wt.useImperativeHandle=function(e,t,n){return De.H.useImperativeHandle(e,t,n)};Wt.useInsertionEffect=function(e,t){return De.H.useInsertionEffect(e,t)};Wt.useLayoutEffect=function(e,t){return De.H.useLayoutEffect(e,t)};Wt.useMemo=function(e,t){return De.H.useMemo(e,t)};Wt.useOptimistic=function(e,t){return De.H.useOptimistic(e,t)};Wt.useReducer=function(e,t,n){return De.H.useReducer(e,t,n)};Wt.useRef=function(e){return De.H.useRef(e)};Wt.useState=function(e){return De.H.useState(e)};Wt.useSyncExternalStore=function(e,t,n){return De.H.useSyncExternalStore(e,t,n)};Wt.useTransition=function(){return De.H.useTransition()};Wt.version="19.3.1"});var xl=Wi((YU,Pv)=>{"use strict";Pv.exports=Iv()});var Fv=Wi(xn=>{"use strict";var bT=xl();function zv(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function Js(){}var wn={d:{f:Js,r:function(){throw Error(zv(522))},D:Js,C:Js,L:Js,m:Js,X:Js,S:Js,M:Js},p:0,findDOMNode:null},ET=Symbol.for("react.portal"),TT=Symbol.for("react.recoverable"),Bv=Symbol.for("react.optimistic_key");function AT(e,t,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:ET,key:i==null?null:i===Bv?Bv:""+i,children:e,containerInfo:t,implementation:n}}var Sl=bT.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function Au(e,t){if(e==="font")return"";if(typeof t=="string")return t==="use-credentials"?t:""}xn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=wn;xn.browser=function(e){return{$$typeof:TT,_reason:e}};xn.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(zv(299));return AT(e,t,null,n)};xn.flushSync=function(e){var t=Sl.T,n=wn.p;try{if(Sl.T=null,wn.p=2,e)return e()}finally{Sl.T=t,wn.p=n,wn.d.f()}};xn.preconnect=function(e,t){typeof e=="string"&&(t?(t=t.crossOrigin,t=typeof t=="string"?t==="use-credentials"?t:"":void 0):t=null,wn.d.C(e,t))};xn.prefetchDNS=function(e){typeof e=="string"&&wn.d.D(e)};xn.preinit=function(e,t){if(typeof e=="string"&&t&&typeof t.as=="string"){var n=t.as,i=Au(n,t.crossOrigin),s=typeof t.integrity=="string"?t.integrity:void 0,a=typeof t.fetchPriority=="string"?t.fetchPriority:void 0;n==="style"?wn.d.S(e,typeof t.precedence=="string"?t.precedence:void 0,{crossOrigin:i,integrity:s,fetchPriority:a}):n==="script"&&wn.d.X(e,{crossOrigin:i,integrity:s,fetchPriority:a,nonce:typeof t.nonce=="string"?t.nonce:void 0})}};xn.preinitModule=function(e,t){if(typeof e=="string")if(typeof t=="object"&&t!==null){if(t.as==null||t.as==="script"){var n=Au(t.as,t.crossOrigin);wn.d.M(e,{crossOrigin:n,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0,fetchPriority:typeof t.fetchPriority=="string"?t.fetchPriority:void 0})}}else t==null&&wn.d.M(e)};xn.preload=function(e,t){if(typeof e=="string"&&typeof t=="object"&&t!==null&&typeof t.as=="string"){var n=t.as,i=Au(n,t.crossOrigin);wn.d.L(e,n,{crossOrigin:i,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0,type:typeof t.type=="string"?t.type:void 0,fetchPriority:typeof t.fetchPriority=="string"?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy=="string"?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet=="string"?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes=="string"?t.imageSizes:void 0,media:typeof t.media=="string"?t.media:void 0})}};xn.preloadModule=function(e,t){if(typeof e=="string")if(t){var n=Au(t.as,t.crossOrigin);wn.d.m(e,{as:typeof t.as=="string"&&t.as!=="script"?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0,fetchPriority:typeof t.fetchPriority=="string"?t.fetchPriority:void 0})}else wn.d.m(e)};xn.requestFormReset=function(e){wn.d.r(e)};xn.unstable_batchedUpdates=function(e,t){return e(t)};xn.useFormState=function(e,t,n){return Sl.H.useFormState(e,t,n)};xn.useFormStatus=function(){return Sl.H.useHostTransitionStatus()};xn.version="19.3.1"});var Gv=Wi((JU,Vv)=>{"use strict";function Hv(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Hv)}catch(e){console.error(e)}}Hv(),Vv.exports=Fv()});var Cb=Wi(lf=>{"use strict";var tn=Mv(),wx=xl(),wT=Gv();function nt(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function Cx(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function lc(e){for(var t=e,n=t;n&&!n.alternate;)t=n,t.flags&4098&&(e=t.return),n=t.return;for(;t.return;)t=t.return;return t.tag===3?e:null}function Rx(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Nx(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function kv(e){if(lc(e)!==e)throw Error(nt(188))}function CT(e){var t=e.alternate;if(!t){if(t=lc(e),t===null)throw Error(nt(188));return t!==e?null:e}for(var n=e,i=t;;){var s=n.return;if(s===null)break;var a=s.alternate;if(a===null){if(i=s.return,i!==null){n=i;continue}break}if(s.child===a.child){for(a=s.child;a;){if(a===n)return kv(s),e;if(a===i)return kv(s),t;a=a.sibling}throw Error(nt(188))}if(n.return!==i.return)n=s,i=a;else{for(var r=!1,o=s.child;o;){if(o===n){r=!0,n=s,i=a;break}if(o===i){r=!0,i=s,n=a;break}o=o.sibling}if(!r){for(o=a.child;o;){if(o===n){r=!0,n=a,i=s;break}if(o===i){r=!0,i=a,n=s;break}o=o.sibling}if(!r)throw Error(nt(189))}}if(n.alternate!==i)throw Error(nt(190))}if(n.tag!==3)throw Error(nt(188));return n.stateNode.current===n?e:t}function Dx(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=Dx(e),t!==null)return t;e=e.sibling}return null}function Fn(e,t,n,i,s,a){for(;e!==null;){if((e.tag===5||e.tag===27||e.tag===6)&&n(e,i,s,a)||(e.tag!==22||e.memoizedState===null)&&(t||e.tag!==5&&e.tag!==27)&&Fn(e.child,t,n,i,s,a))return!0;e=e.sibling}return!1}function cr(e){for(e=e.return;e!==null;){if(e.tag===3||e.tag===5||e.tag===27)return e;e=e.return}return null}function Xv(e){var t=!1;for(e=e.return;e!==null&&(e.tag===4&&(t=!0),!(e.tag===3||e.tag===5||e.tag===27));)e=e.return;return t}function Ux(e){var t=[null,null],n=cr(e);return n===null||Lx(t,e,n.child,{foundSelf:!1}),t}function Lx(e,t,n,i){for(;n!==null;){if(n===t)i.foundSelf=!0;else if(n.tag===5||n.tag===27||n.tag===6){if(i.foundSelf)return e[1]=n,!0;e[0]=n}else if((n.tag!==22||n.memoizedState===null)&&Lx(e,t,n.child,i))return!0;n=n.sibling}return!1}function $e(e){switch(e.tag){case 5:case 27:case 6:return e.stateNode;case 3:return e.stateNode.containerInfo;default:throw Error(nt(559))}}var Xr=null,mm=null;function RT(e,t,n){return e===n?!0:e===t?(Xr=e,!0):!1}function NT(e,t,n){return e===n?(mm=e,!1):e===t?(mm!==null&&(Xr=e),!0):!1}function Wv(e){if(e===null)return null;do e=e===null?null:e.return;while(e&&e.tag!==5&&e.tag!==27&&e.tag!==3);return e||null}function gm(e,t,n){for(var i=0,s=e;s;s=n(s))i++;s=0;for(var a=t;a;a=n(a))s++;for(;0<i-s;)e=n(e),i--;for(;0<s-i;)t=n(t),s--;for(;i--;){if(e===t||t!==null&&e===t.alternate)return e;e=n(e),t=n(t)}return null}var Ce=Object.assign,DT=Symbol.for("react.element"),wu=Symbol.for("react.transitional.element"),Cl=Symbol.for("react.portal"),Wr=Symbol.for("react.fragment"),Ox=Symbol.for("react.strict_mode"),_m=Symbol.for("react.profiler"),Ix=Symbol.for("react.consumer"),ji=Symbol.for("react.context"),Ag=Symbol.for("react.forward_ref"),vm=Symbol.for("react.suspense"),ym=Symbol.for("react.suspense_list"),wg=Symbol.for("react.memo"),$s=Symbol.for("react.lazy");Symbol.for("react.scope");var xm=Symbol.for("react.activity"),UT=Symbol.for("react.legacy_hidden");Symbol.for("react.tracing_marker");var LT=Symbol.for("react.memo_cache_sentinel"),Sm=Symbol.for("react.view_transition"),OT=Symbol.for("react.recoverable"),qv=Symbol.iterator;function Ml(e){return e===null||typeof e!="object"?null:(e=qv&&e[qv]||e["@@iterator"],typeof e=="function"?e:null)}var IT=Symbol.for("react.client.reference");function Mm(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===IT?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Wr:return"Fragment";case _m:return"Profiler";case Ox:return"StrictMode";case vm:return"Suspense";case ym:return"SuspenseList";case xm:return"Activity";case Sm:return"ViewTransition"}if(typeof e=="object")switch(e.$$typeof){case Cl:return"Portal";case ji:return e.displayName||"Context";case Ix:return(e._context.displayName||"Context")+".Consumer";case Ag:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case wg:return t=e.displayName||null,t!==null?t:Mm(e.type)||"Memo";case $s:t=e._payload,e=e._init;try{return Mm(e(t))}catch{}}return null}var Rl=Array.isArray,Gt=wx.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,me=wT.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Ka={pending:!1,data:null,method:null,action:null},bm=[],qr=-1;function as(e){return{current:e}}function dn(e){0>qr||(e.current=bm[qr],bm[qr]=null,qr--)}function Oe(e,t){qr++,bm[qr]=e.current,e.current=t}var ns=as(null),ql=as(null),la=as(null),dh=as(null);function ph(e,t){switch(Oe(la,t),Oe(ql,e),Oe(ns,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?rx(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=rx(t),e=ib(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}dn(ns),Oe(ns,e)}function fo(){dn(ns),dn(ql),dn(la)}function Em(e){var t=e.memoizedState;t!==null&&(bo._currentValue=t.memoizedState,Oe(dh,e)),t=ns.current;var n=ib(t,e.type);t!==n&&(Oe(ql,e),Oe(ns,n))}function mh(e){ql.current===e&&(dn(ns),dn(ql)),dh.current===e&&(dn(dh),bo._currentValue=Ka)}var zp,Yv;function Qs(e){if(zp===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);zp=t&&t[1]||"",Yv=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+zp+e+Yv}var Fp=!1;function Hp(e,t){if(!e||Fp)return"";Fp=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var i={DetermineComponentFrameRoot:function(){try{if(t){var p=function(){throw Error()};if(Object.defineProperty(p.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(p,[])}catch(g){var u=g}Reflect.construct(e,[],p)}else{try{p.call()}catch(g){u=g}p=!1;try{var d=Object.getOwnPropertyDescriptor(e.prototype,"props");Object.defineProperty(e.prototype,"props",{configurable:!0,set:function(){throw Error()}}),p=!0,new e}finally{p&&(d!==void 0?Object.defineProperty(e.prototype,"props",d):delete e.prototype.props)}}}else{try{throw Error()}catch(g){u=g}(p=e())&&typeof p.catch=="function"&&p.catch(function(){})}}catch(g){if(g&&u&&typeof g.stack=="string")return[g.stack,u.stack]}return[null,null]}};i.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var s=Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot,"name");s&&s.configurable&&Object.defineProperty(i.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var a=i.DetermineComponentFrameRoot(),r=a[0],o=a[1];if(r&&o){var l=r.split(`
`),c=o.split(`
`);for(s=i=0;i<l.length&&!l[i].includes("DetermineComponentFrameRoot");)i++;for(;s<c.length&&!c[s].includes("DetermineComponentFrameRoot");)s++;if(i===l.length||s===c.length)for(i=l.length-1,s=c.length-1;1<=i&&0<=s&&l[i]!==c[s];)s--;for(;1<=i&&0<=s;i--,s--)if(l[i]!==c[s]){if(i!==1||s!==1)do if(i--,s--,0>s||l[i]!==c[s]){var h=`
`+l[i].replace(" at new "," at ");return e.displayName&&h.includes("<anonymous>")&&(h=h.replace("<anonymous>",e.displayName)),h}while(1<=i&&0<=s);break}}}finally{Fp=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:"")?Qs(n):""}function PT(e,t){switch(e.tag){case 26:case 27:case 5:return Qs(e.type);case 16:return Qs("Lazy");case 13:return e.child!==t&&t!==null?Qs("Suspense Fallback"):Qs("Suspense");case 19:return Qs("SuspenseList");case 0:case 15:return Hp(e.type,!1);case 11:return Hp(e.type.render,!1);case 1:return Hp(e.type,!0);case 31:return Qs("Activity");case 30:return Qs("ViewTransition");default:return""}}function Zv(e){try{var t="",n=null;do t+=PT(e,n),n=e,e=e.return;while(e);return t}catch(i){return`
Error generating stack: `+i.message+`
`+i.stack}}var Tm=Object.prototype.hasOwnProperty,Cg=tn.unstable_scheduleCallback,Vp=tn.unstable_cancelCallback,BT=tn.unstable_shouldYield,zT=tn.unstable_requestPaint,jn=tn.unstable_now,FT=tn.unstable_getCurrentPriorityLevel,Px=tn.unstable_ImmediatePriority,Bx=tn.unstable_UserBlockingPriority,gh=tn.unstable_NormalPriority,HT=tn.unstable_LowPriority,zx=tn.unstable_IdlePriority,VT=tn.log,GT=tn.unstable_setDisableYieldValue,cc=null,$n=null;function na(e){if(typeof VT=="function"&&GT(e),$n&&typeof $n.setStrictMode=="function")try{$n.setStrictMode(cc,e)}catch{}}var ti=Math.clz32?Math.clz32:WT,kT=Math.log,XT=Math.LN2;function WT(e){return e>>>=0,e===0?32:31-(kT(e)/XT|0)|0}var Cu=256,Ru=262144,Nu=4194304;function Wa(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&-e;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function Gh(e,t,n){var i=e.pendingLanes;if(i===0)return 0;var s=0,a=e.suspendedLanes,r=e.pingedLanes;e=e.warmLanes;var o=i&134217727;return o!==0?(i=o&~a,i!==0?s=Wa(i):(r&=o,r!==0?s=Wa(r):n||(n=o&~e,n!==0&&(s=Wa(n))))):(o=i&~a,o!==0?s=Wa(o):r!==0?s=Wa(r):n||(n=i&~e,n!==0&&(s=Wa(n)))),s===0?0:t!==0&&t!==s&&!(t&a)&&(a=s&-s,n=t&-t,a>=n||a===32&&(n&4194048)!==0)?t:s}function uc(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function Fx(e,t){t&8&&(t|=t&32);var n=e.entangledLanes;if(n!==0)for(e=e.entanglements,n&=t;0<n;){var i=31-ti(n),s=1<<i;t|=e[i],n&=~s}return t}function qT(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Hx(){var e=Nu;return Nu<<=1,!(Nu&62914560)&&(Nu=4194304),e}function Gp(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function hc(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function YT(e,t,n,i,s,a){var r=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var o=e.entanglements,l=e.expirationTimes,c=e.hiddenUpdates;for(n=r&~n;0<n;){var h=31-ti(n),p=1<<h;o[h]=0,l[h]=-1;var u=c[h];if(u!==null)for(c[h]=null,h=0;h<u.length;h++){var d=u[h];d!==null&&(d.lane&=-536870913)}n&=~p}i!==0&&Vx(e,i,0),a!==0&&s===0&&e.tag!==0&&(e.suspendedLanes|=a&~(r&~t))}function Vx(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var i=31-ti(t);e.entangledLanes|=t,e.entanglements[i]=e.entanglements[i]|1073741824|n&261930}function Gx(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var i=31-ti(n),s=1<<i;s&t|e[i]&t&&(e[i]|=t),n&=~s}}function kx(e,t){var n=t&-t;return n=n&42?1:Rg(n),n&(e.suspendedLanes|t)?0:n}function Rg(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Ng(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function Xx(){var e=me.p;return e!==0?e:(e=window.event,e===void 0?32:Tb(e.type))}function Jv(e,t){var n=me.p;try{return me.p=e,t()}finally{me.p=n}}var Ns=Math.random().toString(36).slice(2),hn="__reactFiber$"+Ns,Hn="__reactProps$"+Ns,Ao="__reactContainer$"+Ns,Kv="__reactEvents$"+Ns,ZT="__reactListeners$"+Ns,JT="__reactHandles$"+Ns,Qv="__reactResources$"+Ns,fc="__reactMarker$"+Ns,_h="__reactLoad$"+Ns;function kh(e){delete e[hn],delete e[Hn],delete e[ZT],delete e[JT]}function Za(e){var t;if(t=e[hn])return t;for(var n=e.parentNode;n;){if(t=n[Ao]||n[hn]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=px(e);e!==null;){if(n=e[hn])return n;e=px(e)}return t}e=n,n=e.parentNode}return null}function wo(e){if(e=e[hn]||e[Ao]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Nl(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(nt(33))}function no(e){var t=e[Qv];return t||(t=e[Qv]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function rn(e){e[fc]=!0}function Wx(e){e[_h]=void 0}var qx=new Set,Yx={};function ur(e,t){po(e,t),po(e+"Capture",t)}function po(e,t){for(Yx[e]=t,e=0;e<t.length;e++)qx.add(t[e])}var KT=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),jv={},$v={};function QT(e){return Tm.call($v,e)?!0:Tm.call(jv,e)?!1:KT.test(e)?$v[e]=!0:(jv[e]=!0,!1)}var fe=!1;function ty(){var e=fe;return fe=!1,e}function Zu(e,t,n){if(QT(t))if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var i=t.toLowerCase().slice(0,5);if(i!=="data-"&&i!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,n)}}function Du(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,n)}}function vs(e,t,n,i){if(i===null)e.removeAttribute(n);else{switch(typeof i){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttributeNS(t,n,i)}}function Zn(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Zx(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function jT(e,t,n){var i=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof i<"u"&&typeof i.get=="function"&&typeof i.set=="function"){var s=i.get,a=i.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return s.call(this)},set:function(r){n=""+r,a.call(this,r)}}),Object.defineProperty(e,t,{enumerable:i.enumerable}),{getValue:function(){return n},setValue:function(r){n=""+r},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Am(e){if(!e._valueTracker){var t=Zx(e)?"checked":"value";e._valueTracker=jT(e,t,""+e[t])}}function Jx(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),i="";return e&&(i=Zx(e)?e.checked?"true":"false":e.value),e=i,e!==n?(t.setValue(e),!0):!1}var $T=/[\n"\\]/g;function _i(e){return e.replace($T,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function wm(e,t,n,i,s,a,r,o){e.name="",r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"?e.type=r:e.removeAttribute("type"),t!=null?r==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+Zn(t)):e.value!==""+Zn(t)&&(e.value=""+Zn(t)):r!=="submit"&&r!=="reset"||e.removeAttribute("value"),t!=null?r==="number"&&e.value==t?kp(e,Zn(e.value)):kp(e,Zn(t)):n!=null?kp(e,Zn(n)):i!=null&&e.removeAttribute("value"),s==null&&a!=null&&(e.defaultChecked=!!a),s!=null&&(e.checked=s&&typeof s!="function"&&typeof s!="symbol"),o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"?e.name=""+Zn(o):e.removeAttribute("name")}function Kx(e,t,n,i,s,a,r,o){if(a!=null&&typeof a!="function"&&typeof a!="symbol"&&typeof a!="boolean"&&(e.type=a),t!=null||n!=null){if(!(a!=="submit"&&a!=="reset"||t!=null)){Am(e);return}n=n!=null?""+Zn(n):"",t=t!=null?""+Zn(t):n,o||t===e.value||(e.value=t),e.defaultValue=t}i=i??s,i=typeof i!="function"&&typeof i!="symbol"&&!!i,e.checked=o?e.checked:!!i,e.defaultChecked=!!i,r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"&&(e.name=r),Am(e)}function kp(e,t){e.defaultValue!==""+t&&(e.defaultValue=""+t)}function io(e,t,n,i){if(e=e.options,t){t={};for(var s=0;s<n.length;s++)t["$"+n[s]]=!0;for(n=0;n<e.length;n++)s=t.hasOwnProperty("$"+e[n].value),e[n].selected!==s&&(e[n].selected=s),s&&i&&(e[n].defaultSelected=!0)}else{for(n=""+Zn(n),t=null,s=0;s<e.length;s++){if(e[s].value===n){e[s].selected=!0,i&&(e[s].defaultSelected=!0);return}t!==null||e[s].disabled||(t=e[s])}t!==null&&(t.selected=!0)}}function Qx(e,t,n){if(t!=null&&(t=""+Zn(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n!=null?""+Zn(n):""}function jx(e,t,n,i){if(t==null){if(i!=null){if(n!=null)throw Error(nt(92));if(Rl(i)){if(1<i.length)throw Error(nt(93));i=i[0]}n=i}n==null&&(n=""),t=n}n=Zn(t),e.defaultValue=n,i=e.textContent,i===n&&i!==""&&i!==null&&(e.value=i),Am(e)}function mo(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var tA=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function ey(e,t,n){var i=t.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?i?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":i?e.setProperty(t,n):typeof n!="number"||n===0||tA.has(t)?t==="float"?e.cssFloat=n:e[t]=(""+n).trim():e[t]=n+"px"}function $x(e,t,n){if(t!=null&&typeof t!="object")throw Error(nt(62));if(e=e.style,n!=null){for(var i in n)!n.hasOwnProperty(i)||t!=null&&t.hasOwnProperty(i)||(i.indexOf("--")===0?e.setProperty(i,""):i==="float"?e.cssFloat="":e[i]="",fe=!0);for(var s in t)i=t[s],t.hasOwnProperty(s)&&n[s]!==i&&(ey(e,s,i),fe=!0)}else for(var a in t)t.hasOwnProperty(a)&&ey(e,a,t[a])}function Dg(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var eA=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["maskType","mask-type"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),nA=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Ju(e){return nA.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function $i(){}var Cm=null;function Ug(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Yr=null,so=null;function ny(e){var t=wo(e);if(t&&(e=t.stateNode)){var n=e[Hn]||null;t:switch(e=t.stateNode,t.type){case"input":if(wm(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+_i(""+t)+'"][type="radio"]'),t=0;t<n.length;t++){var i=n[t];if(i!==e&&i.form===e.form){var s=i[Hn]||null;if(!s)throw Error(nt(90));wm(i,s.value,s.defaultValue,s.defaultValue,s.checked,s.defaultChecked,s.type,s.name)}}for(t=0;t<n.length;t++)i=n[t],i.form===e.form&&Jx(i)}break t;case"textarea":Qx(e,n.value,n.defaultValue);break t;case"select":t=n.value,t!=null&&io(e,!!n.multiple,t,!1)}}}var Xp=!1;function tS(e,t,n){if(Xp)return e(t,n);Xp=!0;try{var i=e(t);return i}finally{if(Xp=!1,(Yr!==null||so!==null)&&(sf(),Yr&&(t=Yr,e=so,so=Yr=null,ny(t),e)))for(t=0;t<e.length;t++)ny(e[t])}}function Yl(e,t){var n=e.stateNode;if(n===null)return null;var i=n[Hn]||null;if(i===null)return null;n=i[t];t:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(e=e.type,i=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!i;break t;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(nt(231,t,typeof n));return n}var Es=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Rm=!1;if(Es)try{zr={},Object.defineProperty(zr,"passive",{get:function(){Rm=!0}}),window.addEventListener("test",zr,zr),window.removeEventListener("test",zr,zr)}catch{Rm=!1}var zr,ia=null,Lg=null,Ku=null;function eS(){if(Ku)return Ku;var e,t=Lg,n=t.length,i,s="value"in ia?ia.value:ia.textContent,a=s.length;for(e=0;e<n&&t[e]===s[e];e++);var r=n-e;for(i=1;i<=r&&t[n-i]===s[a-i];i++);return Ku=s.slice(e,1<i?1-i:void 0)}function Qu(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Uu(){return!0}function iy(){return!1}function Dn(e){function t(n,i,s,a,r){this._reactName=n,this._targetInst=s,this.type=i,this.nativeEvent=a,this.target=r,this.currentTarget=null;for(var o in e)e.hasOwnProperty(o)&&(n=e[o],this[o]=n?n(a):a[o]);return this.isDefaultPrevented=(a.defaultPrevented!=null?a.defaultPrevented:a.returnValue===!1)?Uu:iy,this.isPropagationStopped=iy,this}return Ce(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Uu)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Uu)},persist:function(){},isPersistent:Uu}),t}var ba={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Xh=Dn(ba),dc=Ce({},ba,{view:0,detail:0}),iA=Dn(dc),Wp,qp,bl,Wh=Ce({},dc,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Og,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==bl&&(bl&&e.type==="mousemove"?(Wp=e.screenX-bl.screenX,qp=e.screenY-bl.screenY):qp=Wp=0,bl=e),Wp)},movementY:function(e){return"movementY"in e?e.movementY:qp}}),sy=Dn(Wh),sA=Ce({},Wh,{dataTransfer:0}),aA=Dn(sA),rA=Ce({},dc,{relatedTarget:0}),Yp=Dn(rA),oA=Ce({},ba,{animationName:0,elapsedTime:0,pseudoElement:0}),lA=Dn(oA),cA=Ce({},ba,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),uA=Dn(cA),hA=Ce({},ba,{data:0}),ay=Dn(hA),fA={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},dA={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},pA={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function mA(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=pA[e])?!!t[e]:!1}function Og(){return mA}var gA=Ce({},dc,{key:function(e){if(e.key){var t=fA[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Qu(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?dA[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Og,charCode:function(e){return e.type==="keypress"?Qu(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Qu(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),_A=Dn(gA),vA=Ce({},Wh,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),ry=Dn(vA),yA=Ce({},ba,{submitter:0}),xA=Dn(yA),SA=Ce({},dc,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Og}),MA=Dn(SA),bA=Ce({},ba,{propertyName:0,elapsedTime:0,pseudoElement:0}),EA=Dn(bA),TA=Ce({},Wh,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),AA=Dn(TA),wA=Ce({},ba,{newState:0,oldState:0,source:0}),CA=Dn(wA),RA=[9,13,27,32],Ig=Es&&"CompositionEvent"in window,Ll=null;Es&&"documentMode"in document&&(Ll=document.documentMode);var NA=Es&&"TextEvent"in window&&!Ll,nS=Es&&(!Ig||Ll&&8<Ll&&11>=Ll),oy=" ",ly=!1;function iS(e,t){switch(e){case"keyup":return RA.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function sS(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Zr=!1;function DA(e,t){switch(e){case"compositionend":return sS(t);case"keypress":return t.which!==32?null:(ly=!0,oy);case"textInput":return e=t.data,e===oy&&ly?null:e;default:return null}}function UA(e,t){if(Zr)return e==="compositionend"||!Ig&&iS(e,t)?(e=eS(),Ku=Lg=ia=null,Zr=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return nS&&t.locale!=="ko"?null:t.data;default:return null}}var LA={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function cy(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!LA[e.type]:t==="textarea"}function aS(e,t,n,i){Yr?so?so.push(i):so=[i]:Yr=i,t=Fh(t,"onChange"),0<t.length&&(n=new Xh("onChange","change",null,n,i),e.push({event:n,listeners:t}))}var Ol=null,Zl=null;function OA(e){tb(e,0)}function qh(e){var t=Nl(e);if(Jx(t))return e}function uy(e,t){if(e==="change")return t}var rS=!1;Es&&(Es?(Ou="oninput"in document,Ou||(Zp=document.createElement("div"),Zp.setAttribute("oninput","return;"),Ou=typeof Zp.oninput=="function"),Lu=Ou):Lu=!1,rS=Lu&&(!document.documentMode||9<document.documentMode));var Lu,Ou,Zp;function hy(){Ol&&(Ol.detachEvent("onpropertychange",oS),Zl=Ol=null)}function oS(e){if(e.propertyName==="value"&&qh(Zl)){var t=[];aS(t,Zl,e,Ug(e)),tS(OA,t)}}function IA(e,t,n){e==="focusin"?(hy(),Ol=t,Zl=n,Ol.attachEvent("onpropertychange",oS)):e==="focusout"&&hy()}function PA(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return qh(Zl)}function BA(e,t){if(e==="click")return qh(t)}function zA(e,t){if(e==="input"||e==="change")return qh(t)}function FA(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var ni=typeof Object.is=="function"?Object.is:FA;function Jl(e,t){if(ni(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),i=Object.keys(t);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var s=n[i];if(!Tm.call(t,s)||!ni(e[s],t[s]))return!1}return!0}function Nm(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function fy(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function dy(e,t){var n=fy(e);e=0;for(var i;n;){if(n.nodeType===3){if(i=e+n.textContent.length,e<=t&&i>=t)return{node:n,offset:t-e};e=i}t:{for(;n;){if(n.nextSibling){n=n.nextSibling;break t}n=n.parentNode}n=void 0}n=fy(n)}}function lS(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?lS(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function cS(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Nm(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Nm(e.document)}return t}function Pg(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var HA=Es&&"documentMode"in document&&11>=document.documentMode,Jr=null,Dm=null,Il=null,Um=!1;function py(e,t,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Um||Jr==null||Jr!==Nm(i)||(i=Jr,"selectionStart"in i&&Pg(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),Il&&Jl(Il,i)||(Il=i,i=Fh(Dm,"onSelect"),0<i.length&&(t=new Xh("onSelect","select",null,t,n),e.push({event:t,listeners:i}),t.target=Jr)))}function ka(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Kr={animationend:ka("Animation","AnimationEnd"),animationiteration:ka("Animation","AnimationIteration"),animationstart:ka("Animation","AnimationStart"),transitionrun:ka("Transition","TransitionRun"),transitionstart:ka("Transition","TransitionStart"),transitioncancel:ka("Transition","TransitionCancel"),transitionend:ka("Transition","TransitionEnd")},Jp={},uS={};Es&&(uS=document.createElement("div").style,"AnimationEvent"in window||(delete Kr.animationend.animation,delete Kr.animationiteration.animation,delete Kr.animationstart.animation),"TransitionEvent"in window||delete Kr.transitionend.transition);function hr(e){if(Jp[e])return Jp[e];if(!Kr[e])return e;var t=Kr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in uS)return Jp[e]=t[n];return e}var hS=hr("animationend"),fS=hr("animationiteration"),dS=hr("animationstart"),VA=hr("transitionrun"),GA=hr("transitionstart"),kA=hr("transitioncancel"),pS=hr("transitionend"),mS=new Map,Lm="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");Lm.push("scrollEnd");function Li(e,t){mS.set(e,t),ur(t,[e])}var XA=0;function Ts(e,t){if(e.name!=null&&e.name!=="auto")return e.name;if(t.autoName!==null)return t.autoName;e=Ui.identifierPrefix;var n=XA++;return e="_"+e+"t_"+n.toString(32)+"_",t.autoName=e}function my(e){if(e==null||typeof e=="string")return e;var t=null,n=ho;if(n!==null)for(var i=0;i<n.length;i++){var s=e[n[i]];if(s!=null){if(s==="none")return"none";t=t==null?s:t+(" "+s)}}return t??e.default}function Ds(e,t){return e=my(e),t=my(t),t==null?e==="auto"?null:e:t==="auto"?null:t}var vh=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},pi=[],Qr=0,Bg=0;function Yh(){for(var e=Qr,t=Bg=Qr=0;t<e;){var n=pi[t];pi[t++]=null;var i=pi[t];pi[t++]=null;var s=pi[t];pi[t++]=null;var a=pi[t];if(pi[t++]=null,i!==null&&s!==null){var r=i.pending;r===null?s.next=s:(s.next=r.next,r.next=s),i.pending=s}a!==0&&gS(n,s,a)}}function Zh(e,t,n,i){pi[Qr++]=e,pi[Qr++]=t,pi[Qr++]=n,pi[Qr++]=i,Bg|=i,e.lanes|=i,e=e.alternate,e!==null&&(e.lanes|=i)}function zg(e,t,n,i){return Zh(e,t,n,i),yh(e)}function fr(e,t){return Zh(e,null,null,t),yh(e)}function gS(e,t,n){e.lanes|=n;var i=e.alternate;i!==null&&(i.lanes|=n);for(var s=!1,a=e.return;a!==null;)a.childLanes|=n,i=a.alternate,i!==null&&(i.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(s=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,s&&t!==null&&(s=31-ti(n),e=a.hiddenUpdates,i=e[s],i===null?e[s]=[t]:i.push(t),t.lane=n|536870912),a):null}function yh(e){if(50<Wl)throw Wl=0,oh=null,Error(nt(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var jr={};function WA(e,t,n,i){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Bn(e,t,n,i){return new WA(e,t,n,i)}function Fg(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Ms(e,t){var n=e.alternate;return n===null?(n=Bn(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&1206910976,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function _S(e,t){e.flags&=1206910978;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function ju(e,t,n,i,s,a){var r=0;if(i=e,typeof i=="function")Fg(i)&&(r=1);else if(typeof i=="string")r=_C(e,n,ns.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(i){case xm:return e=Bn(31,n,t,s),e.elementType=xm,e.lanes=a,e;case Wr:return Qa(n.children,s,a,t);case Ox:r=8,s|=24;break;case _m:return e=Bn(12,n,t,s|2),e.elementType=_m,e.lanes=a,e;case vm:return e=Bn(13,n,t,s),e.elementType=vm,e.lanes=a,e;case ym:return e=Bn(19,n,t,s),e.elementType=ym,e.lanes=a,e;case UT:case Sm:return e=s|32,e=Bn(30,n,t,e),e.elementType=Sm,e.lanes=a,e.stateNode={autoName:null,paired:null,clones:null,ref:null},e;default:if(typeof i=="object"&&i!==null)switch(i.$$typeof){case ji:r=10;break t;case Ix:r=9;break t;case Ag:r=11;break t;case wg:r=14;break t;case $s:r=16,i=null;break t}r=29,n=Error(nt(130,e===null?"null":typeof e,"")),i=null}return t=Bn(r,n,t,s),t.elementType=e,t.type=i,t.lanes=a,t}function Qa(e,t,n,i){return e=Bn(7,e,i,t),e.lanes=n,e}function Kp(e,t,n){return e=Bn(6,e,null,t),e.lanes=n,e}function vS(e){var t=Bn(18,null,null,0);return t.stateNode=e,t}function Qp(e,t,n){return t=Bn(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var gy=new WeakMap;function vi(e,t){if(typeof e=="object"&&e!==null){var n=gy.get(e);return n!==void 0?n:(t={value:e,source:t,stack:Zv(t)},gy.set(e,t),t)}return{value:e,source:t,stack:Zv(t)}}var $r=[],to=0,xh=null,Kl=0,mi=[],gi=0,va=null,ts=1,es="";function xs(e,t){$r[to++]=Kl,$r[to++]=xh,xh=e,Kl=t}function yS(e,t,n){mi[gi++]=ts,mi[gi++]=es,mi[gi++]=va,va=e;var i=ts;e=es;var s=32-ti(i)-1;i&=~(1<<s),n+=1;var a=32-ti(t)+s;if(30<a){var r=s-s%5;a=(i&(1<<r)-1).toString(32),i>>=r,s-=r,ts=1<<32-ti(t)+s|n<<s|i,es=a+e}else ts=1<<a|n<<s|i,es=e}function Jh(e){e.return!==null&&(xs(e,1),yS(e,1,0))}function Hg(e){for(;e===xh;)xh=$r[--to],$r[to]=null,Kl=$r[--to],$r[to]=null;for(;e===va;)va=mi[--gi],mi[gi]=null,es=mi[--gi],mi[gi]=null,ts=mi[--gi],mi[gi]=null}function xS(e,t){mi[gi++]=ts,mi[gi++]=es,mi[gi++]=va,ts=t.id,es=t.overflow,va=e}var on=null,Le=null,$t=!1,ca=null,yi=!1,Om=Error(nt(519));function ya(e){var t=Error(nt(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Ql(vi(t,e)),Om}function _y(e){var t=e.stateNode,n=e.type,i=e.memoizedProps;switch(t[hn]=e,t[Hn]=i,n){case"dialog":se("cancel",t),se("close",t);break;case"iframe":case"object":case"embed":se("load",t);break;case"video":case"audio":for(n=0;n<ec.length;n++)se(ec[n],t);break;case"source":se("error",t);break;case"img":case"image":case"link":se("error",t),se("load",t);break;case"details":se("toggle",t);break;case"input":se("invalid",t),Kx(t,i.value,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name,!0);break;case"select":se("invalid",t);break;case"textarea":se("invalid",t),jx(t,i.value,i.defaultValue,i.children)}n=i.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||t.textContent===""+n||i.suppressHydrationWarning===!0||nb(t.textContent,n)?(i.popover!=null&&(se("beforetoggle",t),se("toggle",t)),i.onScroll!=null&&se("scroll",t),i.onScrollEnd!=null&&se("scrollend",t),i.onClick!=null&&(t.onclick=$i),t=!0):t=!1,t||ya(e,!0)}function Sh(e){for(on=e.return;on;)switch(on.tag){case 5:case 31:case 13:yi=!1;return;case 27:case 3:yi=!0;return;default:on=on.return}}function Fr(e){if(e!==on)return!1;if(!$t)return Sh(e),$t=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=!(n!=="form"&&n!=="button")||vg(e.type,e.memoizedProps)),n=!n),n&&Le&&ya(e),Sh(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(nt(317));Le=dx(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(nt(317));Le=dx(e)}else t===27?(t=Le,Ea(e.type)?(e=Mg,Mg=null,Le=e):Le=t):Le=on?xi(e.stateNode.nextSibling):null;return!0}function er(){Le=on=null,$t=!1}function jp(){var e=ca;return e!==null&&(In===null?In=e:In.push.apply(In,e),ca=null),e}function Ql(e){ca===null?ca=[e]:ca.push(e)}var Im=as(null),dr=null,Ss=null;function sa(e,t,n){Oe(Im,t._currentValue),t._currentValue=n}function bs(e){e._currentValue=Im.current,dn(Im)}function $u(e,t,n){for(;e!==null;){var i=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,i!==null&&(i.childLanes|=t)):i!==null&&(i.childLanes&t)!==t&&(i.childLanes|=t),e===n)break;e=e.return}}function Pm(e,t,n,i){var s=e.child;for(s!==null&&(s.return=e);s!==null;){var a=s.dependencies;if(a!==null){var r=s.child;a=a.firstContext;t:for(;a!==null;){var o=a;a=s;for(var l=0;l<t.length;l++)if(o.context===t[l]){a.lanes|=n,o=a.alternate,o!==null&&(o.lanes|=n),$u(a.return,n,e),i||(r=null);break t}a=o.next}}else if(s.tag===18){if(r=s.return,r===null)throw Error(nt(341));r.lanes|=n,a=r.alternate,a!==null&&(a.lanes|=n),$u(r,n,e),r=null}else s.tag===13&&s.memoizedState!==null&&s.memoizedState.dehydrated===null?(s.lanes|=n,r=s.alternate,r!==null&&(r.lanes|=n),$u(s.return,n,e),r=s.child,r=r!==null?r.sibling:null):r=s.child;if(r!==null)r.return=s;else for(r=s;r!==null;){if(r===e){r=null;break}if(s=r.sibling,s!==null){s.return=r.return,r=s;break}r=r.return}s=r}}function nr(e,t,n,i){e=null;for(var s=t,a=!1;s!==null;){if(!a){if(s.flags&524288)a=!0;else if(s.flags&262144)break}if(s.tag===10){var r=s.alternate;if(r===null)throw Error(nt(387));if(r=r.memoizedProps,r!==null){var o=s.type;ni(s.pendingProps.value,r.value)||(e!==null?e.push(o):e=[o])}}else if(s===dh.current){if(r=s.alternate,r===null)throw Error(nt(387));r.memoizedState.memoizedState!==s.memoizedState.memoizedState&&(e!==null?e.push(bo):e=[bo])}s=s.return}return e!==null&&Pm(t,e,n,i),t.flags|=262144,e!==null}function Mh(e){for(e=e.firstContext;e!==null;){if(!ni(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function ir(e){dr=e,Ss=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function fn(e){return SS(dr,e)}function Iu(e,t){return dr===null&&ir(e),SS(e,t)}function SS(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},Ss===null){if(e===null)throw Error(nt(308));Ss=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Ss=Ss.next=t;return n}var qA=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(n,i){e.push(i)}};this.abort=function(){t.aborted=!0,e.forEach(function(n){return n()})}},YA=tn.unstable_scheduleCallback,ZA=tn.unstable_NormalPriority,Je={$$typeof:ji,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Vg(){return{controller:new qA,data:new Map,refCount:0}}function pc(e){e.refCount--,e.refCount===0&&YA(ZA,function(){e.controller.abort()})}function vy(e,t){if(e.pendingLanes&4194048){var n=e.transitionTypes;for(n===null&&(n=e.transitionTypes=[]),e=0;e<t.length;e++){var i=t[e];n.indexOf(i)===-1&&n.push(i)}}}var Dl=null;function JA(e){var t=e.transitionTypes;return e.transitionTypes=null,t}var Pl=null,Bm=0,sr=0,ao=null;function KA(e,t){if(Pl===null){var n=Pl=[];Bm=0,sr=m0(),ao={status:"pending",value:void 0,then:function(i){n.push(i)}}}return Bm++,t.then(yy,yy),t}function yy(){if(--Bm===0&&(Dl=null,Pl!==null)){ao!==null&&(ao.status="fulfilled");var e=Pl;Pl=null,sr=0,ao=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function QA(e,t){var n=[],i={status:"pending",value:null,reason:null,then:function(s){n.push(s)}};return e.then(function(){i.status="fulfilled",i.value=t;for(var s=0;s<n.length;s++)(0,n[s])(t)},function(s){for(i.status="rejected",i.reason=s,s=0;s<n.length;s++)(0,n[s])(void 0)}),i}var xy=Gt.S;Gt.S=function(e,t){if(FM=jn(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&KA(e,t),Dl!==null)for(var n=xo;n!==null;)vy(n,Dl),n=n.next;if(n=e.types,n!==null){for(var i=xo;i!==null;)vy(i,n),i=i.next;if(sr!==0){i=Dl,i===null&&(i=Dl=[]);for(var s=0;s<n.length;s++){var a=n[s];i.indexOf(a)===-1&&i.push(a)}}}xy!==null&&xy(e,t)};var ja=as(null);function Gg(){var e=ja.current;return e!==null?e:we.pooledCache}function th(e,t){t===null?Oe(ja,ja.current):Oe(ja,t.pool)}function MS(){var e=Gg();return e===null?null:{parent:Je._currentValue,pool:e}}var Co=Error(nt(460)),kg=Error(nt(474)),Kh=Error(nt(542)),bh={then:function(){}};function Sy(e){return e=e.status,e==="fulfilled"||e==="rejected"}function bS(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then($i,$i),t=n),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,by(e),e===void 0&&!("reason"in t)?Error(nt(600)):e;default:if(typeof t.status=="string")t.then($i,$i);else{if(e=we,e!==null&&100<e.shellSuspendCounter)throw Error(nt(482));e=t,e.status="pending",e.then(function(i){if(t.status==="pending"){var s=t;s.status="fulfilled",s.value=i}},function(i){if(t.status==="pending"){var s=t;s.status="rejected",s.reason=i}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,by(e),e}throw $a=t,Co}}function qa(e){try{var t=e._init;return t(e._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?($a=n,Co):n}}var $a=null;function My(){if($a===null)throw Error(nt(459));var e=$a;return $a=null,e}function by(e){if(e===Co||e===Kh)throw Error(nt(483))}var ro=null,jl=0;function Pu(e){var t=jl;return jl+=1,ro===null&&(ro=[]),bS(ro,e,t)}function Ks(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function Bu(e,t){throw t.$$typeof===DT?Error(nt(525)):(e=Object.prototype.toString.call(t),Error(nt(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function ES(e){function t(f,v){if(e){var y=f.deletions;y===null?(f.deletions=[v],f.flags|=16):y.push(v)}}function n(f,v){if(!e)return null;for(;v!==null;)t(f,v),v=v.sibling;return null}function i(f){for(var v=new Map;f!==null;)f.key===null?v.set(f.index,f):v.set(f.key,f),f=f.sibling;return v}function s(f,v){return f=Ms(f,v),f.index=0,f.sibling=null,f}function a(f,v,y){return f.index=y,e?(y=f.alternate,y!==null?(y=y.index,y<v?(f.flags|=2,v):y):(f.flags|=134217730,v)):(f.flags|=1048576,v)}function r(f){return e&&f.alternate===null&&(f.flags|=134217730),f}function o(f,v,y,m){return v===null||v.tag!==6?(v=Kp(y,f.mode,m),v.return=f,v):(v=s(v,y),v.return=f,v)}function l(f,v,y,m){var M=y.type;return M===Wr?(f=h(f,v,y.props.children,m,y.key),Ks(f,y),f):v!==null&&(v.elementType===M||typeof M=="object"&&M!==null&&M.$$typeof===$s&&qa(M)===v.type)?(v=s(v,y.props),Ks(v,y),v.return=f,v):(v=ju(y.type,y.key,y.props,null,f.mode,m),Ks(v,y),v.return=f,v)}function c(f,v,y,m){return v===null||v.tag!==4||v.stateNode.containerInfo!==y.containerInfo||v.stateNode.implementation!==y.implementation?(v=Qp(y,f.mode,m),v.return=f,v):(v=s(v,y.children||[]),v.return=f,v)}function h(f,v,y,m,M){return v===null||v.tag!==7?(v=Qa(y,f.mode,m,M),v.return=f,v):(v=s(v,y),v.return=f,v)}function p(f,v,y){if(typeof v=="string"&&v!==""||typeof v=="number"||typeof v=="bigint")return v=Kp(""+v,f.mode,y),v.return=f,v;if(typeof v=="object"&&v!==null){switch(v.$$typeof){case wu:return y=ju(v.type,v.key,v.props,null,f.mode,y),Ks(y,v),y.return=f,y;case Cl:return v=Qp(v,f.mode,y),v.return=f,v;case $s:return v=qa(v),p(f,v,y)}if(Rl(v)||Ml(v))return v=Qa(v,f.mode,y,null),v.return=f,v;if(typeof v.then=="function")return p(f,Pu(v),y);if(v.$$typeof===ji)return p(f,Iu(f,v),y);Bu(f,v)}return null}function u(f,v,y,m){var M=v!==null?v.key:null;if(typeof y=="string"&&y!==""||typeof y=="number"||typeof y=="bigint")return M!==null?null:o(f,v,""+y,m);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case wu:return y.key===M?l(f,v,y,m):null;case Cl:return y.key===M?c(f,v,y,m):null;case $s:return y=qa(y),u(f,v,y,m)}if(Rl(y)||Ml(y))return M!==null?null:h(f,v,y,m,null);if(typeof y.then=="function")return u(f,v,Pu(y),m);if(y.$$typeof===ji)return u(f,v,Iu(f,y),m);Bu(f,y)}return null}function d(f,v,y,m,M){if(typeof m=="string"&&m!==""||typeof m=="number"||typeof m=="bigint")return f=f.get(y)||null,o(v,f,""+m,M);if(typeof m=="object"&&m!==null){switch(m.$$typeof){case wu:return f=f.get(m.key===null?y:m.key)||null,l(v,f,m,M);case Cl:return f=f.get(m.key===null?y:m.key)||null,c(v,f,m,M);case $s:return m=qa(m),d(f,v,y,m,M)}if(Rl(m)||Ml(m))return f=f.get(y)||null,h(v,f,m,M,null);if(typeof m.then=="function")return d(f,v,y,Pu(m),M);if(m.$$typeof===ji)return d(f,v,y,Iu(v,m),M);Bu(v,m)}return null}function g(f,v,y,m){for(var M=null,E=null,w=v,x=v=0,A=null;w!==null&&x<y.length;x++){w.index>x?(A=w,w=null):A=w.sibling;var R=u(f,w,y[x],m);if(R===null){w===null&&(w=A);break}e&&w&&R.alternate===null&&t(f,w),v=a(R,v,x),E===null?M=R:E.sibling=R,E=R,w=A}if(x===y.length)return n(f,w),$t&&xs(f,x),M;if(w===null){for(;x<y.length;x++)w=p(f,y[x],m),w!==null&&(v=a(w,v,x),E===null?M=w:E.sibling=w,E=w);return $t&&xs(f,x),M}for(w=i(w);x<y.length;x++)A=d(w,f,x,y[x],m),A!==null&&(e&&(R=A.alternate,R!==null&&w.delete(R.key===null?x:R.key)),v=a(A,v,x),E===null?M=A:E.sibling=A,E=A);return e&&w.forEach(function(U){return t(f,U)}),$t&&xs(f,x),M}function b(f,v,y,m){if(y==null)throw Error(nt(151));for(var M=null,E=null,w=v,x=v=0,A=null,R=y.next();w!==null&&!R.done;x++,R=y.next()){w.index>x?(A=w,w=null):A=w.sibling;var U=u(f,w,R.value,m);if(U===null){w===null&&(w=A);break}e&&w&&U.alternate===null&&t(f,w),v=a(U,v,x),E===null?M=U:E.sibling=U,E=U,w=A}if(R.done)return n(f,w),$t&&xs(f,x),M;if(w===null){for(;!R.done;x++,R=y.next())R=p(f,R.value,m),R!==null&&(v=a(R,v,x),E===null?M=R:E.sibling=R,E=R);return $t&&xs(f,x),M}for(w=i(w);!R.done;x++,R=y.next())R=d(w,f,x,R.value,m),R!==null&&(e&&(A=R.alternate,A!==null&&w.delete(A.key===null?x:A.key)),v=a(R,v,x),E===null?M=R:E.sibling=R,E=R);return e&&w.forEach(function(B){return t(f,B)}),$t&&xs(f,x),M}function _(f,v,y,m){if(typeof y=="object"&&y!==null&&y.type===Wr&&y.key===null&&y.props.ref===void 0&&(y=y.props.children),typeof y=="object"&&y!==null){switch(y.$$typeof){case wu:t:{for(var M=y.key;v!==null;){if(v.key===M){if(M=y.type,M===Wr){if(v.tag===7){n(f,v.sibling),m=s(v,y.props.children),Ks(m,y),m.return=f,f=m;break t}}else if(v.elementType===M||typeof M=="object"&&M!==null&&M.$$typeof===$s&&qa(M)===v.type){n(f,v.sibling),m=s(v,y.props),Ks(m,y),m.return=f,f=m;break t}n(f,v);break}else t(f,v);v=v.sibling}y.type===Wr?(m=Qa(y.props.children,f.mode,m,y.key),Ks(m,y),m.return=f,f=m):(m=ju(y.type,y.key,y.props,null,f.mode,m),Ks(m,y),m.return=f,f=m)}return r(f);case Cl:t:{for(M=y.key;v!==null;){if(v.key===M)if(v.tag===4&&v.stateNode.containerInfo===y.containerInfo&&v.stateNode.implementation===y.implementation){n(f,v.sibling),m=s(v,y.children||[]),m.return=f,f=m;break t}else{n(f,v);break}else t(f,v);v=v.sibling}m=Qp(y,f.mode,m),m.return=f,f=m}return r(f);case $s:return y=qa(y),_(f,v,y,m)}if(Rl(y))return g(f,v,y,m);if(Ml(y)){if(M=Ml(y),typeof M!="function")throw Error(nt(150));return y=M.call(y),b(f,v,y,m)}if(typeof y.then=="function")return _(f,v,Pu(y),m);if(y.$$typeof===ji)return _(f,v,Iu(f,y),m);Bu(f,y)}return typeof y=="string"&&y!==""||typeof y=="number"||typeof y=="bigint"?(y=""+y,v!==null&&v.tag===6?(n(f,v.sibling),m=s(v,y),m.return=f,f=m):(n(f,v),m=Kp(y,f.mode,m),m.return=f,f=m),r(f)):n(f,v)}return function(f,v,y,m){try{jl=0;var M=_(f,v,y,m);return ro=null,M}catch(w){if(w===Co||w===Kh)throw w;var E=Bn(29,w,null,f.mode);return E.lanes=m,E.return=f,E}finally{}}}var ar=ES(!0),TS=ES(!1),ta=!1;function Xg(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function zm(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function ua(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function ha(e,t,n){var i=e.updateQueue;if(i===null)return null;if(i=i.shared,pe&2){var s=i.pending;return s===null?t.next=t:(t.next=s.next,s.next=t),i.pending=t,t=yh(e),gS(e,null,n),t}return Zh(e,i,t,n),yh(e)}function Bl(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194048)!==0)){var i=t.lanes;i&=e.pendingLanes,n|=i,t.lanes=n,Gx(e,n)}}function $p(e,t){var n=e.updateQueue,i=e.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var s=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var r={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?s=a=r:a=a.next=r,n=n.next}while(n!==null);a===null?s=a=t:a=a.next=t}else s=a=t;n={baseState:i.baseState,firstBaseUpdate:s,lastBaseUpdate:a,shared:i.shared,callbacks:i.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var Fm=!1;function zl(){if(Fm){var e=ao;if(e!==null)throw e}}function Fl(e,t,n,i){Fm=!1;var s=e.updateQueue;ta=!1;var a=s.firstBaseUpdate,r=s.lastBaseUpdate,o=s.shared.pending;if(o!==null){s.shared.pending=null;var l=o,c=l.next;l.next=null,r===null?a=c:r.next=c,r=l;var h=e.alternate;h!==null&&(h=h.updateQueue,o=h.lastBaseUpdate,o!==r&&(o===null?h.firstBaseUpdate=c:o.next=c,h.lastBaseUpdate=l))}if(a!==null){var p=s.baseState;r=0,h=c=l=null,o=a;do{var u=o.lane&-536870913,d=u!==o.lane;if(d?(re&u)===u:(i&u)===u){u!==0&&u===sr&&(Fm=!0),h!==null&&(h=h.next={lane:0,tag:o.tag,payload:o.payload,callback:null,next:null});t:{var g=e,b=o;u=t;var _=n;switch(b.tag){case 1:if(g=b.payload,typeof g=="function"){p=g.call(_,p,u);break t}p=g;break t;case 3:g.flags=g.flags&-65537|128;case 0:if(g=b.payload,u=typeof g=="function"?g.call(_,p,u):g,u==null)break t;p=Ce({},p,u);break t;case 2:ta=!0}}u=o.callback,u!==null&&(e.flags|=64,d&&(e.flags|=8192),d=s.callbacks,d===null?s.callbacks=[u]:d.push(u))}else d={lane:u,tag:o.tag,payload:o.payload,callback:o.callback,next:null},h===null?(c=h=d,l=p):h=h.next=d,r|=u;if(o=o.next,o===null){if(o=s.shared.pending,o===null)break;d=o,o=d.next,d.next=null,s.lastBaseUpdate=d,s.shared.pending=null}}while(!0);h===null&&(l=p),s.baseState=l,s.firstBaseUpdate=c,s.lastBaseUpdate=h,a===null&&(s.shared.lanes=0),Ma|=r,e.lanes=r,e.memoizedState=p}}function AS(e,t){if(typeof e!="function")throw Error(nt(191,e));e.call(t)}function wS(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)AS(n[e],t)}var xa=as(null),Eh=as(0);function Ey(e,t){e=Rs,Oe(Eh,e),Oe(xa,t),Rs=e|t.baseLanes}function Hm(){Oe(Eh,Rs),Oe(xa,xa.current)}function Wg(){Rs=Eh.current,dn(xa),dn(Eh)}var gn=as(null),Sn=null;function fa(e){var t=e.alternate;Oe(pn,pn.current&1),Oe(gn,e),Sn===null&&(t===null||xa.current!==null||t.memoizedState!==null)&&(Sn=e)}function Vm(e){Oe(pn,pn.current),Oe(gn,e),Sn===null&&(Sn=e)}function CS(e){e.tag===22?(Oe(pn,pn.current),Oe(gn,e),Sn===null&&(Sn=e)):da()}function da(){Oe(pn,pn.current),Oe(gn,gn.current)}function Jn(e){dn(gn),Sn===e&&(Sn=null),dn(pn)}var pn=as(0);function $l(e,t){Oe(gn,gn.current),Oe(pn,t)}function qg(e){dn(pn),dn(gn),Sn===e&&(Sn=null)}function Th(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||Sg(n)||y0(n)))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!=="independent"){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var As=0,Jt=null,Te=null,Ze=null,Ah=!1,oo=!1,rr=!1,wh=0,tc=0,lo=null,jA=0;function ke(){throw Error(nt(321))}function Yg(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!ni(e[n],t[n]))return!1;return!0}function Zg(e,t,n,i,s,a){return As=a,Jt=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Gt.H=e===null||e.memoizedState===null?aM:rM,rr=!1,a=n(i,s),rr=!1,oo&&(a=NS(t,n,i,s)),RS(e),a}function RS(e){Gt.H=Ch;var t=Te!==null&&Te.next!==null;if(As=0,Ze=Te=Jt=null,Ah=!1,tc=0,lo=null,t)throw Error(nt(300));e===null||Ke||(e=e.dependencies,e!==null&&Mh(e)&&(Ke=!0))}function NS(e,t,n,i){Jt=e;var s=0;do{if(oo&&(lo=null),tc=0,oo=!1,25<=s)throw Error(nt(301));if(s+=1,Ze=Te=null,e.updateQueue!=null){var a=e.updateQueue;a.lastEffect=null,a.events=null,a.stores=null,a.memoCache!=null&&(a.memoCache.index=0)}Gt.H=rw,a=t(n,i)}while(oo);return a}function $A(){var e=Gt.H,t=e.useState()[0];return t=typeof t.then=="function"?mc(t):t,e=e.useState()[0],(Te!==null?Te.memoizedState:null)!==e&&(Jt.flags|=1024),t}function Jg(){var e=wh!==0;return wh=0,e}function Kg(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function Qg(e){if(Ah){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}Ah=!1}As=0,Ze=Te=Jt=null,oo=!1,tc=wh=0,lo=null}function Nn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Ze===null?Jt.memoizedState=Ze=e:Ze=Ze.next=e,Ze}function qe(){if(Te===null){var e=Jt.alternate;e=e!==null?e.memoizedState:null}else e=Te.next;var t=Ze===null?Jt.memoizedState:Ze.next;if(t!==null)Ze=t,Te=e;else{if(e===null)throw Jt.alternate===null?Error(nt(467)):Error(nt(310));Te=e,e={memoizedState:Te.memoizedState,baseState:Te.baseState,baseQueue:Te.baseQueue,queue:Te.queue,next:null},Ze===null?Jt.memoizedState=Ze=e:Ze=Ze.next=e}return Ze}function Qh(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function mc(e){var t=tc;return tc+=1,lo===null&&(lo=[]),e=bS(lo,e,t),t=Jt,(Ze===null?t.memoizedState:Ze.next)===null&&(t=t.alternate,Gt.H=t===null||t.memoizedState===null?aM:rM),e}function jh(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return mc(e);if(e.$$typeof===OT)return;if(e.$$typeof===ji)return fn(e)}throw Error(nt(438,String(e)))}function jg(e){var t=null,n=Jt.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var i=Jt.alternate;i!==null&&(i=i.updateQueue,i!==null&&(i=i.memoCache,i!=null&&(t={data:i.data.map(function(s){return s.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),n===null&&(n=Qh(),Jt.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),i=0;i<e;i++)n[i]=LT;return t.index++,n}function ws(e,t){return typeof t=="function"?t(e):t}function eh(e){var t=qe();return $g(t,Te,e)}function $g(e,t,n){var i=e.queue;if(i===null)throw Error(nt(311));i.lastRenderedReducer=n;var s=e.baseQueue,a=i.pending;if(a!==null){if(s!==null){var r=s.next;s.next=a.next,a.next=r}t.baseQueue=s=a,i.pending=null}if(a=e.baseState,s===null)e.memoizedState=a;else{t=s.next;var o=r=null,l=null,c=t,h=!1;do{var p=c.lane&-536870913;if(p!==c.lane?(re&p)===p:(As&p)===p){var u=c.revertLane;if(u===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),p===sr&&(h=!0);else if((As&u)===u){c=c.next,u===sr&&(h=!0);continue}else p={lane:0,revertLane:c.revertLane,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},l===null?(o=l=p,r=a):l=l.next=p,Jt.lanes|=u,Ma|=u;p=c.action,rr&&n(a,p),a=c.hasEagerState?c.eagerState:n(a,p)}else u={lane:p,revertLane:c.revertLane,gesture:c.gesture,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},l===null?(o=l=u,r=a):l=l.next=u,Jt.lanes|=p,Ma|=p;c=c.next}while(c!==null&&c!==t);if(l===null?r=a:l.next=o,!ni(a,e.memoizedState)&&(Ke=!0,h&&(n=ao,n!==null)))throw n;e.memoizedState=a,e.baseState=r,e.baseQueue=l,i.lastRenderedState=a}return s===null&&(i.lanes=0),[e.memoizedState,i.dispatch]}function tm(e){var t=qe(),n=t.queue;if(n===null)throw Error(nt(311));n.lastRenderedReducer=e;var i=n.dispatch,s=n.pending,a=t.memoizedState;if(s!==null){n.pending=null;var r=s=s.next;do a=e(a,r.action),r=r.next;while(r!==s);ni(a,t.memoizedState)||(Ke=!0),t.memoizedState=a,t.baseQueue===null&&(t.baseState=a),n.lastRenderedState=a}return[a,i]}function DS(e,t,n){var i=Jt,s=qe(),a=$t;if(a){if(n===void 0)throw Error(nt(407));n=n()}else n=t();var r=!ni((Te||s).memoizedState,n);if(r&&(s.memoizedState=n,Ke=!0),s=s.queue,t0(OS.bind(null,i,s,e),[e]),e=s.getSnapshot!==t||r||Ze!==null&&(Ze.memoizedState.tag&1)!==0,go(e?9:8,{destroy:void 0},LS.bind(null,i,s,n,t),null),e){if(i.flags|=2048,we===null)throw Error(nt(349));a||As&127||US(i,t,n)}return n}function US(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=Jt.updateQueue,t===null?(t=Qh(),Jt.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function LS(e,t,n,i){t.value=n,t.getSnapshot=i,IS(t)&&PS(e)}function OS(e,t,n){return n(function(){IS(t)&&PS(e)})}function IS(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!ni(e,n)}catch{return!0}}function PS(e){var t=fr(e,2);t!==null&&zn(t,e,2)}function Gm(e){var t=Nn();if(typeof e=="function"){var n=e;if(e=n(),rr){na(!0);try{n()}finally{na(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ws,lastRenderedState:e},t}function BS(e,t,n,i){return e.baseState=n,$g(e,Te,typeof i=="function"?i:ws)}function tw(e,t,n,i,s){if(tf(e))throw Error(nt(485));if(e=t.action,e!==null){var a={payload:s,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(r){a.listeners.push(r)}};Gt.T!==null?n(!0):a.isTransition=!1,i(a),n=t.pending,n===null?(a.next=t.pending=a,zS(t,a)):(a.next=n.next,t.pending=n.next=a)}}function zS(e,t){var n=t.action,i=t.payload,s=e.state;if(t.isTransition){var a=Gt.T,r={};r.types=a!==null?a.types:null,Gt.T=r;try{var o=n(s,i),l=Gt.S;l!==null&&l(r,o),Ty(e,t,o)}catch(c){km(e,t,c)}finally{a!==null&&r.types!==null&&(a.types=r.types),Gt.T=a}}else try{a=n(s,i),Ty(e,t,a)}catch(c){km(e,t,c)}}function Ty(e,t,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(i){Ay(e,t,i)},function(i){return km(e,t,i)}):Ay(e,t,n)}function Ay(e,t,n){t.status="fulfilled",t.value=n,FS(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,zS(e,n)))}function km(e,t,n){var i=e.pending;if(e.pending=null,i!==null){i=i.next;do t.status="rejected",t.reason=n,FS(t),t=t.next;while(t!==i)}e.action=null}function FS(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function HS(e,t){return t}function wy(e,t){if($t){var n=we.formState;if(n!==null){t:{var i=Jt;if($t){if(Le){e:{for(var s=Le,a=yi;s.nodeType!==8;){if(!a){s=null;break e}if(s=xi(s.nextSibling),s===null){s=null;break e}}a=s.data,s=a==="F!"||a==="F"?s:null}if(s){Le=xi(s.nextSibling),i=s.data==="F!";break t}}ya(i)}i=!1}i&&(t=n[0])}}return n=Nn(),n.memoizedState=n.baseState=t,i={pending:null,lanes:0,dispatch:null,lastRenderedReducer:HS,lastRenderedState:t},n.queue=i,n=nM.bind(null,Jt,i),i.dispatch=n,i=Gm(!1),a=s0.bind(null,Jt,!1,i.queue),i=Nn(),s={state:t,dispatch:null,action:e,pending:null},i.queue=s,n=tw.bind(null,Jt,s,a,n),s.dispatch=n,i.memoizedState=e,[t,n,!1]}function Cy(e){var t=qe();return VS(t,Te,e)}function VS(e,t,n){if(t=$g(e,t,HS)[0],e=eh(ws)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var i=mc(t)}catch(r){throw r===Co?Kh:r}else i=t;t=qe();var s=t.queue,a=s.dispatch;return n!==t.memoizedState&&(Jt.flags|=2048,go(9,{destroy:void 0},ew.bind(null,s,n),null)),[i,a,e]}function ew(e,t){e.action=t}function Ry(e){var t=qe(),n=Te;if(n!==null)return VS(t,n,e);qe(),t=t.memoizedState,n=qe();var i=n.queue.dispatch;return n.memoizedState=e,[t,i,!1]}function go(e,t,n,i){return e={tag:e,create:n,deps:i,inst:t,next:null},t=Jt.updateQueue,t===null&&(t=Qh(),Jt.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(i=n.next,n.next=e,e.next=i,t.lastEffect=e),e}function GS(){return qe().memoizedState}function nh(e,t,n,i){var s=Nn();Jt.flags|=e,s.memoizedState=go(1|t,{destroy:void 0},n,i===void 0?null:i)}function $h(e,t,n,i){var s=qe();i=i===void 0?null:i;var a=s.memoizedState.inst;Te!==null&&i!==null&&Yg(i,Te.memoizedState.deps)?s.memoizedState=go(t,a,n,i):(Jt.flags|=e,s.memoizedState=go(1|t,a,n,i))}function Ny(e,t){nh(8390656,8,e,t)}function t0(e,t){$h(2048,8,e,t)}function nw(e){Jt.flags|=4;var t=Jt.updateQueue;if(t===null)t=Qh(),Jt.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function kS(e){var t=qe().memoizedState;return nw({ref:t,nextImpl:e}),function(){if(pe&2)throw Error(nt(440));return t.impl.apply(void 0,arguments)}}function XS(e,t){return $h(4,2,e,t)}function WS(e,t){return $h(4,4,e,t)}function qS(e,t){if(typeof t=="function"){e=e();var n=t(e);return function(){typeof n=="function"?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function YS(e,t,n){n=n!=null?n.concat([e]):null,$h(4,4,qS.bind(null,t,e),n)}function e0(){}function ZS(e,t){var n=qe();t=t===void 0?null:t;var i=n.memoizedState;return t!==null&&Yg(t,i[1])?i[0]:(n.memoizedState=[e,t],e)}function JS(e,t){var n=qe();t=t===void 0?null:t;var i=n.memoizedState;if(t!==null&&Yg(t,i[1]))return i[0];if(i=e(),rr){na(!0);try{e()}finally{na(!1)}}return n.memoizedState=[i,t],i}function n0(e,t,n){return n===void 0||As&1073741824&&!(re&261930)?e.memoizedState=t:(e.memoizedState=n,e=VM(),Jt.lanes|=e,Ma|=e,n)}function KS(e,t,n,i){return ni(n,t)?n:xa.current!==null?(e=n0(e,n,i),ni(e,t)||(Ke=!0),e):!(As&106)||As&1073741824&&!(re&261930)?(Ke=!0,e.memoizedState=n):(e=VM(),Jt.lanes|=e,Ma|=e,t)}function QS(e,t,n,i,s){var a=me.p;me.p=a!==0&&8>a?a:8;var r=Gt.T,o={};o.types=r!==null?r.types:null,Gt.T=o,s0(e,!1,t,n);try{var l=s(),c=Gt.S;if(c!==null&&c(o,l),l!==null&&typeof l=="object"&&typeof l.then=="function"){var h=QA(l,i);Hl(e,t,h,ei(e))}else Hl(e,t,i,ei(e))}catch(p){Hl(e,t,{then:function(){},status:"rejected",reason:p},ei())}finally{me.p=a,r!==null&&o.types!==null&&(r.types=o.types),Gt.T=r}}function iw(){}function Xm(e,t,n,i){if(e.tag!==5)throw Error(nt(476));var s=jS(e).queue;QS(e,s,t,Ka,n===null?iw:function(){return $S(e),n(i)})}function jS(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:Ka,baseState:Ka,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ws,lastRenderedState:Ka},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ws,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function $S(e){var t=jS(e);t.next===null&&(t=e.alternate.memoizedState),Hl(e,t.next.queue,{},ei())}function i0(){return fn(bo)}function tM(){return qe().memoizedState}function eM(){return qe().memoizedState}function sw(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=ei();e=ua(n);var i=ha(t,e,n);i!==null&&(zn(i,t,n),Bl(i,t,n)),t={cache:Vg()},e.payload=t;return}t=t.return}}function aw(e,t,n){var i=ei();n={lane:i,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},tf(e)?iM(t,n):(n=zg(e,t,n,i),n!==null&&(zn(n,e,i),sM(n,t,i)))}function nM(e,t,n){var i=ei();Hl(e,t,n,i)}function Hl(e,t,n,i){var s={lane:i,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(tf(e))iM(t,s);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var r=t.lastRenderedState,o=a(r,n);if(s.hasEagerState=!0,s.eagerState=o,ni(o,r))return Zh(e,t,s,0),we===null&&Yh(),!1}catch{}finally{}if(n=zg(e,t,s,i),n!==null)return zn(n,e,i),sM(n,t,i),!0}return!1}function s0(e,t,n,i){if(i={lane:2,revertLane:m0(),gesture:null,action:i,hasEagerState:!1,eagerState:null,next:null},tf(e)){if(t)throw Error(nt(479))}else t=zg(e,n,i,2),t!==null&&zn(t,e,2)}function tf(e){var t=e.alternate;return e===Jt||t!==null&&t===Jt}function iM(e,t){oo=Ah=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function sM(e,t,n){if(n&4194048){var i=t.lanes;i&=e.pendingLanes,n|=i,t.lanes=n,Gx(e,n)}}var Ch={readContext:fn,use:jh,useCallback:ke,useContext:ke,useEffect:ke,useImperativeHandle:ke,useLayoutEffect:ke,useInsertionEffect:ke,useMemo:ke,useReducer:ke,useRef:ke,useState:ke,useDebugValue:ke,useDeferredValue:ke,useTransition:ke,useSyncExternalStore:ke,useId:ke,useHostTransitionStatus:ke,useFormState:ke,useActionState:ke,useOptimistic:ke,useMemoCache:ke,useCacheRefresh:ke,useEffectEvent:ke},aM={readContext:fn,use:jh,useCallback:function(e,t){return Nn().memoizedState=[e,t===void 0?null:t],e},useContext:fn,useEffect:Ny,useImperativeHandle:function(e,t,n){n=n!=null?n.concat([e]):null,nh(4194308,4,qS.bind(null,t,e),n)},useLayoutEffect:function(e,t){return nh(4194308,4,e,t)},useInsertionEffect:function(e,t){nh(4,2,e,t)},useMemo:function(e,t){var n=Nn();t=t===void 0?null:t;var i=e();if(rr){na(!0);try{e()}finally{na(!1)}}return n.memoizedState=[i,t],i},useReducer:function(e,t,n){var i=Nn();if(n!==void 0){var s=n(t);if(rr){na(!0);try{n(t)}finally{na(!1)}}}else s=t;return i.memoizedState=i.baseState=s,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:s},i.queue=e,e=e.dispatch=aw.bind(null,Jt,e),[i.memoizedState,e]},useRef:function(e){var t=Nn();return e={current:e},t.memoizedState=e},useState:function(e){e=Gm(e);var t=e.queue,n=nM.bind(null,Jt,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:e0,useDeferredValue:function(e,t){var n=Nn();return n0(n,e,t)},useTransition:function(){var e=Gm(!1);return e=QS.bind(null,Jt,e.queue,!0,!1),Nn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var i=Jt,s=Nn();if($t){if(n===void 0)throw Error(nt(407));n=n()}else{if(n=t(),we===null)throw Error(nt(349));re&127||US(i,t,n)}s.memoizedState=n;var a={value:n,getSnapshot:t};return s.queue=a,Ny(OS.bind(null,i,a,e),[e]),i.flags|=2048,go(9,{destroy:void 0},LS.bind(null,i,a,n,t),null),n},useId:function(){var e=Nn(),t=we.identifierPrefix;if($t){var n=es,i=ts;n=(i&~(1<<32-ti(i)-1)).toString(32)+n,t="_"+t+"R_"+n,n=wh++,0<n&&(t+="H"+n.toString(32)),t+="_"}else n=jA++,t="_"+t+"r_"+n.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:i0,useFormState:wy,useActionState:wy,useOptimistic:function(e){var t=Nn();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=s0.bind(null,Jt,!0,n),n.dispatch=t,[e,t]},useMemoCache:jg,useCacheRefresh:function(){return Nn().memoizedState=sw.bind(null,Jt)},useEffectEvent:function(e){var t=Nn(),n={impl:e};return t.memoizedState=n,function(){if(pe&2)throw Error(nt(440));return n.impl.apply(void 0,arguments)}}},rM={readContext:fn,use:jh,useCallback:ZS,useContext:fn,useEffect:t0,useImperativeHandle:YS,useInsertionEffect:XS,useLayoutEffect:WS,useMemo:JS,useReducer:eh,useRef:GS,useState:function(){return eh(ws)},useDebugValue:e0,useDeferredValue:function(e,t){var n=qe();return KS(n,Te.memoizedState,e,t)},useTransition:function(){var e=eh(ws)[0],t=qe().memoizedState;return[typeof e=="boolean"?e:mc(e),t]},useSyncExternalStore:DS,useId:tM,useHostTransitionStatus:i0,useFormState:Cy,useActionState:Cy,useOptimistic:function(e,t){var n=qe();return BS(n,Te,e,t)},useMemoCache:jg,useCacheRefresh:eM,useEffectEvent:kS},rw={readContext:fn,use:jh,useCallback:ZS,useContext:fn,useEffect:t0,useImperativeHandle:YS,useInsertionEffect:XS,useLayoutEffect:WS,useMemo:JS,useReducer:tm,useRef:GS,useState:function(){return tm(ws)},useDebugValue:e0,useDeferredValue:function(e,t){var n=qe();return Te===null?n0(n,e,t):KS(n,Te.memoizedState,e,t)},useTransition:function(){var e=tm(ws)[0],t=qe().memoizedState;return[typeof e=="boolean"?e:mc(e),t]},useSyncExternalStore:DS,useId:tM,useHostTransitionStatus:i0,useFormState:Ry,useActionState:Ry,useOptimistic:function(e,t){var n=qe();return Te!==null?BS(n,Te,e,t):(n.baseState=e,[e,n.queue.dispatch])},useMemoCache:jg,useCacheRefresh:eM,useEffectEvent:kS};function em(e,t,n,i){t=e.memoizedState,n=n(i,t),n=n==null?t:Ce({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Wm={enqueueSetState:function(e,t,n){e=e._reactInternals;var i=ei(),s=ua(i);s.payload=t,n!=null&&(s.callback=n),t=ha(e,s,i),t!==null&&(zn(t,e,i),Bl(t,e,i))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var i=ei(),s=ua(i);s.tag=1,s.payload=t,n!=null&&(s.callback=n),t=ha(e,s,i),t!==null&&(zn(t,e,i),Bl(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=ei(),i=ua(n);i.tag=2,t!=null&&(i.callback=t),t=ha(e,i,n),t!==null&&(zn(t,e,n),Bl(t,e,n))}};function Dy(e,t,n,i,s,a,r){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(i,a,r):t.prototype&&t.prototype.isPureReactComponent?!Jl(n,i)||!Jl(s,a):!0}function Uy(e,t,n,i){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,i),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,i),t.state!==e&&Wm.enqueueReplaceState(t,t.state,null)}function or(e,t){var n=t;if("ref"in t){n={};for(var i in t)i!=="ref"&&(n[i]=t[i])}if(e=e.defaultProps){n===t&&(n=Ce({},n));for(var s in e)n[s]===void 0&&(n[s]=e[s])}return n}function oM(e){vh(e)}function lM(e){console.error(e)}function cM(e){vh(e)}function Rh(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(i){setTimeout(function(){throw i})}}function Ly(e,t,n){try{var i=e.onCaughtError;i(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(s){setTimeout(function(){throw s})}}function qm(e,t,n){return n=ua(n),n.tag=3,n.payload={element:null},n.callback=function(){Rh(e,t)},n}function uM(e){return e=ua(e),e.tag=3,e}function hM(e,t,n,i){var s=n.type.getDerivedStateFromError;if(typeof s=="function"){var a=i.value;e.payload=function(){return s(a)},e.callback=function(){Ly(t,n,i)}}var r=n.stateNode;r!==null&&typeof r.componentDidCatch=="function"&&(e.callback=function(){Ly(t,n,i),typeof s!="function"&&(pa===null?pa=new Set([this]):pa.add(this));var o=i.stack;this.componentDidCatch(i.value,{componentStack:o!==null?o:""})})}function ow(e,t,n,i,s){if(n.flags|=32768,i!==null&&typeof i=="object"&&typeof i.then=="function"){if(t=n.alternate,t!==null&&nr(t,n,s,!0),n=gn.current,n!==null){switch(n.tag){case 31:case 13:case 19:return Sn===null?Bh():n.alternate===null&&Xe===0&&(Xe=3),n.flags&=-257,n.flags|=65536,n.lanes=s,i===bh?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([i]):t.add(i),lm(e,i,s)),!1;case 22:return n.flags|=65536,i===bh?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([i])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([i]):n.add(i)),lm(e,i,s)),!1}throw Error(nt(435,n.tag))}return lm(e,i,s),Bh(),!1}if($t)return t=gn.current,t!==null?(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=s,i!==Om&&(e=Error(nt(422),{cause:i}),Ql(vi(e,n)))):(i!==Om&&(t=Error(nt(423),{cause:i}),Ql(vi(t,n))),e=e.current.alternate,e.flags|=65536,s&=-s,e.lanes|=s,i=vi(i,n),s=qm(e.stateNode,i,s),$p(e,s),Xe!==4&&(Xe=2)),!1;var a=Error(nt(520),{cause:i});if(a=vi(a,n),Xl===null?Xl=[a]:Xl.push(a),Xe!==4&&(Xe=2),t===null)return!0;i=vi(i,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=s&-s,n.lanes|=e,e=qm(n.stateNode,i,e),$p(n,e),!1;case 1:if(t=n.type,a=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError=="function"||a!==null&&typeof a.componentDidCatch=="function"&&(pa===null||!pa.has(a))))return n.flags|=65536,s&=-s,n.lanes|=s,s=uM(s),hM(s,e,n,i),$p(n,s),!1;break;case 22:if(n.memoizedState!==null)return n.flags|=65536,!1}n=n.return}while(n!==null);return!1}var a0=Error(nt(461)),Ke=!1;function je(e,t,n,i){t.child=e===null?TS(t,null,n,i):ar(t,e.child,n,i)}function Oy(e,t,n,i,s){n=n.render;var a=t.ref;if("ref"in i){var r={};for(var o in i)o!=="ref"&&(r[o]=i[o])}else r=i;return ir(t),i=Zg(e,t,n,r,a,s),o=Jg(),e!==null&&!Ke?(Kg(e,t,s),Cs(e,t,s)):($t&&o&&Jh(t),t.flags|=1,je(e,t,i,s),t.child)}function Iy(e,t,n,i,s){if(e===null){var a=n.type;return typeof a=="function"&&!Fg(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,fM(e,t,a,i,s)):(e=ju(n.type,null,i,t,t.mode,s),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!o0(e,s)){var r=a.memoizedProps;if(n=n.compare,n=n!==null?n:Jl,n(r,i)&&e.ref===t.ref)return Cs(e,t,s)}return t.flags|=1,e=Ms(a,i),e.ref=t.ref,e.return=t,t.child=e}function fM(e,t,n,i,s){if(e!==null){var a=e.memoizedProps;if(Jl(a,i)&&e.ref===t.ref)if(Ke=!1,t.pendingProps=i=a,o0(e,s))e.flags&131072&&(Ke=!0);else return t.lanes=e.lanes,Cs(e,t,s)}return Ym(e,t,n,i,s)}function dM(e,t,n,i){var s=i.children,a=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.mode==="hidden"){if(t.flags&128){if(a=a!==null?a.baseLanes|n:n,e!==null){for(i=t.child=e.child,s=0;i!==null;)s=s|i.lanes|i.childLanes,i=i.sibling;i=s&~a}else i=0,t.child=null;return Py(e,t,a,n,i)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&th(t,a!==null?a.cachePool:null),a!==null?Ey(t,a):Hm(),CS(t);else return i=t.lanes=536870912,Py(e,t,a!==null?a.baseLanes|n:n,n,i)}else a!==null?(th(t,a.cachePool),Ey(t,a),da(),t.memoizedState=null):(e!==null&&th(t,null),Hm(),da());return je(e,t,s,n),t.child}function Vl(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function Py(e,t,n,i,s){var a=Gg();return a=a===null?null:{parent:Je._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&th(t,null),Hm(),CS(t),e!==null&&nr(e,t,i,!0),t.childLanes=s,null}function ih(e,t){return t=ef({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function By(e,t,n){return ar(t,e.child,null,n),e=ih(t,t.pendingProps),e.flags|=2,Jn(t),t.memoizedState=null,e}function lw(e,t,n){var i=t.pendingProps,s=(t.flags&128)!==0;if(t.flags&=-129,e===null){if($t){if(i.mode==="hidden")return e=ih(t,i),t.lanes=536870912,e.memoizedState={baseLanes:0,cachePool:null},Vl(null,e);if(Vm(t),(e=Le)?(e=db(e,yi),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:va!==null?{id:ts,overflow:es}:null,retryLane:536870912,hydrationErrors:null},n=vS(e),n.return=t,t.child=n,on=t,Le=null)):e=null,e===null)throw ya(t);return t.lanes=536870912,null}return ih(t,i)}var a=e.memoizedState;if(a!==null){var r=a.dehydrated;if(Vm(t),s)if(t.flags&256)t.flags&=-257,t=By(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(nt(558));else if(Ke||nr(e,t,n,!1),s=(n&e.childLanes)!==0,Ke||s){if(xa.current===null){if(i=we,i!==null&&(r=kx(i,n),r!==0&&r!==a.retryLane))throw a.retryLane=r,fr(e,r),zn(i,e,r),a0;Bh()}t=By(e,t,n)}else e=a.treeContext,Le=xi(r.nextSibling),on=t,$t=!0,ca=null,yi=!1,e!==null&&xS(t,e),t=ih(t,i),t.flags|=134221824;return t}return e=Ms(e.child,{mode:i.mode,children:i.children}),e.ref=t.ref,t.child=e,e.return=t,e}function Vr(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(nt(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function Ym(e,t,n,i,s){return ir(t),n=Zg(e,t,n,i,void 0,s),i=Jg(),e!==null&&!Ke?(Kg(e,t,s),Cs(e,t,s)):($t&&i&&Jh(t),t.flags|=1,je(e,t,n,s),t.child)}function zy(e,t,n,i,s,a){return ir(t),t.updateQueue=null,n=NS(t,i,n,s),RS(e),i=Jg(),e!==null&&!Ke?(Kg(e,t,a),Cs(e,t,a)):($t&&i&&Jh(t),t.flags|=1,je(e,t,n,a),t.child)}function Fy(e,t,n,i,s){if(ir(t),t.stateNode===null){var a=jr,r=n.contextType;typeof r=="object"&&r!==null&&(a=fn(r)),a=new n(i,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=Wm,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=i,a.state=t.memoizedState,a.refs={},Xg(t),r=n.contextType,a.context=typeof r=="object"&&r!==null?fn(r):jr,a.state=t.memoizedState,r=n.getDerivedStateFromProps,typeof r=="function"&&(em(t,n,r,i),a.state=t.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof a.getSnapshotBeforeUpdate=="function"||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(r=a.state,typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount(),r!==a.state&&Wm.enqueueReplaceState(a,a.state,null),Fl(t,i,a,s),zl(),a.state=t.memoizedState),typeof a.componentDidMount=="function"&&(t.flags|=4194308),i=!0}else if(e===null){a=t.stateNode;var o=t.memoizedProps,l=or(n,o);a.props=l;var c=a.context,h=n.contextType;r=jr,typeof h=="object"&&h!==null&&(r=fn(h));var p=n.getDerivedStateFromProps;h=typeof p=="function"||typeof a.getSnapshotBeforeUpdate=="function",o=t.pendingProps!==o,h||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(o||c!==r)&&Uy(t,a,i,r),ta=!1;var u=t.memoizedState;a.state=u,Fl(t,i,a,s),zl(),c=t.memoizedState,o||u!==c||ta?(typeof p=="function"&&(em(t,n,p,i),c=t.memoizedState),(l=ta||Dy(t,n,l,i,u,c,r))?(h||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(t.flags|=4194308)):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=i,t.memoizedState=c),a.props=i,a.state=c,a.context=r,i=l):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),i=!1)}else{a=t.stateNode,zm(e,t),r=t.memoizedProps,h=or(n,r),a.props=h,p=t.pendingProps,u=a.context,c=n.contextType,l=jr,typeof c=="object"&&c!==null&&(l=fn(c)),o=n.getDerivedStateFromProps,(c=typeof o=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(r!==p||u!==l)&&Uy(t,a,i,l),ta=!1,u=t.memoizedState,a.state=u,Fl(t,i,a,s),zl();var d=t.memoizedState;r!==p||u!==d||ta||e!==null&&e.dependencies!==null&&Mh(e.dependencies)?(typeof o=="function"&&(em(t,n,o,i),d=t.memoizedState),(h=ta||Dy(t,n,h,i,u,d,l)||e!==null&&e.dependencies!==null&&Mh(e.dependencies))?(c||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(i,d,l),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(i,d,l)),typeof a.componentDidUpdate=="function"&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof a.componentDidUpdate!="function"||r===e.memoizedProps&&u===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||r===e.memoizedProps&&u===e.memoizedState||(t.flags|=1024),t.memoizedProps=i,t.memoizedState=d),a.props=i,a.state=d,a.context=l,i=h):(typeof a.componentDidUpdate!="function"||r===e.memoizedProps&&u===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||r===e.memoizedProps&&u===e.memoizedState||(t.flags|=1024),i=!1)}return a=i,Vr(e,t),i=(t.flags&128)!==0,a||i?(a=t.stateNode,n=i&&typeof n.getDerivedStateFromError!="function"?null:a.render(),t.flags|=1,e!==null&&i?(t.child=ar(t,e.child,null,s),t.child=ar(t,null,n,s)):je(e,t,n,s),t.memoizedState=a.state,e=t.child):e=Cs(e,t,s),e}function Hy(e,t,n,i){return er(),t.flags|=256,je(e,t,n,i),t.child}var Zm={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Jm(e){return{baseLanes:e,cachePool:MS()}}function Km(e,t,n){return e=e!==null?e.childLanes&~n:0,t&&(e|=Qn),e}function pM(e,t,n){var i=t.pendingProps,s=!1,a=(t.flags&128)!==0,r;if((r=a)||(r=e!==null&&e.memoizedState===null?!1:(pn.current&2)!==0),r&&(s=!0,t.flags&=-129),r=(t.flags&32)!==0,t.flags&=-33,e===null){if($t){if(s?fa(t):da(),(e=Le)?(e=db(e,yi),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:va!==null?{id:ts,overflow:es}:null,retryLane:536870912,hydrationErrors:null},n=vS(e),n.return=t,t.child=n,on=t,Le=null)):e=null,e===null)throw ya(t);return y0(e)?t.lanes=32:t.lanes=536870912,null}return a=i.children,i=i.fallback,s?(da(),s=t.mode,a=ef({mode:"hidden",children:a},s),i=Qa(i,s,n,null),a.return=t,i.return=t,a.sibling=i,t.child=a,i=t.child,i.memoizedState=Jm(n),i.childLanes=Km(e,r,n),t.memoizedState=Zm,Vl(null,i)):(fa(t),r0(t,a))}var o=e.memoizedState;if(o!==null){var l=o.dehydrated;if(l!==null)return cw(e,t,a,r,i,l,o,n)}return s?(da(),s=i.fallback,a=t.mode,o=e.child,l=o.sibling,i=Ms(o,{mode:"hidden",children:i.children}),i.subtreeFlags=o.subtreeFlags&1206910976,l!==null?s=Ms(l,s):(s=Qa(s,a,n,null),s.flags|=2),s.return=t,i.return=t,i.sibling=s,t.child=i,Vl(null,i),i=t.child,s=e.child.memoizedState,s===null?s=Jm(n):(a=s.cachePool,a!==null?(o=Je._currentValue,a=a.parent!==o?{parent:o,pool:o}:a):a=MS(),s={baseLanes:s.baseLanes|n,cachePool:a}),i.memoizedState=s,i.childLanes=Km(e,r,n),t.memoizedState=Zm,Vl(e.child,i)):(fa(t),n=e.child,e=n.sibling,n=Ms(n,{mode:"visible",children:i.children}),n.return=t,n.sibling=null,e!==null&&(r=t.deletions,r===null?(t.deletions=[e],t.flags|=16):r.push(e)),t.child=n,t.memoizedState=null,n)}function r0(e,t){return t=ef({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function ef(e,t){return e=Bn(22,e,null,t),e.lanes=0,e}function zu(e,t,n){return ar(t,e.child,null,n),e=r0(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function cw(e,t,n,i,s,a,r,o){if(n)return t.flags&256?(fa(t),t.flags&=-257,zu(e,t,o)):t.memoizedState!==null?(da(),t.child=e.child,t.flags|=128,null):(da(),a=s.fallback,r=t.mode,s=ef({mode:"visible",children:s.children},r),a=Qa(a,r,o,null),a.flags|=2,s.return=t,a.return=t,s.sibling=a,t.child=s,ar(t,e.child,null,o),s=t.child,s.memoizedState=Jm(o),s.childLanes=Km(e,i,o),t.memoizedState=Zm,Vl(null,s));if(fa(t),y0(a)){if(i=a.nextSibling&&a.nextSibling.dataset,i)var l=i.dgst;return i=l,i!==""&&(s=Error(nt(419)),s.stack="",s.digest=i,Ql({value:s,source:null,stack:null})),zu(e,t,o)}if(Ke||nr(e,t,o,!1),i=(o&e.childLanes)!==0,Ke||i){if(xa.current!==null)return zu(e,t,o);if(i=we,i!==null&&(s=kx(i,o),s!==0&&s!==r.retryLane))throw r.retryLane=s,fr(e,s),zn(i,e,s),a0;return Sg(a)||Bh(),zu(e,t,o)}return Sg(a)?(t.flags|=192,t.child=e.child,null):(e=r.treeContext,Le=xi(a.nextSibling),on=t,$t=!0,ca=null,yi=!1,e!==null&&xS(t,e),t=r0(t,s.children),t.flags|=134221824,t)}function Vy(e,t,n){e.lanes|=t;var i=e.alternate;i!==null&&(i.lanes|=t),$u(e.return,t,n)}function Gy(e){for(var t=null;e!==null;){var n=e.alternate;n!==null&&Th(n)===null&&(t=e),e=e.sibling}return t}function Fu(e,t,n,i,s,a){var r=e.memoizedState;r===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:s,treeForkCount:a}:(r.isBackwards=t,r.rendering=null,r.renderingStartTime=0,r.last=i,r.tail=n,r.tailMode=s,r.treeForkCount=a)}function nm(e){var t=e.child;for(e.child=null;t!==null;){var n=t.sibling;t.sibling=e.child,e.child=t,t=n}}function Qm(e,t,n){var i=t.pendingProps,s=i.revealOrder,a=i.tail;i=i.children;var r=pn.current;if(t.flags&128)return $l(t,r),null;var o=(r&2)!==0;if(o?(r=r&1|2,t.flags|=128):r&=1,$l(t,r),s==="backwards"&&e!==null?(nm(e),je(e,t,i,n),nm(e)):je(e,t,i,n),i=$t?Kl:0,!o&&e!==null&&e.flags&128)t:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Vy(e,n,t);else if(e.tag===19)Vy(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break t;for(;e.sibling===null;){if(e.return===null||e.return===t)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(s){case"backwards":n=Gy(t.child),n===null?(s=t.child,t.child=null):(s=n.sibling,n.sibling=null,nm(t)),Fu(t,!0,s,null,a,i);break;case"unstable_legacy-backwards":for(n=null,s=t.child,t.child=null;s!==null;){if(e=s.alternate,e!==null&&Th(e)===null){t.child=s;break}e=s.sibling,s.sibling=n,n=s,s=e}Fu(t,!0,n,null,a,i);break;case"together":Fu(t,!1,null,null,void 0,i);break;case"independent":t.memoizedState=null;break;default:n=Gy(t.child),n===null?(s=t.child,t.child=null):(s=n.sibling,n.sibling=null),Fu(t,!1,s,n,a,i)}return t.child}function ky(e,t,n){var i=t.pendingProps;return sa(t,t.type,i.value),je(e,t,i.children,n),t.child}function Cs(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),Ma|=t.lanes,!(n&t.childLanes))if(e!==null){if(nr(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(nt(153));if(t.child!==null){for(e=t.child,n=Ms(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Ms(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function o0(e,t){return e.lanes&t?!0:(e=e.dependencies,!!(e!==null&&Mh(e)))}function uw(e,t,n){switch(t.tag){case 3:ph(t,t.stateNode.containerInfo),sa(t,Je,e.memoizedState.cache),er();break;case 27:case 5:Em(t);break;case 4:ph(t,t.stateNode.containerInfo);break;case 10:sa(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,Vm(t),null;break;case 13:var i=t.memoizedState;if(i!==null){if(i.dehydrated!==null)return fa(t),t.flags|=128,null;i=nr(e,t,n,!1);var s=t.child.childLanes;return i||n&s?pM(e,t,n):(fa(t),e=Cs(e,t,n),e!==null?e.sibling:null)}fa(t);break;case 19:if(t.flags&128)return Qm(e,t,n);if(s=(e.flags&128)!==0,i=(n&t.childLanes)!==0,i||(nr(e,t,n,!1),i=(n&t.childLanes)!==0),s){if(i)return Qm(e,t,n);t.flags|=128}if(s=t.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),$l(t,pn.current),i)break;return null;case 22:return t.lanes=0,dM(e,t,n,t.pendingProps);case 24:sa(t,Je,e.memoizedState.cache)}return Cs(e,t,n)}function mM(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps)Ke=!0;else{if(!o0(e,n)&&!(t.flags&128))return Ke=!1,uw(e,t,n);Ke=!!(e.flags&131072)}else Ke=!1,$t&&t.flags&1048576&&yS(t,Kl,t.index);switch(t.lanes=0,t.tag){case 16:t:{var i=t.pendingProps;if(e=qa(t.elementType),t.type=e,typeof e=="function")Fg(e)?(i=or(e,i),t.tag=1,t=Fy(null,t,e,i,n)):(t.tag=0,t=Ym(null,t,e,i,n));else{if(e!=null){var s=e.$$typeof;if(s===Ag){t.tag=11,t=Oy(null,t,e,i,n);break t}else if(s===wg){t.tag=14,t=Iy(null,t,e,i,n);break t}else if(s===ji){t.tag=10,t.type=e,t=ky(null,t,n);break t}}throw t=Mm(e)||e,Error(nt(306,t,""))}}return t;case 0:return Ym(e,t,t.type,t.pendingProps,n);case 1:return i=t.type,s=or(i,t.pendingProps),Fy(e,t,i,s,n);case 3:t:{if(ph(t,t.stateNode.containerInfo),e===null)throw Error(nt(387));i=t.pendingProps;var a=t.memoizedState;s=a.element,zm(e,t),Fl(t,i,null,n);var r=t.memoizedState;if(i=r.cache,sa(t,Je,i),i!==a.cache&&Pm(t,[Je],n,!0),zl(),i=r.element,a.isDehydrated)if(a={element:i,isDehydrated:!1,cache:r.cache},t.updateQueue.baseState=a,t.memoizedState=a,t.flags&256){t=Hy(e,t,i,n);break t}else if(i!==s){s=vi(Error(nt(424)),t),Ql(s),t=Hy(e,t,i,n);break t}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(Le=xi(e.firstChild),on=t,$t=!0,ca=null,yi=!0,n=TS(t,null,i,n),t.child=n;n;)n.flags=n.flags&-3|134221824,n=n.sibling}else{if(er(),i===s){t=Cs(e,t,n);break t}je(e,t,i,n)}t=t.child}return t;case 26:return Vr(e,t),e===null?(n=gx(t.type,null,t.pendingProps,null))?t.memoizedState=n:$t||(t.stateNode=sb(t.type,t.pendingProps,la.current,t)):t.memoizedState=gx(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return Em(t),e===null&&$t&&(i=t.stateNode=pb(t.type,t.pendingProps,la.current),on=t,yi=!0,s=Le,Ea(t.type)?(Mg=s,Le=xi(i.firstChild)):Le=s),je(e,t,t.pendingProps.children,n),Vr(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&$t&&((s=i=Le)&&(i=nC(i,t.type,t.pendingProps,yi),i!==null?(t.stateNode=i,on=t,Le=xi(i.firstChild),yi=!1,s=!0):s=!1),s||ya(t)),Em(t),s=t.type,a=t.pendingProps,r=e!==null?e.memoizedProps:null,i=a.children,vg(s,a)?i=null:r!==null&&vg(s,r)&&(t.flags|=32),t.memoizedState!==null&&(s=Zg(e,t,$A,null,null,n),bo._currentValue=s),Vr(e,t),je(e,t,i,n),t.child;case 6:return e===null&&$t&&((e=n=Le)&&(n=iC(n,t.pendingProps,yi),n!==null?(t.stateNode=n,on=t,Le=null,e=!0):e=!1),e||ya(t)),null;case 13:return pM(e,t,n);case 4:return ph(t,t.stateNode.containerInfo),i=t.pendingProps,e===null?t.child=ar(t,null,i,n):je(e,t,i,n),t.child;case 11:return Oy(e,t,t.type,t.pendingProps,n);case 7:return i=t.pendingProps,Vr(e,t),je(e,t,i,n),t.child;case 8:return je(e,t,t.pendingProps.children,n),t.child;case 12:return je(e,t,t.pendingProps.children,n),t.child;case 10:return ky(e,t,n);case 9:return s=t.type._context,i=t.pendingProps.children,ir(t),s=fn(s),i=i(s),t.flags|=1,je(e,t,i,n),t.child;case 14:return Iy(e,t,t.type,t.pendingProps,n);case 15:return fM(e,t,t.type,t.pendingProps,n);case 19:return Qm(e,t,n);case 31:return lw(e,t,n);case 22:return dM(e,t,n,t.pendingProps);case 24:return ir(t),i=fn(Je),e===null?(s=Gg(),s===null&&(s=we,a=Vg(),s.pooledCache=a,a.refCount++,a!==null&&(s.pooledCacheLanes|=n),s=a),t.memoizedState={parent:i,cache:s},Xg(t),sa(t,Je,s)):(e.lanes&n&&(zm(e,t),Fl(t,null,null,n),zl()),s=e.memoizedState,a=t.memoizedState,s.parent!==i?(s={parent:i,cache:i},t.memoizedState=s,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=s),sa(t,Je,i)):(i=a.cache,sa(t,Je,i),i!==s.cache&&Pm(t,[Je],n,!0))),je(e,t,t.pendingProps.children,n),t.child;case 30:return t.stateNode===null&&(t.stateNode={autoName:null,paired:null,clones:null,ref:null}),i=t.pendingProps,i.name!=null&&i.name!=="auto"?t.flags|=e===null?18882560:18874368:$t&&Jh(t),e!==null&&e.memoizedProps.name!==i.name?t.flags|=4194816:Vr(e,t),je(e,t,i.children,n),t.child;case 29:throw t.pendingProps}throw Error(nt(156,t.tag))}function ys(e){e.flags|=4}function im(e,t,n,i,s){var a;if((a=(e.mode&32)!==0)&&(a=n===null?yx(t,i):yx(t,i)&&(i.src!==n.src||i.srcSet!==n.srcSet)),a){if(e.flags|=16777216,(s&335544128)===s)if(e.stateNode.complete)e.flags|=8192;else if(XM())e.flags|=8192;else throw $a=bh,kg}else e.flags&=-16777217}function Xy(e,t){if(t.type!=="stylesheet"||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!vb(t))if(XM())e.flags|=8192;else throw $a=bh,kg}function Hu(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?Hx():536870912,e.lanes|=t,_o|=t)}function El(e,t){if(!$t)switch(e.tailMode){case"visible":break;case"collapsed":for(var n=e.tail,i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:i.sibling=null;break;default:for(t=e.tail,n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null}}function Ue(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,i=0;if(t)for(var s=e.child;s!==null;)n|=s.lanes|s.childLanes,i|=s.subtreeFlags&1206910976,i|=s.flags&1206910976,s.return=e,s=s.sibling;else for(s=e.child;s!==null;)n|=s.lanes|s.childLanes,i|=s.subtreeFlags,i|=s.flags,s.return=e,s=s.sibling;return e.subtreeFlags|=i,e.childLanes=n,t}function hw(e,t,n){var i=t.pendingProps;switch(Hg(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ue(t),null;case 1:return Ue(t),null;case 3:return n=t.stateNode,i=null,e!==null&&(i=e.memoizedState.cache),t.memoizedState.cache!==i&&(t.flags|=2048),bs(Je),fo(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(Fr(t)?ys(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,jp())),Ue(t),null;case 26:var s=t.type,a=t.memoizedState;return e===null?(ys(t),a!==null?(Ue(t),Xy(t,a)):(Ue(t),im(t,s,null,i,n))):a?a!==e.memoizedState?(ys(t),Ue(t),Xy(t,a)):(Ue(t),t.flags&=-16777217):(e=e.memoizedProps,e!==i&&ys(t),Ue(t),im(t,s,e,i,n)),null;case 27:if(mh(t),n=la.current,s=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&ys(t);else{if(!i){if(t.stateNode===null)throw Error(nt(166));return Ue(t),t.subtreeFlags&=-33554433,null}e=ns.current,Fr(t)?_y(t,e):(e=pb(s,i,n),t.stateNode=e,ys(t))}return Ue(t),t.subtreeFlags&=-33554433,null;case 5:if(mh(t),s=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&ys(t);else{if(!i){if(t.stateNode===null)throw Error(nt(166));return Ue(t),t.subtreeFlags&=-33554433,null}if(a=ns.current,Fr(t))_y(t,a);else{var r=ic(la.current);switch(a){case 1:a=r.createElementNS("http://www.w3.org/2000/svg",s);break;case 2:a=r.createElementNS("http://www.w3.org/1998/Math/MathML",s);break;default:switch(s){case"svg":a=r.createElementNS("http://www.w3.org/2000/svg",s);break;case"math":a=r.createElementNS("http://www.w3.org/1998/Math/MathML",s);break;case"script":a=r.createElement("div"),a.innerHTML="<script><\/script>",a=a.removeChild(a.firstChild);break;case"select":a=typeof i.is=="string"?r.createElement("select",{is:i.is}):r.createElement("select"),i.multiple?a.multiple=!0:i.size&&(a.size=i.size);break;default:a=typeof i.is=="string"?r.createElement(s,{is:i.is}):r.createElement(s)}}a[hn]=t,a[Hn]=i;t:for(r=t.child;r!==null;){if(r.tag===5||r.tag===6)a.appendChild(r.stateNode);else if(r.tag!==4&&r.tag!==27&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===t)break t;for(;r.sibling===null;){if(r.return===null||r.return===t)break t;r=r.return}r.sibling.return=r.return,r=r.sibling}t.stateNode=a;t:switch(mn(a,s,i),s){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break t;case"img":i=!0;break t;default:i=!1}i&&ys(t)}}return Ue(t),t.subtreeFlags&=-33554433,im(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==i&&ys(t);else{if(typeof i!="string"&&t.stateNode===null)throw Error(nt(166));if(e=la.current,Fr(t)){if(e=t.stateNode,n=t.memoizedProps,i=null,s=on,s!==null)switch(s.tag){case 27:case 5:i=s.memoizedProps}e[hn]=t,e=!!(e.nodeValue===n||i!==null&&i.suppressHydrationWarning===!0||nb(e.nodeValue,n)),e||ya(t,!0)}else e=ic(e).createTextNode(i),e[hn]=t,t.stateNode=e}return Ue(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(i=Fr(t),n!==null){if(e===null){if(!i)throw Error(nt(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(nt(557));e[hn]=t}else er(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Ue(t),e=!1}else n=jp(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(Jn(t),t):(Jn(t),null);if(t.flags&128)throw Error(nt(558))}return Ue(t),null;case 13:if(i=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(s=Fr(t),i!==null&&i.dehydrated!==null){if(e===null){if(!s)throw Error(nt(318));if(s=t.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(nt(317));s[hn]=t}else er(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;Ue(t),s=!1}else s=jp(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=s),s=!0;if(!s)return t.flags&256?(Jn(t),t):(Jn(t),null)}return Jn(t),t.flags&128?(t.lanes=n,t):(n=i!==null,e=e!==null&&e.memoizedState!==null,n&&(i=t.child,s=null,i.alternate!==null&&i.alternate.memoizedState!==null&&i.alternate.memoizedState.cachePool!==null&&(s=i.alternate.memoizedState.cachePool.pool),a=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(a=i.memoizedState.cachePool.pool),a!==s&&(i.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),Hu(t,t.updateQueue),Ue(t),null);case 4:return fo(),e===null&&g0(t.stateNode.containerInfo),t.flags|=67108864,Ue(t),null;case 10:return bs(t.type),Ue(t),null;case 19:if(qg(t),i=t.memoizedState,i===null)return Ue(t),null;if(s=(t.flags&128)!==0,a=i.rendering,a===null)if(s)El(i,!1);else{if(Xe!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(a=Th(e),a!==null){for(t.flags|=128,El(i,!1),e=a.updateQueue,t.updateQueue=e,Hu(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)_S(n,e),n=n.sibling;return $l(t,pn.current&1|2),$t&&xs(t,i.treeForkCount),t.child}e=e.sibling}i.tail!==null&&jn()>Ih&&(t.flags|=128,s=!0,El(i,!1),t.lanes=4194304)}else{if(!s)if(e=Th(a),e!==null){if(t.flags|=128,s=!0,e=e.updateQueue,t.updateQueue=e,Hu(t,e),El(i,!0),i.tail===null&&i.tailMode!=="collapsed"&&i.tailMode!=="visible"&&!a.alternate&&!$t)return Ue(t),null}else 2*jn()-i.renderingStartTime>Ih&&n!==536870912&&(t.flags|=128,s=!0,El(i,!1),t.lanes=4194304);i.isBackwards?(a.sibling=t.child,t.child=a):(e=i.last,e!==null?e.sibling=a:t.child=a,i.last=a)}if(i.tail!==null){e=i.tail;t:{for(n=e;n!==null;){if(n.alternate!==null){n=!1;break t}n=n.sibling}n=!0}return i.rendering=e,i.tail=e.sibling,i.renderingStartTime=jn(),e.sibling=null,a=pn.current,a=s?a&1|2:a&1,i.tailMode==="visible"||i.tailMode==="collapsed"||!n||$t?$l(t,a):(n=a,Oe(gn,t),Oe(pn,n),Sn===null&&(Sn=t)),$t&&xs(t,i.treeForkCount),e}return Ue(t),null;case 22:case 23:return Jn(t),Wg(),i=t.memoizedState!==null,e!==null?e.memoizedState!==null!==i&&(t.flags|=8192):i&&(t.flags|=8192),i?n&536870912&&!(t.flags&128)&&(Ue(t),t.subtreeFlags&6&&(t.flags|=8192)):Ue(t),n=t.updateQueue,n!==null&&Hu(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),i=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(i=t.memoizedState.cachePool.pool),i!==n&&(t.flags|=2048),e!==null&&dn(ja),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),bs(Je),Ue(t),null;case 25:return null;case 30:return t.flags|=33554432,Ue(t),null}throw Error(nt(156,t.tag))}function fw(e,t){switch(Hg(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return bs(Je),fo(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return mh(t),null;case 31:if(t.memoizedState!==null){if(Jn(t),t.alternate===null)throw Error(nt(340));er()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(Jn(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(nt(340));er()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return qg(t),e=t.flags,e&65536?(t.flags=e&-65537|128,e=t.memoizedState,e!==null&&(e.rendering=null,e.tail=null),t.flags|=4,t):null;case 4:return fo(),null;case 10:return bs(t.type),null;case 22:case 23:return Jn(t),Wg(),e!==null&&dn(ja),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return bs(Je),null;case 25:return null;default:return null}}function gM(e,t){switch(Hg(t),t.tag){case 3:bs(Je),fo();break;case 26:case 27:case 5:mh(t);break;case 4:fo();break;case 31:t.memoizedState!==null&&Jn(t);break;case 13:Jn(t);break;case 19:qg(t);break;case 10:bs(t.type);break;case 22:case 23:Jn(t),Wg(),e!==null&&dn(ja);break;case 24:bs(Je)}}function gc(e,t){try{var n=t.updateQueue,i=n!==null?n.lastEffect:null;if(i!==null){var s=i.next;n=s;do{if((n.tag&e)===e){i=void 0;var a=n.create,r=n.inst;i=a(),r.destroy=i}n=n.next}while(n!==s)}}catch(o){be(t,t.return,o)}}function Sa(e,t,n){try{var i=t.updateQueue,s=i!==null?i.lastEffect:null;if(s!==null){var a=s.next;i=a;do{if((i.tag&e)===e){var r=i.inst,o=r.destroy;if(o!==void 0){r.destroy=void 0,s=t;var l=n,c=o;try{c()}catch(h){be(s,l,h)}}}i=i.next}while(i!==a)}}catch(h){be(t,t.return,h)}}function _M(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{wS(t,n)}catch(i){be(e,e.return,i)}}}function vM(e,t,n){n.props=or(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(i){be(e,t,i)}}function Ki(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var i=e.stateNode;break;case 30:var s=e.stateNode,a=Ts(e.memoizedProps,s);(s.ref===null||s.ref.name!==a)&&(s.ref=lb(a)),i=s.ref;break;case 7:if(e.stateNode===null){var r=new ii(e);Fn(e.child,!1,tC,r,void 0,void 0),e.stateNode=r}i=e.stateNode;break;default:i=e.stateNode}typeof n=="function"?e.refCleanup=n(i):n.current=i}}catch(o){be(e,t,o)}}function un(e,t){var n=e.ref,i=e.refCleanup;if(n!==null)if(typeof i=="function")try{i()}catch(s){be(e,t,s)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(s){be(e,t,s)}else n.current=null}function Nh(e,t){if((e.tag===5||e.tag===27||e.tag===6)&&e.alternate===null&&t!==null)for(var n=0;n<t.length;n++)fb(e.stateNode,t[n])}function Wy(e){for(var t=e.return;t!==null&&(c0(t)&&fb(e.stateNode,t.stateNode),!l0(t));)t=t.return}function Gl(e){for(var t=e.return;t!==null&&(c0(t)&&eC(e.stateNode,t.stateNode),!l0(t));)t=t.return}function l0(e){return e.tag===5||e.tag===3||e.tag===27}function c0(e){return e&&e.tag===7&&e.stateNode!==null}function jm(e){var t=e.type,n=e.memoizedProps,i=e.stateNode;try{t:switch(t){case"button":case"input":case"select":case"textarea":n.autoFocus&&i.focus();break t;case"img":n.src?i.src=n.src:n.srcSet&&(i.srcset=n.srcSet)}}catch(s){be(e,e.return,s)}}function sm(e,t,n){try{var i=e.stateNode;Pw(i,e.type,n,t),i[Hn]=t}catch(s){be(e,e.return,s)}}function yM(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Ea(e.type)||e.tag===4}function am(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||yM(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Ea(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function $m(e,t,n,i){var s=e.tag;if(s===5||s===6)s=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(s,t):(t=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,t.appendChild(s),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=$i)),Nh(e,i),fe=!0;else if(s!==4&&(s===27&&(Nh(e,i),i=null,Ea(e.type)&&(n=e.stateNode,t=null)),e=e.child,e!==null))for($m(e,t,n,i),e=e.sibling;e!==null;)$m(e,t,n,i),e=e.sibling}function Dh(e,t,n,i){var s=e.tag;if(s===5||s===6)s=e.stateNode,t?n.insertBefore(s,t):n.appendChild(s),Nh(e,i),fe=!0;else if(s!==4&&(s===27&&(Nh(e,i),i=null,Ea(e.type)&&(n=e.stateNode)),e=e.child,e!==null))for(Dh(e,t,n,i),e=e.sibling;e!==null;)Dh(e,t,n,i),e=e.sibling}function xM(e){var t=e.stateNode,n=e.memoizedProps;try{for(var i=e.type,s=t.attributes;s.length;)t.removeAttributeNode(s[0]);mn(t,i,n),t[hn]=e,t[Hn]=n}catch(a){be(e,e.return,a)}}var Uh=!1,Kn=null;function qy(e){(e.tag===30||e.subtreeFlags&33554432)&&(Uh=!0)}var Qi=null;function Yy(){var e=Qi;return Qi=null,e}var Pn=0;function Ro(e,t,n,i,s){return Pn=0,SM(e.child,t,n,i,s)}function SM(e,t,n,i,s){for(var a=!1;e!==null;){if(e.tag===5){var r=e.stateNode;if(i!==null){var o=yg(r);i.push(o),o.view&&(a=!0)}else a||yg(r).view&&(a=!0);Uh=!0,ab(r,Pn===0?t:t+"_"+Pn,n),Pn++}else(e.tag!==22||e.memoizedState===null)&&(e.tag===30&&s||SM(e.child,t,n,i,s)&&(a=!0));e=e.sibling}return a}function ss(e,t){for(;e!==null;)e.tag===5?rb(e.stateNode,e.memoizedProps):(e.tag!==22||e.memoizedState===null)&&(e.tag===30&&t||ss(e.child,t)),e=e.sibling}function sh(e){if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if((e.tag!==22||e.memoizedState===null)&&(sh(e),e.tag===30&&(e.flags&18874368)!==0&&e.stateNode.paired)){var t=e.memoizedProps;if(t.name==null||t.name==="auto")throw Error(nt(544));var n=t.name;t=Ds(t.default,t.share),t!=="none"&&(Ro(e,n,t,null,!1)||ss(e.child,!1))}e=e.sibling}}function tg(e,t){if(e.tag===30){var n=e.stateNode,i=e.memoizedProps,s=Ts(i,n),a=Ds(i.default,n.paired?i.share:i.enter);a!=="none"?Ro(e,s,a,null,!1)?(sh(e),n.paired||t||vo(e,i.onEnter)):ss(e.child,!1):sh(e)}else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)tg(e,t),e=e.sibling;else sh(e)}function eg(e){if(Kn!==null&&Kn.size!==0){var t=Kn;if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&e.flags&18874368){var n=e.memoizedProps,i=n.name;if(i!=null&&i!=="auto"){var s=t.get(i);if(s!==void 0){var a=Ds(n.default,n.share);if(a!=="none"&&(Ro(e,i,a,null,!1)?(a=e.stateNode,s.paired=a,a.paired=s,vo(e,n.onShare)):ss(e.child,!1)),t.delete(i),t.size===0)break}}}eg(e)}e=e.sibling}}}function ng(e){if(e.tag===30){var t=e.memoizedProps,n=Ts(t,e.stateNode),i=Kn!==null?Kn.get(n):void 0,s=Ds(t.default,i!==void 0?t.share:t.exit);s!=="none"&&(Ro(e,n,s,null,!1)?i!==void 0?(s=e.stateNode,i.paired=s,s.paired=i,Kn.delete(n),vo(e,t.onShare)):vo(e,t.onExit):ss(e.child,!1)),Kn!==null&&eg(e)}else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)ng(e),e=e.sibling;else Kn!==null&&eg(e)}function MM(e){for(e=e.child;e!==null;){if(e.tag===30){var t=e.memoizedProps,n=Ts(t,e.stateNode);t=Ds(t.default,t.update),e.flags&=-5,t!=="none"&&Ro(e,n,t,e.memoizedState=[],!1)}else e.subtreeFlags&33554432&&MM(e);e=e.sibling}}function ig(e){if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&e.flags&18874368){var t=e.stateNode;t.paired!==null&&(t.paired=null,ss(e.child,!1))}ig(e)}e=e.sibling}}function ah(e){if(e.tag===30)e.stateNode.paired=null,ss(e.child,!1),ig(e);else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)ah(e),e=e.sibling;else ig(e)}function bM(e){for(e=e.child;e!==null;)e.tag===30?ss(e.child,!1):e.subtreeFlags&33554432&&bM(e),e=e.sibling}function u0(e,t,n,i,s,a,r){for(var o=!1;t!==null;){if(t.tag===5){var l=t.stateNode;if(a!==null&&Pn<a.length){var c=a[Pn],h=yg(l);(c.view||h.view)&&(o=!0);var p;if(p=(e.flags&4)===0)if(h.clip)p=!0;else{p=c.rect;var u=h.rect;p=p.y!==u.y||p.x!==u.x||p.height!==u.height||p.width!==u.width}p&&(e.flags|=4),h.abs?h=!c.abs:(c=c.rect,h=h.rect,h=c.height!==h.height||c.width!==h.width),h&&(e.flags|=32)}else e.flags|=32;e.flags&4&&ab(l,Pn===0?n:n+"_"+Pn,s),o&&e.flags&4||(Qi===null&&(Qi=[]),Qi.push(l,Pn===0?i:i+"_"+Pn,t.memoizedProps)),Pn++}else(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&r?e.flags|=t.flags&32:u0(e,t.child,n,i,s,a,r)&&(o=!0));t=t.sibling}return o}function EM(e,t){for(e=e.child;e!==null;){if(e.tag===30){var n=e.memoizedProps,i=e.stateNode,s=Ts(n,i),a=Ds(n.default,n.update);if(t){i=i.clones;var r=i===null?null:i.map(Gw)}else r=e.memoizedState,e.memoizedState=null;i=e;var o=e.child;Pn=0,s=u0(i,o,s,s,a,r,!1),e.flags&4&&s&&(t||vo(e,n.onUpdate))}else e.subtreeFlags&33554432&&EM(e,t);e=e.sibling}}var sn=!1,ve=!1,Yi=!1,rm=!1,Zy=typeof WeakSet=="function"?WeakSet:Set,an=null,Zi=!1,Ul=!1,Lh=!1,sg=!1;function dw(e,t,n){if(e=e.containerInfo,gg=Eo,e=cS(e),Pg(e)){if("selectionStart"in e)var i={start:e.selectionStart,end:e.selectionEnd};else t:{i=(i=e.ownerDocument)&&i.defaultView||window;var s=i.getSelection&&i.getSelection();if(s&&s.rangeCount!==0){i=s.anchorNode;var a=s.anchorOffset,r=s.focusNode;s=s.focusOffset;try{i.nodeType,r.nodeType}catch{i=null;break t}var o=0,l=-1,c=-1,h=0,p=0,u=e,d=null;e:for(;;){for(var g;u!==i||a!==0&&u.nodeType!==3||(l=o+a),u!==r||s!==0&&u.nodeType!==3||(c=o+s),u.nodeType===3&&(o+=u.nodeValue.length),(g=u.firstChild)!==null;)d=u,u=g;for(;;){if(u===e)break e;if(d===i&&++h===a&&(l=o),d===r&&++p===s&&(c=o),(g=u.nextSibling)!==null)break;u=d,d=u.parentNode}u=g}i=l===-1||c===-1?null:{start:l,end:c}}else i=null}i=i||{start:0,end:0}}else i=null;for(_g={focusedElem:e,selectionRange:i},Eo=!1,n=(n&335544064)===n,an=t,t=n?9270:1024;an!==null;){if(e=an,n&&(i=e.deletions,i!==null))for(a=0;a<i.length;a++)n&&ng(i[a]);if(e.alternate===null&&e.flags&2)n&&qy(e),Vu(n);else{if(e.tag===22){if(i=e.alternate,e.memoizedState!==null){i!==null&&i.memoizedState===null&&n&&ng(i),Vu(n);continue}else if(i!==null&&i.memoizedState!==null){n&&qy(e),Vu(n);continue}}i=e.child,e.subtreeFlags&t&&i!==null?(i.return=e,an=i):(n&&MM(e),Vu(n))}}Kn=null}function Vu(e){for(;an!==null;){var t=an,n=e,i=t.alternate,s=t.flags;switch(t.tag){case 0:case 11:case 15:break;case 1:if(s&1024&&i!==null){n=void 0,s=i.memoizedProps,i=i.memoizedState;var a=t.stateNode;try{var r=or(t.type,s);n=a.getSnapshotBeforeUpdate(r,i),a.__reactInternalSnapshotBeforeUpdate=n}catch(o){be(t,t.return,o)}}break;case 3:if(s&1024){if(i=t.stateNode.containerInfo,n=i.nodeType,n===9)xg(i);else if(n===1)switch(i.nodeName){case"HEAD":case"HTML":case"BODY":xg(i);break;default:i.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;case 30:n&&i!==null&&(n=Ts(i.memoizedProps,i.stateNode),s=t.memoizedProps,s=Ds(s.default,s.update),s!=="none"&&Ro(i,n,s,i.memoizedState=[],!0));break;default:if(s&1024)throw Error(nt(163))}if(i=t.sibling,i!==null){i.return=t.return,an=i;break}an=t.return}}function TM(e,t,n){var i=n.flags;switch(n.tag){case 0:case 11:case 15:Ji(e,n),i&4&&gc(5,n);break;case 1:if(Ji(e,n),i&4)if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(r){be(n,n.return,r)}else{var s=or(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(s,t,e.__reactInternalSnapshotBeforeUpdate)}catch(r){be(n,n.return,r)}}i&64&&_M(n),i&512&&Ki(n,n.return);break;case 3:if(Ji(e,n),i&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{wS(e,t)}catch(r){be(n,n.return,r)}}break;case 27:t===null&&i&4&&xM(n);case 26:case 5:Ji(e,n),t===null&&i&4&&jm(n),i&512&&Ki(n,n.return);break;case 12:Ji(e,n);break;case 31:Ji(e,n),i&4&&RM(e,n);break;case 13:Ji(e,n),i&4&&NM(e,n),i&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=Tw.bind(null,n),sC(e,n))));break;case 22:if(i=n.memoizedState!==null||sn,!i){var a=t!==null&&t.memoizedState!==null||ve;t=sn,s=ve,sn=i,(ve=a)&&!s?(i=2,n.subtreeFlags&8772&&(i|=1),Ri(e,n,i)):Ji(e,n),sn=t,ve=s}break;case 30:Ji(e,n),i&512&&Ki(n,n.return);break;case 7:i&512&&Ki(n,n.return);default:Ji(e,n)}}function ag(e,t){for(e=e.child;e!==null;)AM(e,t),e=e.sibling}function AM(e,t){switch(e.tag){case 5:case 26:try{var n=e.stateNode;if(t){var i=n.style;typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"}else{var s=e.stateNode,a=e.memoizedProps.style,r=a!=null&&a.hasOwnProperty("display")?a.display:null;s.style.display=r==null||typeof r=="boolean"?"":(""+r).trim()}}catch(l){be(e,e.return,l)}rg(e,t);break;case 6:try{e.stateNode.nodeValue=t?"":e.memoizedProps,fe=!0}catch(l){be(e,e.return,l)}break;case 18:try{var o=e.stateNode;t?ux(o,!0):ux(e.stateNode,!1)}catch(l){be(e,e.return,l)}break;case 22:case 23:e.memoizedState===null&&ag(e,t);break;default:ag(e,t)}}function rg(e,t){if(e.subtreeFlags&67108864)for(e=e.child;e!==null;){t:{var n=e,i=t;switch(n.tag){case 4:AM(n,i);break t;case 22:n.memoizedState===null&&rg(n,i);break t;default:rg(n,i)}}e=e.sibling}}function wM(e){var t=e.alternate;t!==null&&(e.alternate=null,wM(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&kh(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var Fe=null,On=!1;function Ci(e,t,n){for(n=n.child;n!==null;)CM(e,t,n),n=n.sibling}function CM(e,t,n){if($n&&typeof $n.onCommitFiberUnmount=="function")try{$n.onCommitFiberUnmount(cc,n)}catch{}switch(n.tag){case 26:ve||un(n,t),Ci(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&!ve&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:ve||un(n,t),Gl(n);var i=Fe,s=On;Ea(n.type)&&(Fe=n.stateNode,On=!1),Ci(e,t,n),mb(n.stateNode,n.type,n.memoizedProps),Fe=i,On=s;break;case 5:ve||un(n,t),Gl(n);case 6:if(n.tag===6&&Gl(n),i=Fe,s=On,Fe=null,Ci(e,t,n),Fe=i,On=s,Fe!==null)if(On)try{(Fe.nodeType===9?Fe.body:Fe.nodeName==="HTML"?Fe.ownerDocument.body:Fe).removeChild(n.stateNode),fe=!0}catch(a){be(n,t,a)}else try{Fe.removeChild(n.stateNode),fe=!0}catch(a){be(n,t,a)}break;case 18:Fe!==null&&(On?(e=Fe,cx(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,n.stateNode),To(e)):cx(Fe,n.stateNode));break;case 4:i=Fe,s=On,Fe=n.stateNode.containerInfo,On=!0,Ci(e,t,n),Fe=i,On=s;break;case 0:case 11:case 14:case 15:Sa(2,n,t),ve||Sa(4,n,t),Ci(e,t,n);break;case 1:ve||(un(n,t),i=n.stateNode,typeof i.componentWillUnmount=="function"&&vM(n,t,i)),Ci(e,t,n);break;case 21:Ci(e,t,n);break;case 22:ve=(i=ve)||n.memoizedState!==null,Ci(e,t,n),ve=i;break;case 30:un(n,t),Ci(e,t,n);break;case 7:ve||un(n,t),Ci(e,t,n);break;default:Ci(e,t,n)}}function RM(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{To(e)}catch(n){be(t,t.return,n)}}}function NM(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{To(e)}catch(n){be(t,t.return,n)}}function pw(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new Zy),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new Zy),t;default:throw Error(nt(435,e.tag))}}function Gu(e,t){var n=pw(e);t.forEach(function(i){if(!n.has(i)){n.add(i);var s=Aw.bind(null,e,i);i.then(s,s)}})}function Cn(e,t,n){var i=t.deletions;if(i!==null)for(var s=0;s<i.length;s++){var a=i[s],r=e,o=t,l=o;t:for(;l!==null;){switch(l.tag){case 27:if(Ea(l.type)){Fe=l.stateNode,On=!1;break t}break;case 5:Fe=l.stateNode,On=!1;break t;case 3:case 4:Fe=l.stateNode.containerInfo,On=!0;break t}l=l.return}if(Fe===null)throw Error(nt(160));CM(r,o,a),Fe=null,On=!1,r=a.alternate,r!==null&&(r.return=null),a.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)DM(t,e,n),t=t.sibling}var Ni=null;function DM(e,t,n){var i=e.alternate,s=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(s&4&&(i=e.updateQueue,i=i!==null?i.events:null,i!==null))for(var a=0;a<i.length;a++){var r=i[a];r.ref.impl=r.nextImpl}Cn(t,e,n),Rn(e),s&4&&(Sa(3,e,e.return),gc(3,e),Sa(5,e,e.return));break;case 1:Cn(t,e,n),Rn(e),s&512&&(ve||i===null||un(i,i.return)),s&64&&sn&&(e=e.updateQueue,e!==null&&(t=e.callbacks,t!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?t:n.concat(t))));break;case 26:if(a=Ni,Cn(t,e,n),Rn(e),s&512&&(ve||i===null||un(i,i.return)),s&4)if(s=i!==null?i.memoizedState:null,n=e.memoizedState,i===null)if(n===null)if(e.stateNode===null)if(sn)e.stateNode=sb(e.type,e.memoizedProps,t.containerInfo,e);else{t:{t=e.type,n=e.memoizedProps,s=a.ownerDocument||a;e:switch(t){case"title":i=s.getElementsByTagName("title")[0],(!i||i[fc]||i[hn]||i.namespaceURI==="http://www.w3.org/2000/svg"||i.hasAttribute("itemprop"))&&(i=s.createElement(t),s.head.insertBefore(i,s.querySelector("head > title"))),mn(i,t,n),i[hn]=e,rn(i),t=i;break t;case"link":if(a=vx("link","href",s).get(t+(n.href||""))){for(r=0;r<a.length;r++)if(i=a[r],i.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&i.getAttribute("rel")===(n.rel==null?null:n.rel)&&i.getAttribute("title")===(n.title==null?null:n.title)&&i.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){a.splice(r,1);break e}}i=s.createElement(t),mn(i,t,n),s.head.appendChild(i);break;case"meta":if(a=vx("meta","content",s).get(t+(n.content||""))){for(r=0;r<a.length;r++)if(i=a[r],i.getAttribute("content")===(n.content==null?null:""+n.content)&&i.getAttribute("name")===(n.name==null?null:n.name)&&i.getAttribute("property")===(n.property==null?null:n.property)&&i.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&i.getAttribute("charset")===(n.charSet==null?null:n.charSet)){a.splice(r,1);break e}}i=s.createElement(t),mn(i,t,n),s.head.appendChild(i);break;default:throw Error(nt(468,t))}i[hn]=e,rn(i),t=i}e.stateNode=t}else sn||bg(a,e.type,e.stateNode);else e.stateNode=_x(a,n,e.memoizedProps);else s!==n?(s===null?(t=i.stateNode,t===null||ve||t.parentNode.removeChild(t)):s.count--,n===null?sn||bg(a,e.type,e.stateNode):_x(a,n,e.memoizedProps)):n===null&&e.stateNode!==null&&sm(e,e.memoizedProps,i.memoizedProps);break;case 27:Cn(t,e,n),Rn(e),s&512&&(ve||i===null||un(i,i.return)),i!==null&&s&4&&sm(e,e.memoizedProps,i.memoizedProps);break;case 5:if(a=Yi,Yi=!1,Cn(t,e,n),Yi=a,Rn(e),s&512&&(ve||i===null||un(i,i.return)),e.flags&32){t=e.stateNode;try{mo(t,""),fe=!0}catch(h){be(e,e.return,h)}}s&4&&e.stateNode!=null&&(t=e.memoizedProps,sm(e,t,i!==null?i.memoizedProps:t)),s&1024&&(rm=!0);break;case 6:if(Cn(t,e,n),Rn(e),s&4){if(e.stateNode===null)throw Error(nt(162));t=e.memoizedProps,n=e.stateNode;try{n.nodeValue=t,fe=!0}catch(h){be(e,e.return,h)}}break;case 3:if(fe=!1,ch=null,a=Ni,Ni=sc(t.containerInfo),Cn(t,e,n),Ni=a,Rn(e),s&4&&i!==null&&i.memoizedState.isDehydrated)try{To(t.containerInfo)}catch(h){be(e,e.return,h)}rm&&(rm=!1,UM(e)),fe=!1;break;case 4:s=Yi,Yi=sn,i=ty(),a=Ni,Ni=sc(e.stateNode.containerInfo),Cn(t,e,n),Rn(e),Ni=a,fe&&Ul&&(Lh=!0),fe=i,Yi=s;break;case 12:Cn(t,e,n),Rn(e);break;case 31:Cn(t,e,n),Rn(e),s&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Gu(e,t)));break;case 13:Cn(t,e,n),Rn(e),e.child.flags&8192&&e.memoizedState!==null!=(i!==null&&i.memoizedState!==null)&&(nf=jn()),s&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Gu(e,t)));break;case 22:a=e.memoizedState!==null,r=i!==null&&i.memoizedState!==null;var o=sn,l=ve,c=Yi;sn=o||a,Yi=c||a,ve=l||r,Cn(t,e,n),ve=l,Yi=c,sn=o,Rn(e),s&8192&&(t=e.stateNode,t._visibility=a?t._visibility&-2:t._visibility|1,!a||i===null||r||sn||ve||(t=r||ve,n=sn,i=ve,sn=a||sn,ve=t,js(e,2),sn=n,ve=i),!a&&Yi||ag(e,a)),s&4&&(t=e.updateQueue,t!==null&&(n=t.retryQueue,n!==null&&(t.retryQueue=null,Gu(e,n))));break;case 19:Cn(t,e,n),Rn(e),s&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Gu(e,t)));break;case 30:s&512&&(ve||i===null||un(i,i.return)),s=ty(),a=Ul,r=(n&335544064)===n,o=e.memoizedProps,Ul=r&&Ds(o.default,o.update)!=="none",Cn(t,e,n),Rn(e),r&&i!==null&&fe&&(e.flags|=4),Ul=a,fe=s;break;case 21:break;case 7:s&512&&(ve||i===null||un(i,i.return)),i&&i.stateNode!==null&&(i.stateNode._fragmentFiber=e);default:Cn(t,e,n),Rn(e)}}function Rn(e){var t=e.flags;if(t&2){try{for(var n,i=e.return;i!==null;){if(yM(i)){n=i;break}i=i.return}i=null;for(var s=e.return;s!==null;){if(c0(s)){var a=s.stateNode;i===null?i=[a]:i.push(a)}if(l0(s))break;s=s.return}var r=i;if(n==null)throw Error(nt(160));switch(n.tag){case 27:var o=n.stateNode,l=am(e);Dh(e,l,o,r);break;case 5:var c=n.stateNode;n.flags&32&&(mo(c,""),n.flags&=-33);var h=am(e);Dh(e,h,c,r);break;case 3:case 4:var p=n.stateNode.containerInfo,u=am(e);$m(e,u,p,r);break;default:throw Error(nt(161))}}catch(d){be(e,e.return,d)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function UM(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;UM(t),t.tag===5&&t.flags&1024&&(t=t.stateNode,Eo=!0,t.reset(),Eo=!1),e=e.sibling}}function Hr(e,t){if(t.subtreeFlags&9270)for(t=t.child;t!==null;)LM(t,e),t=t.sibling;else EM(t,!1)}function LM(e,t){var n=e.alternate;if(n===null)tg(e,!1);else switch(e.tag){case 3:if(sg=Zi=!1,Yy(),Hr(t,e),!Zi&&!Lh){if(e=Qi,e!==null)for(var i=0;i<e.length;i+=3){n=e[i];var s=e[i+1];rb(n,e[i+2]),n=n.ownerDocument.documentElement,n!==null&&n.animate({opacity:[0,0],pointerEvents:["none","none"]},{duration:0,fill:"forwards",pseudoElement:"::view-transition-group("+s+")"})}e=t.containerInfo,e=e.nodeType===9?e.documentElement:e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===""&&(e.style.viewTransitionName="none",e.animate({opacity:[0,0],pointerEvents:["none","none"]},{duration:0,fill:"forwards",pseudoElement:"::view-transition-group(root)"}),e.animate({width:[0,0],height:[0,0]},{duration:0,fill:"forwards",pseudoElement:"::view-transition"})),sg=!0}Qi=null;break;case 5:Hr(t,e);break;case 4:i=Zi,Zi=!1,Hr(t,e),Zi&&(Lh=!0),Zi=i;break;case 22:e.memoizedState===null&&(n.memoizedState!==null?tg(e,!1):Hr(t,e));break;case 30:i=Zi,s=Yy(),Zi=!1,Hr(t,e),Zi&&(e.flags|=4);var a=e.memoizedProps,r=e.stateNode;t=Ts(a,r),r=Ts(n.memoizedProps,r);var o=Ds(a.default,a.update);o==="none"?t=!1:(a=n.memoizedState,n.memoizedState=null,n=e.child,Pn=0,t=u0(e,n,t,r,o,a,!0),Pn!==(a===null?0:a.length)&&(e.flags|=32)),e.flags&4&&t?(vo(e,e.memoizedProps.onUpdate),Qi=s):s!==null&&(s.push.apply(s,Qi),Qi=s),Zi=e.flags&32?!0:i;break;default:Hr(t,e)}}function Ji(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)TM(e,t.alternate,t),t=t.sibling}function js(e,t){for(e=e.child;e!==null;){var n=e,i=t;switch(n.tag){case 0:case 11:case 14:case 15:Sa(4,n,n.return),js(n,i);break;case 1:un(n,n.return);var s=n.stateNode;typeof s.componentWillUnmount=="function"&&vM(n,n.return,s),js(n,i);break;case 27:i&2&&mb(n.stateNode,n.type,n.memoizedProps);case 5:un(n,n.return),n.tag!==5&&n.tag!==27||Gl(n),js(n,i);break;case 6:Gl(n);break;case 26:un(n,n.return),s=n.stateNode,n.memoizedState!==null||s===null||ve||s.parentNode.removeChild(s),js(n,i);break;case 22:n.memoizedState===null&&js(n,i);break;case 30:un(n,n.return),js(n,i);break;case 7:un(n,n.return);default:js(n,i)}e=e.sibling}}function Ri(e,t,n){for(n=t.subtreeFlags&8772?n:n&-2,t=t.child;t!==null;){var i=t.alternate,s=e,a=t,r=a.flags,o=(n&1)!==0;switch(a.tag){case 0:case 11:case 15:Ri(s,a,n),gc(4,a);break;case 1:if(Ri(s,a,n),i=a,s=i.stateNode,typeof s.componentDidMount=="function")try{s.componentDidMount()}catch(h){be(i,i.return,h)}if(i=a,s=i.updateQueue,s!==null){var l=i.stateNode;try{var c=s.shared.hiddenCallbacks;if(c!==null)for(s.shared.hiddenCallbacks=null,s=0;s<c.length;s++)AS(c[s],l)}catch(h){be(i,i.return,h)}}o&&r&64&&_M(a),Ki(a,a.return);break;case 27:n&2&&xM(a);case 5:a.tag!==5&&a.tag!==27||Wy(a),Ri(s,a,n),o&&i===null&&r&4&&jm(a),Ki(a,a.return);break;case 6:Wy(a);break;case 26:l=a.stateNode,a.memoizedState!==null||l===null||sn||bg(sc(l.ownerDocument),a.type,l),Ri(s,a,n),o&&i===null&&r&4&&jm(a),Ki(a,a.return);break;case 12:Ri(s,a,n);break;case 31:Ri(s,a,n),o&&r&4&&RM(s,a);break;case 13:Ri(s,a,n),o&&r&4&&NM(s,a);break;case 22:a.memoizedState===null&&Ri(s,a,n),Ki(a,a.return);break;case 30:Ri(s,a,n),Ki(a,a.return);break;case 7:Ki(a,a.return);default:Ri(s,a,n)}t=t.sibling}}function h0(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&pc(n))}function f0(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&pc(e))}function di(e,t,n,i){var s=(n&335544064)===n;if(t.subtreeFlags&(s?10262:10256))for(t=t.child;t!==null;)OM(e,t,n,i),t=t.sibling;else s&&bM(t)}function OM(e,t,n,i){var s=(n&335544064)===n;s&&t.alternate===null&&t.return!==null&&t.return.alternate!==null&&ah(t);var a=t.flags;switch(t.tag){case 0:case 11:case 15:di(e,t,n,i),a&2048&&gc(9,t);break;case 1:di(e,t,n,i);break;case 3:di(e,t,n,i),s&&sg&&(e=e.containerInfo,e=e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,e.style.viewTransitionName==="root"&&(e.style.viewTransitionName=""),e=e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName==="none"&&(e.style.viewTransitionName="")),a&2048&&(a=null,t.alternate!==null&&(a=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==a&&(t.refCount++,a!=null&&pc(a)));break;case 12:if(a&2048){di(e,t,n,i),a=t.stateNode;try{var r=t.memoizedProps,o=r.id,l=r.onPostCommit;typeof l=="function"&&l(o,t.alternate===null?"mount":"update",a.passiveEffectDuration,-0)}catch(c){be(t,t.return,c)}}else di(e,t,n,i);break;case 31:di(e,t,n,i);break;case 13:di(e,t,n,i);break;case 23:break;case 22:r=t.stateNode,o=t.alternate,t.memoizedState!==null?(s&&o!==null&&o.memoizedState===null&&ah(o),r._visibility&2?di(e,t,n,i):kl(e,t)):(s&&o!==null&&o.memoizedState!==null&&ah(t),r._visibility&2?di(e,t,n,i):(r._visibility|=2,Gr(e,t,n,i,(t.subtreeFlags&10256)!==0||!1))),a&2048&&h0(o,t);break;case 24:di(e,t,n,i),a&2048&&f0(t.alternate,t);break;case 30:s&&(a=t.alternate,a!==null&&(ss(a.child,!0),ss(t.child,!0))),di(e,t,n,i);break;default:di(e,t,n,i)}}function Gr(e,t,n,i,s){for(s=s&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var a=e,r=t,o=n,l=i,c=r.flags;switch(r.tag){case 0:case 11:case 15:Gr(a,r,o,l,s),gc(8,r);break;case 23:break;case 22:var h=r.stateNode;r.memoizedState!==null?h._visibility&2?Gr(a,r,o,l,s):kl(a,r):(h._visibility|=2,Gr(a,r,o,l,s)),s&&c&2048&&h0(r.alternate,r);break;case 24:Gr(a,r,o,l,s),s&&c&2048&&f0(r.alternate,r);break;default:Gr(a,r,o,l,s)}t=t.sibling}}function kl(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,i=t,s=i.flags;switch(i.tag){case 22:kl(n,i),s&2048&&h0(i.alternate,i);break;case 24:kl(n,i),s&2048&&f0(i.alternate,i);break;default:kl(n,i)}t=t.sibling}}var Ya=8192;function Xa(e,t,n){if(e.subtreeFlags&Ya)for(e=e.child;e!==null;)IM(e,t,n),e=e.sibling}function IM(e,t,n){switch(e.tag){case 26:Xa(e,t,n),e.flags&Ya&&(e.memoizedState!==null?vC(n,Ni,e.memoizedState,e.memoizedProps):(e=e.stateNode,(t&335544128)===t&&xx(n,e)));break;case 5:Xa(e,t,n),e.flags&Ya&&(e=e.stateNode,(t&335544128)===t&&xx(n,e));break;case 3:case 4:var i=Ni;Ni=sc(e.stateNode.containerInfo),Xa(e,t,n),Ni=i;break;case 22:e.memoizedState===null&&(i=e.alternate,i!==null&&i.memoizedState!==null?(i=Ya,Ya=16777216,Xa(e,t,n),Ya=i):Xa(e,t,n));break;case 30:if(e.flags&Ya&&(i=e.memoizedProps.name,i!=null&&i!=="auto")){var s=e.stateNode;s.paired=null,Kn===null&&(Kn=new Map),Kn.set(i,s)}Xa(e,t,n);break;default:Xa(e,t,n)}}function PM(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Tl(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var i=t[n];an=i,zM(i,e)}PM(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)BM(e),e=e.sibling}function BM(e){switch(e.tag){case 0:case 11:case 15:Tl(e),e.flags&2048&&Sa(9,e,e.return);break;case 3:Tl(e);break;case 12:Tl(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,rh(e)):Tl(e);break;default:Tl(e)}}function rh(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var i=t[n];an=i,zM(i,e)}PM(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Sa(8,t,t.return),rh(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,rh(t));break;default:rh(t)}e=e.sibling}}function zM(e,t){for(;an!==null;){var n=an;switch(n.tag){case 0:case 11:case 15:Sa(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var i=n.memoizedState.cachePool.pool;i!=null&&i.refCount++}break;case 24:pc(n.memoizedState.cache)}if(i=n.child,i!==null)i.return=n,an=i;else t:for(n=e;an!==null;){i=an;var s=i.sibling,a=i.return;if(wM(i),i===n){an=null;break t}if(s!==null){s.return=a,an=s;break t}an=a}}}var mw={getCacheForType:function(e){var t=fn(Je),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return fn(Je).controller.signal}},gw=typeof WeakMap=="function"?WeakMap:Map,pe=0,we=null,ae=null,re=0,Se=0,Yn=null,aa=!1,No=!1,d0=!1,Rs=0,Xe=0,Ma=0,tr=0,Oh=0,Qn=0,_o=0,Xl=null,In=null,og=!1,nf=0,FM=0,Ih=1/0,Ph=null,pa=null,He=0,Ui=null,lr=null,is=0,lg=0,cg=null,HM=null,co=null,uo=null,ho=null,Wl=0,oh=null;function ei(){return pe&2&&re!==0?re&-re:Gt.T!==null?m0():Xx()}function VM(){if(Qn===0)if(!(re&536870912)||$t){var e=Ru;Ru<<=1,!(Ru&3932160)&&(Ru=262144),Qn=e}else Qn=536870912;return e=gn.current,e!==null&&(e.flags|=32),Qn}function vo(e,t){if(t!=null){var n=e.stateNode,i=n.ref;i===null&&(i=n.ref=lb(Ts(e.memoizedProps,n))),uo===null&&(uo=[]),uo.push(t.bind(null,i))}}function zn(e,t,n){(e===we&&(Se===2||Se===9)||e.cancelPendingCommit!==null)&&(yo(e,0),ra(e,re,Qn,!1)),hc(e,n),(!(pe&2)||e!==we)&&(e===we&&(!(pe&2)&&(tr|=n),Xe===4&&ra(e,re,Qn,!1)),rs(e))}function GM(e,t,n){if(pe&6)throw Error(nt(327));var i=!n&&(t&127)===0&&(t&e.expiredLanes)===0||uc(e,t),s=i?yw(e,t):om(e,t,!0),a=i;do{if(s===0){No&&!i&&ra(e,t,0,!1);break}else{if(n=e.current.alternate,a&&!_w(n)){s=om(e,t,!1),a=!1;continue}if(s===2){if(a=t,e.errorRecoveryDisabledLanes&a)var r=0;else r=e.pendingLanes&-536870913,r=r!==0?r:r&536870912?536870912:0;if(r!==0){t=r;t:{var o=e;s=Xl;var l=o.current.memoizedState.isDehydrated;if(l&&(yo(o,r).flags|=256),r=om(o,r,!1),r!==2&&r!==6){if(d0&&!l){o.errorRecoveryDisabledLanes|=a,tr|=a,s=4;break t}a=In,In=s,a!==null&&(In===null?In=a:In.push.apply(In,a))}s=r}if(a=!1,s!==2)continue}}if(s===1){yo(e,0),ra(e,t,0,!0);break}t:{switch(i=e,a=s,a){case 0:case 1:throw Error(nt(345));case 4:if((t&4194048)!==t&&(t&62914560)!==t)break;case 6:ra(i,t,Qn,!aa);break t;case 2:In=null;break;case 3:case 5:break;default:throw Error(nt(329))}if((t&62914560)===t&&(s=nf+300-jn(),10<s)){if(ra(i,t,Qn,!aa),Gh(i,0,!0)!==0)break t;is=t,i.timeoutHandle=_0(Jy.bind(null,i,n,In,Ph,og,t,Qn,tr,_o,aa,a,"Throttled",-0,0),s);break t}Jy(i,n,In,Ph,og,t,Qn,tr,_o,aa,a,null,-0,0)}}break}while(!0);rs(e)}function Jy(e,t,n,i,s,a,r,o,l,c,h,p,u,d){e.timeoutHandle=-1;var g=t.subtreeFlags,b=(a&335544064)===a;if(p=null,(b||g&8192||(g&16785408)===16785408)&&(p={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:$i},Kn=null,IM(t,a,p),b&&(g=p,b=e.containerInfo,b=(b.nodeType===9?b:b.ownerDocument).__reactViewTransition,b!=null&&(g.count++,g.waitingForViewTransition=!0,g=ac.bind(g),b.finished.then(g,g))),g=(a&62914560)===a?nf-jn():(a&4194048)===a?FM-jn():0,g=yC(p,g),g!==null)){is=a,e.cancelPendingCommit=g(Qy.bind(null,e,t,a,n,i,s,r,o,l,c,h,p,null,u,d)),ra(e,a,r,!c);return}Qy(e,t,a,n,i,s,r,o,l,c,h,p)}function _w(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var i=0;i<n.length;i++){var s=n[i],a=s.getSnapshot;s=s.value;try{if(!ni(a(),s))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function ra(e,t,n,i){t=Fx(e,t),t&=~Oh,t&=~tr,e.suspendedLanes|=t,e.pingedLanes&=~t,i&&(e.warmLanes|=t),i=e.expirationTimes;for(var s=t;0<s;){var a=31-ti(s),r=1<<a;i[a]=-1,s&=~r}n!==0&&Vx(e,n,t)}function sf(){return pe&6?!0:(_c(0,!1),!1)}function p0(){if(ae!==null){if(Se===0)var e=ae.return;else e=ae,Ss=dr=null,Qg(e),ro=null,jl=0,e=ae;for(;e!==null;)gM(e.alternate,e),e=e.return;ae=null}}function yo(e,t){var n=e.timeoutHandle;return n!==-1&&(e.timeoutHandle=-1,Fw(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),is=0,p0(),we=e,ae=n=Ms(e.current,null),re=t,Se=0,Yn=null,aa=!1,No=uc(e,t),d0=!1,_o=Qn=Oh=tr=Ma=Xe=0,In=Xl=null,og=!1,Rs=Fx(e,t),Yh(),n}function kM(e,t){Jt=null,Gt.H=Ch,t===Co||t===Kh?(t=My(),Se=3):t===kg?(t=My(),Se=4):Se=t===a0?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,Yn=t,ae===null&&(Xe=1,Rh(e,vi(t,e.current)))}function XM(){var e=gn.current;return e===null?!0:(re&4194048)===re?Sn===null:(re&62914560)===re||re&536870912?e===Sn:!1}function WM(){var e=Gt.H;return Gt.H=Ch,e===null?Ch:e}function qM(){var e=Gt.A;return Gt.A=mw,e}function Bh(){Xe=4,aa||(re&4194048)!==re&&gn.current!==null||(No=!0),!(Ma&134217727)&&!(tr&134217727)||we===null||ra(we,re,Qn,!1)}function om(e,t,n){var i=pe;pe|=2;var s=WM(),a=qM();(we!==e||re!==t)&&(Ph=null,yo(e,t)),t=!1;var r=Xe;t:do try{if(Se!==0&&ae!==null){var o=ae,l=Yn;switch(Se){case 8:p0(),r=6;break t;case 3:case 2:case 9:case 6:gn.current===null&&(t=!0);var c=Se;if(Se=0,Yn=null,eo(e,o,l,c),n&&No){r=0;break t}break;default:c=Se,Se=0,Yn=null,eo(e,o,l,c)}}vw(),r=Xe;break}catch(h){kM(e,h)}while(!0);return t&&e.shellSuspendCounter++,Ss=dr=null,pe=i,Gt.H=s,Gt.A=a,ae===null&&(we=null,re=0,Yh()),r}function vw(){for(;ae!==null;)YM(ae)}function yw(e,t){var n=pe;pe|=2;var i=WM(),s=qM();we!==e||re!==t?(Ph=null,Ih=jn()+500,yo(e,t)):No=uc(e,t);t:do try{if(Se!==0&&ae!==null){t=ae;var a=Yn;e:switch(Se){case 1:Se=0,Yn=null,eo(e,t,a,1);break;case 2:case 9:if(Sy(a)){Se=0,Yn=null,Ky(t);break}t=function(){Se!==2&&Se!==9||we!==e||(Se=7),rs(e)},a.then(t,t);break t;case 3:Se=7;break t;case 4:Se=5;break t;case 7:Sy(a)?(Se=0,Yn=null,Ky(t)):(Se=0,Yn=null,eo(e,t,a,7));break;case 5:var r=null;switch(ae.tag){case 26:r=ae.memoizedState;case 5:case 27:var o=ae;if(r?vb(r):o.stateNode.complete){Se=0,Yn=null;var l=o.sibling;if(l!==null)ae=l;else{var c=o.return;c!==null?(ae=c,af(c)):ae=null}break e}}Se=0,Yn=null,eo(e,t,a,5);break;case 6:Se=0,Yn=null,eo(e,t,a,6);break;case 8:p0(),Xe=6;break t;default:throw Error(nt(462))}}xw();break}catch(h){kM(e,h)}while(!0);return Ss=dr=null,Gt.H=i,Gt.A=s,pe=n,ae!==null?0:(we=null,re=0,Yh(),Xe)}function xw(){for(;ae!==null&&!BT();)YM(ae)}function YM(e){var t=mM(e.alternate,e,Rs);e.memoizedProps=e.pendingProps,t===null?af(e):ae=t}function Ky(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=zy(n,t,t.pendingProps,t.type,void 0,re);break;case 11:t=zy(n,t,t.pendingProps,t.type.render,t.ref,re);break;case 5:Qg(t);var i=t;i===on&&($t?(Sh(i),i.tag===5&&i.stateNode!=null&&(Le=i.stateNode)):(Sh(i),$t=!0));default:gM(n,t),t=ae=_S(t,Rs),t=mM(n,t,Rs)}e.memoizedProps=e.pendingProps,t===null?af(e):ae=t}function eo(e,t,n,i){Ss=dr=null,Qg(t),ro=null,jl=0;var s=t.return;try{if(ow(e,s,t,n,re)){Xe=1,Rh(e,vi(n,e.current)),ae=null;return}}catch(a){if(s!==null)throw ae=s,a;Xe=1,Rh(e,vi(n,e.current)),ae=null;return}t.flags&32768?($t||i===1?e=!0:No||re&536870912?e=!1:(aa=e=!0,(i===2||i===9||i===3||i===6)&&(i=gn.current,i!==null&&i.tag===13&&(i.flags|=16384))),ZM(t,e)):af(t)}function af(e){var t=e;do{if(t.flags&32768){ZM(t,aa);return}e=t.return;var n=hw(t.alternate,t,Rs);if(n!==null){ae=n;return}if(t=t.sibling,t!==null){ae=t;return}ae=t=e}while(t!==null);Xe===0&&(Xe=5)}function ZM(e,t){do{var n=fw(e.alternate,e);if(n!==null){n.flags&=32767,ae=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){ae=e;return}ae=e=n}while(e!==null);Xe=6,ae=null}function Qy(e,t,n,i,s,a,r,o,l,c,h,p){e.cancelPendingCommit=null;do rf();while(He!==0);if(pe&6)throw Error(nt(327));if(t!==null){if(t===e.current)throw Error(nt(177));e===we&&(ae=we=null,re=0),lr=t,Ui=e,is=n,cg=s,HM=i,Sw(e,t,n,r,o,l,p)}}function Sw(e,t,n,i,s,a,r){var o=t.lanes|t.childLanes;if(lg=o,o|=Bg,YT(e,n,o,i,s,a),uo=null,(n&335544064)===n?(ho=JA(e),i=10262):(ho=null,i=10256),t.subtreeFlags&i||t.flags&i?(e.callbackNode=null,e.callbackPriority=0,ww(gh,function(){return dg(),null})):(e.callbackNode=null,e.callbackPriority=0),Uh=!1,i=(t.flags&13878)!==0,t.subtreeFlags&13878||i){i=Gt.T,Gt.T=null,s=me.p,me.p=2,a=pe,pe|=4;try{dw(e,t,n)}finally{pe=a,me.p=s,Gt.T=i}}He=1,Uh?co=Ww(r,e.containerInfo,ho,ug,hg,bw,fg,dg,Mw,null,null):(ug(),hg(),fg())}function Mw(e){if(He!==0){var t=Ui.onRecoverableError;t(e,{componentStack:null})}}function bw(){He===3&&(He=0,LM(lr,Ui),He=4)}function ug(){if(He===1){He=0;var e=Ui,t=lr,n=is,i=(t.flags&13878)!==0;if(t.subtreeFlags&13878||i){i=Gt.T,Gt.T=null;var s=me.p;me.p=2;var a=pe;pe|=4;try{Ul=Lh=!1,DM(t,e,n),n=_g;var r=cS(e.containerInfo),o=n.focusedElem,l=n.selectionRange;if(r!==o&&o&&o.ownerDocument&&lS(o.ownerDocument.documentElement,o)){if(l!==null&&Pg(o)){var c=l.start,h=l.end;if(h===void 0&&(h=c),"selectionStart"in o)o.selectionStart=c,o.selectionEnd=Math.min(h,o.value.length);else{var p=o.ownerDocument||document,u=p&&p.defaultView||window;if(u.getSelection){var d=u.getSelection(),g=o.textContent.length,b=Math.min(l.start,g),_=l.end===void 0?b:Math.min(l.end,g);!d.extend&&b>_&&(r=_,_=b,b=r);var f=dy(o,b),v=dy(o,_);if(f&&v&&(d.rangeCount!==1||d.anchorNode!==f.node||d.anchorOffset!==f.offset||d.focusNode!==v.node||d.focusOffset!==v.offset)){var y=p.createRange();y.setStart(f.node,f.offset),d.removeAllRanges(),b>_?(d.addRange(y),d.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),d.addRange(y))}}}}for(p=[],d=o;d=d.parentNode;)d.nodeType===1&&p.push({element:d,left:d.scrollLeft,top:d.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<p.length;o++){var m=p[o];m.element.scrollLeft=m.left,m.element.scrollTop=m.top}}Eo=!!gg,_g=gg=null}finally{pe=a,me.p=s,Gt.T=i}}e.current=t,He=2}}function hg(){if(He===2){He=0;var e=Ui,t=lr,n=(t.flags&8772)!==0;if(t.subtreeFlags&8772||n){n=Gt.T,Gt.T=null;var i=me.p;me.p=2;var s=pe;pe|=4;try{TM(e,t.alternate,t)}finally{pe=s,me.p=i,Gt.T=n}}He=3}}function fg(){if(He===4||He===3){He=0;var e=co;co=null,zT();var t=Ui,n=lr,i=is,s=HM,a=(i&335544064)===i?10262:10256;if(n.subtreeFlags&a||n.flags&a?He=5:(He=0,lr=Ui=null,JM(t,t.pendingLanes)),a=t.pendingLanes,a===0&&(pa=null),Ng(i),n=n.stateNode,$n&&typeof $n.onCommitFiberRoot=="function")try{$n.onCommitFiberRoot(cc,n,void 0,(n.current.flags&128)===128)}catch{}if(s!==null){n=Gt.T,a=me.p,me.p=2,Gt.T=null;try{for(var r=t.onRecoverableError,o=0;o<s.length;o++){var l=s[o];r(l.value,{componentStack:l.stack})}}finally{Gt.T=n,me.p=a}}if(s=uo,r=ho,ho=null,s!==null&&(uo=null,r===null&&(r=[]),e!==null))for(l=0;l<s.length;l++)n=(0,s[l])(r),n!==void 0&&e.finished.finally(n);is&3&&rf(),rs(t),a=t.pendingLanes,i&261930&&a&42?t===oh?Wl++:(Wl=0,oh=t):(Wl=0,oh=null),_c(0,!1)}}function JM(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,pc(t)))}function rf(){return co!==null&&(co.skipTransition(),co=null),ug(),hg(),fg(),dg()}function dg(){if(He!==5)return!1;var e=Ui,t=lg;lg=0;var n=Ng(is),i=Gt.T,s=me.p;try{me.p=32>n?32:n,Gt.T=null,n=cg,cg=null;var a=Ui,r=is;if(He=0,lr=Ui=null,is=0,pe&6)throw Error(nt(331));var o=pe;if(pe|=4,BM(a.current),OM(a,a.current,r,n),pe=o,_c(0,!1),$n&&typeof $n.onPostCommitFiberRoot=="function")try{$n.onPostCommitFiberRoot(cc,a)}catch{}return!0}finally{me.p=s,Gt.T=i,JM(e,t)}}function jy(e,t,n){t=vi(n,t),t=qm(e.stateNode,t,2),e=ha(e,t,2),e!==null&&(hc(e,2),rs(e))}function be(e,t,n){if(e.tag===3)jy(e,e,n);else for(;t!==null;){if(t.tag===3){jy(t,e,n);break}else if(t.tag===1){var i=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(pa===null||!pa.has(i))){e=vi(n,e),n=uM(2),i=ha(t,n,2),i!==null&&(hM(n,i,t,e),hc(i,2),rs(i));break}}t=t.return}}function lm(e,t,n){var i=e.pingCache;if(i===null){i=e.pingCache=new gw;var s=new Set;i.set(t,s)}else s=i.get(t),s===void 0&&(s=new Set,i.set(t,s));s.has(n)||(d0=!0,s.add(n),e=Ew.bind(null,e,t,n),t.then(e,e))}function Ew(e,t,n){var i=e.pingCache;i!==null&&i.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,we===e&&(re&n)===n&&(Xe===4||Xe===3&&(re&62914560)===re&&300>jn()-nf?pe&2?Oh|=n:yo(e,0):Oh|=n,_o===re&&(_o=0)),rs(e)}function KM(e,t){t===0&&(t=Hx()),e=fr(e,t),e!==null&&(hc(e,t),rs(e))}function Tw(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),KM(e,n)}function Aw(e,t){var n=0;switch(e.tag){case 31:case 13:var i=e.stateNode,s=e.memoizedState;s!==null&&(n=s.retryLane);break;case 19:i=e.stateNode;break;case 22:i=e.stateNode._retryCache;break;default:throw Error(nt(314))}i!==null&&i.delete(t),KM(e,n)}function ww(e,t){return Cg(e,t)}var xo=null,kr=null,pg=!1,zh=!1,cm=!1,oa=0;function rs(e){e!==kr&&e.next===null&&(kr===null?xo=kr=e:kr=kr.next=e),zh=!0,pg||(pg=!0,Rw())}function _c(e,t){if(!cm&&zh){cm=!0;do for(var n=!1,i=xo;i!==null;){if(!t)if(e!==0){var s=i.pendingLanes;if(s===0)var a=0;else{var r=i.suspendedLanes,o=i.pingedLanes;a=(1<<31-ti(42|e)+1)-1,a&=s&~(r&~o),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,$y(i,a))}else a=re,a=Gh(i,i===we?a:0,i.cancelPendingCommit!==null||i.timeoutHandle!==-1),!(a&3)||uc(i,a)||(n=!0,$y(i,a));i=i.next}while(n);cm=!1}}function Cw(){QM()}function QM(){zh=pg=!1;var e=0;oa!==0&&zw()&&(e=oa);for(var t=jn(),n=null,i=xo;i!==null;){var s=i.next,a=jM(i,t);a===0?(i.next=null,n===null?xo=s:n.next=s,s===null&&(kr=n)):(n=i,(e!==0||a&3)&&(zh=!0)),i=s}He!==0&&He!==5||_c(e,!1),oa!==0&&(oa=0)}function jM(e,t){for(var n=e.suspendedLanes,i=e.pingedLanes,s=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var r=31-ti(a),o=1<<r,l=s[r];l===-1?(!(o&n)||o&i)&&(s[r]=qT(o,t)):l<=t&&(e.expiredLanes|=o),a&=~o}if(t=we,n=re,n=Gh(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i=e.callbackNode,n===0||e===t&&(Se===2||Se===9)||e.cancelPendingCommit!==null)return i!==null&&i!==null&&Vp(i),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||uc(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(i!==null&&Vp(i),Ng(n)){case 2:case 8:n=Bx;break;case 32:n=gh;break;case 268435456:n=zx;break;default:n=gh}return i=$M.bind(null,e),n=Cg(n,i),e.callbackPriority=t,e.callbackNode=n,t}return i!==null&&i!==null&&Vp(i),e.callbackPriority=2,e.callbackNode=null,2}function $M(e,t){if(He!==0&&He!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(rf()&&e.callbackNode!==n)return null;var i=re;return i=Gh(e,e===we?i:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i===0?null:(GM(e,i,t),jM(e,jn()),e.callbackNode!=null&&e.callbackNode===n?$M.bind(null,e):null)}function $y(e,t){if(rf())return null;GM(e,t,!0)}function Rw(){Hw(function(){pe&6?Cg(Px,Cw):QM()})}function m0(){if(oa===0){var e=sr;e===0&&(e=Cu,Cu<<=1,!(Cu&261888)&&(Cu=256)),oa=e}return oa}function tx(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Ju(e)}function Nw(e,t,n,i,s){if(t==="submit"&&n&&n.stateNode===s){var a=tx((s[Hn]||null).action),r=i.submitter;r&&(t=(t=r[Hn]||null)?tx(t.formAction):r.getAttribute("formAction"),t!==null&&(a=t,r=null));var o=new Xh("action","action",null,i,s);e.push({event:o,listeners:[{instance:null,listener:function(){if(i.defaultPrevented){if(oa!==0){var l=new FormData(s,r);Xm(n,{pending:!0,data:l,method:s.method,action:a},null,l)}}else typeof a=="function"&&(o.preventDefault(),l=new FormData(s,r),Xm(n,{pending:!0,data:l,method:s.method,action:a},a,l))},currentTarget:s}]})}}for(ku=0;ku<Lm.length;ku++)Xu=Lm[ku],ex=Xu.toLowerCase(),nx=Xu[0].toUpperCase()+Xu.slice(1),Li(ex,"on"+nx);var Xu,ex,nx,ku;Li(hS,"onAnimationEnd");Li(fS,"onAnimationIteration");Li(dS,"onAnimationStart");Li("dblclick","onDoubleClick");Li("focusin","onFocus");Li("focusout","onBlur");Li(VA,"onTransitionRun");Li(GA,"onTransitionStart");Li(kA,"onTransitionCancel");Li(pS,"onTransitionEnd");po("onMouseEnter",["mouseout","mouseover"]);po("onMouseLeave",["mouseout","mouseover"]);po("onPointerEnter",["pointerout","pointerover"]);po("onPointerLeave",["pointerout","pointerover"]);ur("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));ur("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));ur("onBeforeInput",["compositionend","keypress","textInput","paste"]);ur("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));ur("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));ur("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ec="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Dw=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ec));function tb(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var i=e[n],s=i.event;i=i.listeners;t:{var a=void 0;if(t)for(var r=i.length-1;0<=r;r--){var o=i[r],l=o.instance,c=o.currentTarget;if(o=o.listener,l!==a&&s.isPropagationStopped())break t;a=o,s.currentTarget=c;try{a(s)}catch(h){vh(h)}s.currentTarget=null,a=l}else for(r=0;r<i.length;r++){if(o=i[r],l=o.instance,c=o.currentTarget,o=o.listener,l!==a&&s.isPropagationStopped())break t;a=o,s.currentTarget=c;try{a(s)}catch(h){vh(h)}s.currentTarget=null,a=l}}}}function se(e,t){var n=t[Kv];n===void 0&&(n=t[Kv]=new Set);var i=e+"__bubble";n.has(i)||(eb(t,e,2,!1),n.add(i))}function um(e,t,n){var i=0;t&&(i|=4),eb(n,e,i,t)}var Wu="_reactListening"+Math.random().toString(36).slice(2);function g0(e){if(!e[Wu]){e[Wu]=!0,qx.forEach(function(n){n!=="selectionchange"&&(Dw.has(n)||um(n,!1,e),um(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Wu]||(t[Wu]=!0,um("selectionchange",!1,t))}}function eb(e,t,n,i){switch(Tb(t)){case 2:var s=bC;break;case 8:s=EC;break;default:s=b0}n=s.bind(null,t,n,e),s=void 0,!Rm||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(s=!0),i?s!==void 0?e.addEventListener(t,n,{capture:!0,passive:s}):e.addEventListener(t,n,!0):s!==void 0?e.addEventListener(t,n,{passive:s}):e.addEventListener(t,n,!1)}function hm(e,t,n,i,s){var a=i;if(!(t&1)&&!(t&2)&&i!==null)t:for(;;){if(i===null)return;var r=i.tag;if(r===3||r===4){var o=i.stateNode.containerInfo;if(o===s)break;if(r===4)for(r=i.return;r!==null;){var l=r.tag;if((l===3||l===4)&&r.stateNode.containerInfo===s)return;r=r.return}for(;o!==null;){if(r=Za(o),r===null)return;if(l=r.tag,l===5||l===6||l===26||l===27){i=a=r;continue t}o=o.parentNode}}i=i.return}tS(function(){var c=a,h=Ug(n),p=[];t:{var u=mS.get(e);if(u!==void 0){var d=Xh,g=e;switch(e){case"keypress":if(Qu(n)===0)break t;case"keydown":case"keyup":d=_A;break;case"focusin":g="focus",d=Yp;break;case"focusout":g="blur",d=Yp;break;case"beforeblur":case"afterblur":d=Yp;break;case"click":if(n.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":d=sy;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":d=aA;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":d=MA;break;case hS:case fS:case dS:d=lA;break;case pS:d=EA;break;case"scroll":case"scrollend":d=iA;break;case"wheel":d=AA;break;case"copy":case"cut":case"paste":d=uA;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":d=ry;break;case"submit":d=xA;break;case"toggle":case"beforetoggle":d=CA}var b=(t&4)!==0,_=!b&&(e==="scroll"||e==="scrollend"),f=b?u!==null?u+"Capture":null:u;b=[];for(var v=c,y;v!==null;){var m=v;if(y=m.stateNode,m=m.tag,m!==5&&m!==26&&m!==27||y===null||f===null||(m=Yl(v,f),m!=null&&b.push(nc(v,m,y))),_)break;v=v.return}0<b.length&&(u=new d(u,g,null,n,h),p.push({event:u,listeners:b}))}}if(!(t&7)){t:{if(d=e==="mouseover"||e==="pointerover",u=e==="mouseout"||e==="pointerout",d&&n!==Cm&&(g=n.relatedTarget||n.fromElement)&&(Za(g)||g[Ao]))break t;(u||d)&&(g=h.window===h?h:(d=h.ownerDocument)?d.defaultView||d.parentWindow:window,u?(d=n.relatedTarget||n.toElement,u=c,d=d?Za(d):null,d!==null&&(_=lc(d),b=d.tag,d!==_||b!==5&&b!==27&&b!==6)&&(d=null)):(u=null,d=c),u!==d&&(b=sy,m="onMouseLeave",f="onMouseEnter",v="mouse",(e==="pointerout"||e==="pointerover")&&(b=ry,m="onPointerLeave",f="onPointerEnter",v="pointer"),_=u==null?g:Nl(u),y=d==null?g:Nl(d),g=new b(m,v+"leave",u,n,h),g.target=_,g.relatedTarget=y,m=null,Za(h)===c&&(b=new b(f,v+"enter",d,n,h),b.target=y,b.relatedTarget=_,m=b),_=m,b=u&&d?gm(u,d,Uw):null,u!==null&&ix(p,g,u,b,!1),d!==null&&_!==null&&ix(p,_,d,b,!0)))}t:{if(u=c?Nl(c):window,d=u.nodeName&&u.nodeName.toLowerCase(),d==="select"||d==="input"&&u.type==="file")var M=uy;else if(cy(u))if(rS)M=zA;else{M=PA;var E=IA}else d=u.nodeName,!d||d.toLowerCase()!=="input"||u.type!=="checkbox"&&u.type!=="radio"?c&&Dg(c.elementType)&&(M=uy):M=BA;if(M&&(M=M(e,c))){aS(p,M,n,h);break t}E&&E(e,u,c)}switch(E=c?Nl(c):window,e){case"focusin":(cy(E)||E.contentEditable==="true")&&(Jr=E,Dm=c,Il=null);break;case"focusout":Il=Dm=Jr=null;break;case"mousedown":Um=!0;break;case"contextmenu":case"mouseup":case"dragend":Um=!1,py(p,n,h);break;case"selectionchange":if(HA)break;case"keydown":case"keyup":py(p,n,h)}var w;if(Ig)t:{switch(e){case"compositionstart":var x="onCompositionStart";break t;case"compositionend":x="onCompositionEnd";break t;case"compositionupdate":x="onCompositionUpdate";break t}x=void 0}else Zr?iS(e,n)&&(x="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(x="onCompositionStart");x&&(nS&&n.locale!=="ko"&&(Zr||x!=="onCompositionStart"?x==="onCompositionEnd"&&Zr&&(w=eS()):(ia=h,Lg="value"in ia?ia.value:ia.textContent,Zr=!0)),E=Fh(c,x),0<E.length&&(x=new ay(x,e,null,n,h),p.push({event:x,listeners:E}),w?x.data=w:(w=sS(n),w!==null&&(x.data=w)))),(w=NA?DA(e,n):UA(e,n))&&(x=Fh(c,"onBeforeInput"),0<x.length&&(E=new ay("onBeforeInput","beforeinput",null,n,h),p.push({event:E,listeners:x}),E.data=w)),Nw(p,e,c,n,h)}tb(p,t)})}function nc(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Fh(e,t){for(var n=t+"Capture",i=[];e!==null;){var s=e,a=s.stateNode;if(s=s.tag,s!==5&&s!==26&&s!==27||a===null||(s=Yl(e,n),s!=null&&i.unshift(nc(e,s,a)),s=Yl(e,t),s!=null&&i.push(nc(e,s,a))),e.tag===3)return i;e=e.return}return[]}function Uw(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function ix(e,t,n,i,s){for(var a=t._reactName,r=[];n!==null&&n!==i;){var o=n,l=o.alternate,c=o.stateNode;if(o=o.tag,l!==null&&l===i)break;o!==5&&o!==26&&o!==27||c===null||(l=c,s?(c=Yl(n,a),c!=null&&r.unshift(nc(n,c,l))):s||(c=Yl(n,a),c!=null&&r.push(nc(n,c,l)))),n=n.return}r.length!==0&&e.push({event:t,listeners:r})}var Lw=/\r\n?/g,Ow=/\u0000|\uFFFD/g;function sx(e){return(typeof e=="string"?e:""+e).replace(Lw,`
`).replace(Ow,"")}function nb(e,t){return t=sx(t),sx(e)===t}function Me(e,t,n,i,s,a){switch(n){case"children":if(typeof i=="string")t==="body"||t==="textarea"&&i===""||mo(e,i);else if(typeof i=="number"||typeof i=="bigint")t!=="body"&&mo(e,""+i);else return;break;case"className":Du(e,"class",i);break;case"tabIndex":Du(e,"tabindex",i);break;case"dir":case"role":case"viewBox":case"width":case"height":Du(e,n,i);break;case"style":$x(e,i,a);return;case"data":if(t!=="object"){Du(e,"data",i);break}case"src":case"href":if(i===""&&(t!=="a"||n!=="href")){e.removeAttribute(n);break}if(i==null||typeof i=="function"||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(n);break}i=Ju(i),e.setAttribute(n,i);break;case"action":case"formAction":if(typeof i=="function"){e.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof a=="function"&&(n==="formAction"?(t!=="input"&&Me(e,t,"name",s.name,s,null),Me(e,t,"formEncType",s.formEncType,s,null),Me(e,t,"formMethod",s.formMethod,s,null),Me(e,t,"formTarget",s.formTarget,s,null)):(Me(e,t,"encType",s.encType,s,null),Me(e,t,"method",s.method,s,null),Me(e,t,"target",s.target,s,null)));if(i==null||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(n);break}i=Ju(i),e.setAttribute(n,i);break;case"onClick":i!=null&&(e.onclick=$i);return;case"onScroll":i!=null&&se("scroll",e);return;case"onScrollEnd":i!=null&&se("scrollend",e);return;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(nt(61));if(n=i.__html,n!=null){if(s.children!=null)throw Error(nt(60));a?.__html!==n&&(e.innerHTML=n)}}break;case"multiple":e.multiple=i&&typeof i!="function"&&typeof i!="symbol";break;case"muted":e.muted=i&&typeof i!="function"&&typeof i!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(i==null||typeof i=="function"||typeof i=="boolean"||typeof i=="symbol"){e.removeAttribute("xlink:href");break}n=Ju(i),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,i):e.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"credentialless":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":i&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,""):e.removeAttribute(n);break;case"capture":case"download":i===!0?e.setAttribute(n,""):i!==!1&&i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,i):e.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":i!=null&&typeof i!="function"&&typeof i!="symbol"&&!isNaN(i)&&1<=i?e.setAttribute(n,i):e.removeAttribute(n);break;case"rowSpan":case"start":i==null||typeof i=="function"||typeof i=="symbol"||isNaN(i)?e.removeAttribute(n):e.setAttribute(n,i);break;case"popover":se("beforetoggle",e),se("toggle",e),Zu(e,"popover",i);break;case"xlinkActuate":vs(e,"http://www.w3.org/1999/xlink","xlink:actuate",i);break;case"xlinkArcrole":vs(e,"http://www.w3.org/1999/xlink","xlink:arcrole",i);break;case"xlinkRole":vs(e,"http://www.w3.org/1999/xlink","xlink:role",i);break;case"xlinkShow":vs(e,"http://www.w3.org/1999/xlink","xlink:show",i);break;case"xlinkTitle":vs(e,"http://www.w3.org/1999/xlink","xlink:title",i);break;case"xlinkType":vs(e,"http://www.w3.org/1999/xlink","xlink:type",i);break;case"xmlBase":vs(e,"http://www.w3.org/XML/1998/namespace","xml:base",i);break;case"xmlLang":vs(e,"http://www.w3.org/XML/1998/namespace","xml:lang",i);break;case"xmlSpace":vs(e,"http://www.w3.org/XML/1998/namespace","xml:space",i);break;case"is":Zu(e,"is",i);break;case"innerText":case"textContent":return;default:if(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")n=eA.get(n)||n,Zu(e,n,i);else return}fe=!0}function mg(e,t,n,i,s,a){switch(n){case"style":$x(e,i,a);return;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(nt(61));if(n=i.__html,n!=null){if(s.children!=null)throw Error(nt(60));a?.__html!==n&&(e.innerHTML=n)}}break;case"children":if(typeof i=="string")mo(e,i);else if(typeof i=="number"||typeof i=="bigint")mo(e,""+i);else return;break;case"onScroll":i!=null&&se("scroll",e);return;case"onScrollEnd":i!=null&&se("scrollend",e);return;case"onClick":i!=null&&(e.onclick=$i);return;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":return;case"innerText":case"textContent":return;default:if(!Yx.hasOwnProperty(n))t:{if(n[0]==="o"&&n[1]==="n"&&(s=n.endsWith("Capture"),a=n.slice(2,s?n.length-7:void 0),t=e[Hn]||null,t=t!=null?t[n]:null,typeof t=="function"&&e.removeEventListener(a,t,s),typeof i=="function")){typeof t!="function"&&t!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(a,i,s);break t}fe=!0,n in e?e[n]=i:i===!0?e.setAttribute(n,""):Zu(e,n,i)}return}fe=!0}function mn(e,t,n){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":se("error",e),se("load",e);var i=!1,s=!1,a;for(a in n)if(n.hasOwnProperty(a)){var r=n[a];if(r!=null)switch(a){case"src":i=!0;break;case"srcSet":s=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(nt(137,t));default:Me(e,t,a,r,n,null)}}s&&Me(e,t,"srcSet",n.srcSet,n,null),i&&Me(e,t,"src",n.src,n,null);return;case"input":se("invalid",e);var o=a=r=s=null,l=null,c=null;for(i in n)if(n.hasOwnProperty(i)){var h=n[i];if(h!=null)switch(i){case"name":s=h;break;case"type":r=h;break;case"checked":l=h;break;case"defaultChecked":c=h;break;case"value":a=h;break;case"defaultValue":o=h;break;case"children":case"dangerouslySetInnerHTML":if(h!=null)throw Error(nt(137,t));break;default:Me(e,t,i,h,n,null)}}Kx(e,a,o,l,c,r,s,!1);return;case"select":se("invalid",e),i=r=a=null;for(s in n)if(n.hasOwnProperty(s)&&(o=n[s],o!=null))switch(s){case"value":a=o;break;case"defaultValue":r=o;break;case"multiple":i=o;default:Me(e,t,s,o,n,null)}t=a,n=r,e.multiple=!!i,t!=null?io(e,!!i,t,!1):n!=null&&io(e,!!i,n,!0);return;case"textarea":se("invalid",e),a=s=i=null;for(r in n)if(n.hasOwnProperty(r)&&(o=n[r],o!=null))switch(r){case"value":i=o;break;case"defaultValue":s=o;break;case"children":a=o;break;case"dangerouslySetInnerHTML":if(o!=null)throw Error(nt(91));break;default:Me(e,t,r,o,n,null)}jx(e,i,s,a);return;case"option":for(l in n)if(n.hasOwnProperty(l)&&(i=n[l],i!=null))switch(l){case"selected":e.selected=i&&typeof i!="function"&&typeof i!="symbol";break;default:Me(e,t,l,i,n,null)}return;case"dialog":se("beforetoggle",e),se("toggle",e),se("cancel",e),se("close",e);break;case"iframe":case"object":se("load",e);break;case"video":case"audio":for(i=0;i<ec.length;i++)se(ec[i],e);break;case"image":se("error",e),se("load",e);break;case"details":se("toggle",e);break;case"embed":case"source":case"link":se("error",e),se("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(c in n)if(n.hasOwnProperty(c)&&(i=n[c],i!=null))switch(c){case"children":case"dangerouslySetInnerHTML":throw Error(nt(137,t));default:Me(e,t,c,i,n,null)}return;default:if(Dg(t)){for(h in n)n.hasOwnProperty(h)&&(i=n[h],i!==void 0&&mg(e,t,h,i,n,void 0));return}}for(o in n)n.hasOwnProperty(o)&&(i=n[o],i!=null&&Me(e,t,o,i,n,null))}var Iw={};function Pw(e,t,n,i){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var s=null,a=null,r=null,o=null,l=null,c=null,h=null;for(d in n){var p=n[d];if(n.hasOwnProperty(d)&&p!=null)switch(d){case"checked":break;case"value":break;case"defaultValue":l=p;default:i.hasOwnProperty(d)||Me(e,t,d,null,i,p)}}for(var u in i){var d=i[u];if(p=n[u],i.hasOwnProperty(u)&&(d!=null||p!=null))switch(u){case"type":d!==p&&(fe=!0),a=d;break;case"name":d!==p&&(fe=!0),s=d;break;case"checked":d!==p&&(fe=!0),c=d;break;case"defaultChecked":d!==p&&(fe=!0),h=d;break;case"value":d!==p&&(fe=!0),r=d;break;case"defaultValue":d!==p&&(fe=!0),o=d;break;case"children":case"dangerouslySetInnerHTML":if(d!=null)throw Error(nt(137,t));break;default:d!==p&&Me(e,t,u,d,i,p)}}wm(e,r,o,l,c,h,a,s);return;case"select":d=r=o=u=null;for(a in n)if(l=n[a],n.hasOwnProperty(a)&&l!=null)switch(a){case"value":break;case"multiple":d=l;default:i.hasOwnProperty(a)||Me(e,t,a,null,i,l)}for(s in i)if(a=i[s],l=n[s],i.hasOwnProperty(s)&&(a!=null||l!=null))switch(s){case"value":a!==l&&(fe=!0),u=a;break;case"defaultValue":a!==l&&(fe=!0),o=a;break;case"multiple":a!==l&&(fe=!0),r=a;default:a!==l&&Me(e,t,s,a,i,l)}t=o,n=r,i=d,u!=null?io(e,!!n,u,!1):!!i!=!!n&&(t!=null?io(e,!!n,t,!0):io(e,!!n,n?[]:"",!1));return;case"textarea":d=u=null;for(o in n)if(s=n[o],n.hasOwnProperty(o)&&s!=null&&!i.hasOwnProperty(o))switch(o){case"value":break;case"children":break;default:Me(e,t,o,null,i,s)}for(r in i)if(s=i[r],a=n[r],i.hasOwnProperty(r)&&(s!=null||a!=null))switch(r){case"value":s!==a&&(fe=!0),u=s;break;case"defaultValue":s!==a&&(fe=!0),d=s;break;case"children":break;case"dangerouslySetInnerHTML":if(s!=null)throw Error(nt(91));break;default:s!==a&&Me(e,t,r,s,i,a)}Qx(e,u,d);return;case"option":for(var g in n)if(u=n[g],n.hasOwnProperty(g)&&u!=null&&!i.hasOwnProperty(g))switch(g){case"selected":e.selected=!1;break;default:Me(e,t,g,null,i,u)}for(l in i)if(u=i[l],d=n[l],i.hasOwnProperty(l)&&u!==d&&(u!=null||d!=null))switch(l){case"selected":u!==d&&(fe=!0),e.selected=u&&typeof u!="function"&&typeof u!="symbol";break;default:Me(e,t,l,u,i,d)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var b in n)u=n[b],n.hasOwnProperty(b)&&u!=null&&!i.hasOwnProperty(b)&&Me(e,t,b,null,i,u);for(c in i)if(u=i[c],d=n[c],i.hasOwnProperty(c)&&u!==d&&(u!=null||d!=null))switch(c){case"children":case"dangerouslySetInnerHTML":if(u!=null)throw Error(nt(137,t));break;default:Me(e,t,c,u,i,d)}return;default:if(Dg(t)){for(var _ in n)u=n[_],n.hasOwnProperty(_)&&u!==void 0&&!i.hasOwnProperty(_)&&mg(e,t,_,void 0,i,u);for(h in i)u=i[h],d=n[h],!i.hasOwnProperty(h)||u===d||u===void 0&&d===void 0||mg(e,t,h,u,i,d);return}}for(var f in n)u=n[f],n.hasOwnProperty(f)&&u!=null&&!i.hasOwnProperty(f)&&Me(e,t,f,null,i,u);for(p in i)u=i[p],d=n[p],!i.hasOwnProperty(p)||u===d||u==null&&d==null||Me(e,t,p,u,i,d)}function ax(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function Bw(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,n=performance.getEntriesByType("resource"),i=0;i<n.length;i++){var s=n[i],a=s.transferSize,r=s.initiatorType,o=s.duration;if(a&&o&&ax(r)){for(r=0,o=s.responseEnd,i+=1;i<n.length;i++){var l=n[i],c=l.startTime;if(c>o)break;var h=l.transferSize,p=l.initiatorType;h&&ax(p)&&(l=l.responseEnd,r+=h*(l<o?1:(o-c)/(l-c)))}if(--i,t+=8*(a+r)/(s.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var gg=null,_g=null;function ic(e){return e.nodeType===9?e:e.ownerDocument}function rx(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function ib(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function sb(e,t,n,i){return n=ic(n).createElement(e),n[hn]=i,n[Hn]=t,mn(n,e,t),rn(n),n}function vg(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var fm=null;function zw(){var e=window.event;return e&&e.type==="popstate"?e===fm?!1:(fm=e,!0):(fm=null,!1)}var _0=typeof setTimeout=="function"?setTimeout:void 0,Fw=typeof clearTimeout=="function"?clearTimeout:void 0,ox=typeof Promise=="function"?Promise:void 0,lx=typeof requestAnimationFrame=="function"?requestAnimationFrame:_0,Hw=typeof queueMicrotask=="function"?queueMicrotask:typeof ox<"u"?function(e){return ox.resolve(null).then(e).catch(Vw)}:_0;function Vw(e){setTimeout(function(){throw e})}function Ea(e){return e==="head"}function cx(e,t){var n=t,i=0;do{var s=n.nextSibling;if(e.removeChild(n),s&&s.nodeType===8)if(n=s.data,n==="/$"||n==="/&"){if(i===0){e.removeChild(s),To(t);return}i--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")i++;else if(n==="html")pm(e.ownerDocument.documentElement);else if(n==="head"){n=e.ownerDocument.head,pm(n);for(var a=n.firstChild;a;){var r=a.nextSibling,o=a.nodeName;a[fc]||o==="SCRIPT"||o==="STYLE"||o==="LINK"&&a.rel.toLowerCase()==="stylesheet"||n.removeChild(a),a=r}}else n==="body"&&pm(e.ownerDocument.body);n=s}while(n);To(t)}function ux(e,t){var n=e;e=0;do{var i=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(e===0)break;e--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||e++;n=i}while(n)}function ab(e,t,n){if(t=CSS.escape(t)!==t?"r-"+btoa(t).replace(/=/g,""):t,e.style.viewTransitionName=t,n!=null&&(e.style.viewTransitionClass=n),n=getComputedStyle(e),n.display==="inline"){if(t=e.getClientRects(),t.length===1)var i=1;else for(var s=i=0;s<t.length;s++){var a=t[s];0<a.width&&0<a.height&&i++}i===1&&(e=e.style,e.display=t.length===1?"inline-block":"block",e.marginTop="-"+n.paddingTop,e.marginBottom="-"+n.paddingBottom)}}function rb(e,t){e=e.style,t=t.style;var n=t!=null?t.hasOwnProperty("viewTransitionName")?t.viewTransitionName:t.hasOwnProperty("view-transition-name")?t["view-transition-name"]:null:null;e.viewTransitionName=n==null||typeof n=="boolean"?"":(""+n).trim(),n=t!=null?t.hasOwnProperty("viewTransitionClass")?t.viewTransitionClass:t.hasOwnProperty("view-transition-class")?t["view-transition-class"]:null:null,e.viewTransitionClass=n==null||typeof n=="boolean"?"":(""+n).trim(),e.display==="inline-block"&&(t==null?e.display=e.margin="":(n=t.display,e.display=n==null||typeof n=="boolean"?"":n,n=t.margin,n!=null?e.margin=n:(n=t.hasOwnProperty("marginTop")?t.marginTop:t["margin-top"],e.marginTop=n==null||typeof n=="boolean"?"":n,t=t.hasOwnProperty("marginBottom")?t.marginBottom:t["margin-bottom"],e.marginBottom=t==null||typeof t=="boolean"?"":t)))}function ob(e,t,n){return n=n.ownerDocument.defaultView,{rect:e,abs:t.position==="absolute"||t.position==="fixed",clip:t.clipPath!=="none"||t.overflow!=="visible"||t.filter!=="none"||t.mask!=="none"||t.mask!=="none"||t.borderRadius!=="0px",view:0<=e.bottom&&0<=e.right&&e.top<=n.innerHeight&&e.left<=n.innerWidth}}function yg(e){var t=e.getBoundingClientRect(),n=getComputedStyle(e);return ob(t,n,e)}function Gw(e){var t=e.getBoundingClientRect();t=new DOMRect(t.x+2e4,t.y+2e4,t.width,t.height);var n=getComputedStyle(e);return ob(t,n,e)}function kw(e){return e.documentElement.clientHeight}function Xw(e){this.addEventListener("load",e),this.addEventListener("error",e)}function Ww(e,t,n,i,s,a,r,o,l){var c=t.nodeType===9?t:t.ownerDocument;try{var h=c.startViewTransition({update:function(){var u=c.defaultView,d=u.navigation&&u.navigation.transition,g=c.fonts.status;i();var b=[];if(g==="loaded"&&(kw(c),c.fonts.status==="loading"&&b.push(c.fonts.ready)),g=b.length,e!==null)for(var _=e.suspenseyImages,f=0,v=0;v<_.length;v++){var y=_[v];if(!y.complete){var m=y.getBoundingClientRect();if(0<m.bottom&&0<m.right&&m.top<u.innerHeight&&m.left<u.innerWidth){if(f+=yb(y),f>uh){b.length=g;break}y=new Promise(Xw.bind(y)),b.push(y)}}}if(0<b.length)return u=Promise.race([Promise.all(b),new Promise(function(M){return setTimeout(M,500)})]).then(s,s),(d?Promise.allSettled([d.finished,u]):u).then(a,a);if(s(),d)return d.finished.then(a,a);a()},types:n});c.__reactViewTransition=h;var p=[];return h.ready.then(function(){for(var u=c.documentElement.getAnimations({subtree:!0}),d=0;d<u.length;d++){var g=u[d],b=g.effect,_=b.pseudoElement;if(_!=null&&_.startsWith("::view-transition")){p.push(g),g=b.getKeyframes();for(var f=_=void 0,v=!0,y=0;y<g.length;y++){var m=g[y],M=m.width;if(_===void 0)_=M;else if(_!==M){v=!1;break}if(M=m.height,f===void 0)f=M;else if(f!==M){v=!1;break}delete m.width,delete m.height,m.transform==="none"&&delete m.transform}v&&_!==void 0&&f!==void 0&&(b.setKeyframes(g),v=getComputedStyle(b.target,b.pseudoElement),v.width!==_||v.height!==f)&&(v=g[0],v.width=_,v.height=f,v=g[g.length-1],v.width=_,v.height=f,b.setKeyframes(g))}}r()},function(u){c.__reactViewTransition===h&&(c.__reactViewTransition=null);try{if(typeof u=="object"&&u!==null)switch(u.name){case"InvalidStateError":(u.message==="View transition was skipped because document visibility state is hidden."||u.message==="Skipping view transition because document visibility state has become hidden."||u.message==="Skipping view transition because viewport size changed."||u.message==="Transition was aborted because of invalid state")&&(u=null)}u!==null&&l(u)}finally{i(),s(),r()}}),h.finished.finally(function(){for(var u=0;u<p.length;u++)p[u].cancel();c.__reactViewTransition===h&&(c.__reactViewTransition=null),o()}),h}catch{return i(),s(),r(),null}}function Ja(e,t){this._scope=document.documentElement,this._selector="::view-transition-"+e+"("+t+")"}Ja.prototype.animate=function(e,t){return t=typeof t=="number"?{duration:t}:Ce({},t),t.pseudoElement=this._selector,this._scope.animate(e,t)};Ja.prototype.getAnimations=function(){for(var e=this._scope,t=this._selector,n=e.getAnimations({subtree:!0}),i=[],s=0;s<n.length;s++){var a=n[s].effect;a!==null&&a.target===e&&a.pseudoElement===t&&i.push(n[s])}return i};Ja.prototype.getComputedStyle=function(){return getComputedStyle(this._scope,this._selector)};function lb(e){return{name:e,group:new Ja("group",e),imagePair:new Ja("image-pair",e),old:new Ja("old",e),new:new Ja("new",e)}}function ii(e){this._fragmentFiber=e,this._observers=this._eventListeners=null}ii.prototype.addEventListener=function(e,t,n){var i=null,s=null;if(!(n!=null&&typeof n!="boolean"&&(i=n.signal||null,i!==null&&i.aborted))){this._eventListeners===null&&(this._eventListeners=[]);var a=this._eventListeners;if(cb(a,e,t,n)===-1){var r=this,o=t;n!=null&&typeof n!="boolean"&&n.once===!0&&(o=function(l){r.removeEventListener(e,t,n),typeof t=="function"?t.call(this,l):t.handleEvent(l)}),i!==null&&(s=r.removeEventListener.bind(r,e,t,n),i.addEventListener("abort",s,{once:!0}),s=i.removeEventListener.bind(i,"abort",s)),i=So(n),a.push({type:e,listener:t,optionsOrUseCapture:n,attachedListener:o,cleanup:s}),Fn(this._fragmentFiber.child,!1,qw,e,o,i)}this._eventListeners=a}};function qw(e,t,n,i){return $e(e).addEventListener(t,n,i),!1}ii.prototype.removeEventListener=function(e,t,n){var i=this._eventListeners;if(i!==null&&(t=cb(i,e,t,n),t!==-1)){var s=i[t];n=s.attachedListener;var a=s.cleanup;s=So(s.optionsOrUseCapture),Fn(this._fragmentFiber.child,!1,Yw,e,n,s),i.splice(t,1),a!==null&&a()}};function Yw(e,t,n,i){return $e(e).removeEventListener(t,n,i),!1}function So(e){return e!=null&&typeof e!="boolean"&&(e.once===!0||e.signal instanceof AbortSignal)?{capture:e.capture,passive:e.passive}:e}function hx(e){return e==null?"c=0":typeof e=="boolean"?"c="+(e?"1":"0"):"c="+(e.capture?"1":"0")}function cb(e,t,n,i){if(e.length===0)return-1;i=hx(i);for(var s=0;s<e.length;s++){var a=e[s];if(a.type===t&&a.listener===n&&hx(a.optionsOrUseCapture)===i)return s}return-1}ii.prototype.dispatchEvent=function(e){var t=cr(this._fragmentFiber);if(t===null)return!0;t=$e(t);var n=this._eventListeners;if(n!==null&&0<n.length||!e.bubbles){var i=t.nodeType===9?t.createComment(""):document.createTextNode("");if(n)for(var s=0;s<n.length;s++){var a=n[s];i.addEventListener(a.type,a.attachedListener,So(a.optionsOrUseCapture))}if(t.appendChild(i),e=i.dispatchEvent(e),n)for(s=0;s<n.length;s++)a=n[s],i.removeEventListener(a.type,a.attachedListener,So(a.optionsOrUseCapture));return t.removeChild(i),e}return t.dispatchEvent(e)};ii.prototype.focus=function(e){Fn(this._fragmentFiber.child,!0,ub,e,void 0,void 0)};function ub(e,t){return e.tag===6?!1:(e=$e(e),aC(e,t))}ii.prototype.focusLast=function(e){var t=[];Fn(this._fragmentFiber.child,!0,v0,t,void 0,void 0);for(var n=t.length-1;0<=n&&!ub(t[n],e);n--);};function v0(e,t){return t.push(e),!1}ii.prototype.blur=function(){var e=cr(this._fragmentFiber);e!==null&&(e=$e(e),e=ic(e).activeElement,e!==null&&Fn(this._fragmentFiber.child,!1,Zw,e,void 0,void 0))};function Zw(e,t){return e.tag===6?!1:(e=$e(e),e===t||e.contains(t)?(t.blur(),!0):!1)}ii.prototype.observeUsing=function(e){this._observers===null&&(this._observers=new Set),this._observers.add(e),Fn(this._fragmentFiber.child,!1,Jw,e,void 0,void 0)};function Jw(e,t){return e.tag===6||(e=$e(e),t.observe(e)),!1}ii.prototype.unobserveUsing=function(e){var t=this._observers;if(t!==null&&t.has(e)){t.delete(e),Fn(this._fragmentFiber.child,!1,Kw,e,void 0,void 0);for(var n=t=0;n<Di.length;n++){var i=Di[n];i.fragmentInstance===this&&i.observer===e?e.unobserve(i.instance):Di[t++]=i}Di.length=t}};function Kw(e,t){return e.tag===6||(e=$e(e),t.unobserve(e)),!1}var Di=[],dm=!1;function Qw(e,t,n){Di.push({fragmentInstance:e,observer:t,instance:n}),dm||(dm=!0,rC(function(){dm=!1;var i=Di;Di=[];for(var s=0;s<i.length;s++){var a=i[s];a.observer.unobserve(a.instance)}}))}ii.prototype.getClientRects=function(){var e=[];return Fn(this._fragmentFiber.child,!1,jw,e,void 0,void 0),e};function jw(e,t){if(e.tag===6){e=e.stateNode;var n=e.ownerDocument.createRange();n.selectNodeContents(e),t.push.apply(t,n.getClientRects())}else e=$e(e),t.push.apply(t,e.getClientRects());return!1}ii.prototype.getRootNode=function(e){var t=cr(this._fragmentFiber);return t===null?this:$e(t).getRootNode(e)};ii.prototype.compareDocumentPosition=function(e){var t=cr(this._fragmentFiber);if(t===null)return Node.DOCUMENT_POSITION_DISCONNECTED;var n=[];Fn(this._fragmentFiber.child,!1,v0,n,void 0,void 0);var i=$e(t);if(n.length===0){if(n=i,Xv(this._fragmentFiber)){t:{for(t=this._fragmentFiber.return;t!==null;){if(t.tag===4){t=t.stateNode.containerInfo;break t}if(t.tag===3||t.tag===5||t.tag===27)break;t=t.return}t=null}t!=null&&(n=t)}t=this._fragmentFiber;var s=i=n.compareDocumentPosition(e);return n===e?s=Node.DOCUMENT_POSITION_CONTAINS:i&Node.DOCUMENT_POSITION_CONTAINED_BY&&(n=Ux(t)[1],n===null?s=Node.DOCUMENT_POSITION_PRECEDING:(e=$e(n).compareDocumentPosition(e),s=e===0||e&Node.DOCUMENT_POSITION_FOLLOWING?Node.DOCUMENT_POSITION_FOLLOWING:Node.DOCUMENT_POSITION_PRECEDING)),s|=Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC}t=$e(n[0]),s=$e(n[n.length-1]);var a=Xv(this._fragmentFiber)?t.parentElement:i;if(a==null)return Node.DOCUMENT_POSITION_DISCONNECTED;i=a.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_CONTAINED_BY,a=a.compareDocumentPosition(s)&Node.DOCUMENT_POSITION_CONTAINED_BY;var r=t.compareDocumentPosition(e),o=s.compareDocumentPosition(e),l=r&Node.DOCUMENT_POSITION_CONTAINED_BY||o&Node.DOCUMENT_POSITION_CONTAINED_BY;return o=i&&a&&r&Node.DOCUMENT_POSITION_FOLLOWING&&o&Node.DOCUMENT_POSITION_PRECEDING,t=i&&t===e||a&&s===e||l||o?Node.DOCUMENT_POSITION_CONTAINED_BY:!i&&t===e||!a&&s===e?Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC:r,t&Node.DOCUMENT_POSITION_DISCONNECTED||t&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC||$w(t,this._fragmentFiber,n[0],n[n.length-1],e)?t:Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC};function $w(e,t,n,i,s){var a=Za(s);if(e&Node.DOCUMENT_POSITION_CONTAINED_BY){if(n=!!a)t:{for(;a!==null;){if(a.tag===7&&(a===t||a.alternate===t)){n=!0;break t}a=a.return}n=!1}return n}if(e&Node.DOCUMENT_POSITION_CONTAINS){if(a===null)return a=s.ownerDocument,s===a||s===a.documentElement||s===a.body;t:{for(a=t,t=cr(t);a!==null;){if(!(a.tag!==5&&a.tag!==3&&a.tag!==27||a!==t&&a.alternate!==t)){a=!0;break t}a=a.return}a=!1}return a}return e&Node.DOCUMENT_POSITION_PRECEDING?((t=!!a)&&!(t=a===n)&&(t=gm(n,a,Wv),t===null?t=!1:(Fn(t,!0,RT,a,n),a=Xr,Xr=null,t=a!==null)),t):e&Node.DOCUMENT_POSITION_FOLLOWING?((t=!!a)&&!(t=a===i)&&(t=gm(i,a,Wv),t===null?t=!1:(Fn(t,!0,NT,a,i),a=Xr,mm=Xr=null,t=a!==null)),t):!1}function fx(e,t){var n=e.ownerDocument.createRange();n.selectNodeContents(e),e=n.getBoundingClientRect(),window.scrollTo(window.scrollX+e.left,t?window.scrollY+e.top:window.scrollY+e.bottom-window.innerHeight)}ii.prototype.scrollIntoView=function(e){if(typeof e=="object")throw Error(nt(566));var t=[];Fn(this._fragmentFiber.child,!1,v0,t,void 0,void 0);var n=e!==!1;if(t.length===0){var i=Ux(this._fragmentFiber);if(i=n?i[1]||i[0]||cr(this._fragmentFiber):i[0]||i[1],i===null)return;if(i.tag===6){e=$e(i),fx(e,n);return}if(i=$e(i),i.nodeType!==9){if(i.nodeType===11){n="host"in i?i.host:null,n!==null&&n.scrollIntoView(e);return}i.scrollIntoView(e)}}for(i=n?t.length-1:0;i!==(n?-1:t.length);){var s=t[i];s.tag===6?(s=$e(s),fx(s,n)):$e(s).scrollIntoView(e),i+=n?-1:1}};function tC(e,t){return e=$e(e),hb(e,t),!1}function hb(e,t){e.reactFragments==null&&(e.reactFragments=new Set),e.reactFragments.add(t)}function fb(e,t){var n=t._eventListeners;if(n!==null)for(var i=0;i<n.length;i++){var s=n[i];e.addEventListener(s.type,s.attachedListener,So(s.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(a){for(var r=0,o=0;o<Di.length;o++){var l=Di[o];(l.fragmentInstance!==t||l.observer!==a||l.instance!==e)&&(Di[r++]=l)}Di.length=r,a.observe(e)}),hb(e,t))}function eC(e,t){var n=t._eventListeners;if(n!==null)for(var i=0;i<n.length;i++){var s=n[i];e.removeEventListener(s.type,s.attachedListener,So(s.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(a){typeof a.rootMargin=="string"?Qw(t,a,e):a.unobserve(e)}),e.reactFragments!=null&&e.reactFragments.delete(t))}function xg(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":xg(n),kh(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}e.removeChild(n)}}function nC(e,t,n,i){for(;e.nodeType===1;){var s=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!i&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(i){if(!e[fc])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(a=e.getAttribute("rel"),a==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(a!==s.rel||e.getAttribute("href")!==(s.href==null||s.href===""?null:s.href)||e.getAttribute("crossorigin")!==(s.crossOrigin==null?null:s.crossOrigin)||e.getAttribute("title")!==(s.title==null?null:s.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(a=e.getAttribute("src"),(a!==(s.src==null?null:s.src)||e.getAttribute("type")!==(s.type==null?null:s.type)||e.getAttribute("crossorigin")!==(s.crossOrigin==null?null:s.crossOrigin))&&a&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var a=s.name==null?null:""+s.name;if(s.type==="hidden"&&e.getAttribute("name")===a)return e}else return e;if(e=xi(e.nextSibling),e===null)break}return null}function iC(e,t,n){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=xi(e.nextSibling),e===null))return null;return e}function db(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=xi(e.nextSibling),e===null))return null;return e}function Sg(e){return e.data==="$?"||e.data==="$~"}function y0(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function sC(e,t){var n=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||n.readyState!=="loading")t();else{var i=function(){t(),n.removeEventListener("DOMContentLoaded",i)};n.addEventListener("DOMContentLoaded",i),e._reactRetry=i}}function xi(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var Mg=null;function dx(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"||n==="/&"){if(t===0)return xi(e.nextSibling);t--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||t++}e=e.nextSibling}return null}function px(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(t===0)return e;t--}else n!=="/$"&&n!=="/&"||t++}e=e.previousSibling}return null}function aC(e,t){function n(){i=!0}if(e.ownerDocument.activeElement===e)return!0;var i=!1;try{e.ownerDocument.addEventListener("focus",n,!0),(e.focus||HTMLElement.prototype.focus).call(e,t)}finally{e.ownerDocument.removeEventListener("focus",n,!0)}return i}function rC(e){lx(function(){lx(function(t){return e(t)})})}function pb(e,t,n){switch(t=ic(n),e){case"html":if(e=t.documentElement,!e)throw Error(nt(452));return e;case"head":if(e=t.head,!e)throw Error(nt(453));return e;case"body":if(e=t.body,!e)throw Error(nt(454));return e;default:throw Error(nt(451))}}function mb(e,t,n){for(var i in n){var s=n[i];n.hasOwnProperty(i)&&s!=null&&Me(e,t,i,null,Iw,s)}n.dangerouslySetInnerHTML!=null&&(e.textContent=""),e.onclick===$i&&(e.onclick=null),kh(e)}function pm(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);kh(e)}var Si=new Map,mx=new Set;function sc(e){if(typeof e.getRootNode=="function"){var t=e.getRootNode();if(t.nodeType===9||t.nodeType===11)return t}return e.nodeType===9?e:e.ownerDocument}var Us=me.d;me.d={f:oC,r:lC,D:cC,C:uC,L:hC,m:fC,X:pC,S:dC,M:mC};function oC(){var e=Us.f(),t=sf();return e||t}function lC(e){var t=wo(e);t!==null&&t.tag===5&&t.type==="form"?$S(t):Us.r(e)}var Do=typeof document>"u"?null:document;function gb(e,t,n){var i=Do;if(i&&typeof t=="string"&&t){var s=_i(t);s='link[rel="'+e+'"][href="'+s+'"]',typeof n=="string"&&(s+='[crossorigin="'+n+'"]'),mx.has(s)||(mx.add(s),e={rel:e,crossOrigin:n,href:t},i.querySelector(s)===null&&(t=i.createElement("link"),mn(t,"link",e),rn(t),i.head.appendChild(t)))}}function cC(e){Us.D(e),gb("dns-prefetch",e,null)}function uC(e,t){Us.C(e,t),gb("preconnect",e,t)}function hC(e,t,n){Us.L(e,t,n);var i=Do;if(i&&e&&t){var s='link[rel="preload"][as="'+_i(t)+'"]';t==="image"&&n&&n.imageSrcSet?(s+='[imagesrcset="'+_i(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(s+='[imagesizes="'+_i(n.imageSizes)+'"]')):s+='[href="'+_i(e)+'"]';var a=s;switch(t){case"style":a=Mo(e);break;case"script":a=Uo(e)}if(!(Si.has(a)||(e=Ce({rel:"preload",href:t==="image"&&n&&n.imageSrcSet?void 0:e,as:t},n),Si.set(a,e),i.querySelector(s)!==null||t==="style"&&i.querySelector(vc(a))||t==="script"&&i.querySelector(yc(a))))){var r=i.createElement("link");mn(r,"link",e),t==="style"&&(r[_h]=!0,r.onload=r.onerror=function(){Wx(r)}),rn(r),i.head.appendChild(r)}}}function fC(e,t){Us.m(e,t);var n=Do;if(n&&e){var i=t&&typeof t.as=="string"?t.as:"script",s='link[rel="modulepreload"][as="'+_i(i)+'"][href="'+_i(e)+'"]',a=s;switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":a=Uo(e)}if(!Si.has(a)&&(e=Ce({rel:"modulepreload",href:e},t),Si.set(a,e),n.querySelector(s)===null)){switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(yc(a)))return}i=n.createElement("link"),mn(i,"link",e),rn(i),n.head.appendChild(i)}}}function dC(e,t,n){Us.S(e,t,n);var i=Do;if(i&&e){var s=no(i).hoistableStyles,a=Mo(e);t=t||"default";var r=s.get(a);if(!r){var o={loading:0,preload:null};if(r=i.querySelector(vc(a)))o.loading=5;else{e=Ce({rel:"stylesheet",href:e,"data-precedence":t},n),(n=Si.get(a))&&x0(e,n);var l=r=i.createElement("link");rn(l),mn(l,"link",e),l._p=new Promise(function(c,h){l.onload=c,l.onerror=h}),l.addEventListener("load",function(){o.loading|=1}),l.addEventListener("error",function(){o.loading|=2}),o.loading|=4,lh(r,t,i)}r={type:"stylesheet",instance:r,count:1,state:o},s.set(a,r)}}}function pC(e,t){Us.X(e,t);var n=Do;if(n&&e){var i=no(n).hoistableScripts,s=Uo(e),a=i.get(s);a||(a=n.querySelector(yc(s)),a||(e=Ce({src:e,async:!0},t),(t=Si.get(s))&&S0(e,t),a=n.createElement("script"),rn(a),mn(a,"link",e),n.head.appendChild(a)),a={type:"script",instance:a,count:1,state:null},i.set(s,a))}}function mC(e,t){Us.M(e,t);var n=Do;if(n&&e){var i=no(n).hoistableScripts,s=Uo(e),a=i.get(s);a||(a=n.querySelector(yc(s)),a||(e=Ce({src:e,async:!0,type:"module"},t),(t=Si.get(s))&&S0(e,t),a=n.createElement("script"),rn(a),mn(a,"link",e),n.head.appendChild(a)),a={type:"script",instance:a,count:1,state:null},i.set(s,a))}}function gx(e,t,n,i){var s=(s=la.current)?sc(s):null;if(!s)throw Error(nt(446));switch(e){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(n=Mo(n.href),t=no(s).hoistableStyles,i=t.get(n),i||(i={type:"style",instance:null,count:0,state:null},t.set(n,i)),i):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){e=Mo(n.href);var a=no(s).hoistableStyles,r=a.get(e);if(r||(s=s.ownerDocument||s,r={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},a.set(e,r),(a=s.querySelector(vc(e)))?a._p||(r.instance=a,r.state.loading=5):(a=Si.get(e),a||(a={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},Si.set(e,a)),gC(s,e,a,r.state))),t&&i===null)throw Error(nt(528,""));return r}if(t&&i!==null)throw Error(nt(529,""));return null;case"script":return t=n.async,n=n.src,typeof n=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(n=Uo(n),t=no(s).hoistableScripts,i=t.get(n),i||(i={type:"script",instance:null,count:0,state:null},t.set(n,i)),i):{type:"void",instance:null,count:0,state:null};default:throw Error(nt(444,e))}}function Mo(e){return'href="'+_i(e)+'"'}function vc(e){return'link[rel="stylesheet"]['+e+"]"}function _b(e){return Ce({},e,{"data-precedence":e.precedence,precedence:null})}function gC(e,t,n,i){if(t=e.querySelector('link[rel="preload"][as="style"]['+t+"]")){if(t[_h]!==!0){i.loading=1;return}}else t=e.createElement("link"),t[_h]=!0,t.onload=t.onerror=Wx.bind(null,t),mn(t,"link",n),rn(t),e.head.appendChild(t);i.preload=t,t.addEventListener("load",function(){return i.loading|=1}),t.addEventListener("error",function(){return i.loading|=2})}function Uo(e){return'[src="'+_i(e)+'"]'}function yc(e){return"script[async]"+e}function _x(e,t,n){if(t.count++,t.instance===null)switch(t.type){case"style":var i=e.querySelector('style[data-href~="'+_i(n.href)+'"]');if(i)return t.instance=i,rn(i),i;var s=Ce({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return i=(e.ownerDocument||e).createElement("style"),rn(i),mn(i,"style",s),lh(i,n.precedence,e),t.instance=i;case"stylesheet":s=Mo(n.href);var a=e.querySelector(vc(s));if(a)return t.state.loading|=4,t.instance=a,rn(a),a;i=_b(n),(s=Si.get(s))&&x0(i,s),a=(e.ownerDocument||e).createElement("link"),rn(a);var r=a;return r._p=new Promise(function(o,l){r.onload=o,r.onerror=l}),mn(a,"link",i),t.state.loading|=4,lh(a,n.precedence,e),t.instance=a;case"script":return a=Uo(n.src),(s=e.querySelector(yc(a)))?(t.instance=s,rn(s),s):(i=n,(s=Si.get(a))&&(i=Ce({},n),S0(i,s)),e=e.ownerDocument||e,s=e.createElement("script"),rn(s),mn(s,"link",i),e.head.appendChild(s),t.instance=s);case"void":return null;default:throw Error(nt(443,t.type))}else t.type==="stylesheet"&&!(t.state.loading&4)&&(i=t.instance,t.state.loading|=4,lh(i,n.precedence,e));return t.instance}function lh(e,t,n){for(var i=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),s=i.length?i[i.length-1]:null,a=s,r=0;r<i.length;r++){var o=i[r];if(o.dataset.precedence===t)a=o;else if(a!==s)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function x0(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function S0(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var ch=null;function vx(e,t,n){if(ch===null){var i=new Map,s=ch=new Map;s.set(n,i)}else s=ch,i=s.get(n),i||(i=new Map,s.set(n,i));if(i.has(e))return i;for(i.set(e,null),n=n.getElementsByTagName(e),s=0;s<n.length;s++){var a=n[s];if(!(a[fc]||a[hn]||e==="link"&&a.getAttribute("rel")==="stylesheet")&&a.namespaceURI!=="http://www.w3.org/2000/svg"){var r=a.getAttribute(t)||"";r=e+r;var o=i.get(r);o?o.push(a):i.set(r,[a])}}return i}function bg(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t==="title"?e.querySelector("head > title"):null)}function _C(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;switch(t.rel){case"stylesheet":return e=t.disabled,typeof t.precedence=="string"&&e==null;default:return!0}case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function yx(e,t){return e==="img"&&t.src!=null&&t.src!==""&&t.onLoad==null&&t.loading!=="lazy"}function vb(e){return!(e.type==="stylesheet"&&!(e.state.loading&3))}function yb(e){return(e.width||100)*(e.height||100)*(typeof devicePixelRatio=="number"?devicePixelRatio:1)*.25}function xx(e,t){typeof t.decode=="function"&&(e.imgCount++,t.complete||(e.imgBytes+=yb(t),e.suspenseyImages.push(t)),e=xC.bind(e),t.decode().then(e,e))}function vC(e,t,n,i){if(n.type==="stylesheet"&&(typeof i.media!="string"||matchMedia(i.media).matches!==!1)&&!(n.state.loading&4)){if(n.instance===null){var s=Mo(i.href),a=t.querySelector(vc(s));if(a){t=a._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=ac.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,rn(a);return}a=t.ownerDocument||t,i=_b(i),(s=Si.get(s))&&x0(i,s),a=a.createElement("link"),rn(a);var r=a;r._p=new Promise(function(o,l){r.onload=o,r.onerror=l}),mn(a,"link",i),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=ac.bind(e),t.addEventListener("load",n),t.addEventListener("error",n))}}var uh=0;function yC(e,t){return e.stylesheets&&e.count===0&&hh(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var i=setTimeout(function(){if(e.stylesheets&&hh(e,e.stylesheets),e.unsuspend){var a=e.unsuspend;e.unsuspend=null,a()}},6e4+t);0<e.imgBytes&&uh===0&&(uh=62500*Bw());var s=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&hh(e,e.stylesheets),e.unsuspend)){var a=e.unsuspend;e.unsuspend=null,a()}},(e.imgBytes>uh?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(i),clearTimeout(s)}}:null}function xb(e){if(e.count===0&&(e.imgCount===0||!e.waitingForImages)){if(e.stylesheets)hh(e,e.stylesheets);else if(e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}}}function ac(){this.count--,xb(this)}function xC(){this.imgCount--,xb(this)}var Hh=null;function hh(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Hh=new Map,t.forEach(SC,e),Hh=null,ac.call(e))}function SC(e,t){if(!(t.state.loading&4)){var n=Hh.get(e);if(n)var i=n.get(null);else{n=new Map,Hh.set(e,n);for(var s=e.querySelectorAll("link[data-precedence],style[data-precedence]"),a=0;a<s.length;a++){var r=s[a];(r.nodeName==="LINK"||r.getAttribute("media")!=="not all")&&(n.set(r.dataset.precedence,r),i=r)}i&&n.set(null,i)}s=t.instance,r=s.getAttribute("data-precedence"),a=n.get(r)||i,a===i&&n.set(null,s),n.set(r,s),this.count++,i=ac.bind(this),s.addEventListener("load",i),s.addEventListener("error",i),a?a.parentNode.insertBefore(s,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(s,e.firstChild)),t.state.loading|=4}}var bo={$$typeof:ji,Provider:null,Consumer:null,_currentValue:Ka,_currentValue2:Ka,_threadCount:0};function MC(e,t,n,i,s,a,r,o,l){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Gp(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Gp(0),this.hiddenUpdates=Gp(null),this.identifierPrefix=i,this.onUncaughtError=s,this.onCaughtError=a,this.onRecoverableError=r,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=l,this.transitionTypes=null,this.incompleteTransitions=new Map}function Sb(e,t,n,i,s,a,r,o,l,c,h,p){return e=new MC(e,t,n,r,l,c,h,p,o),t=1,a===!0&&(t|=24),a=Bn(3,null,null,t),e.current=a,a.stateNode=e,t=Vg(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:i,isDehydrated:n,cache:t},Xg(a),e}function Mb(e){return e?(e=jr,e):jr}function bb(e,t,n,i,s,a){s=Mb(s),i.context===null?i.context=s:i.pendingContext=s,i=ua(t),i.payload={element:n},a=a===void 0?null:a,a!==null&&(i.callback=a),n=ha(e,i,t),n!==null&&(zn(n,e,t),Bl(n,e,t))}function Sx(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function M0(e,t){Sx(e,t),(e=e.alternate)&&Sx(e,t)}function Eb(e){if(e.tag===13||e.tag===31){var t=fr(e,67108864);t!==null&&zn(t,e,67108864),M0(e,67108864)}}function Mx(e){if(e.tag===13||e.tag===31){var t=ei();t=Rg(t);var n=fr(e,t);n!==null&&zn(n,e,t),M0(e,t)}}var Eo=!0;function bC(e,t,n,i){var s=Gt.T;Gt.T=null;var a=me.p;try{me.p=2,b0(e,t,n,i)}finally{me.p=a,Gt.T=s}}function EC(e,t,n,i){var s=Gt.T;Gt.T=null;var a=me.p;try{me.p=8,b0(e,t,n,i)}finally{me.p=a,Gt.T=s}}function b0(e,t,n,i){if(Eo){var s=Eg(i);if(s===null)hm(e,t,i,Vh,n),bx(e,i);else if(AC(s,e,t,n,i))i.stopPropagation();else if(bx(e,i),t&4&&-1<TC.indexOf(e)){for(;s!==null;){var a=wo(s);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var r=Wa(a.pendingLanes);if(r!==0){var o=a;for(o.pendingLanes|=2,o.entangledLanes|=2;r;){var l=1<<31-ti(r);o.entanglements[1]|=l,r&=~l}rs(a),!(pe&6)&&(Ih=jn()+500,_c(0,!1))}}break;case 31:case 13:o=fr(a,2),o!==null&&zn(o,a,2),sf(),M0(a,2)}if(a=Eg(i),a===null&&hm(e,t,i,Vh,n),a===s)break;s=a}s!==null&&i.stopPropagation()}else hm(e,t,i,null,n)}}function Eg(e){return e=Ug(e),E0(e)}var Vh=null;function E0(e){if(Vh=null,e=Za(e),e!==null){var t=lc(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=Rx(t),e!==null)return e;e=null}else if(n===31){if(e=Nx(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return Vh=e,null}function Tb(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"fullscreenerror":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"resize":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(FT()){case Px:return 2;case Bx:return 8;case gh:case HT:return 32;case zx:return 268435456;default:return 32}default:return 32}}var Tg=!1,ma=null,ga=null,_a=null,rc=new Map,oc=new Map,ea=[],TC="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function bx(e,t){switch(e){case"focusin":case"focusout":ma=null;break;case"dragenter":case"dragleave":ga=null;break;case"mouseover":case"mouseout":_a=null;break;case"pointerover":case"pointerout":rc.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":oc.delete(t.pointerId)}}function Al(e,t,n,i,s,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:i,nativeEvent:a,targetContainers:[s]},t!==null&&(t=wo(t),t!==null&&Eb(t)),e):(e.eventSystemFlags|=i,t=e.targetContainers,s!==null&&t.indexOf(s)===-1&&t.push(s),e)}function AC(e,t,n,i,s){switch(t){case"focusin":return ma=Al(ma,e,t,n,i,s),!0;case"dragenter":return ga=Al(ga,e,t,n,i,s),!0;case"mouseover":return _a=Al(_a,e,t,n,i,s),!0;case"pointerover":var a=s.pointerId;return rc.set(a,Al(rc.get(a)||null,e,t,n,i,s)),!0;case"gotpointercapture":return a=s.pointerId,oc.set(a,Al(oc.get(a)||null,e,t,n,i,s)),!0}return!1}function Ab(e){var t=Za(e.target);if(t!==null){var n=lc(t);if(n!==null){if(t=n.tag,t===13){if(t=Rx(n),t!==null){e.blockedOn=t,Jv(e.priority,function(){Mx(n)});return}}else if(t===31){if(t=Nx(n),t!==null){e.blockedOn=t,Jv(e.priority,function(){Mx(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function fh(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Eg(e.nativeEvent);if(n===null){n=e.nativeEvent;var i=new n.constructor(n.type,n);Cm=i,n.target.dispatchEvent(i),Cm=null}else return t=wo(n),t!==null&&Eb(t),e.blockedOn=n,!1;t.shift()}return!0}function Ex(e,t,n){fh(e)&&n.delete(t)}function wC(){Tg=!1,ma!==null&&fh(ma)&&(ma=null),ga!==null&&fh(ga)&&(ga=null),_a!==null&&fh(_a)&&(_a=null),rc.forEach(Ex),oc.forEach(Ex)}function qu(e,t){e.blockedOn===t&&(e.blockedOn=null,Tg||(Tg=!0,tn.unstable_scheduleCallback(tn.unstable_NormalPriority,wC)))}var Yu=null;function Tx(e){Yu!==e&&(Yu=e,tn.unstable_scheduleCallback(tn.unstable_NormalPriority,function(){Yu===e&&(Yu=null);for(var t=0;t<e.length;t+=3){var n=e[t],i=e[t+1],s=e[t+2];if(typeof i!="function"){if(E0(i||n)===null)continue;break}var a=wo(n);a!==null&&(e.splice(t,3),t-=3,Xm(a,{pending:!0,data:s,method:n.method,action:i},i,s))}}))}function To(e){function t(l){return qu(l,e)}ma!==null&&qu(ma,e),ga!==null&&qu(ga,e),_a!==null&&qu(_a,e),rc.forEach(t),oc.forEach(t);for(var n=0;n<ea.length;n++){var i=ea[n];i.blockedOn===e&&(i.blockedOn=null)}for(;0<ea.length&&(n=ea[0],n.blockedOn===null);)Ab(n),n.blockedOn===null&&ea.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(i=0;i<n.length;i+=3){var s=n[i],a=n[i+1],r=s[Hn]||null;if(typeof a=="function")r||Tx(n);else if(r){var o=null;if(a&&a.hasAttribute("formAction")){if(s=a,r=a[Hn]||null)o=r.formAction;else if(E0(s)!==null)continue}else o=r.action;typeof o=="function"?n[i+1]=o:(n.splice(i,3),i-=3),Tx(n)}}}function wb(){function e(a){a.canIntercept&&a.info==="react-transition"&&a.intercept({handler:function(){return new Promise(function(r){return s=r})},focusReset:"manual",scroll:"manual"})}function t(){s!==null&&(s(),s=null),i||setTimeout(n,20)}function n(){if(!i&&!navigation.transition){var a=navigation.currentEntry;a&&a.url!=null&&navigation.navigate(a.url,{state:a.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var i=!1,s=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(n,100),function(){i=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),s!==null&&(s(),s=null)}}}function T0(e){this._internalRoot=e}of.prototype.render=T0.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(nt(409));var n=t.current,i=ei();bb(n,i,e,t,null,null)};of.prototype.unmount=T0.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;bb(e.current,2,null,e,null,null),sf(),t[Ao]=null}};function of(e){this._internalRoot=e}of.prototype.unstable_scheduleHydration=function(e){if(e){var t=Xx();e={blockedOn:null,target:e,priority:t};for(var n=0;n<ea.length&&t!==0&&t<ea[n].priority;n++);ea.splice(n,0,e),n===0&&Ab(e)}};var Ax=wx.version;if(Ax!=="19.3.1")throw Error(nt(527,Ax,"19.3.1"));me.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(nt(188)):(e=Object.keys(e).join(","),Error(nt(268,e)));return e=CT(t),e=e!==null?Dx(e):null,e=e===null?null:e.stateNode,e};var CC={bundleType:0,version:"19.3.1",rendererPackageName:"react-dom",currentDispatcherRef:Gt,reconcilerVersion:"19.3.1"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"&&(wl=__REACT_DEVTOOLS_GLOBAL_HOOK__,!wl.isDisabled&&wl.supportsFiber))try{cc=wl.inject(CC),$n=wl}catch{}var wl;lf.createRoot=function(e,t){if(!Cx(e))throw Error(nt(299));var n=!1,i="",s=oM,a=lM,r=cM;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(i=t.identifierPrefix),t.onUncaughtError!==void 0&&(s=t.onUncaughtError),t.onCaughtError!==void 0&&(a=t.onCaughtError),t.onRecoverableError!==void 0&&(r=t.onRecoverableError)),t=Sb(e,1,!1,null,null,n,i,null,s,a,r,wb),e[Ao]=t.current,g0(e),new T0(t)};lf.hydrateRoot=function(e,t,n){if(!Cx(e))throw Error(nt(299));var i=!1,s="",a=oM,r=lM,o=cM,l=null;return n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onUncaughtError!==void 0&&(a=n.onUncaughtError),n.onCaughtError!==void 0&&(r=n.onCaughtError),n.onRecoverableError!==void 0&&(o=n.onRecoverableError),n.formState!==void 0&&(l=n.formState)),t=Sb(e,1,!0,t,n??null,i,s,l,a,r,o,wb),t.context=Mb(null),n=t.current,i=ei(),i=Rg(i),s=ua(i),s.callback=null,ha(n,s,i),n=i,t.current.lanes=n,hc(t,n),rs(t),e[Ao]=t.current,g0(e),new of(t)};lf.version="19.3.1"});var Db=Wi((QU,Nb)=>{"use strict";function Rb(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Rb)}catch(e){console.error(e)}}Rb(),Nb.exports=Cb()});var pr,Ta,cf=Lr(()=>{pr=[{id:"pulse",name:"Market pulse",symbol:"eye",colour:"#78dcca"},{id:"team",name:"Agent team",symbol:"conversation",colour:"#9dbdff"},{id:"crm",name:"Prospect CRM",symbol:"magnifier",colour:"#e6b46c"},{id:"build",name:"Initiative delivery",symbol:"wrench",colour:"#f19c9a"},{id:"measure",name:"Analytics",symbol:"chart",colour:"#c3a6f5"}],Ta=[{domain:2,next:3,label:"A prospect raises an objection",title:"Build around the friction customers report.",text:"Studio owners say they would switch booking apps if they could keep their current appointments. The Growth Manager checks which prospects raised it and how it affects their decisions.",work:"Record the replies in Traction CRM. Agree an initiative for the Builder to test calendar import with those studios.",record:"Prospect replies, the repeated objection and the agreed scope.",handoff:"CRM evidence \u2192 Builder",packet:"Customer objection"},{domain:0,next:1,label:"A competitor changes its fees",title:"Check whether conditions have changed for your customers.",text:"A booking platform raises its fees. Intel finds the announcement. The Growth Manager checks whether independent studios using it are looking to switch.",work:"Bring a sourced market change into the team\u2019s decisions. You can pursue the opportunity or revisit it when you know more.",record:"Source, date and the customer segment it could affect.",handoff:"Intel \u2192 Growth Manager",packet:"Market signal"},{domain:4,next:1,label:"Customer behaviour changes",title:"Read the outcome and choose what to do next.",text:"Check the trial and first-booking events, then compare cohorts. More studios in this example got a first booking after calendar import. Paid conversion and repeat use still need evidence.",cohorts:[{label:"Before",completed:12,enrolled:40},{label:"After",completed:18,enrolled:40}],work:"Analytics links the comparison to the initiative. The Growth Manager uses the result and customer replies to decide whether there\u2019s enough evidence for a follow-up.",record:"First-booking comparison and the result still to check.",handoff:"Analytics evidence \u2192 Growth Manager",packet:"Outcome evidence"},{domain:3,next:4,label:"An improvement goes live",title:"Check the release and measure what customers do.",text:"After you approve a release of calendar import, the Builder checks that a studio can import its appointments and take its first booking.",work:"Attach the live release and checked events to the initiative. Analytics uses them to compare customer behaviour with the baseline.",record:"Live release, customer-path check and measurement plan.",handoff:"Shipped initiative \u2192 Analytics",packet:"Release and measurement plan"},{domain:1,next:2,label:"The team spots a better audience",title:"Put customer research behind the next priority.",text:"The Growth Manager finds that independent studios ask about moving appointments, while larger businesses need features your app doesn\u2019t offer. You agree to focus research on smaller studios.",work:"Apply the agreed criteria in Traction CRM. Research prospects who match and keep the evidence of fit with each record.",record:"Target segment, reason to focus and the next research question.",handoff:"Growth Manager \u2192 Traction CRM",packet:"Agreed prospect criteria"}]});function RC(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function NC(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function Lc(e){return document.createElementNS("http://www.w3.org/1999/xhtml",e)}function W1(){let e=Lc("canvas");return e.style.display="block",e}function D_(...e){let t="THREE."+e.shift();Ko?Ko("log",t,...e):console.log(t,...e)}function q1(e){let t=e[0];if(typeof t=="string"&&t.startsWith("TSL:")){let n=e[1];n&&n.isStackTrace?e[0]+=" "+n.getLocation():e[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return e}function Ft(...e){e=q1(e);let t="THREE."+e.shift();if(Ko)Ko("warn",t,...e);else{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function Vt(...e){e=q1(e);let t="THREE."+e.shift();if(Ko)Ko("error",t,...e);else{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function xr(...e){let t=e.join(" ");t in Ub||(Ub[t]=!0,Ft(...e))}function Y1(e,t,n){return new Promise(function(i,s){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:s();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:i()}}setTimeout(a,n)})}function Cr(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Mn[e&255]+Mn[e>>8&255]+Mn[e>>16&255]+Mn[e>>24&255]+"-"+Mn[t&255]+Mn[t>>8&255]+"-"+Mn[t>>16&15|64]+Mn[t>>24&255]+"-"+Mn[n&63|128]+Mn[n>>8&255]+"-"+Mn[n>>16&255]+Mn[n>>24&255]+Mn[i&255]+Mn[i>>8&255]+Mn[i>>16&255]+Mn[i>>24&255]).toLowerCase()}function te(e,t,n){return Math.max(t,Math.min(n,e))}function U_(e,t){return(e%t+t)%t}function DC(e,t,n,i,s){return i+(e-t)*(s-i)/(n-t)}function UC(e,t,n){return e!==t?(n-e)/(t-e):0}function Ac(e,t,n){return(1-n)*e+n*t}function LC(e,t,n,i){return Ac(e,t,1-Math.exp(-n*i))}function OC(e,t=1){return t-Math.abs(U_(e,t*2)-t)}function IC(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function PC(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function BC(e,t){return e+Math.floor(Math.random()*(t-e+1))}function zC(e,t){return e+Math.random()*(t-e)}function FC(e){return e*(.5-Math.random())}function HC(e){e!==void 0&&(Lb=e);let t=Lb+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function VC(e){return e*Yo}function GC(e){return e*Qo}function kC(e){return e>0&&Number.isInteger(e)&&2**Math.round(Math.log2(e))===e}function XC(e){return Math.pow(2,Math.ceil(Math.log(e)/Math.LN2))}function WC(e){return Math.pow(2,Math.floor(Math.log(e)/Math.LN2))}function qC(e,t,n,i,s){let a=Math.cos,r=Math.sin,o=a(n/2),l=r(n/2),c=a((t+i)/2),h=r((t+i)/2),p=a((t-i)/2),u=r((t-i)/2),d=a((i-t)/2),g=r((i-t)/2);switch(s){case"XYX":e.set(o*h,l*p,l*u,o*c);break;case"YZY":e.set(l*u,o*h,l*p,o*c);break;case"ZXZ":e.set(l*p,l*u,o*h,o*c);break;case"XZX":e.set(o*h,l*g,l*d,o*c);break;case"YXY":e.set(l*d,o*h,l*g,o*c);break;case"ZYZ":e.set(l*g,l*d,o*h,o*c);break;default:Ft("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function qo(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:case Uint8ClampedArray:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Un(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function YC(){let e={enabled:!0,workingColorSpace:Nc,spaces:{},convert:function(s,a,r){return this.enabled===!1||a===r||!a||!r||(this.spaces[a].transfer===ye&&(s.r=Fs(s.r),s.g=Fs(s.g),s.b=Fs(s.b)),this.spaces[a].primaries!==this.spaces[r].primaries&&(s.applyMatrix3(this.spaces[a].toXYZ),s.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===ye&&(s.r=Zo(s.r),s.g=Zo(s.g),s.b=Zo(s.b))),s},workingToColorSpace:function(s,a){return this.convert(s,this.workingColorSpace,a)},colorSpaceToWorking:function(s,a){return this.convert(s,a,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Xs?Dc:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,a=this.workingColorSpace){return s.fromArray(this.spaces[a].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,a,r){return s.copy(this.spaces[a].toXYZ).multiply(this.spaces[r].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,a){return xr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),e.workingToColorSpace(s,a)},toWorkingColorSpace:function(s,a){return xr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),e.colorSpaceToWorking(s,a)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return e.define({[Nc]:{primaries:t,whitePoint:i,transfer:Dc,toXYZ:Ib,fromXYZ:Pb,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:ri},outputColorSpaceConfig:{drawingBufferColorSpace:ri}},[ri]:{primaries:t,whitePoint:i,transfer:ye,toXYZ:Ib,fromXYZ:Pb,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:ri}}}),e}function Fs(e){return e<.04045?e*.0773993808:Math.pow(e*.9478672986+.0521327014,2.4)}function Zo(e){return e<.0031308?e*12.92:1.055*Math.pow(e,.41666)-.055}function C0(e){return typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap?Kf.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(Ft("Texture: Unable to serialize Texture."),{})}function D0(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}function F0(e,t,n,i,s){for(let a=0,r=e.length-3;a<=r;a+=3){gr.fromArray(e,a);let o=s.x*Math.abs(gr.x)+s.y*Math.abs(gr.y)+s.z*Math.abs(gr.z),l=t.dot(gr),c=n.dot(gr),h=i.dot(gr);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}function cR(e,t,n,i,s,a,r,o){let l;if(t.side===Ln?l=i.intersectTriangle(r,a,s,!0,o):l=i.intersectTriangle(s,a,r,t.side===Pa,o),l===null)return null;Ef.copy(o),Ef.applyMatrix4(e.matrixWorld);let c=n.ray.origin.distanceTo(Ef);return c<n.near||c>n.far?null:{distance:c,point:Ef.clone(),object:e}}function Tf(e,t,n,i,s,a,r,o,l,c){e.getVertexPosition(o,xf),e.getVertexPosition(l,Sf),e.getVertexPosition(c,Mf);let h=cR(e,t,n,i,xf,Sf,Mf,Yb);if(h){let p=new N;zs.getBarycoord(Yb,xf,Sf,Mf,p),s&&(h.uv=zs.getInterpolatedAttribute(s,o,l,c,p,new gt)),a&&(h.uv1=zs.getInterpolatedAttribute(a,o,l,c,p,new gt)),r&&(h.normal=zs.getInterpolatedAttribute(r,o,l,c,p,new N),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new N,materialIndex:0};zs.getNormal(xf,Sf,Mf,u.normal),h.face=u,h.barycoord=p}return h}function Cf(e,t,n,i,s,a,r){let o=e.geometry.attributes.position;if(td.fromBufferAttribute(o,s),ed.fromBufferAttribute(o,a),n.distanceSqToSegment(td,ed,W0,Jb)>i)return;W0.applyMatrix4(e.matrixWorld);let c=t.ray.origin.distanceTo(W0);if(!(c<t.near||c>t.far))return{distance:c,point:Jb.clone().applyMatrix4(e.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:e}}function $b(e,t,n,i,s,a,r){let o=e_.distanceSqToPoint(e);if(o<n){let l=new N;e_.closestPointToPoint(e,l),l.applyMatrix4(i);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;a.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:r})}}function L_(){let e=0,t=0,n=0,i=0;function s(a,r,o,l){e=a,t=o,n=-3*a+3*r-2*o-l,i=2*a-2*r+o+l}return{initCatmullRom:function(a,r,o,l,c){s(r,o,c*(o-a),c*(l-r))},initNonuniformCatmullRom:function(a,r,o,l,c,h,p){let u=(r-a)/c-(o-a)/(c+h)+(o-r)/h,d=(o-r)/h-(l-r)/(h+p)+(l-o)/p;u*=h,d*=h,s(r,o,u,d)},calc:function(a){let r=a*a,o=r*a;return e+t*a+n*r+i*o}}}function n1(e,t,n,i,s){let a=(i-t)*.5,r=(s-n)*.5,o=e*e,l=e*o;return(2*n-2*i+a+r)*l+(-3*n+3*i-2*a-r)*o+a*e+n}function hR(e,t){let n=1-e;return n*n*t}function fR(e,t){return 2*(1-e)*e*t}function dR(e,t){return e*e*t}function wc(e,t,n,i){return hR(e,t)+fR(e,n)+dR(e,i)}function pR(e,t){let n=1-e;return n*n*n*t}function mR(e,t){let n=1-e;return 3*n*n*e*t}function gR(e,t){return 3*(1-e)*e*e*t}function _R(e,t){return e*e*e*t}function Cc(e,t,n,i,s){return pR(e,t)+mR(e,n)+gR(e,i)+_R(e,s)}function vR(e,t,n=2){let i=t&&t.length,s=i?t[0]*n:e.length,a=K1(e,0,s,n,!0),r=[];if(!a||a.next===a.prev)return r;let o,l,c;if(i&&(a=bR(e,t,a,n)),e.length>80*n){o=e[0],l=e[1];let h=o,p=l;for(let u=n;u<s;u+=n){let d=e[u],g=e[u+1];d<o&&(o=d),g<l&&(l=g),d>h&&(h=d),g>p&&(p=g)}c=Math.max(h-o,p-l),c=c!==0?32767/c:0}return Jc(a,r,n,o,l,c,0),r}function K1(e,t,n,i,s){let a;if(s===OR(e,t,n,i)>0)for(let r=t;r<n;r+=i)a=i1(r/i|0,e[r],e[r+1],a);else for(let r=n-i;r>=t;r-=i)a=i1(r/i|0,e[r],e[r+1],a);return a&&rl(a,a.next)&&(Qc(a),a=a.next),a}function Er(e,t){if(!e)return e;t||(t=e);let n=e,i;do if(i=!1,!n.steiner&&(rl(n,n.next)||Ve(n.prev,n,n.next)===0)){if(Qc(n),n=t=n.prev,n===n.next)break;i=!0}else n=n.next;while(i||n!==t);return t}function Jc(e,t,n,i,s,a,r){if(!e)return;!r&&a&&CR(e,i,s,a);let o=e;for(;e.prev!==e.next;){let l=e.prev,c=e.next;if(a?xR(e,i,s,a):yR(e)){t.push(l.i,e.i,c.i),Qc(e),e=c.next,o=c.next;continue}if(e=c,e===o){r?r===1?(e=SR(Er(e),t),Jc(e,t,n,i,s,a,2)):r===2&&MR(e,t,n,i,s,a):Jc(Er(e),t,n,i,s,a,1);break}}}function yR(e){let t=e.prev,n=e,i=e.next;if(Ve(t,n,i)>=0)return!1;let s=t.x,a=n.x,r=i.x,o=t.y,l=n.y,c=i.y,h=Math.min(s,a,r),p=Math.min(o,l,c),u=Math.max(s,a,r),d=Math.max(o,l,c),g=i.next;for(;g!==t;){if(g.x>=h&&g.x<=u&&g.y>=p&&g.y<=d&&Tc(s,o,a,l,r,c,g.x,g.y)&&Ve(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function xR(e,t,n,i){let s=e.prev,a=e,r=e.next;if(Ve(s,a,r)>=0)return!1;let o=s.x,l=a.x,c=r.x,h=s.y,p=a.y,u=r.y,d=Math.min(o,l,c),g=Math.min(h,p,u),b=Math.max(o,l,c),_=Math.max(h,p,u),f=n_(d,g,t,n,i),v=n_(b,_,t,n,i),y=e.prevZ,m=e.nextZ;for(;y&&y.z>=f&&m&&m.z<=v;){if(y.x>=d&&y.x<=b&&y.y>=g&&y.y<=_&&y!==s&&y!==r&&Tc(o,h,l,p,c,u,y.x,y.y)&&Ve(y.prev,y,y.next)>=0||(y=y.prevZ,m.x>=d&&m.x<=b&&m.y>=g&&m.y<=_&&m!==s&&m!==r&&Tc(o,h,l,p,c,u,m.x,m.y)&&Ve(m.prev,m,m.next)>=0))return!1;m=m.nextZ}for(;y&&y.z>=f;){if(y.x>=d&&y.x<=b&&y.y>=g&&y.y<=_&&y!==s&&y!==r&&Tc(o,h,l,p,c,u,y.x,y.y)&&Ve(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;m&&m.z<=v;){if(m.x>=d&&m.x<=b&&m.y>=g&&m.y<=_&&m!==s&&m!==r&&Tc(o,h,l,p,c,u,m.x,m.y)&&Ve(m.prev,m,m.next)>=0)return!1;m=m.nextZ}return!0}function SR(e,t){let n=e;do{let i=n.prev,s=n.next.next;!rl(i,s)&&j1(i,n,n.next,s)&&Kc(i,s)&&Kc(s,i)&&(t.push(i.i,n.i,s.i),Qc(n),Qc(n.next),n=e=s),n=n.next}while(n!==e);return Er(n)}function MR(e,t,n,i,s,a){let r=e;do{let o=r.next.next;for(;o!==r.prev;){if(r.i!==o.i&&DR(r,o)){let l=$1(r,o);r=Er(r,r.next),l=Er(l,l.next),Jc(r,t,n,i,s,a,0),Jc(l,t,n,i,s,a,0);return}o=o.next}r=r.next}while(r!==e)}function bR(e,t,n,i){let s=[];for(let a=0,r=t.length;a<r;a++){let o=t[a]*i,l=a<r-1?t[a+1]*i:e.length,c=K1(e,o,l,i,!1);c===c.next&&(c.steiner=!0),s.push(NR(c))}s.sort(ER);for(let a=0;a<s.length;a++)n=TR(s[a],n);return n}function ER(e,t){let n=e.x-t.x;if(n===0&&(n=e.y-t.y,n===0)){let i=(e.next.y-e.y)/(e.next.x-e.x),s=(t.next.y-t.y)/(t.next.x-t.x);n=i-s}return n}function TR(e,t){let n=AR(e,t);if(!n)return t;let i=$1(n,e);return Er(i,i.next),Er(n,n.next)}function AR(e,t){let n=t,i=e.x,s=e.y,a=-1/0,r;if(rl(e,n))return n;do{if(rl(e,n.next))return n.next;if(s<=n.y&&s>=n.next.y&&n.next.y!==n.y){let p=n.x+(s-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(p<=i&&p>a&&(a=p,r=n.x<n.next.x?n:n.next,p===i))return r}n=n.next}while(n!==t);if(!r)return null;let o=r,l=r.x,c=r.y,h=1/0;n=r;do{if(i>=n.x&&n.x>=l&&i!==n.x&&Q1(s<c?i:a,s,l,c,s<c?a:i,s,n.x,n.y)){let p=Math.abs(s-n.y)/(i-n.x);Kc(n,e)&&(p<h||p===h&&(n.x>r.x||n.x===r.x&&wR(r,n)))&&(r=n,h=p)}n=n.next}while(n!==o);return r}function wR(e,t){return Ve(e.prev,e,t.prev)<0&&Ve(t.next,e,e.next)<0}function CR(e,t,n,i){let s=e;do s.z===0&&(s.z=n_(s.x,s.y,t,n,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==e);s.prevZ.nextZ=null,s.prevZ=null,RR(s)}function RR(e){let t,n=1;do{let i=e,s;e=null;let a=null;for(t=0;i;){t++;let r=i,o=0;for(let c=0;c<n&&(o++,r=r.nextZ,!!r);c++);let l=n;for(;o>0||l>0&&r;)o!==0&&(l===0||!r||i.z<=r.z)?(s=i,i=i.nextZ,o--):(s=r,r=r.nextZ,l--),a?a.nextZ=s:e=s,s.prevZ=a,a=s;i=r}a.nextZ=null,n*=2}while(t>1);return e}function n_(e,t,n,i,s){return e=(e-n)*s|0,t=(t-i)*s|0,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e|t<<1}function NR(e){let t=e,n=e;do(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next;while(t!==e);return n}function Q1(e,t,n,i,s,a,r,o){return(s-r)*(t-o)>=(e-r)*(a-o)&&(e-r)*(i-o)>=(n-r)*(t-o)&&(n-r)*(a-o)>=(s-r)*(i-o)}function Tc(e,t,n,i,s,a,r,o){return!(e===r&&t===o)&&Q1(e,t,n,i,s,a,r,o)}function DR(e,t){return e.next.i!==t.i&&e.prev.i!==t.i&&!UR(e,t)&&(Kc(e,t)&&Kc(t,e)&&LR(e,t)&&(Ve(e.prev,e,t.prev)||Ve(e,t.prev,t))||rl(e,t)&&Ve(e.prev,e,e.next)>0&&Ve(t.prev,t,t.next)>0)}function Ve(e,t,n){return(t.y-e.y)*(n.x-t.x)-(t.x-e.x)*(n.y-t.y)}function rl(e,t){return e.x===t.x&&e.y===t.y}function j1(e,t,n,i){let s=If(Ve(e,t,n)),a=If(Ve(e,t,i)),r=If(Ve(n,i,e)),o=If(Ve(n,i,t));return!!(s!==a&&r!==o||s===0&&Of(e,n,t)||a===0&&Of(e,i,t)||r===0&&Of(n,e,i)||o===0&&Of(n,t,i))}function Of(e,t,n){return t.x<=Math.max(e.x,n.x)&&t.x>=Math.min(e.x,n.x)&&t.y<=Math.max(e.y,n.y)&&t.y>=Math.min(e.y,n.y)}function If(e){return e>0?1:e<0?-1:0}function UR(e,t){let n=e;do{if(n.i!==e.i&&n.next.i!==e.i&&n.i!==t.i&&n.next.i!==t.i&&j1(n,n.next,e,t))return!0;n=n.next}while(n!==e);return!1}function Kc(e,t){return Ve(e.prev,e,e.next)<0?Ve(e,t,e.next)>=0&&Ve(e,e.prev,t)>=0:Ve(e,t,e.prev)<0||Ve(e,e.next,t)<0}function LR(e,t){let n=e,i=!1,s=(e.x+t.x)/2,a=(e.y+t.y)/2;do n.y>a!=n.next.y>a&&n.next.y!==n.y&&s<(n.next.x-n.x)*(a-n.y)/(n.next.y-n.y)+n.x&&(i=!i),n=n.next;while(n!==e);return i}function $1(e,t){let n=i_(e.i,e.x,e.y),i=i_(t.i,t.x,t.y),s=e.next,a=t.prev;return e.next=t,t.prev=e,n.next=s,s.prev=n,i.next=n,n.prev=i,a.next=i,i.prev=a,i}function i1(e,t,n,i){let s=i_(e,t,n);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function Qc(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}function i_(e,t,n){return{i:e,x:t,y:n,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function OR(e,t,n,i){let s=0;for(let a=t,r=n-i;a<n;a+=i)s+=(e[r]-e[a])*(e[a+1]+e[r+1]),r=a;return s}function s1(e){let t=e.length;t>2&&e[t-1].equals(e[0])&&e.pop()}function a1(e,t){for(let n=0;n<t.length;n++)e.push(t[n].x),e.push(t[n].y)}function PR(e,t,n){if(n.shapes=[],Array.isArray(e))for(let i=0,s=e.length;i<s;i++){let a=e[i];n.shapes.push(a.uuid)}else n.shapes.push(e.uuid);return n.options=Object.assign({},t),t.extrudePath!==void 0&&(n.options.extrudePath=t.extrudePath.toJSON()),n}function r1(e,t,n){let i=`${e.x},${e.y},${e.z}-${t.x},${t.y},${t.z}`,s=`${t.x},${t.y},${t.z}-${e.x},${e.y},${e.z}`;return n.has(i)===!0||n.has(s)===!0?!1:(n.add(i),n.add(s),!0)}function Rr(e){let t={};for(let n in e){t[n]={};for(let i in e[n]){let s=e[n][i];if(o1(s))s.isRenderTargetTexture?(Ft("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[n][i]=null):t[n][i]=s.clone();else if(Array.isArray(s))if(o1(s[0])){let a=[];for(let r=0,o=s.length;r<o;r++)a[r]=s[r].clone();t[n][i]=a}else t[n][i]=s.slice();else t[n][i]=s}}return t}function Tn(e){let t={};for(let n=0;n<e.length;n++){let i=Rr(e[n]);for(let s in i)t[s]=i[s]}return t}function o1(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function BR(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function O_(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:oe.workingColorSpace}function ko(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT=="number"?new t(e):Array.prototype.slice.call(e)}function K0(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}function eE(e,t,n,i,s){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*i+e*e*e*s}function HR(e,t,n,i,s){let a=1-e;return 3*a*a*(n-t)+6*a*e*(i-n)+3*e*e*(s-i)}function VR(e,t,n,i,s){let a=(e-t)/(s-t);for(let r=0;r<8;r++){let o=eE(a,t,n,i,s)-e;if(Math.abs(o)<1e-10)break;let l=HR(a,t,n,i,s);if(Math.abs(l)<1e-10)break;a=Math.max(0,Math.min(1,a-o/l))}return a}function l1(e,t){for(let n=0,i=e.length;n!==i;n+=2)e[n]*=t}function B_(e,t,n,i){let s=KR(i);switch(n){case A_:return e*t;case C_:return e*t/s.components*s.byteLength;case Nd:return e*t/s.components*s.byteLength;case Ha:return e*t*2/s.components*s.byteLength;case Dd:return e*t*2/s.components*s.byteLength;case w_:return e*t*3/s.components*s.byteLength;case Ai:return e*t*4/s.components*s.byteLength;case Ud:return e*t*4/s.components*s.byteLength;case uu:case hu:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case fu:case du:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Od:case Pd:return Math.max(e,16)*Math.max(t,8)/4;case Ld:case Id:return Math.max(e,8)*Math.max(t,8)/2;case Bd:case zd:case Hd:case Vd:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Fd:case pu:case Gd:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case kd:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Xd:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case Wd:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case qd:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case Yd:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case Zd:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case Jd:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case Kd:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case Qd:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case jd:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case $d:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case tp:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case ep:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case np:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case ip:case sp:case ap:return Math.ceil(e/4)*Math.ceil(t/4)*16;case rp:case op:return Math.ceil(e/4)*Math.ceil(t/4)*8;case mu:case lp:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function KR(e){switch(e){case ui:case M_:return{byteLength:1,components:1};case ul:case b_:case Gi:return{byteLength:2,components:1};case Cd:case Rd:return{byteLength:2,components:4};case Hi:case wd:case Vi:return{byteLength:4,components:1};case E_:case T_:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}var bd,h1,o_,f1,ou,d1,ll,Pa,Ln,ds,ps,cl,l_,c_,u_,p1,Ar,m1,g1,_1,v1,y1,x1,S1,M1,h_,f_,b1,E1,T1,A1,w1,C1,R1,N1,D1,Hf,Vf,Gf,Jo,kf,Xf,Wf,qf,d_,U1,L1,Fi,p_,m_,g_,__,v_,y_,x_,S_,Ba,wr,Ed,Td,lu,Yf,ls,Zf,cn,O1,cu,_n,Ad,za,ui,M_,b_,ul,wd,Hi,Vi,Gi,Cd,Rd,hl,E_,T_,A_,w_,Ai,cs,Fa,C_,Nd,Ha,Dd,Ud,uu,hu,fu,du,Ld,Od,Id,Pd,Bd,zd,Fd,Hd,Vd,pu,Gd,kd,Xd,Wd,qd,Yd,Zd,Jd,Kd,Qd,jd,$d,tp,ep,np,ip,sp,ap,rp,op,mu,lp,Rc,Jf,zf,Q0,j0,$0,t_,I1,R_,P1,Xs,ri,Nc,Dc,ye,Ff,B1,z1,F1,H1,cp,V1,G1,up,k1,X1,N_,zi,Uc,Ub,Ko,Z1,us,Mn,Lb,Yo,Qo,fl,gt,Ei,N,A0,Ob,qt,w0,Ib,Pb,oe,Lo,Kf,ZC,jo,JC,R0,Gn,Ge,Qf,kn,Oc,jf,Ie,Oo,Oi,KC,QC,Aa,uf,si,Bb,zb,hs,Ic,jC,Fb,Io,Ls,hf,xc,$C,tR,Hb,Vb,Gb,kb,eR,Po,N0,Xn,bi,nR,$o,J1,wa,ff,ce,bn,Pc,Ii,Os,U0,Is,Bo,zo,Xb,L0,O0,I0,P0,B0,z0,zs,fs,Ps,Pi,df,Fo,Ho,Vo,Ca,Ra,mr,Sc,pf,mf,gr,Qe,gf,iR,Vn,Bc,zc,le,sR,Mc,H0,Da,aR,Mi,V0,Go,ai,bc,ln,xe,G0,rR,oR,Bi,lR,Hs,Bs,k0,_f,vf,tl,Sr,Wb,_r,yf,qb,xf,Sf,Mf,X0,bf,Yb,Ef,Wn,$f,vr,uR,Af,Fc,el,td,ed,Zb,Ec,wf,W0,Jb,nl,Kb,Qb,Vs,Gs,jb,e_,Rf,Nf,ks,Hc,Ua,nd,Vc,Ti,il,Gc,Df,Uf,q0,Lf,kc,oi,sl,id,t1,e1,Y0,Z0,J0,sd,Xc,ad,Wc,al,qc,Mr,Yc,rd,od,Zc,br,s_,yr,ol,IR,jc,$c,tu,Tr,eu,nu,iu,tE,zR,FR,li,ld,cd,ud,La,hd,fd,dd,pd,ci,Oa,md,gd,_d,su,Ia,vd,yd,nE,xd,Pf,Bf,os,au,Na,c1,u1,En,ru,Xo,Wo,Sd,Md,I_,GR,P_,kR,XR,WR,qR,YR,ZR,JR,a_,Be,$U,r_,z_=Lr(()=>{bd="186",h1=0,o_=1,f1=2,ou=1,d1=2,ll=3,Pa=0,Ln=1,ds=2,ps=0,cl=1,l_=2,c_=3,u_=4,p1=5,Ar=100,m1=101,g1=102,_1=103,v1=104,y1=200,x1=201,S1=202,M1=203,h_=204,f_=205,b1=206,E1=207,T1=208,A1=209,w1=210,C1=211,R1=212,N1=213,D1=214,Hf=0,Vf=1,Gf=2,Jo=3,kf=4,Xf=5,Wf=6,qf=7,d_=0,U1=1,L1=2,Fi=0,p_=1,m_=2,g_=3,__=4,v_=5,y_=6,x_=7,S_=300,Ba=301,wr=302,Ed=303,Td=304,lu=306,Yf=1e3,ls=1001,Zf=1002,cn=1003,O1=1004,cu=1005,_n=1006,Ad=1007,za=1008,ui=1009,M_=1010,b_=1011,ul=1012,wd=1013,Hi=1014,Vi=1015,Gi=1016,Cd=1017,Rd=1018,hl=1020,E_=35902,T_=35899,A_=1021,w_=1022,Ai=1023,cs=1026,Fa=1027,C_=1028,Nd=1029,Ha=1030,Dd=1031,Ud=1033,uu=33776,hu=33777,fu=33778,du=33779,Ld=35840,Od=35841,Id=35842,Pd=35843,Bd=36196,zd=37492,Fd=37496,Hd=37488,Vd=37489,pu=37490,Gd=37491,kd=37808,Xd=37809,Wd=37810,qd=37811,Yd=37812,Zd=37813,Jd=37814,Kd=37815,Qd=37816,jd=37817,$d=37818,tp=37819,ep=37820,np=37821,ip=36492,sp=36494,ap=36495,rp=36283,op=36284,mu=36285,lp=36286,Rc=2300,Jf=2301,zf=2302,Q0=2303,j0=2400,$0=2401,t_=2402,I1=3200,R_=0,P1=1,Xs="",ri="srgb",Nc="srgb-linear",Dc="linear",ye="srgb",Ff=7680,B1=519,z1=512,F1=513,H1=514,cp=515,V1=516,G1=517,up=518,k1=519,X1=35044,N_="300 es",zi=2e3,Uc=2001;Ub={},Ko=null;Z1={[Hf]:Vf,[Gf]:Wf,[kf]:qf,[Jo]:Xf,[Vf]:Hf,[Wf]:Gf,[qf]:kf,[Xf]:Jo},us=class{addEventListener(t,n){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(n)===-1&&i[t].push(n)}hasEventListener(t,n){let i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(n)!==-1}removeEventListener(t,n){let i=this._listeners;if(i===void 0)return;let s=i[t];if(s!==void 0){let a=s.indexOf(n);a!==-1&&s.splice(a,1)}}dispatchEvent(t){let n=this._listeners;if(n===void 0)return;let i=n[t.type];if(i!==void 0){t.target=this;let s=i.slice(0);for(let a=0,r=s.length;a<r;a++)s[a].call(this,t);t.target=null}}},Mn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Lb=1234567,Yo=Math.PI/180,Qo=180/Math.PI;fl={DEG2RAD:Yo,RAD2DEG:Qo,generateUUID:Cr,clamp:te,euclideanModulo:U_,mapLinear:DC,inverseLerp:UC,lerp:Ac,damp:LC,pingpong:OC,smoothstep:IC,smootherstep:PC,randInt:BC,randFloat:zC,randFloatSpread:FC,seededRandom:HC,degToRad:VC,radToDeg:GC,isPowerOfTwo:kC,ceilPowerOfTwo:XC,floorPowerOfTwo:WC,setQuaternionFromProperEuler:qC,normalize:Un,denormalize:qo},gt=class e{static{e.prototype.isVector2=!0}constructor(t=0,n=0){this.x=t,this.y=n}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,n){return this.x=t,this.y=n,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let n=this.x,i=this.y,s=t.elements;return this.x=s[0]*n+s[3]*i+s[6],this.y=s[1]*n+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,n){return this.x=te(this.x,t.x,n.x),this.y=te(this.y,t.y,n.y),this}clampScalar(t,n){return this.x=te(this.x,t,n),this.y=te(this.y,t,n),this}clampLength(t,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(te(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;let i=this.dot(t)/n;return Math.acos(te(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let n=this.x-t.x,i=this.y-t.y;return n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this}rotateAround(t,n){let i=Math.cos(n),s=Math.sin(n),a=this.x-t.x,r=this.y-t.y;return this.x=a*i-r*s+t.x,this.y=a*s+r*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Ei=class{constructor(t=0,n=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=n,this._z=i,this._w=s}static slerpFlat(t,n,i,s,a,r,o){let l=i[s+0],c=i[s+1],h=i[s+2],p=i[s+3],u=a[r+0],d=a[r+1],g=a[r+2],b=a[r+3];if(p!==b||l!==u||c!==d||h!==g){let _=l*u+c*d+h*g+p*b;_<0&&(u=-u,d=-d,g=-g,b=-b,_=-_);let f=1-o;if(_<.9995){let v=Math.acos(_),y=Math.sin(v);f=Math.sin(f*v)/y,o=Math.sin(o*v)/y,l=l*f+u*o,c=c*f+d*o,h=h*f+g*o,p=p*f+b*o}else{l=l*f+u*o,c=c*f+d*o,h=h*f+g*o,p=p*f+b*o;let v=1/Math.sqrt(l*l+c*c+h*h+p*p);l*=v,c*=v,h*=v,p*=v}}t[n]=l,t[n+1]=c,t[n+2]=h,t[n+3]=p}static multiplyQuaternionsFlat(t,n,i,s,a,r){let o=i[s],l=i[s+1],c=i[s+2],h=i[s+3],p=a[r],u=a[r+1],d=a[r+2],g=a[r+3];return t[n]=o*g+h*p+l*d-c*u,t[n+1]=l*g+h*u+c*p-o*d,t[n+2]=c*g+h*d+o*u-l*p,t[n+3]=h*g-o*p-l*u-c*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,n,i,s){return this._x=t,this._y=n,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,n=!0){let i=t._x,s=t._y,a=t._z,r=t._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(s/2),p=o(a/2),u=l(i/2),d=l(s/2),g=l(a/2);switch(r){case"XYZ":this._x=u*h*p+c*d*g,this._y=c*d*p-u*h*g,this._z=c*h*g+u*d*p,this._w=c*h*p-u*d*g;break;case"YXZ":this._x=u*h*p+c*d*g,this._y=c*d*p-u*h*g,this._z=c*h*g-u*d*p,this._w=c*h*p+u*d*g;break;case"ZXY":this._x=u*h*p-c*d*g,this._y=c*d*p+u*h*g,this._z=c*h*g+u*d*p,this._w=c*h*p-u*d*g;break;case"ZYX":this._x=u*h*p-c*d*g,this._y=c*d*p+u*h*g,this._z=c*h*g-u*d*p,this._w=c*h*p+u*d*g;break;case"YZX":this._x=u*h*p+c*d*g,this._y=c*d*p+u*h*g,this._z=c*h*g-u*d*p,this._w=c*h*p-u*d*g;break;case"XZY":this._x=u*h*p-c*d*g,this._y=c*d*p-u*h*g,this._z=c*h*g+u*d*p,this._w=c*h*p+u*d*g;break;default:Ft("Quaternion: .setFromEuler() encountered an unknown order: "+r)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,n){let i=n/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let n=t.elements,i=n[0],s=n[4],a=n[8],r=n[1],o=n[5],l=n[9],c=n[2],h=n[6],p=n[10],u=i+o+p;if(u>0){let d=.5/Math.sqrt(u+1);this._w=.25/d,this._x=(h-l)*d,this._y=(a-c)*d,this._z=(r-s)*d}else if(i>o&&i>p){let d=2*Math.sqrt(1+i-o-p);this._w=(h-l)/d,this._x=.25*d,this._y=(s+r)/d,this._z=(a+c)/d}else if(o>p){let d=2*Math.sqrt(1+o-i-p);this._w=(a-c)/d,this._x=(s+r)/d,this._y=.25*d,this._z=(l+h)/d}else{let d=2*Math.sqrt(1+p-i-o);this._w=(r-s)/d,this._x=(a+c)/d,this._y=(l+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,n){let i=t.dot(n)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*n.z-t.z*n.y,this._y=t.z*n.x-t.x*n.z,this._z=t.x*n.y-t.y*n.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(te(this.dot(t),-1,1)))}rotateTowards(t,n){let i=this.angleTo(t);if(i===0)return this;let s=Math.min(1,n/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,n){let i=t._x,s=t._y,a=t._z,r=t._w,o=n._x,l=n._y,c=n._z,h=n._w;return this._x=i*h+r*o+s*c-a*l,this._y=s*h+r*l+a*o-i*c,this._z=a*h+r*c+i*l-s*o,this._w=r*h-i*o-s*l-a*c,this._onChangeCallback(),this}slerp(t,n){let i=t._x,s=t._y,a=t._z,r=t._w,o=this.dot(t);o<0&&(i=-i,s=-s,a=-a,r=-r,o=-o);let l=1-n;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,n=Math.sin(n*c)/h,this._x=this._x*l+i*n,this._y=this._y*l+s*n,this._z=this._z*l+a*n,this._w=this._w*l+r*n,this._onChangeCallback()}else this._x=this._x*l+i*n,this._y=this._y*l+s*n,this._z=this._z*l+a*n,this._w=this._w*l+r*n,this.normalize();return this}slerpQuaternions(t,n,i){return this.copy(t).slerp(n,i)}random(){let t=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),a=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),a*Math.sin(n),a*Math.cos(n))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,n=0){return this._x=t[n],this._y=t[n+1],this._z=t[n+2],this._w=t[n+3],this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._w,t}fromBufferAttribute(t,n){return this._x=t.getX(n),this._y=t.getY(n),this._z=t.getZ(n),this._w=t.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},N=class e{static{e.prototype.isVector3=!0}constructor(t=0,n=0,i=0){this.x=t,this.y=n,this.z=i}set(t,n,i){return i===void 0&&(i=this.z),this.x=t,this.y=n,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,n){return this.x=t.x*n.x,this.y=t.y*n.y,this.z=t.z*n.z,this}applyEuler(t){return this.applyQuaternion(Ob.setFromEuler(t))}applyAxisAngle(t,n){return this.applyQuaternion(Ob.setFromAxisAngle(t,n))}applyMatrix3(t){let n=this.x,i=this.y,s=this.z,a=t.elements;return this.x=a[0]*n+a[3]*i+a[6]*s,this.y=a[1]*n+a[4]*i+a[7]*s,this.z=a[2]*n+a[5]*i+a[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let n=this.x,i=this.y,s=this.z,a=t.elements,r=1/(a[3]*n+a[7]*i+a[11]*s+a[15]);return this.x=(a[0]*n+a[4]*i+a[8]*s+a[12])*r,this.y=(a[1]*n+a[5]*i+a[9]*s+a[13])*r,this.z=(a[2]*n+a[6]*i+a[10]*s+a[14])*r,this}applyQuaternion(t){let n=this.x,i=this.y,s=this.z,a=t.x,r=t.y,o=t.z,l=t.w,c=2*(r*s-o*i),h=2*(o*n-a*s),p=2*(a*i-r*n);return this.x=n+l*c+r*p-o*h,this.y=i+l*h+o*c-a*p,this.z=s+l*p+a*h-r*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let n=this.x,i=this.y,s=this.z,a=t.elements;return this.x=a[0]*n+a[4]*i+a[8]*s,this.y=a[1]*n+a[5]*i+a[9]*s,this.z=a[2]*n+a[6]*i+a[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,n){return this.x=te(this.x,t.x,n.x),this.y=te(this.y,t.y,n.y),this.z=te(this.z,t.z,n.z),this}clampScalar(t,n){return this.x=te(this.x,t,n),this.y=te(this.y,t,n),this.z=te(this.z,t,n),this}clampLength(t,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(te(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,n){let i=t.x,s=t.y,a=t.z,r=n.x,o=n.y,l=n.z;return this.x=s*l-a*o,this.y=a*r-i*l,this.z=i*o-s*r,this}projectOnVector(t){let n=t.lengthSq();if(n===0)return this.set(0,0,0);let i=t.dot(this)/n;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return A0.copy(this).projectOnVector(t),this.sub(A0)}reflect(t){return this.sub(A0.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;let i=this.dot(t)/n;return Math.acos(te(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let n=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return n*n+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,n,i){let s=Math.sin(n)*t;return this.x=s*Math.sin(i),this.y=Math.cos(n)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,n,i){return this.x=t*Math.sin(n),this.y=i,this.z=t*Math.cos(n),this}setFromMatrixPosition(t){let n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(t){let n=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=n,this.y=i,this.z=s,this}setFromMatrixColumn(t,n){return this.fromArray(t.elements,n*4)}setFromMatrix3Column(t,n){return this.fromArray(t.elements,n*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(t),this.y=n,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},A0=new N,Ob=new Ei,qt=class e{static{e.prototype.isMatrix3=!0}constructor(t,n,i,s,a,r,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,i,s,a,r,o,l,c)}set(t,n,i,s,a,r,o,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=n,h[4]=a,h[5]=l,h[6]=i,h[7]=r,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(t,n,i){return t.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let n=t.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){let i=t.elements,s=n.elements,a=this.elements,r=i[0],o=i[3],l=i[6],c=i[1],h=i[4],p=i[7],u=i[2],d=i[5],g=i[8],b=s[0],_=s[3],f=s[6],v=s[1],y=s[4],m=s[7],M=s[2],E=s[5],w=s[8];return a[0]=r*b+o*v+l*M,a[3]=r*_+o*y+l*E,a[6]=r*f+o*m+l*w,a[1]=c*b+h*v+p*M,a[4]=c*_+h*y+p*E,a[7]=c*f+h*m+p*w,a[2]=u*b+d*v+g*M,a[5]=u*_+d*y+g*E,a[8]=u*f+d*m+g*w,this}multiplyScalar(t){let n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=t,n[4]*=t,n[7]*=t,n[2]*=t,n[5]*=t,n[8]*=t,this}determinant(){let t=this.elements,n=t[0],i=t[1],s=t[2],a=t[3],r=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return n*r*h-n*o*c-i*a*h+i*o*l+s*a*c-s*r*l}invert(){let t=this.elements,n=t[0],i=t[1],s=t[2],a=t[3],r=t[4],o=t[5],l=t[6],c=t[7],h=t[8],p=h*r-o*c,u=o*l-h*a,d=c*a-r*l,g=n*p+i*u+s*d;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let b=1/g;return t[0]=p*b,t[1]=(s*c-h*i)*b,t[2]=(o*i-s*r)*b,t[3]=u*b,t[4]=(h*n-s*l)*b,t[5]=(s*a-o*n)*b,t[6]=d*b,t[7]=(i*l-c*n)*b,t[8]=(r*n-i*a)*b,this}transpose(){let t,n=this.elements;return t=n[1],n[1]=n[3],n[3]=t,t=n[2],n[2]=n[6],n[6]=t,t=n[5],n[5]=n[7],n[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let n=this.elements;return t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8],this}setUvTransform(t,n,i,s,a,r,o){let l=Math.cos(a),c=Math.sin(a);return this.set(i*l,i*c,-i*(l*r+c*o)+r+t,-s*c,s*l,-s*(-c*r+l*o)+o+n,0,0,1),this}scale(t,n){return xr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(w0.makeScale(t,n)),this}rotate(t){return xr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(w0.makeRotation(-t)),this}translate(t,n){return xr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(w0.makeTranslation(t,n)),this}makeTranslation(t,n){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,n,0,0,1),this}makeRotation(t){let n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(t,n){return this.set(t,0,0,0,n,0,0,0,1),this}equals(t){let n=this.elements,i=t.elements;for(let s=0;s<9;s++)if(n[s]!==i[s])return!1;return!0}fromArray(t,n=0){for(let i=0;i<9;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){let i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}},w0=new qt,Ib=new qt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Pb=new qt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);oe=YC();Kf=class{static getDataURL(t,n="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{Lo===void 0&&(Lo=Lc("canvas")),Lo.width=t.width,Lo.height=t.height;let s=Lo.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=Lo}return i.toDataURL(n)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let n=Lc("canvas");n.width=t.width,n.height=t.height;let i=n.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let s=i.getImageData(0,0,t.width,t.height),a=s.data;for(let r=0;r<a.length;r++)a[r]=Fs(a[r]/255)*255;return i.putImageData(s,0,0),n}else if(t.data){let n=t.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Fs(n[i]/255)*255):n[i]=Fs(n[i]);return{data:n,width:t.width,height:t.height}}else return Ft("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},ZC=0,jo=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:ZC++}),this.uuid=Cr(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?t.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?t.set(n.displayWidth,n.displayHeight,0):n!==null?t.set(n.width,n.height,n.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let n=t===void 0||typeof t=="string";if(!n&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let a;if(Array.isArray(s)){a=[];for(let r=0,o=s.length;r<o;r++)s[r].isDataTexture?a.push(C0(s[r].image)):a.push(C0(s[r]))}else a=C0(s);i.url=a}return n||(t.images[this.uuid]=i),i}};JC=0,R0=new N,Gn=class e extends us{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,i=ls,s=ls,a=_n,r=za,o=Ai,l=ui,c=e.DEFAULT_ANISOTROPY,h=Xs){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:JC++}),this.uuid=Cr(),this.name="",this.source=new jo(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=a,this.minFilter=r,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new gt(0,0),this.repeat=new gt(1,1),this.center=new gt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new qt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(R0).x}get height(){return this.source.getSize(R0).y}get depth(){return this.source.getSize(R0).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let n in t){let i=t[n];if(i===void 0){Ft(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}let s=this[n];if(s===void 0){Ft(`Texture.setValues(): property '${n}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[n]=i}}toJSON(t){let n=t===void 0||typeof t=="string";if(!n&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==S_)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Yf:t.x=t.x-Math.floor(t.x);break;case ls:t.x=t.x<0?0:1;break;case Zf:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Yf:t.y=t.y-Math.floor(t.y);break;case ls:t.y=t.y<0?0:1;break;case Zf:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Gn.DEFAULT_IMAGE=null;Gn.DEFAULT_MAPPING=S_;Gn.DEFAULT_ANISOTROPY=1;Ge=class e{static{e.prototype.isVector4=!0}constructor(t=0,n=0,i=0,s=1){this.x=t,this.y=n,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,n,i,s){return this.x=t,this.y=n,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this.w=t.w+n.w,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this.w+=t.w*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this.w=t.w-n.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let n=this.x,i=this.y,s=this.z,a=this.w,r=t.elements;return this.x=r[0]*n+r[4]*i+r[8]*s+r[12]*a,this.y=r[1]*n+r[5]*i+r[9]*s+r[13]*a,this.z=r[2]*n+r[6]*i+r[10]*s+r[14]*a,this.w=r[3]*n+r[7]*i+r[11]*s+r[15]*a,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let n=Math.sqrt(1-t.w*t.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/n,this.y=t.y/n,this.z=t.z/n),this}setAxisAngleFromRotationMatrix(t){let n,i,s,a,l=t.elements,c=l[0],h=l[4],p=l[8],u=l[1],d=l[5],g=l[9],b=l[2],_=l[6],f=l[10];if(Math.abs(h-u)<.01&&Math.abs(p-b)<.01&&Math.abs(g-_)<.01){if(Math.abs(h+u)<.1&&Math.abs(p+b)<.1&&Math.abs(g+_)<.1&&Math.abs(c+d+f-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;let y=(c+1)/2,m=(d+1)/2,M=(f+1)/2,E=(h+u)/4,w=(p+b)/4,x=(g+_)/4;return y>m&&y>M?y<.01?(i=0,s=.707106781,a=.707106781):(i=Math.sqrt(y),s=E/i,a=w/i):m>M?m<.01?(i=.707106781,s=0,a=.707106781):(s=Math.sqrt(m),i=E/s,a=x/s):M<.01?(i=.707106781,s=.707106781,a=0):(a=Math.sqrt(M),i=w/a,s=x/a),this.set(i,s,a,n),this}let v=Math.sqrt((_-g)*(_-g)+(p-b)*(p-b)+(u-h)*(u-h));return Math.abs(v)<.001&&(v=1),this.x=(_-g)/v,this.y=(p-b)/v,this.z=(u-h)/v,this.w=Math.acos((c+d+f-1)/2),this}setFromMatrixPosition(t){let n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,n){return this.x=te(this.x,t.x,n.x),this.y=te(this.y,t.y,n.y),this.z=te(this.z,t.z,n.z),this.w=te(this.w,t.w,n.w),this}clampScalar(t,n){return this.x=te(this.x,t,n),this.y=te(this.y,t,n),this.z=te(this.z,t,n),this.w=te(this.w,t,n),this}clampLength(t,n){let i=this.length();return this.divideScalar(i||1).multiplyScalar(te(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this.w+=(t.w-this.w)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this.w=t.w+(n.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this.w=t[n+3],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t[n+3]=this.w,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this.w=t.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Qf=class extends us{constructor(t=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:_n,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=t,this.height=n,this.depth=i.depth,this.scissor=new Ge(0,0,t,n),this.scissorTest=!1,this.viewport=new Ge(0,0,t,n),this.textures=[];let s={width:t,height:n,depth:i.depth},a=new Gn(s),r=i.count;for(let o=0;o<r;o++)this.textures[o]=a.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(t={}){let n={minFilter:_n,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(n.mapping=t.mapping),t.wrapS!==void 0&&(n.wrapS=t.wrapS),t.wrapT!==void 0&&(n.wrapT=t.wrapT),t.wrapR!==void 0&&(n.wrapR=t.wrapR),t.magFilter!==void 0&&(n.magFilter=t.magFilter),t.minFilter!==void 0&&(n.minFilter=t.minFilter),t.format!==void 0&&(n.format=t.format),t.type!==void 0&&(n.type=t.type),t.anisotropy!==void 0&&(n.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(n.colorSpace=t.colorSpace),t.flipY!==void 0&&(n.flipY=t.flipY),t.generateMipmaps!==void 0&&(n.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(n.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,n,i=1){if(this.width!==t||this.height!==n||this.depth!==i){this.width=t,this.height=n,this.depth=i;for(let s=0,a=this.textures.length;s<a;s++)this.textures[s].image.width=t,this.textures[s].image.height=n,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,n),this.scissor.set(0,0,t,n)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++){this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;let s=Object.assign({},t.textures[n].image);this.textures[n].source=new jo(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let n=t.depthTexture.clone();n.renderTarget=null,this.depthTexture=n}else this.depthTexture=t.depthTexture;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},kn=class extends Qf{constructor(t=1,n=1,i={}){super(t,n,i),this.isWebGLRenderTarget=!0}},Oc=class extends Gn{constructor(t=null,n=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:n,height:i,depth:s},this.magFilter=cn,this.minFilter=cn,this.wrapR=ls,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}},jf=class extends Gn{constructor(t=null,n=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:n,height:i,depth:s},this.magFilter=cn,this.minFilter=cn,this.wrapR=ls,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}},Ie=class e{static{e.prototype.isMatrix4=!0}constructor(t,n,i,s,a,r,o,l,c,h,p,u,d,g,b,_){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,i,s,a,r,o,l,c,h,p,u,d,g,b,_)}set(t,n,i,s,a,r,o,l,c,h,p,u,d,g,b,_){let f=this.elements;return f[0]=t,f[4]=n,f[8]=i,f[12]=s,f[1]=a,f[5]=r,f[9]=o,f[13]=l,f[2]=c,f[6]=h,f[10]=p,f[14]=u,f[3]=d,f[7]=g,f[11]=b,f[15]=_,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(t){let n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(t){let n=this.elements,i=t.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(t){let n=t.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(t,n,i){return this.determinantAffine()===0?(t.set(1,0,0),n.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,n,i){return this.set(t.x,n.x,i.x,0,t.y,n.y,i.y,0,t.z,n.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let n=this.elements,i=t.elements,s=1/Oo.setFromMatrixColumn(t,0).length(),a=1/Oo.setFromMatrixColumn(t,1).length(),r=1/Oo.setFromMatrixColumn(t,2).length();return n[0]=i[0]*s,n[1]=i[1]*s,n[2]=i[2]*s,n[3]=0,n[4]=i[4]*a,n[5]=i[5]*a,n[6]=i[6]*a,n[7]=0,n[8]=i[8]*r,n[9]=i[9]*r,n[10]=i[10]*r,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(t){let n=this.elements,i=t.x,s=t.y,a=t.z,r=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),h=Math.cos(a),p=Math.sin(a);if(t.order==="XYZ"){let u=r*h,d=r*p,g=o*h,b=o*p;n[0]=l*h,n[4]=-l*p,n[8]=c,n[1]=d+g*c,n[5]=u-b*c,n[9]=-o*l,n[2]=b-u*c,n[6]=g+d*c,n[10]=r*l}else if(t.order==="YXZ"){let u=l*h,d=l*p,g=c*h,b=c*p;n[0]=u+b*o,n[4]=g*o-d,n[8]=r*c,n[1]=r*p,n[5]=r*h,n[9]=-o,n[2]=d*o-g,n[6]=b+u*o,n[10]=r*l}else if(t.order==="ZXY"){let u=l*h,d=l*p,g=c*h,b=c*p;n[0]=u-b*o,n[4]=-r*p,n[8]=g+d*o,n[1]=d+g*o,n[5]=r*h,n[9]=b-u*o,n[2]=-r*c,n[6]=o,n[10]=r*l}else if(t.order==="ZYX"){let u=r*h,d=r*p,g=o*h,b=o*p;n[0]=l*h,n[4]=g*c-d,n[8]=u*c+b,n[1]=l*p,n[5]=b*c+u,n[9]=d*c-g,n[2]=-c,n[6]=o*l,n[10]=r*l}else if(t.order==="YZX"){let u=r*l,d=r*c,g=o*l,b=o*c;n[0]=l*h,n[4]=b-u*p,n[8]=g*p+d,n[1]=p,n[5]=r*h,n[9]=-o*h,n[2]=-c*h,n[6]=d*p+g,n[10]=u-b*p}else if(t.order==="XZY"){let u=r*l,d=r*c,g=o*l,b=o*c;n[0]=l*h,n[4]=-p,n[8]=c*h,n[1]=u*p+b,n[5]=r*h,n[9]=d*p-g,n[2]=g*p-d,n[6]=o*h,n[10]=b*p+u}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(t){return this.compose(KC,t,QC)}lookAt(t,n,i){let s=this.elements;return si.subVectors(t,n),si.lengthSq()===0&&(si.z=1),si.normalize(),Aa.crossVectors(i,si),Aa.lengthSq()===0&&(Math.abs(i.z)===1?si.x+=1e-4:si.z+=1e-4,si.normalize(),Aa.crossVectors(i,si)),Aa.normalize(),uf.crossVectors(si,Aa),s[0]=Aa.x,s[4]=uf.x,s[8]=si.x,s[1]=Aa.y,s[5]=uf.y,s[9]=si.y,s[2]=Aa.z,s[6]=uf.z,s[10]=si.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){let i=t.elements,s=n.elements,a=this.elements,r=i[0],o=i[4],l=i[8],c=i[12],h=i[1],p=i[5],u=i[9],d=i[13],g=i[2],b=i[6],_=i[10],f=i[14],v=i[3],y=i[7],m=i[11],M=i[15],E=s[0],w=s[4],x=s[8],A=s[12],R=s[1],U=s[5],B=s[9],V=s[13],L=s[2],F=s[6],J=s[10],q=s[14],at=s[3],Y=s[7],$=s[11],et=s[15];return a[0]=r*E+o*R+l*L+c*at,a[4]=r*w+o*U+l*F+c*Y,a[8]=r*x+o*B+l*J+c*$,a[12]=r*A+o*V+l*q+c*et,a[1]=h*E+p*R+u*L+d*at,a[5]=h*w+p*U+u*F+d*Y,a[9]=h*x+p*B+u*J+d*$,a[13]=h*A+p*V+u*q+d*et,a[2]=g*E+b*R+_*L+f*at,a[6]=g*w+b*U+_*F+f*Y,a[10]=g*x+b*B+_*J+f*$,a[14]=g*A+b*V+_*q+f*et,a[3]=v*E+y*R+m*L+M*at,a[7]=v*w+y*U+m*F+M*Y,a[11]=v*x+y*B+m*J+M*$,a[15]=v*A+y*V+m*q+M*et,this}multiplyScalar(t){let n=this.elements;return n[0]*=t,n[4]*=t,n[8]*=t,n[12]*=t,n[1]*=t,n[5]*=t,n[9]*=t,n[13]*=t,n[2]*=t,n[6]*=t,n[10]*=t,n[14]*=t,n[3]*=t,n[7]*=t,n[11]*=t,n[15]*=t,this}determinant(){let t=this.elements,n=t[0],i=t[4],s=t[8],a=t[12],r=t[1],o=t[5],l=t[9],c=t[13],h=t[2],p=t[6],u=t[10],d=t[14],g=t[3],b=t[7],_=t[11],f=t[15],v=l*d-c*u,y=o*d-c*p,m=o*u-l*p,M=r*d-c*h,E=r*u-l*h,w=r*p-o*h;return n*(b*v-_*y+f*m)-i*(g*v-_*M+f*E)+s*(g*y-b*M+f*w)-a*(g*m-b*E+_*w)}determinantAffine(){let t=this.elements,n=t[0],i=t[4],s=t[8],a=t[1],r=t[5],o=t[9],l=t[2],c=t[6],h=t[10];return n*(r*h-o*c)-i*(a*h-o*l)+s*(a*c-r*l)}transpose(){let t=this.elements,n;return n=t[1],t[1]=t[4],t[4]=n,n=t[2],t[2]=t[8],t[8]=n,n=t[6],t[6]=t[9],t[9]=n,n=t[3],t[3]=t[12],t[12]=n,n=t[7],t[7]=t[13],t[13]=n,n=t[11],t[11]=t[14],t[14]=n,this}setPosition(t,n,i){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=n,s[14]=i),this}invert(){let t=this.elements,n=t[0],i=t[1],s=t[2],a=t[3],r=t[4],o=t[5],l=t[6],c=t[7],h=t[8],p=t[9],u=t[10],d=t[11],g=t[12],b=t[13],_=t[14],f=t[15],v=n*o-i*r,y=n*l-s*r,m=n*c-a*r,M=i*l-s*o,E=i*c-a*o,w=s*c-a*l,x=h*b-p*g,A=h*_-u*g,R=h*f-d*g,U=p*_-u*b,B=p*f-d*b,V=u*f-d*_,L=v*V-y*B+m*U+M*R-E*A+w*x;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let F=1/L;return t[0]=(o*V-l*B+c*U)*F,t[1]=(s*B-i*V-a*U)*F,t[2]=(b*w-_*E+f*M)*F,t[3]=(u*E-p*w-d*M)*F,t[4]=(l*R-r*V-c*A)*F,t[5]=(n*V-s*R+a*A)*F,t[6]=(_*m-g*w-f*y)*F,t[7]=(h*w-u*m+d*y)*F,t[8]=(r*B-o*R+c*x)*F,t[9]=(i*R-n*B-a*x)*F,t[10]=(g*E-b*m+f*v)*F,t[11]=(p*m-h*E-d*v)*F,t[12]=(o*A-r*U-l*x)*F,t[13]=(n*U-i*A+s*x)*F,t[14]=(b*y-g*M-_*v)*F,t[15]=(h*M-p*y+u*v)*F,this}scale(t){let n=this.elements,i=t.x,s=t.y,a=t.z;return n[0]*=i,n[4]*=s,n[8]*=a,n[1]*=i,n[5]*=s,n[9]*=a,n[2]*=i,n[6]*=s,n[10]*=a,n[3]*=i,n[7]*=s,n[11]*=a,this}getMaxScaleOnAxis(){let t=this.elements,n=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(n,i,s))}makeTranslation(t,n,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(t){let n=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(t){let n=Math.cos(t),i=Math.sin(t);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(t){let n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,n){let i=Math.cos(n),s=Math.sin(n),a=1-i,r=t.x,o=t.y,l=t.z,c=a*r,h=a*o;return this.set(c*r+i,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+i,h*l-s*r,0,c*l-s*o,h*l+s*r,a*l*l+i,0,0,0,0,1),this}makeScale(t,n,i){return this.set(t,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,n,i,s,a,r){return this.set(1,i,a,0,t,1,r,0,n,s,1,0,0,0,0,1),this}compose(t,n,i){let s=this.elements,a=n._x,r=n._y,o=n._z,l=n._w,c=a+a,h=r+r,p=o+o,u=a*c,d=a*h,g=a*p,b=r*h,_=r*p,f=o*p,v=l*c,y=l*h,m=l*p,M=i.x,E=i.y,w=i.z;return s[0]=(1-(b+f))*M,s[1]=(d+m)*M,s[2]=(g-y)*M,s[3]=0,s[4]=(d-m)*E,s[5]=(1-(u+f))*E,s[6]=(_+v)*E,s[7]=0,s[8]=(g+y)*w,s[9]=(_-v)*w,s[10]=(1-(u+b))*w,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,n,i){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let a=this.determinantAffine();if(a===0)return i.set(1,1,1),n.identity(),this;let r=Oo.set(s[0],s[1],s[2]).length(),o=Oo.set(s[4],s[5],s[6]).length(),l=Oo.set(s[8],s[9],s[10]).length();a<0&&(r=-r),Oi.copy(this);let c=1/r,h=1/o,p=1/l;return Oi.elements[0]*=c,Oi.elements[1]*=c,Oi.elements[2]*=c,Oi.elements[4]*=h,Oi.elements[5]*=h,Oi.elements[6]*=h,Oi.elements[8]*=p,Oi.elements[9]*=p,Oi.elements[10]*=p,n.setFromRotationMatrix(Oi),i.x=r,i.y=o,i.z=l,this}makePerspective(t,n,i,s,a,r,o=zi,l=!1){let c=this.elements,h=2*a/(n-t),p=2*a/(i-s),u=(n+t)/(n-t),d=(i+s)/(i-s),g,b;if(l)g=a/(r-a),b=r*a/(r-a);else if(o===zi)g=-(r+a)/(r-a),b=-2*r*a/(r-a);else if(o===Uc)g=-r/(r-a),b=-r*a/(r-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=p,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=b,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,n,i,s,a,r,o=zi,l=!1){let c=this.elements,h=2/(n-t),p=2/(i-s),u=-(n+t)/(n-t),d=-(i+s)/(i-s),g,b;if(l)g=1/(r-a),b=r/(r-a);else if(o===zi)g=-2/(r-a),b=-(r+a)/(r-a);else if(o===Uc)g=-1/(r-a),b=-a/(r-a);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=p,c[9]=0,c[13]=d,c[2]=0,c[6]=0,c[10]=g,c[14]=b,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let n=this.elements,i=t.elements;for(let s=0;s<16;s++)if(n[s]!==i[s])return!1;return!0}fromArray(t,n=0){for(let i=0;i<16;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){let i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t[n+9]=i[9],t[n+10]=i[10],t[n+11]=i[11],t[n+12]=i[12],t[n+13]=i[13],t[n+14]=i[14],t[n+15]=i[15],t}},Oo=new N,Oi=new Ie,KC=new N(0,0,0),QC=new N(1,1,1),Aa=new N,uf=new N,si=new N,Bb=new Ie,zb=new Ei,hs=class e{constructor(t=0,n=0,i=0,s=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,n,i,s=this._order){return this._x=t,this._y=n,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,n=this._order,i=!0){let s=t.elements,a=s[0],r=s[4],o=s[8],l=s[1],c=s[5],h=s[9],p=s[2],u=s[6],d=s[10];switch(n){case"XYZ":this._y=Math.asin(te(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-r,a)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-te(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,d),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-p,a),this._z=0);break;case"ZXY":this._x=Math.asin(te(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-p,d),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,a));break;case"ZYX":this._y=Math.asin(-te(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(u,d),this._z=Math.atan2(l,a)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(te(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-p,a)):(this._x=0,this._y=Math.atan2(o,d));break;case"XZY":this._z=Math.asin(-te(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,a)):(this._x=Math.atan2(-h,d),this._y=0);break;default:Ft("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,n,i){return Bb.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Bb,n,i)}setFromVector3(t,n=this._order){return this.set(t.x,t.y,t.z,n)}reorder(t){return zb.setFromEuler(this),this.setFromQuaternion(zb,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};hs.DEFAULT_ORDER="XYZ";Ic=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},jC=0,Fb=new N,Io=new Ei,Ls=new Ie,hf=new N,xc=new N,$C=new N,tR=new Ei,Hb=new N(1,0,0),Vb=new N(0,1,0),Gb=new N(0,0,1),kb={type:"added"},eR={type:"removed"},Po={type:"childadded",child:null},N0={type:"childremoved",child:null},Xn=class e extends us{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:jC++}),this.uuid=Cr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new N,n=new hs,i=new Ei,s=new N(1,1,1);function a(){i.setFromEuler(n,!1)}function r(){n.setFromQuaternion(i,void 0,!1)}n._onChange(a),i._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ie},normalMatrix:{value:new qt}}),this.matrix=new Ie,this.matrixWorld=new Ie,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ic,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,n){this.quaternion.setFromAxisAngle(t,n)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,n){return Io.setFromAxisAngle(t,n),this.quaternion.multiply(Io),this}rotateOnWorldAxis(t,n){return Io.setFromAxisAngle(t,n),this.quaternion.premultiply(Io),this}rotateX(t){return this.rotateOnAxis(Hb,t)}rotateY(t){return this.rotateOnAxis(Vb,t)}rotateZ(t){return this.rotateOnAxis(Gb,t)}translateOnAxis(t,n){return Fb.copy(t).applyQuaternion(this.quaternion),this.position.add(Fb.multiplyScalar(n)),this}translateX(t){return this.translateOnAxis(Hb,t)}translateY(t){return this.translateOnAxis(Vb,t)}translateZ(t){return this.translateOnAxis(Gb,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ls.copy(this.matrixWorld).invert())}lookAt(t,n,i){t.isVector3?hf.copy(t):hf.set(t,n,i);let s=this.parent;this.updateWorldMatrix(!0,!1),xc.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ls.lookAt(xc,hf,this.up):Ls.lookAt(hf,xc,this.up),this.quaternion.setFromRotationMatrix(Ls),s&&(Ls.extractRotation(s.matrixWorld),Io.setFromRotationMatrix(Ls),this.quaternion.premultiply(Io.invert()))}add(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return t===this?(Vt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(kb),Po.child=t,this.dispatchEvent(Po),Po.child=null):Vt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let n=this.children.indexOf(t);return n!==-1&&(t.parent=null,this.children.splice(n,1),t.dispatchEvent(eR),N0.child=t,this.dispatchEvent(N0),N0.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ls.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ls.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ls),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(kb),Po.child=t,this.dispatchEvent(Po),Po.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,n){if(this[t]===n)return this;for(let i=0,s=this.children.length;i<s;i++){let r=this.children[i].getObjectByProperty(t,n);if(r!==void 0)return r}}getObjectsByProperty(t,n,i=[]){this[t]===n&&i.push(this);let s=this.children;for(let a=0,r=s.length;a<r;a++)s[a].getObjectsByProperty(t,n,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(xc,t,$C),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(xc,tR,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let n=this.matrixWorld.elements;return t.set(n[8],n[9],n[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(t){t(this);let n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].traverseVisible(t)}traverseAncestors(t){let n=this.parent;n!==null&&(t(n),n.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let n=t.x,i=t.y,s=t.z,a=this.matrix.elements;a[12]+=n-a[0]*n-a[4]*i-a[8]*s,a[13]+=i-a[1]*n-a[5]*i-a[9]*s,a[14]+=s-a[2]*n-a[6]*i-a[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].updateMatrixWorld(t)}updateWorldMatrix(t,n,i=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),n===!0){let a=this.children;for(let r=0,o=a.length;r<o;r++)a[r].updateWorldMatrix(!1,!0,i)}}toJSON(t){let n=t===void 0||typeof t=="string",i={};n&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function a(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=a(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let p=l[c];a(t.shapes,p)}else a(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(a(t.materials,this.material[l]));s.material=o}else s.material=a(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(a(t.animations,l))}}if(n){let o=r(t.geometries),l=r(t.materials),c=r(t.textures),h=r(t.images),p=r(t.shapes),u=r(t.skeletons),d=r(t.animations),g=r(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),p.length>0&&(i.shapes=p),u.length>0&&(i.skeletons=u),d.length>0&&(i.animations=d),g.length>0&&(i.nodes=g)}return i.object=s,i;function r(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let i=0;i<t.children.length;i++){let s=t.children[i];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Xn.DEFAULT_UP=new N(0,1,0);Xn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Xn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;bi=class extends Xn{constructor(){super(),this.isGroup=!0,this.type="Group"}},nR={type:"move"},$o=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new bi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new bi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new bi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let n=this._hand;if(n)for(let i of t.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,n,i){let s=null,a=null,r=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&n.session.visibilityState!=="visible-blurred"){if(c&&t.hand){r=!0;for(let b of t.hand.values()){let _=n.getJointPose(b,i),f=this._getHandJoint(c,b);_!==null&&(f.matrix.fromArray(_.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=_.radius),f.visible=_!==null}let h=c.joints["index-finger-tip"],p=c.joints["thumb-tip"],u=h.position.distanceTo(p.position),d=.02,g=.005;c.inputState.pinching&&u>d+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=d-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(a=n.getPose(t.gripSpace,i),a!==null&&(l.matrix.fromArray(a.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,a.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(a.linearVelocity)):l.hasLinearVelocity=!1,a.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(a.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=n.getPose(t.targetRaySpace,i),s===null&&a!==null&&(s=a),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(nR)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=a!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(t,n){if(t.joints[n.jointName]===void 0){let i=new bi;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[n.jointName]=i,t.add(i)}return t.joints[n.jointName]}},J1={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},wa={h:0,s:0,l:0},ff={h:0,s:0,l:0};ce=class{constructor(t,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,n,i)}set(t,n,i){if(n===void 0&&i===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,n,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,n=ri){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,oe.colorSpaceToWorking(this,n),this}setRGB(t,n,i,s=oe.workingColorSpace){return this.r=t,this.g=n,this.b=i,oe.colorSpaceToWorking(this,s),this}setHSL(t,n,i,s=oe.workingColorSpace){if(t=U_(t,1),n=te(n,0,1),i=te(i,0,1),n===0)this.r=this.g=this.b=i;else{let a=i<=.5?i*(1+n):i+n-i*n,r=2*i-a;this.r=D0(r,a,t+1/3),this.g=D0(r,a,t),this.b=D0(r,a,t-1/3)}return oe.colorSpaceToWorking(this,s),this}setStyle(t,n=ri){function i(a){a!==void 0&&parseFloat(a)<1&&Ft("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let a,r=s[1],o=s[2];switch(r){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,n);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,n);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,n);break;default:Ft("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let a=s[1],r=a.length;if(r===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,n);if(r===6)return this.setHex(parseInt(a,16),n);Ft("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,n);return this}setColorName(t,n=ri){let i=J1[t.toLowerCase()];return i!==void 0?this.setHex(i,n):Ft("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Fs(t.r),this.g=Fs(t.g),this.b=Fs(t.b),this}copyLinearToSRGB(t){return this.r=Zo(t.r),this.g=Zo(t.g),this.b=Zo(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ri){return oe.workingToColorSpace(bn.copy(this),t),Math.round(te(bn.r*255,0,255))*65536+Math.round(te(bn.g*255,0,255))*256+Math.round(te(bn.b*255,0,255))}getHexString(t=ri){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,n=oe.workingColorSpace){oe.workingToColorSpace(bn.copy(this),n);let i=bn.r,s=bn.g,a=bn.b,r=Math.max(i,s,a),o=Math.min(i,s,a),l,c,h=(o+r)/2;if(o===r)l=0,c=0;else{let p=r-o;switch(c=h<=.5?p/(r+o):p/(2-r-o),r){case i:l=(s-a)/p+(s<a?6:0);break;case s:l=(a-i)/p+2;break;case a:l=(i-s)/p+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,n=oe.workingColorSpace){return oe.workingToColorSpace(bn.copy(this),n),t.r=bn.r,t.g=bn.g,t.b=bn.b,t}getStyle(t=ri){oe.workingToColorSpace(bn.copy(this),t);let n=bn.r,i=bn.g,s=bn.b;return t!==ri?`color(${t} ${n.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,n,i){return this.getHSL(wa),this.setHSL(wa.h+t,wa.s+n,wa.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,n){return this.r=t.r+n.r,this.g=t.g+n.g,this.b=t.b+n.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,n){return this.r+=(t.r-this.r)*n,this.g+=(t.g-this.g)*n,this.b+=(t.b-this.b)*n,this}lerpColors(t,n,i){return this.r=t.r+(n.r-t.r)*i,this.g=t.g+(n.g-t.g)*i,this.b=t.b+(n.b-t.b)*i,this}lerpHSL(t,n){this.getHSL(wa),t.getHSL(ff);let i=Ac(wa.h,ff.h,n),s=Ac(wa.s,ff.s,n),a=Ac(wa.l,ff.l,n);return this.setHSL(i,s,a),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let n=this.r,i=this.g,s=this.b,a=t.elements;return this.r=a[0]*n+a[3]*i+a[6]*s,this.g=a[1]*n+a[4]*i+a[7]*s,this.b=a[2]*n+a[5]*i+a[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,n=0){return this.r=t[n],this.g=t[n+1],this.b=t[n+2],this}toArray(t=[],n=0){return t[n]=this.r,t[n+1]=this.g,t[n+2]=this.b,t}fromBufferAttribute(t,n){return this.r=t.getX(n),this.g=t.getY(n),this.b=t.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},bn=new ce;ce.NAMES=J1;Pc=class extends Xn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new hs,this.environmentIntensity=1,this.environmentRotation=new hs,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,n){return super.copy(t,n),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let n=super.toJSON(t);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),n.object.backgroundBlurriness=this.backgroundBlurriness,n.object.backgroundIntensity=this.backgroundIntensity,n.object.backgroundRotation=this.backgroundRotation.toArray(),n.object.environmentIntensity=this.environmentIntensity,n.object.environmentRotation=this.environmentRotation.toArray(),n}},Ii=new N,Os=new N,U0=new N,Is=new N,Bo=new N,zo=new N,Xb=new N,L0=new N,O0=new N,I0=new N,P0=new Ge,B0=new Ge,z0=new Ge,zs=class e{constructor(t=new N,n=new N,i=new N){this.a=t,this.b=n,this.c=i}static getNormal(t,n,i,s){s.subVectors(i,n),Ii.subVectors(t,n),s.cross(Ii);let a=s.lengthSq();return a>0?s.multiplyScalar(1/Math.sqrt(a)):s.set(0,0,0)}static getBarycoord(t,n,i,s,a){Ii.subVectors(s,n),Os.subVectors(i,n),U0.subVectors(t,n);let r=Ii.dot(Ii),o=Ii.dot(Os),l=Ii.dot(U0),c=Os.dot(Os),h=Os.dot(U0),p=r*c-o*o;if(p===0)return a.set(0,0,0),null;let u=1/p,d=(c*l-o*h)*u,g=(r*h-o*l)*u;return a.set(1-d-g,g,d)}static containsPoint(t,n,i,s){return this.getBarycoord(t,n,i,s,Is)===null?!1:Is.x>=0&&Is.y>=0&&Is.x+Is.y<=1}static getInterpolation(t,n,i,s,a,r,o,l){return this.getBarycoord(t,n,i,s,Is)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(a,Is.x),l.addScaledVector(r,Is.y),l.addScaledVector(o,Is.z),l)}static getInterpolatedAttribute(t,n,i,s,a,r){return P0.setScalar(0),B0.setScalar(0),z0.setScalar(0),P0.fromBufferAttribute(t,n),B0.fromBufferAttribute(t,i),z0.fromBufferAttribute(t,s),r.setScalar(0),r.addScaledVector(P0,a.x),r.addScaledVector(B0,a.y),r.addScaledVector(z0,a.z),r}static isFrontFacing(t,n,i,s){return Ii.subVectors(i,n),Os.subVectors(t,n),Ii.cross(Os).dot(s)<0}set(t,n,i){return this.a.copy(t),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(t,n,i,s){return this.a.copy(t[n]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,n,i,s){return this.a.fromBufferAttribute(t,n),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Ii.subVectors(this.c,this.b),Os.subVectors(this.a,this.b),Ii.cross(Os).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,i,s,a){return e.getInterpolation(t,this.a,this.b,this.c,n,i,s,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,n){let i=this.a,s=this.b,a=this.c,r,o;Bo.subVectors(s,i),zo.subVectors(a,i),L0.subVectors(t,i);let l=Bo.dot(L0),c=zo.dot(L0);if(l<=0&&c<=0)return n.copy(i);O0.subVectors(t,s);let h=Bo.dot(O0),p=zo.dot(O0);if(h>=0&&p<=h)return n.copy(s);let u=l*p-h*c;if(u<=0&&l>=0&&h<=0)return r=l/(l-h),n.copy(i).addScaledVector(Bo,r);I0.subVectors(t,a);let d=Bo.dot(I0),g=zo.dot(I0);if(g>=0&&d<=g)return n.copy(a);let b=d*c-l*g;if(b<=0&&c>=0&&g<=0)return o=c/(c-g),n.copy(i).addScaledVector(zo,o);let _=h*g-d*p;if(_<=0&&p-h>=0&&d-g>=0)return Xb.subVectors(a,s),o=(p-h)/(p-h+(d-g)),n.copy(s).addScaledVector(Xb,o);let f=1/(_+b+u);return r=b*f,o=u*f,n.copy(i).addScaledVector(Bo,r).addScaledVector(zo,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},fs=class{constructor(t=new N(1/0,1/0,1/0),n=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=n}set(t,n){return this.min.copy(t),this.max.copy(n),this}setFromArray(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n+=3)this.expandByPoint(Pi.fromArray(t,n));return this}setFromBufferAttribute(t){this.makeEmpty();for(let n=0,i=t.count;n<i;n++)this.expandByPoint(Pi.fromBufferAttribute(t,n));return this}setFromPoints(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n++)this.expandByPoint(t[n]);return this}setFromCenterAndSize(t,n){let i=Pi.copy(n).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,n=!1){return this.makeEmpty(),this.expandByObject(t,n)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,n=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let a=i.getAttribute("position");if(n===!0&&a!==void 0&&t.isInstancedMesh!==!0)for(let r=0,o=a.count;r<o;r++)t.isMesh===!0?t.getVertexPosition(r,Pi):Pi.fromBufferAttribute(a,r),Pi.applyMatrix4(t.matrixWorld),this.expandByPoint(Pi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),df.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),df.copy(i.boundingBox)),df.applyMatrix4(t.matrixWorld),this.union(df)}let s=t.children;for(let a=0,r=s.length;a<r;a++)this.expandByObject(s[a],n);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,n){return n.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Pi),Pi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let n,i;return t.normal.x>0?(n=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(n=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(n+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(n+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(n+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(n+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),n<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Sc),pf.subVectors(this.max,Sc),Fo.subVectors(t.a,Sc),Ho.subVectors(t.b,Sc),Vo.subVectors(t.c,Sc),Ca.subVectors(Ho,Fo),Ra.subVectors(Vo,Ho),mr.subVectors(Fo,Vo);let n=[0,-Ca.z,Ca.y,0,-Ra.z,Ra.y,0,-mr.z,mr.y,Ca.z,0,-Ca.x,Ra.z,0,-Ra.x,mr.z,0,-mr.x,-Ca.y,Ca.x,0,-Ra.y,Ra.x,0,-mr.y,mr.x,0];return!F0(n,Fo,Ho,Vo,pf)||(n=[1,0,0,0,1,0,0,0,1],!F0(n,Fo,Ho,Vo,pf))?!1:(mf.crossVectors(Ca,Ra),n=[mf.x,mf.y,mf.z],F0(n,Fo,Ho,Vo,pf))}clampPoint(t,n){return n.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Pi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Pi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ps[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ps[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ps[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ps[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ps[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ps[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ps[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ps[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ps),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},Ps=[new N,new N,new N,new N,new N,new N,new N,new N],Pi=new N,df=new fs,Fo=new N,Ho=new N,Vo=new N,Ca=new N,Ra=new N,mr=new N,Sc=new N,pf=new N,mf=new N,gr=new N;Qe=new N,gf=new gt,iR=0,Vn=class extends us{constructor(t,n,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:iR++}),this.name="",this.array=t,this.itemSize=n,this.count=t!==void 0?t.length/n:0,this.normalized=i,this.usage=X1,this.updateRanges=[],this.gpuType=Vi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,n,i){t*=this.itemSize,i*=n.itemSize;for(let s=0,a=this.itemSize;s<a;s++)this.array[t+s]=n.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)gf.fromBufferAttribute(this,n),gf.applyMatrix3(t),this.setXY(n,gf.x,gf.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Qe.fromBufferAttribute(this,n),Qe.applyMatrix3(t),this.setXYZ(n,Qe.x,Qe.y,Qe.z);return this}applyMatrix4(t){for(let n=0,i=this.count;n<i;n++)Qe.fromBufferAttribute(this,n),Qe.applyMatrix4(t),this.setXYZ(n,Qe.x,Qe.y,Qe.z);return this}applyNormalMatrix(t){for(let n=0,i=this.count;n<i;n++)Qe.fromBufferAttribute(this,n),Qe.applyNormalMatrix(t),this.setXYZ(n,Qe.x,Qe.y,Qe.z);return this}transformDirection(t){for(let n=0,i=this.count;n<i;n++)Qe.fromBufferAttribute(this,n),Qe.transformDirection(t),this.setXYZ(n,Qe.x,Qe.y,Qe.z);return this}set(t,n=0){return this.array.set(t,n),this}getComponent(t,n){let i=this.array[t*this.itemSize+n];return this.normalized&&(i=qo(i,this.array)),i}setComponent(t,n,i){return this.normalized&&(i=Un(i,this.array)),this.array[t*this.itemSize+n]=i,this}getX(t){let n=this.array[t*this.itemSize];return this.normalized&&(n=qo(n,this.array)),n}setX(t,n){return this.normalized&&(n=Un(n,this.array)),this.array[t*this.itemSize]=n,this}getY(t){let n=this.array[t*this.itemSize+1];return this.normalized&&(n=qo(n,this.array)),n}setY(t,n){return this.normalized&&(n=Un(n,this.array)),this.array[t*this.itemSize+1]=n,this}getZ(t){let n=this.array[t*this.itemSize+2];return this.normalized&&(n=qo(n,this.array)),n}setZ(t,n){return this.normalized&&(n=Un(n,this.array)),this.array[t*this.itemSize+2]=n,this}getW(t){let n=this.array[t*this.itemSize+3];return this.normalized&&(n=qo(n,this.array)),n}setW(t,n){return this.normalized&&(n=Un(n,this.array)),this.array[t*this.itemSize+3]=n,this}setXY(t,n,i){return t*=this.itemSize,this.normalized&&(n=Un(n,this.array),i=Un(i,this.array)),this.array[t+0]=n,this.array[t+1]=i,this}setXYZ(t,n,i,s){return t*=this.itemSize,this.normalized&&(n=Un(n,this.array),i=Un(i,this.array),s=Un(s,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,n,i,s,a){return t*=this.itemSize,this.normalized&&(n=Un(n,this.array),i=Un(i,this.array),s=Un(s,this.array),a=Un(a,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=a,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}},Bc=class extends Vn{constructor(t,n,i){super(new Uint16Array(t),n,i)}},zc=class extends Vn{constructor(t,n,i){super(new Uint32Array(t),n,i)}},le=class extends Vn{constructor(t,n,i){super(new Float32Array(t),n,i)}},sR=new fs,Mc=new N,H0=new N,Da=class{constructor(t=new N,n=-1){this.isSphere=!0,this.center=t,this.radius=n}set(t,n){return this.center.copy(t),this.radius=n,this}setFromPoints(t,n){let i=this.center;n!==void 0?i.copy(n):sR.setFromPoints(t).getCenter(i);let s=0;for(let a=0,r=t.length;a<r;a++)s=Math.max(s,i.distanceToSquared(t[a]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let n=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=n*n}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,n){let i=this.center.distanceToSquared(t);return n.copy(t),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Mc.subVectors(t,this.center);let n=Mc.lengthSq();if(n>this.radius*this.radius){let i=Math.sqrt(n),s=(i-this.radius)*.5;this.center.addScaledVector(Mc,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(H0.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Mc.copy(t.center).add(H0)),this.expandByPoint(Mc.copy(t.center).sub(H0))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},aR=0,Mi=new Ie,V0=new Xn,Go=new N,ai=new fs,bc=new fs,ln=new N,xe=class e extends us{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:aR++}),this.uuid=Cr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(RC(t)?zc:Bc)(t,1):this.index=t,this}setIndirect(t,n=0){return this.indirect=t,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,n){return this.attributes[t]=n,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,n,i=0){this.groups.push({start:t,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,n){this.drawRange.start=t,this.drawRange.count=n}applyMatrix4(t){let n=this.attributes.position;n!==void 0&&(n.applyMatrix4(t),n.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let a=new qt().getNormalMatrix(t);i.applyNormalMatrix(a),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Mi.makeRotationFromQuaternion(t),this.applyMatrix4(Mi),this}rotateX(t){return Mi.makeRotationX(t),this.applyMatrix4(Mi),this}rotateY(t){return Mi.makeRotationY(t),this.applyMatrix4(Mi),this}rotateZ(t){return Mi.makeRotationZ(t),this.applyMatrix4(Mi),this}translate(t,n,i){return Mi.makeTranslation(t,n,i),this.applyMatrix4(Mi),this}scale(t,n,i){return Mi.makeScale(t,n,i),this.applyMatrix4(Mi),this}lookAt(t){return V0.lookAt(t),V0.updateMatrix(),this.applyMatrix4(V0.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Go).negate(),this.translate(Go.x,Go.y,Go.z),this}setFromPoints(t){let n=this.getAttribute("position");if(n===void 0){let i=[];for(let s=0,a=t.length;s<a;s++){let r=t[s];i.push(r.x,r.y,r.z||0)}this.setAttribute("position",new le(i,3))}else{let i=Math.min(t.length,n.count);for(let s=0;s<i;s++){let a=t[s];n.setXYZ(s,a.x,a.y,a.z||0)}t.length>n.count&&Ft("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new fs);let t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Vt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),n)for(let i=0,s=n.length;i<s;i++){let a=n[i];ai.setFromBufferAttribute(a),this.morphTargetsRelative?(ln.addVectors(this.boundingBox.min,ai.min),this.boundingBox.expandByPoint(ln),ln.addVectors(this.boundingBox.max,ai.max),this.boundingBox.expandByPoint(ln)):(this.boundingBox.expandByPoint(ai.min),this.boundingBox.expandByPoint(ai.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Vt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Da);let t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Vt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(t){let i=this.boundingSphere.center;if(ai.setFromBufferAttribute(t),n)for(let a=0,r=n.length;a<r;a++){let o=n[a];bc.setFromBufferAttribute(o),this.morphTargetsRelative?(ln.addVectors(ai.min,bc.min),ai.expandByPoint(ln),ln.addVectors(ai.max,bc.max),ai.expandByPoint(ln)):(ai.expandByPoint(bc.min),ai.expandByPoint(bc.max))}ai.getCenter(i);let s=0;for(let a=0,r=t.count;a<r;a++)ln.fromBufferAttribute(t,a),s=Math.max(s,i.distanceToSquared(ln));if(n)for(let a=0,r=n.length;a<r;a++){let o=n[a],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)ln.fromBufferAttribute(o,c),l&&(Go.fromBufferAttribute(t,c),ln.add(Go)),s=Math.max(s,i.distanceToSquared(ln))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Vt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,n=this.attributes;if(t===null||n.position===void 0||n.normal===void 0||n.uv===void 0){Vt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=n.position,s=n.normal,a=n.uv,r=this.getAttribute("tangent");(r===void 0||r.count!==i.count)&&(r=new Vn(new Float32Array(4*i.count),4),this.setAttribute("tangent",r));let o=[],l=[];for(let x=0;x<i.count;x++)o[x]=new N,l[x]=new N;let c=new N,h=new N,p=new N,u=new gt,d=new gt,g=new gt,b=new N,_=new N;function f(x,A,R){c.fromBufferAttribute(i,x),h.fromBufferAttribute(i,A),p.fromBufferAttribute(i,R),u.fromBufferAttribute(a,x),d.fromBufferAttribute(a,A),g.fromBufferAttribute(a,R),h.sub(c),p.sub(c),d.sub(u),g.sub(u);let U=1/(d.x*g.y-g.x*d.y);isFinite(U)&&(b.copy(h).multiplyScalar(g.y).addScaledVector(p,-d.y).multiplyScalar(U),_.copy(p).multiplyScalar(d.x).addScaledVector(h,-g.x).multiplyScalar(U),o[x].add(b),o[A].add(b),o[R].add(b),l[x].add(_),l[A].add(_),l[R].add(_))}let v=this.groups;v.length===0&&(v=[{start:0,count:t.count}]);for(let x=0,A=v.length;x<A;++x){let R=v[x],U=R.start,B=R.count;for(let V=U,L=U+B;V<L;V+=3)f(t.getX(V+0),t.getX(V+1),t.getX(V+2))}let y=new N,m=new N,M=new N,E=new N;function w(x){M.fromBufferAttribute(s,x),E.copy(M);let A=o[x];y.copy(A),y.sub(M.multiplyScalar(M.dot(A))).normalize(),m.crossVectors(E,A);let U=m.dot(l[x])<0?-1:1;r.setXYZW(x,y.x,y.y,y.z,U)}for(let x=0,A=v.length;x<A;++x){let R=v[x],U=R.start,B=R.count;for(let V=U,L=U+B;V<L;V+=3)w(t.getX(V+0)),w(t.getX(V+1)),w(t.getX(V+2))}this._transformed=!0}computeVertexNormals(){let t=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==n.count)i=new Vn(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let u=0,d=i.count;u<d;u++)i.setXYZ(u,0,0,0);let s=new N,a=new N,r=new N,o=new N,l=new N,c=new N,h=new N,p=new N;if(t)for(let u=0,d=t.count;u<d;u+=3){let g=t.getX(u+0),b=t.getX(u+1),_=t.getX(u+2);s.fromBufferAttribute(n,g),a.fromBufferAttribute(n,b),r.fromBufferAttribute(n,_),h.subVectors(r,a),p.subVectors(s,a),h.cross(p),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,b),c.fromBufferAttribute(i,_),o.add(h),l.add(h),c.add(h),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(b,l.x,l.y,l.z),i.setXYZ(_,c.x,c.y,c.z)}else for(let u=0,d=n.count;u<d;u+=3)s.fromBufferAttribute(n,u+0),a.fromBufferAttribute(n,u+1),r.fromBufferAttribute(n,u+2),h.subVectors(r,a),p.subVectors(s,a),h.cross(p),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let n=0,i=t.count;n<i;n++)ln.fromBufferAttribute(t,n),ln.normalize(),t.setXYZ(n,ln.x,ln.y,ln.z)}toNonIndexed(){function t(o,l){let c=o.array,h=o.itemSize,p=o.normalized,u=new c.constructor(l.length*h),d=0,g=0;for(let b=0,_=l.length;b<_;b++){o.isInterleavedBufferAttribute?d=l[b]*o.data.stride+o.offset:d=l[b]*h;for(let f=0;f<h;f++)u[g++]=c[d++]}return new Vn(u,h,p)}if(this.index===null)return Ft("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let n=new e,i=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=t(l,i);n.setAttribute(o,c)}let a=this.morphAttributes;for(let o in a){let l=[],c=a[o];for(let h=0,p=c.length;h<p;h++){let u=c[h],d=t(u,i);l.push(d)}n.morphAttributes[o]=l}n.morphTargetsRelative=this.morphTargetsRelative;let r=this.groups;for(let o=0,l=r.length;o<l;o++){let c=r[o];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let n=this.index;n!==null&&(t.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});let i=this.attributes;for(let l in i){let c=i[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},a=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let p=0,u=c.length;p<u;p++){let d=c[p];h.push(d.toJSON(t.data))}h.length>0&&(s[l]=h,a=!0)}a&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let r=this.groups;r.length>0&&(t.data.groups=JSON.parse(JSON.stringify(r)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let n={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone());let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(n))}let a=t.morphAttributes;for(let c in a){let h=[],p=a[c];for(let u=0,d=p.length;u<d;u++)h.push(p[u].clone(n));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let r=t.groups;for(let c=0,h=r.length;c<h;c++){let p=r[c];this.addGroup(p.start,p.count,p.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},G0=new N,rR=new N,oR=new qt,Bi=class{constructor(t=new N(1,0,0),n=0){this.isPlane=!0,this.normal=t,this.constant=n}set(t,n){return this.normal.copy(t),this.constant=n,this}setComponents(t,n,i,s){return this.normal.set(t,n,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,n){return this.normal.copy(t),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(t,n,i){let s=G0.subVectors(i,n).cross(rR.subVectors(t,n)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,n){return n.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,n,i=!0){let s=t.delta(G0),a=this.normal.dot(s);if(a===0)return this.distanceToPoint(t.start)===0?n.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/a;return i===!0&&(r<0||r>1)?null:n.copy(t.start).addScaledVector(s,r)}intersectsLine(t){let n=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return n<0&&i>0||i<0&&n>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,n){let i=n||oR.getNormalMatrix(t),s=this.coplanarPoint(G0).applyMatrix4(t),a=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(a),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},lR=0,Hs=class extends us{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:lR++}),this.uuid=Cr(),this.name="",this.type="Material",this.blending=cl,this.side=Pa,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=h_,this.blendDst=f_,this.blendEquation=Ar,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ce(0,0,0),this.blendAlpha=0,this.depthFunc=Jo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=B1,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ff,this.stencilZFail=Ff,this.stencilZPass=Ff,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let n in t){let i=t[n];if(i===void 0){Ft(`Material: parameter '${n}' has value of undefined.`);continue}let s=this[n];if(s===void 0){Ft(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[n]=i}}toJSON(t){let n=t===void 0||typeof t=="string";n&&(t={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(a=>a.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(a){let r=[];for(let o in a){let l=a[o];delete l.metadata,r.push(l)}return r}if(n){let a=s(t.textures),r=s(t.images);a.length>0&&(i.textures=a),r.length>0&&(i.images=r)}return i}fromJSON(t,n){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new ce().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(i=>new Bi().fromJSON(i))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=n[t.map]||null),t.matcap!==void 0&&(this.matcap=n[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=n[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=n[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=n[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let i=t.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new gt().fromArray(i)}return t.displacementMap!==void 0&&(this.displacementMap=n[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=n[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=n[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=n[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=n[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=n[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=n[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=n[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=n[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=n[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=n[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=n[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=n[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=n[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new gt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=n[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=n[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=n[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=n[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=n[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=n[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=n[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let n=t.clippingPlanes,i=null;if(n!==null){let s=n.length;i=new Array(s);for(let a=0;a!==s;++a)i[a]=n[a].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},Bs=new N,k0=new N,_f=new N,vf=new N,tl=class{constructor(t=new N,n=new N(0,0,-1)){this.origin=t,this.direction=n}set(t,n){return this.origin.copy(t),this.direction.copy(n),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,n){return n.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Bs)),this}closestPointToPoint(t,n){n.subVectors(t,this.origin);let i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let n=Bs.subVectors(t,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(t):(Bs.copy(this.origin).addScaledVector(this.direction,n),Bs.distanceToSquared(t))}distanceSqToSegment(t,n,i,s){k0.copy(t).add(n).multiplyScalar(.5),_f.copy(n).sub(t).normalize(),vf.copy(this.origin).sub(k0);let a=t.distanceTo(n)*.5,r=-this.direction.dot(_f),o=vf.dot(this.direction),l=-vf.dot(_f),c=vf.lengthSq(),h=Math.abs(1-r*r),p,u,d,g;if(h>0)if(p=r*l-o,u=r*o-l,g=a*h,p>=0)if(u>=-g)if(u<=g){let b=1/h;p*=b,u*=b,d=p*(p+r*u+2*o)+u*(r*p+u+2*l)+c}else u=a,p=Math.max(0,-(r*u+o)),d=-p*p+u*(u+2*l)+c;else u=-a,p=Math.max(0,-(r*u+o)),d=-p*p+u*(u+2*l)+c;else u<=-g?(p=Math.max(0,-(-r*a+o)),u=p>0?-a:Math.min(Math.max(-a,-l),a),d=-p*p+u*(u+2*l)+c):u<=g?(p=0,u=Math.min(Math.max(-a,-l),a),d=u*(u+2*l)+c):(p=Math.max(0,-(r*a+o)),u=p>0?a:Math.min(Math.max(-a,-l),a),d=-p*p+u*(u+2*l)+c);else u=r>0?-a:a,p=Math.max(0,-(r*u+o)),d=-p*p+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,p),s&&s.copy(k0).addScaledVector(_f,u),d}intersectSphere(t,n){if(t.radius<0)return null;Bs.subVectors(t.center,this.origin);let i=Bs.dot(this.direction),s=Bs.dot(Bs)-i*i,a=t.radius*t.radius;if(s>a)return null;let r=Math.sqrt(a-s),o=i-r,l=i+r;return l<0?null:o<0?this.at(l,n):this.at(o,n)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let n=t.normal.dot(this.direction);if(n===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/n;return i>=0?i:null}intersectPlane(t,n){let i=this.distanceToPlane(t);return i===null?null:this.at(i,n)}intersectsPlane(t){let n=t.distanceToPoint(this.origin);return n===0||t.normal.dot(this.direction)*n<0}intersectBox(t,n){let i,s,a,r,o,l,c=1/this.direction.x,h=1/this.direction.y,p=1/this.direction.z,u=this.origin;return c>=0?(i=(t.min.x-u.x)*c,s=(t.max.x-u.x)*c):(i=(t.max.x-u.x)*c,s=(t.min.x-u.x)*c),h>=0?(a=(t.min.y-u.y)*h,r=(t.max.y-u.y)*h):(a=(t.max.y-u.y)*h,r=(t.min.y-u.y)*h),i>r||a>s||((a>i||isNaN(i))&&(i=a),(r<s||isNaN(s))&&(s=r),p>=0?(o=(t.min.z-u.z)*p,l=(t.max.z-u.z)*p):(o=(t.max.z-u.z)*p,l=(t.min.z-u.z)*p),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,n)}intersectsBox(t){return this.intersectBox(t,Bs)!==null}intersectTriangle(t,n,i,s,a){let r=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,p=t.x-r.x,u=t.y-r.y,d=t.z-r.z,g=n.x-r.x,b=n.y-r.y,_=n.z-r.z,f=i.x-r.x,v=i.y-r.y,y=i.z-r.z,m=Math.abs(l),M=Math.abs(c),E=Math.abs(h),w,x,A,R,U,B,V,L,F,J,q,at;if(m>=M&&m>=E?(A=l,B=p,F=g,at=f,l>=0?(w=c,x=h,R=u,U=d,V=b,L=_,J=v,q=y):(w=h,x=c,R=d,U=u,V=_,L=b,J=y,q=v)):M>=E?(A=c,B=u,F=b,at=v,c>=0?(w=h,x=l,R=d,U=p,V=_,L=g,J=y,q=f):(w=l,x=h,R=p,U=d,V=g,L=_,J=f,q=y)):(A=h,B=d,F=_,at=y,h>=0?(w=l,x=c,R=p,U=u,V=g,L=b,J=f,q=v):(w=c,x=l,R=u,U=p,V=b,L=g,J=v,q=f)),A===0)return null;let Y=w/A,$=x/A,et=1/A,Ct=R-Y*B,Mt=U-$*B,ee=V-Y*F,Zt=L-$*F,ne=J-Y*at,K=q-$*at,tt=ne*Zt-K*ee,mt=Ct*K-Mt*ne,Bt=ee*Mt-Zt*Ct;if(s){if(tt<0||mt<0||Bt<0)return null}else if((tt<0||mt<0||Bt<0)&&(tt>0||mt>0||Bt>0))return null;let vt=tt+mt+Bt;if(vt===0)return null;let Ot=et*(tt*B+mt*F+Bt*at);return(vt>0?Ot<0:Ot>0)?null:this.at(Ot/vt,a)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Sr=class extends Hs{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ce(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hs,this.combine=d_,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},Wb=new Ie,_r=new tl,yf=new Da,qb=new N,xf=new N,Sf=new N,Mf=new N,X0=new N,bf=new N,Yb=new N,Ef=new N,Wn=class extends Xn{constructor(t=new xe,n=new Sr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){let s=n[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=s.length;a<r;a++){let o=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}getVertexPosition(t,n){let i=this.geometry,s=i.attributes.position,a=i.morphAttributes.position,r=i.morphTargetsRelative;n.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(a&&o){bf.set(0,0,0);for(let l=0,c=a.length;l<c;l++){let h=o[l],p=a[l];h!==0&&(X0.fromBufferAttribute(p,t),r?bf.addScaledVector(X0,h):bf.addScaledVector(X0.sub(n),h))}n.add(bf)}return n}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,n){let i=this.geometry,s=this.material,a=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),yf.copy(i.boundingSphere),yf.applyMatrix4(a),_r.copy(t.ray).recast(t.near),!(yf.containsPoint(_r.origin)===!1&&(_r.intersectSphere(yf,qb)===null||_r.origin.distanceToSquared(qb)>(t.far-t.near)**2))&&(Wb.copy(a).invert(),_r.copy(t.ray).applyMatrix4(Wb),!(i.boundingBox!==null&&_r.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,n,_r)))}_computeIntersections(t,n,i){let s,a=this.geometry,r=this.material,o=a.index,l=a.attributes.position,c=a.attributes.uv,h=a.attributes.uv1,p=a.attributes.normal,u=a.groups,d=a.drawRange;if(o!==null)if(Array.isArray(r))for(let g=0,b=u.length;g<b;g++){let _=u[g],f=r[_.materialIndex],v=Math.max(_.start,d.start),y=Math.min(o.count,Math.min(_.start+_.count,d.start+d.count));for(let m=v,M=y;m<M;m+=3){let E=o.getX(m),w=o.getX(m+1),x=o.getX(m+2);s=Tf(this,f,t,i,c,h,p,E,w,x),s&&(s.faceIndex=Math.floor(m/3),s.face.materialIndex=_.materialIndex,n.push(s))}}else{let g=Math.max(0,d.start),b=Math.min(o.count,d.start+d.count);for(let _=g,f=b;_<f;_+=3){let v=o.getX(_),y=o.getX(_+1),m=o.getX(_+2);s=Tf(this,r,t,i,c,h,p,v,y,m),s&&(s.faceIndex=Math.floor(_/3),n.push(s))}}else if(l!==void 0)if(Array.isArray(r))for(let g=0,b=u.length;g<b;g++){let _=u[g],f=r[_.materialIndex],v=Math.max(_.start,d.start),y=Math.min(l.count,Math.min(_.start+_.count,d.start+d.count));for(let m=v,M=y;m<M;m+=3){let E=m,w=m+1,x=m+2;s=Tf(this,f,t,i,c,h,p,E,w,x),s&&(s.faceIndex=Math.floor(m/3),s.face.materialIndex=_.materialIndex,n.push(s))}}else{let g=Math.max(0,d.start),b=Math.min(l.count,d.start+d.count);for(let _=g,f=b;_<f;_+=3){let v=_,y=_+1,m=_+2;s=Tf(this,r,t,i,c,h,p,v,y,m),s&&(s.faceIndex=Math.floor(_/3),n.push(s))}}}};$f=class extends Gn{constructor(t=null,n=1,i=1,s,a,r,o,l,c=cn,h=cn,p,u){super(null,r,o,l,c,h,s,a,p,u),this.isDataTexture=!0,this.image={data:t,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},vr=new Da,uR=new gt(.5,.5),Af=new N,Fc=class{constructor(t=new Bi,n=new Bi,i=new Bi,s=new Bi,a=new Bi,r=new Bi){this.planes=[t,n,i,s,a,r]}set(t,n,i,s,a,r){let o=this.planes;return o[0].copy(t),o[1].copy(n),o[2].copy(i),o[3].copy(s),o[4].copy(a),o[5].copy(r),this}copy(t){let n=this.planes;for(let i=0;i<6;i++)n[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,n=zi,i=!1){let s=this.planes,a=t.elements,r=a[0],o=a[1],l=a[2],c=a[3],h=a[4],p=a[5],u=a[6],d=a[7],g=a[8],b=a[9],_=a[10],f=a[11],v=a[12],y=a[13],m=a[14],M=a[15];if(s[0].setComponents(c-r,d-h,f-g,M-v).normalize(),s[1].setComponents(c+r,d+h,f+g,M+v).normalize(),s[2].setComponents(c+o,d+p,f+b,M+y).normalize(),s[3].setComponents(c-o,d-p,f-b,M-y).normalize(),i)s[4].setComponents(l,u,_,m).normalize(),s[5].setComponents(c-l,d-u,f-_,M-m).normalize();else if(s[4].setComponents(c-l,d-u,f-_,M-m).normalize(),n===zi)s[5].setComponents(c+l,d+u,f+_,M+m).normalize();else if(n===Uc)s[5].setComponents(l,u,_,m).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),vr.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let n=t.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),vr.copy(n.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(vr)}intersectsSprite(t){vr.center.set(0,0,0);let n=uR.distanceTo(t.center);return vr.radius=.7071067811865476+n,vr.applyMatrix4(t.matrixWorld),this.intersectsSphere(vr)}intersectsSphere(t){let n=this.planes,i=t.center,s=-t.radius;for(let a=0;a<6;a++)if(n[a].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){let n=this.planes;for(let i=0;i<6;i++){let s=n[i];if(Af.x=s.normal.x>0?t.max.x:t.min.x,Af.y=s.normal.y>0?t.max.y:t.min.y,Af.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Af)<0)return!1}return!0}containsPoint(t){let n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},el=class extends Hs{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ce(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},td=new N,ed=new N,Zb=new Ie,Ec=new tl,wf=new Da,W0=new N,Jb=new N,nl=class extends Xn{constructor(t=new xe,n=new el){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let n=t.attributes.position,i=[0];for(let s=1,a=n.count;s<a;s++)td.fromBufferAttribute(n,s-1),ed.fromBufferAttribute(n,s),i[s]=i[s-1],i[s]+=td.distanceTo(ed);t.setAttribute("lineDistance",new le(i,1))}else Ft("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,n){let i=this.geometry,s=this.matrixWorld,a=t.params.Line.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),wf.copy(i.boundingSphere),wf.applyMatrix4(s),wf.radius+=a,t.ray.intersectsSphere(wf)===!1)return;Zb.copy(s).invert(),Ec.copy(t.ray).applyMatrix4(Zb);let o=a/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=i.index,u=i.attributes.position;if(h!==null){let d=Math.max(0,r.start),g=Math.min(h.count,r.start+r.count);for(let b=d,_=g-1;b<_;b+=c){let f=h.getX(b),v=h.getX(b+1),y=Cf(this,t,Ec,l,f,v,b);y&&n.push(y)}if(this.isLineLoop){let b=h.getX(g-1),_=h.getX(d),f=Cf(this,t,Ec,l,b,_,g-1);f&&n.push(f)}}else{let d=Math.max(0,r.start),g=Math.min(u.count,r.start+r.count);for(let b=d,_=g-1;b<_;b+=c){let f=Cf(this,t,Ec,l,b,b+1,b);f&&n.push(f)}if(this.isLineLoop){let b=Cf(this,t,Ec,l,g-1,d,g-1);b&&n.push(b)}}}updateMorphTargets(){let n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){let s=n[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=s.length;a<r;a++){let o=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}};Kb=new N,Qb=new N,Vs=class extends nl{constructor(t,n){super(t,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let n=t.attributes.position,i=[];for(let s=0,a=n.count;s<a;s+=2)Kb.fromBufferAttribute(n,s),Qb.fromBufferAttribute(n,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+Kb.distanceTo(Qb);t.setAttribute("lineDistance",new le(i,1))}else Ft("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},Gs=class extends Hs{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ce(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},jb=new Ie,e_=new tl,Rf=new Da,Nf=new N,ks=class extends Xn{constructor(t=new xe,n=new Gs){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,n){let i=this.geometry,s=this.matrixWorld,a=t.params.Points.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Rf.copy(i.boundingSphere),Rf.applyMatrix4(s),Rf.radius+=a,t.ray.intersectsSphere(Rf)===!1)return;jb.copy(s).invert(),e_.copy(t.ray).applyMatrix4(jb);let o=a/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,p=i.attributes.position;if(c!==null){let u=Math.max(0,r.start),d=Math.min(c.count,r.start+r.count);for(let g=u,b=d;g<b;g++){let _=c.getX(g);Nf.fromBufferAttribute(p,_),$b(Nf,_,l,s,t,n,this)}}else{let u=Math.max(0,r.start),d=Math.min(p.count,r.start+r.count);for(let g=u,b=d;g<b;g++)Nf.fromBufferAttribute(p,g),$b(Nf,g,l,s,t,n,this)}}updateMorphTargets(){let n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){let s=n[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=s.length;a<r;a++){let o=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}};Hc=class extends Gn{constructor(t=[],n=Ba,i,s,a,r,o,l,c,h){super(t,n,i,s,a,r,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Ua=class extends Gn{constructor(t,n,i=Hi,s,a,r,o=cn,l=cn,c,h=cs,p=1){if(h!==cs&&h!==Fa)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:t,height:n,depth:p};super(u,s,a,r,o,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new jo(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let n=super.toJSON(t);return n.compareFunction=this.compareFunction,n}},nd=class extends Ua{constructor(t,n=Hi,i=Ba,s,a,r=cn,o=cn,l,c=cs){let h={width:t,height:t,depth:1},p=[h,h,h,h,h,h];super(t,t,n,i,s,a,r,o,l,c),this.image=p,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},Vc=class extends Gn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},Ti=class e extends xe{constructor(t=1,n=1,i=1,s=1,a=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:n,depth:i,widthSegments:s,heightSegments:a,depthSegments:r};let o=this;s=Math.floor(s),a=Math.floor(a),r=Math.floor(r);let l=[],c=[],h=[],p=[],u=0,d=0;g("z","y","x",-1,-1,i,n,t,r,a,0),g("z","y","x",1,-1,i,n,-t,r,a,1),g("x","z","y",1,1,t,i,n,s,r,2),g("x","z","y",1,-1,t,i,-n,s,r,3),g("x","y","z",1,-1,t,n,i,s,a,4),g("x","y","z",-1,-1,t,n,-i,s,a,5),this.setIndex(l),this.setAttribute("position",new le(c,3)),this.setAttribute("normal",new le(h,3)),this.setAttribute("uv",new le(p,2));function g(b,_,f,v,y,m,M,E,w,x,A){let R=m/w,U=M/x,B=m/2,V=M/2,L=E/2,F=w+1,J=x+1,q=0,at=0,Y=new N;for(let $=0;$<J;$++){let et=$*U-V;for(let Ct=0;Ct<F;Ct++){let Mt=Ct*R-B;Y[b]=Mt*v,Y[_]=et*y,Y[f]=L,c.push(Y.x,Y.y,Y.z),Y[b]=0,Y[_]=0,Y[f]=E>0?1:-1,h.push(Y.x,Y.y,Y.z),p.push(Ct/w),p.push(1-$/x),q+=1}}for(let $=0;$<x;$++)for(let et=0;et<w;et++){let Ct=u+et+F*$,Mt=u+et+F*($+1),ee=u+(et+1)+F*($+1),Zt=u+(et+1)+F*$;l.push(Ct,Mt,Zt),l.push(Mt,ee,Zt),at+=6}o.addGroup(d,at,A),d+=at,u+=q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},il=class e extends xe{constructor(t=1,n=1,i=1,s=32,a=1,r=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:n,height:i,radialSegments:s,heightSegments:a,openEnded:r,thetaStart:o,thetaLength:l};let c=this;s=Math.floor(s),a=Math.floor(a);let h=[],p=[],u=[],d=[],g=0,b=[],_=i/2,f=0;v(),r===!1&&(t>0&&y(!0),n>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new le(p,3)),this.setAttribute("normal",new le(u,3)),this.setAttribute("uv",new le(d,2));function v(){let m=new N,M=new N,E=0,w=(n-t)/i;for(let x=0;x<=a;x++){let A=[],R=x/a,U=R*(n-t)+t;for(let B=0;B<=s;B++){let V=B/s,L=V*l+o,F=Math.sin(L),J=Math.cos(L);M.x=U*F,M.y=-R*i+_,M.z=U*J,p.push(M.x,M.y,M.z),m.set(F,w,J).normalize(),u.push(m.x,m.y,m.z),d.push(V,1-R),A.push(g++)}b.push(A)}for(let x=0;x<s;x++)for(let A=0;A<a;A++){let R=b[A][x],U=b[A+1][x],B=b[A+1][x+1],V=b[A][x+1];(t>0||A!==0)&&(h.push(R,U,V),E+=3),(n>0||A!==a-1)&&(h.push(U,B,V),E+=3)}c.addGroup(f,E,0),f+=E}function y(m){let M=g,E=new gt,w=new N,x=0,A=m===!0?t:n,R=m===!0?1:-1;for(let B=1;B<=s;B++)p.push(0,_*R,0),u.push(0,R,0),d.push(.5,.5),g++;let U=g;for(let B=0;B<=s;B++){let L=B/s*l+o,F=Math.cos(L),J=Math.sin(L);w.x=A*J,w.y=_*R,w.z=A*F,p.push(w.x,w.y,w.z),u.push(0,R,0),E.x=F*.5+.5,E.y=J*.5*R+.5,d.push(E.x,E.y),g++}for(let B=0;B<s;B++){let V=M+B,L=U+B;m===!0?h.push(L,L+1,V):h.push(L+1,L,V),x+=3}c.addGroup(f,x,m===!0?1:2),f+=x}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Gc=class e extends xe{constructor(t=[],n=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:n,radius:i,detail:s};let a=[],r=[];o(s),c(i),h(),this.setAttribute("position",new le(a,3)),this.setAttribute("normal",new le(a.slice(),3)),this.setAttribute("uv",new le(r,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(v){let y=new N,m=new N,M=new N;for(let E=0;E<n.length;E+=3)d(n[E+0],y),d(n[E+1],m),d(n[E+2],M),l(y,m,M,v)}function l(v,y,m,M){let E=M+1,w=[];for(let x=0;x<=E;x++){w[x]=[];let A=v.clone().lerp(m,x/E),R=y.clone().lerp(m,x/E),U=E-x;for(let B=0;B<=U;B++)B===0&&x===E?w[x][B]=A:w[x][B]=A.clone().lerp(R,B/U)}for(let x=0;x<E;x++)for(let A=0;A<2*(E-x)-1;A++){let R=Math.floor(A/2);A%2===0?(u(w[x][R+1]),u(w[x+1][R]),u(w[x][R])):(u(w[x][R+1]),u(w[x+1][R+1]),u(w[x+1][R]))}}function c(v){let y=new N;for(let m=0;m<a.length;m+=3)y.x=a[m+0],y.y=a[m+1],y.z=a[m+2],y.normalize().multiplyScalar(v),a[m+0]=y.x,a[m+1]=y.y,a[m+2]=y.z}function h(){let v=new N;for(let y=0;y<a.length;y+=3){v.x=a[y+0],v.y=a[y+1],v.z=a[y+2];let m=_(v)/2/Math.PI+.5,M=f(v)/Math.PI+.5;r.push(m,1-M)}g(),p()}function p(){for(let v=0;v<r.length;v+=6){let y=r[v+0],m=r[v+2],M=r[v+4],E=Math.max(y,m,M),w=Math.min(y,m,M);E>.9&&w<.1&&(y<.2&&(r[v+0]+=1),m<.2&&(r[v+2]+=1),M<.2&&(r[v+4]+=1))}}function u(v){a.push(v.x,v.y,v.z)}function d(v,y){let m=v*3;y.x=t[m+0],y.y=t[m+1],y.z=t[m+2]}function g(){let v=new N,y=new N,m=new N,M=new N,E=new gt,w=new gt,x=new gt;for(let A=0,R=0;A<a.length;A+=9,R+=6){v.set(a[A+0],a[A+1],a[A+2]),y.set(a[A+3],a[A+4],a[A+5]),m.set(a[A+6],a[A+7],a[A+8]),E.set(r[R+0],r[R+1]),w.set(r[R+2],r[R+3]),x.set(r[R+4],r[R+5]),M.copy(v).add(y).add(m).divideScalar(3);let U=_(M);b(E,R+0,v,U),b(w,R+2,y,U),b(x,R+4,m,U)}}function b(v,y,m,M){M<0&&v.x===1&&(r[y]=v.x-1),m.x===0&&m.z===0&&(r[y]=M/2/Math.PI+.5)}function _(v){return Math.atan2(v.z,-v.x)}function f(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.vertices,t.indices,t.radius,t.detail)}},Df=new N,Uf=new N,q0=new N,Lf=new zs,kc=class extends xe{constructor(t=null,n=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:n},t!==null){let s=Math.pow(10,4),a=Math.cos(Yo*n),r=t.getIndex(),o=t.getAttribute("position"),l=r?r.count:o.count,c=[0,0,0],h=["a","b","c"],p=new Array(3),u={},d=[];for(let g=0;g<l;g+=3){r?(c[0]=r.getX(g),c[1]=r.getX(g+1),c[2]=r.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);let{a:b,b:_,c:f}=Lf;if(b.fromBufferAttribute(o,c[0]),_.fromBufferAttribute(o,c[1]),f.fromBufferAttribute(o,c[2]),Lf.getNormal(q0),p[0]=`${Math.round(b.x*s)},${Math.round(b.y*s)},${Math.round(b.z*s)}`,p[1]=`${Math.round(_.x*s)},${Math.round(_.y*s)},${Math.round(_.z*s)}`,p[2]=`${Math.round(f.x*s)},${Math.round(f.y*s)},${Math.round(f.z*s)}`,!(p[0]===p[1]||p[1]===p[2]||p[2]===p[0]))for(let v=0;v<3;v++){let y=(v+1)%3,m=p[v],M=p[y],E=Lf[h[v]],w=Lf[h[y]],x=`${m}_${M}`,A=`${M}_${m}`;A in u&&u[A]?(q0.dot(u[A].normal)<=a&&(d.push(E.x,E.y,E.z),d.push(w.x,w.y,w.z)),u[A]=null):x in u||(u[x]={index0:c[v],index1:c[y],normal:q0.clone()})}}for(let g in u)if(u[g]){let{index0:b,index1:_}=u[g];Df.fromBufferAttribute(o,b),Uf.fromBufferAttribute(o,_),d.push(Df.x,Df.y,Df.z),d.push(Uf.x,Uf.y,Uf.z)}this.setAttribute("position",new le(d,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}},oi=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ft("Curve: .getPoint() not implemented.")}getPointAt(t,n){let i=this.getUtoTmapping(t);return this.getPoint(i,n)}getPoints(t=5){let n=[];for(let i=0;i<=t;i++)n.push(this.getPoint(i/t));return n}getSpacedPoints(t=5){let n=[];for(let i=0;i<=t;i++)n.push(this.getPointAt(i/t));return n}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let n=[],i,s=this.getPoint(0),a=0;n.push(0);for(let r=1;r<=t;r++)i=this.getPoint(r/t),a+=i.distanceTo(s),n.push(a),s=i;return this.cacheArcLengths=n,n}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,n=null){let i=this.getLengths(),s=0,a=i.length,r;n?r=n:r=t*i[a-1];let o=0,l=a-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=i[s]-r,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,i[s]===r)return s/(a-1);let h=i[s],u=i[s+1]-h,d=(r-h)/u;return(s+d)/(a-1)}getTangent(t,n){let s=t-1e-4,a=t+1e-4;s<0&&(s=0),a>1&&(a=1);let r=this.getPoint(s),o=this.getPoint(a),l=n||(r.isVector2?new gt:new N);return l.copy(o).sub(r).normalize(),l}getTangentAt(t,n){let i=this.getUtoTmapping(t);return this.getTangent(i,n)}computeFrenetFrames(t,n=!1){let i=new N,s=[],a=[],r=[],o=new N,l=new Ie;for(let d=0;d<=t;d++){let g=d/t;s[d]=this.getTangentAt(g,new N)}a[0]=new N,r[0]=new N;let c=Number.MAX_VALUE,h=Math.abs(s[0].x),p=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=c&&(c=h,i.set(1,0,0)),p<=c&&(c=p,i.set(0,1,0)),u<=c&&i.set(0,0,1),o.crossVectors(s[0],i).normalize(),a[0].crossVectors(s[0],o),r[0].crossVectors(s[0],a[0]);for(let d=1;d<=t;d++){if(a[d]=a[d-1].clone(),r[d]=r[d-1].clone(),o.crossVectors(s[d-1],s[d]),o.length()>Number.EPSILON){o.normalize();let g=Math.acos(te(s[d-1].dot(s[d]),-1,1));a[d].applyMatrix4(l.makeRotationAxis(o,g))}r[d].crossVectors(s[d],a[d])}if(n===!0){let d=Math.acos(te(a[0].dot(a[t]),-1,1));d/=t,s[0].dot(o.crossVectors(a[0],a[t]))>0&&(d=-d);for(let g=1;g<=t;g++)a[g].applyMatrix4(l.makeRotationAxis(s[g],d*g)),r[g].crossVectors(s[g],a[g])}return{tangents:s,normals:a,binormals:r}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},sl=class extends oi{constructor(t=0,n=0,i=1,s=1,a=0,r=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=n,this.xRadius=i,this.yRadius=s,this.aStartAngle=a,this.aEndAngle=r,this.aClockwise=o,this.aRotation=l}getPoint(t,n=new gt){let i=n,s=Math.PI*2,a=this.aEndAngle-this.aStartAngle,r=Math.abs(a)<Number.EPSILON;for(;a<0;)a+=s;for(;a>s;)a-=s;a<Number.EPSILON&&(r?a=0:a=s),this.aClockwise===!0&&!r&&(a===s?a=-s:a=a-s);let o=this.aStartAngle+t*a,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),p=Math.sin(this.aRotation),u=l-this.aX,d=c-this.aY;l=u*h-d*p+this.aX,c=u*p+d*h+this.aY}return i.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},id=class extends sl{constructor(t,n,i,s,a,r){super(t,n,i,i,s,a,r),this.isArcCurve=!0,this.type="ArcCurve"}};t1=new N,e1=new N,Y0=new L_,Z0=new L_,J0=new L_,sd=class extends oi{constructor(t=[],n=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=n,this.curveType=i,this.tension=s}getPoint(t,n=new N){let i=n,s=this.points,a=s.length,r=(a-(this.closed?0:1))*t,o=Math.floor(r),l=r-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/a)+1)*a:l===0&&o===a-1&&(o=a-2,l=1);let c,h;this.closed||o>0?c=s[(o-1)%a]:(e1.subVectors(s[0],s[1]).add(s[0]),c=e1);let p=s[o%a],u=s[(o+1)%a];if(this.closed||o+2<a?h=s[(o+2)%a]:(t1.subVectors(s[a-1],s[a-2]).add(s[a-1]),h=t1),this.curveType==="centripetal"||this.curveType==="chordal"){let d=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(p),d),b=Math.pow(p.distanceToSquared(u),d),_=Math.pow(u.distanceToSquared(h),d);b<1e-4&&(b=1),g<1e-4&&(g=b),_<1e-4&&(_=b),Y0.initNonuniformCatmullRom(c.x,p.x,u.x,h.x,g,b,_),Z0.initNonuniformCatmullRom(c.y,p.y,u.y,h.y,g,b,_),J0.initNonuniformCatmullRom(c.z,p.z,u.z,h.z,g,b,_)}else this.curveType==="catmullrom"&&(Y0.initCatmullRom(c.x,p.x,u.x,h.x,this.tension),Z0.initCatmullRom(c.y,p.y,u.y,h.y,this.tension),J0.initCatmullRom(c.z,p.z,u.z,h.z,this.tension));return i.set(Y0.calc(l),Z0.calc(l),J0.calc(l)),i}copy(t){super.copy(t),this.points=[];for(let n=0,i=t.points.length;n<i;n++){let s=t.points[n];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let n=0,i=this.points.length;n<i;n++){let s=this.points[n];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let n=0,i=t.points.length;n<i;n++){let s=t.points[n];this.points.push(new N().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};Xc=class extends oi{constructor(t=new gt,n=new gt,i=new gt,s=new gt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=n,this.v2=i,this.v3=s}getPoint(t,n=new gt){let i=n,s=this.v0,a=this.v1,r=this.v2,o=this.v3;return i.set(Cc(t,s.x,a.x,r.x,o.x),Cc(t,s.y,a.y,r.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},ad=class extends oi{constructor(t=new N,n=new N,i=new N,s=new N){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=n,this.v2=i,this.v3=s}getPoint(t,n=new N){let i=n,s=this.v0,a=this.v1,r=this.v2,o=this.v3;return i.set(Cc(t,s.x,a.x,r.x,o.x),Cc(t,s.y,a.y,r.y,o.y),Cc(t,s.z,a.z,r.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Wc=class extends oi{constructor(t=new gt,n=new gt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=n}getPoint(t,n=new gt){let i=n;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,n){return this.getPoint(t,n)}getTangent(t,n=new gt){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,n){return this.getTangent(t,n)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},al=class extends oi{constructor(t=new N,n=new N){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=n}getPoint(t,n=new N){let i=n;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,n){return this.getPoint(t,n)}getTangent(t,n=new N){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,n){return this.getTangent(t,n)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},qc=class extends oi{constructor(t=new gt,n=new gt,i=new gt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=n,this.v2=i}getPoint(t,n=new gt){let i=n,s=this.v0,a=this.v1,r=this.v2;return i.set(wc(t,s.x,a.x,r.x),wc(t,s.y,a.y,r.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Mr=class extends oi{constructor(t=new N,n=new N,i=new N){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=n,this.v2=i}getPoint(t,n=new N){let i=n,s=this.v0,a=this.v1,r=this.v2;return i.set(wc(t,s.x,a.x,r.x),wc(t,s.y,a.y,r.y),wc(t,s.z,a.z,r.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Yc=class extends oi{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,n=new gt){let i=n,s=this.points,a=(s.length-1)*t,r=Math.floor(a),o=a-r,l=s[r===0?r:r-1],c=s[r],h=s[r>s.length-2?s.length-1:r+1],p=s[r>s.length-3?s.length-1:r+2];return i.set(n1(o,l.x,c.x,h.x,p.x),n1(o,l.y,c.y,h.y,p.y)),i}copy(t){super.copy(t),this.points=[];for(let n=0,i=t.points.length;n<i;n++){let s=t.points[n];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let n=0,i=this.points.length;n<i;n++){let s=this.points[n];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let n=0,i=t.points.length;n<i;n++){let s=t.points[n];this.points.push(new gt().fromArray(s))}return this}},rd=Object.freeze({__proto__:null,ArcCurve:id,CatmullRomCurve3:sd,CubicBezierCurve:Xc,CubicBezierCurve3:ad,EllipseCurve:sl,LineCurve:Wc,LineCurve3:al,QuadraticBezierCurve:qc,QuadraticBezierCurve3:Mr,SplineCurve:Yc}),od=class extends oi{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),n=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(n)){let i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new rd[i](n,t))}return this}getPoint(t,n){let i=t*this.getLength(),s=this.getCurveLengths(),a=0;for(;a<s.length;){if(s[a]>=i){let r=s[a]-i,o=this.curves[a],l=o.getLength(),c=l===0?0:1-r/l;return o.getPointAt(c,n)}a++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],n=0;for(let i=0,s=this.curves.length;i<s;i++)n+=this.curves[i].getLength(),t.push(n);return this.cacheLengths=t,t}getSpacedPoints(t=40){let n=[];for(let i=0;i<=t;i++)n.push(this.getPoint(i/t));return this.autoClose&&n.push(n[0]),n}getPoints(t=12){let n=[],i;for(let s=0,a=this.curves;s<a.length;s++){let r=a[s],o=r.isEllipseCurve?t*2:r.isLineCurve||r.isLineCurve3?1:r.isSplineCurve?t*r.points.length:t,l=r.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];i&&i.equals(h)||(n.push(h),i=h)}}return this.autoClose&&n.length>1&&!n[n.length-1].equals(n[0])&&n.push(n[0]),n}copy(t){super.copy(t),this.curves=[];for(let n=0,i=t.curves.length;n<i;n++){let s=t.curves[n];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let n=0,i=this.curves.length;n<i;n++){let s=this.curves[n];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let n=0,i=t.curves.length;n<i;n++){let s=t.curves[n];this.curves.push(new rd[s.type]().fromJSON(s))}return this}},Zc=class extends od{constructor(t){super(),this.type="Path",this.currentPoint=new gt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let n=1,i=t.length;n<i;n++)this.lineTo(t[n].x,t[n].y);return this}moveTo(t,n){return this.currentPoint.set(t,n),this}lineTo(t,n){let i=new Wc(this.currentPoint.clone(),new gt(t,n));return this.curves.push(i),this.currentPoint.set(t,n),this}quadraticCurveTo(t,n,i,s){let a=new qc(this.currentPoint.clone(),new gt(t,n),new gt(i,s));return this.curves.push(a),this.currentPoint.set(i,s),this}bezierCurveTo(t,n,i,s,a,r){let o=new Xc(this.currentPoint.clone(),new gt(t,n),new gt(i,s),new gt(a,r));return this.curves.push(o),this.currentPoint.set(a,r),this}splineThru(t){let n=[this.currentPoint.clone()].concat(t),i=new Yc(n);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,n,i,s,a,r){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+o,n+l,i,s,a,r),this}absarc(t,n,i,s,a,r){return this.absellipse(t,n,i,i,s,a,r),this}ellipse(t,n,i,s,a,r,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,n+h,i,s,a,r,o,l),this}absellipse(t,n,i,s,a,r,o,l){let c=new sl(t,n,i,s,a,r,o,l);if(this.curves.length>0){let p=c.getPoint(0);p.equals(this.currentPoint)||this.lineTo(p.x,p.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},br=class extends Zc{constructor(t){super(t),this.uuid=Cr(),this.type="Shape",this.holes=[]}getPointsHoles(t){let n=[];for(let i=0,s=this.holes.length;i<s;i++)n[i]=this.holes[i].getPoints(t);return n}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let n=0,i=t.holes.length;n<i;n++){let s=t.holes[n];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let n=0,i=this.holes.length;n<i;n++){let s=this.holes[n];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let n=0,i=t.holes.length;n<i;n++){let s=t.holes[n];this.holes.push(new Zc().fromJSON(s))}return this}};s_=class{static triangulate(t,n,i=2){return vR(t,n,i)}},yr=class e{static area(t){let n=t.length,i=0;for(let s=n-1,a=0;a<n;s=a++)i+=t[s].x*t[a].y-t[a].x*t[s].y;return i*.5}static isClockWise(t){return e.area(t)<0}static triangulateShape(t,n){let i=[],s=[],a=[];s1(t),a1(i,t);let r=t.length;n.forEach(s1);for(let l=0;l<n.length;l++)s.push(r),r+=n[l].length,a1(i,n[l]);let o=s_.triangulate(i,s);for(let l=0;l<o.length;l+=3)a.push(o.slice(l,l+3));return a}};ol=class e extends xe{constructor(t=new br([new gt(.5,.5),new gt(-.5,.5),new gt(-.5,-.5),new gt(.5,-.5)]),n={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:n},t=Array.isArray(t)?t:[t];let i=this,s=[],a=[];for(let o=0,l=t.length;o<l;o++){let c=t[o];r(c)}this.setAttribute("position",new le(s,3)),this.setAttribute("uv",new le(a,2)),this.computeVertexNormals();function r(o){let l=[],c=n.curveSegments!==void 0?n.curveSegments:12,h=n.steps!==void 0?n.steps:1,p=n.depth!==void 0?n.depth:1,u=n.bevelEnabled!==void 0?n.bevelEnabled:!0,d=n.bevelThickness!==void 0?n.bevelThickness:.2,g=n.bevelSize!==void 0?n.bevelSize:d-.1,b=n.bevelOffset!==void 0?n.bevelOffset:0,_=n.bevelSegments!==void 0?n.bevelSegments:3,f=n.extrudePath,v=n.UVGenerator!==void 0?n.UVGenerator:IR,y,m=!1,M,E,w,x;if(f){y=f.getSpacedPoints(h),m=!0,u=!1;let it=f.isCatmullRomCurve3?f.closed:!1;M=f.computeFrenetFrames(h,it),E=new N,w=new N,x=new N}u||(_=0,d=0,g=0,b=0);let A=o.extractPoints(c),R=A.shape,U=A.holes;if(!yr.isClockWise(R)){R=R.reverse();for(let it=0,ot=U.length;it<ot;it++){let lt=U[it];yr.isClockWise(lt)&&(U[it]=lt.reverse())}}function V(it){let lt=10000000000000001e-36,ut=it[0];for(let dt=1;dt<=it.length;dt++){let zt=dt%it.length,Rt=it[zt],Ht=Rt.x-ut.x,Xt=Rt.y-ut.y,D=Ht*Ht+Xt*Xt,ue=Math.max(Math.abs(Rt.x),Math.abs(Rt.y),Math.abs(ut.x),Math.abs(ut.y)),Kt=lt*ue*ue;if(D<=Kt){it.splice(zt,1),dt--;continue}ut=Rt}}V(R),U.forEach(V);let L=U.length,F=R;for(let it=0;it<L;it++){let ot=U[it];R=R.concat(ot)}function J(it,ot,lt){return ot||Vt("ExtrudeGeometry: vec does not exist"),it.clone().addScaledVector(ot,lt)}let q=R.length;function at(it,ot,lt){let ut,dt,zt,Rt=it.x-ot.x,Ht=it.y-ot.y,Xt=lt.x-it.x,D=lt.y-it.y,ue=Rt*Rt+Ht*Ht,Kt=Rt*D-Ht*Xt;if(Math.abs(Kt)>Number.EPSILON){let C=Math.sqrt(ue),S=Math.sqrt(Xt*Xt+D*D),z=ot.x-Ht/C,X=ot.y+Rt/C,P=lt.x-D/S,Q=lt.y+Xt/S,st=((P-z)*D-(Q-X)*Xt)/(Rt*D-Ht*Xt);ut=z+Rt*st-it.x,dt=X+Ht*st-it.y;let H=ut*ut+dt*dt;if(H<=2)return new gt(ut,dt);zt=Math.sqrt(H/2)}else{let C=!1;Rt>Number.EPSILON?Xt>Number.EPSILON&&(C=!0):Rt<-Number.EPSILON?Xt<-Number.EPSILON&&(C=!0):Math.sign(Ht)===Math.sign(D)&&(C=!0),C?(ut=-Ht,dt=Rt,zt=Math.sqrt(ue)):(ut=Rt,dt=Ht,zt=Math.sqrt(ue/2))}return new gt(ut/zt,dt/zt)}let Y=[];for(let it=0,ot=F.length,lt=ot-1,ut=it+1;it<ot;it++,lt++,ut++)lt===ot&&(lt=0),ut===ot&&(ut=0),Y[it]=at(F[it],F[lt],F[ut]);let $=[],et,Ct=Y.concat();for(let it=0,ot=L;it<ot;it++){let lt=U[it];et=[];for(let ut=0,dt=lt.length,zt=dt-1,Rt=ut+1;ut<dt;ut++,zt++,Rt++)zt===dt&&(zt=0),Rt===dt&&(Rt=0),et[ut]=at(lt[ut],lt[zt],lt[Rt]);$.push(et),Ct=Ct.concat(et)}let Mt;if(_===0)Mt=yr.triangulateShape(F,U);else{let it=[],ot=[];for(let lt=0;lt<_;lt++){let ut=lt/_,dt=d*Math.cos(ut*Math.PI/2),zt=g*Math.sin(ut*Math.PI/2)+b;for(let Rt=0,Ht=F.length;Rt<Ht;Rt++){let Xt=J(F[Rt],Y[Rt],zt);mt(Xt.x,Xt.y,-dt),ut===0&&it.push(Xt)}for(let Rt=0,Ht=L;Rt<Ht;Rt++){let Xt=U[Rt];et=$[Rt];let D=[];for(let ue=0,Kt=Xt.length;ue<Kt;ue++){let C=J(Xt[ue],et[ue],zt);mt(C.x,C.y,-dt),ut===0&&D.push(C)}ut===0&&ot.push(D)}}Mt=yr.triangulateShape(it,ot)}let ee=Mt.length,Zt=g+b;for(let it=0;it<q;it++){let ot=u?J(R[it],Ct[it],Zt):R[it];m?(w.copy(M.normals[0]).multiplyScalar(ot.x),E.copy(M.binormals[0]).multiplyScalar(ot.y),x.copy(y[0]).add(w).add(E),mt(x.x,x.y,x.z)):mt(ot.x,ot.y,0)}for(let it=1;it<=h;it++)for(let ot=0;ot<q;ot++){let lt=u?J(R[ot],Ct[ot],Zt):R[ot];m?(w.copy(M.normals[it]).multiplyScalar(lt.x),E.copy(M.binormals[it]).multiplyScalar(lt.y),x.copy(y[it]).add(w).add(E),mt(x.x,x.y,x.z)):mt(lt.x,lt.y,p/h*it)}for(let it=_-1;it>=0;it--){let ot=it/_,lt=d*Math.cos(ot*Math.PI/2),ut=g*Math.sin(ot*Math.PI/2)+b;for(let dt=0,zt=F.length;dt<zt;dt++){let Rt=J(F[dt],Y[dt],ut);mt(Rt.x,Rt.y,p+lt)}for(let dt=0,zt=U.length;dt<zt;dt++){let Rt=U[dt];et=$[dt];for(let Ht=0,Xt=Rt.length;Ht<Xt;Ht++){let D=J(Rt[Ht],et[Ht],ut);m?mt(D.x,D.y+y[h-1].y,y[h-1].x+lt):mt(D.x,D.y,p+lt)}}}ne(),K();function ne(){let it=s.length/3;if(u){let ot=0,lt=q*ot;for(let ut=0;ut<ee;ut++){let dt=Mt[ut];Bt(dt[2]+lt,dt[1]+lt,dt[0]+lt)}ot=h+_*2,lt=q*ot;for(let ut=0;ut<ee;ut++){let dt=Mt[ut];Bt(dt[0]+lt,dt[1]+lt,dt[2]+lt)}}else{for(let ot=0;ot<ee;ot++){let lt=Mt[ot];Bt(lt[2],lt[1],lt[0])}for(let ot=0;ot<ee;ot++){let lt=Mt[ot];Bt(lt[0]+q*h,lt[1]+q*h,lt[2]+q*h)}}i.addGroup(it,s.length/3-it,0)}function K(){let it=s.length/3,ot=0;tt(F,ot),ot+=F.length;for(let lt=0,ut=U.length;lt<ut;lt++){let dt=U[lt];tt(dt,ot),ot+=dt.length}i.addGroup(it,s.length/3-it,1)}function tt(it,ot){let lt=it.length;for(;--lt>=0;){let ut=lt,dt=lt-1;dt<0&&(dt=it.length-1);for(let zt=0,Rt=h+_*2;zt<Rt;zt++){let Ht=q*zt,Xt=q*(zt+1),D=ot+ut+Ht,ue=ot+dt+Ht,Kt=ot+dt+Xt,C=ot+ut+Xt;vt(D,ue,Kt,C)}}}function mt(it,ot,lt){l.push(it),l.push(ot),l.push(lt)}function Bt(it,ot,lt){Ot(it),Ot(ot),Ot(lt);let ut=s.length/3,dt=v.generateTopUV(i,s,ut-3,ut-2,ut-1);de(dt[0]),de(dt[1]),de(dt[2])}function vt(it,ot,lt,ut){Ot(it),Ot(ot),Ot(ut),Ot(ot),Ot(lt),Ot(ut);let dt=s.length/3,zt=v.generateSideWallUV(i,s,dt-6,dt-3,dt-2,dt-1);de(zt[0]),de(zt[1]),de(zt[3]),de(zt[1]),de(zt[2]),de(zt[3])}function Ot(it){s.push(l[it*3+0]),s.push(l[it*3+1]),s.push(l[it*3+2])}function de(it){a.push(it.x),a.push(it.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),n=this.parameters.shapes,i=this.parameters.options;return PR(n,i,t)}static fromJSON(t,n){let i=[];for(let a=0,r=t.shapes.length;a<r;a++){let o=n[t.shapes[a]];i.push(o)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new rd[s.type]().fromJSON(s)),new e(i,t.options)}},IR={generateTopUV:function(e,t,n,i,s){let a=t[n*3],r=t[n*3+1],o=t[i*3],l=t[i*3+1],c=t[s*3],h=t[s*3+1];return[new gt(a,r),new gt(o,l),new gt(c,h)]},generateSideWallUV:function(e,t,n,i,s,a){let r=t[n*3],o=t[n*3+1],l=t[n*3+2],c=t[i*3],h=t[i*3+1],p=t[i*3+2],u=t[s*3],d=t[s*3+1],g=t[s*3+2],b=t[a*3],_=t[a*3+1],f=t[a*3+2];return Math.abs(o-h)<Math.abs(r-c)?[new gt(r,1-l),new gt(c,1-p),new gt(u,1-g),new gt(b,1-f)]:[new gt(o,1-l),new gt(h,1-p),new gt(d,1-g),new gt(_,1-f)]}};jc=class e extends Gc{constructor(t=1,n=0){let i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],a=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,a,t,n),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:n}}static fromJSON(t){return new e(t.radius,t.detail)}},$c=class e extends Gc{constructor(t=1,n=0){let i=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(i,s,t,n),this.type="OctahedronGeometry",this.parameters={radius:t,detail:n}}static fromJSON(t){return new e(t.radius,t.detail)}},tu=class e extends xe{constructor(t=1,n=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:n,widthSegments:i,heightSegments:s};let a=t/2,r=n/2,o=Math.floor(i),l=Math.floor(s),c=o+1,h=l+1,p=t/o,u=n/l,d=[],g=[],b=[],_=[];for(let f=0;f<h;f++){let v=f*u-r;for(let y=0;y<c;y++){let m=y*p-a;g.push(m,-v,0),b.push(0,0,1),_.push(y/o),_.push(1-f/l)}}for(let f=0;f<l;f++)for(let v=0;v<o;v++){let y=v+c*f,m=v+c*(f+1),M=v+1+c*(f+1),E=v+1+c*f;d.push(y,m,E),d.push(m,M,E)}this.setIndex(d),this.setAttribute("position",new le(g,3)),this.setAttribute("normal",new le(b,3)),this.setAttribute("uv",new le(_,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},Tr=class e extends xe{constructor(t=1,n=32,i=16,s=0,a=Math.PI*2,r=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:n,heightSegments:i,phiStart:s,phiLength:a,thetaStart:r,thetaLength:o},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));let l=Math.min(r+o,Math.PI),c=0,h=[],p=new N,u=new N,d=[],g=[],b=[],_=[];for(let f=0;f<=i;f++){let v=[],y=f/i,m=r+y*o,M=t*Math.cos(m),E=Math.sqrt(t*t-M*M),w=0;f===0&&r===0?w=.5/n:f===i&&l===Math.PI&&(w=-.5/n);for(let x=0;x<=n;x++){let A=x/n,R=s+A*a;p.x=-E*Math.cos(R),p.y=M,p.z=E*Math.sin(R),g.push(p.x,p.y,p.z),u.copy(p).normalize(),b.push(u.x,u.y,u.z),_.push(A+w,1-y),v.push(c++)}h.push(v)}for(let f=0;f<i;f++)for(let v=0;v<n;v++){let y=h[f][v+1],m=h[f][v],M=h[f+1][v],E=h[f+1][v+1];(f!==0||r>0)&&d.push(y,m,E),(f!==i-1||l<Math.PI)&&d.push(m,M,E)}this.setIndex(d),this.setAttribute("position",new le(g,3)),this.setAttribute("normal",new le(b,3)),this.setAttribute("uv",new le(_,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},eu=class e extends xe{constructor(t=1,n=.4,i=12,s=48,a=Math.PI*2,r=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:n,radialSegments:i,tubularSegments:s,arc:a,thetaStart:r,thetaLength:o},i=Math.floor(i),s=Math.floor(s);let l=[],c=[],h=[],p=[],u=new N,d=new N,g=new N;for(let b=0;b<=i;b++){let _=r+b/i*o;for(let f=0;f<=s;f++){let v=f/s*a;d.x=(t+n*Math.cos(_))*Math.cos(v),d.y=(t+n*Math.cos(_))*Math.sin(v),d.z=n*Math.sin(_),c.push(d.x,d.y,d.z),u.x=t*Math.cos(v),u.y=t*Math.sin(v),g.subVectors(d,u).normalize(),h.push(g.x,g.y,g.z),p.push(f/s),p.push(b/i)}}for(let b=1;b<=i;b++)for(let _=1;_<=s;_++){let f=(s+1)*b+_-1,v=(s+1)*(b-1)+_-1,y=(s+1)*(b-1)+_,m=(s+1)*b+_;l.push(f,v,m),l.push(v,y,m)}this.setIndex(l),this.setAttribute("position",new le(c,3)),this.setAttribute("normal",new le(h,3)),this.setAttribute("uv",new le(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new e(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}},nu=class e extends xe{constructor(t=new Mr(new N(-1,-1,0),new N(-1,1,0),new N(1,1,0)),n=64,i=1,s=8,a=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:n,radius:i,radialSegments:s,closed:a};let r=t.computeFrenetFrames(n,a);this.tangents=r.tangents,this.normals=r.normals,this.binormals=r.binormals;let o=new N,l=new N,c=new gt,h=new N,p=[],u=[],d=[],g=[];b(),this.setIndex(g),this.setAttribute("position",new le(p,3)),this.setAttribute("normal",new le(u,3)),this.setAttribute("uv",new le(d,2));function b(){for(let y=0;y<n;y++)_(y);_(a===!1?n:0),v(),f()}function _(y){h=t.getPointAt(y/n,h);let m=r.normals[y],M=r.binormals[y];for(let E=0;E<=s;E++){let w=E/s*Math.PI*2,x=Math.sin(w),A=-Math.cos(w);l.x=A*m.x+x*M.x,l.y=A*m.y+x*M.y,l.z=A*m.z+x*M.z,l.normalize(),u.push(l.x,l.y,l.z),o.x=h.x+i*l.x,o.y=h.y+i*l.y,o.z=h.z+i*l.z,p.push(o.x,o.y,o.z)}}function f(){for(let y=1;y<=n;y++)for(let m=1;m<=s;m++){let M=(s+1)*(y-1)+(m-1),E=(s+1)*y+(m-1),w=(s+1)*y+m,x=(s+1)*(y-1)+m;g.push(M,E,x),g.push(E,w,x)}}function v(){for(let y=0;y<=n;y++)for(let m=0;m<=s;m++)c.x=y/n,c.y=m/s,d.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new e(new rd[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}},iu=class extends xe{constructor(t=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:t},t!==null){let n=[],i=new Set,s=new N,a=new N;if(t.index!==null){let r=t.attributes.position,o=t.index,l=t.groups;l.length===0&&(l=[{start:0,count:o.count,materialIndex:0}]);for(let c=0,h=l.length;c<h;++c){let p=l[c],u=p.start,d=p.count;for(let g=u,b=u+d;g<b;g+=3)for(let _=0;_<3;_++){let f=o.getX(g+_),v=o.getX(g+(_+1)%3);s.fromBufferAttribute(r,f),a.fromBufferAttribute(r,v),r1(s,a,i)===!0&&(n.push(s.x,s.y,s.z),n.push(a.x,a.y,a.z))}}}else{let r=t.attributes.position;for(let o=0,l=r.count/3;o<l;o++)for(let c=0;c<3;c++){let h=3*o+c,p=3*o+(c+1)%3;s.fromBufferAttribute(r,h),a.fromBufferAttribute(r,p),r1(s,a,i)===!0&&(n.push(s.x,s.y,s.z),n.push(a.x,a.y,a.z))}}this.setAttribute("position",new le(n,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}};tE={clone:Rr,merge:Tn},zR=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,FR=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,li=class extends Hs{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=zR,this.fragmentShader=FR,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Rr(t.uniforms),this.uniformsGroups=BR(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let n=super.toJSON(t);n.glslVersion=this.glslVersion,n.uniforms={};for(let s in this.uniforms){let r=this.uniforms[s].value;r&&r.isTexture?n.uniforms[s]={type:"t",value:r.toJSON(t).uuid}:r&&r.isColor?n.uniforms[s]={type:"c",value:r.getHex()}:r&&r.isVector2?n.uniforms[s]={type:"v2",value:r.toArray()}:r&&r.isVector3?n.uniforms[s]={type:"v3",value:r.toArray()}:r&&r.isVector4?n.uniforms[s]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?n.uniforms[s]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?n.uniforms[s]={type:"m4",value:r.toArray()}:n.uniforms[s]={value:r}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}fromJSON(t,n){if(super.fromJSON(t,n),t.uniforms!==void 0)for(let i in t.uniforms){let s=t.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=n[s.value]||null;break;case"c":this.uniforms[i].value=new ce().setHex(s.value);break;case"v2":this.uniforms[i].value=new gt().fromArray(s.value);break;case"v3":this.uniforms[i].value=new N().fromArray(s.value);break;case"v4":this.uniforms[i].value=new Ge().fromArray(s.value);break;case"m3":this.uniforms[i].value=new qt().fromArray(s.value);break;case"m4":this.uniforms[i].value=new Ie().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let i in t.extensions)this.extensions[i]=t.extensions[i];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},ld=class extends li{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},cd=class extends Hs{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=I1,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},ud=class extends Hs{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};La=class{constructor(t,n,i,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new n.constructor(i),this.sampleValues=n,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let n=this.parameterPositions,i=this._cachedIndex,s=n[i],a=n[i-1];t:{e:{let r;n:{i:if(!(t<s)){for(let o=i+2;;){if(s===void 0){if(t<a)break i;return i=n.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(a=s,s=n[++i],t<s)break e}r=n.length;break n}if(!(t>=a)){let o=n[1];t<o&&(i=2,a=o);for(let l=i-2;;){if(a===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=a,a=n[--i-1],t>=a)break e}r=i,i=0;break n}break t}for(;i<r;){let o=i+r>>>1;t<n[o]?r=o:i=o+1}if(s=n[i],a=n[i-1],a===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=n.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,a,s)}return this.interpolate_(i,a,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let n=this.resultBuffer,i=this.sampleValues,s=this.valueSize,a=t*s;for(let r=0;r!==s;++r)n[r]=i[a+r];return n}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},hd=class extends La{constructor(t,n,i,s){super(t,n,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:j0,endingEnd:j0}}intervalChanged_(t,n,i){let s=this.parameterPositions,a=t-2,r=t+1,o=s[a],l=s[r];if(o===void 0)switch(this.getSettings_().endingStart){case $0:a=t,o=2*n-i;break;case t_:a=s.length-2,o=n+s[a]-s[a+1];break;default:a=t,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case $0:r=t,l=2*i-n;break;case t_:r=1,l=i+s[1]-s[0];break;default:r=t-1,l=n}let c=(i-n)*.5,h=this.valueSize;this._weightPrev=c/(n-o),this._weightNext=c/(l-i),this._offsetPrev=a*h,this._offsetNext=r*h}interpolate_(t,n,i,s){let a=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,p=this._offsetNext,u=this._weightPrev,d=this._weightNext,g=(i-n)/(s-n),b=g*g,_=b*g,f=-u*_+2*u*b-u*g,v=(1+u)*_+(-1.5-2*u)*b+(-.5+u)*g+1,y=(-1-d)*_+(1.5+d)*b+.5*g,m=d*_-d*b;for(let M=0;M!==o;++M)a[M]=f*r[h+M]+v*r[c+M]+y*r[l+M]+m*r[p+M];return a}},fd=class extends La{constructor(t,n,i,s){super(t,n,i,s)}interpolate_(t,n,i,s){let a=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=(i-n)/(s-n),p=1-h;for(let u=0;u!==o;++u)a[u]=r[c+u]*p+r[l+u]*h;return a}},dd=class extends La{constructor(t,n,i,s){super(t,n,i,s)}interpolate_(t){return this.copySampleValue_(t-1)}},pd=class extends La{interpolate_(t,n,i,s){let a=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this.inTangents,p=this.outTangents;if(!h||!p){let g=(i-n)/(s-n),b=1-g;for(let _=0;_!==o;++_)a[_]=r[c+_]*b+r[l+_]*g;return a}let u=o*2,d=t-1;for(let g=0;g!==o;++g){let b=r[c+g],_=r[l+g],f=d*u+g*2,v=p[f],y=p[f+1],m=t*u+g*2,M=h[m],E=h[m+1],w=VR(i,n,v,M,s);a[g]=eE(w,b,y,E,_)}return a}};ci=class{constructor(t,n,i,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(n===void 0||n.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=ko(n,this.TimeBufferType),this.values=ko(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let n=t.constructor,i;if(n.toJSON!==this.toJSON)i=n.toJSON(t);else{i={name:t.name,times:ko(t.times,Array),values:ko(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(i.interpolation=s),K0(t.settings)&&(i.settings={inTangents:ko(t.settings.inTangents,Array),outTangents:ko(t.settings.outTangents,Array)})}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new dd(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new fd(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new hd(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let n=new pd(this.times,this.values,this.getValueSize(),t);return this.settings&&(n.inTangents=this.settings.inTangents,n.outTangents=this.settings.outTangents),n}setInterpolation(t){let n;switch(t){case Rc:n=this.InterpolantFactoryMethodDiscrete;break;case Jf:n=this.InterpolantFactoryMethodLinear;break;case zf:n=this.InterpolantFactoryMethodSmooth;break;case Q0:n=this.InterpolantFactoryMethodBezier;break}if(n===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Ft("KeyframeTrack:",i),this}return this.createInterpolant=n,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Rc;case this.InterpolantFactoryMethodLinear:return Jf;case this.InterpolantFactoryMethodSmooth:return zf;case this.InterpolantFactoryMethodBezier:return Q0}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let n=this.times;for(let i=0,s=n.length;i!==s;++i)n[i]+=t}return this}scale(t){if(t!==1){let n=this.times;for(let i=0,s=n.length;i!==s;++i)n[i]*=t;K0(this.settings)&&(l1(this.settings.inTangents,t),l1(this.settings.outTangents,t))}return this}trim(t,n){let i=this.times,s=i.length,a=0,r=s-1;for(;a!==s&&i[a]<t;)++a;for(;r!==-1&&i[r]>n;)--r;if(++r,a!==0||r!==s){a>=r&&(r=Math.max(r,1),a=r-1);let o=this.getValueSize();this.times=i.slice(a,r),this.values=this.values.slice(a*o,r*o)}return this}validate(){let t=!0,n=this.getValueSize();n-Math.floor(n)!==0&&(Vt("KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,s=this.values,a=i.length;a===0&&(Vt("KeyframeTrack: Track is empty.",this),t=!1);let r=null;for(let o=0;o!==a;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){Vt("KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(r!==null&&r>l){Vt("KeyframeTrack: Out of order keys.",this,o,l,r),t=!1;break}r=l}if(s!==void 0&&NC(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){Vt("KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),n=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===zf,a=t.length-1,r=1;for(let o=1;o<a;++o){let l=!1,c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(s)l=!0;else{let p=o*i,u=p-i,d=p+i;for(let g=0;g!==i;++g){let b=n[p+g];if(b!==n[u+g]||b!==n[d+g]){l=!0;break}}}if(l){if(o!==r){t[r]=t[o];let p=o*i,u=r*i;for(let d=0;d!==i;++d)n[u+d]=n[p+d]}++r}}if(a>0){t[r]=t[a];for(let o=a*i,l=r*i,c=0;c!==i;++c)n[l+c]=n[o+c];++r}return r!==t.length?(this.times=t.slice(0,r),this.values=n.slice(0,r*i)):(this.times=t,this.values=n),this}clone(){let t=this.times.slice(),n=this.values.slice(),i=this.constructor,s=new i(this.name,t,n);return s.createInterpolant=this.createInterpolant,K0(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};ci.prototype.ValueTypeName="";ci.prototype.TimeBufferType=Float32Array;ci.prototype.ValueBufferType=Float32Array;ci.prototype.DefaultInterpolation=Jf;Oa=class extends ci{constructor(t,n,i){super(t,n,i)}};Oa.prototype.ValueTypeName="bool";Oa.prototype.ValueBufferType=Array;Oa.prototype.DefaultInterpolation=Rc;Oa.prototype.InterpolantFactoryMethodLinear=void 0;Oa.prototype.InterpolantFactoryMethodSmooth=void 0;md=class extends ci{constructor(t,n,i,s){super(t,n,i,s)}};md.prototype.ValueTypeName="color";gd=class extends ci{constructor(t,n,i,s){super(t,n,i,s)}};gd.prototype.ValueTypeName="number";_d=class extends La{constructor(t,n,i,s){super(t,n,i,s)}interpolate_(t,n,i,s){let a=this.resultBuffer,r=this.sampleValues,o=this.valueSize,l=(i-n)/(s-n),c=t*o;for(let h=c+o;c!==h;c+=4)Ei.slerpFlat(a,0,r,c-o,r,c,l);return a}},su=class extends ci{constructor(t,n,i,s){super(t,n,i,s)}InterpolantFactoryMethodLinear(t){return new _d(this.times,this.values,this.getValueSize(),t)}};su.prototype.ValueTypeName="quaternion";su.prototype.InterpolantFactoryMethodSmooth=void 0;Ia=class extends ci{constructor(t,n,i){super(t,n,i)}};Ia.prototype.ValueTypeName="string";Ia.prototype.ValueBufferType=Array;Ia.prototype.DefaultInterpolation=Rc;Ia.prototype.InterpolantFactoryMethodLinear=void 0;Ia.prototype.InterpolantFactoryMethodSmooth=void 0;vd=class extends ci{constructor(t,n,i,s){super(t,n,i,s)}};vd.prototype.ValueTypeName="vector";yd=class{constructor(t,n,i){let s=this,a=!1,r=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=n,this.onError=i,this._abortController=null,this.itemStart=function(h){o++,a===!1&&s.onStart!==void 0&&s.onStart(h,r,o),a=!0},this.itemEnd=function(h){r++,s.onProgress!==void 0&&s.onProgress(h,r,o),r===o&&(a=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,p){return c.push(h,p),this},this.removeHandler=function(h){let p=c.indexOf(h);return p!==-1&&c.splice(p,2),this},this.getHandler=function(h){for(let p=0,u=c.length;p<u;p+=2){let d=c[p],g=c[p+1];if(d.global&&(d.lastIndex=0),d.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},nE=new yd,xd=class{constructor(t){this.manager=t!==void 0?t:nE,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,n){let i=this;return new Promise(function(s,a){i.load(t,s,n,a)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}};xd.DEFAULT_MATERIAL_NAME="__DEFAULT";Pf=new N,Bf=new Ei,os=new N,au=class extends Xn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ie,this.projectionMatrix=new Ie,this.projectionMatrixInverse=new Ie,this.coordinateSystem=zi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,n){return super.copy(t,n),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Pf,Bf,os),os.x===1&&os.y===1&&os.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Pf,Bf,os.set(1,1,1)).invert()}updateWorldMatrix(t,n,i=!1){super.updateWorldMatrix(t,n,i),this.matrixWorld.decompose(Pf,Bf,os),os.x===1&&os.y===1&&os.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Pf,Bf,os.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Na=new N,c1=new gt,u1=new gt,En=class extends au{constructor(t=50,n=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let n=.5*this.getFilmHeight()/t;this.fov=Qo*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Yo*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Qo*2*Math.atan(Math.tan(Yo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,n,i){Na.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Na.x,Na.y).multiplyScalar(-t/Na.z),Na.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Na.x,Na.y).multiplyScalar(-t/Na.z)}getViewSize(t,n){return this.getViewBounds(t,c1,u1),n.subVectors(u1,c1)}setViewOffset(t,n,i,s,a,r){this.aspect=t/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=s,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,n=t*Math.tan(Yo*.5*this.fov)/this.zoom,i=2*n,s=this.aspect*i,a=-.5*s,r=this.view;if(this.view!==null&&this.view.enabled){let l=r.fullWidth,c=r.fullHeight;a+=r.offsetX*s/l,n-=r.offsetY*i/c,s*=r.width/l,i*=r.height/c}let o=this.filmOffset;o!==0&&(a+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+s,n,n-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let n=super.toJSON(t);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}},ru=class extends au{constructor(t=-1,n=1,i=1,s=-1,a=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=n,this.top=i,this.bottom=s,this.near=a,this.far=r,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,n,i,s,a,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=s,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,a=i-t,r=i+t,o=s+n,l=s-n;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=c*this.view.offsetX,r=a+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(a,r,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let n=super.toJSON(t);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}},Xo=-90,Wo=1,Sd=class extends Xn{constructor(t,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new En(Xo,Wo,t,n);s.layers=this.layers,this.add(s);let a=new En(Xo,Wo,t,n);a.layers=this.layers,this.add(a);let r=new En(Xo,Wo,t,n);r.layers=this.layers,this.add(r);let o=new En(Xo,Wo,t,n);o.layers=this.layers,this.add(o);let l=new En(Xo,Wo,t,n);l.layers=this.layers,this.add(l);let c=new En(Xo,Wo,t,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,n=this.children.concat(),[i,s,a,r,o,l]=n;for(let c of n)this.remove(c);if(t===zi)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Uc)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of n)this.add(c),c.updateMatrixWorld()}update(t,n){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[a,r,o,l,c,h]=this.children,p=t.getRenderTarget(),u=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let b=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let _=!1;t.isWebGLRenderer===!0?_=t.state.buffers.depth.getReversed():_=t.reversedDepthBuffer,t.setRenderTarget(i,0,s),_&&t.autoClear===!1&&t.clearDepth(),t.render(n,a),t.setRenderTarget(i,1,s),_&&t.autoClear===!1&&t.clearDepth(),t.render(n,r),t.setRenderTarget(i,2,s),_&&t.autoClear===!1&&t.clearDepth(),t.render(n,o),t.setRenderTarget(i,3,s),_&&t.autoClear===!1&&t.clearDepth(),t.render(n,l),t.setRenderTarget(i,4,s),_&&t.autoClear===!1&&t.clearDepth(),t.render(n,c),i.texture.generateMipmaps=b,t.setRenderTarget(i,5,s),_&&t.autoClear===!1&&t.clearDepth(),t.render(n,h),t.setRenderTarget(p,u,d),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},Md=class extends En{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}},I_="\\[\\]\\.:\\/",GR=new RegExp("["+I_+"]","g"),P_="[^"+I_+"]",kR="[^"+I_.replace("\\.","")+"]",XR=/((?:WC+[\/:])*)/.source.replace("WC",P_),WR=/(WCOD+)?/.source.replace("WCOD",kR),qR=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",P_),YR=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",P_),ZR=new RegExp("^"+XR+WR+qR+YR+"$"),JR=["material","materials","bones","map"],a_=class{constructor(t,n,i){let s=i||Be.parseTrackName(n);this._targetGroup=t,this._bindings=t.subscribe_(n,s)}getValue(t,n){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(t,n)}setValue(t,n){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,a=i.length;s!==a;++s)i[s].setValue(t,n)}bind(){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=t.length;n!==i;++n)t[n].bind()}unbind(){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=t.length;n!==i;++n)t[n].unbind()}},Be=class e{constructor(t,n,i){this.path=n,this.parsedPath=i||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,i){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,i):new e(t,n,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(GR,"")}static parseTrackName(t){let n=ZR.exec(t);if(n===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:n[2],objectName:n[3],objectIndex:n[4],propertyName:n[5],propertyIndex:n[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let a=i.nodeName.substring(s+1);JR.indexOf(a)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=a)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,n){if(n===void 0||n===""||n==="."||n===-1||n===t.name||n===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(n);if(i!==void 0)return i}if(t.children){let i=function(a){for(let r=0;r<a.length;r++){let o=a[r];if(o.name===n||o.uuid===n)return o;let l=i(o.children);if(l)return l}return null},s=i(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,n){t[n]=this.targetObject[this.propertyName]}_getValue_array(t,n){let i=this.resolvedProperty;for(let s=0,a=i.length;s!==a;++s)t[n++]=i[s]}_getValue_arrayElement(t,n){t[n]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,n){this.resolvedProperty.toArray(t,n)}_setValue_direct(t,n){this.targetObject[this.propertyName]=t[n]}_setValue_direct_setNeedsUpdate(t,n){this.targetObject[this.propertyName]=t[n],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,n){this.targetObject[this.propertyName]=t[n],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,n){let i=this.resolvedProperty;for(let s=0,a=i.length;s!==a;++s)i[s]=t[n++]}_setValue_array_setNeedsUpdate(t,n){let i=this.resolvedProperty;for(let s=0,a=i.length;s!==a;++s)i[s]=t[n++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,n){let i=this.resolvedProperty;for(let s=0,a=i.length;s!==a;++s)i[s]=t[n++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,n){this.resolvedProperty[this.propertyIndex]=t[n]}_setValue_arrayElement_setNeedsUpdate(t,n){this.resolvedProperty[this.propertyIndex]=t[n],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,n){this.resolvedProperty[this.propertyIndex]=t[n],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,n){this.resolvedProperty.fromArray(t,n)}_setValue_fromArray_setNeedsUpdate(t,n){this.resolvedProperty.fromArray(t,n),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,n){this.resolvedProperty.fromArray(t,n),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,n){this.bind(),this.getValue(t,n)}_setValue_unbound(t,n){this.bind(),this.setValue(t,n)}bind(){let t=this.node,n=this.parsedPath,i=n.objectName,s=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Ft("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=n.objectIndex;switch(i){case"materials":if(!t.material){Vt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Vt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Vt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Vt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Vt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){Vt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(c!==void 0){if(t[c]===void 0){Vt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let r=t[s];if(r===void 0){let c=n.nodeName;Vt("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(a!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Vt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Vt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}l=this.BindingType.ArrayElement,this.resolvedProperty=r,this.propertyIndex=a}else r.fromArray!==void 0&&r.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=r):Array.isArray(r)?(l=this.BindingType.EntireArray,this.resolvedProperty=r):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Be.Composite=a_;Be.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Be.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Be.prototype.GetterByBindingType=[Be.prototype._getValue_direct,Be.prototype._getValue_array,Be.prototype._getValue_arrayElement,Be.prototype._getValue_toArray];Be.prototype.SetterByBindingTypeAndVersioning=[[Be.prototype._setValue_direct,Be.prototype._setValue_direct_setNeedsUpdate,Be.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Be.prototype._setValue_array,Be.prototype._setValue_array_setNeedsUpdate,Be.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Be.prototype._setValue_arrayElement,Be.prototype._setValue_arrayElement_setNeedsUpdate,Be.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Be.prototype._setValue_fromArray,Be.prototype._setValue_fromArray_setNeedsUpdate,Be.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];$U=new Float32Array(1),r_=class e{static{e.prototype.isMatrix2=!0}constructor(t,n,i,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,n,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,n=0){for(let i=0;i<4;i++)this.elements[i]=t[i+n];return this}set(t,n,i,s){let a=this.elements;return a[0]=t,a[2]=n,a[1]=i,a[3]=s,this}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:bd}}));typeof window<"u"&&(window.__THREE__?Ft("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=bd)});function EE(){let e=null,t=!1,n=null,i=null;function s(a,r){i=e.requestAnimationFrame(s),n(a,r)}return{start:function(){t!==!0&&n!==null&&e!==null&&(i=e.requestAnimationFrame(s),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(a){n=a},setContext:function(a){e=a}}}function QR(e){let t=new WeakMap;function n(o,l){let c=o.array,h=o.usage,p=c.byteLength,u=e.createBuffer();e.bindBuffer(l,u),e.bufferData(l,c,h),o.onUploadCallback();let d;if(c instanceof Float32Array)d=e.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)d=e.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?d=e.HALF_FLOAT:d=e.UNSIGNED_SHORT;else if(c instanceof Int16Array)d=e.SHORT;else if(c instanceof Uint32Array)d=e.UNSIGNED_INT;else if(c instanceof Int32Array)d=e.INT;else if(c instanceof Int8Array)d=e.BYTE;else if(c instanceof Uint8Array)d=e.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)d=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:d,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:p}}function i(o,l,c){let h=l.array,p=l.updateRanges;if(e.bindBuffer(c,o),p.length===0)e.bufferSubData(c,0,h);else{p.sort((d,g)=>d.start-g.start);let u=0;for(let d=1;d<p.length;d++){let g=p[u],b=p[d];b.start<=g.start+g.count+1?g.count=Math.max(g.count,b.start+b.count-g.start):(++u,p[u]=b)}p.length=u+1;for(let d=0,g=p.length;d<g;d++){let b=p[d];e.bufferSubData(c,b.start*h.BYTES_PER_ELEMENT,h,b.start,b.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function a(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(e.deleteBuffer(l.buffer),t.delete(o))}function r(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,n(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:a,update:r}}function LN(e,t,n,i,s,a){let r=new ce(0),o=s===!0?0:1,l,c,h=null,p=0,u=null;function d(v){let y=v.isScene===!0?v.background:null;if(y&&y.isTexture){let m=v.backgroundBlurriness>0;y=t.get(y,m)}return y}function g(v){let y=!1,m=d(v);m===null?_(r,o):m&&m.isColor&&(_(m,1),y=!0);let M=e.xr.getEnvironmentBlendMode();M==="additive"?n.buffers.color.setClear(0,0,0,1,a):M==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function b(v,y){let m=d(y);m&&(m.isCubeTexture||m.mapping===lu)?(c===void 0&&(c=new Wn(new Ti(1,1,1),new li({name:"BackgroundCubeMaterial",uniforms:Rr(gs.backgroundCube.uniforms),vertexShader:gs.backgroundCube.vertexShader,fragmentShader:gs.backgroundCube.fragmentShader,side:Ln,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(M,E,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=m,c.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(UN.makeRotationFromEuler(y.backgroundRotation)).transpose(),m.isCubeTexture&&m.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(TE),c.material.toneMapped=oe.getTransfer(m.colorSpace)!==ye,(h!==m||p!==m.version||u!==e.toneMapping)&&(c.material.needsUpdate=!0,h=m,p=m.version,u=e.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null)):m&&m.isTexture&&(l===void 0&&(l=new Wn(new tu(2,2),new li({name:"BackgroundMaterial",uniforms:Rr(gs.background.uniforms),vertexShader:gs.background.vertexShader,fragmentShader:gs.background.fragmentShader,side:Pa,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=m,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.toneMapped=oe.getTransfer(m.colorSpace)!==ye,m.matrixAutoUpdate===!0&&m.updateMatrix(),l.material.uniforms.uvTransform.value.copy(m.matrix),(h!==m||p!==m.version||u!==e.toneMapping)&&(l.material.needsUpdate=!0,h=m,p=m.version,u=e.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function _(v,y){v.getRGB(hp,O_(e)),n.buffers.color.setClear(hp.r,hp.g,hp.b,y,a)}function f(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return r},setClearColor:function(v,y=1){r.set(v),o=y,_(r,o)},getClearAlpha:function(){return o},setClearAlpha:function(v){o=v,_(r,o)},render:g,addToRenderList:b,dispose:f}}function ON(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},s=u(null),a=s,r=!1;function o(U,B,V,L,F){let J=!1,q=p(U,L,V,B);a!==q&&(a=q,c(a.object)),J=d(U,L,V,F),J&&g(U,L,V,F),F!==null&&t.update(F,e.ELEMENT_ARRAY_BUFFER),(J||r)&&(r=!1,m(U,B,V,L),F!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(F).buffer))}function l(){return e.createVertexArray()}function c(U){return e.bindVertexArray(U)}function h(U){return e.deleteVertexArray(U)}function p(U,B,V,L){let F=L.wireframe===!0,J=i[B.id];J===void 0&&(J={},i[B.id]=J);let q=U.isInstancedMesh===!0?U.id:0,at=J[q];at===void 0&&(at={},J[q]=at);let Y=at[V.id];Y===void 0&&(Y={},at[V.id]=Y);let $=Y[F];return $===void 0&&($=u(l()),Y[F]=$),$}function u(U){let B=[],V=[],L=[];for(let F=0;F<n;F++)B[F]=0,V[F]=0,L[F]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:V,attributeDivisors:L,object:U,attributes:{},index:null}}function d(U,B,V,L){let F=a.attributes,J=B.attributes,q=0,at=V.getAttributes();for(let Y in at)if(at[Y].location>=0){let et=F[Y],Ct=J[Y];if(Ct===void 0&&(Y==="instanceMatrix"&&U.instanceMatrix&&(Ct=U.instanceMatrix),Y==="instanceColor"&&U.instanceColor&&(Ct=U.instanceColor)),et===void 0||et.attribute!==Ct||Ct&&et.data!==Ct.data)return!0;q++}return a.attributesNum!==q||a.index!==L}function g(U,B,V,L){let F={},J=B.attributes,q=0,at=V.getAttributes();for(let Y in at)if(at[Y].location>=0){let et=J[Y];et===void 0&&(Y==="instanceMatrix"&&U.instanceMatrix&&(et=U.instanceMatrix),Y==="instanceColor"&&U.instanceColor&&(et=U.instanceColor));let Ct={};Ct.attribute=et,et&&et.data&&(Ct.data=et.data),F[Y]=Ct,q++}a.attributes=F,a.attributesNum=q,a.index=L}function b(){let U=a.newAttributes;for(let B=0,V=U.length;B<V;B++)U[B]=0}function _(U){f(U,0)}function f(U,B){let V=a.newAttributes,L=a.enabledAttributes,F=a.attributeDivisors;V[U]=1,L[U]===0&&(e.enableVertexAttribArray(U),L[U]=1),F[U]!==B&&(e.vertexAttribDivisor(U,B),F[U]=B)}function v(){let U=a.newAttributes,B=a.enabledAttributes;for(let V=0,L=B.length;V<L;V++)B[V]!==U[V]&&(e.disableVertexAttribArray(V),B[V]=0)}function y(U,B,V,L,F,J,q){q===!0?e.vertexAttribIPointer(U,B,V,F,J):e.vertexAttribPointer(U,B,V,L,F,J)}function m(U,B,V,L){b();let F=L.attributes,J=V.getAttributes(),q=B.defaultAttributeValues;for(let at in J){let Y=J[at];if(Y.location>=0){let $=F[at];if($===void 0&&(at==="instanceMatrix"&&U.instanceMatrix&&($=U.instanceMatrix),at==="instanceColor"&&U.instanceColor&&($=U.instanceColor)),$!==void 0){let et=$.normalized,Ct=$.itemSize,Mt=t.get($);if(Mt===void 0)continue;let ee=Mt.buffer,Zt=Mt.type,ne=Mt.bytesPerElement,K=Zt===e.INT||Zt===e.UNSIGNED_INT||$.gpuType===wd;if($.isInterleavedBufferAttribute){let tt=$.data,mt=tt.stride,Bt=$.offset;if(tt.isInstancedInterleavedBuffer){for(let vt=0;vt<Y.locationSize;vt++)f(Y.location+vt,tt.meshPerAttribute);U.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let vt=0;vt<Y.locationSize;vt++)_(Y.location+vt);e.bindBuffer(e.ARRAY_BUFFER,ee);for(let vt=0;vt<Y.locationSize;vt++)y(Y.location+vt,Ct/Y.locationSize,Zt,et,mt*ne,(Bt+Ct/Y.locationSize*vt)*ne,K)}else{if($.isInstancedBufferAttribute){for(let tt=0;tt<Y.locationSize;tt++)f(Y.location+tt,$.meshPerAttribute);U.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let tt=0;tt<Y.locationSize;tt++)_(Y.location+tt);e.bindBuffer(e.ARRAY_BUFFER,ee);for(let tt=0;tt<Y.locationSize;tt++)y(Y.location+tt,Ct/Y.locationSize,Zt,et,Ct*ne,Ct/Y.locationSize*tt*ne,K)}}else if(q!==void 0){let et=q[at];if(et!==void 0)switch(et.length){case 2:e.vertexAttrib2fv(Y.location,et);break;case 3:e.vertexAttrib3fv(Y.location,et);break;case 4:e.vertexAttrib4fv(Y.location,et);break;default:e.vertexAttrib1fv(Y.location,et)}}}}v()}function M(){A();for(let U in i){let B=i[U];for(let V in B){let L=B[V];for(let F in L){let J=L[F];for(let q in J)h(J[q].object),delete J[q];delete L[F]}}delete i[U]}}function E(U){if(i[U.id]===void 0)return;let B=i[U.id];for(let V in B){let L=B[V];for(let F in L){let J=L[F];for(let q in J)h(J[q].object),delete J[q];delete L[F]}}delete i[U.id]}function w(U){for(let B in i){let V=i[B];for(let L in V){let F=V[L];if(F[U.id]===void 0)continue;let J=F[U.id];for(let q in J)h(J[q].object),delete J[q];delete F[U.id]}}}function x(U){for(let B in i){let V=i[B],L=U.isInstancedMesh===!0?U.id:0,F=V[L];if(F!==void 0){for(let J in F){let q=F[J];for(let at in q)h(q[at].object),delete q[at];delete F[J]}delete V[L],Object.keys(V).length===0&&delete i[B]}}}function A(){R(),r=!0,a!==s&&(a=s,c(a.object))}function R(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:A,resetDefaultState:R,dispose:M,releaseStatesOfGeometry:E,releaseStatesOfObject:x,releaseStatesOfProgram:w,initAttributes:b,enableAttribute:_,disableUnusedAttributes:v}}function IN(e,t,n){let i;function s(l){i=l}function a(l,c){e.drawArrays(i,l,c),n.update(c,i,1)}function r(l,c,h){h!==0&&(e.drawArraysInstanced(i,l,c,h),n.update(c,i,h))}function o(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,h);let u=0;for(let d=0;d<h;d++)u+=c[d];n.update(u,i,1)}this.setMode=s,this.render=a,this.renderInstances=r,this.renderMultiDraw=o}function PN(e,t,n,i){let s;function a(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let w=t.get("EXT_texture_filter_anisotropic");s=e.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function r(w){return!(w!==Ai&&i.convert(w)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(w){let x=w===Gi&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(w!==ui&&w!==Vi&&!x&&i.convert(w)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function l(w){if(w==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp",h=l(c);h!==c&&(Ft("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let p=n.logarithmicDepthBuffer===!0,u=n.reversedDepthBuffer===!0&&t.has("EXT_clip_control");n.reversedDepthBuffer===!0&&u===!1&&Ft("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let d=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),g=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),b=e.getParameter(e.MAX_TEXTURE_SIZE),_=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),f=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),m=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),M=e.getParameter(e.MAX_SAMPLES),E=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:l,textureFormatReadable:r,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:p,reversedDepthBuffer:u,maxTextures:d,maxVertexTextures:g,maxTextureSize:b,maxCubemapSize:_,maxAttributes:f,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:m,maxSamples:M,samples:E}}function BN(e){let t=this,n=null,i=0,s=!1,a=!1,r=new Bi,o=new qt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(p,u){let d=p.length!==0||u||i!==0||s;return s=u,i=p.length,d},this.beginShadows=function(){a=!0,h(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(p,u){n=h(p,u,0)},this.setState=function(p,u,d){let g=p.clippingPlanes,b=p.clipIntersection,_=p.clipShadows,f=e.get(p);if(!s||g===null||g.length===0||a&&!_)a?h(null):c();else{let v=a?0:i,y=v*4,m=f.clippingState||null;l.value=m,m=h(g,u,y,d);for(let M=0;M!==y;++M)m[M]=n[M];f.clippingState=m,this.numIntersection=b?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(p,u,d,g){let b=p!==null?p.length:0,_=null;if(b!==0){if(_=l.value,g!==!0||_===null){let f=d+b*4,v=u.matrixWorldInverse;o.getNormalMatrix(v),(_===null||_.length<f)&&(_=new Float32Array(f));for(let y=0,m=d;y!==b;++y,m+=4)r.copy(p[y]).applyMatrix4(v,o),r.normal.toArray(_,m),_[m+3]=r.constant}l.value=_,l.needsUpdate=!0}return t.numPlanes=b,t.numIntersection=0,_}}function GN(e){let t=[],n=[],i=e,s=e-pl+1+zN;for(let a=0;a<s;a++){let r=Math.pow(2,i);t.push(r);let o=1/(r-2),l=-o,c=1+o,h=[l,l,c,l,c,c,l,l,c,c,l,c],p=6,u=6,d=3,g=new Float32Array(d*u*p),b=new Float32Array(d*u*p);for(let f=0;f<p;f++){let v=f%3*2/3-1,y=f>2?0:-1,m=[v,y,0,v+2/3,y,0,v+2/3,y+1,0,v,y,0,v+2/3,y+1,0,v,y+1,0];g.set(m,d*u*f);for(let M=0;M<u;M++){let E=h[M*2]*2-1,w=h[M*2+1]*2-1;f===0?Nr.set(1,w,E):f===1?Nr.set(-E,1,-w):f===2?Nr.set(-E,w,1):f===3?Nr.set(-1,w,-E):f===4?Nr.set(-E,-1,w):Nr.set(E,w,-1),Nr.toArray(b,(f*u+M)*d)}}let _=new xe;_.setAttribute("position",new Vn(g,d)),_.setAttribute("outputDirection",new Vn(b,d)),n.push(new Wn(_,null)),i>pl&&i--}return{lodMeshes:n,sizeLods:t}}function sE(e,t,n){let i=new kn(e,t,n);return i.texture.mapping=lu,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function dl(e,t,n,i,s){e.viewport.set(t,n,i,s),e.scissor.set(t,n,i,s)}function kN(e,t,n){return new li({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:HN,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:gp(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:ps,depthTest:!1,depthWrite:!1})}function XN(e,t,n){return new li({name:"SphericalGaussianBlur",defines:{SAMPLES:FN,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:gp(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:ps,depthTest:!1,depthWrite:!1})}function aE(){return new li({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:gp(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ps,depthTest:!1,depthWrite:!1})}function rE(){return new li({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:gp(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ps,depthTest:!1,depthWrite:!1})}function gp(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}function WN(e){let t=new WeakMap,n=new WeakMap,i=null;function s(u,d=!1){return u==null?null:d?r(u):a(u)}function a(u){if(u&&u.isTexture){let d=u.mapping;if(d===Ed||d===Td)if(t.has(u)){let g=t.get(u).texture;return o(g,u.mapping)}else{let g=u.image;if(g&&g.height>0){let b=new pp(g.height);return b.fromEquirectangularTexture(e,u),t.set(u,b),u.addEventListener("dispose",c),o(b.texture,u.mapping)}else return null}}return u}function r(u){if(u&&u.isTexture){let d=u.mapping,g=d===Ed||d===Td,b=d===Ba||d===wr;if(g||b){let _=n.get(u),f=_!==void 0?_.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==f)return i===null&&(i=new dp(e)),_=g?i.fromEquirectangular(u,_):i.fromCubemap(u,_),_.texture.pmremVersion=u.pmremVersion,n.set(u,_),_.texture;if(_!==void 0)return _.texture;{let v=u.image;return g&&v&&v.height>0||b&&v&&l(v)?(i===null&&(i=new dp(e)),_=g?i.fromEquirectangular(u):i.fromCubemap(u),_.texture.pmremVersion=u.pmremVersion,n.set(u,_),u.addEventListener("dispose",h),_.texture):null}}}return u}function o(u,d){return d===Ed?u.mapping=Ba:d===Td&&(u.mapping=wr),u}function l(u){let d=0,g=6;for(let b=0;b<g;b++)u[b]!==void 0&&d++;return d===g}function c(u){let d=u.target;d.removeEventListener("dispose",c);let g=t.get(d);g!==void 0&&(t.delete(d),g.dispose())}function h(u){let d=u.target;d.removeEventListener("dispose",h);let g=n.get(d);g!==void 0&&(n.delete(d),g.dispose())}function p(){t=new WeakMap,n=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:p}}function qN(e){let t={};function n(i){if(t[i]!==void 0)return t[i];let s=e.getExtension(i);return t[i]=s,s}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){let s=n(i);return s===null&&xr("WebGLRenderer: "+i+" extension not supported."),s}}}function YN(e,t,n,i){let s={},a=new WeakMap;function r(p){let u=p.target;u.index!==null&&t.remove(u.index);for(let g in u.attributes)t.remove(u.attributes[g]);u.removeEventListener("dispose",r),delete s[u.id];let d=a.get(u);d&&(t.remove(d),a.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,n.memory.geometries--}function o(p,u){return s[u.id]===!0||(u.addEventListener("dispose",r),s[u.id]=!0,n.memory.geometries++),u}function l(p){let u=p.attributes;for(let d in u)t.update(u[d],e.ARRAY_BUFFER)}function c(p){let u=[],d=p.index,g=p.attributes.position,b=0;if(g===void 0)return;if(d!==null){let v=d.array;b=d.version;for(let y=0,m=v.length;y<m;y+=3){let M=v[y+0],E=v[y+1],w=v[y+2];u.push(M,E,E,w,w,M)}}else{let v=g.array;b=g.version;for(let y=0,m=v.length/3-1;y<m;y+=3){let M=y+0,E=y+1,w=y+2;u.push(M,E,E,w,w,M)}}let _=new(g.count>=65535?zc:Bc)(u,1);_.version=b;let f=a.get(p);f&&t.remove(f),a.set(p,_)}function h(p){let u=a.get(p);if(u){let d=p.index;d!==null&&u.version<d.version&&c(p)}else c(p);return a.get(p)}return{get:o,update:l,getWireframeAttribute:h}}function ZN(e,t,n){let i;function s(p){i=p}let a,r;function o(p){a=p.type,r=p.bytesPerElement}function l(p,u){e.drawElements(i,u,a,p*r),n.update(u,i,1)}function c(p,u,d){d!==0&&(e.drawElementsInstanced(i,u,a,p*r,d),n.update(u,i,d))}function h(p,u,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,a,p,0,d);let b=0;for(let _=0;_<d;_++)b+=u[_];n.update(b,i,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function JN(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(a,r,o){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=o*(a/3);break;case e.LINES:n.lines+=o*(a/2);break;case e.LINE_STRIP:n.lines+=o*(a-1);break;case e.LINE_LOOP:n.lines+=o*a;break;case e.POINTS:n.points+=o*a;break;default:Vt("WebGLInfo: Unknown draw mode:",r);break}}function s(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:s,update:i}}function KN(e,t,n){let i=new WeakMap,s=new Ge;function a(r,o,l){let c=r.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,p=h!==void 0?h.length:0,u=i.get(o);if(u===void 0||u.count!==p){let A=function(){w.dispose(),i.delete(o),o.removeEventListener("dispose",A)};u!==void 0&&u.texture.dispose();let d=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,b=o.morphAttributes.color!==void 0,_=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],v=o.morphAttributes.color||[],y=0;d===!0&&(y=1),g===!0&&(y=2),b===!0&&(y=3);let m=o.attributes.position.count*y,M=1;m>t.maxTextureSize&&(M=Math.ceil(m/t.maxTextureSize),m=t.maxTextureSize);let E=new Float32Array(m*M*4*p),w=new Oc(E,m,M,p);w.type=Vi,w.needsUpdate=!0;let x=y*4;for(let R=0;R<p;R++){let U=_[R],B=f[R],V=v[R],L=m*M*4*R;for(let F=0;F<U.count;F++){let J=F*x;d===!0&&(s.fromBufferAttribute(U,F),E[L+J+0]=s.x,E[L+J+1]=s.y,E[L+J+2]=s.z,E[L+J+3]=0),g===!0&&(s.fromBufferAttribute(B,F),E[L+J+4]=s.x,E[L+J+5]=s.y,E[L+J+6]=s.z,E[L+J+7]=0),b===!0&&(s.fromBufferAttribute(V,F),E[L+J+8]=s.x,E[L+J+9]=s.y,E[L+J+10]=s.z,E[L+J+11]=V.itemSize===4?s.w:1)}}u={count:p,texture:w,size:new gt(m,M)},i.set(o,u),o.addEventListener("dispose",A)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)l.getUniforms().setValue(e,"morphTexture",r.morphTexture,n);else{let d=0;for(let b=0;b<c.length;b++)d+=c[b];let g=o.morphTargetsRelative?1:1-d;l.getUniforms().setValue(e,"morphTargetBaseInfluence",g),l.getUniforms().setValue(e,"morphTargetInfluences",c)}l.getUniforms().setValue(e,"morphTargetsTexture",u.texture,n),l.getUniforms().setValue(e,"morphTargetsTextureSize",u.size)}return{update:a}}function QN(e,t,n,i,s){let a=new WeakMap;function r(c){let h=s.render.frame,p=c.geometry,u=t.get(c,p);if(a.get(u)!==h&&(t.update(u),a.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),a.get(c)!==h&&(n.update(c.instanceMatrix,e.ARRAY_BUFFER),c.instanceColor!==null&&n.update(c.instanceColor,e.ARRAY_BUFFER),a.set(c,h))),c.isSkinnedMesh){let d=c.skeleton;a.get(d)!==h&&(d.update(),a.set(d,h))}return u}function o(){a=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),i.releaseStatesOfObject(h),n.remove(h.instanceMatrix),h.instanceColor!==null&&n.remove(h.instanceColor)}return{update:r,dispose:o}}function $N(e,t,n,i,s,a){let r=new kn(t,n,{type:e,depthBuffer:s,stencilBuffer:a,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=new xe;c.setAttribute("position",new le([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new le([0,2,0,0,2,0],2));let h=new ld({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),p=new Wn(c,h),u=new ru(-1,1,1,-1,0,1),d=null,g=null,b=!1,_,f=null,v=[],y=!1;this.setSize=function(m,M){r.setSize(m,M),o!==null&&o.setSize(m,M),l!==null&&l.setSize(m,M);for(let E=0;E<v.length;E++){let w=v[E];w.setSize&&w.setSize(m,M)}},this.setEffects=function(m){v=m,y=v.length>0&&v[0].isRenderPass===!0;let M=r.width,E=r.height;v.length>0&&o===null&&(o=new kn(M,E,{type:Gi,depthBuffer:!1,stencilBuffer:!1}),l=new kn(M,E,{type:Gi,depthBuffer:!1,stencilBuffer:!1}));for(let w=0;w<v.length;w++){let x=v[w];x.setSize&&x.setSize(M,E)}},this.begin=function(m,M){if(b||m.toneMapping===Fi&&v.length===0)return!1;if(f=M,M!==null){let E=M.width,w=M.height;(r.width!==E||r.height!==w)&&this.setSize(E,w)}return y===!1&&m.setRenderTarget(r),_=m.toneMapping,m.toneMapping=Fi,!0},this.hasRenderPass=function(){return y},this.end=function(m,M){m.toneMapping=_,b=!0;let E=r,w=o;for(let x=0;x<v.length;x++){let A=v[x];A.enabled!==!1&&(A.render(m,w,E,M),A.needsSwap!==!1&&(E=w,w=w===o?l:o))}if(d!==m.outputColorSpace||g!==m.toneMapping){d=m.outputColorSpace,g=m.toneMapping,h.defines={},oe.getTransfer(d)===ye&&(h.defines.SRGB_TRANSFER="");let x=jN[g];x&&(h.defines[x]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=E.texture,m.setRenderTarget(f),m.render(p,u),f=null,b=!1},this.isCompositing=function(){return b},this.dispose=function(){r.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),h.dispose()}}function gl(e,t,n){let i=e[0];if(i<=0||i>0)return e;let s=t*n,a=oE[s];if(a===void 0&&(a=new Float32Array(s),oE[s]=a),t!==0){i.toArray(a,0);for(let r=1,o=0;r!==t;++r)o+=n,e[r].toArray(a,o)}return a}function en(e,t){if(e.length!==t.length)return!1;for(let n=0,i=e.length;n<i;n++)if(e[n]!==t[n])return!1;return!0}function nn(e,t){for(let n=0,i=t.length;n<i;n++)e[n]=t[n]}function _p(e,t){let n=lE[t];n===void 0&&(n=new Int32Array(t),lE[t]=n);for(let i=0;i!==t;++i)n[i]=e.allocateTextureUnit();return n}function tD(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function eD(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(en(n,t))return;e.uniform2fv(this.addr,t),nn(n,t)}}function nD(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(en(n,t))return;e.uniform3fv(this.addr,t),nn(n,t)}}function iD(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(en(n,t))return;e.uniform4fv(this.addr,t),nn(n,t)}}function sD(e,t){let n=this.cache,i=t.elements;if(i===void 0){if(en(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),nn(n,t)}else{if(en(n,i))return;hE.set(i),e.uniformMatrix2fv(this.addr,!1,hE),nn(n,i)}}function aD(e,t){let n=this.cache,i=t.elements;if(i===void 0){if(en(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),nn(n,t)}else{if(en(n,i))return;uE.set(i),e.uniformMatrix3fv(this.addr,!1,uE),nn(n,i)}}function rD(e,t){let n=this.cache,i=t.elements;if(i===void 0){if(en(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),nn(n,t)}else{if(en(n,i))return;cE.set(i),e.uniformMatrix4fv(this.addr,!1,cE),nn(n,i)}}function oD(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function lD(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(en(n,t))return;e.uniform2iv(this.addr,t),nn(n,t)}}function cD(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(en(n,t))return;e.uniform3iv(this.addr,t),nn(n,t)}}function uD(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(en(n,t))return;e.uniform4iv(this.addr,t),nn(n,t)}}function hD(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function fD(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(en(n,t))return;e.uniform2uiv(this.addr,t),nn(n,t)}}function dD(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(en(n,t))return;e.uniform3uiv(this.addr,t),nn(n,t)}}function pD(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(en(n,t))return;e.uniform4uiv(this.addr,t),nn(n,t)}}function mD(e,t,n){let i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s);let a;this.type===e.SAMPLER_2D_SHADOW?(W_.compareFunction=n.isReversedDepthBuffer()?up:cp,a=W_):a=AE,n.setTexture2D(t||a,s)}function gD(e,t,n){let i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),n.setTexture3D(t||CE,s)}function _D(e,t,n){let i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),n.setTextureCube(t||RE,s)}function vD(e,t,n){let i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),n.setTexture2DArray(t||wE,s)}function yD(e){switch(e){case 5126:return tD;case 35664:return eD;case 35665:return nD;case 35666:return iD;case 35674:return sD;case 35675:return aD;case 35676:return rD;case 5124:case 35670:return oD;case 35667:case 35671:return lD;case 35668:case 35672:return cD;case 35669:case 35673:return uD;case 5125:return hD;case 36294:return fD;case 36295:return dD;case 36296:return pD;case 35678:case 36198:case 36298:case 36306:case 35682:return mD;case 35679:case 36299:case 36307:return gD;case 35680:case 36300:case 36308:case 36293:return _D;case 36289:case 36303:case 36311:case 36292:return vD}}function xD(e,t){e.uniform1fv(this.addr,t)}function SD(e,t){let n=gl(t,this.size,2);e.uniform2fv(this.addr,n)}function MD(e,t){let n=gl(t,this.size,3);e.uniform3fv(this.addr,n)}function bD(e,t){let n=gl(t,this.size,4);e.uniform4fv(this.addr,n)}function ED(e,t){let n=gl(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function TD(e,t){let n=gl(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function AD(e,t){let n=gl(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function wD(e,t){e.uniform1iv(this.addr,t)}function CD(e,t){e.uniform2iv(this.addr,t)}function RD(e,t){e.uniform3iv(this.addr,t)}function ND(e,t){e.uniform4iv(this.addr,t)}function DD(e,t){e.uniform1uiv(this.addr,t)}function UD(e,t){e.uniform2uiv(this.addr,t)}function LD(e,t){e.uniform3uiv(this.addr,t)}function OD(e,t){e.uniform4uiv(this.addr,t)}function ID(e,t,n){let i=this.cache,s=t.length,a=_p(n,s);en(i,a)||(e.uniform1iv(this.addr,a),nn(i,a));let r;this.type===e.SAMPLER_2D_SHADOW?r=W_:r=AE;for(let o=0;o!==s;++o)n.setTexture2D(t[o]||r,a[o])}function PD(e,t,n){let i=this.cache,s=t.length,a=_p(n,s);en(i,a)||(e.uniform1iv(this.addr,a),nn(i,a));for(let r=0;r!==s;++r)n.setTexture3D(t[r]||CE,a[r])}function BD(e,t,n){let i=this.cache,s=t.length,a=_p(n,s);en(i,a)||(e.uniform1iv(this.addr,a),nn(i,a));for(let r=0;r!==s;++r)n.setTextureCube(t[r]||RE,a[r])}function zD(e,t,n){let i=this.cache,s=t.length,a=_p(n,s);en(i,a)||(e.uniform1iv(this.addr,a),nn(i,a));for(let r=0;r!==s;++r)n.setTexture2DArray(t[r]||wE,a[r])}function FD(e){switch(e){case 5126:return xD;case 35664:return SD;case 35665:return MD;case 35666:return bD;case 35674:return ED;case 35675:return TD;case 35676:return AD;case 5124:case 35670:return wD;case 35667:case 35671:return CD;case 35668:case 35672:return RD;case 35669:case 35673:return ND;case 5125:return DD;case 36294:return UD;case 36295:return LD;case 36296:return OD;case 35678:case 36198:case 36298:case 36306:case 35682:return ID;case 35679:case 36299:case 36307:return PD;case 35680:case 36300:case 36308:case 36293:return BD;case 36289:case 36303:case 36311:case 36292:return zD}}function fE(e,t){e.seq.push(t),e.map[t.id]=t}function HD(e,t,n){let i=e.name,s=i.length;for(k_.lastIndex=0;;){let a=k_.exec(i),r=k_.lastIndex,o=a[1],l=a[2]==="]",c=a[3];if(l&&(o=o|0),c===void 0||c==="["&&r+2===s){fE(n,c===void 0?new q_(o,e,t):new Y_(o,e,t));break}else{let p=n.map[o];p===void 0&&(p=new Z_(o),fE(n,p)),n=p}}}function dE(e,t,n){let i=e.createShader(t);return e.shaderSource(i,n),e.compileShader(i),i}function kD(e,t){let n=e.split(`
`),i=[],s=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let r=s;r<a;r++){let o=r+1;i.push(`${o===t?">":" "} ${o}: ${n[r]}`)}return i.join(`
`)}function XD(e){oe._getMatrix(pE,oe.workingColorSpace,e);let t=`mat3( ${pE.elements.map(n=>n.toFixed(4))} )`;switch(oe.getTransfer(e)){case Dc:return[t,"LinearTransferOETF"];case ye:return[t,"sRGBTransferOETF"];default:return Ft("WebGLProgram: Unsupported color space: ",e),[t,"LinearTransferOETF"]}}function mE(e,t,n){let i=e.getShaderParameter(t,e.COMPILE_STATUS),a=(e.getShaderInfoLog(t)||"").trim();if(i&&a==="")return"";let r=/ERROR: 0:(\d+)/.exec(a);if(r){let o=parseInt(r[1]);return n.toUpperCase()+`

`+a+`

`+kD(e.getShaderSource(t),o)}else return a}function WD(e,t){let n=XD(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}function YD(e,t){let n=qD[t];return n===void 0?(Ft("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+e+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+e+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}function ZD(){oe.getLuminanceCoefficients(fp);let e=fp.x.toFixed(4),t=fp.y.toFixed(4),n=fp.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${t}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function JD(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(vu).join(`
`)}function KD(e){let t=[];for(let n in e){let i=e[n];i!==!1&&t.push("#define "+n+" "+i)}return t.join(`
`)}function QD(e,t){let n={},i=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let a=e.getActiveAttrib(t,s),r=a.name,o=1;a.type===e.FLOAT_MAT2&&(o=2),a.type===e.FLOAT_MAT3&&(o=3),a.type===e.FLOAT_MAT4&&(o=4),n[r]={type:a.type,location:e.getAttribLocation(t,r),locationSize:o}}return n}function vu(e){return e!==""}function gE(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function _E(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}function J_(e){return e.replace(jD,tU)}function tU(e,t){let n=jt[t];if(n===void 0){let i=$D.get(t);if(i!==void 0)n=jt[i],Ft('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return J_(n)}function vE(e){return e.replace(eU,nU)}function nU(e,t,n,i){let s="";for(let a=parseInt(t);a<parseInt(n);a++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return s}function yE(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision==="highp"?t+=`
#define HIGH_PRECISION`:e.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:e.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function sU(e){return iU[e.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}function rU(e){return e.envMap===!1?"ENVMAP_TYPE_CUBE":aU[e.envMapMode]||"ENVMAP_TYPE_CUBE"}function lU(e){return e.envMap===!1?"ENVMAP_MODE_REFLECTION":oU[e.envMapMode]||"ENVMAP_MODE_REFLECTION"}function uU(e){return e.envMap===!1?"ENVMAP_BLENDING_NONE":cU[e.combine]||"ENVMAP_BLENDING_NONE"}function hU(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function fU(e,t,n,i){let s=e.getContext(),a=n.defines,r=n.vertexShader,o=n.fragmentShader,l=sU(n),c=rU(n),h=lU(n),p=uU(n),u=hU(n),d=JD(n),g=KD(a),b=s.createProgram(),_,f,v=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(_=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(vu).join(`
`),_.length>0&&(_+=`
`),f=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(vu).join(`
`),f.length>0&&(f+=`
`)):(_=[yE(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+h:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexNormals?"#define HAS_NORMAL":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(vu).join(`
`),f=[yE(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+h:"",n.envMap?"#define "+p:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.retroreflection?"#define USE_RETROREFLECTION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Fi?"#define TONE_MAPPING":"",n.toneMapping!==Fi?jt.tonemapping_pars_fragment:"",n.toneMapping!==Fi?YD("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",jt.colorspace_pars_fragment,WD("linearToOutputTexel",n.outputColorSpace),ZD(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(vu).join(`
`)),r=J_(r),r=gE(r,n),r=_E(r,n),o=J_(o),o=gE(o,n),o=_E(o,n),r=vE(r),o=vE(o),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,_=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+_,f=["#define varying in",n.glslVersion===N_?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===N_?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let y=v+_+r,m=v+f+o,M=dE(s,s.VERTEX_SHADER,y),E=dE(s,s.FRAGMENT_SHADER,m);s.attachShader(b,M),s.attachShader(b,E),n.index0AttributeName!==void 0?s.bindAttribLocation(b,0,n.index0AttributeName):n.hasPositionAttribute===!0&&s.bindAttribLocation(b,0,"position"),s.linkProgram(b);function w(U){if(e.debug.checkShaderErrors){let B=s.getProgramInfoLog(b)||"",V=s.getShaderInfoLog(M)||"",L=s.getShaderInfoLog(E)||"",F=B.trim(),J=V.trim(),q=L.trim(),at=!0,Y=!0;if(s.getProgramParameter(b,s.LINK_STATUS)===!1)if(at=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(s,b,M,E);else{let $=mE(s,M,"vertex"),et=mE(s,E,"fragment");Vt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(b,s.VALIDATE_STATUS)+`

Material Name: `+U.name+`
Material Type: `+U.type+`

Program Info Log: `+F+`
`+$+`
`+et)}else F!==""?Ft("WebGLProgram: Program Info Log:",F):(J===""||q==="")&&(Y=!1);Y&&(U.diagnostics={runnable:at,programLog:F,vertexShader:{log:J,prefix:_},fragmentShader:{log:q,prefix:f}})}s.deleteShader(M),s.deleteShader(E),x=new ml(s,b),A=QD(s,b)}let x;this.getUniforms=function(){return x===void 0&&w(this),x};let A;this.getAttributes=function(){return A===void 0&&w(this),A};let R=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=s.getProgramParameter(b,VD)),R},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(b),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=GD++,this.cacheKey=t,this.usedTimes=1,this.program=b,this.vertexShader=M,this.fragmentShader=E,this}function pU(e){return e===Ha||e===pu||e===mu}function mU(e,t,n,i,s,a){let r=new Ic,o=new K_,l=new Set,c=[],h=new Map,p=i.logarithmicDepthBuffer,u=i.precision,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(x){return l.add(x),x===0?"uv":`uv${x}`}function b(x,A,R,U,B,V){let L=U.fog,F=B.geometry,J=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?U.environment:null,q=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,at=t.get(x.envMap||J,q),Y=at&&at.mapping===lu?at.image.height:null,$=d[x.type];x.precision!==null&&(u=i.getMaxPrecision(x.precision),u!==x.precision&&Ft("WebGLProgram.getParameters:",x.precision,"not supported, using",u,"instead."));let et=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,Ct=et!==void 0?et.length:0,Mt=0;F.morphAttributes.position!==void 0&&(Mt=1),F.morphAttributes.normal!==void 0&&(Mt=2),F.morphAttributes.color!==void 0&&(Mt=3);let ee,Zt,ne,K;if($){let Re=gs[$];ee=Re.vertexShader,Zt=Re.fragmentShader}else{ee=x.vertexShader,Zt=x.fragmentShader;let Re=o.getVertexShaderStage(x),ge=o.getFragmentShaderStage(x);o.update(x,Re,ge),ne=Re.id,K=ge.id}let tt=e.getRenderTarget(),mt=e.state.buffers.depth.getReversed(),Bt=B.isInstancedMesh===!0,vt=B.isBatchedMesh===!0,Ot=!!x.map,de=!!x.matcap,it=!!at,ot=!!x.aoMap,lt=!!x.lightMap,ut=!!x.bumpMap&&x.wireframe===!1,dt=!!x.normalMap,zt=!!x.displacementMap,Rt=!!x.emissiveMap,Ht=!!x.metalnessMap,Xt=!!x.roughnessMap,D=x.anisotropy>0,ue=x.clearcoat>0,Kt=x.dispersion>0,C=x.retroreflectivity>0,S=x.iridescence>0,z=x.sheen>0,X=x.transmission>0,P=D&&!!x.anisotropyMap,Q=ue&&!!x.clearcoatMap,st=ue&&!!x.clearcoatNormalMap,H=ue&&!!x.clearcoatRoughnessMap,Z=S&&!!x.iridescenceMap,ht=S&&!!x.iridescenceThicknessMap,Et=z&&!!x.sheenColorMap,ft=z&&!!x.sheenRoughnessMap,ct=!!x.specularMap,Tt=!!x.specularColorMap,Pt=!!x.specularIntensityMap,Yt=X&&!!x.transmissionMap,I=X&&!!x.thicknessMap,pt=!!x.gradientMap,j=!!x.alphaMap,_t=x.alphaTest>0,bt=!!x.alphaHash,rt=!!x.extensions,It=Fi;x.toneMapped&&(tt===null||tt.isXRRenderTarget===!0)&&(It=e.toneMapping);let Ut={shaderID:$,shaderType:x.type,shaderName:x.name,vertexShader:ee,fragmentShader:Zt,defines:x.defines,customVertexShaderID:ne,customFragmentShaderID:K,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:u,batching:vt,batchingColor:vt&&B._colorsTexture!==null,instancing:Bt,instancingColor:Bt&&B.instanceColor!==null,instancingMorph:Bt&&B.morphTexture!==null,outputColorSpace:tt===null?e.outputColorSpace:tt.isXRRenderTarget===!0?tt.texture.colorSpace:oe.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:Ot,matcap:de,envMap:it,envMapMode:it&&at.mapping,envMapCubeUVHeight:Y,aoMap:ot,lightMap:lt,bumpMap:ut,normalMap:dt,displacementMap:zt,emissiveMap:Rt,normalMapObjectSpace:dt&&x.normalMapType===P1,normalMapTangentSpace:dt&&x.normalMapType===R_,packedNormalMap:dt&&x.normalMapType===R_&&pU(x.normalMap.format),metalnessMap:Ht,roughnessMap:Xt,anisotropy:D,anisotropyMap:P,clearcoat:ue,clearcoatMap:Q,clearcoatNormalMap:st,clearcoatRoughnessMap:H,dispersion:Kt,retroreflection:C,iridescence:S,iridescenceMap:Z,iridescenceThicknessMap:ht,sheen:z,sheenColorMap:Et,sheenRoughnessMap:ft,specularMap:ct,specularColorMap:Tt,specularIntensityMap:Pt,transmission:X,transmissionMap:Yt,thicknessMap:I,gradientMap:pt,opaque:x.transparent===!1&&x.blending===cl&&x.alphaToCoverage===!1,alphaMap:j,alphaTest:_t,alphaHash:bt,combine:x.combine,mapUv:Ot&&g(x.map.channel),aoMapUv:ot&&g(x.aoMap.channel),lightMapUv:lt&&g(x.lightMap.channel),bumpMapUv:ut&&g(x.bumpMap.channel),normalMapUv:dt&&g(x.normalMap.channel),displacementMapUv:zt&&g(x.displacementMap.channel),emissiveMapUv:Rt&&g(x.emissiveMap.channel),metalnessMapUv:Ht&&g(x.metalnessMap.channel),roughnessMapUv:Xt&&g(x.roughnessMap.channel),anisotropyMapUv:P&&g(x.anisotropyMap.channel),clearcoatMapUv:Q&&g(x.clearcoatMap.channel),clearcoatNormalMapUv:st&&g(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:H&&g(x.clearcoatRoughnessMap.channel),iridescenceMapUv:Z&&g(x.iridescenceMap.channel),iridescenceThicknessMapUv:ht&&g(x.iridescenceThicknessMap.channel),sheenColorMapUv:Et&&g(x.sheenColorMap.channel),sheenRoughnessMapUv:ft&&g(x.sheenRoughnessMap.channel),specularMapUv:ct&&g(x.specularMap.channel),specularColorMapUv:Tt&&g(x.specularColorMap.channel),specularIntensityMapUv:Pt&&g(x.specularIntensityMap.channel),transmissionMapUv:Yt&&g(x.transmissionMap.channel),thicknessMapUv:I&&g(x.thicknessMap.channel),alphaMapUv:j&&g(x.alphaMap.channel),vertexTangents:!!F.attributes.tangent&&(dt||D),vertexNormals:!!F.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!F.attributes.uv&&(Ot||j),fog:!!L,useFog:x.fog===!0,fogExp2:!!L&&L.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||F.attributes.normal===void 0&&dt===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:p,reversedDepthBuffer:mt,skinning:B.isSkinnedMesh===!0,hasPositionAttribute:F.attributes.position!==void 0,morphTargets:F.morphAttributes.position!==void 0,morphNormals:F.morphAttributes.normal!==void 0,morphColors:F.morphAttributes.color!==void 0,morphTargetsCount:Ct,morphTextureStride:Mt,numSunLights:A.sun.length,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numSunLightShadows:A.sunShadowMap.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:V.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:x.dithering,shadowMapEnabled:e.shadowMap.enabled&&R.length>0,shadowMapType:e.shadowMap.type,toneMapping:It,decodeVideoTexture:Ot&&x.map.isVideoTexture===!0&&oe.getTransfer(x.map.colorSpace)===ye,decodeVideoTextureEmissive:Rt&&x.emissiveMap.isVideoTexture===!0&&oe.getTransfer(x.emissiveMap.colorSpace)===ye,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===ds,flipSided:x.side===Ln,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:rt&&x.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(rt&&x.extensions.multiDraw===!0||vt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Ut.vertexUv1s=l.has(1),Ut.vertexUv2s=l.has(2),Ut.vertexUv3s=l.has(3),l.clear(),Ut}function _(x){let A=[];if(x.shaderID?A.push(x.shaderID):(A.push(x.customVertexShaderID),A.push(x.customFragmentShaderID)),x.defines!==void 0)for(let R in x.defines)A.push(R),A.push(x.defines[R]);return x.isRawShaderMaterial===!1&&(f(A,x),v(A,x),A.push(e.outputColorSpace)),A.push(x.customProgramCacheKey),A.join()}function f(x,A){x.push(A.precision),x.push(A.outputColorSpace),x.push(A.envMapMode),x.push(A.envMapCubeUVHeight),x.push(A.mapUv),x.push(A.alphaMapUv),x.push(A.lightMapUv),x.push(A.aoMapUv),x.push(A.bumpMapUv),x.push(A.normalMapUv),x.push(A.displacementMapUv),x.push(A.emissiveMapUv),x.push(A.metalnessMapUv),x.push(A.roughnessMapUv),x.push(A.anisotropyMapUv),x.push(A.clearcoatMapUv),x.push(A.clearcoatNormalMapUv),x.push(A.clearcoatRoughnessMapUv),x.push(A.iridescenceMapUv),x.push(A.iridescenceThicknessMapUv),x.push(A.sheenColorMapUv),x.push(A.sheenRoughnessMapUv),x.push(A.specularMapUv),x.push(A.specularColorMapUv),x.push(A.specularIntensityMapUv),x.push(A.transmissionMapUv),x.push(A.thicknessMapUv),x.push(A.combine),x.push(A.fogExp2),x.push(A.sizeAttenuation),x.push(A.morphTargetsCount),x.push(A.morphAttributeCount),x.push(A.numSunLights),x.push(A.numDirLights),x.push(A.numPointLights),x.push(A.numSpotLights),x.push(A.numSpotLightMaps),x.push(A.numHemiLights),x.push(A.numRectAreaLights),x.push(A.numSunLightShadows),x.push(A.numDirLightShadows),x.push(A.numPointLightShadows),x.push(A.numSpotLightShadows),x.push(A.numSpotLightShadowsWithMaps),x.push(A.numLightProbes),x.push(A.shadowMapType),x.push(A.toneMapping),x.push(A.numClippingPlanes),x.push(A.numClipIntersection),x.push(A.depthPacking)}function v(x,A){r.disableAll(),A.instancing&&r.enable(0),A.instancingColor&&r.enable(1),A.instancingMorph&&r.enable(2),A.matcap&&r.enable(3),A.envMap&&r.enable(4),A.normalMapObjectSpace&&r.enable(5),A.normalMapTangentSpace&&r.enable(6),A.clearcoat&&r.enable(7),A.iridescence&&r.enable(8),A.alphaTest&&r.enable(9),A.vertexColors&&r.enable(10),A.vertexAlphas&&r.enable(11),A.vertexUv1s&&r.enable(12),A.vertexUv2s&&r.enable(13),A.vertexUv3s&&r.enable(14),A.vertexTangents&&r.enable(15),A.anisotropy&&r.enable(16),A.alphaHash&&r.enable(17),A.batching&&r.enable(18),A.dispersion&&r.enable(19),A.retroreflection&&r.enable(24),A.batchingColor&&r.enable(20),A.gradientMap&&r.enable(21),A.packedNormalMap&&r.enable(22),A.vertexNormals&&r.enable(23),x.push(r.mask),r.disableAll(),A.fog&&r.enable(0),A.useFog&&r.enable(1),A.flatShading&&r.enable(2),A.logarithmicDepthBuffer&&r.enable(3),A.reversedDepthBuffer&&r.enable(4),A.skinning&&r.enable(5),A.morphTargets&&r.enable(6),A.morphNormals&&r.enable(7),A.morphColors&&r.enable(8),A.premultipliedAlpha&&r.enable(9),A.shadowMapEnabled&&r.enable(10),A.doubleSided&&r.enable(11),A.flipSided&&r.enable(12),A.useDepthPacking&&r.enable(13),A.dithering&&r.enable(14),A.transmission&&r.enable(15),A.sheen&&r.enable(16),A.opaque&&r.enable(17),A.pointsUvs&&r.enable(18),A.decodeVideoTexture&&r.enable(19),A.decodeVideoTextureEmissive&&r.enable(20),A.alphaToCoverage&&r.enable(21),A.numLightProbeGrids>0&&r.enable(22),A.hasPositionAttribute&&r.enable(23),x.push(r.mask)}function y(x){let A=d[x.type],R;if(A){let U=gs[A];R=tE.clone(U.uniforms)}else R=x.uniforms;return R}function m(x,A){let R=h.get(A);return R!==void 0?++R.usedTimes:(R=new fU(e,A,x,s),c.push(R),h.set(A,R)),R}function M(x){if(--x.usedTimes===0){let A=c.indexOf(x);c[A]=c[c.length-1],c.pop(),h.delete(x.cacheKey),x.destroy()}}function E(x){o.remove(x)}function w(){o.dispose()}return{getParameters:b,getProgramCacheKey:_,getUniforms:y,acquireProgram:m,releaseProgram:M,releaseShaderCache:E,programs:c,dispose:w}}function gU(){let e=new WeakMap;function t(r){return e.has(r)}function n(r){let o=e.get(r);return o===void 0&&(o={},e.set(r,o)),o}function i(r){e.delete(r)}function s(r,o,l){e.get(r)[o]=l}function a(){e=new WeakMap}return{has:t,get:n,remove:i,update:s,dispose:a}}function _U(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.material.id!==t.material.id?e.material.id-t.material.id:e.materialVariant!==t.materialVariant?e.materialVariant-t.materialVariant:e.z!==t.z?e.z-t.z:e.id-t.id}function xE(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.z!==t.z?t.z-e.z:e.id-t.id}function SE(){let e=[],t=0,n=[],i=[],s=[];function a(){t=0,n.length=0,i.length=0,s.length=0}function r(u){let d=0;return u.isInstancedMesh&&(d+=2),u.isSkinnedMesh&&(d+=1),d}function o(u,d,g,b,_,f){let v=e[t];return v===void 0?(v={id:u.id,object:u,geometry:d,material:g,materialVariant:r(u),groupOrder:b,renderOrder:u.renderOrder,z:_,group:f},e[t]=v):(v.id=u.id,v.object=u,v.geometry=d,v.material=g,v.materialVariant=r(u),v.groupOrder=b,v.renderOrder=u.renderOrder,v.z=_,v.group=f),t++,v}function l(u,d,g,b,_,f,v){v.reversedDepth===!0&&(_=-_);let y=o(u,d,g,b,_,f);g.transmission>0?i.push(y):g.transparent===!0?s.push(y):n.push(y)}function c(u,d,g,b,_,f){let v=o(u,d,g,b,_,f);g.transmission>0?i.unshift(v):g.transparent===!0?s.unshift(v):n.unshift(v)}function h(u,d){n.length>1&&n.sort(u||_U),i.length>1&&i.sort(d||xE),s.length>1&&s.sort(d||xE)}function p(){for(let u=t,d=e.length;u<d;u++){let g=e[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:n,transmissive:i,transparent:s,init:a,push:l,unshift:c,finish:p,sort:h}}function vU(){let e=new WeakMap;function t(i,s){let a=e.get(i),r;return a===void 0?(r=new SE,e.set(i,[r])):s>=a.length?(r=new SE,a.push(r)):r=a[s],r}function n(){e=new WeakMap}return{get:t,dispose:n}}function yU(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"SunLight":case"DirectionalLight":n={direction:new N,color:new ce};break;case"SpotLight":n={position:new N,direction:new N,color:new ce,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new N,color:new ce,distance:0,decay:0};break;case"HemisphereLight":n={direction:new N,skyColor:new ce,groundColor:new ce};break;case"RectAreaLight":n={color:new ce,position:new N,halfWidth:new N,halfHeight:new N};break}return e[t.id]=n,n}}}function xU(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"SunLight":case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gt};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gt};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new gt,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[t.id]=n,n}}}function MU(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+(t.map?1:0)-(e.map?1:0)}function bU(e){let t=new yU,n=xU(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new N);let s=new N,a=new Ie,r=new Ie;function o(c){let h=0,p=0,u=0;for(let B=0;B<9;B++)i.probe[B].set(0,0,0);let d=0,g=0,b=0,_=0,f=0,v=0,y=0,m=0,M=0,E=0,w=0,x=0,A=0,R=0;c.sort(MU);for(let B=0,V=c.length;B<V;B++){let L=c[B],F=L.color,J=L.intensity,q=L.distance,at=null;if(L.shadow&&L.shadow.map&&(L.shadow.map.texture.format===Ha?at=L.shadow.map.texture:at=L.shadow.map.depthTexture||L.shadow.map.texture),L.isAmbientLight)h+=F.r*J,p+=F.g*J,u+=F.b*J;else if(L.isLightProbe){for(let Y=0;Y<9;Y++)i.probe[Y].addScaledVector(L.sh.coefficients[Y],J);R++}else if(L.isSunLight){let Y=t.get(L);if(Y.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let $=L.shadow,et=n.get(L);et.shadowIntensity=$.intensity,et.shadowBias=$.bias,et.shadowNormalBias=$.normalBias,et.shadowRadius=$.radius,et.shadowMapSize.copy($.mapSize).multiply($.getFrameExtents()),i.sunShadow[g]=et,i.sunShadowMap[g]=at;let Ct=$.getViewportCount();for(let Mt=0;Mt<Ct;Mt++)i.sunShadowMatrix[b+Mt]=$.getMatrix(Mt),i.sunShadowCascade[b+Mt]=$._cascadeData[Mt];b+=Ct,g++}i.sun[d]=Y,d++}else if(L.isDirectionalLight){let Y=t.get(L);if(Y.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){let $=L.shadow,et=n.get(L);et.shadowIntensity=$.intensity,et.shadowBias=$.bias,et.shadowNormalBias=$.normalBias,et.shadowRadius=$.radius,et.shadowMapSize=$.mapSize,i.directionalShadow[_]=et,i.directionalShadowMap[_]=at,i.directionalShadowMatrix[_]=L.shadow.matrix,M++}i.directional[_]=Y,_++}else if(L.isSpotLight){let Y=t.get(L);Y.position.setFromMatrixPosition(L.matrixWorld),Y.color.copy(F).multiplyScalar(J),Y.distance=q,Y.coneCos=Math.cos(L.angle),Y.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),Y.decay=L.decay,i.spot[v]=Y;let $=L.shadow;if(L.map&&(i.spotLightMap[x]=L.map,x++,$.updateMatrices(L),L.castShadow&&A++),i.spotLightMatrix[v]=$.matrix,L.castShadow){let et=n.get(L);et.shadowIntensity=$.intensity,et.shadowBias=$.bias,et.shadowNormalBias=$.normalBias,et.shadowRadius=$.radius,et.shadowMapSize=$.mapSize,i.spotShadow[v]=et,i.spotShadowMap[v]=at,w++}v++}else if(L.isRectAreaLight){let Y=t.get(L);Y.color.copy(F).multiplyScalar(J),Y.halfWidth.set(L.width*.5,0,0),Y.halfHeight.set(0,L.height*.5,0),i.rectArea[y]=Y,y++}else if(L.isPointLight){let Y=t.get(L);if(Y.color.copy(L.color).multiplyScalar(L.intensity),Y.distance=L.distance,Y.decay=L.decay,L.castShadow){let $=L.shadow,et=n.get(L);et.shadowIntensity=$.intensity,et.shadowBias=$.bias,et.shadowNormalBias=$.normalBias,et.shadowRadius=$.radius,et.shadowMapSize=$.mapSize,et.shadowCameraNear=$.camera.near,et.shadowCameraFar=$.camera.far,i.pointShadow[f]=et,i.pointShadowMap[f]=at,i.pointShadowMatrix[f]=L.shadow.matrix,E++}i.point[f]=Y,f++}else if(L.isHemisphereLight){let Y=t.get(L);Y.skyColor.copy(L.color).multiplyScalar(J),Y.groundColor.copy(L.groundColor).multiplyScalar(J),i.hemi[m]=Y,m++}}y>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=yt.LTC_FLOAT_1,i.rectAreaLTC2=yt.LTC_FLOAT_2):(i.rectAreaLTC1=yt.LTC_HALF_1,i.rectAreaLTC2=yt.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=p,i.ambient[2]=u;let U=i.hash;(U.sunLength!==d||U.directionalLength!==_||U.pointLength!==f||U.spotLength!==v||U.rectAreaLength!==y||U.hemiLength!==m||U.numSunShadows!==g||U.numDirectionalShadows!==M||U.numPointShadows!==E||U.numSpotShadows!==w||U.numSpotMaps!==x||U.numLightProbes!==R)&&(i.sun.length=d,i.directional.length=_,i.spot.length=v,i.rectArea.length=y,i.point.length=f,i.hemi.length=m,i.sunShadow.length=g,i.sunShadowMap.length=g,i.sunShadowMatrix.length=b,i.sunShadowCascade.length=b,i.directionalShadow.length=M,i.directionalShadowMap.length=M,i.directionalShadowMatrix.length=M,i.pointShadow.length=E,i.pointShadowMap.length=E,i.pointShadowMatrix.length=E,i.spotShadow.length=w,i.spotShadowMap.length=w,i.spotLightMatrix.length=w+x-A,i.spotLightMap.length=x,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=R,U.sunLength=d,U.directionalLength=_,U.pointLength=f,U.spotLength=v,U.rectAreaLength=y,U.hemiLength=m,U.numSunShadows=g,U.numDirectionalShadows=M,U.numPointShadows=E,U.numSpotShadows=w,U.numSpotMaps=x,U.numLightProbes=R,i.version=SU++)}function l(c,h){let p=0,u=0,d=0,g=0,b=0,_=0,f=h.matrixWorldInverse;for(let v=0,y=c.length;v<y;v++){let m=c[v];if(m.isSunLight){let M=i.sun[p];M.direction.setFromMatrixPosition(m.matrixWorld),M.direction.transformDirection(f),p++}else if(m.isDirectionalLight){let M=i.directional[u];M.direction.setFromMatrixPosition(m.matrixWorld),s.setFromMatrixPosition(m.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(f),u++}else if(m.isSpotLight){let M=i.spot[g];M.position.setFromMatrixPosition(m.matrixWorld),M.position.applyMatrix4(f),M.direction.setFromMatrixPosition(m.matrixWorld),s.setFromMatrixPosition(m.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(f),g++}else if(m.isRectAreaLight){let M=i.rectArea[b];M.position.setFromMatrixPosition(m.matrixWorld),M.position.applyMatrix4(f),r.identity(),a.copy(m.matrixWorld),a.premultiply(f),r.extractRotation(a),M.halfWidth.set(m.width*.5,0,0),M.halfHeight.set(0,m.height*.5,0),M.halfWidth.applyMatrix4(r),M.halfHeight.applyMatrix4(r),b++}else if(m.isPointLight){let M=i.point[d];M.position.setFromMatrixPosition(m.matrixWorld),M.position.applyMatrix4(f),d++}else if(m.isHemisphereLight){let M=i.hemi[_];M.direction.setFromMatrixPosition(m.matrixWorld),M.direction.transformDirection(f),_++}}}return{setup:o,setupView:l,state:i}}function ME(e){let t=new bU(e),n=[],i=[],s=[];function a(u){p.camera=u,n.length=0,i.length=0,s.length=0}function r(u){n.push(u)}function o(u){i.push(u)}function l(u){s.push(u)}function c(){t.setup(n)}function h(u){t.setupView(n,u)}let p={lightsArray:n,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:p,setupLights:c,setupLightsView:h,pushLight:r,pushShadow:o,pushLightProbeGrid:l}}function EU(e){let t=new WeakMap;function n(s,a=0){let r=t.get(s),o;return r===void 0?(o=new ME(e),t.set(s,[o])):a>=r.length?(o=new ME(e),r.push(o)):o=r[a],o}function i(){t=new WeakMap}return{get:n,dispose:i}}function RU(e,t,n){let i=new Fc,s=new gt,a=new gt,r=new Ge,o=new cd,l=new ud,c={},h=n.maxTextureSize,p={[Pa]:Ln,[Ln]:Pa,[ds]:ds},u=new li({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new gt},radius:{value:4}},vertexShader:TU,fragmentShader:AU}),d=u.clone();d.defines.HORIZONTAL_PASS=1;let g=new xe;g.setAttribute("position",new Vn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let b=new Wn(g,u),_=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ou;let f=this.type;this.render=function(E,w,x){if(_.enabled===!1||_.autoUpdate===!1&&_.needsUpdate===!1||E.length===0)return;this.type===d1&&(Ft("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=ou);let A=e.getRenderTarget(),R=e.getActiveCubeFace(),U=e.getActiveMipmapLevel(),B=e.state;B.setBlending(ps),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);let V=f!==this.type;V&&w.traverse(function(L){L.material&&(Array.isArray(L.material)?L.material.forEach(F=>F.needsUpdate=!0):L.material.needsUpdate=!0)});for(let L=0,F=E.length;L<F;L++){let J=E[L],q=J.shadow;if(q===void 0){Ft("WebGLShadowMap:",J,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;s.copy(q.mapSize);let at=q.getFrameExtents();s.multiply(at),a.copy(q.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(a.x=Math.floor(h/at.x),s.x=a.x*at.x,q.mapSize.x=a.x),s.y>h&&(a.y=Math.floor(h/at.y),s.y=a.y*at.y,q.mapSize.y=a.y));let Y=e.state.buffers.depth.getReversed();if(q.camera._reversedDepth=Y,q.map===null||V===!0){if(q.map!==null&&(q.map.depthTexture!==null&&(q.map.depthTexture.dispose(),q.map.depthTexture=null),q.map.dispose()),this.type===ll){if(J.isPointLight){Ft("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}q.map=new kn(s.x,s.y,{format:Ha,type:Gi,minFilter:_n,magFilter:_n,generateMipmaps:!1}),q.map.texture.name=J.name+".shadowMap",q.map.depthTexture=new Ua(s.x,s.y,Vi),q.map.depthTexture.name=J.name+".shadowMapDepth",q.map.depthTexture.format=cs,q.map.depthTexture.compareFunction=null,q.map.depthTexture.minFilter=cn,q.map.depthTexture.magFilter=cn}else J.isPointLight?(q.map=new pp(s.x),q.map.depthTexture=new nd(s.x,Hi)):(q.map=new kn(s.x,s.y),q.map.depthTexture=new Ua(s.x,s.y,Hi)),q.map.depthTexture.name=J.name+".shadowMap",q.map.depthTexture.format=cs,this.type===ou?(q.map.depthTexture.compareFunction=Y?up:cp,q.map.depthTexture.minFilter=_n,q.map.depthTexture.magFilter=_n):(q.map.depthTexture.compareFunction=null,q.map.depthTexture.minFilter=cn,q.map.depthTexture.magFilter=cn);q.camera.updateProjectionMatrix()}q.map.isWebGLCubeRenderTarget!==!0&&(q.map.width!==s.x||q.map.height!==s.y)&&q.map.setSize(s.x,s.y);let $=q.map.isWebGLCubeRenderTarget?6:q.getViewportCount();J.isPointLight!==!0&&q.updateMatrices(J,x);for(let et=0;et<$;et++){let Ct=q.getCamera(et);if(J.isPointLight){let Mt=q.camera,ee=q.matrix,Zt=J.distance||Mt.far;Zt!==Mt.far&&(Mt.far=Zt,Mt.updateProjectionMatrix()),_u.setFromMatrixPosition(J.matrixWorld),Mt.position.copy(_u),X_.copy(Mt.position),X_.add(wU[et]),Mt.up.copy(CU[et]),Mt.lookAt(X_),Mt.updateMatrixWorld(),ee.makeTranslation(-_u.x,-_u.y,-_u.z),bE.multiplyMatrices(Mt.projectionMatrix,Mt.matrixWorldInverse),q._frustum.setFromProjectionMatrix(bE,Mt.coordinateSystem,Mt.reversedDepth)}if(q.map.isWebGLCubeRenderTarget)e.setRenderTarget(q.map,et),e.clear();else{et===0&&(e.setRenderTarget(q.map),e.clear());let Mt=q.getViewport(et);r.set(a.x*Mt.x,a.y*Mt.y,a.x*Mt.z,a.y*Mt.w),B.viewport(r)}i=q.getFrustum(et),m(w,x,Ct,J,this.type)}q.isPointLightShadow!==!0&&this.type===ll&&v(q,x),q.needsUpdate=!1}f=this.type,_.needsUpdate=!1,e.setRenderTarget(A,R,U)};function v(E,w){let x=t.update(b);u.defines.VSM_SAMPLES!==E.blurSamples&&(u.defines.VSM_SAMPLES=E.blurSamples,d.defines.VSM_SAMPLES=E.blurSamples,u.needsUpdate=!0,d.needsUpdate=!0),E.mapPass===null?E.mapPass=new kn(s.x,s.y,{format:Ha,type:Gi}):(E.mapPass.width!==E.map.width||E.mapPass.height!==E.map.height)&&E.mapPass.setSize(E.map.width,E.map.height),u.uniforms.shadow_pass.value=E.map.depthTexture,u.uniforms.resolution.value.set(E.map.width,E.map.height),u.uniforms.radius.value=E.radius,e.setRenderTarget(E.mapPass),e.clear(),e.renderBufferDirect(w,null,x,u,b,null),d.uniforms.shadow_pass.value=E.mapPass.texture,d.uniforms.resolution.value.set(E.map.width,E.map.height),d.uniforms.radius.value=E.radius,e.setRenderTarget(E.map),e.clear(),e.renderBufferDirect(w,null,x,d,b,null)}function y(E,w,x,A){let R=null,U=x.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(U!==void 0)R=U;else if(R=x.isPointLight===!0?l:o,e.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0||w.alphaToCoverage===!0){let B=R.uuid,V=w.uuid,L=c[B];L===void 0&&(L={},c[B]=L);let F=L[V];F===void 0&&(F=R.clone(),L[V]=F,w.addEventListener("dispose",M)),R=F}if(R.visible=w.visible,R.wireframe=w.wireframe,A===ll?R.side=w.shadowSide!==null?w.shadowSide:w.side:R.side=w.shadowSide!==null?w.shadowSide:p[w.side],R.alphaMap=w.alphaMap,R.alphaTest=w.alphaToCoverage===!0?.5:w.alphaTest,R.map=w.map,R.clipShadows=w.clipShadows,R.clippingPlanes=w.clippingPlanes,R.clipIntersection=w.clipIntersection,R.displacementMap=w.displacementMap,R.displacementScale=w.displacementScale,R.displacementBias=w.displacementBias,R.wireframeLinewidth=w.wireframeLinewidth,R.linewidth=w.linewidth,x.isPointLight===!0&&R.isMeshDistanceMaterial===!0){let B=e.properties.get(R);B.light=x}return R}function m(E,w,x,A,R){if(E.visible===!1)return;if(E.layers.test(w.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&R===ll)&&(!E.frustumCulled||E.intersectsFrustum(i))){E.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,E.matrixWorld);let V=t.update(E),L=E.material;if(Array.isArray(L)){let F=V.groups;for(let J=0,q=F.length;J<q;J++){let at=F[J],Y=L[at.materialIndex];if(Y&&Y.visible){let $=y(E,Y,A,R);E.onBeforeShadow(e,E,w,x,V,$,at),e.renderBufferDirect(x,null,V,$,E,at),E.onAfterShadow(e,E,w,x,V,$,at)}}}else if(L.visible){let F=y(E,L,A,R);E.onBeforeShadow(e,E,w,x,V,F,null),e.renderBufferDirect(x,null,V,F,E,null),E.onAfterShadow(e,E,w,x,V,F,null)}}let B=E.children;for(let V=0,L=B.length;V<L;V++)m(B[V],w,x,A,R)}function M(E){E.target.removeEventListener("dispose",M);for(let x in c){let A=c[x],R=E.target.uuid;R in A&&(A[R].dispose(),delete A[R])}}}function NU(e,t){function n(){let I=!1,pt=new Ge,j=null,_t=new Ge(0,0,0,0);return{setMask:function(bt){j!==bt&&!I&&(e.colorMask(bt,bt,bt,bt),j=bt)},setLocked:function(bt){I=bt},setClear:function(bt,rt,It,Ut,Re){Re===!0&&(bt*=Ut,rt*=Ut,It*=Ut),pt.set(bt,rt,It,Ut),_t.equals(pt)===!1&&(e.clearColor(bt,rt,It,Ut),_t.copy(pt))},reset:function(){I=!1,j=null,_t.set(-1,0,0,0)}}}function i(){let I=!1,pt=!1,j=null,_t=null,bt=null;return{setReversed:function(rt){if(pt!==rt){let It=t.get("EXT_clip_control");rt?It.clipControlEXT(It.LOWER_LEFT_EXT,It.ZERO_TO_ONE_EXT):It.clipControlEXT(It.LOWER_LEFT_EXT,It.NEGATIVE_ONE_TO_ONE_EXT),pt=rt;let Ut=bt;bt=null,this.setClear(Ut)}},getReversed:function(){return pt},setTest:function(rt){rt?tt(e.DEPTH_TEST):mt(e.DEPTH_TEST)},setMask:function(rt){j!==rt&&!I&&(e.depthMask(rt),j=rt)},setFunc:function(rt){if(pt&&(rt=Z1[rt]),_t!==rt){switch(rt){case Hf:e.depthFunc(e.NEVER);break;case Vf:e.depthFunc(e.ALWAYS);break;case Gf:e.depthFunc(e.LESS);break;case Jo:e.depthFunc(e.LEQUAL);break;case kf:e.depthFunc(e.EQUAL);break;case Xf:e.depthFunc(e.GEQUAL);break;case Wf:e.depthFunc(e.GREATER);break;case qf:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}_t=rt}},setLocked:function(rt){I=rt},setClear:function(rt){bt!==rt&&(bt=rt,pt&&(rt=1-rt),e.clearDepth(rt))},reset:function(){I=!1,j=null,_t=null,bt=null,pt=!1}}}function s(){let I=!1,pt=null,j=null,_t=null,bt=null,rt=null,It=null,Ut=null,Re=null;return{setTest:function(ge){I||(ge?tt(e.STENCIL_TEST):mt(e.STENCIL_TEST))},setMask:function(ge){pt!==ge&&!I&&(e.stencilMask(ge),pt=ge)},setFunc:function(ge,wi,ki){(j!==ge||_t!==wi||bt!==ki)&&(e.stencilFunc(ge,wi,ki),j=ge,_t=wi,bt=ki)},setOp:function(ge,wi,ki){(rt!==ge||It!==wi||Ut!==ki)&&(e.stencilOp(ge,wi,ki),rt=ge,It=wi,Ut=ki)},setLocked:function(ge){I=ge},setClear:function(ge){Re!==ge&&(e.clearStencil(ge),Re=ge)},reset:function(){I=!1,pt=null,j=null,_t=null,bt=null,rt=null,It=null,Ut=null,Re=null}}}let a=new n,r=new i,o=new s,l=new WeakMap,c=new WeakMap,h={},p={},u={},d=new WeakMap,g=[],b=null,_=!1,f=null,v=null,y=null,m=null,M=null,E=null,w=null,x=new ce(0,0,0),A=0,R=!1,U=null,B=null,V=null,L=null,F=null,J=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),q=!1,at=0,Y=e.getParameter(e.VERSION);Y.indexOf("WebGL")!==-1?(at=parseFloat(/^WebGL (\d)/.exec(Y)[1]),q=at>=1):Y.indexOf("OpenGL ES")!==-1&&(at=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),q=at>=2);let $=null,et={},Ct=e.getParameter(e.SCISSOR_BOX),Mt=e.getParameter(e.VIEWPORT),ee=new Ge().fromArray(Ct),Zt=new Ge().fromArray(Mt);function ne(I,pt,j,_t){let bt=new Uint8Array(4),rt=e.createTexture();e.bindTexture(I,rt),e.texParameteri(I,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(I,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let It=0;It<j;It++)I===e.TEXTURE_3D||I===e.TEXTURE_2D_ARRAY?e.texImage3D(pt,0,e.RGBA,1,1,_t,0,e.RGBA,e.UNSIGNED_BYTE,bt):e.texImage2D(pt+It,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,bt);return rt}let K={};K[e.TEXTURE_2D]=ne(e.TEXTURE_2D,e.TEXTURE_2D,1),K[e.TEXTURE_CUBE_MAP]=ne(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),K[e.TEXTURE_2D_ARRAY]=ne(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),K[e.TEXTURE_3D]=ne(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),r.setClear(1),o.setClear(0),tt(e.DEPTH_TEST),r.setFunc(Jo),ut(!1),dt(o_),tt(e.CULL_FACE),ot(ps);function tt(I){h[I]!==!0&&(e.enable(I),h[I]=!0)}function mt(I){h[I]!==!1&&(e.disable(I),h[I]=!1)}function Bt(I,pt){return u[I]!==pt?(e.bindFramebuffer(I,pt),u[I]=pt,I===e.DRAW_FRAMEBUFFER&&(u[e.FRAMEBUFFER]=pt),I===e.FRAMEBUFFER&&(u[e.DRAW_FRAMEBUFFER]=pt),!0):!1}function vt(I,pt){let j=g,_t=!1;if(I){j=d.get(pt),j===void 0&&(j=[],d.set(pt,j));let bt=I.textures;if(j.length!==bt.length||j[0]!==e.COLOR_ATTACHMENT0){for(let rt=0,It=bt.length;rt<It;rt++)j[rt]=e.COLOR_ATTACHMENT0+rt;j.length=bt.length,_t=!0}}else j[0]!==e.BACK&&(j[0]=e.BACK,_t=!0);_t&&e.drawBuffers(j)}function Ot(I){return b!==I?(e.useProgram(I),b=I,!0):!1}let de={[Ar]:e.FUNC_ADD,[m1]:e.FUNC_SUBTRACT,[g1]:e.FUNC_REVERSE_SUBTRACT};de[_1]=e.MIN,de[v1]=e.MAX;let it={[y1]:e.ZERO,[x1]:e.ONE,[S1]:e.SRC_COLOR,[h_]:e.SRC_ALPHA,[w1]:e.SRC_ALPHA_SATURATE,[T1]:e.DST_COLOR,[b1]:e.DST_ALPHA,[M1]:e.ONE_MINUS_SRC_COLOR,[f_]:e.ONE_MINUS_SRC_ALPHA,[A1]:e.ONE_MINUS_DST_COLOR,[E1]:e.ONE_MINUS_DST_ALPHA,[C1]:e.CONSTANT_COLOR,[R1]:e.ONE_MINUS_CONSTANT_COLOR,[N1]:e.CONSTANT_ALPHA,[D1]:e.ONE_MINUS_CONSTANT_ALPHA};function ot(I,pt,j,_t,bt,rt,It,Ut,Re,ge){if(I===ps){_===!0&&(mt(e.BLEND),_=!1);return}if(_===!1&&(tt(e.BLEND),_=!0),I!==p1){if(I!==f||ge!==R){if((v!==Ar||M!==Ar)&&(e.blendEquation(e.FUNC_ADD),v=Ar,M=Ar),ge)switch(I){case cl:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case l_:e.blendFunc(e.ONE,e.ONE);break;case c_:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case u_:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:Vt("WebGLState: Invalid blending: ",I);break}else switch(I){case cl:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case l_:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case c_:Vt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case u_:Vt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Vt("WebGLState: Invalid blending: ",I);break}y=null,m=null,E=null,w=null,x.set(0,0,0),A=0,f=I,R=ge}return}bt=bt||pt,rt=rt||j,It=It||_t,(pt!==v||bt!==M)&&(e.blendEquationSeparate(de[pt],de[bt]),v=pt,M=bt),(j!==y||_t!==m||rt!==E||It!==w)&&(e.blendFuncSeparate(it[j],it[_t],it[rt],it[It]),y=j,m=_t,E=rt,w=It),(Ut.equals(x)===!1||Re!==A)&&(e.blendColor(Ut.r,Ut.g,Ut.b,Re),x.copy(Ut),A=Re),f=I,R=!1}function lt(I,pt){I.side===ds?mt(e.CULL_FACE):tt(e.CULL_FACE);let j=I.side===Ln;pt&&(j=!j),ut(j),I.blending===cl&&I.transparent===!1?ot(ps):ot(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),r.setFunc(I.depthFunc),r.setTest(I.depthTest),r.setMask(I.depthWrite),a.setMask(I.colorWrite);let _t=I.stencilWrite;o.setTest(_t),_t&&(o.setMask(I.stencilWriteMask),o.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),o.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),Rt(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?tt(e.SAMPLE_ALPHA_TO_COVERAGE):mt(e.SAMPLE_ALPHA_TO_COVERAGE)}function ut(I){U!==I&&(I?e.frontFace(e.CW):e.frontFace(e.CCW),U=I)}function dt(I){I!==h1?(tt(e.CULL_FACE),I!==B&&(I===o_?e.cullFace(e.BACK):I===f1?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):mt(e.CULL_FACE),B=I}function zt(I){I!==V&&(q&&e.lineWidth(I),V=I)}function Rt(I,pt,j){I?(tt(e.POLYGON_OFFSET_FILL),(L!==pt||F!==j)&&(L=pt,F=j,r.getReversed()&&(pt=-pt),e.polygonOffset(pt,j))):mt(e.POLYGON_OFFSET_FILL)}function Ht(I){I?tt(e.SCISSOR_TEST):mt(e.SCISSOR_TEST)}function Xt(I){I===void 0&&(I=e.TEXTURE0+J-1),$!==I&&(e.activeTexture(I),$=I)}function D(I,pt,j){j===void 0&&($===null?j=e.TEXTURE0+J-1:j=$);let _t=et[j];_t===void 0&&(_t={type:void 0,texture:void 0},et[j]=_t),(_t.type!==I||_t.texture!==pt)&&($!==j&&(e.activeTexture(j),$=j),e.bindTexture(I,pt||K[I]),_t.type=I,_t.texture=pt)}function ue(){let I=et[$];I!==void 0&&I.type!==void 0&&(e.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function Kt(){try{e.compressedTexImage2D(...arguments)}catch(I){Vt("WebGLState:",I)}}function C(){try{e.compressedTexImage3D(...arguments)}catch(I){Vt("WebGLState:",I)}}function S(){try{e.texSubImage2D(...arguments)}catch(I){Vt("WebGLState:",I)}}function z(){try{e.texSubImage3D(...arguments)}catch(I){Vt("WebGLState:",I)}}function X(){try{e.compressedTexSubImage2D(...arguments)}catch(I){Vt("WebGLState:",I)}}function P(){try{e.compressedTexSubImage3D(...arguments)}catch(I){Vt("WebGLState:",I)}}function Q(){try{e.texStorage2D(...arguments)}catch(I){Vt("WebGLState:",I)}}function st(){try{e.texStorage3D(...arguments)}catch(I){Vt("WebGLState:",I)}}function H(){try{e.texImage2D(...arguments)}catch(I){Vt("WebGLState:",I)}}function Z(){try{e.texImage3D(...arguments)}catch(I){Vt("WebGLState:",I)}}function ht(I){return p[I]!==void 0?p[I]:e.getParameter(I)}function Et(I,pt){p[I]!==pt&&(e.pixelStorei(I,pt),p[I]=pt)}function ft(I){ee.equals(I)===!1&&(e.scissor(I.x,I.y,I.z,I.w),ee.copy(I))}function ct(I){Zt.equals(I)===!1&&(e.viewport(I.x,I.y,I.z,I.w),Zt.copy(I))}function Tt(I,pt){let j=c.get(pt);j===void 0&&(j=new WeakMap,c.set(pt,j));let _t=j.get(I);_t===void 0&&(_t=e.getUniformBlockIndex(pt,I.name),j.set(I,_t))}function Pt(I,pt){let _t=c.get(pt).get(I);l.get(pt)!==_t&&(e.uniformBlockBinding(pt,_t,I.__bindingPointIndex),l.set(pt,_t))}function Yt(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),r.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),h={},p={},$=null,et={},u={},d=new WeakMap,g=[],b=null,_=!1,f=null,v=null,y=null,m=null,M=null,E=null,w=null,x=new ce(0,0,0),A=0,R=!1,U=null,B=null,V=null,L=null,F=null,ee.set(0,0,e.canvas.width,e.canvas.height),Zt.set(0,0,e.canvas.width,e.canvas.height),a.reset(),r.reset(),o.reset()}return{buffers:{color:a,depth:r,stencil:o},enable:tt,disable:mt,bindFramebuffer:Bt,drawBuffers:vt,useProgram:Ot,setBlending:ot,setMaterial:lt,setFlipSided:ut,setCullFace:dt,setLineWidth:zt,setPolygonOffset:Rt,setScissorTest:Ht,activeTexture:Xt,bindTexture:D,unbindTexture:ue,compressedTexImage2D:Kt,compressedTexImage3D:C,texImage2D:H,texImage3D:Z,pixelStorei:Et,getParameter:ht,updateUBOMapping:Tt,uniformBlockBinding:Pt,texStorage2D:Q,texStorage3D:st,texSubImage2D:S,texSubImage3D:z,compressedTexSubImage2D:X,compressedTexSubImage3D:P,scissor:ft,viewport:ct,reset:Yt}}function DU(e,t,n,i,s,a,r){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new gt,h=new WeakMap,p=new Set,u,d=new WeakMap,g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function b(C,S){return g?new OffscreenCanvas(C,S):Lc("canvas")}function _(C,S,z){let X=1,P=Kt(C);if((P.width>z||P.height>z)&&(X=z/Math.max(P.width,P.height)),X<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){let Q=Math.floor(X*P.width),st=Math.floor(X*P.height);u===void 0&&(u=b(Q,st));let H=S?b(Q,st):u;return H.width=Q,H.height=st,H.getContext("2d").drawImage(C,0,0,Q,st),Ft("WebGLRenderer: Texture has been resized from ("+P.width+"x"+P.height+") to ("+Q+"x"+st+")."),H}else return"data"in C&&Ft("WebGLRenderer: Image in DataTexture is too big ("+P.width+"x"+P.height+")."),C;return C}function f(C){return C.generateMipmaps}function v(C){e.generateMipmap(C)}function y(C){return C.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?e.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function m(C,S,z,X,P,Q=!1){if(C!==null){if(e[C]!==void 0)return e[C];Ft("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let st;X&&(st=t.get("EXT_texture_norm16"),st||Ft("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let H=S;if(S===e.RED&&(z===e.FLOAT&&(H=e.R32F),z===e.HALF_FLOAT&&(H=e.R16F),z===e.UNSIGNED_BYTE&&(H=e.R8),z===e.UNSIGNED_SHORT&&st&&(H=st.R16_EXT),z===e.SHORT&&st&&(H=st.R16_SNORM_EXT)),S===e.RED_INTEGER&&(z===e.UNSIGNED_BYTE&&(H=e.R8UI),z===e.UNSIGNED_SHORT&&(H=e.R16UI),z===e.UNSIGNED_INT&&(H=e.R32UI),z===e.BYTE&&(H=e.R8I),z===e.SHORT&&(H=e.R16I),z===e.INT&&(H=e.R32I)),S===e.RG&&(z===e.FLOAT&&(H=e.RG32F),z===e.HALF_FLOAT&&(H=e.RG16F),z===e.UNSIGNED_BYTE&&(H=e.RG8),z===e.UNSIGNED_SHORT&&st&&(H=st.RG16_EXT),z===e.SHORT&&st&&(H=st.RG16_SNORM_EXT)),S===e.RG_INTEGER&&(z===e.UNSIGNED_BYTE&&(H=e.RG8UI),z===e.UNSIGNED_SHORT&&(H=e.RG16UI),z===e.UNSIGNED_INT&&(H=e.RG32UI),z===e.BYTE&&(H=e.RG8I),z===e.SHORT&&(H=e.RG16I),z===e.INT&&(H=e.RG32I)),S===e.RGB_INTEGER&&(z===e.UNSIGNED_BYTE&&(H=e.RGB8UI),z===e.UNSIGNED_SHORT&&(H=e.RGB16UI),z===e.UNSIGNED_INT&&(H=e.RGB32UI),z===e.BYTE&&(H=e.RGB8I),z===e.SHORT&&(H=e.RGB16I),z===e.INT&&(H=e.RGB32I)),S===e.RGBA_INTEGER&&(z===e.UNSIGNED_BYTE&&(H=e.RGBA8UI),z===e.UNSIGNED_SHORT&&(H=e.RGBA16UI),z===e.UNSIGNED_INT&&(H=e.RGBA32UI),z===e.BYTE&&(H=e.RGBA8I),z===e.SHORT&&(H=e.RGBA16I),z===e.INT&&(H=e.RGBA32I)),S===e.RGB&&(z===e.UNSIGNED_SHORT&&st&&(H=st.RGB16_EXT),z===e.SHORT&&st&&(H=st.RGB16_SNORM_EXT),z===e.UNSIGNED_INT_5_9_9_9_REV&&(H=e.RGB9_E5),z===e.UNSIGNED_INT_10F_11F_11F_REV&&(H=e.R11F_G11F_B10F)),S===e.RGBA){let Z=Q?Dc:oe.getTransfer(P);z===e.FLOAT&&(H=e.RGBA32F),z===e.HALF_FLOAT&&(H=e.RGBA16F),z===e.UNSIGNED_BYTE&&(H=Z===ye?e.SRGB8_ALPHA8:e.RGBA8),z===e.UNSIGNED_SHORT&&st&&(H=st.RGBA16_EXT),z===e.SHORT&&st&&(H=st.RGBA16_SNORM_EXT),z===e.UNSIGNED_SHORT_4_4_4_4&&(H=e.RGBA4),z===e.UNSIGNED_SHORT_5_5_5_1&&(H=e.RGB5_A1)}return(H===e.R16F||H===e.R32F||H===e.RG16F||H===e.RG32F||H===e.RGBA16F||H===e.RGBA32F)&&t.get("EXT_color_buffer_float"),H}function M(C,S){let z;return C?S===null||S===Hi||S===hl?z=e.DEPTH24_STENCIL8:S===Vi?z=e.DEPTH32F_STENCIL8:S===ul&&(z=e.DEPTH24_STENCIL8,Ft("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Hi||S===hl?z=e.DEPTH_COMPONENT24:S===Vi?z=e.DEPTH_COMPONENT32F:S===ul&&(z=e.DEPTH_COMPONENT16),z}function E(C,S){return f(C)===!0||C.isFramebufferTexture&&C.minFilter!==cn&&C.minFilter!==_n?Math.log2(Math.max(S.width,S.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?S.mipmaps.length:1}function w(C){let S=C.target;S.removeEventListener("dispose",w),A(S),S.isVideoTexture&&h.delete(S),S.isHTMLTexture&&p.delete(S)}function x(C){let S=C.target;S.removeEventListener("dispose",x),U(S)}function A(C){let S=i.get(C);if(S.__webglInit===void 0)return;let z=C.source,X=d.get(z);if(X){let P=X[S.__cacheKey];P.usedTimes--,P.usedTimes===0&&R(C),Object.keys(X).length===0&&d.delete(z)}i.remove(C)}function R(C){let S=i.get(C);e.deleteTexture(S.__webglTexture);let z=C.source,X=d.get(z);delete X[S.__cacheKey],r.memory.textures--}function U(C){let S=i.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),i.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(S.__webglFramebuffer[X]))for(let P=0;P<S.__webglFramebuffer[X].length;P++)e.deleteFramebuffer(S.__webglFramebuffer[X][P]);else e.deleteFramebuffer(S.__webglFramebuffer[X]);S.__webglDepthbuffer&&e.deleteRenderbuffer(S.__webglDepthbuffer[X])}else{if(Array.isArray(S.__webglFramebuffer))for(let X=0;X<S.__webglFramebuffer.length;X++)e.deleteFramebuffer(S.__webglFramebuffer[X]);else e.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&e.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&e.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let X=0;X<S.__webglColorRenderbuffer.length;X++)S.__webglColorRenderbuffer[X]&&e.deleteRenderbuffer(S.__webglColorRenderbuffer[X]);S.__webglDepthRenderbuffer&&e.deleteRenderbuffer(S.__webglDepthRenderbuffer)}let z=C.textures;for(let X=0,P=z.length;X<P;X++){let Q=i.get(z[X]);Q.__webglTexture&&(e.deleteTexture(Q.__webglTexture),r.memory.textures--),i.remove(z[X])}i.remove(C)}let B=0;function V(){B=0}function L(){return B}function F(C){B=C}function J(){let C=B;return C>=s.maxTextures&&Ft("WebGLTextures: Trying to use "+(C+1)+" texture units while this GPU supports only "+s.maxTextures),B+=1,C}function q(C){let S=[];return S.push(C.wrapS),S.push(C.wrapT),S.push(C.wrapR||0),S.push(C.magFilter),S.push(C.minFilter),S.push(C.anisotropy),S.push(C.internalFormat),S.push(C.format),S.push(C.type),S.push(C.generateMipmaps),S.push(C.premultiplyAlpha),S.push(C.flipY),S.push(C.unpackAlignment),S.push(C.colorSpace),S.join()}function at(C,S){let z=i.get(C);if(C.isVideoTexture&&D(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&z.__version!==C.version){let X=C.image;if(X===null)Ft("WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)Ft("WebGLRenderer: Texture marked for update but image is incomplete");else{mt(z,C,S);return}}else C.isExternalTexture&&(z.__webglTexture=C.sourceTexture?C.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,z.__webglTexture,e.TEXTURE0+S)}function Y(C,S){let z=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&z.__version!==C.version){mt(z,C,S);return}else C.isExternalTexture&&(z.__webglTexture=C.sourceTexture?C.sourceTexture:null);n.bindTexture(e.TEXTURE_2D_ARRAY,z.__webglTexture,e.TEXTURE0+S)}function $(C,S){let z=i.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&z.__version!==C.version){mt(z,C,S);return}n.bindTexture(e.TEXTURE_3D,z.__webglTexture,e.TEXTURE0+S)}function et(C,S){let z=i.get(C);if(C.isCubeDepthTexture!==!0&&C.version>0&&z.__version!==C.version){Bt(z,C,S);return}n.bindTexture(e.TEXTURE_CUBE_MAP,z.__webglTexture,e.TEXTURE0+S)}let Ct={[Yf]:e.REPEAT,[ls]:e.CLAMP_TO_EDGE,[Zf]:e.MIRRORED_REPEAT},Mt={[cn]:e.NEAREST,[O1]:e.NEAREST_MIPMAP_NEAREST,[cu]:e.NEAREST_MIPMAP_LINEAR,[_n]:e.LINEAR,[Ad]:e.LINEAR_MIPMAP_NEAREST,[za]:e.LINEAR_MIPMAP_LINEAR},ee={[z1]:e.NEVER,[k1]:e.ALWAYS,[F1]:e.LESS,[cp]:e.LEQUAL,[H1]:e.EQUAL,[up]:e.GEQUAL,[V1]:e.GREATER,[G1]:e.NOTEQUAL};function Zt(C,S){if(S.type===Vi&&t.has("OES_texture_float_linear")===!1&&(S.magFilter===_n||S.magFilter===Ad||S.magFilter===cu||S.magFilter===za||S.minFilter===_n||S.minFilter===Ad||S.minFilter===cu||S.minFilter===za)&&Ft("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(C,e.TEXTURE_WRAP_S,Ct[S.wrapS]),e.texParameteri(C,e.TEXTURE_WRAP_T,Ct[S.wrapT]),(C===e.TEXTURE_3D||C===e.TEXTURE_2D_ARRAY)&&e.texParameteri(C,e.TEXTURE_WRAP_R,Ct[S.wrapR]),e.texParameteri(C,e.TEXTURE_MAG_FILTER,Mt[S.magFilter]),e.texParameteri(C,e.TEXTURE_MIN_FILTER,Mt[S.minFilter]),S.compareFunction&&(e.texParameteri(C,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(C,e.TEXTURE_COMPARE_FUNC,ee[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===cn||S.minFilter!==cu&&S.minFilter!==za||S.type===Vi&&t.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||i.get(S).__currentAnisotropy){let z=t.get("EXT_texture_filter_anisotropic");e.texParameterf(C,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,s.getMaxAnisotropy())),i.get(S).__currentAnisotropy=S.anisotropy}}}function ne(C,S){let z=!1;C.__webglInit===void 0&&(C.__webglInit=!0,S.addEventListener("dispose",w));let X=S.source,P=d.get(X);P===void 0&&(P={},d.set(X,P));let Q=q(S);if(Q!==C.__cacheKey){P[Q]===void 0&&(P[Q]={texture:e.createTexture(),usedTimes:0},r.memory.textures++,z=!0),P[Q].usedTimes++;let st=P[C.__cacheKey];st!==void 0&&(P[C.__cacheKey].usedTimes--,st.usedTimes===0&&R(S)),C.__cacheKey=Q,C.__webglTexture=P[Q].texture}return z}function K(C,S,z){return Math.floor(Math.floor(C/z)/S)}function tt(C,S,z,X){let Q=C.updateRanges;if(Q.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,S.width,S.height,z,X,S.data);else{Q.sort((Et,ft)=>Et.start-ft.start);let st=0;for(let Et=1;Et<Q.length;Et++){let ft=Q[st],ct=Q[Et],Tt=ft.start+ft.count,Pt=K(ct.start,S.width,4),Yt=K(ft.start,S.width,4);ct.start<=Tt+1&&Pt===Yt&&K(ct.start+ct.count-1,S.width,4)===Pt?ft.count=Math.max(ft.count,ct.start+ct.count-ft.start):(++st,Q[st]=ct)}Q.length=st+1;let H=n.getParameter(e.UNPACK_ROW_LENGTH),Z=n.getParameter(e.UNPACK_SKIP_PIXELS),ht=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,S.width);for(let Et=0,ft=Q.length;Et<ft;Et++){let ct=Q[Et],Tt=Math.floor(ct.start/4),Pt=Math.ceil(ct.count/4),Yt=Tt%S.width,I=Math.floor(Tt/S.width),pt=Pt,j=1;n.pixelStorei(e.UNPACK_SKIP_PIXELS,Yt),n.pixelStorei(e.UNPACK_SKIP_ROWS,I),n.texSubImage2D(e.TEXTURE_2D,0,Yt,I,pt,j,z,X,S.data)}C.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,H),n.pixelStorei(e.UNPACK_SKIP_PIXELS,Z),n.pixelStorei(e.UNPACK_SKIP_ROWS,ht)}}function mt(C,S,z){let X=e.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(X=e.TEXTURE_2D_ARRAY),S.isData3DTexture&&(X=e.TEXTURE_3D);let P=ne(C,S),Q=S.source;n.bindTexture(X,C.__webglTexture,e.TEXTURE0+z);let st=i.get(Q);if(Q.version!==st.__version||P===!0){if(n.activeTexture(e.TEXTURE0+z),(typeof ImageBitmap<"u"&&S.image instanceof ImageBitmap)===!1){let j=oe.getPrimaries(oe.workingColorSpace),_t=S.colorSpace===Xs?null:oe.getPrimaries(S.colorSpace),bt=S.colorSpace===Xs||j===_t?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,bt)}n.pixelStorei(e.UNPACK_ALIGNMENT,S.unpackAlignment);let Z=_(S.image,!1,s.maxTextureSize);Z=ue(S,Z);let ht=a.convert(S.format,S.colorSpace),Et=a.convert(S.type),ft=m(S.internalFormat,ht,Et,S.normalized,S.colorSpace,S.isVideoTexture);Zt(X,S);let ct,Tt=S.mipmaps,Pt=S.isVideoTexture!==!0,Yt=st.__version===void 0||P===!0,I=Q.dataReady,pt=E(S,Z);if(S.isDepthTexture)ft=M(S.format===Fa,S.type),Yt&&(Pt?n.texStorage2D(e.TEXTURE_2D,1,ft,Z.width,Z.height):n.texImage2D(e.TEXTURE_2D,0,ft,Z.width,Z.height,0,ht,Et,null));else if(S.isDataTexture)if(Tt.length>0){Pt&&Yt&&n.texStorage2D(e.TEXTURE_2D,pt,ft,Tt[0].width,Tt[0].height);for(let j=0,_t=Tt.length;j<_t;j++)ct=Tt[j],Pt?I&&n.texSubImage2D(e.TEXTURE_2D,j,0,0,ct.width,ct.height,ht,Et,ct.data):n.texImage2D(e.TEXTURE_2D,j,ft,ct.width,ct.height,0,ht,Et,ct.data);S.generateMipmaps=!1}else Pt?(Yt&&n.texStorage2D(e.TEXTURE_2D,pt,ft,Z.width,Z.height),I&&tt(S,Z,ht,Et)):n.texImage2D(e.TEXTURE_2D,0,ft,Z.width,Z.height,0,ht,Et,Z.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Pt&&Yt&&n.texStorage3D(e.TEXTURE_2D_ARRAY,pt,ft,Tt[0].width,Tt[0].height,Z.depth);for(let j=0,_t=Tt.length;j<_t;j++)if(ct=Tt[j],S.format!==Ai)if(ht!==null)if(Pt){if(I)if(S.layerUpdates.size>0){let bt=B_(ct.width,ct.height,S.format,S.type);for(let rt of S.layerUpdates){let It=ct.data.subarray(rt*bt/ct.data.BYTES_PER_ELEMENT,(rt+1)*bt/ct.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,j,0,0,rt,ct.width,ct.height,1,ht,It)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,j,0,0,0,ct.width,ct.height,Z.depth,ht,ct.data)}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,j,ft,ct.width,ct.height,Z.depth,0,ct.data,0,0);else Ft("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Pt?I&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,j,0,0,0,ct.width,ct.height,Z.depth,ht,Et,ct.data):n.texImage3D(e.TEXTURE_2D_ARRAY,j,ft,ct.width,ct.height,Z.depth,0,ht,Et,ct.data);S.layerUpdates.size>0&&S.clearLayerUpdates()}else{Pt&&Yt&&n.texStorage2D(e.TEXTURE_2D,pt,ft,Tt[0].width,Tt[0].height);for(let j=0,_t=Tt.length;j<_t;j++)ct=Tt[j],S.format!==Ai?ht!==null?Pt?I&&n.compressedTexSubImage2D(e.TEXTURE_2D,j,0,0,ct.width,ct.height,ht,ct.data):n.compressedTexImage2D(e.TEXTURE_2D,j,ft,ct.width,ct.height,0,ct.data):Ft("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Pt?I&&n.texSubImage2D(e.TEXTURE_2D,j,0,0,ct.width,ct.height,ht,Et,ct.data):n.texImage2D(e.TEXTURE_2D,j,ft,ct.width,ct.height,0,ht,Et,ct.data)}else if(S.isDataArrayTexture)if(Pt){if(Yt&&n.texStorage3D(e.TEXTURE_2D_ARRAY,pt,ft,Z.width,Z.height,Z.depth),I)if(S.layerUpdates.size>0){let j=B_(Z.width,Z.height,S.format,S.type);for(let _t of S.layerUpdates){let bt=Z.data.subarray(_t*j/Z.data.BYTES_PER_ELEMENT,(_t+1)*j/Z.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,_t,Z.width,Z.height,1,ht,Et,bt)}S.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,ht,Et,Z.data)}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,ft,Z.width,Z.height,Z.depth,0,ht,Et,Z.data);else if(S.isData3DTexture)Pt?(Yt&&n.texStorage3D(e.TEXTURE_3D,pt,ft,Z.width,Z.height,Z.depth),I&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,ht,Et,Z.data)):n.texImage3D(e.TEXTURE_3D,0,ft,Z.width,Z.height,Z.depth,0,ht,Et,Z.data);else if(S.isFramebufferTexture){if(Yt)if(Pt)n.texStorage2D(e.TEXTURE_2D,pt,ft,Z.width,Z.height);else{let j=Z.width,_t=Z.height;for(let bt=0;bt<pt;bt++)n.texImage2D(e.TEXTURE_2D,bt,ft,j,_t,0,ht,Et,null),j>>=1,_t>>=1}}else if(S.isHTMLTexture){if("texElementImage2D"in e){let j=e.canvas;if(j.hasAttribute("layoutsubtree")||j.setAttribute("layoutsubtree","true"),Z.parentNode!==j){j.appendChild(Z),p.add(S),j.onpaint=_t=>{let bt=_t.changedElements;for(let rt of p)bt.includes(rt.image)&&(rt.needsUpdate=!0)},j.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,Z);else{let bt=e.RGBA,rt=e.RGBA,It=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,bt,rt,It,Z)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(Tt.length>0){if(Pt&&Yt){let j=Kt(Tt[0]);n.texStorage2D(e.TEXTURE_2D,pt,ft,j.width,j.height)}for(let j=0,_t=Tt.length;j<_t;j++)ct=Tt[j],Pt?I&&n.texSubImage2D(e.TEXTURE_2D,j,0,0,ht,Et,ct):n.texImage2D(e.TEXTURE_2D,j,ft,ht,Et,ct);S.generateMipmaps=!1}else if(Pt){if(Yt){let j=Kt(Z);n.texStorage2D(e.TEXTURE_2D,pt,ft,j.width,j.height)}I&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,ht,Et,Z)}else n.texImage2D(e.TEXTURE_2D,0,ft,ht,Et,Z);f(S)&&v(X),st.__version=Q.version,S.onUpdate&&S.onUpdate(S)}C.__version=S.version}function Bt(C,S,z){if(S.image.length!==6)return;let X=ne(C,S),P=S.source;n.bindTexture(e.TEXTURE_CUBE_MAP,C.__webglTexture,e.TEXTURE0+z);let Q=i.get(P);if(P.version!==Q.__version||X===!0){n.activeTexture(e.TEXTURE0+z);let st=oe.getPrimaries(oe.workingColorSpace),H=S.colorSpace===Xs?null:oe.getPrimaries(S.colorSpace),Z=S.colorSpace===Xs||st===H?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,S.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,Z);let ht=S.isCompressedTexture||S.image[0].isCompressedTexture,Et=S.image[0]&&S.image[0].isDataTexture,ft=[];for(let rt=0;rt<6;rt++)!ht&&!Et?ft[rt]=_(S.image[rt],!0,s.maxCubemapSize):ft[rt]=Et?S.image[rt].image:S.image[rt],ft[rt]=ue(S,ft[rt]);let ct=ft[0],Tt=a.convert(S.format,S.colorSpace),Pt=a.convert(S.type),Yt=m(S.internalFormat,Tt,Pt,S.normalized,S.colorSpace),I=S.isVideoTexture!==!0,pt=Q.__version===void 0||X===!0,j=P.dataReady,_t=E(S,ct);Zt(e.TEXTURE_CUBE_MAP,S);let bt;if(ht){I&&pt&&n.texStorage2D(e.TEXTURE_CUBE_MAP,_t,Yt,ct.width,ct.height);for(let rt=0;rt<6;rt++){bt=ft[rt].mipmaps;for(let It=0;It<bt.length;It++){let Ut=bt[It];S.format!==Ai?Tt!==null?I?j&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+rt,It,0,0,Ut.width,Ut.height,Tt,Ut.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+rt,It,Yt,Ut.width,Ut.height,0,Ut.data):Ft("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):I?j&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+rt,It,0,0,Ut.width,Ut.height,Tt,Pt,Ut.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+rt,It,Yt,Ut.width,Ut.height,0,Tt,Pt,Ut.data)}}}else{if(bt=S.mipmaps,I&&pt){bt.length>0&&_t++;let rt=Kt(ft[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,_t,Yt,rt.width,rt.height)}for(let rt=0;rt<6;rt++)if(Et){I?j&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,0,0,ft[rt].width,ft[rt].height,Tt,Pt,ft[rt].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,Yt,ft[rt].width,ft[rt].height,0,Tt,Pt,ft[rt].data);for(let It=0;It<bt.length;It++){let Re=bt[It].image[rt].image;I?j&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+rt,It+1,0,0,Re.width,Re.height,Tt,Pt,Re.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+rt,It+1,Yt,Re.width,Re.height,0,Tt,Pt,Re.data)}}else{I?j&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,0,0,Tt,Pt,ft[rt]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+rt,0,Yt,Tt,Pt,ft[rt]);for(let It=0;It<bt.length;It++){let Ut=bt[It];I?j&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+rt,It+1,0,0,Tt,Pt,Ut.image[rt]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+rt,It+1,Yt,Tt,Pt,Ut.image[rt])}}}f(S)&&v(e.TEXTURE_CUBE_MAP),Q.__version=P.version,S.onUpdate&&S.onUpdate(S)}C.__version=S.version}function vt(C,S,z,X,P,Q){let st=a.convert(z.format,z.colorSpace),H=a.convert(z.type),Z=m(z.internalFormat,st,H,z.normalized,z.colorSpace),ht=i.get(S),Et=i.get(z);if(Et.__renderTarget=S,!ht.__hasExternalTextures){let ft=Math.max(1,S.width>>Q),ct=Math.max(1,S.height>>Q);P===e.TEXTURE_3D||P===e.TEXTURE_2D_ARRAY?n.texImage3D(P,Q,Z,ft,ct,S.depth,0,st,H,null):n.texImage2D(P,Q,Z,ft,ct,0,st,H,null)}n.bindFramebuffer(e.FRAMEBUFFER,C),Xt(S)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,X,P,Et.__webglTexture,0,Ht(S)):(P===e.TEXTURE_2D||P>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&P<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,X,P,Et.__webglTexture,Q),n.bindFramebuffer(e.FRAMEBUFFER,null)}function Ot(C,S,z){if(e.bindRenderbuffer(e.RENDERBUFFER,C),S.depthBuffer){let X=S.depthTexture,P=X&&X.isDepthTexture?X.type:null,Q=M(S.stencilBuffer,P),st=S.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;Xt(S)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Ht(S),Q,S.width,S.height):z?e.renderbufferStorageMultisample(e.RENDERBUFFER,Ht(S),Q,S.width,S.height):e.renderbufferStorage(e.RENDERBUFFER,Q,S.width,S.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,st,e.RENDERBUFFER,C)}else{let X=S.textures;for(let P=0;P<X.length;P++){let Q=X[P],st=a.convert(Q.format,Q.colorSpace),H=a.convert(Q.type),Z=m(Q.internalFormat,st,H,Q.normalized,Q.colorSpace);Xt(S)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Ht(S),Z,S.width,S.height):z?e.renderbufferStorageMultisample(e.RENDERBUFFER,Ht(S),Z,S.width,S.height):e.renderbufferStorage(e.RENDERBUFFER,Z,S.width,S.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function de(C,S,z){let X=S.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,C),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let P=i.get(S.depthTexture);if(P.__renderTarget=S,(!P.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),X){if(P.__webglInit===void 0&&(P.__webglInit=!0,S.depthTexture.addEventListener("dispose",w)),P.__webglTexture===void 0){P.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,P.__webglTexture),Zt(e.TEXTURE_CUBE_MAP,S.depthTexture);let ht=a.convert(S.depthTexture.format),Et=a.convert(S.depthTexture.type),ft;S.depthTexture.format===cs?ft=e.DEPTH_COMPONENT24:S.depthTexture.format===Fa&&(ft=e.DEPTH24_STENCIL8);for(let ct=0;ct<6;ct++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0,ft,S.width,S.height,0,ht,Et,null)}}else at(S.depthTexture,0);let Q=P.__webglTexture,st=Ht(S),H=X?e.TEXTURE_CUBE_MAP_POSITIVE_X+z:e.TEXTURE_2D,Z=S.depthTexture.format===Fa?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(S.depthTexture.format===cs)Xt(S)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,Z,H,Q,0,st):e.framebufferTexture2D(e.FRAMEBUFFER,Z,H,Q,0);else if(S.depthTexture.format===Fa)Xt(S)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,Z,H,Q,0,st):e.framebufferTexture2D(e.FRAMEBUFFER,Z,H,Q,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function it(C){let S=i.get(C),z=C.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==C.depthTexture){let X=C.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),X){let P=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,X.removeEventListener("dispose",P)};X.addEventListener("dispose",P),S.__depthDisposeCallback=P}S.__boundDepthTexture=X}if(C.depthTexture&&!S.__autoAllocateDepthBuffer)if(z)for(let X=0;X<6;X++)de(S.__webglFramebuffer[X],C,X);else{let X=C.texture.mipmaps;X&&X.length>0?de(S.__webglFramebuffer[0],C,0):de(S.__webglFramebuffer,C,0)}else if(z){S.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(n.bindFramebuffer(e.FRAMEBUFFER,S.__webglFramebuffer[X]),S.__webglDepthbuffer[X]===void 0)S.__webglDepthbuffer[X]=e.createRenderbuffer(),Ot(S.__webglDepthbuffer[X],C,!1);else{let P=C.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,Q=S.__webglDepthbuffer[X];e.bindRenderbuffer(e.RENDERBUFFER,Q),e.framebufferRenderbuffer(e.FRAMEBUFFER,P,e.RENDERBUFFER,Q)}}else{let X=C.texture.mipmaps;if(X&&X.length>0?n.bindFramebuffer(e.FRAMEBUFFER,S.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=e.createRenderbuffer(),Ot(S.__webglDepthbuffer,C,!1);else{let P=C.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,Q=S.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,Q),e.framebufferRenderbuffer(e.FRAMEBUFFER,P,e.RENDERBUFFER,Q)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function ot(C,S,z){let X=i.get(C);S!==void 0&&vt(X.__webglFramebuffer,C,C.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),z!==void 0&&it(C)}function lt(C){let S=C.texture,z=i.get(C),X=i.get(S);C.addEventListener("dispose",x);let P=C.textures,Q=C.isWebGLCubeRenderTarget===!0,st=P.length>1;if(st||(X.__webglTexture===void 0&&(X.__webglTexture=e.createTexture()),X.__version=S.version,r.memory.textures++),Q){z.__webglFramebuffer=[];for(let H=0;H<6;H++)if(S.mipmaps&&S.mipmaps.length>0){z.__webglFramebuffer[H]=[];for(let Z=0;Z<S.mipmaps.length;Z++)z.__webglFramebuffer[H][Z]=e.createFramebuffer()}else z.__webglFramebuffer[H]=e.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){z.__webglFramebuffer=[];for(let H=0;H<S.mipmaps.length;H++)z.__webglFramebuffer[H]=e.createFramebuffer()}else z.__webglFramebuffer=e.createFramebuffer();if(st)for(let H=0,Z=P.length;H<Z;H++){let ht=i.get(P[H]);ht.__webglTexture===void 0&&(ht.__webglTexture=e.createTexture(),r.memory.textures++)}if(C.samples>0&&Xt(C)===!1){z.__webglMultisampledFramebuffer=e.createFramebuffer(),z.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let H=0;H<P.length;H++){let Z=P[H];z.__webglColorRenderbuffer[H]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,z.__webglColorRenderbuffer[H]);let ht=a.convert(Z.format,Z.colorSpace),Et=a.convert(Z.type),ft=m(Z.internalFormat,ht,Et,Z.normalized,Z.colorSpace,C.isXRRenderTarget===!0),ct=Ht(C);e.renderbufferStorageMultisample(e.RENDERBUFFER,ct,ft,C.width,C.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+H,e.RENDERBUFFER,z.__webglColorRenderbuffer[H])}e.bindRenderbuffer(e.RENDERBUFFER,null),C.depthBuffer&&(z.__webglDepthRenderbuffer=e.createRenderbuffer(),Ot(z.__webglDepthRenderbuffer,C,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(Q){n.bindTexture(e.TEXTURE_CUBE_MAP,X.__webglTexture),Zt(e.TEXTURE_CUBE_MAP,S);for(let H=0;H<6;H++)if(S.mipmaps&&S.mipmaps.length>0)for(let Z=0;Z<S.mipmaps.length;Z++)vt(z.__webglFramebuffer[H][Z],C,S,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+H,Z);else vt(z.__webglFramebuffer[H],C,S,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+H,0);f(S)&&v(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(st){for(let H=0,Z=P.length;H<Z;H++){let ht=P[H],Et=i.get(ht),ft=e.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ft=C.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(ft,Et.__webglTexture),Zt(ft,ht),vt(z.__webglFramebuffer,C,ht,e.COLOR_ATTACHMENT0+H,ft,0),f(ht)&&v(ft)}n.unbindTexture()}else{let H=e.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(H=C.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(H,X.__webglTexture),Zt(H,S),S.mipmaps&&S.mipmaps.length>0)for(let Z=0;Z<S.mipmaps.length;Z++)vt(z.__webglFramebuffer[Z],C,S,e.COLOR_ATTACHMENT0,H,Z);else vt(z.__webglFramebuffer,C,S,e.COLOR_ATTACHMENT0,H,0);f(S)&&v(H),n.unbindTexture()}C.depthBuffer&&it(C)}function ut(C){let S=C.textures;for(let z=0,X=S.length;z<X;z++){let P=S[z];if(f(P)){let Q=y(C),st=i.get(P).__webglTexture;n.bindTexture(Q,st),v(Q),n.unbindTexture()}}}let dt=[],zt=[];function Rt(C){if(C.samples>0){if(Xt(C)===!1){let S=C.textures,z=C.width,X=C.height,P=e.COLOR_BUFFER_BIT,Q=C.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,st=i.get(C),H=S.length>1;if(H)for(let ht=0;ht<S.length;ht++)n.bindFramebuffer(e.FRAMEBUFFER,st.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+ht,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,st.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+ht,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,st.__webglMultisampledFramebuffer);let Z=C.texture.mipmaps;Z&&Z.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,st.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,st.__webglFramebuffer);for(let ht=0;ht<S.length;ht++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(P|=e.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(P|=e.STENCIL_BUFFER_BIT)),H){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,st.__webglColorRenderbuffer[ht]);let Et=i.get(S[ht]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,Et,0)}e.blitFramebuffer(0,0,z,X,0,0,z,X,P,e.NEAREST),l===!0&&(dt.length=0,zt.length=0,dt.push(e.COLOR_ATTACHMENT0+ht),C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&(dt.push(Q),zt.push(Q),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,zt)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,dt))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),H)for(let ht=0;ht<S.length;ht++){n.bindFramebuffer(e.FRAMEBUFFER,st.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+ht,e.RENDERBUFFER,st.__webglColorRenderbuffer[ht]);let Et=i.get(S[ht]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,st.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+ht,e.TEXTURE_2D,Et,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,st.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&l){let S=C.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[S])}}}function Ht(C){return Math.min(s.maxSamples,C.samples)}function Xt(C){let S=i.get(C);return C.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function D(C){let S=r.render.frame;h.get(C)!==S&&(h.set(C,S),C.update())}function ue(C,S){let z=C.colorSpace,X=C.format,P=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||z!==Nc&&z!==Xs&&(oe.getTransfer(z)===ye?(X!==Ai||P!==ui)&&Ft("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Vt("WebGLTextures: Unsupported texture color space:",z)),S}function Kt(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=J,this.resetTextureUnits=V,this.getTextureUnits=L,this.setTextureUnits=F,this.setTexture2D=at,this.setTexture2DArray=Y,this.setTexture3D=$,this.setTextureCube=et,this.rebindTextures=ot,this.setupRenderTarget=lt,this.updateRenderTargetMipmap=ut,this.updateMultisampleRenderTarget=Rt,this.setupDepthRenderbuffer=it,this.setupFrameBufferTexture=vt,this.useMultisampledRTT=Xt,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function UU(e,t){function n(i,s=Xs){let a,r=oe.getTransfer(s);if(i===ui)return e.UNSIGNED_BYTE;if(i===Cd)return e.UNSIGNED_SHORT_4_4_4_4;if(i===Rd)return e.UNSIGNED_SHORT_5_5_5_1;if(i===E_)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===T_)return e.UNSIGNED_INT_10F_11F_11F_REV;if(i===M_)return e.BYTE;if(i===b_)return e.SHORT;if(i===ul)return e.UNSIGNED_SHORT;if(i===wd)return e.INT;if(i===Hi)return e.UNSIGNED_INT;if(i===Vi)return e.FLOAT;if(i===Gi)return e.HALF_FLOAT;if(i===A_)return e.ALPHA;if(i===w_)return e.RGB;if(i===Ai)return e.RGBA;if(i===cs)return e.DEPTH_COMPONENT;if(i===Fa)return e.DEPTH_STENCIL;if(i===C_)return e.RED;if(i===Nd)return e.RED_INTEGER;if(i===Ha)return e.RG;if(i===Dd)return e.RG_INTEGER;if(i===Ud)return e.RGBA_INTEGER;if(i===uu||i===hu||i===fu||i===du)if(r===ye)if(a=t.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(i===uu)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===hu)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===fu)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===du)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=t.get("WEBGL_compressed_texture_s3tc"),a!==null){if(i===uu)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===hu)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===fu)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===du)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ld||i===Od||i===Id||i===Pd)if(a=t.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(i===Ld)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Od)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Id)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Pd)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Bd||i===zd||i===Fd||i===Hd||i===Vd||i===pu||i===Gd)if(a=t.get("WEBGL_compressed_texture_etc"),a!==null){if(i===Bd||i===zd)return r===ye?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(i===Fd)return r===ye?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC;if(i===Hd)return a.COMPRESSED_R11_EAC;if(i===Vd)return a.COMPRESSED_SIGNED_R11_EAC;if(i===pu)return a.COMPRESSED_RG11_EAC;if(i===Gd)return a.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===kd||i===Xd||i===Wd||i===qd||i===Yd||i===Zd||i===Jd||i===Kd||i===Qd||i===jd||i===$d||i===tp||i===ep||i===np)if(a=t.get("WEBGL_compressed_texture_astc"),a!==null){if(i===kd)return r===ye?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Xd)return r===ye?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Wd)return r===ye?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===qd)return r===ye?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Yd)return r===ye?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Zd)return r===ye?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Jd)return r===ye?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Kd)return r===ye?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Qd)return r===ye?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===jd)return r===ye?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===$d)return r===ye?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===tp)return r===ye?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===ep)return r===ye?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===np)return r===ye?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ip||i===sp||i===ap)if(a=t.get("EXT_texture_compression_bptc"),a!==null){if(i===ip)return r===ye?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===sp)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===ap)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===rp||i===op||i===mu||i===lp)if(a=t.get("EXT_texture_compression_rgtc"),a!==null){if(i===rp)return a.COMPRESSED_RED_RGTC1_EXT;if(i===op)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===mu)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===lp)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===hl?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:n}}function PU(e,t){function n(_,f){_.matrixAutoUpdate===!0&&_.updateMatrix(),f.value.copy(_.matrix)}function i(_,f){f.color.getRGB(_.fogColor.value,O_(e)),f.isFog?(_.fogNear.value=f.near,_.fogFar.value=f.far):f.isFogExp2&&(_.fogDensity.value=f.density)}function s(_,f,v,y,m){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?a(_,f):f.isMeshLambertMaterial?(a(_,f),f.envMap&&(_.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(a(_,f),p(_,f)):f.isMeshPhongMaterial?(a(_,f),h(_,f),f.envMap&&(_.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(a(_,f),u(_,f),f.isMeshPhysicalMaterial&&d(_,f,m)):f.isMeshMatcapMaterial?(a(_,f),g(_,f)):f.isMeshDepthMaterial?a(_,f):f.isMeshDistanceMaterial?(a(_,f),b(_,f)):f.isMeshNormalMaterial?a(_,f):f.isLineBasicMaterial?(r(_,f),f.isLineDashedMaterial&&o(_,f)):f.isPointsMaterial?l(_,f,v,y):f.isSpriteMaterial?c(_,f):f.isShadowMaterial?(_.color.value.copy(f.color),_.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function a(_,f){_.opacity.value=f.opacity,f.color&&_.diffuse.value.copy(f.color),f.emissive&&_.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(_.map.value=f.map,n(f.map,_.mapTransform)),f.alphaMap&&(_.alphaMap.value=f.alphaMap,n(f.alphaMap,_.alphaMapTransform)),f.bumpMap&&(_.bumpMap.value=f.bumpMap,n(f.bumpMap,_.bumpMapTransform),_.bumpScale.value=f.bumpScale,f.side===Ln&&(_.bumpScale.value*=-1)),f.normalMap&&(_.normalMap.value=f.normalMap,n(f.normalMap,_.normalMapTransform),_.normalScale.value.copy(f.normalScale),f.side===Ln&&_.normalScale.value.negate()),f.displacementMap&&(_.displacementMap.value=f.displacementMap,n(f.displacementMap,_.displacementMapTransform),_.displacementScale.value=f.displacementScale,_.displacementBias.value=f.displacementBias),f.emissiveMap&&(_.emissiveMap.value=f.emissiveMap,n(f.emissiveMap,_.emissiveMapTransform)),f.specularMap&&(_.specularMap.value=f.specularMap,n(f.specularMap,_.specularMapTransform)),f.alphaTest>0&&(_.alphaTest.value=f.alphaTest);let v=t.get(f),y=v.envMap,m=v.envMapRotation;y&&(_.envMap.value=y,_.envMapRotation.value.setFromMatrix4(IU.makeRotationFromEuler(m)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&_.envMapRotation.value.premultiply(NE),_.reflectivity.value=f.reflectivity,_.ior.value=f.ior,_.refractionRatio.value=f.refractionRatio),f.lightMap&&(_.lightMap.value=f.lightMap,_.lightMapIntensity.value=f.lightMapIntensity,n(f.lightMap,_.lightMapTransform)),f.aoMap&&(_.aoMap.value=f.aoMap,_.aoMapIntensity.value=f.aoMapIntensity,n(f.aoMap,_.aoMapTransform))}function r(_,f){_.diffuse.value.copy(f.color),_.opacity.value=f.opacity,f.map&&(_.map.value=f.map,n(f.map,_.mapTransform))}function o(_,f){_.dashSize.value=f.dashSize,_.totalSize.value=f.dashSize+f.gapSize,_.scale.value=f.scale}function l(_,f,v,y){_.diffuse.value.copy(f.color),_.opacity.value=f.opacity,_.size.value=f.size*v,_.scale.value=y*.5,f.map&&(_.map.value=f.map,n(f.map,_.uvTransform)),f.alphaMap&&(_.alphaMap.value=f.alphaMap,n(f.alphaMap,_.alphaMapTransform)),f.alphaTest>0&&(_.alphaTest.value=f.alphaTest)}function c(_,f){_.diffuse.value.copy(f.color),_.opacity.value=f.opacity,_.rotation.value=f.rotation,f.map&&(_.map.value=f.map,n(f.map,_.mapTransform)),f.alphaMap&&(_.alphaMap.value=f.alphaMap,n(f.alphaMap,_.alphaMapTransform)),f.alphaTest>0&&(_.alphaTest.value=f.alphaTest)}function h(_,f){_.specular.value.copy(f.specular),_.shininess.value=Math.max(f.shininess,1e-4)}function p(_,f){f.gradientMap&&(_.gradientMap.value=f.gradientMap)}function u(_,f){_.metalness.value=f.metalness,f.metalnessMap&&(_.metalnessMap.value=f.metalnessMap,n(f.metalnessMap,_.metalnessMapTransform)),_.roughness.value=f.roughness,f.roughnessMap&&(_.roughnessMap.value=f.roughnessMap,n(f.roughnessMap,_.roughnessMapTransform)),f.envMap&&(_.envMapIntensity.value=f.envMapIntensity)}function d(_,f,v){_.ior.value=f.ior,f.sheen>0&&(_.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),_.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(_.sheenColorMap.value=f.sheenColorMap,n(f.sheenColorMap,_.sheenColorMapTransform)),f.sheenRoughnessMap&&(_.sheenRoughnessMap.value=f.sheenRoughnessMap,n(f.sheenRoughnessMap,_.sheenRoughnessMapTransform))),f.clearcoat>0&&(_.clearcoat.value=f.clearcoat,_.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(_.clearcoatMap.value=f.clearcoatMap,n(f.clearcoatMap,_.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(_.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,n(f.clearcoatRoughnessMap,_.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(_.clearcoatNormalMap.value=f.clearcoatNormalMap,n(f.clearcoatNormalMap,_.clearcoatNormalMapTransform),_.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Ln&&_.clearcoatNormalScale.value.negate())),f.dispersion>0&&(_.dispersion.value=f.dispersion),f.retroreflectivity>0&&(_.retroreflectivity.value=f.retroreflectivity),f.iridescence>0&&(_.iridescence.value=f.iridescence,_.iridescenceIOR.value=f.iridescenceIOR,_.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],_.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(_.iridescenceMap.value=f.iridescenceMap,n(f.iridescenceMap,_.iridescenceMapTransform)),f.iridescenceThicknessMap&&(_.iridescenceThicknessMap.value=f.iridescenceThicknessMap,n(f.iridescenceThicknessMap,_.iridescenceThicknessMapTransform))),f.transmission>0&&(_.transmission.value=f.transmission,_.transmissionSamplerMap.value=v.texture,_.transmissionSamplerSize.value.set(v.width,v.height),f.transmissionMap&&(_.transmissionMap.value=f.transmissionMap,n(f.transmissionMap,_.transmissionMapTransform)),_.thickness.value=f.thickness,f.thicknessMap&&(_.thicknessMap.value=f.thicknessMap,n(f.thicknessMap,_.thicknessMapTransform)),_.attenuationDistance.value=f.attenuationDistance,_.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(_.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(_.anisotropyMap.value=f.anisotropyMap,n(f.anisotropyMap,_.anisotropyMapTransform))),_.specularIntensity.value=f.specularIntensity,_.specularColor.value.copy(f.specularColor),f.specularColorMap&&(_.specularColorMap.value=f.specularColorMap,n(f.specularColorMap,_.specularColorMapTransform)),f.specularIntensityMap&&(_.specularIntensityMap.value=f.specularIntensityMap,n(f.specularIntensityMap,_.specularIntensityMapTransform))}function g(_,f){f.matcap&&(_.matcap.value=f.matcap)}function b(_,f){let v=t.get(f).light;_.referencePosition.value.setFromMatrixPosition(v.matrixWorld),_.nearDistance.value=v.shadow.camera.near,_.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function BU(e,t,n,i){let s={},a={},r=[],o=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function l(m,M){let E=M.program;i.uniformBlockBinding(m,E)}function c(m,M){let E=s[m.id];E===void 0&&(_(m),E=h(m),s[m.id]=E,m.addEventListener("dispose",v));let w=M.program;i.updateUBOMapping(m,w);let x=t.render.frame;a[m.id]!==x&&(u(m),a[m.id]=x)}function h(m){let M=p();m.__bindingPointIndex=M;let E=e.createBuffer(),w=m.__size,x=m.usage;return e.bindBuffer(e.UNIFORM_BUFFER,E),e.bufferData(e.UNIFORM_BUFFER,w,x),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,M,E),E}function p(){for(let m=0;m<o;m++)if(r.indexOf(m)===-1)return r.push(m),m;return Vt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(m){let M=s[m.id],E=m.uniforms,w=m.__cache;e.bindBuffer(e.UNIFORM_BUFFER,M);for(let x=0,A=E.length;x<A;x++){let R=E[x];if(Array.isArray(R))for(let U=0,B=R.length;U<B;U++)d(R[U],x,U,w);else d(R,x,0,w)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function d(m,M,E,w){if(b(m,M,E,w)===!0){let x=m.__offset,A=m.value;if(Array.isArray(A)){let R=0;for(let U=0;U<A.length;U++){let B=A[U],V=f(B);g(B,m.__data,R),typeof B!="number"&&typeof B!="boolean"&&!B.isMatrix3&&!ArrayBuffer.isView(B)&&(R+=V.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(A,m.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,x,m.__data)}}function g(m,M,E){typeof m=="number"||typeof m=="boolean"?M[0]=m:m.isMatrix3?(M[0]=m.elements[0],M[1]=m.elements[1],M[2]=m.elements[2],M[3]=0,M[4]=m.elements[3],M[5]=m.elements[4],M[6]=m.elements[5],M[7]=0,M[8]=m.elements[6],M[9]=m.elements[7],M[10]=m.elements[8],M[11]=0):ArrayBuffer.isView(m)?M.set(new m.constructor(m.buffer,m.byteOffset,M.length)):m.toArray(M,E)}function b(m,M,E,w){let x=m.value,A=M+"_"+E;if(w[A]===void 0)return typeof x=="number"||typeof x=="boolean"?w[A]=x:ArrayBuffer.isView(x)?w[A]=x.slice():w[A]=x.clone(),!0;{let R=w[A];if(typeof x=="number"||typeof x=="boolean"){if(R!==x)return w[A]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(R.equals(x)===!1)return R.copy(x),!0}}return!1}function _(m){let M=m.uniforms,E=0,w=16;for(let A=0,R=M.length;A<R;A++){let U=Array.isArray(M[A])?M[A]:[M[A]];for(let B=0,V=U.length;B<V;B++){let L=U[B],F=Array.isArray(L.value)?L.value:[L.value];for(let J=0,q=F.length;J<q;J++){let at=F[J],Y=f(at),$=E%w,et=$%Y.boundary,Ct=$+et;E+=et,Ct!==0&&w-Ct<Y.storage&&(E+=w-Ct),L.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=E,E+=Y.storage}}}let x=E%w;return x>0&&(E+=w-x),m.__size=E,m.__cache={},this}function f(m){let M={boundary:0,storage:0};return typeof m=="number"||typeof m=="boolean"?(M.boundary=4,M.storage=4):m.isVector2?(M.boundary=8,M.storage=8):m.isVector3||m.isColor?(M.boundary=16,M.storage=12):m.isVector4?(M.boundary=16,M.storage=16):m.isMatrix3?(M.boundary=48,M.storage=48):m.isMatrix4?(M.boundary=64,M.storage=64):m.isTexture?Ft("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(m)?(M.boundary=16,M.storage=m.byteLength):Ft("WebGLRenderer: Unsupported uniform value type.",m),M}function v(m){let M=m.target;M.removeEventListener("dispose",v);let E=r.indexOf(M.__bindingPointIndex);r.splice(E,1),e.deleteBuffer(s[M.id]),delete s[M.id],delete a[M.id]}function y(){for(let m in s)e.deleteBuffer(s[m]);r=[],s={},a={}}return{bind:l,update:c,dispose:y}}function FU(){return ms===null&&(ms=new $f(zU,16,16,Ha,Gi),ms.name="DFG_LUT",ms.minFilter=_n,ms.magFilter=_n,ms.wrapS=ls,ms.wrapT=ls,ms.generateMipmaps=!1,ms.needsUpdate=!0),ms}var jR,$R,t3,e3,n3,i3,s3,a3,r3,o3,l3,c3,u3,h3,f3,d3,p3,m3,g3,_3,v3,y3,x3,S3,M3,b3,E3,T3,A3,w3,C3,R3,N3,D3,U3,L3,O3,I3,P3,B3,z3,F3,H3,V3,G3,k3,X3,W3,q3,Y3,Z3,J3,K3,Q3,j3,$3,t2,e2,n2,i2,s2,a2,r2,o2,l2,c2,u2,h2,f2,d2,p2,m2,g2,_2,v2,y2,x2,S2,M2,b2,E2,T2,A2,w2,C2,R2,N2,D2,U2,L2,O2,I2,P2,B2,z2,F2,H2,V2,G2,k2,X2,W2,q2,Y2,Z2,J2,K2,Q2,j2,$2,tN,eN,nN,iN,sN,aN,rN,oN,lN,cN,uN,hN,fN,dN,pN,mN,gN,_N,vN,yN,xN,SN,MN,bN,EN,TN,AN,wN,CN,RN,NN,DN,jt,yt,gs,hp,UN,TE,pl,zN,FN,HN,gu,iE,F_,H_,V_,G_,VN,Nr,dp,pp,jN,AE,W_,wE,CE,RE,oE,lE,cE,uE,hE,q_,Y_,Z_,k_,ml,VD,GD,pE,qD,fp,jD,$D,eU,iU,aU,oU,cU,dU,K_,Q_,SU,TU,AU,wU,CU,bE,_u,X_,LU,OU,j_,$_,IU,NE,zU,ms,mp,vp=Lr(()=>{z_();z_();jR=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,$R=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,t3=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,e3=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,n3=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,i3=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,s3=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,a3=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,r3=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,o3=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,l3=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,c3=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,u3=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,h3=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,f3=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,d3=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,p3=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,m3=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,g3=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,_3=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,v3=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,y3=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,x3=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,S3=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,M3=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,b3=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,E3=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,T3=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,A3=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,w3=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,C3="gl_FragColor = linearToOutputTexel( gl_FragColor );",R3=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,N3=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,D3=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,U3=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,L3=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,O3=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,I3=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,P3=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,B3=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,z3=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,F3=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,H3=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,V3=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,G3=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,k3=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,X3=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,W3=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,q3=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Y3=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Z3=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,J3=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,K3=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Q3=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,j3=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,$3=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,t2=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,e2=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,n2=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,i2=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,s2=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,a2=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,r2=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,o2=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,l2=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,c2=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,u2=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,h2=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,f2=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,d2=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,p2=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,m2=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,g2=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,_2=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,v2=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,y2=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,x2=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,S2=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,M2=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,b2=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,E2=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,T2=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,A2=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,w2=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,C2=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,R2=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,N2=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,D2=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,U2=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,L2=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,O2=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,I2=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,P2=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,B2=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,z2=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,F2=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,H2=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,V2=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,G2=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,k2=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,X2=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,W2=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,q2=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Y2=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Z2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,J2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,K2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Q2=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,j2=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,$2=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,tN=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,eN=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,nN=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,iN=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sN=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,aN=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,rN=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,oN=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,lN=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,cN=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,uN=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,hN=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,fN=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,dN=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,pN=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,mN=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,gN=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,_N=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vN=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,yN=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,xN=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,SN=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,MN=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,bN=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,EN=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,TN=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,AN=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,wN=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,CN=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,RN=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,NN=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,DN=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,jt={alphahash_fragment:jR,alphahash_pars_fragment:$R,alphamap_fragment:t3,alphamap_pars_fragment:e3,alphatest_fragment:n3,alphatest_pars_fragment:i3,aomap_fragment:s3,aomap_pars_fragment:a3,batching_pars_vertex:r3,batching_vertex:o3,begin_vertex:l3,beginnormal_vertex:c3,bsdfs:u3,iridescence_fragment:h3,bumpmap_pars_fragment:f3,clipping_planes_fragment:d3,clipping_planes_pars_fragment:p3,clipping_planes_pars_vertex:m3,clipping_planes_vertex:g3,color_fragment:_3,color_pars_fragment:v3,color_pars_vertex:y3,color_vertex:x3,common:S3,cube_uv_reflection_fragment:M3,defaultnormal_vertex:b3,displacementmap_pars_vertex:E3,displacementmap_vertex:T3,emissivemap_fragment:A3,emissivemap_pars_fragment:w3,colorspace_fragment:C3,colorspace_pars_fragment:R3,envmap_fragment:N3,envmap_common_pars_fragment:D3,envmap_pars_fragment:U3,envmap_pars_vertex:L3,envmap_physical_pars_fragment:X3,envmap_vertex:O3,fog_vertex:I3,fog_pars_vertex:P3,fog_fragment:B3,fog_pars_fragment:z3,gradientmap_pars_fragment:F3,lightmap_pars_fragment:H3,lights_lambert_fragment:V3,lights_lambert_pars_fragment:G3,lights_pars_begin:k3,lights_toon_fragment:W3,lights_toon_pars_fragment:q3,lights_phong_fragment:Y3,lights_phong_pars_fragment:Z3,lights_physical_fragment:J3,lights_physical_pars_fragment:K3,lights_fragment_begin:Q3,lights_fragment_maps:j3,lights_fragment_end:$3,lightprobes_pars_fragment:t2,logdepthbuf_fragment:e2,logdepthbuf_pars_fragment:n2,logdepthbuf_pars_vertex:i2,logdepthbuf_vertex:s2,map_fragment:a2,map_pars_fragment:r2,map_particle_fragment:o2,map_particle_pars_fragment:l2,metalnessmap_fragment:c2,metalnessmap_pars_fragment:u2,morphinstance_vertex:h2,morphcolor_vertex:f2,morphnormal_vertex:d2,morphtarget_pars_vertex:p2,morphtarget_vertex:m2,normal_fragment_begin:g2,normal_fragment_maps:_2,normal_pars_fragment:v2,normal_pars_vertex:y2,normal_vertex:x2,normalmap_pars_fragment:S2,clearcoat_normal_fragment_begin:M2,clearcoat_normal_fragment_maps:b2,clearcoat_pars_fragment:E2,iridescence_pars_fragment:T2,opaque_fragment:A2,packing:w2,premultiplied_alpha_fragment:C2,project_vertex:R2,dithering_fragment:N2,dithering_pars_fragment:D2,roughnessmap_fragment:U2,roughnessmap_pars_fragment:L2,shadowmap_pars_fragment:O2,shadowmap_pars_vertex:I2,shadowmap_vertex:P2,shadowmask_pars_fragment:B2,skinbase_vertex:z2,skinning_pars_vertex:F2,skinning_vertex:H2,skinnormal_vertex:V2,specularmap_fragment:G2,specularmap_pars_fragment:k2,tonemapping_fragment:X2,tonemapping_pars_fragment:W2,transmission_fragment:q2,transmission_pars_fragment:Y2,uv_pars_fragment:Z2,uv_pars_vertex:J2,uv_vertex:K2,worldpos_vertex:Q2,background_vert:j2,background_frag:$2,backgroundCube_vert:tN,backgroundCube_frag:eN,cube_vert:nN,cube_frag:iN,depth_vert:sN,depth_frag:aN,distance_vert:rN,distance_frag:oN,equirect_vert:lN,equirect_frag:cN,linedashed_vert:uN,linedashed_frag:hN,meshbasic_vert:fN,meshbasic_frag:dN,meshlambert_vert:pN,meshlambert_frag:mN,meshmatcap_vert:gN,meshmatcap_frag:_N,meshnormal_vert:vN,meshnormal_frag:yN,meshphong_vert:xN,meshphong_frag:SN,meshphysical_vert:MN,meshphysical_frag:bN,meshtoon_vert:EN,meshtoon_frag:TN,points_vert:AN,points_frag:wN,shadow_vert:CN,shadow_frag:RN,sprite_vert:NN,sprite_frag:DN},yt={common:{diffuse:{value:new ce(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new qt},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new qt}},envmap:{envMap:{value:null},envMapRotation:{value:new qt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new qt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new qt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new qt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new qt},normalScale:{value:new gt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new qt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new qt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new qt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new qt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ce(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new N},probesMax:{value:new N},probesResolution:{value:new N}},points:{diffuse:{value:new ce(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0},uvTransform:{value:new qt}},sprite:{diffuse:{value:new ce(16777215)},opacity:{value:1},center:{value:new gt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new qt},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0}}},gs={basic:{uniforms:Tn([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.fog]),vertexShader:jt.meshbasic_vert,fragmentShader:jt.meshbasic_frag},lambert:{uniforms:Tn([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,yt.lights,{emissive:{value:new ce(0)},envMapIntensity:{value:1}}]),vertexShader:jt.meshlambert_vert,fragmentShader:jt.meshlambert_frag},phong:{uniforms:Tn([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,yt.lights,{emissive:{value:new ce(0)},specular:{value:new ce(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:jt.meshphong_vert,fragmentShader:jt.meshphong_frag},standard:{uniforms:Tn([yt.common,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.roughnessmap,yt.metalnessmap,yt.fog,yt.lights,{emissive:{value:new ce(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:jt.meshphysical_vert,fragmentShader:jt.meshphysical_frag},toon:{uniforms:Tn([yt.common,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.gradientmap,yt.fog,yt.lights,{emissive:{value:new ce(0)}}]),vertexShader:jt.meshtoon_vert,fragmentShader:jt.meshtoon_frag},matcap:{uniforms:Tn([yt.common,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,{matcap:{value:null}}]),vertexShader:jt.meshmatcap_vert,fragmentShader:jt.meshmatcap_frag},points:{uniforms:Tn([yt.points,yt.fog]),vertexShader:jt.points_vert,fragmentShader:jt.points_frag},dashed:{uniforms:Tn([yt.common,yt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:jt.linedashed_vert,fragmentShader:jt.linedashed_frag},depth:{uniforms:Tn([yt.common,yt.displacementmap]),vertexShader:jt.depth_vert,fragmentShader:jt.depth_frag},normal:{uniforms:Tn([yt.common,yt.bumpmap,yt.normalmap,yt.displacementmap,{opacity:{value:1}}]),vertexShader:jt.meshnormal_vert,fragmentShader:jt.meshnormal_frag},sprite:{uniforms:Tn([yt.sprite,yt.fog]),vertexShader:jt.sprite_vert,fragmentShader:jt.sprite_frag},background:{uniforms:{uvTransform:{value:new qt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:jt.background_vert,fragmentShader:jt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new qt}},vertexShader:jt.backgroundCube_vert,fragmentShader:jt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:jt.cube_vert,fragmentShader:jt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:jt.equirect_vert,fragmentShader:jt.equirect_frag},distance:{uniforms:Tn([yt.common,yt.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:jt.distance_vert,fragmentShader:jt.distance_frag},shadow:{uniforms:Tn([yt.lights,yt.fog,{color:{value:new ce(0)},opacity:{value:1}}]),vertexShader:jt.shadow_vert,fragmentShader:jt.shadow_frag}};gs.physical={uniforms:Tn([gs.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new qt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new qt},clearcoatNormalScale:{value:new gt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new qt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new qt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new qt},sheen:{value:0},sheenColor:{value:new ce(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new qt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new qt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new qt},transmissionSamplerSize:{value:new gt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new qt},attenuationDistance:{value:0},attenuationColor:{value:new ce(0)},specularColor:{value:new ce(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new qt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new qt},anisotropyVector:{value:new gt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new qt}}]),vertexShader:jt.meshphysical_vert,fragmentShader:jt.meshphysical_frag};hp={r:0,b:0,g:0},UN=new Ie,TE=new qt;TE.set(-1,0,0,0,1,0,0,0,1);pl=4,zN=6,FN=20,HN=256,gu=new ru,iE=new ce,F_=null,H_=0,V_=0,G_=!1,VN=new N,Nr=new N,dp=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,n=0,i=.1,s=100,a={}){let{size:r=256,position:o=VN}=a;F_=this._renderer.getRenderTarget(),H_=this._renderer.getActiveCubeFace(),V_=this._renderer.getActiveMipmapLevel(),G_=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(r);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,s,l,o),n>0&&this._blur(l,0,0,n),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,n=null){return this._fromTexture(t,n)}fromCubemap(t,n=null){return this._fromTexture(t,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=rE(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=aE(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(F_,H_,V_),this._renderer.xr.enabled=G_,t.scissorTest=!1,dl(t,0,0,t.width,t.height)}_fromTexture(t,n){t.mapping===Ba||t.mapping===wr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),F_=this._renderer.getRenderTarget(),H_=this._renderer.getActiveCubeFace(),V_=this._renderer.getActiveMipmapLevel(),G_=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=n||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:_n,minFilter:_n,generateMipmaps:!1,type:Gi,format:Ai,colorSpace:Nc,depthBuffer:!1},s=sE(t,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=sE(t,n,i);let{_lodMax:a}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=GN(a)),this._blurMaterial=XN(a,t,n),this._ggxMaterial=kN(a,t,n)}return s}_compileMaterial(t){let n=new Wn(new xe,t);this._renderer.compile(n,gu)}_sceneToCubeUV(t,n,i,s,a){let l=new En(90,1,n,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],p=this._renderer,u=p.autoClear,d=p.toneMapping;p.getClearColor(iE),p.toneMapping=Fi,p.autoClear=!1,p.state.buffers.depth.getReversed()&&(p.setRenderTarget(s),p.clearDepth(),p.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Wn(new Ti,new Sr({name:"PMREM.Background",side:Ln,depthWrite:!1,depthTest:!1})));let b=this._backgroundBox,_=b.material,f=!1,v=t.background;v?v.isColor&&(_.color.copy(v),t.background=null,f=!0):(_.color.copy(iE),f=!0);for(let y=0;y<6;y++){let m=y%3;m===0?(l.up.set(0,c[y],0),l.position.set(a.x,a.y,a.z),l.lookAt(a.x+h[y],a.y,a.z)):m===1?(l.up.set(0,0,c[y]),l.position.set(a.x,a.y,a.z),l.lookAt(a.x,a.y+h[y],a.z)):(l.up.set(0,c[y],0),l.position.set(a.x,a.y,a.z),l.lookAt(a.x,a.y,a.z+h[y]));let M=this._cubeSize;dl(s,m*M,y>2?M:0,M,M),p.setRenderTarget(s),f&&p.render(b,l),p.render(t,l)}p.toneMapping=d,p.autoClear=u,t.background=v}_textureToCubeUV(t,n){let i=this._renderer,s=t.mapping===Ba||t.mapping===wr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=rE()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=aE());let a=s?this._cubemapMaterial:this._equirectMaterial,r=this._lodMeshes[0];r.material=a;let o=a.uniforms;o.envMap.value=t;let l=this._cubeSize;dl(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(r,gu)}_applyPMREM(t){let n=this._renderer,i=n.autoClear;n.autoClear=!1;let s=this._lodMeshes.length;for(let a=1;a<s;a++)this._applyGGXFilter(t,a-1,a);n.autoClear=i}_applyGGXFilter(t,n,i){let s=this._renderer,a=this._pingPongRenderTarget,r=this._ggxMaterial,o=this._lodMeshes[i];o.material=r;let l=r.uniforms,c=i/(this._lodMeshes.length-1),h=n/(this._lodMeshes.length-1),p=Math.sqrt(c*c-h*h),u=c*1.25,d=p*u,{_lodMax:g}=this,b=this._sizeLods[i],_=3*b*(i>g-pl?i-g+pl:0),f=4*(this._cubeSize-b);l.envMap.value=t.texture,l.roughness.value=d,l.mipInt.value=g-n,dl(a,_,f,3*b,2*b),s.setRenderTarget(a),s.render(o,gu),l.envMap.value=a.texture,l.roughness.value=0,l.mipInt.value=g-i,dl(t,_,f,3*b,2*b),s.setRenderTarget(t),s.render(o,gu)}_blur(t,n,i,s){let a=this._pingPongRenderTarget,r=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(t,a,n,i,r),this._blurPass(a,t,i,i,r)}_blurPass(t,n,i,s,a){let r=this._renderer,o=this._blurMaterial,l=this._lodMeshes[s];l.material=o;let c=o.uniforms;c.envMap.value=t.texture,c.sigma.value=a,c.mipInt.value=this._lodMax-i;let h=this._sizeLods[s],p=3*h*(s>this._lodMax-pl?s-this._lodMax+pl:0),u=4*(this._cubeSize-h);dl(n,p,u,3*h,2*h),r.setRenderTarget(n),r.render(l,gu)}};pp=class extends kn{constructor(t=1,n={}){super(t,t,n),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new Hc(s),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Ti(5,5,5),a=new li({name:"CubemapFromEquirect",uniforms:Rr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Ln,blending:ps});a.uniforms.tEquirect.value=n;let r=new Wn(s,a),o=n.minFilter;return n.minFilter===za&&(n.minFilter=_n),new Sd(1,10,this).update(t,r),n.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(t,n=!0,i=!0,s=!0){let a=t.getRenderTarget();for(let r=0;r<6;r++)t.setRenderTarget(this,r),t.clear(n,i,s);t.setRenderTarget(a)}};jN={[p_]:"LINEAR_TONE_MAPPING",[m_]:"REINHARD_TONE_MAPPING",[g_]:"CINEON_TONE_MAPPING",[__]:"ACES_FILMIC_TONE_MAPPING",[y_]:"AGX_TONE_MAPPING",[x_]:"NEUTRAL_TONE_MAPPING",[v_]:"CUSTOM_TONE_MAPPING"};AE=new Gn,W_=new Ua(1,1),wE=new Oc,CE=new jf,RE=new Hc,oE=[],lE=[],cE=new Float32Array(16),uE=new Float32Array(9),hE=new Float32Array(4);q_=class{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.setValue=yD(n.type)}},Y_=class{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=FD(n.type)}},Z_=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,n,i){let s=this.seq;for(let a=0,r=s.length;a!==r;++a){let o=s[a];o.setValue(t,n[o.id],i)}}},k_=/(\w+)(\])?(\[|\.)?/g;ml=class{constructor(t,n){this.seq=[],this.map={};let i=t.getProgramParameter(n,t.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){let o=t.getActiveUniform(n,r),l=t.getUniformLocation(n,o.name);HD(o,l,this)}let s=[],a=[];for(let r of this.seq)r.type===t.SAMPLER_2D_SHADOW||r.type===t.SAMPLER_CUBE_SHADOW||r.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(r):a.push(r);s.length>0&&(this.seq=s.concat(a))}setValue(t,n,i,s){let a=this.map[n];a!==void 0&&a.setValue(t,i,s)}setOptional(t,n,i){let s=n[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,n,i,s){for(let a=0,r=n.length;a!==r;++a){let o=n[a],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,n){let i=[];for(let s=0,a=t.length;s!==a;++s){let r=t[s];r.id in n&&i.push(r)}return i}};VD=37297,GD=0;pE=new qt;qD={[p_]:"Linear",[m_]:"Reinhard",[g_]:"Cineon",[__]:"ACESFilmic",[y_]:"AgX",[x_]:"Neutral",[v_]:"Custom"};fp=new N;jD=/^[ \t]*#include +<([\w\d./]+)>/gm;$D=new Map;eU=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;iU={[ou]:"SHADOWMAP_TYPE_PCF",[ll]:"SHADOWMAP_TYPE_VSM"};aU={[Ba]:"ENVMAP_TYPE_CUBE",[wr]:"ENVMAP_TYPE_CUBE",[lu]:"ENVMAP_TYPE_CUBE_UV"};oU={[wr]:"ENVMAP_MODE_REFRACTION"};cU={[d_]:"ENVMAP_BLENDING_MULTIPLY",[U1]:"ENVMAP_BLENDING_MIX",[L1]:"ENVMAP_BLENDING_ADD"};dU=0,K_=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,n,i){let s=this._getShaderCacheForMaterial(t);return s.has(n)===!1&&(s.add(n),n.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(t){let n=this.materialCache.get(t);for(let i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let n=this.materialCache,i=n.get(t);return i===void 0&&(i=new Set,n.set(t,i)),i}_getShaderStage(t){let n=this.shaderCache,i=n.get(t);return i===void 0&&(i=new Q_(t),n.set(t,i)),i}},Q_=class{constructor(t){this.id=dU++,this.code=t,this.usedTimes=0}};SU=0;TU=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,AU=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,wU=[new N(1,0,0),new N(-1,0,0),new N(0,1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1)],CU=[new N(0,-1,0),new N(0,-1,0),new N(0,0,1),new N(0,0,-1),new N(0,-1,0),new N(0,-1,0)],bE=new Ie,_u=new N,X_=new N;LU=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,OU=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,j_=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,n){if(this.texture===null){let i=new Vc(t.texture);(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let n=t.cameras[0].viewport,i=new li({vertexShader:LU,fragmentShader:OU,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Wn(new tu(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},$_=class extends us{constructor(t,n){super();let i=this,s=null,a=1,r=null,o="local-floor",l=1,c=null,h=null,p=null,u=null,d=null,g=null,b=typeof XRWebGLBinding<"u",_=new j_,f={},v=n.getContextAttributes(),y=null,m=null,M=[],E=[],w=new gt,x=null,A=null,R=new En;R.viewport=new Ge;let U=new En;U.viewport=new Ge;let B=[R,U],V=new Md,L=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let tt=M[K];return tt===void 0&&(tt=new $o,M[K]=tt),tt.getTargetRaySpace()},this.getControllerGrip=function(K){let tt=M[K];return tt===void 0&&(tt=new $o,M[K]=tt),tt.getGripSpace()},this.getHand=function(K){let tt=M[K];return tt===void 0&&(tt=new $o,M[K]=tt),tt.getHandSpace()};function J(K){let tt=E.indexOf(K.inputSource);if(tt===-1)return;let mt=M[tt];mt!==void 0&&(mt.update(K.inputSource,K.frame,c||r),mt.dispatchEvent({type:K.type,data:K.inputSource}))}function q(){s.removeEventListener("select",J),s.removeEventListener("selectstart",J),s.removeEventListener("selectend",J),s.removeEventListener("squeeze",J),s.removeEventListener("squeezestart",J),s.removeEventListener("squeezeend",J),s.removeEventListener("end",q),s.removeEventListener("inputsourceschange",at);for(let K=0;K<M.length;K++){let tt=E[K];tt!==null&&(E[K]=null,M[K].disconnect(tt))}L=null,F=null,_.reset();for(let K in f)delete f[K];if(t.setRenderTarget(y),d=null,u=null,p=null,s=null,m=null,ne.stop(),i.isPresenting=!1,t.setPixelRatio(x),t.setSize(w.width,w.height,!1),A!==null){let K=A.camera;K.fov=A.fov,K.zoom=A.zoom,K.updateProjectionMatrix(),A=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){a=K,i.isPresenting===!0&&Ft("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){o=K,i.isPresenting===!0&&Ft("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(K){c=K},this.getBaseLayer=function(){return u!==null?u:d},this.getBinding=function(){return p===null&&b&&(p=new XRWebGLBinding(s,n)),p},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(K){if(s=K,s!==null){if(y=t.getRenderTarget(),s.addEventListener("select",J),s.addEventListener("selectstart",J),s.addEventListener("selectend",J),s.addEventListener("squeeze",J),s.addEventListener("squeezestart",J),s.addEventListener("squeezeend",J),s.addEventListener("end",q),s.addEventListener("inputsourceschange",at),v.xrCompatible!==!0&&await n.makeXRCompatible(),x=t.getPixelRatio(),t.getSize(w),b&&"createProjectionLayer"in XRWebGLBinding.prototype){let mt=null,Bt=null,vt=null;v.depth&&(vt=v.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,mt=v.stencil?Fa:cs,Bt=v.stencil?hl:Hi);let Ot={colorFormat:n.RGBA8,depthFormat:vt,scaleFactor:a};p=this.getBinding(),u=p.createProjectionLayer(Ot),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),m=new kn(u.textureWidth,u.textureHeight,{format:Ai,type:ui,depthTexture:new Ua(u.textureWidth,u.textureHeight,Bt,void 0,void 0,void 0,void 0,void 0,void 0,mt),stencilBuffer:v.stencil,colorSpace:t.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let mt={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:a};d=new XRWebGLLayer(s,n,mt),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),m=new kn(d.framebufferWidth,d.framebufferHeight,{format:Ai,type:ui,colorSpace:t.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}m.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await s.requestReferenceSpace(o),ne.setContext(s),ne.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function at(K){for(let tt=0;tt<K.removed.length;tt++){let mt=K.removed[tt],Bt=E.indexOf(mt);Bt>=0&&(E[Bt]=null,M[Bt].disconnect(mt))}for(let tt=0;tt<K.added.length;tt++){let mt=K.added[tt],Bt=E.indexOf(mt);if(Bt===-1){for(let Ot=0;Ot<M.length;Ot++)if(Ot>=E.length){E.push(mt),Bt=Ot;break}else if(E[Ot]===null){E[Ot]=mt,Bt=Ot;break}if(Bt===-1)break}let vt=M[Bt];vt&&vt.connect(mt)}}let Y=new N,$=new N;function et(K,tt,mt){Y.setFromMatrixPosition(tt.matrixWorld),$.setFromMatrixPosition(mt.matrixWorld);let Bt=Y.distanceTo($),vt=tt.projectionMatrix.elements,Ot=mt.projectionMatrix.elements,de=vt[14]/(vt[10]-1),it=vt[14]/(vt[10]+1),ot=(vt[9]+1)/vt[5],lt=(vt[9]-1)/vt[5],ut=(vt[8]-1)/vt[0],dt=(Ot[8]+1)/Ot[0],zt=de*ut,Rt=de*dt,Ht=Bt/(-ut+dt),Xt=Ht*-ut;if(tt.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(Xt),K.translateZ(Ht),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),vt[10]===-1)K.projectionMatrix.copy(tt.projectionMatrix),K.projectionMatrixInverse.copy(tt.projectionMatrixInverse);else{let D=de+Ht,ue=it+Ht,Kt=zt-Xt,C=Rt+(Bt-Xt),S=ot*it/ue*D,z=lt*it/ue*D;K.projectionMatrix.makePerspective(Kt,C,S,z,D,ue),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function Ct(K,tt){tt===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(tt.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(s===null)return;let tt=K.near,mt=K.far;_.texture!==null&&(_.depthNear>0&&(tt=_.depthNear),_.depthFar>0&&(mt=_.depthFar)),V.near=U.near=R.near=tt,V.far=U.far=R.far=mt,(L!==V.near||F!==V.far)&&(s.updateRenderState({depthNear:V.near,depthFar:V.far}),L=V.near,F=V.far),V.layers.mask=K.layers.mask|6,R.layers.mask=V.layers.mask&-5,U.layers.mask=V.layers.mask&-3;let Bt=K.parent,vt=V.cameras;Ct(V,Bt);for(let Ot=0;Ot<vt.length;Ot++)Ct(vt[Ot],Bt);vt.length===2?et(V,R,U):V.projectionMatrix.copy(R.projectionMatrix),A===null&&K.isPerspectiveCamera&&(A={camera:K,fov:K.fov,zoom:K.zoom}),Mt(K,V,Bt)};function Mt(K,tt,mt){mt===null?K.matrix.copy(tt.matrixWorld):(K.matrix.copy(mt.matrixWorld),K.matrix.invert(),K.matrix.multiply(tt.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(tt.projectionMatrix),K.projectionMatrixInverse.copy(tt.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=Qo*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return V},this.getFoveation=function(){if(!(u===null&&d===null))return l},this.setFoveation=function(K){l=K,u!==null&&(u.fixedFoveation=K),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=K)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(V)},this.getCameraTexture=function(K){return f[K]};let ee=null;function Zt(K,tt){if(h=tt.getViewerPose(c||r),g=tt,h!==null){let mt=h.views;d!==null&&(t.setRenderTargetFramebuffer(m,d.framebuffer),t.setRenderTarget(m));let Bt=!1;mt.length!==V.cameras.length&&(V.cameras.length=0,Bt=!0);for(let it=0;it<mt.length;it++){let ot=mt[it],lt=null;if(d!==null)lt=d.getViewport(ot);else{let dt=p.getViewSubImage(u,ot);lt=dt.viewport,it===0&&(t.setRenderTargetTextures(m,dt.colorTexture,dt.depthStencilTexture),t.setRenderTarget(m))}let ut=B[it];ut===void 0&&(ut=new En,ut.layers.enable(it),ut.viewport=new Ge,B[it]=ut),ut.matrix.fromArray(ot.transform.matrix),ut.matrix.decompose(ut.position,ut.quaternion,ut.scale),ut.projectionMatrix.fromArray(ot.projectionMatrix),ut.projectionMatrixInverse.copy(ut.projectionMatrix).invert(),ut.viewport.set(lt.x,lt.y,lt.width,lt.height),it===0&&(V.matrix.copy(ut.matrix),V.matrix.decompose(V.position,V.quaternion,V.scale)),Bt===!0&&V.cameras.push(ut)}let vt=s.enabledFeatures;if(vt&&vt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&b){p=i.getBinding();let it=p.getDepthInformation(mt[0]);it&&it.isValid&&it.texture&&_.init(it,s.renderState)}if(vt&&vt.includes("camera-access")&&b){t.state.unbindTexture(),p=i.getBinding();for(let it=0;it<mt.length;it++){let ot=mt[it].camera;if(ot){let lt=f[ot];lt||(lt=new Vc,f[ot]=lt);let ut=p.getCameraImage(ot);lt.sourceTexture=ut}}}}for(let mt=0;mt<M.length;mt++){let Bt=E[mt],vt=M[mt];Bt!==null&&vt!==void 0&&vt.update(Bt,tt,c||r)}ee&&ee(K,tt),tt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:tt}),g=null}let ne=new EE;ne.setAnimationLoop(Zt),this.setAnimationLoop=function(K){ee=K},this.dispose=function(){}}},IU=new Ie,NE=new qt;NE.set(-1,0,0,0,1,0,0,0,1);zU=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),ms=null;mp=class{constructor(t={}){let{canvas:n=W1(),context:i=null,depth:s=!0,stencil:a=!1,alpha:r=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:u=!1,outputBufferType:d=ui}=t;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=r;let b=d,_=new Set([Ud,Dd,Nd]),f=new Set([ui,Hi,ul,hl,Cd,Rd]),v=new Uint32Array(4),y=new Int32Array(4),m=new N,M=null,E=null,w=[],x=[],A=null;this.domElement=n,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Fi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let R=this,U=!1,B=null,V=null,L=null,F=null;this._outputColorSpace=ri;let J=0,q=0,at=null,Y=-1,$=null,et=new Ge,Ct=new Ge,Mt=null,ee=new ce(0),Zt=0,ne=n.width,K=n.height,tt=1,mt=null,Bt=null,vt=new Ge(0,0,ne,K),Ot=new Ge(0,0,ne,K),de=!1,it=new Fc,ot=!1,lt=!1,ut=new Ie,dt=new N,zt=new Ge,Rt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ht=!1;function Xt(){return at===null?tt:1}let D=i;function ue(T,O){return n.getContext(T,O)}let Kt,C,S,z,X,P,Q,st,H,Z,ht,Et,ft,ct,Tt,Pt,Yt,I,pt,j,_t,bt,rt;try{let T={alpha:!0,depth:s,stencil:a,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:p};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${bd}`),n.addEventListener("webglcontextlost",Re,!1),n.addEventListener("webglcontextrestored",ge,!1),n.addEventListener("webglcontextcreationerror",wi,!1),D===null){let O="webgl2";if(D=ue(O,T),D===null)throw ue(O)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}It()}catch(T){throw n.removeEventListener("webglcontextlost",Re,!1),n.removeEventListener("webglcontextrestored",ge,!1),n.removeEventListener("webglcontextcreationerror",wi,!1),Vt("WebGLRenderer: "+T.message),T}function It(){Kt=new qN(D),Kt.init(),_t=new UU(D,Kt),C=new PN(D,Kt,t,_t),S=new NU(D,Kt),C.reversedDepthBuffer&&u&&S.buffers.depth.setReversed(!0),V=D.createFramebuffer(),L=D.createFramebuffer(),F=D.createFramebuffer(),z=new JN(D),X=new gU,P=new DU(D,Kt,S,X,C,_t,z),Q=new WN(R),st=new QR(D),bt=new ON(D,st),H=new YN(D,st,z,bt),Z=new QN(D,H,st,bt,z),I=new KN(D,C,P),Tt=new BN(X),ht=new mU(R,Q,Kt,C,bt,Tt),Et=new PU(R,X),ft=new vU,ct=new EU(Kt),Yt=new LN(R,Q,S,Z,g,l),Pt=new RU(R,Z,C),rt=new BU(D,z,C,S),pt=new IN(D,Kt,z),j=new ZN(D,Kt,z),z.programs=ht.programs,R.capabilities=C,R.extensions=Kt,R.properties=X,R.renderLists=ft,R.shadowMap=Pt,R.state=S,R.info=z}b!==ui&&(A=new $N(b,n.width,n.height,o,s,a));let Ut=new $_(R,D);this.xr=Ut,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){let T=Kt.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){let T=Kt.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return tt},this.setPixelRatio=function(T){T!==void 0&&(tt=T,this.setSize(ne,K,!1))},this.getSize=function(T){return T.set(ne,K)},this.setSize=function(T,O,W=!0){if(Ut.isPresenting){Ft("WebGLRenderer: Can't change size while VR device is presenting.");return}ne=T,K=O,n.width=Math.floor(T*tt),n.height=Math.floor(O*tt),W===!0&&(n.style.width=T+"px",n.style.height=O+"px"),A!==null&&A.setSize(n.width,n.height),this.setViewport(0,0,T,O)},this.getDrawingBufferSize=function(T){return T.set(ne*tt,K*tt).floor()},this.setDrawingBufferSize=function(T,O,W){ne=T,K=O,tt=W,n.width=Math.floor(T*W),n.height=Math.floor(O*W),this.setViewport(0,0,T,O)},this.setEffects=function(T){if(b===ui){Vt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let O=0;O<T.length;O++)if(T[O].isOutputPass===!0){Ft("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy(et)},this.getViewport=function(T){return T.copy(vt)},this.setViewport=function(T,O,W,G){T.isVector4?vt.set(T.x,T.y,T.z,T.w):vt.set(T,O,W,G),S.viewport(et.copy(vt).multiplyScalar(tt).round())},this.getScissor=function(T){return T.copy(Ot)},this.setScissor=function(T,O,W,G){T.isVector4?Ot.set(T.x,T.y,T.z,T.w):Ot.set(T,O,W,G),S.scissor(Ct.copy(Ot).multiplyScalar(tt).round())},this.getScissorTest=function(){return de},this.setScissorTest=function(T){S.setScissorTest(de=T)},this.setOpaqueSort=function(T){mt=T},this.setTransparentSort=function(T){Bt=T},this.getClearColor=function(T){return T.copy(Yt.getClearColor())},this.setClearColor=function(){Yt.setClearColor(...arguments)},this.getClearAlpha=function(){return Yt.getClearAlpha()},this.setClearAlpha=function(){Yt.setClearAlpha(...arguments)},this.clear=function(T=!0,O=!0,W=!0){let G=0;if(T){let k=!1;if(at!==null){let St=at.texture.format;k=_.has(St)}if(k){let St=at.texture.type,wt=f.has(St),xt=Yt.getClearColor(),Nt=Yt.getClearAlpha(),Lt=xt.r,Qt=xt.g,ie=xt.b;wt?(v[0]=Lt,v[1]=Qt,v[2]=ie,v[3]=Nt,D.clearBufferuiv(D.COLOR,0,v)):(y[0]=Lt,y[1]=Qt,y[2]=ie,y[3]=Nt,D.clearBufferiv(D.COLOR,0,y))}else G|=D.COLOR_BUFFER_BIT}O&&(G|=D.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),W&&(G|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G!==0&&D.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(T){T.setRenderer(this),B=T},this.dispose=function(){n.removeEventListener("webglcontextlost",Re,!1),n.removeEventListener("webglcontextrestored",ge,!1),n.removeEventListener("webglcontextcreationerror",wi,!1),Yt.dispose(),ft.dispose(),ct.dispose(),X.dispose(),Q.dispose(),Z.dispose(),bt.dispose(),rt.dispose(),ht.dispose(),Ut.dispose(),Ut.removeEventListener("sessionstart",nv),Ut.removeEventListener("sessionend",iv),Va.stop()};function Re(T){T.preventDefault(),D_("WebGLRenderer: Context Lost."),U=!0}function ge(){D_("WebGLRenderer: Context Restored."),U=!1;let T=z.autoReset,O=Pt.enabled,W=Pt.autoUpdate,G=Pt.needsUpdate,k=Pt.type;It(),z.autoReset=T,Pt.enabled=O,Pt.autoUpdate=W,Pt.needsUpdate=G,Pt.type=k}function wi(T){Vt("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function ki(T){let O=T.target;O.removeEventListener("dispose",ki),WE(O)}function WE(T){qE(T),X.remove(T)}function qE(T){let O=X.get(T).programs;O!==void 0&&(O.forEach(function(W){ht.releaseProgram(W)}),T.isShaderMaterial&&ht.releaseShaderCache(T))}this.renderBufferDirect=function(T,O,W,G,k,St){O===null&&(O=Rt);let wt=k.isMesh&&k.matrixWorld.determinantAffine()<0,xt=JE(T,O,W,G,k);S.setMaterial(G,wt);let Nt=W.index,Lt=1;if(G.wireframe===!0){if(Nt=H.getWireframeAttribute(W),Nt===void 0)return;Lt=2}let Qt=W.drawRange,ie=W.attributes.position,Dt=Qt.start*Lt,_e=(Qt.start+Qt.count)*Lt;St!==null&&(Dt=Math.max(Dt,St.start*Lt),_e=Math.min(_e,(St.start+St.count)*Lt)),Nt!==null?(Dt=Math.max(Dt,0),_e=Math.min(_e,Nt.count)):ie!=null&&(Dt=Math.max(Dt,0),_e=Math.min(_e,ie.count));let Ye=_e-Dt;if(Ye<0||Ye===1/0)return;bt.setup(k,G,xt,W,Nt);let Pe,Ae=pt;if(Nt!==null&&(Pe=st.get(Nt),Ae=j,Ae.setIndex(Pe)),k.isMesh)G.wireframe===!0?(S.setLineWidth(G.wireframeLinewidth*Xt()),Ae.setMode(D.LINES)):Ae.setMode(D.TRIANGLES);else if(k.isLine){let vn=G.linewidth;vn===void 0&&(vn=1),S.setLineWidth(vn*Xt()),k.isLineSegments?Ae.setMode(D.LINES):k.isLineLoop?Ae.setMode(D.LINE_LOOP):Ae.setMode(D.LINE_STRIP)}else k.isPoints?Ae.setMode(D.POINTS):k.isSprite&&Ae.setMode(D.TRIANGLES);if(k.isBatchedMesh)if(Kt.get("WEBGL_multi_draw"))Ae.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{let vn=k._multiDrawStarts,At=k._multiDrawCounts,An=k._multiDrawCount,he=Nt?st.get(Nt).bytesPerElement:1,hi=X.get(G).currentProgram.getUniforms();for(let Xi=0;Xi<An;Xi++)hi.setValue(D,"_gl_DrawID",Xi),Ae.render(vn[Xi]/he,At[Xi])}else if(k.isInstancedMesh)Ae.renderInstances(Dt,Ye,k.count);else if(W.isInstancedBufferGeometry){let vn=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,At=Math.min(W.instanceCount,vn);Ae.renderInstances(Dt,Ye,At)}else Ae.render(Dt,Ye)};function ev(T,O,W,G){B!==null&&T.isNodeMaterial&&B.setObject(G,T),ot===!0&&Tt.setState(T,W,!1),T.transparent===!0&&T.side===ds&&T.forceSinglePass===!1?(T.side=Ln,T.needsUpdate=!0,Su(T,O,G),T.side=Pa,T.needsUpdate=!0,Su(T,O,G),T.side=ds):Su(T,O,G)}this.compile=function(T,O,W=null){W===null&&(W=T),B!==null&&B.renderStart(T,O,W),E=ct.get(W),E.init(O),x.push(E),W.traverseVisible(function(k){k.isLight&&k.layers.test(O.layers)&&(E.pushLight(k),k.castShadow&&E.pushShadow(k))}),T!==W&&T.traverseVisible(function(k){k.isLight&&k.layers.test(O.layers)&&(E.pushLight(k),k.castShadow&&E.pushShadow(k))}),E.setupLights(),B!==null&&B.updateLights(E.state.lightsArray),lt=this.localClippingEnabled,ot=Tt.init(this.clippingPlanes,lt),ot===!0&&Tt.setGlobalState(this.clippingPlanes,O),B!==null&&Pt.render(E.state.shadowsArray,W,O);let G=new Set;return T.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;let St=k.material;if(St)if(Array.isArray(St))for(let wt=0;wt<St.length;wt++){let xt=St[wt];ev(xt,W,O,k),G.add(xt)}else ev(St,W,O,k),G.add(St)}),E=x.pop(),B!==null&&B.renderEnd(),G},this.compileAsync=function(T,O,W=null){let G=this.compile(T,O,W);return new Promise(k=>{function St(){if(G.forEach(function(wt){let Nt=X.get(wt).currentProgram;(Nt===void 0||Nt.isReady())&&G.delete(wt)}),G.size===0){k(T);return}setTimeout(St,10)}Kt.get("KHR_parallel_shader_compile")!==null?St():setTimeout(St,10)})};let xp=null;function YE(T){xp&&xp(T)}function nv(){Va.stop()}function iv(){Va.start()}let Va=new EE;Va.setAnimationLoop(YE),typeof self<"u"&&Va.setContext(self),this.setAnimationLoop=function(T){xp=T,Ut.setAnimationLoop(T),T===null?Va.stop():Va.start()},Ut.addEventListener("sessionstart",nv),Ut.addEventListener("sessionend",iv),this.render=function(T,O){if(O!==void 0&&O.isCamera!==!0){Vt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(U===!0)return;B!==null&&B.renderStart(T,O);let W=Ut.enabled===!0&&Ut.isPresenting===!0,G=A!==null&&(at===null||W)&&A.begin(R,at);if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),Ut.enabled===!0&&Ut.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(Ut.cameraAutoUpdate===!0&&Ut.updateCamera(O),O=Ut.getCamera()),T.isScene===!0&&T.onBeforeRender(R,T,O,at),E=ct.get(T,x.length),E.init(O),E.state.textureUnits=P.getTextureUnits(),x.push(E),ut.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),it.setFromProjectionMatrix(ut,zi,O.reversedDepth),lt=this.localClippingEnabled,ot=Tt.init(this.clippingPlanes,lt),M=ft.get(T,w.length),M.init(),w.push(M),Ut.enabled===!0&&Ut.isPresenting===!0){let wt=R.xr.getDepthSensingMesh();wt!==null&&Sp(wt,O,-1/0,R.sortObjects)}Sp(T,O,0,R.sortObjects),M.finish(),B!==null&&B.updateLights(E.state.lightsArray),R.sortObjects===!0&&M.sort(mt,Bt),Ht=Ut.enabled===!1||Ut.isPresenting===!1||Ut.hasDepthSensing()===!1,Ht&&Yt.addToRenderList(M,T),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),ot===!0&&Tt.beginShadows();let k=E.state.shadowsArray;if(Pt.render(k,T,O),ot===!0&&Tt.endShadows(),(G&&A.hasRenderPass())===!1){let wt=M.opaque,xt=M.transmissive;if(E.setupLights(),O.isArrayCamera){let Nt=O.cameras;if(xt.length>0)for(let Lt=0,Qt=Nt.length;Lt<Qt;Lt++){let ie=Nt[Lt];av(wt,xt,T,ie)}Ht&&Yt.render(T);for(let Lt=0,Qt=Nt.length;Lt<Qt;Lt++){let ie=Nt[Lt];sv(M,T,ie,ie.viewport)}}else xt.length>0&&av(wt,xt,T,O),Ht&&Yt.render(T),sv(M,T,O)}at!==null&&q===0&&(P.updateMultisampleRenderTarget(at),P.updateRenderTargetMipmap(at)),G&&A.end(R),T.isScene===!0&&T.onAfterRender(R,T,O),bt.resetDefaultState(),Y=-1,$=null,x.pop(),x.length>0?(E=x[x.length-1],P.setTextureUnits(E.state.textureUnits),ot===!0&&Tt.setGlobalState(R.clippingPlanes,E.state.camera)):E=null,w.pop(),w.length>0?M=w[w.length-1]:M=null,B!==null&&B.renderEnd()};function Sp(T,O,W,G){if(T.visible===!1)return;if(T.layers.test(O.layers)){if(T.isGroup)W=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(O);else if(T.isLightProbeGrid)E.pushLightProbeGrid(T);else if(T.isLight)E.pushLight(T),T.castShadow&&E.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||T.intersectsFrustum(it)){G&&zt.setFromMatrixPosition(T.matrixWorld).applyMatrix4(ut);let wt=Z.update(T),xt=T.material;xt.visible&&M.push(T,wt,xt,W,zt.z,null,O)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||T.intersectsFrustum(it))){let wt=Z.update(T),xt=T.material;if(G&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),zt.copy(T.boundingSphere.center)):(wt.boundingSphere===null&&wt.computeBoundingSphere(),zt.copy(wt.boundingSphere.center)),zt.applyMatrix4(T.matrixWorld).applyMatrix4(ut)),Array.isArray(xt)){let Nt=wt.groups;for(let Lt=0,Qt=Nt.length;Lt<Qt;Lt++){let ie=Nt[Lt],Dt=xt[ie.materialIndex];Dt&&Dt.visible&&M.push(T,wt,Dt,W,zt.z,ie,O)}}else xt.visible&&M.push(T,wt,xt,W,zt.z,null,O)}}let St=T.children;for(let wt=0,xt=St.length;wt<xt;wt++)Sp(St[wt],O,W,G)}function sv(T,O,W,G){let{opaque:k,transmissive:St,transparent:wt}=T;E.setupLightsView(W),ot===!0&&Tt.setGlobalState(R.clippingPlanes,W),G&&S.viewport(et.copy(G)),k.length>0&&xu(k,O,W),St.length>0&&xu(St,O,W),wt.length>0&&xu(wt,O,W),S.buffers.depth.setTest(!0),S.buffers.depth.setMask(!0),S.buffers.color.setMask(!0),S.setPolygonOffset(!1)}function av(T,O,W,G){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[G.id]===void 0){let Dt=Kt.has("EXT_color_buffer_half_float")||Kt.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[G.id]=new kn(1,1,{generateMipmaps:!0,type:Dt?Gi:ui,minFilter:za,samples:Math.max(4,C.samples),stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:oe.workingColorSpace})}let St=E.state.transmissionRenderTarget[G.id],wt=G.viewport||et;St.setSize(wt.z*R.transmissionResolutionScale,wt.w*R.transmissionResolutionScale);let xt=R.getRenderTarget(),Nt=R.getActiveCubeFace(),Lt=R.getActiveMipmapLevel();R.setRenderTarget(St),R.getClearColor(ee),Zt=R.getClearAlpha(),Zt<1&&R.setClearColor(16777215,.5),R.clear(),Ht&&Yt.render(W);let Qt=R.toneMapping;R.toneMapping=Fi;let ie=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),E.setupLightsView(G),ot===!0&&Tt.setGlobalState(R.clippingPlanes,G),xu(T,W,G),P.updateMultisampleRenderTarget(St),P.updateRenderTargetMipmap(St),Kt.has("WEBGL_multisampled_render_to_texture")===!1){let Dt=!1;for(let _e=0,Ye=O.length;_e<Ye;_e++){let Pe=O[_e],{object:Ae,geometry:vn,material:At,group:An}=Pe;if(At.side===ds&&Ae.layers.test(G.layers)){let he=At.side;At.side=Ln,At.needsUpdate=!0,rv(Ae,W,G,vn,At,An),At.side=he,At.needsUpdate=!0,Dt=!0}}Dt===!0&&(P.updateMultisampleRenderTarget(St),P.updateRenderTargetMipmap(St))}R.setRenderTarget(xt,Nt,Lt),R.setClearColor(ee,Zt),ie!==void 0&&(G.viewport=ie),R.toneMapping=Qt}function xu(T,O,W){let G=O.isScene===!0?O.overrideMaterial:null;for(let k=0,St=T.length;k<St;k++){let wt=T[k],{object:xt,geometry:Nt,group:Lt}=wt,Qt=wt.material;Qt.allowOverride===!0&&G!==null&&(Qt=G),xt.layers.test(W.layers)&&rv(xt,O,W,Nt,Qt,Lt)}}function rv(T,O,W,G,k,St){B!==null&&k.isNodeMaterial&&B.setObject(T,k),T.onBeforeRender(R,O,W,G,k,St),T.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),k.onBeforeRender(R,O,W,G,T,St),k.transparent===!0&&k.side===ds&&k.forceSinglePass===!1?(k.side=Ln,k.needsUpdate=!0,R.renderBufferDirect(W,O,G,k,T,St),k.side=Pa,k.needsUpdate=!0,R.renderBufferDirect(W,O,G,k,T,St),k.side=ds):R.renderBufferDirect(W,O,G,k,T,St),T.onAfterRender(R,O,W,G,k,St)}function Su(T,O,W){O.isScene!==!0&&(O=Rt);let G=X.get(T),k=E.state.lights,St=E.state.shadowsArray,wt=k.state.version,xt=ht.getParameters(T,k.state,St,O,W,E.state.lightProbeGridArray),Nt=ht.getProgramCacheKey(xt),Lt=G.programs;G.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?O.environment:null,G.fog=O.fog;let Qt=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;G.envMap=Q.get(T.envMap||G.environment,Qt),G.envMapRotation=G.environment!==null&&T.envMap===null?O.environmentRotation:T.envMapRotation,Lt===void 0&&(T.addEventListener("dispose",ki),Lt=new Map,G.programs=Lt);let ie=Lt.get(Nt);if(ie!==void 0){if(G.currentProgram===ie&&G.lightsStateVersion===wt)return lv(T,xt),ie}else xt.uniforms=ht.getUniforms(T),B!==null&&T.isNodeMaterial&&B.build(T,W,xt),T.onBeforeCompile(xt,R),ie=ht.acquireProgram(xt,Nt),Lt.set(Nt,ie),G.uniforms=xt.uniforms;let Dt=G.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Dt.clippingPlanes=Tt.uniform),lv(T,xt),G.needsLights=QE(T),G.lightsStateVersion=wt,G.needsLights&&(Dt.ambientLightColor.value=k.state.ambient,Dt.lightProbe.value=k.state.probe,Dt.sunLights.value=k.state.sun,Dt.sunLightShadows.value=k.state.sunShadow,Dt.directionalLights.value=k.state.directional,Dt.directionalLightShadows.value=k.state.directionalShadow,Dt.spotLights.value=k.state.spot,Dt.spotLightShadows.value=k.state.spotShadow,Dt.rectAreaLights.value=k.state.rectArea,Dt.ltc_1.value=k.state.rectAreaLTC1,Dt.ltc_2.value=k.state.rectAreaLTC2,Dt.pointLights.value=k.state.point,Dt.pointLightShadows.value=k.state.pointShadow,Dt.hemisphereLights.value=k.state.hemi,Dt.sunShadowMatrix.value=k.state.sunShadowMatrix,Dt.sunShadowCascade.value=k.state.sunShadowCascade,Dt.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Dt.spotLightMatrix.value=k.state.spotLightMatrix,Dt.spotLightMap.value=k.state.spotLightMap,Dt.pointShadowMatrix.value=k.state.pointShadowMatrix),G.lightProbeGrid=E.state.lightProbeGridArray.length>0,G.currentProgram=ie,G.uniformsList=null,ie}function ov(T){if(T.uniformsList===null){let O=T.currentProgram.getUniforms();T.uniformsList=ml.seqWithValue(O.seq,T.uniforms)}return T.uniformsList}function lv(T,O){let W=X.get(T);W.outputColorSpace=O.outputColorSpace,W.batching=O.batching,W.batchingColor=O.batchingColor,W.instancing=O.instancing,W.instancingColor=O.instancingColor,W.instancingMorph=O.instancingMorph,W.skinning=O.skinning,W.morphTargets=O.morphTargets,W.morphNormals=O.morphNormals,W.morphColors=O.morphColors,W.morphTargetsCount=O.morphTargetsCount,W.numClippingPlanes=O.numClippingPlanes,W.numIntersection=O.numClipIntersection,W.vertexAlphas=O.vertexAlphas,W.vertexTangents=O.vertexTangents,W.toneMapping=O.toneMapping}function ZE(T,O){if(T.length===0)return null;if(T.length===1)return T[0].texture!==null?T[0]:null;m.setFromMatrixPosition(O.matrixWorld);for(let W=0,G=T.length;W<G;W++){let k=T[W];if(k.texture!==null&&k.boundingBox.containsPoint(m))return k}return null}function JE(T,O,W,G,k){O.isScene!==!0&&(O=Rt),P.resetTextureUnits();let St=O.fog,wt=G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial?O.environment:null,xt=at===null?R.outputColorSpace:at.isXRRenderTarget===!0?at.texture.colorSpace:oe.workingColorSpace,Nt=G.isMeshStandardMaterial||G.isMeshLambertMaterial&&!G.envMap||G.isMeshPhongMaterial&&!G.envMap,Lt=Q.get(G.envMap||wt,Nt),Qt=G.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,ie=!!W.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Dt=!!W.morphAttributes.position,_e=!!W.morphAttributes.normal,Ye=!!W.morphAttributes.color,Pe=Fi;G.toneMapped&&(at===null||at.isXRRenderTarget===!0)&&(Pe=R.toneMapping);let Ae=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,vn=Ae!==void 0?Ae.length:0,At=X.get(G),An=E.state.lights;if(ot===!0&&(lt===!0||T!==$)){let Ne=T===$&&G.id===Y;Tt.setState(G,T,Ne)}let he=!1;G.version===At.__version?(At.needsLights&&At.lightsStateVersion!==An.state.version||At.outputColorSpace!==xt||k.isBatchedMesh&&At.batching===!1||!k.isBatchedMesh&&At.batching===!0||k.isBatchedMesh&&At.batchingColor===!0&&k._colorsTexture===null||k.isBatchedMesh&&At.batchingColor===!1&&k._colorsTexture!==null||k.isInstancedMesh&&At.instancing===!1||!k.isInstancedMesh&&At.instancing===!0||k.isSkinnedMesh&&At.skinning===!1||!k.isSkinnedMesh&&At.skinning===!0||k.isInstancedMesh&&At.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&At.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&At.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&At.instancingMorph===!1&&k.morphTexture!==null||At.envMap!==Lt||G.fog===!0&&At.fog!==St||At.numClippingPlanes!==void 0&&(At.numClippingPlanes!==Tt.numPlanes||At.numIntersection!==Tt.numIntersection)||At.vertexAlphas!==Qt||At.vertexTangents!==ie||At.morphTargets!==Dt||At.morphNormals!==_e||At.morphColors!==Ye||At.toneMapping!==Pe||At.morphTargetsCount!==vn||!!At.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(he=!0):(he=!0,At.__version=G.version);let hi=At.currentProgram;he===!0&&(hi=Su(G,O,k),B&&G.isNodeMaterial&&B.onUpdateProgram(G,hi,At));let Xi=!1,Ws=!1,Dr=!1,Ee=hi.getUniforms(),We=At.uniforms;if(S.useProgram(hi.program)&&(Xi=!0,Ws=!0,Dr=!0),G.id!==Y&&(Y=G.id,Ws=!0),At.needsLights){let Ne=ZE(E.state.lightProbeGridArray,k);At.lightProbeGrid!==Ne&&(At.lightProbeGrid=Ne,Ws=!0)}if(Xi||$!==T){S.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),Ee.setValue(D,"projectionMatrix",T.projectionMatrix),Ee.setValue(D,"viewMatrix",T.matrixWorldInverse);let Ys=Ee.map.cameraPosition;Ys!==void 0&&Ys.setValue(D,dt.setFromMatrixPosition(T.matrixWorld)),C.logarithmicDepthBuffer&&Ee.setValue(D,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&Ee.setValue(D,"isOrthographic",T.isOrthographicCamera===!0),$!==T&&($=T,Ws=!0,Dr=!0)}if(At.needsLights&&(An.state.sunShadowMap.length>0&&Ee.setValue(D,"sunShadowMap",An.state.sunShadowMap,P),An.state.directionalShadowMap.length>0&&Ee.setValue(D,"directionalShadowMap",An.state.directionalShadowMap,P),An.state.spotShadowMap.length>0&&Ee.setValue(D,"spotShadowMap",An.state.spotShadowMap,P),An.state.pointShadowMap.length>0&&Ee.setValue(D,"pointShadowMap",An.state.pointShadowMap,P)),k.isSkinnedMesh){Ee.setOptional(D,k,"bindMatrix"),Ee.setOptional(D,k,"bindMatrixInverse");let Ne=k.skeleton;Ne&&(Ne.boneTexture===null&&Ne.computeBoneTexture(),Ee.setValue(D,"boneTexture",Ne.boneTexture,P))}k.isBatchedMesh&&(Ee.setOptional(D,k,"batchingTexture"),Ee.setValue(D,"batchingTexture",k._matricesTexture,P),Ee.setOptional(D,k,"batchingIdTexture"),Ee.setValue(D,"batchingIdTexture",k._indirectTexture,P),Ee.setOptional(D,k,"batchingColorTexture"),k._colorsTexture!==null&&Ee.setValue(D,"batchingColorTexture",k._colorsTexture,P));let qs=W.morphAttributes;if((qs.position!==void 0||qs.normal!==void 0||qs.color!==void 0)&&I.update(k,W,hi),(Ws||At.receiveShadow!==k.receiveShadow)&&(At.receiveShadow=k.receiveShadow,Ee.setValue(D,"receiveShadow",k.receiveShadow)),(G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial)&&G.envMap===null&&O.environment!==null&&(We.envMapIntensity.value=O.environmentIntensity),We.dfgLUT!==void 0&&(We.dfgLUT.value=FU()),Ws){if(Ee.setValue(D,"toneMappingExposure",R.toneMappingExposure),At.needsLights&&KE(We,Dr),St&&G.fog===!0&&Et.refreshFogUniforms(We,St),Et.refreshMaterialUniforms(We,G,tt,K,E.state.transmissionRenderTarget[T.id]),At.needsLights&&At.lightProbeGrid){let Ne=At.lightProbeGrid;We.probesSH.value=Ne.texture,We.probesMin.value.copy(Ne.boundingBox.min),We.probesMax.value.copy(Ne.boundingBox.max),We.probesResolution.value.copy(Ne.resolution)}ml.upload(D,ov(At),We,P)}if(G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(ml.upload(D,ov(At),We,P),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&Ee.setValue(D,"center",k.center),Ee.setValue(D,"modelViewMatrix",k.modelViewMatrix),Ee.setValue(D,"normalMatrix",k.normalMatrix),Ee.setValue(D,"modelMatrix",k.matrixWorld),G.uniformsGroups!==void 0){let Ne=G.uniformsGroups;for(let Ys=0,Ur=Ne.length;Ys<Ur;Ys++){let uv=Ne[Ys];rt.update(uv,hi),rt.bind(uv,hi)}}return hi}function KE(T,O){T.ambientLightColor.needsUpdate=O,T.lightProbe.needsUpdate=O,T.sunLights.needsUpdate=O,T.sunLightShadows.needsUpdate=O,T.directionalLights.needsUpdate=O,T.directionalLightShadows.needsUpdate=O,T.pointLights.needsUpdate=O,T.pointLightShadows.needsUpdate=O,T.spotLights.needsUpdate=O,T.spotLightShadows.needsUpdate=O,T.rectAreaLights.needsUpdate=O,T.hemisphereLights.needsUpdate=O}function QE(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return J},this.getActiveMipmapLevel=function(){return q},this.getRenderTarget=function(){return at},this.setRenderTargetTextures=function(T,O,W){let G=X.get(T);G.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),X.get(T.texture).__webglTexture=O,X.get(T.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:W,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,O){let W=X.get(T);W.__webglFramebuffer=O,W.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(T,O=0,W=0){at=T,J=O,q=W;let G=null,k=!1,St=!1;if(T){let xt=X.get(T);if(xt.__useDefaultFramebuffer!==void 0){S.bindFramebuffer(D.FRAMEBUFFER,xt.__webglFramebuffer),et.copy(T.viewport),Ct.copy(T.scissor),Mt=T.scissorTest,S.viewport(et),S.scissor(Ct),S.setScissorTest(Mt),Y=-1;return}else if(xt.__webglFramebuffer===void 0)P.setupRenderTarget(T);else if(xt.__hasExternalTextures)P.rebindTextures(T,X.get(T.texture).__webglTexture,X.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){let Qt=T.depthTexture;if(xt.__boundDepthTexture!==Qt){if(Qt!==null&&X.has(Qt)&&(T.width!==Qt.image.width||T.height!==Qt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");P.setupDepthRenderbuffer(T)}}let Nt=T.texture;(Nt.isData3DTexture||Nt.isDataArrayTexture||Nt.isCompressedArrayTexture)&&(St=!0);let Lt=X.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Lt[O])?G=Lt[O][W]:G=Lt[O],k=!0):T.samples>0&&P.useMultisampledRTT(T)===!1?G=X.get(T).__webglMultisampledFramebuffer:Array.isArray(Lt)?G=Lt[W]:G=Lt,et.copy(T.viewport),Ct.copy(T.scissor),Mt=T.scissorTest}else et.copy(vt).multiplyScalar(tt).floor(),Ct.copy(Ot).multiplyScalar(tt).floor(),Mt=de;if(W!==0&&(G=V),S.bindFramebuffer(D.FRAMEBUFFER,G)&&S.drawBuffers(T,G),S.viewport(et),S.scissor(Ct),S.setScissorTest(Mt),k){let xt=X.get(T.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+O,xt.__webglTexture,W)}else if(St){let xt=O;for(let Nt=0;Nt<T.textures.length;Nt++){let Lt=X.get(T.textures[Nt]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+Nt,Lt.__webglTexture,W,xt)}}else if(T!==null&&W!==0){let xt=X.get(T.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,xt.__webglTexture,W)}Y=-1};function cv(T){let O=X.get(T);return(O.__readFormat!==T.format||O.__readType!==T.type)&&(O.__readFormat=T.format,O.__readType=T.type,O.__formatReadable=C.textureFormatReadable(T.format),O.__typeReadable=C.textureTypeReadable(T.type)),O}this.readRenderTargetPixels=function(T,O,W,G,k,St,wt,xt=0){if(!(T&&T.isWebGLRenderTarget)){Vt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Nt=X.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&wt!==void 0&&(Nt=Nt[wt]),Nt){S.bindFramebuffer(D.FRAMEBUFFER,Nt);try{let Lt=T.textures[xt],Qt=Lt.format,ie=Lt.type;T.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+xt);let Dt=cv(Lt);if(Dt.__formatReadable===!1){Vt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Dt.__typeReadable===!1){Vt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=T.width-G&&W>=0&&W<=T.height-k&&D.readPixels(O,W,G,k,_t.convert(Qt),_t.convert(ie),St)}finally{let Lt=at!==null?X.get(at).__webglFramebuffer:null;S.bindFramebuffer(D.FRAMEBUFFER,Lt)}}},this.readRenderTargetPixelsAsync=async function(T,O,W,G,k,St,wt,xt=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Nt=X.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&wt!==void 0&&(Nt=Nt[wt]),Nt)if(O>=0&&O<=T.width-G&&W>=0&&W<=T.height-k){S.bindFramebuffer(D.FRAMEBUFFER,Nt);let Lt=T.textures[xt],Qt=Lt.format,ie=Lt.type;T.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+xt);let Dt=cv(Lt);if(Dt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Dt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let _e=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,_e),D.bufferData(D.PIXEL_PACK_BUFFER,St.byteLength,D.STREAM_READ),D.readPixels(O,W,G,k,_t.convert(Qt),_t.convert(ie),0),D.bindBuffer(D.PIXEL_PACK_BUFFER,null);let Ye=at!==null?X.get(at).__webglFramebuffer:null;S.bindFramebuffer(D.FRAMEBUFFER,Ye);let Pe=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await Y1(D,Pe,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,_e),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,St),D.bindBuffer(D.PIXEL_PACK_BUFFER,null),D.deleteBuffer(_e),D.deleteSync(Pe),St}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,O=null,W=0){let G=Math.pow(2,-W),k=Math.floor(T.image.width*G),St=Math.floor(T.image.height*G),wt=O!==null?O.x:0,xt=O!==null?O.y:0;P.setTexture2D(T,0),D.copyTexSubImage2D(D.TEXTURE_2D,W,0,0,wt,xt,k,St),S.unbindTexture()},this.copyTextureToTexture=function(T,O,W=null,G=null,k=0,St=0){let wt,xt,Nt,Lt,Qt,ie,Dt,_e,Ye,Pe=T.isCompressedTexture?T.mipmaps[St]:T.image;if(W!==null)wt=W.max.x-W.min.x,xt=W.max.y-W.min.y,Nt=W.isBox3?W.max.z-W.min.z:1,Lt=W.min.x,Qt=W.min.y,ie=W.isBox3?W.min.z:0;else{let We=Math.pow(2,-k);wt=Math.floor(Pe.width*We),xt=Math.floor(Pe.height*We),T.isDataArrayTexture?Nt=Pe.depth:T.isData3DTexture?Nt=Math.floor(Pe.depth*We):Nt=1,Lt=0,Qt=0,ie=0}G!==null?(Dt=G.x,_e=G.y,Ye=G.z):(Dt=0,_e=0,Ye=0);let Ae=_t.convert(O.format),vn=_t.convert(O.type),At;O.isData3DTexture?(P.setTexture3D(O,0),At=D.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(P.setTexture2DArray(O,0),At=D.TEXTURE_2D_ARRAY):(P.setTexture2D(O,0),At=D.TEXTURE_2D),S.activeTexture(D.TEXTURE0),S.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,O.flipY),S.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),S.pixelStorei(D.UNPACK_ALIGNMENT,O.unpackAlignment);let An=S.getParameter(D.UNPACK_ROW_LENGTH),he=S.getParameter(D.UNPACK_IMAGE_HEIGHT),hi=S.getParameter(D.UNPACK_SKIP_PIXELS),Xi=S.getParameter(D.UNPACK_SKIP_ROWS),Ws=S.getParameter(D.UNPACK_SKIP_IMAGES);S.pixelStorei(D.UNPACK_ROW_LENGTH,Pe.width),S.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Pe.height),S.pixelStorei(D.UNPACK_SKIP_PIXELS,Lt),S.pixelStorei(D.UNPACK_SKIP_ROWS,Qt),S.pixelStorei(D.UNPACK_SKIP_IMAGES,ie);let Dr=T.isDataArrayTexture||T.isData3DTexture,Ee=O.isDataArrayTexture||O.isData3DTexture;if(T.isDepthTexture){let We=X.get(T),qs=X.get(O),Ne=X.get(We.__renderTarget),Ys=X.get(qs.__renderTarget);S.bindFramebuffer(D.READ_FRAMEBUFFER,Ne.__webglFramebuffer),S.bindFramebuffer(D.DRAW_FRAMEBUFFER,Ys.__webglFramebuffer);for(let Ur=0;Ur<Nt;Ur++)Dr&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,X.get(T).__webglTexture,k,ie+Ur),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,X.get(O).__webglTexture,St,Ye+Ur)),D.blitFramebuffer(Lt,Qt,wt,xt,Dt,_e,wt,xt,D.DEPTH_BUFFER_BIT,D.NEAREST);S.bindFramebuffer(D.READ_FRAMEBUFFER,null),S.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(k!==0||T.isRenderTargetTexture||X.has(T)){let We=X.get(T),qs=X.get(O);S.bindFramebuffer(D.READ_FRAMEBUFFER,L),S.bindFramebuffer(D.DRAW_FRAMEBUFFER,F);for(let Ne=0;Ne<Nt;Ne++)Dr?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,We.__webglTexture,k,ie+Ne):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,We.__webglTexture,k),Ee?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,qs.__webglTexture,St,Ye+Ne):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,qs.__webglTexture,St),k!==0?D.blitFramebuffer(Lt,Qt,wt,xt,Dt,_e,wt,xt,D.COLOR_BUFFER_BIT,D.NEAREST):Ee?D.copyTexSubImage3D(At,St,Dt,_e,Ye+Ne,Lt,Qt,wt,xt):D.copyTexSubImage2D(At,St,Dt,_e,Lt,Qt,wt,xt);S.bindFramebuffer(D.READ_FRAMEBUFFER,null),S.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else Ee?T.isDataTexture||T.isData3DTexture?D.texSubImage3D(At,St,Dt,_e,Ye,wt,xt,Nt,Ae,vn,Pe.data):O.isCompressedArrayTexture?D.compressedTexSubImage3D(At,St,Dt,_e,Ye,wt,xt,Nt,Ae,Pe.data):D.texSubImage3D(At,St,Dt,_e,Ye,wt,xt,Nt,Ae,vn,Pe):T.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,St,Dt,_e,wt,xt,Ae,vn,Pe.data):T.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,St,Dt,_e,Pe.width,Pe.height,Ae,Pe.data):D.texSubImage2D(D.TEXTURE_2D,St,Dt,_e,wt,xt,Ae,vn,Pe);S.pixelStorei(D.UNPACK_ROW_LENGTH,An),S.pixelStorei(D.UNPACK_IMAGE_HEIGHT,he),S.pixelStorei(D.UNPACK_SKIP_PIXELS,hi),S.pixelStorei(D.UNPACK_SKIP_ROWS,Xi),S.pixelStorei(D.UNPACK_SKIP_IMAGES,Ws),St===0&&O.generateMipmaps&&D.generateMipmap(At),S.unbindTexture()},this.initRenderTarget=function(T){X.get(T).__webglFramebuffer===void 0&&P.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?P.setTextureCube(T,0):T.isData3DTexture?P.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?P.setTexture2DArray(T,0):P.setTexture2D(T,0),S.unbindTexture()},this.resetState=function(){J=0,q=0,at=null,S.reset(),bt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return zi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let n=this.getContext();n.drawingBufferColorSpace=oe._getDrawingBufferColorSpace(t),n.unpackColorSpace=oe._getUnpackColorSpace()}}});function DE(e,t){let n=[0,0,0,t,0,43],i=n.map(()=>0),s=new N;return{update(a,r,o,l,c,h){let p=[a.x,a.y,a.z,r,o,l?39:43],u=!1,d=l?8:9,g=Math.exp(-d*c);p.forEach((_,f)=>{if(h){n[f]=_,i[f]=0;return}let v=n[f]-_,y=i[f]+d*v;n[f]=_+(v+y*c)*g,i[f]=(i[f]-d*y*c)*g,u||=Math.abs(n[f]-_)>5e-4||Math.abs(i[f])>.002});let b=fl.clamp(i[3]*.015,-.12,.12);return s.set(n[0]+n[4],n[1],n[2]),e.position.set(s.x+b,s.y+Math.abs(b)*.35,s.z+n[3]),e.lookAt(s),e.fov=n[5],e.updateProjectionMatrix(),e.updateMatrixWorld(),u}}}var UE=Lr(()=>{vp()});function LE(e,t,n,i){let s=[],a=new Ie,r=new Ei,o=(y,m=[0,0,0],M=[0,0,0])=>{r.setFromEuler(new hs(...M)),a.compose(new N(...m),r,new N(1,1,1));let E=new iu(y);E.applyMatrix4(a),s.push(...Array.from(E.getAttribute("position").array)),E.dispose(),y.dispose()},l=(y,m,M,E,w=.11,x=0)=>o(new Ti(M,E,w),[y,m,x]),c=(y,m,M=.02)=>{let E=new N(...y),w=new N(...m),x=new al(E,w);o(new nu(x,1,M,5,!1))},h=(y,m,M,E=0)=>o(new eu(M,.022,5,32),[y,m,E]),p=(y,m=.1)=>{let M=new br;y.forEach(([E,w],x)=>x===0?M.moveTo(E,w):M.lineTo(E,w)),M.closePath(),o(new ol(M,{depth:m,bevelEnabled:!1,steps:1}),[0,0,-m/2])},u=(y=0,m=0,M=1)=>{c([y-.22*M,m,.12],[y-.05*M,m-.17*M,.12],.025),c([y-.05*M,m-.17*M,.12],[y+.27*M,m+.22*M,.12],.025)},d=(y,m,M=1)=>{p([[y-.43*M,m+.29*M],[y+.43*M,m+.29*M],[y+.43*M,m-.18*M],[y+.06*M,m-.18*M],[y-.14*M,m-.37*M],[y-.12*M,m-.18*M],[y-.43*M,m-.18*M]],.12)},g=(y=!1)=>{c([-.6,-.52,0],[.63,-.52,0]),c([-.6,-.52,0],[-.6,.58,0]),(y?[.24,.62,.42,.85]:[.24,.48,.81]).forEach((M,E)=>l(-.34+E*(y?.25:.35),-.5+M/2,y?.15:.21,M,.18))};switch(e){case"eye":{let m=new br;m.moveTo(-.72,0),m.bezierCurveTo(-.3,.48,.3,.48,.72,0),m.bezierCurveTo(.3,-.48,-.3,-.48,-.72,0),o(new ol(m,{depth:.065,bevelEnabled:!1}),[0,0,-.12]),o(new Tr(.245,16,10),[0,0,.04]),h(0,0,.125,.275);break}case"signpost":l(0,-.04,.075,1.32,.075),p([[-.04,.55],[.44,.55],[.66,.38],[.44,.21],[-.04,.21]]),p([[.04,.08],[-.44,.08],[-.66,-.09],[-.44,-.26],[.04,-.26]]),l(0,-.7,.45,.04,.32);break;case"wrench":p([[-.34,-.64],[-.52,-.47],[-.13,.15],[-.27,.37],[-.19,.65],[.02,.7],[-.05,.44],[.12,.34],[.29,.48],[.21,.73],[.46,.56],[.43,.28],[.21,.12]]),h(-.35,-.46,.085,.09);break;case"plane":{let m=new N(-.65,.17,0),M=new N(.68,.67,0),E=new N(-.1,-.1,.2),w=new N(.17,-.65,0),x=new N(-.18,-.4,-.04),A=new xe().setFromPoints([m,M,E,E,M,w,E,w,x]);A.setIndex([0,1,2,3,4,5,6,7,8]),o(A),c([-.48,-.56,-.06],[-.69,-.71,-.06],.015),c([-.22,-.63,-.06],[-.39,-.77,-.06],.015);break}case"book":p([[-.64,.53],[-.08,.42],[0,.32],[0,-.63],[-.12,-.51],[-.64,-.42]],.15),p([[.64,.53],[.08,.42],[0,.32],[0,-.63],[.12,-.51],[.64,-.42]],.15);for(let m=0;m<4;m++)c([-.51,.3-m*.16,.095],[-.15,.23-m*.16,.095],.009),c([.51,.3-m*.16,.095],[.15,.23-m*.16,.095],.009);break;case"conversation":d(-.14,.2,.9),d(.22,-.3,.7);for(let m=0;m<3;m++)o(new jc(.035),[-.32+m*.18,.22,.12]);break;case"magnifier":l(-.19,.07,.58,.78,.07,-.1),h(.16,.18,.33,.08),c([.39,-.06,.08],[.64,-.47,.08],.055);for(let m=0;m<3;m++)c([-.38,.3-m*.18,-.02],[-.05,.3-m*.18,-.02],.012);break;case"bulb":o(new Tr(.39,12,10),[0,.19,0]),l(0,-.27,.28,.16,.22),l(0,-.43,.23,.09,.18),c([-.16,.13,0],[0,-.2,0]),c([.16,.13,0],[0,-.2,0]);for(let m=0;m<5;m++){let M=m/4*Math.PI;c([Math.cos(M)*.52,.19+Math.sin(M)*.52,0],[Math.cos(M)*.67,.19+Math.sin(M)*.67,0],.012)}break;case"chart":g();break;case"comparison":g(!0);break;case"decision":l(0,0,1.08,1.08,.07),u(0,0,1.5);break;case"target":h(0,0,.55),h(0,0,.34),h(0,0,.13),c([0,0,.04],[.52,.54,.46],.025),p([[.52,.54],[.63,.57],[.55,.69]],.08);break;case"scales":c([0,-.58,0],[0,.63,0],.035),c([-.65,.34,0],[.65,.34,0],.026),l(0,-.64,.64,.09,.3);for(let m of[-.43,.43])c([m,.34,0],[m-.2,-.25,0],.012),c([m,.34,0],[m+.2,-.25,0],.012),o(new il(.23,.14,.09,10),[m,-.29,0]);break;case"flag":c([-.33,-.67,0],[-.33,.65,0],.027),p([[-.3,.6],[.47,.48],[.25,.17],[-.3,.25]],.08),l(-.33,-.69,.43,.05,.3);break;case"hammer":l(-.12,-.12,.13,1.12,.15),p([[-.43,.43],[.23,.43],[.51,.26],[.35,.15],[.14,.24],[-.43,.24]],.24);break;case"gate":l(-.51,0,.08,1.2,.1),l(.51,0,.08,1.2,.1),l(0,.59,1.1,.08,.1),o(new Ti(.79,1.1,.055),[-.19,-.01,.32],[0,-.9,0]),o(new Tr(.035,8,5),[.13,-.05,.62]);break;case"clock":h(0,0,.57),h(0,0,.52),c([0,0,.04],[0,.33,.04],.025),c([0,0,.04],[.27,-.14,.04],.025);for(let m=0;m<12;m++){let M=m/12*Math.PI*2;c([Math.sin(M)*.45,Math.cos(M)*.45,0],[Math.sin(M)*.5,Math.cos(M)*.5,0],.01)}break;case"checklist":l(0,0,.86,1.2,.09),l(0,.6,.37,.13,.15);for(let m=0;m<3;m++)u(-.22,.3-m*.3,.35),c([-.02,.31-m*.3,.1],[.28,.31-m*.3,.1],.016);break;case"shield":p([[-.53,.47],[0,.65],[.53,.47],[.43,-.24],[0,-.63],[-.43,-.24]],.16),u(0,.04,1.2);break;case"gift":l(0,-.13,1,.8,.6),l(0,.32,1.1,.16,.69),l(0,-.06,.11,.99,.67),h(-.17,.53,.16),h(.17,.53,.16);break;case"response":d(0,0,1.2);let y=[[-.37,0,.14],[-.2,0,.14],[-.1,.2,.14],[.05,-.17,.14],[.16,.08,.14],[.37,.08,.14]];y.slice(1).forEach((m,M)=>c(y[M],m,.014));break;case"library":for(let m=0;m<3;m++)l((m-1)*.34,0,.26,1.05,.4),l((m-1)*.34,.31,.27,.04,.41),l((m-1)*.34,-.29,.27,.04,.41);l(0,-.6,1.22,.06,.6);break;case"steps":for(let m=0;m<3;m++)l(-.4+m*.38,-.53+(m+1)*.16,.35,(m+1)*.32,.34);c([-.51,0,.1],[.47,.7,.1],.02),p([[.28,.68],[.5,.73],[.47,.49]],.08);break;case"coins":for(let m=0;m<3;m++)for(let M=0;M<=m*2;M++)o(new il(.19,.19,.065,14),[(m-1)*.39,-.48+M*.09,0]);break}let b=new bi,_=i(new xe);_.setAttribute("position",new le(s,3)),b.add(new Vs(_,t));let f=new Map;for(let y=0;y<s.length;y+=3){let m=s.slice(y,y+3);f.set(m.map(M=>M.toFixed(3)).join(","),m)}let v=i(new xe);return v.setAttribute("position",new le([...f.values()].flat(),3)),b.add(new ks(v,n)),b}var OE=Lr(()=>{vp()});var IE={};iT(IE,{createOperatingScene:()=>HU});function HU(e){let t=new mp({canvas:e.canvas,alpha:!0,antialias:!0,powerPreference:"low-power"}),n=new Pc,i=new En(43,1,.1,80),s=8.2;i.position.set(0,0,s);let a=DE(i,s),r=[],o=[],l=P=>(r.push(P),P),c=P=>(o.push(P),P),h=(P,Q=1)=>c(new el({color:P,transparent:!0,opacity:Q,depthWrite:!1})),p=(P,Q,st=n)=>{let H=new nl(l(new xe().setFromPoints(P)),Q);return st.add(H),H},u=(P,Q,st)=>{let H=l(new kc(P));P.dispose();let Z=new Vs(H,Q);return st.add(Z),Z},d=new bi;n.add(d);let g=Array.from({length:170},(P,Q)=>{let st=Q<140?1:.65,H=Q%140,Z=1-H/139*2,ht=Math.sqrt(1-Z*Z),Et=H*2.399963+st;return new N(Math.cos(Et)*ht,Z,Math.sin(Et)*ht).multiplyScalar(2.65*st)}),b=[];g.forEach((P,Q)=>g.map((st,H)=>({j:H,d:P.distanceToSquared(st)})).filter(st=>st.j!==Q).sort((st,H)=>st.d-H.d).slice(0,5).filter(st=>st.j>Q).forEach(st=>b.push([Q,st.j])));let _=l(new xe().setFromPoints(b.flatMap(([P,Q])=>[g[P],g[Q]]))),f=h("#d6bc92",.15);d.add(new Vs(_,f));let v=h("#d6bc92",.035),y=new Vs(_,v);y.scale.setScalar(1.55),d.add(y);let m=c(new Gs({color:"#f3d5a6",size:.036,transparent:!0,opacity:.7,depthWrite:!1}));d.add(new ks(l(new xe().setFromPoints(g)),m));let M=l(new xe);M.setAttribute("position",new Vn(new Float32Array(36*3),3));let E=c(new Gs({color:"#f5bc67",size:.045,transparent:!0,opacity:.8,depthWrite:!1})),w=new ks(M,E);w.frustumCulled=!1,d.add(w);let x=new N,A=new bi;n.add(A);let R=h("#f6eee1",.95);u(new Ti(1.5,1,.22),R,A),p([new N(-.75,.3,.12),new N(.75,.3,.12)],R,A);let U=l(new xe().setFromPoints([-.61,-.49,-.37].map(P=>new N(P,.4,.13))));A.add(new ks(U,c(new Gs({color:"#e3a857",size:.035})))),u(new Ti(1.66,1.16,.4),h("#e3a857",.14),A).rotation.set(.02,.08,.02);let V=[new N(-1.62,1.45,.55),new N(1.38,1.48,.6),new N(2.05,-.18,.25),new N(.68,-1.56,.65),new N(-1.92,-.84,.5)],L=pr.map((P,Q)=>{let st=h(P.colour),H=c(new Gs({color:P.colour,size:.02,transparent:!0,depthWrite:!1})),Z=LE(P.symbol,st,H,l);Z.position.copy(V[Q]),n.add(Z);let ht=p([x.clone(),V[Q]],h(P.colour,.13));return{group:Z,mat:st,dot:H,spoke:ht}}),F=Ta.map(({domain:P,next:Q})=>{let st=V[P],H=V[Q],Z=st.clone().lerp(H,.5);P===4?Z.set(-.7,1.7,1.15):Z.multiplyScalar(1.25);let ht=new Mr(st,Z,H),Et=h(pr[P].colour);p(ht.getPoints(40),Et);let ft=new fs().setFromPoints(ht.getPoints(12));ft.min.add(new N(-.68,-.85,0)),ft.max.add(new N(.68,.55,.38));let ct=ft.getCenter(new N),Tt=ft.getSize(new N).multiplyScalar(.5);return{curve:ht,mat:Et,center:ct,extent:Tt}}),J=c(new Sr({color:"#f4cd92"})),q=new Wn(l(new $c(.09)),J);n.add(q);let at=matchMedia("(prefers-reduced-motion: reduce)"),Y=1,$=1,et=0,Ct=0,Mt=null,ee=0,Zt=0,ne=!1,K=!1,tt=!1,mt=!0,Bt=2.15,vt=new N,Ot=new N,de=new N,it=Math.tan(fl.degToRad(43/2)),ot=Math.tan(fl.degToRad(39/2));i.updateMatrixWorld();let lt=()=>mt&&!at.matches&&!K,ut=(P,Q)=>{vt.copy(Q).project(i);let st=(vt.x+1)*Y/2,H=(1-vt.y)*$/2;P.style.transform=`translate(${st}px,${H}px) translate(-50%,-50%)`},dt=(P=0)=>{if(tt||K)return;let Q=Mt===null?null:Ta[Mt],st=Math.min(1,et/Bt),H=Mt===null?null:F[Mt],Z=Math.max(s,3.05/(it*i.aspect)),ht=H?H.extent.z+Math.max(H.extent.y/ot,H.extent.x/(ot*i.aspect)):0;a.update(H?.center??de,H?Math.max(5.15,ht+.35):Z,0,H!==null,P,at.matches||!mt),d.rotation.set(.15,.32*Math.sin(Ct*.24),.06);let Et=M.getAttribute("position");for(let ct=0;ct<36;ct++){let[Tt,Pt]=b[ct*17%b.length];Ot.lerpVectors(g[Tt],g[Pt],(Ct*.18+ct*.17)%1),Et.setXYZ(ct,Ot.x,Ot.y,Ot.z)}Et.needsUpdate=!0,E.opacity=.32,f.opacity=.12,m.opacity=.42,R.opacity=.8,L.forEach(({group:ct,mat:Tt,dot:Pt,spoke:Yt},I)=>{let pt=I===Q?.domain,j=I===Q?.next;ct.scale.setScalar(pt?.91:j?.78:.68),Tt.opacity=pt?1:j?.8:H?.23:.68,Pt.opacity=Tt.opacity*.55,Yt.material.opacity=pt||j?.31:.1,ct.rotation.y=Math.sin(Ct*.32+I)*.18}),F.forEach(({mat:ct},Tt)=>{ct.opacity=Tt===Mt?.95:H?.08:.22}),q.visible=H!==null,H&&(H.curve.getPoint(.06+st*.86,q.position),q.rotation.set(Ct*.8,Ct*.6,.35)),e.labels().forEach((ct,Tt)=>{ct&&(Ot.copy(V[Tt]),Ot.y-=.48,Ot.z+=.12,ut(ct,Ot))});let ft=e.appLabel();ft&&ut(ft,x),t.render(n,i)},zt=P=>{let Q=Zt?Math.min((P-Zt)/1e3,.06):0;Zt=P,lt()&&(et=Math.min(Bt,et+Q),Ct+=Q),dt(Q),lt()&&ne&&!document.hidden&&!tt&&(ee=requestAnimationFrame(zt))},Rt=()=>{cancelAnimationFrame(ee),Zt=0,dt(),lt()&&ne&&!document.hidden&&!tt&&(ee=requestAnimationFrame(zt))},Ht=()=>{Y=e.host.clientWidth,$=e.host.clientHeight,!(!Y||!$)&&(i.aspect=Y/$,t.setPixelRatio(Math.min(devicePixelRatio,1.7)),t.setSize(Y,$,!1),Rt())},Xt=P=>{let Q=e.canvas.getBoundingClientRect(),st=-1,H=43;return V.forEach((Z,ht)=>{vt.copy(Z).project(i);let Et=(vt.x+1)*Y/2-(P.clientX-Q.left),ft=(1-vt.y)*$/2-(P.clientY-Q.top),ct=Math.hypot(Et,ft);ct<H&&(st=ht,H=ct)}),st},D=P=>{let Q=Xt(P);Q>=0&&e.onDomain(Q)},ue=P=>{e.canvas.style.cursor=Xt(P)>=0?"pointer":"default"},Kt=new IntersectionObserver(P=>{ne=P.some(Q=>Q.isIntersecting),Rt()},{threshold:.05}),C=new ResizeObserver(Ht),S=()=>{at.matches&&(et=Bt),e.onMotion(at.matches),e.onPlaying(lt()),Rt()},z=P=>{P.preventDefault(),K=!0,cancelAnimationFrame(ee),e.onPlaying(!1),e.onAvailable(!1)},X=()=>{K=!1,e.onAvailable(!0),e.onPlaying(lt()),Ht()};return Kt.observe(e.host),C.observe(e.host),at.addEventListener("change",S),document.addEventListener("visibilitychange",Rt),e.canvas.addEventListener("webglcontextlost",z),e.canvas.addEventListener("webglcontextrestored",X),e.canvas.addEventListener("click",D),e.canvas.addEventListener("pointermove",ue),Ht(),e.onAvailable(!0),e.onMotion(at.matches),e.onPlaying(lt()),{goTo(P){Mt=P,et=lt()?0:Bt,Rt()},play(P){mt=P,e.onPlaying(lt()),Rt()},dispose(){tt=!0,cancelAnimationFrame(ee),Kt.disconnect(),C.disconnect(),at.removeEventListener("change",S),document.removeEventListener("visibilitychange",Rt),e.canvas.removeEventListener("webglcontextlost",z),e.canvas.removeEventListener("webglcontextrestored",X),e.canvas.removeEventListener("click",D),e.canvas.removeEventListener("pointermove",ue),r.forEach(P=>P.dispose()),o.forEach(P=>P.dispose()),t.dispose()}}}var PE=Lr(()=>{vp();UE();OE();cf()});var FE=Wi(yp=>{"use strict";var VU=Symbol.for("react.transitional.element"),GU=Symbol.for("react.fragment");function zE(e,t,n){var i=null;if(n!==void 0&&(i=""+n),t.key!==void 0&&(i=""+t.key),"key"in t){n={};for(var s in t)s!=="key"&&(n[s]=t[s])}else n=t;return t=n.ref,{$$typeof:VU,type:e,key:i,ref:t!==void 0?t:null,props:n}}yp.Fragment=GU;yp.jsx=zE;yp.jsxs=zE});var yu=Wi((SP,HE)=>{"use strict";HE.exports=FE()});var kE=Ga(Db());var VE=Ga(xl());cf();var qn=Ga(xl());cf();function BE(){let e=(0,qn.useRef)(null),t=(0,qn.useRef)(null),n=(0,qn.useRef)(null),i=(0,qn.useRef)([]),s=(0,qn.useRef)(null),a=(0,qn.useRef)(null),[r,o]=(0,qn.useState)(null),[l,c]=(0,qn.useState)(!0),[h,p]=(0,qn.useState)(!1),[u,d]=(0,qn.useState)(null),g=_=>{a.current=_,o(_),s.current?.goTo(_)},b=_=>{let f=Ta.findIndex(v=>v.domain===_);if(!(f<0))return g(f),f};return(0,qn.useEffect)(()=>{let _=!1;return Promise.resolve().then(()=>(PE(),IE)).then(({createOperatingScene:f})=>{_||!e.current||!t.current||(s.current=f({canvas:e.current,host:t.current,labels:()=>i.current,appLabel:()=>n.current,onDomain:b,onPlaying:c,onMotion:p,onAvailable:d}),s.current.goTo(a.current))}).catch(()=>{_||(d(!1),c(!1))}),()=>{_=!0,s.current?.dispose(),s.current=null}},[]),{canvas:e,surface:t,appLabel:n,labels:i,step:r,playing:l,reduced:h,available:u,chooseStep:g,chooseDomain:b,toggle:()=>s.current?.play(!l)}}var kt=Ga(yu());function GE(){let e=BE(),t=(0,VE.useRef)([]),n=()=>{e.step!==null&&(t.current[e.step]?.focus({preventScroll:!0}),e.chooseStep(null))},i=e.step===null?null:Ta[e.step],s=i&&pr[i.domain],a=i&&pr[i.next];return(0,kt.jsxs)("section",{id:"operating-system","aria-label":"How Traction uses HD OS: an illustrative booking-app example","data-signal":e.step??void 0,onKeyDown:r=>{r.key==="Escape"&&i&&e.available&&(r.preventDefault(),n())},children:[(0,kt.jsxs)("div",{className:"story",children:[(0,kt.jsxs)("header",{children:[(0,kt.jsx)("p",{className:"eyebrow",children:"Illustrative example"}),(0,kt.jsx)("h2",{children:"What changed for your app?"}),(0,kt.jsx)("p",{children:"You run booking software for independent studios. Choose any signal to see how your team responds."})]}),(0,kt.jsx)("nav",{className:"signal-options","aria-label":"Choose an illustrative signal",children:Ta.map((r,o)=>(0,kt.jsx)("button",{type:"button",ref:l=>{t.current[o]=l},"aria-pressed":o===e.step,"aria-controls":"scene-detail",onClick:()=>e.chooseStep(o),children:r.label},r.label))}),i&&s&&(0,kt.jsxs)("article",{className:"scene-detail",id:"scene-detail",style:{"--domain":s.colour},children:[(0,kt.jsx)("p",{className:"eyebrow",children:s.name}),(0,kt.jsx)("h3",{children:i.title}),(0,kt.jsx)("p",{children:i.text}),"cohorts"in i&&(0,kt.jsxs)("figure",{className:"cohorts",children:[(0,kt.jsx)("figcaption",{children:"Trials reaching a first booking"}),i.cohorts.map(({label:r,completed:o,enrolled:l})=>(0,kt.jsxs)("div",{children:[(0,kt.jsx)("span",{children:r}),(0,kt.jsx)("meter",{min:0,max:l,value:o,"aria-label":r,"aria-valuetext":`${o} of ${l} trials`}),(0,kt.jsxs)("strong",{children:[o," of ",l]})]},r))]}),(0,kt.jsxs)("dl",{children:[(0,kt.jsxs)("div",{children:[(0,kt.jsx)("dt",{children:"What HD OS connects"}),(0,kt.jsx)("dd",{children:i.work})]}),(0,kt.jsxs)("div",{children:[(0,kt.jsx)("dt",{children:"What carries forward"}),(0,kt.jsx)("dd",{children:i.record})]})]})]})]}),(0,kt.jsxs)("div",{className:"stage",children:[(0,kt.jsxs)("header",{className:"stage-header",children:[(0,kt.jsxs)("div",{children:[(0,kt.jsx)("p",{className:"eyebrow",children:"HD OS"}),(0,kt.jsx)("p",{children:"Your app and its agent team"})]}),(0,kt.jsxs)("div",{className:"stage-controls",children:[e.available&&i&&(0,kt.jsx)("button",{type:"button",onClick:n,children:"\u2190 All signals"}),e.available&&!e.reduced&&(0,kt.jsx)("button",{type:"button",onClick:e.toggle,children:e.playing?"Pause":"Play"})]})]}),(0,kt.jsx)("div",{className:"handoff",role:"status",style:s&&a?{"--domain":s.colour,"--recipient":a.colour}:void 0,children:i?(0,kt.jsxs)(kt.Fragment,{children:[(0,kt.jsx)("p",{className:"eyebrow",children:i.packet}),(0,kt.jsx)("p",{children:i.handoff})]}):(0,kt.jsx)("p",{children:"Choose a signal or select a domain."})}),(0,kt.jsxs)("div",{className:"surface",ref:e.surface,"data-webgl":e.available===!0,children:[(0,kt.jsx)("img",{src:"/assets/mesh-fallback.svg",alt:"Market pulse, Agent team, Prospect CRM, Initiative delivery and Analytics connected around an app",width:"900",height:"620"}),(0,kt.jsx)("canvas",{ref:e.canvas,"aria-hidden":"true"}),(0,kt.jsx)("p",{className:"app-label",ref:e.appLabel,children:"Your app"}),(0,kt.jsx)("div",{className:"domains",role:"group","aria-label":"Explore HD OS domains",children:pr.map((r,o)=>(0,kt.jsx)("button",{type:"button",hidden:!!i&&i.domain!==o&&i.next!==o,ref:l=>{e.labels.current[o]=l},style:{"--domain":r.colour},"data-sending":i?.domain===o||void 0,"data-receiving":i?.next===o||void 0,"aria-pressed":i?.domain===o,"aria-controls":"scene-detail",onClick:()=>{let l=e.chooseDomain(o);l!==void 0&&t.current[l]?.focus({preventScroll:!0})},children:r.name},r.id))})]})]})]})}var XE=Ga(yu());(0,kE.createRoot)(document.getElementById("mesh-root")).render((0,XE.jsx)(GE,{}));
/*! Bundled license information:

scheduler/cjs/scheduler.production.js:
  (**
   * @license React
   * scheduler.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react.production.js:
  (**
   * @license React
   * react.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.js:
  (**
   * @license React
   * react-dom.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom-client.production.js:
  (**
   * @license React
   * react-dom-client.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

three/build/three.core.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)

three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)

react/cjs/react-jsx-runtime.production.js:
  (**
   * @license React
   * react-jsx-runtime.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
