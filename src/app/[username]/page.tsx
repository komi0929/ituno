
import { PublicProfile } from "@/components/public-profile"
import { MOCK_LINKS, MOCK_PROFILE } from "@/lib/mock-data"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"

export default async function Page({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params
  const supabase = await createClient()

  // Demo mode - use mock data when Supabase is not configured
  if (!supabase || username === "demo") {
    return <PublicProfile username={username} serverProfile={MOCK_PROFILE} serverLinks={MOCK_LINKS} />
  }

  // Try to fetch real data from Supabase
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single()

  // If no profile found, show 404
  if (!profile) {
    notFound()
  }

  // Fetch links for the profile
  const { data: links } = await supabase
    .from("links")
    .select("*")
    .eq("user_id", profile.id)
    .order("sort_order", { ascending: true })

  return <PublicProfile username={username} serverProfile={profile} serverLinks={links || []} />
}
