// ./tes/run-recovery.ts
import "dotenv/config";
import { z } from "zod"; // Menggunakan zod langsung atau import dari @bn/validators jika ada

import { createSupabaseTesting } from "@bn/supabase";

// Skema validator sederhana jika belum ada di @bn/validators
const recoverySchema = z.object({
  email: z.string().email(),
});

type TestingAccount = {
  name: string;
  email?: string;
};

/* -------------------------------------------------------------------------- */
/* CONFIG                                   */
/* -------------------------------------------------------------------------- */

const ONLY_TEST: string | null = null;
// Contoh:
// const ONLY_TEST = "Administrator";

const MAX_RETRY = 2;
const RETRY_DELAY_MS = 1_000;
const ACCOUNT_DELAY_MS = 500;

/* -------------------------------------------------------------------------- */

const testingAccounts: TestingAccount[] = [
  {
    name: "Administrator",
    email: process.env.EMAIL_TESTING_ADMINISTRATOR,
  },
  {
    name: "Pendaftar",
    email: process.env.EMAIL_TESTING_PENDAFTAR,
  },
  {
    name: "Multi Role",
    email: process.env.EMAIL_TESTING_MULTI_ROLE,
  },
];

const sleep = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

async function testRecovery(account: TestingAccount) {
  console.log("\n======================================");
  console.log(`🧪 Testing Recovery: ${account.name}`);
  console.log("======================================");

  const validated = recoverySchema.safeParse({
    email: account.email,
  });

  if (!validated.success) {
    throw new Error(
      JSON.stringify(validated.error.flatten().fieldErrors, null, 2)
    );
  }

  const supabase = await createSupabaseTesting();

  // Meminta Supabase mengirimkan email pemulihan/reset password
  const { data, error } = await supabase.auth.resetPasswordForEmail(
    validated.data.email,
    {
      // Mengarahkan user kembali ke halaman ganti password di web/app kamu setelah klik link
      redirectTo: process.env.PASSWORD_RESET_REDIRECT_URL || "http://localhost:3000/reset-password", 
    }
  );

  if (error) {
    throw error;
  }

  console.log(`✅ Recovery OTP/Link berhasil dikirim ke: ${validated.data.email}`);
  console.log("📝 RESPONSE DATA:");
  console.dir(data, { depth: null });
}

async function jalankanTesRecovery() {
  console.log("🚀 Memulai tes recovery password...\n");

  const accounts = ONLY_TEST
    ? testingAccounts.filter((account) => account.name === ONLY_TEST)
    : testingAccounts;

  if (accounts.length === 0) {
    console.warn(`⚠️ Akun "${ONLY_TEST}" tidak ditemukan.`);
    return;
  }

  for (const account of accounts) {
    let success = false;

    for (let attempt = 1; attempt <= MAX_RETRY + 1; attempt++) {
      try {
        if (attempt > 1) {
          console.log(
            `🔄 Retry ${attempt - 1}/${MAX_RETRY} (${account.name})...`
          );
        }

        await testRecovery(account);

        success = true;
        break;
      } catch (err) {
        console.error(
          `❌ ${account.name} (attempt ${attempt}/${MAX_RETRY + 1})`
        );
        console.error(err);

        if (attempt <= MAX_RETRY) {
          await sleep(RETRY_DELAY_MS);
        }
      }
    }

    if (!success) {
      console.error(
        `🚫 ${account.name} gagal setelah ${MAX_RETRY + 1} percobaan.`
      );
    }

    await sleep(ACCOUNT_DELAY_MS);
  }

  console.log("\n🎉 Semua pengujian recovery selesai.");
}

jalankanTesRecovery().catch(console.error);