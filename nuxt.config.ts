export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "@nuxtjs/i18n"],

  app: {
    pageTransition: {
      name: "fade",
      mode: "out-in",
    },
    head: {
      title: "Elmatger",
      htmlAttrs: { lang: "en" },
      meta: [
        { name: "description", content: "Nuxt 3 Ecommerce" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    },
  },
  vite: {
    server: {
      proxy: {
        "/api": {
          target: "http://freestore.isiserp.com/api/",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/variables.scss" as *;',
        },
      },
    },
  },
  css: ["@/assets/scss/main.scss"],
  ssr: false,
  i18n: {
    strategy: "prefix",
    locales: [
      {
        code: "en",
        file: "./locales/en.json",
      },
      {
        code: "ar",
        file: "./locales/ar.json",
      },
    ],
    defaultLocale: "en",
    detectBrowserLanguage: false,
  },
});
