// src/utils/urls.js
export const SITE_URL = 'https://monicamariage.com';

export function buildCanonicalUrl(path) {
  // Nettoyer le path
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
}

export function buildProductUrl(category, sousCategorie, slug) {
  return `${SITE_URL}/${category}/${sousCategorie}/${slug}`;
}