// src/lib/robeUtils.js
import { sanityClient } from "../sanityClient";
import { optimizeCloudinaryUrl } from "./optimizeCloudinaryUrl";

// Fonction pour récupérer toutes les robes d'une sous-catégorie
export async function getAllRobes(sousCategorie) {
  return await sanityClient.fetch(
    `*[_type == "robe" && category == "robes-de-mariee" && sousCategorie == $sousCategorie]{
       "slug": slug.current,
       dressName,
       category,
       sousCategorie
    }`,
    { sousCategorie }
  );
}

// Fonction pour récupérer une robe spécifique
export async function getRobeData(slug, sousCategorie) {
  return await sanityClient.fetch(
    `*[_type == "robe"
       && category == "robes-de-mariee"
       && sousCategorie == $sousCategorie
       && slug.current == $slug][0]{
         title,
         _id,
         metaDescription,
         dressName,
         descriptionCourte,
         category,
         sousCategorie,
         "imagesCloudinary": imagesCloudinary[]{ url, alt }
    }`,
    { slug, sousCategorie }
  );
}

// Fonction pour obtenir les suggestions aléatoires
export async function getRandomDresses(slug, sousCategorie) {
  const othersData = await sanityClient.fetch(
    `*[_type == "robe"
       && category == "robes-de-mariee"
       && sousCategorie == $sousCategorie
       && slug.current != $slug]{
         "slug": slug.current,
         _id,
         dressName,
         category,
         sousCategorie,
         "imagesCloudinary": imagesCloudinary[]{ url, alt }
    }`,
    { slug, sousCategorie }
  );

  return (othersData || [])
    .map((d) => ({
      ...d,
      images: (d.imagesCloudinary || []).map((img) => ({
        alt: img.alt,
        optimized: {
          tablet: optimizeCloudinaryUrl(img.url, {
            w: 400,
            h: 600,
            crop: "fill",
          }),
          mobile: optimizeCloudinaryUrl(img.url, {
            w: 200,
            h: 300,
            crop: "fill",
          }),
        },
      })),
    }))
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);
}

// Fonction pour préparer les images optimisées
export function prepareRobeImages(robeData) {
  return {
    ...robeData,
    images: (robeData.imagesCloudinary || []).map((img) => ({
      alt: img.alt,
      optimized: {
        tablet: optimizeCloudinaryUrl(img.url, "desktop"),
        mobile: optimizeCloudinaryUrl(img.url, "mobile"),
      },
      full: optimizeCloudinaryUrl(img.url, "full"),
    })),
  };
}
