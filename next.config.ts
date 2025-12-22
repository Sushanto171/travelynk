import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    productionBrowserSourceMaps: false,
  /* config options here */
  // reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "res.cloudinary.com"
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com"
      },
    ]
  }
}


export default nextConfig;
