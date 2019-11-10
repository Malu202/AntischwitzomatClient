
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


// function showNotification(event) {
//     return new Promise(resolve => {
//         const { body, title, tag } = JSON.parse(event.data.text());
//         self.registration
//             .getNotifications({ tag })
//             .then(existingNotifications => { /* close? ignore? */ })
//             .then(() => {
//                 const icon = `/path/to/icon`;
//                 return self.registration
//                     .showNotification(title, { body, tag, icon })
//             })
//             .then(resolve)
//     })
// }

this.addEventListener("push", event => {
    console.log("got push data");
    console.log(event.data.text())
    // event.waitUntil(
    //     //showNotification(event)
    // );
    const title = 'Antischwitzomat';
    const options = {
        body: event.data.text(),
        icon: 'images/icon.png',
        badge: 'images/badge.png'
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

this.addEventListener("notificationclick", event => {
    event.waitUntil(clients.openWindow("/"));
});