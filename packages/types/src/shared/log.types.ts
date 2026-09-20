export type BaseLoggerParams<T = Record<string, any>> = {
  userId?: string | null;
  event: string;
  status: "success" | "failed";
  metadata?: T;
};