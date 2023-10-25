import { build } from 'esbuild';
import { unlinkSync } from "fs"
// @ts-ignore
import packageJson from "./package.json" assert { type: "json" };

const version = packageJson.version;

console.log(`Building embedded javascript for version ${version}`);
/**
 * Build style-sheets
 */
await build({
  entryPoints: ['src/buildStyleSheetFiles.ts'],
  outfile: "public/buildStyleSheetFiles.cjs",
  bundle: true,
  minify: false,
  sourcemap: false,
  platform: "node",
  target: ['node19'],
});

/**
 * Build the embedded script that updates posts
 */
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