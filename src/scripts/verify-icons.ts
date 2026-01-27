// Verification script for fetchUrlMetadata
// Usage: npx tsx src/scripts/verify-icons.ts

import { fetchUrlMetadata } from "../app/admin/actions";

async function verify() {
  console.log("=== Icon Fetching Verification ===");

  const targets = [
    "https://github.com",
    "https://twitter.com",
    "https://vercel.com",
    "https://apple.com",
    "https://yahoo.co.jp",
  ];

  for (const url of targets) {
    console.log(`\nTesting: ${url}`);
    try {
      const start = Date.now();
      const result = await fetchUrlMetadata(url);
      const duration = Date.now() - start;

      if (result) {
        console.log(`✅ Success (${duration}ms)`);
        console.log(`   Title: ${result.title}`);
        console.log(`   Icon : ${result.icon_url}`);

        // Analyze Icon Source
        if (result.icon_url.includes("mzstatic.com")) {
          console.log("   Source: 🍎 iTunes App Store (Official)");
        } else if (result.icon_url.includes("google.com/s2/favicons")) {
          console.log("   Source: ⚠️ Google Fallback");
        } else {
          console.log("   Source: 🌐 Scraped/Other (PWA Style)");
        }
      } else {
        console.log("❌ Failed to fetch metadata");
      }
    } catch (e) {
      console.error("❌ Error:", e);
    }
  }
}

verify();
