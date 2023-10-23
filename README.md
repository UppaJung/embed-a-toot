# Embed-a-toot

The embed-a-toot page hosted at https://uppajung.github.io/embed-a-toot

### Building

```bash
npm run build
```

This will first build step uses esbuild to build the javascript code that updates the contents and counters of embedded toots. It starts from `src/updateEmbeddedPostsOnLoad.ts` and generates compiled scripts in the `/public` directory. That directory is ignored by `.gitignore`, but the second step (vite) will copy the public directory into the dist directory.

The second step uses vite to generate the embed-a-toot webpage. It starts from `index.html`.

