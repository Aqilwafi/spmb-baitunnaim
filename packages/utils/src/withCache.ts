// packages/utils/src/withCache.ts — HOF murni, cuma soal caching
import { unstable_cache } from 'next/cache';

export function withCache<T>(
  fetcher: () => Promise<T>,
  key: string[],
  tags: string[]
): () => Promise<T> {
  return unstable_cache(fetcher, key, { tags, revalidate: false });
}