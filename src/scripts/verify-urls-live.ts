import { IOS_OFFICIAL_ICONS } from "../lib/utils/itunes-api";

async function verifyAllUrls() {
  console.log("Verifying all icon URLs in itunes-api.ts...");
  const errors: string[] = [];

  for (const [key, url] of Object.entries(IOS_OFFICIAL_ICONS)) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);

      const res = await fetch(url, {
        method: "HEAD",
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (res.ok) {
        process.stdout.write(`✅`);
      } else {
        process.stdout.write(`❌`);
        errors.push(`${key}: ${res.status} ${res.statusText}`);
      }
    } catch (e) {
      process.stdout.write(`❌`);
      errors.push(
        `${key}: ${e instanceof Error ? e.message : "Unknown error"}`,
      );
    }
  }

  console.log("\n\nVerification Complete.");
  if (errors.length > 0) {
    console.error("Errors found:");
    errors.forEach((e) => console.error(e));
    process.exit(1);
  } else {
    console.log("All URLs are valid (200 OK).");
    process.exit(0);
  }
}

verifyAllUrls();
