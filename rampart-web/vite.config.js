import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    wasm(),
    topLevelAwait(),
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "node_modules/tree-sitter-rampart/tree-sitter-rampart.wasm",
          dest: "",
        },
        {
          src: "node_modules/web-tree-sitter/tree-sitter.wasm",
          dest: "",
        },
      ],
    }),
  ],
});
