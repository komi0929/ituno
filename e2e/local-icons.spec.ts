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
  await page.waitForLoadState("networkidle");

  // 4. Fill using ID selectors
  console.log("Filling credentials...");
  await page.fill("#email", email);
  await page.fill("#password", password);

  console.log("Clicking login...");
  await page.click('button:has-text("ログイン")');

  // 5. Wait for admin page
  console.log("Waiting for redirect to /admin...");
  await expect(page).toHaveURL(/\/admin/, { timeout: 60000 });
  console.log("Login successful, on admin page.");

  // 6. Wait for page to fully load
  await page.waitForLoadState("networkidle");

  // 7. Click the "リンク" tab to see the icons
  console.log("Clicking Links tab...");
  await page.click('button:has-text("リンク")');
  await page.waitForTimeout(1000); // Wait for tab transition

  // 8. Screenshot after navigating to Links tab
  await page.screenshot({
    path: "e2e-screenshots/admin-with-icons.png",
    fullPage: true,
  });
  console.log("Screenshot saved.");

  // 9. Check for broken images
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
