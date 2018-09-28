var CAT_PATH = "content/cat.jpg";

// document.getElementById("loadButton").addEventListener("click", () => {
//     var el = document.getElementById("contentHolder");
//     var img = document.createElement("IMG");
//     el.innerHTML ="";

//     img.src = CAT_PATH;
//     el.appendChild(img);
// });

document.getElementById("addToCache").addEventListener("click", () => {
    caches.open("custom-cache").then(cache => {
        cache.add(CAT_PATH);
        cache.addAll([
        "/",
        "/sw.js",
        "/index.html",
        "/js/main.js",
        "/styles/main.css"]);
    });
});

document.getElementById("clearCache").addEventListener("click", () => {
    caches.delete("custom-cache");
    caches.delete("OFFLINE_APP");
});


//Install Service worker (right now just to fill the criterias for auto suggest Web app install https://developers.google.com/web/fundamentals/app-install-banners/#criteria)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('sw.js').then(function (registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function (err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}


window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.

    showAddBtn(e);
});

function showAddBtn(event) {
    var deferredPrompt = event;
    //Right now we just show it straight away
    document.getElementById("addToStartScreen").style.display = "block";

    var btnAdd = document.getElementById("btnAdd");
    btnAdd.addEventListener('click', (e) => {
        // hide our user interface that shows our A2HS button
        btnAdd.style.display = 'none';
        // Show the prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice
            .then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt');
                } else {
                    console.log('User dismissed the A2HS prompt');
                }
                deferredPrompt = null;
            });
    });
}