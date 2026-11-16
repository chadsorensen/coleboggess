<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, useTemplateRef } from 'vue'
import { imageSrcset, imageUrl, type Asset } from '@/lib/contentful'

/**
 * Scroll-snap carousel (replaces vue-awesome-swiper). Native touch/trackpad
 * swiping comes from CSS; buttons and dots wrap around like the old loop mode.
 */
const props = defineProps<{ items: Asset[]; label?: string }>()

const track = useTemplateRef<HTMLElement>('track')
const current = ref(0)

const goTo = (index: number) => {
  const el = track.value
  if (!el) return
  const count = props.items.length
  const next = ((index % count) + count) % count
  el.scrollTo({ left: next * el.clientWidth })
}

const onScroll = () => {
  const el = track.value
  if (el) current.value = Math.round(el.scrollLeft / el.clientWidth)
}

let frame = 0
const onScrollThrottled = () => {
  cancelAnimationFrame(frame)
  frame = requestAnimationFrame(onScroll)
}

onMounted(() => track.value?.addEventListener('scroll', onScrollThrottled, { passive: true }))
onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
  track.value?.removeEventListener('scroll', onScrollThrottled)
})
</script>

<template>
  <div class="carousel" role="region" aria-roledescription="carousel" :aria-label="label ?? 'Gallery'">
    <div ref="track" class="track" tabindex="0">
      <figure
        v-for="(item, index) in items"
        :key="item.id"
        class="slide"
        role="group"
        aria-roledescription="slide"
        :aria-label="`${index + 1} of ${items.length}`"
      >
        <img
          :src="imageUrl(item, 1600)"
          :srcset="imageSrcset(item)"
          sizes="(max-width: 800px) 100vw, 60vw"
          :width="item.width"
          :height="item.height"
          :alt="item.title"
          :loading="index === 0 ? 'eager' : 'lazy'"
          decoding="async"
        />
      </figure>
    </div>

    <template v-if="items.length > 1">
      <button type="button" class="arrow prev" @click="goTo(current - 1)">
        <span class="visually-hidden">Previous image</span>
        <svg width="21" height="38" viewBox="0 0 21 38" aria-hidden="true">
          <path d="M18.6 3 2.6 19l15.9 16" />
        </svg>
      </button>
      <button type="button" class="arrow next" @click="goTo(current + 1)">
        <span class="visually-hidden">Next image</span>
        <svg width="21" height="38" viewBox="0 0 21 38" aria-hidden="true">
          <path d="M2.5 3 18.5 19 2.5 35" />
        </svg>
      </button>
      <div class="dots">
        <button
          v-for="(item, index) in items"
          :key="item.id"
          type="button"
          class="dot"
          :class="{ active: index === current }"
          :aria-current="index === current ? 'true' : undefined"
          @click="goTo(index)"
        >
          <span class="visually-hidden">Show image {{ index + 1 }}</span>
        </button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.carousel {
  position: relative;
  margin-block: 30px 50px;
}

.track {
  display: flex;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
}

.track::-webkit-scrollbar {
  display: none;
}

.track:focus-visible {
  outline: 2px solid var(--color-gray-dark);
  outline-offset: 2px;
}

.slide {
  flex: 0 0 100%;
  margin: 0;
  scroll-snap-align: start;
}

.slide img {
  width: 100%;
  height: auto;
}

.arrow {
  position: absolute;
  top: 50%;
  display: grid;
  place-items: center;
  width: 44px;
  height: 60px;
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;
  transform: translateY(-50%);
  stroke: #7f7f7f;
  stroke-width: 3;
  fill: none;
  transition: stroke 0.2s;
}

.arrow:hover {
  stroke: var(--color-gray-dark);
}

.prev {
  left: 0;
}

.next {
  right: 0;
}

.dots {
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 4px;
}

.dot {
  width: 8px;
  height: 8px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: var(--color-black);
  opacity: 0.2;
  cursor: pointer;
}

.dot.active {
  background: var(--color-gray-dark);
  opacity: 1;
}

.arrow:focus-visible,
.dot:focus-visible {
  outline: 2px solid var(--color-gray-dark);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .track {
    scroll-behavior: auto;
  }
}
</style>
