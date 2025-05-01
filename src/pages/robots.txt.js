export function get() {
  const baseUrl =
    import.meta.env.SITE || "https://www.monica-mariage.vercel.app";

  return {
    body: `User-agent: *
  Allow: /
  
  Sitemap: ${baseUrl}/sitemap.xml`,
    headers: {
      "Content-Type": "text/plain",
    },
  };
}
