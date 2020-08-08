const CACHE_NAME = "version-1";
// const urlsToCache = ["index.html", "offline.html"];
const urlsToCache = [
  "/",
  "/styles/styles.css",
  "/script/webpack-bundle.js",
  "/static/js/bundle.js",
  "/static/js/main.chunk.js",
  "/static/js/0.chunk.js",
  "/manifest.json",
  "/images/sun.png",
  "/images/1.png",
  "/images/2.png",
  "/images/3.png",
  "/images/favicon.png",
];

const self = this;

// Install SW
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");

      return cache.addAll(urlsToCache);
    })
  );
});
// Listen for requests
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cacheRes) => {
      return cacheRes || fetch(event.request);
    })
  );
});
// Activate the SW
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cahceNames) =>
      Promise.all(
        cahceNames.map((cahceName) => {
          if (!cacheWhitelist.includes(cahceName)) {
            return caches.delete(cahceName);
          }
        })
      )
    )
  );
});
