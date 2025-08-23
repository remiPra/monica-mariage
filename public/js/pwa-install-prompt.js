let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  localStorage.setItem('canPromptInstall', 'yes');
});

window.addEventListener('DOMContentLoaded', () => {
  const hasInstalled = localStorage.getItem('pwaInstalled') === 'true';
  const refusedAt = localStorage.getItem('pwaPromptLastRefused');

  if (hasInstalled) return;

  if (refusedAt) {
    const refusedDate = new Date(refusedAt);
    const now = new Date();
    const diffDays = (now - refusedDate) / (1000 * 60 * 60 * 24);
    if (diffDays < 7) return;
  }

  setTimeout(() => {
    if (deferredPrompt && localStorage.getItem('canPromptInstall') === 'yes') {
      showInstallBanner();
    }
  }, 30000);
});

function showInstallBanner() {
  const banner = document.createElement('div');
  banner.innerHTML = `
    <div style="
      position: fixed;
      bottom: 20px;
      left: 20px;
      right: 20px;
      background: #fffaf9;
      border: 1px solid #e2bfbf;
      border-radius: 12px;
      box-shadow: 0 6px 12px rgba(0,0,0,0.1);
      padding: 16px;
      font-family: 'Segoe UI', sans-serif;
      display: flex;
      align-items: center;
      justify-content: space-between;
      z-index: 9999;
    ">
      <div style="display: flex; align-items: center;">
        <img src="/icons/icon-192x192.png" alt="Monica Mariage" style="width: 48px; height: 48px; border-radius: 8px; margin-right: 16px;">
        <p style="margin: 0; font-size: 15px;">
          🌟 Installez <strong>Monica Mariage</strong> sur votre téléphone pour rester connectée à nos robes.
        </p>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <button id="installApp" style="
          background: #d19c9c;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
        ">Installer</button>
        <button id="closeBanner" style="
          background: transparent;
          border: none;
          font-size: 18px;
          line-height: 1;
          cursor: pointer;
          color: #888;
        ">❌</button>
      </div>
    </div>
  `;
  document.body.appendChild(banner);

  // Installer
  document.getElementById('installApp').addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('✅ App installée');
        localStorage.setItem('pwaInstalled', 'true');
      } else {
        console.log('❌ App refusée');
        localStorage.setItem('pwaPromptLastRefused', new Date().toISOString());
      }
      banner.remove();
    }
  });

  // Fermer (compte comme un refus temporaire aussi)
  document.getElementById('closeBanner').addEventListener('click', () => {
    localStorage.setItem('pwaPromptLastRefused', new Date().toISOString());
    banner.remove();
  });
}
