// src/pages/robots.txt.js
export function get() {
  const baseUrl = "https://www.monicamariage.com/"; // cohérent avec ton sitemap

  return {
    body: `# ================================
# robots.txt — Monica Mariage (AEO optimisé)
# ================================

# Autoriser tous les crawlers classiques
User-agent: *
Allow: /

# Autoriser explicitement les crawlers IA
User-agent: GPTBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: CCBot
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml
`,
    headers: { "Content-Type": "text/plain" },
  };
}
