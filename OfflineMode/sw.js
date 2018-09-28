var CACHE_NAME = 'offline-cache';
var urlsToCache = [
    '/content/cat.jpg'
];

//This does not do anything right now except installing itself

self.addEventListener('install', function (event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                //return cache.addAll(urlsToCache);
            })
    );
});

/* Work from cache */
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                console.log("No match, do we even go here?");
                return fetch(event.request);
            })
    );
});

/* Work from network, fallback to cache */
// self.addEventListener('fetch', function (event) {
//     event.respondWith(
//         fetch(event.request).then(function(res){
//             return caches.open(CACHE_NAME).then(function(cache){
//                 cache.put(event.request.url,res.clone());
//                 return res;
//             });
//         }).catch(function(){
//             return caches.match(event.request);
//         })
//     );
// });