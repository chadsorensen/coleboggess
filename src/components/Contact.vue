<template>
  <main>
    <section id="contact" class="inner" v-for="page in contact">
      <div class="content" v-html="compileMarkdown(page.fields.body)"></div>
    </section>
  </main>
</template>

<script>

const marked = require('marked');

export default {
  data() {
    return {
      contact: this.$store.state.contact,
    }
  },
  watch: {
    // call again the method if the route changes
    '$route': 'getData'
  },
  methods: {
    getData: function () {
      if (this.$store.state.contact.length === 0) this.$store.dispatch('fetch_contact', this.$route.name);
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