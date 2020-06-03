<template>
  <div class="article">
    <nuxt-content :document="article" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  async asyncData({ app, route }) {
    const articles = await app
      .$content('articles')
      .where({ slug: route.params.slug })
      .fetch()
    return { article: articles.length ? articles[0] : {} }
  },
  data() {
    return {
      article: {}
    }
  }
})
</script>

<style scoped>
.article {
  padding: 4rem 2rem;
}
</style>
