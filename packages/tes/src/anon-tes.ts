import "dotenv/config";

import { createSupabaseTesting } from "@bn/supabase";

const anonTables = [
  { name: "master_roles", allow: false },
  { name: "master_lembaga", allow: false },
  { name: "master_kelas", allow: false },
  { name: "master_tahun_ajaran", allow: false },
  { name: "master_step", allow: false },
  { name: "master_tipe_dokumen", allow: false },
  { name: "master_status_rumah", allow: false },
  { name: "master_tinggal_bersama", allow: false },
  { name: "master_categories", allow: true },
  { name: "profiles", allow: false },
  { name: "user_roles", allow: false },
] as const;

async function testAnon() {
  console.log("🚀 Testing ANON access...\n");

  const supabase = await createSupabaseTesting();

  for (const table of anonTables) {
    const { data, error } = await supabase
      .from(table.name)
      .select("*");

    if (error) {
      if (table.allow) {
        console.log(`❌ ${table.name}: SHOULD be accessible`);
      } else {
        console.log(`✅ ${table.name}: blocked`);
      }

      console.log(`   ${error.message}`);
      continue;
    }

    if (table.allow) {
        console.log(`✅ ${table.name}: ${data.length} rows accessible`);
    } else {
        if (data.length > 0) {
            console.log(`🚨 ${table.name}: DATA LEAK (${data.length} rows visible)`);
        } else {
            console.log(`❕ ${table.name}: blocked (0 rows)`);
        }
    }
  }

  console.log("\n🎉 Anon test selesai.");
}

testAnon();