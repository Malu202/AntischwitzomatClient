
this.addEventListener('install', function (event) {
    console.log("adding event listener")
    event.waitUntil(
        caches.open('v1').then(function (cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/main.js',
                '/style.css',
            ]);
        })
    );
});


this.addEventListener('get', function (event) {
    console.log("cache")
    event.respondWith(
        caches.match(event.request)
    );
});