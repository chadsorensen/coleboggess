import Vuex from 'vuex';
import Vue from 'vue';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    projects: [],
    activeProject: [],
    reel: false,
    about: [],
    contact: []
  },
  mutations,
  actions,
});
