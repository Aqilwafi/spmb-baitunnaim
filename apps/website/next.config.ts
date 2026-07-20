/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  transpilePackages: [
    "@bn/ui",
    "@bn/supabase",
    "@bn/utils",
    "@bn/validators",
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