import "server-only";
import { unstable_cache } from 'next/cache';
import { createSupabaseServer } from '@bn/supabase';
import { Database } from '@bn/types';

type TableName = keyof Database['public']['Tables'];

export async function getCachedMasterData<T, Table extends TableName>(
  tableName: Table,
  query: string,
  // Kita buat extraLogic lebih spesifik daripada 'any'
  extraLogic?: (queryBuilder: any) => any
): Promise<T> {

  const supabase = await createSupabaseServer();
  const fetcher = async (): Promise<T> => {
    let builder = supabase.from(tableName).select(query);

    if (extraLogic) {
      builder = extraLogic(builder);
    }

    const { data, error } = await builder;
    if (error) throw new Error(`Gagal mengambil ${tableName}: ${error.message}`);

    return data as T;
  };

  // tableName dipakai langsung sebagai cache key & tag — sebelumnya ada
  // parameter cacheKey terpisah yang di semua pemanggilan selalu diisi
  // sama persis dengan tableName, jadi dihapus supaya gak ada celah
  // orang passing key yang beda dari tabelnya (bikin cache miss/collision
  // yang membingungkan).
  const cachedFetcher = unstable_cache(fetcher, [tableName], { tags: [tableName], revalidate: false });

  return await cachedFetcher();
}