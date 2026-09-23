import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

// Hanya baca file .env secara manual saat development lokal
if (process.env.NODE_ENV !== "production") {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // Membaca file .env di root monorepo (naik 2 level dari apps/admin/)
  dotenv.config({ path: path.resolve(__dirname, "../../.env") });
}

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