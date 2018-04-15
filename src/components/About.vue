<template>
  <main>
    <section id="about" class="inner" v-for="page in about">
      <div>
        <img :src="page.fields.image.fields.file.url" width="500" alt="">
      </div>
      <div class="content" v-html="compileMarkdown(page.fields.body)"></div>
    </section>
  </main>
</template>

<script>

const marked = require('marked');

export default {
  data() {
    return {
      about: this.$store.state.about,
    }
  },
  watch: {
    // call again the method if the route changes
    '$route': 'getData'
  },
  methods: {
    getData: function () {
      if (this.$store.state.about.length === 0) this.$store.dispatch('fetch_about', this.$route.name);
    },
    compileMarkdown: function (input) {
      return marked(input);
    }
  },
  created: function () {
    this.getData();
  }
}
</script>