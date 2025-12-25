import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      name: "VanillaUI",
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      external: [],
    },
  },
});
