var B=Object.defineProperty;var J=(e,t,n)=>t in e?B(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var g=(e,t,n)=>(J(e,typeof t!="symbol"?t+"":t,n),n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();function d(){}function P(e){return e()}function S(){return Object.create(null)}function p(e){e.forEach(P)}function j(e){return typeof e=="function"}function M(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}function q(e){return Object.keys(e).length===0}function F(e,t){e.appendChild(t)}function w(e,t,n){e.insertBefore(t,n||null)}function m(e){e.parentNode&&e.parentNode.removeChild(e)}function x(e){return document.createElement(e)}function K(e){return document.createTextNode(e)}function R(e){return Array.from(e.childNodes)}function T(e,t){t=""+t,e.data!==t&&(e.data=t)}let k;function _(e){k=e}const l=[],C=[];let a=[];const L=[],U=Promise.resolve();let $=!1;function V(){$||($=!0,U.then(I))}function b(e){a.push(e)}const y=new Set;let f=0;function I(){if(f!==0)return;const e=k;do{try{for(;f<l.length;){const t=l[f];f++,_(t),W(t.$$)}}catch(t){throw l.length=0,f=0,t}for(_(null),l.length=0,f=0;C.length;)C.pop()();for(let t=0;t<a.length;t+=1){const n=a[t];y.has(n)||(y.add(n),n())}a.length=0}while(l.length);for(;L.length;)L.pop()();$=!1,y.clear(),_(e)}function W(e){if(e.fragment!==null){e.update(),p(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(b)}}function z(e){const t=[],n=[];a.forEach(o=>e.indexOf(o)===-1?t.push(o):n.push(o)),n.forEach(o=>o()),a=t}const D=new Set;function G(e,t){e&&e.i&&(D.delete(e),e.i(t))}function H(e,t,n){const{fragment:o,after_update:r}=e.$$;o&&o.m(t,n),b(()=>{const i=e.$$.on_mount.map(P).filter(j);e.$$.on_destroy?e.$$.on_destroy.push(...i):p(i),e.$$.on_mount=[]}),r.forEach(b)}function Q(e,t){const n=e.$$;n.fragment!==null&&(z(n.after_update),p(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function X(e,t){e.$$.dirty[0]===-1&&(l.push(e),V(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function Y(e,t,n,o,r,i,s=null,A=[-1]){const h=k;_(e);const c=e.$$={fragment:null,ctx:[],props:i,update:d,not_equal:r,bound:S(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(h?h.$$.context:[])),callbacks:S(),dirty:A,skip_bound:!1,root:t.target||h.$$.root};s&&s(c.root);let v=!1;if(c.ctx=n?n(e,t.props||{},(u,O,...E)=>{const N=E.length?E[0]:O;return c.ctx&&r(c.ctx[u],c.ctx[u]=N)&&(!c.skip_bound&&c.bound[u]&&c.bound[u](N),v&&X(e,u)),O}):[],c.update(),v=!0,p(c.before_update),c.fragment=o?o(c.ctx):!1,t.target){if(t.hydrate){const u=R(t.target);c.fragment&&c.fragment.l(u),u.forEach(m)}else c.fragment&&c.fragment.c();t.intro&&G(e.$$.fragment),H(e,t.target,t.anchor),I()}_(h)}class Z{constructor(){g(this,"$$");g(this,"$$set")}$destroy(){Q(this,1),this.$destroy=d}$on(t,n){if(!j(n))return d;const o=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return o.push(n),()=>{const r=o.indexOf(n);r!==-1&&o.splice(r,1)}}$set(t){this.$$set&&!q(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const ee="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(ee);function te(e){let t;return{c(){t=x("p"),t.textContent="Caricamento..."},m(n,o){w(n,t,o)},p:d,d(n){n&&m(t)}}}function ne(e){let t,n=JSON.stringify(e[0],null,2)+"",o;return{c(){t=x("div"),o=K(n)},m(r,i){w(r,t,i),F(t,o)},p(r,i){i&1&&n!==(n=JSON.stringify(r[0],null,2)+"")&&T(o,n)},d(r){r&&m(t)}}}function re(e){let t;function n(i,s){return i[0]?ne:te}let o=n(e),r=o(e);return{c(){t=x("main"),r.c()},m(i,s){w(i,t,s),r.m(t,null)},p(i,[s]){o===(o=n(i))&&r?r.p(i,s):(r.d(1),r=o(i),r&&(r.c(),r.m(t,null)))},i:d,o:d,d(i){i&&m(t),r.d()}}}async function oe(e){return await(await fetch("//statsboxd-workers.giudimax.workers.dev/id/"+e,{headers:{"Accept-Encoding":"br"}})).json()}function ie(e,t,n){let o={};async function r(){try{n(0,o=await oe("1Ioll"))}catch(i){console.error("Errore:",i)}}return r(),[o]}class ce extends Z{constructor(t){super(),Y(this,t,ie,re,M,{})}}new ce({target:document.getElementById("app")});
