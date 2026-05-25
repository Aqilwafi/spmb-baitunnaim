/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@bn/ui",
    "@bn/supabase",
    "@bn/utils",
    "@bn/validators",
  ],
};

export default nextConfig;