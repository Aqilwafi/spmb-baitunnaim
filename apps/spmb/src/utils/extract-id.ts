// utils/extract-id.ts

export async function pickId<T extends { id: number | string }>(
  promise: Promise<T | null>
): Promise<T["id"] | null> {
  const result = await promise;
  return result?.id ?? null;
}