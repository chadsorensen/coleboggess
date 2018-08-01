<template>
  <main>
    <div v-if="this.$store.state.reel" class="video-container" v-bind:style="{ backgroundImage: `url(${this.$store.state.reel.fields.coverImage.fields.file.url})`}" :alt="this.$store.state.reel.fields.coverImage.fields.title">
      <router-link class="cover" :to="{ path: '/projects/reel-2018/' }"></router-link>
    </div>
    <div id="show-projects" class="content-container">
      <app-projectList :limit="100"></app-projectList>
    </div>
  </main>
</template>
 
<script>

import ProjectList from './ProjectList'
export default {
  data () {
    return {

    }
  },
  components: {
    'app-projectList': ProjectList
  },
  methods: {

  },
}
</script>