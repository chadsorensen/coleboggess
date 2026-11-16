<script setup lang="ts">
import { imageSrcset, imageUrl, type Project } from '@/lib/contentful'

defineProps<{ projects: Project[] }>()
</script>

<template>
  <section class="project-grid" aria-label="Work">
    <RouterLink
      v-for="project in projects"
      :key="project.id"
      :to="{ name: 'project', params: { slug: project.slug } }"
      class="item"
    >
      <img
        v-if="project.coverImage"
        :src="imageUrl(project.coverImage, 800)"
        :srcset="imageSrcset(project.coverImage)"
        sizes="(max-width: 600px) 100vw, (max-width: 1280px) 50vw, 33vw"
        :width="project.coverImage.width"
        :height="project.coverImage.height"
        alt=""
        loading="lazy"
        decoding="async"
      />
      <span class="title">{{ project.title }}</span>
    </RouterLink>
  </section>
</template>

<style scoped>
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(420px, 100%), 1fr));
  margin-inline: calc(var(--offset) * -1);
}

.item {
  position: relative;
  display: block;
  overflow: hidden;
  background: var(--color-black);
}

.item img {
  width: 100%;
  height: auto;
}

/* Dark overlay + title on hover/focus */
.title {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgb(0 0 0 / 0);
  color: var(--color-white);
  font-size: 20px;
  font-weight: 300;
  text-align: center;
  opacity: 0;
  transition:
    opacity 0.25s ease-out,
    background-color 0.25s ease-out;
}

.item:is(:hover, :focus-visible) .title {
  background: rgb(0 0 0 / 0.75);
  opacity: 1;
}

.item:focus-visible {
  outline: 2px solid var(--color-gray-dark);
  outline-offset: -2px;
}

/* Touch screens can't hover, so always show a light caption */
@media (hover: none) {
  .title {
    inset: auto 0 0;
    justify-content: flex-start;
    padding: 12px 16px;
    background: linear-gradient(transparent, rgb(0 0 0 / 0.6));
    font-size: 16px;
    opacity: 1;
  }
}
</style>
