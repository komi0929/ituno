
import { AdminDashboard } from "@/components/admin/AdminDashboard"
import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function AdminPage() {
  const supabase = await createClient()

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
    )
  }

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Fetch user's profile and links
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  const { data: links } = await supabase
    .from("links")
    .select("*")
    .eq("user_id", user.id)
    .order("sort_order", { ascending: true })

  return (
    <AdminDashboard
      user={user}
      initialProfile={profile}
      initialLinks={links || []}
    />
  )
}
