import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  ssr: true,
  devtools: { enabled: false },
  modules: ["@pinia/nuxt", "shadcn-nuxt", "dayjs-nuxt"],
  runtimeConfig: {
    public: {
      apiBase: "http://localhost:8000/api",
    },
  },
  css: ["~/assets/css/tailwind.css", "~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
});
