<script setup lang="ts">
import SiteHeader from '@/components/SiteHeader.vue'
</script>

<template>
  <SiteHeader />
  <RouterView v-slot="{ Component, route }">
    <Transition name="fade" mode="out-in">
      <component :is="Component" :key="route.path" />
    </Transition>
  </RouterView>
</template>
