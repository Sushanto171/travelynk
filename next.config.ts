import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // reactCompiler: true,
    images: {
    remotePatterns: [new URL('http://res.cloudinary.com/drxi0wuoa/image/upload/v1764849121/travelynk/**'),new URL('https://res.cloudinary.com/drxi0wuoa/image/upload/v1764849121/travelynk/**')],
  },

    }


export default nextConfig;
