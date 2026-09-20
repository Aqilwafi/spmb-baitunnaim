// packages/auth/src/services/authLogger.ts

import "server-only";
import { supabaseAdmin } from "@bn/supabase/admin";
import type { BaseLoggerParams } from "@bn/types";

// Tambahkan <T = Record<string, any>> di sini agar mendukung generic
export async function activityLogger<T = Record<string, any>>({
  userId = null,
  event,
  status,
  metadata,
}: BaseLoggerParams<T>): Promise<void> {
  try {
    const { error } = await supabaseAdmin.from("activity_logs").insert({
      user_id: userId,
      event,
      status,
      metadata: metadata || {},
    });

    if (error) {
      console.error("Gagal mencatat activity log:", error.message);
    }
  } catch (err) {
    console.error("AuthLogger crash:", err);
  }
}