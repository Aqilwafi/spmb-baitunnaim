import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  transpilePackages: [
    "@bn/validators",
    "@bn/constants",
    "@bn/services",
    "@bn/supabase",
    "@bn/utils",
    "@bn/auth",
    "@bn/ui",
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rywammolujagaasauldp.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;