// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Collect&verything - Admin',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
  },

  css: [
    '@/assets/css/main.css',
    '@fortawesome/fontawesome-svg-core/styles.css',
  ],

  modules: [
    [
      '@nuxtjs/i18n',
      {
        locales: [
          {
            code: 'en',
            name: 'English',
            file: 'en.json',
          },
          {
            code: 'fr',
            name: 'Français',
            file: 'fr.json',
          },
        ],
        defaultLocale: 'fr',
        lazy: true,
        langDir: 'locales',
        strategy: 'no_prefix',
        detectBrowserLanguage: {
          useCookie: true,
          cookieKey: 'i18n_redirected',
        },
        vueI18n: './showcase-front/i18n.config.ts',
      },
    ],
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  build: {
    transpile: [
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-solid-svg-icons',
      '@fortawesome/free-brands-svg-icons',
      '@fortawesome/vue-fontawesome'
    ]
  }
})
