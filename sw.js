var serviceWorkerOption = {
  "assets": [
    "/AntischwitzomatClient/main.646b852c6868faf60a67.css",
    "/AntischwitzomatClient/2b1ec1ab115096d6b7cb.bundle.js",
    "/AntischwitzomatClient/1.29d6af11fdbd2c98d10d.bundle.js",
    "/AntischwitzomatClient/index.html"
  ]
};
        
        !function(t){var e={};function n(o){if(e[o])return e[o].exports;var i=e[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(o,i,function(e){return t[e]}.bind(null,i));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/AntischwitzomatClient/",n(n.s=0)}([function(t,e){self.addEventListener("install",(function(t){console.log("service worker installed");const e=["https://fonts.googleapis.com/icon?family=Material+Icons","https://fonts.googleapis.com/css?family=Roboto:300,400,500"];for(let t of serviceWorkerOption.assets)e.push(t);self.skipWaiting(),t.waitUntil(caches.open("v1").then((function(t){return t.addAll(e)})))})),self.addEventListener("fetch",(function(t){t.respondWith(fetch(t.request).catch((function(){return caches.match(t.request)})))})),self.addEventListener("activate",(function(t){console.log("service worker activated")})),self.addEventListener("push",t=>{console.log("got push data"),console.log(t.data.text());const e={body:t.data.text()};t.waitUntil(self.registration.showNotification("Antischwitzomat",e))}),self.addEventListener("notificationclick",t=>{t.waitUntil(clients.openWindow("/"))})}]);
//# sourceMappingURL=sw.js.map