import Vue from 'vue'
import Router from 'vue-router'
import ProjectLanding from '../components/ProjectLanding'
import ProjectSingle from '../components/ProjectSingle'
import About from '../components/About'
import Contact from '../components/Contact'
const Modernizr = require('../assets/js/modernizr-custom.js')

 
Vue.use(Router)

 
export default new Router({
  mode: "history",
  routes: [
    { path: '/', redirect: { name: 'projects' }},
    { path: '/projects', name: 'projects', props: true, component: ProjectLanding },
    { path: '/projects/:slug', name: "projects single", props: true, component: ProjectSingle },
    { path: '/about', name: 'about', component: About },
    { path: '/contact', name: 'contact', component: Contact }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
})
