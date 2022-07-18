!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self)["next-middleware"]={})}(this,(function(t){"use strict";var e=function(){return e=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var a in e=arguments[n])Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a]);return t},e.apply(this,arguments)};function n(t,e,n){if(n||2===arguments.length)for(var i,a=0,r=e.length;a<r;a++)!i&&a in e||(i||(i=Array.prototype.slice.call(e,0,a)),i[a]=e[a]);return t.concat(i||Array.prototype.slice.call(e))}var i,a,r,s=function t(e,n){if(e===n)return!0;if(e&&n&&"object"==typeof e&&"object"==typeof n){if(e.constructor!==n.constructor)return!1;var i,a,r;if(Array.isArray(e)){if((i=e.length)!=n.length)return!1;for(a=i;0!=a--;)if(!t(e[a],n[a]))return!1;return!0}if(e.constructor===RegExp)return e.source===n.source&&e.flags===n.flags;if(e.valueOf!==Object.prototype.valueOf)return e.valueOf()===n.valueOf();if(e.toString!==Object.prototype.toString)return e.toString()===n.toString();if((i=(r=Object.keys(e)).length)!==Object.keys(n).length)return!1;for(a=i;0!=a--;)if(!Object.prototype.hasOwnProperty.call(n,r[a]))return!1;for(a=i;0!=a--;){var s=r[a];if(!t(e[s],n[s]))return!1}return!0}return e!=e&&n!=n},o=void 0!==o?o:"undefined"!=typeof window?window:{},l="BULLET_TRAIN_DB",c="BULLET_TRAIN_EVENT",g="https://edge.api.flagsmith.com/api/v1/",u=function(t){return"Attempted to "+t+" a user before calling flagsmith.init. Call flagsmith.init first, if you wish to prevent it sending a request for flags, call init with preventFetch:true."},h=function(){function t(t){var n=this;this.eventSource=null,this.getJSON=function(t,e,a){var r=n,s=r.environmentID,o=r.headers,l={method:e||"GET",body:a,headers:{"x-environment-key":s}};return e&&"GET"!==e&&(l.headers["Content-Type"]="application/json; charset=utf-8"),o&&Object.assign(l.headers,o),i(t,l).then((function(t){return t.text().then((function(e){var n=e;try{n=JSON.parse(e)}catch(t){}return t.ok?n:Promise.reject(n)}))}))},this.getFlags=function(t,i){var a=n,r=a.onChange,o=a.onError,l=a.identity,c=a.api,g=!1;n.log("Get Flags");var u=function(t){var i=t.flags,a=t.traits;l&&(n.withTraits=!1);var o={},c={};a=a||[],(i=i||[]).forEach((function(t){o[t.feature.name.toLowerCase().replace(/ /g,"_")]={id:t.feature.id,enabled:t.enabled,value:t.feature_state_value}})),a.forEach((function(t){c[t.trait_key.toLowerCase().replace(/ /g,"_")]=t.trait_value})),n.oldFlags=e({},n.flags);var g=s(n.flags,o),u=s(n.traits,c);if(n.flags=o,n.traits=c,n.updateStorage(),n.dtrum){var h={javaDouble:{},date:{},shortString:{},javaLongOrObject:{}};Object.keys(n.flags).map((function(t){v(h,"flagsmith_value_"+t,n.getValue(t)),v(h,"flagsmith_enabled_"+t,n.hasFeature(t))})),Object.keys(n.traits).map((function(t){v(h,"flagsmith_trait_"+t,n.getTrait(t))})),n.log("Sending javaLongOrObject traits to dynatrace",h.javaLongOrObject),n.log("Sending date traits to dynatrace",h.date),n.log("Sending shortString traits to dynatrace",h.shortString),n.log("Sending javaDouble to dynatrace",h.javaDouble),n.dtrum.sendSessionProperties(h.javaLongOrObject,h.date,h.shortString,h.javaDouble)}n.trigger&&n.trigger(),r&&r(n.oldFlags,{isFromServer:!0,flagsChanged:!g,traitsChanged:!u})};return l?Promise.all([n.withTraits?n.getJSON(c+"identities/","POST",JSON.stringify({identifier:l,traits:Object.keys(n.withTraits).map((function(t){return{trait_key:t,trait_value:n.withTraits[t]}}))})):n.getJSON(c+"identities/?identifier="+encodeURIComponent(l))]).then((function(e){n.withTraits=!1,u(e[0]),t&&!g&&(g=!0,t())})).catch((function(t){var e=t.message;o&&o({message:e})})):Promise.all([n.getJSON(c+"flags/")]).then((function(e){u({flags:e[0]}),t&&!g&&(g=!0,t())})).catch((function(t){i&&!g&&(g=!0,i(t)),o&&o(t)}))},this.analyticsFlags=function(){var t=n.api;if(0!==Object.getOwnPropertyNames(n.evaluationEvent).length)return n.getJSON(t+"analytics/flags/","POST",JSON.stringify(n.evaluationEvent)).then((function(t){var i=n.getState();n.setState(e(e({},i),{evaluationEvent:{}})),n.updateEventStorage()})).catch((function(t){n.log("Exception fetching evaluationEvent",t)}))},this.analyticsInterval=null,this.api=null,this.cacheFlags=null,this.ts=null,this.enableAnalytics=null,this.enableLogs=null,this.environmentID=null,this.evaluationEvent=null,this.flags=null,this.getFlagInterval=null,this.headers=null,this.initialised=null,this.oldFlags=null,this.onChange=null,this.onError=null,this.trigger=null,this.identity=null,this.ticks=null,this.timer=null,this.traits=null,this.dtrum=null,this.withTraits=null,this.cacheOptions={ttl:0,skipAPI:!1},this.evaluateFlag=function(t){if(n.enableAnalytics){if(!n.evaluationEvent)return;void 0===n.evaluationEvent[t]&&(n.evaluationEvent[t]=0),n.evaluationEvent[t]+=1}n.updateEventStorage()},this.getValue=function(t){var e=n.flags&&n.flags[t.toLowerCase().replace(/ /g,"_")],i=null;return e&&(i=e.value),n.evaluateFlag(t),i},this.getTrait=function(t){return n.traits&&n.traits[t.toLowerCase().replace(/ /g,"_")]},this.setTrait=function(t,i){var a=n,r=a.getJSON,s=a.identity,o=a.api;if(o){var l={};if(l[t]=i,!n.identity)return n.withTraits=e(e({},n.withTraits||{}),l),void n.log("Set trait prior to identifying",n.withTraits);var c={identity:{identifier:s},trait_key:t,trait_value:i};return r("".concat(o,"traits/"),"POST",JSON.stringify(c)).then((function(){n.initialised&&n.getFlags()}))}console.error(u("setTrait"))},this.setTraits=function(t){var i=n;i.getJSON;var a=i.identity,r=i.api;if(r)return t&&"object"==typeof t||console.error("Expected object for flagsmith.setTraits"),n.identity?n.getJSON(r+"identities/","POST",JSON.stringify({identifier:a,traits:Object.keys(t).map((function(e){return{trait_key:e,trait_value:t[e]}}))})).then((function(){n.initialised&&n.getFlags()})):(n.withTraits=e(e({},n.withTraits||{}),t),void n.log("Set traits prior to identifying",n.withTraits));console.error(u("setTraits"))},this.hasFeature=function(t){var e=n.flags&&n.flags[t.toLowerCase().replace(/ /g,"_")],i=!1;return e&&e.enabled&&(i=!0),n.evaluateFlag(t),i},i=t.fetch?t.fetch:"undefined"!=typeof fetch?fetch:o.fetch,this.log("Constructing flagsmith instance "+t),t.eventSource&&(r=t.eventSource),a=t.AsyncStorage}return t.prototype.init=function(t){var n=this,s=t.environmentID,o=t.api,u=void 0===o?g:o,h=t.headers,f=t.onChange,v=t.cacheFlags,d=t.onError,p=t.defaultFlags,y=t.preventFetch,m=t.enableLogs,S=t.enableDynatrace,O=t.enableAnalytics,b=t.realtime,I=t.eventSourceUrl,w=void 0===I?u:I,F=t.AsyncStorage,E=t.identity,T=t.traits,j=t._trigger,P=t.state,A=t.cacheOptions,_=t.angularHttpClient;return new Promise((function(t,o){if(n.environmentID=s,n.api=u,n.headers=h,n.getFlagInterval=null,n.analyticsInterval=null,n.onChange=f,n.trigger=j,n.onError=d,n.identity=E,n.withTraits=T,n.enableLogs=m,n.cacheOptions=A?{skipAPI:!!A.skipAPI,ttl:A.ttl||0}:n.cacheOptions,!n.cacheOptions.ttl&&n.cacheOptions.skipAPI&&console.warn("Flagsmith: you have set a cache ttl of 0 and are skipping API calls, this means the API will not be hit unless you clear local storage."),n.enableAnalytics=O||!1,n.flags=Object.assign({},p)||{},n.initialised=!0,n.ticks=1e4,b){var g=w+"environment/"+s;r?n.eventSource||(n.log("Creating event source with url "+g),n.eventSource=new r(g),n.eventSource.addEventListener("message",(function(t){n.log("Received eventsource message"),n.getFlags()}))):n.log("Error, EventSource is undefined")}if(n.log("Initialising with properties",{environmentID:s,api:u,headers:h,onChange:f,cacheFlags:v,onError:d,defaultFlags:p,preventFetch:y,enableLogs:m,enableAnalytics:O,AsyncStorage:a,identity:E,traits:T,_trigger:j,state:P,angularHttpClient:_},n),n.timer=n.enableLogs?(new Date).valueOf():null,F&&(a=F),n.cacheFlags=void 0!==a&&v,n.setState(P),!s)throw o("Please specify a environment id"),"Please specify a environment id";S&&("undefined"==typeof dtrum?console.error("You have attempted to enable dynatrace but dtrum is undefined, please check you have the Dynatrace RUM JavaScript API installed."):n.dtrum=dtrum),_&&(i=function(t,e){var n=e.headers,i=e.method,a=e.body;return new Promise((function(e){switch(i){case"GET":return _.get(t,{headers:n}).subscribe((function(t){e({ok:1,text:function(){return Promise.resolve(t)}})}));case"POST":case"PUT":return _.post(t,a,{headers:n}).subscribe((function(t){e({ok:1,text:function(){return Promise.resolve(t)}})}))}}))}),a&&"undefined"!=typeof window&&a.getItem(c).then((function(t){if(t)try{n.evaluationEvent=JSON.parse(t)}catch(t){n.evaluationEvent={}}else n.evaluationEvent={};return n.analyticsInterval=setInterval(n.analyticsFlags,n.ticks),!0})),n.enableAnalytics&&(n.analyticsInterval&&clearInterval(n.analyticsInterval),a&&"undefined"!=typeof window&&a.getItem(c,(function(t,i){if(i){var a=JSON.parse(i);a&&(P=n.getState(),n.log("Retrieved events from cache",i),n.setState(e(e({},P),{evaluationEvent:a})))}return!0}))),v?a&&"undefined"!=typeof window&&a.getItem(l,(function(e,i){if(i)try{var a=JSON.parse(i),r=!1;if(a&&a.api===n.api&&a.environmentID===n.environmentID){var s=!0;n.cacheOptions.ttl&&(!a.ts||(new Date).valueOf()-a.ts>n.cacheOptions.ttl)&&a.ts&&(n.log("Ignoring cache, timestamp is too old ts:"+a.ts+" ttl: "+n.cacheOptions.ttl+" time elapsed since cache: "+((new Date).valueOf()-a.ts)+"ms"),s=!1),s&&(r=!0,n.setState(a),n.log("Retrieved flags from cache",a))}n.flags?(n.trigger&&n.trigger(),n.onChange&&n.onChange(null,{isFromServer:!1}),n.oldFlags=n.flags,t(!0),n.cacheOptions.skipAPI&&r&&n.log("Skipping API, using cache"),y||n.cacheOptions.skipAPI&&r||n.getFlags()):y?t(!0):n.getFlags(t,o)}catch(t){n.log("Exception fetching cached logs",t)}else y?(p&&(n.trigger&&n.trigger(),n.onChange&&n.onChange(null,{isFromServer:!1})),t(!0)):n.getFlags(t,o);return!0})):y?(p&&(n.trigger&&n.trigger(),n.onChange&&n.onChange(null,{isFromServer:!1})),t(!0)):n.getFlags(t,o)})).catch((function(t){return d&&d(t)}))},t.prototype.getAllFlags=function(){return this.flags},t.prototype.identify=function(t,n){return this.identity=t,this.log("Identify: "+this.identity),n&&(this.withTraits=e(e({},this.withTraits||{}),n)),this.initialised?this.getFlags():Promise.resolve()},t.prototype.getState=function(){return{api:this.api,environmentID:this.environmentID,flags:this.flags,identity:this.identity,ts:this.ts,traits:this.traits,evaluationEvent:this.evaluationEvent}},t.prototype.setState=function(t){t&&(this.initialised=!0,this.api=t.api||this.api||g,this.environmentID=t.environmentID||this.environmentID,this.flags=t.flags||this.flags,this.identity=t.identity||this.identity,this.traits=t.traits||this.traits,this.evaluationEvent=t.evaluationEvent||this.evaluationEvent)},t.prototype.log=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];this.enableLogs&&console.log.apply(this,n(["FLAGSMITH:",(new Date).valueOf()-this.timer,"ms"],t,!0))},t.prototype.updateStorage=function(){if(this.cacheFlags){this.ts=(new Date).valueOf();var t=JSON.stringify(this.getState());this.log("Setting storage",t),a.setItem(l,t)}},t.prototype.updateEventStorage=function(){if(this.enableAnalytics){var t=JSON.stringify(this.getState().evaluationEvent);this.log("Setting event storage",t),a.setItem(c,t)}},t.prototype.logout=function(){return this.identity=null,this.traits=null,this.initialised?this.getFlags():Promise.resolve()},t.prototype.startListening=function(t){void 0===t&&(t=1e3),this.getFlagInterval&&clearInterval(this.getFlagInterval),this.getFlagInterval=setInterval(this.getFlags,t)},t.prototype.stopListening=function(){clearInterval(this.getFlagInterval),this.getFlagInterval=null},t.prototype.getSegments=function(){},t}();function f(t){var e=t.fetch,n=t.AsyncStorage,i=t.eventSource;return new h({fetch:e,AsyncStorage:n,eventSource:i})}var v=function(t,e,n){var i="shortString",a=!0;"number"==typeof n&&(i="javaDouble",a=!1),t[i]=t[i]||{},t[i][e]=a?n+"":n},d=f({});t.createFlagsmithInstance=function(){return f({})},t.default=d,Object.defineProperty(t,"__esModule",{value:!0})}));
//# sourceMappingURL=next-middleware.js.map
