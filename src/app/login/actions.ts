"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

import { Database } from "@/lib/types/schema";
import { SupabaseClient } from "@supabase/supabase-js";

export async function signupAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "メールアドレスとパスワードは必須です" };
  }

  try {
    const supabaseAdmin = createAdminClient() as SupabaseClient<Database>;

    // Admin client to create user without confirmation
    // Admin client to create user without confirmation
    const { data: userData, error: createError } =
      await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });

    if (createError) throw createError;
    if (!userData.user)
      throw new Error("ユーザー作成に失敗しました (User data missing)");

    // Create Profile manually (since triggers are not reliable here)
    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      // @ts-ignore
      .insert([
        {
          id: userData.user.id,
          username:
            email.split("@")[0] + "_" + Math.floor(Math.random() * 10000),
          created_at: new Date().toISOString(),
        },
      ]);

    if (profileError) throw profileError;

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
