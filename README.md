# Remix + Deno
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Welcome to the Deno template for Remix! 🦕

For more, check out the [Remix docs](https://remix.run/docs).

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

### Useful resources

#### How to use FontAwesome in the project

1. Search [FontAwesome Icons](https://fontawesome.com/icons)
2. Download the SVG code (if it's a Pro icon, please ask @zainfathoni to
   download it for you)
3. Paste the SVG code into the `SVG INPUT` panel of
   [SVGR with these params](https://react-svgr.com/playground/?svgProps=role%3Dimg%2Cfill%3DcurrentColor&typescript=true)
4. Copy the resulting `<svg>` tag in the `JSX OUTPUT` panel
5. Paste the `<svg>` tag into the corresponding file under the
   [icons](/app/icons/) directory

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://zainf.dev"><img src="https://avatars.githubusercontent.com/u/6315466?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Zain Fathoni</b></sub></a><br /><a href="https://github.com/senar-ai/web/commits?author=zainfathoni" title="Code">💻</a> <a href="https://github.com/senar-ai/web/commits?author=zainfathoni" title="Documentation">📖</a> <a href="#design-zainfathoni" title="Design">🎨</a> <a href="#infra-zainfathoni" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-zainfathoni" title="Maintenance">🚧</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!