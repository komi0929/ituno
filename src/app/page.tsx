import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 px-4">
      <div className="text-center">
        <h1 className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-6xl font-bold tracking-tight text-transparent">
          itone
        </h1>
        <p className="mt-4 text-xl text-zinc-400">
          iOS風ポートフォリオをあなたの手で
        </p>
        <p className="mt-2 text-sm text-zinc-500">
          ドラッグ＆ドロップで簡単編集。プロフィールをシェアしよう。
        </p>
      </div>

      <div className="mt-10 flex gap-4">
        <Link
          href="/demo"
          className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:from-blue-500 hover:to-purple-500"
        >
          デモを見る
        </Link>
        <Link
          href="/login"
          className="rounded-xl border border-zinc-700 bg-zinc-800/50 px-8 py-4 font-semibold text-white shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:bg-zinc-700"
        >
          ログイン
        </Link>
      </div>

      <footer className="absolute bottom-8 flex flex-col items-center gap-4 text-sm text-zinc-600">
        <div className="flex gap-6">
          <Link href="/terms" className="hover:text-zinc-400 transition-colors">
            利用規約
          </Link>
          <Link
            href="/privacy"
            className="hover:text-zinc-400 transition-colors"
          >
            プライバシーポリシー
          </Link>
        </div>
        <p>Built with Next.js 16 + Supabase + Tailwind CSS</p>
      </footer>
    </div>
  );
}
