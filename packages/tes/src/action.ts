// ./tes/run-login.ts
import { createSupabaseTesting } from "@bn/supabase";
import { loginSchema } from "@bn/validators";

async function jalankanTesLogin() {
  console.log("🚀 Memulai tes koneksi Supabase Auth...");

  // 1. Data tiruan (ganti dengan akun asli di Supabase Anda)
  const dataInput = {
    email: "seblakpedas998@gmail.com",
    password: "Caramelwill3"
  };

  // 2. Validasi dengan Zod
  const validated = loginSchema.safeParse(dataInput);
  if (!validated.success) {
    console.error("❌ Validasi Zod Gagal:", validated.error.flatten().fieldErrors);
    return;
  }

  try {
    // 3. Hubungkan ke Supabase
    const supabase = await createSupabaseTesting();

    // 4. Hit API Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email: validated.data.email,
      password: validated.data.password,
    });

    if (error) {
      console.error("❌ Supabase Auth Menolak Login:", error.message);
      return;
    }


    // console.log("\n👤 [USER DATA]");
    // console.log(JSON.stringify(data.user, null, 2));

    // // Log data Session (Token, Refresh Token, dll) secara detail
    // console.log("\n🎫 [SESSION & TOKENS]");
    // console.log(JSON.stringify(data.session, null, 2));

    // 2. Tes Memanggil getClaims() untuk Verifikasi Token Lokal/Edge
    try {
      // Jika tidak memasukkan argumen jwt, dia otomatis mengambil access_token dari session aktif
      const { data: sessionData , error: errorSesson } = await supabase.auth.getSession();

      if (error) {
        console.error("❌ Gagal mengambil claims:", errorSesson?.message);
        return;
      }
      console.log("\n🎫 [SESSION]");
      console.log( sessionData.session?.user.app_metadata )

      const { data: userData , error: errorUser } = await supabase.auth.getUser();

      if (error) {
        console.error("❌ Gagal mengambil claims:", errorUser?.message);
        return;
      }
      console.log("\n🎫 [USER]");
      console.log( userData.user?.app_metadata )

      const { data: claimsData , error: errorClaims } = await supabase.auth.getClaims();

      if (error) {
        console.error("❌ Gagal mengambil claims:", errorClaims?.message);
        return;
      }
      console.log("\n🎫 [CLAIMS]");
      console.log( claimsData?.claims.app_metadata )


    } catch (err) {
        console.error("❌ Terjadi error saat mengeksekusi getClaims:", err);
    }
    
    

  } catch (err) {
    console.error("💥 Terjadi error fatal saat eksekusi:", err);
  }
}

jalankanTesLogin();