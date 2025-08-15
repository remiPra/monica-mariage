// src/utils/urls.js
export const SITE_URL = 'https://monicamariage.com'; // Sans www

export function buildCanonicalUrl(path) {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
}

export function buildProductUrl(category, sousCategorie, slug) {
  if (category === "robes-de-mariee") {
    return `${SITE_URL}/robes-de-mariee/${sousCategorie}/${slug}`;
  } else if (category === "promo") {
    return `${SITE_URL}/promo/${sousCategorie}/${slug}`;
  }
  return `${SITE_URL}/${category}/${sousCategorie}/${slug}`;
}