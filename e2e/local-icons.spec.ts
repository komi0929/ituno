import { expect, test } from "@playwright/test";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://vzjcpxloxdaoglratvjo.supabase.co";
const SERVICE_ROLE_KEY = "sb_secret_jvgu2xQtEcC_jYunoTUf-Q_bBNEnHdk";

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

test("Verify Admin Icons After Login", async ({ page }) => {
  const email = `icontest-${Date.now()}@example.com`;
  const password = "TestPassword123!";

  // 1. Create verified user
  console.log(`Creating user: ${email}`);
  const { data: user, error: createError } =
    await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });
  if (createError) throw createError;

  // 2. Create profile
  await supabase.from("profiles").insert({
    id: user.user.id,
    username: `icontest-${Date.now()}`,
    full_name: "Icon Tester",
    updated_at: new Date().toISOString(),
  });

  // 3. Go to login page
  await page.goto("http://localhost:3000/login");

  // 4. Fill and submit
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await page.click('button:has-text("ログイン")');

  // 5. Wait for admin page
  await expect(page).toHaveURL(/\/admin/, { timeout: 30000 });
  console.log("Login successful, on admin page.");

  // 6. Wait a bit for icons to load
  await page.waitForTimeout(2000);

  // 7. Screenshot
  await page.screenshot({
    path: "e2e-screenshots/admin-with-icons.png",
    fullPage: true,
  });
  console.log("Screenshot saved to e2e-screenshots/admin-with-icons.png");

  // 8. Check for broken images
  const brokenImages = await page.evaluate(() => {
    const images = Array.from(document.querySelectorAll("img"));
    return images
      .filter((img) => !img.complete || img.naturalHeight === 0)
      .map((img) => ({
        src: img.src,
        alt: img.alt,
      }));
  });

  console.log("Broken images:", JSON.stringify(brokenImages, null, 2));

  if (brokenImages.length > 0) {
    throw new Error(`Found ${brokenImages.length} broken images!`);
  }

  console.log("✅ All icons loaded successfully!");
});
