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
    "/AntischwitzomatClient/main.3af05d9877cf93f53a34.css",
    "/AntischwitzomatClient/966019e35de772c96067.bundle.js",
    "/AntischwitzomatClient/1.27236c5f64a1a4a2a86a.bundle.js",
    "/AntischwitzomatClient/index.html"
  ]
};
        
        !function(t){var e={};function n(o){if(e[o])return e[o].exports;var i=e[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(o,i,function(e){return t[e]}.bind(null,i));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/AntischwitzomatClient/",n(n.s=0)}([function(t,e){self.addEventListener("install",(function(t){console.log("service worker installed");const e=["https://fonts.googleapis.com/icon?family=Material+Icons","https://fonts.googleapis.com/css?family=Roboto:300,400,500"];for(let t of serviceWorkerOption.assets)e.push(t);self.skipWaiting(),t.waitUntil(caches.open("v1").then((function(t){return t.addAll(e)})))})),self.addEventListener("fetch",(function(t){t.respondWith(fetch(t.request).catch((function(){return caches.match(t.request)})))})),self.addEventListener("activate",(function(t){console.log("service worker activated")})),self.addEventListener("push",t=>{console.log("got push data"),console.log(t.data.text());const e={body:t.data.text(),icon:"favicons/android-chrome-192x192.png",badge:"favicons/android-chrome-192x192.png"};t.waitUntil(self.registration.showNotification("Antischwitzomat",e))}),self.addEventListener("notificationclick",t=>{const e=new URL("/AntischwitzomatClient/",location).href;t.notification.close(),t.waitUntil(clients.matchAll().then(t=>{for(let n of t)if(n.url===e)return n.focus();return clients.openWindow("/AntischwitzomatClient/")}))}),self.addEventListener("pushsubscriptionchange",(function(t){t.waitUntil(fetch("https://antischwitzomat.glitch.me/pushsubscriptionchange",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({old_endpoint:t.oldSubscription?t.oldSubscription.endpoint:null,new_endpoint:t.newSubscription?t.newSubscription.endpoint:null,new_p256dh:t.newSubscription?t.newSubscription.toJSON().keys.p256dh:null,new_auth:t.newSubscription?t.newSubscription.toJSON().keys.auth:null})}).then(()=>{if(!response.ok)throw Error(response.statusText)}).catch(t=>{}))}))}]);
//# sourceMappingURL=sw.js.map