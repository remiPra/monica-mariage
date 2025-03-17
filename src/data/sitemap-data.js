// src/data/sitemap-data.js
export const siteStructure = {
  // Pages statiques principales
  staticPages: [
    { url: "/", changefreq: "weekly", priority: 1.0 },
    { url: "/prendre-rendez-vous", changefreq: "monthly", priority: 0.8 },
    { url: "/success", changefreq: "monthly", priority: 0.5 },
    { url: "/mentions-legales-robes", changefreq: "yearly", priority: 0.3 },
    { url: "/toutes-nos-robes", changefreq: "weekly", priority: 0.9 },
    { url: "/trouver-le-showroom", changefreq: "monthly", priority: 0.8 },
  ],

  // Structure hiérarchique des catégories
  categories: [
    {
      name: "Promotions",
      slug: "promo",
      changefreq: "weekly",
      priority: 0.9,
      subcategories: [
        {
          name: "Promo Sirène",
          slug: "promo-sirene",
          changefreq: "weekly",
          priority: 0.8,
        },
        {
          name: "Robes de Mariée Bohème Chic",
          slug: "robes-de-mariee-boheme-chic",
          changefreq: "weekly",
          priority: 0.8,
        },
        {
          name: "Robes de Mariée Promotion",
          slug: "robes-de-mariee-promotion",
          changefreq: "weekly",
          priority: 0.8,
        },
        {
          name: "Robes de Mariées Destockage",
          slug: "robes-de-mariees-destockage",
          changefreq: "weekly",
          priority: 0.8,
        },
      ],
    },
    {
      name: "Robes de Mariée",
      slug: "robes-de-mariee",
      changefreq: "weekly",
      priority: 0.9,
      subcategories: [
        {
          name: "Forme Princesse",
          slug: "forme-princesse",
          changefreq: "weekly",
          priority: 0.8,
        },
        {
          name: "Forme Sirène",
          slug: "forme-sirene",
          changefreq: "weekly",
          priority: 0.8,
        },
        {
          name: "Forme Sirène A-line",
          slug: "forme-siren",
          changefreq: "weekly",
          priority: 0.8,
        },
        {
          name: "Style Bohème Chic",
          slug: "style-boheme-chic",
          changefreq: "weekly",
          priority: 0.8,
        },
        {
          name: "Minimaliste",
          slug: "minimaliste",
          changefreq: "weekly",
          priority: 0.8,
        },
      ],
    },
  ],

  // Liste des robes individuelles
  robes: [
    {
      id: "1",
      name: "Tina",
      category: "style-boheme-chic",
      slug: "tina",
      changefreq: "monthly",
      priority: 0.7,
    },
    {
      id: "5",
      name: "Emil",
      category: "forme-princesse",
      slug: "emil",
      changefreq: "monthly",
      priority: 0.7,
    },
    {
      id: "9",
      name: "Kapella",
      category: "forme-princesse",
      slug: "kapella",
      changefreq: "monthly",
      priority: 0.7,
    },
    {
      id: "9",
      name: "Vegas",
      category: "forme-sirene",
      slug: "vegas",
      changefreq: "monthly",
      priority: 0.7,
    },
    // Ajoute toutes tes autres robes ici
  ],
};
