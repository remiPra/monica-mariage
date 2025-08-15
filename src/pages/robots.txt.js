// src/pages/robots.txt.js
export function get() {
  const baseUrl = "https://monicamariage.com"; // Sans www, cohérent avec le sitemap

  return {
    body: `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml`,
    headers: {
      "Content-Type": "text/plain",
    },
  };
}