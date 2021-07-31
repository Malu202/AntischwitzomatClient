var serviceWorkerOption = {
  "assets": [
    "/AntischwitzomatClient/favicons/android-chrome-192x192.png",
    "/AntischwitzomatClient/favicons/apple-touch-icon.png",
    "/AntischwitzomatClient/favicons/browserconfig.xml",
    "/AntischwitzomatClient/favicons/favicon-16x16.png",
    "/AntischwitzomatClient/favicons/favicon-32x32.png",
    "/AntischwitzomatClient/favicons/favicon.ico",
    "/AntischwitzomatClient/favicons/mstile-150x150.png",
    "/AntischwitzomatClient/favicons/safari-pinned-tab.svg",
    "/AntischwitzomatClient/site.webmanifest",
    "/AntischwitzomatClient/main.ce758e1ed7311a267867.css",
    "/AntischwitzomatClient/e26a5cdc1e8fda4dad71.bundle.js",
    "/AntischwitzomatClient/1.2a43d71881fc2ea03b61.bundle.js",
    "/AntischwitzomatClient/index.html"
  ]
};
        
        !function(t){var n={};function e(o){if(n[o])return n[o].exports;var i=n[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,e),i.l=!0,i.exports}e.m=t,e.c=n,e.d=function(t,n,o){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:o})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(e.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var i in t)e.d(o,i,function(n){return t[n]}.bind(null,i));return o},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="/AntischwitzomatClient/",e(e.s=0)}([function(t,n){self.addEventListener("install",(function(t){console.log("service worker installed");const n=["https://fonts.googleapis.com/icon?family=Material+Icons","https://fonts.googleapis.com/css?family=Roboto:300,400,500"];for(let t of serviceWorkerOption.assets)n.push(t);self.skipWaiting(),t.waitUntil(caches.open("v1").then((function(t){return t.addAll(n)})))})),self.addEventListener("fetch",(function(t){t.respondWith(fetch(t.request).catch((function(){return caches.match(t.request)})))})),self.addEventListener("activate",(function(t){console.log("service worker activated")})),self.addEventListener("push",t=>{console.log("got push data"),console.log(t.data.text());const n={body:t.data.text(),icon:"favicons/android-chrome-192x192.png",badge:"favicons/android-chrome-192x192.png"};t.waitUntil(self.registration.showNotification("Antischwitzomat",n))}),self.addEventListener("notificationclick",t=>{const n=new URL("/AntischwitzomatClient/",location).href;t.notification.close(),t.waitUntil(clients.matchAll().then(t=>{for(let o of t)if(console.log(`comparing client url ${o.url} with ${n}`),(o.url||"").startsWith((e=n).length>1&&"/"==e[e.length-1]?e.substring(0,e.length-1):e))return o.focus();var e;return console.log("opening /AntischwitzomatClient/"),clients.openWindow("/AntischwitzomatClient/")}))}),self.addEventListener("pushsubscriptionchange",(function(t){t.waitUntil(fetch("https://antischwitzomat.glitch.me/pushsubscriptionchange",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({old_endpoint:t.oldSubscription?t.oldSubscription.endpoint:null,new_endpoint:t.newSubscription?t.newSubscription.endpoint:null,new_p256dh:t.newSubscription?t.newSubscription.toJSON().keys.p256dh:null,new_auth:t.newSubscription?t.newSubscription.toJSON().keys.auth:null})}).then(()=>{if(!response.ok)throw Error(response.statusText)}).catch(t=>{}))}))}]);
//# sourceMappingURL=sw.js.map