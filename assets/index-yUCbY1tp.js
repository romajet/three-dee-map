(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();/**
* @vue/shared v3.5.20
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**//*! #__NO_SIDE_EFFECTS__ */function lc(n){const t=Object.create(null);for(const e of n.split(","))t[e]=1;return e=>e in t}const he={},ds=[],wn=()=>{},sf=()=>!1,Io=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&(n.charCodeAt(2)>122||n.charCodeAt(2)<97),cc=n=>n.startsWith("onUpdate:"),Ve=Object.assign,uc=(n,t)=>{const e=n.indexOf(t);e>-1&&n.splice(e,1)},Ep=Object.prototype.hasOwnProperty,ie=(n,t)=>Ep.call(n,t),Kt=Array.isArray,js=n=>No(n)==="[object Map]",bp=n=>No(n)==="[object Set]",$t=n=>typeof n=="function",we=n=>typeof n=="string",Rs=n=>typeof n=="symbol",ye=n=>n!==null&&typeof n=="object",rf=n=>(ye(n)||$t(n))&&$t(n.then)&&$t(n.catch),Tp=Object.prototype.toString,No=n=>Tp.call(n),Ap=n=>No(n).slice(8,-1),wp=n=>No(n)==="[object Object]",hc=n=>we(n)&&n!=="NaN"&&n[0]!=="-"&&""+parseInt(n,10)===n,Ks=lc(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Oo=n=>{const t=Object.create(null);return(e=>t[e]||(t[e]=n(e)))},Rp=/-(\w)/g,fi=Oo(n=>n.replace(Rp,(t,e)=>e?e.toUpperCase():"")),Cp=/\B([A-Z])/g,ki=Oo(n=>n.replace(Cp,"-$1").toLowerCase()),of=Oo(n=>n.charAt(0).toUpperCase()+n.slice(1)),na=Oo(n=>n?`on${of(n)}`:""),ci=(n,t)=>!Object.is(n,t),ia=(n,...t)=>{for(let e=0;e<n.length;e++)n[e](...t)},af=(n,t,e,i=!1)=>{Object.defineProperty(n,t,{configurable:!0,enumerable:!1,writable:i,value:e})},Pp=n=>{const t=parseFloat(n);return isNaN(t)?n:t};let tu;const Fo=()=>tu||(tu=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function fc(n){if(Kt(n)){const t={};for(let e=0;e<n.length;e++){const i=n[e],s=we(i)?Ip(i):fc(i);if(s)for(const r in s)t[r]=s[r]}return t}else if(we(n)||ye(n))return n}const Dp=/;(?![^(]*\))/g,Lp=/:([^]+)/,Up=/\/\*[^]*?\*\//g;function Ip(n){const t={};return n.replace(Up,"").split(Dp).forEach(e=>{if(e){const i=e.split(Lp);i.length>1&&(t[i[0].trim()]=i[1].trim())}}),t}function Bo(n){let t="";if(we(n))t=n;else if(Kt(n))for(let e=0;e<n.length;e++){const i=Bo(n[e]);i&&(t+=i+" ")}else if(ye(n))for(const e in n)n[e]&&(t+=e+" ");return t.trim()}const Np="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",Op=lc(Np);function lf(n){return!!n||n===""}/**
* @vue/reactivity v3.5.20
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let We;class Fp{constructor(t=!1){this.detached=t,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=We,!t&&We&&(this.index=(We.scopes||(We.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let t,e;if(this.scopes)for(t=0,e=this.scopes.length;t<e;t++)this.scopes[t].pause();for(t=0,e=this.effects.length;t<e;t++)this.effects[t].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let t,e;if(this.scopes)for(t=0,e=this.scopes.length;t<e;t++)this.scopes[t].resume();for(t=0,e=this.effects.length;t<e;t++)this.effects[t].resume()}}run(t){if(this._active){const e=We;try{return We=this,t()}finally{We=e}}}on(){++this._on===1&&(this.prevScope=We,We=this)}off(){this._on>0&&--this._on===0&&(We=this.prevScope,this.prevScope=void 0)}stop(t){if(this._active){this._active=!1;let e,i;for(e=0,i=this.effects.length;e<i;e++)this.effects[e].stop();for(this.effects.length=0,e=0,i=this.cleanups.length;e<i;e++)this.cleanups[e]();if(this.cleanups.length=0,this.scopes){for(e=0,i=this.scopes.length;e<i;e++)this.scopes[e].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!t){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function Bp(){return We}let ue;const sa=new WeakSet;class cf{constructor(t){this.fn=t,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,We&&We.active&&We.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,sa.has(this)&&(sa.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||hf(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,eu(this),ff(this);const t=ue,e=dn;ue=this,dn=!0;try{return this.fn()}finally{df(this),ue=t,dn=e,this.flags&=-3}}stop(){if(this.flags&1){for(let t=this.deps;t;t=t.nextDep)mc(t);this.deps=this.depsTail=void 0,eu(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?sa.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Qa(this)&&this.run()}get dirty(){return Qa(this)}}let uf=0,$s,Zs;function hf(n,t=!1){if(n.flags|=8,t){n.next=Zs,Zs=n;return}n.next=$s,$s=n}function dc(){uf++}function pc(){if(--uf>0)return;if(Zs){let t=Zs;for(Zs=void 0;t;){const e=t.next;t.next=void 0,t.flags&=-9,t=e}}let n;for(;$s;){let t=$s;for($s=void 0;t;){const e=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(i){n||(n=i)}t=e}}if(n)throw n}function ff(n){for(let t=n.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function df(n){let t,e=n.depsTail,i=e;for(;i;){const s=i.prevDep;i.version===-1?(i===e&&(e=s),mc(i),zp(i)):t=i,i.dep.activeLink=i.prevActiveLink,i.prevActiveLink=void 0,i=s}n.deps=t,n.depsTail=e}function Qa(n){for(let t=n.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(pf(t.dep.computed)||t.dep.version!==t.version))return!0;return!!n._dirty}function pf(n){if(n.flags&4&&!(n.flags&16)||(n.flags&=-17,n.globalVersion===ar)||(n.globalVersion=ar,!n.isSSR&&n.flags&128&&(!n.deps&&!n._dirty||!Qa(n))))return;n.flags|=2;const t=n.dep,e=ue,i=dn;ue=n,dn=!0;try{ff(n);const s=n.fn(n._value);(t.version===0||ci(s,n._value))&&(n.flags|=128,n._value=s,t.version++)}catch(s){throw t.version++,s}finally{ue=e,dn=i,df(n),n.flags&=-3}}function mc(n,t=!1){const{dep:e,prevSub:i,nextSub:s}=n;if(i&&(i.nextSub=s,n.prevSub=void 0),s&&(s.prevSub=i,n.nextSub=void 0),e.subs===n&&(e.subs=i,!i&&e.computed)){e.computed.flags&=-5;for(let r=e.computed.deps;r;r=r.nextDep)mc(r,!0)}!t&&!--e.sc&&e.map&&e.map.delete(e.key)}function zp(n){const{prevDep:t,nextDep:e}=n;t&&(t.nextDep=e,n.prevDep=void 0),e&&(e.prevDep=t,n.nextDep=void 0)}let dn=!0;const mf=[];function jn(){mf.push(dn),dn=!1}function Kn(){const n=mf.pop();dn=n===void 0?!0:n}function eu(n){const{cleanup:t}=n;if(n.cleanup=void 0,t){const e=ue;ue=void 0;try{t()}finally{ue=e}}}let ar=0;class Hp{constructor(t,e){this.sub=t,this.dep=e,this.version=e.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class gc{constructor(t){this.computed=t,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(t){if(!ue||!dn||ue===this.computed)return;let e=this.activeLink;if(e===void 0||e.sub!==ue)e=this.activeLink=new Hp(ue,this),ue.deps?(e.prevDep=ue.depsTail,ue.depsTail.nextDep=e,ue.depsTail=e):ue.deps=ue.depsTail=e,gf(e);else if(e.version===-1&&(e.version=this.version,e.nextDep)){const i=e.nextDep;i.prevDep=e.prevDep,e.prevDep&&(e.prevDep.nextDep=i),e.prevDep=ue.depsTail,e.nextDep=void 0,ue.depsTail.nextDep=e,ue.depsTail=e,ue.deps===e&&(ue.deps=i)}return e}trigger(t){this.version++,ar++,this.notify(t)}notify(t){dc();try{for(let e=this.subs;e;e=e.prevSub)e.sub.notify()&&e.sub.dep.notify()}finally{pc()}}}function gf(n){if(n.dep.sc++,n.sub.flags&4){const t=n.dep.computed;if(t&&!n.dep.subs){t.flags|=20;for(let i=t.deps;i;i=i.nextDep)gf(i)}const e=n.dep.subs;e!==n&&(n.prevSub=e,e&&(e.nextSub=n)),n.dep.subs=n}}const tl=new WeakMap,Ii=Symbol(""),el=Symbol(""),lr=Symbol("");function Pe(n,t,e){if(dn&&ue){let i=tl.get(n);i||tl.set(n,i=new Map);let s=i.get(e);s||(i.set(e,s=new gc),s.map=i,s.key=e),s.track()}}function Wn(n,t,e,i,s,r){const o=tl.get(n);if(!o){ar++;return}const a=l=>{l&&l.trigger()};if(dc(),t==="clear")o.forEach(a);else{const l=Kt(n),c=l&&hc(e);if(l&&e==="length"){const u=Number(i);o.forEach((h,f)=>{(f==="length"||f===lr||!Rs(f)&&f>=u)&&a(h)})}else switch((e!==void 0||o.has(void 0))&&a(o.get(e)),c&&a(o.get(lr)),t){case"add":l?c&&a(o.get("length")):(a(o.get(Ii)),js(n)&&a(o.get(el)));break;case"delete":l||(a(o.get(Ii)),js(n)&&a(o.get(el)));break;case"set":js(n)&&a(o.get(Ii));break}}pc()}function qi(n){const t=ne(n);return t===n?t:(Pe(t,"iterate",lr),pn(n)?t:t.map(Fe))}function _c(n){return Pe(n=ne(n),"iterate",lr),n}const Vp={__proto__:null,[Symbol.iterator](){return ra(this,Symbol.iterator,Fe)},concat(...n){return qi(this).concat(...n.map(t=>Kt(t)?qi(t):t))},entries(){return ra(this,"entries",n=>(n[1]=Fe(n[1]),n))},every(n,t){return Nn(this,"every",n,t,void 0,arguments)},filter(n,t){return Nn(this,"filter",n,t,e=>e.map(Fe),arguments)},find(n,t){return Nn(this,"find",n,t,Fe,arguments)},findIndex(n,t){return Nn(this,"findIndex",n,t,void 0,arguments)},findLast(n,t){return Nn(this,"findLast",n,t,Fe,arguments)},findLastIndex(n,t){return Nn(this,"findLastIndex",n,t,void 0,arguments)},forEach(n,t){return Nn(this,"forEach",n,t,void 0,arguments)},includes(...n){return oa(this,"includes",n)},indexOf(...n){return oa(this,"indexOf",n)},join(n){return qi(this).join(n)},lastIndexOf(...n){return oa(this,"lastIndexOf",n)},map(n,t){return Nn(this,"map",n,t,void 0,arguments)},pop(){return Os(this,"pop")},push(...n){return Os(this,"push",n)},reduce(n,...t){return nu(this,"reduce",n,t)},reduceRight(n,...t){return nu(this,"reduceRight",n,t)},shift(){return Os(this,"shift")},some(n,t){return Nn(this,"some",n,t,void 0,arguments)},splice(...n){return Os(this,"splice",n)},toReversed(){return qi(this).toReversed()},toSorted(n){return qi(this).toSorted(n)},toSpliced(...n){return qi(this).toSpliced(...n)},unshift(...n){return Os(this,"unshift",n)},values(){return ra(this,"values",Fe)}};function ra(n,t,e){const i=_c(n),s=i[t]();return i!==n&&!pn(n)&&(s._next=s.next,s.next=()=>{const r=s._next();return r.value&&(r.value=e(r.value)),r}),s}const kp=Array.prototype;function Nn(n,t,e,i,s,r){const o=_c(n),a=o!==n&&!pn(n),l=o[t];if(l!==kp[t]){const h=l.apply(n,r);return a?Fe(h):h}let c=e;o!==n&&(a?c=function(h,f){return e.call(this,Fe(h),f,n)}:e.length>2&&(c=function(h,f){return e.call(this,h,f,n)}));const u=l.call(o,c,i);return a&&s?s(u):u}function nu(n,t,e,i){const s=_c(n);let r=e;return s!==n&&(pn(n)?e.length>3&&(r=function(o,a,l){return e.call(this,o,a,l,n)}):r=function(o,a,l){return e.call(this,o,Fe(a),l,n)}),s[t](r,...i)}function oa(n,t,e){const i=ne(n);Pe(i,"iterate",lr);const s=i[t](...e);return(s===-1||s===!1)&&yc(e[0])?(e[0]=ne(e[0]),i[t](...e)):s}function Os(n,t,e=[]){jn(),dc();const i=ne(n)[t].apply(n,e);return pc(),Kn(),i}const Gp=lc("__proto__,__v_isRef,__isVue"),_f=new Set(Object.getOwnPropertyNames(Symbol).filter(n=>n!=="arguments"&&n!=="caller").map(n=>Symbol[n]).filter(Rs));function Wp(n){Rs(n)||(n=String(n));const t=ne(this);return Pe(t,"has",n),t.hasOwnProperty(n)}class vf{constructor(t=!1,e=!1){this._isReadonly=t,this._isShallow=e}get(t,e,i){if(e==="__v_skip")return t.__v_skip;const s=this._isReadonly,r=this._isShallow;if(e==="__v_isReactive")return!s;if(e==="__v_isReadonly")return s;if(e==="__v_isShallow")return r;if(e==="__v_raw")return i===(s?r?tm:Mf:r?yf:Sf).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(i)?t:void 0;const o=Kt(t);if(!s){let l;if(o&&(l=Vp[e]))return l;if(e==="hasOwnProperty")return Wp}const a=Reflect.get(t,e,Le(t)?t:i);return(Rs(e)?_f.has(e):Gp(e))||(s||Pe(t,"get",e),r)?a:Le(a)?o&&hc(e)?a:a.value:ye(a)?s?Ef(a):xc(a):a}}class xf extends vf{constructor(t=!1){super(!1,t)}set(t,e,i,s){let r=t[e];if(!this._isShallow){const l=Oi(r);if(!pn(i)&&!Oi(i)&&(r=ne(r),i=ne(i)),!Kt(t)&&Le(r)&&!Le(i))return l||(r.value=i),!0}const o=Kt(t)&&hc(e)?Number(e)<t.length:ie(t,e),a=Reflect.set(t,e,i,Le(t)?t:s);return t===ne(s)&&(o?ci(i,r)&&Wn(t,"set",e,i):Wn(t,"add",e,i)),a}deleteProperty(t,e){const i=ie(t,e);t[e];const s=Reflect.deleteProperty(t,e);return s&&i&&Wn(t,"delete",e,void 0),s}has(t,e){const i=Reflect.has(t,e);return(!Rs(e)||!_f.has(e))&&Pe(t,"has",e),i}ownKeys(t){return Pe(t,"iterate",Kt(t)?"length":Ii),Reflect.ownKeys(t)}}class Xp extends vf{constructor(t=!1){super(!0,t)}set(t,e){return!0}deleteProperty(t,e){return!0}}const qp=new xf,Yp=new Xp,jp=new xf(!0);const nl=n=>n,Dr=n=>Reflect.getPrototypeOf(n);function Kp(n,t,e){return function(...i){const s=this.__v_raw,r=ne(s),o=js(r),a=n==="entries"||n===Symbol.iterator&&o,l=n==="keys"&&o,c=s[n](...i),u=e?nl:t?il:Fe;return!t&&Pe(r,"iterate",l?el:Ii),{next(){const{value:h,done:f}=c.next();return f?{value:h,done:f}:{value:a?[u(h[0]),u(h[1])]:u(h),done:f}},[Symbol.iterator](){return this}}}}function Lr(n){return function(...t){return n==="delete"?!1:n==="clear"?void 0:this}}function $p(n,t){const e={get(s){const r=this.__v_raw,o=ne(r),a=ne(s);n||(ci(s,a)&&Pe(o,"get",s),Pe(o,"get",a));const{has:l}=Dr(o),c=t?nl:n?il:Fe;if(l.call(o,s))return c(r.get(s));if(l.call(o,a))return c(r.get(a));r!==o&&r.get(s)},get size(){const s=this.__v_raw;return!n&&Pe(ne(s),"iterate",Ii),s.size},has(s){const r=this.__v_raw,o=ne(r),a=ne(s);return n||(ci(s,a)&&Pe(o,"has",s),Pe(o,"has",a)),s===a?r.has(s):r.has(s)||r.has(a)},forEach(s,r){const o=this,a=o.__v_raw,l=ne(a),c=t?nl:n?il:Fe;return!n&&Pe(l,"iterate",Ii),a.forEach((u,h)=>s.call(r,c(u),c(h),o))}};return Ve(e,n?{add:Lr("add"),set:Lr("set"),delete:Lr("delete"),clear:Lr("clear")}:{add(s){!t&&!pn(s)&&!Oi(s)&&(s=ne(s));const r=ne(this);return Dr(r).has.call(r,s)||(r.add(s),Wn(r,"add",s,s)),this},set(s,r){!t&&!pn(r)&&!Oi(r)&&(r=ne(r));const o=ne(this),{has:a,get:l}=Dr(o);let c=a.call(o,s);c||(s=ne(s),c=a.call(o,s));const u=l.call(o,s);return o.set(s,r),c?ci(r,u)&&Wn(o,"set",s,r):Wn(o,"add",s,r),this},delete(s){const r=ne(this),{has:o,get:a}=Dr(r);let l=o.call(r,s);l||(s=ne(s),l=o.call(r,s)),a&&a.call(r,s);const c=r.delete(s);return l&&Wn(r,"delete",s,void 0),c},clear(){const s=ne(this),r=s.size!==0,o=s.clear();return r&&Wn(s,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(s=>{e[s]=Kp(s,n,t)}),e}function vc(n,t){const e=$p(n,t);return(i,s,r)=>s==="__v_isReactive"?!n:s==="__v_isReadonly"?n:s==="__v_raw"?i:Reflect.get(ie(e,s)&&s in i?e:i,s,r)}const Zp={get:vc(!1,!1)},Jp={get:vc(!1,!0)},Qp={get:vc(!0,!1)};const Sf=new WeakMap,yf=new WeakMap,Mf=new WeakMap,tm=new WeakMap;function em(n){switch(n){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function nm(n){return n.__v_skip||!Object.isExtensible(n)?0:em(Ap(n))}function xc(n){return Oi(n)?n:Sc(n,!1,qp,Zp,Sf)}function im(n){return Sc(n,!1,jp,Jp,yf)}function Ef(n){return Sc(n,!0,Yp,Qp,Mf)}function Sc(n,t,e,i,s){if(!ye(n)||n.__v_raw&&!(t&&n.__v_isReactive))return n;const r=nm(n);if(r===0)return n;const o=s.get(n);if(o)return o;const a=new Proxy(n,r===2?i:e);return s.set(n,a),a}function Js(n){return Oi(n)?Js(n.__v_raw):!!(n&&n.__v_isReactive)}function Oi(n){return!!(n&&n.__v_isReadonly)}function pn(n){return!!(n&&n.__v_isShallow)}function yc(n){return n?!!n.__v_raw:!1}function ne(n){const t=n&&n.__v_raw;return t?ne(t):n}function sm(n){return!ie(n,"__v_skip")&&Object.isExtensible(n)&&af(n,"__v_skip",!0),n}const Fe=n=>ye(n)?xc(n):n,il=n=>ye(n)?Ef(n):n;function Le(n){return n?n.__v_isRef===!0:!1}function aa(n){return rm(n,!1)}function rm(n,t){return Le(n)?n:new om(n,t)}class om{constructor(t,e){this.dep=new gc,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=e?t:ne(t),this._value=e?t:Fe(t),this.__v_isShallow=e}get value(){return this.dep.track(),this._value}set value(t){const e=this._rawValue,i=this.__v_isShallow||pn(t)||Oi(t);t=i?t:ne(t),ci(t,e)&&(this._rawValue=t,this._value=i?t:Fe(t),this.dep.trigger())}}function am(n){return Le(n)?n.value:n}const lm={get:(n,t,e)=>t==="__v_raw"?n:am(Reflect.get(n,t,e)),set:(n,t,e,i)=>{const s=n[t];return Le(s)&&!Le(e)?(s.value=e,!0):Reflect.set(n,t,e,i)}};function bf(n){return Js(n)?n:new Proxy(n,lm)}class cm{constructor(t,e,i){this.fn=t,this.setter=e,this._value=void 0,this.dep=new gc(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=ar-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!e,this.isSSR=i}notify(){if(this.flags|=16,!(this.flags&8)&&ue!==this)return hf(this,!0),!0}get value(){const t=this.dep.track();return pf(this),t&&(t.version=this.dep.version),this._value}set value(t){this.setter&&this.setter(t)}}function um(n,t,e=!1){let i,s;return $t(n)?i=n:(i=n.get,s=n.set),new cm(i,s,e)}const Ur={},yo=new WeakMap;let Ai;function hm(n,t=!1,e=Ai){if(e){let i=yo.get(e);i||yo.set(e,i=[]),i.push(n)}}function fm(n,t,e=he){const{immediate:i,deep:s,once:r,scheduler:o,augmentJob:a,call:l}=e,c=S=>s?S:pn(S)||s===!1||s===0?ai(S,1):ai(S);let u,h,f,p,g=!1,_=!1;if(Le(n)?(h=()=>n.value,g=pn(n)):Js(n)?(h=()=>c(n),g=!0):Kt(n)?(_=!0,g=n.some(S=>Js(S)||pn(S)),h=()=>n.map(S=>{if(Le(S))return S.value;if(Js(S))return c(S);if($t(S))return l?l(S,2):S()})):$t(n)?t?h=l?()=>l(n,2):n:h=()=>{if(f){jn();try{f()}finally{Kn()}}const S=Ai;Ai=u;try{return l?l(n,3,[p]):n(p)}finally{Ai=S}}:h=wn,t&&s){const S=h,P=s===!0?1/0:s;h=()=>ai(S(),P)}const m=Bp(),d=()=>{u.stop(),m&&m.active&&uc(m.effects,u)};if(r&&t){const S=t;t=(...P)=>{S(...P),d()}}let R=_?new Array(n.length).fill(Ur):Ur;const b=S=>{if(!(!(u.flags&1)||!u.dirty&&!S))if(t){const P=u.run();if(s||g||(_?P.some((N,D)=>ci(N,R[D])):ci(P,R))){f&&f();const N=Ai;Ai=u;try{const D=[P,R===Ur?void 0:_&&R[0]===Ur?[]:R,p];R=P,l?l(t,3,D):t(...D)}finally{Ai=N}}}else u.run()};return a&&a(b),u=new cf(h),u.scheduler=o?()=>o(b,!1):b,p=S=>hm(S,!1,u),f=u.onStop=()=>{const S=yo.get(u);if(S){if(l)l(S,4);else for(const P of S)P();yo.delete(u)}},t?i?b(!0):R=u.run():o?o(b.bind(null,!0),!0):u.run(),d.pause=u.pause.bind(u),d.resume=u.resume.bind(u),d.stop=d,d}function ai(n,t=1/0,e){if(t<=0||!ye(n)||n.__v_skip||(e=e||new Set,e.has(n)))return n;if(e.add(n),t--,Le(n))ai(n.value,t,e);else if(Kt(n))for(let i=0;i<n.length;i++)ai(n[i],t,e);else if(bp(n)||js(n))n.forEach(i=>{ai(i,t,e)});else if(wp(n)){for(const i in n)ai(n[i],t,e);for(const i of Object.getOwnPropertySymbols(n))Object.prototype.propertyIsEnumerable.call(n,i)&&ai(n[i],t,e)}return n}/**
* @vue/runtime-core v3.5.20
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Mr(n,t,e,i){try{return i?n(...i):n()}catch(s){zo(s,t,e)}}function Pn(n,t,e,i){if($t(n)){const s=Mr(n,t,e,i);return s&&rf(s)&&s.catch(r=>{zo(r,t,e)}),s}if(Kt(n)){const s=[];for(let r=0;r<n.length;r++)s.push(Pn(n[r],t,e,i));return s}}function zo(n,t,e,i=!0){const s=t?t.vnode:null,{errorHandler:r,throwUnhandledErrorInProduction:o}=t&&t.appContext.config||he;if(t){let a=t.parent;const l=t.proxy,c=`https://vuejs.org/error-reference/#runtime-${e}`;for(;a;){const u=a.ec;if(u){for(let h=0;h<u.length;h++)if(u[h](n,l,c)===!1)return}a=a.parent}if(r){jn(),Mr(r,null,10,[n,l,c]),Kn();return}}dm(n,e,s,i,o)}function dm(n,t,e,i=!0,s=!1){if(s)throw n;console.error(n)}const Be=[];let yn=-1;const ps=[];let si=null,ls=0;const Tf=Promise.resolve();let Mo=null;function pm(n){const t=Mo||Tf;return n?t.then(this?n.bind(this):n):t}function mm(n){let t=yn+1,e=Be.length;for(;t<e;){const i=t+e>>>1,s=Be[i],r=cr(s);r<n||r===n&&s.flags&2?t=i+1:e=i}return t}function Mc(n){if(!(n.flags&1)){const t=cr(n),e=Be[Be.length-1];!e||!(n.flags&2)&&t>=cr(e)?Be.push(n):Be.splice(mm(t),0,n),n.flags|=1,Af()}}function Af(){Mo||(Mo=Tf.then(Rf))}function gm(n){Kt(n)?ps.push(...n):si&&n.id===-1?si.splice(ls+1,0,n):n.flags&1||(ps.push(n),n.flags|=1),Af()}function iu(n,t,e=yn+1){for(;e<Be.length;e++){const i=Be[e];if(i&&i.flags&2){if(n&&i.id!==n.uid)continue;Be.splice(e,1),e--,i.flags&4&&(i.flags&=-2),i(),i.flags&4||(i.flags&=-2)}}}function wf(n){if(ps.length){const t=[...new Set(ps)].sort((e,i)=>cr(e)-cr(i));if(ps.length=0,si){si.push(...t);return}for(si=t,ls=0;ls<si.length;ls++){const e=si[ls];e.flags&4&&(e.flags&=-2),e.flags&8||e(),e.flags&=-2}si=null,ls=0}}const cr=n=>n.id==null?n.flags&2?-1:1/0:n.id;function Rf(n){try{for(yn=0;yn<Be.length;yn++){const t=Be[yn];t&&!(t.flags&8)&&(t.flags&4&&(t.flags&=-2),Mr(t,t.i,t.i?15:14),t.flags&4||(t.flags&=-2))}}finally{for(;yn<Be.length;yn++){const t=Be[yn];t&&(t.flags&=-2)}yn=-1,Be.length=0,wf(),Mo=null,(Be.length||ps.length)&&Rf()}}let bn=null,Cf=null;function Eo(n){const t=bn;return bn=n,Cf=n&&n.type.__scopeId||null,t}function _m(n,t=bn,e){if(!t||n._n)return n;const i=(...s)=>{i._d&&fu(-1);const r=Eo(t);let o;try{o=n(...s)}finally{Eo(r),i._d&&fu(1)}return o};return i._n=!0,i._c=!0,i._d=!0,i}function vi(n,t,e,i){const s=n.dirs,r=t&&t.dirs;for(let o=0;o<s.length;o++){const a=s[o];r&&(a.oldValue=r[o].value);let l=a.dir[i];l&&(jn(),Pn(l,e,8,[n.el,a,n,t]),Kn())}}const vm=Symbol("_vte"),xm=n=>n.__isTeleport,Sm=Symbol("_leaveCb");function Ec(n,t){n.shapeFlag&6&&n.component?(n.transition=t,Ec(n.component.subTree,t)):n.shapeFlag&128?(n.ssContent.transition=t.clone(n.ssContent),n.ssFallback.transition=t.clone(n.ssFallback)):n.transition=t}function Pf(n){n.ids=[n.ids[0]+n.ids[2]+++"-",0,0]}function Qs(n,t,e,i,s=!1){if(Kt(n)){n.forEach((g,_)=>Qs(g,t&&(Kt(t)?t[_]:t),e,i,s));return}if(tr(i)&&!s){i.shapeFlag&512&&i.type.__asyncResolved&&i.component.subTree.component&&Qs(n,t,e,i.component.subTree);return}const r=i.shapeFlag&4?wc(i.component):i.el,o=s?null:r,{i:a,r:l}=n,c=t&&t.r,u=a.refs===he?a.refs={}:a.refs,h=a.setupState,f=ne(h),p=h===he?sf:g=>ie(f,g);if(c!=null&&c!==l){if(we(c))u[c]=null,p(c)&&(h[c]=null);else if(Le(c)){c.value=null;const g=t;g.k&&(u[g.k]=null)}}if($t(l))Mr(l,a,12,[o,u]);else{const g=we(l),_=Le(l);if(g||_){const m=()=>{if(n.f){const d=g?p(l)?h[l]:u[l]:l.value;if(s)Kt(d)&&uc(d,r);else if(Kt(d))d.includes(r)||d.push(r);else if(g)u[l]=[r],p(l)&&(h[l]=u[l]);else{const R=[r];l.value=R,n.k&&(u[n.k]=R)}}else g?(u[l]=o,p(l)&&(h[l]=o)):_&&(l.value=o,n.k&&(u[n.k]=o))};o?(m.id=-1,Qe(m,e)):m()}}}Fo().requestIdleCallback;Fo().cancelIdleCallback;const tr=n=>!!n.type.__asyncLoader,Df=n=>n.type.__isKeepAlive;function ym(n,t){Lf(n,"a",t)}function Mm(n,t){Lf(n,"da",t)}function Lf(n,t,e=ze){const i=n.__wdc||(n.__wdc=()=>{let s=e;for(;s;){if(s.isDeactivated)return;s=s.parent}return n()});if(Ho(t,i,e),e){let s=e.parent;for(;s&&s.parent;)Df(s.parent.vnode)&&Em(i,t,e,s),s=s.parent}}function Em(n,t,e,i){const s=Ho(t,n,i,!0);If(()=>{uc(i[t],s)},e)}function Ho(n,t,e=ze,i=!1){if(e){const s=e[n]||(e[n]=[]),r=t.__weh||(t.__weh=(...o)=>{jn();const a=Er(e),l=Pn(t,e,n,o);return a(),Kn(),l});return i?s.unshift(r):s.push(r),r}}const $n=n=>(t,e=ze)=>{(!fr||n==="sp")&&Ho(n,(...i)=>t(...i),e)},bm=$n("bm"),Uf=$n("m"),Tm=$n("bu"),Am=$n("u"),wm=$n("bum"),If=$n("um"),Rm=$n("sp"),Cm=$n("rtg"),Pm=$n("rtc");function Dm(n,t=ze){Ho("ec",n,t)}const Lm=Symbol.for("v-ndc"),sl=n=>n?nd(n)?wc(n):sl(n.parent):null,er=Ve(Object.create(null),{$:n=>n,$el:n=>n.vnode.el,$data:n=>n.data,$props:n=>n.props,$attrs:n=>n.attrs,$slots:n=>n.slots,$refs:n=>n.refs,$parent:n=>sl(n.parent),$root:n=>sl(n.root),$host:n=>n.ce,$emit:n=>n.emit,$options:n=>Of(n),$forceUpdate:n=>n.f||(n.f=()=>{Mc(n.update)}),$nextTick:n=>n.n||(n.n=pm.bind(n.proxy)),$watch:n=>tg.bind(n)}),la=(n,t)=>n!==he&&!n.__isScriptSetup&&ie(n,t),Um={get({_:n},t){if(t==="__v_skip")return!0;const{ctx:e,setupState:i,data:s,props:r,accessCache:o,type:a,appContext:l}=n;let c;if(t[0]!=="$"){const p=o[t];if(p!==void 0)switch(p){case 1:return i[t];case 2:return s[t];case 4:return e[t];case 3:return r[t]}else{if(la(i,t))return o[t]=1,i[t];if(s!==he&&ie(s,t))return o[t]=2,s[t];if((c=n.propsOptions[0])&&ie(c,t))return o[t]=3,r[t];if(e!==he&&ie(e,t))return o[t]=4,e[t];rl&&(o[t]=0)}}const u=er[t];let h,f;if(u)return t==="$attrs"&&Pe(n.attrs,"get",""),u(n);if((h=a.__cssModules)&&(h=h[t]))return h;if(e!==he&&ie(e,t))return o[t]=4,e[t];if(f=l.config.globalProperties,ie(f,t))return f[t]},set({_:n},t,e){const{data:i,setupState:s,ctx:r}=n;return la(s,t)?(s[t]=e,!0):i!==he&&ie(i,t)?(i[t]=e,!0):ie(n.props,t)||t[0]==="$"&&t.slice(1)in n?!1:(r[t]=e,!0)},has({_:{data:n,setupState:t,accessCache:e,ctx:i,appContext:s,propsOptions:r,type:o}},a){let l,c;return!!(e[a]||n!==he&&a[0]!=="$"&&ie(n,a)||la(t,a)||(l=r[0])&&ie(l,a)||ie(i,a)||ie(er,a)||ie(s.config.globalProperties,a)||(c=o.__cssModules)&&c[a])},defineProperty(n,t,e){return e.get!=null?n._.accessCache[t]=0:ie(e,"value")&&this.set(n,t,e.value,null),Reflect.defineProperty(n,t,e)}};function su(n){return Kt(n)?n.reduce((t,e)=>(t[e]=null,t),{}):n}let rl=!0;function Im(n){const t=Of(n),e=n.proxy,i=n.ctx;rl=!1,t.beforeCreate&&ru(t.beforeCreate,n,"bc");const{data:s,computed:r,methods:o,watch:a,provide:l,inject:c,created:u,beforeMount:h,mounted:f,beforeUpdate:p,updated:g,activated:_,deactivated:m,beforeDestroy:d,beforeUnmount:R,destroyed:b,unmounted:S,render:P,renderTracked:N,renderTriggered:D,errorCaptured:z,serverPrefetch:T,expose:M,inheritAttrs:A,components:q,directives:Y,filters:Q}=t;if(c&&Nm(c,i,null),o)for(const Z in o){const H=o[Z];$t(H)&&(i[Z]=H.bind(e))}if(s){const Z=s.call(e,e);ye(Z)&&(n.data=xc(Z))}if(rl=!0,r)for(const Z in r){const H=r[Z],ot=$t(H)?H.bind(e,e):$t(H.get)?H.get.bind(e,e):wn,lt=!$t(H)&&$t(H.set)?H.set.bind(e):wn,pt=Eg({get:ot,set:lt});Object.defineProperty(i,Z,{enumerable:!0,configurable:!0,get:()=>pt.value,set:Rt=>pt.value=Rt})}if(a)for(const Z in a)Nf(a[Z],i,e,Z);if(l){const Z=$t(l)?l.call(e):l;Reflect.ownKeys(Z).forEach(H=>{Vm(H,Z[H])})}u&&ru(u,n,"c");function $(Z,H){Kt(H)?H.forEach(ot=>Z(ot.bind(e))):H&&Z(H.bind(e))}if($(bm,h),$(Uf,f),$(Tm,p),$(Am,g),$(ym,_),$(Mm,m),$(Dm,z),$(Pm,N),$(Cm,D),$(wm,R),$(If,S),$(Rm,T),Kt(M))if(M.length){const Z=n.exposed||(n.exposed={});M.forEach(H=>{Object.defineProperty(Z,H,{get:()=>e[H],set:ot=>e[H]=ot,enumerable:!0})})}else n.exposed||(n.exposed={});P&&n.render===wn&&(n.render=P),A!=null&&(n.inheritAttrs=A),q&&(n.components=q),Y&&(n.directives=Y),T&&Pf(n)}function Nm(n,t,e=wn){Kt(n)&&(n=ol(n));for(const i in n){const s=n[i];let r;ye(s)?"default"in s?r=ao(s.from||i,s.default,!0):r=ao(s.from||i):r=ao(s),Le(r)?Object.defineProperty(t,i,{enumerable:!0,configurable:!0,get:()=>r.value,set:o=>r.value=o}):t[i]=r}}function ru(n,t,e){Pn(Kt(n)?n.map(i=>i.bind(t.proxy)):n.bind(t.proxy),t,e)}function Nf(n,t,e,i){let s=i.includes(".")?Kf(e,i):()=>e[i];if(we(n)){const r=t[n];$t(r)&&ua(s,r)}else if($t(n))ua(s,n.bind(e));else if(ye(n))if(Kt(n))n.forEach(r=>Nf(r,t,e,i));else{const r=$t(n.handler)?n.handler.bind(e):t[n.handler];$t(r)&&ua(s,r,n)}}function Of(n){const t=n.type,{mixins:e,extends:i}=t,{mixins:s,optionsCache:r,config:{optionMergeStrategies:o}}=n.appContext,a=r.get(t);let l;return a?l=a:!s.length&&!e&&!i?l=t:(l={},s.length&&s.forEach(c=>bo(l,c,o,!0)),bo(l,t,o)),ye(t)&&r.set(t,l),l}function bo(n,t,e,i=!1){const{mixins:s,extends:r}=t;r&&bo(n,r,e,!0),s&&s.forEach(o=>bo(n,o,e,!0));for(const o in t)if(!(i&&o==="expose")){const a=Om[o]||e&&e[o];n[o]=a?a(n[o],t[o]):t[o]}return n}const Om={data:ou,props:au,emits:au,methods:Xs,computed:Xs,beforeCreate:Ie,created:Ie,beforeMount:Ie,mounted:Ie,beforeUpdate:Ie,updated:Ie,beforeDestroy:Ie,beforeUnmount:Ie,destroyed:Ie,unmounted:Ie,activated:Ie,deactivated:Ie,errorCaptured:Ie,serverPrefetch:Ie,components:Xs,directives:Xs,watch:Bm,provide:ou,inject:Fm};function ou(n,t){return t?n?function(){return Ve($t(n)?n.call(this,this):n,$t(t)?t.call(this,this):t)}:t:n}function Fm(n,t){return Xs(ol(n),ol(t))}function ol(n){if(Kt(n)){const t={};for(let e=0;e<n.length;e++)t[n[e]]=n[e];return t}return n}function Ie(n,t){return n?[...new Set([].concat(n,t))]:t}function Xs(n,t){return n?Ve(Object.create(null),n,t):t}function au(n,t){return n?Kt(n)&&Kt(t)?[...new Set([...n,...t])]:Ve(Object.create(null),su(n),su(t??{})):t}function Bm(n,t){if(!n)return t;if(!t)return n;const e=Ve(Object.create(null),n);for(const i in t)e[i]=Ie(n[i],t[i]);return e}function Ff(){return{app:null,config:{isNativeTag:sf,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let zm=0;function Hm(n,t){return function(i,s=null){$t(i)||(i=Ve({},i)),s!=null&&!ye(s)&&(s=null);const r=Ff(),o=new WeakSet,a=[];let l=!1;const c=r.app={_uid:zm++,_component:i,_props:s,_container:null,_context:r,_instance:null,version:bg,get config(){return r.config},set config(u){},use(u,...h){return o.has(u)||(u&&$t(u.install)?(o.add(u),u.install(c,...h)):$t(u)&&(o.add(u),u(c,...h))),c},mixin(u){return r.mixins.includes(u)||r.mixins.push(u),c},component(u,h){return h?(r.components[u]=h,c):r.components[u]},directive(u,h){return h?(r.directives[u]=h,c):r.directives[u]},mount(u,h,f){if(!l){const p=c._ceVNode||Rn(i,s);return p.appContext=r,f===!0?f="svg":f===!1&&(f=void 0),n(p,u,f),l=!0,c._container=u,u.__vue_app__=c,wc(p.component)}},onUnmount(u){a.push(u)},unmount(){l&&(Pn(a,c._instance,16),n(null,c._container),delete c._container.__vue_app__)},provide(u,h){return r.provides[u]=h,c},runWithContext(u){const h=ms;ms=c;try{return u()}finally{ms=h}}};return c}}let ms=null;function Vm(n,t){if(ze){let e=ze.provides;const i=ze.parent&&ze.parent.provides;i===e&&(e=ze.provides=Object.create(i)),e[n]=t}}function ao(n,t,e=!1){const i=_g();if(i||ms){let s=ms?ms._context.provides:i?i.parent==null||i.ce?i.vnode.appContext&&i.vnode.appContext.provides:i.parent.provides:void 0;if(s&&n in s)return s[n];if(arguments.length>1)return e&&$t(t)?t.call(i&&i.proxy):t}}const Bf={},zf=()=>Object.create(Bf),Hf=n=>Object.getPrototypeOf(n)===Bf;function km(n,t,e,i=!1){const s={},r=zf();n.propsDefaults=Object.create(null),Vf(n,t,s,r);for(const o in n.propsOptions[0])o in s||(s[o]=void 0);e?n.props=i?s:im(s):n.type.props?n.props=s:n.props=r,n.attrs=r}function Gm(n,t,e,i){const{props:s,attrs:r,vnode:{patchFlag:o}}=n,a=ne(s),[l]=n.propsOptions;let c=!1;if((i||o>0)&&!(o&16)){if(o&8){const u=n.vnode.dynamicProps;for(let h=0;h<u.length;h++){let f=u[h];if(Vo(n.emitsOptions,f))continue;const p=t[f];if(l)if(ie(r,f))p!==r[f]&&(r[f]=p,c=!0);else{const g=fi(f);s[g]=al(l,a,g,p,n,!1)}else p!==r[f]&&(r[f]=p,c=!0)}}}else{Vf(n,t,s,r)&&(c=!0);let u;for(const h in a)(!t||!ie(t,h)&&((u=ki(h))===h||!ie(t,u)))&&(l?e&&(e[h]!==void 0||e[u]!==void 0)&&(s[h]=al(l,a,h,void 0,n,!0)):delete s[h]);if(r!==a)for(const h in r)(!t||!ie(t,h))&&(delete r[h],c=!0)}c&&Wn(n.attrs,"set","")}function Vf(n,t,e,i){const[s,r]=n.propsOptions;let o=!1,a;if(t)for(let l in t){if(Ks(l))continue;const c=t[l];let u;s&&ie(s,u=fi(l))?!r||!r.includes(u)?e[u]=c:(a||(a={}))[u]=c:Vo(n.emitsOptions,l)||(!(l in i)||c!==i[l])&&(i[l]=c,o=!0)}if(r){const l=ne(e),c=a||he;for(let u=0;u<r.length;u++){const h=r[u];e[h]=al(s,l,h,c[h],n,!ie(c,h))}}return o}function al(n,t,e,i,s,r){const o=n[e];if(o!=null){const a=ie(o,"default");if(a&&i===void 0){const l=o.default;if(o.type!==Function&&!o.skipFactory&&$t(l)){const{propsDefaults:c}=s;if(e in c)i=c[e];else{const u=Er(s);i=c[e]=l.call(null,t),u()}}else i=l;s.ce&&s.ce._setProp(e,i)}o[0]&&(r&&!a?i=!1:o[1]&&(i===""||i===ki(e))&&(i=!0))}return i}const Wm=new WeakMap;function kf(n,t,e=!1){const i=e?Wm:t.propsCache,s=i.get(n);if(s)return s;const r=n.props,o={},a=[];let l=!1;if(!$t(n)){const u=h=>{l=!0;const[f,p]=kf(h,t,!0);Ve(o,f),p&&a.push(...p)};!e&&t.mixins.length&&t.mixins.forEach(u),n.extends&&u(n.extends),n.mixins&&n.mixins.forEach(u)}if(!r&&!l)return ye(n)&&i.set(n,ds),ds;if(Kt(r))for(let u=0;u<r.length;u++){const h=fi(r[u]);lu(h)&&(o[h]=he)}else if(r)for(const u in r){const h=fi(u);if(lu(h)){const f=r[u],p=o[h]=Kt(f)||$t(f)?{type:f}:Ve({},f),g=p.type;let _=!1,m=!0;if(Kt(g))for(let d=0;d<g.length;++d){const R=g[d],b=$t(R)&&R.name;if(b==="Boolean"){_=!0;break}else b==="String"&&(m=!1)}else _=$t(g)&&g.name==="Boolean";p[0]=_,p[1]=m,(_||ie(p,"default"))&&a.push(h)}}const c=[o,a];return ye(n)&&i.set(n,c),c}function lu(n){return n[0]!=="$"&&!Ks(n)}const bc=n=>n==="_"||n==="_ctx"||n==="$stable",Tc=n=>Kt(n)?n.map(Mn):[Mn(n)],Xm=(n,t,e)=>{if(t._n)return t;const i=_m((...s)=>Tc(t(...s)),e);return i._c=!1,i},Gf=(n,t,e)=>{const i=n._ctx;for(const s in n){if(bc(s))continue;const r=n[s];if($t(r))t[s]=Xm(s,r,i);else if(r!=null){const o=Tc(r);t[s]=()=>o}}},Wf=(n,t)=>{const e=Tc(t);n.slots.default=()=>e},Xf=(n,t,e)=>{for(const i in t)(e||!bc(i))&&(n[i]=t[i])},qm=(n,t,e)=>{const i=n.slots=zf();if(n.vnode.shapeFlag&32){const s=t._;s?(Xf(i,t,e),e&&af(i,"_",s,!0)):Gf(t,i)}else t&&Wf(n,t)},Ym=(n,t,e)=>{const{vnode:i,slots:s}=n;let r=!0,o=he;if(i.shapeFlag&32){const a=t._;a?e&&a===1?r=!1:Xf(s,t,e):(r=!t.$stable,Gf(t,s)),o=t}else t&&(Wf(n,t),o={default:1});if(r)for(const a in s)!bc(a)&&o[a]==null&&delete s[a]},Qe=ag;function jm(n){return Km(n)}function Km(n,t){const e=Fo();e.__VUE__=!0;const{insert:i,remove:s,patchProp:r,createElement:o,createText:a,createComment:l,setText:c,setElementText:u,parentNode:h,nextSibling:f,setScopeId:p=wn,insertStaticContent:g}=n,_=(w,x,C,L=null,O=null,I=null,K=void 0,k=null,X=!!x.dynamicChildren)=>{if(w===x)return;w&&!Fs(w,x)&&(L=ft(w),Rt(w,O,I,!0),w=null),x.patchFlag===-2&&(X=!1,x.dynamicChildren=null);const{type:st,ref:dt,shapeFlag:y}=x;switch(st){case ko:m(w,x,C,L);break;case di:d(w,x,C,L);break;case ha:w==null&&R(x,C,L,K);break;case Gn:q(w,x,C,L,O,I,K,k,X);break;default:y&1?P(w,x,C,L,O,I,K,k,X):y&6?Y(w,x,C,L,O,I,K,k,X):(y&64||y&128)&&st.process(w,x,C,L,O,I,K,k,X,Ot)}dt!=null&&O?Qs(dt,w&&w.ref,I,x||w,!x):dt==null&&w&&w.ref!=null&&Qs(w.ref,null,I,w,!0)},m=(w,x,C,L)=>{if(w==null)i(x.el=a(x.children),C,L);else{const O=x.el=w.el;x.children!==w.children&&c(O,x.children)}},d=(w,x,C,L)=>{w==null?i(x.el=l(x.children||""),C,L):x.el=w.el},R=(w,x,C,L)=>{[w.el,w.anchor]=g(w.children,x,C,L,w.el,w.anchor)},b=({el:w,anchor:x},C,L)=>{let O;for(;w&&w!==x;)O=f(w),i(w,C,L),w=O;i(x,C,L)},S=({el:w,anchor:x})=>{let C;for(;w&&w!==x;)C=f(w),s(w),w=C;s(x)},P=(w,x,C,L,O,I,K,k,X)=>{x.type==="svg"?K="svg":x.type==="math"&&(K="mathml"),w==null?N(x,C,L,O,I,K,k,X):T(w,x,O,I,K,k,X)},N=(w,x,C,L,O,I,K,k)=>{let X,st;const{props:dt,shapeFlag:y,transition:v,dirs:U}=w;if(X=w.el=o(w.type,I,dt&&dt.is,dt),y&8?u(X,w.children):y&16&&z(w.children,X,null,L,O,ca(w,I),K,k),U&&vi(w,null,L,"created"),D(X,w,w.scopeId,K,L),dt){for(const rt in dt)rt!=="value"&&!Ks(rt)&&r(X,rt,null,dt[rt],I,L);"value"in dt&&r(X,"value",null,dt.value,I),(st=dt.onVnodeBeforeMount)&&xn(st,L,w)}U&&vi(w,null,L,"beforeMount");const W=$m(O,v);W&&v.beforeEnter(X),i(X,x,C),((st=dt&&dt.onVnodeMounted)||W||U)&&Qe(()=>{st&&xn(st,L,w),W&&v.enter(X),U&&vi(w,null,L,"mounted")},O)},D=(w,x,C,L,O)=>{if(C&&p(w,C),L)for(let I=0;I<L.length;I++)p(w,L[I]);if(O){let I=O.subTree;if(x===I||Zf(I.type)&&(I.ssContent===x||I.ssFallback===x)){const K=O.vnode;D(w,K,K.scopeId,K.slotScopeIds,O.parent)}}},z=(w,x,C,L,O,I,K,k,X=0)=>{for(let st=X;st<w.length;st++){const dt=w[st]=k?ri(w[st]):Mn(w[st]);_(null,dt,x,C,L,O,I,K,k)}},T=(w,x,C,L,O,I,K)=>{const k=x.el=w.el;let{patchFlag:X,dynamicChildren:st,dirs:dt}=x;X|=w.patchFlag&16;const y=w.props||he,v=x.props||he;let U;if(C&&xi(C,!1),(U=v.onVnodeBeforeUpdate)&&xn(U,C,x,w),dt&&vi(x,w,C,"beforeUpdate"),C&&xi(C,!0),(y.innerHTML&&v.innerHTML==null||y.textContent&&v.textContent==null)&&u(k,""),st?M(w.dynamicChildren,st,k,C,L,ca(x,O),I):K||H(w,x,k,null,C,L,ca(x,O),I,!1),X>0){if(X&16)A(k,y,v,C,O);else if(X&2&&y.class!==v.class&&r(k,"class",null,v.class,O),X&4&&r(k,"style",y.style,v.style,O),X&8){const W=x.dynamicProps;for(let rt=0;rt<W.length;rt++){const j=W[rt],Mt=y[j],ct=v[j];(ct!==Mt||j==="value")&&r(k,j,Mt,ct,O,C)}}X&1&&w.children!==x.children&&u(k,x.children)}else!K&&st==null&&A(k,y,v,C,O);((U=v.onVnodeUpdated)||dt)&&Qe(()=>{U&&xn(U,C,x,w),dt&&vi(x,w,C,"updated")},L)},M=(w,x,C,L,O,I,K)=>{for(let k=0;k<x.length;k++){const X=w[k],st=x[k],dt=X.el&&(X.type===Gn||!Fs(X,st)||X.shapeFlag&198)?h(X.el):C;_(X,st,dt,null,L,O,I,K,!0)}},A=(w,x,C,L,O)=>{if(x!==C){if(x!==he)for(const I in x)!Ks(I)&&!(I in C)&&r(w,I,x[I],null,O,L);for(const I in C){if(Ks(I))continue;const K=C[I],k=x[I];K!==k&&I!=="value"&&r(w,I,k,K,O,L)}"value"in C&&r(w,"value",x.value,C.value,O)}},q=(w,x,C,L,O,I,K,k,X)=>{const st=x.el=w?w.el:a(""),dt=x.anchor=w?w.anchor:a("");let{patchFlag:y,dynamicChildren:v,slotScopeIds:U}=x;U&&(k=k?k.concat(U):U),w==null?(i(st,C,L),i(dt,C,L),z(x.children||[],C,dt,O,I,K,k,X)):y>0&&y&64&&v&&w.dynamicChildren?(M(w.dynamicChildren,v,C,O,I,K,k),(x.key!=null||O&&x===O.subTree)&&qf(w,x,!0)):H(w,x,C,dt,O,I,K,k,X)},Y=(w,x,C,L,O,I,K,k,X)=>{x.slotScopeIds=k,w==null?x.shapeFlag&512?O.ctx.activate(x,C,L,K,X):Q(x,C,L,O,I,K,X):nt(w,x,X)},Q=(w,x,C,L,O,I,K)=>{const k=w.component=gg(w,L,O);if(Df(w)&&(k.ctx.renderer=Ot),vg(k,!1,K),k.asyncDep){if(O&&O.registerDep(k,$,K),!w.el){const X=k.subTree=Rn(di);d(null,X,x,C),w.placeholder=X.el}}else $(k,w,x,C,O,I,K)},nt=(w,x,C)=>{const L=x.component=w.component;if(rg(w,x,C))if(L.asyncDep&&!L.asyncResolved){Z(L,x,C);return}else L.next=x,L.update();else x.el=w.el,L.vnode=x},$=(w,x,C,L,O,I,K)=>{const k=()=>{if(w.isMounted){let{next:y,bu:v,u:U,parent:W,vnode:rt}=w;{const At=Yf(w);if(At){y&&(y.el=rt.el,Z(w,y,K)),At.asyncDep.then(()=>{w.isUnmounted||k()});return}}let j=y,Mt;xi(w,!1),y?(y.el=rt.el,Z(w,y,K)):y=rt,v&&ia(v),(Mt=y.props&&y.props.onVnodeBeforeUpdate)&&xn(Mt,W,y,rt),xi(w,!0);const ct=uu(w),Tt=w.subTree;w.subTree=ct,_(Tt,ct,h(Tt.el),ft(Tt),w,O,I),y.el=ct.el,j===null&&og(w,ct.el),U&&Qe(U,O),(Mt=y.props&&y.props.onVnodeUpdated)&&Qe(()=>xn(Mt,W,y,rt),O)}else{let y;const{el:v,props:U}=x,{bm:W,m:rt,parent:j,root:Mt,type:ct}=w,Tt=tr(x);xi(w,!1),W&&ia(W),!Tt&&(y=U&&U.onVnodeBeforeMount)&&xn(y,j,x),xi(w,!0);{Mt.ce&&Mt.ce._def.shadowRoot!==!1&&Mt.ce._injectChildStyle(ct);const At=w.subTree=uu(w);_(null,At,C,L,w,O,I),x.el=At.el}if(rt&&Qe(rt,O),!Tt&&(y=U&&U.onVnodeMounted)){const At=x;Qe(()=>xn(y,j,At),O)}(x.shapeFlag&256||j&&tr(j.vnode)&&j.vnode.shapeFlag&256)&&w.a&&Qe(w.a,O),w.isMounted=!0,x=C=L=null}};w.scope.on();const X=w.effect=new cf(k);w.scope.off();const st=w.update=X.run.bind(X),dt=w.job=X.runIfDirty.bind(X);dt.i=w,dt.id=w.uid,X.scheduler=()=>Mc(dt),xi(w,!0),st()},Z=(w,x,C)=>{x.component=w;const L=w.vnode.props;w.vnode=x,w.next=null,Gm(w,x.props,L,C),Ym(w,x.children,C),jn(),iu(w),Kn()},H=(w,x,C,L,O,I,K,k,X=!1)=>{const st=w&&w.children,dt=w?w.shapeFlag:0,y=x.children,{patchFlag:v,shapeFlag:U}=x;if(v>0){if(v&128){lt(st,y,C,L,O,I,K,k,X);return}else if(v&256){ot(st,y,C,L,O,I,K,k,X);return}}U&8?(dt&16&&ut(st,O,I),y!==st&&u(C,y)):dt&16?U&16?lt(st,y,C,L,O,I,K,k,X):ut(st,O,I,!0):(dt&8&&u(C,""),U&16&&z(y,C,L,O,I,K,k,X))},ot=(w,x,C,L,O,I,K,k,X)=>{w=w||ds,x=x||ds;const st=w.length,dt=x.length,y=Math.min(st,dt);let v;for(v=0;v<y;v++){const U=x[v]=X?ri(x[v]):Mn(x[v]);_(w[v],U,C,null,O,I,K,k,X)}st>dt?ut(w,O,I,!0,!1,y):z(x,C,L,O,I,K,k,X,y)},lt=(w,x,C,L,O,I,K,k,X)=>{let st=0;const dt=x.length;let y=w.length-1,v=dt-1;for(;st<=y&&st<=v;){const U=w[st],W=x[st]=X?ri(x[st]):Mn(x[st]);if(Fs(U,W))_(U,W,C,null,O,I,K,k,X);else break;st++}for(;st<=y&&st<=v;){const U=w[y],W=x[v]=X?ri(x[v]):Mn(x[v]);if(Fs(U,W))_(U,W,C,null,O,I,K,k,X);else break;y--,v--}if(st>y){if(st<=v){const U=v+1,W=U<dt?x[U].el:L;for(;st<=v;)_(null,x[st]=X?ri(x[st]):Mn(x[st]),C,W,O,I,K,k,X),st++}}else if(st>v)for(;st<=y;)Rt(w[st],O,I,!0),st++;else{const U=st,W=st,rt=new Map;for(st=W;st<=v;st++){const Ut=x[st]=X?ri(x[st]):Mn(x[st]);Ut.key!=null&&rt.set(Ut.key,st)}let j,Mt=0;const ct=v-W+1;let Tt=!1,At=0;const ht=new Array(ct);for(st=0;st<ct;st++)ht[st]=0;for(st=U;st<=y;st++){const Ut=w[st];if(Mt>=ct){Rt(Ut,O,I,!0);continue}let wt;if(Ut.key!=null)wt=rt.get(Ut.key);else for(j=W;j<=v;j++)if(ht[j-W]===0&&Fs(Ut,x[j])){wt=j;break}wt===void 0?Rt(Ut,O,I,!0):(ht[wt-W]=st+1,wt>=At?At=wt:Tt=!0,_(Ut,x[wt],C,null,O,I,K,k,X),Mt++)}const Et=Tt?Zm(ht):ds;for(j=Et.length-1,st=ct-1;st>=0;st--){const Ut=W+st,wt=x[Ut],St=x[Ut+1],Gt=Ut+1<dt?St.el||St.placeholder:L;ht[st]===0?_(null,wt,C,Gt,O,I,K,k,X):Tt&&(j<0||st!==Et[j]?pt(wt,C,Gt,2):j--)}}},pt=(w,x,C,L,O=null)=>{const{el:I,type:K,transition:k,children:X,shapeFlag:st}=w;if(st&6){pt(w.component.subTree,x,C,L);return}if(st&128){w.suspense.move(x,C,L);return}if(st&64){K.move(w,x,C,Ot);return}if(K===Gn){i(I,x,C);for(let y=0;y<X.length;y++)pt(X[y],x,C,L);i(w.anchor,x,C);return}if(K===ha){b(w,x,C);return}if(L!==2&&st&1&&k)if(L===0)k.beforeEnter(I),i(I,x,C),Qe(()=>k.enter(I),O);else{const{leave:y,delayLeave:v,afterLeave:U}=k,W=()=>{w.ctx.isUnmounted?s(I):i(I,x,C)},rt=()=>{I._isLeaving&&I[Sm](!0),y(I,()=>{W(),U&&U()})};v?v(I,W,rt):rt()}else i(I,x,C)},Rt=(w,x,C,L=!1,O=!1)=>{const{type:I,props:K,ref:k,children:X,dynamicChildren:st,shapeFlag:dt,patchFlag:y,dirs:v,cacheIndex:U}=w;if(y===-2&&(O=!1),k!=null&&(jn(),Qs(k,null,C,w,!0),Kn()),U!=null&&(x.renderCache[U]=void 0),dt&256){x.ctx.deactivate(w);return}const W=dt&1&&v,rt=!tr(w);let j;if(rt&&(j=K&&K.onVnodeBeforeUnmount)&&xn(j,x,w),dt&6)it(w.component,C,L);else{if(dt&128){w.suspense.unmount(C,L);return}W&&vi(w,null,x,"beforeUnmount"),dt&64?w.type.remove(w,x,C,Ot,L):st&&!st.hasOnce&&(I!==Gn||y>0&&y&64)?ut(st,x,C,!1,!0):(I===Gn&&y&384||!O&&dt&16)&&ut(X,x,C),L&&Ft(w)}(rt&&(j=K&&K.onVnodeUnmounted)||W)&&Qe(()=>{j&&xn(j,x,w),W&&vi(w,null,x,"unmounted")},C)},Ft=w=>{const{type:x,el:C,anchor:L,transition:O}=w;if(x===Gn){Vt(C,L);return}if(x===ha){S(w);return}const I=()=>{s(C),O&&!O.persisted&&O.afterLeave&&O.afterLeave()};if(w.shapeFlag&1&&O&&!O.persisted){const{leave:K,delayLeave:k}=O,X=()=>K(C,I);k?k(w.el,I,X):X()}else I()},Vt=(w,x)=>{let C;for(;w!==x;)C=f(w),s(w),w=C;s(x)},it=(w,x,C)=>{const{bum:L,scope:O,job:I,subTree:K,um:k,m:X,a:st}=w;cu(X),cu(st),L&&ia(L),O.stop(),I&&(I.flags|=8,Rt(K,w,x,C)),k&&Qe(k,x),Qe(()=>{w.isUnmounted=!0},x)},ut=(w,x,C,L=!1,O=!1,I=0)=>{for(let K=I;K<w.length;K++)Rt(w[K],x,C,L,O)},ft=w=>{if(w.shapeFlag&6)return ft(w.component.subTree);if(w.shapeFlag&128)return w.suspense.next();const x=f(w.anchor||w.el),C=x&&x[vm];return C?f(C):x};let Ct=!1;const Pt=(w,x,C)=>{w==null?x._vnode&&Rt(x._vnode,null,null,!0):_(x._vnode||null,w,x,null,null,null,C),x._vnode=w,Ct||(Ct=!0,iu(),wf(),Ct=!1)},Ot={p:_,um:Rt,m:pt,r:Ft,mt:Q,mc:z,pc:H,pbc:M,n:ft,o:n};return{render:Pt,hydrate:void 0,createApp:Hm(Pt)}}function ca({type:n,props:t},e){return e==="svg"&&n==="foreignObject"||e==="mathml"&&n==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:e}function xi({effect:n,job:t},e){e?(n.flags|=32,t.flags|=4):(n.flags&=-33,t.flags&=-5)}function $m(n,t){return(!n||n&&!n.pendingBranch)&&t&&!t.persisted}function qf(n,t,e=!1){const i=n.children,s=t.children;if(Kt(i)&&Kt(s))for(let r=0;r<i.length;r++){const o=i[r];let a=s[r];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=s[r]=ri(s[r]),a.el=o.el),!e&&a.patchFlag!==-2&&qf(o,a)),a.type===ko&&a.patchFlag!==-1&&(a.el=o.el),a.type===di&&!a.el&&(a.el=o.el)}}function Zm(n){const t=n.slice(),e=[0];let i,s,r,o,a;const l=n.length;for(i=0;i<l;i++){const c=n[i];if(c!==0){if(s=e[e.length-1],n[s]<c){t[i]=s,e.push(i);continue}for(r=0,o=e.length-1;r<o;)a=r+o>>1,n[e[a]]<c?r=a+1:o=a;c<n[e[r]]&&(r>0&&(t[i]=e[r-1]),e[r]=i)}}for(r=e.length,o=e[r-1];r-- >0;)e[r]=o,o=t[o];return e}function Yf(n){const t=n.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:Yf(t)}function cu(n){if(n)for(let t=0;t<n.length;t++)n[t].flags|=8}const Jm=Symbol.for("v-scx"),Qm=()=>ao(Jm);function ua(n,t,e){return jf(n,t,e)}function jf(n,t,e=he){const{immediate:i,deep:s,flush:r,once:o}=e,a=Ve({},e),l=t&&i||!t&&r!=="post";let c;if(fr){if(r==="sync"){const p=Qm();c=p.__watcherHandles||(p.__watcherHandles=[])}else if(!l){const p=()=>{};return p.stop=wn,p.resume=wn,p.pause=wn,p}}const u=ze;a.call=(p,g,_)=>Pn(p,u,g,_);let h=!1;r==="post"?a.scheduler=p=>{Qe(p,u&&u.suspense)}:r!=="sync"&&(h=!0,a.scheduler=(p,g)=>{g?p():Mc(p)}),a.augmentJob=p=>{t&&(p.flags|=4),h&&(p.flags|=2,u&&(p.id=u.uid,p.i=u))};const f=fm(n,t,a);return fr&&(c?c.push(f):l&&f()),f}function tg(n,t,e){const i=this.proxy,s=we(n)?n.includes(".")?Kf(i,n):()=>i[n]:n.bind(i,i);let r;$t(t)?r=t:(r=t.handler,e=t);const o=Er(this),a=jf(s,r.bind(i),e);return o(),a}function Kf(n,t){const e=t.split(".");return()=>{let i=n;for(let s=0;s<e.length&&i;s++)i=i[e[s]];return i}}const eg=(n,t)=>t==="modelValue"||t==="model-value"?n.modelModifiers:n[`${t}Modifiers`]||n[`${fi(t)}Modifiers`]||n[`${ki(t)}Modifiers`];function ng(n,t,...e){if(n.isUnmounted)return;const i=n.vnode.props||he;let s=e;const r=t.startsWith("update:"),o=r&&eg(i,t.slice(7));o&&(o.trim&&(s=e.map(u=>we(u)?u.trim():u)),o.number&&(s=e.map(Pp)));let a,l=i[a=na(t)]||i[a=na(fi(t))];!l&&r&&(l=i[a=na(ki(t))]),l&&Pn(l,n,6,s);const c=i[a+"Once"];if(c){if(!n.emitted)n.emitted={};else if(n.emitted[a])return;n.emitted[a]=!0,Pn(c,n,6,s)}}function $f(n,t,e=!1){const i=t.emitsCache,s=i.get(n);if(s!==void 0)return s;const r=n.emits;let o={},a=!1;if(!$t(n)){const l=c=>{const u=$f(c,t,!0);u&&(a=!0,Ve(o,u))};!e&&t.mixins.length&&t.mixins.forEach(l),n.extends&&l(n.extends),n.mixins&&n.mixins.forEach(l)}return!r&&!a?(ye(n)&&i.set(n,null),null):(Kt(r)?r.forEach(l=>o[l]=null):Ve(o,r),ye(n)&&i.set(n,o),o)}function Vo(n,t){return!n||!Io(t)?!1:(t=t.slice(2).replace(/Once$/,""),ie(n,t[0].toLowerCase()+t.slice(1))||ie(n,ki(t))||ie(n,t))}function uu(n){const{type:t,vnode:e,proxy:i,withProxy:s,propsOptions:[r],slots:o,attrs:a,emit:l,render:c,renderCache:u,props:h,data:f,setupState:p,ctx:g,inheritAttrs:_}=n,m=Eo(n);let d,R;try{if(e.shapeFlag&4){const S=s||i,P=S;d=Mn(c.call(P,S,u,h,p,f,g)),R=a}else{const S=t;d=Mn(S.length>1?S(h,{attrs:a,slots:o,emit:l}):S(h,null)),R=t.props?a:ig(a)}}catch(S){nr.length=0,zo(S,n,1),d=Rn(di)}let b=d;if(R&&_!==!1){const S=Object.keys(R),{shapeFlag:P}=b;S.length&&P&7&&(r&&S.some(cc)&&(R=sg(R,r)),b=ys(b,R,!1,!0))}return e.dirs&&(b=ys(b,null,!1,!0),b.dirs=b.dirs?b.dirs.concat(e.dirs):e.dirs),e.transition&&Ec(b,e.transition),d=b,Eo(m),d}const ig=n=>{let t;for(const e in n)(e==="class"||e==="style"||Io(e))&&((t||(t={}))[e]=n[e]);return t},sg=(n,t)=>{const e={};for(const i in n)(!cc(i)||!(i.slice(9)in t))&&(e[i]=n[i]);return e};function rg(n,t,e){const{props:i,children:s,component:r}=n,{props:o,children:a,patchFlag:l}=t,c=r.emitsOptions;if(t.dirs||t.transition)return!0;if(e&&l>=0){if(l&1024)return!0;if(l&16)return i?hu(i,o,c):!!o;if(l&8){const u=t.dynamicProps;for(let h=0;h<u.length;h++){const f=u[h];if(o[f]!==i[f]&&!Vo(c,f))return!0}}}else return(s||a)&&(!a||!a.$stable)?!0:i===o?!1:i?o?hu(i,o,c):!0:!!o;return!1}function hu(n,t,e){const i=Object.keys(t);if(i.length!==Object.keys(n).length)return!0;for(let s=0;s<i.length;s++){const r=i[s];if(t[r]!==n[r]&&!Vo(e,r))return!0}return!1}function og({vnode:n,parent:t},e){for(;t;){const i=t.subTree;if(i.suspense&&i.suspense.activeBranch===n&&(i.el=n.el),i===n)(n=t.vnode).el=e,t=t.parent;else break}}const Zf=n=>n.__isSuspense;function ag(n,t){t&&t.pendingBranch?Kt(n)?t.effects.push(...n):t.effects.push(n):gm(n)}const Gn=Symbol.for("v-fgt"),ko=Symbol.for("v-txt"),di=Symbol.for("v-cmt"),ha=Symbol.for("v-stc"),nr=[];let tn=null;function ur(n=!1){nr.push(tn=n?null:[])}function lg(){nr.pop(),tn=nr[nr.length-1]||null}let hr=1;function fu(n,t=!1){hr+=n,n<0&&tn&&t&&(tn.hasOnce=!0)}function Jf(n){return n.dynamicChildren=hr>0?tn||ds:null,lg(),hr>0&&tn&&tn.push(n),n}function ll(n,t,e,i,s,r){return Jf(gs(n,t,e,i,s,r,!0))}function Qf(n,t,e,i,s){return Jf(Rn(n,t,e,i,s,!0))}function td(n){return n?n.__v_isVNode===!0:!1}function Fs(n,t){return n.type===t.type&&n.key===t.key}const ed=({key:n})=>n??null,lo=({ref:n,ref_key:t,ref_for:e})=>(typeof n=="number"&&(n=""+n),n!=null?we(n)||Le(n)||$t(n)?{i:bn,r:n,k:t,f:!!e}:n:null);function gs(n,t=null,e=null,i=0,s=null,r=n===Gn?0:1,o=!1,a=!1){const l={__v_isVNode:!0,__v_skip:!0,type:n,props:t,key:t&&ed(t),ref:t&&lo(t),scopeId:Cf,slotScopeIds:null,children:e,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:r,patchFlag:i,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:bn};return a?(Ac(l,e),r&128&&n.normalize(l)):e&&(l.shapeFlag|=we(e)?8:16),hr>0&&!o&&tn&&(l.patchFlag>0||r&6)&&l.patchFlag!==32&&tn.push(l),l}const Rn=cg;function cg(n,t=null,e=null,i=0,s=null,r=!1){if((!n||n===Lm)&&(n=di),td(n)){const a=ys(n,t,!0);return e&&Ac(a,e),hr>0&&!r&&tn&&(a.shapeFlag&6?tn[tn.indexOf(n)]=a:tn.push(a)),a.patchFlag=-2,a}if(Mg(n)&&(n=n.__vccOpts),t){t=ug(t);let{class:a,style:l}=t;a&&!we(a)&&(t.class=Bo(a)),ye(l)&&(yc(l)&&!Kt(l)&&(l=Ve({},l)),t.style=fc(l))}const o=we(n)?1:Zf(n)?128:xm(n)?64:ye(n)?4:$t(n)?2:0;return gs(n,t,e,i,s,o,r,!0)}function ug(n){return n?yc(n)||Hf(n)?Ve({},n):n:null}function ys(n,t,e=!1,i=!1){const{props:s,ref:r,patchFlag:o,children:a,transition:l}=n,c=t?dg(s||{},t):s,u={__v_isVNode:!0,__v_skip:!0,type:n.type,props:c,key:c&&ed(c),ref:t&&t.ref?e&&r?Kt(r)?r.concat(lo(t)):[r,lo(t)]:lo(t):r,scopeId:n.scopeId,slotScopeIds:n.slotScopeIds,children:a,target:n.target,targetStart:n.targetStart,targetAnchor:n.targetAnchor,staticCount:n.staticCount,shapeFlag:n.shapeFlag,patchFlag:t&&n.type!==Gn?o===-1?16:o|16:o,dynamicProps:n.dynamicProps,dynamicChildren:n.dynamicChildren,appContext:n.appContext,dirs:n.dirs,transition:l,component:n.component,suspense:n.suspense,ssContent:n.ssContent&&ys(n.ssContent),ssFallback:n.ssFallback&&ys(n.ssFallback),placeholder:n.placeholder,el:n.el,anchor:n.anchor,ctx:n.ctx,ce:n.ce};return l&&i&&Ec(u,l.clone(u)),u}function hg(n=" ",t=0){return Rn(ko,null,n,t)}function fg(n="",t=!1){return t?(ur(),Qf(di,null,n)):Rn(di,null,n)}function Mn(n){return n==null||typeof n=="boolean"?Rn(di):Kt(n)?Rn(Gn,null,n.slice()):td(n)?ri(n):Rn(ko,null,String(n))}function ri(n){return n.el===null&&n.patchFlag!==-1||n.memo?n:ys(n)}function Ac(n,t){let e=0;const{shapeFlag:i}=n;if(t==null)t=null;else if(Kt(t))e=16;else if(typeof t=="object")if(i&65){const s=t.default;s&&(s._c&&(s._d=!1),Ac(n,s()),s._c&&(s._d=!0));return}else{e=32;const s=t._;!s&&!Hf(t)?t._ctx=bn:s===3&&bn&&(bn.slots._===1?t._=1:(t._=2,n.patchFlag|=1024))}else $t(t)?(t={default:t,_ctx:bn},e=32):(t=String(t),i&64?(e=16,t=[hg(t)]):e=8);n.children=t,n.shapeFlag|=e}function dg(...n){const t={};for(let e=0;e<n.length;e++){const i=n[e];for(const s in i)if(s==="class")t.class!==i.class&&(t.class=Bo([t.class,i.class]));else if(s==="style")t.style=fc([t.style,i.style]);else if(Io(s)){const r=t[s],o=i[s];o&&r!==o&&!(Kt(r)&&r.includes(o))&&(t[s]=r?[].concat(r,o):o)}else s!==""&&(t[s]=i[s])}return t}function xn(n,t,e,i=null){Pn(n,t,7,[e,i])}const pg=Ff();let mg=0;function gg(n,t,e){const i=n.type,s=(t?t.appContext:n.appContext)||pg,r={uid:mg++,vnode:n,type:i,parent:t,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new Fp(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(s.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:kf(i,s),emitsOptions:$f(i,s),emit:null,emitted:null,propsDefaults:he,inheritAttrs:i.inheritAttrs,ctx:he,data:he,props:he,attrs:he,slots:he,refs:he,setupState:he,setupContext:null,suspense:e,suspenseId:e?e.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return r.ctx={_:r},r.root=t?t.root:r,r.emit=ng.bind(null,r),n.ce&&n.ce(r),r}let ze=null;const _g=()=>ze||bn;let To,cl;{const n=Fo(),t=(e,i)=>{let s;return(s=n[e])||(s=n[e]=[]),s.push(i),r=>{s.length>1?s.forEach(o=>o(r)):s[0](r)}};To=t("__VUE_INSTANCE_SETTERS__",e=>ze=e),cl=t("__VUE_SSR_SETTERS__",e=>fr=e)}const Er=n=>{const t=ze;return To(n),n.scope.on(),()=>{n.scope.off(),To(t)}},du=()=>{ze&&ze.scope.off(),To(null)};function nd(n){return n.vnode.shapeFlag&4}let fr=!1;function vg(n,t=!1,e=!1){t&&cl(t);const{props:i,children:s}=n.vnode,r=nd(n);km(n,i,r,t),qm(n,s,e||t);const o=r?xg(n,t):void 0;return t&&cl(!1),o}function xg(n,t){const e=n.type;n.accessCache=Object.create(null),n.proxy=new Proxy(n.ctx,Um);const{setup:i}=e;if(i){jn();const s=n.setupContext=i.length>1?yg(n):null,r=Er(n),o=Mr(i,n,0,[n.props,s]),a=rf(o);if(Kn(),r(),(a||n.sp)&&!tr(n)&&Pf(n),a){if(o.then(du,du),t)return o.then(l=>{pu(n,l)}).catch(l=>{zo(l,n,0)});n.asyncDep=o}else pu(n,o)}else id(n)}function pu(n,t,e){$t(t)?n.type.__ssrInlineRender?n.ssrRender=t:n.render=t:ye(t)&&(n.setupState=bf(t)),id(n)}function id(n,t,e){const i=n.type;n.render||(n.render=i.render||wn);{const s=Er(n);jn();try{Im(n)}finally{Kn(),s()}}}const Sg={get(n,t){return Pe(n,"get",""),n[t]}};function yg(n){const t=e=>{n.exposed=e||{}};return{attrs:new Proxy(n.attrs,Sg),slots:n.slots,emit:n.emit,expose:t}}function wc(n){return n.exposed?n.exposeProxy||(n.exposeProxy=new Proxy(bf(sm(n.exposed)),{get(t,e){if(e in t)return t[e];if(e in er)return er[e](n)},has(t,e){return e in t||e in er}})):n.proxy}function Mg(n){return $t(n)&&"__vccOpts"in n}const Eg=(n,t)=>um(n,t,fr),bg="3.5.20";/**
* @vue/runtime-dom v3.5.20
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let ul;const mu=typeof window<"u"&&window.trustedTypes;if(mu)try{ul=mu.createPolicy("vue",{createHTML:n=>n})}catch{}const sd=ul?n=>ul.createHTML(n):n=>n,Tg="http://www.w3.org/2000/svg",Ag="http://www.w3.org/1998/Math/MathML",kn=typeof document<"u"?document:null,gu=kn&&kn.createElement("template"),wg={insert:(n,t,e)=>{t.insertBefore(n,e||null)},remove:n=>{const t=n.parentNode;t&&t.removeChild(n)},createElement:(n,t,e,i)=>{const s=t==="svg"?kn.createElementNS(Tg,n):t==="mathml"?kn.createElementNS(Ag,n):e?kn.createElement(n,{is:e}):kn.createElement(n);return n==="select"&&i&&i.multiple!=null&&s.setAttribute("multiple",i.multiple),s},createText:n=>kn.createTextNode(n),createComment:n=>kn.createComment(n),setText:(n,t)=>{n.nodeValue=t},setElementText:(n,t)=>{n.textContent=t},parentNode:n=>n.parentNode,nextSibling:n=>n.nextSibling,querySelector:n=>kn.querySelector(n),setScopeId(n,t){n.setAttribute(t,"")},insertStaticContent(n,t,e,i,s,r){const o=e?e.previousSibling:t.lastChild;if(s&&(s===r||s.nextSibling))for(;t.insertBefore(s.cloneNode(!0),e),!(s===r||!(s=s.nextSibling)););else{gu.innerHTML=sd(i==="svg"?`<svg>${n}</svg>`:i==="mathml"?`<math>${n}</math>`:n);const a=gu.content;if(i==="svg"||i==="mathml"){const l=a.firstChild;for(;l.firstChild;)a.appendChild(l.firstChild);a.removeChild(l)}t.insertBefore(a,e)}return[o?o.nextSibling:t.firstChild,e?e.previousSibling:t.lastChild]}},Rg=Symbol("_vtc");function Cg(n,t,e){const i=n[Rg];i&&(t=(t?[t,...i]:[...i]).join(" ")),t==null?n.removeAttribute("class"):e?n.setAttribute("class",t):n.className=t}const _u=Symbol("_vod"),Pg=Symbol("_vsh"),Dg=Symbol(""),Lg=/(^|;)\s*display\s*:/;function Ug(n,t,e){const i=n.style,s=we(e);let r=!1;if(e&&!s){if(t)if(we(t))for(const o of t.split(";")){const a=o.slice(0,o.indexOf(":")).trim();e[a]==null&&co(i,a,"")}else for(const o in t)e[o]==null&&co(i,o,"");for(const o in e)o==="display"&&(r=!0),co(i,o,e[o])}else if(s){if(t!==e){const o=i[Dg];o&&(e+=";"+o),i.cssText=e,r=Lg.test(e)}}else t&&n.removeAttribute("style");_u in n&&(n[_u]=r?i.display:"",n[Pg]&&(i.display="none"))}const vu=/\s*!important$/;function co(n,t,e){if(Kt(e))e.forEach(i=>co(n,t,i));else if(e==null&&(e=""),t.startsWith("--"))n.setProperty(t,e);else{const i=Ig(n,t);vu.test(e)?n.setProperty(ki(i),e.replace(vu,""),"important"):n[i]=e}}const xu=["Webkit","Moz","ms"],fa={};function Ig(n,t){const e=fa[t];if(e)return e;let i=fi(t);if(i!=="filter"&&i in n)return fa[t]=i;i=of(i);for(let s=0;s<xu.length;s++){const r=xu[s]+i;if(r in n)return fa[t]=r}return t}const Su="http://www.w3.org/1999/xlink";function yu(n,t,e,i,s,r=Op(t)){i&&t.startsWith("xlink:")?e==null?n.removeAttributeNS(Su,t.slice(6,t.length)):n.setAttributeNS(Su,t,e):e==null||r&&!lf(e)?n.removeAttribute(t):n.setAttribute(t,r?"":Rs(e)?String(e):e)}function Mu(n,t,e,i,s){if(t==="innerHTML"||t==="textContent"){e!=null&&(n[t]=t==="innerHTML"?sd(e):e);return}const r=n.tagName;if(t==="value"&&r!=="PROGRESS"&&!r.includes("-")){const a=r==="OPTION"?n.getAttribute("value")||"":n.value,l=e==null?n.type==="checkbox"?"on":"":String(e);(a!==l||!("_value"in n))&&(n.value=l),e==null&&n.removeAttribute(t),n._value=e;return}let o=!1;if(e===""||e==null){const a=typeof n[t];a==="boolean"?e=lf(e):e==null&&a==="string"?(e="",o=!0):a==="number"&&(e=0,o=!0)}try{n[t]=e}catch{}o&&n.removeAttribute(s||t)}function Ng(n,t,e,i){n.addEventListener(t,e,i)}function Og(n,t,e,i){n.removeEventListener(t,e,i)}const Eu=Symbol("_vei");function Fg(n,t,e,i,s=null){const r=n[Eu]||(n[Eu]={}),o=r[t];if(i&&o)o.value=i;else{const[a,l]=Bg(t);if(i){const c=r[t]=Vg(i,s);Ng(n,a,c,l)}else o&&(Og(n,a,o,l),r[t]=void 0)}}const bu=/(?:Once|Passive|Capture)$/;function Bg(n){let t;if(bu.test(n)){t={};let i;for(;i=n.match(bu);)n=n.slice(0,n.length-i[0].length),t[i[0].toLowerCase()]=!0}return[n[2]===":"?n.slice(3):ki(n.slice(2)),t]}let da=0;const zg=Promise.resolve(),Hg=()=>da||(zg.then(()=>da=0),da=Date.now());function Vg(n,t){const e=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=e.attached)return;Pn(kg(i,e.value),t,5,[i])};return e.value=n,e.attached=Hg(),e}function kg(n,t){if(Kt(t)){const e=n.stopImmediatePropagation;return n.stopImmediatePropagation=()=>{e.call(n),n._stopped=!0},t.map(i=>s=>!s._stopped&&i&&i(s))}else return t}const Tu=n=>n.charCodeAt(0)===111&&n.charCodeAt(1)===110&&n.charCodeAt(2)>96&&n.charCodeAt(2)<123,Gg=(n,t,e,i,s,r)=>{const o=s==="svg";t==="class"?Cg(n,i,o):t==="style"?Ug(n,e,i):Io(t)?cc(t)||Fg(n,t,e,i,r):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):Wg(n,t,i,o))?(Mu(n,t,i),!n.tagName.includes("-")&&(t==="value"||t==="checked"||t==="selected")&&yu(n,t,i,o,r,t!=="value")):n._isVueCE&&(/[A-Z]/.test(t)||!we(i))?Mu(n,fi(t),i,r,t):(t==="true-value"?n._trueValue=i:t==="false-value"&&(n._falseValue=i),yu(n,t,i,o))};function Wg(n,t,e,i){if(i)return!!(t==="innerHTML"||t==="textContent"||t in n&&Tu(t)&&$t(e));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="autocorrect"||t==="form"||t==="list"&&n.tagName==="INPUT"||t==="type"&&n.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){const s=n.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return Tu(t)&&we(e)?!1:t in n}const Xg=Ve({patchProp:Gg},wg);let Au;function qg(){return Au||(Au=jm(Xg))}const Yg=((...n)=>{const t=qg().createApp(...n),{mount:e}=t;return t.mount=i=>{const s=Kg(i);if(!s)return;const r=t._component;!$t(r)&&!r.render&&!r.template&&(r.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const o=e(s,!1,jg(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),o},t});function jg(n){if(n instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&n instanceof MathMLElement)return"mathml"}function Kg(n){return we(n)?document.querySelector(n):n}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Rc="179",_s={ROTATE:0,DOLLY:1,PAN:2},us={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},$g=0,wu=1,Zg=2,rd=1,Jg=2,Vn=3,pi=0,Xe=1,Xn=2,ui=0,vs=1,Ru=2,Cu=3,Pu=4,Qg=5,Ri=100,t_=101,e_=102,n_=103,i_=104,s_=200,r_=201,o_=202,a_=203,hl=204,fl=205,l_=206,c_=207,u_=208,h_=209,f_=210,d_=211,p_=212,m_=213,g_=214,dl=0,pl=1,ml=2,Ms=3,gl=4,_l=5,vl=6,xl=7,Cc=0,__=1,v_=2,hi=0,x_=1,S_=2,y_=3,M_=4,E_=5,b_=6,T_=7,od=300,Es=301,bs=302,Sl=303,yl=304,Go=306,Ml=1e3,Pi=1001,El=1002,mn=1003,A_=1004,Ir=1005,Tn=1006,pa=1007,Di=1008,Dn=1009,ad=1010,ld=1011,dr=1012,Pc=1013,Fi=1014,qn=1015,br=1016,Dc=1017,Lc=1018,pr=1020,cd=35902,ud=1021,hd=1022,fn=1023,mr=1026,gr=1027,fd=1028,Uc=1029,dd=1030,Ic=1031,Nc=1033,uo=33776,ho=33777,fo=33778,po=33779,bl=35840,Tl=35841,Al=35842,wl=35843,Rl=36196,Cl=37492,Pl=37496,Dl=37808,Ll=37809,Ul=37810,Il=37811,Nl=37812,Ol=37813,Fl=37814,Bl=37815,zl=37816,Hl=37817,Vl=37818,kl=37819,Gl=37820,Wl=37821,mo=36492,Xl=36494,ql=36495,pd=36283,Yl=36284,jl=36285,Kl=36286,w_=3200,R_=3201,md=0,C_=1,li="",rn="srgb",Ts="srgb-linear",Ao="linear",re="srgb",Yi=7680,Du=519,P_=512,D_=513,L_=514,gd=515,U_=516,I_=517,N_=518,O_=519,Lu=35044,Uu="300 es",An=2e3,wo=2001;class Gi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){const i=this._listeners;if(i===void 0)return;const s=i[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const i=e[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const Re=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Iu=1234567;const ir=Math.PI/180,_r=180/Math.PI;function Wi(){const n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Re[n&255]+Re[n>>8&255]+Re[n>>16&255]+Re[n>>24&255]+"-"+Re[t&255]+Re[t>>8&255]+"-"+Re[t>>16&15|64]+Re[t>>24&255]+"-"+Re[e&63|128]+Re[e>>8&255]+"-"+Re[e>>16&255]+Re[e>>24&255]+Re[i&255]+Re[i>>8&255]+Re[i>>16&255]+Re[i>>24&255]).toLowerCase()}function jt(n,t,e){return Math.max(t,Math.min(e,n))}function Oc(n,t){return(n%t+t)%t}function F_(n,t,e,i,s){return i+(n-t)*(s-i)/(e-t)}function B_(n,t,e){return n!==t?(e-n)/(t-n):0}function sr(n,t,e){return(1-e)*n+e*t}function z_(n,t,e,i){return sr(n,t,1-Math.exp(-e*i))}function H_(n,t=1){return t-Math.abs(Oc(n,t*2)-t)}function V_(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function k_(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function G_(n,t){return n+Math.floor(Math.random()*(t-n+1))}function W_(n,t){return n+Math.random()*(t-n)}function X_(n){return n*(.5-Math.random())}function q_(n){n!==void 0&&(Iu=n);let t=Iu+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Y_(n){return n*ir}function j_(n){return n*_r}function K_(n){return(n&n-1)===0&&n!==0}function $_(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Z_(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function J_(n,t,e,i,s){const r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+i)/2),u=o((t+i)/2),h=r((t-i)/2),f=o((t-i)/2),p=r((i-t)/2),g=o((i-t)/2);switch(s){case"XYX":n.set(a*u,l*h,l*f,a*c);break;case"YZY":n.set(l*f,a*u,l*h,a*c);break;case"ZXZ":n.set(l*h,l*f,a*u,a*c);break;case"XZX":n.set(a*u,l*g,l*p,a*c);break;case"YXY":n.set(l*p,a*u,l*g,a*c);break;case"ZYZ":n.set(l*g,l*p,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function cs(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Ne(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const go={DEG2RAD:ir,RAD2DEG:_r,generateUUID:Wi,clamp:jt,euclideanModulo:Oc,mapLinear:F_,inverseLerp:B_,lerp:sr,damp:z_,pingpong:H_,smoothstep:V_,smootherstep:k_,randInt:G_,randFloat:W_,randFloatSpread:X_,seededRandom:q_,degToRad:Y_,radToDeg:j_,isPowerOfTwo:K_,ceilPowerOfTwo:$_,floorPowerOfTwo:Z_,setQuaternionFromProperEuler:J_,normalize:Ne,denormalize:cs};class vt{constructor(t=0,e=0){vt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=jt(this.x,t.x,e.x),this.y=jt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=jt(this.x,t,e),this.y=jt(this.y,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(jt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(jt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*i-o*s+t.x,this.y=r*s+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Bi{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,o,a){let l=i[s+0],c=i[s+1],u=i[s+2],h=i[s+3];const f=r[o+0],p=r[o+1],g=r[o+2],_=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h;return}if(a===1){t[e+0]=f,t[e+1]=p,t[e+2]=g,t[e+3]=_;return}if(h!==_||l!==f||c!==p||u!==g){let m=1-a;const d=l*f+c*p+u*g+h*_,R=d>=0?1:-1,b=1-d*d;if(b>Number.EPSILON){const P=Math.sqrt(b),N=Math.atan2(P,d*R);m=Math.sin(m*N)/P,a=Math.sin(a*N)/P}const S=a*R;if(l=l*m+f*S,c=c*m+p*S,u=u*m+g*S,h=h*m+_*S,m===1-a){const P=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=P,c*=P,u*=P,h*=P}}t[e]=l,t[e+1]=c,t[e+2]=u,t[e+3]=h}static multiplyQuaternionsFlat(t,e,i,s,r,o){const a=i[s],l=i[s+1],c=i[s+2],u=i[s+3],h=r[o],f=r[o+1],p=r[o+2],g=r[o+3];return t[e]=a*g+u*h+l*p-c*f,t[e+1]=l*g+u*f+c*h-a*p,t[e+2]=c*g+u*p+a*f-l*h,t[e+3]=u*g-a*h-l*f-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(s/2),h=a(r/2),f=l(i/2),p=l(s/2),g=l(r/2);switch(o){case"XYZ":this._x=f*u*h+c*p*g,this._y=c*p*h-f*u*g,this._z=c*u*g+f*p*h,this._w=c*u*h-f*p*g;break;case"YXZ":this._x=f*u*h+c*p*g,this._y=c*p*h-f*u*g,this._z=c*u*g-f*p*h,this._w=c*u*h+f*p*g;break;case"ZXY":this._x=f*u*h-c*p*g,this._y=c*p*h+f*u*g,this._z=c*u*g+f*p*h,this._w=c*u*h-f*p*g;break;case"ZYX":this._x=f*u*h-c*p*g,this._y=c*p*h+f*u*g,this._z=c*u*g-f*p*h,this._w=c*u*h+f*p*g;break;case"YZX":this._x=f*u*h+c*p*g,this._y=c*p*h+f*u*g,this._z=c*u*g-f*p*h,this._w=c*u*h-f*p*g;break;case"XZY":this._x=f*u*h-c*p*g,this._y=c*p*h-f*u*g,this._z=c*u*g+f*p*h,this._w=c*u*h+f*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],s=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],u=e[6],h=e[10],f=i+a+h;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(u-l)*p,this._y=(r-c)*p,this._z=(o-s)*p}else if(i>a&&i>h){const p=2*Math.sqrt(1+i-a-h);this._w=(u-l)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+c)/p}else if(a>h){const p=2*Math.sqrt(1+a-i-h);this._w=(r-c)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+h-i-a);this._w=(o-s)/p,this._x=(r+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(jt(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,s=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,u=e._w;return this._x=i*u+o*a+s*c-r*l,this._y=s*u+o*l+r*a-i*c,this._z=r*u+o*c+i*l-s*a,this._w=o*u-i*a-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+i*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=i,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-e;return this._w=p*o+e*this._w,this._x=p*i+e*this._x,this._y=p*s+e*this._y,this._z=p*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),h=Math.sin((1-e)*u)/c,f=Math.sin(e*u)/c;return this._w=o*h+this._w*f,this._x=i*h+this._x*f,this._y=s*h+this._y*f,this._z=r*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class B{constructor(t=0,e=0,i=0){B.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Nu.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Nu.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,i=this.y,s=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*s-a*i),u=2*(a*e-r*s),h=2*(r*i-o*e);return this.x=e+l*c+o*h-a*u,this.y=i+l*u+a*c-r*h,this.z=s+l*h+r*u-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=jt(this.x,t.x,e.x),this.y=jt(this.y,t.y,e.y),this.z=jt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=jt(this.x,t,e),this.y=jt(this.y,t,e),this.z=jt(this.z,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(jt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,s=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=s*l-r*a,this.y=r*o-i*l,this.z=i*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return ma.copy(this).projectOnVector(t),this.sub(ma)}reflect(t){return this.sub(ma.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(jt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const ma=new B,Nu=new Bi;class qt{constructor(t,e,i,s,r,o,a,l,c){qt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c)}set(t,e,i,s,r,o,a,l,c){const u=this.elements;return u[0]=t,u[1]=s,u[2]=a,u[3]=e,u[4]=r,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],h=i[7],f=i[2],p=i[5],g=i[8],_=s[0],m=s[3],d=s[6],R=s[1],b=s[4],S=s[7],P=s[2],N=s[5],D=s[8];return r[0]=o*_+a*R+l*P,r[3]=o*m+a*b+l*N,r[6]=o*d+a*S+l*D,r[1]=c*_+u*R+h*P,r[4]=c*m+u*b+h*N,r[7]=c*d+u*S+h*D,r[2]=f*_+p*R+g*P,r[5]=f*m+p*b+g*N,r[8]=f*d+p*S+g*D,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8];return e*o*u-e*a*c-i*r*u+i*a*l+s*r*c-s*o*l}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],h=u*o-a*c,f=a*l-u*r,p=c*r-o*l,g=e*h+i*f+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=h*_,t[1]=(s*c-u*i)*_,t[2]=(a*i-s*o)*_,t[3]=f*_,t[4]=(u*e-s*l)*_,t[5]=(s*r-a*e)*_,t[6]=p*_,t[7]=(i*l-c*e)*_,t[8]=(o*e-i*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*o+c*a)+o+t,-s*c,s*l,-s*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(ga.makeScale(t,e)),this}rotate(t){return this.premultiply(ga.makeRotation(-t)),this}translate(t,e){return this.premultiply(ga.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const ga=new qt;function _d(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Ro(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Q_(){const n=Ro("canvas");return n.style.display="block",n}const Ou={};function xs(n){n in Ou||(Ou[n]=!0,console.warn(n))}function t0(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}const Fu=new qt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Bu=new qt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function e0(){const n={enabled:!0,workingColorSpace:Ts,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===re&&(s.r=Yn(s.r),s.g=Yn(s.g),s.b=Yn(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===re&&(s.r=Ss(s.r),s.g=Ss(s.g),s.b=Ss(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===li?Ao:this.spaces[s].transfer},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return xs("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return xs("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Ts]:{primaries:t,whitePoint:i,transfer:Ao,toXYZ:Fu,fromXYZ:Bu,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:rn},outputColorSpaceConfig:{drawingBufferColorSpace:rn}},[rn]:{primaries:t,whitePoint:i,transfer:re,toXYZ:Fu,fromXYZ:Bu,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:rn}}}),n}const te=e0();function Yn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ss(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let ji;class n0{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{ji===void 0&&(ji=Ro("canvas")),ji.width=t.width,ji.height=t.height;const s=ji.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=ji}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Ro("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Yn(r[o]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Yn(e[i]/255)*255):e[i]=Yn(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let i0=0;class Fc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:i0++}),this.uuid=Wi(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(_a(s[o].image)):r.push(_a(s[o]))}else r=_a(s);i.url=r}return e||(t.images[this.uuid]=i),i}}function _a(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?n0.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let s0=0;const va=new B;class qe extends Gi{constructor(t=qe.DEFAULT_IMAGE,e=qe.DEFAULT_MAPPING,i=Pi,s=Pi,r=Tn,o=Di,a=fn,l=Dn,c=qe.DEFAULT_ANISOTROPY,u=li){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:s0++}),this.uuid=Wi(),this.name="",this.source=new Fc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new vt(0,0),this.repeat=new vt(1,1),this.center=new vt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new qt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(va).x}get height(){return this.source.getSize(va).y}get depth(){return this.source.getSize(va).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==od)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ml:t.x=t.x-Math.floor(t.x);break;case Pi:t.x=t.x<0?0:1;break;case El:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ml:t.y=t.y-Math.floor(t.y);break;case Pi:t.y=t.y<0?0:1;break;case El:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}qe.DEFAULT_IMAGE=null;qe.DEFAULT_MAPPING=od;qe.DEFAULT_ANISOTROPY=1;class ve{constructor(t=0,e=0,i=0,s=1){ve.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*i+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r;const l=t.elements,c=l[0],u=l[4],h=l[8],f=l[1],p=l[5],g=l[9],_=l[2],m=l[6],d=l[10];if(Math.abs(u-f)<.01&&Math.abs(h-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const b=(c+1)/2,S=(p+1)/2,P=(d+1)/2,N=(u+f)/4,D=(h+_)/4,z=(g+m)/4;return b>S&&b>P?b<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(b),s=N/i,r=D/i):S>P?S<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(S),i=N/s,r=z/s):P<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(P),i=D/r,s=z/r),this.set(i,s,r,e),this}let R=Math.sqrt((m-g)*(m-g)+(h-_)*(h-_)+(f-u)*(f-u));return Math.abs(R)<.001&&(R=1),this.x=(m-g)/R,this.y=(h-_)/R,this.z=(f-u)/R,this.w=Math.acos((c+p+d-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=jt(this.x,t.x,e.x),this.y=jt(this.y,t.y,e.y),this.z=jt(this.z,t.z,e.z),this.w=jt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=jt(this.x,t,e),this.y=jt(this.y,t,e),this.z=jt(this.z,t,e),this.w=jt(this.w,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(jt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class r0 extends Gi{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Tn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new ve(0,0,t,e),this.scissorTest=!1,this.viewport=new ve(0,0,t,e);const s={width:t,height:e,depth:i.depth},r=new qe(s);this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(t={}){const e={minFilter:Tn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new Fc(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class zi extends r0{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class vd extends qe{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=mn,this.minFilter=mn,this.wrapR=Pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class o0 extends qe{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=mn,this.minFilter=mn,this.wrapR=Pi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Cs{constructor(t=new B(1/0,1/0,1/0),e=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(ln.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(ln.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=ln.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,ln):ln.fromBufferAttribute(r,o),ln.applyMatrix4(t.matrixWorld),this.expandByPoint(ln);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Nr.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Nr.copy(i.boundingBox)),Nr.applyMatrix4(t.matrixWorld),this.union(Nr)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,ln),ln.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Bs),Or.subVectors(this.max,Bs),Ki.subVectors(t.a,Bs),$i.subVectors(t.b,Bs),Zi.subVectors(t.c,Bs),Zn.subVectors($i,Ki),Jn.subVectors(Zi,$i),Si.subVectors(Ki,Zi);let e=[0,-Zn.z,Zn.y,0,-Jn.z,Jn.y,0,-Si.z,Si.y,Zn.z,0,-Zn.x,Jn.z,0,-Jn.x,Si.z,0,-Si.x,-Zn.y,Zn.x,0,-Jn.y,Jn.x,0,-Si.y,Si.x,0];return!xa(e,Ki,$i,Zi,Or)||(e=[1,0,0,0,1,0,0,0,1],!xa(e,Ki,$i,Zi,Or))?!1:(Fr.crossVectors(Zn,Jn),e=[Fr.x,Fr.y,Fr.z],xa(e,Ki,$i,Zi,Or))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,ln).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(ln).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(On[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),On[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),On[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),On[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),On[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),On[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),On[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),On[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(On),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const On=[new B,new B,new B,new B,new B,new B,new B,new B],ln=new B,Nr=new Cs,Ki=new B,$i=new B,Zi=new B,Zn=new B,Jn=new B,Si=new B,Bs=new B,Or=new B,Fr=new B,yi=new B;function xa(n,t,e,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){yi.fromArray(n,r);const a=s.x*Math.abs(yi.x)+s.y*Math.abs(yi.y)+s.z*Math.abs(yi.z),l=t.dot(yi),c=e.dot(yi),u=i.dot(yi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const a0=new Cs,zs=new B,Sa=new B;class Wo{constructor(t=new B,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):a0.setFromPoints(t).getCenter(i);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;zs.subVectors(t,this.center);const e=zs.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(zs,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Sa.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(zs.copy(t.center).add(Sa)),this.expandByPoint(zs.copy(t.center).sub(Sa))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const Fn=new B,ya=new B,Br=new B,Qn=new B,Ma=new B,zr=new B,Ea=new B;class Xo{constructor(t=new B,e=new B(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Fn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Fn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Fn.copy(this.origin).addScaledVector(this.direction,e),Fn.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){ya.copy(t).add(e).multiplyScalar(.5),Br.copy(e).sub(t).normalize(),Qn.copy(this.origin).sub(ya);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Br),a=Qn.dot(this.direction),l=-Qn.dot(Br),c=Qn.lengthSq(),u=Math.abs(1-o*o);let h,f,p,g;if(u>0)if(h=o*l-a,f=o*a-l,g=r*u,h>=0)if(f>=-g)if(f<=g){const _=1/u;h*=_,f*=_,p=h*(h+o*f+2*a)+f*(o*h+f+2*l)+c}else f=r,h=Math.max(0,-(o*f+a)),p=-h*h+f*(f+2*l)+c;else f=-r,h=Math.max(0,-(o*f+a)),p=-h*h+f*(f+2*l)+c;else f<=-g?(h=Math.max(0,-(-o*r+a)),f=h>0?-r:Math.min(Math.max(-r,-l),r),p=-h*h+f*(f+2*l)+c):f<=g?(h=0,f=Math.min(Math.max(-r,-l),r),p=f*(f+2*l)+c):(h=Math.max(0,-(o*r+a)),f=h>0?r:Math.min(Math.max(-r,-l),r),p=-h*h+f*(f+2*l)+c);else f=o>0?-r:r,h=Math.max(0,-(o*f+a)),p=-h*h+f*(f+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(ya).addScaledVector(Br,f),p}intersectSphere(t,e){Fn.subVectors(t.center,this.origin);const i=Fn.dot(this.direction),s=Fn.dot(Fn)-i*i,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return c>=0?(i=(t.min.x-f.x)*c,s=(t.max.x-f.x)*c):(i=(t.max.x-f.x)*c,s=(t.min.x-f.x)*c),u>=0?(r=(t.min.y-f.y)*u,o=(t.max.y-f.y)*u):(r=(t.max.y-f.y)*u,o=(t.min.y-f.y)*u),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),h>=0?(a=(t.min.z-f.z)*h,l=(t.max.z-f.z)*h):(a=(t.max.z-f.z)*h,l=(t.min.z-f.z)*h),i>l||a>s)||((a>i||i!==i)&&(i=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,Fn)!==null}intersectTriangle(t,e,i,s,r){Ma.subVectors(e,t),zr.subVectors(i,t),Ea.crossVectors(Ma,zr);let o=this.direction.dot(Ea),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Qn.subVectors(this.origin,t);const l=a*this.direction.dot(zr.crossVectors(Qn,zr));if(l<0)return null;const c=a*this.direction.dot(Ma.cross(Qn));if(c<0||l+c>o)return null;const u=-a*Qn.dot(Ea);return u<0?null:this.at(u/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class fe{constructor(t,e,i,s,r,o,a,l,c,u,h,f,p,g,_,m){fe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,l,c,u,h,f,p,g,_,m)}set(t,e,i,s,r,o,a,l,c,u,h,f,p,g,_,m){const d=this.elements;return d[0]=t,d[4]=e,d[8]=i,d[12]=s,d[1]=r,d[5]=o,d[9]=a,d[13]=l,d[2]=c,d[6]=u,d[10]=h,d[14]=f,d[3]=p,d[7]=g,d[11]=_,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new fe().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,s=1/Ji.setFromMatrixColumn(t,0).length(),r=1/Ji.setFromMatrixColumn(t,1).length(),o=1/Ji.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,s=t.y,r=t.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(t.order==="XYZ"){const f=o*u,p=o*h,g=a*u,_=a*h;e[0]=l*u,e[4]=-l*h,e[8]=c,e[1]=p+g*c,e[5]=f-_*c,e[9]=-a*l,e[2]=_-f*c,e[6]=g+p*c,e[10]=o*l}else if(t.order==="YXZ"){const f=l*u,p=l*h,g=c*u,_=c*h;e[0]=f+_*a,e[4]=g*a-p,e[8]=o*c,e[1]=o*h,e[5]=o*u,e[9]=-a,e[2]=p*a-g,e[6]=_+f*a,e[10]=o*l}else if(t.order==="ZXY"){const f=l*u,p=l*h,g=c*u,_=c*h;e[0]=f-_*a,e[4]=-o*h,e[8]=g+p*a,e[1]=p+g*a,e[5]=o*u,e[9]=_-f*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const f=o*u,p=o*h,g=a*u,_=a*h;e[0]=l*u,e[4]=g*c-p,e[8]=f*c+_,e[1]=l*h,e[5]=_*c+f,e[9]=p*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const f=o*l,p=o*c,g=a*l,_=a*c;e[0]=l*u,e[4]=_-f*h,e[8]=g*h+p,e[1]=h,e[5]=o*u,e[9]=-a*u,e[2]=-c*u,e[6]=p*h+g,e[10]=f-_*h}else if(t.order==="XZY"){const f=o*l,p=o*c,g=a*l,_=a*c;e[0]=l*u,e[4]=-h,e[8]=c*u,e[1]=f*h+_,e[5]=o*u,e[9]=p*h-g,e[2]=g*h-p,e[6]=a*u,e[10]=_*h+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(l0,t,c0)}lookAt(t,e,i){const s=this.elements;return Ze.subVectors(t,e),Ze.lengthSq()===0&&(Ze.z=1),Ze.normalize(),ti.crossVectors(i,Ze),ti.lengthSq()===0&&(Math.abs(i.z)===1?Ze.x+=1e-4:Ze.z+=1e-4,Ze.normalize(),ti.crossVectors(i,Ze)),ti.normalize(),Hr.crossVectors(Ze,ti),s[0]=ti.x,s[4]=Hr.x,s[8]=Ze.x,s[1]=ti.y,s[5]=Hr.y,s[9]=Ze.y,s[2]=ti.z,s[6]=Hr.z,s[10]=Ze.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],h=i[5],f=i[9],p=i[13],g=i[2],_=i[6],m=i[10],d=i[14],R=i[3],b=i[7],S=i[11],P=i[15],N=s[0],D=s[4],z=s[8],T=s[12],M=s[1],A=s[5],q=s[9],Y=s[13],Q=s[2],nt=s[6],$=s[10],Z=s[14],H=s[3],ot=s[7],lt=s[11],pt=s[15];return r[0]=o*N+a*M+l*Q+c*H,r[4]=o*D+a*A+l*nt+c*ot,r[8]=o*z+a*q+l*$+c*lt,r[12]=o*T+a*Y+l*Z+c*pt,r[1]=u*N+h*M+f*Q+p*H,r[5]=u*D+h*A+f*nt+p*ot,r[9]=u*z+h*q+f*$+p*lt,r[13]=u*T+h*Y+f*Z+p*pt,r[2]=g*N+_*M+m*Q+d*H,r[6]=g*D+_*A+m*nt+d*ot,r[10]=g*z+_*q+m*$+d*lt,r[14]=g*T+_*Y+m*Z+d*pt,r[3]=R*N+b*M+S*Q+P*H,r[7]=R*D+b*A+S*nt+P*ot,r[11]=R*z+b*q+S*$+P*lt,r[15]=R*T+b*Y+S*Z+P*pt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],u=t[2],h=t[6],f=t[10],p=t[14],g=t[3],_=t[7],m=t[11],d=t[15];return g*(+r*l*h-s*c*h-r*a*f+i*c*f+s*a*p-i*l*p)+_*(+e*l*p-e*c*f+r*o*f-s*o*p+s*c*u-r*l*u)+m*(+e*c*h-e*a*p-r*o*h+i*o*p+r*a*u-i*c*u)+d*(-s*a*u-e*l*h+e*a*f+s*o*h-i*o*f+i*l*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],u=t[8],h=t[9],f=t[10],p=t[11],g=t[12],_=t[13],m=t[14],d=t[15],R=h*m*c-_*f*c+_*l*p-a*m*p-h*l*d+a*f*d,b=g*f*c-u*m*c-g*l*p+o*m*p+u*l*d-o*f*d,S=u*_*c-g*h*c+g*a*p-o*_*p-u*a*d+o*h*d,P=g*h*l-u*_*l-g*a*f+o*_*f+u*a*m-o*h*m,N=e*R+i*b+s*S+r*P;if(N===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const D=1/N;return t[0]=R*D,t[1]=(_*f*r-h*m*r-_*s*p+i*m*p+h*s*d-i*f*d)*D,t[2]=(a*m*r-_*l*r+_*s*c-i*m*c-a*s*d+i*l*d)*D,t[3]=(h*l*r-a*f*r-h*s*c+i*f*c+a*s*p-i*l*p)*D,t[4]=b*D,t[5]=(u*m*r-g*f*r+g*s*p-e*m*p-u*s*d+e*f*d)*D,t[6]=(g*l*r-o*m*r-g*s*c+e*m*c+o*s*d-e*l*d)*D,t[7]=(o*f*r-u*l*r+u*s*c-e*f*c-o*s*p+e*l*p)*D,t[8]=S*D,t[9]=(g*h*r-u*_*r-g*i*p+e*_*p+u*i*d-e*h*d)*D,t[10]=(o*_*r-g*a*r+g*i*c-e*_*c-o*i*d+e*a*d)*D,t[11]=(u*a*r-o*h*r-u*i*c+e*h*c+o*i*p-e*a*p)*D,t[12]=P*D,t[13]=(u*_*s-g*h*s+g*i*f-e*_*f-u*i*m+e*h*m)*D,t[14]=(g*a*s-o*_*s-g*i*l+e*_*l+o*i*m-e*a*m)*D,t[15]=(o*h*s-u*a*s+u*i*l-e*h*l-o*i*f+e*a*f)*D,this}scale(t){const e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),s=Math.sin(e),r=1-i,o=t.x,a=t.y,l=t.z,c=r*o,u=r*a;return this.set(c*o+i,c*a-s*l,c*l+s*a,0,c*a+s*l,u*a+i,u*l-s*o,0,c*l-s*a,u*l+s*o,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,o){return this.set(1,i,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){const s=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,u=o+o,h=a+a,f=r*c,p=r*u,g=r*h,_=o*u,m=o*h,d=a*h,R=l*c,b=l*u,S=l*h,P=i.x,N=i.y,D=i.z;return s[0]=(1-(_+d))*P,s[1]=(p+S)*P,s[2]=(g-b)*P,s[3]=0,s[4]=(p-S)*N,s[5]=(1-(f+d))*N,s[6]=(m+R)*N,s[7]=0,s[8]=(g+b)*D,s[9]=(m-R)*D,s[10]=(1-(f+_))*D,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){const s=this.elements;let r=Ji.set(s[0],s[1],s[2]).length();const o=Ji.set(s[4],s[5],s[6]).length(),a=Ji.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],cn.copy(this);const c=1/r,u=1/o,h=1/a;return cn.elements[0]*=c,cn.elements[1]*=c,cn.elements[2]*=c,cn.elements[4]*=u,cn.elements[5]*=u,cn.elements[6]*=u,cn.elements[8]*=h,cn.elements[9]*=h,cn.elements[10]*=h,e.setFromRotationMatrix(cn),i.x=r,i.y=o,i.z=a,this}makePerspective(t,e,i,s,r,o,a=An,l=!1){const c=this.elements,u=2*r/(e-t),h=2*r/(i-s),f=(e+t)/(e-t),p=(i+s)/(i-s);let g,_;if(l)g=r/(o-r),_=o*r/(o-r);else if(a===An)g=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===wo)g=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=h,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,i,s,r,o,a=An,l=!1){const c=this.elements,u=2/(e-t),h=2/(i-s),f=-(e+t)/(e-t),p=-(i+s)/(i-s);let g,_;if(l)g=1/(o-r),_=o/(o-r);else if(a===An)g=-2/(o-r),_=-(o+r)/(o-r);else if(a===wo)g=-1/(o-r),_=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=h,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=g,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const Ji=new B,cn=new fe,l0=new B(0,0,0),c0=new B(1,1,1),ti=new B,Hr=new B,Ze=new B,zu=new fe,Hu=new Bi;class Ln{constructor(t=0,e=0,i=0,s=Ln.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],u=s[9],h=s[2],f=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin(jt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-jt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(jt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-jt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(jt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-jt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return zu.makeRotationFromQuaternion(t),this.setFromRotationMatrix(zu,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Hu.setFromEuler(this),this.setFromQuaternion(Hu,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ln.DEFAULT_ORDER="XYZ";class Bc{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let u0=0;const Vu=new B,Qi=new Bi,Bn=new fe,Vr=new B,Hs=new B,h0=new B,f0=new Bi,ku=new B(1,0,0),Gu=new B(0,1,0),Wu=new B(0,0,1),Xu={type:"added"},d0={type:"removed"},ts={type:"childadded",child:null},ba={type:"childremoved",child:null};class Ae extends Gi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:u0++}),this.uuid=Wi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ae.DEFAULT_UP.clone();const t=new B,e=new Ln,i=new Bi,s=new B(1,1,1);function r(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new fe},normalMatrix:{value:new qt}}),this.matrix=new fe,this.matrixWorld=new fe,this.matrixAutoUpdate=Ae.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ae.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Bc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Qi.setFromAxisAngle(t,e),this.quaternion.multiply(Qi),this}rotateOnWorldAxis(t,e){return Qi.setFromAxisAngle(t,e),this.quaternion.premultiply(Qi),this}rotateX(t){return this.rotateOnAxis(ku,t)}rotateY(t){return this.rotateOnAxis(Gu,t)}rotateZ(t){return this.rotateOnAxis(Wu,t)}translateOnAxis(t,e){return Vu.copy(t).applyQuaternion(this.quaternion),this.position.add(Vu.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(ku,t)}translateY(t){return this.translateOnAxis(Gu,t)}translateZ(t){return this.translateOnAxis(Wu,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Bn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Vr.copy(t):Vr.set(t,e,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Hs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Bn.lookAt(Hs,Vr,this.up):Bn.lookAt(Vr,Hs,this.up),this.quaternion.setFromRotationMatrix(Bn),s&&(Bn.extractRotation(s.matrixWorld),Qi.setFromRotationMatrix(Bn),this.quaternion.premultiply(Qi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Xu),ts.child=t,this.dispatchEvent(ts),ts.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(d0),ba.child=t,this.dispatchEvent(ba),ba.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Bn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Bn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Bn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Xu),ts.child=t,this.dispatchEvent(ts),ts.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Hs,t,h0),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Hs,f0,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];r(t.shapes,h)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),u=o(t.images),h=o(t.shapes),f=o(t.skeletons),p=o(t.animations),g=o(t.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),f.length>0&&(i.skeletons=f),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=s,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}Ae.DEFAULT_UP=new B(0,1,0);Ae.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ae.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const un=new B,zn=new B,Ta=new B,Hn=new B,es=new B,ns=new B,qu=new B,Aa=new B,wa=new B,Ra=new B,Ca=new ve,Pa=new ve,Da=new ve;class hn{constructor(t=new B,e=new B,i=new B){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),un.subVectors(t,e),s.cross(un);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){un.subVectors(s,e),zn.subVectors(i,e),Ta.subVectors(t,e);const o=un.dot(un),a=un.dot(zn),l=un.dot(Ta),c=zn.dot(zn),u=zn.dot(Ta),h=o*c-a*a;if(h===0)return r.set(0,0,0),null;const f=1/h,p=(c*l-a*u)*f,g=(o*u-a*l)*f;return r.set(1-p-g,g,p)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,Hn)===null?!1:Hn.x>=0&&Hn.y>=0&&Hn.x+Hn.y<=1}static getInterpolation(t,e,i,s,r,o,a,l){return this.getBarycoord(t,e,i,s,Hn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Hn.x),l.addScaledVector(o,Hn.y),l.addScaledVector(a,Hn.z),l)}static getInterpolatedAttribute(t,e,i,s,r,o){return Ca.setScalar(0),Pa.setScalar(0),Da.setScalar(0),Ca.fromBufferAttribute(t,e),Pa.fromBufferAttribute(t,i),Da.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Ca,r.x),o.addScaledVector(Pa,r.y),o.addScaledVector(Da,r.z),o}static isFrontFacing(t,e,i,s){return un.subVectors(i,e),zn.subVectors(t,e),un.cross(zn).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return un.subVectors(this.c,this.b),zn.subVectors(this.a,this.b),un.cross(zn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return hn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return hn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return hn.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return hn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return hn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,s=this.b,r=this.c;let o,a;es.subVectors(s,i),ns.subVectors(r,i),Aa.subVectors(t,i);const l=es.dot(Aa),c=ns.dot(Aa);if(l<=0&&c<=0)return e.copy(i);wa.subVectors(t,s);const u=es.dot(wa),h=ns.dot(wa);if(u>=0&&h<=u)return e.copy(s);const f=l*h-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),e.copy(i).addScaledVector(es,o);Ra.subVectors(t,r);const p=es.dot(Ra),g=ns.dot(Ra);if(g>=0&&p<=g)return e.copy(r);const _=p*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(i).addScaledVector(ns,a);const m=u*g-p*h;if(m<=0&&h-u>=0&&p-g>=0)return qu.subVectors(r,s),a=(h-u)/(h-u+(p-g)),e.copy(s).addScaledVector(qu,a);const d=1/(m+_+f);return o=_*d,a=f*d,e.copy(i).addScaledVector(es,o).addScaledVector(ns,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const xd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ei={h:0,s:0,l:0},kr={h:0,s:0,l:0};function La(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}class Zt{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=rn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,te.colorSpaceToWorking(this,e),this}setRGB(t,e,i,s=te.workingColorSpace){return this.r=t,this.g=e,this.b=i,te.colorSpaceToWorking(this,s),this}setHSL(t,e,i,s=te.workingColorSpace){if(t=Oc(t,1),e=jt(e,0,1),i=jt(i,0,1),e===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+e):i+e-i*e,o=2*i-r;this.r=La(o,r,t+1/3),this.g=La(o,r,t),this.b=La(o,r,t-1/3)}return te.colorSpaceToWorking(this,s),this}setStyle(t,e=rn){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=rn){const i=xd[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Yn(t.r),this.g=Yn(t.g),this.b=Yn(t.b),this}copyLinearToSRGB(t){return this.r=Ss(t.r),this.g=Ss(t.g),this.b=Ss(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=rn){return te.workingToColorSpace(Ce.copy(this),t),Math.round(jt(Ce.r*255,0,255))*65536+Math.round(jt(Ce.g*255,0,255))*256+Math.round(jt(Ce.b*255,0,255))}getHexString(t=rn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=te.workingColorSpace){te.workingToColorSpace(Ce.copy(this),e);const i=Ce.r,s=Ce.g,r=Ce.b,o=Math.max(i,s,r),a=Math.min(i,s,r);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=u<=.5?h/(o+a):h/(2-o-a),o){case i:l=(s-r)/h+(s<r?6:0);break;case s:l=(r-i)/h+2;break;case r:l=(i-s)/h+4;break}l/=6}return t.h=l,t.s=c,t.l=u,t}getRGB(t,e=te.workingColorSpace){return te.workingToColorSpace(Ce.copy(this),e),t.r=Ce.r,t.g=Ce.g,t.b=Ce.b,t}getStyle(t=rn){te.workingToColorSpace(Ce.copy(this),t);const e=Ce.r,i=Ce.g,s=Ce.b;return t!==rn?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(ei),this.setHSL(ei.h+t,ei.s+e,ei.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(ei),t.getHSL(kr);const i=sr(ei.h,kr.h,e),s=sr(ei.s,kr.s,e),r=sr(ei.l,kr.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ce=new Zt;Zt.NAMES=xd;let p0=0;class Ps extends Gi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:p0++}),this.uuid=Wi(),this.name="",this.type="Material",this.blending=vs,this.side=pi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=hl,this.blendDst=fl,this.blendEquation=Ri,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Zt(0,0,0),this.blendAlpha=0,this.depthFunc=Ms,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Du,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Yi,this.stencilZFail=Yi,this.stencilZPass=Yi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==vs&&(i.blending=this.blending),this.side!==pi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==hl&&(i.blendSrc=this.blendSrc),this.blendDst!==fl&&(i.blendDst=this.blendDst),this.blendEquation!==Ri&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Ms&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Du&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Yi&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Yi&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Yi&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class Sd extends Ps{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Zt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ln,this.combine=Cc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Se=new B,Gr=new vt;let m0=0;class Cn{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:m0++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Lu,this.updateRanges=[],this.gpuType=qn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Gr.fromBufferAttribute(this,e),Gr.applyMatrix3(t),this.setXY(e,Gr.x,Gr.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Se.fromBufferAttribute(this,e),Se.applyMatrix3(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Se.fromBufferAttribute(this,e),Se.applyMatrix4(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Se.fromBufferAttribute(this,e),Se.applyNormalMatrix(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Se.fromBufferAttribute(this,e),Se.transformDirection(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=cs(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=Ne(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=cs(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ne(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=cs(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ne(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=cs(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ne(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=cs(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ne(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=Ne(e,this.array),i=Ne(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=Ne(e,this.array),i=Ne(i,this.array),s=Ne(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=Ne(e,this.array),i=Ne(i,this.array),s=Ne(s,this.array),r=Ne(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Lu&&(t.usage=this.usage),t}}class yd extends Cn{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class Md extends Cn{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class He extends Cn{constructor(t,e,i){super(new Float32Array(t),e,i)}}let g0=0;const sn=new fe,Ua=new Ae,is=new B,Je=new Cs,Vs=new Cs,Te=new B;class gn extends Gi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:g0++}),this.uuid=Wi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(_d(t)?Md:yd)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new qt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return sn.makeRotationFromQuaternion(t),this.applyMatrix4(sn),this}rotateX(t){return sn.makeRotationX(t),this.applyMatrix4(sn),this}rotateY(t){return sn.makeRotationY(t),this.applyMatrix4(sn),this}rotateZ(t){return sn.makeRotationZ(t),this.applyMatrix4(sn),this}translate(t,e,i){return sn.makeTranslation(t,e,i),this.applyMatrix4(sn),this}scale(t,e,i){return sn.makeScale(t,e,i),this.applyMatrix4(sn),this}lookAt(t){return Ua.lookAt(t),Ua.updateMatrix(),this.applyMatrix4(Ua.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(is).negate(),this.translate(is.x,is.y,is.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new He(i,3))}else{const i=Math.min(t.length,e.count);for(let s=0;s<i;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Cs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){const r=e[i];Je.setFromBufferAttribute(r),this.morphTargetsRelative?(Te.addVectors(this.boundingBox.min,Je.min),this.boundingBox.expandByPoint(Te),Te.addVectors(this.boundingBox.max,Je.max),this.boundingBox.expandByPoint(Te)):(this.boundingBox.expandByPoint(Je.min),this.boundingBox.expandByPoint(Je.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Wo);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new B,1/0);return}if(t){const i=this.boundingSphere.center;if(Je.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];Vs.setFromBufferAttribute(a),this.morphTargetsRelative?(Te.addVectors(Je.min,Vs.min),Je.expandByPoint(Te),Te.addVectors(Je.max,Vs.max),Je.expandByPoint(Te)):(Je.expandByPoint(Vs.min),Je.expandByPoint(Vs.max))}Je.getCenter(i);let s=0;for(let r=0,o=t.count;r<o;r++)Te.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Te));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Te.fromBufferAttribute(a,c),l&&(is.fromBufferAttribute(t,c),Te.add(is)),s=Math.max(s,i.distanceToSquared(Te))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Cn(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let z=0;z<i.count;z++)a[z]=new B,l[z]=new B;const c=new B,u=new B,h=new B,f=new vt,p=new vt,g=new vt,_=new B,m=new B;function d(z,T,M){c.fromBufferAttribute(i,z),u.fromBufferAttribute(i,T),h.fromBufferAttribute(i,M),f.fromBufferAttribute(r,z),p.fromBufferAttribute(r,T),g.fromBufferAttribute(r,M),u.sub(c),h.sub(c),p.sub(f),g.sub(f);const A=1/(p.x*g.y-g.x*p.y);isFinite(A)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(h,-p.y).multiplyScalar(A),m.copy(h).multiplyScalar(p.x).addScaledVector(u,-g.x).multiplyScalar(A),a[z].add(_),a[T].add(_),a[M].add(_),l[z].add(m),l[T].add(m),l[M].add(m))}let R=this.groups;R.length===0&&(R=[{start:0,count:t.count}]);for(let z=0,T=R.length;z<T;++z){const M=R[z],A=M.start,q=M.count;for(let Y=A,Q=A+q;Y<Q;Y+=3)d(t.getX(Y+0),t.getX(Y+1),t.getX(Y+2))}const b=new B,S=new B,P=new B,N=new B;function D(z){P.fromBufferAttribute(s,z),N.copy(P);const T=a[z];b.copy(T),b.sub(P.multiplyScalar(P.dot(T))).normalize(),S.crossVectors(N,T);const A=S.dot(l[z])<0?-1:1;o.setXYZW(z,b.x,b.y,b.z,A)}for(let z=0,T=R.length;z<T;++z){const M=R[z],A=M.start,q=M.count;for(let Y=A,Q=A+q;Y<Q;Y+=3)D(t.getX(Y+0)),D(t.getX(Y+1)),D(t.getX(Y+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Cn(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let f=0,p=i.count;f<p;f++)i.setXYZ(f,0,0,0);const s=new B,r=new B,o=new B,a=new B,l=new B,c=new B,u=new B,h=new B;if(t)for(let f=0,p=t.count;f<p;f+=3){const g=t.getX(f+0),_=t.getX(f+1),m=t.getX(f+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,m),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,m),a.add(u),l.add(u),c.add(u),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let f=0,p=e.count;f<p;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),u.subVectors(o,r),h.subVectors(s,r),u.cross(h),i.setXYZ(f+0,u.x,u.y,u.z),i.setXYZ(f+1,u.x,u.y,u.z),i.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Te.fromBufferAttribute(t,e),Te.normalize(),t.setXYZ(e,Te.x,Te.y,Te.z)}toNonIndexed(){function t(a,l){const c=a.array,u=a.itemSize,h=a.normalized,f=new c.constructor(l.length*u);let p=0,g=0;for(let _=0,m=l.length;_<m;_++){a.isInterleavedBufferAttribute?p=l[_]*a.data.stride+a.offset:p=l[_]*u;for(let d=0;d<u;d++)f[g++]=c[p++]}return new Cn(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new gn,i=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=t(l,i);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let u=0,h=c.length;u<h;u++){const f=c[u],p=t(f,i);l.push(p)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,f=c.length;h<f;h++){const p=c[h];u.push(p.toJSON(t.data))}u.length>0&&(s[l]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const s=t.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(e))}const r=t.morphAttributes;for(const c in r){const u=[],h=r[c];for(let f=0,p=h.length;f<p;f++)u.push(h[f].clone(e));this.morphAttributes[c]=u}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,u=o.length;c<u;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Yu=new fe,Mi=new Xo,Wr=new Wo,ju=new B,Xr=new B,qr=new B,Yr=new B,Ia=new B,jr=new B,Ku=new B,Kr=new B;class an extends Ae{constructor(t=new gn,e=new Sd){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){jr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=a[l],h=r[l];u!==0&&(Ia.fromBufferAttribute(h,t),o?jr.addScaledVector(Ia,u):jr.addScaledVector(Ia.sub(e),u))}e.add(jr)}return e}raycast(t,e){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Wr.copy(i.boundingSphere),Wr.applyMatrix4(r),Mi.copy(t.ray).recast(t.near),!(Wr.containsPoint(Mi.origin)===!1&&(Mi.intersectSphere(Wr,ju)===null||Mi.origin.distanceToSquared(ju)>(t.far-t.near)**2))&&(Yu.copy(r).invert(),Mi.copy(t.ray).applyMatrix4(Yu),!(i.boundingBox!==null&&Mi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Mi)))}_computeIntersections(t,e,i){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,f=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],d=o[m.materialIndex],R=Math.max(m.start,p.start),b=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let S=R,P=b;S<P;S+=3){const N=a.getX(S),D=a.getX(S+1),z=a.getX(S+2);s=$r(this,d,t,i,c,u,h,N,D,z),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,p.start),_=Math.min(a.count,p.start+p.count);for(let m=g,d=_;m<d;m+=3){const R=a.getX(m),b=a.getX(m+1),S=a.getX(m+2);s=$r(this,o,t,i,c,u,h,R,b,S),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const m=f[g],d=o[m.materialIndex],R=Math.max(m.start,p.start),b=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let S=R,P=b;S<P;S+=3){const N=S,D=S+1,z=S+2;s=$r(this,d,t,i,c,u,h,N,D,z),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const g=Math.max(0,p.start),_=Math.min(l.count,p.start+p.count);for(let m=g,d=_;m<d;m+=3){const R=m,b=m+1,S=m+2;s=$r(this,o,t,i,c,u,h,R,b,S),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function _0(n,t,e,i,s,r,o,a){let l;if(t.side===Xe?l=i.intersectTriangle(o,r,s,!0,a):l=i.intersectTriangle(s,r,o,t.side===pi,a),l===null)return null;Kr.copy(a),Kr.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(Kr);return c<e.near||c>e.far?null:{distance:c,point:Kr.clone(),object:n}}function $r(n,t,e,i,s,r,o,a,l,c){n.getVertexPosition(a,Xr),n.getVertexPosition(l,qr),n.getVertexPosition(c,Yr);const u=_0(n,t,e,i,Xr,qr,Yr,Ku);if(u){const h=new B;hn.getBarycoord(Ku,Xr,qr,Yr,h),s&&(u.uv=hn.getInterpolatedAttribute(s,a,l,c,h,new vt)),r&&(u.uv1=hn.getInterpolatedAttribute(r,a,l,c,h,new vt)),o&&(u.normal=hn.getInterpolatedAttribute(o,a,l,c,h,new B),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new B,materialIndex:0};hn.getNormal(Xr,qr,Yr,f.normal),u.face=f,u.barycoord=h}return u}class Ds extends gn{constructor(t=1,e=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],u=[],h=[];let f=0,p=0;g("z","y","x",-1,-1,i,e,t,o,r,0),g("z","y","x",1,-1,i,e,-t,o,r,1),g("x","z","y",1,1,t,i,e,s,o,2),g("x","z","y",1,-1,t,i,-e,s,o,3),g("x","y","z",1,-1,t,e,i,s,r,4),g("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new He(c,3)),this.setAttribute("normal",new He(u,3)),this.setAttribute("uv",new He(h,2));function g(_,m,d,R,b,S,P,N,D,z,T){const M=S/D,A=P/z,q=S/2,Y=P/2,Q=N/2,nt=D+1,$=z+1;let Z=0,H=0;const ot=new B;for(let lt=0;lt<$;lt++){const pt=lt*A-Y;for(let Rt=0;Rt<nt;Rt++){const Ft=Rt*M-q;ot[_]=Ft*R,ot[m]=pt*b,ot[d]=Q,c.push(ot.x,ot.y,ot.z),ot[_]=0,ot[m]=0,ot[d]=N>0?1:-1,u.push(ot.x,ot.y,ot.z),h.push(Rt/D),h.push(1-lt/z),Z+=1}}for(let lt=0;lt<z;lt++)for(let pt=0;pt<D;pt++){const Rt=f+pt+nt*lt,Ft=f+pt+nt*(lt+1),Vt=f+(pt+1)+nt*(lt+1),it=f+(pt+1)+nt*lt;l.push(Rt,Ft,it),l.push(Ft,Vt,it),H+=6}a.addGroup(p,H,T),p+=H,f+=Z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ds(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function As(n){const t={};for(const e in n){t[e]={};for(const i in n[e]){const s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function Oe(n){const t={};for(let e=0;e<n.length;e++){const i=As(n[e]);for(const s in i)t[s]=i[s]}return t}function v0(n){const t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function Ed(n){const t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:te.workingColorSpace}const x0={clone:As,merge:Oe};var S0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,y0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class mi extends Ps{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=S0,this.fragmentShader=y0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=As(t.uniforms),this.uniformsGroups=v0(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class bd extends Ae{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new fe,this.projectionMatrix=new fe,this.projectionMatrixInverse=new fe,this.coordinateSystem=An,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const ni=new B,$u=new vt,Zu=new vt;class on extends bd{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=_r*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(ir*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return _r*2*Math.atan(Math.tan(ir*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){ni.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(ni.x,ni.y).multiplyScalar(-t/ni.z),ni.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ni.x,ni.y).multiplyScalar(-t/ni.z)}getViewSize(t,e){return this.getViewBounds(t,$u,Zu),e.subVectors(Zu,$u)}setViewOffset(t,e,i,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(ir*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,e-=o.offsetY*i/c,s*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const ss=-90,rs=1;class M0 extends Ae{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new on(ss,rs,t,e);s.layers=this.layers,this.add(s);const r=new on(ss,rs,t,e);r.layers=this.layers,this.add(r);const o=new on(ss,rs,t,e);o.layers=this.layers,this.add(o);const a=new on(ss,rs,t,e);a.layers=this.layers,this.add(a);const l=new on(ss,rs,t,e);l.layers=this.layers,this.add(l);const c=new on(ss,rs,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,s,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===An)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===wo)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,u]=this.children,h=t.getRenderTarget(),f=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,r),t.setRenderTarget(i,1,s),t.render(e,o),t.setRenderTarget(i,2,s),t.render(e,a),t.setRenderTarget(i,3,s),t.render(e,l),t.setRenderTarget(i,4,s),t.render(e,c),i.texture.generateMipmaps=_,t.setRenderTarget(i,5,s),t.render(e,u),t.setRenderTarget(h,f,p),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Td extends qe{constructor(t=[],e=Es,i,s,r,o,a,l,c,u){super(t,e,i,s,r,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class E0 extends zi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new Td(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Ds(5,5,5),r=new mi({name:"CubemapFromEquirect",uniforms:As(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Xe,blending:ui});r.uniforms.tEquirect.value=e;const o=new an(s,r),a=e.minFilter;return e.minFilter===Di&&(e.minFilter=Tn),new M0(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,i=!0,s=!0){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,s);t.setRenderTarget(r)}}class Li extends Ae{constructor(){super(),this.isGroup=!0,this.type="Group"}}const b0={type:"move"};class Na{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Li,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Li,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Li,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,i),d=this._getHandJoint(c,_);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],f=u.position.distanceTo(h.position),p=.02,g=.005;c.inputState.pinching&&f>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&f<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(b0)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new Li;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}class T0 extends Ae{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ln,this.environmentIntensity=1,this.environmentRotation=new Ln,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}const Oa=new B,A0=new B,w0=new qt;class oi{constructor(t=new B(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const s=Oa.subVectors(i,e).cross(A0.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(Oa),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||w0.getNormalMatrix(t),s=this.coplanarPoint(Oa).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ei=new Wo,R0=new vt(.5,.5),Zr=new B;class zc{constructor(t=new oi,e=new oi,i=new oi,s=new oi,r=new oi,o=new oi){this.planes=[t,e,i,s,r,o]}set(t,e,i,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=An,i=!1){const s=this.planes,r=t.elements,o=r[0],a=r[1],l=r[2],c=r[3],u=r[4],h=r[5],f=r[6],p=r[7],g=r[8],_=r[9],m=r[10],d=r[11],R=r[12],b=r[13],S=r[14],P=r[15];if(s[0].setComponents(c-o,p-u,d-g,P-R).normalize(),s[1].setComponents(c+o,p+u,d+g,P+R).normalize(),s[2].setComponents(c+a,p+h,d+_,P+b).normalize(),s[3].setComponents(c-a,p-h,d-_,P-b).normalize(),i)s[4].setComponents(l,f,m,S).normalize(),s[5].setComponents(c-l,p-f,d-m,P-S).normalize();else if(s[4].setComponents(c-l,p-f,d-m,P-S).normalize(),e===An)s[5].setComponents(c+l,p+f,d+m,P+S).normalize();else if(e===wo)s[5].setComponents(l,f,m,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ei.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ei.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ei)}intersectsSprite(t){Ei.center.set(0,0,0);const e=R0.distanceTo(t.center);return Ei.radius=.7071067811865476+e,Ei.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ei)}intersectsSphere(t){const e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const s=e[i];if(Zr.x=s.normal.x>0?t.max.x:t.min.x,Zr.y=s.normal.y>0?t.max.y:t.min.y,Zr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Zr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Hc extends Ps{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Zt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Co=new B,Po=new B,Ju=new fe,ks=new Xo,Jr=new Wo,Fa=new B,Qu=new B;class C0 extends Ae{constructor(t=new gn,e=new Hc){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)Co.fromBufferAttribute(e,s-1),Po.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=Co.distanceTo(Po);t.setAttribute("lineDistance",new He(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Jr.copy(i.boundingSphere),Jr.applyMatrix4(s),Jr.radius+=r,t.ray.intersectsSphere(Jr)===!1)return;Ju.copy(s).invert(),ks.copy(t.ray).applyMatrix4(Ju);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=i.index,f=i.attributes.position;if(u!==null){const p=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let _=p,m=g-1;_<m;_+=c){const d=u.getX(_),R=u.getX(_+1),b=Qr(this,t,ks,l,d,R,_);b&&e.push(b)}if(this.isLineLoop){const _=u.getX(g-1),m=u.getX(p),d=Qr(this,t,ks,l,_,m,g-1);d&&e.push(d)}}else{const p=Math.max(0,o.start),g=Math.min(f.count,o.start+o.count);for(let _=p,m=g-1;_<m;_+=c){const d=Qr(this,t,ks,l,_,_+1,_);d&&e.push(d)}if(this.isLineLoop){const _=Qr(this,t,ks,l,g-1,p,g-1);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Qr(n,t,e,i,s,r,o){const a=n.geometry.attributes.position;if(Co.fromBufferAttribute(a,s),Po.fromBufferAttribute(a,r),e.distanceSqToSegment(Co,Po,Fa,Qu)>i)return;Fa.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(Fa);if(!(c<t.near||c>t.far))return{distance:c,point:Qu.clone().applyMatrix4(n.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:n}}const th=new B,eh=new B;class Ad extends C0{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[];for(let s=0,r=e.count;s<r;s+=2)th.fromBufferAttribute(e,s),eh.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+th.distanceTo(eh);t.setAttribute("lineDistance",new He(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class wd extends qe{constructor(t,e,i=Fi,s,r,o,a=mn,l=mn,c,u=mr,h=1){if(u!==mr&&u!==gr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:t,height:e,depth:h};super(f,s,r,o,a,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Fc(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Un{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){const i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let i,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)i=this.getPoint(o/t),r+=i.distanceTo(s),e.push(r),s=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const i=this.getLengths();let s=0;const r=i.length;let o;e?o=e:o=t*i[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=i[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,i[s]===o)return s/(r-1);const u=i[s],f=i[s+1]-u,p=(o-u)/f;return(s+p)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),l=e||(o.isVector2?new vt:new B);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){const i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e=!1){const i=new B,s=[],r=[],o=[],a=new B,l=new fe;for(let p=0;p<=t;p++){const g=p/t;s[p]=this.getTangentAt(g,new B)}r[0]=new B,o[0]=new B;let c=Number.MAX_VALUE;const u=Math.abs(s[0].x),h=Math.abs(s[0].y),f=Math.abs(s[0].z);u<=c&&(c=u,i.set(1,0,0)),h<=c&&(c=h,i.set(0,1,0)),f<=c&&i.set(0,0,1),a.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let p=1;p<=t;p++){if(r[p]=r[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(s[p-1],s[p]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(jt(s[p-1].dot(s[p]),-1,1));r[p].applyMatrix4(l.makeRotationAxis(a,g))}o[p].crossVectors(s[p],r[p])}if(e===!0){let p=Math.acos(jt(r[0].dot(r[t]),-1,1));p/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(p=-p);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(s[g],p*g)),o[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Vc extends Un{constructor(t=0,e=0,i=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new vt){const i=e,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),h=Math.sin(this.aRotation),f=l-this.aX,p=c-this.aY;l=f*u-p*h+this.aX,c=f*h+p*u+this.aY}return i.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class P0 extends Vc{constructor(t,e,i,s,r,o){super(t,e,i,i,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function kc(){let n=0,t=0,e=0,i=0;function s(r,o,a,l){n=r,t=a,e=-3*r+3*o-2*a-l,i=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,u,h){let f=(o-r)/c-(a-r)/(c+u)+(a-o)/u,p=(a-o)/u-(l-o)/(u+h)+(l-a)/h;f*=u,p*=u,s(o,a,f,p)},calc:function(r){const o=r*r,a=o*r;return n+t*r+e*o+i*a}}}const to=new B,Ba=new kc,za=new kc,Ha=new kc;class D0 extends Un{constructor(t=[],e=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=s}getPoint(t,e=new B){const i=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,u;this.closed||a>0?c=s[(a-1)%r]:(to.subVectors(s[0],s[1]).add(s[0]),c=to);const h=s[a%r],f=s[(a+1)%r];if(this.closed||a+2<r?u=s[(a+2)%r]:(to.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=to),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(h),p),_=Math.pow(h.distanceToSquared(f),p),m=Math.pow(f.distanceToSquared(u),p);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),Ba.initNonuniformCatmullRom(c.x,h.x,f.x,u.x,g,_,m),za.initNonuniformCatmullRom(c.y,h.y,f.y,u.y,g,_,m),Ha.initNonuniformCatmullRom(c.z,h.z,f.z,u.z,g,_,m)}else this.curveType==="catmullrom"&&(Ba.initCatmullRom(c.x,h.x,f.x,u.x,this.tension),za.initCatmullRom(c.y,h.y,f.y,u.y,this.tension),Ha.initCatmullRom(c.z,h.z,f.z,u.z,this.tension));return i.set(Ba.calc(l),za.calc(l),Ha.calc(l)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(new B().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function nh(n,t,e,i,s){const r=(i-t)*.5,o=(s-e)*.5,a=n*n,l=n*a;return(2*e-2*i+r+o)*l+(-3*e+3*i-2*r-o)*a+r*n+e}function L0(n,t){const e=1-n;return e*e*t}function U0(n,t){return 2*(1-n)*n*t}function I0(n,t){return n*n*t}function rr(n,t,e,i){return L0(n,t)+U0(n,e)+I0(n,i)}function N0(n,t){const e=1-n;return e*e*e*t}function O0(n,t){const e=1-n;return 3*e*e*n*t}function F0(n,t){return 3*(1-n)*n*n*t}function B0(n,t){return n*n*n*t}function or(n,t,e,i,s){return N0(n,t)+O0(n,e)+F0(n,i)+B0(n,s)}class Rd extends Un{constructor(t=new vt,e=new vt,i=new vt,s=new vt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new vt){const i=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(or(t,s.x,r.x,o.x,a.x),or(t,s.y,r.y,o.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class z0 extends Un{constructor(t=new B,e=new B,i=new B,s=new B){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new B){const i=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(or(t,s.x,r.x,o.x,a.x),or(t,s.y,r.y,o.y,a.y),or(t,s.z,r.z,o.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Cd extends Un{constructor(t=new vt,e=new vt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new vt){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new vt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class H0 extends Un{constructor(t=new B,e=new B){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new B){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new B){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Pd extends Un{constructor(t=new vt,e=new vt,i=new vt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new vt){const i=e,s=this.v0,r=this.v1,o=this.v2;return i.set(rr(t,s.x,r.x,o.x),rr(t,s.y,r.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class V0 extends Un{constructor(t=new B,e=new B,i=new B){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new B){const i=e,s=this.v0,r=this.v1,o=this.v2;return i.set(rr(t,s.x,r.x,o.x),rr(t,s.y,r.y,o.y),rr(t,s.z,r.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Dd extends Un{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new vt){const i=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],u=s[o>s.length-2?s.length-1:o+1],h=s[o>s.length-3?s.length-1:o+2];return i.set(nh(a,l.x,c.x,u.x,h.x),nh(a,l.y,c.y,u.y,h.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const s=t.points[e];this.points.push(new vt().fromArray(s))}return this}}var $l=Object.freeze({__proto__:null,ArcCurve:P0,CatmullRomCurve3:D0,CubicBezierCurve:Rd,CubicBezierCurve3:z0,EllipseCurve:Vc,LineCurve:Cd,LineCurve3:H0,QuadraticBezierCurve:Pd,QuadraticBezierCurve3:V0,SplineCurve:Dd});class k0 extends Un{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new $l[i](e,t))}return this}getPoint(t,e){const i=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=i){const o=s[r]-i,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let i=0,s=this.curves.length;i<s;i++)e+=this.curves[i].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let i;for(let s=0,r=this.curves;s<r.length;s++){const o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,l=o.getPoints(a);for(let c=0;c<l.length;c++){const u=l[c];i&&i.equals(u)||(e.push(u),i=u)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,i=this.curves.length;e<i;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){const s=t.curves[e];this.curves.push(new $l[s.type]().fromJSON(s))}return this}}class ih extends k0{constructor(t){super(),this.type="Path",this.currentPoint=new vt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,i=t.length;e<i;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const i=new Cd(this.currentPoint.clone(),new vt(t,e));return this.curves.push(i),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,i,s){const r=new Pd(this.currentPoint.clone(),new vt(t,e),new vt(i,s));return this.curves.push(r),this.currentPoint.set(i,s),this}bezierCurveTo(t,e,i,s,r,o){const a=new Rd(this.currentPoint.clone(),new vt(t,e),new vt(i,s),new vt(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),i=new Dd(e);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,i,s,r,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,i,s,r,o),this}absarc(t,e,i,s,r,o){return this.absellipse(t,e,i,i,s,r,o),this}ellipse(t,e,i,s,r,o,a,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+c,e+u,i,s,r,o,a,l),this}absellipse(t,e,i,s,r,o,a,l){const c=new Vc(t,e,i,s,r,o,a,l);if(this.curves.length>0){const h=c.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class Zl extends ih{constructor(t){super(t),this.uuid=Wi(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let i=0,s=this.holes.length;i<s;i++)e[i]=this.holes[i].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,i=this.holes.length;e<i;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){const s=t.holes[e];this.holes.push(new ih().fromJSON(s))}return this}}function G0(n,t,e=2){const i=t&&t.length,s=i?t[0]*e:n.length;let r=Ld(n,0,s,e,!0);const o=[];if(!r||r.next===r.prev)return o;let a,l,c;if(i&&(r=j0(n,t,r,e)),n.length>80*e){a=1/0,l=1/0;let u=-1/0,h=-1/0;for(let f=e;f<s;f+=e){const p=n[f],g=n[f+1];p<a&&(a=p),g<l&&(l=g),p>u&&(u=p),g>h&&(h=g)}c=Math.max(u-a,h-l),c=c!==0?32767/c:0}return vr(r,o,e,a,l,c,0),o}function Ld(n,t,e,i,s){let r;if(s===rv(n,t,e,i)>0)for(let o=t;o<e;o+=i)r=sh(o/i|0,n[o],n[o+1],r);else for(let o=e-i;o>=t;o-=i)r=sh(o/i|0,n[o],n[o+1],r);return r&&ws(r,r.next)&&(Sr(r),r=r.next),r}function Hi(n,t){if(!n)return n;t||(t=n);let e=n,i;do if(i=!1,!e.steiner&&(ws(e,e.next)||ge(e.prev,e,e.next)===0)){if(Sr(e),e=t=e.prev,e===e.next)break;i=!0}else e=e.next;while(i||e!==t);return t}function vr(n,t,e,i,s,r,o){if(!n)return;!o&&r&&Q0(n,i,s,r);let a=n;for(;n.prev!==n.next;){const l=n.prev,c=n.next;if(r?X0(n,i,s,r):W0(n)){t.push(l.i,n.i,c.i),Sr(n),n=c.next,a=c.next;continue}if(n=c,n===a){o?o===1?(n=q0(Hi(n),t),vr(n,t,e,i,s,r,2)):o===2&&Y0(n,t,e,i,s,r):vr(Hi(n),t,e,i,s,r,1);break}}}function W0(n){const t=n.prev,e=n,i=n.next;if(ge(t,e,i)>=0)return!1;const s=t.x,r=e.x,o=i.x,a=t.y,l=e.y,c=i.y,u=Math.min(s,r,o),h=Math.min(a,l,c),f=Math.max(s,r,o),p=Math.max(a,l,c);let g=i.next;for(;g!==t;){if(g.x>=u&&g.x<=f&&g.y>=h&&g.y<=p&&qs(s,a,r,l,o,c,g.x,g.y)&&ge(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function X0(n,t,e,i){const s=n.prev,r=n,o=n.next;if(ge(s,r,o)>=0)return!1;const a=s.x,l=r.x,c=o.x,u=s.y,h=r.y,f=o.y,p=Math.min(a,l,c),g=Math.min(u,h,f),_=Math.max(a,l,c),m=Math.max(u,h,f),d=Jl(p,g,t,e,i),R=Jl(_,m,t,e,i);let b=n.prevZ,S=n.nextZ;for(;b&&b.z>=d&&S&&S.z<=R;){if(b.x>=p&&b.x<=_&&b.y>=g&&b.y<=m&&b!==s&&b!==o&&qs(a,u,l,h,c,f,b.x,b.y)&&ge(b.prev,b,b.next)>=0||(b=b.prevZ,S.x>=p&&S.x<=_&&S.y>=g&&S.y<=m&&S!==s&&S!==o&&qs(a,u,l,h,c,f,S.x,S.y)&&ge(S.prev,S,S.next)>=0))return!1;S=S.nextZ}for(;b&&b.z>=d;){if(b.x>=p&&b.x<=_&&b.y>=g&&b.y<=m&&b!==s&&b!==o&&qs(a,u,l,h,c,f,b.x,b.y)&&ge(b.prev,b,b.next)>=0)return!1;b=b.prevZ}for(;S&&S.z<=R;){if(S.x>=p&&S.x<=_&&S.y>=g&&S.y<=m&&S!==s&&S!==o&&qs(a,u,l,h,c,f,S.x,S.y)&&ge(S.prev,S,S.next)>=0)return!1;S=S.nextZ}return!0}function q0(n,t){let e=n;do{const i=e.prev,s=e.next.next;!ws(i,s)&&Id(i,e,e.next,s)&&xr(i,s)&&xr(s,i)&&(t.push(i.i,e.i,s.i),Sr(e),Sr(e.next),e=n=s),e=e.next}while(e!==n);return Hi(e)}function Y0(n,t,e,i,s,r){let o=n;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&nv(o,a)){let l=Nd(o,a);o=Hi(o,o.next),l=Hi(l,l.next),vr(o,t,e,i,s,r,0),vr(l,t,e,i,s,r,0);return}a=a.next}o=o.next}while(o!==n)}function j0(n,t,e,i){const s=[];for(let r=0,o=t.length;r<o;r++){const a=t[r]*i,l=r<o-1?t[r+1]*i:n.length,c=Ld(n,a,l,i,!1);c===c.next&&(c.steiner=!0),s.push(ev(c))}s.sort(K0);for(let r=0;r<s.length;r++)e=$0(s[r],e);return e}function K0(n,t){let e=n.x-t.x;if(e===0&&(e=n.y-t.y,e===0)){const i=(n.next.y-n.y)/(n.next.x-n.x),s=(t.next.y-t.y)/(t.next.x-t.x);e=i-s}return e}function $0(n,t){const e=Z0(n,t);if(!e)return t;const i=Nd(e,n);return Hi(i,i.next),Hi(e,e.next)}function Z0(n,t){let e=t;const i=n.x,s=n.y;let r=-1/0,o;if(ws(n,e))return e;do{if(ws(n,e.next))return e.next;if(s<=e.y&&s>=e.next.y&&e.next.y!==e.y){const h=e.x+(s-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(h<=i&&h>r&&(r=h,o=e.x<e.next.x?e:e.next,h===i))return o}e=e.next}while(e!==t);if(!o)return null;const a=o,l=o.x,c=o.y;let u=1/0;e=o;do{if(i>=e.x&&e.x>=l&&i!==e.x&&Ud(s<c?i:r,s,l,c,s<c?r:i,s,e.x,e.y)){const h=Math.abs(s-e.y)/(i-e.x);xr(e,n)&&(h<u||h===u&&(e.x>o.x||e.x===o.x&&J0(o,e)))&&(o=e,u=h)}e=e.next}while(e!==a);return o}function J0(n,t){return ge(n.prev,n,t.prev)<0&&ge(t.next,n,n.next)<0}function Q0(n,t,e,i){let s=n;do s.z===0&&(s.z=Jl(s.x,s.y,t,e,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==n);s.prevZ.nextZ=null,s.prevZ=null,tv(s)}function tv(n){let t,e=1;do{let i=n,s;n=null;let r=null;for(t=0;i;){t++;let o=i,a=0;for(let c=0;c<e&&(a++,o=o.nextZ,!!o);c++);let l=e;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||i.z<=o.z)?(s=i,i=i.nextZ,a--):(s=o,o=o.nextZ,l--),r?r.nextZ=s:n=s,s.prevZ=r,r=s;i=o}r.nextZ=null,e*=2}while(t>1);return n}function Jl(n,t,e,i,s){return n=(n-e)*s|0,t=(t-i)*s|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,n|t<<1}function ev(n){let t=n,e=n;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==n);return e}function Ud(n,t,e,i,s,r,o,a){return(s-o)*(t-a)>=(n-o)*(r-a)&&(n-o)*(i-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(i-a)}function qs(n,t,e,i,s,r,o,a){return!(n===o&&t===a)&&Ud(n,t,e,i,s,r,o,a)}function nv(n,t){return n.next.i!==t.i&&n.prev.i!==t.i&&!iv(n,t)&&(xr(n,t)&&xr(t,n)&&sv(n,t)&&(ge(n.prev,n,t.prev)||ge(n,t.prev,t))||ws(n,t)&&ge(n.prev,n,n.next)>0&&ge(t.prev,t,t.next)>0)}function ge(n,t,e){return(t.y-n.y)*(e.x-t.x)-(t.x-n.x)*(e.y-t.y)}function ws(n,t){return n.x===t.x&&n.y===t.y}function Id(n,t,e,i){const s=no(ge(n,t,e)),r=no(ge(n,t,i)),o=no(ge(e,i,n)),a=no(ge(e,i,t));return!!(s!==r&&o!==a||s===0&&eo(n,e,t)||r===0&&eo(n,i,t)||o===0&&eo(e,n,i)||a===0&&eo(e,t,i))}function eo(n,t,e){return t.x<=Math.max(n.x,e.x)&&t.x>=Math.min(n.x,e.x)&&t.y<=Math.max(n.y,e.y)&&t.y>=Math.min(n.y,e.y)}function no(n){return n>0?1:n<0?-1:0}function iv(n,t){let e=n;do{if(e.i!==n.i&&e.next.i!==n.i&&e.i!==t.i&&e.next.i!==t.i&&Id(e,e.next,n,t))return!0;e=e.next}while(e!==n);return!1}function xr(n,t){return ge(n.prev,n,n.next)<0?ge(n,t,n.next)>=0&&ge(n,n.prev,t)>=0:ge(n,t,n.prev)<0||ge(n,n.next,t)<0}function sv(n,t){let e=n,i=!1;const s=(n.x+t.x)/2,r=(n.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(i=!i),e=e.next;while(e!==n);return i}function Nd(n,t){const e=Ql(n.i,n.x,n.y),i=Ql(t.i,t.x,t.y),s=n.next,r=t.prev;return n.next=t,t.prev=n,e.next=s,s.prev=e,i.next=e,e.prev=i,r.next=i,i.prev=r,i}function sh(n,t,e,i){const s=Ql(n,t,e);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function Sr(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function Ql(n,t,e){return{i:n,x:t,y:e,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function rv(n,t,e,i){let s=0;for(let r=t,o=e-i;r<e;r+=i)s+=(n[o]-n[r])*(n[r+1]+n[o+1]),o=r;return s}class ov{static triangulate(t,e,i=2){return G0(t,e,i)}}class hs{static area(t){const e=t.length;let i=0;for(let s=e-1,r=0;r<e;s=r++)i+=t[s].x*t[r].y-t[r].x*t[s].y;return i*.5}static isClockWise(t){return hs.area(t)<0}static triangulateShape(t,e){const i=[],s=[],r=[];rh(t),oh(i,t);let o=t.length;e.forEach(rh);for(let l=0;l<e.length;l++)s.push(o),o+=e[l].length,oh(i,e[l]);const a=ov.triangulate(i,s);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}}function rh(n){const t=n.length;t>2&&n[t-1].equals(n[0])&&n.pop()}function oh(n,t){for(let e=0;e<t.length;e++)n.push(t[e].x),n.push(t[e].y)}class Do extends gn{constructor(t=new Zl([new vt(.5,.5),new vt(-.5,.5),new vt(-.5,-.5),new vt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const i=this,s=[],r=[];for(let a=0,l=t.length;a<l;a++){const c=t[a];o(c)}this.setAttribute("position",new He(s,3)),this.setAttribute("uv",new He(r,2)),this.computeVertexNormals();function o(a){const l=[],c=e.curveSegments!==void 0?e.curveSegments:12,u=e.steps!==void 0?e.steps:1,h=e.depth!==void 0?e.depth:1;let f=e.bevelEnabled!==void 0?e.bevelEnabled:!0,p=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:p-.1,_=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3;const d=e.extrudePath,R=e.UVGenerator!==void 0?e.UVGenerator:av;let b,S=!1,P,N,D,z;d&&(b=d.getSpacedPoints(u),S=!0,f=!1,P=d.computeFrenetFrames(u,!1),N=new B,D=new B,z=new B),f||(m=0,p=0,g=0,_=0);const T=a.extractPoints(c);let M=T.shape;const A=T.holes;if(!hs.isClockWise(M)){M=M.reverse();for(let C=0,L=A.length;C<L;C++){const O=A[C];hs.isClockWise(O)&&(A[C]=O.reverse())}}function Y(C){const O=10000000000000001e-36;let I=C[0];for(let K=1;K<=C.length;K++){const k=K%C.length,X=C[k],st=X.x-I.x,dt=X.y-I.y,y=st*st+dt*dt,v=Math.max(Math.abs(X.x),Math.abs(X.y),Math.abs(I.x),Math.abs(I.y)),U=O*v*v;if(y<=U){C.splice(k,1),K--;continue}I=X}}Y(M),A.forEach(Y);const Q=A.length,nt=M;for(let C=0;C<Q;C++){const L=A[C];M=M.concat(L)}function $(C,L,O){return L||console.error("THREE.ExtrudeGeometry: vec does not exist"),C.clone().addScaledVector(L,O)}const Z=M.length;function H(C,L,O){let I,K,k;const X=C.x-L.x,st=C.y-L.y,dt=O.x-C.x,y=O.y-C.y,v=X*X+st*st,U=X*y-st*dt;if(Math.abs(U)>Number.EPSILON){const W=Math.sqrt(v),rt=Math.sqrt(dt*dt+y*y),j=L.x-st/W,Mt=L.y+X/W,ct=O.x-y/rt,Tt=O.y+dt/rt,At=((ct-j)*y-(Tt-Mt)*dt)/(X*y-st*dt);I=j+X*At-C.x,K=Mt+st*At-C.y;const ht=I*I+K*K;if(ht<=2)return new vt(I,K);k=Math.sqrt(ht/2)}else{let W=!1;X>Number.EPSILON?dt>Number.EPSILON&&(W=!0):X<-Number.EPSILON?dt<-Number.EPSILON&&(W=!0):Math.sign(st)===Math.sign(y)&&(W=!0),W?(I=-st,K=X,k=Math.sqrt(v)):(I=X,K=st,k=Math.sqrt(v/2))}return new vt(I/k,K/k)}const ot=[];for(let C=0,L=nt.length,O=L-1,I=C+1;C<L;C++,O++,I++)O===L&&(O=0),I===L&&(I=0),ot[C]=H(nt[C],nt[O],nt[I]);const lt=[];let pt,Rt=ot.concat();for(let C=0,L=Q;C<L;C++){const O=A[C];pt=[];for(let I=0,K=O.length,k=K-1,X=I+1;I<K;I++,k++,X++)k===K&&(k=0),X===K&&(X=0),pt[I]=H(O[I],O[k],O[X]);lt.push(pt),Rt=Rt.concat(pt)}let Ft;if(m===0)Ft=hs.triangulateShape(nt,A);else{const C=[],L=[];for(let O=0;O<m;O++){const I=O/m,K=p*Math.cos(I*Math.PI/2),k=g*Math.sin(I*Math.PI/2)+_;for(let X=0,st=nt.length;X<st;X++){const dt=$(nt[X],ot[X],k);Pt(dt.x,dt.y,-K),I===0&&C.push(dt)}for(let X=0,st=Q;X<st;X++){const dt=A[X];pt=lt[X];const y=[];for(let v=0,U=dt.length;v<U;v++){const W=$(dt[v],pt[v],k);Pt(W.x,W.y,-K),I===0&&y.push(W)}I===0&&L.push(y)}}Ft=hs.triangulateShape(C,L)}const Vt=Ft.length,it=g+_;for(let C=0;C<Z;C++){const L=f?$(M[C],Rt[C],it):M[C];S?(D.copy(P.normals[0]).multiplyScalar(L.x),N.copy(P.binormals[0]).multiplyScalar(L.y),z.copy(b[0]).add(D).add(N),Pt(z.x,z.y,z.z)):Pt(L.x,L.y,0)}for(let C=1;C<=u;C++)for(let L=0;L<Z;L++){const O=f?$(M[L],Rt[L],it):M[L];S?(D.copy(P.normals[C]).multiplyScalar(O.x),N.copy(P.binormals[C]).multiplyScalar(O.y),z.copy(b[C]).add(D).add(N),Pt(z.x,z.y,z.z)):Pt(O.x,O.y,h/u*C)}for(let C=m-1;C>=0;C--){const L=C/m,O=p*Math.cos(L*Math.PI/2),I=g*Math.sin(L*Math.PI/2)+_;for(let K=0,k=nt.length;K<k;K++){const X=$(nt[K],ot[K],I);Pt(X.x,X.y,h+O)}for(let K=0,k=A.length;K<k;K++){const X=A[K];pt=lt[K];for(let st=0,dt=X.length;st<dt;st++){const y=$(X[st],pt[st],I);S?Pt(y.x,y.y+b[u-1].y,b[u-1].x+O):Pt(y.x,y.y,h+O)}}}ut(),ft();function ut(){const C=s.length/3;if(f){let L=0,O=Z*L;for(let I=0;I<Vt;I++){const K=Ft[I];Ot(K[2]+O,K[1]+O,K[0]+O)}L=u+m*2,O=Z*L;for(let I=0;I<Vt;I++){const K=Ft[I];Ot(K[0]+O,K[1]+O,K[2]+O)}}else{for(let L=0;L<Vt;L++){const O=Ft[L];Ot(O[2],O[1],O[0])}for(let L=0;L<Vt;L++){const O=Ft[L];Ot(O[0]+Z*u,O[1]+Z*u,O[2]+Z*u)}}i.addGroup(C,s.length/3-C,0)}function ft(){const C=s.length/3;let L=0;Ct(nt,L),L+=nt.length;for(let O=0,I=A.length;O<I;O++){const K=A[O];Ct(K,L),L+=K.length}i.addGroup(C,s.length/3-C,1)}function Ct(C,L){let O=C.length;for(;--O>=0;){const I=O;let K=O-1;K<0&&(K=C.length-1);for(let k=0,X=u+m*2;k<X;k++){const st=Z*k,dt=Z*(k+1),y=L+I+st,v=L+K+st,U=L+K+dt,W=L+I+dt;le(y,v,U,W)}}}function Pt(C,L,O){l.push(C),l.push(L),l.push(O)}function Ot(C,L,O){w(C),w(L),w(O);const I=s.length/3,K=R.generateTopUV(i,s,I-3,I-2,I-1);x(K[0]),x(K[1]),x(K[2])}function le(C,L,O,I){w(C),w(L),w(I),w(L),w(O),w(I);const K=s.length/3,k=R.generateSideWallUV(i,s,K-6,K-3,K-2,K-1);x(k[0]),x(k[1]),x(k[3]),x(k[1]),x(k[2]),x(k[3])}function w(C){s.push(l[C*3+0]),s.push(l[C*3+1]),s.push(l[C*3+2])}function x(C){r.push(C.x),r.push(C.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,i=this.parameters.options;return lv(e,i,t)}static fromJSON(t,e){const i=[];for(let r=0,o=t.shapes.length;r<o;r++){const a=e[t.shapes[r]];i.push(a)}const s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new $l[s.type]().fromJSON(s)),new Do(i,t.options)}}const av={generateTopUV:function(n,t,e,i,s){const r=t[e*3],o=t[e*3+1],a=t[i*3],l=t[i*3+1],c=t[s*3],u=t[s*3+1];return[new vt(r,o),new vt(a,l),new vt(c,u)]},generateSideWallUV:function(n,t,e,i,s,r){const o=t[e*3],a=t[e*3+1],l=t[e*3+2],c=t[i*3],u=t[i*3+1],h=t[i*3+2],f=t[s*3],p=t[s*3+1],g=t[s*3+2],_=t[r*3],m=t[r*3+1],d=t[r*3+2];return Math.abs(a-u)<Math.abs(o-c)?[new vt(o,1-l),new vt(c,1-h),new vt(f,1-g),new vt(_,1-d)]:[new vt(a,1-l),new vt(u,1-h),new vt(p,1-g),new vt(m,1-d)]}};function lv(n,t,e){if(e.shapes=[],Array.isArray(n))for(let i=0,s=n.length;i<s;i++){const r=n[i];e.shapes.push(r.uuid)}else e.shapes.push(n.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class qo extends gn{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(i),l=Math.floor(s),c=a+1,u=l+1,h=t/a,f=e/l,p=[],g=[],_=[],m=[];for(let d=0;d<u;d++){const R=d*f-o;for(let b=0;b<c;b++){const S=b*h-r;g.push(S,-R,0),_.push(0,0,1),m.push(b/a),m.push(1-d/l)}}for(let d=0;d<l;d++)for(let R=0;R<a;R++){const b=R+c*d,S=R+c*(d+1),P=R+1+c*(d+1),N=R+1+c*d;p.push(b,S,N),p.push(S,P,N)}this.setIndex(p),this.setAttribute("position",new He(g,3)),this.setAttribute("normal",new He(_,3)),this.setAttribute("uv",new He(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new qo(t.width,t.height,t.widthSegments,t.heightSegments)}}class Va extends Ps{constructor(t){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Zt(16777215),this.specular=new Zt(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Zt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=md,this.normalScale=new vt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ln,this.combine=Cc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class cv extends Ps{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=w_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class uv extends Ps{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Od extends Ae{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Zt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}const ka=new fe,ah=new B,lh=new B;class hv{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new vt(512,512),this.mapType=Dn,this.map=null,this.mapPass=null,this.matrix=new fe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new zc,this._frameExtents=new vt(1,1),this._viewportCount=1,this._viewports=[new ve(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;ah.setFromMatrixPosition(t.matrixWorld),e.position.copy(ah),lh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(lh),e.updateMatrixWorld(),ka.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ka,e.coordinateSystem,e.reversedDepth),e.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(ka)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Fd extends bd{constructor(t=-1,e=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,o=i+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class fv extends hv{constructor(){super(new Fd(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class dv extends Od{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ae.DEFAULT_UP),this.updateMatrix(),this.target=new Ae,this.shadow=new fv}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class pv extends Od{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class mv extends on{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const ch=new fe;class gv{constructor(t,e,i=0,s=1/0){this.ray=new Xo(t,e),this.near=i,this.far=s,this.camera=null,this.layers=new Bc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return ch.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ch),this}intersectObject(t,e=!0,i=[]){return tc(t,this,i,e),i.sort(uh),i}intersectObjects(t,e=!0,i=[]){for(let s=0,r=t.length;s<r;s++)tc(t[s],this,i,e);return i.sort(uh),i}}function uh(n,t){return n.distance-t.distance}function tc(n,t,e,i){let s=!0;if(n.layers.test(t.layers)&&n.raycast(t,e)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let o=0,a=r.length;o<a;o++)tc(r[o],t,e,!0)}}class hh{constructor(t=1,e=0,i=0){this.radius=t,this.phi=e,this.theta=i}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=jt(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(jt(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class _v extends Ad{constructor(t=10,e=10,i=4473924,s=8947848){i=new Zt(i),s=new Zt(s);const r=e/2,o=t/e,a=t/2,l=[],c=[];for(let f=0,p=0,g=-a;f<=e;f++,g+=o){l.push(-a,0,g,a,0,g),l.push(g,0,-a,g,0,a);const _=f===r?i:s;_.toArray(c,p),p+=3,_.toArray(c,p),p+=3,_.toArray(c,p),p+=3,_.toArray(c,p),p+=3}const u=new gn;u.setAttribute("position",new He(l,3)),u.setAttribute("color",new He(c,3));const h=new Hc({vertexColors:!0,toneMapped:!1});super(u,h),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}}class vv extends Ad{constructor(t=1){const e=[0,0,0,t,0,0,0,0,0,0,t,0,0,0,0,0,0,t],i=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],s=new gn;s.setAttribute("position",new He(e,3)),s.setAttribute("color",new He(i,3));const r=new Hc({vertexColors:!0,toneMapped:!1});super(s,r),this.type="AxesHelper"}setColors(t,e,i){const s=new Zt,r=this.geometry.attributes.color.array;return s.set(t),s.toArray(r,0),s.toArray(r,3),s.set(e),s.toArray(r,6),s.toArray(r,9),s.set(i),s.toArray(r,12),s.toArray(r,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}}class xv extends Gi{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){if(t===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}}function fh(n,t,e,i){const s=Sv(i);switch(e){case ud:return n*t;case fd:return n*t/s.components*s.byteLength;case Uc:return n*t/s.components*s.byteLength;case dd:return n*t*2/s.components*s.byteLength;case Ic:return n*t*2/s.components*s.byteLength;case hd:return n*t*3/s.components*s.byteLength;case fn:return n*t*4/s.components*s.byteLength;case Nc:return n*t*4/s.components*s.byteLength;case uo:case ho:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case fo:case po:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Tl:case wl:return Math.max(n,16)*Math.max(t,8)/4;case bl:case Al:return Math.max(n,8)*Math.max(t,8)/2;case Rl:case Cl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Pl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Dl:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Ll:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case Ul:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case Il:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case Nl:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case Ol:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case Fl:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case Bl:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case zl:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case Hl:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case Vl:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case kl:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case Gl:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case Wl:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case mo:case Xl:case ql:return Math.ceil(n/4)*Math.ceil(t/4)*16;case pd:case Yl:return Math.ceil(n/4)*Math.ceil(t/4)*8;case jl:case Kl:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Sv(n){switch(n){case Dn:case ad:return{byteLength:1,components:1};case dr:case ld:case br:return{byteLength:2,components:1};case Dc:case Lc:return{byteLength:2,components:4};case Fi:case Pc:case qn:return{byteLength:4,components:1};case cd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Rc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Rc);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Bd(){let n=null,t=!1,e=null,i=null;function s(r,o){e(r,o),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function yv(n){const t=new WeakMap;function e(a,l){const c=a.array,u=a.usage,h=c.byteLength,f=n.createBuffer();n.bindBuffer(l,f),n.bufferData(l,c,u),a.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=n.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:h}}function i(a,l,c){const u=l.array,h=l.updateRanges;if(n.bindBuffer(c,a),h.length===0)n.bufferSubData(c,0,u);else{h.sort((p,g)=>p.start-g.start);let f=0;for(let p=1;p<h.length;p++){const g=h[f],_=h[p];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++f,h[f]=_)}h.length=f+1;for(let p=0,g=h.length;p<g;p++){const _=h[p];n.bufferSubData(c,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(n.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=t.get(a);(!u||u.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var Mv=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Ev=`#ifdef USE_ALPHAHASH
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
#endif`,bv=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Tv=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Av=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,wv=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Rv=`#ifdef USE_AOMAP
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
#endif`,Cv=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Pv=`#ifdef USE_BATCHING
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
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Dv=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Lv=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Uv=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Iv=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Nv=`#ifdef USE_IRIDESCENCE
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
#endif`,Ov=`#ifdef USE_BUMPMAP
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
#endif`,Fv=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Bv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,zv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Hv=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Vv=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,kv=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Gv=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Wv=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Xv=`#define PI 3.141592653589793
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
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
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
} // validated`,qv=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Yv=`vec3 transformedNormal = objectNormal;
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
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,jv=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Kv=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,$v=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Zv=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Jv="gl_FragColor = linearToOutputTexel( gl_FragColor );",Qv=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,tx=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,ex=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,nx=`#ifdef USE_ENVMAP
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
#endif`,ix=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,sx=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,rx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ox=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ax=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,lx=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,cx=`#ifdef USE_GRADIENTMAP
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
}`,ux=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,hx=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,fx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,dx=`uniform bool receiveShadow;
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
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
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
#endif`,px=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
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
	#endif
#endif`,mx=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,gx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,_x=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,vx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,xx=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
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
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
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
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
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
#endif`,Sx=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
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
		vec3 iridescenceF0;
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
		float v = 0.5 / ( gv + gl );
		return saturate(v);
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
	vec3 f0 = material.specularColor;
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
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
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
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
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
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
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
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,yx=`
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
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
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
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
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
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Mx=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Ex=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,bx=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Tx=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ax=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,wx=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Rx=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Cx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Px=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Dx=`#if defined( USE_POINTS_UV )
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
#endif`,Lx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ux=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ix=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Nx=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ox=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Fx=`#ifdef USE_MORPHTARGETS
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
#endif`,Bx=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,zx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
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
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Hx=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Vx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,kx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Gx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Wx=`#ifdef USE_NORMALMAP
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
#endif`,Xx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,qx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Yx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,jx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Kx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,$x=`vec3 packNormalToRGB( const in vec3 normal ) {
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
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Zx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Jx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Qx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,tS=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,eS=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,nS=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,iS=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
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
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
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
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
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
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSEDEPTHBUF
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSEDEPTHBUF
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare , distribution.x );
		#endif
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,sS=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
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
#endif`,rS=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
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
#endif`,oS=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
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
	#if NUM_POINT_LIGHT_SHADOWS > 0
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
}`,aS=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,lS=`#ifdef USE_SKINNING
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
#endif`,cS=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,uS=`#ifdef USE_SKINNING
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
#endif`,hS=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,fS=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,dS=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,pS=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,mS=`#ifdef USE_TRANSMISSION
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
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,gS=`#ifdef USE_TRANSMISSION
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
#endif`,_S=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,vS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,xS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,SS=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const yS=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,MS=`uniform sampler2D t2D;
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
}`,ES=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,bS=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,TS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,AS=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wS=`#include <common>
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
}`,RS=`#if DEPTH_PACKING == 3200
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
	#ifdef USE_REVERSEDEPTHBUF
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
}`,CS=`#define DISTANCE
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
}`,PS=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,DS=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,LS=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,US=`uniform float scale;
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
}`,IS=`uniform vec3 diffuse;
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
}`,NS=`#include <common>
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
}`,OS=`uniform vec3 diffuse;
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
}`,FS=`#define LAMBERT
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
}`,BS=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
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
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
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
}`,zS=`#define MATCAP
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
}`,HS=`#define MATCAP
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
}`,VS=`#define NORMAL
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
}`,kS=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
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
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,GS=`#define PHONG
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
}`,WS=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
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
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
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
}`,XS=`#define STANDARD
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
}`,qS=`#define STANDARD
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
#include <packing>
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
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
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
}`,YS=`#define TOON
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
}`,jS=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
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
}`,KS=`uniform float size;
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
}`,$S=`uniform vec3 diffuse;
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
}`,ZS=`#include <common>
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
}`,JS=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
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
}`,QS=`uniform float rotation;
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
}`,ty=`uniform vec3 diffuse;
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
}`,Yt={alphahash_fragment:Mv,alphahash_pars_fragment:Ev,alphamap_fragment:bv,alphamap_pars_fragment:Tv,alphatest_fragment:Av,alphatest_pars_fragment:wv,aomap_fragment:Rv,aomap_pars_fragment:Cv,batching_pars_vertex:Pv,batching_vertex:Dv,begin_vertex:Lv,beginnormal_vertex:Uv,bsdfs:Iv,iridescence_fragment:Nv,bumpmap_pars_fragment:Ov,clipping_planes_fragment:Fv,clipping_planes_pars_fragment:Bv,clipping_planes_pars_vertex:zv,clipping_planes_vertex:Hv,color_fragment:Vv,color_pars_fragment:kv,color_pars_vertex:Gv,color_vertex:Wv,common:Xv,cube_uv_reflection_fragment:qv,defaultnormal_vertex:Yv,displacementmap_pars_vertex:jv,displacementmap_vertex:Kv,emissivemap_fragment:$v,emissivemap_pars_fragment:Zv,colorspace_fragment:Jv,colorspace_pars_fragment:Qv,envmap_fragment:tx,envmap_common_pars_fragment:ex,envmap_pars_fragment:nx,envmap_pars_vertex:ix,envmap_physical_pars_fragment:px,envmap_vertex:sx,fog_vertex:rx,fog_pars_vertex:ox,fog_fragment:ax,fog_pars_fragment:lx,gradientmap_pars_fragment:cx,lightmap_pars_fragment:ux,lights_lambert_fragment:hx,lights_lambert_pars_fragment:fx,lights_pars_begin:dx,lights_toon_fragment:mx,lights_toon_pars_fragment:gx,lights_phong_fragment:_x,lights_phong_pars_fragment:vx,lights_physical_fragment:xx,lights_physical_pars_fragment:Sx,lights_fragment_begin:yx,lights_fragment_maps:Mx,lights_fragment_end:Ex,logdepthbuf_fragment:bx,logdepthbuf_pars_fragment:Tx,logdepthbuf_pars_vertex:Ax,logdepthbuf_vertex:wx,map_fragment:Rx,map_pars_fragment:Cx,map_particle_fragment:Px,map_particle_pars_fragment:Dx,metalnessmap_fragment:Lx,metalnessmap_pars_fragment:Ux,morphinstance_vertex:Ix,morphcolor_vertex:Nx,morphnormal_vertex:Ox,morphtarget_pars_vertex:Fx,morphtarget_vertex:Bx,normal_fragment_begin:zx,normal_fragment_maps:Hx,normal_pars_fragment:Vx,normal_pars_vertex:kx,normal_vertex:Gx,normalmap_pars_fragment:Wx,clearcoat_normal_fragment_begin:Xx,clearcoat_normal_fragment_maps:qx,clearcoat_pars_fragment:Yx,iridescence_pars_fragment:jx,opaque_fragment:Kx,packing:$x,premultiplied_alpha_fragment:Zx,project_vertex:Jx,dithering_fragment:Qx,dithering_pars_fragment:tS,roughnessmap_fragment:eS,roughnessmap_pars_fragment:nS,shadowmap_pars_fragment:iS,shadowmap_pars_vertex:sS,shadowmap_vertex:rS,shadowmask_pars_fragment:oS,skinbase_vertex:aS,skinning_pars_vertex:lS,skinning_vertex:cS,skinnormal_vertex:uS,specularmap_fragment:hS,specularmap_pars_fragment:fS,tonemapping_fragment:dS,tonemapping_pars_fragment:pS,transmission_fragment:mS,transmission_pars_fragment:gS,uv_pars_fragment:_S,uv_pars_vertex:vS,uv_vertex:xS,worldpos_vertex:SS,background_vert:yS,background_frag:MS,backgroundCube_vert:ES,backgroundCube_frag:bS,cube_vert:TS,cube_frag:AS,depth_vert:wS,depth_frag:RS,distanceRGBA_vert:CS,distanceRGBA_frag:PS,equirect_vert:DS,equirect_frag:LS,linedashed_vert:US,linedashed_frag:IS,meshbasic_vert:NS,meshbasic_frag:OS,meshlambert_vert:FS,meshlambert_frag:BS,meshmatcap_vert:zS,meshmatcap_frag:HS,meshnormal_vert:VS,meshnormal_frag:kS,meshphong_vert:GS,meshphong_frag:WS,meshphysical_vert:XS,meshphysical_frag:qS,meshtoon_vert:YS,meshtoon_frag:jS,points_vert:KS,points_frag:$S,shadow_vert:ZS,shadow_frag:JS,sprite_vert:QS,sprite_frag:ty},yt={common:{diffuse:{value:new Zt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new qt},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new qt}},envmap:{envMap:{value:null},envMapRotation:{value:new qt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new qt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new qt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new qt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new qt},normalScale:{value:new vt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new qt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new qt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new qt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new qt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Zt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Zt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0},uvTransform:{value:new qt}},sprite:{diffuse:{value:new Zt(16777215)},opacity:{value:1},center:{value:new vt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new qt},alphaMap:{value:null},alphaMapTransform:{value:new qt},alphaTest:{value:0}}},En={basic:{uniforms:Oe([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.fog]),vertexShader:Yt.meshbasic_vert,fragmentShader:Yt.meshbasic_frag},lambert:{uniforms:Oe([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,yt.lights,{emissive:{value:new Zt(0)}}]),vertexShader:Yt.meshlambert_vert,fragmentShader:Yt.meshlambert_frag},phong:{uniforms:Oe([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,yt.lights,{emissive:{value:new Zt(0)},specular:{value:new Zt(1118481)},shininess:{value:30}}]),vertexShader:Yt.meshphong_vert,fragmentShader:Yt.meshphong_frag},standard:{uniforms:Oe([yt.common,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.roughnessmap,yt.metalnessmap,yt.fog,yt.lights,{emissive:{value:new Zt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Yt.meshphysical_vert,fragmentShader:Yt.meshphysical_frag},toon:{uniforms:Oe([yt.common,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.gradientmap,yt.fog,yt.lights,{emissive:{value:new Zt(0)}}]),vertexShader:Yt.meshtoon_vert,fragmentShader:Yt.meshtoon_frag},matcap:{uniforms:Oe([yt.common,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,{matcap:{value:null}}]),vertexShader:Yt.meshmatcap_vert,fragmentShader:Yt.meshmatcap_frag},points:{uniforms:Oe([yt.points,yt.fog]),vertexShader:Yt.points_vert,fragmentShader:Yt.points_frag},dashed:{uniforms:Oe([yt.common,yt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Yt.linedashed_vert,fragmentShader:Yt.linedashed_frag},depth:{uniforms:Oe([yt.common,yt.displacementmap]),vertexShader:Yt.depth_vert,fragmentShader:Yt.depth_frag},normal:{uniforms:Oe([yt.common,yt.bumpmap,yt.normalmap,yt.displacementmap,{opacity:{value:1}}]),vertexShader:Yt.meshnormal_vert,fragmentShader:Yt.meshnormal_frag},sprite:{uniforms:Oe([yt.sprite,yt.fog]),vertexShader:Yt.sprite_vert,fragmentShader:Yt.sprite_frag},background:{uniforms:{uvTransform:{value:new qt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Yt.background_vert,fragmentShader:Yt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new qt}},vertexShader:Yt.backgroundCube_vert,fragmentShader:Yt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Yt.cube_vert,fragmentShader:Yt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Yt.equirect_vert,fragmentShader:Yt.equirect_frag},distanceRGBA:{uniforms:Oe([yt.common,yt.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Yt.distanceRGBA_vert,fragmentShader:Yt.distanceRGBA_frag},shadow:{uniforms:Oe([yt.lights,yt.fog,{color:{value:new Zt(0)},opacity:{value:1}}]),vertexShader:Yt.shadow_vert,fragmentShader:Yt.shadow_frag}};En.physical={uniforms:Oe([En.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new qt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new qt},clearcoatNormalScale:{value:new vt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new qt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new qt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new qt},sheen:{value:0},sheenColor:{value:new Zt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new qt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new qt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new qt},transmissionSamplerSize:{value:new vt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new qt},attenuationDistance:{value:0},attenuationColor:{value:new Zt(0)},specularColor:{value:new Zt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new qt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new qt},anisotropyVector:{value:new vt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new qt}}]),vertexShader:Yt.meshphysical_vert,fragmentShader:Yt.meshphysical_frag};const io={r:0,b:0,g:0},bi=new Ln,ey=new fe;function ny(n,t,e,i,s,r,o){const a=new Zt(0);let l=r===!0?0:1,c,u,h=null,f=0,p=null;function g(b){let S=b.isScene===!0?b.background:null;return S&&S.isTexture&&(S=(b.backgroundBlurriness>0?e:t).get(S)),S}function _(b){let S=!1;const P=g(b);P===null?d(a,l):P&&P.isColor&&(d(P,1),S=!0);const N=n.xr.getEnvironmentBlendMode();N==="additive"?i.buffers.color.setClear(0,0,0,1,o):N==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||S)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(b,S){const P=g(S);P&&(P.isCubeTexture||P.mapping===Go)?(u===void 0&&(u=new an(new Ds(1,1,1),new mi({name:"BackgroundCubeMaterial",uniforms:As(En.backgroundCube.uniforms),vertexShader:En.backgroundCube.vertexShader,fragmentShader:En.backgroundCube.fragmentShader,side:Xe,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(N,D,z){this.matrixWorld.copyPosition(z.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),bi.copy(S.backgroundRotation),bi.x*=-1,bi.y*=-1,bi.z*=-1,P.isCubeTexture&&P.isRenderTargetTexture===!1&&(bi.y*=-1,bi.z*=-1),u.material.uniforms.envMap.value=P,u.material.uniforms.flipEnvMap.value=P.isCubeTexture&&P.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(ey.makeRotationFromEuler(bi)),u.material.toneMapped=te.getTransfer(P.colorSpace)!==re,(h!==P||f!==P.version||p!==n.toneMapping)&&(u.material.needsUpdate=!0,h=P,f=P.version,p=n.toneMapping),u.layers.enableAll(),b.unshift(u,u.geometry,u.material,0,0,null)):P&&P.isTexture&&(c===void 0&&(c=new an(new qo(2,2),new mi({name:"BackgroundMaterial",uniforms:As(En.background.uniforms),vertexShader:En.background.vertexShader,fragmentShader:En.background.fragmentShader,side:pi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=P,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.toneMapped=te.getTransfer(P.colorSpace)!==re,P.matrixAutoUpdate===!0&&P.updateMatrix(),c.material.uniforms.uvTransform.value.copy(P.matrix),(h!==P||f!==P.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,h=P,f=P.version,p=n.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function d(b,S){b.getRGB(io,Ed(n)),i.buffers.color.setClear(io.r,io.g,io.b,S,o)}function R(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(b,S=1){a.set(b),l=S,d(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(b){l=b,d(a,l)},render:_,addToRenderList:m,dispose:R}}function iy(n,t){const e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=f(null);let r=s,o=!1;function a(M,A,q,Y,Q){let nt=!1;const $=h(Y,q,A);r!==$&&(r=$,c(r.object)),nt=p(M,Y,q,Q),nt&&g(M,Y,q,Q),Q!==null&&t.update(Q,n.ELEMENT_ARRAY_BUFFER),(nt||o)&&(o=!1,S(M,A,q,Y),Q!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(Q).buffer))}function l(){return n.createVertexArray()}function c(M){return n.bindVertexArray(M)}function u(M){return n.deleteVertexArray(M)}function h(M,A,q){const Y=q.wireframe===!0;let Q=i[M.id];Q===void 0&&(Q={},i[M.id]=Q);let nt=Q[A.id];nt===void 0&&(nt={},Q[A.id]=nt);let $=nt[Y];return $===void 0&&($=f(l()),nt[Y]=$),$}function f(M){const A=[],q=[],Y=[];for(let Q=0;Q<e;Q++)A[Q]=0,q[Q]=0,Y[Q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:A,enabledAttributes:q,attributeDivisors:Y,object:M,attributes:{},index:null}}function p(M,A,q,Y){const Q=r.attributes,nt=A.attributes;let $=0;const Z=q.getAttributes();for(const H in Z)if(Z[H].location>=0){const lt=Q[H];let pt=nt[H];if(pt===void 0&&(H==="instanceMatrix"&&M.instanceMatrix&&(pt=M.instanceMatrix),H==="instanceColor"&&M.instanceColor&&(pt=M.instanceColor)),lt===void 0||lt.attribute!==pt||pt&&lt.data!==pt.data)return!0;$++}return r.attributesNum!==$||r.index!==Y}function g(M,A,q,Y){const Q={},nt=A.attributes;let $=0;const Z=q.getAttributes();for(const H in Z)if(Z[H].location>=0){let lt=nt[H];lt===void 0&&(H==="instanceMatrix"&&M.instanceMatrix&&(lt=M.instanceMatrix),H==="instanceColor"&&M.instanceColor&&(lt=M.instanceColor));const pt={};pt.attribute=lt,lt&&lt.data&&(pt.data=lt.data),Q[H]=pt,$++}r.attributes=Q,r.attributesNum=$,r.index=Y}function _(){const M=r.newAttributes;for(let A=0,q=M.length;A<q;A++)M[A]=0}function m(M){d(M,0)}function d(M,A){const q=r.newAttributes,Y=r.enabledAttributes,Q=r.attributeDivisors;q[M]=1,Y[M]===0&&(n.enableVertexAttribArray(M),Y[M]=1),Q[M]!==A&&(n.vertexAttribDivisor(M,A),Q[M]=A)}function R(){const M=r.newAttributes,A=r.enabledAttributes;for(let q=0,Y=A.length;q<Y;q++)A[q]!==M[q]&&(n.disableVertexAttribArray(q),A[q]=0)}function b(M,A,q,Y,Q,nt,$){$===!0?n.vertexAttribIPointer(M,A,q,Q,nt):n.vertexAttribPointer(M,A,q,Y,Q,nt)}function S(M,A,q,Y){_();const Q=Y.attributes,nt=q.getAttributes(),$=A.defaultAttributeValues;for(const Z in nt){const H=nt[Z];if(H.location>=0){let ot=Q[Z];if(ot===void 0&&(Z==="instanceMatrix"&&M.instanceMatrix&&(ot=M.instanceMatrix),Z==="instanceColor"&&M.instanceColor&&(ot=M.instanceColor)),ot!==void 0){const lt=ot.normalized,pt=ot.itemSize,Rt=t.get(ot);if(Rt===void 0)continue;const Ft=Rt.buffer,Vt=Rt.type,it=Rt.bytesPerElement,ut=Vt===n.INT||Vt===n.UNSIGNED_INT||ot.gpuType===Pc;if(ot.isInterleavedBufferAttribute){const ft=ot.data,Ct=ft.stride,Pt=ot.offset;if(ft.isInstancedInterleavedBuffer){for(let Ot=0;Ot<H.locationSize;Ot++)d(H.location+Ot,ft.meshPerAttribute);M.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=ft.meshPerAttribute*ft.count)}else for(let Ot=0;Ot<H.locationSize;Ot++)m(H.location+Ot);n.bindBuffer(n.ARRAY_BUFFER,Ft);for(let Ot=0;Ot<H.locationSize;Ot++)b(H.location+Ot,pt/H.locationSize,Vt,lt,Ct*it,(Pt+pt/H.locationSize*Ot)*it,ut)}else{if(ot.isInstancedBufferAttribute){for(let ft=0;ft<H.locationSize;ft++)d(H.location+ft,ot.meshPerAttribute);M.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let ft=0;ft<H.locationSize;ft++)m(H.location+ft);n.bindBuffer(n.ARRAY_BUFFER,Ft);for(let ft=0;ft<H.locationSize;ft++)b(H.location+ft,pt/H.locationSize,Vt,lt,pt*it,pt/H.locationSize*ft*it,ut)}}else if($!==void 0){const lt=$[Z];if(lt!==void 0)switch(lt.length){case 2:n.vertexAttrib2fv(H.location,lt);break;case 3:n.vertexAttrib3fv(H.location,lt);break;case 4:n.vertexAttrib4fv(H.location,lt);break;default:n.vertexAttrib1fv(H.location,lt)}}}}R()}function P(){z();for(const M in i){const A=i[M];for(const q in A){const Y=A[q];for(const Q in Y)u(Y[Q].object),delete Y[Q];delete A[q]}delete i[M]}}function N(M){if(i[M.id]===void 0)return;const A=i[M.id];for(const q in A){const Y=A[q];for(const Q in Y)u(Y[Q].object),delete Y[Q];delete A[q]}delete i[M.id]}function D(M){for(const A in i){const q=i[A];if(q[M.id]===void 0)continue;const Y=q[M.id];for(const Q in Y)u(Y[Q].object),delete Y[Q];delete q[M.id]}}function z(){T(),o=!0,r!==s&&(r=s,c(r.object))}function T(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:z,resetDefaultState:T,dispose:P,releaseStatesOfGeometry:N,releaseStatesOfProgram:D,initAttributes:_,enableAttribute:m,disableUnusedAttributes:R}}function sy(n,t,e){let i;function s(c){i=c}function r(c,u){n.drawArrays(i,c,u),e.update(u,i,1)}function o(c,u,h){h!==0&&(n.drawArraysInstanced(i,c,u,h),e.update(u,i,h))}function a(c,u,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,u,0,h);let p=0;for(let g=0;g<h;g++)p+=u[g];e.update(p,i,1)}function l(c,u,h,f){if(h===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)o(c[g],u[g],f[g]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,u,0,f,0,h);let g=0;for(let _=0;_<h;_++)g+=u[_]*f[_];e.update(g,i,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function ry(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const D=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(D.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(D){return!(D!==fn&&i.convert(D)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(D){const z=D===br&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(D!==Dn&&i.convert(D)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&D!==qn&&!z)}function l(D){if(D==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";D="mediump"}return D==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=e.logarithmicDepthBuffer===!0,f=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),d=n.getParameter(n.MAX_VERTEX_ATTRIBS),R=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),b=n.getParameter(n.MAX_VARYING_VECTORS),S=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),P=g>0,N=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:d,maxVertexUniforms:R,maxVaryings:b,maxFragmentUniforms:S,vertexTextures:P,maxSamples:N}}function oy(n){const t=this;let e=null,i=0,s=!1,r=!1;const o=new oi,a=new qt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const p=h.length!==0||f||i!==0||s;return s=f,i=h.length,p},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,f){e=u(h,f,0)},this.setState=function(h,f,p){const g=h.clippingPlanes,_=h.clipIntersection,m=h.clipShadows,d=n.get(h);if(!s||g===null||g.length===0||r&&!m)r?u(null):c();else{const R=r?0:i,b=R*4;let S=d.clippingState||null;l.value=S,S=u(g,f,b,p);for(let P=0;P!==b;++P)S[P]=e[P];d.clippingState=S,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=R}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(h,f,p,g){const _=h!==null?h.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const d=p+_*4,R=f.matrixWorldInverse;a.getNormalMatrix(R),(m===null||m.length<d)&&(m=new Float32Array(d));for(let b=0,S=p;b!==_;++b,S+=4)o.copy(h[b]).applyMatrix4(R,a),o.normal.toArray(m,S),m[S+3]=o.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function ay(n){let t=new WeakMap;function e(o,a){return a===Sl?o.mapping=Es:a===yl&&(o.mapping=bs),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===Sl||a===yl)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new E0(l.height);return c.fromEquirectangularTexture(n,o),t.set(o,c),o.addEventListener("dispose",s),e(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}const fs=4,dh=[.125,.215,.35,.446,.526,.582],Ci=20,Ga=new Fd,ph=new Zt;let Wa=null,Xa=0,qa=0,Ya=!1;const wi=(1+Math.sqrt(5))/2,os=1/wi,mh=[new B(-wi,os,0),new B(wi,os,0),new B(-os,0,wi),new B(os,0,wi),new B(0,wi,-os),new B(0,wi,os),new B(-1,1,-1),new B(1,1,-1),new B(-1,1,1),new B(1,1,1)],ly=new B;class gh{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100,r={}){const{size:o=256,position:a=ly}=r;Wa=this._renderer.getRenderTarget(),Xa=this._renderer.getActiveCubeFace(),qa=this._renderer.getActiveMipmapLevel(),Ya=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,s,l,a),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=xh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=vh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Wa,Xa,qa),this._renderer.xr.enabled=Ya,t.scissorTest=!1,so(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Es||t.mapping===bs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Wa=this._renderer.getRenderTarget(),Xa=this._renderer.getActiveCubeFace(),qa=this._renderer.getActiveMipmapLevel(),Ya=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:Tn,minFilter:Tn,generateMipmaps:!1,type:br,format:fn,colorSpace:Ts,depthBuffer:!1},s=_h(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=_h(t,e,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=cy(r)),this._blurMaterial=uy(r,t,e)}return s}_compileMaterial(t){const e=new an(this._lodPlanes[0],t);this._renderer.compile(e,Ga)}_sceneToCubeUV(t,e,i,s,r){const l=new on(90,1,e,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,f=h.autoClear,p=h.toneMapping;h.getClearColor(ph),h.toneMapping=hi,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(s),h.clearDepth(),h.setRenderTarget(null));const _=new Sd({name:"PMREM.Background",side:Xe,depthWrite:!1,depthTest:!1}),m=new an(new Ds,_);let d=!1;const R=t.background;R?R.isColor&&(_.color.copy(R),t.background=null,d=!0):(_.color.copy(ph),d=!0);for(let b=0;b<6;b++){const S=b%3;S===0?(l.up.set(0,c[b],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[b],r.y,r.z)):S===1?(l.up.set(0,0,c[b]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[b],r.z)):(l.up.set(0,c[b],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[b]));const P=this._cubeSize;so(s,S*P,b>2?P:0,P,P),h.setRenderTarget(s),d&&h.render(m,l),h.render(t,l)}m.geometry.dispose(),m.material.dispose(),h.toneMapping=p,h.autoClear=f,t.background=R}_textureToCubeUV(t,e){const i=this._renderer,s=t.mapping===Es||t.mapping===bs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=xh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=vh());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new an(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;so(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(o,Ga)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=mh[(s-r-1)%mh.length];this._blur(t,r-1,r,o,a)}e.autoClear=i}_blur(t,e,i,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,s,"latitudinal",r),this._halfBlur(o,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new an(this._lodPlanes[s],c),f=c.uniforms,p=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Ci-1),_=r/g,m=isFinite(r)?1+Math.floor(u*_):Ci;m>Ci&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ci}`);const d=[];let R=0;for(let D=0;D<Ci;++D){const z=D/_,T=Math.exp(-z*z/2);d.push(T),D===0?R+=T:D<m&&(R+=2*T)}for(let D=0;D<d.length;D++)d[D]=d[D]/R;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=d,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:b}=this;f.dTheta.value=g,f.mipInt.value=b-i;const S=this._sizeLods[s],P=3*S*(s>b-fs?s-b+fs:0),N=4*(this._cubeSize-S);so(e,P,N,3*S,2*S),l.setRenderTarget(e),l.render(h,Ga)}}function cy(n){const t=[],e=[],i=[];let s=n;const r=n-fs+1+dh.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let l=1/a;o>n-fs?l=dh[o-n+fs-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),u=-c,h=1+c,f=[u,u,h,u,h,h,u,u,h,h,u,h],p=6,g=6,_=3,m=2,d=1,R=new Float32Array(_*g*p),b=new Float32Array(m*g*p),S=new Float32Array(d*g*p);for(let N=0;N<p;N++){const D=N%3*2/3-1,z=N>2?0:-1,T=[D,z,0,D+2/3,z,0,D+2/3,z+1,0,D,z,0,D+2/3,z+1,0,D,z+1,0];R.set(T,_*g*N),b.set(f,m*g*N);const M=[N,N,N,N,N,N];S.set(M,d*g*N)}const P=new gn;P.setAttribute("position",new Cn(R,_)),P.setAttribute("uv",new Cn(b,m)),P.setAttribute("faceIndex",new Cn(S,d)),t.push(P),s>fs&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function _h(n,t,e){const i=new zi(n,t,e);return i.texture.mapping=Go,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function so(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function uy(n,t,e){const i=new Float32Array(Ci),s=new B(0,1,0);return new mi({name:"SphericalGaussianBlur",defines:{n:Ci,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Gc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ui,depthTest:!1,depthWrite:!1})}function vh(){return new mi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Gc(),fragmentShader:`

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
		`,blending:ui,depthTest:!1,depthWrite:!1})}function xh(){return new mi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Gc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ui,depthTest:!1,depthWrite:!1})}function Gc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function hy(n){let t=new WeakMap,e=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===Sl||l===yl,u=l===Es||l===bs;if(c||u){let h=t.get(a);const f=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new gh(n)),h=c?e.fromEquirectangular(a,h):e.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),h.texture;if(h!==void 0)return h.texture;{const p=a.image;return c&&p&&p.height>0||u&&p&&s(p)?(e===null&&(e=new gh(n)),h=c?e.fromEquirectangular(a):e.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,t.set(a,h),a.addEventListener("dispose",r),h.texture):null}}}return a}function s(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:o}}function fy(n){const t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const s=e(i);return s===null&&xs("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function dy(n,t,e,i){const s={},r=new WeakMap;function o(h){const f=h.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);f.removeEventListener("dispose",o),delete s[f.id];const p=r.get(f);p&&(t.remove(p),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(h,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,e.memory.geometries++),f}function l(h){const f=h.attributes;for(const p in f)t.update(f[p],n.ARRAY_BUFFER)}function c(h){const f=[],p=h.index,g=h.attributes.position;let _=0;if(p!==null){const R=p.array;_=p.version;for(let b=0,S=R.length;b<S;b+=3){const P=R[b+0],N=R[b+1],D=R[b+2];f.push(P,N,N,D,D,P)}}else if(g!==void 0){const R=g.array;_=g.version;for(let b=0,S=R.length/3-1;b<S;b+=3){const P=b+0,N=b+1,D=b+2;f.push(P,N,N,D,D,P)}}else return;const m=new(_d(f)?Md:yd)(f,1);m.version=_;const d=r.get(h);d&&t.remove(d),r.set(h,m)}function u(h){const f=r.get(h);if(f){const p=h.index;p!==null&&f.version<p.version&&c(h)}else c(h);return r.get(h)}return{get:a,update:l,getWireframeAttribute:u}}function py(n,t,e){let i;function s(f){i=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function l(f,p){n.drawElements(i,p,r,f*o),e.update(p,i,1)}function c(f,p,g){g!==0&&(n.drawElementsInstanced(i,p,r,f*o,g),e.update(p,i,g))}function u(f,p,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,r,f,0,g);let m=0;for(let d=0;d<g;d++)m+=p[d];e.update(m,i,1)}function h(f,p,g,_){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<f.length;d++)c(f[d]/o,p[d],_[d]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,r,f,0,_,0,g);let d=0;for(let R=0;R<g;R++)d+=p[R]*_[R];e.update(d,i,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function my(n){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(r/3);break;case n.LINES:e.lines+=a*(r/2);break;case n.LINE_STRIP:e.lines+=a*(r-1);break;case n.LINE_LOOP:e.lines+=a*r;break;case n.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function gy(n,t,e){const i=new WeakMap,s=new ve;function r(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=u!==void 0?u.length:0;let f=i.get(a);if(f===void 0||f.count!==h){let M=function(){z.dispose(),i.delete(a),a.removeEventListener("dispose",M)};var p=M;f!==void 0&&f.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,d=a.morphAttributes.position||[],R=a.morphAttributes.normal||[],b=a.morphAttributes.color||[];let S=0;g===!0&&(S=1),_===!0&&(S=2),m===!0&&(S=3);let P=a.attributes.position.count*S,N=1;P>t.maxTextureSize&&(N=Math.ceil(P/t.maxTextureSize),P=t.maxTextureSize);const D=new Float32Array(P*N*4*h),z=new vd(D,P,N,h);z.type=qn,z.needsUpdate=!0;const T=S*4;for(let A=0;A<h;A++){const q=d[A],Y=R[A],Q=b[A],nt=P*N*4*A;for(let $=0;$<q.count;$++){const Z=$*T;g===!0&&(s.fromBufferAttribute(q,$),D[nt+Z+0]=s.x,D[nt+Z+1]=s.y,D[nt+Z+2]=s.z,D[nt+Z+3]=0),_===!0&&(s.fromBufferAttribute(Y,$),D[nt+Z+4]=s.x,D[nt+Z+5]=s.y,D[nt+Z+6]=s.z,D[nt+Z+7]=0),m===!0&&(s.fromBufferAttribute(Q,$),D[nt+Z+8]=s.x,D[nt+Z+9]=s.y,D[nt+Z+10]=s.z,D[nt+Z+11]=Q.itemSize===4?s.w:1)}}f={count:h,texture:z,size:new vt(P,N)},i.set(a,f),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,e);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const _=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(n,"morphTargetBaseInfluence",_),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",f.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:r}}function _y(n,t,e,i){let s=new WeakMap;function r(l){const c=i.render.frame,u=l.geometry,h=t.get(l,u);if(s.get(h)!==c&&(t.update(h),s.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(e.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return h}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}const zd=new qe,Sh=new wd(1,1),Hd=new vd,Vd=new o0,kd=new Td,yh=[],Mh=[],Eh=new Float32Array(16),bh=new Float32Array(9),Th=new Float32Array(4);function Ls(n,t,e){const i=n[0];if(i<=0||i>0)return n;const s=t*e;let r=yh[s];if(r===void 0&&(r=new Float32Array(s),yh[s]=r),t!==0){i.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(r,a)}return r}function Ee(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function be(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function Yo(n,t){let e=Mh[t];e===void 0&&(e=new Int32Array(t),Mh[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function vy(n,t){const e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function xy(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;n.uniform2fv(this.addr,t),be(e,t)}}function Sy(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ee(e,t))return;n.uniform3fv(this.addr,t),be(e,t)}}function yy(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;n.uniform4fv(this.addr,t),be(e,t)}}function My(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ee(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),be(e,t)}else{if(Ee(e,i))return;Th.set(i),n.uniformMatrix2fv(this.addr,!1,Th),be(e,i)}}function Ey(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ee(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),be(e,t)}else{if(Ee(e,i))return;bh.set(i),n.uniformMatrix3fv(this.addr,!1,bh),be(e,i)}}function by(n,t){const e=this.cache,i=t.elements;if(i===void 0){if(Ee(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),be(e,t)}else{if(Ee(e,i))return;Eh.set(i),n.uniformMatrix4fv(this.addr,!1,Eh),be(e,i)}}function Ty(n,t){const e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function Ay(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;n.uniform2iv(this.addr,t),be(e,t)}}function wy(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ee(e,t))return;n.uniform3iv(this.addr,t),be(e,t)}}function Ry(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;n.uniform4iv(this.addr,t),be(e,t)}}function Cy(n,t){const e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function Py(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;n.uniform2uiv(this.addr,t),be(e,t)}}function Dy(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ee(e,t))return;n.uniform3uiv(this.addr,t),be(e,t)}}function Ly(n,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;n.uniform4uiv(this.addr,t),be(e,t)}}function Uy(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Sh.compareFunction=gd,r=Sh):r=zd,e.setTexture2D(t||r,s)}function Iy(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||Vd,s)}function Ny(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||kd,s)}function Oy(n,t,e){const i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||Hd,s)}function Fy(n){switch(n){case 5126:return vy;case 35664:return xy;case 35665:return Sy;case 35666:return yy;case 35674:return My;case 35675:return Ey;case 35676:return by;case 5124:case 35670:return Ty;case 35667:case 35671:return Ay;case 35668:case 35672:return wy;case 35669:case 35673:return Ry;case 5125:return Cy;case 36294:return Py;case 36295:return Dy;case 36296:return Ly;case 35678:case 36198:case 36298:case 36306:case 35682:return Uy;case 35679:case 36299:case 36307:return Iy;case 35680:case 36300:case 36308:case 36293:return Ny;case 36289:case 36303:case 36311:case 36292:return Oy}}function By(n,t){n.uniform1fv(this.addr,t)}function zy(n,t){const e=Ls(t,this.size,2);n.uniform2fv(this.addr,e)}function Hy(n,t){const e=Ls(t,this.size,3);n.uniform3fv(this.addr,e)}function Vy(n,t){const e=Ls(t,this.size,4);n.uniform4fv(this.addr,e)}function ky(n,t){const e=Ls(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function Gy(n,t){const e=Ls(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function Wy(n,t){const e=Ls(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function Xy(n,t){n.uniform1iv(this.addr,t)}function qy(n,t){n.uniform2iv(this.addr,t)}function Yy(n,t){n.uniform3iv(this.addr,t)}function jy(n,t){n.uniform4iv(this.addr,t)}function Ky(n,t){n.uniform1uiv(this.addr,t)}function $y(n,t){n.uniform2uiv(this.addr,t)}function Zy(n,t){n.uniform3uiv(this.addr,t)}function Jy(n,t){n.uniform4uiv(this.addr,t)}function Qy(n,t,e){const i=this.cache,s=t.length,r=Yo(e,s);Ee(i,r)||(n.uniform1iv(this.addr,r),be(i,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||zd,r[o])}function tM(n,t,e){const i=this.cache,s=t.length,r=Yo(e,s);Ee(i,r)||(n.uniform1iv(this.addr,r),be(i,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Vd,r[o])}function eM(n,t,e){const i=this.cache,s=t.length,r=Yo(e,s);Ee(i,r)||(n.uniform1iv(this.addr,r),be(i,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||kd,r[o])}function nM(n,t,e){const i=this.cache,s=t.length,r=Yo(e,s);Ee(i,r)||(n.uniform1iv(this.addr,r),be(i,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Hd,r[o])}function iM(n){switch(n){case 5126:return By;case 35664:return zy;case 35665:return Hy;case 35666:return Vy;case 35674:return ky;case 35675:return Gy;case 35676:return Wy;case 5124:case 35670:return Xy;case 35667:case 35671:return qy;case 35668:case 35672:return Yy;case 35669:case 35673:return jy;case 5125:return Ky;case 36294:return $y;case 36295:return Zy;case 36296:return Jy;case 35678:case 36198:case 36298:case 36306:case 35682:return Qy;case 35679:case 36299:case 36307:return tM;case 35680:case 36300:case 36308:case 36293:return eM;case 36289:case 36303:case 36311:case 36292:return nM}}class sM{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=Fy(e.type)}}class rM{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=iM(e.type)}}class oM{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],i)}}}const ja=/(\w+)(\])?(\[|\.)?/g;function Ah(n,t){n.seq.push(t),n.map[t.id]=t}function aM(n,t,e){const i=n.name,s=i.length;for(ja.lastIndex=0;;){const r=ja.exec(i),o=ja.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Ah(e,c===void 0?new sM(a,n,t):new rM(a,n,t));break}else{let h=e.map[a];h===void 0&&(h=new oM(a),Ah(e,h)),e=h}}}class _o{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);aM(r,o,this)}}setValue(t,e,i,s){const r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){const s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){const i=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&i.push(o)}return i}}function wh(n,t,e){const i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}const lM=37297;let cM=0;function uM(n,t){const e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}const Rh=new qt;function hM(n){te._getMatrix(Rh,te.workingColorSpace,n);const t=`mat3( ${Rh.elements.map(e=>e.toFixed(4))} )`;switch(te.getTransfer(n)){case Ao:return[t,"LinearTransferOETF"];case re:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function Ch(n,t,e){const i=n.getShaderParameter(t,n.COMPILE_STATUS),r=(n.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+uM(n.getShaderSource(t),a)}else return r}function fM(n,t){const e=hM(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function dM(n,t){let e;switch(t){case x_:e="Linear";break;case S_:e="Reinhard";break;case y_:e="Cineon";break;case M_:e="ACESFilmic";break;case b_:e="AgX";break;case T_:e="Neutral";break;case E_:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const ro=new B;function pM(){te.getLuminanceCoefficients(ro);const n=ro.x.toFixed(4),t=ro.y.toFixed(4),e=ro.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function mM(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ys).join(`
`)}function gM(n){const t=[];for(const e in n){const i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function _M(n,t){const e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(t,s),o=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function Ys(n){return n!==""}function Ph(n,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Dh(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const vM=/^[ \t]*#include +<([\w\d./]+)>/gm;function ec(n){return n.replace(vM,SM)}const xM=new Map;function SM(n,t){let e=Yt[t];if(e===void 0){const i=xM.get(t);if(i!==void 0)e=Yt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return ec(e)}const yM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Lh(n){return n.replace(yM,MM)}function MM(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Uh(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function EM(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===rd?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===Jg?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Vn&&(t="SHADOWMAP_TYPE_VSM"),t}function bM(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Es:case bs:t="ENVMAP_TYPE_CUBE";break;case Go:t="ENVMAP_TYPE_CUBE_UV";break}return t}function TM(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case bs:t="ENVMAP_MODE_REFRACTION";break}return t}function AM(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case Cc:t="ENVMAP_BLENDING_MULTIPLY";break;case __:t="ENVMAP_BLENDING_MIX";break;case v_:t="ENVMAP_BLENDING_ADD";break}return t}function wM(n){const t=n.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function RM(n,t,e,i){const s=n.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=EM(e),c=bM(e),u=TM(e),h=AM(e),f=wM(e),p=mM(e),g=gM(r),_=s.createProgram();let m,d,R=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ys).join(`
`),m.length>0&&(m+=`
`),d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Ys).join(`
`),d.length>0&&(d+=`
`)):(m=[Uh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reversedDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ys).join(`
`),d=[Uh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+u:"",e.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reversedDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==hi?"#define TONE_MAPPING":"",e.toneMapping!==hi?Yt.tonemapping_pars_fragment:"",e.toneMapping!==hi?dM("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Yt.colorspace_pars_fragment,fM("linearToOutputTexel",e.outputColorSpace),pM(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ys).join(`
`)),o=ec(o),o=Ph(o,e),o=Dh(o,e),a=ec(a),a=Ph(a,e),a=Dh(a,e),o=Lh(o),a=Lh(a),e.isRawShaderMaterial!==!0&&(R=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",e.glslVersion===Uu?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Uu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const b=R+m+o,S=R+d+a,P=wh(s,s.VERTEX_SHADER,b),N=wh(s,s.FRAGMENT_SHADER,S);s.attachShader(_,P),s.attachShader(_,N),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function D(A){if(n.debug.checkShaderErrors){const q=s.getProgramInfoLog(_)||"",Y=s.getShaderInfoLog(P)||"",Q=s.getShaderInfoLog(N)||"",nt=q.trim(),$=Y.trim(),Z=Q.trim();let H=!0,ot=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(H=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,_,P,N);else{const lt=Ch(s,P,"vertex"),pt=Ch(s,N,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+nt+`
`+lt+`
`+pt)}else nt!==""?console.warn("THREE.WebGLProgram: Program Info Log:",nt):($===""||Z==="")&&(ot=!1);ot&&(A.diagnostics={runnable:H,programLog:nt,vertexShader:{log:$,prefix:m},fragmentShader:{log:Z,prefix:d}})}s.deleteShader(P),s.deleteShader(N),z=new _o(s,_),T=_M(s,_)}let z;this.getUniforms=function(){return z===void 0&&D(this),z};let T;this.getAttributes=function(){return T===void 0&&D(this),T};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(_,lM)),M},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=cM++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=P,this.fragmentShader=N,this}let CM=0;class PM{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new DM(t),e.set(t,i)),i}}class DM{constructor(t){this.id=CM++,this.code=t,this.usedTimes=0}}function LM(n,t,e,i,s,r,o){const a=new Bc,l=new PM,c=new Set,u=[],h=s.logarithmicDepthBuffer,f=s.vertexTextures;let p=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(T){return c.add(T),T===0?"uv":`uv${T}`}function m(T,M,A,q,Y){const Q=q.fog,nt=Y.geometry,$=T.isMeshStandardMaterial?q.environment:null,Z=(T.isMeshStandardMaterial?e:t).get(T.envMap||$),H=Z&&Z.mapping===Go?Z.image.height:null,ot=g[T.type];T.precision!==null&&(p=s.getMaxPrecision(T.precision),p!==T.precision&&console.warn("THREE.WebGLProgram.getParameters:",T.precision,"not supported, using",p,"instead."));const lt=nt.morphAttributes.position||nt.morphAttributes.normal||nt.morphAttributes.color,pt=lt!==void 0?lt.length:0;let Rt=0;nt.morphAttributes.position!==void 0&&(Rt=1),nt.morphAttributes.normal!==void 0&&(Rt=2),nt.morphAttributes.color!==void 0&&(Rt=3);let Ft,Vt,it,ut;if(ot){const ee=En[ot];Ft=ee.vertexShader,Vt=ee.fragmentShader}else Ft=T.vertexShader,Vt=T.fragmentShader,l.update(T),it=l.getVertexShaderID(T),ut=l.getFragmentShaderID(T);const ft=n.getRenderTarget(),Ct=n.state.buffers.depth.getReversed(),Pt=Y.isInstancedMesh===!0,Ot=Y.isBatchedMesh===!0,le=!!T.map,w=!!T.matcap,x=!!Z,C=!!T.aoMap,L=!!T.lightMap,O=!!T.bumpMap,I=!!T.normalMap,K=!!T.displacementMap,k=!!T.emissiveMap,X=!!T.metalnessMap,st=!!T.roughnessMap,dt=T.anisotropy>0,y=T.clearcoat>0,v=T.dispersion>0,U=T.iridescence>0,W=T.sheen>0,rt=T.transmission>0,j=dt&&!!T.anisotropyMap,Mt=y&&!!T.clearcoatMap,ct=y&&!!T.clearcoatNormalMap,Tt=y&&!!T.clearcoatRoughnessMap,At=U&&!!T.iridescenceMap,ht=U&&!!T.iridescenceThicknessMap,Et=W&&!!T.sheenColorMap,Ut=W&&!!T.sheenRoughnessMap,wt=!!T.specularMap,St=!!T.specularColorMap,Gt=!!T.specularIntensityMap,F=rt&&!!T.transmissionMap,_t=rt&&!!T.thicknessMap,xt=!!T.gradientMap,Lt=!!T.alphaMap,mt=T.alphaTest>0,at=!!T.alphaHash,Nt=!!T.extensions;let Wt=hi;T.toneMapped&&(ft===null||ft.isXRRenderTarget===!0)&&(Wt=n.toneMapping);const ce={shaderID:ot,shaderType:T.type,shaderName:T.name,vertexShader:Ft,fragmentShader:Vt,defines:T.defines,customVertexShaderID:it,customFragmentShaderID:ut,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:p,batching:Ot,batchingColor:Ot&&Y._colorsTexture!==null,instancing:Pt,instancingColor:Pt&&Y.instanceColor!==null,instancingMorph:Pt&&Y.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ft===null?n.outputColorSpace:ft.isXRRenderTarget===!0?ft.texture.colorSpace:Ts,alphaToCoverage:!!T.alphaToCoverage,map:le,matcap:w,envMap:x,envMapMode:x&&Z.mapping,envMapCubeUVHeight:H,aoMap:C,lightMap:L,bumpMap:O,normalMap:I,displacementMap:f&&K,emissiveMap:k,normalMapObjectSpace:I&&T.normalMapType===C_,normalMapTangentSpace:I&&T.normalMapType===md,metalnessMap:X,roughnessMap:st,anisotropy:dt,anisotropyMap:j,clearcoat:y,clearcoatMap:Mt,clearcoatNormalMap:ct,clearcoatRoughnessMap:Tt,dispersion:v,iridescence:U,iridescenceMap:At,iridescenceThicknessMap:ht,sheen:W,sheenColorMap:Et,sheenRoughnessMap:Ut,specularMap:wt,specularColorMap:St,specularIntensityMap:Gt,transmission:rt,transmissionMap:F,thicknessMap:_t,gradientMap:xt,opaque:T.transparent===!1&&T.blending===vs&&T.alphaToCoverage===!1,alphaMap:Lt,alphaTest:mt,alphaHash:at,combine:T.combine,mapUv:le&&_(T.map.channel),aoMapUv:C&&_(T.aoMap.channel),lightMapUv:L&&_(T.lightMap.channel),bumpMapUv:O&&_(T.bumpMap.channel),normalMapUv:I&&_(T.normalMap.channel),displacementMapUv:K&&_(T.displacementMap.channel),emissiveMapUv:k&&_(T.emissiveMap.channel),metalnessMapUv:X&&_(T.metalnessMap.channel),roughnessMapUv:st&&_(T.roughnessMap.channel),anisotropyMapUv:j&&_(T.anisotropyMap.channel),clearcoatMapUv:Mt&&_(T.clearcoatMap.channel),clearcoatNormalMapUv:ct&&_(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Tt&&_(T.clearcoatRoughnessMap.channel),iridescenceMapUv:At&&_(T.iridescenceMap.channel),iridescenceThicknessMapUv:ht&&_(T.iridescenceThicknessMap.channel),sheenColorMapUv:Et&&_(T.sheenColorMap.channel),sheenRoughnessMapUv:Ut&&_(T.sheenRoughnessMap.channel),specularMapUv:wt&&_(T.specularMap.channel),specularColorMapUv:St&&_(T.specularColorMap.channel),specularIntensityMapUv:Gt&&_(T.specularIntensityMap.channel),transmissionMapUv:F&&_(T.transmissionMap.channel),thicknessMapUv:_t&&_(T.thicknessMap.channel),alphaMapUv:Lt&&_(T.alphaMap.channel),vertexTangents:!!nt.attributes.tangent&&(I||dt),vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!nt.attributes.color&&nt.attributes.color.itemSize===4,pointsUvs:Y.isPoints===!0&&!!nt.attributes.uv&&(le||Lt),fog:!!Q,useFog:T.fog===!0,fogExp2:!!Q&&Q.isFogExp2,flatShading:T.flatShading===!0&&T.wireframe===!1,sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:Ct,skinning:Y.isSkinnedMesh===!0,morphTargets:nt.morphAttributes.position!==void 0,morphNormals:nt.morphAttributes.normal!==void 0,morphColors:nt.morphAttributes.color!==void 0,morphTargetsCount:pt,morphTextureStride:Rt,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:T.dithering,shadowMapEnabled:n.shadowMap.enabled&&A.length>0,shadowMapType:n.shadowMap.type,toneMapping:Wt,decodeVideoTexture:le&&T.map.isVideoTexture===!0&&te.getTransfer(T.map.colorSpace)===re,decodeVideoTextureEmissive:k&&T.emissiveMap.isVideoTexture===!0&&te.getTransfer(T.emissiveMap.colorSpace)===re,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===Xn,flipSided:T.side===Xe,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionClipCullDistance:Nt&&T.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Nt&&T.extensions.multiDraw===!0||Ot)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()};return ce.vertexUv1s=c.has(1),ce.vertexUv2s=c.has(2),ce.vertexUv3s=c.has(3),c.clear(),ce}function d(T){const M=[];if(T.shaderID?M.push(T.shaderID):(M.push(T.customVertexShaderID),M.push(T.customFragmentShaderID)),T.defines!==void 0)for(const A in T.defines)M.push(A),M.push(T.defines[A]);return T.isRawShaderMaterial===!1&&(R(M,T),b(M,T),M.push(n.outputColorSpace)),M.push(T.customProgramCacheKey),M.join()}function R(T,M){T.push(M.precision),T.push(M.outputColorSpace),T.push(M.envMapMode),T.push(M.envMapCubeUVHeight),T.push(M.mapUv),T.push(M.alphaMapUv),T.push(M.lightMapUv),T.push(M.aoMapUv),T.push(M.bumpMapUv),T.push(M.normalMapUv),T.push(M.displacementMapUv),T.push(M.emissiveMapUv),T.push(M.metalnessMapUv),T.push(M.roughnessMapUv),T.push(M.anisotropyMapUv),T.push(M.clearcoatMapUv),T.push(M.clearcoatNormalMapUv),T.push(M.clearcoatRoughnessMapUv),T.push(M.iridescenceMapUv),T.push(M.iridescenceThicknessMapUv),T.push(M.sheenColorMapUv),T.push(M.sheenRoughnessMapUv),T.push(M.specularMapUv),T.push(M.specularColorMapUv),T.push(M.specularIntensityMapUv),T.push(M.transmissionMapUv),T.push(M.thicknessMapUv),T.push(M.combine),T.push(M.fogExp2),T.push(M.sizeAttenuation),T.push(M.morphTargetsCount),T.push(M.morphAttributeCount),T.push(M.numDirLights),T.push(M.numPointLights),T.push(M.numSpotLights),T.push(M.numSpotLightMaps),T.push(M.numHemiLights),T.push(M.numRectAreaLights),T.push(M.numDirLightShadows),T.push(M.numPointLightShadows),T.push(M.numSpotLightShadows),T.push(M.numSpotLightShadowsWithMaps),T.push(M.numLightProbes),T.push(M.shadowMapType),T.push(M.toneMapping),T.push(M.numClippingPlanes),T.push(M.numClipIntersection),T.push(M.depthPacking)}function b(T,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),M.gradientMap&&a.enable(22),T.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reversedDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),T.push(a.mask)}function S(T){const M=g[T.type];let A;if(M){const q=En[M];A=x0.clone(q.uniforms)}else A=T.uniforms;return A}function P(T,M){let A;for(let q=0,Y=u.length;q<Y;q++){const Q=u[q];if(Q.cacheKey===M){A=Q,++A.usedTimes;break}}return A===void 0&&(A=new RM(n,M,T,r),u.push(A)),A}function N(T){if(--T.usedTimes===0){const M=u.indexOf(T);u[M]=u[u.length-1],u.pop(),T.destroy()}}function D(T){l.remove(T)}function z(){l.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:S,acquireProgram:P,releaseProgram:N,releaseShaderCache:D,programs:u,dispose:z}}function UM(){let n=new WeakMap;function t(o){return n.has(o)}function e(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,l){n.get(o)[a]=l}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function IM(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function Ih(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Nh(){const n=[];let t=0;const e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function o(h,f,p,g,_,m){let d=n[t];return d===void 0?(d={id:h.id,object:h,geometry:f,material:p,groupOrder:g,renderOrder:h.renderOrder,z:_,group:m},n[t]=d):(d.id=h.id,d.object=h,d.geometry=f,d.material=p,d.groupOrder=g,d.renderOrder=h.renderOrder,d.z=_,d.group=m),t++,d}function a(h,f,p,g,_,m){const d=o(h,f,p,g,_,m);p.transmission>0?i.push(d):p.transparent===!0?s.push(d):e.push(d)}function l(h,f,p,g,_,m){const d=o(h,f,p,g,_,m);p.transmission>0?i.unshift(d):p.transparent===!0?s.unshift(d):e.unshift(d)}function c(h,f){e.length>1&&e.sort(h||IM),i.length>1&&i.sort(f||Ih),s.length>1&&s.sort(f||Ih)}function u(){for(let h=t,f=n.length;h<f;h++){const p=n[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:a,unshift:l,finish:u,sort:c}}function NM(){let n=new WeakMap;function t(i,s){const r=n.get(i);let o;return r===void 0?(o=new Nh,n.set(i,[o])):s>=r.length?(o=new Nh,r.push(o)):o=r[s],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function OM(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new B,color:new Zt};break;case"SpotLight":e={position:new B,direction:new B,color:new Zt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new B,color:new Zt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new B,skyColor:new Zt,groundColor:new Zt};break;case"RectAreaLight":e={color:new Zt,position:new B,halfWidth:new B,halfHeight:new B};break}return n[t.id]=e,e}}}function FM(){const n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new vt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new vt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new vt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}let BM=0;function zM(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function HM(n){const t=new OM,e=FM(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new B);const s=new B,r=new fe,o=new fe;function a(c){let u=0,h=0,f=0;for(let T=0;T<9;T++)i.probe[T].set(0,0,0);let p=0,g=0,_=0,m=0,d=0,R=0,b=0,S=0,P=0,N=0,D=0;c.sort(zM);for(let T=0,M=c.length;T<M;T++){const A=c[T],q=A.color,Y=A.intensity,Q=A.distance,nt=A.shadow&&A.shadow.map?A.shadow.map.texture:null;if(A.isAmbientLight)u+=q.r*Y,h+=q.g*Y,f+=q.b*Y;else if(A.isLightProbe){for(let $=0;$<9;$++)i.probe[$].addScaledVector(A.sh.coefficients[$],Y);D++}else if(A.isDirectionalLight){const $=t.get(A);if($.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){const Z=A.shadow,H=e.get(A);H.shadowIntensity=Z.intensity,H.shadowBias=Z.bias,H.shadowNormalBias=Z.normalBias,H.shadowRadius=Z.radius,H.shadowMapSize=Z.mapSize,i.directionalShadow[p]=H,i.directionalShadowMap[p]=nt,i.directionalShadowMatrix[p]=A.shadow.matrix,R++}i.directional[p]=$,p++}else if(A.isSpotLight){const $=t.get(A);$.position.setFromMatrixPosition(A.matrixWorld),$.color.copy(q).multiplyScalar(Y),$.distance=Q,$.coneCos=Math.cos(A.angle),$.penumbraCos=Math.cos(A.angle*(1-A.penumbra)),$.decay=A.decay,i.spot[_]=$;const Z=A.shadow;if(A.map&&(i.spotLightMap[P]=A.map,P++,Z.updateMatrices(A),A.castShadow&&N++),i.spotLightMatrix[_]=Z.matrix,A.castShadow){const H=e.get(A);H.shadowIntensity=Z.intensity,H.shadowBias=Z.bias,H.shadowNormalBias=Z.normalBias,H.shadowRadius=Z.radius,H.shadowMapSize=Z.mapSize,i.spotShadow[_]=H,i.spotShadowMap[_]=nt,S++}_++}else if(A.isRectAreaLight){const $=t.get(A);$.color.copy(q).multiplyScalar(Y),$.halfWidth.set(A.width*.5,0,0),$.halfHeight.set(0,A.height*.5,0),i.rectArea[m]=$,m++}else if(A.isPointLight){const $=t.get(A);if($.color.copy(A.color).multiplyScalar(A.intensity),$.distance=A.distance,$.decay=A.decay,A.castShadow){const Z=A.shadow,H=e.get(A);H.shadowIntensity=Z.intensity,H.shadowBias=Z.bias,H.shadowNormalBias=Z.normalBias,H.shadowRadius=Z.radius,H.shadowMapSize=Z.mapSize,H.shadowCameraNear=Z.camera.near,H.shadowCameraFar=Z.camera.far,i.pointShadow[g]=H,i.pointShadowMap[g]=nt,i.pointShadowMatrix[g]=A.shadow.matrix,b++}i.point[g]=$,g++}else if(A.isHemisphereLight){const $=t.get(A);$.skyColor.copy(A.color).multiplyScalar(Y),$.groundColor.copy(A.groundColor).multiplyScalar(Y),i.hemi[d]=$,d++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=yt.LTC_FLOAT_1,i.rectAreaLTC2=yt.LTC_FLOAT_2):(i.rectAreaLTC1=yt.LTC_HALF_1,i.rectAreaLTC2=yt.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=h,i.ambient[2]=f;const z=i.hash;(z.directionalLength!==p||z.pointLength!==g||z.spotLength!==_||z.rectAreaLength!==m||z.hemiLength!==d||z.numDirectionalShadows!==R||z.numPointShadows!==b||z.numSpotShadows!==S||z.numSpotMaps!==P||z.numLightProbes!==D)&&(i.directional.length=p,i.spot.length=_,i.rectArea.length=m,i.point.length=g,i.hemi.length=d,i.directionalShadow.length=R,i.directionalShadowMap.length=R,i.pointShadow.length=b,i.pointShadowMap.length=b,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=R,i.pointShadowMatrix.length=b,i.spotLightMatrix.length=S+P-N,i.spotLightMap.length=P,i.numSpotLightShadowsWithMaps=N,i.numLightProbes=D,z.directionalLength=p,z.pointLength=g,z.spotLength=_,z.rectAreaLength=m,z.hemiLength=d,z.numDirectionalShadows=R,z.numPointShadows=b,z.numSpotShadows=S,z.numSpotMaps=P,z.numLightProbes=D,i.version=BM++)}function l(c,u){let h=0,f=0,p=0,g=0,_=0;const m=u.matrixWorldInverse;for(let d=0,R=c.length;d<R;d++){const b=c[d];if(b.isDirectionalLight){const S=i.directional[h];S.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(m),h++}else if(b.isSpotLight){const S=i.spot[p];S.position.setFromMatrixPosition(b.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(m),p++}else if(b.isRectAreaLight){const S=i.rectArea[g];S.position.setFromMatrixPosition(b.matrixWorld),S.position.applyMatrix4(m),o.identity(),r.copy(b.matrixWorld),r.premultiply(m),o.extractRotation(r),S.halfWidth.set(b.width*.5,0,0),S.halfHeight.set(0,b.height*.5,0),S.halfWidth.applyMatrix4(o),S.halfHeight.applyMatrix4(o),g++}else if(b.isPointLight){const S=i.point[f];S.position.setFromMatrixPosition(b.matrixWorld),S.position.applyMatrix4(m),f++}else if(b.isHemisphereLight){const S=i.hemi[_];S.direction.setFromMatrixPosition(b.matrixWorld),S.direction.transformDirection(m),_++}}}return{setup:a,setupView:l,state:i}}function Oh(n){const t=new HM(n),e=[],i=[];function s(u){c.camera=u,e.length=0,i.length=0}function r(u){e.push(u)}function o(u){i.push(u)}function a(){t.setup(e)}function l(u){t.setupView(e,u)}const c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function VM(n){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new Oh(n),t.set(s,[a])):r>=o.length?(a=new Oh(n),o.push(a)):a=o[r],a}function i(){t=new WeakMap}return{get:e,dispose:i}}const kM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,GM=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function WM(n,t,e){let i=new zc;const s=new vt,r=new vt,o=new ve,a=new cv({depthPacking:R_}),l=new uv,c={},u=e.maxTextureSize,h={[pi]:Xe,[Xe]:pi,[Xn]:Xn},f=new mi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new vt},radius:{value:4}},vertexShader:kM,fragmentShader:GM}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const g=new gn;g.setAttribute("position",new Cn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new an(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=rd;let d=this.type;this.render=function(N,D,z){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||N.length===0)return;const T=n.getRenderTarget(),M=n.getActiveCubeFace(),A=n.getActiveMipmapLevel(),q=n.state;q.setBlending(ui),q.buffers.depth.getReversed()?q.buffers.color.setClear(0,0,0,0):q.buffers.color.setClear(1,1,1,1),q.buffers.depth.setTest(!0),q.setScissorTest(!1);const Y=d!==Vn&&this.type===Vn,Q=d===Vn&&this.type!==Vn;for(let nt=0,$=N.length;nt<$;nt++){const Z=N[nt],H=Z.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",Z,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;s.copy(H.mapSize);const ot=H.getFrameExtents();if(s.multiply(ot),r.copy(H.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/ot.x),s.x=r.x*ot.x,H.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/ot.y),s.y=r.y*ot.y,H.mapSize.y=r.y)),H.map===null||Y===!0||Q===!0){const pt=this.type!==Vn?{minFilter:mn,magFilter:mn}:{};H.map!==null&&H.map.dispose(),H.map=new zi(s.x,s.y,pt),H.map.texture.name=Z.name+".shadowMap",H.camera.updateProjectionMatrix()}n.setRenderTarget(H.map),n.clear();const lt=H.getViewportCount();for(let pt=0;pt<lt;pt++){const Rt=H.getViewport(pt);o.set(r.x*Rt.x,r.y*Rt.y,r.x*Rt.z,r.y*Rt.w),q.viewport(o),H.updateMatrices(Z,pt),i=H.getFrustum(),S(D,z,H.camera,Z,this.type)}H.isPointLightShadow!==!0&&this.type===Vn&&R(H,z),H.needsUpdate=!1}d=this.type,m.needsUpdate=!1,n.setRenderTarget(T,M,A)};function R(N,D){const z=t.update(_);f.defines.VSM_SAMPLES!==N.blurSamples&&(f.defines.VSM_SAMPLES=N.blurSamples,p.defines.VSM_SAMPLES=N.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),N.mapPass===null&&(N.mapPass=new zi(s.x,s.y)),f.uniforms.shadow_pass.value=N.map.texture,f.uniforms.resolution.value=N.mapSize,f.uniforms.radius.value=N.radius,n.setRenderTarget(N.mapPass),n.clear(),n.renderBufferDirect(D,null,z,f,_,null),p.uniforms.shadow_pass.value=N.mapPass.texture,p.uniforms.resolution.value=N.mapSize,p.uniforms.radius.value=N.radius,n.setRenderTarget(N.map),n.clear(),n.renderBufferDirect(D,null,z,p,_,null)}function b(N,D,z,T){let M=null;const A=z.isPointLight===!0?N.customDistanceMaterial:N.customDepthMaterial;if(A!==void 0)M=A;else if(M=z.isPointLight===!0?l:a,n.localClippingEnabled&&D.clipShadows===!0&&Array.isArray(D.clippingPlanes)&&D.clippingPlanes.length!==0||D.displacementMap&&D.displacementScale!==0||D.alphaMap&&D.alphaTest>0||D.map&&D.alphaTest>0||D.alphaToCoverage===!0){const q=M.uuid,Y=D.uuid;let Q=c[q];Q===void 0&&(Q={},c[q]=Q);let nt=Q[Y];nt===void 0&&(nt=M.clone(),Q[Y]=nt,D.addEventListener("dispose",P)),M=nt}if(M.visible=D.visible,M.wireframe=D.wireframe,T===Vn?M.side=D.shadowSide!==null?D.shadowSide:D.side:M.side=D.shadowSide!==null?D.shadowSide:h[D.side],M.alphaMap=D.alphaMap,M.alphaTest=D.alphaToCoverage===!0?.5:D.alphaTest,M.map=D.map,M.clipShadows=D.clipShadows,M.clippingPlanes=D.clippingPlanes,M.clipIntersection=D.clipIntersection,M.displacementMap=D.displacementMap,M.displacementScale=D.displacementScale,M.displacementBias=D.displacementBias,M.wireframeLinewidth=D.wireframeLinewidth,M.linewidth=D.linewidth,z.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const q=n.properties.get(M);q.light=z}return M}function S(N,D,z,T,M){if(N.visible===!1)return;if(N.layers.test(D.layers)&&(N.isMesh||N.isLine||N.isPoints)&&(N.castShadow||N.receiveShadow&&M===Vn)&&(!N.frustumCulled||i.intersectsObject(N))){N.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,N.matrixWorld);const Y=t.update(N),Q=N.material;if(Array.isArray(Q)){const nt=Y.groups;for(let $=0,Z=nt.length;$<Z;$++){const H=nt[$],ot=Q[H.materialIndex];if(ot&&ot.visible){const lt=b(N,ot,T,M);N.onBeforeShadow(n,N,D,z,Y,lt,H),n.renderBufferDirect(z,null,Y,lt,N,H),N.onAfterShadow(n,N,D,z,Y,lt,H)}}}else if(Q.visible){const nt=b(N,Q,T,M);N.onBeforeShadow(n,N,D,z,Y,nt,null),n.renderBufferDirect(z,null,Y,nt,N,null),N.onAfterShadow(n,N,D,z,Y,nt,null)}}const q=N.children;for(let Y=0,Q=q.length;Y<Q;Y++)S(q[Y],D,z,T,M)}function P(N){N.target.removeEventListener("dispose",P);for(const z in c){const T=c[z],M=N.target.uuid;M in T&&(T[M].dispose(),delete T[M])}}}const XM={[dl]:pl,[ml]:vl,[gl]:xl,[Ms]:_l,[pl]:dl,[vl]:ml,[xl]:gl,[_l]:Ms};function qM(n,t){function e(){let F=!1;const _t=new ve;let xt=null;const Lt=new ve(0,0,0,0);return{setMask:function(mt){xt!==mt&&!F&&(n.colorMask(mt,mt,mt,mt),xt=mt)},setLocked:function(mt){F=mt},setClear:function(mt,at,Nt,Wt,ce){ce===!0&&(mt*=Wt,at*=Wt,Nt*=Wt),_t.set(mt,at,Nt,Wt),Lt.equals(_t)===!1&&(n.clearColor(mt,at,Nt,Wt),Lt.copy(_t))},reset:function(){F=!1,xt=null,Lt.set(-1,0,0,0)}}}function i(){let F=!1,_t=!1,xt=null,Lt=null,mt=null;return{setReversed:function(at){if(_t!==at){const Nt=t.get("EXT_clip_control");at?Nt.clipControlEXT(Nt.LOWER_LEFT_EXT,Nt.ZERO_TO_ONE_EXT):Nt.clipControlEXT(Nt.LOWER_LEFT_EXT,Nt.NEGATIVE_ONE_TO_ONE_EXT),_t=at;const Wt=mt;mt=null,this.setClear(Wt)}},getReversed:function(){return _t},setTest:function(at){at?ft(n.DEPTH_TEST):Ct(n.DEPTH_TEST)},setMask:function(at){xt!==at&&!F&&(n.depthMask(at),xt=at)},setFunc:function(at){if(_t&&(at=XM[at]),Lt!==at){switch(at){case dl:n.depthFunc(n.NEVER);break;case pl:n.depthFunc(n.ALWAYS);break;case ml:n.depthFunc(n.LESS);break;case Ms:n.depthFunc(n.LEQUAL);break;case gl:n.depthFunc(n.EQUAL);break;case _l:n.depthFunc(n.GEQUAL);break;case vl:n.depthFunc(n.GREATER);break;case xl:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Lt=at}},setLocked:function(at){F=at},setClear:function(at){mt!==at&&(_t&&(at=1-at),n.clearDepth(at),mt=at)},reset:function(){F=!1,xt=null,Lt=null,mt=null,_t=!1}}}function s(){let F=!1,_t=null,xt=null,Lt=null,mt=null,at=null,Nt=null,Wt=null,ce=null;return{setTest:function(ee){F||(ee?ft(n.STENCIL_TEST):Ct(n.STENCIL_TEST))},setMask:function(ee){_t!==ee&&!F&&(n.stencilMask(ee),_t=ee)},setFunc:function(ee,In,vn){(xt!==ee||Lt!==In||mt!==vn)&&(n.stencilFunc(ee,In,vn),xt=ee,Lt=In,mt=vn)},setOp:function(ee,In,vn){(at!==ee||Nt!==In||Wt!==vn)&&(n.stencilOp(ee,In,vn),at=ee,Nt=In,Wt=vn)},setLocked:function(ee){F=ee},setClear:function(ee){ce!==ee&&(n.clearStencil(ee),ce=ee)},reset:function(){F=!1,_t=null,xt=null,Lt=null,mt=null,at=null,Nt=null,Wt=null,ce=null}}}const r=new e,o=new i,a=new s,l=new WeakMap,c=new WeakMap;let u={},h={},f=new WeakMap,p=[],g=null,_=!1,m=null,d=null,R=null,b=null,S=null,P=null,N=null,D=new Zt(0,0,0),z=0,T=!1,M=null,A=null,q=null,Y=null,Q=null;const nt=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let $=!1,Z=0;const H=n.getParameter(n.VERSION);H.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(H)[1]),$=Z>=1):H.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),$=Z>=2);let ot=null,lt={};const pt=n.getParameter(n.SCISSOR_BOX),Rt=n.getParameter(n.VIEWPORT),Ft=new ve().fromArray(pt),Vt=new ve().fromArray(Rt);function it(F,_t,xt,Lt){const mt=new Uint8Array(4),at=n.createTexture();n.bindTexture(F,at),n.texParameteri(F,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(F,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Nt=0;Nt<xt;Nt++)F===n.TEXTURE_3D||F===n.TEXTURE_2D_ARRAY?n.texImage3D(_t,0,n.RGBA,1,1,Lt,0,n.RGBA,n.UNSIGNED_BYTE,mt):n.texImage2D(_t+Nt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,mt);return at}const ut={};ut[n.TEXTURE_2D]=it(n.TEXTURE_2D,n.TEXTURE_2D,1),ut[n.TEXTURE_CUBE_MAP]=it(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),ut[n.TEXTURE_2D_ARRAY]=it(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ut[n.TEXTURE_3D]=it(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ft(n.DEPTH_TEST),o.setFunc(Ms),O(!1),I(wu),ft(n.CULL_FACE),C(ui);function ft(F){u[F]!==!0&&(n.enable(F),u[F]=!0)}function Ct(F){u[F]!==!1&&(n.disable(F),u[F]=!1)}function Pt(F,_t){return h[F]!==_t?(n.bindFramebuffer(F,_t),h[F]=_t,F===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=_t),F===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=_t),!0):!1}function Ot(F,_t){let xt=p,Lt=!1;if(F){xt=f.get(_t),xt===void 0&&(xt=[],f.set(_t,xt));const mt=F.textures;if(xt.length!==mt.length||xt[0]!==n.COLOR_ATTACHMENT0){for(let at=0,Nt=mt.length;at<Nt;at++)xt[at]=n.COLOR_ATTACHMENT0+at;xt.length=mt.length,Lt=!0}}else xt[0]!==n.BACK&&(xt[0]=n.BACK,Lt=!0);Lt&&n.drawBuffers(xt)}function le(F){return g!==F?(n.useProgram(F),g=F,!0):!1}const w={[Ri]:n.FUNC_ADD,[t_]:n.FUNC_SUBTRACT,[e_]:n.FUNC_REVERSE_SUBTRACT};w[n_]=n.MIN,w[i_]=n.MAX;const x={[s_]:n.ZERO,[r_]:n.ONE,[o_]:n.SRC_COLOR,[hl]:n.SRC_ALPHA,[f_]:n.SRC_ALPHA_SATURATE,[u_]:n.DST_COLOR,[l_]:n.DST_ALPHA,[a_]:n.ONE_MINUS_SRC_COLOR,[fl]:n.ONE_MINUS_SRC_ALPHA,[h_]:n.ONE_MINUS_DST_COLOR,[c_]:n.ONE_MINUS_DST_ALPHA,[d_]:n.CONSTANT_COLOR,[p_]:n.ONE_MINUS_CONSTANT_COLOR,[m_]:n.CONSTANT_ALPHA,[g_]:n.ONE_MINUS_CONSTANT_ALPHA};function C(F,_t,xt,Lt,mt,at,Nt,Wt,ce,ee){if(F===ui){_===!0&&(Ct(n.BLEND),_=!1);return}if(_===!1&&(ft(n.BLEND),_=!0),F!==Qg){if(F!==m||ee!==T){if((d!==Ri||S!==Ri)&&(n.blendEquation(n.FUNC_ADD),d=Ri,S=Ri),ee)switch(F){case vs:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ru:n.blendFunc(n.ONE,n.ONE);break;case Cu:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Pu:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}else switch(F){case vs:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ru:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Cu:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Pu:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",F);break}R=null,b=null,P=null,N=null,D.set(0,0,0),z=0,m=F,T=ee}return}mt=mt||_t,at=at||xt,Nt=Nt||Lt,(_t!==d||mt!==S)&&(n.blendEquationSeparate(w[_t],w[mt]),d=_t,S=mt),(xt!==R||Lt!==b||at!==P||Nt!==N)&&(n.blendFuncSeparate(x[xt],x[Lt],x[at],x[Nt]),R=xt,b=Lt,P=at,N=Nt),(Wt.equals(D)===!1||ce!==z)&&(n.blendColor(Wt.r,Wt.g,Wt.b,ce),D.copy(Wt),z=ce),m=F,T=!1}function L(F,_t){F.side===Xn?Ct(n.CULL_FACE):ft(n.CULL_FACE);let xt=F.side===Xe;_t&&(xt=!xt),O(xt),F.blending===vs&&F.transparent===!1?C(ui):C(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),o.setFunc(F.depthFunc),o.setTest(F.depthTest),o.setMask(F.depthWrite),r.setMask(F.colorWrite);const Lt=F.stencilWrite;a.setTest(Lt),Lt&&(a.setMask(F.stencilWriteMask),a.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),a.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),k(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?ft(n.SAMPLE_ALPHA_TO_COVERAGE):Ct(n.SAMPLE_ALPHA_TO_COVERAGE)}function O(F){M!==F&&(F?n.frontFace(n.CW):n.frontFace(n.CCW),M=F)}function I(F){F!==$g?(ft(n.CULL_FACE),F!==A&&(F===wu?n.cullFace(n.BACK):F===Zg?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Ct(n.CULL_FACE),A=F}function K(F){F!==q&&($&&n.lineWidth(F),q=F)}function k(F,_t,xt){F?(ft(n.POLYGON_OFFSET_FILL),(Y!==_t||Q!==xt)&&(n.polygonOffset(_t,xt),Y=_t,Q=xt)):Ct(n.POLYGON_OFFSET_FILL)}function X(F){F?ft(n.SCISSOR_TEST):Ct(n.SCISSOR_TEST)}function st(F){F===void 0&&(F=n.TEXTURE0+nt-1),ot!==F&&(n.activeTexture(F),ot=F)}function dt(F,_t,xt){xt===void 0&&(ot===null?xt=n.TEXTURE0+nt-1:xt=ot);let Lt=lt[xt];Lt===void 0&&(Lt={type:void 0,texture:void 0},lt[xt]=Lt),(Lt.type!==F||Lt.texture!==_t)&&(ot!==xt&&(n.activeTexture(xt),ot=xt),n.bindTexture(F,_t||ut[F]),Lt.type=F,Lt.texture=_t)}function y(){const F=lt[ot];F!==void 0&&F.type!==void 0&&(n.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function v(){try{n.compressedTexImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function U(){try{n.compressedTexImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function W(){try{n.texSubImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function rt(){try{n.texSubImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function j(){try{n.compressedTexSubImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Mt(){try{n.compressedTexSubImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ct(){try{n.texStorage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Tt(){try{n.texStorage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function At(){try{n.texImage2D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function ht(){try{n.texImage3D(...arguments)}catch(F){console.error("THREE.WebGLState:",F)}}function Et(F){Ft.equals(F)===!1&&(n.scissor(F.x,F.y,F.z,F.w),Ft.copy(F))}function Ut(F){Vt.equals(F)===!1&&(n.viewport(F.x,F.y,F.z,F.w),Vt.copy(F))}function wt(F,_t){let xt=c.get(_t);xt===void 0&&(xt=new WeakMap,c.set(_t,xt));let Lt=xt.get(F);Lt===void 0&&(Lt=n.getUniformBlockIndex(_t,F.name),xt.set(F,Lt))}function St(F,_t){const Lt=c.get(_t).get(F);l.get(_t)!==Lt&&(n.uniformBlockBinding(_t,Lt,F.__bindingPointIndex),l.set(_t,Lt))}function Gt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),u={},ot=null,lt={},h={},f=new WeakMap,p=[],g=null,_=!1,m=null,d=null,R=null,b=null,S=null,P=null,N=null,D=new Zt(0,0,0),z=0,T=!1,M=null,A=null,q=null,Y=null,Q=null,Ft.set(0,0,n.canvas.width,n.canvas.height),Vt.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ft,disable:Ct,bindFramebuffer:Pt,drawBuffers:Ot,useProgram:le,setBlending:C,setMaterial:L,setFlipSided:O,setCullFace:I,setLineWidth:K,setPolygonOffset:k,setScissorTest:X,activeTexture:st,bindTexture:dt,unbindTexture:y,compressedTexImage2D:v,compressedTexImage3D:U,texImage2D:At,texImage3D:ht,updateUBOMapping:wt,uniformBlockBinding:St,texStorage2D:ct,texStorage3D:Tt,texSubImage2D:W,texSubImage3D:rt,compressedTexSubImage2D:j,compressedTexSubImage3D:Mt,scissor:Et,viewport:Ut,reset:Gt}}function YM(n,t,e,i,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new vt,u=new WeakMap;let h;const f=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(y,v){return p?new OffscreenCanvas(y,v):Ro("canvas")}function _(y,v,U){let W=1;const rt=dt(y);if((rt.width>U||rt.height>U)&&(W=U/Math.max(rt.width,rt.height)),W<1)if(typeof HTMLImageElement<"u"&&y instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&y instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&y instanceof ImageBitmap||typeof VideoFrame<"u"&&y instanceof VideoFrame){const j=Math.floor(W*rt.width),Mt=Math.floor(W*rt.height);h===void 0&&(h=g(j,Mt));const ct=v?g(j,Mt):h;return ct.width=j,ct.height=Mt,ct.getContext("2d").drawImage(y,0,0,j,Mt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+rt.width+"x"+rt.height+") to ("+j+"x"+Mt+")."),ct}else return"data"in y&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+rt.width+"x"+rt.height+")."),y;return y}function m(y){return y.generateMipmaps}function d(y){n.generateMipmap(y)}function R(y){return y.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:y.isWebGL3DRenderTarget?n.TEXTURE_3D:y.isWebGLArrayRenderTarget||y.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function b(y,v,U,W,rt=!1){if(y!==null){if(n[y]!==void 0)return n[y];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+y+"'")}let j=v;if(v===n.RED&&(U===n.FLOAT&&(j=n.R32F),U===n.HALF_FLOAT&&(j=n.R16F),U===n.UNSIGNED_BYTE&&(j=n.R8)),v===n.RED_INTEGER&&(U===n.UNSIGNED_BYTE&&(j=n.R8UI),U===n.UNSIGNED_SHORT&&(j=n.R16UI),U===n.UNSIGNED_INT&&(j=n.R32UI),U===n.BYTE&&(j=n.R8I),U===n.SHORT&&(j=n.R16I),U===n.INT&&(j=n.R32I)),v===n.RG&&(U===n.FLOAT&&(j=n.RG32F),U===n.HALF_FLOAT&&(j=n.RG16F),U===n.UNSIGNED_BYTE&&(j=n.RG8)),v===n.RG_INTEGER&&(U===n.UNSIGNED_BYTE&&(j=n.RG8UI),U===n.UNSIGNED_SHORT&&(j=n.RG16UI),U===n.UNSIGNED_INT&&(j=n.RG32UI),U===n.BYTE&&(j=n.RG8I),U===n.SHORT&&(j=n.RG16I),U===n.INT&&(j=n.RG32I)),v===n.RGB_INTEGER&&(U===n.UNSIGNED_BYTE&&(j=n.RGB8UI),U===n.UNSIGNED_SHORT&&(j=n.RGB16UI),U===n.UNSIGNED_INT&&(j=n.RGB32UI),U===n.BYTE&&(j=n.RGB8I),U===n.SHORT&&(j=n.RGB16I),U===n.INT&&(j=n.RGB32I)),v===n.RGBA_INTEGER&&(U===n.UNSIGNED_BYTE&&(j=n.RGBA8UI),U===n.UNSIGNED_SHORT&&(j=n.RGBA16UI),U===n.UNSIGNED_INT&&(j=n.RGBA32UI),U===n.BYTE&&(j=n.RGBA8I),U===n.SHORT&&(j=n.RGBA16I),U===n.INT&&(j=n.RGBA32I)),v===n.RGB&&U===n.UNSIGNED_INT_5_9_9_9_REV&&(j=n.RGB9_E5),v===n.RGBA){const Mt=rt?Ao:te.getTransfer(W);U===n.FLOAT&&(j=n.RGBA32F),U===n.HALF_FLOAT&&(j=n.RGBA16F),U===n.UNSIGNED_BYTE&&(j=Mt===re?n.SRGB8_ALPHA8:n.RGBA8),U===n.UNSIGNED_SHORT_4_4_4_4&&(j=n.RGBA4),U===n.UNSIGNED_SHORT_5_5_5_1&&(j=n.RGB5_A1)}return(j===n.R16F||j===n.R32F||j===n.RG16F||j===n.RG32F||j===n.RGBA16F||j===n.RGBA32F)&&t.get("EXT_color_buffer_float"),j}function S(y,v){let U;return y?v===null||v===Fi||v===pr?U=n.DEPTH24_STENCIL8:v===qn?U=n.DEPTH32F_STENCIL8:v===dr&&(U=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===Fi||v===pr?U=n.DEPTH_COMPONENT24:v===qn?U=n.DEPTH_COMPONENT32F:v===dr&&(U=n.DEPTH_COMPONENT16),U}function P(y,v){return m(y)===!0||y.isFramebufferTexture&&y.minFilter!==mn&&y.minFilter!==Tn?Math.log2(Math.max(v.width,v.height))+1:y.mipmaps!==void 0&&y.mipmaps.length>0?y.mipmaps.length:y.isCompressedTexture&&Array.isArray(y.image)?v.mipmaps.length:1}function N(y){const v=y.target;v.removeEventListener("dispose",N),z(v),v.isVideoTexture&&u.delete(v)}function D(y){const v=y.target;v.removeEventListener("dispose",D),M(v)}function z(y){const v=i.get(y);if(v.__webglInit===void 0)return;const U=y.source,W=f.get(U);if(W){const rt=W[v.__cacheKey];rt.usedTimes--,rt.usedTimes===0&&T(y),Object.keys(W).length===0&&f.delete(U)}i.remove(y)}function T(y){const v=i.get(y);n.deleteTexture(v.__webglTexture);const U=y.source,W=f.get(U);delete W[v.__cacheKey],o.memory.textures--}function M(y){const v=i.get(y);if(y.depthTexture&&(y.depthTexture.dispose(),i.remove(y.depthTexture)),y.isWebGLCubeRenderTarget)for(let W=0;W<6;W++){if(Array.isArray(v.__webglFramebuffer[W]))for(let rt=0;rt<v.__webglFramebuffer[W].length;rt++)n.deleteFramebuffer(v.__webglFramebuffer[W][rt]);else n.deleteFramebuffer(v.__webglFramebuffer[W]);v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer[W])}else{if(Array.isArray(v.__webglFramebuffer))for(let W=0;W<v.__webglFramebuffer.length;W++)n.deleteFramebuffer(v.__webglFramebuffer[W]);else n.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&n.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&n.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let W=0;W<v.__webglColorRenderbuffer.length;W++)v.__webglColorRenderbuffer[W]&&n.deleteRenderbuffer(v.__webglColorRenderbuffer[W]);v.__webglDepthRenderbuffer&&n.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const U=y.textures;for(let W=0,rt=U.length;W<rt;W++){const j=i.get(U[W]);j.__webglTexture&&(n.deleteTexture(j.__webglTexture),o.memory.textures--),i.remove(U[W])}i.remove(y)}let A=0;function q(){A=0}function Y(){const y=A;return y>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+y+" texture units while this GPU supports only "+s.maxTextures),A+=1,y}function Q(y){const v=[];return v.push(y.wrapS),v.push(y.wrapT),v.push(y.wrapR||0),v.push(y.magFilter),v.push(y.minFilter),v.push(y.anisotropy),v.push(y.internalFormat),v.push(y.format),v.push(y.type),v.push(y.generateMipmaps),v.push(y.premultiplyAlpha),v.push(y.flipY),v.push(y.unpackAlignment),v.push(y.colorSpace),v.join()}function nt(y,v){const U=i.get(y);if(y.isVideoTexture&&X(y),y.isRenderTargetTexture===!1&&y.isExternalTexture!==!0&&y.version>0&&U.__version!==y.version){const W=y.image;if(W===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(W.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ut(U,y,v);return}}else y.isExternalTexture&&(U.__webglTexture=y.sourceTexture?y.sourceTexture:null);e.bindTexture(n.TEXTURE_2D,U.__webglTexture,n.TEXTURE0+v)}function $(y,v){const U=i.get(y);if(y.isRenderTargetTexture===!1&&y.version>0&&U.__version!==y.version){ut(U,y,v);return}e.bindTexture(n.TEXTURE_2D_ARRAY,U.__webglTexture,n.TEXTURE0+v)}function Z(y,v){const U=i.get(y);if(y.isRenderTargetTexture===!1&&y.version>0&&U.__version!==y.version){ut(U,y,v);return}e.bindTexture(n.TEXTURE_3D,U.__webglTexture,n.TEXTURE0+v)}function H(y,v){const U=i.get(y);if(y.version>0&&U.__version!==y.version){ft(U,y,v);return}e.bindTexture(n.TEXTURE_CUBE_MAP,U.__webglTexture,n.TEXTURE0+v)}const ot={[Ml]:n.REPEAT,[Pi]:n.CLAMP_TO_EDGE,[El]:n.MIRRORED_REPEAT},lt={[mn]:n.NEAREST,[A_]:n.NEAREST_MIPMAP_NEAREST,[Ir]:n.NEAREST_MIPMAP_LINEAR,[Tn]:n.LINEAR,[pa]:n.LINEAR_MIPMAP_NEAREST,[Di]:n.LINEAR_MIPMAP_LINEAR},pt={[P_]:n.NEVER,[O_]:n.ALWAYS,[D_]:n.LESS,[gd]:n.LEQUAL,[L_]:n.EQUAL,[N_]:n.GEQUAL,[U_]:n.GREATER,[I_]:n.NOTEQUAL};function Rt(y,v){if(v.type===qn&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===Tn||v.magFilter===pa||v.magFilter===Ir||v.magFilter===Di||v.minFilter===Tn||v.minFilter===pa||v.minFilter===Ir||v.minFilter===Di)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(y,n.TEXTURE_WRAP_S,ot[v.wrapS]),n.texParameteri(y,n.TEXTURE_WRAP_T,ot[v.wrapT]),(y===n.TEXTURE_3D||y===n.TEXTURE_2D_ARRAY)&&n.texParameteri(y,n.TEXTURE_WRAP_R,ot[v.wrapR]),n.texParameteri(y,n.TEXTURE_MAG_FILTER,lt[v.magFilter]),n.texParameteri(y,n.TEXTURE_MIN_FILTER,lt[v.minFilter]),v.compareFunction&&(n.texParameteri(y,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(y,n.TEXTURE_COMPARE_FUNC,pt[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===mn||v.minFilter!==Ir&&v.minFilter!==Di||v.type===qn&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){const U=t.get("EXT_texture_filter_anisotropic");n.texParameterf(y,U.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function Ft(y,v){let U=!1;y.__webglInit===void 0&&(y.__webglInit=!0,v.addEventListener("dispose",N));const W=v.source;let rt=f.get(W);rt===void 0&&(rt={},f.set(W,rt));const j=Q(v);if(j!==y.__cacheKey){rt[j]===void 0&&(rt[j]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,U=!0),rt[j].usedTimes++;const Mt=rt[y.__cacheKey];Mt!==void 0&&(rt[y.__cacheKey].usedTimes--,Mt.usedTimes===0&&T(v)),y.__cacheKey=j,y.__webglTexture=rt[j].texture}return U}function Vt(y,v,U){return Math.floor(Math.floor(y/U)/v)}function it(y,v,U,W){const j=y.updateRanges;if(j.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,v.width,v.height,U,W,v.data);else{j.sort((ht,Et)=>ht.start-Et.start);let Mt=0;for(let ht=1;ht<j.length;ht++){const Et=j[Mt],Ut=j[ht],wt=Et.start+Et.count,St=Vt(Ut.start,v.width,4),Gt=Vt(Et.start,v.width,4);Ut.start<=wt+1&&St===Gt&&Vt(Ut.start+Ut.count-1,v.width,4)===St?Et.count=Math.max(Et.count,Ut.start+Ut.count-Et.start):(++Mt,j[Mt]=Ut)}j.length=Mt+1;const ct=n.getParameter(n.UNPACK_ROW_LENGTH),Tt=n.getParameter(n.UNPACK_SKIP_PIXELS),At=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,v.width);for(let ht=0,Et=j.length;ht<Et;ht++){const Ut=j[ht],wt=Math.floor(Ut.start/4),St=Math.ceil(Ut.count/4),Gt=wt%v.width,F=Math.floor(wt/v.width),_t=St,xt=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,Gt),n.pixelStorei(n.UNPACK_SKIP_ROWS,F),e.texSubImage2D(n.TEXTURE_2D,0,Gt,F,_t,xt,U,W,v.data)}y.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,ct),n.pixelStorei(n.UNPACK_SKIP_PIXELS,Tt),n.pixelStorei(n.UNPACK_SKIP_ROWS,At)}}function ut(y,v,U){let W=n.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(W=n.TEXTURE_2D_ARRAY),v.isData3DTexture&&(W=n.TEXTURE_3D);const rt=Ft(y,v),j=v.source;e.bindTexture(W,y.__webglTexture,n.TEXTURE0+U);const Mt=i.get(j);if(j.version!==Mt.__version||rt===!0){e.activeTexture(n.TEXTURE0+U);const ct=te.getPrimaries(te.workingColorSpace),Tt=v.colorSpace===li?null:te.getPrimaries(v.colorSpace),At=v.colorSpace===li||ct===Tt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,At);let ht=_(v.image,!1,s.maxTextureSize);ht=st(v,ht);const Et=r.convert(v.format,v.colorSpace),Ut=r.convert(v.type);let wt=b(v.internalFormat,Et,Ut,v.colorSpace,v.isVideoTexture);Rt(W,v);let St;const Gt=v.mipmaps,F=v.isVideoTexture!==!0,_t=Mt.__version===void 0||rt===!0,xt=j.dataReady,Lt=P(v,ht);if(v.isDepthTexture)wt=S(v.format===gr,v.type),_t&&(F?e.texStorage2D(n.TEXTURE_2D,1,wt,ht.width,ht.height):e.texImage2D(n.TEXTURE_2D,0,wt,ht.width,ht.height,0,Et,Ut,null));else if(v.isDataTexture)if(Gt.length>0){F&&_t&&e.texStorage2D(n.TEXTURE_2D,Lt,wt,Gt[0].width,Gt[0].height);for(let mt=0,at=Gt.length;mt<at;mt++)St=Gt[mt],F?xt&&e.texSubImage2D(n.TEXTURE_2D,mt,0,0,St.width,St.height,Et,Ut,St.data):e.texImage2D(n.TEXTURE_2D,mt,wt,St.width,St.height,0,Et,Ut,St.data);v.generateMipmaps=!1}else F?(_t&&e.texStorage2D(n.TEXTURE_2D,Lt,wt,ht.width,ht.height),xt&&it(v,ht,Et,Ut)):e.texImage2D(n.TEXTURE_2D,0,wt,ht.width,ht.height,0,Et,Ut,ht.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){F&&_t&&e.texStorage3D(n.TEXTURE_2D_ARRAY,Lt,wt,Gt[0].width,Gt[0].height,ht.depth);for(let mt=0,at=Gt.length;mt<at;mt++)if(St=Gt[mt],v.format!==fn)if(Et!==null)if(F){if(xt)if(v.layerUpdates.size>0){const Nt=fh(St.width,St.height,v.format,v.type);for(const Wt of v.layerUpdates){const ce=St.data.subarray(Wt*Nt/St.data.BYTES_PER_ELEMENT,(Wt+1)*Nt/St.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,mt,0,0,Wt,St.width,St.height,1,Et,ce)}v.clearLayerUpdates()}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,mt,0,0,0,St.width,St.height,ht.depth,Et,St.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,mt,wt,St.width,St.height,ht.depth,0,St.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else F?xt&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,mt,0,0,0,St.width,St.height,ht.depth,Et,Ut,St.data):e.texImage3D(n.TEXTURE_2D_ARRAY,mt,wt,St.width,St.height,ht.depth,0,Et,Ut,St.data)}else{F&&_t&&e.texStorage2D(n.TEXTURE_2D,Lt,wt,Gt[0].width,Gt[0].height);for(let mt=0,at=Gt.length;mt<at;mt++)St=Gt[mt],v.format!==fn?Et!==null?F?xt&&e.compressedTexSubImage2D(n.TEXTURE_2D,mt,0,0,St.width,St.height,Et,St.data):e.compressedTexImage2D(n.TEXTURE_2D,mt,wt,St.width,St.height,0,St.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):F?xt&&e.texSubImage2D(n.TEXTURE_2D,mt,0,0,St.width,St.height,Et,Ut,St.data):e.texImage2D(n.TEXTURE_2D,mt,wt,St.width,St.height,0,Et,Ut,St.data)}else if(v.isDataArrayTexture)if(F){if(_t&&e.texStorage3D(n.TEXTURE_2D_ARRAY,Lt,wt,ht.width,ht.height,ht.depth),xt)if(v.layerUpdates.size>0){const mt=fh(ht.width,ht.height,v.format,v.type);for(const at of v.layerUpdates){const Nt=ht.data.subarray(at*mt/ht.data.BYTES_PER_ELEMENT,(at+1)*mt/ht.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,at,ht.width,ht.height,1,Et,Ut,Nt)}v.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ht.width,ht.height,ht.depth,Et,Ut,ht.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,wt,ht.width,ht.height,ht.depth,0,Et,Ut,ht.data);else if(v.isData3DTexture)F?(_t&&e.texStorage3D(n.TEXTURE_3D,Lt,wt,ht.width,ht.height,ht.depth),xt&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ht.width,ht.height,ht.depth,Et,Ut,ht.data)):e.texImage3D(n.TEXTURE_3D,0,wt,ht.width,ht.height,ht.depth,0,Et,Ut,ht.data);else if(v.isFramebufferTexture){if(_t)if(F)e.texStorage2D(n.TEXTURE_2D,Lt,wt,ht.width,ht.height);else{let mt=ht.width,at=ht.height;for(let Nt=0;Nt<Lt;Nt++)e.texImage2D(n.TEXTURE_2D,Nt,wt,mt,at,0,Et,Ut,null),mt>>=1,at>>=1}}else if(Gt.length>0){if(F&&_t){const mt=dt(Gt[0]);e.texStorage2D(n.TEXTURE_2D,Lt,wt,mt.width,mt.height)}for(let mt=0,at=Gt.length;mt<at;mt++)St=Gt[mt],F?xt&&e.texSubImage2D(n.TEXTURE_2D,mt,0,0,Et,Ut,St):e.texImage2D(n.TEXTURE_2D,mt,wt,Et,Ut,St);v.generateMipmaps=!1}else if(F){if(_t){const mt=dt(ht);e.texStorage2D(n.TEXTURE_2D,Lt,wt,mt.width,mt.height)}xt&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,Et,Ut,ht)}else e.texImage2D(n.TEXTURE_2D,0,wt,Et,Ut,ht);m(v)&&d(W),Mt.__version=j.version,v.onUpdate&&v.onUpdate(v)}y.__version=v.version}function ft(y,v,U){if(v.image.length!==6)return;const W=Ft(y,v),rt=v.source;e.bindTexture(n.TEXTURE_CUBE_MAP,y.__webglTexture,n.TEXTURE0+U);const j=i.get(rt);if(rt.version!==j.__version||W===!0){e.activeTexture(n.TEXTURE0+U);const Mt=te.getPrimaries(te.workingColorSpace),ct=v.colorSpace===li?null:te.getPrimaries(v.colorSpace),Tt=v.colorSpace===li||Mt===ct?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Tt);const At=v.isCompressedTexture||v.image[0].isCompressedTexture,ht=v.image[0]&&v.image[0].isDataTexture,Et=[];for(let at=0;at<6;at++)!At&&!ht?Et[at]=_(v.image[at],!0,s.maxCubemapSize):Et[at]=ht?v.image[at].image:v.image[at],Et[at]=st(v,Et[at]);const Ut=Et[0],wt=r.convert(v.format,v.colorSpace),St=r.convert(v.type),Gt=b(v.internalFormat,wt,St,v.colorSpace),F=v.isVideoTexture!==!0,_t=j.__version===void 0||W===!0,xt=rt.dataReady;let Lt=P(v,Ut);Rt(n.TEXTURE_CUBE_MAP,v);let mt;if(At){F&&_t&&e.texStorage2D(n.TEXTURE_CUBE_MAP,Lt,Gt,Ut.width,Ut.height);for(let at=0;at<6;at++){mt=Et[at].mipmaps;for(let Nt=0;Nt<mt.length;Nt++){const Wt=mt[Nt];v.format!==fn?wt!==null?F?xt&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,Nt,0,0,Wt.width,Wt.height,wt,Wt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,Nt,Gt,Wt.width,Wt.height,0,Wt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):F?xt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,Nt,0,0,Wt.width,Wt.height,wt,St,Wt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,Nt,Gt,Wt.width,Wt.height,0,wt,St,Wt.data)}}}else{if(mt=v.mipmaps,F&&_t){mt.length>0&&Lt++;const at=dt(Et[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,Lt,Gt,at.width,at.height)}for(let at=0;at<6;at++)if(ht){F?xt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,0,0,Et[at].width,Et[at].height,wt,St,Et[at].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,Gt,Et[at].width,Et[at].height,0,wt,St,Et[at].data);for(let Nt=0;Nt<mt.length;Nt++){const ce=mt[Nt].image[at].image;F?xt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,Nt+1,0,0,ce.width,ce.height,wt,St,ce.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,Nt+1,Gt,ce.width,ce.height,0,wt,St,ce.data)}}else{F?xt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,0,0,wt,St,Et[at]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,0,Gt,wt,St,Et[at]);for(let Nt=0;Nt<mt.length;Nt++){const Wt=mt[Nt];F?xt&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,Nt+1,0,0,wt,St,Wt.image[at]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+at,Nt+1,Gt,wt,St,Wt.image[at])}}}m(v)&&d(n.TEXTURE_CUBE_MAP),j.__version=rt.version,v.onUpdate&&v.onUpdate(v)}y.__version=v.version}function Ct(y,v,U,W,rt,j){const Mt=r.convert(U.format,U.colorSpace),ct=r.convert(U.type),Tt=b(U.internalFormat,Mt,ct,U.colorSpace),At=i.get(v),ht=i.get(U);if(ht.__renderTarget=v,!At.__hasExternalTextures){const Et=Math.max(1,v.width>>j),Ut=Math.max(1,v.height>>j);rt===n.TEXTURE_3D||rt===n.TEXTURE_2D_ARRAY?e.texImage3D(rt,j,Tt,Et,Ut,v.depth,0,Mt,ct,null):e.texImage2D(rt,j,Tt,Et,Ut,0,Mt,ct,null)}e.bindFramebuffer(n.FRAMEBUFFER,y),k(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,W,rt,ht.__webglTexture,0,K(v)):(rt===n.TEXTURE_2D||rt>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&rt<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,W,rt,ht.__webglTexture,j),e.bindFramebuffer(n.FRAMEBUFFER,null)}function Pt(y,v,U){if(n.bindRenderbuffer(n.RENDERBUFFER,y),v.depthBuffer){const W=v.depthTexture,rt=W&&W.isDepthTexture?W.type:null,j=S(v.stencilBuffer,rt),Mt=v.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ct=K(v);k(v)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ct,j,v.width,v.height):U?n.renderbufferStorageMultisample(n.RENDERBUFFER,ct,j,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,j,v.width,v.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Mt,n.RENDERBUFFER,y)}else{const W=v.textures;for(let rt=0;rt<W.length;rt++){const j=W[rt],Mt=r.convert(j.format,j.colorSpace),ct=r.convert(j.type),Tt=b(j.internalFormat,Mt,ct,j.colorSpace),At=K(v);U&&k(v)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,At,Tt,v.width,v.height):k(v)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,At,Tt,v.width,v.height):n.renderbufferStorage(n.RENDERBUFFER,Tt,v.width,v.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ot(y,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,y),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const W=i.get(v.depthTexture);W.__renderTarget=v,(!W.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),nt(v.depthTexture,0);const rt=W.__webglTexture,j=K(v);if(v.depthTexture.format===mr)k(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,rt,0,j):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,rt,0);else if(v.depthTexture.format===gr)k(v)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,rt,0,j):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,rt,0);else throw new Error("Unknown depthTexture format")}function le(y){const v=i.get(y),U=y.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==y.depthTexture){const W=y.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),W){const rt=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,W.removeEventListener("dispose",rt)};W.addEventListener("dispose",rt),v.__depthDisposeCallback=rt}v.__boundDepthTexture=W}if(y.depthTexture&&!v.__autoAllocateDepthBuffer){if(U)throw new Error("target.depthTexture not supported in Cube render targets");const W=y.texture.mipmaps;W&&W.length>0?Ot(v.__webglFramebuffer[0],y):Ot(v.__webglFramebuffer,y)}else if(U){v.__webglDepthbuffer=[];for(let W=0;W<6;W++)if(e.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[W]),v.__webglDepthbuffer[W]===void 0)v.__webglDepthbuffer[W]=n.createRenderbuffer(),Pt(v.__webglDepthbuffer[W],y,!1);else{const rt=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,j=v.__webglDepthbuffer[W];n.bindRenderbuffer(n.RENDERBUFFER,j),n.framebufferRenderbuffer(n.FRAMEBUFFER,rt,n.RENDERBUFFER,j)}}else{const W=y.texture.mipmaps;if(W&&W.length>0?e.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=n.createRenderbuffer(),Pt(v.__webglDepthbuffer,y,!1);else{const rt=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,j=v.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,j),n.framebufferRenderbuffer(n.FRAMEBUFFER,rt,n.RENDERBUFFER,j)}}e.bindFramebuffer(n.FRAMEBUFFER,null)}function w(y,v,U){const W=i.get(y);v!==void 0&&Ct(W.__webglFramebuffer,y,y.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),U!==void 0&&le(y)}function x(y){const v=y.texture,U=i.get(y),W=i.get(v);y.addEventListener("dispose",D);const rt=y.textures,j=y.isWebGLCubeRenderTarget===!0,Mt=rt.length>1;if(Mt||(W.__webglTexture===void 0&&(W.__webglTexture=n.createTexture()),W.__version=v.version,o.memory.textures++),j){U.__webglFramebuffer=[];for(let ct=0;ct<6;ct++)if(v.mipmaps&&v.mipmaps.length>0){U.__webglFramebuffer[ct]=[];for(let Tt=0;Tt<v.mipmaps.length;Tt++)U.__webglFramebuffer[ct][Tt]=n.createFramebuffer()}else U.__webglFramebuffer[ct]=n.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){U.__webglFramebuffer=[];for(let ct=0;ct<v.mipmaps.length;ct++)U.__webglFramebuffer[ct]=n.createFramebuffer()}else U.__webglFramebuffer=n.createFramebuffer();if(Mt)for(let ct=0,Tt=rt.length;ct<Tt;ct++){const At=i.get(rt[ct]);At.__webglTexture===void 0&&(At.__webglTexture=n.createTexture(),o.memory.textures++)}if(y.samples>0&&k(y)===!1){U.__webglMultisampledFramebuffer=n.createFramebuffer(),U.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,U.__webglMultisampledFramebuffer);for(let ct=0;ct<rt.length;ct++){const Tt=rt[ct];U.__webglColorRenderbuffer[ct]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,U.__webglColorRenderbuffer[ct]);const At=r.convert(Tt.format,Tt.colorSpace),ht=r.convert(Tt.type),Et=b(Tt.internalFormat,At,ht,Tt.colorSpace,y.isXRRenderTarget===!0),Ut=K(y);n.renderbufferStorageMultisample(n.RENDERBUFFER,Ut,Et,y.width,y.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ct,n.RENDERBUFFER,U.__webglColorRenderbuffer[ct])}n.bindRenderbuffer(n.RENDERBUFFER,null),y.depthBuffer&&(U.__webglDepthRenderbuffer=n.createRenderbuffer(),Pt(U.__webglDepthRenderbuffer,y,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(j){e.bindTexture(n.TEXTURE_CUBE_MAP,W.__webglTexture),Rt(n.TEXTURE_CUBE_MAP,v);for(let ct=0;ct<6;ct++)if(v.mipmaps&&v.mipmaps.length>0)for(let Tt=0;Tt<v.mipmaps.length;Tt++)Ct(U.__webglFramebuffer[ct][Tt],y,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ct,Tt);else Ct(U.__webglFramebuffer[ct],y,v,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ct,0);m(v)&&d(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Mt){for(let ct=0,Tt=rt.length;ct<Tt;ct++){const At=rt[ct],ht=i.get(At);let Et=n.TEXTURE_2D;(y.isWebGL3DRenderTarget||y.isWebGLArrayRenderTarget)&&(Et=y.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(Et,ht.__webglTexture),Rt(Et,At),Ct(U.__webglFramebuffer,y,At,n.COLOR_ATTACHMENT0+ct,Et,0),m(At)&&d(Et)}e.unbindTexture()}else{let ct=n.TEXTURE_2D;if((y.isWebGL3DRenderTarget||y.isWebGLArrayRenderTarget)&&(ct=y.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(ct,W.__webglTexture),Rt(ct,v),v.mipmaps&&v.mipmaps.length>0)for(let Tt=0;Tt<v.mipmaps.length;Tt++)Ct(U.__webglFramebuffer[Tt],y,v,n.COLOR_ATTACHMENT0,ct,Tt);else Ct(U.__webglFramebuffer,y,v,n.COLOR_ATTACHMENT0,ct,0);m(v)&&d(ct),e.unbindTexture()}y.depthBuffer&&le(y)}function C(y){const v=y.textures;for(let U=0,W=v.length;U<W;U++){const rt=v[U];if(m(rt)){const j=R(y),Mt=i.get(rt).__webglTexture;e.bindTexture(j,Mt),d(j),e.unbindTexture()}}}const L=[],O=[];function I(y){if(y.samples>0){if(k(y)===!1){const v=y.textures,U=y.width,W=y.height;let rt=n.COLOR_BUFFER_BIT;const j=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Mt=i.get(y),ct=v.length>1;if(ct)for(let At=0;At<v.length;At++)e.bindFramebuffer(n.FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+At,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,Mt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+At,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,Mt.__webglMultisampledFramebuffer);const Tt=y.texture.mipmaps;Tt&&Tt.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Mt.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Mt.__webglFramebuffer);for(let At=0;At<v.length;At++){if(y.resolveDepthBuffer&&(y.depthBuffer&&(rt|=n.DEPTH_BUFFER_BIT),y.stencilBuffer&&y.resolveStencilBuffer&&(rt|=n.STENCIL_BUFFER_BIT)),ct){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Mt.__webglColorRenderbuffer[At]);const ht=i.get(v[At]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ht,0)}n.blitFramebuffer(0,0,U,W,0,0,U,W,rt,n.NEAREST),l===!0&&(L.length=0,O.length=0,L.push(n.COLOR_ATTACHMENT0+At),y.depthBuffer&&y.resolveDepthBuffer===!1&&(L.push(j),O.push(j),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,O)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,L))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ct)for(let At=0;At<v.length;At++){e.bindFramebuffer(n.FRAMEBUFFER,Mt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+At,n.RENDERBUFFER,Mt.__webglColorRenderbuffer[At]);const ht=i.get(v[At]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,Mt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+At,n.TEXTURE_2D,ht,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Mt.__webglMultisampledFramebuffer)}else if(y.depthBuffer&&y.resolveDepthBuffer===!1&&l){const v=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[v])}}}function K(y){return Math.min(s.maxSamples,y.samples)}function k(y){const v=i.get(y);return y.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function X(y){const v=o.render.frame;u.get(y)!==v&&(u.set(y,v),y.update())}function st(y,v){const U=y.colorSpace,W=y.format,rt=y.type;return y.isCompressedTexture===!0||y.isVideoTexture===!0||U!==Ts&&U!==li&&(te.getTransfer(U)===re?(W!==fn||rt!==Dn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",U)),v}function dt(y){return typeof HTMLImageElement<"u"&&y instanceof HTMLImageElement?(c.width=y.naturalWidth||y.width,c.height=y.naturalHeight||y.height):typeof VideoFrame<"u"&&y instanceof VideoFrame?(c.width=y.displayWidth,c.height=y.displayHeight):(c.width=y.width,c.height=y.height),c}this.allocateTextureUnit=Y,this.resetTextureUnits=q,this.setTexture2D=nt,this.setTexture2DArray=$,this.setTexture3D=Z,this.setTextureCube=H,this.rebindTextures=w,this.setupRenderTarget=x,this.updateRenderTargetMipmap=C,this.updateMultisampleRenderTarget=I,this.setupDepthRenderbuffer=le,this.setupFrameBufferTexture=Ct,this.useMultisampledRTT=k}function jM(n,t){function e(i,s=li){let r;const o=te.getTransfer(s);if(i===Dn)return n.UNSIGNED_BYTE;if(i===Dc)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Lc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===cd)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===ad)return n.BYTE;if(i===ld)return n.SHORT;if(i===dr)return n.UNSIGNED_SHORT;if(i===Pc)return n.INT;if(i===Fi)return n.UNSIGNED_INT;if(i===qn)return n.FLOAT;if(i===br)return n.HALF_FLOAT;if(i===ud)return n.ALPHA;if(i===hd)return n.RGB;if(i===fn)return n.RGBA;if(i===mr)return n.DEPTH_COMPONENT;if(i===gr)return n.DEPTH_STENCIL;if(i===fd)return n.RED;if(i===Uc)return n.RED_INTEGER;if(i===dd)return n.RG;if(i===Ic)return n.RG_INTEGER;if(i===Nc)return n.RGBA_INTEGER;if(i===uo||i===ho||i===fo||i===po)if(o===re)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===uo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ho)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===fo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===po)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===uo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ho)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===fo)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===po)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===bl||i===Tl||i===Al||i===wl)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===bl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Tl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Al)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===wl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Rl||i===Cl||i===Pl)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Rl||i===Cl)return o===re?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Pl)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Dl||i===Ll||i===Ul||i===Il||i===Nl||i===Ol||i===Fl||i===Bl||i===zl||i===Hl||i===Vl||i===kl||i===Gl||i===Wl)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Dl)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ll)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Ul)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Il)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Nl)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Ol)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Fl)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Bl)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===zl)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Hl)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Vl)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===kl)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Gl)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Wl)return o===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===mo||i===Xl||i===ql)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===mo)return o===re?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Xl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===ql)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===pd||i===Yl||i===jl||i===Kl)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===mo)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Yl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===jl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Kl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===pr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}class Gd extends qe{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}}const KM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,$M=`
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

}`;class ZM{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const i=new Gd(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new mi({vertexShader:KM,fragmentShader:$M,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new an(new qo(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class JM extends Gi{constructor(t,e){super();const i=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,u=null,h=null,f=null,p=null,g=null;const _=new ZM,m={},d=e.getContextAttributes();let R=null,b=null;const S=[],P=[],N=new vt;let D=null;const z=new on;z.viewport=new ve;const T=new on;T.viewport=new ve;const M=[z,T],A=new mv;let q=null,Y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(it){let ut=S[it];return ut===void 0&&(ut=new Na,S[it]=ut),ut.getTargetRaySpace()},this.getControllerGrip=function(it){let ut=S[it];return ut===void 0&&(ut=new Na,S[it]=ut),ut.getGripSpace()},this.getHand=function(it){let ut=S[it];return ut===void 0&&(ut=new Na,S[it]=ut),ut.getHandSpace()};function Q(it){const ut=P.indexOf(it.inputSource);if(ut===-1)return;const ft=S[ut];ft!==void 0&&(ft.update(it.inputSource,it.frame,c||o),ft.dispatchEvent({type:it.type,data:it.inputSource}))}function nt(){s.removeEventListener("select",Q),s.removeEventListener("selectstart",Q),s.removeEventListener("selectend",Q),s.removeEventListener("squeeze",Q),s.removeEventListener("squeezestart",Q),s.removeEventListener("squeezeend",Q),s.removeEventListener("end",nt),s.removeEventListener("inputsourceschange",$);for(let it=0;it<S.length;it++){const ut=P[it];ut!==null&&(P[it]=null,S[it].disconnect(ut))}q=null,Y=null,_.reset();for(const it in m)delete m[it];t.setRenderTarget(R),p=null,f=null,h=null,s=null,b=null,Vt.stop(),i.isPresenting=!1,t.setPixelRatio(D),t.setSize(N.width,N.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(it){r=it,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(it){a=it,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(it){c=it},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(it){if(s=it,s!==null){if(R=t.getRenderTarget(),s.addEventListener("select",Q),s.addEventListener("selectstart",Q),s.addEventListener("selectend",Q),s.addEventListener("squeeze",Q),s.addEventListener("squeezestart",Q),s.addEventListener("squeezeend",Q),s.addEventListener("end",nt),s.addEventListener("inputsourceschange",$),d.xrCompatible!==!0&&await e.makeXRCompatible(),D=t.getPixelRatio(),t.getSize(N),typeof XRWebGLBinding<"u"&&(h=new XRWebGLBinding(s,e)),h!==null&&"createProjectionLayer"in XRWebGLBinding.prototype){let ft=null,Ct=null,Pt=null;d.depth&&(Pt=d.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ft=d.stencil?gr:mr,Ct=d.stencil?pr:Fi);const Ot={colorFormat:e.RGBA8,depthFormat:Pt,scaleFactor:r};f=h.createProjectionLayer(Ot),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),b=new zi(f.textureWidth,f.textureHeight,{format:fn,type:Dn,depthTexture:new wd(f.textureWidth,f.textureHeight,Ct,void 0,void 0,void 0,void 0,void 0,void 0,ft),stencilBuffer:d.stencil,colorSpace:t.outputColorSpace,samples:d.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const ft={antialias:d.antialias,alpha:!0,depth:d.depth,stencil:d.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,e,ft),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),b=new zi(p.framebufferWidth,p.framebufferHeight,{format:fn,type:Dn,colorSpace:t.outputColorSpace,stencilBuffer:d.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),Vt.setContext(s),Vt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function $(it){for(let ut=0;ut<it.removed.length;ut++){const ft=it.removed[ut],Ct=P.indexOf(ft);Ct>=0&&(P[Ct]=null,S[Ct].disconnect(ft))}for(let ut=0;ut<it.added.length;ut++){const ft=it.added[ut];let Ct=P.indexOf(ft);if(Ct===-1){for(let Ot=0;Ot<S.length;Ot++)if(Ot>=P.length){P.push(ft),Ct=Ot;break}else if(P[Ot]===null){P[Ot]=ft,Ct=Ot;break}if(Ct===-1)break}const Pt=S[Ct];Pt&&Pt.connect(ft)}}const Z=new B,H=new B;function ot(it,ut,ft){Z.setFromMatrixPosition(ut.matrixWorld),H.setFromMatrixPosition(ft.matrixWorld);const Ct=Z.distanceTo(H),Pt=ut.projectionMatrix.elements,Ot=ft.projectionMatrix.elements,le=Pt[14]/(Pt[10]-1),w=Pt[14]/(Pt[10]+1),x=(Pt[9]+1)/Pt[5],C=(Pt[9]-1)/Pt[5],L=(Pt[8]-1)/Pt[0],O=(Ot[8]+1)/Ot[0],I=le*L,K=le*O,k=Ct/(-L+O),X=k*-L;if(ut.matrixWorld.decompose(it.position,it.quaternion,it.scale),it.translateX(X),it.translateZ(k),it.matrixWorld.compose(it.position,it.quaternion,it.scale),it.matrixWorldInverse.copy(it.matrixWorld).invert(),Pt[10]===-1)it.projectionMatrix.copy(ut.projectionMatrix),it.projectionMatrixInverse.copy(ut.projectionMatrixInverse);else{const st=le+k,dt=w+k,y=I-X,v=K+(Ct-X),U=x*w/dt*st,W=C*w/dt*st;it.projectionMatrix.makePerspective(y,v,U,W,st,dt),it.projectionMatrixInverse.copy(it.projectionMatrix).invert()}}function lt(it,ut){ut===null?it.matrixWorld.copy(it.matrix):it.matrixWorld.multiplyMatrices(ut.matrixWorld,it.matrix),it.matrixWorldInverse.copy(it.matrixWorld).invert()}this.updateCamera=function(it){if(s===null)return;let ut=it.near,ft=it.far;_.texture!==null&&(_.depthNear>0&&(ut=_.depthNear),_.depthFar>0&&(ft=_.depthFar)),A.near=T.near=z.near=ut,A.far=T.far=z.far=ft,(q!==A.near||Y!==A.far)&&(s.updateRenderState({depthNear:A.near,depthFar:A.far}),q=A.near,Y=A.far),A.layers.mask=it.layers.mask|6,z.layers.mask=A.layers.mask&3,T.layers.mask=A.layers.mask&5;const Ct=it.parent,Pt=A.cameras;lt(A,Ct);for(let Ot=0;Ot<Pt.length;Ot++)lt(Pt[Ot],Ct);Pt.length===2?ot(A,z,T):A.projectionMatrix.copy(z.projectionMatrix),pt(it,A,Ct)};function pt(it,ut,ft){ft===null?it.matrix.copy(ut.matrixWorld):(it.matrix.copy(ft.matrixWorld),it.matrix.invert(),it.matrix.multiply(ut.matrixWorld)),it.matrix.decompose(it.position,it.quaternion,it.scale),it.updateMatrixWorld(!0),it.projectionMatrix.copy(ut.projectionMatrix),it.projectionMatrixInverse.copy(ut.projectionMatrixInverse),it.isPerspectiveCamera&&(it.fov=_r*2*Math.atan(1/it.projectionMatrix.elements[5]),it.zoom=1)}this.getCamera=function(){return A},this.getFoveation=function(){if(!(f===null&&p===null))return l},this.setFoveation=function(it){l=it,f!==null&&(f.fixedFoveation=it),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=it)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(A)},this.getCameraTexture=function(it){return m[it]};let Rt=null;function Ft(it,ut){if(u=ut.getViewerPose(c||o),g=ut,u!==null){const ft=u.views;p!==null&&(t.setRenderTargetFramebuffer(b,p.framebuffer),t.setRenderTarget(b));let Ct=!1;ft.length!==A.cameras.length&&(A.cameras.length=0,Ct=!0);for(let w=0;w<ft.length;w++){const x=ft[w];let C=null;if(p!==null)C=p.getViewport(x);else{const O=h.getViewSubImage(f,x);C=O.viewport,w===0&&(t.setRenderTargetTextures(b,O.colorTexture,O.depthStencilTexture),t.setRenderTarget(b))}let L=M[w];L===void 0&&(L=new on,L.layers.enable(w),L.viewport=new ve,M[w]=L),L.matrix.fromArray(x.transform.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale),L.projectionMatrix.fromArray(x.projectionMatrix),L.projectionMatrixInverse.copy(L.projectionMatrix).invert(),L.viewport.set(C.x,C.y,C.width,C.height),w===0&&(A.matrix.copy(L.matrix),A.matrix.decompose(A.position,A.quaternion,A.scale)),Ct===!0&&A.cameras.push(L)}const Pt=s.enabledFeatures;if(Pt&&Pt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&h){const w=h.getDepthInformation(ft[0]);w&&w.isValid&&w.texture&&_.init(w,s.renderState)}if(Pt&&Pt.includes("camera-access")&&(t.state.unbindTexture(),h))for(let w=0;w<ft.length;w++){const x=ft[w].camera;if(x){let C=m[x];C||(C=new Gd,m[x]=C);const L=h.getCameraImage(x);C.sourceTexture=L}}}for(let ft=0;ft<S.length;ft++){const Ct=P[ft],Pt=S[ft];Ct!==null&&Pt!==void 0&&Pt.update(Ct,ut,c||o)}Rt&&Rt(it,ut),ut.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ut}),g=null}const Vt=new Bd;Vt.setAnimationLoop(Ft),this.setAnimationLoop=function(it){Rt=it},this.dispose=function(){}}}const Ti=new Ln,QM=new fe;function tE(n,t){function e(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function i(m,d){d.color.getRGB(m.fogColor.value,Ed(n)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function s(m,d,R,b,S){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(m,d):d.isMeshToonMaterial?(r(m,d),h(m,d)):d.isMeshPhongMaterial?(r(m,d),u(m,d)):d.isMeshStandardMaterial?(r(m,d),f(m,d),d.isMeshPhysicalMaterial&&p(m,d,S)):d.isMeshMatcapMaterial?(r(m,d),g(m,d)):d.isMeshDepthMaterial?r(m,d):d.isMeshDistanceMaterial?(r(m,d),_(m,d)):d.isMeshNormalMaterial?r(m,d):d.isLineBasicMaterial?(o(m,d),d.isLineDashedMaterial&&a(m,d)):d.isPointsMaterial?l(m,d,R,b):d.isSpriteMaterial?c(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,e(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===Xe&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,e(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===Xe&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,e(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,e(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const R=t.get(d),b=R.envMap,S=R.envMapRotation;b&&(m.envMap.value=b,Ti.copy(S),Ti.x*=-1,Ti.y*=-1,Ti.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(Ti.y*=-1,Ti.z*=-1),m.envMapRotation.value.setFromMatrix4(QM.makeRotationFromEuler(Ti)),m.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap&&(m.lightMap.value=d.lightMap,m.lightMapIntensity.value=d.lightMapIntensity,e(d.lightMap,m.lightMapTransform)),d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,m.aoMapTransform))}function o(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform))}function a(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function l(m,d,R,b){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*R,m.scale.value=b*.5,d.map&&(m.map.value=d.map,e(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function c(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function u(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function h(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function f(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,m.roughnessMapTransform)),d.envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,R){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Xe&&m.clearcoatNormalScale.value.negate())),d.dispersion>0&&(m.dispersion.value=d.dispersion),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=R.texture,m.transmissionSamplerSize.value.set(R.width,R.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,d){d.matcap&&(m.matcap.value=d.matcap)}function _(m,d){const R=t.get(d).light;m.referencePosition.value.setFromMatrixPosition(R.matrixWorld),m.nearDistance.value=R.shadow.camera.near,m.farDistance.value=R.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function eE(n,t,e,i){let s={},r={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(R,b){const S=b.program;i.uniformBlockBinding(R,S)}function c(R,b){let S=s[R.id];S===void 0&&(g(R),S=u(R),s[R.id]=S,R.addEventListener("dispose",m));const P=b.program;i.updateUBOMapping(R,P);const N=t.render.frame;r[R.id]!==N&&(f(R),r[R.id]=N)}function u(R){const b=h();R.__bindingPointIndex=b;const S=n.createBuffer(),P=R.__size,N=R.usage;return n.bindBuffer(n.UNIFORM_BUFFER,S),n.bufferData(n.UNIFORM_BUFFER,P,N),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,b,S),S}function h(){for(let R=0;R<a;R++)if(o.indexOf(R)===-1)return o.push(R),R;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(R){const b=s[R.id],S=R.uniforms,P=R.__cache;n.bindBuffer(n.UNIFORM_BUFFER,b);for(let N=0,D=S.length;N<D;N++){const z=Array.isArray(S[N])?S[N]:[S[N]];for(let T=0,M=z.length;T<M;T++){const A=z[T];if(p(A,N,T,P)===!0){const q=A.__offset,Y=Array.isArray(A.value)?A.value:[A.value];let Q=0;for(let nt=0;nt<Y.length;nt++){const $=Y[nt],Z=_($);typeof $=="number"||typeof $=="boolean"?(A.__data[0]=$,n.bufferSubData(n.UNIFORM_BUFFER,q+Q,A.__data)):$.isMatrix3?(A.__data[0]=$.elements[0],A.__data[1]=$.elements[1],A.__data[2]=$.elements[2],A.__data[3]=0,A.__data[4]=$.elements[3],A.__data[5]=$.elements[4],A.__data[6]=$.elements[5],A.__data[7]=0,A.__data[8]=$.elements[6],A.__data[9]=$.elements[7],A.__data[10]=$.elements[8],A.__data[11]=0):($.toArray(A.__data,Q),Q+=Z.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,q,A.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(R,b,S,P){const N=R.value,D=b+"_"+S;if(P[D]===void 0)return typeof N=="number"||typeof N=="boolean"?P[D]=N:P[D]=N.clone(),!0;{const z=P[D];if(typeof N=="number"||typeof N=="boolean"){if(z!==N)return P[D]=N,!0}else if(z.equals(N)===!1)return z.copy(N),!0}return!1}function g(R){const b=R.uniforms;let S=0;const P=16;for(let D=0,z=b.length;D<z;D++){const T=Array.isArray(b[D])?b[D]:[b[D]];for(let M=0,A=T.length;M<A;M++){const q=T[M],Y=Array.isArray(q.value)?q.value:[q.value];for(let Q=0,nt=Y.length;Q<nt;Q++){const $=Y[Q],Z=_($),H=S%P,ot=H%Z.boundary,lt=H+ot;S+=ot,lt!==0&&P-lt<Z.storage&&(S+=P-lt),q.__data=new Float32Array(Z.storage/Float32Array.BYTES_PER_ELEMENT),q.__offset=S,S+=Z.storage}}}const N=S%P;return N>0&&(S+=P-N),R.__size=S,R.__cache={},this}function _(R){const b={boundary:0,storage:0};return typeof R=="number"||typeof R=="boolean"?(b.boundary=4,b.storage=4):R.isVector2?(b.boundary=8,b.storage=8):R.isVector3||R.isColor?(b.boundary=16,b.storage=12):R.isVector4?(b.boundary=16,b.storage=16):R.isMatrix3?(b.boundary=48,b.storage=48):R.isMatrix4?(b.boundary=64,b.storage=64):R.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",R),b}function m(R){const b=R.target;b.removeEventListener("dispose",m);const S=o.indexOf(b.__bindingPointIndex);o.splice(S,1),n.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function d(){for(const R in s)n.deleteBuffer(s[R]);o=[],s={},r={}}return{bind:l,update:c,dispose:d}}class nE{constructor(t={}){const{canvas:e=Q_(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=o;const g=new Uint32Array(4),_=new Int32Array(4);let m=null,d=null;const R=[],b=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=hi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const S=this;let P=!1;this._outputColorSpace=rn;let N=0,D=0,z=null,T=-1,M=null;const A=new ve,q=new ve;let Y=null;const Q=new Zt(0);let nt=0,$=e.width,Z=e.height,H=1,ot=null,lt=null;const pt=new ve(0,0,$,Z),Rt=new ve(0,0,$,Z);let Ft=!1;const Vt=new zc;let it=!1,ut=!1;const ft=new fe,Ct=new B,Pt=new ve,Ot={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let le=!1;function w(){return z===null?H:1}let x=i;function C(E,V){return e.getContext(E,V)}try{const E={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Rc}`),e.addEventListener("webglcontextlost",xt,!1),e.addEventListener("webglcontextrestored",Lt,!1),e.addEventListener("webglcontextcreationerror",mt,!1),x===null){const V="webgl2";if(x=C(V,E),x===null)throw C(V)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let L,O,I,K,k,X,st,dt,y,v,U,W,rt,j,Mt,ct,Tt,At,ht,Et,Ut,wt,St,Gt;function F(){L=new fy(x),L.init(),wt=new jM(x,L),O=new ry(x,L,t,wt),I=new qM(x,L),O.reversedDepthBuffer&&f&&I.buffers.depth.setReversed(!0),K=new my(x),k=new UM,X=new YM(x,L,I,k,O,wt,K),st=new ay(S),dt=new hy(S),y=new yv(x),St=new iy(x,y),v=new dy(x,y,K,St),U=new _y(x,v,y,K),ht=new gy(x,O,X),ct=new oy(k),W=new LM(S,st,dt,L,O,St,ct),rt=new tE(S,k),j=new NM,Mt=new VM(L),At=new ny(S,st,dt,I,U,p,l),Tt=new WM(S,U,O),Gt=new eE(x,K,O,I),Et=new sy(x,L,K),Ut=new py(x,L,K),K.programs=W.programs,S.capabilities=O,S.extensions=L,S.properties=k,S.renderLists=j,S.shadowMap=Tt,S.state=I,S.info=K}F();const _t=new JM(S,x);this.xr=_t,this.getContext=function(){return x},this.getContextAttributes=function(){return x.getContextAttributes()},this.forceContextLoss=function(){const E=L.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=L.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(E){E!==void 0&&(H=E,this.setSize($,Z,!1))},this.getSize=function(E){return E.set($,Z)},this.setSize=function(E,V,J=!0){if(_t.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}$=E,Z=V,e.width=Math.floor(E*H),e.height=Math.floor(V*H),J===!0&&(e.style.width=E+"px",e.style.height=V+"px"),this.setViewport(0,0,E,V)},this.getDrawingBufferSize=function(E){return E.set($*H,Z*H).floor()},this.setDrawingBufferSize=function(E,V,J){$=E,Z=V,H=J,e.width=Math.floor(E*J),e.height=Math.floor(V*J),this.setViewport(0,0,E,V)},this.getCurrentViewport=function(E){return E.copy(A)},this.getViewport=function(E){return E.copy(pt)},this.setViewport=function(E,V,J,tt){E.isVector4?pt.set(E.x,E.y,E.z,E.w):pt.set(E,V,J,tt),I.viewport(A.copy(pt).multiplyScalar(H).round())},this.getScissor=function(E){return E.copy(Rt)},this.setScissor=function(E,V,J,tt){E.isVector4?Rt.set(E.x,E.y,E.z,E.w):Rt.set(E,V,J,tt),I.scissor(q.copy(Rt).multiplyScalar(H).round())},this.getScissorTest=function(){return Ft},this.setScissorTest=function(E){I.setScissorTest(Ft=E)},this.setOpaqueSort=function(E){ot=E},this.setTransparentSort=function(E){lt=E},this.getClearColor=function(E){return E.copy(At.getClearColor())},this.setClearColor=function(){At.setClearColor(...arguments)},this.getClearAlpha=function(){return At.getClearAlpha()},this.setClearAlpha=function(){At.setClearAlpha(...arguments)},this.clear=function(E=!0,V=!0,J=!0){let tt=0;if(E){let G=!1;if(z!==null){const gt=z.texture.format;G=gt===Nc||gt===Ic||gt===Uc}if(G){const gt=z.texture.type,bt=gt===Dn||gt===Fi||gt===dr||gt===pr||gt===Dc||gt===Lc,It=At.getClearColor(),Dt=At.getClearAlpha(),Ht=It.r,kt=It.g,Bt=It.b;bt?(g[0]=Ht,g[1]=kt,g[2]=Bt,g[3]=Dt,x.clearBufferuiv(x.COLOR,0,g)):(_[0]=Ht,_[1]=kt,_[2]=Bt,_[3]=Dt,x.clearBufferiv(x.COLOR,0,_))}else tt|=x.COLOR_BUFFER_BIT}V&&(tt|=x.DEPTH_BUFFER_BIT),J&&(tt|=x.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),x.clear(tt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",xt,!1),e.removeEventListener("webglcontextrestored",Lt,!1),e.removeEventListener("webglcontextcreationerror",mt,!1),At.dispose(),j.dispose(),Mt.dispose(),k.dispose(),st.dispose(),dt.dispose(),U.dispose(),St.dispose(),Gt.dispose(),W.dispose(),_t.dispose(),_t.removeEventListener("sessionstart",vn),_t.removeEventListener("sessionend",jc),gi.stop()};function xt(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),P=!0}function Lt(){console.log("THREE.WebGLRenderer: Context Restored."),P=!1;const E=K.autoReset,V=Tt.enabled,J=Tt.autoUpdate,tt=Tt.needsUpdate,G=Tt.type;F(),K.autoReset=E,Tt.enabled=V,Tt.autoUpdate=J,Tt.needsUpdate=tt,Tt.type=G}function mt(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function at(E){const V=E.target;V.removeEventListener("dispose",at),Nt(V)}function Nt(E){Wt(E),k.remove(E)}function Wt(E){const V=k.get(E).programs;V!==void 0&&(V.forEach(function(J){W.releaseProgram(J)}),E.isShaderMaterial&&W.releaseShaderCache(E))}this.renderBufferDirect=function(E,V,J,tt,G,gt){V===null&&(V=Ot);const bt=G.isMesh&&G.matrixWorld.determinant()<0,It=_p(E,V,J,tt,G);I.setMaterial(tt,bt);let Dt=J.index,Ht=1;if(tt.wireframe===!0){if(Dt=v.getWireframeAttribute(J),Dt===void 0)return;Ht=2}const kt=J.drawRange,Bt=J.attributes.position;let Jt=kt.start*Ht,se=(kt.start+kt.count)*Ht;gt!==null&&(Jt=Math.max(Jt,gt.start*Ht),se=Math.min(se,(gt.start+gt.count)*Ht)),Dt!==null?(Jt=Math.max(Jt,0),se=Math.min(se,Dt.count)):Bt!=null&&(Jt=Math.max(Jt,0),se=Math.min(se,Bt.count));const _e=se-Jt;if(_e<0||_e===1/0)return;St.setup(G,tt,It,J,Dt);let de,ae=Et;if(Dt!==null&&(de=y.get(Dt),ae=Ut,ae.setIndex(de)),G.isMesh)tt.wireframe===!0?(I.setLineWidth(tt.wireframeLinewidth*w()),ae.setMode(x.LINES)):ae.setMode(x.TRIANGLES);else if(G.isLine){let zt=tt.linewidth;zt===void 0&&(zt=1),I.setLineWidth(zt*w()),G.isLineSegments?ae.setMode(x.LINES):G.isLineLoop?ae.setMode(x.LINE_LOOP):ae.setMode(x.LINE_STRIP)}else G.isPoints?ae.setMode(x.POINTS):G.isSprite&&ae.setMode(x.TRIANGLES);if(G.isBatchedMesh)if(G._multiDrawInstances!==null)xs("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ae.renderMultiDrawInstances(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount,G._multiDrawInstances);else if(L.get("WEBGL_multi_draw"))ae.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{const zt=G._multiDrawStarts,pe=G._multiDrawCounts,Qt=G._multiDrawCount,Ke=Dt?y.get(Dt).bytesPerElement:1,Xi=k.get(tt).currentProgram.getUniforms();for(let $e=0;$e<Qt;$e++)Xi.setValue(x,"_gl_DrawID",$e),ae.render(zt[$e]/Ke,pe[$e])}else if(G.isInstancedMesh)ae.renderInstances(Jt,_e,G.count);else if(J.isInstancedBufferGeometry){const zt=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,pe=Math.min(J.instanceCount,zt);ae.renderInstances(Jt,_e,pe)}else ae.render(Jt,_e)};function ce(E,V,J){E.transparent===!0&&E.side===Xn&&E.forceSinglePass===!1?(E.side=Xe,E.needsUpdate=!0,Pr(E,V,J),E.side=pi,E.needsUpdate=!0,Pr(E,V,J),E.side=Xn):Pr(E,V,J)}this.compile=function(E,V,J=null){J===null&&(J=E),d=Mt.get(J),d.init(V),b.push(d),J.traverseVisible(function(G){G.isLight&&G.layers.test(V.layers)&&(d.pushLight(G),G.castShadow&&d.pushShadow(G))}),E!==J&&E.traverseVisible(function(G){G.isLight&&G.layers.test(V.layers)&&(d.pushLight(G),G.castShadow&&d.pushShadow(G))}),d.setupLights();const tt=new Set;return E.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;const gt=G.material;if(gt)if(Array.isArray(gt))for(let bt=0;bt<gt.length;bt++){const It=gt[bt];ce(It,J,G),tt.add(It)}else ce(gt,J,G),tt.add(gt)}),d=b.pop(),tt},this.compileAsync=function(E,V,J=null){const tt=this.compile(E,V,J);return new Promise(G=>{function gt(){if(tt.forEach(function(bt){k.get(bt).currentProgram.isReady()&&tt.delete(bt)}),tt.size===0){G(E);return}setTimeout(gt,10)}L.get("KHR_parallel_shader_compile")!==null?gt():setTimeout(gt,10)})};let ee=null;function In(E){ee&&ee(E)}function vn(){gi.stop()}function jc(){gi.start()}const gi=new Bd;gi.setAnimationLoop(In),typeof self<"u"&&gi.setContext(self),this.setAnimationLoop=function(E){ee=E,_t.setAnimationLoop(E),E===null?gi.stop():gi.start()},_t.addEventListener("sessionstart",vn),_t.addEventListener("sessionend",jc),this.render=function(E,V){if(V!==void 0&&V.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),V.parent===null&&V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),_t.enabled===!0&&_t.isPresenting===!0&&(_t.cameraAutoUpdate===!0&&_t.updateCamera(V),V=_t.getCamera()),E.isScene===!0&&E.onBeforeRender(S,E,V,z),d=Mt.get(E,b.length),d.init(V),b.push(d),ft.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),Vt.setFromProjectionMatrix(ft,An,V.reversedDepth),ut=this.localClippingEnabled,it=ct.init(this.clippingPlanes,ut),m=j.get(E,R.length),m.init(),R.push(m),_t.enabled===!0&&_t.isPresenting===!0){const gt=S.xr.getDepthSensingMesh();gt!==null&&ta(gt,V,-1/0,S.sortObjects)}ta(E,V,0,S.sortObjects),m.finish(),S.sortObjects===!0&&m.sort(ot,lt),le=_t.enabled===!1||_t.isPresenting===!1||_t.hasDepthSensing()===!1,le&&At.addToRenderList(m,E),this.info.render.frame++,it===!0&&ct.beginShadows();const J=d.state.shadowsArray;Tt.render(J,E,V),it===!0&&ct.endShadows(),this.info.autoReset===!0&&this.info.reset();const tt=m.opaque,G=m.transmissive;if(d.setupLights(),V.isArrayCamera){const gt=V.cameras;if(G.length>0)for(let bt=0,It=gt.length;bt<It;bt++){const Dt=gt[bt];$c(tt,G,E,Dt)}le&&At.render(E);for(let bt=0,It=gt.length;bt<It;bt++){const Dt=gt[bt];Kc(m,E,Dt,Dt.viewport)}}else G.length>0&&$c(tt,G,E,V),le&&At.render(E),Kc(m,E,V);z!==null&&D===0&&(X.updateMultisampleRenderTarget(z),X.updateRenderTargetMipmap(z)),E.isScene===!0&&E.onAfterRender(S,E,V),St.resetDefaultState(),T=-1,M=null,b.pop(),b.length>0?(d=b[b.length-1],it===!0&&ct.setGlobalState(S.clippingPlanes,d.state.camera)):d=null,R.pop(),R.length>0?m=R[R.length-1]:m=null};function ta(E,V,J,tt){if(E.visible===!1)return;if(E.layers.test(V.layers)){if(E.isGroup)J=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(V);else if(E.isLight)d.pushLight(E),E.castShadow&&d.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||Vt.intersectsSprite(E)){tt&&Pt.setFromMatrixPosition(E.matrixWorld).applyMatrix4(ft);const bt=U.update(E),It=E.material;It.visible&&m.push(E,bt,It,J,Pt.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||Vt.intersectsObject(E))){const bt=U.update(E),It=E.material;if(tt&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Pt.copy(E.boundingSphere.center)):(bt.boundingSphere===null&&bt.computeBoundingSphere(),Pt.copy(bt.boundingSphere.center)),Pt.applyMatrix4(E.matrixWorld).applyMatrix4(ft)),Array.isArray(It)){const Dt=bt.groups;for(let Ht=0,kt=Dt.length;Ht<kt;Ht++){const Bt=Dt[Ht],Jt=It[Bt.materialIndex];Jt&&Jt.visible&&m.push(E,bt,Jt,J,Pt.z,Bt)}}else It.visible&&m.push(E,bt,It,J,Pt.z,null)}}const gt=E.children;for(let bt=0,It=gt.length;bt<It;bt++)ta(gt[bt],V,J,tt)}function Kc(E,V,J,tt){const G=E.opaque,gt=E.transmissive,bt=E.transparent;d.setupLightsView(J),it===!0&&ct.setGlobalState(S.clippingPlanes,J),tt&&I.viewport(A.copy(tt)),G.length>0&&Cr(G,V,J),gt.length>0&&Cr(gt,V,J),bt.length>0&&Cr(bt,V,J),I.buffers.depth.setTest(!0),I.buffers.depth.setMask(!0),I.buffers.color.setMask(!0),I.setPolygonOffset(!1)}function $c(E,V,J,tt){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[tt.id]===void 0&&(d.state.transmissionRenderTarget[tt.id]=new zi(1,1,{generateMipmaps:!0,type:L.has("EXT_color_buffer_half_float")||L.has("EXT_color_buffer_float")?br:Dn,minFilter:Di,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:te.workingColorSpace}));const gt=d.state.transmissionRenderTarget[tt.id],bt=tt.viewport||A;gt.setSize(bt.z*S.transmissionResolutionScale,bt.w*S.transmissionResolutionScale);const It=S.getRenderTarget(),Dt=S.getActiveCubeFace(),Ht=S.getActiveMipmapLevel();S.setRenderTarget(gt),S.getClearColor(Q),nt=S.getClearAlpha(),nt<1&&S.setClearColor(16777215,.5),S.clear(),le&&At.render(J);const kt=S.toneMapping;S.toneMapping=hi;const Bt=tt.viewport;if(tt.viewport!==void 0&&(tt.viewport=void 0),d.setupLightsView(tt),it===!0&&ct.setGlobalState(S.clippingPlanes,tt),Cr(E,J,tt),X.updateMultisampleRenderTarget(gt),X.updateRenderTargetMipmap(gt),L.has("WEBGL_multisampled_render_to_texture")===!1){let Jt=!1;for(let se=0,_e=V.length;se<_e;se++){const de=V[se],ae=de.object,zt=de.geometry,pe=de.material,Qt=de.group;if(pe.side===Xn&&ae.layers.test(tt.layers)){const Ke=pe.side;pe.side=Xe,pe.needsUpdate=!0,Zc(ae,J,tt,zt,pe,Qt),pe.side=Ke,pe.needsUpdate=!0,Jt=!0}}Jt===!0&&(X.updateMultisampleRenderTarget(gt),X.updateRenderTargetMipmap(gt))}S.setRenderTarget(It,Dt,Ht),S.setClearColor(Q,nt),Bt!==void 0&&(tt.viewport=Bt),S.toneMapping=kt}function Cr(E,V,J){const tt=V.isScene===!0?V.overrideMaterial:null;for(let G=0,gt=E.length;G<gt;G++){const bt=E[G],It=bt.object,Dt=bt.geometry,Ht=bt.group;let kt=bt.material;kt.allowOverride===!0&&tt!==null&&(kt=tt),It.layers.test(J.layers)&&Zc(It,V,J,Dt,kt,Ht)}}function Zc(E,V,J,tt,G,gt){E.onBeforeRender(S,V,J,tt,G,gt),E.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),G.onBeforeRender(S,V,J,tt,E,gt),G.transparent===!0&&G.side===Xn&&G.forceSinglePass===!1?(G.side=Xe,G.needsUpdate=!0,S.renderBufferDirect(J,V,tt,G,E,gt),G.side=pi,G.needsUpdate=!0,S.renderBufferDirect(J,V,tt,G,E,gt),G.side=Xn):S.renderBufferDirect(J,V,tt,G,E,gt),E.onAfterRender(S,V,J,tt,G,gt)}function Pr(E,V,J){V.isScene!==!0&&(V=Ot);const tt=k.get(E),G=d.state.lights,gt=d.state.shadowsArray,bt=G.state.version,It=W.getParameters(E,G.state,gt,V,J),Dt=W.getProgramCacheKey(It);let Ht=tt.programs;tt.environment=E.isMeshStandardMaterial?V.environment:null,tt.fog=V.fog,tt.envMap=(E.isMeshStandardMaterial?dt:st).get(E.envMap||tt.environment),tt.envMapRotation=tt.environment!==null&&E.envMap===null?V.environmentRotation:E.envMapRotation,Ht===void 0&&(E.addEventListener("dispose",at),Ht=new Map,tt.programs=Ht);let kt=Ht.get(Dt);if(kt!==void 0){if(tt.currentProgram===kt&&tt.lightsStateVersion===bt)return Qc(E,It),kt}else It.uniforms=W.getUniforms(E),E.onBeforeCompile(It,S),kt=W.acquireProgram(It,Dt),Ht.set(Dt,kt),tt.uniforms=It.uniforms;const Bt=tt.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Bt.clippingPlanes=ct.uniform),Qc(E,It),tt.needsLights=xp(E),tt.lightsStateVersion=bt,tt.needsLights&&(Bt.ambientLightColor.value=G.state.ambient,Bt.lightProbe.value=G.state.probe,Bt.directionalLights.value=G.state.directional,Bt.directionalLightShadows.value=G.state.directionalShadow,Bt.spotLights.value=G.state.spot,Bt.spotLightShadows.value=G.state.spotShadow,Bt.rectAreaLights.value=G.state.rectArea,Bt.ltc_1.value=G.state.rectAreaLTC1,Bt.ltc_2.value=G.state.rectAreaLTC2,Bt.pointLights.value=G.state.point,Bt.pointLightShadows.value=G.state.pointShadow,Bt.hemisphereLights.value=G.state.hemi,Bt.directionalShadowMap.value=G.state.directionalShadowMap,Bt.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Bt.spotShadowMap.value=G.state.spotShadowMap,Bt.spotLightMatrix.value=G.state.spotLightMatrix,Bt.spotLightMap.value=G.state.spotLightMap,Bt.pointShadowMap.value=G.state.pointShadowMap,Bt.pointShadowMatrix.value=G.state.pointShadowMatrix),tt.currentProgram=kt,tt.uniformsList=null,kt}function Jc(E){if(E.uniformsList===null){const V=E.currentProgram.getUniforms();E.uniformsList=_o.seqWithValue(V.seq,E.uniforms)}return E.uniformsList}function Qc(E,V){const J=k.get(E);J.outputColorSpace=V.outputColorSpace,J.batching=V.batching,J.batchingColor=V.batchingColor,J.instancing=V.instancing,J.instancingColor=V.instancingColor,J.instancingMorph=V.instancingMorph,J.skinning=V.skinning,J.morphTargets=V.morphTargets,J.morphNormals=V.morphNormals,J.morphColors=V.morphColors,J.morphTargetsCount=V.morphTargetsCount,J.numClippingPlanes=V.numClippingPlanes,J.numIntersection=V.numClipIntersection,J.vertexAlphas=V.vertexAlphas,J.vertexTangents=V.vertexTangents,J.toneMapping=V.toneMapping}function _p(E,V,J,tt,G){V.isScene!==!0&&(V=Ot),X.resetTextureUnits();const gt=V.fog,bt=tt.isMeshStandardMaterial?V.environment:null,It=z===null?S.outputColorSpace:z.isXRRenderTarget===!0?z.texture.colorSpace:Ts,Dt=(tt.isMeshStandardMaterial?dt:st).get(tt.envMap||bt),Ht=tt.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,kt=!!J.attributes.tangent&&(!!tt.normalMap||tt.anisotropy>0),Bt=!!J.morphAttributes.position,Jt=!!J.morphAttributes.normal,se=!!J.morphAttributes.color;let _e=hi;tt.toneMapped&&(z===null||z.isXRRenderTarget===!0)&&(_e=S.toneMapping);const de=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,ae=de!==void 0?de.length:0,zt=k.get(tt),pe=d.state.lights;if(it===!0&&(ut===!0||E!==M)){const Ue=E===M&&tt.id===T;ct.setState(tt,E,Ue)}let Qt=!1;tt.version===zt.__version?(zt.needsLights&&zt.lightsStateVersion!==pe.state.version||zt.outputColorSpace!==It||G.isBatchedMesh&&zt.batching===!1||!G.isBatchedMesh&&zt.batching===!0||G.isBatchedMesh&&zt.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&zt.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&zt.instancing===!1||!G.isInstancedMesh&&zt.instancing===!0||G.isSkinnedMesh&&zt.skinning===!1||!G.isSkinnedMesh&&zt.skinning===!0||G.isInstancedMesh&&zt.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&zt.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&zt.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&zt.instancingMorph===!1&&G.morphTexture!==null||zt.envMap!==Dt||tt.fog===!0&&zt.fog!==gt||zt.numClippingPlanes!==void 0&&(zt.numClippingPlanes!==ct.numPlanes||zt.numIntersection!==ct.numIntersection)||zt.vertexAlphas!==Ht||zt.vertexTangents!==kt||zt.morphTargets!==Bt||zt.morphNormals!==Jt||zt.morphColors!==se||zt.toneMapping!==_e||zt.morphTargetsCount!==ae)&&(Qt=!0):(Qt=!0,zt.__version=tt.version);let Ke=zt.currentProgram;Qt===!0&&(Ke=Pr(tt,V,G));let Xi=!1,$e=!1,Ns=!1;const me=Ke.getUniforms(),en=zt.uniforms;if(I.useProgram(Ke.program)&&(Xi=!0,$e=!0,Ns=!0),tt.id!==T&&(T=tt.id,$e=!0),Xi||M!==E){I.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),me.setValue(x,"projectionMatrix",E.projectionMatrix),me.setValue(x,"viewMatrix",E.matrixWorldInverse);const ke=me.map.cameraPosition;ke!==void 0&&ke.setValue(x,Ct.setFromMatrixPosition(E.matrixWorld)),O.logarithmicDepthBuffer&&me.setValue(x,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(tt.isMeshPhongMaterial||tt.isMeshToonMaterial||tt.isMeshLambertMaterial||tt.isMeshBasicMaterial||tt.isMeshStandardMaterial||tt.isShaderMaterial)&&me.setValue(x,"isOrthographic",E.isOrthographicCamera===!0),M!==E&&(M=E,$e=!0,Ns=!0)}if(G.isSkinnedMesh){me.setOptional(x,G,"bindMatrix"),me.setOptional(x,G,"bindMatrixInverse");const Ue=G.skeleton;Ue&&(Ue.boneTexture===null&&Ue.computeBoneTexture(),me.setValue(x,"boneTexture",Ue.boneTexture,X))}G.isBatchedMesh&&(me.setOptional(x,G,"batchingTexture"),me.setValue(x,"batchingTexture",G._matricesTexture,X),me.setOptional(x,G,"batchingIdTexture"),me.setValue(x,"batchingIdTexture",G._indirectTexture,X),me.setOptional(x,G,"batchingColorTexture"),G._colorsTexture!==null&&me.setValue(x,"batchingColorTexture",G._colorsTexture,X));const nn=J.morphAttributes;if((nn.position!==void 0||nn.normal!==void 0||nn.color!==void 0)&&ht.update(G,J,Ke),($e||zt.receiveShadow!==G.receiveShadow)&&(zt.receiveShadow=G.receiveShadow,me.setValue(x,"receiveShadow",G.receiveShadow)),tt.isMeshGouraudMaterial&&tt.envMap!==null&&(en.envMap.value=Dt,en.flipEnvMap.value=Dt.isCubeTexture&&Dt.isRenderTargetTexture===!1?-1:1),tt.isMeshStandardMaterial&&tt.envMap===null&&V.environment!==null&&(en.envMapIntensity.value=V.environmentIntensity),$e&&(me.setValue(x,"toneMappingExposure",S.toneMappingExposure),zt.needsLights&&vp(en,Ns),gt&&tt.fog===!0&&rt.refreshFogUniforms(en,gt),rt.refreshMaterialUniforms(en,tt,H,Z,d.state.transmissionRenderTarget[E.id]),_o.upload(x,Jc(zt),en,X)),tt.isShaderMaterial&&tt.uniformsNeedUpdate===!0&&(_o.upload(x,Jc(zt),en,X),tt.uniformsNeedUpdate=!1),tt.isSpriteMaterial&&me.setValue(x,"center",G.center),me.setValue(x,"modelViewMatrix",G.modelViewMatrix),me.setValue(x,"normalMatrix",G.normalMatrix),me.setValue(x,"modelMatrix",G.matrixWorld),tt.isShaderMaterial||tt.isRawShaderMaterial){const Ue=tt.uniformsGroups;for(let ke=0,ea=Ue.length;ke<ea;ke++){const _i=Ue[ke];Gt.update(_i,Ke),Gt.bind(_i,Ke)}}return Ke}function vp(E,V){E.ambientLightColor.needsUpdate=V,E.lightProbe.needsUpdate=V,E.directionalLights.needsUpdate=V,E.directionalLightShadows.needsUpdate=V,E.pointLights.needsUpdate=V,E.pointLightShadows.needsUpdate=V,E.spotLights.needsUpdate=V,E.spotLightShadows.needsUpdate=V,E.rectAreaLights.needsUpdate=V,E.hemisphereLights.needsUpdate=V}function xp(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return N},this.getActiveMipmapLevel=function(){return D},this.getRenderTarget=function(){return z},this.setRenderTargetTextures=function(E,V,J){const tt=k.get(E);tt.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,tt.__autoAllocateDepthBuffer===!1&&(tt.__useRenderToTexture=!1),k.get(E.texture).__webglTexture=V,k.get(E.depthTexture).__webglTexture=tt.__autoAllocateDepthBuffer?void 0:J,tt.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,V){const J=k.get(E);J.__webglFramebuffer=V,J.__useDefaultFramebuffer=V===void 0};const Sp=x.createFramebuffer();this.setRenderTarget=function(E,V=0,J=0){z=E,N=V,D=J;let tt=!0,G=null,gt=!1,bt=!1;if(E){const Dt=k.get(E);if(Dt.__useDefaultFramebuffer!==void 0)I.bindFramebuffer(x.FRAMEBUFFER,null),tt=!1;else if(Dt.__webglFramebuffer===void 0)X.setupRenderTarget(E);else if(Dt.__hasExternalTextures)X.rebindTextures(E,k.get(E.texture).__webglTexture,k.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const Bt=E.depthTexture;if(Dt.__boundDepthTexture!==Bt){if(Bt!==null&&k.has(Bt)&&(E.width!==Bt.image.width||E.height!==Bt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");X.setupDepthRenderbuffer(E)}}const Ht=E.texture;(Ht.isData3DTexture||Ht.isDataArrayTexture||Ht.isCompressedArrayTexture)&&(bt=!0);const kt=k.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(kt[V])?G=kt[V][J]:G=kt[V],gt=!0):E.samples>0&&X.useMultisampledRTT(E)===!1?G=k.get(E).__webglMultisampledFramebuffer:Array.isArray(kt)?G=kt[J]:G=kt,A.copy(E.viewport),q.copy(E.scissor),Y=E.scissorTest}else A.copy(pt).multiplyScalar(H).floor(),q.copy(Rt).multiplyScalar(H).floor(),Y=Ft;if(J!==0&&(G=Sp),I.bindFramebuffer(x.FRAMEBUFFER,G)&&tt&&I.drawBuffers(E,G),I.viewport(A),I.scissor(q),I.setScissorTest(Y),gt){const Dt=k.get(E.texture);x.framebufferTexture2D(x.FRAMEBUFFER,x.COLOR_ATTACHMENT0,x.TEXTURE_CUBE_MAP_POSITIVE_X+V,Dt.__webglTexture,J)}else if(bt){const Dt=V;for(let Ht=0;Ht<E.textures.length;Ht++){const kt=k.get(E.textures[Ht]);x.framebufferTextureLayer(x.FRAMEBUFFER,x.COLOR_ATTACHMENT0+Ht,kt.__webglTexture,J,Dt)}}else if(E!==null&&J!==0){const Dt=k.get(E.texture);x.framebufferTexture2D(x.FRAMEBUFFER,x.COLOR_ATTACHMENT0,x.TEXTURE_2D,Dt.__webglTexture,J)}T=-1},this.readRenderTargetPixels=function(E,V,J,tt,G,gt,bt,It=0){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Dt=k.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&bt!==void 0&&(Dt=Dt[bt]),Dt){I.bindFramebuffer(x.FRAMEBUFFER,Dt);try{const Ht=E.textures[It],kt=Ht.format,Bt=Ht.type;if(!O.textureFormatReadable(kt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!O.textureTypeReadable(Bt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}V>=0&&V<=E.width-tt&&J>=0&&J<=E.height-G&&(E.textures.length>1&&x.readBuffer(x.COLOR_ATTACHMENT0+It),x.readPixels(V,J,tt,G,wt.convert(kt),wt.convert(Bt),gt))}finally{const Ht=z!==null?k.get(z).__webglFramebuffer:null;I.bindFramebuffer(x.FRAMEBUFFER,Ht)}}},this.readRenderTargetPixelsAsync=async function(E,V,J,tt,G,gt,bt,It=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Dt=k.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&bt!==void 0&&(Dt=Dt[bt]),Dt)if(V>=0&&V<=E.width-tt&&J>=0&&J<=E.height-G){I.bindFramebuffer(x.FRAMEBUFFER,Dt);const Ht=E.textures[It],kt=Ht.format,Bt=Ht.type;if(!O.textureFormatReadable(kt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!O.textureTypeReadable(Bt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Jt=x.createBuffer();x.bindBuffer(x.PIXEL_PACK_BUFFER,Jt),x.bufferData(x.PIXEL_PACK_BUFFER,gt.byteLength,x.STREAM_READ),E.textures.length>1&&x.readBuffer(x.COLOR_ATTACHMENT0+It),x.readPixels(V,J,tt,G,wt.convert(kt),wt.convert(Bt),0);const se=z!==null?k.get(z).__webglFramebuffer:null;I.bindFramebuffer(x.FRAMEBUFFER,se);const _e=x.fenceSync(x.SYNC_GPU_COMMANDS_COMPLETE,0);return x.flush(),await t0(x,_e,4),x.bindBuffer(x.PIXEL_PACK_BUFFER,Jt),x.getBufferSubData(x.PIXEL_PACK_BUFFER,0,gt),x.deleteBuffer(Jt),x.deleteSync(_e),gt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,V=null,J=0){const tt=Math.pow(2,-J),G=Math.floor(E.image.width*tt),gt=Math.floor(E.image.height*tt),bt=V!==null?V.x:0,It=V!==null?V.y:0;X.setTexture2D(E,0),x.copyTexSubImage2D(x.TEXTURE_2D,J,0,0,bt,It,G,gt),I.unbindTexture()};const yp=x.createFramebuffer(),Mp=x.createFramebuffer();this.copyTextureToTexture=function(E,V,J=null,tt=null,G=0,gt=null){gt===null&&(G!==0?(xs("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),gt=G,G=0):gt=0);let bt,It,Dt,Ht,kt,Bt,Jt,se,_e;const de=E.isCompressedTexture?E.mipmaps[gt]:E.image;if(J!==null)bt=J.max.x-J.min.x,It=J.max.y-J.min.y,Dt=J.isBox3?J.max.z-J.min.z:1,Ht=J.min.x,kt=J.min.y,Bt=J.isBox3?J.min.z:0;else{const nn=Math.pow(2,-G);bt=Math.floor(de.width*nn),It=Math.floor(de.height*nn),E.isDataArrayTexture?Dt=de.depth:E.isData3DTexture?Dt=Math.floor(de.depth*nn):Dt=1,Ht=0,kt=0,Bt=0}tt!==null?(Jt=tt.x,se=tt.y,_e=tt.z):(Jt=0,se=0,_e=0);const ae=wt.convert(V.format),zt=wt.convert(V.type);let pe;V.isData3DTexture?(X.setTexture3D(V,0),pe=x.TEXTURE_3D):V.isDataArrayTexture||V.isCompressedArrayTexture?(X.setTexture2DArray(V,0),pe=x.TEXTURE_2D_ARRAY):(X.setTexture2D(V,0),pe=x.TEXTURE_2D),x.pixelStorei(x.UNPACK_FLIP_Y_WEBGL,V.flipY),x.pixelStorei(x.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),x.pixelStorei(x.UNPACK_ALIGNMENT,V.unpackAlignment);const Qt=x.getParameter(x.UNPACK_ROW_LENGTH),Ke=x.getParameter(x.UNPACK_IMAGE_HEIGHT),Xi=x.getParameter(x.UNPACK_SKIP_PIXELS),$e=x.getParameter(x.UNPACK_SKIP_ROWS),Ns=x.getParameter(x.UNPACK_SKIP_IMAGES);x.pixelStorei(x.UNPACK_ROW_LENGTH,de.width),x.pixelStorei(x.UNPACK_IMAGE_HEIGHT,de.height),x.pixelStorei(x.UNPACK_SKIP_PIXELS,Ht),x.pixelStorei(x.UNPACK_SKIP_ROWS,kt),x.pixelStorei(x.UNPACK_SKIP_IMAGES,Bt);const me=E.isDataArrayTexture||E.isData3DTexture,en=V.isDataArrayTexture||V.isData3DTexture;if(E.isDepthTexture){const nn=k.get(E),Ue=k.get(V),ke=k.get(nn.__renderTarget),ea=k.get(Ue.__renderTarget);I.bindFramebuffer(x.READ_FRAMEBUFFER,ke.__webglFramebuffer),I.bindFramebuffer(x.DRAW_FRAMEBUFFER,ea.__webglFramebuffer);for(let _i=0;_i<Dt;_i++)me&&(x.framebufferTextureLayer(x.READ_FRAMEBUFFER,x.COLOR_ATTACHMENT0,k.get(E).__webglTexture,G,Bt+_i),x.framebufferTextureLayer(x.DRAW_FRAMEBUFFER,x.COLOR_ATTACHMENT0,k.get(V).__webglTexture,gt,_e+_i)),x.blitFramebuffer(Ht,kt,bt,It,Jt,se,bt,It,x.DEPTH_BUFFER_BIT,x.NEAREST);I.bindFramebuffer(x.READ_FRAMEBUFFER,null),I.bindFramebuffer(x.DRAW_FRAMEBUFFER,null)}else if(G!==0||E.isRenderTargetTexture||k.has(E)){const nn=k.get(E),Ue=k.get(V);I.bindFramebuffer(x.READ_FRAMEBUFFER,yp),I.bindFramebuffer(x.DRAW_FRAMEBUFFER,Mp);for(let ke=0;ke<Dt;ke++)me?x.framebufferTextureLayer(x.READ_FRAMEBUFFER,x.COLOR_ATTACHMENT0,nn.__webglTexture,G,Bt+ke):x.framebufferTexture2D(x.READ_FRAMEBUFFER,x.COLOR_ATTACHMENT0,x.TEXTURE_2D,nn.__webglTexture,G),en?x.framebufferTextureLayer(x.DRAW_FRAMEBUFFER,x.COLOR_ATTACHMENT0,Ue.__webglTexture,gt,_e+ke):x.framebufferTexture2D(x.DRAW_FRAMEBUFFER,x.COLOR_ATTACHMENT0,x.TEXTURE_2D,Ue.__webglTexture,gt),G!==0?x.blitFramebuffer(Ht,kt,bt,It,Jt,se,bt,It,x.COLOR_BUFFER_BIT,x.NEAREST):en?x.copyTexSubImage3D(pe,gt,Jt,se,_e+ke,Ht,kt,bt,It):x.copyTexSubImage2D(pe,gt,Jt,se,Ht,kt,bt,It);I.bindFramebuffer(x.READ_FRAMEBUFFER,null),I.bindFramebuffer(x.DRAW_FRAMEBUFFER,null)}else en?E.isDataTexture||E.isData3DTexture?x.texSubImage3D(pe,gt,Jt,se,_e,bt,It,Dt,ae,zt,de.data):V.isCompressedArrayTexture?x.compressedTexSubImage3D(pe,gt,Jt,se,_e,bt,It,Dt,ae,de.data):x.texSubImage3D(pe,gt,Jt,se,_e,bt,It,Dt,ae,zt,de):E.isDataTexture?x.texSubImage2D(x.TEXTURE_2D,gt,Jt,se,bt,It,ae,zt,de.data):E.isCompressedTexture?x.compressedTexSubImage2D(x.TEXTURE_2D,gt,Jt,se,de.width,de.height,ae,de.data):x.texSubImage2D(x.TEXTURE_2D,gt,Jt,se,bt,It,ae,zt,de);x.pixelStorei(x.UNPACK_ROW_LENGTH,Qt),x.pixelStorei(x.UNPACK_IMAGE_HEIGHT,Ke),x.pixelStorei(x.UNPACK_SKIP_PIXELS,Xi),x.pixelStorei(x.UNPACK_SKIP_ROWS,$e),x.pixelStorei(x.UNPACK_SKIP_IMAGES,Ns),gt===0&&V.generateMipmaps&&x.generateMipmap(pe),I.unbindTexture()},this.copyTextureToTexture3D=function(E,V,J=null,tt=null,G=0){return xs('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(E,V,J,tt,G)},this.initRenderTarget=function(E){k.get(E).__webglFramebuffer===void 0&&X.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?X.setTextureCube(E,0):E.isData3DTexture?X.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?X.setTexture2DArray(E,0):X.setTexture2D(E,0),I.unbindTexture()},this.resetState=function(){N=0,D=0,z=null,I.reset(),St.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return An}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=te._getDrawingBufferColorSpace(t),e.unpackColorSpace=te._getUnpackColorSpace()}}const Fh={type:"change"},Wc={type:"start"},Wd={type:"end"},oo=new Xo,Bh=new oi,iE=Math.cos(70*go.DEG2RAD),Me=new B,Ge=2*Math.PI,oe={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Ka=1e-6;class sE extends xv{constructor(t,e=null){super(t,e),this.state=oe.NONE,this.target=new B,this.cursor=new B,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:_s.ROTATE,MIDDLE:_s.DOLLY,RIGHT:_s.PAN},this.touches={ONE:us.ROTATE,TWO:us.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new B,this._lastQuaternion=new Bi,this._lastTargetPosition=new B,this._quat=new Bi().setFromUnitVectors(t.up,new B(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new hh,this._sphericalDelta=new hh,this._scale=1,this._panOffset=new B,this._rotateStart=new vt,this._rotateEnd=new vt,this._rotateDelta=new vt,this._panStart=new vt,this._panEnd=new vt,this._panDelta=new vt,this._dollyStart=new vt,this._dollyEnd=new vt,this._dollyDelta=new vt,this._dollyDirection=new B,this._mouse=new vt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=oE.bind(this),this._onPointerDown=rE.bind(this),this._onPointerUp=aE.bind(this),this._onContextMenu=pE.bind(this),this._onMouseWheel=uE.bind(this),this._onKeyDown=hE.bind(this),this._onTouchStart=fE.bind(this),this._onTouchMove=dE.bind(this),this._onMouseDown=lE.bind(this),this._onMouseMove=cE.bind(this),this._interceptControlDown=mE.bind(this),this._interceptControlUp=gE.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Fh),this.update(),this.state=oe.NONE}update(t=null){const e=this.object.position;Me.copy(e).sub(this.target),Me.applyQuaternion(this._quat),this._spherical.setFromVector3(Me),this.autoRotate&&this.state===oe.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=Ge:i>Math.PI&&(i-=Ge),s<-Math.PI?s+=Ge:s>Math.PI&&(s-=Ge),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Me.setFromSpherical(this._spherical),Me.applyQuaternion(this._quatInverse),e.copy(this.target).add(Me),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=Me.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const a=new B(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new B(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Me.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(oo.origin.copy(this.object.position),oo.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(oo.direction))<iE?this.object.lookAt(this.target):(Bh.setFromNormalAndCoplanarPoint(this.object.up,this.target),oo.intersectPlane(Bh,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Ka||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Ka||this._lastTargetPosition.distanceToSquared(this.target)>Ka?(this.dispatchEvent(Fh),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?Ge/60*this.autoRotateSpeed*t:Ge/60/60*this.autoRotateSpeed}_getZoomScale(t){const e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Me.setFromMatrixColumn(e,0),Me.multiplyScalar(-t),this._panOffset.add(Me)}_panUp(t,e){this.screenSpacePanning===!0?Me.setFromMatrixColumn(e,1):(Me.setFromMatrixColumn(e,0),Me.crossVectors(this.object.up,Me)),Me.multiplyScalar(t),this._panOffset.add(Me)}_pan(t,e){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Me.copy(s).sub(this.target);let r=Me.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/i.clientHeight,this.object.matrix),this._panUp(2*e*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=t-i.left,r=e-i.top,o=i.width,a=i.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientX),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Ge*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ge*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(Ge*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-Ge*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(Ge*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-Ge*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(i,s)}}_handleTouchStartDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{const i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),r=.5*(t.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const e=this.domElement;this._rotateLeft(Ge*this._rotateDelta.x/e.clientHeight),this._rotateUp(Ge*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{const e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){const e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(t.pageX+e.x)*.5,a=(t.pageY+e.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new vt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){const e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){const e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function rE(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function oE(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function aE(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Wd),this.state=oe.NONE;break;case 1:const t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function lE(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case _s.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=oe.DOLLY;break;case _s.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=oe.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=oe.ROTATE}break;case _s.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=oe.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=oe.PAN}break;default:this.state=oe.NONE}this.state!==oe.NONE&&this.dispatchEvent(Wc)}function cE(n){switch(this.state){case oe.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case oe.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case oe.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function uE(n){this.enabled===!1||this.enableZoom===!1||this.state!==oe.NONE||(n.preventDefault(),this.dispatchEvent(Wc),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(Wd))}function hE(n){this.enabled!==!1&&this._handleKeyDown(n)}function fE(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case us.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=oe.TOUCH_ROTATE;break;case us.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=oe.TOUCH_PAN;break;default:this.state=oe.NONE}break;case 2:switch(this.touches.TWO){case us.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=oe.TOUCH_DOLLY_PAN;break;case us.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=oe.TOUCH_DOLLY_ROTATE;break;default:this.state=oe.NONE}break;default:this.state=oe.NONE}this.state!==oe.NONE&&this.dispatchEvent(Wc)}function dE(n){switch(this._trackPointer(n),this.state){case oe.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case oe.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case oe.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case oe.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=oe.NONE}}function pE(n){this.enabled!==!1&&n.preventDefault()}function mE(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function gE(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const _E=.5,vE=.2,ii=.1,xE={"bc1c5554-bcc6-499f-884d-25b8b5e42ad8":[0,0,0,1],"8daaefe1-444b-4635-a639-550f760504c3":[100,0,0,1],"05ce1485-31b1-4ba1-9eb7-532bc8e0f7d9":[200,0,0,1],"19b87fc6-cf01-4909-9e5b-9caa419528be":[300,0,0,1],"50fdc831-38d7-4e74-8c2d-bd194b26476a":[400,0,0,1],"9c7a0f84-03b0-40b0-8fb0-992e1008c11e":[0,250,0,1],"e9e0d43e-f419-4f97-99d4-694c06d738d8":[150,250,0,1],"bce65150-c95a-40cb-a59e-9774f5e1b249":[350,250,0,1],"a9781b13-37ac-4dfd-a691-a402309dd15a":[300,180,0,1],"625d7e06-0632-49ce-9b5b-cb7755adfa2c":[400,180,0,1],"a6010bc2-5157-4c33-8cac-bce9bb01bc1c":[0,400,0,1],"176fcafb-6d1d-4043-926e-302b1fec4c45":[100,400,0,1],"0db33e18-c2a0-43aa-a0f4-83ecd5ce7f81":[200,400,0,1],"81ab6a1b-5c43-499e-b06e-9289745f2aaf":[300,400,0,1]};function Xd(n,t){return function(){return n.apply(t,arguments)}}const{toString:SE}=Object.prototype,{getPrototypeOf:Xc}=Object,{iterator:jo,toStringTag:qd}=Symbol,Ko=(n=>t=>{const e=SE.call(t);return n[e]||(n[e]=e.slice(8,-1).toLowerCase())})(Object.create(null)),_n=n=>(n=n.toLowerCase(),t=>Ko(t)===n),$o=n=>t=>typeof t===n,{isArray:Us}=Array,yr=$o("undefined");function Tr(n){return n!==null&&!yr(n)&&n.constructor!==null&&!yr(n.constructor)&&Ye(n.constructor.isBuffer)&&n.constructor.isBuffer(n)}const Yd=_n("ArrayBuffer");function yE(n){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(n):t=n&&n.buffer&&Yd(n.buffer),t}const ME=$o("string"),Ye=$o("function"),jd=$o("number"),Ar=n=>n!==null&&typeof n=="object",EE=n=>n===!0||n===!1,vo=n=>{if(Ko(n)!=="object")return!1;const t=Xc(n);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(qd in n)&&!(jo in n)},bE=n=>{if(!Ar(n)||Tr(n))return!1;try{return Object.keys(n).length===0&&Object.getPrototypeOf(n)===Object.prototype}catch{return!1}},TE=_n("Date"),AE=_n("File"),wE=_n("Blob"),RE=_n("FileList"),CE=n=>Ar(n)&&Ye(n.pipe),PE=n=>{let t;return n&&(typeof FormData=="function"&&n instanceof FormData||Ye(n.append)&&((t=Ko(n))==="formdata"||t==="object"&&Ye(n.toString)&&n.toString()==="[object FormData]"))},DE=_n("URLSearchParams"),[LE,UE,IE,NE]=["ReadableStream","Request","Response","Headers"].map(_n),OE=n=>n.trim?n.trim():n.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function wr(n,t,{allOwnKeys:e=!1}={}){if(n===null||typeof n>"u")return;let i,s;if(typeof n!="object"&&(n=[n]),Us(n))for(i=0,s=n.length;i<s;i++)t.call(null,n[i],i,n);else{if(Tr(n))return;const r=e?Object.getOwnPropertyNames(n):Object.keys(n),o=r.length;let a;for(i=0;i<o;i++)a=r[i],t.call(null,n[a],a,n)}}function Kd(n,t){if(Tr(n))return null;t=t.toLowerCase();const e=Object.keys(n);let i=e.length,s;for(;i-- >0;)if(s=e[i],t===s.toLowerCase())return s;return null}const Ui=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global,$d=n=>!yr(n)&&n!==Ui;function nc(){const{caseless:n}=$d(this)&&this||{},t={},e=(i,s)=>{const r=n&&Kd(t,s)||s;vo(t[r])&&vo(i)?t[r]=nc(t[r],i):vo(i)?t[r]=nc({},i):Us(i)?t[r]=i.slice():t[r]=i};for(let i=0,s=arguments.length;i<s;i++)arguments[i]&&wr(arguments[i],e);return t}const FE=(n,t,e,{allOwnKeys:i}={})=>(wr(t,(s,r)=>{e&&Ye(s)?n[r]=Xd(s,e):n[r]=s},{allOwnKeys:i}),n),BE=n=>(n.charCodeAt(0)===65279&&(n=n.slice(1)),n),zE=(n,t,e,i)=>{n.prototype=Object.create(t.prototype,i),n.prototype.constructor=n,Object.defineProperty(n,"super",{value:t.prototype}),e&&Object.assign(n.prototype,e)},HE=(n,t,e,i)=>{let s,r,o;const a={};if(t=t||{},n==null)return t;do{for(s=Object.getOwnPropertyNames(n),r=s.length;r-- >0;)o=s[r],(!i||i(o,n,t))&&!a[o]&&(t[o]=n[o],a[o]=!0);n=e!==!1&&Xc(n)}while(n&&(!e||e(n,t))&&n!==Object.prototype);return t},VE=(n,t,e)=>{n=String(n),(e===void 0||e>n.length)&&(e=n.length),e-=t.length;const i=n.indexOf(t,e);return i!==-1&&i===e},kE=n=>{if(!n)return null;if(Us(n))return n;let t=n.length;if(!jd(t))return null;const e=new Array(t);for(;t-- >0;)e[t]=n[t];return e},GE=(n=>t=>n&&t instanceof n)(typeof Uint8Array<"u"&&Xc(Uint8Array)),WE=(n,t)=>{const i=(n&&n[jo]).call(n);let s;for(;(s=i.next())&&!s.done;){const r=s.value;t.call(n,r[0],r[1])}},XE=(n,t)=>{let e;const i=[];for(;(e=n.exec(t))!==null;)i.push(e);return i},qE=_n("HTMLFormElement"),YE=n=>n.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(e,i,s){return i.toUpperCase()+s}),zh=(({hasOwnProperty:n})=>(t,e)=>n.call(t,e))(Object.prototype),jE=_n("RegExp"),Zd=(n,t)=>{const e=Object.getOwnPropertyDescriptors(n),i={};wr(e,(s,r)=>{let o;(o=t(s,r,n))!==!1&&(i[r]=o||s)}),Object.defineProperties(n,i)},KE=n=>{Zd(n,(t,e)=>{if(Ye(n)&&["arguments","caller","callee"].indexOf(e)!==-1)return!1;const i=n[e];if(Ye(i)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+e+"'")})}})},$E=(n,t)=>{const e={},i=s=>{s.forEach(r=>{e[r]=!0})};return Us(n)?i(n):i(String(n).split(t)),e},ZE=()=>{},JE=(n,t)=>n!=null&&Number.isFinite(n=+n)?n:t;function QE(n){return!!(n&&Ye(n.append)&&n[qd]==="FormData"&&n[jo])}const tb=n=>{const t=new Array(10),e=(i,s)=>{if(Ar(i)){if(t.indexOf(i)>=0)return;if(Tr(i))return i;if(!("toJSON"in i)){t[s]=i;const r=Us(i)?[]:{};return wr(i,(o,a)=>{const l=e(o,s+1);!yr(l)&&(r[a]=l)}),t[s]=void 0,r}}return i};return e(n,0)},eb=_n("AsyncFunction"),nb=n=>n&&(Ar(n)||Ye(n))&&Ye(n.then)&&Ye(n.catch),Jd=((n,t)=>n?setImmediate:t?((e,i)=>(Ui.addEventListener("message",({source:s,data:r})=>{s===Ui&&r===e&&i.length&&i.shift()()},!1),s=>{i.push(s),Ui.postMessage(e,"*")}))(`axios@${Math.random()}`,[]):e=>setTimeout(e))(typeof setImmediate=="function",Ye(Ui.postMessage)),ib=typeof queueMicrotask<"u"?queueMicrotask.bind(Ui):typeof process<"u"&&process.nextTick||Jd,sb=n=>n!=null&&Ye(n[jo]),et={isArray:Us,isArrayBuffer:Yd,isBuffer:Tr,isFormData:PE,isArrayBufferView:yE,isString:ME,isNumber:jd,isBoolean:EE,isObject:Ar,isPlainObject:vo,isEmptyObject:bE,isReadableStream:LE,isRequest:UE,isResponse:IE,isHeaders:NE,isUndefined:yr,isDate:TE,isFile:AE,isBlob:wE,isRegExp:jE,isFunction:Ye,isStream:CE,isURLSearchParams:DE,isTypedArray:GE,isFileList:RE,forEach:wr,merge:nc,extend:FE,trim:OE,stripBOM:BE,inherits:zE,toFlatObject:HE,kindOf:Ko,kindOfTest:_n,endsWith:VE,toArray:kE,forEachEntry:WE,matchAll:XE,isHTMLForm:qE,hasOwnProperty:zh,hasOwnProp:zh,reduceDescriptors:Zd,freezeMethods:KE,toObjectSet:$E,toCamelCase:YE,noop:ZE,toFiniteNumber:JE,findKey:Kd,global:Ui,isContextDefined:$d,isSpecCompliantForm:QE,toJSONObject:tb,isAsyncFn:eb,isThenable:nb,setImmediate:Jd,asap:ib,isIterable:sb};function Xt(n,t,e,i,s){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack,this.message=n,this.name="AxiosError",t&&(this.code=t),e&&(this.config=e),i&&(this.request=i),s&&(this.response=s,this.status=s.status?s.status:null)}et.inherits(Xt,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:et.toJSONObject(this.config),code:this.code,status:this.status}}});const Qd=Xt.prototype,tp={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach(n=>{tp[n]={value:n}});Object.defineProperties(Xt,tp);Object.defineProperty(Qd,"isAxiosError",{value:!0});Xt.from=(n,t,e,i,s,r)=>{const o=Object.create(Qd);return et.toFlatObject(n,o,function(l){return l!==Error.prototype},a=>a!=="isAxiosError"),Xt.call(o,n.message,t,e,i,s),o.cause=n,o.name=n.name,r&&Object.assign(o,r),o};const rb=null;function ic(n){return et.isPlainObject(n)||et.isArray(n)}function ep(n){return et.endsWith(n,"[]")?n.slice(0,-2):n}function Hh(n,t,e){return n?n.concat(t).map(function(s,r){return s=ep(s),!e&&r?"["+s+"]":s}).join(e?".":""):t}function ob(n){return et.isArray(n)&&!n.some(ic)}const ab=et.toFlatObject(et,{},null,function(t){return/^is[A-Z]/.test(t)});function Zo(n,t,e){if(!et.isObject(n))throw new TypeError("target must be an object");t=t||new FormData,e=et.toFlatObject(e,{metaTokens:!0,dots:!1,indexes:!1},!1,function(_,m){return!et.isUndefined(m[_])});const i=e.metaTokens,s=e.visitor||u,r=e.dots,o=e.indexes,l=(e.Blob||typeof Blob<"u"&&Blob)&&et.isSpecCompliantForm(t);if(!et.isFunction(s))throw new TypeError("visitor must be a function");function c(g){if(g===null)return"";if(et.isDate(g))return g.toISOString();if(et.isBoolean(g))return g.toString();if(!l&&et.isBlob(g))throw new Xt("Blob is not supported. Use a Buffer instead.");return et.isArrayBuffer(g)||et.isTypedArray(g)?l&&typeof Blob=="function"?new Blob([g]):Buffer.from(g):g}function u(g,_,m){let d=g;if(g&&!m&&typeof g=="object"){if(et.endsWith(_,"{}"))_=i?_:_.slice(0,-2),g=JSON.stringify(g);else if(et.isArray(g)&&ob(g)||(et.isFileList(g)||et.endsWith(_,"[]"))&&(d=et.toArray(g)))return _=ep(_),d.forEach(function(b,S){!(et.isUndefined(b)||b===null)&&t.append(o===!0?Hh([_],S,r):o===null?_:_+"[]",c(b))}),!1}return ic(g)?!0:(t.append(Hh(m,_,r),c(g)),!1)}const h=[],f=Object.assign(ab,{defaultVisitor:u,convertValue:c,isVisitable:ic});function p(g,_){if(!et.isUndefined(g)){if(h.indexOf(g)!==-1)throw Error("Circular reference detected in "+_.join("."));h.push(g),et.forEach(g,function(d,R){(!(et.isUndefined(d)||d===null)&&s.call(t,d,et.isString(R)?R.trim():R,_,f))===!0&&p(d,_?_.concat(R):[R])}),h.pop()}}if(!et.isObject(n))throw new TypeError("data must be an object");return p(n),t}function Vh(n){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(n).replace(/[!'()~]|%20|%00/g,function(i){return t[i]})}function qc(n,t){this._pairs=[],n&&Zo(n,this,t)}const np=qc.prototype;np.append=function(t,e){this._pairs.push([t,e])};np.toString=function(t){const e=t?function(i){return t.call(this,i,Vh)}:Vh;return this._pairs.map(function(s){return e(s[0])+"="+e(s[1])},"").join("&")};function lb(n){return encodeURIComponent(n).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function ip(n,t,e){if(!t)return n;const i=e&&e.encode||lb;et.isFunction(e)&&(e={serialize:e});const s=e&&e.serialize;let r;if(s?r=s(t,e):r=et.isURLSearchParams(t)?t.toString():new qc(t,e).toString(i),r){const o=n.indexOf("#");o!==-1&&(n=n.slice(0,o)),n+=(n.indexOf("?")===-1?"?":"&")+r}return n}class kh{constructor(){this.handlers=[]}use(t,e,i){return this.handlers.push({fulfilled:t,rejected:e,synchronous:i?i.synchronous:!1,runWhen:i?i.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){et.forEach(this.handlers,function(i){i!==null&&t(i)})}}const sp={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},cb=typeof URLSearchParams<"u"?URLSearchParams:qc,ub=typeof FormData<"u"?FormData:null,hb=typeof Blob<"u"?Blob:null,fb={isBrowser:!0,classes:{URLSearchParams:cb,FormData:ub,Blob:hb},protocols:["http","https","file","blob","url","data"]},Yc=typeof window<"u"&&typeof document<"u",sc=typeof navigator=="object"&&navigator||void 0,db=Yc&&(!sc||["ReactNative","NativeScript","NS"].indexOf(sc.product)<0),pb=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function",mb=Yc&&window.location.href||"http://localhost",gb=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:Yc,hasStandardBrowserEnv:db,hasStandardBrowserWebWorkerEnv:pb,navigator:sc,origin:mb},Symbol.toStringTag,{value:"Module"})),De={...gb,...fb};function _b(n,t){return Zo(n,new De.classes.URLSearchParams,{visitor:function(e,i,s,r){return De.isNode&&et.isBuffer(e)?(this.append(i,e.toString("base64")),!1):r.defaultVisitor.apply(this,arguments)},...t})}function vb(n){return et.matchAll(/\w+|\[(\w*)]/g,n).map(t=>t[0]==="[]"?"":t[1]||t[0])}function xb(n){const t={},e=Object.keys(n);let i;const s=e.length;let r;for(i=0;i<s;i++)r=e[i],t[r]=n[r];return t}function rp(n){function t(e,i,s,r){let o=e[r++];if(o==="__proto__")return!0;const a=Number.isFinite(+o),l=r>=e.length;return o=!o&&et.isArray(s)?s.length:o,l?(et.hasOwnProp(s,o)?s[o]=[s[o],i]:s[o]=i,!a):((!s[o]||!et.isObject(s[o]))&&(s[o]=[]),t(e,i,s[o],r)&&et.isArray(s[o])&&(s[o]=xb(s[o])),!a)}if(et.isFormData(n)&&et.isFunction(n.entries)){const e={};return et.forEachEntry(n,(i,s)=>{t(vb(i),s,e,0)}),e}return null}function Sb(n,t,e){if(et.isString(n))try{return(t||JSON.parse)(n),et.trim(n)}catch(i){if(i.name!=="SyntaxError")throw i}return(e||JSON.stringify)(n)}const Rr={transitional:sp,adapter:["xhr","http","fetch"],transformRequest:[function(t,e){const i=e.getContentType()||"",s=i.indexOf("application/json")>-1,r=et.isObject(t);if(r&&et.isHTMLForm(t)&&(t=new FormData(t)),et.isFormData(t))return s?JSON.stringify(rp(t)):t;if(et.isArrayBuffer(t)||et.isBuffer(t)||et.isStream(t)||et.isFile(t)||et.isBlob(t)||et.isReadableStream(t))return t;if(et.isArrayBufferView(t))return t.buffer;if(et.isURLSearchParams(t))return e.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let a;if(r){if(i.indexOf("application/x-www-form-urlencoded")>-1)return _b(t,this.formSerializer).toString();if((a=et.isFileList(t))||i.indexOf("multipart/form-data")>-1){const l=this.env&&this.env.FormData;return Zo(a?{"files[]":t}:t,l&&new l,this.formSerializer)}}return r||s?(e.setContentType("application/json",!1),Sb(t)):t}],transformResponse:[function(t){const e=this.transitional||Rr.transitional,i=e&&e.forcedJSONParsing,s=this.responseType==="json";if(et.isResponse(t)||et.isReadableStream(t))return t;if(t&&et.isString(t)&&(i&&!this.responseType||s)){const o=!(e&&e.silentJSONParsing)&&s;try{return JSON.parse(t)}catch(a){if(o)throw a.name==="SyntaxError"?Xt.from(a,Xt.ERR_BAD_RESPONSE,this,null,this.response):a}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:De.classes.FormData,Blob:De.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};et.forEach(["delete","get","head","post","put","patch"],n=>{Rr.headers[n]={}});const yb=et.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),Mb=n=>{const t={};let e,i,s;return n&&n.split(`
`).forEach(function(o){s=o.indexOf(":"),e=o.substring(0,s).trim().toLowerCase(),i=o.substring(s+1).trim(),!(!e||t[e]&&yb[e])&&(e==="set-cookie"?t[e]?t[e].push(i):t[e]=[i]:t[e]=t[e]?t[e]+", "+i:i)}),t},Gh=Symbol("internals");function Gs(n){return n&&String(n).trim().toLowerCase()}function xo(n){return n===!1||n==null?n:et.isArray(n)?n.map(xo):String(n)}function Eb(n){const t=Object.create(null),e=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let i;for(;i=e.exec(n);)t[i[1]]=i[2];return t}const bb=n=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(n.trim());function $a(n,t,e,i,s){if(et.isFunction(i))return i.call(this,t,e);if(s&&(t=e),!!et.isString(t)){if(et.isString(i))return t.indexOf(i)!==-1;if(et.isRegExp(i))return i.test(t)}}function Tb(n){return n.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,e,i)=>e.toUpperCase()+i)}function Ab(n,t){const e=et.toCamelCase(" "+t);["get","set","has"].forEach(i=>{Object.defineProperty(n,i+e,{value:function(s,r,o){return this[i].call(this,t,s,r,o)},configurable:!0})})}let je=class{constructor(t){t&&this.set(t)}set(t,e,i){const s=this;function r(a,l,c){const u=Gs(l);if(!u)throw new Error("header name must be a non-empty string");const h=et.findKey(s,u);(!h||s[h]===void 0||c===!0||c===void 0&&s[h]!==!1)&&(s[h||l]=xo(a))}const o=(a,l)=>et.forEach(a,(c,u)=>r(c,u,l));if(et.isPlainObject(t)||t instanceof this.constructor)o(t,e);else if(et.isString(t)&&(t=t.trim())&&!bb(t))o(Mb(t),e);else if(et.isObject(t)&&et.isIterable(t)){let a={},l,c;for(const u of t){if(!et.isArray(u))throw TypeError("Object iterator must return a key-value pair");a[c=u[0]]=(l=a[c])?et.isArray(l)?[...l,u[1]]:[l,u[1]]:u[1]}o(a,e)}else t!=null&&r(e,t,i);return this}get(t,e){if(t=Gs(t),t){const i=et.findKey(this,t);if(i){const s=this[i];if(!e)return s;if(e===!0)return Eb(s);if(et.isFunction(e))return e.call(this,s,i);if(et.isRegExp(e))return e.exec(s);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,e){if(t=Gs(t),t){const i=et.findKey(this,t);return!!(i&&this[i]!==void 0&&(!e||$a(this,this[i],i,e)))}return!1}delete(t,e){const i=this;let s=!1;function r(o){if(o=Gs(o),o){const a=et.findKey(i,o);a&&(!e||$a(i,i[a],a,e))&&(delete i[a],s=!0)}}return et.isArray(t)?t.forEach(r):r(t),s}clear(t){const e=Object.keys(this);let i=e.length,s=!1;for(;i--;){const r=e[i];(!t||$a(this,this[r],r,t,!0))&&(delete this[r],s=!0)}return s}normalize(t){const e=this,i={};return et.forEach(this,(s,r)=>{const o=et.findKey(i,r);if(o){e[o]=xo(s),delete e[r];return}const a=t?Tb(r):String(r).trim();a!==r&&delete e[r],e[a]=xo(s),i[a]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const e=Object.create(null);return et.forEach(this,(i,s)=>{i!=null&&i!==!1&&(e[s]=t&&et.isArray(i)?i.join(", "):i)}),e}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,e])=>t+": "+e).join(`
`)}getSetCookie(){return this.get("set-cookie")||[]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static concat(t,...e){const i=new this(t);return e.forEach(s=>i.set(s)),i}static accessor(t){const i=(this[Gh]=this[Gh]={accessors:{}}).accessors,s=this.prototype;function r(o){const a=Gs(o);i[a]||(Ab(s,o),i[a]=!0)}return et.isArray(t)?t.forEach(r):r(t),this}};je.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);et.reduceDescriptors(je.prototype,({value:n},t)=>{let e=t[0].toUpperCase()+t.slice(1);return{get:()=>n,set(i){this[e]=i}}});et.freezeMethods(je);function Za(n,t){const e=this||Rr,i=t||e,s=je.from(i.headers);let r=i.data;return et.forEach(n,function(a){r=a.call(e,r,s.normalize(),t?t.status:void 0)}),s.normalize(),r}function op(n){return!!(n&&n.__CANCEL__)}function Is(n,t,e){Xt.call(this,n??"canceled",Xt.ERR_CANCELED,t,e),this.name="CanceledError"}et.inherits(Is,Xt,{__CANCEL__:!0});function ap(n,t,e){const i=e.config.validateStatus;!e.status||!i||i(e.status)?n(e):t(new Xt("Request failed with status code "+e.status,[Xt.ERR_BAD_REQUEST,Xt.ERR_BAD_RESPONSE][Math.floor(e.status/100)-4],e.config,e.request,e))}function wb(n){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(n);return t&&t[1]||""}function Rb(n,t){n=n||10;const e=new Array(n),i=new Array(n);let s=0,r=0,o;return t=t!==void 0?t:1e3,function(l){const c=Date.now(),u=i[r];o||(o=c),e[s]=l,i[s]=c;let h=r,f=0;for(;h!==s;)f+=e[h++],h=h%n;if(s=(s+1)%n,s===r&&(r=(r+1)%n),c-o<t)return;const p=u&&c-u;return p?Math.round(f*1e3/p):void 0}}function Cb(n,t){let e=0,i=1e3/t,s,r;const o=(c,u=Date.now())=>{e=u,s=null,r&&(clearTimeout(r),r=null),n(...c)};return[(...c)=>{const u=Date.now(),h=u-e;h>=i?o(c,u):(s=c,r||(r=setTimeout(()=>{r=null,o(s)},i-h)))},()=>s&&o(s)]}const Lo=(n,t,e=3)=>{let i=0;const s=Rb(50,250);return Cb(r=>{const o=r.loaded,a=r.lengthComputable?r.total:void 0,l=o-i,c=s(l),u=o<=a;i=o;const h={loaded:o,total:a,progress:a?o/a:void 0,bytes:l,rate:c||void 0,estimated:c&&a&&u?(a-o)/c:void 0,event:r,lengthComputable:a!=null,[t?"download":"upload"]:!0};n(h)},e)},Wh=(n,t)=>{const e=n!=null;return[i=>t[0]({lengthComputable:e,total:n,loaded:i}),t[1]]},Xh=n=>(...t)=>et.asap(()=>n(...t)),Pb=De.hasStandardBrowserEnv?((n,t)=>e=>(e=new URL(e,De.origin),n.protocol===e.protocol&&n.host===e.host&&(t||n.port===e.port)))(new URL(De.origin),De.navigator&&/(msie|trident)/i.test(De.navigator.userAgent)):()=>!0,Db=De.hasStandardBrowserEnv?{write(n,t,e,i,s,r){const o=[n+"="+encodeURIComponent(t)];et.isNumber(e)&&o.push("expires="+new Date(e).toGMTString()),et.isString(i)&&o.push("path="+i),et.isString(s)&&o.push("domain="+s),r===!0&&o.push("secure"),document.cookie=o.join("; ")},read(n){const t=document.cookie.match(new RegExp("(^|;\\s*)("+n+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove(n){this.write(n,"",Date.now()-864e5)}}:{write(){},read(){return null},remove(){}};function Lb(n){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(n)}function Ub(n,t){return t?n.replace(/\/?\/$/,"")+"/"+t.replace(/^\/+/,""):n}function lp(n,t,e){let i=!Lb(t);return n&&(i||e==!1)?Ub(n,t):t}const qh=n=>n instanceof je?{...n}:n;function Vi(n,t){t=t||{};const e={};function i(c,u,h,f){return et.isPlainObject(c)&&et.isPlainObject(u)?et.merge.call({caseless:f},c,u):et.isPlainObject(u)?et.merge({},u):et.isArray(u)?u.slice():u}function s(c,u,h,f){if(et.isUndefined(u)){if(!et.isUndefined(c))return i(void 0,c,h,f)}else return i(c,u,h,f)}function r(c,u){if(!et.isUndefined(u))return i(void 0,u)}function o(c,u){if(et.isUndefined(u)){if(!et.isUndefined(c))return i(void 0,c)}else return i(void 0,u)}function a(c,u,h){if(h in t)return i(c,u);if(h in n)return i(void 0,c)}const l={url:r,method:r,data:r,baseURL:o,transformRequest:o,transformResponse:o,paramsSerializer:o,timeout:o,timeoutMessage:o,withCredentials:o,withXSRFToken:o,adapter:o,responseType:o,xsrfCookieName:o,xsrfHeaderName:o,onUploadProgress:o,onDownloadProgress:o,decompress:o,maxContentLength:o,maxBodyLength:o,beforeRedirect:o,transport:o,httpAgent:o,httpsAgent:o,cancelToken:o,socketPath:o,responseEncoding:o,validateStatus:a,headers:(c,u,h)=>s(qh(c),qh(u),h,!0)};return et.forEach(Object.keys({...n,...t}),function(u){const h=l[u]||s,f=h(n[u],t[u],u);et.isUndefined(f)&&h!==a||(e[u]=f)}),e}const cp=n=>{const t=Vi({},n);let{data:e,withXSRFToken:i,xsrfHeaderName:s,xsrfCookieName:r,headers:o,auth:a}=t;t.headers=o=je.from(o),t.url=ip(lp(t.baseURL,t.url,t.allowAbsoluteUrls),n.params,n.paramsSerializer),a&&o.set("Authorization","Basic "+btoa((a.username||"")+":"+(a.password?unescape(encodeURIComponent(a.password)):"")));let l;if(et.isFormData(e)){if(De.hasStandardBrowserEnv||De.hasStandardBrowserWebWorkerEnv)o.setContentType(void 0);else if((l=o.getContentType())!==!1){const[c,...u]=l?l.split(";").map(h=>h.trim()).filter(Boolean):[];o.setContentType([c||"multipart/form-data",...u].join("; "))}}if(De.hasStandardBrowserEnv&&(i&&et.isFunction(i)&&(i=i(t)),i||i!==!1&&Pb(t.url))){const c=s&&r&&Db.read(r);c&&o.set(s,c)}return t},Ib=typeof XMLHttpRequest<"u",Nb=Ib&&function(n){return new Promise(function(e,i){const s=cp(n);let r=s.data;const o=je.from(s.headers).normalize();let{responseType:a,onUploadProgress:l,onDownloadProgress:c}=s,u,h,f,p,g;function _(){p&&p(),g&&g(),s.cancelToken&&s.cancelToken.unsubscribe(u),s.signal&&s.signal.removeEventListener("abort",u)}let m=new XMLHttpRequest;m.open(s.method.toUpperCase(),s.url,!0),m.timeout=s.timeout;function d(){if(!m)return;const b=je.from("getAllResponseHeaders"in m&&m.getAllResponseHeaders()),P={data:!a||a==="text"||a==="json"?m.responseText:m.response,status:m.status,statusText:m.statusText,headers:b,config:n,request:m};ap(function(D){e(D),_()},function(D){i(D),_()},P),m=null}"onloadend"in m?m.onloadend=d:m.onreadystatechange=function(){!m||m.readyState!==4||m.status===0&&!(m.responseURL&&m.responseURL.indexOf("file:")===0)||setTimeout(d)},m.onabort=function(){m&&(i(new Xt("Request aborted",Xt.ECONNABORTED,n,m)),m=null)},m.onerror=function(){i(new Xt("Network Error",Xt.ERR_NETWORK,n,m)),m=null},m.ontimeout=function(){let S=s.timeout?"timeout of "+s.timeout+"ms exceeded":"timeout exceeded";const P=s.transitional||sp;s.timeoutErrorMessage&&(S=s.timeoutErrorMessage),i(new Xt(S,P.clarifyTimeoutError?Xt.ETIMEDOUT:Xt.ECONNABORTED,n,m)),m=null},r===void 0&&o.setContentType(null),"setRequestHeader"in m&&et.forEach(o.toJSON(),function(S,P){m.setRequestHeader(P,S)}),et.isUndefined(s.withCredentials)||(m.withCredentials=!!s.withCredentials),a&&a!=="json"&&(m.responseType=s.responseType),c&&([f,g]=Lo(c,!0),m.addEventListener("progress",f)),l&&m.upload&&([h,p]=Lo(l),m.upload.addEventListener("progress",h),m.upload.addEventListener("loadend",p)),(s.cancelToken||s.signal)&&(u=b=>{m&&(i(!b||b.type?new Is(null,n,m):b),m.abort(),m=null)},s.cancelToken&&s.cancelToken.subscribe(u),s.signal&&(s.signal.aborted?u():s.signal.addEventListener("abort",u)));const R=wb(s.url);if(R&&De.protocols.indexOf(R)===-1){i(new Xt("Unsupported protocol "+R+":",Xt.ERR_BAD_REQUEST,n));return}m.send(r||null)})},Ob=(n,t)=>{const{length:e}=n=n?n.filter(Boolean):[];if(t||e){let i=new AbortController,s;const r=function(c){if(!s){s=!0,a();const u=c instanceof Error?c:this.reason;i.abort(u instanceof Xt?u:new Is(u instanceof Error?u.message:u))}};let o=t&&setTimeout(()=>{o=null,r(new Xt(`timeout ${t} of ms exceeded`,Xt.ETIMEDOUT))},t);const a=()=>{n&&(o&&clearTimeout(o),o=null,n.forEach(c=>{c.unsubscribe?c.unsubscribe(r):c.removeEventListener("abort",r)}),n=null)};n.forEach(c=>c.addEventListener("abort",r));const{signal:l}=i;return l.unsubscribe=()=>et.asap(a),l}},Fb=function*(n,t){let e=n.byteLength;if(e<t){yield n;return}let i=0,s;for(;i<e;)s=i+t,yield n.slice(i,s),i=s},Bb=async function*(n,t){for await(const e of zb(n))yield*Fb(e,t)},zb=async function*(n){if(n[Symbol.asyncIterator]){yield*n;return}const t=n.getReader();try{for(;;){const{done:e,value:i}=await t.read();if(e)break;yield i}}finally{await t.cancel()}},Yh=(n,t,e,i)=>{const s=Bb(n,t);let r=0,o,a=l=>{o||(o=!0,i&&i(l))};return new ReadableStream({async pull(l){try{const{done:c,value:u}=await s.next();if(c){a(),l.close();return}let h=u.byteLength;if(e){let f=r+=h;e(f)}l.enqueue(new Uint8Array(u))}catch(c){throw a(c),c}},cancel(l){return a(l),s.return()}},{highWaterMark:2})},Jo=typeof fetch=="function"&&typeof Request=="function"&&typeof Response=="function",up=Jo&&typeof ReadableStream=="function",Hb=Jo&&(typeof TextEncoder=="function"?(n=>t=>n.encode(t))(new TextEncoder):async n=>new Uint8Array(await new Response(n).arrayBuffer())),hp=(n,...t)=>{try{return!!n(...t)}catch{return!1}},Vb=up&&hp(()=>{let n=!1;const t=new Request(De.origin,{body:new ReadableStream,method:"POST",get duplex(){return n=!0,"half"}}).headers.has("Content-Type");return n&&!t}),jh=64*1024,rc=up&&hp(()=>et.isReadableStream(new Response("").body)),Uo={stream:rc&&(n=>n.body)};Jo&&(n=>{["text","arrayBuffer","blob","formData","stream"].forEach(t=>{!Uo[t]&&(Uo[t]=et.isFunction(n[t])?e=>e[t]():(e,i)=>{throw new Xt(`Response type '${t}' is not supported`,Xt.ERR_NOT_SUPPORT,i)})})})(new Response);const kb=async n=>{if(n==null)return 0;if(et.isBlob(n))return n.size;if(et.isSpecCompliantForm(n))return(await new Request(De.origin,{method:"POST",body:n}).arrayBuffer()).byteLength;if(et.isArrayBufferView(n)||et.isArrayBuffer(n))return n.byteLength;if(et.isURLSearchParams(n)&&(n=n+""),et.isString(n))return(await Hb(n)).byteLength},Gb=async(n,t)=>{const e=et.toFiniteNumber(n.getContentLength());return e??kb(t)},Wb=Jo&&(async n=>{let{url:t,method:e,data:i,signal:s,cancelToken:r,timeout:o,onDownloadProgress:a,onUploadProgress:l,responseType:c,headers:u,withCredentials:h="same-origin",fetchOptions:f}=cp(n);c=c?(c+"").toLowerCase():"text";let p=Ob([s,r&&r.toAbortSignal()],o),g;const _=p&&p.unsubscribe&&(()=>{p.unsubscribe()});let m;try{if(l&&Vb&&e!=="get"&&e!=="head"&&(m=await Gb(u,i))!==0){let P=new Request(t,{method:"POST",body:i,duplex:"half"}),N;if(et.isFormData(i)&&(N=P.headers.get("content-type"))&&u.setContentType(N),P.body){const[D,z]=Wh(m,Lo(Xh(l)));i=Yh(P.body,jh,D,z)}}et.isString(h)||(h=h?"include":"omit");const d="credentials"in Request.prototype;g=new Request(t,{...f,signal:p,method:e.toUpperCase(),headers:u.normalize().toJSON(),body:i,duplex:"half",credentials:d?h:void 0});let R=await fetch(g,f);const b=rc&&(c==="stream"||c==="response");if(rc&&(a||b&&_)){const P={};["status","statusText","headers"].forEach(T=>{P[T]=R[T]});const N=et.toFiniteNumber(R.headers.get("content-length")),[D,z]=a&&Wh(N,Lo(Xh(a),!0))||[];R=new Response(Yh(R.body,jh,D,()=>{z&&z(),_&&_()}),P)}c=c||"text";let S=await Uo[et.findKey(Uo,c)||"text"](R,n);return!b&&_&&_(),await new Promise((P,N)=>{ap(P,N,{data:S,headers:je.from(R.headers),status:R.status,statusText:R.statusText,config:n,request:g})})}catch(d){throw _&&_(),d&&d.name==="TypeError"&&/Load failed|fetch/i.test(d.message)?Object.assign(new Xt("Network Error",Xt.ERR_NETWORK,n,g),{cause:d.cause||d}):Xt.from(d,d&&d.code,n,g)}}),oc={http:rb,xhr:Nb,fetch:Wb};et.forEach(oc,(n,t)=>{if(n){try{Object.defineProperty(n,"name",{value:t})}catch{}Object.defineProperty(n,"adapterName",{value:t})}});const Kh=n=>`- ${n}`,Xb=n=>et.isFunction(n)||n===null||n===!1,fp={getAdapter:n=>{n=et.isArray(n)?n:[n];const{length:t}=n;let e,i;const s={};for(let r=0;r<t;r++){e=n[r];let o;if(i=e,!Xb(e)&&(i=oc[(o=String(e)).toLowerCase()],i===void 0))throw new Xt(`Unknown adapter '${o}'`);if(i)break;s[o||"#"+r]=i}if(!i){const r=Object.entries(s).map(([a,l])=>`adapter ${a} `+(l===!1?"is not supported by the environment":"is not available in the build"));let o=t?r.length>1?`since :
`+r.map(Kh).join(`
`):" "+Kh(r[0]):"as no adapter specified";throw new Xt("There is no suitable adapter to dispatch the request "+o,"ERR_NOT_SUPPORT")}return i},adapters:oc};function Ja(n){if(n.cancelToken&&n.cancelToken.throwIfRequested(),n.signal&&n.signal.aborted)throw new Is(null,n)}function $h(n){return Ja(n),n.headers=je.from(n.headers),n.data=Za.call(n,n.transformRequest),["post","put","patch"].indexOf(n.method)!==-1&&n.headers.setContentType("application/x-www-form-urlencoded",!1),fp.getAdapter(n.adapter||Rr.adapter)(n).then(function(i){return Ja(n),i.data=Za.call(n,n.transformResponse,i),i.headers=je.from(i.headers),i},function(i){return op(i)||(Ja(n),i&&i.response&&(i.response.data=Za.call(n,n.transformResponse,i.response),i.response.headers=je.from(i.response.headers))),Promise.reject(i)})}const dp="1.11.0",Qo={};["object","boolean","number","function","string","symbol"].forEach((n,t)=>{Qo[n]=function(i){return typeof i===n||"a"+(t<1?"n ":" ")+n}});const Zh={};Qo.transitional=function(t,e,i){function s(r,o){return"[Axios v"+dp+"] Transitional option '"+r+"'"+o+(i?". "+i:"")}return(r,o,a)=>{if(t===!1)throw new Xt(s(o," has been removed"+(e?" in "+e:"")),Xt.ERR_DEPRECATED);return e&&!Zh[o]&&(Zh[o]=!0,console.warn(s(o," has been deprecated since v"+e+" and will be removed in the near future"))),t?t(r,o,a):!0}};Qo.spelling=function(t){return(e,i)=>(console.warn(`${i} is likely a misspelling of ${t}`),!0)};function qb(n,t,e){if(typeof n!="object")throw new Xt("options must be an object",Xt.ERR_BAD_OPTION_VALUE);const i=Object.keys(n);let s=i.length;for(;s-- >0;){const r=i[s],o=t[r];if(o){const a=n[r],l=a===void 0||o(a,r,n);if(l!==!0)throw new Xt("option "+r+" must be "+l,Xt.ERR_BAD_OPTION_VALUE);continue}if(e!==!0)throw new Xt("Unknown option "+r,Xt.ERR_BAD_OPTION)}}const So={assertOptions:qb,validators:Qo},Sn=So.validators;let Ni=class{constructor(t){this.defaults=t||{},this.interceptors={request:new kh,response:new kh}}async request(t,e){try{return await this._request(t,e)}catch(i){if(i instanceof Error){let s={};Error.captureStackTrace?Error.captureStackTrace(s):s=new Error;const r=s.stack?s.stack.replace(/^.+\n/,""):"";try{i.stack?r&&!String(i.stack).endsWith(r.replace(/^.+\n.+\n/,""))&&(i.stack+=`
`+r):i.stack=r}catch{}}throw i}}_request(t,e){typeof t=="string"?(e=e||{},e.url=t):e=t||{},e=Vi(this.defaults,e);const{transitional:i,paramsSerializer:s,headers:r}=e;i!==void 0&&So.assertOptions(i,{silentJSONParsing:Sn.transitional(Sn.boolean),forcedJSONParsing:Sn.transitional(Sn.boolean),clarifyTimeoutError:Sn.transitional(Sn.boolean)},!1),s!=null&&(et.isFunction(s)?e.paramsSerializer={serialize:s}:So.assertOptions(s,{encode:Sn.function,serialize:Sn.function},!0)),e.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?e.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:e.allowAbsoluteUrls=!0),So.assertOptions(e,{baseUrl:Sn.spelling("baseURL"),withXsrfToken:Sn.spelling("withXSRFToken")},!0),e.method=(e.method||this.defaults.method||"get").toLowerCase();let o=r&&et.merge(r.common,r[e.method]);r&&et.forEach(["delete","get","head","post","put","patch","common"],g=>{delete r[g]}),e.headers=je.concat(o,r);const a=[];let l=!0;this.interceptors.request.forEach(function(_){typeof _.runWhen=="function"&&_.runWhen(e)===!1||(l=l&&_.synchronous,a.unshift(_.fulfilled,_.rejected))});const c=[];this.interceptors.response.forEach(function(_){c.push(_.fulfilled,_.rejected)});let u,h=0,f;if(!l){const g=[$h.bind(this),void 0];for(g.unshift(...a),g.push(...c),f=g.length,u=Promise.resolve(e);h<f;)u=u.then(g[h++],g[h++]);return u}f=a.length;let p=e;for(h=0;h<f;){const g=a[h++],_=a[h++];try{p=g(p)}catch(m){_.call(this,m);break}}try{u=$h.call(this,p)}catch(g){return Promise.reject(g)}for(h=0,f=c.length;h<f;)u=u.then(c[h++],c[h++]);return u}getUri(t){t=Vi(this.defaults,t);const e=lp(t.baseURL,t.url,t.allowAbsoluteUrls);return ip(e,t.params,t.paramsSerializer)}};et.forEach(["delete","get","head","options"],function(t){Ni.prototype[t]=function(e,i){return this.request(Vi(i||{},{method:t,url:e,data:(i||{}).data}))}});et.forEach(["post","put","patch"],function(t){function e(i){return function(r,o,a){return this.request(Vi(a||{},{method:t,headers:i?{"Content-Type":"multipart/form-data"}:{},url:r,data:o}))}}Ni.prototype[t]=e(),Ni.prototype[t+"Form"]=e(!0)});let Yb=class pp{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let e;this.promise=new Promise(function(r){e=r});const i=this;this.promise.then(s=>{if(!i._listeners)return;let r=i._listeners.length;for(;r-- >0;)i._listeners[r](s);i._listeners=null}),this.promise.then=s=>{let r;const o=new Promise(a=>{i.subscribe(a),r=a}).then(s);return o.cancel=function(){i.unsubscribe(r)},o},t(function(r,o,a){i.reason||(i.reason=new Is(r,o,a),e(i.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const e=this._listeners.indexOf(t);e!==-1&&this._listeners.splice(e,1)}toAbortSignal(){const t=new AbortController,e=i=>{t.abort(i)};return this.subscribe(e),t.signal.unsubscribe=()=>this.unsubscribe(e),t.signal}static source(){let t;return{token:new pp(function(s){t=s}),cancel:t}}};function jb(n){return function(e){return n.apply(null,e)}}function Kb(n){return et.isObject(n)&&n.isAxiosError===!0}const ac={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(ac).forEach(([n,t])=>{ac[t]=n});function mp(n){const t=new Ni(n),e=Xd(Ni.prototype.request,t);return et.extend(e,Ni.prototype,t,{allOwnKeys:!0}),et.extend(e,t,null,{allOwnKeys:!0}),e.create=function(s){return mp(Vi(n,s))},e}const xe=mp(Rr);xe.Axios=Ni;xe.CanceledError=Is;xe.CancelToken=Yb;xe.isCancel=op;xe.VERSION=dp;xe.toFormData=Zo;xe.AxiosError=Xt;xe.Cancel=xe.CanceledError;xe.all=function(t){return Promise.all(t)};xe.spread=jb;xe.isAxiosError=Kb;xe.mergeConfig=Vi;xe.AxiosHeaders=je;xe.formToJSON=n=>rp(et.isHTMLForm(n)?new FormData(n):n);xe.getAdapter=fp.getAdapter;xe.HttpStatusCode=ac;xe.default=xe;const{Axios:oT,AxiosError:aT,CanceledError:lT,isCancel:cT,CancelToken:uT,VERSION:hT,all:fT,Cancel:dT,isAxiosError:pT,spread:mT,toFormData:gT,AxiosHeaders:_T,HttpStatusCode:vT,formToJSON:xT,getAdapter:ST,mergeConfig:yT}=xe,Ws=xe.create({baseURL:"https://mapapi.susu.ru/integration/map"});class $b extends Ae{constructor(t=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=t,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new vt(.5,.5),this.addEventListener("removed",function(){this.traverse(function(e){e.element instanceof e.element.ownerDocument.defaultView.Element&&e.element.parentNode!==null&&e.element.remove()})})}copy(t,e){return super.copy(t,e),this.element=t.element.cloneNode(!0),this.center=t.center,this}}const as=new B,Jh=new fe,Qh=new fe,tf=new B,ef=new B;class Zb{constructor(t={}){const e=this;let i,s,r,o;const a={objects:new WeakMap},l=t.element!==void 0?t.element:document.createElement("div");l.style.overflow="hidden",this.domElement=l,this.getSize=function(){return{width:i,height:s}},this.render=function(g,_){g.matrixWorldAutoUpdate===!0&&g.updateMatrixWorld(),_.parent===null&&_.matrixWorldAutoUpdate===!0&&_.updateMatrixWorld(),Jh.copy(_.matrixWorldInverse),Qh.multiplyMatrices(_.projectionMatrix,Jh),u(g,g,_),p(g)},this.setSize=function(g,_){i=g,s=_,r=i/2,o=s/2,l.style.width=g+"px",l.style.height=_+"px"};function c(g){g.isCSS2DObject&&(g.element.style.display="none");for(let _=0,m=g.children.length;_<m;_++)c(g.children[_])}function u(g,_,m){if(g.visible===!1){c(g);return}if(g.isCSS2DObject){as.setFromMatrixPosition(g.matrixWorld),as.applyMatrix4(Qh);const d=as.z>=-1&&as.z<=1&&g.layers.test(m.layers)===!0,R=g.element;R.style.display=d===!0?"":"none",d===!0&&(g.onBeforeRender(e,_,m),R.style.transform="translate("+-100*g.center.x+"%,"+-100*g.center.y+"%)translate("+(as.x*r+r)+"px,"+(-as.y*o+o)+"px)",R.parentNode!==l&&l.appendChild(R),g.onAfterRender(e,_,m));const b={distanceToCameraSquared:h(m,g)};a.objects.set(g,b)}for(let d=0,R=g.children.length;d<R;d++)u(g.children[d],_,m)}function h(g,_){return tf.setFromMatrixPosition(g.matrixWorld),ef.setFromMatrixPosition(_.matrixWorld),tf.distanceToSquared(ef)}function f(g){const _=[];return g.traverseVisible(function(m){m.isCSS2DObject&&_.push(m)}),_}function p(g){const _=f(g).sort(function(d,R){if(d.renderOrder!==R.renderOrder)return R.renderOrder-d.renderOrder;const b=a.objects.get(d).distanceToCameraSquared,S=a.objects.get(R).distanceToCameraSquared;return b-S}),m=_.length;for(let d=0,R=_.length;d<R;d++)_[d].element.style.zIndex=m-d}}}const gp=(n,t)=>{const e=n.__vccOpts||n;for(const[i,s]of t)e[i]=s;return e},Jb={__name:"LoadingSpinner",props:{isLoading:Boolean},setup(n){return(t,e)=>(ur(),ll("div",{class:Bo(["loading-overlay",{"loading-hidden":!n.isLoading}])},[...e[0]||(e[0]=[gs("div",{class:"loading-spinner"},[gs("div",{class:"spinner"}),gs("p",null,"Загрузка карты...")],-1)])],2))}},Qb=gp(Jb,[["__scopeId","data-v-51d945ce"]]),tT={class:"scene-container"},nf=5,eT={__name:"Map3D",setup(n){const t=aa(null),e=aa(null),i=aa(!0);let s,r,o,a,l=[],c=null,u=!1,h=0,f=0;function p(){c&&(s.remove(c),c=null),l.forEach(M=>{M.visible=!0}),r.position.set(500,250,500),a.target.set(250,0,250),a.update(),e.value=null}function g(){const M=[],A=_("X",105,0,0);M.push(A);const q=_("Y",0,105,0);M.push(q);const Y=_("Z",0,0,105);return M.push(Y),M}function _(M,A,q,Y){const Q=document.createElement("div");Q.className="axis-label",Q.textContent=M,Q.style.color=m(M);const nt=new $b(Q);return nt.position.set(A,q,Y),nt}function m(M){switch(M){case"X":return"#ff0000";case"Y":return"#00ff00";case"Z":return"#0000ff";default:return"#ffffff"}}function d(M,A,q,Y=[0,0,0,1],Q=0){const[nt,$,Z,H]=Y,ot=new Zl;M.forEach(([Vt,it],ut)=>{const ft=Vt*ii*H+nt,Ct=it*ii*H+$;ut===0?ot.moveTo(ft,Ct):ot.lineTo(ft,Ct)});const lt={depth:A,bevelEnabled:!1},pt=new Do(ot,lt);pt.rotateX(Math.PI/2),pt.translate(0,Q,0);const Rt=new Va({color:q}),Ft=new an(pt,Rt);return Ft.rotation.y=go.degToRad(Z),Ft}function R(M,A,q,Y,Q=[0,0,0,1],nt=0){const[$,Z,H,ot]=Q,lt=new Li;for(let pt=0;pt<M.length;pt++){const Rt=M[pt],Ft=M[(pt+1)%M.length],Vt=Rt[0]*ii*ot+$,it=Rt[1]*ii*ot+Z,ut=Ft[0]*ii*ot+$,ft=Ft[1]*ii*ot+Z,Ct=ut-Vt,Pt=ft-it,Ot=Math.sqrt(Ct*Ct+Pt*Pt),le=Math.atan2(Pt,Ct),w=Vt+Ct/2,x=it+Pt/2,C=new Ds(Ot,A,q),L=new Va({color:Y}),O=new an(C,L);O.position.set(w,A/2+nt,x),O.rotation.y=-le,lt.add(O)}return lt.rotation.y=go.degToRad(H),lt}function b(M,A,q,Y=[0,0,0,1],Q=0){const[nt,$,Z,H]=Y,ot=new Zl;M.forEach(([Vt,it],ut)=>{const ft=Vt*ii*H+nt,Ct=it*ii*H+$;ut===0?ot.moveTo(ft,Ct):ot.lineTo(ft,Ct)});const lt={depth:A,bevelEnabled:!1},pt=new Do(ot,lt);pt.rotateX(Math.PI/2),pt.translate(0,Q+A/2,0);const Rt=new Va({color:q}),Ft=new an(pt,Rt);return Ft.rotation.y=go.degToRad(Z),Ft}function S(M,A,q,Y,Q,nt,$=[0,0,0,1],Z=0){const H=new Li,ot=b(M.points,Y,nt,$,Z);H.add(ot);const lt=R(M.points,A,q,Q,$,Z+Y);return H.add(lt),H.userData=M,H}async function P(M,A,q){const Y=new Li,Q=(await Ws.get(`/buildingcoordinates/buildingId/${M}/floor/${A}`)).data,nt=Q?JSON.parse(Q).points.map(H=>[H.x,H.y]):null;if(nt){const H=b(nt,1,8947848,q,A*8-7);Y.add(H);const ot=R(nt,10,_E,13421772,q,(A-1)*8+1.5);Y.add(ot)}const Z=(await z(M)).filter(H=>H.floor===A);for(const H of Z)if(H.points&&H.points.length>0){const ot=S(H,8,vE,.5,16763904,16772778,q,(A-1)*8+1.5);Y.add(ot)}return Y.userData={buildingId:M,floor:A,type:"detailedFloor"},Y}function N(M){const A=new Cs().setFromObject(M),q=A.getCenter(new B),Y=A.getSize(new B),Q=Math.max(Y.x,Y.y,Y.z),nt=r.fov*(Math.PI/180);let $=Math.abs(Q/Math.sin(nt/2));r.position.set(q.x,q.y+$/2,q.z+$/2),r.lookAt(q),a.target.copy(q),a.update()}Uf(async()=>{try{let ot=function(){requestAnimationFrame(ot),a.update(),o.render(s,r),q.render(s,r)};var M=ot;i.value=!0,s=new T0,s.background=new Zt(15790320),r=new on(60,t.value.clientWidth/t.value.clientHeight,.1,1e3),r.position.set(500,250,500),o=new nE({antialias:!0,canvas:t.value}),o.setSize(t.value.clientWidth,t.value.clientHeight);const A=document.createElement("div");A.className="label-container",A.style.position="absolute",A.style.top="0",A.style.left="0",A.style.width="100%",A.style.height="100%",A.style.pointerEvents="none",document.body.appendChild(A);const q=new Zb({element:A});q.setSize(t.value.clientWidth,t.value.clientHeight),a=new sE(r,o.domElement),a.target.set(250,0,250);const Y=new dv(16777215,1);Y.position.set(50,100,50),s.add(Y),s.add(new pv(8947848));const Q=await D();for(const lt of Q){const pt=xE[lt.buildingId]||null;if(pt!==null){const Rt=await T(lt.buildingId);for(const Ft of Rt){const Vt=(await Ws.get(`/buildingcoordinates/buildingId/${lt.buildingId}/floor/${Ft}`)).data,it=Vt?JSON.parse(Vt).points.map(ut=>[ut.x,ut.y]):null;if(it!==null){const ut=d(it,6,3381759,pt,Ft*8);ut.userData={building:lt.name,floor:Ft,buildingId:lt.buildingId,offset:pt},s.add(ut),l.push(ut)}}}}const nt=new gv,$=new vt;o.domElement.addEventListener("mousedown",lt=>{h=lt.clientX,f=lt.clientY,u=!1}),o.domElement.addEventListener("mousemove",lt=>{!u&&(Math.abs(lt.clientX-h)>nf||Math.abs(lt.clientY-f)>nf)&&(u=!0)}),o.domElement.addEventListener("mouseup",lt=>{u||Z(lt)});async function Z(lt){const pt=o.domElement.getBoundingClientRect();$.x=(lt.clientX-pt.left)/pt.width*2-1,$.y=-((lt.clientY-pt.top)/pt.height)*2+1,nt.setFromCamera($,r);const Rt=nt.intersectObjects(l);if(Rt.length>0){if(e.value!==null)return;const Ft=Rt[0].object,Vt=Ft.userData.buildingId,it=Ft.userData.floor;l.forEach(ut=>{ut.userData.buildingId===Vt&&ut.userData.floor>it&&(ut.visible=!1)}),c&&s.remove(c),Ft.visible=!1,console.log(Ft.userData.offset),c=await P(Vt,it,Ft.userData.offset),s.add(c),N(c),e.value={building:Ft.userData.building,floor:it}}}s.add(new _v(1e3,40)),s.add(new vv(100)),g().forEach(lt=>s.add(lt)),ot()}catch(A){console.error("ошибка загрузки карты:",A)}finally{i.value=!1}});const D=async()=>(await Ws.get("/buildings")).data.map(A=>({buildingId:A.Id,name:A.Name,shortname:A.ShortName})),z=async M=>(await Ws.get(`rooms/buildingId/${M}`)).data.map(q=>{const Y=q.Coordinates?JSON.parse(q.Coordinates).points.map(Q=>[Q.x,Q.y]):null;return{id:q.Id,name:q.Name,floor:q.Floor,number:q.Number,type:q.RoomType,points:Y,buildingId:M}}).filter(q=>Array.isArray(q.points)&&q.points.length>0),T=async M=>{const{data:A}=await Ws.get(`rooms/buildingId/${M}`);return[...new Set(A.map(q=>q.Floor))].filter(q=>q!=null).sort((q,Y)=>q-Y)};return(M,A)=>(ur(),ll("div",tT,[gs("canvas",{ref_key:"canvasRef",ref:t,class:"w-full h-screen"},null,512),e.value?(ur(),ll("button",{key:0,onClick:p,class:"return-button"},"Назад к общему виду")):fg("",!0),Rn(Qb,{"is-loading":i.value},null,8,["is-loading"])]))}},nT=gp(eT,[["__scopeId","data-v-4197c5e1"]]),iT={__name:"App",setup(n){return(t,e)=>(ur(),Qf(nT))}};Yg(iT).mount("#app");
