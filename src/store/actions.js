export default {

  fetch_projects: ({ commit }) => {
    const SPACE_ID = 'lyugizel31r9';
    const ACCESS_TOKEN = 'd0a7461cb18516d6bd2e529be5d5fa0382a682b5d16d187c3f45c6837e333074';
    let contentful = '';
    Modernizr.on('promises', function( result ) {
      if (result) {
        contentful = require('contentful');
      } else {
        let legacy = require('../assets/js/contentful-management.legacy.min.js');
        contentful = legacy.contentful;
      }
      const client = contentful.createClient({
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
          if (project.fields.order === -10) {
            commit('ADD_REEL', project);
          }
          commit('APPEND_PROJECT', project);
        }
      }).catch((err) => {
        console.log('err', err);
      });
    });
  },
  filter_project: ({ commit }, slug) => {
    commit('ACTIVE_PROJECT', slug);
  },

  fetch_about: ({ commit }, slug) => {
    const SPACE_ID = 'lyugizel31r9';
    const ACCESS_TOKEN = 'd0a7461cb18516d6bd2e529be5d5fa0382a682b5d16d187c3f45c6837e333074';
    let contentful = '';
    Modernizr.on('promises', function( result ) {
      if (result) {
        contentful = require('contentful');
      } else {
        let legacy = require('../assets/js/contentful-management.legacy.min.js');
        contentful = legacy.contentful;
      }
      const client = contentful.createClient({
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
    });
  },

  fetch_contact: ({ commit }, slug) => {
    const SPACE_ID = 'lyugizel31r9';
    const ACCESS_TOKEN = 'd0a7461cb18516d6bd2e529be5d5fa0382a682b5d16d187c3f45c6837e333074';
    let contentful = '';
    Modernizr.on('promises', function( result ) {
      if (result) {
        contentful = require('contentful');
      } else {
        let legacy = require('../assets/js/contentful-management.legacy.min.js');
        contentful = legacy.contentful;
      }
      const client = contentful.createClient({
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
    });
  },
};
