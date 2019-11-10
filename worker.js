
this.addEventListener('install', function (event) {
    console.log("service worker installed");
    // self.skipWaiting();
    event.waitUntil(
        caches.open('v1')
            .then(function (cache) {
                return cache.addAll([
                    '/',
                    '/index.html',
                    '/main.js',
                    '/style.css',
                    '/debug.html',

                    'https://fonts.googleapis.com/icon?family=Material+Icons',
                    'https://fonts.googleapis.com/css?family=Roboto:300,400,500',

                ]);
            })
    );
});


this.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                if (response) {
                    console.log("[Service Worker] returning cached file : " + event.request.url);
                    return response
                }
                return fetch(event.request)
            })
    );
});

// this.addEventListener('activate', function (event) {
//     console.log("service worker activated")
//     event.waitUntil(
//         caches.keys().then(function (keyList) {
//             console.log("delete cache");
//             return Promise.all(keyList.map(function (key) {
//                 return caches.delete(key);
//             }));
//         })
//     );
// });