// // @/services//users.services.ts

// import "server-only";
// import type { AppSupabaseClient } from "@bn/supabase";
// import { Profile } from "@bn/types";

// export async function getFormPendaftaran(supabase: AppSupabaseClient): Promise<Profile[]> {

//   const { data: users, error } = await supabase
//     .from("form_pendaftaran")
//     .select("id, username")
   
//   if (error) {
//     throw new Error(
//       `Gagal mengambil data master kelas: ${error.message}`
//     );
//   }

//   return users as unknown as Profile[];
// }