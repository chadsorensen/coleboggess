<template>
  <main>
    <section id="project-single" v-for="project in activeProject">

      <div v-bind:style="{ backgroundImage: `url(${project.fields.coverImage.fields.file.url})`}" :alt="project.fields.coverImage.fields.title" class="post-image"></div>
      <!-- <img :src="post.fields.image.fields.file.url" :alt="post.fields.image.fields.title" class="post-image"> -->
      <div class="post-wrapper">
        
        <div class="post-container">
          <div class="content">
            <h1>{{ project.fields.title }}</h1>
            <div v-html="compileMarkdown(project.fields.projectDescription)"></div>
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
    
    <app-projectList :limit="100"></app-projectList>
  </main>
</template>

<script>
  const marked = require('marked');
  const SPACE_ID = 'lyugizel31r9';
  const ACCESS_TOKEN = 'd0a7461cb18516d6bd2e529be5d5fa0382a682b5d16d187c3f45c6837e333074';
  var contentful = require('contentful');
  var client = contentful.createClient({
    space: SPACE_ID,
    accessToken: ACCESS_TOKEN
  });
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
        loading: false,
        pageUrl: window.location.href,
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
      'app-projectList': ProjectList,
      swiper,
      swiperSlide
    },
    watch: {
      // call the method again if the route changes
      '$route': 'fetchProject'
    },
    methods: {
      fetchProject() {
        console.log("this.slug", this.slug);
        this.$store.dispatch('filter_project', this.slug);
        console.log("this.$store.state.project", this.$store.state.project);
      },
      getData: function () {
        var self = this;
        self.projects = [];
        client.getEntries({
          content_type: 'project',
          limit: 1,
          "fields.slug": self.slug
        }).then(function(entries) {
          var items = entries.items;
          for (var item in items) {
            var item = items[item];
            self.projects.push(item);
          }
        });
      },
      compileMarkdown: function (input) {
        return marked(input);
      }
    },
    created: function () {
      this.fetchProject();
      // this.getData();
    }
  }
</script>