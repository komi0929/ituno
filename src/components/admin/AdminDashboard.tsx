"use client";

import { createClient } from "@/lib/supabase/client";
import { Database } from "@/lib/types/schema";
import { User } from "@supabase/supabase-js";
import { Link as LinkIcon, LogOut, User as UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LinkManager } from "./LinkManager";
import { LivePreview } from "./LivePreview";
import { ProfileEditor } from "./ProfileEditor";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type Link = Database["public"]["Tables"]["links"]["Row"];

interface AdminDashboardProps {
  user: User;
  initialProfile: Profile | null;
  initialLinks: Link[];
}

export function AdminDashboard({
  user,
  initialProfile,
  initialLinks,
}: AdminDashboardProps) {
  const [profile, setProfile] = useState<Profile | null>(initialProfile);
  const [links, setLinks] = useState<Link[]>(initialLinks);
  const [activeTab, setActiveTab] = useState<"profile" | "links">("profile");
  // Mobile specific state: 'editor' or 'preview'
  const [mobileView, setMobileView] = useState<"editor" | "preview">("editor");

  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="flex flex-col h-screen bg-zinc-900 lg:flex-row">
      {/* Mobile Tab Switcher (Top or Bottom? Let's use a sticky bottom bar for easier thumb reach, or top for visibility) */}
      {/* Actually, let's put a switcher at the top on mobile, below header. */}

      {/* Header - Common */}
      <header className="flex shrink-0 items-center justify-between border-b border-zinc-800 px-4 py-3 bg-zinc-900 lg:hidden">
        <h1 className="text-lg font-bold text-white">itone Admin</h1>
        <button
          onClick={handleLogout}
          className="rounded-lg p-2 text-zinc-400 hover:bg-zinc-800 hover:text-white"
        >
          <LogOut className="h-5 w-5" />
        </button>
      </header>

      {/* Mobile View Switcher */}
      <div className="flex border-b border-zinc-800 bg-zinc-900 lg:hidden text-sm">
        <button
          onClick={() => setMobileView("editor")}
          className={`flex-1 py-3 text-center font-medium transition-colors ${
            mobileView === "editor"
              ? "border-b-2 border-blue-500 text-white"
              : "text-zinc-500"
          }`}
        >
          編集
        </button>
        <button
          onClick={() => setMobileView("preview")}
          className={`flex-1 py-3 text-center font-medium transition-colors ${
            mobileView === "preview"
              ? "border-b-2 border-green-500 text-white"
              : "text-zinc-500"
          }`}
        >
          プレビュー
        </button>
      </div>

      {/* Editor Panel */}
      <div
        className={`flex-col border-r border-zinc-800 bg-zinc-900 overflow-hidden lg:flex lg:w-1/2 ${
          mobileView === "editor" ? "flex flex-1" : "max-lg:hidden"
        }`}
      >
        {/* Desktop Header */}
        <header className="hidden items-center justify-between border-b border-zinc-800 px-6 py-4 lg:flex">
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
        <div className="flex shrink-0 border-b border-zinc-800">
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
        <div className="flex-1 overflow-y-auto p-4 lg:p-6">
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

      {/* Preview Panel */}
      <div
        className={`flex-1 items-center justify-center bg-zinc-950 p-4 lg:flex lg:w-1/2 lg:p-8 ${
          mobileView === "preview" ? "flex" : "max-lg:hidden"
        }`}
      >
        {/* Scale preview down slightly on mobile to fit if needed, but LivePreview usually handles it. 
            LivePreview uses PhoneFrame which has fixed width. We might need to ensure it scales.
        */}
        <div className="scale-[0.85] lg:scale-100 origin-center">
          <LivePreview profile={profile} links={links} />
        </div>
      </div>
    </div>
  );
}
