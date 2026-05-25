/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  transpilePackages: [
    "@bn/ui",
    "@bn/supabase",
    "@bn/utils",
    "@bn/validators",
  ],
};

export default nextConfig;