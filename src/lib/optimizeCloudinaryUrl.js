export function optimizeCloudinaryUrl(url, mode = false) {
  // mode: false → desktop, true → mobile, 'full' → full‑res auto
  if (!url || !url.includes("cloudinary.com")) return url;

  const [baseUrl, imageId] = url.split("/upload/");

  // Nouveau mode pour placeholder mobile très léger
  if (mode === "placeholderMobile") {
    // Version très légère pour LCP (60px largeur, qualité 30%)
    return `${baseUrl}/upload/c_fill,g_face,ar_2:3,w_60,f_webp,q_30/${imageId}`;
  }

  if (mode === "full") {
    // transformation « full » : auto quality et format
    return `${baseUrl}/upload/c_fill,g_face,ar_2:5,w_400,f_webp,q_100/${imageId}`;
  }

  if (mode === "imageMobileGallery") {
    // transformation « full » : auto quality et format
    return `${baseUrl}/upload/c_fill,g_face,ar_2:3,w_350,f_webp,q_95/${imageId}`;
  }

  const isMobile = !!mode;
  if (isMobile) {
    // ratio 3:4 pour mobile
    return `${baseUrl}/upload/c_fill,g_face,ar_2:5,w_350,f_webp,q_90/${imageId}`;
  } else {
    // ratio 1:2 pour desktop
    return `${baseUrl}/upload/c_fill,g_face,ar_1:2,w_800,f_webp,q_95/${imageId}`;
  }
}
