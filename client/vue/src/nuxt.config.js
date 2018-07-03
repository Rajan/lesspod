module.exports = {
  mode: 'spa',
  modules: [
    'cookie-universal-nuxt',
    '@nuxtjs/pwa'
    // '@nuxtjs/moment'
    // '@nuxtjs/bulma'
  ],
  router: {
    // middleware: 'router-auth'
  },
  plugins: [{src: '~/plugins/vue-quill-ssr-plugin', ssr: false},
    {src: '~/plugins/vue-ssr-true-plugins', ssr: true},
    {src: '~/plugins/fireauth.js', ssr: true}],
  vendor: ['firebase'],
  /*
   ** Headers of the page
   */
  // head: {
  //   title: 'Nuxtjs SSR Firebase Functions',
  //   meta: [{
  //       charset: 'utf-8'
  //     },
  //     {
  //       name: 'viewport',
  //       content: 'width=device-width, initial-scale=1'
  //     },
  //     {
  //       hid: 'description',
  //       name: 'description',
  //       content: 'Nuxt.js project'
  //     }
  //   ],
  // },

  // <script src="https://cdn.muicss.com/mui-0.9.35/js/mui.min.js"></script>
  /*
   ** Customize the progress bar color
   */
  loading: {
    color: '#3B8070'
  },
  css: [
    // '@/assets/styles/main.css',
    'static/minireset.css',
    'static/main.css',
    'vue-github-buttons/dist/vue-github-buttons.css'
    // 'vue-github-buttons/dist/vue-github-buttons.css.map'
  ],
  /*
   ** Build configuration
   */
  buildDir: '../prod/server/nuxt',
  build: {
    cssSourceMap: false,
    postcss: {
      plugins: {
        'postcss-custom-properties': false
      }
    },
    publicPath: '/assets/',
    extractCSS: true,
    babel: {
      presets: [
        'es2015',
        'stage-0'
      ],
      plugins: [

        ['transform-runtime', {
          'polyfill': true,
          'regenerator': true
        }]
      ]
    },
    /*
     ** Run ESLint on save
     */
    extend (config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        // config.module.rules.push({
        //   enforce: 'pre',
        //   test: /\.(js|vue)$/,
        //   loader: 'eslint-loader',
        //   exclude: /(node_modules)/
        // })
      }
    }
  }
}
