self.addEventListener('install', function (event) {
    //We dont do anything here right now
});

/* Get from cache or fetch from network */
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