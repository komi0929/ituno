import { test } from "@playwright/test";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://vzjcpxloxdaoglratvjo.supabase.co";
const SERVICE_ROLE_KEY = "sb_secret_jvgu2xQtEcC_jYunoTUf-Q_bBNEnHdk";

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

test("Capture Perfect iPhone Screen - Use Existing User", async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });

  // Use 'hitokoto' profile which we know exists and has proper setup
  const username = "hitokoto";

  // First, check current links and update them with proper URLs
  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", username)
    .single();

  if (!profile) {
    console.log("Profile not found");
    return;
  }

  console.log(`Found profile: ${username}, id: ${profile.id}`);

  // Delete existing links and create new ones with real URLs
  await supabase.from("links").delete().eq("user_id", profile.id);

  // Create links with REAL URLs
  const snsLinks = [
    { title: "X", url: "https://twitter.com/apple" },
    { title: "Instagram", url: "https://instagram.com/apple" },
    { title: "TikTok", url: "https://tiktok.com/@apple" },
    { title: "YouTube", url: "https://youtube.com/apple" },
    { title: "Threads", url: "https://threads.net/@apple" },
    { title: "Note", url: "https://note.com/example" },
    { title: "GitHub", url: "https://github.com/apple" },
    { title: "Spotify", url: "https://spotify.com" },
  ];

  for (let i = 0; i < snsLinks.length; i++) {
    await supabase.from("links").insert({
      user_id: profile.id,
      title: snsLinks[i].title,
      url: snsLinks[i].url,
      icon_url: "", // Will use getFaviconUrl
      is_docked: i >= 4,
      sort_order: i,
    });
  }

  console.log(`Created ${snsLinks.length} links`);

  // Navigate to profile
  const profileUrl = `http://localhost:3000/${username}`;
  console.log(`Navigating to: ${profileUrl}`);

  await page.goto(profileUrl, { waitUntil: "networkidle" });
  await page.waitForTimeout(3000);

  await page.screenshot({
    path: "e2e-screenshots/public-profile-iphone.png",
    fullPage: true,
  });

  console.log("Screenshot saved!");
});
