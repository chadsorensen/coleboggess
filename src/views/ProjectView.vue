<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import MediaCarousel from '@/components/MediaCarousel.vue'
import ProjectGrid from '@/components/ProjectGrid.vue'
import { useProjects } from '@/composables/useContent'
import { renderMarkdown } from '@/lib/markdown'
import { setPageTitle } from '@/router'

const props = defineProps<{ slug: string }>()

const { bySlug, work, status } = useProjects()
const project = computed(() => bySlug(props.slug))
const others = computed(() => work.value.filter((p) => p.slug !== props.slug))
const videos = computed(() =>
  [project.value?.videoEmbed, project.value?.videoEmbedTwo].filter((v): v is string => !!v),
)

watchEffect(() => setPageTitle(project.value?.title))
</script>

<template>
  <main>
    <article v-if="project" class="project">
      <h1 class="title">{{ project.title }}</h1>

      <div
        v-if="project.projectDescription"
        class="description prose"
        v-html="renderMarkdown(project.projectDescription)"
      />

      <div class="media">
        <div v-for="(video, index) in videos" :key="index" class="video" v-html="renderMarkdown(video)" />
        <MediaCarousel v-if="project.media.length" :items="project.media" :label="`${project.title} gallery`" />
      </div>
    </article>

    <p v-else-if="status === 'ready'" class="status">
      That project couldn't be found. <RouterLink to="/projects">See all work</RouterLink>.
    </p>
    <p v-else-if="status === 'error'" class="status">Sorry, this project couldn't be loaded. Please try again later.</p>

    <ProjectGrid :projects="others" />
  </main>
</template>

<style scoped>
/* Desktop: text column on the left, media on the right.
   Mobile: title, then media, then description. */
.project {
  display: grid;
  grid-template-columns: minmax(0, 400px) minmax(500px, 1fr);
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'title media'
    'description media';
  column-gap: 40px;
  padding-bottom: 30px;
}

.title {
  grid-area: title;
  margin: 33px 0 40px;
  font-size: 28px;
  font-weight: 300;
}

.description {
  grid-area: description;
}

.media {
  grid-area: media;
  min-width: 0;
}

.video {
  margin-top: 30px;
}

.video :deep(iframe),
.video :deep(object),
.video :deep(embed),
.video :deep(video) {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  border: 0;
}

@media (max-width: 800px) {
  .project {
    grid-template-columns: minmax(0, 1fr);
    grid-template-rows: auto;
    grid-template-areas:
      'title'
      'media'
      'description';
  }

  .title {
    margin: 30px 0 0;
  }
}
</style>
