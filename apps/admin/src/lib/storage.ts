// import { createClient } from "@bn/supabase/client"; // Sesuaikan dengan workspace-mu

// export async function uploadPostImage(file: File): Promise<string> {
//   const supabase = createClient();
//   const fileExt = file.name.split(".").pop();
//   const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
//   const filePath = `articles/${fileName}`;

//   const { error } = await supabase.storage
//     .from("posts") // Pastikan bucket 'posts' sudah dibuat di Supabase Storage
//     .upload(filePath, file, { cacheControl: "3600", upsert: false });

//   if (error) throw new Error(`Upload gagal: ${error.message}`);

//   const { data } = supabase.storage.from("posts").getPublicUrl(filePath);
//   return data.publicUrl;
// }