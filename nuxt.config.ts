// https://v3.nuxtjs.org/api/configuration/nuxt.config
const lifecycle = process.env.npm_lifecycle_event;

export default defineNuxtConfig({
  devServer: {
    port: 5001
  },
  css: ["~/assets/scss/index.scss"],
  build: {
    transpile: lifecycle === "build" ? ["element-plus"] : [],
  },
})