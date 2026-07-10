import "dotenv/config";

import { createSupabaseTesting } from "@bn/supabase";
import { loginSchema } from "@bn/validators";

type TestingAccount = {
  name: string;
  email?: string;
  password?: string;
};

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

const masterTables = [
  "master_roles",
  "master_lembaga",
  "master_kelas",
  "master_tahun_ajaran",
  "master_step",
  "master_tipe_dokumen",
  "master_status_rumah",
  "master_tinggal_bersama",
  "master_categories",
] as const;

async function testSelectMaster(account: TestingAccount) {
  console.log("\n======================================");
  console.log(`🧪 Testing SELECT MASTER: ${account.name}`);
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
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email: validated.data.email,
      password: validated.data.password,
    });

    if (loginError) {
      throw loginError;
    }

    console.log(`✅ Login: ${account.name}`);

    for (const table of masterTables) {
      const { data, error } = await supabase
        .from(table)
        .select("*");

      if (error) {
        console.log(`❌ ${table}`);
        console.log(`   ${error.message}`);
        continue;
      }

      console.log(`✅ ${table} (${data.length} rows)`);
    }
  } finally {
    await supabase.auth.signOut().catch(() => {});
  }
}

async function main() {
  console.log("🚀 Memulai pengujian SELECT master...\n");

  for (const account of testingAccounts) {
    try {
      await testSelectMaster(account);
    } catch (err) {
      console.error(`❌ ${account.name}`);
      console.error(err);
    }

    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log("\n🎉 Semua pengujian selesai.");
}

main().catch(console.error);