/*!
 * typeahead.js 0.11.1
 * https://github.com/twitter/typeahead.js
 * Copyright 2013-2015 Twitter, Inc. and other contributors; Licensed MIT
 */
!function(e,t){"function"==typeof define&&define.amd?define("bloodhound",["jquery"],function(n){return e.Bloodhound=t(n)}):"object"==typeof exports?module.exports=t(require("jquery")):e.Bloodhound=t(jQuery)}(this,function(e){var t=function(){"use strict";return{isMsie:function(){return/(msie|trident)/i.test(navigator.userAgent)?navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2]:!1},isBlankString:function(e){return!e||/^\s*$/.test(e)},escapeRegExChars:function(e){return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isArray:e.isArray,isFunction:e.isFunction,isObject:e.isPlainObject,isUndefined:function(e){return"undefined"==typeof e},isElement:function(e){return!(!e||1!==e.nodeType)},isJQuery:function(t){return t instanceof e},toStr:function(e){return t.isUndefined(e)||null===e?"":e+""},bind:e.proxy,each:function(t,n){function r(e,t){return n(t,e)}e.each(t,r)},map:e.map,filter:e.grep,every:function(t,n){var r=!0;return t?(e.each(t,function(e,i){return(r=n.call(null,i,e,t))?void 0:!1}),!!r):r},some:function(t,n){var r=!1;return t?(e.each(t,function(e,i){return(r=n.call(null,i,e,t))?!1:void 0}),!!r):r},mixin:e.extend,identity:function(e){return e},clone:function(t){return e.extend(!0,{},t)},getIdGenerator:function(){var e=0;return function(){return e++}},templatify:function(t){function n(){return String(t)}return e.isFunction(t)?t:n},defer:function(e){setTimeout(e,0)},debounce:function(e,t,n){var r,i;return function(){var o,a,s=this,u=arguments;return o=function(){r=null,n||(i=e.apply(s,u))},a=n&&!r,clearTimeout(r),r=setTimeout(o,t),a&&(i=e.apply(s,u)),i}},throttle:function(e,t){var n,r,i,o,a,s;return a=0,s=function(){a=new Date,i=null,o=e.apply(n,r)},function(){var u=new Date,c=t-(u-a);return n=this,r=arguments,0>=c?(clearTimeout(i),i=null,a=u,o=e.apply(n,r)):i||(i=setTimeout(s,c)),o}},stringify:function(e){return t.isString(e)?e:JSON.stringify(e)},noop:function(){}}}(),n="0.11.1",r=function(){"use strict";function e(e){return e=t.toStr(e),e?e.split(/\s+/):[]}function n(e){return e=t.toStr(e),e?e.split(/\W+/):[]}function r(e){return function(n){return n=t.isArray(n)?n:[].slice.call(arguments,0),function(r){var i=[];return t.each(n,function(n){i=i.concat(e(t.toStr(r[n])))}),i}}}return{nonword:n,whitespace:e,obj:{nonword:r(n),whitespace:r(e)}}}(),i=function(){"use strict";function n(n){this.maxSize=t.isNumber(n)?n:100,this.reset(),this.maxSize<=0&&(this.set=this.get=e.noop)}function r(){this.head=this.tail=null}function i(e,t){this.key=e,this.val=t,this.prev=this.next=null}return t.mixin(n.prototype,{set:function(e,t){var n,r=this.list.tail;this.size>=this.maxSize&&(this.list.remove(r),delete this.hash[r.key],this.size--),(n=this.hash[e])?(n.val=t,this.list.moveToFront(n)):(n=new i(e,t),this.list.add(n),this.hash[e]=n,this.size++)},get:function(e){var t=this.hash[e];return t?(this.list.moveToFront(t),t.val):void 0},reset:function(){this.size=0,this.hash={},this.list=new r}}),t.mixin(r.prototype,{add:function(e){this.head&&(e.next=this.head,this.head.prev=e),this.head=e,this.tail=this.tail||e},remove:function(e){e.prev?e.prev.next=e.next:this.head=e.next,e.next?e.next.prev=e.prev:this.tail=e.prev},moveToFront:function(e){this.remove(e),this.add(e)}}),n}(),o=function(){"use strict";function n(e,n){this.prefix=["__",e,"__"].join(""),this.ttlKey="__ttl__",this.keyMatcher=new RegExp("^"+t.escapeRegExChars(this.prefix)),this.ls=n||s,!this.ls&&this._noop()}function r(){return(new Date).getTime()}function i(e){return JSON.stringify(t.isUndefined(e)?null:e)}function o(t){return e.parseJSON(t)}function a(e){var t,n,r=[],i=s.length;for(t=0;i>t;t++)(n=s.key(t)).match(e)&&r.push(n.replace(e,""));return r}var s;try{s=window.localStorage,s.setItem("~~~","!"),s.removeItem("~~~")}catch(u){s=null}return t.mixin(n.prototype,{_prefix:function(e){return this.prefix+e},_ttlKey:function(e){return this._prefix(e)+this.ttlKey},_noop:function(){this.get=this.set=this.remove=this.clear=this.isExpired=t.noop},_safeSet:function(e,t){try{this.ls.setItem(e,t)}catch(n){"QuotaExceededError"===n.name&&(this.clear(),this._noop())}},get:function(e){return this.isExpired(e)&&this.remove(e),o(this.ls.getItem(this._prefix(e)))},set:function(e,n,o){return t.isNumber(o)?this._safeSet(this._ttlKey(e),i(r()+o)):this.ls.removeItem(this._ttlKey(e)),this._safeSet(this._prefix(e),i(n))},remove:function(e){return this.ls.removeItem(this._ttlKey(e)),this.ls.removeItem(this._prefix(e)),this},clear:function(){var e,t=a(this.keyMatcher);for(e=t.length;e--;)this.remove(t[e]);return this},isExpired:function(e){var n=o(this.ls.getItem(this._ttlKey(e)));return t.isNumber(n)&&r()>n?!0:!1}}),n}(),a=function(){"use strict";function n(e){e=e||{},this.cancelled=!1,this.lastReq=null,this._send=e.transport,this._get=e.limiter?e.limiter(this._get):this._get,this._cache=e.cache===!1?new i(0):s}var r=0,o={},a=6,s=new i(10);return n.setMaxPendingRequests=function(e){a=e},n.resetCache=function(){s.reset()},t.mixin(n.prototype,{_fingerprint:function(t){return t=t||{},t.url+t.type+e.param(t.data||{})},_get:function(e,t){function n(e){t(null,e),l._cache.set(u,e)}function i(){t(!0)}function s(){r--,delete o[u],l.onDeckRequestArgs&&(l._get.apply(l,l.onDeckRequestArgs),l.onDeckRequestArgs=null)}var u,c,l=this;u=this._fingerprint(e),this.cancelled||u!==this.lastReq||((c=o[u])?c.done(n).fail(i):a>r?(r++,o[u]=this._send(e).done(n).fail(i).always(s)):this.onDeckRequestArgs=[].slice.call(arguments,0))},get:function(n,r){var i,o;r=r||e.noop,n=t.isString(n)?{url:n}:n||{},o=this._fingerprint(n),this.cancelled=!1,this.lastReq=o,(i=this._cache.get(o))?r(null,i):this._get(n,r)},cancel:function(){this.cancelled=!0}}),n}(),s=window.SearchIndex=function(){"use strict";function n(n){n=n||{},n.datumTokenizer&&n.queryTokenizer||e.error("datumTokenizer and queryTokenizer are both required"),this.identify=n.identify||t.stringify,this.datumTokenizer=n.datumTokenizer,this.queryTokenizer=n.queryTokenizer,this.reset()}function r(e){return e=t.filter(e,function(e){return!!e}),e=t.map(e,function(e){return e.toLowerCase()})}function i(){var e={};return e[u]=[],e[s]={},e}function o(e){for(var t={},n=[],r=0,i=e.length;i>r;r++)t[e[r]]||(t[e[r]]=!0,n.push(e[r]));return n}function a(e,t){var n=0,r=0,i=[];e=e.sort(),t=t.sort();for(var o=e.length,a=t.length;o>n&&a>r;)e[n]<t[r]?n++:e[n]>t[r]?r++:(i.push(e[n]),n++,r++);return i}var s="c",u="i";return t.mixin(n.prototype,{bootstrap:function(e){this.datums=e.datums,this.trie=e.trie},add:function(e){var n=this;e=t.isArray(e)?e:[e],t.each(e,function(e){var o,a;n.datums[o=n.identify(e)]=e,a=r(n.datumTokenizer(e)),t.each(a,function(e){var t,r,a;for(t=n.trie,r=e.split("");a=r.shift();)t=t[s][a]||(t[s][a]=i()),t[u].push(o)})})},get:function(e){var n=this;return t.map(e,function(e){return n.datums[e]})},search:function(e){var n,i,c=this;return n=r(this.queryTokenizer(e)),t.each(n,function(e){var t,n,r,o;if(i&&0===i.length)return!1;for(t=c.trie,n=e.split("");t&&(r=n.shift());)t=t[s][r];return t&&0===n.length?(o=t[u].slice(0),void(i=i?a(i,o):o)):(i=[],!1)}),i?t.map(o(i),function(e){return c.datums[e]}):[]},all:function(){var e=[];for(var t in this.datums)e.push(this.datums[t]);return e},reset:function(){this.datums={},this.trie=i()},serialize:function(){return{datums:this.datums,trie:this.trie}}}),n}(),u=function(){"use strict";function e(e){this.url=e.url,this.ttl=e.ttl,this.cache=e.cache,this.prepare=e.prepare,this.transform=e.transform,this.transport=e.transport,this.thumbprint=e.thumbprint,this.storage=new o(e.cacheKey)}var n;return n={data:"data",protocol:"protocol",thumbprint:"thumbprint"},t.mixin(e.prototype,{_settings:function(){return{url:this.url,type:"GET",dataType:"json"}},store:function(e){this.cache&&(this.storage.set(n.data,e,this.ttl),this.storage.set(n.protocol,location.protocol,this.ttl),this.storage.set(n.thumbprint,this.thumbprint,this.ttl))},fromCache:function(){var e,t={};return this.cache?(t.data=this.storage.get(n.data),t.protocol=this.storage.get(n.protocol),t.thumbprint=this.storage.get(n.thumbprint),e=t.thumbprint!==this.thumbprint||t.protocol!==location.protocol,t.data&&!e?t.data:null):null},fromNetwork:function(e){function t(){e(!0)}function n(t){e(null,i.transform(t))}var r,i=this;e&&(r=this.prepare(this._settings()),this.transport(r).fail(t).done(n))},clear:function(){return this.storage.clear(),this}}),e}(),c=function(){"use strict";function e(e){this.url=e.url,this.prepare=e.prepare,this.transform=e.transform,this.transport=new a({cache:e.cache,limiter:e.limiter,transport:e.transport})}return t.mixin(e.prototype,{_settings:function(){return{url:this.url,type:"GET",dataType:"json"}},get:function(e,t){function n(e,n){t(e?[]:i.transform(n))}var r,i=this;if(t)return e=e||"",r=this.prepare(e,this._settings()),this.transport.get(r,n)},cancelLastRequest:function(){this.transport.cancel()}}),e}(),l=function(){"use strict";function r(r){var i;return r?(i={url:null,ttl:864e5,cache:!0,cacheKey:null,thumbprint:"",prepare:t.identity,transform:t.identity,transport:null},r=t.isString(r)?{url:r}:r,r=t.mixin(i,r),!r.url&&e.error("prefetch requires url to be set"),r.transform=r.filter||r.transform,r.cacheKey=r.cacheKey||r.url,r.thumbprint=n+r.thumbprint,r.transport=r.transport?s(r.transport):e.ajax,r):null}function i(n){var r;if(n)return r={url:null,cache:!0,prepare:null,replace:null,wildcard:null,limiter:null,rateLimitBy:"debounce",rateLimitWait:300,transform:t.identity,transport:null},n=t.isString(n)?{url:n}:n,n=t.mixin(r,n),!n.url&&e.error("remote requires url to be set"),n.transform=n.filter||n.transform,n.prepare=o(n),n.limiter=a(n),n.transport=n.transport?s(n.transport):e.ajax,delete n.replace,delete n.wildcard,delete n.rateLimitBy,delete n.rateLimitWait,n}function o(e){function t(e,t){return t.url=o(t.url,e),t}function n(e,t){return t.url=t.url.replace(a,encodeURIComponent(e)),t}function r(e,t){return t}var i,o,a;return i=e.prepare,o=e.replace,a=e.wildcard,i?i:i=o?t:e.wildcard?n:r}function a(e){function n(e){return function(n){return t.debounce(n,e)}}function r(e){return function(n){return t.throttle(n,e)}}var i,o,a;return i=e.limiter,o=e.rateLimitBy,a=e.rateLimitWait,i||(i=/^throttle$/i.test(o)?r(a):n(a)),i}function s(n){return function(r){function i(e){t.defer(function(){a.resolve(e)})}function o(e){t.defer(function(){a.reject(e)})}var a=e.Deferred();return n(r,i,o),a}}return function(n){var o,a;return o={initialize:!0,identify:t.stringify,datumTokenizer:null,queryTokenizer:null,sufficient:5,sorter:null,local:[],prefetch:null,remote:null},n=t.mixin(o,n||{}),!n.datumTokenizer&&e.error("datumTokenizer is required"),!n.queryTokenizer&&e.error("queryTokenizer is required"),a=n.sorter,n.sorter=a?function(e){return e.sort(a)}:t.identity,n.local=t.isFunction(n.local)?n.local():n.local,n.prefetch=r(n.prefetch),n.remote=i(n.remote),n}}(),p=function(){"use strict";function n(e){e=l(e),this.sorter=e.sorter,this.identify=e.identify,this.sufficient=e.sufficient,this.local=e.local,this.remote=e.remote?new c(e.remote):null,this.prefetch=e.prefetch?new u(e.prefetch):null,this.index=new s({identify:this.identify,datumTokenizer:e.datumTokenizer,queryTokenizer:e.queryTokenizer}),e.initialize!==!1&&this.initialize()}var i;return i=window&&window.Bloodhound,n.noConflict=function(){return window&&(window.Bloodhound=i),n},n.tokenizers=r,t.mixin(n.prototype,{__ttAdapter:function(){function e(e,t,r){return n.search(e,t,r)}function t(e,t){return n.search(e,t)}var n=this;return this.remote?e:t},_loadPrefetch:function(){function t(e,t){return e?n.reject():(i.add(t),i.prefetch.store(i.index.serialize()),void n.resolve())}var n,r,i=this;return n=e.Deferred(),this.prefetch?(r=this.prefetch.fromCache())?(this.index.bootstrap(r),n.resolve()):this.prefetch.fromNetwork(t):n.resolve(),n.promise()},_initialize:function(){function e(){t.add(t.local)}var t=this;return this.clear(),(this.initPromise=this._loadPrefetch()).done(e),this.initPromise},initialize:function(e){return!this.initPromise||e?this._initialize():this.initPromise},add:function(e){return this.index.add(e),this},get:function(e){return e=t.isArray(e)?e:[].slice.call(arguments),this.index.get(e)},search:function(e,n,r){function i(e){var n=[];t.each(e,function(e){!t.some(o,function(t){return a.identify(e)===a.identify(t)})&&n.push(e)}),r&&r(n)}var o,a=this;return o=this.sorter(this.index.search(e)),n(this.remote?o.slice():o),this.remote&&o.length<this.sufficient?this.remote.get(e,i):this.remote&&this.remote.cancelLastRequest(),this},all:function(){return this.index.all()},clear:function(){return this.index.reset(),this},clearPrefetchCache:function(){return this.prefetch&&this.prefetch.clear(),this},clearRemoteCache:function(){return a.resetCache(),this},ttAdapter:function(){return this.__ttAdapter()}}),n}();return p}),function(e,t){"function"==typeof define&&define.amd?define("typeahead.js",["jquery"],function(e){return t(e)}):"object"==typeof exports?module.exports=t(require("jquery")):t(jQuery)}(this,function(e){var t=function(){"use strict";return{isMsie:function(){return/(msie|trident)/i.test(navigator.userAgent)?navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2]:!1},isBlankString:function(e){return!e||/^\s*$/.test(e)},escapeRegExChars:function(e){return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isArray:e.isArray,isFunction:e.isFunction,isObject:e.isPlainObject,isUndefined:function(e){return"undefined"==typeof e},isElement:function(e){return!(!e||1!==e.nodeType)},isJQuery:function(t){return t instanceof e},toStr:function(e){return t.isUndefined(e)||null===e?"":e+""},bind:e.proxy,each:function(t,n){function r(e,t){return n(t,e)}e.each(t,r)},map:e.map,filter:e.grep,every:function(t,n){var r=!0;return t?(e.each(t,function(e,i){return(r=n.call(null,i,e,t))?void 0:!1}),!!r):r},some:function(t,n){var r=!1;return t?(e.each(t,function(e,i){return(r=n.call(null,i,e,t))?!1:void 0}),!!r):r},mixin:e.extend,identity:function(e){return e},clone:function(t){return e.extend(!0,{},t)},getIdGenerator:function(){var e=0;return function(){return e++}},templatify:function(t){function n(){return String(t)}return e.isFunction(t)?t:n},defer:function(e){setTimeout(e,0)},debounce:function(e,t,n){var r,i;return function(){var o,a,s=this,u=arguments;return o=function(){r=null,n||(i=e.apply(s,u))},a=n&&!r,clearTimeout(r),r=setTimeout(o,t),a&&(i=e.apply(s,u)),i}},throttle:function(e,t){var n,r,i,o,a,s;return a=0,s=function(){a=new Date,i=null,o=e.apply(n,r)},function(){var u=new Date,c=t-(u-a);return n=this,r=arguments,0>=c?(clearTimeout(i),i=null,a=u,o=e.apply(n,r)):i||(i=setTimeout(s,c)),o}},stringify:function(e){return t.isString(e)?e:JSON.stringify(e)},noop:function(){}}}(),n=function(){"use strict";function e(e){var a,s;return s=t.mixin({},o,e),a={css:i(),classes:s,html:n(s),selectors:r(s)},{css:a.css,html:a.html,classes:a.classes,selectors:a.selectors,mixin:function(e){t.mixin(e,a)}}}function n(e){return{wrapper:'<span class="'+e.wrapper+'"></span>',menu:'<div class="'+e.menu+'"></div>'}}function r(e){var n={};return t.each(e,function(e,t){n[t]="."+e}),n}function i(){var e={wrapper:{position:"relative",display:"inline-block"},hint:{position:"absolute",top:"0",left:"0",borderColor:"transparent",boxShadow:"none",opacity:"1"},input:{position:"relative",verticalAlign:"top",backgroundColor:"transparent"},inputWithNoHint:{position:"relative",verticalAlign:"top"},menu:{position:"absolute",top:"100%",left:"0",zIndex:"100",display:"none"},ltr:{left:"0",right:"auto"},rtl:{left:"auto",right:" 0"}};return t.isMsie()&&t.mixin(e.input,{backgroundImage:"url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)"}),e}var o={wrapper:"twitter-typeahead",input:"tt-input",hint:"tt-hint",menu:"tt-menu",dataset:"tt-dataset",suggestion:"tt-suggestion",selectable:"tt-selectable",empty:"tt-empty",open:"tt-open",cursor:"tt-cursor",highlight:"tt-highlight"};return e}(),r=function(){"use strict";function n(t){t&&t.el||e.error("EventBus initialized without el"),this.$el=e(t.el)}var r,i;return r="typeahead:",i={render:"rendered",cursorchange:"cursorchanged",select:"selected",autocomplete:"autocompleted"},t.mixin(n.prototype,{_trigger:function(t,n){var i;return i=e.Event(r+t),(n=n||[]).unshift(i),this.$el.trigger.apply(this.$el,n),i},before:function(e){var t,n;return t=[].slice.call(arguments,1),n=this._trigger("before"+e,t),n.isDefaultPrevented()},trigger:function(e){var t;this._trigger(e,[].slice.call(arguments,1)),(t=i[e])&&this._trigger(t,[].slice.call(arguments,1))}}),n}(),i=function(){"use strict";function e(e,t,n,r){var i;if(!n)return this;for(t=t.split(u),n=r?s(n,r):n,this._callbacks=this._callbacks||{};i=t.shift();)this._callbacks[i]=this._callbacks[i]||{sync:[],async:[]},this._callbacks[i][e].push(n);return this}function t(t,n,r){return e.call(this,"async",t,n,r)}function n(t,n,r){return e.call(this,"sync",t,n,r)}function r(e){var t;if(!this._callbacks)return this;for(e=e.split(u);t=e.shift();)delete this._callbacks[t];return this}function i(e){var t,n,r,i,a;if(!this._callbacks)return this;for(e=e.split(u),r=[].slice.call(arguments,1);(t=e.shift())&&(n=this._callbacks[t]);)i=o(n.sync,this,[t].concat(r)),a=o(n.async,this,[t].concat(r)),i()&&c(a);return this}function o(e,t,n){function r(){for(var r,i=0,o=e.length;!r&&o>i;i+=1)r=e[i].apply(t,n)===!1;return!r}return r}function a(){var e;return e=window.setImmediate?function(e){setImmediate(function(){e()})}:function(e){setTimeout(function(){e()},0)}}function s(e,t){return e.bind?e.bind(t):function(){e.apply(t,[].slice.call(arguments,0))}}var u=/\s+/,c=a();return{onSync:n,onAsync:t,off:r,trigger:i}}(),o=function(e){"use strict";function n(e,n,r){for(var i,o=[],a=0,s=e.length;s>a;a++)o.push(t.escapeRegExChars(e[a]));return i=r?"\\b("+o.join("|")+")\\b":"("+o.join("|")+")",n?new RegExp(i):new RegExp(i,"i")}var r={node:null,pattern:null,tagName:"strong",className:null,wordsOnly:!1,caseSensitive:!1};return function(i){function o(t){var n,r,o;return(n=s.exec(t.data))&&(o=e.createElement(i.tagName),i.className&&(o.className=i.className),r=t.splitText(n.index),r.splitText(n[0].length),o.appendChild(r.cloneNode(!0)),t.parentNode.replaceChild(o,r)),!!n}function a(e,t){for(var n,r=3,i=0;i<e.childNodes.length;i++)n=e.childNodes[i],n.nodeType===r?i+=t(n)?1:0:a(n,t)}var s;i=t.mixin({},r,i),i.node&&i.pattern&&(i.pattern=t.isArray(i.pattern)?i.pattern:[i.pattern],s=n(i.pattern,i.caseSensitive,i.wordsOnly),a(i.node,o))}}(window.document),a=function(){"use strict";function n(n,i){n=n||{},n.input||e.error("input is missing"),i.mixin(this),this.$hint=e(n.hint),this.$input=e(n.input),this.query=this.$input.val(),this.queryWhenFocused=this.hasFocus()?this.query:null,this.$overflowHelper=r(this.$input),this._checkLanguageDirection(),0===this.$hint.length&&(this.setHint=this.getHint=this.clearHint=this.clearHintIfInvalid=t.noop)}function r(t){return e('<pre aria-hidden="true"></pre>').css({position:"absolute",visibility:"hidden",whiteSpace:"pre",fontFamily:t.css("font-family"),fontSize:t.css("font-size"),fontStyle:t.css("font-style"),fontVariant:t.css("font-variant"),fontWeight:t.css("font-weight"),wordSpacing:t.css("word-spacing"),letterSpacing:t.css("letter-spacing"),textIndent:t.css("text-indent"),textRendering:t.css("text-rendering"),textTransform:t.css("text-transform")}).insertAfter(t)}function o(e,t){return n.normalizeQuery(e)===n.normalizeQuery(t)}function a(e){return e.altKey||e.ctrlKey||e.metaKey||e.shiftKey}var s;return s={9:"tab",27:"esc",37:"left",39:"right",13:"enter",38:"up",40:"down"},n.normalizeQuery=function(e){return t.toStr(e).replace(/^\s*/g,"").replace(/\s{2,}/g," ")},t.mixin(n.prototype,i,{_onBlur:function(){this.resetInputValue(),this.trigger("blurred")},_onFocus:function(){this.queryWhenFocused=this.query,this.trigger("focused")},_onKeydown:function(e){var t=s[e.which||e.keyCode];this._managePreventDefault(t,e),t&&this._shouldTrigger(t,e)&&this.trigger(t+"Keyed",e)},_onInput:function(){this._setQuery(this.getInputValue()),this.clearHintIfInvalid(),this._checkLanguageDirection()},_managePreventDefault:function(e,t){var n;switch(e){case"up":case"down":n=!a(t);break;default:n=!1}n&&t.preventDefault()},_shouldTrigger:function(e,t){var n;switch(e){case"tab":n=!a(t);break;default:n=!0}return n},_checkLanguageDirection:function(){var e=(this.$input.css("direction")||"ltr").toLowerCase();this.dir!==e&&(this.dir=e,this.$hint.attr("dir",e),this.trigger("langDirChanged",e))},_setQuery:function(e,t){var n,r;n=o(e,this.query),r=n?this.query.length!==e.length:!1,this.query=e,t||n?!t&&r&&this.trigger("whitespaceChanged",this.query):this.trigger("queryChanged",this.query)},bind:function(){var e,n,r,i,o=this;return e=t.bind(this._onBlur,this),n=t.bind(this._onFocus,this),r=t.bind(this._onKeydown,this),i=t.bind(this._onInput,this),this.$input.on("blur.tt",e).on("focus.tt",n).on("keydown.tt",r),!t.isMsie()||t.isMsie()>9?this.$input.on("input.tt",i):this.$input.on("keydown.tt keypress.tt cut.tt paste.tt",function(e){s[e.which||e.keyCode]||t.defer(t.bind(o._onInput,o,e))}),this},focus:function(){this.$input.focus()},blur:function(){this.$input.blur()},getLangDir:function(){return this.dir},getQuery:function(){return this.query||""},setQuery:function(e,t){this.setInputValue(e),this._setQuery(e,t)},hasQueryChangedSinceLastFocus:function(){return this.query!==this.queryWhenFocused},getInputValue:function(){return this.$input.val()},setInputValue:function(e){this.$input.val(e),this.clearHintIfInvalid(),this._checkLanguageDirection()},resetInputValue:function(){this.setInputValue(this.query)},getHint:function(){return this.$hint.val()},setHint:function(e){this.$hint.val(e)},clearHint:function(){this.setHint("")},clearHintIfInvalid:function(){var e,t,n,r;e=this.getInputValue(),t=this.getHint(),n=e!==t&&0===t.indexOf(e),r=""!==e&&n&&!this.hasOverflow(),!r&&this.clearHint()},hasFocus:function(){return this.$input.is(":focus")},hasOverflow:function(){var e=this.$input.width()-2;return this.$overflowHelper.text(this.getInputValue()),this.$overflowHelper.width()>=e},isCursorAtEnd:function(){var e,n,r;return e=this.$input.val().length,n=this.$input[0].selectionStart,t.isNumber(n)?n===e:document.selection?(r=document.selection.createRange(),r.moveStart("character",-e),e===r.text.length):!0},destroy:function(){this.$hint.off(".tt"),this.$input.off(".tt"),this.$overflowHelper.remove(),this.$hint=this.$input=this.$overflowHelper=e("<div>")}}),n}(),s=function(){"use strict";function n(n,i){n=n||{},n.templates=n.templates||{},n.templates.notFound=n.templates.notFound||n.templates.empty,n.source||e.error("missing source"),n.node||e.error("missing node"),n.name&&!s(n.name)&&e.error("invalid dataset name: "+n.name),i.mixin(this),this.highlight=!!n.highlight,this.name=n.name||c(),this.limit=n.limit||5,this.displayFn=r(n.display||n.displayKey),this.templates=a(n.templates,this.displayFn),this.source=n.source.__ttAdapter?n.source.__ttAdapter():n.source,this.async=t.isUndefined(n.async)?this.source.length>2:!!n.async,this._resetLastSuggestion(),this.$el=e(n.node).addClass(this.classes.dataset).addClass(this.classes.dataset+"-"+this.name)}function r(e){function n(t){return t[e]}return e=e||t.stringify,t.isFunction(e)?e:n}function a(n,r){function i(t){return e("<div>").text(r(t))}return{notFound:n.notFound&&t.templatify(n.notFound),pending:n.pending&&t.templatify(n.pending),header:n.header&&t.templatify(n.header),footer:n.footer&&t.templatify(n.footer),suggestion:n.suggestion||i}}function s(e){return/^[_a-zA-Z0-9-]+$/.test(e)}var u,c;return u={val:"tt-selectable-display",obj:"tt-selectable-object"},c=t.getIdGenerator(),n.extractData=function(t){var n=e(t);return n.data(u.obj)?{val:n.data(u.val)||"",obj:n.data(u.obj)||null}:null},t.mixin(n.prototype,i,{_overwrite:function(e,t){t=t||[],t.length?this._renderSuggestions(e,t):this.async&&this.templates.pending?this._renderPending(e):!this.async&&this.templates.notFound?this._renderNotFound(e):this._empty(),this.trigger("rendered",this.name,t,!1)},_append:function(e,t){t=t||[],t.length&&this.$lastSuggestion.length?this._appendSuggestions(e,t):t.length?this._renderSuggestions(e,t):!this.$lastSuggestion.length&&this.templates.notFound&&this._renderNotFound(e),this.trigger("rendered",this.name,t,!0)},_renderSuggestions:function(e,t){var n;n=this._getSuggestionsFragment(e,t),this.$lastSuggestion=n.children().last(),this.$el.html(n).prepend(this._getHeader(e,t)).append(this._getFooter(e,t))},_appendSuggestions:function(e,t){var n,r;n=this._getSuggestionsFragment(e,t),r=n.children().last(),this.$lastSuggestion.after(n),this.$lastSuggestion=r},_renderPending:function(e){var t=this.templates.pending;this._resetLastSuggestion(),t&&this.$el.html(t({query:e,dataset:this.name}))},_renderNotFound:function(e){var t=this.templates.notFound;this._resetLastSuggestion(),t&&this.$el.html(t({query:e,dataset:this.name}))},_empty:function(){this.$el.empty(),this._resetLastSuggestion()},_getSuggestionsFragment:function(n,r){var i,a=this;return i=document.createDocumentFragment(),t.each(r,function(t){var r,o;o=a._injectQuery(n,t),r=e(a.templates.suggestion(o)).data(u.obj,t).data(u.val,a.displayFn(t)).addClass(a.classes.suggestion+" "+a.classes.selectable),i.appendChild(r[0])}),this.highlight&&o({className:this.classes.highlight,node:i,pattern:n}),e(i)},_getFooter:function(e,t){return this.templates.footer?this.templates.footer({query:e,suggestions:t,dataset:this.name}):null},_getHeader:function(e,t){return this.templates.header?this.templates.header({query:e,suggestions:t,dataset:this.name}):null},_resetLastSuggestion:function(){this.$lastSuggestion=e()},_injectQuery:function(e,n){return t.isObject(n)?t.mixin({_query:e},n):n},update:function(t){function n(e){a||(a=!0,e=(e||[]).slice(0,i.limit),s=e.length,i._overwrite(t,e),s<i.limit&&i.async&&i.trigger("asyncRequested",t))}function r(n){n=n||[],!o&&s<i.limit&&(i.cancel=e.noop,s+=n.length,i._append(t,n.slice(0,i.limit-s)),i.async&&i.trigger("asyncReceived",t))}var i=this,o=!1,a=!1,s=0;this.cancel(),this.cancel=function(){o=!0,i.cancel=e.noop,i.async&&i.trigger("asyncCanceled",t)},this.source(t,n,r),!a&&n([])},cancel:e.noop,clear:function(){this._empty(),this.cancel(),this.trigger("cleared")},isEmpty:function(){return this.$el.is(":empty")},destroy:function(){this.$el=e("<div>")}}),n}(),u=function(){"use strict";function n(n,r){function i(t){var n=o.$node.find(t.node).first();return t.node=n.length?n:e("<div>").appendTo(o.$node),new s(t,r)}var o=this;n=n||{},n.node||e.error("node is required"),r.mixin(this),this.$node=e(n.node),this.query=null,this.datasets=t.map(n.datasets,i)}return t.mixin(n.prototype,i,{_onSelectableClick:function(t){this.trigger("selectableClicked",e(t.currentTarget))},_onRendered:function(e,t,n,r){this.$node.toggleClass(this.classes.empty,this._allDatasetsEmpty()),this.trigger("datasetRendered",t,n,r)},_onCleared:function(){this.$node.toggleClass(this.classes.empty,this._allDatasetsEmpty()),this.trigger("datasetCleared")},_propagate:function(){this.trigger.apply(this,arguments)},_allDatasetsEmpty:function(){function e(e){return e.isEmpty()}return t.every(this.datasets,e)},_getSelectables:function(){return this.$node.find(this.selectors.selectable)},_removeCursor:function(){var e=this.getActiveSelectable();e&&e.removeClass(this.classes.cursor)},_ensureVisible:function(e){var t,n,r,i;t=e.position().top,n=t+e.outerHeight(!0),r=this.$node.scrollTop(),i=this.$node.height()+parseInt(this.$node.css("paddingTop"),10)+parseInt(this.$node.css("paddingBottom"),10),0>t?this.$node.scrollTop(r+t):n>i&&this.$node.scrollTop(r+(n-i))},bind:function(){var e,n=this;return e=t.bind(this._onSelectableClick,this),this.$node.on("click.tt",this.selectors.selectable,e),t.each(this.datasets,function(e){e.onSync("asyncRequested",n._propagate,n).onSync("asyncCanceled",n._propagate,n).onSync("asyncReceived",n._propagate,n).onSync("rendered",n._onRendered,n).onSync("cleared",n._onCleared,n)}),this},isOpen:function(){return this.$node.hasClass(this.classes.open)},open:function(){this.$node.addClass(this.classes.open)},close:function(){this.$node.removeClass(this.classes.open),this._removeCursor()},setLanguageDirection:function(e){this.$node.attr("dir",e)},selectableRelativeToCursor:function(e){var t,n,r,i;return n=this.getActiveSelectable(),t=this._getSelectables(),r=n?t.index(n):-1,i=r+e,i=(i+1)%(t.length+1)-1,i=-1>i?t.length-1:i,-1===i?null:t.eq(i)},setCursor:function(e){this._removeCursor(),(e=e&&e.first())&&(e.addClass(this.classes.cursor),this._ensureVisible(e))},getSelectableData:function(e){return e&&e.length?s.extractData(e):null},getActiveSelectable:function(){var e=this._getSelectables().filter(this.selectors.cursor).first();return e.length?e:null},getTopSelectable:function(){var e=this._getSelectables().first();return e.length?e:null},update:function(e){function n(t){t.update(e)}var r=e!==this.query;return r&&(this.query=e,t.each(this.datasets,n)),r},empty:function(){function e(e){e.clear()}t.each(this.datasets,e),this.query=null,this.$node.addClass(this.classes.empty)},destroy:function(){function n(e){e.destroy()}this.$node.off(".tt"),this.$node=e("<div>"),t.each(this.datasets,n)}}),n}(),c=function(){"use strict";function e(){u.apply(this,[].slice.call(arguments,0))}var n=u.prototype;return t.mixin(e.prototype,u.prototype,{open:function(){return!this._allDatasetsEmpty()&&this._show(),n.open.apply(this,[].slice.call(arguments,0))},close:function(){return this._hide(),n.close.apply(this,[].slice.call(arguments,0))},_onRendered:function(){return this._allDatasetsEmpty()?this._hide():this.isOpen()&&this._show(),n._onRendered.apply(this,[].slice.call(arguments,0))},_onCleared:function(){return this._allDatasetsEmpty()?this._hide():this.isOpen()&&this._show(),n._onCleared.apply(this,[].slice.call(arguments,0))},setLanguageDirection:function(e){return this.$node.css("ltr"===e?this.css.ltr:this.css.rtl),n.setLanguageDirection.apply(this,[].slice.call(arguments,0))},_hide:function(){this.$node.hide()},_show:function(){this.$node.css("display","block")}}),e}(),l=function(){"use strict";function n(n,i){var o,a,s,u,c,l,p,f,h,d,m;n=n||{},n.input||e.error("missing input"),n.menu||e.error("missing menu"),n.eventBus||e.error("missing event bus"),i.mixin(this),this.eventBus=n.eventBus,this.minLength=t.isNumber(n.minLength)?n.minLength:1,this.input=n.input,this.menu=n.menu,this.enabled=!0,this.active=!1,this.input.hasFocus()&&this.activate(),this.dir=this.input.getLangDir(),this._hacks(),this.menu.bind().onSync("selectableClicked",this._onSelectableClicked,this).onSync("asyncRequested",this._onAsyncRequested,this).onSync("asyncCanceled",this._onAsyncCanceled,this).onSync("asyncReceived",this._onAsyncReceived,this).onSync("datasetRendered",this._onDatasetRendered,this).onSync("datasetCleared",this._onDatasetCleared,this),o=r(this,"activate","open","_onFocused"),a=r(this,"deactivate","_onBlurred"),s=r(this,"isActive","isOpen","_onEnterKeyed"),u=r(this,"isActive","isOpen","_onTabKeyed"),c=r(this,"isActive","_onEscKeyed"),l=r(this,"isActive","open","_onUpKeyed"),p=r(this,"isActive","open","_onDownKeyed"),f=r(this,"isActive","isOpen","_onLeftKeyed"),h=r(this,"isActive","isOpen","_onRightKeyed"),d=r(this,"_openIfActive","_onQueryChanged"),m=r(this,"_openIfActive","_onWhitespaceChanged"),this.input.bind().onSync("focused",o,this).onSync("blurred",a,this).onSync("enterKeyed",s,this).onSync("tabKeyed",u,this).onSync("escKeyed",c,this).onSync("upKeyed",l,this).onSync("downKeyed",p,this).onSync("leftKeyed",f,this).onSync("rightKeyed",h,this).onSync("queryChanged",d,this).onSync("whitespaceChanged",m,this).onSync("langDirChanged",this._onLangDirChanged,this)}function r(e){var n=[].slice.call(arguments,1);return function(){var r=[].slice.call(arguments);t.each(n,function(t){return e[t].apply(e,r)})}}return t.mixin(n.prototype,{_hacks:function(){var n,r;n=this.input.$input||e("<div>"),r=this.menu.$node||e("<div>"),n.on("blur.tt",function(e){var i,o,a;i=document.activeElement,o=r.is(i),a=r.has(i).length>0,t.isMsie()&&(o||a)&&(e.preventDefault(),e.stopImmediatePropagation(),t.defer(function(){n.focus()}))}),r.on("mousedown.tt",function(e){e.preventDefault()})},_onSelectableClicked:function(e,t){this.select(t)},_onDatasetCleared:function(){this._updateHint()},_onDatasetRendered:function(e,t,n,r){this._updateHint(),this.eventBus.trigger("render",n,r,t)},_onAsyncRequested:function(e,t,n){this.eventBus.trigger("asyncrequest",n,t)},_onAsyncCanceled:function(e,t,n){this.eventBus.trigger("asynccancel",n,t)},_onAsyncReceived:function(e,t,n){this.eventBus.trigger("asyncreceive",n,t)},_onFocused:function(){this._minLengthMet()&&this.menu.update(this.input.getQuery());
},_onBlurred:function(){this.input.hasQueryChangedSinceLastFocus()&&this.eventBus.trigger("change",this.input.getQuery())},_onEnterKeyed:function(e,t){var n;(n=this.menu.getActiveSelectable())&&this.select(n)&&t.preventDefault()},_onTabKeyed:function(e,t){var n;(n=this.menu.getActiveSelectable())?this.select(n)&&t.preventDefault():(n=this.menu.getTopSelectable())&&this.autocomplete(n)&&t.preventDefault()},_onEscKeyed:function(){this.close()},_onUpKeyed:function(){this.moveCursor(-1)},_onDownKeyed:function(){this.moveCursor(1)},_onLeftKeyed:function(){"rtl"===this.dir&&this.input.isCursorAtEnd()&&this.autocomplete(this.menu.getTopSelectable())},_onRightKeyed:function(){"ltr"===this.dir&&this.input.isCursorAtEnd()&&this.autocomplete(this.menu.getTopSelectable())},_onQueryChanged:function(e,t){this._minLengthMet(t)?this.menu.update(t):this.menu.empty()},_onWhitespaceChanged:function(){this._updateHint()},_onLangDirChanged:function(e,t){this.dir!==t&&(this.dir=t,this.menu.setLanguageDirection(t))},_openIfActive:function(){this.isActive()&&this.open()},_minLengthMet:function(e){return e=t.isString(e)?e:this.input.getQuery()||"",e.length>=this.minLength},_updateHint:function(){var e,n,r,i,o,s,u;e=this.menu.getTopSelectable(),n=this.menu.getSelectableData(e),r=this.input.getInputValue(),!n||t.isBlankString(r)||this.input.hasOverflow()?this.input.clearHint():(i=a.normalizeQuery(r),o=t.escapeRegExChars(i),s=new RegExp("^(?:"+o+")(.+$)","i"),u=s.exec(n.val),u&&this.input.setHint(r+u[1]))},isEnabled:function(){return this.enabled},enable:function(){this.enabled=!0},disable:function(){this.enabled=!1},isActive:function(){return this.active},activate:function(){return this.isActive()?!0:!this.isEnabled()||this.eventBus.before("active")?!1:(this.active=!0,this.eventBus.trigger("active"),!0)},deactivate:function(){return this.isActive()?this.eventBus.before("idle")?!1:(this.active=!1,this.close(),this.eventBus.trigger("idle"),!0):!0},isOpen:function(){return this.menu.isOpen()},open:function(){return this.isOpen()||this.eventBus.before("open")||(this.menu.open(),this._updateHint(),this.eventBus.trigger("open")),this.isOpen()},close:function(){return this.isOpen()&&!this.eventBus.before("close")&&(this.menu.close(),this.input.clearHint(),this.input.resetInputValue(),this.eventBus.trigger("close")),!this.isOpen()},setVal:function(e){this.input.setQuery(t.toStr(e))},getVal:function(){return this.input.getQuery()},select:function(e){var t=this.menu.getSelectableData(e);return t&&!this.eventBus.before("select",t.obj)?(this.input.setQuery(t.val,!0),this.eventBus.trigger("select",t.obj),this.close(),!0):!1},autocomplete:function(e){var t,n,r;return t=this.input.getQuery(),n=this.menu.getSelectableData(e),r=n&&t!==n.val,r&&!this.eventBus.before("autocomplete",n.obj)?(this.input.setQuery(n.val),this.eventBus.trigger("autocomplete",n.obj),!0):!1},moveCursor:function(e){var t,n,r,i,o;return t=this.input.getQuery(),n=this.menu.selectableRelativeToCursor(e),r=this.menu.getSelectableData(n),i=r?r.obj:null,o=this._minLengthMet()&&this.menu.update(t),o||this.eventBus.before("cursorchange",i)?!1:(this.menu.setCursor(n),r?this.input.setInputValue(r.val):(this.input.resetInputValue(),this._updateHint()),this.eventBus.trigger("cursorchange",i),!0)},destroy:function(){this.input.destroy(),this.menu.destroy()}}),n}();!function(){"use strict";function i(t,n){t.each(function(){var t,r=e(this);(t=r.data(m.typeahead))&&n(t,r)})}function o(e,t){return e.clone().addClass(t.classes.hint).removeData().css(t.css.hint).css(p(e)).prop("readonly",!0).removeAttr("id name placeholder required").attr({autocomplete:"off",spellcheck:"false",tabindex:-1})}function s(e,t){e.data(m.attrs,{dir:e.attr("dir"),autocomplete:e.attr("autocomplete"),spellcheck:e.attr("spellcheck"),style:e.attr("style")}),e.addClass(t.classes.input).attr({autocomplete:"off",spellcheck:!1});try{!e.attr("dir")&&e.attr("dir","auto")}catch(n){}return e}function p(e){return{backgroundAttachment:e.css("background-attachment"),backgroundClip:e.css("background-clip"),backgroundColor:e.css("background-color"),backgroundImage:e.css("background-image"),backgroundOrigin:e.css("background-origin"),backgroundPosition:e.css("background-position"),backgroundRepeat:e.css("background-repeat"),backgroundSize:e.css("background-size")}}function f(e){var n,r;n=e.data(m.www),r=e.parent().filter(n.selectors.wrapper),t.each(e.data(m.attrs),function(n,r){t.isUndefined(n)?e.removeAttr(r):e.attr(r,n)}),e.removeData(m.typeahead).removeData(m.www).removeData(m.attr).removeClass(n.classes.input),r.length&&(e.detach().insertAfter(r),r.remove())}function h(n){var r,i;return r=t.isJQuery(n)||t.isElement(n),i=r?e(n).first():[],i.length?i:null}var d,m,g;d=e.fn.typeahead,m={www:"tt-www",attrs:"tt-attrs",typeahead:"tt-typeahead"},g={initialize:function(i,p){function f(){var n,f,g,v,y,b,x,w,C,E,S;t.each(p,function(e){e.highlight=!!i.highlight}),n=e(this),f=e(d.html.wrapper),g=h(i.hint),v=h(i.menu),y=i.hint!==!1&&!g,b=i.menu!==!1&&!v,y&&(g=o(n,d)),b&&(v=e(d.html.menu).css(d.css.menu)),g&&g.val(""),n=s(n,d),(y||b)&&(f.css(d.css.wrapper),n.css(y?d.css.input:d.css.inputWithNoHint),n.wrap(f).parent().prepend(y?g:null).append(b?v:null)),S=b?c:u,x=new r({el:n}),w=new a({hint:g,input:n},d),C=new S({node:v,datasets:p},d),E=new l({input:w,menu:C,eventBus:x,minLength:i.minLength},d),n.data(m.www,d),n.data(m.typeahead,E)}var d;return p=t.isArray(p)?p:[].slice.call(arguments,1),i=i||{},d=n(i.classNames),this.each(f)},isEnabled:function(){var e;return i(this.first(),function(t){e=t.isEnabled()}),e},enable:function(){return i(this,function(e){e.enable()}),this},disable:function(){return i(this,function(e){e.disable()}),this},isActive:function(){var e;return i(this.first(),function(t){e=t.isActive()}),e},activate:function(){return i(this,function(e){e.activate()}),this},deactivate:function(){return i(this,function(e){e.deactivate()}),this},isOpen:function(){var e;return i(this.first(),function(t){e=t.isOpen()}),e},open:function(){return i(this,function(e){e.open()}),this},close:function(){return i(this,function(e){e.close()}),this},select:function(t){var n=!1,r=e(t);return i(this.first(),function(e){n=e.select(r)}),n},autocomplete:function(t){var n=!1,r=e(t);return i(this.first(),function(e){n=e.autocomplete(r)}),n},moveCursor:function(e){var t=!1;return i(this.first(),function(n){t=n.moveCursor(e)}),t},val:function(e){var t;return arguments.length?(i(this,function(t){t.setVal(e)}),this):(i(this.first(),function(e){t=e.getVal()}),t)},destroy:function(){return i(this,function(e,t){f(t),e.destroy()}),this}},e.fn.typeahead=function(e){return g[e]?g[e].apply(this,[].slice.call(arguments,1)):g.initialize.apply(this,arguments)},e.fn.typeahead.noConflict=function(){return e.fn.typeahead=d,this}}()});