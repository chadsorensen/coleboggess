<template>
  <main>
<!--     <video :poster="poster" controls>
      <source :src="reel" type="video/mp4">
    </video> -->
    <div id="show-projects" class="content-container">
      <app-projectList :limit="100"></app-projectList>
    </div>
  </main>
</template>
 
<script>

import ProjectList from './ProjectList'
var reel = require('../assets/media/cole-boggess_reel_2013_HB.mp4');
console.log("reel", reel)
var poster = require('../assets/img/poster.jpg');
export default {
  data () {
    return {
      reel,
      poster
    }
  },
  components: {
    'app-projectList': ProjectList
  },
  methods: {
  }
}
</script>