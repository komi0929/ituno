"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export async function signupAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "メールアドレスとパスワードは必須です" };
  }

  try {
    const supabaseAdmin = createAdminClient();

    // Admin client to create user without confirmation
    const { error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (createError) throw createError;

    // Regular server client to sign in the new user immediately
    const supabase = await createClient();
    if (!supabase) throw new Error("Supabase client not initialized");

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) throw signInError;

    return { success: true };
  } catch (error) {
    console.error("Signup Error:", error);
    return {
      error:
        error instanceof Error ? error.message : "アカウント作成に失敗しました",
    };
  }
}
