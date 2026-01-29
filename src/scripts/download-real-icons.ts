// Download real icons from public CDNs
import * as fs from "fs";
import * as https from "https";
import * as path from "path";

const ICONS_DIR = path.join(process.cwd(), "public/icons");

// Reliable public icon URLs (from Simple Icons CDN, Brand.Assets, etc.)
const ICON_SOURCES: Record<string, string> = {
  // Social Media (Simple Icons CDN - SVG, will need conversion or use PNG alternatives)
  "x.png": "https://cdn.simpleicons.org/x/000000", // X (Twitter)
  "instagram.png": "https://cdn.simpleicons.org/instagram/E4405F",
  "facebook.png": "https://cdn.simpleicons.org/facebook/0866FF",
  "tiktok.png": "https://cdn.simpleicons.org/tiktok/000000",
  "youtube.png": "https://cdn.simpleicons.org/youtube/FF0000",
  "threads.png": "https://cdn.simpleicons.org/threads/000000",
  "github.png": "https://cdn.simpleicons.org/github/181717",
  "linkedin.png": "https://cdn.simpleicons.org/linkedin/0A66C2",
  "spotify.png": "https://cdn.simpleicons.org/spotify/1DB954",
  "netflix.png": "https://cdn.simpleicons.org/netflix/E50914",
  "twitch.png": "https://cdn.simpleicons.org/twitch/9146FF",
  "slack.png": "https://cdn.simpleicons.org/slack/4A154B",
  "notion.png": "https://cdn.simpleicons.org/notion/000000",
  "figma.png": "https://cdn.simpleicons.org/figma/F24E1E",
  "discord.png": "https://cdn.simpleicons.org/discord/5865F2",
  "line.png": "https://cdn.simpleicons.org/line/00B900",
  // Note (note.com) - Japanese service, use placeholder or custom
  "note.png": "https://cdn.simpleicons.org/n/41B883", // Placeholder
};

async function downloadFile(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https
      .get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (response) => {
        // Handle redirects
        if (response.statusCode === 301 || response.statusCode === 302) {
          const redirectUrl = response.headers.location;
          if (redirectUrl) {
            downloadFile(redirectUrl, dest).then(resolve).catch(reject);
            return;
          }
        }

        if (response.statusCode !== 200) {
          reject(
            new Error(`Failed to download ${url}: ${response.statusCode}`),
          );
          return;
        }

        response.pipe(file);
        file.on("finish", () => {
          file.close();
          resolve();
        });
      })
      .on("error", (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
  });
}

async function main() {
  console.log("Downloading real icons...\n");

  for (const [filename, url] of Object.entries(ICON_SOURCES)) {
    const destPath = path.join(ICONS_DIR, filename);
    console.log(`Downloading ${filename} from ${url}...`);

    try {
      await downloadFile(url, destPath);
      const stats = fs.statSync(destPath);
      console.log(`  ✓ Saved (${stats.size} bytes)`);
    } catch (error) {
      console.error(`  ✗ Failed: ${error}`);
    }
  }

  console.log("\nDone!");
}

main();
