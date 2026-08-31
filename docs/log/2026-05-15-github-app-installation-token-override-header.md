## GitHub App Installation Token override header (2026-05-15 changelog)

On May 15, 2026 GitHub announced a temporary header for GitHub App installation access tokens:

- Endpoint: `POST /app/installations/:installation_id/access_tokens`
- Header: `X-GitHub-Stateless-S2S-Token`
  - `enabled` → always returns a stateless `ghs_` JWT-style token
  - `disabled` → forces classic stateful token
  - missing/invalid value → normal rollout behavior

This lets maintainers test both token formats while rollout is in progress.

## Repo impact (senar-ai/web)

This repo’s workflows only use:

- `actions/checkout@v3`
- Node setup
- `npm run build`/`npm run lint`
- `denoland/deployctl` to deploy the build artifact

There is no code path that calls
`POST /app/installations/:installation_id/access_tokens`, no GitHub App authentication
logic, and no `X-GitHub-Stateless-S2S-Token` handling. No code changes are
required now.

## What to watch for later

- If this repo (or a script in CI/local tooling) starts using GitHub App
  installation tokens, validate both token formats:
  - JWT format (`ghs_...`, two dots, longer length)
  - legacy opaque format (short, no dots)
- Remove any temporary override header once both formats are confirmed; GitHub’s
  rollout will handle token format automatically.
- This article only affects GitHub Enterprise Cloud and Data Residency; Enterprise
  Server is not impacted.

## Local auth note

If you cannot access `senar-ai/web` with the GitHub CLI, switch identity:

```sh
gh auth switch --user zainfathoni
gh auth status
gh repo view senar-ai/web
```

Source: [GitHub changelog post](https://github.blog/changelog/2026-05-15-github-app-installation-tokens-per-request-override-header/).
