

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
    const rootUrl = new URL(__BASEURL, location).href;
    event.notification.close();
    event.waitUntil(clients.matchAll().then(matchedClients => {
        for (let client of matchedClients) {
            if (client.url === rootUrl) {
                return client.focus();
            }
        }
        return clients.openWindow(__BASEURL);
    })
    );
});


self.addEventListener('pushsubscriptionchange', function (event) {
    event.waitUntil(
        fetch('https://antischwitzomat.glitch.me/pushsubscriptionchange', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                old_endpoint: event.oldSubscription ? event.oldSubscription.endpoint : null,
                new_endpoint: event.newSubscription ? event.newSubscription.endpoint : null,
                new_p256dh: event.newSubscription ? event.newSubscription.toJSON().keys.p256dh : null,
                new_auth: event.newSubscription ? event.newSubscription.toJSON().keys.auth : null
            })
        })
            .then(() => {
                if (!response.ok) throw Error(response.statusText);
                else;//update wurde gesendet
            })
            .catch(error => {
                //update wurde nicht gesendet
            })
    );
});