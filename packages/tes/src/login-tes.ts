// ./tes/run-login.ts
import "dotenv/config";

import { createSupabaseTesting } from "@bn/supabase";
import { loginSchema } from "@bn/validators";

type TestingAccount = {
  name: string;
  email?: string;
  password?: string;
};

/* -------------------------------------------------------------------------- */
/*                                   CONFIG                                   */
/* -------------------------------------------------------------------------- */

const ONLY_TEST: string | null = null;
// Contoh:
// const ONLY_TEST = "Administrator";
// const ONLY_TEST = "Pendaftar";
// const ONLY_TEST = "Multi Role";
// const ONLY_TEST = null; // Jalankan semua akun

const MAX_RETRY = 2;
const RETRY_DELAY_MS = 1_000;
const ACCOUNT_DELAY_MS = 500;

/* -------------------------------------------------------------------------- */

const testingAccounts: TestingAccount[] = [
  {
    name: "Administrator",
    email: process.env.EMAIL_TESTING_ADMINISTRATOR,
    password: process.env.PASSWORD_TESTING_ADMINISTRATOR,
  },
  {
    name: "Pendaftar",
    email: process.env.EMAIL_TESTING_PENDAFTAR,
    password: process.env.PASSWORD_TESTING_PENDAFTAR,
  },
  {
    name: "Multi Role",
    email: process.env.EMAIL_TESTING_MULTI_ROLE,
    password: process.env.PASSWORD_TESTING_MULTI_ROLE,
  },
];

const sleep = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

async function testLogin(account: TestingAccount) {
  console.log("\n======================================");
  console.log(`🧪 Testing: ${account.name}`);
  console.log("======================================");

  const validated = loginSchema.safeParse({
    email: account.email,
    password: account.password,
  });

  if (!validated.success) {
    throw new Error(
      JSON.stringify(validated.error.flatten().fieldErrors, null, 2)
    );
  }

  const supabase = await createSupabaseTesting();

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: validated.data.email,
      password: validated.data.password,
    });

    if (error) {
      throw error;
    }

    console.log("✅ Login:", data.user?.email);

    const session = await supabase.auth.getSession();
    const user = await supabase.auth.getUser();
    const claims = await supabase.auth.getClaims();

    console.log("\n🎫 SESSION");
    console.dir(session.data.session, { depth: 1 });

    console.log("\n👤 USER");
    console.dir(user.data.user, { depth: 2 });

    console.log("\n🔐 CLAIMS");
    console.dir(claims.data?.claims ?? claims, { depth: null });
  } finally {
    await supabase.auth.signOut().catch(() => {});
  }
}

async function jalankanTesLogin() {
  console.log("🚀 Memulai tes login...\n");

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

        await testLogin(account);

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

  console.log("\n🎉 Semua pengujian selesai.");
}

jalankanTesLogin().catch(console.error);