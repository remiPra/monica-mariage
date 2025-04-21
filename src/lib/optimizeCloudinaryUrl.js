// src/lib/optimizeCloudinaryUrl.js
export function optimizeCloudinaryUrl(url, isMobile = false) {
  if (!url || !url.includes("cloudinary.com")) return url;

  const [baseUrl, imageId] = url.split("/upload/");

  if (isMobile) {
    // ratio 3:4 pour mobile
    return `${baseUrl}/upload/c_fill,g_face,ar_3:4,w_400,f_webp,q_100/${imageId}`;
  } else {
    // ratio 1:2 pour desktop
    return `${baseUrl}/upload/c_fill,g_face,ar_1:2,w_400,f_webp,q_85/${imageId}`;
  }
}
