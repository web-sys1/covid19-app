!function(e){var t={};function o(s){if(t[s])return t[s].exports;var n=t[s]={i:s,l:!1,exports:{}};return e[s].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=t,o.d=function(e,t,s){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(o.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(s,n,function(t){return e[t]}.bind(null,n));return s},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=40)}({1:function(e,t,o){"use strict";o.d(t,"a",(function(){return a}));var s=o(11);const n=Symbol.for("configSymbol"),r=Symbol("isInstance");class a{static getStaticConfig(){return{registerToGlobalNs:!0}}static getConfig(){return{className:"Neo.core.Base",ntype:"base",mixins:null}}constructor(e){e=e||{};let t=this;Object.defineProperties(t,{[n]:{configurable:!0,enumerable:!1,value:{},writable:!0},[r]:{enumerable:!1,value:!0}}),t.createId(e.id||t.id),delete e.id,t.constructor.config&&delete t.constructor.config.id,(t.getStaticConfig("observable")||t.mixins&&Neo.ns("Neo.core.Observable",t.mixins))&&t.initObservable(e),t.initConfig(e),t.controller&&t.controller.parseConfig(),Object.defineProperty(t,"configsApplied",{enumerable:!1,value:!0}),t.remote&&setTimeout(t.initRemote.bind(t),1)}onConstructed(){}init(){}beforeSetEnumValue(e,t,o,s=o+"s"){const n=this.getStaticConfig(s);return n.includes(e)?e:(Neo.logError("Supported values for "+o+" are:",n.join(", "),this),t)}createId(e){let t=this;e||(e=s.a.getId(t.ntype)),t.id=e,!0===a.instanceManagerAvailable?Neo.manager.Instance.register(t):(Neo.idMap||(Neo.idMap={}),Neo.idMap[t.id]=t)}destroy(){let e=this;!0===a.instanceManagerAvailable&&Neo.manager.Instance.unregister(e),Object.entries(e).forEach(t=>{e[t]=null,delete e[t]})}getStaticConfig(e){let t=this.constructor.staticConfig;return e?t[e]:t}initConfig(e,t){Object.assign(this[n],this.mergeConfig(e,t)),this.processConfigs()}processConfigs(){let e=this,t=Object.keys(e[n]);t.length>0&&(e.hasOwnProperty(t[0])||(e[t[0]]=e[n][t[0]]),delete e[n][t[0]],e.processConfigs())}initRemote(){let e,t=this.remote,o=this.className;if(!this.singleton)throw new Error("Remote method access only functional for Singleton classes "+o);!Neo.config.unitTestMode&&Neo.isObject(t)&&Object.entries(t).forEach(([t,s])=>{Neo.workerId!==t&&(e="main"===Neo.workerId?Neo.worker.Manager:Neo.currentWorker,e.sendMessage(t,{action:"registerRemote",methods:s,className:o}))})}mergeConfig(e,t){let o=this,s=o.constructor;if(!s.config)throw new Error("Neo.applyClassConfig has not been run on "+o.className);return t||(o.originalConfig=Neo.clone(e,!0,!0)),{...s.config,...e}}set(e={}){let t=this;Object.keys(t[n]).forEach(e=>{delete t[n][e]}),Object.assign(t[n],e),t.processConfigs()}setStaticConfig(e,t){let o=this.constructor.staticConfig;return!!o.hasOwnProperty(e)&&(o[e]=t,!0)}get[Symbol.toStringTag](){return this.className+" (id:"+this.id+")"}static[Symbol.hasInstance](e){return!!e&&(!0===e[r]&&super[Symbol.hasInstance](e))}}Neo.applyClassConfig(a),a.instanceManagerAvailable=!1},11:function(e,t,o){"use strict";class s{static getStaticConfig(){return{registerToGlobalNs:!0}}static getConfig(){return{className:"Neo.core.IdGenerator",ntype:"id-generator",base:"neo-",singleton:!0}}constructor(e){this.idCounter={},Neo.getId=this.getId.bind(this)}onConstructed(){}init(){}getId(e){e=e||"neo";let t=this.idCounter,o=t[e]||0;return t[e]=++o,this.base+("neo"===e?"":e+"-")+o}}Neo.applyClassConfig(s);let n=Neo.create(s);Neo.applyToGlobalNs(n),t.a=n},17:function(e,t,o){"use strict";o.d(t,"a",(function(){return n}));var s=o(11);class n{constructor(e){e.destination=e.destination||"main",e.id=e.id||s.a.getId(Neo.workerId),e.origin=e.origin||Neo.workerId,Object.assign(this,e)}}Neo.ns("Neo.worker",!0).Message=n},18:function(e,t,o){"use strict";o.d(t,"a",(function(){return n}));var s=o(1);class n extends s.a{static getConfig(){return{className:"Neo.worker.mixins.RemoteMethodAccess",ntype:"mixin-remote-method-access",mixin:!0}}generateRemote(e,t){let o=this,s=e.origin;return function(n,r){let a={action:"remoteMethod",data:n,destination:s,remoteClassName:e.className,remoteMethod:t};return o.promiseMessage(s,a,r)}}onRegisterRemote(e){if(e.destination===Neo.workerId){let t=this,o=e.className,s=e.methods,n=Neo.ns(o,!0);s.forEach((function(s){if(n[s])throw new Error("Duplicate remote method definition "+o+"."+s);n[s]=t.generateRemote(e,s)})),"main"!==Neo.workerId&&t.fire("remoteregistered",e)}}onRemoteMethod(e){let t,o,s=this,n=Neo.ns(e.remoteClassName);if(!n)throw new Error('Invalid remote namespace "'+e.remoteClassName+'"');if(o=n[e.remoteMethod],!o)throw new Error('Invalid remote method name "'+e.remoteMethod+'"');t=Array.isArray(e.data)?o.call(n,...e.data):o.call(n,e.data),t instanceof Promise?t.then((function(t){s.resolve(e,t)})).catch((function(t){s.reject(e,t)})):s.resolve(e,t)}reject(e,t){this.sendMessage(e.origin,{action:"reply",data:t,reject:!0,replyId:e.id})}resolve(e,t){this.sendMessage(e.origin,{action:"reply",data:t,replyId:e.id})}}Neo.applyClassConfig(n)},2:function(e,t,o){"use strict";o.d(t,"a",(function(){return i}));const s=self.Neo||{};s.config=s.config||{};const n={applyBodyCls:!0,appPath:null,basePath:"./",cssPath:null,environment:"production",isExperimental:!1,isInsideSiesta:!1,locale:"default",themes:["neo-theme-light","neo-theme-dark"],unitTestMode:!1,useAmCharts:!1,useCss4:!0,useFontAwesome:!0,useGoogleAnalytics:!1};Object.assign(n,{resourcesPath:(s.config.basePath||n.basePath)+"resources/",workerBasePath:(s.config.basePath||n.basePath)+"src/worker/"});const r=Symbol.for("configSymbol"),a=Symbol("getSetCache");let i=self.Neo||{};i=self.Neo=Object.assign({ntypeMap:{},insideWorker:"undefined"!=typeof DedicatedWorkerGlobalScope||"undefined"!=typeof WorkerGlobalScope,applyClassConfig(e){let t,o=null,s=null,n={},l=e.prototype||e,p=[],g={};for(;l.__proto__;){if(t=l.constructor,t.hasOwnProperty("classConfigApplied")){o=i.clone(t.config,!0),s=i.clone(t.staticConfig,!0);break}p.unshift(l),l=l.__proto__}n=o||n,g=s||g,p.forEach(o=>{t=o.constructor;let s,l=t.getConfig&&t.getConfig()||{},p=t.getStaticConfig&&t.getStaticConfig()||{};l&&Object.entries(l).forEach(([e,t])=>{"_"===e.slice(-1)?(delete l[e],e=e.slice(0,-1),l[e]=t,function(e,t){if(h(e,t))throw"Config "+t+"_ ("+e.className+") already has a set method, use beforeGet, beforeSet & afterSet instead";i[a]||(i[a]={});i[a][t]||(i[a][t]={get(){let e=this,o="beforeGet"+i.capitalize(t),s=e[r].hasOwnProperty(t),n=e[r][t],a=s?n:e["_"+t];return Array.isArray(a)?"items"!==t&&(a=[...a]):a instanceof Date&&(a=new Date(a.valueOf())),s&&(e[t]=a,a=e["_"+t]),e[o]&&"function"==typeof e[o]&&(a=e[o](a)),a},set(e){let o=this,s="_"+t,n=i.capitalize(t),a="beforeSet"+n,l="afterSet"+n,c=o[s];if(delete o[r][t],o[s]=e,o[a]&&"function"==typeof o[a]){if(void 0===(e=o[a](e,c)))return void(o[s]=c);o[s]=e}(i.isObject(e)||Array.isArray(e)||e!==c)&&o[l]&&"function"==typeof o[l]&&o[l](e,c)}});Object.defineProperty(e,t,i[a][t])}(o,e)):h(o,e)||Object.defineProperty(o,e,{enumerable:!0,value:t,writable:!0})}),Object.assign(t,p),l.hasOwnProperty("ntype")&&(i.ntypeMap[l.ntype]=l.className),s=n.hasOwnProperty("mixins")&&n.mixins||[],p&&p.observable&&s.push("Neo.core.Observable"),l.hasOwnProperty("mixins")&&Array.isArray(l.mixins)&&l.mixins.length>0&&s.push(...l.mixins),s.length&&function(e,t){Array.isArray(t)||(t=[t]);let o,s,n,r=0,a=t.length,l={};for(;r<a;r++){if(o=t[r],o.isClass)n=o.prototype,s=i.ns(n.className);else{if(!c(o))throw new Error("Attempting to mixin an undefined class: "+o+", "+e.prototype.className);s=i.ns(o),n=s.prototype}n.className.split(".").reduce(d(s),l),Object.getOwnPropertyNames(n).forEach(u(e.prototype,n))}e.prototype.mixins=l}(t,s),delete l.mixins,delete n.mixins,Object.assign(n,l),Object.assign(g,p),Object.assign(t,{classConfigApplied:!0,config:i.clone(n,!0),isClass:!0,staticConfig:i.clone(g,!0)}),delete t.getConfig,delete t.getStaticConfig,n.singleton||this.applyToGlobalNs(e)})},applyToGlobalNs(e){let t,o,s,n,r="function"==typeof e?e.prototype:e;!0===r.constructor.registerToGlobalNs&&(t=r.isClass?r.config.className:r.className,o=t.split("."),s=o.pop(),n=i.ns(o,!0),n[s]=e)},applyFromNs(e,t,o,s){let n;return e&&o&&"object"==typeof o&&Object.entries(o).forEach(([o,r])=>{n=t[r],e[o]=s?n.bind(t):n}),e},assignDefaults:(e,t)=>(e&&t&&"object"==typeof t&&Object.entries(t).forEach(([t,o])=>{e.hasOwnProperty(t)||(e[t]=o)}),e),clone(e,t,o){let s;return Array.isArray(e)?e.map(e=>i.clone(e,t,o)):null!==e&&"object"==typeof e?e.constructor.isClass&&e instanceof i.core.Base?o?e:this.cloneNeoInstance(e):e.constructor.isClass?e:(s={},Object.entries(e).forEach(([e,n])=>{t&&(n=i.clone(n,t,o)),s[e]=n}),s):e},cloneNeoInstance(e){let t={...e.originalConfig};return delete t._id,delete t.id,i.create(e.className,t)},create(e,t){let o,s;if("function"==typeof e&&void 0!==e.constructor)o=e;else{if("object"==typeof e){if(!(t=e).className&&!t.module)return console.error("Class created with object configuration missing className or module property",t),null;e=t.className?t.className:t.module.prototype.className}if(!c(e))throw new Error("Class "+e+" does not exist");o=i.ns(e)}return s=new o(t),s.onConstructed(),s.init(),s},emptyFn(){},ns:(e,t,o)=>(e=Array.isArray(e)?e:e.split(".")).reduce((e,o)=>{if(t&&!e[o]&&(e[o]={}),e)return e[o]},o||self),ntype(e,t){if("object"==typeof e){if(!(t=e).ntype)throw new Error("Class defined with object configuration missing ntype property. "+t.ntype);e=t.ntype}let o=i.ntypeMap[e];if(!o)throw new Error("ntype "+e+" does not exist");return i.create(o,t)},onStart:i.emptyFn},i);const l=["_name","classConfigApplied","className","constructor","isClass","mixin","ntype","observable","registerToGlobalNs"];function c(e){try{return!!e.split(".").reduce((e,t)=>e[t],self)}catch(e){return!1}}function d(e){return(t,o,s,n)=>t[o]=s!==n.length-1?t[o]||{}:e}function u(e,t){return function(o){if(!~l.indexOf(o)){if(e[o]&&e[o]._from){if(t.className===e[o]._from)return void console.warn("Mixin set multiple times or already defined on a Base Class",e.className,t.className,o);throw new Error(e.className+": Multiple mixins defining same property ("+t.className+", "+e[o]._from+") => "+o)}e[o]=t[o],Object.getOwnPropertyDescriptor(e,o)._from=t.className,"function"==typeof e[o]&&(e[o]._name=o)}}}function h(e,t){let o;for(;e.__proto__;){if(o=Object.getOwnPropertyDescriptor(e,t),"object"==typeof o&&"function"==typeof o.set)return!0;e=e.__proto__}return!1}i.config=i.config||{},i.assignDefaults(i.config,n)},29:function(e,t,o){"use strict";var s=o(1);o.d(t,"a",(function(){return s.a}));o(4),o(6),o(5)},4:function(e,t,o){"use strict";var s=o(1);class n extends s.a{static getConfig(){return{className:"Neo.core.Logger",ntype:"logger",enableLogs:!0,level:"log",singleton:!0}}constructor(e){super(e),Neo.applyFromNs(Neo,this,{error:"error",info:"info",log:"log",logError:"logError",warn:"warn"},!0)}error(e){throw new Error(e)}log(...e){this.level="log",this.write(...e)}info(...e){this.level="info",this.write(...e)}logError(...e){this.level="error",this.write(...e)}warn(...e){this.level="warn",this.write(...e)}write(...e){!0===this.enableLogs&&console[this.level](...e)}}Neo.applyClassConfig(n);let r=Neo.create(n);Neo.applyToGlobalNs(r),t.a=r},40:function(e,t,o){"use strict";o.r(t);var s=o(2),n=o(29),r=o(1);class a extends r.a{static getConfig(){return{className:"Neo.main.mixins.AmCharts"}}createChart(e){console.log("createChart",e);const t=this;t.charts=t.charts||{},setTimeout(()=>{t.charts[e.id]=am4core.createFromConfig(e.config,e.id,am4charts[e.type||"XYChart"]),console.log(t.charts[e.id])},1e3)}insertAmChartsScripts(){const e=this,t="//www.amcharts.com/lib/4/";e.loadScript(t+"core.js").then(()=>{Promise.all([e.loadScript(t+"charts.js"),e.loadScript(t+"maps.js")]).then(()=>{console.log("#####amCharts ready")})})}updateChartData(e){this.charts[e.id]?this.charts[e.id].data=e.data:console.log("main.mixins.AmCharts no chart found for data.id:",e.id)}}Neo.applyClassConfig(a);class i extends r.a{static getConfig(){return{className:"Neo.main.mixins.DeltaUpdates"}}du_focusNode(e){this.getElement(e.id).focus()}du_insertNode(e){let t,o=e.index,s=this.getElement(e.parentId),n=s.childNodes.length,r=0,a=o,i=!1;for(;r<n;r++)8===s.childNodes[r].nodeType&&(r<a&&a++,i=!0);i?(t=this.htmlStringToElement(e.outerHTML),n>0&&n>a?s.insertBefore(t,s.childNodes[a]):s.appendChild(t)):(n=s.children.length,n>0&&n>o?s.children[o].insertAdjacentHTML("beforebegin",e.outerHTML):n>0?s.children[n-1].insertAdjacentHTML("afterend",e.outerHTML):s.insertAdjacentHTML("beforeend",e.outerHTML))}du_moveNode(e){let t=e.index,o=this.getElement(e.id),s=this.getElement(e.parentId);t>=s.children.length?s.appendChild(o):o&&s.children[t].id!==e.id&&s.insertBefore(o,s.children[t])}du_removeNode(e){let t=this.getElement(e.id);t&&t.parentNode.removeChild(t)}du_replaceChild(e){this.getElement(e.parentId).replaceChild(this.getElement(e.toId),this.getElement(e.fromId))}du_updateNode(e){let t=this.getElementOrBody(e.id);t?Object.entries(e).forEach(([e,o])=>{switch(e){case"attributes":Object.entries(o).forEach(([e,o])=>{this.voidAttributes.includes(e)?t[e]="true"===o:null===o||""===o?"value"===e?t[e]="":t.removeAttribute(e):t[e]=o});break;case"cls":t.classList.add(...o.add||[]),t.classList.remove(...o.remove||[]);break;case"innerHTML":t.innerHTML=o||"";break;case"outerHTML":t.outerHTML=data.outerHTML;break;case"style":Neo.isObject(o)&&t&&Object.keys(o).forEach((function(e){t.style[e]=o[e]}))}}):console.warn("du_updateNode: node not found for id",e.id)}du_updateVtext(e){let t=this.getElement(e.parentId),o=t.innerHTML,s=`\x3c!-- ${e.id} --\x3e`,n=new RegExp(s+"[\\s\\S]*?\x3c!-- /neo-vtext --\x3e");t.innerHTML=o.replace(n,e.value)}htmlStringToElement(e){const t=document.createElement("template");return t.innerHTML=e,t.content.firstChild}update(e){let t,o=this,s=e.deltas,n=0;s=Array.isArray(s)?s:[s],t=s.length,o.logDeltaUpdates&&(o.countDeltas+=e.deltas&&e.deltas.length||0,o.countUpdates++,console.log("update "+o.countUpdates,"total deltas ",o.countDeltas,Neo.clone(e,!0)));const r={focusNode:o.du_focusNode,insertNode:o.du_insertNode,moveNode:o.du_moveNode,removeNode:o.du_removeNode,replaceChild:o.du_replaceChild,updateVtext:o.du_updateVtext,default:o.du_updateNode};for(;n<t;n++)(r[s[n].action]||r.default).call(o,s[n]);Neo.worker.Manager.sendMessage(e.origin||"app",{action:"reply",replyId:e.id,success:!0})}}Neo.applyClassConfig(i);class l extends r.a{static getConfig(){return{className:"Neo.main.mixins.Markdown"}}markdownToHtml(e){return(new showdown.Converter).makeHtml(e)}}Neo.applyClassConfig(l);class c extends r.a{static getConfig(){return{className:"Neo.main.mixins.GoogleAnalytics"}}insertGoogleAnalyticsScript(){function e(){dataLayer.push(arguments)}window.dataLayer=window.dataLayer||[],e("js",new Date),e("config","UA-153734404-1");const t=document.createElement("script");Object.assign(t,{async:!0,src:"https://www.googletagmanager.com/gtag/js?id=UA-153734404-1"}),document.head.appendChild(t)}}Neo.applyClassConfig(c);class d extends r.a{static getConfig(){return{className:"Neo.main.mixins.Hljs"}}onSyntaxHighlight(e){if(hljs){let t=document.getElementById(e.vnodeId);hljs.highlightBlock(t),hljs.lineNumbersBlock(t),Neo.worker.Manager.sendMessage(e.origin||"app",{action:"reply",replyId:e.id,success:!0})}else console.error("highlight.js is not included inside the main thread.")}onSyntaxHighlightInit(e){if(hljs){let t=document.querySelectorAll("pre code:not(.hljs)");Array.prototype.forEach.call(t,hljs.highlightBlock),Neo.worker.Manager.sendMessage(e.origin||"app",{action:"reply",replyId:e.id,success:!0})}else console.error("highlight.js is not included inside the main thread.")}onSyntaxHighlightLine(e){let t,o=document.getElementById(e.vnodeId),s="neo-highlighted-line";e.addLine&&(t=o.querySelector('[data-line-number="'+e.addLine+'"]'),t&&(t.parentNode.classList.add(s),t.parentNode.scrollIntoView({behavior:"smooth",block:"start",inline:"nearest"}))),e.removeLine&&(t=o.querySelector('[data-line-number="'+e.removeLine+'"]'),t&&t.parentNode.classList.remove(s))}}Neo.applyClassConfig(d);var u=o(6);class h extends r.a{static getConfig(){return{className:"Neo.main.mixins.Siesta"}}adjustSiestaEnvironment(){let e,t=0,o=document.styleSheets.length;for(document.body.classList.add("neo-body","neo-body-viewport","neo-theme-dark");t<o;t++)e=document.styleSheets[t],e.href&&e.href.includes("highlightjs")&&(e.ownerNode.id="hljs-theme")}}Neo.applyClassConfig(h);class p extends r.a{static getConfig(){return{className:"Neo.main.mixins.Stylesheet"}}createStyleSheet(e,t,o){if(!e&&!o)throw new Error("createStyleSheet: you need to either pass a name or a href");const s=document.createElement("link"),n=o||(Neo.config.cssPath?Neo.config.cssPath+e:Neo.config.basePath+"dist/"+Neo.config.environment+"/"+e);Object.assign(s,{href:n,rel:"stylesheet",type:"text/css"}),t&&(s.id=t),document.head.appendChild(s)}hasStyleSheet(e){let t,o=0,s=document.styleSheets.length;for(;o<s;o++)if(t=document.styleSheets[o],t.href&&t.href.includes(e))return!0;return!1}insertCssRules(e){let t,o=document.getElementById("neoDynamicStyleSheet"),s=0,n=e.rules.length;for(o||(o=document.createElement("style"),o.id="neoDynamicStyleSheet",document.head.appendChild(o)),t=o.sheet;s<n;s++)t.insertRule(e.rules[s],t.cssRules.length);Neo.worker.Manager.sendMessage(e.origin,{action:"reply",data:e,replyId:e.id,success:!0})}insertTheme(){let e=this,t=Neo.config.themes;Array.isArray(t)||(t=[t]),document.body.classList.add(t[0]),Neo.config.useCss4?(e.removeStyleSheets({included:["neo-theme-","-no-css4.css"]}),t.length>0&&!e.hasStyleSheet("neo-structure.css")&&e.createStyleSheet("neo-structure.css"),t.forEach(t=>{e.hasStyleSheet(t+".css")||e.createStyleSheet(t+".css")})):(e.removeStyleSheets({included:["neo-structure.css"]}),e.removeStyleSheets({included:["neo-theme-"],excluded:["-no-css4.css"]}),t.length>0&&!e.hasStyleSheet(t[0]+"-no-css4.css")&&e.createStyleSheet(t[0]+"-no-css4.css","neo-theme"))}removeStyleSheets(e){let t,o,s=0,n=document.styleSheets.length,r=e.included||[],a=e.included||[];for(;s<n;s++)t=document.styleSheets[s],o=!0,t.href&&(a.forEach(e=>{t.href.includes(e)&&(o=!1)}),o&&(r.forEach(e=>{t.href.includes(e)||(o=!1)}),o&&(console.log("removeSheet",t.href),t.ownerNode.parentNode.removeChild(t.ownerNode))))}swapStyleSheet(e){document.getElementById(e.id).setAttribute("href",e.href)}}Neo.applyClassConfig(p);class g extends r.a{static getConfig(){return{className:"Neo.main.DomAccess",logDeltaUpdates:!0,singleton:!0,mixins:[a,i,c,d,l,u.a,h,p],remote:{app:["addScript","applyBodyCls","createChart","execCommand","focus","getAttributes","getBoundingClientRect","markdownToHtml","scrollIntoView","scrollToTableRow","selectNode","swapStyleSheet","updateChartData","windowScrollTo"]},voidAttributes:["checked","required"]}}constructor(e){super(e);let t=this;t.logDeltaUpdates&&(t.countDeltas=0,t.countUpdates=0)}addScript(e){const t=document.createElement("script");Object.assign(t,e),document.head.appendChild(t)}applyBodyCls(e){const t=e.cls||[];document.body.classList.add(...t)}execCommand(e){return document.execCommand(e.command),e}focus(e){let t=this.getElement(e.id);return t&&t.focus(),{id:e.id}}getAttributes(e){let t;if(Array.isArray(e.id))t=[],e.id.forEach(o=>{t.push(this.getAttributes({attributes:e.attributes,id:o}))});else{let o=this.getElementOrBody(e.id);t={},o&&(Array.isArray(e.attributes)||(e.attributes=[e.attributes],e.attributes.forEach(e=>{t[e]=o[e]})))}return t}getBoundingClientRect(e){let t;if(Array.isArray(e.id))t=[],e.id.forEach(e=>{t.push(this.getBoundingClientRect({id:e}))});else{let o=this.getElementOrBody(e.id),s={};t={},o&&(s=o.getBoundingClientRect(),Object.assign(t,{bottom:s.bottom,height:s.height,left:s.left,right:s.right,top:s.top,width:s.width,x:s.x,y:s.y}))}return t}getElement(e){return document.getElementById(e)}getElementOrBody(e){return e&&"body"!==e&&"document.body"!==e?this.getElement(e):document.body}loadScript(e,t=!0){let o;return new Promise((s,n)=>{o=document.createElement("script"),Object.assign(o,{async:t,onerror:n,onload:s,src:e}),document.head.appendChild(o)})}onReadDom(e){let t,o,s=e.attributes||[],n=e.functions||[],r=e.styles||[],a=e.vnodeId,i={},l={},c={},d=a?this.getElement(a):null;s.forEach(e=>{i[e]=d[e]}),n.forEach((e,s)=>{Neo.isObject(e)?(e.params=e.params||[],e.paramIsDomNode=e.paramIsDomNode||[],o=e.scope?document[e.scope]:d,e.params.forEach((t,o)=>{e.paramIsDomNode[o]&&!0===e.paramIsDomNode[o]&&(e.params[o]=this.getElement(e.params[o]))}),t=e.returnFnName?e.returnFnName:s,l[t]=o[e.fn](...e.params),e.returnValue&&(l[t]=l[t][e.returnValue])):l[e]=d[e]()}),r.forEach(e=>{c[e]=d.style[e]}),Object.assign(e,{attributes:i,functions:l,styles:c}),Neo.worker.Manager.sendMessage(e.origin,{action:"reply",data:e,replyId:e.id,success:!0})}onScrollIntoView(e){let t=this.getElement(e.vnodeId).querySelector('[data-list-header="'+e.text+'"]');t&&t.previousSibling.scrollIntoView({behavior:"smooth",block:"start",inline:"nearest"})}read(e){"function"==typeof e&&e()}scrollIntoView(e){let t=this.getElement(e.id);return t&&t.scrollIntoView({behavior:e.behavior||"smooth",block:e.block||"start",inline:e.inline||"nearest"}),{id:e.id}}scrollToTableRow(e){let t=this.getElement(e.id);if(t){let o=t.parentNode.parentNode,s=o.parentNode,n=o.getBoundingClientRect().top,r=t.getBoundingClientRect().top;s.scrollTo({top:r-n-(e.hasOwnProperty("offset")?e.offset:34),behavior:e.behavior||"smooth"})}return{id:e.id}}selectNode(e){let t=this.getElement(e.id),o=Neo.isNumber(e.start)||0,s=Neo.isNumber(e.end)||99999;return t&&(t.select(),t.setSelectionRange(o,s)),{id:e.id}}windowScrollTo(e){window.scrollTo({behavior:e.behavior||"smooth",left:e.left||0,top:e.top||0})}write(e){let t=this.getElementOrBody(e.parentId),o=t.children.length,s=e.parentIndex,n=e.html||e.outerHTML;!e.parentIndex||o<1?t.insertAdjacentHTML("beforeend",n):o>s?t.children[s].insertAdjacentHTML("beforebegin",n):t.children[o-1].insertAdjacentHTML("afterend",n)}}Neo.applyClassConfig(g);let m=Neo.create(g);Neo.applyToGlobalNs(m);var f=m;const y=[{name:"change",handler:"onChange"},{name:"click",handler:"onClick"},{name:"contextmenu",handler:"onContextMenu"},{name:"focusin",handler:"onFocusIn"},{name:"focusout",handler:"onFocusOut"},{name:"input",handler:"onChange"},{name:"keydown",handler:"onKeyDown"},{name:"keyup",handler:"onKeyUp"},{name:"mouseenter",handler:"onMouseEnter",options:{capture:!0}},{name:"mouseleave",handler:"onMouseLeave",options:{capture:!0}},{name:"wheel",handler:"onWheel",options:{passive:!1}}],b=["neo-circle-component","neo-dateselector","neo-gallery","neo-helix"],N={"neo-dateselector":300},C={date:null,target:null},w=[],v=[];class E extends r.a{static getStaticConfig(){return{observable:!0}}static getConfig(){return{className:"Neo.main.DomEvents",singleton:!0,remote:{app:["addDomListener","registerPreventDefaultTargets"]}}}constructor(e){super(e);document.addEventListener("DOMContentLoaded",this.onDomContentLoaded.bind(this)),window.addEventListener("hashchange",this.onHashChange.bind(this))}addDomListener(e){let t,o,s,n=this,r=0,a=e.events.length;for(;r<a;r++)t=e.events[r],n[t.handler]||(n[t.handler]=Neo.emptyFn),o=t.vnodeId||e.vnodeId,s="document.body"===o?document.body:document.getElementById(o),s.addEventListener(t.name,n[t.handler].bind(n));Neo.worker.Manager.sendMessage(e.origin,{action:"reply",data:e,replyId:e.id,success:!0})}addGlobalDomListeners(){let e=this;y.forEach(t=>{document.body.addEventListener(t.name,e[t.handler].bind(e),t.options)})}domEventListener(e){let t=this,o=e.target,s={action:"domEvent",eventName:e.type,data:{id:o.id,path:(e.path||e.composedPath()).map(e=>e.id),value:o.value}};switch(e.type){case"dragend":t.dragElementId=null;break;case"dragenter":case"dragleave":if(t.dragElementId===o.id)return;break;case"dragover":t.onDragOver(e),e.preventDefault();break;case"dragstart":t.dragElementId=o.id;break;case"drop":if(!t.dragElementId||this.dragElementId===o.id)return;e.stopPropagation&&e.stopPropagation(),e.preventDefault(),s.data.srcId=t.dragElementId,t.dragElementId=null;break;default:e.preventDefault()}Neo.worker.Manager.sendMessage("app",s)}getEventData(e){return{path:(e.path||e.composedPath()).map(e=>this.getTargetData(e)),target:this.getTargetData(e.target),timeStamp:e.timeStamp,type:e.type}}getKeyboardEventData(e){const{altKey:t,code:o,ctrlKey:s,key:n,keyCode:r,metaKey:a,shiftKey:i}=e;return{...this.getEventData(e),altKey:t,code:o,ctrlKey:s,key:n,keyCode:r,metaKey:a,shiftKey:i}}getMouseEventData(e){const{altKey:t,clientX:o,clientY:s,ctrlKey:n,metaKey:r,offsetX:a,offsetY:i,pageX:l,pageY:c,screenX:d,screenY:u,shiftKey:h}=e;return{...this.getEventData(e),altKey:t,clientX:o,clientY:s,ctrlKey:n,metaKey:r,offsetX:a,offsetY:i,pageX:l,pageY:c,screenX:d,screenY:u,shiftKey:h}}getTargetData(e){return{checked:e.checked,childElementCount:e.childElementCount,clientHeight:e.clientHeight,clientLeft:e.clientLeft,clientTop:e.clientTop,clientWidth:e.clientWidth,cls:e.classList?[...e.classList]:[],data:{...e.dataset},draggable:e.draggable,hidden:e.hidden,id:e.id,inert:e.inert,isConnected:e.isConnected,isContentEditable:e.isContentEditable,nodeType:e.nodeType,offsetHeight:e.offsetHeight,offsetLeft:e.offsetLeft,offsetTop:e.offsetTop,offsetWidth:e.offsetWidth,scrollHeight:e.scrollHeight,scrollLeft:e.scrollLeft,scrollTop:e.scrollTop,scrollWidth:e.scrollWidth,style:e.style&&e.style.cssText,tabIndex:e.tabIndex,tagName:e.tagName&&e.tagName.toLowerCase()}}onChange(e){this.sendMessageToApp({...this.getEventData(e),valid:e.target.checkValidity(),value:e.target.value})}onClick(e){this.sendMessageToApp(this.getMouseEventData(e)),this.testPathInclusion(e,w)&&e.preventDefault()}onContextMenu(e){this.sendMessageToApp(this.getMouseEventData(e)),this.testPathInclusion(e,v)&&e.preventDefault()}onDomContentLoaded(){this.addGlobalDomListeners(),this.fire("domContentLoaded")}onDragOver(e){e.dataTransfer.dropEffect="move"}onFocusIn(e){this.sendMessageToApp(this.getEventData(e))}onFocusOut(e){this.sendMessageToApp(this.getEventData(e))}onHashChange(){const e=location.hash.substr(1);Neo.worker.Manager.sendMessage("app",{action:"hashChange",hash:this.parseHash(e),hashString:e})}onKeyDown(e){this.sendMessageToApp(this.getKeyboardEventData(e)),["ArrowDown","ArrowLeft","ArrowRight","ArrowUp"].includes(e.key)&&e.preventDefault()}onKeyUp(e){this.sendMessageToApp(this.getKeyboardEventData(e))}onMouseEnter(e){this.sendMessageToApp({...this.getMouseEventData(e),fromElementId:e.fromElement&&e.fromElement.id||null})}onMouseLeave(e){this.sendMessageToApp({...this.getMouseEventData(e),toElementId:e.toElement&&e.toElement.id||null})}onWheel(e){let t=this.testPathInclusion(e,b),o=!1;if(t){if(N[t]){let e=new Date;C.date&&C.target===t&&e-C.date<N[t]?o=!0:Object.assign(C,{date:e,target:t})}if(!o){const{deltaX:t,deltaY:o,deltaZ:s}=e;this.sendMessageToApp({...this.getEventData(e),deltaX:t,deltaY:o,deltaZ:s})}e.preventDefault()}}parseHash(e){if(""===e)return{};let t,o,s,n,r=e.split("&"),a={};for(t=0;t<r.length;t++)s=r[t].split("="),s.length<2&&s.push(""),o=decodeURIComponent(s[0]),n=decodeURIComponent(s[1]),-1!==o.indexOf("[]")?(o=o.substring(0,o.indexOf("[]")),void 0===a[o]&&(a[o]=[]),a[o].push(this.parseValue(n))):a[o]=this.parseValue(n);return a}parseValue(e){return e==parseInt(e)?e=parseInt(e):"false"===e?e=!1:"true"===e&&(e=!0),e}registerPreventDefaultTargets(e){let t;switch(Array.isArray(e.cls)||(e.cls=[e.cls]),e.name){case"click":t=w;break;case"contextmenu":t=v}e.cls.forEach(e=>{t.includes(e)||t.push(e)})}sendMessageToApp(e){Neo.worker.Manager.sendMessage("app",{action:"domEvent",eventName:e.type,data:e})}testPathInclusion(e,t){let o,s,n=t.length,r=e.path||e.composedPath(),a=0,i=r.length;for(;a<i;a++)for(s=r[a],o=0;o<n;o++)if(s.classList&&s.classList.contains(t[o]))return t[o];return!1}}Neo.applyClassConfig(E);let S=Neo.create(E);Neo.applyToGlobalNs(S);var I=S;class M extends r.a{static getConfig(){return{className:"Neo.main.mixins.LocalStorage"}}createLocalStorageItem(e){this.updateLocalStorageItem(e)}destroyLocalStorageItem(e){window.localStorage.removeItem(e.key)}readLocalStorageItem(e){return{key:e.key,value:window.localStorage.getItem(e.key)}}updateLocalStorageItem(e){window.localStorage.setItem(e.key,e.value)}}Neo.applyClassConfig(M);var k=o(17),j=o(18);class x extends r.a{static getConfig(){return{className:"Neo.worker.Manager",ntype:"worker-manager",singleton:!0,basePath:Neo.config.workerBasePath||"worker/",mixins:[u.a,j.a],sharedWorkersEnabled:!1,stopCommunication:!1,webWorkersEnabled:!1,workers:{app:{fileName:Neo.config.isExperimental?"App.mjs":Neo.config.appPath},data:{fileName:Neo.config.isExperimental?"Data.mjs":"dataworker.js"},vdom:{fileName:Neo.config.isExperimental?"VDom.mjs":"vdomworker.js"}}}}constructor(e){super(e);const t=this;t.detectFeatures(),Neo.insideWorker||t.createWorkers(),Neo.workerId="main",t.promises={},t.on({"message:addDomListener":{fn:I.addDomListener,scope:I},"message:addGlobalDomListeners":{fn:I.addGlobalDomListeners,scope:I},"message:insertCssRules":{fn:f.insertCssRules,scope:f},"message:readDom":{fn:f.onReadDom,scope:f},"message:registerRemote":{fn:t.onRegisterRemote,scope:t},"message:scrollIntoView":{fn:f.onScrollIntoView,scope:f},"message:syntaxHighlight":{fn:f.onSyntaxHighlight,scope:f},"message:syntaxHighlightInit":{fn:f.onSyntaxHighlightInit,scope:f},"message:syntaxHighlightLine":{fn:f.onSyntaxHighlightLine,scope:f}})}detectFeatures(){const e=this;if(!window.Worker)throw new Error("Your browser does not support Web Workers");e.webWorkersEnabled=!0,window.SharedWorker&&(e.sharedWorkersEnabled=!0)}getWorker(e){return e instanceof Worker?e:this.workers[e].worker}createWorker(e){const t=this,o=(e.basePath||t.basePath)+e.fileName,s=Neo.config.isExperimental?new Worker(o,{type:"module"}):new Worker(o);return s.addEventListener("message",t.onWorkerMessage.bind(t)),s.addEventListener("error",t.onWorkerError.bind(t)),s}createWorkers(){let e,t,o=this,s=location.hash,n=Object.entries(o.workers);for([e,t]of(s&&(Neo.config.hash=I.parseHash(s.substr(1)),Neo.config.hashString=s.substr(1)),n)){try{t.worker=o.createWorker(t)}catch(e){document.body.innerHTML=e,o.stopCommunication=!0;break}o.sendMessage(e,{action:"registerNeoConfig",data:Neo.config})}}onWorkerError(e){Neo.config.isExperimental||console.log("Worker Error:",e)}onWorkerMessage(e){let t,o=this,s=e.data,n=!1;const{action:r,destination:a,replyId:i}=s;o.fire("message:"+r,s),(t="reply"===r&&o.promises[i])&&("main"===s.destination&&(s=s.data),s.reject?t.reject(s):(s.data&&(s.data.autoMount&&(o.fire("automount",s),n=!0),s.data.updateVdom&&(o.fire("updateVdom",s),n=!0)),n?o.promises[i].data=s:t.resolve(s)),n||delete o.promises[i]),"main"!==a&&"reply"!==r?o.promiseMessage(a,s).then(e=>{o.sendMessage(e.destination,e)}).catch(e=>{o.sendMessage(s.origin,{action:"reply",reject:!0,replyId:s.id,error:e.message})}):"main"===a&&"remoteMethod"===r&&o.onRemoteMethod(s)}loadApplication(e){this.sendMessage("app",{action:"loadApplication",path:e,resourcesPath:Neo.config.resourcesPath})}broadcast(e){Object.entries(this.workers).forEach(t=>{this.sendMessage(t,e)})}resolveDomOperationPromise(e){if(e){let t=this.promises[e];t&&(t.resolve(t.data),delete this.promises[e])}}sendMessage(e,t,o){if(!this.stopCommunication){const s=this.getWorker(e);if(!s)throw new Error("Called sendMessage for a worker that does not exist: "+e);t.destination=e;const n=new k.a(t);return s.postMessage(n,o),n}}promiseMessage(e,t,o){const s=this;return new Promise((n,r)=>{let a=s.sendMessage(e,t,o).id;s.promises[a]={reject:r,resolve:n}})}}Neo.applyClassConfig(x);let A=Neo.create(x);Neo.applyToGlobalNs(A);var L=A;class O extends n.a{static getStaticConfig(){return{observable:!0}}static getConfig(){return{className:"Neo.Main",singleton:!0,isReady:!1,logAnimationFrames:!0,mixins:[M],mode:"read",readQueue:[],remote:{app:["createLocalStorageItem","destroyLocalStorageItem","editRoute","readLocalStorageItem","setRoute","updateLocalStorageItem"]},running:!1,showFps:!1,timeLimit:15,totalFrameCount:0,updateQueue:[],writeQueue:[]}}constructor(e){super(e);let t=this;I.on("domContentLoaded",t.onDomContentLoaded,t),L.on({automount:t.onRender,"message:mountDom":t.onMountDom,"message:updateDom":t.onUpdateDom,updateVdom:t.onUpdateVdom,scope:t})}editRoute(e){let t=I.parseHash(window.location.hash.substr(1)),o=[];"string"==typeof e&&(e=I.parseHash(e)),Object.assign(t,e),Object.entries(t).forEach(([e,t])=>{o.push(encodeURIComponent(e)+"="+encodeURIComponent(t))}),window.location.hash=o.join("&")}onDomContentLoaded(){this.isReady=!0,s.a.config.applyBodyCls&&f.applyBodyCls({cls:["neo-body"]}),s.a.config.useFontAwesome&&f.createStyleSheet(null,null,s.a.config.basePath+"node_modules/@fortawesome/fontawesome-free/css/all.min.css"),f.insertTheme(),s.a.config.isInsideSiesta&&f.adjustSiestaEnvironment(),s.a.config.useAmCharts&&f.insertAmChartsScripts(),s.a.config.useGoogleAnalytics&&f.insertGoogleAnalyticsScript(),s.a.config.appPath&&L.loadApplication(s.a.config.appPath)}globalResizeListener(e){console.log("globalResizeListener",e)}onMountDom(e){this.queueWrite(e),L.sendMessage(e.origin||"app",{action:"reply",replyId:e.id,success:!0})}onRender(e){e.data.replyId=e.replyId,this.queueWrite(e.data)}onUpdateDom(e){this.queueUpdate(e)}onUpdateVdom(e){e.data.replyId=e.replyId,this.queueUpdate(e.data)}processQueue(e,t){let o,s=this,n=s.timeLimit;for(;o=e.shift();){if(new Date-t>n)return e.unshift(o),requestAnimationFrame(s.renderFrame.bind(s));f[s.mode](o),L.resolveDomOperationPromise(o.replyId)}}queueRead(e){let t=this;t.readQueue.push(e),t.running||(t.running=!0,requestAnimationFrame(t.renderFrame.bind(t)))}queueUpdate(e){let t=this;t.updateQueue.push(e),t.running||(t.running=!0,requestAnimationFrame(t.renderFrame.bind(t)))}queueWrite(e){let t=this;t.writeQueue.push(e),t.running||(t.running=!0,requestAnimationFrame(t.renderFrame.bind(t)))}renderFrame(){let e=this,t=e.readQueue,o=e.updateQueue,s=e.writeQueue,n="read"===e.mode,r=new Date;e.logAnimationFrames&&(e.totalFrameCount++,console.log("Total Frames: "+e.totalFrameCount)),(!n&&s.length||(e.mode="read",!e.processQueue(t,r)))&&(o.length&&(e.mode="update",e.processQueue(o,r))||s.length&&(e.mode="write",e.processQueue(s,r))||(e.running=!1))}setRoute(e){window.location.hash=e.value}}s.a.applyClassConfig(O);let D=s.a.create(O);s.a.applyToGlobalNs(D);t.default=D},5:function(e,t,o){"use strict";var s=o(1);class n extends s.a{static getStaticConfig(){return{decamelRegEx:/([a-z])([A-Z])/g}}static getConfig(){return{className:"Neo.core.Util",ntype:"core-util"}}static createStyles(e){let t="";return Object.entries(e).forEach(([e,o])=>{null!=o&&(t+=n.decamel(e)+":"+o+";")}),t}static capitalize(e){return n.isString(e)&&e[0].toUpperCase()+e.slice(1)}static decamel(e){return e.replace(n.decamelRegEx,"$1-$2").toLowerCase()}static createStyleObject(e){if(!e)return null;let t;return e.split(/;(?=[^\)]*(?:\(|$))/g).reduce((e,o)=>(t=o.split(/:(.+)/).map((function(e){let t=parseFloat(e);return e==t?t:e.trim()})),""!==t[0]&&(t[0]=t[0].replace(/-([a-z])/g,(e,t)=>t.toUpperCase()),e[t[0]]=t[1]),e),{})}static isArray(e){return Array.isArray(e)}static isBoolean(e){return"boolean"==typeof e}static isDefined(e){return void 0!==e}static isEmpty(e){return Array.isArray(e)?0===e.length:n.isObject(e)?0===Object.keys(e).length:!!n.isString(e)&&""===e}static isFunction(e){return"function"==typeof e}static isNumber(e){return"number"==typeof e&&isFinite(e)}static isObject(e){return null!==e&&"object"==typeof e&&!Array.isArray(e)}static isString(e){return"string"==typeof e}static toArray(e,t,o){let s;return e&&(s=e.length)?"string"==typeof e?e.split(""):Array.prototype.slice.call(e,t||0,o||s):[]}}Neo.applyClassConfig(n),Neo.applyFromNs(Neo,n,{createStyleObject:"createStyleObject",createStyles:"createStyles",capitalize:"capitalize",decamel:"decamel",isArray:"isArray",isBoolean:"isBoolean",isDefined:"isDefined",isEmpty:"isEmpty",isFunction:"isFunction",isNumber:"isNumber",isObject:"isObject",isString:"isString",toArray:"toArray"},!0),t.a=n},6:function(e,t,o){"use strict";o.d(t,"a",(function(){return n}));var s=o(1);class n extends s.a{static getConfig(){return{className:"Neo.core.Observable",ntype:"mixin-observable",mixin:!0}}initObservable(e){let t,o=this,s=o.__proto__;for(e.listeners&&(o.listeners=e.listeners,delete e.listeners),t=o.listeners,o.listeners={},t&&o.addListener(t);s&&s.constructor.isClass;)s.constructor.staticConfig.observable&&!s.constructor.listeners&&Object.assign(s.constructor,{addListener:o.addListener,fire:o.fire,listeners:{},on:o.on,removeListener:o.removeListener,un:o.un}),s=s.__proto__}addListener(e,t,o,s,n,r){let a,i,l,c=this;if("object"==typeof e)e.hasOwnProperty("scope")&&(o=e.scope,delete e.scope),Object.entries(e).forEach(([e,t])=>{c.addListener(e,t,o)});else if("object"==typeof t)o=o||t.scope,a=t.fn,r=r||t.order,s=s||t.eventId;else if("function"==typeof t)a=t;else{if("string"!=typeof t)throw new Error("Invalid addListener call: "+e);a=t}return l={fn:a,scope:o,data:n,id:s||Neo.getId("event")},(i=c.listeners&&c.listeners[e])?(i.forEach(t=>{if(t.id===s||t.fn===a&&t.scope===o)throw new Error("Duplicate event handler attached: "+e)}),"number"==typeof r?i.splice(r,0,l):"before"===r?i.unshift(l):i.push(l)):c.listeners[e]=[l],l.id}fire(e){let t,o,s,n,r=this,a=[].slice.call(arguments,1),i=r.listeners;if(i&&i[e])for(o=[...i[e]],n=o.length,s=0;s<n;s++)t=o[s],t.fn.apply(t.scope||r,t.data?a.concat(t.data):a)}removeListener(e,t){if(Neo.isString(t)){let o=this.listeners[e],s=!1;o.forEach((e,o)=>{if(e.id===t)return s=o}),!1!==s&&o.splice(s,1)}}on(...e){return this.addListener(...e)}un(...e){this.removeListener(...e)}}Neo.applyClassConfig(n)}});