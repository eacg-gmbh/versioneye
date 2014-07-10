window.Modernizr=function(e,t,n){function i(e){y.cssText=e}function a(e,t){return i(x.join(e+";")+(t||""))}function r(e,t){return typeof e===t}function o(e,t){return!!~(""+e).indexOf(t)}function s(e,t){for(var i in e){var a=e[i];if(!o(a,"-")&&y[a]!==n)return"pfx"==t?a:!0}return!1}function l(e,t,i){for(var a in e){var o=t[e[a]];if(o!==n)return i===!1?e[a]:r(o,"function")?o.bind(i||t):o}return!1}function u(e,t,n){var i=e.charAt(0).toUpperCase()+e.slice(1),a=(e+" "+S.join(i+" ")+i).split(" ");return r(t,"string")||r(t,"undefined")?s(a,t):(a=(e+" "+j.join(i+" ")+i).split(" "),l(a,t,n))}function c(){p.input=function(n){for(var i=0,a=n.length;a>i;i++)T[n[i]]=n[i]in w;return T.list&&(T.list=!!t.createElement("datalist")&&!!e.HTMLDataListElement),T}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),p.inputtypes=function(e){for(var i,a,r,o=0,s=e.length;s>o;o++)w.setAttribute("type",a=e[o]),i="text"!==w.type,i&&(w.value=_,w.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(a)&&w.style.WebkitAppearance!==n?(g.appendChild(w),r=t.defaultView,i=r.getComputedStyle&&"textfield"!==r.getComputedStyle(w,null).WebkitAppearance&&0!==w.offsetHeight,g.removeChild(w)):/^(search|tel)$/.test(a)||(i=/^(url|email)$/.test(a)?w.checkValidity&&w.checkValidity()===!1:w.value!=_)),E[e[o]]=!!i;return E}("search tel url email datetime date month week time datetime-local number range color".split(" "))}var h,f,d="2.6.2",p={},m=!0,g=t.documentElement,b="modernizr",v=t.createElement(b),y=v.style,w=t.createElement("input"),_=":)",k={}.toString,x=" -webkit- -moz- -o- -ms- ".split(" "),C="Webkit Moz O ms",S=C.split(" "),j=C.toLowerCase().split(" "),M={svg:"http://www.w3.org/2000/svg"},F={},E={},T={},A=[],B=A.slice,D=function(e,n,i,a){var r,o,s,l,u=t.createElement("div"),c=t.body,h=c||t.createElement("body");if(parseInt(i,10))for(;i--;)s=t.createElement("div"),s.id=a?a[i]:b+(i+1),u.appendChild(s);return r=["&#173;",'<style id="s',b,'">',e,"</style>"].join(""),u.id=b,(c?u:h).innerHTML+=r,h.appendChild(u),c||(h.style.background="",h.style.overflow="hidden",l=g.style.overflow,g.style.overflow="hidden",g.appendChild(h)),o=n(u,e),c?u.parentNode.removeChild(u):(h.parentNode.removeChild(h),g.style.overflow=l),!!o},q=function(){function e(e,a){a=a||t.createElement(i[e]||"div"),e="on"+e;var o=e in a;return o||(a.setAttribute||(a=t.createElement("div")),a.setAttribute&&a.removeAttribute&&(a.setAttribute(e,""),o=r(a[e],"function"),r(a[e],"undefined")||(a[e]=n),a.removeAttribute(e))),a=null,o}var i={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return e}(),P={}.hasOwnProperty;f=r(P,"undefined")||r(P.call,"undefined")?function(e,t){return t in e&&r(e.constructor.prototype[t],"undefined")}:function(e,t){return P.call(e,t)},Function.prototype.bind||(Function.prototype.bind=function(e){var t=this;if("function"!=typeof t)throw new TypeError;var n=B.call(arguments,1),i=function(){if(this instanceof i){var a=function(){};a.prototype=t.prototype;var r=new a,o=t.apply(r,n.concat(B.call(arguments)));return Object(o)===o?o:r}return t.apply(e,n.concat(B.call(arguments)))};return i}),F.flexbox=function(){return u("flexWrap")},F.flexboxlegacy=function(){return u("boxDirection")},F.canvas=function(){var e=t.createElement("canvas");return!!e.getContext&&!!e.getContext("2d")},F.canvastext=function(){return!!p.canvas&&!!r(t.createElement("canvas").getContext("2d").fillText,"function")},F.webgl=function(){return!!e.WebGLRenderingContext},F.touch=function(){var n;return"ontouchstart"in e||e.DocumentTouch&&t instanceof DocumentTouch?n=!0:D(["@media (",x.join("touch-enabled),("),b,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(e){n=9===e.offsetTop}),n},F.geolocation=function(){return"geolocation"in navigator},F.postmessage=function(){return!!e.postMessage},F.websqldatabase=function(){return!!e.openDatabase},F.indexedDB=function(){return!!u("indexedDB",e)},F.hashchange=function(){return q("hashchange",e)&&(t.documentMode===n||t.documentMode>7)},F.history=function(){return!!e.history&&!!history.pushState},F.draganddrop=function(){var e=t.createElement("div");return"draggable"in e||"ondragstart"in e&&"ondrop"in e},F.websockets=function(){return"WebSocket"in e||"MozWebSocket"in e},F.rgba=function(){return i("background-color:rgba(150,255,150,.5)"),o(y.backgroundColor,"rgba")},F.hsla=function(){return i("background-color:hsla(120,40%,100%,.5)"),o(y.backgroundColor,"rgba")||o(y.backgroundColor,"hsla")},F.multiplebgs=function(){return i("background:url(https://),url(https://),red url(https://)"),/(url\s*\(.*?){3}/.test(y.background)},F.backgroundsize=function(){return u("backgroundSize")},F.borderimage=function(){return u("borderImage")},F.borderradius=function(){return u("borderRadius")},F.boxshadow=function(){return u("boxShadow")},F.textshadow=function(){return""===t.createElement("div").style.textShadow},F.opacity=function(){return a("opacity:.55"),/^0.55$/.test(y.opacity)},F.cssanimations=function(){return u("animationName")},F.csscolumns=function(){return u("columnCount")},F.cssgradients=function(){var e="background-image:",t="gradient(linear,left top,right bottom,from(#9f9),to(white));",n="linear-gradient(left top,#9f9, white);";return i((e+"-webkit- ".split(" ").join(t+e)+x.join(n+e)).slice(0,-e.length)),o(y.backgroundImage,"gradient")},F.cssreflections=function(){return u("boxReflect")},F.csstransforms=function(){return!!u("transform")},F.csstransforms3d=function(){var e=!!u("perspective");return e&&"webkitPerspective"in g.style&&D("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(t){e=9===t.offsetLeft&&3===t.offsetHeight}),e},F.csstransitions=function(){return u("transition")},F.fontface=function(){var e;return D('@font-face {font-family:"font";src:url("https://")}',function(n,i){var a=t.getElementById("smodernizr"),r=a.sheet||a.styleSheet,o=r?r.cssRules&&r.cssRules[0]?r.cssRules[0].cssText:r.cssText||"":"";e=/src/i.test(o)&&0===o.indexOf(i.split(" ")[0])}),e},F.generatedcontent=function(){var e;return D(["#",b,"{font:0/0 a}#",b,':after{content:"',_,'";visibility:hidden;font:3px/1 a}'].join(""),function(t){e=t.offsetHeight>=3}),e},F.video=function(){var e=t.createElement("video"),n=!1;try{(n=!!e.canPlayType)&&(n=new Boolean(n),n.ogg=e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),n.h264=e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),n.webm=e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,""))}catch(i){}return n},F.audio=function(){var e=t.createElement("audio"),n=!1;try{(n=!!e.canPlayType)&&(n=new Boolean(n),n.ogg=e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),n.mp3=e.canPlayType("audio/mpeg;").replace(/^no$/,""),n.wav=e.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),n.m4a=(e.canPlayType("audio/x-m4a;")||e.canPlayType("audio/aac;")).replace(/^no$/,""))}catch(i){}return n},F.localstorage=function(){try{return localStorage.setItem(b,b),localStorage.removeItem(b),!0}catch(e){return!1}},F.sessionstorage=function(){try{return sessionStorage.setItem(b,b),sessionStorage.removeItem(b),!0}catch(e){return!1}},F.webworkers=function(){return!!e.Worker},F.applicationcache=function(){return!!e.applicationCache},F.svg=function(){return!!t.createElementNS&&!!t.createElementNS(M.svg,"svg").createSVGRect},F.inlinesvg=function(){var e=t.createElement("div");return e.innerHTML="<svg/>",(e.firstChild&&e.firstChild.namespaceURI)==M.svg},F.smil=function(){return!!t.createElementNS&&/SVGAnimate/.test(k.call(t.createElementNS(M.svg,"animate")))},F.svgclippaths=function(){return!!t.createElementNS&&/SVGClipPath/.test(k.call(t.createElementNS(M.svg,"clipPath")))};for(var L in F)f(F,L)&&(h=L.toLowerCase(),p[h]=F[L](),A.push((p[h]?"":"no-")+h));return p.input||c(),p.addTest=function(e,t){if("object"==typeof e)for(var i in e)f(e,i)&&p.addTest(i,e[i]);else{if(e=e.toLowerCase(),p[e]!==n)return p;t="function"==typeof t?t():t,"undefined"!=typeof m&&m&&(g.className+=" "+(t?"":"no-")+e),p[e]=t}return p},i(""),v=w=null,function(e,t){function n(e,t){var n=e.createElement("p"),i=e.getElementsByTagName("head")[0]||e.documentElement;return n.innerHTML="x<style>"+t+"</style>",i.insertBefore(n.lastChild,i.firstChild)}function i(){var e=b.elements;return"string"==typeof e?e.split(" "):e}function a(e){var t=g[e[p]];return t||(t={},m++,e[p]=m,g[m]=t),t}function r(e,n,i){if(n||(n=t),c)return n.createElement(e);i||(i=a(n));var r;return r=i.cache[e]?i.cache[e].cloneNode():d.test(e)?(i.cache[e]=i.createElem(e)).cloneNode():i.createElem(e),r.canHaveChildren&&!f.test(e)?i.frag.appendChild(r):r}function o(e,n){if(e||(e=t),c)return e.createDocumentFragment();n=n||a(e);for(var r=n.frag.cloneNode(),o=0,s=i(),l=s.length;l>o;o++)r.createElement(s[o]);return r}function s(e,t){t.cache||(t.cache={},t.createElem=e.createElement,t.createFrag=e.createDocumentFragment,t.frag=t.createFrag()),e.createElement=function(n){return b.shivMethods?r(n,e,t):t.createElem(n)},e.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+i().join().replace(/\w+/g,function(e){return t.createElem(e),t.frag.createElement(e),'c("'+e+'")'})+");return n}")(b,t.frag)}function l(e){e||(e=t);var i=a(e);return b.shivCSS&&!u&&!i.hasCSS&&(i.hasCSS=!!n(e,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),c||s(e,i),e}var u,c,h=e.html5||{},f=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,d=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,p="_html5shiv",m=0,g={};!function(){try{var e=t.createElement("a");e.innerHTML="<xyz></xyz>",u="hidden"in e,c=1==e.childNodes.length||function(){t.createElement("a");var e=t.createDocumentFragment();return"undefined"==typeof e.cloneNode||"undefined"==typeof e.createDocumentFragment||"undefined"==typeof e.createElement}()}catch(n){u=!0,c=!0}}();var b={elements:h.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:h.shivCSS!==!1,supportsUnknownElements:c,shivMethods:h.shivMethods!==!1,type:"default",shivDocument:l,createElement:r,createDocumentFragment:o};e.html5=b,l(t)}(this,t),p._version=d,p._prefixes=x,p._domPrefixes=j,p._cssomPrefixes=S,p.hasEvent=q,p.testProp=function(e){return s([e])},p.testAllProps=u,p.testStyles=D,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(m?" js "+A.join(" "):""),p}(this,this.document),function(e,t,n){function i(e){return"[object Function]"==g.call(e)}function a(e){return"string"==typeof e}function r(){}function o(e){return!e||"loaded"==e||"complete"==e||"uninitialized"==e}function s(){var e=b.shift();v=1,e?e.t?p(function(){("c"==e.t?f.injectCss:f.injectJs)(e.s,0,e.a,e.x,e.e,1)},0):(e(),s()):v=0}function l(e,n,i,a,r,l,u){function c(t){if(!d&&o(h.readyState)&&(y.r=d=1,!v&&s(),h.onload=h.onreadystatechange=null,t)){"img"!=e&&p(function(){_.removeChild(h)},50);for(var i in j[n])j[n].hasOwnProperty(i)&&j[n][i].onload()}}var u=u||f.errorTimeout,h=t.createElement(e),d=0,g=0,y={t:i,s:n,e:r,a:l,x:u};1===j[n]&&(g=1,j[n]=[]),"object"==e?h.data=n:(h.src=n,h.type=e),h.width=h.height="0",h.onerror=h.onload=h.onreadystatechange=function(){c.call(this,g)},b.splice(a,0,y),"img"!=e&&(g||2===j[n]?(_.insertBefore(h,w?null:m),p(c,u)):j[n].push(h))}function u(e,t,n,i,r){return v=0,t=t||"j",a(e)?l("c"==t?x:k,e,t,this.i++,n,i,r):(b.splice(this.i++,0,e),1==b.length&&s()),this}function c(){var e=f;return e.loader={load:u,i:0},e}var h,f,d=t.documentElement,p=e.setTimeout,m=t.getElementsByTagName("script")[0],g={}.toString,b=[],v=0,y="MozAppearance"in d.style,w=y&&!!t.createRange().compareNode,_=w?d:m.parentNode,d=e.opera&&"[object Opera]"==g.call(e.opera),d=!!t.attachEvent&&!d,k=y?"object":d?"script":"img",x=d?"script":k,C=Array.isArray||function(e){return"[object Array]"==g.call(e)},S=[],j={},M={timeout:function(e,t){return t.length&&(e.timeout=t[0]),e}};f=function(e){function t(e){var t,n,i,e=e.split("!"),a=S.length,r=e.pop(),o=e.length,r={url:r,origUrl:r,prefixes:e};for(n=0;o>n;n++)i=e[n].split("="),(t=M[i.shift()])&&(r=t(r,i));for(n=0;a>n;n++)r=S[n](r);return r}function o(e,a,r,o,s){var l=t(e),u=l.autoCallback;l.url.split(".").pop().split("?").shift(),l.bypass||(a&&(a=i(a)?a:a[e]||a[o]||a[e.split("/").pop().split("?")[0]]),l.instead?l.instead(e,a,r,o,s):(j[l.url]?l.noexec=!0:j[l.url]=1,r.load(l.url,l.forceCSS||!l.forceJS&&"css"==l.url.split(".").pop().split("?").shift()?"c":n,l.noexec,l.attrs,l.timeout),(i(a)||i(u))&&r.load(function(){c(),a&&a(l.origUrl,s,o),u&&u(l.origUrl,s,o),j[l.url]=2})))}function s(e,t){function n(e,n){if(e){if(a(e))n||(h=function(){var e=[].slice.call(arguments);f.apply(this,e),d()}),o(e,h,t,0,u);else if(Object(e)===e)for(l in s=function(){var t,n=0;for(t in e)e.hasOwnProperty(t)&&n++;return n}(),e)e.hasOwnProperty(l)&&(!n&&!--s&&(i(h)?h=function(){var e=[].slice.call(arguments);f.apply(this,e),d()}:h[l]=function(e){return function(){var t=[].slice.call(arguments);e&&e.apply(this,t),d()}}(f[l])),o(e[l],h,t,l,u))}else!n&&d()}var s,l,u=!!e.test,c=e.load||e.both,h=e.callback||r,f=h,d=e.complete||r;n(u?e.yep:e.nope,!!c),c&&n(c)}var l,u,h=this.yepnope.loader;if(a(e))o(e,0,h,0);else if(C(e))for(l=0;l<e.length;l++)u=e[l],a(u)?o(u,0,h,0):C(u)?f(u):Object(u)===u&&s(u,h);else Object(e)===e&&s(e,h)},f.addPrefix=function(e,t){M[e]=t},f.addFilter=function(e){S.push(e)},f.errorTimeout=1e4,null==t.readyState&&t.addEventListener&&(t.readyState="loading",t.addEventListener("DOMContentLoaded",h=function(){t.removeEventListener("DOMContentLoaded",h,0),t.readyState="complete"},0)),e.yepnope=c(),e.yepnope.executeStack=s,e.yepnope.injectJs=function(e,n,i,a,l,u){var c,h,d=t.createElement("script"),a=a||f.errorTimeout;d.src=e;for(h in i)d.setAttribute(h,i[h]);n=u?s:n||r,d.onreadystatechange=d.onload=function(){!c&&o(d.readyState)&&(c=1,n(),d.onload=d.onreadystatechange=null)},p(function(){c||(c=1,n(1))},a),l?d.onload():m.parentNode.insertBefore(d,m)},e.yepnope.injectCss=function(e,n,i,a,o,l){var u,a=t.createElement("link"),n=l?s:n||r;a.href=e,a.rel="stylesheet",a.type="text/css";for(u in i)a.setAttribute(u,i[u]);o||(m.parentNode.insertBefore(a,m),p(n,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};