# coleboggess.com

Portfolio site for Cole Boggess, a motion graphics designer.

Built with Vue 3 (`<script setup>` + TypeScript), Vue Router and Vite. Content lives in
Contentful and is fetched client-side from the Content Delivery API.

## Development

Requires Node 22.12+ (see `.nvmrc`).

```sh
npm install
npm run dev        # local dev server at http://localhost:5173
npm run build      # type-check and build to dist/
npm run preview    # serve the production build locally
```

## Project structure

```
src/
  App.vue                  header + routed view
  router.ts                routes and page titles
  lib/contentful.ts        tiny CDA client, content types, image URL helpers
  lib/markdown.ts          markdown → HTML (marked)
  composables/useContent.ts  shared project/page cache (replaces Vuex)
  components/              SiteHeader, ProjectGrid, MediaCarousel
  views/                   ProjectsView, ProjectView, PageView (about + contact)
  styles/main.css          tokens, reset, typography
public/                    favicons + web manifest (served from /)
vercel.json                SPA rewrites + long cache for hashed assets
```

## Content (Contentful)

- **project** — `title`, `slug`, `order`, `coverImage`, `projectDescription` (markdown),
  `videoEmbed` / `videoEmbedTwo` (embed HTML, e.g. a Vimeo iframe), `media` (gallery images).
  Projects are sorted by `order`. A project with `order` **-10** becomes the homepage hero
  instead of a grid item.
- **page** — `slug` (`about` or `contact`), `body` (markdown), `image` (about only).

Images are served through the Contentful Images API as WebP with responsive `srcset`s
(GIFs are left untouched so they keep animating).

The space ID and read-only CDA token are in `.env`. They are public by design (they ship in the
client bundle); override them in `.env.local` or in Vercel's environment variables if needed.

## Deployment

Hosted on Vercel, which detects Vite automatically (build command `npm run build`, output `dist`).
Pushes to `master` deploy to production; other branches get preview URLs.
