// src/lib/optimizeCloudinaryUrl.js
export function optimizeCloudinaryUrl(url, mode) {
  // mode: "mobile" → mobile, "desktop" → desktop, "full" → full‑res auto
  if (!url || !url.includes("cloudinary.com")) return url;

  // Séparer la partie avant et après '/upload/'
  const [baseUrl, rawImageId] = url.split("/upload/");

  // Retirer l'extension (.jpg, .png, .gif, .webp) du public_id
  const imageIdWithoutExt = rawImageId.replace(/\.(jpe?g|png|gif|webp)$/i, "");

  // Construire la transformation en fonction du mode
  let transformation = "c_fill,g_face";
  switch (mode) {
    case "full":
      transformation += ",ar_2:5,w_400,f_webp,q_100";
      break;
    case "imageMobileGallery":
      transformation += ",ar_2:3,w_350,f_webp,q_95";
      break;
    case "mobile":
      transformation += ",ar_2:5,w_400,f_webp,q_95";
      break;
    case "desktop":
    default:
      transformation += ",ar_1:2,w_600,f_webp,q_90";
      break;
  }

  // Ajouter l'extension .webp après le public_id
  const finalPublicId = `${imageIdWithoutExt}.webp`;

  // Retourner l'URL optimisée avec extension .webp
  return `${baseUrl}/upload/${transformation}/${finalPublicId}`;
}
