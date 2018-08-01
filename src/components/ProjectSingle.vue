<template>
  <main>
    <section id="project-single" v-for="project in activeProject">
      <div v-bind:style="{ backgroundImage: `url(${project.fields.coverImage.fields.file.url})`}" :alt="project.fields.coverImage.fields.title" class="post-image"></div>
      <!-- <img :src="post.fields.image.fields.file.url" :alt="post.fields.image.fields.title" class="post-image"> -->
      <div class="post-wrapper">
        
        <div class="post-container">
          <div class="content">
            <h1>{{ project.fields.title }}</h1>
            <div v-if="project.fields.projectDescription" v-html="compileMarkdown(project.fields.projectDescription)"></div>
          </div>
          <div class="media">
            <div v-if="project.fields.videoEmbed" class="video" v-html="compileMarkdown(project.fields.videoEmbed)"></div>

            <div v-if="project.fields.media" class="carousel">
              <swiper :options="swiperOption" class="swiper-wapper">
                <swiperSlide v-for="item in project.fields.media" key="item">
                  <img :src="item.fields.file.url" alt="">
                </swiperSlide>
                <div class="swiper-pagination" slot="pagination"></div>
                <div class="swiper-button-prev swiper-button-black" slot="button-prev"></div>
                <div class="swiper-button-next swiper-button-black" slot="button-next"></div>
              </swiper>
            </div>

          </div>
        </div>
      </div>
    </section>
    
    <project-list :limit="100" :slug="slug"></project-list>
  </main>
</template>

<script>
  const marked = require('marked');
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import ProjectList from './ProjectList'
  export default {
    props: {
      slug: {
        type: String,
        required: true,
      },
    },
    data () {
      return {
        activeProject: this.$store.state.activeProject,
        swiperOption: {
          loop: true,
          grabCursor: true,
          pagination: '.swiper-pagination',
          prevButton: '.swiper-button-prev',
          nextButton: '.swiper-button-next'
        }
      }
    },
    components: {
      ProjectList,
      swiper,
      swiperSlide
    },
    watch: {
      // call the method again if the route changes
      '$route': 'fetchProject'
    },
    methods: {
      fetchProject() {
        this.$store.dispatch('filter_project', this.slug);
        console.log("this.activeProject", this.activeProject);
      },
      compileMarkdown: function (input) {
        return marked(input);
      }
    },
    created: function () {
      this.fetchProject();
    }
  }
</script>