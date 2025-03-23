const CACHE_NAME = "monica-mariage-v1";
const STATIC_ASSETS = [
  "/",
  "/manifest.json",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
];

// Installation et mise en cache des fichiers statiques
self.addEventListener("install", (event) => {
  self.skipWaiting(); // ⬅️ Nouvelle version active sans attendre
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
});

// Activation : nettoyage des anciens caches
self.addEventListener("activate", (event) => {
  self.clients.claim(); // ⬅️ Prend immédiatement le contrôle
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

// Interception des requêtes et mise en cache dynamique
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((cachedResponse) => {
        return (
          cachedResponse ||
          fetch(event.request).then((networkResponse) => {
            if (networkResponse.ok && networkResponse.status !== 206) {
              return caches.open(CACHE_NAME).then((cache) => {
                try {
                  cache.put(event.request, networkResponse.clone());
                } catch (error) {
                  console.error("Erreur lors de la mise en cache:", error);
                }
                return networkResponse;
              });
            } else {
              return networkResponse;
            }
          })
        );
      })
      .catch(() => caches.match("/offline.html")) // Optionnel
  );
});
