<template>
  <main>
    <section id="contact" class="inner" v-for="page in contact">
      <div class="content" v-html="compileMarkdown(page.fields.body)"></div>
    </section>
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
export default {
  data() {
    return {
      contact: [],
    }
  },
  watch: {
    // call again the method if the route changes
    '$route': 'getData'
  },
  methods: {
    getData: function () {
      var self = this;
      self.contact = [];
      client.getEntries({
        content_type: 'page',
        limit: 1,
        "fields.slug": self.$route.name
      }).then(function(entries) {
        var items = entries.items;
        for (var item in items) {
          var item = items[item];
          self.contact.push(item);
          console.log("self.contact", self.contact)
        }
      });
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