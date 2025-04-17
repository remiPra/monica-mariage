import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: "epmbppve",
  dataset: "production",
  apiVersion: "2024-04-01",
  useCdn: true, // true pour une récupération plus rapide, false pour un contenu plus frais
});
