import colors from "vuetify/es5/util/colors";

export default {
  ssr: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - myApp",
    title: "myApp",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/firebase.js", ssr: false },
    { src: "~plugins/lodash.js" },
    { src: "~/plugins/persistedstate.js", ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/dotenv", "vue-sweetalert2/nuxt"],

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    treeShake: true,
    theme: {
      dark: false,
      light: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          primary: colors.blue.darken2,
          accent: colors.orange.accent2,
          secondary: colors.amber.darken3,
          info: colors.orange.lighten4,
          warning: colors.amber.base,
          error: colors.deepOrange.accent5,
          success: colors.green.accent3,
          background: colors.orange.lighten5
        }
      }
    }
  },
  router: {
    middleware: "auth",
    trailingSlash: false
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  generate: {
    dir: "dist"
  },

  publicRuntimeConfig: {
    email: process.env.DEMO_EMAIL,
    pass: process.env.DEMO_PASS
  }
};
