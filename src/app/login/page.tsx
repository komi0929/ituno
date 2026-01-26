
import { LoginForm } from "@/components/admin/LoginForm"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function LoginPage() {
  const supabase = await createClient()
  
  // If Supabase is configured, check for existing session
  if (supabase) {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      redirect("/admin")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white/5 p-8 backdrop-blur-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white">itone</h1>
          <p className="mt-2 text-sm text-zinc-400">ログインしてポートフォリオを編集</p>
        </div>
        
        {!supabase && (
          <div className="rounded-lg bg-yellow-500/10 p-4 text-sm text-yellow-400">
            <p className="font-medium">デモモード</p>
            <p className="mt-1 text-yellow-400/80">
              Supabase環境変数が設定されていません。<br />
              `.env.local` に設定してください。
            </p>
          </div>
        )}
        
        <LoginForm disabled={!supabase} />
      </div>
    </div>
  )
}
