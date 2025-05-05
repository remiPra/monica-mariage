export function get() {
  const baseUrl = import.meta.env.SITE || "https://www.monicamariage.com";

  return {
    body: `User-agent: *
  Allow: /
  
  Sitemap: ${baseUrl}/sitemap.xml`,
    headers: {
      "Content-Type": "text/plain",
    },
  };
}
