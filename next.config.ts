import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["localhost:3333"],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "goodlifemeds.b-cdn.net",
      },
    ],
  },
  async redirects() {
    // All old product stub pages redirect to /products/elza
    const oldProducts = [
      "tirzepatide", "semaglutide", "oral-tirzepatide", "wegovy-pill",
      "wegovy", "ozempic", "zepbound", "mounjaro", "mic-b12",
      "vitamin-b12", "glutathione", "slim-shot", "sermorelin",
      "nad", "nad-nasal-spray", "microdose-glp-1", "ignite-strips",
      "bliss-strips", "generic-viagra", "cialis", "viagra",
      "tidalafil-generic-cialis", "hair-regrowth-for-men",
      "hair-regrowth-for-women", "oral-minoxidil",
      "finasteride-generic-propecia",
    ];

    return oldProducts.map((slug) => ({
      source: `/products/${slug}`,
      destination: "/products/elza",
      permanent: true,
    }));
  },
};

export default nextConfig;
