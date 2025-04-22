// Dans votre second document (liste des robes)
// Nous pouvons ajouter cette fonction directement dans le composant ou créer un fichier séparé

function optimizeGalleryImage(url, type = "desktop") {
  if (!url || !url.includes("cloudinary.com")) return url;

  const [baseUrl, imageId] = url.split("/upload/");

  switch (type) {
    case "mobile":
      // Ratio amélioré pour mobile - plus proche du carré
      return `${baseUrl}/upload/c_fill,g_face,ar_3:4,w_450,f_webp,q_90/${imageId}`;
    case "tablet":
      // Ratio intermédiaire pour tablette
      return `${baseUrl}/upload/c_fill,g_face,ar_2:3,w_800,f_webp,q_95/${imageId}`;
    case "desktop":
    default:
      // Ratio pour desktop
      return `${baseUrl}/upload/c_fill,g_face,ar_1:2,w_1200,f_webp,q_95/${imageId}`;
  }
}

// Puis utilisez cette fonction dans votre mapping des robes
const robes = (robesData || []).map((robe) => ({
  ...robe,
  images: (robe.imagesCloudinary || []).map((img) => ({
    alt: img.alt,
    optimizedImages: {
      gallery: {
        desktop: optimizeGalleryImage(img.url, "desktop"),
        tablet: optimizeGalleryImage(img.url, "tablet"),
        mobile: optimizeGalleryImage(img.url, "mobile"),
      },
    },
  })),
}));
