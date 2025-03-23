// ✅ Détection du mode dev via l’URL
const isLocalhost =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1" ||
  window.location.hostname === "";

// 🧹 En développement : désinstallation automatique du SW
if ("serviceWorker" in navigator && isLocalhost) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((r) => r.unregister());
    console.log("🧹 Service Worker désinstallé en mode développement");
  });
}

// 🚀 En production : enregistrement du SW avec auto-reload
if ("serviceWorker" in navigator && !isLocalhost) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("✅ Service Worker enregistré !");

        // 🌀 Détection d'une nouvelle version
        registration.onupdatefound = () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.onstatechange = () => {
              if (newWorker.state === "installed") {
                if (navigator.serviceWorker.controller) {
                  console.log("♻️ Nouvelle version détectée, rechargement...");
                  window.location.reload();
                } else {
                  console.log("📦 Première installation du SW");
                }
              }
            };
          }
        };
      })
      .catch((error) => console.error("❌ Erreur Service Worker :", error));
  });
}
