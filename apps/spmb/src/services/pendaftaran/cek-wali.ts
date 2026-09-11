import "server-only";
import { createSupabaseServer } from "@bn/supabase";

export async function checkWaliRequirement(formId: string): Promise<boolean> {
  const supabase = await createSupabaseServer();
  
  const { data, error } = await supabase.rpc("fn_rpc_is_guardian_required", {
    p_form_id: formId,
  });

  if (error) {
    console.error("Error checking guardian requirement:", error.message);
    return false; // Fallback aman
  }

  return Boolean(data);
}