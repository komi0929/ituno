"use client";

import { ImageUploader } from "@/components/admin/ImageUploader";
import { createClient } from "@/lib/supabase/client";
import { Database } from "@/lib/types/schema";
import { Loader2, Save } from "lucide-react";
import { useEffect, useState } from "react";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

interface ProfileEditorProps {
  userId: string;
  profile: Profile | null;
  onProfileChange: (profile: Profile) => void;
}

export function ProfileEditor({
  userId,
  profile,
  onProfileChange,
}: ProfileEditorProps) {
  const [formData, setFormData] = useState({
    username: profile?.username || "",
    full_name: profile?.full_name || "",
    bio: profile?.bio || "",
    avatar_url: profile?.avatar_url || "",
    wallpaper: (profile?.theme_config as any)?.wallpaper || "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const supabase = createClient();

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);

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
      };

      const { data, error } = await supabase
        .from("profiles")
        .upsert(profileData as any)
        .select()
        .single();

      if (error) throw error;

      if (data) onProfileChange(data as Profile);
      setMessage({ type: "success", text: "変更を保存しました" });

      // Auto-hide success message
      setTimeout(() => setMessage(null), 3000);
    } catch (err: unknown) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "保存に失敗しました",
      });
    } finally {
      setIsSaving(false);
    }
  };

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
      });
    }
  }, [formData]);

  return (
    <div className="mx-auto max-w-2xl space-y-10 py-4">
      {/* Header Section */}
      <div className="flex items-end justify-between border-b border-zinc-800 pb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            プロフィール設定
          </h2>
          <p className="mt-1 text-sm text-zinc-400">
            一般公開されるポートフォリオの見た目をカスタマイズします。
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-black transition-all hover:bg-zinc-200 disabled:opacity-50"
        >
          {isSaving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          変更を保存
        </button>
      </div>

      {message && (
        <div
          className={`rounded-xl p-4 text-sm font-medium animate-in fade-in slide-in-from-top-2 ${
            message.type === "success"
              ? "bg-emerald-500/10 text-emerald-400"
              : "bg-red-500/10 text-red-400"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="grid gap-12">
        {/* Basic Info Section */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-white">基本情報</h3>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="col-span-2 sm:col-span-1">
              <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-500">
                ユーザーID (URL)
              </label>
              <div className="flex rounded-lg bg-zinc-800/50 ring-1 ring-zinc-700 focus-within:ring-2 focus-within:ring-blue-500">
                <span className="flex items-center pl-4 text-sm text-zinc-500">
                  itone.app/
                </span>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className="block w-full bg-transparent px-1 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none"
                  placeholder="username"
                />
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-500">
                表示名
              </label>
              <input
                type="text"
                value={formData.full_name}
                onChange={(e) =>
                  setFormData({ ...formData, full_name: e.target.value })
                }
                className="block w-full rounded-lg bg-zinc-800/50 px-4 py-3 text-sm text-white placeholder-zinc-600 ring-1 ring-zinc-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="例: 山田 太郎"
              />
            </div>

            <div className="col-span-2">
              <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-zinc-500">
                自己紹介
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                rows={3}
                className="block w-full rounded-lg bg-zinc-800/50 px-4 py-3 text-sm text-white placeholder-zinc-600 ring-1 ring-zinc-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="あなたのことについて短く教えてください..."
              />
            </div>
          </div>
        </section>

        <hr className="border-zinc-800" />

        {/* Visuals Section */}
        <section className="space-y-6">
          <h3 className="text-lg font-semibold text-white">ビジュアル</h3>

          <div className="grid gap-8 sm:grid-cols-2">
            {/* Avatar Upload */}
            <div>
              <ImageUploader
                label="アバター画像"
                value={formData.avatar_url}
                onChange={(url) =>
                  setFormData({ ...formData, avatar_url: url })
                }
                aspectRatio="square"
              />
              <p className="mt-2 text-xs text-zinc-500">
                正方形の画像（1:1）が推奨されます。
              </p>
            </div>

            {/* Wallpaper Upload */}
            <div>
              <ImageUploader
                label="壁紙 (背景)"
                value={formData.wallpaper}
                onChange={(url) => setFormData({ ...formData, wallpaper: url })}
                aspectRatio="video" // Approximate phone screen ratio handling
              />
              <p className="mt-2 text-xs text-zinc-500">
                スマートフォンの縦長比率にフィットするように表示されます。
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
