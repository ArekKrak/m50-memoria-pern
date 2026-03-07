import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./src/setupTests.js"
  }
});

// This essentially tells Vitest to use the React plugin, run tests in a browser-like environment, and load a setup file first