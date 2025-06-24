import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        background: "src/background/index.ts",
      },
      // Use inlineDynamicImports to force a single chunk
      output: {
        inlineDynamicImports: true,
      },
    },
    outDir: "dist",
    emptyOutDir: true,
  },
});
