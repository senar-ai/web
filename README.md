# Senarai

A static directory of learning activities. Node prints the HTML. Cloudflare serves the files.

## Install

Use Node 26 (see `.nvmrc`).

```sh
npm install
```

## Development

```sh
npm run build
npm run dev
```

`npm run build` writes `dist/`. `npm run dev` serves that directory with Wrangler.

## Production

```sh
npm run fetch
npm run build
npm run deploy
```

`npm run fetch` downloads the Google Sheet as CSV. It exits without writing files when the response is not OK, is not CSV, does not have the `Usia`, `Nama`, `Ringkasan`, and `Link` columns, or has no named activity. `npm run deploy` uploads `dist/` with Wrangler.

## Deployment

The site is Cloudflare Workers static assets. Page requests match files in `dist/` and do not run user Worker code. The Worker handles `/go` and `/go/*` only.

Set these GitHub Actions secrets before the scheduled workflow can deploy:

- `CLOUDFLARE_API_TOKEN`: an API token on the account that owns the `senar.ai` zone, with **Account › Workers Scripts › Edit** and **Zone › Workers Routes › Edit** for `senar.ai`. The Cloudflare "Edit Cloudflare Workers" token template has these permissions.
- `CLOUDFLARE_ACCOUNT_ID`: the ID of that account.

`wrangler.jsonc` does not attach `senar.ai` yet. The apex still points at Deno Deploy. After the `workers.dev` deployment is verified, remove the Deno DNS records and add the custom domain to `wrangler.jsonc`:

```jsonc
"routes": [{ "pattern": "senar.ai", "custom_domain": true }]
```

The `Scheduled Deploy` workflow runs at 09:17 UTC. It fetches the sheet, builds, and runs `wrangler deploy`. A failed fetch does not deploy.

## Styles

Tailwind CSS 4 compiles `site/styles.css` during `npm run build`. Tailwind scans `site/` and `app/model/` only. `site/v3-colors.css` keeps the Tailwind 3 color values, so the pages look the same as before the upgrade.

## Useful resources

### How to use FontAwesome in the project

This project uses **SVG sprites** with FontAwesome icons. The `icon()` helper in `site/html.ts` prints an SVG `<use>` element.

#### Adding New Icons

1. Search [FontAwesome Icons](https://fontawesome.com/icons)
2. Include the icons in the
   [senarai](https://fontawesome.com/kits/5899c9809d/icons) icon kit. (please
   ask @zainfathoni to do it for you)
3. Upload the new SVG sprites to the `/public/images/` directory
4. Call `icon(set, id, className)` in `site/pages.ts`

#### Usage

Icons are SVG sprites in `/public/images/`. A page references one with `/images/<set>.svg#<id>`.

#### Technical Details

- **Sprite Files**: Located in `/public/images/` (solid.svg, light.svg, duotone.svg)
- **Implementation**: Uses SVG `<use>` element to reference sprite symbols
- **Styling**: Icons inherit color via `fill="currentColor"`
- **Performance**: All icons in a set load as single HTTP request
