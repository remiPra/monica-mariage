import { sanityClient } from "../sanityClient";

export async function get() {
  // Définir la base URL de votre site
  const baseUrl =
    import.meta.env.SITE || "https://www.monica-mariage.vercel.app";

  // 1. Récupérer toutes les robes avec leurs catégories et sous-catégories
  const allRobes = await sanityClient.fetch(`
    *[_type == "robe"]{
      _id,
      dressName,
      category,
      sousCategorie,
      "slug": slug.current,
      _updatedAt
    }
  `);

  // 2. Extraire toutes les catégories et sous-catégories uniques
  const categories = [...new Set(allRobes.map((robe) => robe.category))];

  // Structure pour stocker les sous-catégories par catégorie
  const sousCategories = {};
  categories.forEach((cat) => {
    sousCategories[cat] = [
      ...new Set(
        allRobes
          .filter((robe) => robe.category === cat)
          .map((robe) => robe.sousCategorie)
      ),
    ].filter(Boolean); // Filtrer les valeurs null ou undefined
  });

  // 3. Générer les URLs pour le sitemap

  // URLs pour les pages statiques
  const staticUrls = [
    "",
    "/success",
    "/prendre-rendez-vous",
    "/toutes-nos-robes",
    "/trouver-le-showroom",
  ].map((path) =>
    generateUrlEntry(`${baseUrl}${path}`, new Date().toISOString())
  );

  // URLs pour les pages de catégories
  const categoryUrls = categories.map((category) =>
    generateUrlEntry(`${baseUrl}/${category}`, new Date().toISOString())
  );

  // URLs pour les pages de sous-catégories
  const sousCategoryUrls = categories.flatMap((category) =>
    sousCategories[category].map((sousCategorie) =>
      generateUrlEntry(
        `${baseUrl}/${category}/${sousCategorie}`,
        new Date().toISOString()
      )
    )
  );

  // URLs pour chaque robe individuelle
  const robeUrls = allRobes.map((robe) => {
    // Utiliser la date de mise à jour de Sanity ou la date actuelle
    const lastMod = robe._updatedAt
      ? new Date(robe._updatedAt).toISOString()
      : new Date().toISOString();

    return generateUrlEntry(
      `${baseUrl}/${robe.category}/${robe.sousCategorie}/${robe.slug}`,
      lastMod
    );
  });

  // 4. Combiner toutes les URLs
  const allUrls = [
    ...staticUrls,
    ...categoryUrls,
    ...sousCategoryUrls,
    ...robeUrls,
  ].join("");

  // 5. Générer le XML final
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls}
</urlset>`;

  // 6. Retourner la réponse avec les en-têtes appropriés
  return {
    body: sitemap,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "max-age=3600",
    },
  };
}

// Fonction utilitaire pour générer une entrée URL
function generateUrlEntry(url, lastmod) {
  return `
  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
  </url>`;
}
