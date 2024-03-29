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

1. [Sign up](https://dash.deno.com/signin) for Deno Deploy.

2. [Create a new Deno Deploy project](https://dash.deno.com/new) for this app.

3. Replace `<your deno deploy project>` in the `deploy` script in `package.json`
   with your Deno Deploy project name:

   ```json
   {
     "scripts": {
       "deploy": "deployctl deploy --project=<your deno deploy project> --include=.cache,build,public ./build/index.js"
     }
   }
   ```

4. [Create a personal access token](https://dash.deno.com/account) for the Deno
   Deploy API and export it as `DENO_DEPLOY_TOKEN`:

   ```sh
   export DENO_DEPLOY_TOKEN=<your Deno Deploy API token>
   ```

   You may want to add this to your `rc` file (e.g. `.bashrc` or `.zshrc`) to
   make it available for new terminal sessions, but make sure you don't commit
   this token into `git`. If you want to use this token in GitHub Actions, set
   it as a GitHub secret.

5. Install the Deno Deploy CLI,
   [`deployctl`](https://github.com/denoland/deployctl):

   ```sh
   deno install --allow-read --allow-write --allow-env --allow-net --allow-run --no-check -r -f https://deno.land/x/deploy/deployctl.ts
   ```

6. If you have previously installed the Deno Deploy CLI, you should update it to
   the latest version:

```sh
deployctl upgrade
```

### Deploying to Deno Deploy

After you've set up Deno Deploy, run:

```sh
npm run deploy
```

## Useful resources

### How to use FontAwesome in the project

1. Search [FontAwesome Icons](https://fontawesome.com/icons)
2. Include the icons in the
   [senarai](https://fontawesome.com/kits/5899c9809d/icons) icon kit. (please
   ask @zainfathoni to do it for you)
3. Upload the new SVG sprites to the `/public/images/` directory
4. Use the `<Icon />` component and pass the icon set and id as props

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
