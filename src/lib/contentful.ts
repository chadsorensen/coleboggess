/**
 * Minimal Contentful Content Delivery API client.
 * Replaces the `contentful` SDK (and the Modernizr/legacy fallback) with plain
 * fetch + a small link resolver for the two content types this site uses.
 */

const SPACE_ID = import.meta.env.VITE_CONTENTFUL_SPACE_ID
const ACCESS_TOKEN = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN
const BASE_URL = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master`

/** The project with this order value is the homepage hero/reel, not a grid item. */
export const REEL_ORDER = -10

export interface Asset {
  id: string
  title: string
  url: string
  contentType: string
  width?: number
  height?: number
}

export interface Project {
  id: string
  title: string
  slug: string
  order: number
  coverImage?: Asset
  projectDescription?: string
  videoEmbed?: string
  videoEmbedTwo?: string
  media: Asset[]
}

export interface Page {
  id: string
  slug: string
  body: string
  image?: Asset
}

// ---------- Raw API shapes ----------

interface Link {
  sys: { type: 'Link'; linkType: 'Asset' | 'Entry'; id: string }
}

interface RawAsset {
  sys: { id: string }
  fields: {
    title?: string
    file?: {
      url: string
      contentType: string
      details?: { image?: { width: number; height: number } }
    }
  }
}

interface RawEntry<F> {
  sys: { id: string }
  fields: F
}

interface EntriesResponse<F> {
  items: RawEntry<F>[]
  includes?: { Asset?: RawAsset[] }
}

interface ProjectFields {
  title: string
  slug: string
  order?: number
  coverImage?: Link
  projectDescription?: string
  videoEmbed?: string
  videoEmbedTwo?: string
  media?: Link[]
}

interface PageFields {
  slug: string
  body?: string
  image?: Link
}

// ---------- Helpers ----------

async function getEntries<F>(query: Record<string, string>): Promise<EntriesResponse<F>> {
  const params = new URLSearchParams({ include: '2', ...query })
  const res = await fetch(`${BASE_URL}/entries?${params}`, {
    headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
  })
  if (!res.ok) throw new Error(`Contentful request failed: ${res.status} ${res.statusText}`)
  return res.json() as Promise<EntriesResponse<F>>
}

function assetResolver(includes: EntriesResponse<unknown>['includes']) {
  const assets = new Map<string, Asset>()
  for (const raw of includes?.Asset ?? []) {
    const file = raw.fields.file
    if (!file) continue // unpublished/empty asset
    assets.set(raw.sys.id, {
      id: raw.sys.id,
      title: raw.fields.title ?? '',
      url: file.url.startsWith('//') ? `https:${file.url}` : file.url,
      contentType: file.contentType,
      width: file.details?.image?.width,
      height: file.details?.image?.height,
    })
  }
  return (link?: Link) => (link ? assets.get(link.sys.id) : undefined)
}

/**
 * Contentful Images API URL. GIFs and non-images are returned untouched so
 * animated GIFs keep animating.
 */
export function imageUrl(asset: Asset, width?: number): string {
  if (!asset.contentType.startsWith('image/') || asset.contentType === 'image/gif') return asset.url
  const params = new URLSearchParams({ fm: 'webp', q: '80' })
  if (width) params.set('w', String(width))
  return `${asset.url}?${params}`
}

export function imageSrcset(asset: Asset, widths = [480, 800, 1200, 1600]): string | undefined {
  if (!asset.contentType.startsWith('image/') || asset.contentType === 'image/gif') return undefined
  return widths
    .filter((w) => !asset.width || w <= asset.width)
    .map((w) => `${imageUrl(asset, w)} ${w}w`)
    .join(', ') || undefined
}

// ---------- Queries ----------

export async function fetchProjects(): Promise<Project[]> {
  const data = await getEntries<ProjectFields>({
    content_type: 'project',
    order: 'fields.order',
    limit: '100',
  })
  const resolve = assetResolver(data.includes)
  return data.items.map(({ sys, fields }) => ({
    id: sys.id,
    title: fields.title,
    slug: fields.slug,
    order: fields.order ?? 0,
    coverImage: resolve(fields.coverImage),
    projectDescription: fields.projectDescription,
    videoEmbed: fields.videoEmbed,
    videoEmbedTwo: fields.videoEmbedTwo,
    media: (fields.media ?? []).map(resolve).filter((a): a is Asset => !!a),
  }))
}

export async function fetchPage(slug: string): Promise<Page | undefined> {
  const data = await getEntries<PageFields>({
    content_type: 'page',
    'fields.slug': slug,
    limit: '1',
  })
  const item = data.items[0]
  if (!item) return undefined
  const resolve = assetResolver(data.includes)
  return {
    id: item.sys.id,
    slug: item.fields.slug,
    body: item.fields.body ?? '',
    image: resolve(item.fields.image),
  }
}
