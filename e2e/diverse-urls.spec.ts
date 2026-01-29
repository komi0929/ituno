import { test } from "@playwright/test";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://vzjcpxloxdaoglratvjo.supabase.co";
const SERVICE_ROLE_KEY = "sb_secret_jvgu2xQtEcC_jYunoTUf-Q_bBNEnHdk";

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

// Diverse set of URLs from various categories
const DIVERSE_URLS = [
  // Social Media
  { title: "X", url: "https://twitter.com/user" },
  { title: "Instagram", url: "https://instagram.com/user" },
  { title: "Facebook", url: "https://facebook.com/user" },
  { title: "LinkedIn", url: "https://linkedin.com/in/user" },
  { title: "TikTok", url: "https://tiktok.com/@user" },
  { title: "Pinterest", url: "https://pinterest.com/user" },

  // Tech / Developer
  { title: "GitHub", url: "https://github.com/user" },
  { title: "GitLab", url: "https://gitlab.com/user" },
  { title: "Stack Overflow", url: "https://stackoverflow.com/users/123" },
  { title: "Dev.to", url: "https://dev.to/user" },

  // Media / Content
  { title: "YouTube", url: "https://youtube.com/@user" },
  { title: "Spotify", url: "https://open.spotify.com/user/123" },
  { title: "SoundCloud", url: "https://soundcloud.com/user" },
  { title: "Twitch", url: "https://twitch.tv/user" },

  // Business / Professional
  { title: "Notion", url: "https://notion.so/workspace" },
  { title: "Figma", url: "https://figma.com/@user" },
  { title: "Dribbble", url: "https://dribbble.com/user" },
  { title: "Behance", url: "https://behance.net/user" },

  // Japanese Services
  { title: "Note", url: "https://note.com/user" },
  { title: "Qiita", url: "https://qiita.com/user" },
  { title: "Zenn", url: "https://zenn.dev/user" },

  // E-commerce / Others
  { title: "Amazon", url: "https://amazon.com" },
  { title: "Netflix", url: "https://netflix.com" },
  { title: "Discord", url: "https://discord.gg/server" },
  { title: "Slack", url: "https://slack.com" },
  { title: "Reddit", url: "https://reddit.com/u/user" },
  { title: "Medium", url: "https://medium.com/@user" },
  { title: "Substack", url: "https://user.substack.com" },
];

test("Test Diverse URLs - Favicon Loading", async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });

  const username = "hitokoto";

  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", username)
    .single();

  if (!profile) {
    console.log("Profile not found");
    return;
  }

  console.log(`Found profile: ${username}`);

  // Delete existing links
  await supabase.from("links").delete().eq("user_id", profile.id);

  // Create links with diverse URLs (first 12 for grid, rest for dock demonstration)
  const gridLinks = DIVERSE_URLS.slice(0, 8); // 2 rows of 4
  const dockLinks = DIVERSE_URLS.slice(8, 12); // 4 in dock

  for (let i = 0; i < gridLinks.length; i++) {
    await supabase.from("links").insert({
      user_id: profile.id,
      title: gridLinks[i].title,
      url: gridLinks[i].url,
      icon_url: "",
      is_docked: false,
      sort_order: i,
    });
  }

  for (let i = 0; i < dockLinks.length; i++) {
    await supabase.from("links").insert({
      user_id: profile.id,
      title: dockLinks[i].title,
      url: dockLinks[i].url,
      icon_url: "",
      is_docked: true,
      sort_order: i,
    });
  }

  console.log(`Created ${gridLinks.length + dockLinks.length} links`);

  // Navigate and wait for all images to load
  await page.goto(`http://localhost:3000/${username}`, {
    waitUntil: "networkidle",
  });
  await page.waitForTimeout(4000); // Extra time for favicon loading

  // Take high-resolution screenshot
  await page.screenshot({
    path: "e2e-screenshots/diverse-urls-test.png",
    fullPage: true,
  });

  console.log("Screenshot saved: diverse-urls-test.png");
});
