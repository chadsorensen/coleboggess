import { marked } from 'marked'

/** Content comes from Cole's own Contentful space, so raw HTML (video iframes) is allowed through. */
export const renderMarkdown = (input?: string): string =>
  input ? (marked.parse(input, { async: false }) as string) : ''
