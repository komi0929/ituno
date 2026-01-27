import { expect, test } from "@playwright/test";
import * as fs from "fs";

test.use({
  viewport: { width: 390, height: 844 }, // iPhone 12/13/14 size
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1",
  hasTouch: true,
});

test("Mobile Responsiveness & Legal Compliance", async ({ page, context }) => {
  // Increase timeout to 60s for slow mobile emulation/network
  test.setTimeout(60000);

  try {
    // 0. Login
    await context.clearCookies();

    console.log("Navigating to /admin...");
    await page.goto("/admin");
    // Wait for content or redirect
    await page.waitForLoadState("domcontentloaded");

    // Handle Login/Signup if redirected
    if (page.url().includes("/login")) {
      console.log("Redirected to login. Attempting Signup...");

      // Try to switch to signup if we are on login form
      const signupLink = page.locator(
        'button:has-text("アカウントを作成する")',
      );
      if (await signupLink.isVisible()) {
        await signupLink.click();
      }

      const email = `mobile-test-${Date.now()}@example.com`;
      console.log(`Signing up with: ${email}`);

      await page.fill('input[type="email"]', email);
      await page.fill('input[type="password"]', "password123");
      await page.click('button:has-text("アカウントを作成")'); // Or submit button

      // Look for generic submit if specific text fails, or just wait
      // Actually button usually says "アカウントを作成" or "Sign up"
      // Let's use generic submit
      // await page.click('button[type="submit"]');

      await page.waitForURL(/\/admin/, { timeout: 30000 });
      console.log("Signup successful, on /admin");
    }

    // 1. Verify Default View (Editor)
    console.log("Verifying Default Mobile View (Editor)...");
    // On mobile, the header should be the mobile specific header
    const mobileHeader = page.locator("h1:has-text('itone Admin')").first();
    await expect(mobileHeader).toBeVisible();

    // Editor Panel (which contains "プロフィール" tab button) should be visible
    const editorTabBtn = page.locator('button:has-text("プロフィール")');
    await expect(editorTabBtn).toBeVisible();

    // Preview panel (bg-zinc-950) should be hidden on mobile default
    const previewContainer = page.locator(".bg-zinc-950");
    await expect(previewContainer).toBeHidden();
    console.log("Default view confirmed.");

    // 2. Switch to Preview
    console.log("Switching to Preview...");
    await page.click('button:has-text("プレビュー")');

    // Preview should now be visible
    await expect(previewContainer).toBeVisible();
    console.log("Preview view confirmed.");

    // 3. Switch back to Editor
    console.log("Switching back to Editor...");
    await page.click('button:has-text("編集")');
    await expect(previewContainer).toBeHidden();
    console.log("✅ Mobile Tab Switching Verified");

    // 4. Verify Legal Pages
    console.log("Verifying Legal Pages...");

    // Check Terms
    const responseTerms = await page.request.get("/terms");
    expect(responseTerms.status()).toBe(200);
    console.log(" - /terms accessible (200 OK)");

    // Check Privacy
    const responsePrivacy = await page.request.get("/privacy");
    expect(responsePrivacy.status()).toBe(200);
    console.log(" - /privacy accessible (200 OK)");

    console.log("✅ Legal Compliance Verified");
  } catch (error) {
    console.error("❌ Test Failed:", error);
    await page.screenshot({
      path: "e2e-screenshots/mobile-failure.png",
      fullPage: true,
    });

    fs.writeFileSync(
      "mobile-error-log.txt",
      String(error) + "\n" + (error instanceof Error ? error.stack : ""),
    );
    throw error;
  }
});
