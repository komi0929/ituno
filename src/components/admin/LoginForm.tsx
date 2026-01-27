"use client";

import { signupAction } from "@/app/login/actions";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface LoginFormProps {
  disabled?: boolean;
}

export function LoginForm({ disabled }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (disabled) return;

    const supabase = createClient();
    if (!supabase) {
      setError("Supabase が設定されていません");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        const result = await signupAction(formData);
        if (result.error) throw new Error(result.error);
      }
      router.push("/admin");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "認証に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      {error && (
        <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-zinc-300"
          >
            メールアドレス
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={disabled}
            className="mt-1 block w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-3 text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-zinc-300"
          >
            パスワード
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            disabled={disabled}
            className="mt-1 block w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-3 text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
            placeholder="••••••••"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading || disabled}
        className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 font-semibold text-white transition-all hover:from-blue-500 hover:to-purple-500 disabled:opacity-50"
      >
        {isLoading
          ? "処理中..."
          : mode === "login"
            ? "ログイン"
            : "アカウント作成"}
      </button>

      <div className="text-center">
        <button
          type="button"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          disabled={disabled}
          className="text-sm text-zinc-400 hover:text-white disabled:opacity-50"
        >
          {mode === "login"
            ? "アカウントを作成する"
            : "既にアカウントをお持ちですか？"}
        </button>
      </div>
    </form>
  );
}
