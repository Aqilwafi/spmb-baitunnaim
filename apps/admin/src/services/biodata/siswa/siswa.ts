import "server-only";
import { createSupabaseServer } from "@bn/supabase/server";
import { Profiles } from "@bn/types";

interface ListEmailPemilikDataSiswa {
  id: Profiles['id'];
  email: Profiles['email'];
}

export async function getEmailPemilikDataSiswa(ownerIds: string[]): Promise<ListEmailPemilikDataSiswa[]> {
  // Guard clause: Jika array ID kosong, langsung return array kosong tanpa query ke DB
  if (!ownerIds || ownerIds.length === 0) {
    return [];
  }

  const supabase = await createSupabaseServer();

  const { data, error } = await supabase
    .from('profiles')
    .select('id, email')
    .in('id', ownerIds);

  if (error) throw error;
  if (!data) return [];

  // Mapping hasil query ke interface ListEmailPemilikDataSiswa
  return data.map((item) => ({
    id: item.id,
    email: item.email,
  }));
}