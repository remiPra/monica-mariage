import { sanityClient } from "../sanityClient";

export async function get() {
  const baseUrl = "https://www.monicamariage.com/";

  // 1. Pages statiques (en excluant test.astro)
  const staticUrls = [
    "",
    "/success",
    "/prendre-rendez-vous", 
    "/robe-mariee-sur-mesure-toulouse",
    "/trouver-boutique-robe-mariee-toulouse",
    "/a-propos",
    "/politique-de-confidentialite",
    "/mentions-legales",
    "/conditions-generales-de-vente",
    "/pourquoi-nous-choisir",
    "/temoignages",
  
  "/boutique-robe-mariee-toulouse",
  "/robe-de-mariee-toulouse-budget",
  "/404",
    "/blog"
  ].map(path => generateUrlEntry(`${baseUrl}${path}`, new Date().toISOString()));

  // 2. Pages principales de catégories
  const categoryUrls = [
    "/robes-de-mariee",
    "/promo"
  ].map(path => generateUrlEntry(`${baseUrl}${path}`, new Date().toISOString()));

  // 3. Pages de sous-catégories robes-de-mariee
  const robesSubCategoryUrls = [
    "/robes-de-mariee/forme-princesse",
    "/robes-de-mariee/forme-sirene", 
    "/robes-de-mariee/style-boheme-chic",
    "/robes-de-mariee/minimaliste"
  ].map(path => generateUrlEntry(`${baseUrl}${path}`, new Date().toISOString()));

  // 4. Pages de sous-catégories promo
  const promoSubCategoryUrls = [
    "/promo/robes-de-mariee-promotion",
    "/promo/promo-sirene",
    "/promo/robes-de-mariee-boheme-chic", 
    "/promo/robes-de-mariee-destockage"
  ].map(path => generateUrlEntry(`${baseUrl}${path}`, new Date().toISOString()));

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
      article._updatedAt ? new Date(article._updatedAt).toISOString() : new Date().toISOString()
    )
  );

  // 6. Robes forme-princesse
  const robesPrincesse = await sanityClient.fetch(`
    *[_type == "robe" && category == "robes-de-mariee" && sousCategorie == "forme-princesse"]{
      "slug": slug.current,
      _updatedAt
    }
  `);
  
  const robesPrincesseUrls = robesPrincesse.map(robe => 
    generateUrlEntry(
      `${baseUrl}/robes-de-mariee/forme-princesse/${robe.slug}`,
      robe._updatedAt ? new Date(robe._updatedAt).toISOString() : new Date().toISOString()
    )
  );

  // 7. Robes forme-sirene
  const robesSirene = await sanityClient.fetch(`
    *[_type == "robe" && category == "robes-de-mariee" && sousCategorie == "forme-sirene"]{
      "slug": slug.current,
      _updatedAt
    }
  `);
  
  const robesSireneUrls = robesSirene.map(robe => 
    generateUrlEntry(
      `${baseUrl}/robes-de-mariee/forme-sirene/${robe.slug}`,
      robe._updatedAt ? new Date(robe._updatedAt).toISOString() : new Date().toISOString()
    )
  );

  // 8. Robes style-boheme-chic
  const robesBoheme = await sanityClient.fetch(`
    *[_type == "robe" && category == "robes-de-mariee" && sousCategorie == "style-boheme-chic"]{
      "slug": slug.current,
      _updatedAt
    }
  `);
  
  const robesBohemeUrls = robesBoheme.map(robe => 
    generateUrlEntry(
      `${baseUrl}/robes-de-mariee/style-boheme-chic/${robe.slug}`,
      robe._updatedAt ? new Date(robe._updatedAt).toISOString() : new Date().toISOString()
    )
  );

  // 9. Robes minimaliste
  const robesMinimaliste = await sanityClient.fetch(`
    *[_type == "robe" && category == "robes-de-mariee" && sousCategorie == "minimaliste"]{
      "slug": slug.current,
      _updatedAt
    }
  `);
  
  const robesMinimalisteUrls = robesMinimaliste.map(robe => 
    generateUrlEntry(
      `${baseUrl}/robes-de-mariee/minimaliste/${robe.slug}`,
      robe._updatedAt ? new Date(robe._updatedAt).toISOString() : new Date().toISOString()
    )
  );

  // 10. Promo robes-de-mariee-promotion
  const promosGeneral = await sanityClient.fetch(`
    *[_type == "robe" && category == "promo" && sousCategorie == "robes-de-mariee-promotion"]{
      "slug": slug.current,
      _updatedAt
    }
  `);
  
  const promosGeneralUrls = promosGeneral.map(robe => 
    generateUrlEntry(
      `${baseUrl}/promo/robes-de-mariee-promotion/${robe.slug}`,
      robe._updatedAt ? new Date(robe._updatedAt).toISOString() : new Date().toISOString()
    )
  );

  // 11. Promo promo-sirene
  const promosSirene = await sanityClient.fetch(`
    *[_type == "robe" && category == "promo" && sousCategorie == "promo-sirene"]{
      "slug": slug.current,
      _updatedAt
    }
  `);
  
  const promosSireneUrls = promosSirene.map(robe => 
    generateUrlEntry(
      `${baseUrl}/promo/promo-sirene/${robe.slug}`,
      robe._updatedAt ? new Date(robe._updatedAt).toISOString() : new Date().toISOString()
    )
  );

  // 12. Promo robes-de-mariee-boheme-chic
  const promosBoheme = await sanityClient.fetch(`
    *[_type == "robe" && category == "promo" && sousCategorie == "robes-de-mariee-boheme-chic"]{
      "slug": slug.current,
      _updatedAt
    }
  `);
  
  const promosBohemeUrls = promosBoheme.map(robe => 
    generateUrlEntry(
      `${baseUrl}/promo/robes-de-mariee-boheme-chic/${robe.slug}`,
      robe._updatedAt ? new Date(robe._updatedAt).toISOString() : new Date().toISOString()
    )
  );

  // 13. Promo robes-de-mariee-destockage
  const promosDestockage = await sanityClient.fetch(`
    *[_type == "robe" && category == "promo" && sousCategorie == "robes-de-mariee-destockage"]{
      "slug": slug.current,
      _updatedAt
    }
  `);
  
  const promosDestockageUrls = promosDestockage.map(robe => 
    generateUrlEntry(
      `${baseUrl}/promo/robes-de-mariee-destockage/${robe.slug}`,
      robe._updatedAt ? new Date(robe._updatedAt).toISOString() : new Date().toISOString()
    )
  );

  // 14. Combiner toutes les URLs (test.astro exclu)
  const allUrls = [
    ...staticUrls,
    ...categoryUrls,
    ...robesSubCategoryUrls,
    ...promoSubCategoryUrls,
    ...blogUrls,
    ...robesPrincesseUrls,
    ...robesSireneUrls,
    ...robesBohemeUrls,
    ...robesMinimalisteUrls,
    ...promosGeneralUrls,
    ...promosSireneUrls,
    ...promosBohemeUrls,
    ...promosDestockageUrls
  ].join("");

  // 15. Générer le XML final
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls}
</urlset>`;

  return {
    body: sitemap,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "max-age=3600",
    },
  };
}

function generateUrlEntry(url, lastmod) {
  return `
  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
  </url>`;
}