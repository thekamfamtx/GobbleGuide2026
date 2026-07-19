const CACHE_NAME = "gobble-guide-test2";

const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/style.css",
  "./js/app.js"
];
self.addEventListener("install", event => {

  event.waitUntil(

    caches.open(CACHE_NAME)

      .then(cache => {

        return cache.addAll(urlsToCache);

      })

  );

});

self.addEventListener("fetch", event => {

  event.respondWith(

    caches.match(event.request)

      .then(response => {

        return response || fetch(event.request);

      })

  );

});
