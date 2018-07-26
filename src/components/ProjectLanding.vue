<template>
  <main>
    <div class="video-container" :style="{ backgroundImage: `url( ${poster} )`}" v-on:click.once="playVideo()">
      <div class="play-button-holder" v-show="!showVideo">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-173 156 70 70" enable-background="new -173 156 70 70"><path class="svg-play" d="M-103 191l-70 35v-70z"/></svg>
      </div>
<!--       <video :poster="poster" controls class="reel cover" v-show="showVideo">
        <source :src="reel" type="video/mp4">
      </video> -->
      <iframe v-if="showVideo" src="https://player.vimeo.com/video/67796616?autoplay=1&color=FFFFFF&title=0&byline=0&portrait=0" class="reel cover" width="1400" height="788" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
    </div>
    <div id="show-projects" class="content-container">
      <app-projectList :limit="100"></app-projectList>
    </div>
  </main>
</template>
 
<script>

import ProjectList from './ProjectList'
var reel = require('../assets/media/cole-boggess_reel_2013_HB.mp4');
var poster = require('../assets/img/poster.png');
export default {
  data () {
    return {
      reel,
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