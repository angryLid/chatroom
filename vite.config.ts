import react from "@vitejs/plugin-react";
import visualizer from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
const plugins = [];

if (process.env.NODE_ENV === "production") {
  plugins.push(
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    })
  );
}
export default defineConfig({
  plugins: [react(), ...plugins],
  server: {
    port: 5669,
  },
  build: {
    target: "esnext",
  },
});
