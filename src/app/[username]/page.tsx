import { PublicProfile } from "@/components/public-profile";
import { MOCK_LINKS, MOCK_PROFILE } from "@/lib/mock-data";
import { createClient } from "@/lib/supabase/server";
import { Database } from "@/lib/types/schema";
import { notFound } from "next/navigation";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type Link = Database["public"]["Tables"]["links"]["Row"];

export default async function Page({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const supabase = await createClient();

  // Demo mode - use mock data when Supabase is not configured
  if (!supabase) {
    return (
      <PublicProfile serverProfile={MOCK_PROFILE} serverLinks={MOCK_LINKS} />
    );
  }

  // Try to fetch real data from Supabase
  const { data: profileData } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  // If no profile found, show 404
  if (!profileData) {
    notFound();
  }

  // Type assertion after null check
  const profile = profileData as Profile;

  // Fetch links for the profile
  const { data: linksData } = await supabase
    .from("links")
    .select("*")
    .eq("user_id", profile.id)
    .order("sort_order", { ascending: true });

  const links = (linksData || []) as Link[];

  return <PublicProfile serverProfile={profile} serverLinks={links} />;
}
