/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  transpilePackages: [
    "@bn/ui",
    "@bn/supabase",
    "@bn/auth",
    "@bn/validators",
    "@bn/services",
    "@bn/utils"
  ],
};

export default nextConfig;