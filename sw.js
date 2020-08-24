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
    "/AntischwitzomatClient/main.c9f08d22508e7d242df7.css",
    "/AntischwitzomatClient/153e8e34840856cebc04.bundle.js",
    "/AntischwitzomatClient/1.223349836af862bfc4f3.bundle.js",
    "/AntischwitzomatClient/index.html"
  ]
};
        
        !function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/AntischwitzomatClient/",n(n.s=0)}([function(e,t){self.addEventListener("install",(function(e){console.log("service worker installed");const t=["https://fonts.googleapis.com/icon?family=Material+Icons","https://fonts.googleapis.com/css?family=Roboto:300,400,500"];for(let e of serviceWorkerOption.assets)t.push(e);self.skipWaiting(),e.waitUntil(caches.open("v1").then((function(e){return e.addAll(t)})))})),self.addEventListener("fetch",(function(e){e.respondWith(fetch(e.request).catch((function(){return caches.match(e.request)})))})),self.addEventListener("activate",(function(e){console.log("service worker activated")})),self.addEventListener("push",e=>{console.log("got push data"),console.log(e.data.text());const t={body:e.data.text(),icon:"favicons/android-chrome-192x192.png",badge:"favicons/android-chrome-192x192.png"};e.waitUntil(self.registration.showNotification("Antischwitzomat",t))}),self.addEventListener("notificationclick",e=>{e.waitUntil(clients.openWindow("/"))})}]);
//# sourceMappingURL=sw.js.map