
<template>
  <section class="project-list">
    <div class="items">
      <div v-for="project in projects" class="item">
        <img :src="project.fields.coverImage.fields.file.url" :alt="project.fields.title">
        <h3 class="cover project-title">{{ project.fields.title }}</h3>
        <router-link :to="{ path: '/projects/' +  project.fields.slug }" class="cover project-link" :title="project.fields.title"></router-link>
      </div>
    </div>
  </section>
</template>
 
<script>
const SPACE_ID = 'lyugizel31r9';
const ACCESS_TOKEN = 'd0a7461cb18516d6bd2e529be5d5fa0382a682b5d16d187c3f45c6837e333074';
var contentful = require('contentful');
var client = contentful.createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN
});
export default {
  props: {
    limit: {
      type: Number,
      default: 100
    },
  },
  data () {
    return {
      projects: []
    }
  },
  methods: {
    reInitialize: function () {
      this.getData();
    },
    getData: function () {
      var self = this;
      self.projects = [];
      var slug = this.$route.params.slug;
      client.getEntries({
        content_type: 'project',
        limit: self.limit,
        "fields.slug[ne]": slug,
        order: "fields.order"
      }).then(function(entries) {
        var items = entries.items;
        for (var item in items) {
          var item = items[item];
          self.projects.push(item);
        }
      });
    }
  },
  created: function () {
    this.getData();
  },
  watch: {
    '$route': 'reInitialize'
  }
}
</script>