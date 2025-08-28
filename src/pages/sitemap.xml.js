import { sanityClient } from "../sanityClient";

export async function get() {
  const baseUrl = "https://www.monicamariage.com";

  // 1. Pages statiques avec priorités différenciées
  const staticUrls = [
    { path: "", priority: 1.0, changefreq: "daily" }, // Page d'accueil
    { path: "/success", priority: 0.3, changefreq: "yearly" },
    { path: "/prendre-rendez-vous", priority: 0.8, changefreq: "monthly" },
    { path: "/robe-mariee-sur-mesure-toulouse", priority: 0.7, changefreq: "monthly" },
    { path: "/trouver-boutique-robe-mariee-toulouse", priority: 0.7, changefreq: "monthly" },
    { path: "/a-propos", priority: 0.5, changefreq: "yearly" },
    { path: "/politique-de-confidentialite", priority: 0.2, changefreq: "yearly" },
    { path: "/mentions-legales", priority: 0.2, changefreq: "yearly" },
    { path: "/conditions-generales-de-vente", priority: 0.2, changefreq: "yearly" },
    { path: "/pourquoi-nous-choisir", priority: 0.6, changefreq: "monthly" },
    { path: "/temoignages", priority: 0.6, changefreq: "weekly" },
    { path: "/boutique-robe-mariee-toulouse", priority: 0.8, changefreq: "monthly" },
    { path: "/robe-de-mariee-toulouse-budget", priority: 0.7, changefreq: "monthly" },
    { path: "/blog", priority: 0.8, changefreq: "weekly" }
    // Suppression de la page 404
  ].map(item => generateUrlEntry(`${baseUrl}${item.path}`, new Date().toISOString(), item.changefreq, item.priority));

  // 2. Pages principales de catégories
  const categoryUrls = [
    { path: "/robes-de-mariee", priority: 0.9, changefreq: "weekly" },
    { path: "/promo", priority: 0.8, changefreq: "daily" }
  ].map(item => generateUrlEntry(`${baseUrl}${item.path}`, new Date().toISOString(), item.changefreq, item.priority));

  // 3. Pages de sous-catégories robes-de-mariee
  const robesSubCategoryUrls = [
    "/robes-de-mariee/forme-princesse",
    "/robes-de-mariee/forme-sirene", 
    "/robes-de-mariee/style-boheme-chic",
    "/robes-de-mariee/minimaliste"
  ].map(path => generateUrlEntry(`${baseUrl}${path}`, new Date().toISOString(), "weekly", 0.8));

  // 4. Pages de sous-catégories promo
  const promoSubCategoryUrls = [
    "/promo/robes-de-mariee-promotion",
    "/promo/promo-sirene",
    "/promo/robes-de-mariee-boheme-chic", 
    "/promo/robes-de-mariee-destockage"
  ].map(path => generateUrlEntry(`${baseUrl}${path}`, new Date().toISOString(), "daily", 0.7));

  // 5. Articles de blog individuels
  const blogArticles = await sanityClient.fetch(`
    *[_type == "blogPost" && defined(slug.current)]{
      "slug": slug.current,
      _updatedAt
    }
  `);
  
  const blogUrls = blogArticles.map(article => 
    generateUrlEntry(
      `${baseUrl}/blog/${article.slug}`,
      article._updatedAt ? new Date(article._updatedAt).toISOString() : new Date().toISOString(),
      "monthly",
      0.6
    )
  );

  // Fonction helper pour récupérer les robes
  const fetchRobes = async (category, sousCategorie) => {
    return await sanityClient.fetch(`
      *[_type == "robe" && category == "${category}" && sousCategorie == "${sousCategorie}" && defined(slug.current)]{
        "slug": slug.current,
        _updatedAt
      }
    `);
  };

  // 6-9. Robes par catégorie
  const categoriesRobes = [
    { cat: "robes-de-mariee", sousCat: "forme-princesse", priority: 0.6 },
    { cat: "robes-de-mariee", sousCat: "forme-sirene", priority: 0.6 },
    { cat: "robes-de-mariee", sousCat: "style-boheme-chic", priority: 0.6 },
    { cat: "robes-de-mariee", sousCat: "minimaliste", priority: 0.6 }
  ];

  const robesUrls = [];
  for (const { cat, sousCat, priority } of categoriesRobes) {
    const robes = await fetchRobes(cat, sousCat);
    const urls = robes.map(robe => 
      generateUrlEntry(
        `${baseUrl}/${cat}/${sousCat}/${robe.slug}`,
        robe._updatedAt ? new Date(robe._updatedAt).toISOString() : new Date().toISOString(),
        "weekly",
        priority
      )
    );
    robesUrls.push(...urls);
  }

  // 10-13. Promos par catégorie
  const categoriesPromos = [
    { cat: "promo", sousCat: "robes-de-mariee-promotion", priority: 0.7 },
    { cat: "promo", sousCat: "promo-sirene", priority: 0.7 },
    { cat: "promo", sousCat: "robes-de-mariee-boheme-chic", priority: 0.7 },
    { cat: "promo", sousCat: "robes-de-mariee-destockage", priority: 0.8 } // Plus importante car destockage
  ];

  const promosUrls = [];
  for (const { cat, sousCat, priority } of categoriesPromos) {
    const promos = await fetchRobes(cat, sousCat);
    const urls = promos.map(promo => 
      generateUrlEntry(
        `${baseUrl}/${cat}/${sousCat}/${promo.slug}`,
        promo._updatedAt ? new Date(promo._updatedAt).toISOString() : new Date().toISOString(),
        "daily", // Promos changent plus souvent
        priority
      )
    );
    promosUrls.push(...urls);
  }

  // 14. Combiner toutes les URLs
  const allUrls = [
    ...staticUrls,
    ...categoryUrls,
    ...robesSubCategoryUrls,
    ...promoSubCategoryUrls,
    ...blogUrls,
    ...robesUrls,
    ...promosUrls
  ].join("");

  // 15. Générer le XML final
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${allUrls}
</urlset>`;

  return {
    body: sitemap,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "max-age=3600",
    },
  };
}

function generateUrlEntry(url, lastmod, changefreq = "weekly", priority = 0.5) {
  return `
  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}