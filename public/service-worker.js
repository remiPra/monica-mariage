const CACHE_NAME = "monica-mariage-v1";
const STATIC_ASSETS = [
  "/",
  "/manifest.json",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
];

// Installation et mise en cache des fichiers statiques
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
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
            // Vérifier si la réponse peut être mise en cache
            // Ne pas mettre en cache les réponses partielles (206)
            if (networkResponse.ok && networkResponse.status !== 206) {
              return caches.open(CACHE_NAME).then((cache) => {
                // Tentative de mise en cache
                try {
                  cache.put(event.request, networkResponse.clone());
                } catch (error) {
                  console.error("Erreur lors de la mise en cache:", error);
                }
                return networkResponse;
              });
            } else {
              // Retourner la réponse sans la mettre en cache
              return networkResponse;
            }
          })
        );
      })
      .catch(() => caches.match("/offline.html")) // Optionnel : page hors-ligne
  );
});

// Nettoyage des anciens caches
self.addEventListener("activate", (event) => {
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
