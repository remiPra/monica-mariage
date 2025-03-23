// ✅ Détection du mode développement via l'URL
const isLocalhost =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1" ||
  window.location.hostname === "";

// 🛑 En dev : supprimer les anciens service workers
if ("serviceWorker" in navigator && isLocalhost) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((r) => r.unregister());
    console.log("🧹 Service Worker désinstallé en local");
  });
}

// ✅ En prod : enregistrer le service worker
if ("serviceWorker" in navigator && !isLocalhost) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("✅ Service Worker enregistré !");
        registration.onupdatefound = () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.onstatechange = () => {
              if (newWorker.state === "installed") {
                if (navigator.serviceWorker.controller) {
                  console.log("♻️ Nouvelle version détectée, rechargement...");
                  window.location.reload();
                } else {
                  console.log("📦 SW installé pour la première fois");
                }
              }
            };
          }
        };
      })
      .catch((error) =>
        console.error(
          "❌ Erreur lors de l'enregistrement du Service Worker:",
          error
        )
      );
  });
}
