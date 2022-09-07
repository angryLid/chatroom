import visualizer from "rollup-plugin-visualizer";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import type { ManifestOptions, VitePWAOptions } from "vite-plugin-pwa";
// import { VitePWA } from "vite-plugin-pwa";

const pwaOptions: Partial<VitePWAOptions> = {
  mode: "development",
  base: "/",
  includeAssets: ["favicon.ico"],
  manifest: {
    name: "Clipboard",
    short_name: "Text and image transfer between desktop and mobile.",
    theme_color: "#ffffff",
    icons: [
      {
        src: "pwa-192x192.png", // <== don't add slash, for testing
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/pwa-512x512.png", // <== don't remove slash, for testing
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "pwa-512x512.png", // <== don't add slash, for testing
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
  },
  devOptions: {
    enabled: process.env.SW_DEV === "true",
    /* when using generateSW the PWA plugin will switch to classic */
    type: "module",
    navigateFallback: "index.html",
  },
};

const replaceOptions = { __DATE__: new Date().toISOString() };
const claims = process.env.CLAIMS === "true";
const reload = process.env.RELOAD_SW === "true";
const selfDestroying = process.env.SW_DESTROY === "true";

if (process.env.SW === "true") {
  pwaOptions.srcDir = "src";
  pwaOptions.filename = claims ? "claims-sw.ts" : "prompt-sw.ts";
  pwaOptions.strategies = "injectManifest";
  (pwaOptions.manifest as Partial<ManifestOptions>).name =
    "PWA Inject Manifest";
  (pwaOptions.manifest as Partial<ManifestOptions>).short_name = "PWA Inject";
}

if (claims) pwaOptions.registerType = "autoUpdate";

if (reload) {
  // @ts-expect-error just ignore
  replaceOptions.__RELOAD_SW__ = "true";
}

if (selfDestroying) pwaOptions.selfDestroying = selfDestroying;
const plugins =
  process.env.NODE_ENV === "production"
    ? [
        visualizer({
          open: true,
          gzipSize: true,
          brotliSize: true,
        }),
      ]
    : [];

import { resolve } from "path";
export default defineConfig({
  // plugins: [react(), VitePWA(pwaOptions), ...plugins],
  plugins: [react(), ...plugins],
  resolve: {
    alias: [{ find: "src", replacement: resolve(__dirname, "src") }],
  },
  server: {
    port: 5670,
  },
  build: {
    target: "esnext",
    sourcemap: process.env.SOURCE_MAP === "true",
  },
});
