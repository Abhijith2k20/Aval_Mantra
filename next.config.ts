import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The site is fully static, so it's exported to plain HTML/CSS/JS in `out/`
  // and served by Cloudflare Workers static assets (see wrangler.jsonc).
  output: "export",
  // No image-optimisation server in a static export; images are already sized WebP files.
  images: { unoptimized: true },
};

export default nextConfig;
