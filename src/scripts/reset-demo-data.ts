import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function resetDemoData() {
  console.log("🔄 Resetting/Seeding 'demo' user data...");

  // 1. Get 'demo' user profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", "demo")
    .single();

  let userId = profile?.id;

  if (!userId) {
    console.log("⚠️ 'demo' profile not found. Creating user...");

    // Check if auth user exists
    const email = "demo@example.com";
    const password = "password123"; // Simple password for demo

    // Try to find by email first (in case profile is missing but auth exists)
    // Note: listUsers requires service role
    const {
      data: { users },
    } = await supabase.auth.admin.listUsers();
    const existingAuth = users.find((u) => u.email === email);

    if (existingAuth) {
      userId = existingAuth.id;
      console.log(`👤 Found existing Auth user (ID: ${userId})`);
    } else {
      // Create Auth User
      const { data: authUser, error: authError } =
        await supabase.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
        });

      if (authError) {
        console.error("❌ Failed to create auth user:", authError);
        return;
      }
      userId = authUser.user.id;
      console.log(`✅ Created new Auth user (ID: ${userId})`);
    }

    // Create Profile
    const { error: profileError } = await supabase.from("profiles").insert({
      id: userId,
      username: "demo",
      full_name: "Demo User",
      theme_config: {
        wallpaper:
          "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&q=80",
        textColor: "#ffffff",
      },
    });

    if (profileError) {
      console.error("❌ Failed to create profile:", profileError);
      // If it fails, maybe it already exists (race condition?), try fetching again
      const { data: retryProfile } = await supabase
        .from("profiles")
        .select("id")
        .eq("username", "demo")
        .single();
      if (retryProfile) userId = retryProfile.id;
    } else {
      console.log("✅ Created 'demo' profile.");
    }
  }

  if (!userId) {
    console.error("❌ Could not obtain userId for 'demo'.");
    return;
  }

  console.log(`👤 Processing 'demo' user (ID: ${userId})`);

  // 2. Delete all links for this user
  const { error: deleteError } = await supabase
    .from("links")
    .delete()
    .eq("user_id", userId);

  if (deleteError) {
    console.error("❌ Failed to delete links:", deleteError);
    return;
  }

  console.log("✅ All links deleted/cleared for 'demo' user.");

  // 3. Reset profile details (in case it existed but was changed)
  const { error: updateError } = await supabase
    .from("profiles")
    .update({
      full_name: "Demo User",
      bio: "Welcome to itone",
      avatar_url: null,
      theme_config: {
        wallpaper:
          "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&q=80",
        textColor: "#ffffff",
      },
    })
    .eq("id", userId);

  if (updateError) {
    console.error("❌ Failed to reset profile details:", updateError);
  } else {
    console.log("✅ Profile details reset to default.");
  }
}

resetDemoData();
