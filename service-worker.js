const CACHE_NAME = "gobble-guide-v1.0.2";

const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/style.css",
  "./js/app.js",

  "./pages/home.html",
  "./pages/cruise-info.html",
  "./pages/schedule.html",
  "./pages/videos.html",
  "./pages/memories.html",
  "./pages/merch.html",

  "./images/gobble-banner.png",
  "./images/kam-logo.png",

  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png"
];

// INSTALL
self.addEventListener("install", event => {

    self.skipWaiting();

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );

});

// ACTIVATE
self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys().then(cacheNames => {

            return Promise.all(

                cacheNames.map(cache => {

                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }

                })

            );

        })

    );

    self.clients.claim();

});

// FETCH (Network First)

self.addEventListener("fetch", event => {

    if (event.request.method !== "GET") return;

    event.respondWith(

        fetch(event.request)

            .then(response => {

                const responseClone = response.clone();

                caches.open(CACHE_NAME)

                    .then(cache => {

                        cache.put(event.request, responseClone);

                    });

                return response;

            })

            .catch(() => {

                return caches.match(event.request);

            })

    );

});
