
"use client"

import { createClient } from "@/lib/supabase/client"
import { Database } from "@/lib/types/schema"
import { Loader2, Save } from "lucide-react"
import { useEffect, useState } from "react"

type Profile = Database["public"]["Tables"]["profiles"]["Row"]

interface ProfileEditorProps {
  userId: string
  profile: Profile | null
  onProfileChange: (profile: Profile) => void
}

export function ProfileEditor({ userId, profile, onProfileChange }: ProfileEditorProps) {
  const [formData, setFormData] = useState({
    username: profile?.username || "",
    full_name: profile?.full_name || "",
    bio: profile?.bio || "",
    avatar_url: profile?.avatar_url || "",
    wallpaper: (profile?.theme_config as any)?.wallpaper || "",
  })
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const supabase = createClient()

  const handleSave = async () => {
    setIsSaving(true)
    setMessage(null)

    try {
      const profileData = {
        id: userId,
        username: formData.username,
        full_name: formData.full_name,
        bio: formData.bio,
        avatar_url: formData.avatar_url,
        theme_config: {
          wallpaper: formData.wallpaper,
          textColor: "#ffffff",
        },
      }

      const { data, error } = await supabase
        .from("profiles")
        .upsert(profileData as any)
        .select()
        .single()

      if (error) throw error

      if (data) onProfileChange(data as Profile)
      setMessage({ type: "success", text: "保存しました" })
    } catch (err: unknown) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "保存に失敗しました" })
    } finally {
      setIsSaving(false)
    }
  }

  // Real-time preview update
  useEffect(() => {
    if (profile) {
      onProfileChange({
        ...profile,
        username: formData.username,
        full_name: formData.full_name,
        bio: formData.bio,
        avatar_url: formData.avatar_url,
        theme_config: { wallpaper: formData.wallpaper, textColor: "#ffffff" },
      })
    }
  }, [formData])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">プロフィール編集</h2>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-500 disabled:opacity-50"
        >
          {isSaving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          保存
        </button>
      </div>

      {message && (
        <div
          className={`rounded-lg p-3 text-sm ${
            message.type === "success"
              ? "bg-green-500/10 text-green-400"
              : "bg-red-500/10 text-red-400"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-300">
            ユーザー名 (URL: domain.com/<span className="text-blue-400">{formData.username || "username"}</span>)
          </label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className="mt-1 block w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-3 text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none"
            placeholder="myusername"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300">表示名</label>
          <input
            type="text"
            value={formData.full_name}
            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
            className="mt-1 block w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-3 text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none"
            placeholder="田中 太郎"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300">自己紹介</label>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            rows={3}
            className="mt-1 block w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-3 text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none"
            placeholder="クリエイター / デザイナー"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300">アバター画像URL</label>
          <input
            type="url"
            value={formData.avatar_url}
            onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
            className="mt-1 block w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-3 text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none"
            placeholder="https://example.com/avatar.jpg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300">壁紙画像URL</label>
          <input
            type="url"
            value={formData.wallpaper}
            onChange={(e) => setFormData({ ...formData, wallpaper: e.target.value })}
            className="mt-1 block w-full rounded-lg border border-zinc-700 bg-zinc-800/50 px-4 py-3 text-white placeholder-zinc-500 focus:border-blue-500 focus:outline-none"
            placeholder="https://images.unsplash.com/..."
          />
        </div>
      </div>
    </div>
  )
}
