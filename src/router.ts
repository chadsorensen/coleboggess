import { createRouter, createWebHistory } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
  }
}

const SITE_TITLE = 'Cole Boggess'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: { name: 'projects' } },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('./views/ProjectsView.vue'),
    },
    {
      path: '/projects/:slug',
      name: 'project',
      component: () => import('./views/ProjectView.vue'),
      props: true,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/PageView.vue'),
      props: { slug: 'about' },
      meta: { title: 'About' },
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('./views/PageView.vue'),
      props: { slug: 'contact' },
      meta: { title: 'Contact' },
    },
    { path: '/:pathMatch(.*)*', redirect: { name: 'projects' } },
  ],
  scrollBehavior: (_to, _from, savedPosition) => savedPosition ?? { top: 0 },
})

/** Static titles are set here; ProjectView sets its own once the project loads. */
router.afterEach((to) => {
  if (to.name === 'project') return
  document.title = to.meta.title ? `${to.meta.title} | ${SITE_TITLE}` : SITE_TITLE
})

export function setPageTitle(title?: string) {
  document.title = title ? `${title} | ${SITE_TITLE}` : SITE_TITLE
}
