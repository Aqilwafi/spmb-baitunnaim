// ./tes/src/register-test.ts
import { createSupabaseTesting } from "@bn/supabase";
import { registerSchema } from "@bn/validators";

type TestingAccount = {
  name: string;
  email: string;
  username: string;
  password: string;
  confirm_password: string;
};

const testingAccounts: TestingAccount[] = [
  {
    name: "Pendaftar 2",
    email: "tuanmudamaw@gmail.com",
    username: "testing002",
    password: "TESTINGpendaftar2@969",
    confirm_password: "TESTINGpendaftar2@969",
  },
];

async function testRegister(account: TestingAccount) {
  console.log("\n======================================");
  console.log(`🧪 Testing Register: ${account.name}`);
  console.log("======================================");

  const validated = registerSchema.safeParse(account);

  if (!validated.success) {
    console.error("❌ Validasi gagal");
    console.dir(validated.error.flatten().fieldErrors);
    return;
  }

  const supabase = await createSupabaseTesting();

  const { data, error } = await supabase.auth.signUp({
    email: validated.data.email,
    password: validated.data.password,
    options: {
      data: {
        username: validated.data.username,
      },
    },
  });

  if (error) {
    console.error("❌ Register gagal:", error.message);
    return;
  }

  console.log("✅ Register berhasil");
  console.log("Email :", data.user?.email);
  console.log("UserID:", data.user?.id);

  if (data.session) {
    console.log("🎫 Session langsung dibuat.");
  } else {
    console.log("📧 Menunggu verifikasi email.");
  }
}

async function jalankanTesRegister() {
  console.log("🚀 Memulai tes registrasi...\n");

  for (const account of testingAccounts) {
    try {
      await testRegister(account);
    } catch (err) {
      console.error(`❌ ${account.name}:`, err);
    }
  }

  console.log("\n🎉 Semua pengujian selesai.");
}

jalankanTesRegister().catch(console.error);