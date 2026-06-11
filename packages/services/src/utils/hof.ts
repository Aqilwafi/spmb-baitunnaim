import "server-only";
import { unstable_cache } from 'next/cache';
import { AppSupabaseClient } from '@bn/supabase';
import { Database } from '@bn/types';

type TableName = keyof Database['public']['Tables'];

export async function getCachedMasterData<T, Table extends TableName>(
  supabase: AppSupabaseClient,
  tableName: Table,
  query: string,
  cacheKey: string,
  // Kita buat extraLogic lebih spesifik daripada 'any'
  extraLogic?: (queryBuilder: any) => any 
): Promise<T> {
  
  const fetcher = async (): Promise<T> => {
    let builder = supabase.from(tableName).select(query);
    
    if (extraLogic) {
      builder = extraLogic(builder);
    }

    const { data, error } = await builder;
    if (error) throw new Error(`Gagal mengambil ${tableName}: ${error.message}`);
    
    return data as T;
  };

  const cachedFetcher  = unstable_cache( fetcher, [cacheKey],{ tags: [cacheKey], revalidate: false } );

  return await cachedFetcher();

}