# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## TODO

We use Lerna to version and publish monorepo packages. However, we are mirroring the project on GitLab and GitHub.

Presently, Lerna will `git push origin && git push origin --tags` after versioning. For completeness, we want it to:

```bash
git push gitlab && git push gitlab --tags && git push github && git push github --tags
```

Either:

1. Find a way to configure Lerna to do this automatically
2. Create a custom script utility to do this for us after versioning or publishing

It looks to me as though there is a way to configure the remote, however this must be a string and cannot be multiple remotes. This probably means we'll have to write a custom solution.

Alternatively, and especially given that having two remotes maintained is a bit of a faff when it comes to setting up developers... consider having just one true origin. GitHub makes the most sense in terms of popularity, but GitLab is a lot better for managing forks in the same namespace (which is a feature I need). Yeah, so maybe we do maintain both...

Maybe we just update it such that GitHub is the canonical origin, and make it an administrative chore to ensure that GitLab does mirror the GitHub repo state (inclusive of tags).

To achieve this we simply must update the origin remote such that it points to the GitHub repo and remember to run `git push gitlab && git push gitlab --tags` to update the mirror. Potentially we could do this from a GitHub action?

## Credits

- [Hero Patterns](https://heropatterns.com/) by Steve Schoger ([CC By 4.0](https://creativecommons.org/licenses/by/4.0/))
