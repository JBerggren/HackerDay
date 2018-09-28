var CACHE_NAME = "OFFLINE_APP";
self.addEventListener('install', function (event) {
});

var getFromCacheFirst = true;

/* Alternative 1: Get from cache or if not found fetch from network */
if (getFromCacheFirst) {
    self.addEventListener('fetch', function (event) {
        event.respondWith(
            caches.match(event.request)
                .then(function (response) {
                    // Cache hit - return response
                    if (response) {
                        return response;
                    }
                    return fetch(event.request);
                })
        );
    });

} else {
    /* Alternative 2: Work from network, fallback to cache if offline */
    self.addEventListener('fetch', function (event) {
        event.respondWith(
            fetch(event.request).then(function (res) {
                return res;
            }).catch(function () {
                return caches.match(event.request);
            })
        );
    });
}

