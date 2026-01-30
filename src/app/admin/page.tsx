import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const supabase = await createClient();

  // Demo mode - show demo admin with mock data
  if (!supabase) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-900 px-4 text-center">
        <h1 className="text-2xl font-bold text-white">デモモード</h1>
        <p className="mt-2 text-zinc-400">
          Supabase環境変数が設定されていないため、管理パネルは利用できません。
        </p>
        <p className="mt-4 text-sm text-zinc-500">
          `.env.local` に以下を設定してください:
        </p>
        <pre className="mt-2 rounded-lg bg-zinc-800 p-4 text-left text-xs text-zinc-300">
          {`NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key`}
        </pre>
        <Link
          href="/demo"
          className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-500"
        >
          デモページを見る
        </Link>
      </div>
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch user's profile and links
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // Auto-create profile if not exists (Self-healing)
  let currentProfile = profile;
  if (!currentProfile) {
    const baseName = user.email ? user.email.split("@")[0] : "user";
    // Remove invalid characters for username
    const safeName = baseName.replace(/[^a-zA-Z0-9_-]/g, "");
    const uniqueUsername = `${safeName}-${user.id.substring(0, 8)}`;

    const { data: newProfile, error: createError } = await supabase
      .from("profiles")
      .insert({
        id: user.id,
        username: uniqueUsername,
        full_name: "ゲストユーザー",
        theme_config: { textColor: "#ffffff", wallpaper: "" },
      } as any)
      .select()
      .single();

    if (createError) {
      console.error("Failed to auto-create profile:", createError);
      // If creation fails (e.g. conflict), we might want to handle it or just let the dashboard load with null
      // But LinkManager needs a profile to exist for foreign key.
      // For now, allow valid dashboard rendering, but warn user.
    } else {
      currentProfile = newProfile;
    }
  }

  const { data: links } = await supabase
    .from("links")
    .select("*")
    .eq("user_id", user.id)
    .order("sort_order", { ascending: true });

  return (
    <AdminDashboard
      user={user}
      initialProfile={currentProfile || profile}
      initialLinks={links || []}
    />
  );
}
