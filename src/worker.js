let cacheNames = {
    code: `code-${__CACHENAME}`,
    asset: "asset-v1"
};

let resources = self.__WB_MANIFEST;

self.addEventListener('install', function (event) {
    let dividedAssets = resources.reduce((acc, next) => {
        if (next.url.indexOf("favicons/") > -1) {
            acc.asset.push(next.url);
        }
        else {
            acc.code.push(next.url);
        }
        return acc;
    }, { asset: [], code: [] });
    let definedCaches = [
        {
            name: cacheNames.code,
            assets: [
                ...dividedAssets.code
            ]
        },
        {
            name: cacheNames.asset,
            assets: dividedAssets.asset,
        }
    ];
    event.waitUntil((async () => {
        let tasks = definedCaches.map(async c => {
            let cache = await caches.open(c.name);
            await cache.addAll(Array.from(new Set(c.assets)));
        });
        await Promise.all(tasks);
    })());
});


self.addEventListener('fetch', function (event) {
    if (event.request.mode === "navigate") {
        if (event.request.method !== "GET") {
            return;
        }
        event.respondWith(caches.match("index.html", { cacheName: cacheNames.code }).then(response => {
            return response || fetch(event.request);
        }));
        return;
    }
    event.respondWith(
        caches.match(event.request).then(async (response) => {
            if (response) {
                return response;
            }
            else {
                let res = await fetch(event.request);
                return res;
            }
        })
    );
});

self.addEventListener('activate', function (event) {
    console.log("service worker activated")
    event.waitUntil((async () => {
        let storedCaches = await caches.keys();
        let expectedCaches = Object.values(cacheNames);
        let tasks = storedCaches.filter(c => expectedCaches.indexOf(c) < 0).map(async c => {
            await caches.delete(c);
        })
        await Promise.all(tasks);
    })());
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


function cleanRootUrl(u) {
    if (u.length > 1 && u[u.length-1] == "/") {
        return u.substring(0, u.length-1);
    }
    return u;
}

self.addEventListener("notificationclick", event => {
    const rootUrl = new URL(__BASEURL, location).href;
    event.notification.close();
    event.waitUntil(clients.matchAll().then(matchedClients => {
        for (let client of matchedClients) {
            console.log(`comparing client url ${client.url} with ${rootUrl}`);
            if ((client.url|| "").startsWith(cleanRootUrl(rootUrl))) {
                return client.focus();
            }
        }
        console.log(`opening ${__BASEURL}`);
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