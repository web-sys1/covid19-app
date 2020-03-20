!function(e){var t={};function o(n){if(t[n])return t[n].exports;var s=t[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,o),s.l=!0,s.exports}o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)o.d(n,s,function(t){return e[t]}.bind(null,s));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=30)}([function(e,t,o){"use strict";o.d(t,"a",(function(){return a}));var n=o(9);const s=Symbol.for("configSymbol"),r=Symbol("isInstance");class a{static getStaticConfig(){return{registerToGlobalNs:!0}}static getConfig(){return{className:"Neo.core.Base",ntype:"base",mixins:null}}constructor(e){e=e||{};let t=this;Object.defineProperties(t,{[s]:{configurable:!0,enumerable:!1,value:{},writable:!0},[r]:{enumerable:!1,value:!0}}),t.createId(e.id||t.id),delete e.id,t.constructor.config&&delete t.constructor.config.id,(t.getStaticConfig("observable")||t.mixins&&Neo.ns("Neo.core.Observable",t.mixins))&&t.initObservable(e),t.initConfig(e),t.controller&&t.controller.parseConfig(),Object.defineProperty(t,"configsApplied",{enumerable:!1,value:!0}),t.remote&&setTimeout(t.initRemote.bind(t),1)}onConstructed(){}init(){}beforeSetEnumValue(e,t,o,n=o+"s"){const s=this.getStaticConfig(n);return s.includes(e)?e:(Neo.logError("Supported values for "+o+" are:",s.join(", "),this),t)}createId(e){let t=this;e||(e=n.a.getId(t.ntype)),t.id=e,!0===a.instanceManagerAvailable?Neo.manager.Instance.register(t):(Neo.idMap||(Neo.idMap={}),Neo.idMap[t.id]=t)}destroy(){let e=this;!0===a.instanceManagerAvailable&&Neo.manager.Instance.unregister(e),Object.entries(e).forEach(t=>{e[t]=null,delete e[t]})}getStaticConfig(e){let t=this.constructor.staticConfig;return e?t[e]:t}initConfig(e,t){Object.assign(this[s],this.mergeConfig(e,t)),this.processConfigs()}processConfigs(){let e=this,t=Object.keys(e[s]);t.length>0&&(e.hasOwnProperty(t[0])||(e[t[0]]=e[s][t[0]]),delete e[s][t[0]],e.processConfigs())}initRemote(){let e,t=this.remote,o=this.className;if(!this.singleton)throw new Error("Remote method access only functional for Singleton classes "+o);!Neo.config.unitTestMode&&Neo.isObject(t)&&Object.entries(t).forEach(([t,n])=>{Neo.workerId!==t&&(e="main"===Neo.workerId?Neo.worker.Manager:Neo.currentWorker,e.sendMessage(t,{action:"registerRemote",methods:n,className:o}))})}mergeConfig(e,t){let o=this,n=o.constructor;if(!n.config)throw new Error("Neo.applyClassConfig has not been run on "+o.className);return t||(o.originalConfig=Neo.clone(e,!0,!0)),{...n.config,...e}}set(e={}){let t=this;Object.keys(t[s]).forEach(e=>{delete t[s][e]}),Object.assign(t[s],e),t.processConfigs()}setStaticConfig(e,t){let o=this.constructor.staticConfig;return!!o.hasOwnProperty(e)&&(o[e]=t,!0)}get[Symbol.toStringTag](){return this.className+" (id:"+this.id+")"}static[Symbol.hasInstance](e){return!!e&&(!0===e[r]&&super[Symbol.hasInstance](e))}}Neo.applyClassConfig(a),a.instanceManagerAvailable=!1},,function(e,t,o){"use strict";o.d(t,"a",(function(){return i}));const n=self.Neo||{};n.config=n.config||{};const s={applyBodyCls:!0,appPath:null,basePath:"./",cssPath:null,environment:"production",isExperimental:!1,isInsideSiesta:!1,locale:"default",themes:["neo-theme-light","neo-theme-dark"],unitTestMode:!1,useCss4:!0,useFontAwesome:!0,useGoogleAnalytics:!1};Object.assign(s,{resourcesPath:(n.config.basePath||s.basePath)+"resources/",workerBasePath:(n.config.basePath||s.basePath)+"src/worker/"});const r=Symbol.for("configSymbol"),a=Symbol("getSetCache");let i=self.Neo||{};i=self.Neo=Object.assign({ntypeMap:{},insideWorker:"undefined"!=typeof DedicatedWorkerGlobalScope||"undefined"!=typeof WorkerGlobalScope,applyClassConfig:function(e){let t,o=null,n=null,s={},l=e.prototype||e,g=[],h={};for(;l.__proto__;){if(t=l.constructor,t.hasOwnProperty("classConfigApplied")){o=i.clone(t.config,!0),n=i.clone(t.staticConfig,!0);break}g.unshift(l),l=l.__proto__}s=o||s,h=n||h,g.forEach(o=>{t=o.constructor;let n,l=t.getConfig&&t.getConfig()||{},g=t.getStaticConfig&&t.getStaticConfig()||{};l&&Object.entries(l).forEach(([e,t])=>{"_"===e.slice(-1)?(delete l[e],e=e.slice(0,-1),l[e]=t,function(e,t){if(p(e,t))throw"Config "+t+"_ ("+e.className+") already has a set method, use beforeGet, beforeSet & afterSet instead";i[a]||(i[a]={});i[a][t]||(i[a][t]={get:function(){let e=this,o="beforeGet"+i.capitalize(t),n=e[r].hasOwnProperty(t),s=e[r][t],a=n?s:e["_"+t];return Array.isArray(a)?"items"!==t&&(a=[...a]):a instanceof Date&&(a=new Date(a.valueOf())),n&&(e[t]=a,a=e["_"+t]),e[o]&&"function"==typeof e[o]&&(a=e[o](a)),a},set:function(e){let o=this,n="_"+t,s=i.capitalize(t),a="beforeSet"+s,l="afterSet"+s,c=o[n];if(delete o[r][t],o[n]=e,o[a]&&"function"==typeof o[a]){if(void 0===(e=o[a](e,c)))return void(o[n]=c);o[n]=e}(i.isObject(e)||Array.isArray(e)||e!==c)&&o[l]&&"function"==typeof o[l]&&o[l](e,c)}});Object.defineProperty(e,t,i[a][t])}(o,e)):p(o,e)||Object.defineProperty(o,e,{enumerable:!0,value:t,writable:!0})}),Object.assign(t,g),l.hasOwnProperty("ntype")&&(i.ntypeMap[l.ntype]=l.className),n=s.hasOwnProperty("mixins")&&s.mixins||[],g&&g.observable&&n.push("Neo.core.Observable"),l.hasOwnProperty("mixins")&&Array.isArray(l.mixins)&&l.mixins.length>0&&n.push(...l.mixins),n.length&&function(e,t){Array.isArray(t)||(t=[t]);let o,n,s,r=0,a=t.length,l={};for(;r<a;r++){if(o=t[r],o.isClass)s=o.prototype,n=i.ns(s.className);else{if(!c(o))throw new Error("Attempting to mixin an undefined class: "+o+", "+e.prototype.className);n=i.ns(o),s=n.prototype}s.className.split(".").reduce(d(n),l),Object.getOwnPropertyNames(s).forEach(u(e.prototype,s))}e.prototype.mixins=l}(t,n),delete l.mixins,delete s.mixins,Object.assign(s,l),Object.assign(h,g),Object.assign(t,{classConfigApplied:!0,config:i.clone(s,!0),isClass:!0,staticConfig:i.clone(h,!0)}),delete t.getConfig,delete t.getStaticConfig,s.singleton||this.applyToGlobalNs(e)})},applyToGlobalNs:function(e){let t,o,n,s,r="function"==typeof e?e.prototype:e;!0===r.constructor.registerToGlobalNs&&(t=r.isClass?r.config.className:r.className,o=t.split("."),n=o.pop(),s=i.ns(o,!0),s[n]=e)},applyFromNs:function(e,t,o,n){let s;return e&&o&&"object"==typeof o&&Object.entries(o).forEach(([o,r])=>{s=t[r],e[o]=n?s.bind(t):s}),e},assignDefaults:function(e,t){return e&&t&&"object"==typeof t&&Object.entries(t).forEach(([t,o])=>{e.hasOwnProperty(t)||(e[t]=o)}),e},clone:function(e,t,o){let n;return Array.isArray(e)?e.map(e=>i.clone(e,t,o)):null!==e&&"object"==typeof e?e.constructor.isClass&&e instanceof i.core.Base?o?e:this.cloneNeoInstance(e):e.constructor.isClass?e:(n={},Object.entries(e).forEach(([e,s])=>{t&&(s=i.clone(s,t,o)),n[e]=s}),n):e},cloneNeoInstance:function(e){let t={...e.originalConfig};return delete t._id,delete t.id,i.create(e.className,t)},create:function(e,t){let o,n;if("function"==typeof e&&void 0!==e.constructor)o=e;else{if("object"==typeof e){if(!(t=e).className&&!t.module)return console.error("Class created with object configuration missing className or module property",t),null;e=t.className?t.className:t.module.prototype.className}if(!c(e))throw new Error("Class "+e+" does not exist");o=i.ns(e)}return n=new o(t),n.onConstructed(),n.init(),n},emptyFn:function(){},ns:function(e,t,o){return(e=Array.isArray(e)?e:e.split(".")).reduce((e,o)=>{if(t&&!e[o]&&(e[o]={}),e)return e[o]},o||self)},ntype:function(e,t){if("object"==typeof e){if(!(t=e).ntype)throw new Error("Class defined with object configuration missing ntype property. "+t.ntype);e=t.ntype}let o=i.ntypeMap[e];if(!o)throw new Error("ntype "+e+" does not exist");return i.create(o,t)},onStart:i.emptyFn},i);const l=["_name","classConfigApplied","className","constructor","isClass","mixin","ntype","observable","registerToGlobalNs"];function c(e){try{return!!e.split(".").reduce((e,t)=>e[t],self)}catch(e){return!1}}function d(e){return(t,o,n,s)=>t[o]=n!==s.length-1?t[o]||{}:e}function u(e,t){return function(o){if(!~l.indexOf(o)){if(e[o]&&e[o]._from){if(t.className===e[o]._from)return void console.warn("Mixin set multiple times or already defined on a Base Class",e.className,t.className,o);throw new Error(e.className+": Multiple mixins defining same property ("+t.className+", "+e[o]._from+") => "+o)}e[o]=t[o],Object.getOwnPropertyDescriptor(e,o)._from=t.className,"function"==typeof e[o]&&(e[o]._name=o)}}}function p(e,t){let o;for(;e.__proto__;){if(o=Object.getOwnPropertyDescriptor(e,t),"object"==typeof o&&"function"==typeof o.set)return!0;e=e.__proto__}return!1}i.config=i.config||{},i.assignDefaults(i.config,s)},function(e,t,o){"use strict";var n=o(0);class s extends n.a{static getStaticConfig(){return{decamelRegEx:/([a-z])([A-Z])/g}}static getConfig(){return{className:"Neo.core.Util",ntype:"core-util"}}static createStyles(e){let t="";return Object.entries(e).forEach(([e,o])=>{null!=o&&(t+=s.decamel(e)+":"+o+";")}),t}static capitalize(e){return s.isString(e)&&e[0].toUpperCase()+e.slice(1)}static decamel(e){return e.replace(s.decamelRegEx,"$1-$2").toLowerCase()}static createStyleObject(e){if(!e)return null;let t;return e.split(/;(?=[^\)]*(?:\(|$))/g).reduce((e,o)=>(t=o.split(/:(.+)/).map((function(e){let t=parseFloat(e);return e==t?t:e.trim()})),""!==t[0]&&(t[0]=t[0].replace(/-([a-z])/g,(e,t)=>t.toUpperCase()),e[t[0]]=t[1]),e),{})}static isArray(e){return Array.isArray(e)}static isBoolean(e){return"boolean"==typeof e}static isDefined(e){return void 0!==e}static isEmpty(e){return Array.isArray(e)?0===e.length:s.isObject(e)?0===Object.keys(e).length:!!s.isString(e)&&""===e}static isFunction(e){return"function"==typeof e}static isNumber(e){return"number"==typeof e&&isFinite(e)}static isObject(e){return null!==e&&"object"==typeof e&&!Array.isArray(e)}static isString(e){return"string"==typeof e}static toArray(e,t,o){let n;return e&&(n=e.length)?"string"==typeof e?e.split(""):Array.prototype.slice.call(e,t||0,o||n):[]}}Neo.applyClassConfig(s),Neo.applyFromNs(Neo,s,{createStyleObject:"createStyleObject",createStyles:"createStyles",capitalize:"capitalize",decamel:"decamel",isArray:"isArray",isBoolean:"isBoolean",isDefined:"isDefined",isEmpty:"isEmpty",isFunction:"isFunction",isNumber:"isNumber",isObject:"isObject",isString:"isString",toArray:"toArray"},!0),t.a=s},function(e,t,o){"use strict";var n=o(0);class s extends n.a{static getConfig(){return{className:"Neo.core.Logger",ntype:"logger",enableLogs:!0,level:"log",singleton:!0}}constructor(e){super(e),Neo.applyFromNs(Neo,this,{error:"error",info:"info",log:"log",logError:"logError",warn:"warn"},!0)}error(e){throw new Error(e)}log(...e){this.level="log",this.write(...e)}info(...e){this.level="info",this.write(...e)}logError(...e){this.level="error",this.write(...e)}warn(...e){this.level="warn",this.write(...e)}write(...e){!0===this.enableLogs&&console[this.level](...e)}}Neo.applyClassConfig(s);let r=Neo.create(s);Neo.applyToGlobalNs(r),t.a=r},function(e,t,o){"use strict";o.d(t,"a",(function(){return s}));var n=o(0);class s extends n.a{static getConfig(){return{className:"Neo.core.Observable",ntype:"mixin-observable",mixin:!0}}initObservable(e){let t,o=this,n=o.__proto__;for(e.listeners&&(o.listeners=e.listeners,delete e.listeners),t=o.listeners,o.listeners={},t&&o.addListener(t);n&&n.constructor.isClass;)n.constructor.staticConfig.observable&&!n.constructor.listeners&&Object.assign(n.constructor,{addListener:o.addListener,fire:o.fire,listeners:{},on:o.on,removeListener:o.removeListener,un:o.un}),n=n.__proto__}addListener(e,t,o,n,s,r){let a,i,l,c=this;if("object"==typeof e)e.hasOwnProperty("scope")&&(o=e.scope,delete e.scope),Object.entries(e).forEach(([e,t])=>{c.addListener(e,t,o)});else if("object"==typeof t)o=o||t.scope,a=t.fn,r=r||t.order,n=n||t.eventId;else if("function"==typeof t)a=t;else{if("string"!=typeof t)throw new Error("Invalid addListener call: "+e);a=t}return l={fn:a,scope:o,data:s,id:n||Neo.getId("event")},(i=c.listeners&&c.listeners[e])?(i.forEach(t=>{if(t.id===n||t.fn===a&&t.scope===o)throw new Error("Duplicate event handler attached: "+e)}),"number"==typeof r?i.splice(r,0,l):"before"===r?i.unshift(l):i.push(l)):c.listeners[e]=[l],l.id}fire(e){let t,o,n,s,r=this,a=[].slice.call(arguments,1),i=r.listeners;if(i&&i[e])for(o=[...i[e]],s=o.length,n=0;n<s;n++)t=o[n],t.fn.apply(t.scope||r,t.data?a.concat(t.data):a)}removeListener(e,t){if(Neo.isString(t)){let o=this.listeners[e],n=!1;o.forEach((e,o)=>{if(e.id===t)return n=o}),!1!==n&&o.splice(n,1)}}on(...e){return this.addListener(...e)}un(...e){this.removeListener(...e)}}Neo.applyClassConfig(s)},,,,function(e,t,o){"use strict";class n{static getStaticConfig(){return{registerToGlobalNs:!0}}static getConfig(){return{className:"Neo.core.IdGenerator",ntype:"id-generator",base:"neo-",singleton:!0}}constructor(e){this.idCounter={},Neo.getId=this.getId.bind(this)}onConstructed(){}init(){}getId(e){e=e||"neo";let t=this.idCounter,o=t[e]||0;return t[e]=++o,this.base+("neo"===e?"":e+"-")+o}}Neo.applyClassConfig(n);let s=Neo.create(n);Neo.applyToGlobalNs(s),t.a=s},,,,function(e,t,o){"use strict";o.d(t,"a",(function(){return s}));var n=o(9);class s{constructor(e){e.destination=e.destination||"main",e.id=e.id||n.a.getId(Neo.workerId),e.origin=e.origin||Neo.workerId,Object.assign(this,e)}}Neo.ns("Neo.worker",!0).Message=s},function(e,t,o){"use strict";o.d(t,"a",(function(){return s}));var n=o(0);class s extends n.a{static getConfig(){return{className:"Neo.worker.mixins.RemoteMethodAccess",ntype:"mixin-remote-method-access",mixin:!0}}generateRemote(e,t){let o=this,n=e.origin;return function(s,r){let a={action:"remoteMethod",data:s,destination:n,remoteClassName:e.className,remoteMethod:t};return o.promiseMessage(n,a,r)}}onRegisterRemote(e){if(e.destination===Neo.workerId){let t=this,o=e.className,n=e.methods,s=Neo.ns(o,!0);n.forEach((function(n){if(s[n])throw new Error("Duplicate remote method definition "+o+"."+n);s[n]=t.generateRemote(e,n)})),"main"!==Neo.workerId&&t.fire("remoteregistered",e)}}onRemoteMethod(e){let t,o,n=this,s=Neo.ns(e.remoteClassName);if(!s)throw new Error('Invalid remote namespace "'+e.remoteClassName+'"');if(o=s[e.remoteMethod],!o)throw new Error('Invalid remote method name "'+e.remoteMethod+'"');t=Array.isArray(e.data)?o.call(s,...e.data):o.call(s,e.data),t instanceof Promise?t.then((function(t){n.resolve(e,t)})).catch((function(t){n.reject(e,t)})):n.resolve(e,t)}reject(e,t){this.sendMessage(e.origin,{action:"reply",data:t,reject:!0,replyId:e.id})}resolve(e,t){this.sendMessage(e.origin,{action:"reply",data:t,replyId:e.id})}}Neo.applyClassConfig(s)},,,,,,function(e,t,o){"use strict";var n=o(0);o.d(t,"a",(function(){return n.a}));o(4),o(5),o(3)},,,,,,,,,,function(e,t,o){"use strict";o.r(t);var n=o(2),s=o(20),r=o(0);class a extends r.a{static getConfig(){return{className:"Neo.main.mixins.DeltaUpdates"}}du_focusNode(e){this.getElement(e.id).focus()}du_insertNode(e){let t,o=e.index,n=this.getElement(e.parentId),s=n.childNodes.length,r=0,a=o,i=!1;for(;r<s;r++)8===n.childNodes[r].nodeType&&(r<a&&a++,i=!0);i?(t=this.htmlStringToElement(e.outerHTML),s>0&&s>a?n.insertBefore(t,n.childNodes[a]):n.appendChild(t)):(s=n.children.length,s>0&&s>o?n.children[o].insertAdjacentHTML("beforebegin",e.outerHTML):s>0?n.children[s-1].insertAdjacentHTML("afterend",e.outerHTML):n.insertAdjacentHTML("beforeend",e.outerHTML))}du_moveNode(e){let t=e.index,o=this.getElement(e.id),n=this.getElement(e.parentId);t>=n.children.length?n.appendChild(o):o&&n.children[t].id!==e.id&&n.insertBefore(o,n.children[t])}du_removeNode(e){let t=this.getElement(e.id);t&&t.parentNode.removeChild(t)}du_replaceChild(e){this.getElement(e.parentId).replaceChild(this.getElement(e.toId),this.getElement(e.fromId))}du_updateNode(e){let t=this.getElementOrBody(e.id);t?Object.entries(e).forEach(([e,o])=>{switch(e){case"attributes":Object.entries(o).forEach(([e,o])=>{this.voidAttributes.includes(e)?t[e]="true"===o:null===o||""===o?"value"===e?t[e]="":t.removeAttribute(e):t[e]=o});break;case"cls":t.classList.add(...o.add||[]),t.classList.remove(...o.remove||[]);break;case"innerHTML":t.innerHTML=o||"";break;case"outerHTML":t.outerHTML=data.outerHTML;break;case"style":Neo.isObject(o)&&t&&Object.keys(o).forEach((function(e){t.style[e]=o[e]}))}}):console.warn("du_updateNode: node not found for id",e.id)}du_updateVtext(e){let t=this.getElement(e.parentId),o=t.innerHTML,n=`\x3c!-- ${e.id} --\x3e`,s=new RegExp(n+"[\\s\\S]*?\x3c!-- /neo-vtext --\x3e");t.innerHTML=o.replace(s,e.value)}htmlStringToElement(e){const t=document.createElement("template");return t.innerHTML=e,t.content.firstChild}update(e){let t,o,n=this,s=e.deltas,r=0;for(s=Array.isArray(s)?s:[s],o=s.length,n.logDeltaUpdates&&(n.countDeltas+=e.deltas&&e.deltas.length||0,n.countUpdates++,console.log("update "+n.countUpdates,"total deltas ",n.countDeltas,Neo.clone(e,!0)));r<o;r++)switch(t=s[r],t.action){case"focusNode":n.du_focusNode(t);break;case"insertNode":n.du_insertNode(t);break;case"moveNode":n.du_moveNode(t);break;case"removeNode":n.du_removeNode(t);break;case"replaceChild":n.du_replaceChild(t);break;case"updateVtext":n.du_updateVtext(t);break;default:n.du_updateNode(t)}Neo.worker.Manager.sendMessage(e.origin||"app",{action:"reply",replyId:e.id,success:!0})}}Neo.applyClassConfig(a);class i extends r.a{static getConfig(){return{className:"Neo.main.mixins.Markdown"}}markdownToHtml(e){return(new showdown.Converter).makeHtml(e)}}Neo.applyClassConfig(i);class l extends r.a{static getConfig(){return{className:"Neo.main.mixins.GoogleAnalytics"}}insertGoogleAnalyticsScript(){function e(){dataLayer.push(arguments)}window.dataLayer=window.dataLayer||[],e("js",new Date),e("config","UA-153734404-1");const t=document.createElement("script");Object.assign(t,{async:!0,src:"https://www.googletagmanager.com/gtag/js?id=UA-153734404-1"}),document.head.appendChild(t)}}Neo.applyClassConfig(l);class c extends r.a{static getConfig(){return{className:"Neo.main.mixins.Hljs"}}onSyntaxHighlight(e){if(hljs){let t=document.getElementById(e.vnodeId);hljs.highlightBlock(t),hljs.lineNumbersBlock(t),Neo.worker.Manager.sendMessage(e.origin||"app",{action:"reply",replyId:e.id,success:!0})}else console.error("highlight.js is not included inside the main thread.")}onSyntaxHighlightInit(e){if(hljs){let t=document.querySelectorAll("pre code:not(.hljs)");Array.prototype.forEach.call(t,hljs.highlightBlock),Neo.worker.Manager.sendMessage(e.origin||"app",{action:"reply",replyId:e.id,success:!0})}else console.error("highlight.js is not included inside the main thread.")}onSyntaxHighlightLine(e){let t,o=document.getElementById(e.vnodeId),n="neo-highlighted-line";e.addLine&&(t=o.querySelector('[data-line-number="'+e.addLine+'"]'),t&&(t.parentNode.classList.add(n),t.parentNode.scrollIntoView({behavior:"smooth",block:"start",inline:"nearest"}))),e.removeLine&&(t=o.querySelector('[data-line-number="'+e.removeLine+'"]'),t&&t.parentNode.classList.remove(n))}}Neo.applyClassConfig(c);var d=o(5);class u extends r.a{static getConfig(){return{className:"Neo.main.mixins.Siesta"}}adjustSiestaEnvironment(){let e,t=0,o=document.styleSheets.length;for(document.body.classList.add("neo-body","neo-body-viewport","neo-theme-dark");t<o;t++)e=document.styleSheets[t],e.href&&e.href.includes("highlightjs")&&(e.ownerNode.id="hljs-theme")}}Neo.applyClassConfig(u);class p extends r.a{static getConfig(){return{className:"Neo.main.mixins.Stylesheet"}}createStyleSheet(e,t,o){if(!e&&!o)throw new Error("createStyleSheet: you need to either pass a name or a href");const n=document.createElement("link"),s=o||(Neo.config.cssPath?Neo.config.cssPath+e:Neo.config.basePath+"dist/"+Neo.config.environment+"/"+e);Object.assign(n,{href:s,rel:"stylesheet",type:"text/css"}),t&&(n.id=t),document.head.appendChild(n)}hasStyleSheet(e){let t,o=0,n=document.styleSheets.length;for(;o<n;o++)if(t=document.styleSheets[o],t.href&&t.href.includes(e))return!0;return!1}insertCssRules(e){let t,o=document.getElementById("neoDynamicStyleSheet"),n=0,s=e.rules.length;for(o||(o=document.createElement("style"),o.id="neoDynamicStyleSheet",document.head.appendChild(o)),t=o.sheet;n<s;n++)t.insertRule(e.rules[n],t.cssRules.length);Neo.worker.Manager.sendMessage(e.origin,{action:"reply",data:e,replyId:e.id,success:!0})}insertTheme(){let e=this,t=Neo.config.themes;Array.isArray(t)||(t=[t]),document.body.classList.add(t[0]),Neo.config.useCss4?(e.removeStyleSheets({included:["neo-theme-","-no-css4.css"]}),t.length>0&&!e.hasStyleSheet("neo-structure.css")&&e.createStyleSheet("neo-structure.css"),t.forEach(t=>{e.hasStyleSheet(t+".css")||e.createStyleSheet(t+".css")})):(e.removeStyleSheets({included:["neo-structure.css"]}),e.removeStyleSheets({included:["neo-theme-"],excluded:["-no-css4.css"]}),t.length>0&&!e.hasStyleSheet(t[0]+"-no-css4.css")&&e.createStyleSheet(t[0]+"-no-css4.css","neo-theme"))}removeStyleSheets(e){let t,o,n=0,s=document.styleSheets.length,r=e.included||[],a=e.included||[];for(;n<s;n++)t=document.styleSheets[n],o=!0,t.href&&(a.forEach(e=>{t.href.includes(e)&&(o=!1)}),o&&(r.forEach(e=>{t.href.includes(e)||(o=!1)}),o&&(console.log("removeSheet",t.href),t.ownerNode.parentNode.removeChild(t.ownerNode))))}swapStyleSheet(e){document.getElementById(e.id).setAttribute("href",e.href)}}Neo.applyClassConfig(p);class g extends r.a{static getConfig(){return{className:"Neo.main.DomAccess",logDeltaUpdates:!0,singleton:!0,mixins:[a,l,c,i,d.a,u,p],remote:{app:["addScript","applyBodyCls","execCommand","focus","getAttributes","getBoundingClientRect","markdownToHtml","scrollIntoView","scrollToTableRow","selectNode","swapStyleSheet","windowScrollTo"]},voidAttributes:["checked","required"]}}constructor(e){super(e);let t=this;t.logDeltaUpdates&&(t.countDeltas=0,t.countUpdates=0)}addScript(e){const t=document.createElement("script");Object.assign(t,e),document.head.appendChild(t)}applyBodyCls(e){const t=e.cls||[];document.body.classList.add(...t)}execCommand(e){return document.execCommand(e.command),e}focus(e){let t=this.getElement(e.id);return t&&t.focus(),{id:e.id}}getAttributes(e){let t;if(Array.isArray(e.id))t=[],e.id.forEach(o=>{t.push(this.getAttributes({attributes:e.attributes,id:o}))});else{let o=this.getElementOrBody(e.id);t={},o&&(Array.isArray(e.attributes)||(e.attributes=[e.attributes],e.attributes.forEach(e=>{t[e]=o[e]})))}return t}getBoundingClientRect(e){let t;if(Array.isArray(e.id))t=[],e.id.forEach(e=>{t.push(this.getBoundingClientRect({id:e}))});else{let o=this.getElementOrBody(e.id),n={};t={},o&&(n=o.getBoundingClientRect(),Object.assign(t,{bottom:n.bottom,height:n.height,left:n.left,right:n.right,top:n.top,width:n.width,x:n.x,y:n.y}))}return t}getElement(e){return document.getElementById(e)}getElementOrBody(e){return e&&"body"!==e&&"document.body"!==e?this.getElement(e):document.body}onReadDom(e){let t,o,n=e.attributes||[],s=e.functions||[],r=e.styles||[],a=e.vnodeId,i={},l={},c={},d=a?this.getElement(a):null;n.forEach(e=>{i[e]=d[e]}),s.forEach((e,n)=>{Neo.isObject(e)?(e.params=e.params||[],e.paramIsDomNode=e.paramIsDomNode||[],o=e.scope?document[e.scope]:d,e.params.forEach((t,o)=>{e.paramIsDomNode[o]&&!0===e.paramIsDomNode[o]&&(e.params[o]=this.getElement(e.params[o]))}),t=e.returnFnName?e.returnFnName:n,l[t]=o[e.fn](...e.params),e.returnValue&&(l[t]=l[t][e.returnValue])):l[e]=d[e]()}),r.forEach(e=>{c[e]=d.style[e]}),Object.assign(e,{attributes:i,functions:l,styles:c}),Neo.worker.Manager.sendMessage(e.origin,{action:"reply",data:e,replyId:e.id,success:!0})}onScrollIntoView(e){let t=this.getElement(e.vnodeId).querySelector('[data-list-header="'+e.text+'"]');t&&t.previousSibling.scrollIntoView({behavior:"smooth",block:"start",inline:"nearest"})}read(e){"function"==typeof e&&e()}scrollIntoView(e){let t=this.getElement(e.id);return t&&t.scrollIntoView({behavior:e.behavior||"smooth",block:e.block||"start",inline:e.inline||"nearest"}),{id:e.id}}scrollToTableRow(e){let t=this.getElement(e.id);if(t){let o=t.parentNode.parentNode,n=o.parentNode,s=o.getBoundingClientRect().top,r=t.getBoundingClientRect().top;n.scrollTo({top:r-s-(e.hasOwnProperty("offset")?e.offset:34),behavior:e.behavior||"smooth"})}return{id:e.id}}selectNode(e){let t=this.getElement(e.id),o=Neo.isNumber(e.start)||0,n=Neo.isNumber(e.end)||99999;return t&&(t.select(),t.setSelectionRange(o,n)),{id:e.id}}windowScrollTo(e){window.scrollTo({behavior:e.behavior||"smooth",left:e.left||0,top:e.top||0})}write(e){let t=this.getElementOrBody(e.parentId),o=t.children.length,n=e.parentIndex,s=e.html||e.outerHTML;!e.parentIndex||o<1?t.insertAdjacentHTML("beforeend",s):o>n?t.children[n].insertAdjacentHTML("beforebegin",s):t.children[o-1].insertAdjacentHTML("afterend",s)}}Neo.applyClassConfig(g);let h=Neo.create(g);Neo.applyToGlobalNs(h);var m=h;const f=[{name:"change",handler:"onChange"},{name:"click",handler:"onClick"},{name:"contextmenu",handler:"onContextMenu"},{name:"focusin",handler:"onFocusIn"},{name:"focusout",handler:"onFocusOut"},{name:"input",handler:"onChange"},{name:"keydown",handler:"onKeyDown"},{name:"keyup",handler:"onKeyUp"},{name:"mouseenter",handler:"onMouseEnter",options:{capture:!0}},{name:"mouseleave",handler:"onMouseLeave",options:{capture:!0}},{name:"wheel",handler:"onWheel",options:{passive:!1}}],y=["neo-circle-component","neo-dateselector","neo-gallery","neo-helix"],b={"neo-dateselector":300},N={date:null,target:null},w=[],C=[];class v extends r.a{static getStaticConfig(){return{observable:!0}}static getConfig(){return{className:"Neo.main.DomEvents",singleton:!0,remote:{app:["addDomListener","registerPreventDefaultTargets"]}}}constructor(e){super(e);document.addEventListener("DOMContentLoaded",this.onDomContentLoaded.bind(this)),window.addEventListener("hashchange",this.onHashChange.bind(this))}addDomListener(e){let t,o,n,s=this,r=0,a=e.events.length;for(;r<a;r++)t=e.events[r],s[t.handler]||(s[t.handler]=Neo.emptyFn),o=t.vnodeId||e.vnodeId,n="document.body"===o?document.body:document.getElementById(o),n.addEventListener(t.name,s[t.handler].bind(s));Neo.worker.Manager.sendMessage(e.origin,{action:"reply",data:e,replyId:e.id,success:!0})}addGlobalDomListeners(){let e=this;f.forEach(t=>{document.body.addEventListener(t.name,e[t.handler].bind(e),t.options)})}domEventListener(e){let t=this,o=e.target,n={action:"domEvent",eventName:e.type,data:{id:o.id,path:(e.path||e.composedPath()).map(e=>e.id),value:o.value}};switch(e.type){case"dragend":t.dragElementId=null;break;case"dragenter":case"dragleave":if(t.dragElementId===o.id)return;break;case"dragover":t.onDragOver(e),e.preventDefault();break;case"dragstart":t.dragElementId=o.id;break;case"drop":if(!t.dragElementId||this.dragElementId===o.id)return;e.stopPropagation&&e.stopPropagation(),e.preventDefault(),n.data.srcId=t.dragElementId,t.dragElementId=null;break;default:e.preventDefault()}Neo.worker.Manager.sendMessage("app",n)}getEventData(e){return{path:(e.path||e.composedPath()).map(e=>this.getTargetData(e)),target:this.getTargetData(e.target),timeStamp:e.timeStamp,type:e.type}}getKeyboardEventData(e){const{altKey:t,code:o,ctrlKey:n,key:s,keyCode:r,metaKey:a,shiftKey:i}=e;return{...this.getEventData(e),altKey:t,code:o,ctrlKey:n,key:s,keyCode:r,metaKey:a,shiftKey:i}}getMouseEventData(e){const{altKey:t,clientX:o,clientY:n,ctrlKey:s,metaKey:r,offsetX:a,offsetY:i,pageX:l,pageY:c,screenX:d,screenY:u,shiftKey:p}=e;return{...this.getEventData(e),altKey:t,clientX:o,clientY:n,ctrlKey:s,metaKey:r,offsetX:a,offsetY:i,pageX:l,pageY:c,screenX:d,screenY:u,shiftKey:p}}getTargetData(e){return{checked:e.checked,childElementCount:e.childElementCount,clientHeight:e.clientHeight,clientLeft:e.clientLeft,clientTop:e.clientTop,clientWidth:e.clientWidth,cls:e.classList?[...e.classList]:[],data:{...e.dataset},draggable:e.draggable,hidden:e.hidden,id:e.id,inert:e.inert,isConnected:e.isConnected,isContentEditable:e.isContentEditable,nodeType:e.nodeType,offsetHeight:e.offsetHeight,offsetLeft:e.offsetLeft,offsetTop:e.offsetTop,offsetWidth:e.offsetWidth,scrollHeight:e.scrollHeight,scrollLeft:e.scrollLeft,scrollTop:e.scrollTop,scrollWidth:e.scrollWidth,style:e.style&&e.style.cssText,tabIndex:e.tabIndex,tagName:e.tagName&&e.tagName.toLowerCase()}}onChange(e){this.sendMessageToApp({...this.getEventData(e),valid:e.target.checkValidity(),value:e.target.value})}onClick(e){this.sendMessageToApp(this.getMouseEventData(e)),this.testPathInclusion(e,w)&&e.preventDefault()}onContextMenu(e){this.sendMessageToApp(this.getMouseEventData(e)),this.testPathInclusion(e,C)&&e.preventDefault()}onDomContentLoaded(){this.addGlobalDomListeners(),this.fire("domContentLoaded")}onDragOver(e){e.dataTransfer.dropEffect="move"}onFocusIn(e){this.sendMessageToApp(this.getEventData(e))}onFocusOut(e){this.sendMessageToApp(this.getEventData(e))}onHashChange(){const e=location.hash.substr(1);Neo.worker.Manager.sendMessage("app",{action:"hashChange",hash:this.parseHash(e),hashString:e})}onKeyDown(e){this.sendMessageToApp(this.getKeyboardEventData(e)),["ArrowDown","ArrowLeft","ArrowRight","ArrowUp"].includes(e.key)&&e.preventDefault()}onKeyUp(e){this.sendMessageToApp(this.getKeyboardEventData(e))}onMouseEnter(e){this.sendMessageToApp({...this.getMouseEventData(e),fromElementId:e.fromElement&&e.fromElement.id||null})}onMouseLeave(e){this.sendMessageToApp({...this.getMouseEventData(e),toElementId:e.toElement&&e.toElement.id||null})}onWheel(e){let t=this.testPathInclusion(e,y),o=!1;if(t){if(b[t]){let e=new Date;N.date&&N.target===t&&e-N.date<b[t]?o=!0:Object.assign(N,{date:e,target:t})}if(!o){const{deltaX:t,deltaY:o,deltaZ:n}=e;this.sendMessageToApp({...this.getEventData(e),deltaX:t,deltaY:o,deltaZ:n})}e.preventDefault()}}parseHash(e){if(""===e)return{};let t,o,n,s,r=e.split("&"),a={};for(t=0;t<r.length;t++)n=r[t].split("="),n.length<2&&n.push(""),o=decodeURIComponent(n[0]),s=decodeURIComponent(n[1]),-1!==o.indexOf("[]")?(o=o.substring(0,o.indexOf("[]")),void 0===a[o]&&(a[o]=[]),a[o].push(this.parseValue(s))):a[o]=this.parseValue(s);return a}parseValue(e){return e==parseInt(e)?e=parseInt(e):"false"===e?e=!1:"true"===e&&(e=!0),e}registerPreventDefaultTargets(e){let t;switch(Array.isArray(e.cls)||(e.cls=[e.cls]),e.name){case"click":t=w;break;case"contextmenu":t=C}e.cls.forEach(e=>{t.includes(e)||t.push(e)})}sendMessageToApp(e){Neo.worker.Manager.sendMessage("app",{action:"domEvent",eventName:e.type,data:e})}testPathInclusion(e,t){let o,n,s=t.length,r=e.path||e.composedPath(),a=0,i=r.length;for(;a<i;a++)for(n=r[a],o=0;o<s;o++)if(n.classList&&n.classList.contains(t[o]))return t[o];return!1}}Neo.applyClassConfig(v);let E=Neo.create(v);Neo.applyToGlobalNs(E);var S=E;class I extends r.a{static getConfig(){return{className:"Neo.main.mixins.LocalStorage"}}createLocalStorageItem(e){this.updateLocalStorageItem(e)}destroyLocalStorageItem(e){window.localStorage.removeItem(e.key)}readLocalStorageItem(e){return{key:e.key,value:window.localStorage.getItem(e.key)}}updateLocalStorageItem(e){window.localStorage.setItem(e.key,e.value)}}Neo.applyClassConfig(I);var k=o(13),M=o(14);class j extends r.a{static getConfig(){return{className:"Neo.worker.Manager",ntype:"worker-manager",singleton:!0,basePath:Neo.config.workerBasePath||"worker/",mixins:[d.a,M.a],sharedWorkersEnabled:!1,stopCommunication:!1,webWorkersEnabled:!1,workers:{app:{fileName:Neo.config.isExperimental?"App.mjs":Neo.config.appPath},data:{fileName:Neo.config.isExperimental?"Data.mjs":"dataworker.js"},vdom:{fileName:Neo.config.isExperimental?"VDom.mjs":"vdomworker.js"}}}}constructor(e){super(e);const t=this;t.detectFeatures(),Neo.insideWorker||t.createWorkers(),Neo.workerId="main",t.promises={},t.on({"message:addDomListener":{fn:S.addDomListener,scope:S},"message:addGlobalDomListeners":{fn:S.addGlobalDomListeners,scope:S},"message:insertCssRules":{fn:m.insertCssRules,scope:m},"message:readDom":{fn:m.onReadDom,scope:m},"message:registerRemote":{fn:t.onRegisterRemote,scope:t},"message:scrollIntoView":{fn:m.onScrollIntoView,scope:m},"message:syntaxHighlight":{fn:m.onSyntaxHighlight,scope:m},"message:syntaxHighlightInit":{fn:m.onSyntaxHighlightInit,scope:m},"message:syntaxHighlightLine":{fn:m.onSyntaxHighlightLine,scope:m}})}detectFeatures(){const e=this;if(!window.Worker)throw new Error("Your browser does not support Web Workers");e.webWorkersEnabled=!0,window.SharedWorker&&(e.sharedWorkersEnabled=!0)}getWorker(e){return e instanceof Worker?e:this.workers[e].worker}createWorker(e){const t=this,o=(e.basePath||t.basePath)+e.fileName,n=Neo.config.isExperimental?new Worker(o,{type:"module"}):new Worker(o);return n.addEventListener("message",t.onWorkerMessage.bind(t)),n.addEventListener("error",t.onWorkerError.bind(t)),n}createWorkers(){let e,t,o=this,n=location.hash,s=Object.entries(o.workers);for([e,t]of(n&&(Neo.config.hash=S.parseHash(n.substr(1)),Neo.config.hashString=n.substr(1)),s)){try{t.worker=o.createWorker(t)}catch(e){document.body.innerHTML=e,o.stopCommunication=!0;break}o.sendMessage(e,{action:"registerNeoConfig",data:Neo.config})}}onWorkerError(e){Neo.config.isExperimental||console.log("Worker Error:",e)}onWorkerMessage(e){let t,o=this,n=e.data,s=!1;const{action:r,destination:a,replyId:i}=n;o.fire("message:"+r,n),(t="reply"===r&&o.promises[i])&&("main"===n.destination&&(n=n.data),n.reject?t.reject(n):(n.data&&(n.data.autoMount&&(o.fire("automount",n),s=!0),n.data.updateVdom&&(o.fire("updateVdom",n),s=!0)),s?o.promises[i].data=n:t.resolve(n)),s||delete o.promises[i]),"main"!==a&&"reply"!==r?o.promiseMessage(a,n).then(e=>{o.sendMessage(e.destination,e)}).catch(e=>{o.sendMessage(n.origin,{action:"reply",reject:!0,replyId:n.id,error:e.message})}):"main"===a&&"remoteMethod"===r&&o.onRemoteMethod(n)}loadApplication(e){this.sendMessage("app",{action:"loadApplication",path:e,resourcesPath:Neo.config.resourcesPath})}broadcast(e){Object.entries(this.workers).forEach(t=>{this.sendMessage(t,e)})}resolveDomOperationPromise(e){if(e){let t=this.promises[e];t&&(t.resolve(t.data),delete this.promises[e])}}sendMessage(e,t,o){if(!this.stopCommunication){const n=this.getWorker(e);if(!n)throw new Error("Called sendMessage for a worker that does not exist: "+e);t.destination=e;const s=new k.a(t);return n.postMessage(s,o),s}}promiseMessage(e,t,o){const n=this;return new Promise((s,r)=>{let a=n.sendMessage(e,t,o).id;n.promises[a]={reject:r,resolve:s}})}}Neo.applyClassConfig(j);let x=Neo.create(j);Neo.applyToGlobalNs(x);var L=x;class A extends s.a{static getStaticConfig(){return{observable:!0}}static getConfig(){return{className:"Neo.Main",singleton:!0,isReady:!1,logAnimationFrames:!0,mixins:[I],mode:"read",readQueue:[],remote:{app:["createLocalStorageItem","destroyLocalStorageItem","editRoute","readLocalStorageItem","setRoute","updateLocalStorageItem"]},running:!1,showFps:!1,timeLimit:15,totalFrameCount:0,updateQueue:[],writeQueue:[]}}constructor(e){super(e);let t=this;S.on("domContentLoaded",t.onDomContentLoaded,t),L.on({automount:t.onRender,"message:mountDom":t.onMountDom,"message:updateDom":t.onUpdateDom,updateVdom:t.onUpdateVdom,scope:t})}editRoute(e){let t=S.parseHash(window.location.hash.substr(1)),o=[];"string"==typeof e&&(e=S.parseHash(e)),Object.assign(t,e),Object.entries(t).forEach(([e,t])=>{o.push(encodeURIComponent(e)+"="+encodeURIComponent(t))}),window.location.hash=o.join("&")}onDomContentLoaded(){this.isReady=!0,n.a.config.applyBodyCls&&m.applyBodyCls({cls:["neo-body"]}),n.a.config.useFontAwesome&&m.createStyleSheet(null,null,n.a.config.basePath+"node_modules/@fortawesome/fontawesome-free/css/all.min.css"),m.insertTheme(),n.a.config.isInsideSiesta&&m.adjustSiestaEnvironment(),n.a.config.useGoogleAnalytics&&m.insertGoogleAnalyticsScript(),n.a.config.appPath&&L.loadApplication(n.a.config.appPath)}globalResizeListener(e){console.log("globalResizeListener",e)}onMountDom(e){this.queueWrite(e),L.sendMessage(e.origin||"app",{action:"reply",replyId:e.id,success:!0})}onRender(e){e.data.replyId=e.replyId,this.queueWrite(e.data)}onUpdateDom(e){this.queueUpdate(e)}onUpdateVdom(e){e.data.replyId=e.replyId,this.queueUpdate(e.data)}processQueue(e,t){let o,n=this,s=n.timeLimit;for(;o=e.shift();){if(new Date-t>s)return e.unshift(o),requestAnimationFrame(n.renderFrame.bind(n));m[n.mode](o),L.resolveDomOperationPromise(o.replyId)}}queueRead(e){let t=this;t.readQueue.push(e),t.running||(t.running=!0,requestAnimationFrame(t.renderFrame.bind(t)))}queueUpdate(e){let t=this;t.updateQueue.push(e),t.running||(t.running=!0,requestAnimationFrame(t.renderFrame.bind(t)))}queueWrite(e){let t=this;t.writeQueue.push(e),t.running||(t.running=!0,requestAnimationFrame(t.renderFrame.bind(t)))}renderFrame(){let e=this,t=e.readQueue,o=e.updateQueue,n=e.writeQueue,s="read"===e.mode,r=new Date;e.logAnimationFrames&&(e.totalFrameCount++,console.log("Total Frames: "+e.totalFrameCount)),(!s&&n.length||(e.mode="read",!e.processQueue(t,r)))&&(o.length&&(e.mode="update",e.processQueue(o,r))||n.length&&(e.mode="write",e.processQueue(n,r))||(e.running=!1))}setRoute(e){window.location.hash=e.value}}n.a.applyClassConfig(A);let O=n.a.create(A);n.a.applyToGlobalNs(O);t.default=O}]);