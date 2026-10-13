import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// Si el repo NO se llama "ivan-0612.github.io", añade base: '/nombre-del-repo'
export default defineConfig({
  site: 'https://ivan-0612.github.io',
  integrations: [
    sitemap({ i18n: { defaultLocale: 'es', locales: { es: 'es-ES', en: 'en-GB' } } }),
    icon(),
  ],
  vite: { plugins: [tailwindcss()] },
});
