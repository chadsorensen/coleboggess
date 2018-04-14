
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

export default {
  props: {
    limit: {
      type: Number,
      default: 100
    },
  },
  data () {
    return {
      // projects: [],
      projects: this.$store.state.projects,
    }
  },
  methods: {
    reInitialize: function () {
      this.getData();
    },
    checkProjects() {
      if (this.$store.state.projects.length === 0) this.$store.dispatch('fetch_projects');
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
    this.checkProjects();
    // if (this.$store.state.projects.length === 0) this.$store.dispatch('fetch_projects');
    // console.log('this.$store', this.$store);
    // this.getData();
  },
  watch: {
    '$route': 'checkProjects'
  }
}
</script>