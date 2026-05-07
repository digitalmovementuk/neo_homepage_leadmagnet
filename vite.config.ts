import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Deployed on Vercel — base path stays "/" so /api/* serverless functions
// resolve correctly. Dev port 5190 to match the existing local workflow.
export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    port: 5190,
    host: true,
    strictPort: false,
  },
});
