<script setup lang="ts">
import ProjectGrid from '@/components/ProjectGrid.vue'
import { useProjects } from '@/composables/useContent'
import { imageUrl } from '@/lib/contentful'

const { reel, work, status } = useProjects()
</script>

<template>
  <main>
    <RouterLink
      v-if="reel"
      :to="{ name: 'project', params: { slug: reel.slug } }"
      class="hero"
      :style="reel.coverImage ? { backgroundImage: `url(${imageUrl(reel.coverImage, 2400)})` } : undefined"
    >
      <span class="visually-hidden">Watch {{ reel.title }}</span>
    </RouterLink>

    <p v-if="status === 'error'" class="status">Sorry, the work couldn't be loaded. Please try again later.</p>
    <ProjectGrid :projects="work" />
  </main>
</template>

<style scoped>
.hero {
  display: block;
  height: calc(100svh - 88px);
  max-height: 500px;
  margin: 0 calc(var(--offset) * -1) 30px;
  background: var(--color-black) center / cover no-repeat;
}

.hero:focus-visible {
  outline: 2px solid var(--color-gray-dark);
  outline-offset: -4px;
}
</style>
