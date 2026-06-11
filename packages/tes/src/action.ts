// ./tes/run-login.ts
import { createSupabaseTesting } from "@bn/supabase";
import { loginSchema } from "@bn/validators";
import { getCurrentSession, getCurrentUser, getCurrentClaims } from "@bn/auth";

async function jalankanTesLogin() {
  console.log("🚀 Memulai tes koneksi Supabase Auth...");

  const dataInput = {
    email: "seblakpedas998@gmail.com",
    password: "Caramelwill3"
  };

  const validated = loginSchema.safeParse(dataInput);
  if (!validated.success) {
    console.error("❌ Validasi Zod Gagal:", validated.error.flatten().fieldErrors);
    return;
  }

  try {
    const supabase = await createSupabaseTesting();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: validated.data.email,
      password: validated.data.password,
    });

    if (error) {
      console.error("❌ Supabase Auth Menolak Login:", error.message);
      return;
    }
    console.log("✅ Login berhasil:", data.user?.email);

    try {
      // getCurrentSession() return Session | null, bukan { data, error }
      const session = await supabase.auth.getSession();
      if (!session) {
        console.error("❌ Gagal mengambil session");
        return;
      }
      console.log("\n🎫 [SESSION]");
      console.log(session);

      const user = await supabase.auth.getUser();
      if (!user) {
        console.error("❌ Gagal mengambil user");
        return;
      }
      console.log("\n👤 [USER]");
      console.log(user);

      const claims = await supabase.auth.getClaims();
      if (!claims) {
        console.error("❌ Gagal mengambil claims");
        return;
      }
      console.log("\n🔐 [CLAIMS]");
      console.log(claims);

    } catch (err) {
      console.error("❌ Terjadi error:", err);
    }

  } catch (err) {
    console.error("💥 Terjadi error fatal:", err);
  }
}

jalankanTesLogin();