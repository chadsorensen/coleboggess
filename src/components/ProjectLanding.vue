<template>
  <main>
    <div class="video-container" :style="{ backgroundImage: `url( ${poster} )`}">
      <router-link class="cover" :to="{ path: '/projects/reel-2018/' }"></router-link>
    </div>
    <div id="show-projects" class="content-container">
      <app-projectList :limit="100"></app-projectList>
    </div>
  </main>
</template>
 
<script>

import ProjectList from './ProjectList'
var poster = require('../assets/img/poster.jpg');
export default {
  data () {
    return {
      poster,
      showVideo: false,
    }
  },
  components: {
    'app-projectList': ProjectList
  },
  methods: {
    playVideo() {
      this.showVideo = true;
    }
  }
}
</script>