

self.addEventListener('install', function (event) {
    console.log("service worker installed");
    const cacheAssets = [
        'https://fonts.googleapis.com/icon?family=Material+Icons',
        'https://fonts.googleapis.com/css?family=Roboto:300,400,500'];
    for (let asset of serviceWorkerOption.assets) {
        cacheAssets.push(asset);
    }
    self.skipWaiting();
    event.waitUntil(
        caches.open('v1')
            .then(function (cache) {
                return cache.addAll(cacheAssets);
            })
    );
});


self.addEventListener('fetch', function (event) {
    event.respondWith(
        fetch(event.request).catch(function () {
            return caches.match(event.request);
        })
    );
});

self.addEventListener('activate', function (event) {
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


self.addEventListener("push", event => {
    console.log("got push data");
    console.log(event.data.text())
    const title = 'Antischwitzomat';
    const options = {
        body: event.data.text(),
        icon: 'favicons/android-chrome-192x192.png',
        badge: 'favicons/android-chrome-192x192.png'
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

self.addEventListener("notificationclick", event => {
    event.waitUntil(clients.openWindow("/AntischwitzomatClient"));
});