// apps/admin/src/actions/auth/users.actions.ts

"use server";
import {supabaseAdmin} from '@bn/supabase/admin'
import { createSupabaseServer } from "@bn/supabase";
import { redirect } from "next/navigation";

export async function inviteAdminAction(
  prevState: unknown,
  formData: FormData
) {
  const email = formData.get("email")?.toString();

  if (!email) {
    return {
      success: false,
      message: "Email wajib diisi",
    };
  }

  const { error } =
    await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_ADMIN_URL}/auth/callback`,
    });

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    message: "Invite admin berhasil dikirim",
  };
}

export async function setPasswordAction(
  prevState: unknown,
  formData: FormData
) {
  const password =
    formData.get("password")?.toString();

  const username =
    formData.get("username")?.toString();

  if (!password) {
    return {
      message: "Password wajib diisi",
    };
  }

  const supabase = await createSupabaseServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      message: "Unauthorized",
    };
  }

  const { error } =
    await supabase.auth.updateUser({
      password,
      data: {
        username,
      },
    });

  if (error) {
    return {
      message: error.message,
    };
  }

  redirect("/dashboard");
}