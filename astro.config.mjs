// astro.config.mjs
import { defineConfig } from "astro/config";
import icon from "astro-icon";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: 'https://monicamariage.com', // Ajouter cette ligne pour cohérence
  integrations: [tailwind(), icon({})],
});