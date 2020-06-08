import { Configuration } from '@nuxt/types'
import remark from 'remark'
// @ts-ignore
import remarkExcerpt from 'remark-excerpt'
// @ts-ignore
import retextStringify from 'retext-stringify'

const config: Configuration = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxt/typescript-build'],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxt/content'],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(_config, _ctx) {}
  },
  hooks: {
    // @ts-ignore
    'content:file:beforeInsert': async (document) => {
      if (document.extension === '.md') {
        const processed = await remark()
          .use(remarkExcerpt)
          .use(retextStringify)
          .process(document.text)
        document.excerpt = processed.contents
      }
    }
  }
}

export default config
