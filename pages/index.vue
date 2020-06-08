<template>
  <div class="container">
    <h1 class="title">
      nuxt-content-excerpt
    </h1>
    <div class="articles">
      <div v-for="article in articles" :key="article.slug" class="article">
        <nuxt-link
          :to="{ name: 'articles-slug', params: { slug: article.slug } }"
          class="article__card"
        >
          <div class="article__header"></div>
          <div class="article__content">
            <div class="article__title">{{ article.title }}</div>
            <div class="article__excerpt">{{ article.excerpt }}</div>
            <div class="article__footer">
              <div class="article__avatar"></div>
              <div class="article__footer__content">
                <div class="article__author">{{ article.author }}</div>
                <div class="article__date">
                  {{ formatDate(article.createdAt) }}
                </div>
              </div>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'
import { Article } from '@/types/Article'

export default Vue.extend({
  async asyncData({ $content }) {
    const articles = await $content('articles').fetch<Article[]>()
    return { articles }
  },
  data() {
    return {
      articles: [] as Article[]
    }
  },
  methods: {
    formatDate(date: Date): string {
      return dayjs(date).format('YYYY/MM/DD hh:mm')
    }
  }
})
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #f5f5f5;
  padding: 4rem 1rem;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 60px;
  color: #35495e;
  letter-spacing: 1px;
}

.articles {
  display: flex;
  flex-wrap: wrap;
  margin-top: 3rem;
  max-width: 720px;
}

.article {
  width: 100%;
  padding: 1rem;
}

@media (min-width: 480px) {
  .article {
    width: 50%;
  }
}

.article__card {
  background-color: #fff;
  border-radius: 0.2rem;
  overflow: hidden;
  display: block;
}

.article__header {
  height: 10rem;
  background-color: #dcdcdc;
}

.article__content {
  text-align: left;
  padding: 1rem 1.25rem;
  color: #35495e;
}

.article__title {
  font-weight: bold;
  font-size: 1.25rem;
}

.article__excerpt {
  margin-top: 0.5rem;
}

.article__footer {
  margin-top: 1rem;
  display: flex;
}

.article__avatar {
  border-radius: 100%;
  width: 3rem;
  height: 3rem;
  background-color: #dcdcdc;
}

.article__footer__content {
  margin-left: 0.75rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.article__author {
  font-weight: bold;
}

.article__date {
  font-size: 0.75rem;
  margin-top: 0.25rem;
}
</style>
