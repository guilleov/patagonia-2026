// Precache the whole site so it opens with no signal; anything else (map tiles, Leaflet) is
// cached the first time it loads online. Bump VERSION after editing pages so phones refetch.
const VERSION = "v1";
const FILES = ["./", "buenos-aires.html","calendar.html","costes.html","dinos.html","gear.html","gpx/tracks.js","gpxview.js","huemul.html","i18n.js","index.html","leer.html","logistics.html","material.html","packing.html","style.css","tickets.js","todo.html","ver.html","wtrek.html"];
self.addEventListener("install", e => e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting())));
self.addEventListener("activate", e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  // Network first so online visits see edits; cache when offline.
  e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open(VERSION).then(x => x.put(e.request, c)); return r; })
    .catch(() => caches.match(e.request, { ignoreSearch: true })));
});
