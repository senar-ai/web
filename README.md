# Senarai

A static directory of learning activities. Node prints the HTML. Cloudflare serves the files.

## Install

Use Node 24.

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

`npm run fetch` downloads the Google Sheet. It exits without writing files when the sheet response is empty or not OK. `npm run deploy` uploads `dist/` with Wrangler.

## Deployment

The site is Cloudflare Workers static assets. Page requests match files in `dist/` and do not run user Worker code. The Worker handles `/go` and `/go/*` only.

Set these GitHub Actions secrets before the scheduled workflow can deploy:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

The `Scheduled Deploy` workflow runs at 09:17 UTC. It fetches the sheet, builds, and runs `wrangler deploy`. A failed fetch does not deploy.

## Useful resources

### How to use FontAwesome in the project

This project uses **SVG sprites** with FontAwesome icons through a custom `<Icon />` component system.

#### Adding New Icons

1. Search [FontAwesome Icons](https://fontawesome.com/icons)
2. Include the icons in the
   [senarai](https://fontawesome.com/kits/5899c9809d/icons) icon kit. (please
   ask @zainfathoni to do it for you)
3. Upload the new SVG sprites to the `/public/images/` directory
4. Use the `<Icon />` component and pass the icon set and id as props

#### Usage

Icons are SVG sprites in `/public/images/`. A page references one with `/images/<set>.svg#<id>`.

#### Technical Details

- **Sprite Files**: Located in `/public/images/` (solid.svg, light.svg, duotone.svg)
- **Implementation**: Uses SVG `<use>` element to reference sprite symbols
- **Styling**: Icons inherit color via `fill="currentColor"`
- **Performance**: All icons in a set load as single HTTP request
