// src/lib/optimizeCloudinaryUrl.js
export function optimizeCloudinaryUrl(url, mode) {
  // mode: "mobile" → mobile, "desktop" → desktop, "full" → full‑res auto
  if (!url || !url.includes("cloudinary.com")) return url;

  const [baseUrl, imageId] = url.split("/upload/");

  // Log pour débugger
  console.log("Mode reçu:", mode);

  if (mode === "full") {
    return `${baseUrl}/upload/c_fill,g_face,ar_2:5,w_400,f_webp,q_100/${imageId}`;
  }

  if (mode === "imageMobileGallery") {
    return `${baseUrl}/upload/c_fill,g_face,ar_2:3,w_350,f_webp,q_95/${imageId}`;
  }

  if (mode === "mobile" || mode === true) {
    return `${baseUrl}/upload/c_fill,g_face,ar_2:5,w_350,f_webp,q_85/${imageId}`;
  }

  // Par défaut ou si mode === "desktop" ou mode === false
  return `${baseUrl}/upload/c_fill,g_face,ar_1:2,w_600,f_webp,q_90/${imageId}`;
}
