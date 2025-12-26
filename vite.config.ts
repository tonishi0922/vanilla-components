import { defineConfig } from "vite";

export default defineConfig({
  build: {
    cssCodeSplit: true,
    lib: {
      entry: {
        index: "src/index.ts",
        styles: "src/styles.css",
      },
      formats: ["es"],
      fileName: (_, name) => `${name}.js`,
    },
    rollupOptions: {
      output: {
        assetFileNames: "[name][extname]",
      },
    },
  },
});
