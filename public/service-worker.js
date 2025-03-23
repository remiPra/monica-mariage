const CACHE_NAME = "monica-mariage-v1";
const STATIC_ASSETS = [
  "/",
  "/manifest.json",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  // "/offline.html" // décommente si tu l'ajoutes
];

// Installation : mise en cache des assets
self.addEventListener("install", (event) => {
  self.skipWaiting(); // ⬅️ Active le nouveau SW immédiatement
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
});

// Activation : suppression des anciens caches
self.addEventListener("activate", (event) => {
  self.clients.claim(); // ⬅️ Prend le contrôle sans reload manuel
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
  );
});

// Fetch : réponse depuis le cache ou fallback au réseau
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request)
          .then((networkResponse) => {
            if (networkResponse.ok && networkResponse.status !== 206) {
              return caches.open(CACHE_NAME).then((cache) => {
                try {
                  cache.put(event.request, networkResponse.clone());
                } catch (error) {
                  console.error("❌ Erreur lors de la mise en cache :", error);
                }
                return networkResponse;
              });
            } else {
              return networkResponse;
            }
          })
          .catch(() => caches.match("/offline.html")) // Optionnel si tu crées la page
      );
    })
  );
});
