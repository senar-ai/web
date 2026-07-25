# Remix + Deno

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

Welcome to the Deno template for Remix! 🦕

For more, check out the [Remix docs](https://remix.run/docs).

- [Remix + Deno](#remix--deno)
  - [Install](#install)
  - [Managing dependencies](#managing-dependencies)
  - [Development](#development)
    - [Type hints](#type-hints)
  - [Production](#production)
  - [Deployment](#deployment)
  - [Setting up Deno Deploy](#setting-up-deno-deploy)
    - [Deploying to Deno Deploy](#deploying-to-deno-deploy)
    - [Scheduled data refresh](#scheduled-data-refresh)
  - [Useful resources](#useful-resources)
    - [How to use FontAwesome in the project](#how-to-use-fontawesome-in-the-project)
  - [Frequently Used Commands](#frequently-used-commands)
    - [Prisma commands](#prisma-commands)
    - [PlanetScale commands](#planetscale-commands)
  - [Contributors ✨](#contributors-)

## Install

```sh
npx create-remix@latest --template deno
```

## Managing dependencies

Read about
[how we recommend to manage dependencies for Remix projects using Deno](https://github.com/remix-run/remix/blob/main/decisions/0001-use-npm-to-manage-npm-dependencies-for-deno-projects.md).

- ✅ You should use `npm` to install NPM packages

  ```sh
  npm install react
  ```

  ```ts
  import { useState } from 'react'
  ```

- ✅ You may use inlined URL imports or
  [deps.ts](https://deno.land/manual/examples/manage_dependencies#managing-dependencies)
  for Deno modules.

  ```ts
  import { copy } from 'https://deno.land/std@0.138.0/streams/conversion.ts'
  ```

- ❌ Do not use
  [import maps](https://deno.land/manual/linking_to_external_code/import_maps).

## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

### Type hints

This template provides type hinting to VS Code via a
[dedicated import map](./.vscode/resolve_npm_imports.json).

To get types in another editor, use an extension for Deno that supports import
maps and point your editor to `./.vscode/resolve_npm_imports.json`.

For more, see
[our decision doc for interop between Deno and NPM](https://github.com/remix-run/remix/blob/main/decisions/0001-use-npm-to-manage-npm-dependencies-for-deno-projects.md#vs-code-type-hints).

## Production

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

## Deployment

Building the Deno app (`npm run build`) results in two outputs:

- `build/` (server bundle)
- `public/build/` (browser bundle)

You can deploy these bundles to any host that runs Deno, but here we'll focus on
deploying to [Deno Deploy](https://deno.com/deploy).

## Setting up Deno Deploy

Deploy Classic projects are not transferred automatically. To configure this
app on the current Deno Deploy platform:

1. Sign in at [console.deno.com](https://console.deno.com) and create an
   organization.
2. Create a new app and connect the `senar-ai/web` GitHub repository. Grant the
   Deno Deploy GitHub app access to the repository if it is not listed.
3. Keep the app directory at the repository root. Build configuration is read
   from [`deno.json`](./deno.json): dependencies are installed with `npm ci`,
   the app is built with `npm run build`, and `build/index.js` is run as a
   dynamic app. The GitHub integration builds pushes and preview branches; no
   push deployment workflow is required.
4. If the Classic app uses environment variables, recreate each one in the new
   app settings and assign it to the appropriate Production, Development, and/or
   Build contexts. This app currently requires none for its build or runtime.
5. If the Classic app uses a custom domain, add it to the new app, configure the
   `_acme-challenge` CNAME shown by the dashboard, then update the domain's
   CNAME/ANAME. Allow up to 48 hours for propagation before removing it from
   Deploy Classic.

The app does not use Deno KV, queues, or application cron jobs, so no data or API
migration is required for those services.

### Deploying to Deno Deploy

Normal production and preview deployments are handled by the GitHub integration.
For a manual deployment, authenticate and select the new app once:

```sh
deno deploy switch
npm run deploy
```

`deno deploy` prompts for browser authentication and stores its token in the
system keyring. For non-interactive use, provide `DENO_DEPLOY_TOKEN` instead.
Never commit a deploy token.

### Scheduled data refresh

The app fetches its public directory data during each build. The
`Scheduled Deploy` workflow preserves the existing daily refresh at 09:00 UTC
while push deployments are handled by Deno Deploy itself. Configure these
GitHub Actions settings after creating the app:

- Repository secret `DENO_DEPLOY_TOKEN`: a token accepted by `deno deploy`
- Repository variable `DENO_DEPLOY_ORG`: the new organization slug
- Repository variable `DENO_DEPLOY_APP`: the new app slug

The workflow can also be run manually from the Actions tab.

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

**Component Location**: `app/components/icon.tsx`

```tsx
import { Icon } from '~/components/icon'

<Icon 
  set="solid"           // "solid" | "light" | "duotone"
  id="chevron-right"    // FontAwesome icon name
  className="h-6 w-6"   // Standard SVG props
/>
```

#### Technical Details

- **Sprite Files**: Located in `/public/images/` (solid.svg, light.svg, duotone.svg)
- **Implementation**: Uses SVG `<use>` element to reference sprite symbols
- **Styling**: Icons inherit color via `fill="currentColor"`
- **Performance**: All icons in a set load as single HTTP request

## Frequently Used Commands

### Prisma commands

Learn more about this [Prisma schema file](prisma/schema.prisma) in the docs:
<https://pris.ly/d/prisma-schema>

Commands to know:

- `npx prisma generate` - update TypeScript definitions based on this schema
- `npx prisma db push` - push the schema changes to the database
- `npx prisma studio` - open the Studio, which allows you to edit the schema.
- `npx prisma migrate reset` - reset the migrations to the last version. This
  will reset the DB and run the seed script
- `npx prisma migrate dev --name <descriptive-name>` - generate a migration file
  for any changes you make to the schema (this will be committed).

### PlanetScale commands

Learn more about Planetscale CLI in the docs:
<https://docs.planetscale.com/reference/planetscale-cli>

Commands to know:

- `pscale connect <DATABASE_NAME> <BRANCH_NAME> --port 3309` - create a secure
  connection to a database branch for a local client
- `pscale database dump <DATABASE_NAME> <BRANCH_NAME> --output prisma/dumps/xx` -
  backup and dump the specified database

## Contributors ✨

Thanks goes to these wonderful people
([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://zainf.dev"><img src="https://avatars.githubusercontent.com/u/6315466?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Zain Fathoni</b></sub></a><br /><a href="https://github.com/senar-ai/web/commits?author=zainfathoni" title="Code">💻</a> <a href="https://github.com/senar-ai/web/commits?author=zainfathoni" title="Documentation">📖</a> <a href="#design-zainfathoni" title="Design">🎨</a> <a href="#infra-zainfathoni" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-zainfathoni" title="Maintenance">🚧</a> <a href="#tool-zainfathoni" title="Tools">🔧</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the
[all-contributors](https://github.com/all-contributors/all-contributors)
specification. Contributions of any kind welcome!
