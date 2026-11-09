// Offline cache for the Einmal preview. export_web_data.py replaces 20261109124110, so each export gets a new cache.
const CACHE = "einmal-20261109124110";
const FILES = ["./", "index.html", "forms.json", "words.txt", "manifest.webmanifest", "icon.png"];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(caches.match(event.request, { ignoreSearch: true }).then(hit => hit || fetch(event.request)));
});
