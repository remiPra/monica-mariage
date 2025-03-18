document.addEventListener("DOMContentLoaded", () => {
  const banner = document.createElement("div");
  banner.id = "pwa-banner";
  banner.style.display = "none"; // Caché par défaut
  banner.innerHTML = `
      <div style="
        position: fixed; inset: 0;
        display: flex; justify-content: center; align-items: center;
        background: rgba(0, 0, 0, 0.6);
        z-index: 1000;
      ">
        <div style="
          background: white; padding: 20px; border-radius: 10px; text-align: center;
          max-width: 350px; width: 90%;
        ">
          <button id="pwa-close-btn" style="position: absolute; right: 10px; top: 10px; font-size: 20px;">×</button>
          <h2 style="color: #875933;">🚀 Installez Monica Mariage en un clic !</h2>
          <img src="/logo-new.png" width="100" height="100" alt="Monica Mariage App">
          <p>📱 Accédez à nos collections en exclusivité et recevez des offres spéciales directement sur votre appareil.</p>
          <button id="pwa-install-btn" style="background: #af7749; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; margin-top: 10px;">📥 Installer maintenant</button>
          <button id="pwa-later-btn" style="background: gray; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; margin-top: 10px;">⏳ Plus tard</button>
        </div>
      </div>
    `;
  document.body.appendChild(banner);

  let deferredPrompt;
  const dismissCooldown = 15 * 60 * 1000; // 15 min
  const lastDismissTime = localStorage.getItem("pwaLastDismissTime");

  if (lastDismissTime && Date.now() - lastDismissTime < dismissCooldown) {
    return; // Ne pas afficher la bannière si l'utilisateur l'a refusée récemment
  }

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;

    // Afficher la bannière après un délai (30 secondes)
    setTimeout(() => {
      banner.style.display = "flex";
    }, 30000);
  });

  document
    .getElementById("pwa-install-btn")
    .addEventListener("click", async () => {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === "accepted") {
        console.log("✅ Installation acceptée !");
      } else {
        console.log("❌ Installation refusée.");
        localStorage.setItem("pwaLastDismissTime", Date.now());
      }

      localStorage.setItem("pwaBannerDismissed", "true");
      banner.style.display = "none";
    });

  document.getElementById("pwa-later-btn").addEventListener("click", () => {
    banner.style.display = "none";
    localStorage.setItem("pwaBannerDismissed", "true");
    localStorage.setItem("pwaLastDismissTime", Date.now());
  });

  document.getElementById("pwa-close-btn").addEventListener("click", () => {
    banner.style.display = "none";
    localStorage.setItem("pwaBannerDismissed", "true");
    localStorage.setItem("pwaLastDismissTime", Date.now());
  });
});
