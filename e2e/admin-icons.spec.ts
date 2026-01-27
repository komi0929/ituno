import { expect, test } from "@playwright/test";

test("Admin UI Icon Verification", async ({ page }) => {
  // 1. Navigate to Admin
  await page.goto("/admin");

  // 2. Handle Login/Signup
  // Check if we are redirected to login
  if (page.url().includes("/login")) {
    console.log("Redirected to login, attempting signup...");

    // Switch to Signup mode
    await page.click('button:has-text("アカウントを作成する")');

    // Fill credentials (randomized to avoid conflict)
    const email = `test-${Date.now()}@example.com`;
    const password = "password123";

    await page.fill('input[type="email"]', email);
    await page.fill('input[type="password"]', password);
    await page.click('button[type="submit"]');

    // Wait for navigation or error
    await page.waitForURL("/admin", { timeout: 10000 }).catch(() => {
      console.log("Signup might require email confirmation or failed.");
    });
  }

  // Verify we are on Admin Dashboard
  await expect(page).toHaveURL("/admin");
  console.log("Access to Admin Dashboard confirmed.");

  // Switch to Links tab
  const linkTab = page.getByRole("button", { name: "リンク", exact: true });
  await linkTab.click();

  // Wait for LinkManager to appear
  await expect(page.getByRole("heading", { name: "リンク管理" })).toBeVisible();

  // 3. Add GitHub Link
  const addLinkButton = page.locator('button:has-text("リンクを追加")');
  await expect(addLinkButton).toBeVisible({ timeout: 10000 });
  await addLinkButton.click();

  // Wait for new link item to appear (it adds an empty item)
  // Instead of waiting for specific count, let's find the inputs.
  // The newly added link should be at the bottom.
  // We need to type into the empty URL input.

  // Find the last URL input
  const urlInputs = page.locator('input[type="url"]');
  const lastUrlInput = urlInputs.last();

  await lastUrlInput.fill("https://github.com");
  await lastUrlInput.blur(); // Trigger onBlur to fetch metadata

  // Wait for icon to update
  // The icon container is .h-10.w-10 ... img
  // We expect an image to appear inside the last link item
  const lastLinkItem = page.locator(".group.relative").last();
  const iconImage = lastLinkItem.locator("img");

  await expect(iconImage).toBeVisible({ timeout: 10000 });
  const githubIconSrc = await iconImage.getAttribute("src");
  console.log("GitHub Icon Src:", githubIconSrc);

  // Verify it contains mzstatic (iTunes)
  if (githubIconSrc?.includes("mzstatic.com")) {
    console.log("✅ GitHub icon is from iTunes API (Official)");
  } else {
    console.log("❌ GitHub icon source mismatch:", githubIconSrc);
  }

  await page.screenshot({ path: "e2e-screenshots/github-icon.png" });

  // 4. Add Vercel Link (PWA Scraping test)
  await page.click('button:has-text("リンクを追加")');
  const newUrlInput = page.locator('input[type="url"]').last();

  await newUrlInput.fill("https://vercel.com");
  await newUrlInput.blur();

  const newIconImage = page.locator(".group.relative").last().locator("img");
  await expect(newIconImage).toBeVisible({ timeout: 15000 }); // Scraping might take longer

  const vercelIconSrc = await newIconImage.getAttribute("src");
  console.log("Vercel Icon Src:", vercelIconSrc);

  // Verify it is NOT Google Favicon (fallback)
  if (vercelIconSrc?.includes("google.com/s2/favicons")) {
    console.log("⚠️ Vercel icon fell back to Google Favicon");
  } else {
    console.log("✅ Vercel icon scraped successfully (PWA style)");
  }

  await page.screenshot({ path: "e2e-screenshots/vercel-icon.png" });
});
