
"use client"

import { createClient } from "@/lib/supabase/client"
import { Database } from "@/lib/types/schema"
import { User } from "@supabase/supabase-js"
import { Link as LinkIcon, LogOut, User as UserIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { LinkManager } from "./LinkManager"
import { LivePreview } from "./LivePreview"
import { ProfileEditor } from "./ProfileEditor"

type Profile = Database["public"]["Tables"]["profiles"]["Row"]
type Link = Database["public"]["Tables"]["links"]["Row"]

interface AdminDashboardProps {
  user: User
  initialProfile: Profile | null
  initialLinks: Link[]
}

export function AdminDashboard({ user, initialProfile, initialLinks }: AdminDashboardProps) {
  const [profile, setProfile] = useState<Profile | null>(initialProfile)
  const [links, setLinks] = useState<Link[]>(initialLinks)
  const [activeTab, setActiveTab] = useState<"profile" | "links">("profile")
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
    router.refresh()
  }

  return (
    <div className="flex h-screen bg-zinc-900">
      {/* Left Panel - Editor */}
      <div className="flex w-1/2 flex-col border-r border-zinc-800">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
          <h1 className="text-xl font-bold text-white">itone Admin</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            ログアウト
          </button>
        </header>

        {/* Tabs */}
        <div className="flex border-b border-zinc-800">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === "profile"
                ? "border-b-2 border-blue-500 text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <UserIcon className="h-4 w-4" />
            プロフィール
          </button>
          <button
            onClick={() => setActiveTab("links")}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium transition-colors ${
              activeTab === "links"
                ? "border-b-2 border-blue-500 text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <LinkIcon className="h-4 w-4" />
            リンク
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === "profile" ? (
            <ProfileEditor
              userId={user.id}
              profile={profile}
              onProfileChange={setProfile}
            />
          ) : (
            <LinkManager
              userId={user.id}
              links={links}
              onLinksChange={setLinks}
            />
          )}
        </div>
      </div>

      {/* Right Panel - Live Preview */}
      <div className="flex w-1/2 items-center justify-center bg-zinc-950 p-8">
        <LivePreview profile={profile} links={links} />
      </div>
    </div>
  )
}
