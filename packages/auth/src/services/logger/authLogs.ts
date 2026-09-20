// packages/auth/src/services/authLogger.ts

import "server-only";
import { supabaseAdmin } from "@bn/supabase/admin";
import type { AuthActivityLogs } from "@bn/types";

interface AuthLoggerParams {
  userId?: string | null;
  event: string;
  status: "success" | "failed";
  metadata?: AuthActivityLogs;
}

export async function authLogger({
  userId = null,
  event,
  status,
  metadata,
}: AuthLoggerParams): Promise<void> {
  try {
    const { error } = await supabaseAdmin.from("activity_logs").insert({
      user_id: userId,
      event,
      status,
      metadata: metadata || {},
    });

    if (error) {
      // Catat ke console server saja, jangan throw error ke atas
      console.error("Gagal mencatat activity log:", error.message);
    }
  } catch (err) {
    // Menangkap error tak terduga (misal network loss total)
    console.error("AuthLogger crash:", err);
  }
}