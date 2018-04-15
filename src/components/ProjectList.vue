
<template>
  <section class="project-list">
    <div class="items">
      <div v-for="project in activeProjects" class="item">
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
    slug: {
      type: String
    }
  },
  computed: {
    activeProjects() {
      if(this.slug) {
        const results = this.projects.filter(project => project.fields.slug != this.slug);
        return results;
      } else {
        return this.projects;
      }
    },
  },
  
  data () {
    return {
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
  },
  created: function () {
    this.checkProjects();
  },
  watch: {
    '$route': 'checkProjects'
  }
}
</script>