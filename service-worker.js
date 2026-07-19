const CACHE_NAME = "gobble-guide-test3";

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
  "./pages/merch.html"
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
