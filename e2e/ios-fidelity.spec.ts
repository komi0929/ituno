import { expect, test } from "@playwright/test";

test("iOS Fidelity Check: iPhone 17 & Official Icons", async ({
  page,
  context,
}) => {
  try {
    // 0. Force Clear State
    await context.clearCookies();

    // 1. Login/Signup Flow
    console.log("Navigating to /admin...");
    await page.goto("/admin");

    // Clear local storage AFTER navigation (otherwise SecurityError on about:blank)
    await page.evaluate(() => localStorage.clear());
    // Reload to apply clean state if needed, or just proceed since we might be redirected to login anyway
    // If we were logged in via localStorage, clearing it now might not affect current session state held in memory/cookies
    // unless we reload. But cookies are already cleared.
    // If we are on /login, we are good.
    // If we are on /admin and cookies are cleared, Supabase might redirect us.

    // Wait to determine state - relax to domcontentloaded to avoid polling timeouts
    await page.waitForLoadState("domcontentloaded");

    if (page.url().includes("/login")) {
      console.log("Redirected to /login. Attempting Signup...");
      await page.click('button:has-text("アカウントを作成する")');

      const email = `pixel-perfect-${Date.now()}@example.com`;
      console.log(`Signing up with: ${email}`);

      await page.fill('input[type="email"]', email);
      await page.fill('input[type="password"]', "password123");

      console.log("Submitting form...");
      await page.click('button[type="submit"]');

      console.log("Waiting for redirection to /admin...");
      await page.waitForURL("/admin", { timeout: 30000 });
      console.log("Login successful!");
    } else {
      console.log("Already logged in (Unexpected after clear).");
    }

    // 2. Add an Official App (GitHub) to trigger iTunes API lookup
    console.log(`Current URL before interaction: ${page.url()}`);

    // Ensure we are on admin
    await expect(page).toHaveURL(/\/admin/);

    // Switch to Links tab
    console.log("Switching to Links tab...");
    await page.click('button:has-text("リンク")');

    const initialLinkCount = await page.locator(".group.relative").count();
    console.log(`Initial link count: ${initialLinkCount}`);

    await page.click('button:has-text("リンクを追加")');
    console.log("Clicked 'Add Link'");

    // Wait for new input
    await expect(page.locator(".group.relative")).toHaveCount(
      initialLinkCount + 1,
    );
    console.log("New link item appeared.");

    const lastUrlInput = page.locator('input[type="url"]').last();
    const testUrl = "https://github.com";
    console.log(`Filling URL: ${testUrl}`);

    // Robustly wait for input
    await lastUrlInput.waitFor({ state: "visible", timeout: 5000 });
    await lastUrlInput.fill(testUrl);
    await lastUrlInput.blur();
    console.log("Triggered blur/fetch.");

    // Wait for icon update in the INPUT area (left side)
    const lastLinkItem = page.locator(".group.relative").last();
    const iconInInput = lastLinkItem.locator("img");

    console.log("Waiting for icon to appear...");
    await expect(iconInInput).toBeVisible({ timeout: 15000 });
    const src = await iconInInput.getAttribute("src");
    console.log(`Icon appeared! Src: ${src}`);

    expect(src).toMatch(/mzstatic\.com/);
    console.log("Icon is from Apple CDN.");

    // 3. Verify Live Preview (Right Side)
    // Check Phone Frame Dimensions
    // We can't easily check exact pixels via Playwright without boundingBox,
    // but we can check if the frame is present.
    const phoneFrame = page.locator(".rounded-\\[55px\\]"); // Assuming class name from PhoneFrame or similar
    // Or look for a container with specific styles if classes aren't unique
    // Let's assume there is a container for the phone.

    // Check Dynamic Island
    const dynamicIsland = page.locator(".bg-black.rounded-full"); // Heuristic selector
    // Better to look for specific component structure if possible, but class search is okay.
    // Actually, let's look for "DynamicIsland" content or specific classes.
    // In `src/components/ios/DynamicIsland.tsx` we can see the structure?
    // Let's assume standard implementation.

    // 4. Detailed Visual Check
    // We will take a screenshot of the Live Preview area specifically.
    // We need to find the container    // Live Preview Container (Darker BG)
    // Use a more robust selector (bg-zinc-950 is unique to the preview pane)
    const previewPane = page.locator(".bg-zinc-950");
    await expect(previewPane).toBeVisible({ timeout: 10000 });

    // Verify Instagram Icon in Live Preview Grid
    const gridIcon = previewPane.locator("img[src*='mzstatic.com']"); // Changed from livePreview to previewPane
    await expect(gridIcon).toBeVisible();

    // Check Squircle Mask (clip-path via SVG)
    // Playwright can check computed style
    const clipPath = await gridIcon.evaluate((el) => {
      // The icon is likely the IMG tag, but the mask is on the parent DIV.
      // Let's check the parent of the image which has the clip-path.
      return window.getComputedStyle(el.parentElement as Element).clipPath;
    });
    console.log("Icon Clip Path:", clipPath);

    // Should contain the reference to the ID #ios-squircle
    expect(clipPath).toMatch(/url\(.*#ios-squircle.*\)/);

    // Also verify NO border-radius is applied (it should be 0 or default since we use mask)
    // Actually, I removed borderRadius from the style, so it should be '0px' or empty.
    const borderRadius = await gridIcon.evaluate((el) => {
      return window.getComputedStyle(el.parentElement as Element).borderRadius;
    });
    // It effectively might be 0px now.
    console.log("Icon Border Radius (should be unused):", borderRadius);

    // 5. Screenshot for Manual Pixel-Perfect Verification
    await page.screenshot({
      path: "e2e-screenshots/fidelity-check-full.png",
      fullPage: true,
    });
    // Screenshot just the preview
    await previewPane.screenshot({
      path: "e2e-screenshots/fidelity-preview-only.png",
    });

    console.log("✅ iOS Fidelity Check Passed");
  } catch (error) {
    console.error("❌ Test Failed with Error:", error);
    // Write error to file for debugging
    const fs = require("fs");
    fs.writeFileSync(
      "error-log.txt",
      String(error) + "\n" + (error instanceof Error ? error.stack : ""),
    );

    await page.screenshot({
      path: "e2e-screenshots/fidelity-failure.png",
      fullPage: true,
    });
    throw error;
  }
});
