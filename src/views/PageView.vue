<script setup lang="ts">
import { usePage } from '@/composables/useContent'
import { imageSrcset, imageUrl } from '@/lib/contentful'
import { renderMarkdown } from '@/lib/markdown'

const props = defineProps<{ slug: string }>()
const { page, error } = usePage(() => props.slug)
</script>

<template>
  <main>
    <section v-if="page" class="page" :class="`page--${slug}`">
      <img
        v-if="slug === 'about' && page.image"
        class="portrait"
        :src="imageUrl(page.image, 1000)"
        :srcset="imageSrcset(page.image, [500, 1000])"
        sizes="(max-width: 800px) 100vw, 500px"
        :width="page.image.width"
        :height="page.image.height"
        :alt="page.image.title"
      />
      <div class="content prose" v-html="renderMarkdown(page.body)" />
    </section>
    <p v-else-if="error" class="status">Sorry, this page couldn't be loaded. Please try again later.</p>
  </main>
</template>

<style scoped>
.page--about {
  display: flex;
  justify-content: center;
}

.portrait {
  width: 500px;
  height: auto;
  align-self: flex-start;
}

.page--about .content {
  width: 100%;
  max-width: 500px;
  margin-left: 40px;
  padding: 0 20px;
}

.page--about .content :deep(h2) {
  padding-bottom: 10px;
  text-transform: uppercase;
}

.page--about .content :deep(p) {
  padding-bottom: 25px;
  color: var(--color-gray-dark);
}

.page--contact {
  margin-top: 40px;
  text-align: center;
}

@media (max-width: 800px) {
  .page--about {
    flex-direction: column;
  }

  .portrait {
    width: 100%;
  }

  .page--about .content {
    max-width: 100%;
    margin: 40px 0 0;
  }
}
</style>
