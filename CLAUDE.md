# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Essential Commands

### Development

- `npm run dev` - Build `dist/` and serve it with Wrangler
- `npm run build` - Print static HTML into `dist/`
- `npm run fetch` - Fetch the Google Sheet into `app/data/`
- `npm run deploy` - Upload `dist/` with Wrangler
- `npm test` - Run short-link redirect and Sheet CSV tests
- `npm run typecheck` - Type-check `site/` and `worker/`

### Deployment

- `npm run deploy` - Upload `dist/` to Cloudflare with Wrangler

## Architecture Overview

This is a static learning resources directory ("Senarai"). Key architectural patterns:

### Tech Stack

- **Runtime**: Node.js 26
- **Site**: static HTML printed by `site/build.ts`
- **Hosting**: Cloudflare Workers static assets, plus a `/go` redirect Worker
- **Styling**: Tailwind CSS 4, compiled by `site/build.ts`, with the Tailwind 3 colors in `site/v3-colors.css`

### Project Structure

- `site/` - HTML printer, Sheet fetch and CSV parser, and browser search
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

- This uses **Node.js 26**, not Deno
- Page HTML is printed at build time. Do not add a request-time framework
- The Worker in `worker/index.ts` handles `/go` redirects only
- Database fetching happens via an external Google Sheet. `site/sheet.ts` rejects an export that is not valid, so a bad export never replaces the data or deploys
- The site is a learning resources directory
