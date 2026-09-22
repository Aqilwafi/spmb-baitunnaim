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