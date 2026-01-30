import { expect, test } from "@playwright/test";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://vzjcpxloxdaoglratvjo.supabase.co";
// From iphone-fidelity.spec.ts
const SERVICE_ROLE_KEY = "sb_secret_jvgu2xQtEcC_jYunoTUf-Q_bBNEnHdk";

test.describe("Full Verification: Profile Auto-Creation and Favicon", () => {
  let supabase;
  let testUser;

  test.beforeAll(async () => {
    supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // Create a fresh user with a random email
    const uniqueId = Math.random().toString(36).substring(2, 10);
    const email = `test-verify-${uniqueId}@example.com`;
    const password = "test-password-123";

    // Use admin API to create user with email confirmed
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (error) throw error;
    testUser = { email, password, id: data.user.id };
    console.log(`Created test user: ${email} (${data.user.id})`);
  });

  test.afterAll(async () => {
    // Cleanup
    if (testUser) {
      await supabase.auth.admin.deleteUser(testUser.id);
      console.log(`Deleted test user: ${testUser.email}`);
    }
  });

  test("should verify profile auto-creation and link adding", async ({
    page,
  }) => {
    // 1. Login
    console.log("Navigating to login page...");

    // Capture alerts
    page.on("dialog", async (dialog) => {
      console.error(`ALERT DIALOG: ${dialog.message()}`);
      await dialog.accept();
    });

    await page.goto("http://localhost:3000/login");

    // Check for "Missing Supabase Config" warning
    const warning = page.locator("text=Supabase環境変数が設定されていません");
    if (await warning.isVisible()) {
      console.error(
        "FATAL: Supabase environment variables missing on localhost.",
      );
      await page.screenshot({ path: "e2e-screenshots/fatal-missing-env.png" });
      throw new Error("Missing Supabase Config on localhost");
    }

    console.log("Filling login form...");
    await page.fill('input[id="email"]', testUser.email);
    await page.fill('input[id="password"]', testUser.password);

    await page.screenshot({ path: "e2e-screenshots/pre-login.png" });

    console.log("Clicking submit...");
    await page.click('button[type="submit"]');

    // Wait for redirect to admin
    console.log("Waiting for navigation to /admin...");
    try {
      await page.waitForURL("**/admin", { timeout: 15000 });
    } catch (e) {
      console.error("Timeout waiting for /admin redirect.");
      await page.screenshot({ path: "e2e-screenshots/login-timeout.png" });
      throw e;
    }
    console.log("Logged in and navigated to /admin");

    // 2. Profile Auto-Creation Verify
    const usernameInput = page.locator('input[placeholder="username"]');
    await expect(usernameInput).toBeVisible({ timeout: 10000 });
    const username = await usernameInput.inputValue();
    console.log(`Auto-created username: ${username}`);
    expect(username).toContain("test-verify");

    // 3. Add Links
    const sites = [{ name: "Example", url: "https://example.com" }];
    for (const site of sites) {
      console.log(`Adding link: ${site.name}`);
      const urlInput = page.locator('input[placeholder="https://mysite.com"]');
      await urlInput.fill(site.url);

      const addButton = page.locator('button:has-text("追加")').last();
      await addButton.click();

      // Check for error alert
      const errorToast = page.locator(".bg-red-500");
      if (await errorToast.isVisible({ timeout: 2000 })) {
        const errorText = await errorToast.innerText();
        console.error(`Error adding link: ${errorText}`);
        await page.screenshot({
          path: `e2e-screenshots/error-${site.name}.png`,
        });
        throw new Error(`Failed to add link: ${errorText}`);
      }

      console.log("Waiting for link to appear in list...");
      await expect(page.locator(`input[value="${site.url}"]`)).toBeVisible({
        timeout: 20000,
      });
      console.log(`Added link: ${site.url} successfully`);
      await page.screenshot({ path: `e2e-screenshots/added-${site.name}.png` });
    }

    // 4. Verify Public Profile
    console.log(`Navigating to public profile: /${username}`);
    await page.goto(`http://localhost:3000/${username}`);
    await page.waitForLoadState("networkidle");

    await page.screenshot({ path: "e2e-screenshots/public-profile.png" });

    for (const site of sites) {
      const link = page.locator(`a[href="${site.url}"]`);
      await expect(link).toBeVisible();

      const img = link.locator("img");
      await expect(img).toBeVisible();

      const isImageLoaded = await img.evaluate((image: HTMLImageElement) => {
        return image.complete && image.naturalWidth > 0;
      });

      if (!isImageLoaded) {
        console.error(`Image for ${site.name} failed to load.`);
        await page.screenshot({
          path: `e2e-screenshots/broken-icon-${site.name}.png`,
        });
      } else {
        console.log(`Icon for ${site.name} verified.`);
      }
      expect(isImageLoaded).toBeTruthy();
    }

    await page.screenshot({ path: "e2e-screenshots/final-verification.png" });
  });
});
