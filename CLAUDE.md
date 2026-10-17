# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Essential Commands

### Development

- `npm run dev` - Build `dist/` and serve it with Wrangler
- `npm run build` - Print static HTML into `dist/`
- `npm run fetch` - Fetch the Google Sheet into `app/data/`
- `npm run deploy` - Upload `dist/` with Wrangler
- `npm test` - Run short-link redirect tests

### Deployment

- `npm run deploy` - Upload `dist/` to Cloudflare with Wrangler

## Architecture Overview

This is a static learning resources directory ("Senarai"). Key architectural patterns:

### Tech Stack

- **Runtime**: Node.js 24
- **Site**: static HTML printed by `site/build.ts`
- **Hosting**: Cloudflare Workers static assets, plus a `/go` redirect Worker
- **Styling**: Tailwind CSS 3

### Project Structure

- `site/` - HTML printer, sheet fetch, and browser search
- `worker/` - `/go` redirect handler
- `app/model/` - Category list and activity types
- `app/data/` - Sheet JSON used by the printer
- `public/` - Images and the favicon

### Data Flow

1. `npm run fetch` downloads the Google Sheet into `app/data/senarai-db.json`
2. `npm run build` prints HTML into `dist/`
3. Cloudflare serves those files. `worker/index.ts` redirects `/go/*` only

### Icon Usage

FontAwesome icons via SVG sprites:

1. Add icons to the FontAwesome kit
2. Upload SVG sprites to `/public/images/`
3. Reference `/images/<set>.svg#<id>` from the printed HTML

## Important Notes

- This uses **Node.js 24**, not Deno
- Page HTML is printed at build time. Do not add a request-time framework
- The Worker in `worker/index.ts` handles `/go` redirects only
- Database fetching happens via an external Google Sheet
- The site is a learning resources directory
