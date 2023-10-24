import { build } from 'esbuild';
import packageJson from "./package.json" assert { type: "json" };
const version = packageJson.version;

console.log(`Building embedded javascript for version ${version}`);
await build({
  entryPoints: ['src/updateEmbeddedPostsOnLoad.ts'],
  outfile: "public/updated-embedded-posts.js",
  bundle: true,
  minify: true,
  sourcemap: true,
  target: ['chrome58', 'firefox57', 'safari11', 'edge18'],
  define: {
    '__VERSION__': `"${version}"`,
  },
});

await build({
  entryPoints: ['src/updateEmbeddedPostsOnLoad.ts'],
  outfile: "public/updated-embedded-posts-debug.js",
  bundle: true,
  minify: false,
  sourcemap: true,
  target: ['chrome58', 'firefox57', 'safari11', 'edge18'],
  define: {
    '__VERSION__': `"${version}"`,
  },
});