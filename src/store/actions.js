export default {

  fetch_projects: ({ commit }) => {
    const SPACE_ID = 'lyugizel31r9';
    const ACCESS_TOKEN = 'd0a7461cb18516d6bd2e529be5d5fa0382a682b5d16d187c3f45c6837e333074';
    var contentful = require('contentful');
    var client = contentful.createClient({
      space: SPACE_ID,
      accessToken: ACCESS_TOKEN
    });
    client.getEntries({
      content_type: 'project',
      limit: 100,
      order: "fields.order"
    }).then(function(entries) {
      const items = entries.items;
      for (var item in items) {
        var project = items[item];
        commit('APPEND_PROJECT', project);
      }
    }).catch((err) => {
      console.log('err', err);
    });
  },
  filter_project: ({ commit }, slug) => {
    commit('ACTIVE_PROJECT', slug);
  },

  fetch_about: ({ commit }, slug) => {
    const SPACE_ID = 'lyugizel31r9';
    const ACCESS_TOKEN = 'd0a7461cb18516d6bd2e529be5d5fa0382a682b5d16d187c3f45c6837e333074';
    var contentful = require('contentful');
    var client = contentful.createClient({
      space: SPACE_ID,
      accessToken: ACCESS_TOKEN
    });
    client.getEntries({
      content_type: 'page',
      limit: 1,
      "fields.slug": slug
    }).then(function(entries) {
      commit('ADD_ABOUT', entries.items[0]);
    });
  },

  fetch_contact: ({ commit }, slug) => {
    const SPACE_ID = 'lyugizel31r9';
    const ACCESS_TOKEN = 'd0a7461cb18516d6bd2e529be5d5fa0382a682b5d16d187c3f45c6837e333074';
    var contentful = require('contentful');
    var client = contentful.createClient({
      space: SPACE_ID,
      accessToken: ACCESS_TOKEN
    });
    client.getEntries({
      content_type: 'page',
      limit: 1,
      "fields.slug": slug
    }).then(function(entries) {
      commit('ADD_CONTACT', entries.items[0]);
    });
  },
};
