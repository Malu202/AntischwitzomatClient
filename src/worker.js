
this.addEventListener('install', function (event) {
    console.log("service worker installed");
    self.skipWaiting();
    event.waitUntil(
        caches.open('v1')
            .then(function (cache) {
                return cache.addAll([
                    './',
                    './index.html',
                    './main.js',
                    './style.css',
                    './debug.html',

                    'https://fonts.googleapis.com/icon?family=Material+Icons',
                    'https://fonts.googleapis.com/css?family=Roboto:300,400,500',

                ]);
            })
    );
});


this.addEventListener('fetch', function (event) {
    event.respondWith(
        fetch(event.request).catch(function () {
            return caches.match(event.request);
        })
    );
});

this.addEventListener('activate', function (event) {
    console.log("service worker activated")
    // event.waitUntil(
    //     caches.keys().then(function (keyList) {
    //         console.log("delete cache");
    //         return Promise.all(keyList.map(function (key) {
    //             return caches.delete(key);
    //         }));
    //     })
    // );
});


this.addEventListener("push", event => {
    console.log("got push data");
    console.log(event.data.text())
    const title = 'Antischwitzomat';
    const options = {
        body: event.data.text(),
        // icon: 'images/icon.png',
        // badge: 'images/badge.png'
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

this.addEventListener("notificationclick", event => {
    event.waitUntil(clients.openWindow("/"));
});