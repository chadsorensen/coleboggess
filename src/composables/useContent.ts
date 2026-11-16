import { computed, ref, shallowRef, toValue, watchEffect, type MaybeRefOrGetter } from 'vue'
import { fetchPage, fetchProjects, REEL_ORDER, type Page, type Project } from '@/lib/contentful'

// Module-level cache: fetched once per visit and shared by every view (replaces Vuex).

const projects = shallowRef<Project[]>([])
const projectsStatus = ref<'idle' | 'loading' | 'ready' | 'error'>('idle')

function loadProjects() {
  if (projectsStatus.value === 'loading' || projectsStatus.value === 'ready') return
  projectsStatus.value = 'loading'
  fetchProjects()
    .then((result) => {
      projects.value = result
      projectsStatus.value = 'ready'
    })
    .catch((err: unknown) => {
      console.error(err)
      projectsStatus.value = 'error'
    })
}

export function useProjects() {
  loadProjects()
  return {
    status: projectsStatus,
    reel: computed(() => projects.value.find((p) => p.order === REEL_ORDER)),
    /** Grid items: everything except the reel. */
    work: computed(() => projects.value.filter((p) => p.order !== REEL_ORDER)),
    bySlug: (slug: string) => projects.value.find((p) => p.slug === slug),
  }
}

const pages = ref(new Map<string, Page | null>())
const pageErrors = ref(new Set<string>())
const pageRequests = new Map<string, Promise<void>>()

export function usePage(slug: MaybeRefOrGetter<string>) {
  watchEffect(() => {
    const key = toValue(slug)
    if (pages.value.has(key) || pageRequests.has(key)) return
    pageErrors.value.delete(key)
    const request = fetchPage(key)
      .then((page) => {
        pages.value.set(key, page ?? null)
      })
      .catch((err: unknown) => {
        console.error(err)
        pageErrors.value.add(key)
      })
      .finally(() => pageRequests.delete(key))
    pageRequests.set(key, request)
  })

  return {
    page: computed(() => pages.value.get(toValue(slug)) ?? undefined),
    loading: computed(() => !pages.value.has(toValue(slug)) && !pageErrors.value.has(toValue(slug))),
    error: computed(() => pageErrors.value.has(toValue(slug))),
  }
}
