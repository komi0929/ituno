import fs from "fs";
import https from "https";
import path from "path";
import { IOS_OFFICIAL_ICONS } from "../lib/utils/itunes-api";

// Additional icons
const EXTRA_ICONS: Record<string, string> = {
  X: "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/49/6d/a3/496da349-0c98-e7cb-1f66-f1e9c1dfeed5/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg",
  Instagram:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/79/7d/57/797d5700-fd51-df39-39e9-c15ea8ea1b50/Prod-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg",
  Facebook:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/04/53/1a/04531ab0-8a01-3dc7-df5f-a4e1a1c5e739/Icon-Pro-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg",
  TikTok:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/2d/23/c7/2d23c70c-e1e6-e1b4-21a9-1af4e92f8de4/AppIcon_TikTok-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg",
  LinkedIn:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/27/46/58/274658f7-f9a3-23a4-cee3-f0f64bd8c203/AppIcon-0-0-1x_U007emarketing-0-10-0-85-220.png/512x512bb.jpg",
  YouTube:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/6d/83/70/6d83702a-8016-e32d-bfe5-8cfb9c5f66a5/logo_youtube_color-0-0-1x_U007emarketing-0-6-0-85-220.png/512x512bb.jpg",
  Spotify:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/57/0b/ef/570bef04-087b-3c0c-7348-e5a2b60a92c0/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg",
  Netflix:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/00/ab/39/00ab3932-4ba2-31b2-22a4-31b2e66fd9e8/AppIcon-0-0-1x_U007emarketing-0-0-0-10-0-0-sRGB-85-220.png/512x512bb.jpg",
  Twitch:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/12/f8/80/12f8802a-dbbb-7bc5-c0a3-3b7b63c7ad93/AppIcon-0-0-1x_U007emarketing-0-6-0-85-220.png/512x512bb.jpg",
  GitHub:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/11/4c/30/114c3009-76b0-76a0-aac0-7ebe97c16a58/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg",
  Notion:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/66/f8/0b/66f80b10-d435-d67f-8e7c-6c23b3e8e3a4/AppIcon-0-0-1x_U007emarketing-0-10-0-85-220.png/512x512bb.jpg",
  Slack:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/05/46/53/05465335-d8b0-1e43-99ed-d5e72a60965e/Prod-0-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg",
  Figma:
    "https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/7d/09/1b/7d091b3c-b076-f907-38ec-c5dd8e0c70c4/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg",
};

const DOWNLOAD_DIR = path.join(process.cwd(), "public", "icons");

// Combine sources
const ALL_ICONS = { ...IOS_OFFICIAL_ICONS, ...EXTRA_ICONS };

if (!fs.existsSync(DOWNLOAD_DIR)) {
  fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
}

// Map Japanese keys to English filenames
const FILENAME_MAP: Record<string, string> = {
  カレンダー: "calendar",
  写真: "photos",
  カメラ: "camera",
  時計: "clock",
  天気: "weather",
  リマインダー: "reminders",
  ヘルスケア: "health",
  ホーム: "home",
  設定: "settings",
  電話: "phone",
  メッセージ: "messages",
  ミュージック: "music",
  "App Store": "app_store",
};

/**
 * Helper to download file
 */
async function downloadFile(url: string, filename: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const filePath = path.join(DOWNLOAD_DIR, filename);
    const file = fs.createWriteStream(filePath);

    // No headers, simple request
    const req = https.get(url, (response) => {
      // Handle simple redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        if (response.headers.location) {
          downloadFile(response.headers.location, filename)
            .then(resolve)
            .catch(reject);
          return;
        }
      }

      if (response.statusCode !== 200) {
        file.close();
        fs.unlink(filePath, () => {});
        reject(new Error(`Status Code ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on("finish", () => {
        file.close(() => {
          const stats = fs.statSync(filePath);
          console.log(
            `  ✅ Downloaded: ${filename} (${(stats.size / 1024).toFixed(1)} KB)`,
          );
          resolve();
        });
      });
    });

    req.on("error", (err) => {
      file.close();
      fs.unlink(filePath, () => {});
      reject(err);
    });
  });
}

/**
 * Fallback: Search iTunes API for a fresh icon URL
 */
async function searchAppIconUrl(appName: string): Promise<string | null> {
  try {
    console.log(`  🔎 Searching iTunes API for "${appName}"...`);
    const searchUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(appName)}&entity=software&country=jp&limit=1`;

    return new Promise((resolve) => {
      https
        .get(searchUrl, (res) => {
          let data = "";
          res.on("data", (chunk) => (data += chunk));
          res.on("end", () => {
            try {
              const json = JSON.parse(data);
              if (json.results && json.results.length > 0) {
                // Prefer 512, fallback to 100
                const art =
                  json.results[0].artworkUrl512 ||
                  json.results[0].artworkUrl100;
                resolve(art);
              } else {
                resolve(null);
              }
            } catch (e) {
              resolve(null);
            }
          });
        })
        .on("error", () => resolve(null));
    });
  } catch (e) {
    return null;
  }
}

async function run() {
  console.log("Starting ROBUST serial download (with Search Fallback)...");
  const entries = Object.entries(ALL_ICONS);

  for (let i = 0; i < entries.length; i++) {
    const [key, initialUrl] = entries[i];

    // Determine clean filename
    let cleanName = key;
    if (FILENAME_MAP[key]) {
      cleanName = FILENAME_MAP[key];
    } else {
      cleanName = key.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();
    }

    // Initial extension assumption
    const ext = initialUrl.includes(".png") ? "png" : "jpg";
    let filename = `${cleanName}.${ext}`;

    process.stdout.write(
      `[${i + 1}/${entries.length}] Processing ${key} -> ${filename}...\n`,
    );

    // 1. Try Initial URL
    let success = false;
    try {
      await downloadFile(initialUrl, filename);
      success = true;
    } catch (e) {
      process.stdout.write(`  ❌ Static URL failed. Attempting fallback...\n`);
    }

    // 2. Fallback to Search if failed
    if (!success) {
      const freshUrl = await searchAppIconUrl(key);
      if (freshUrl) {
        try {
          // Check extension of fresh URL
          if (freshUrl.includes(".png")) {
            filename = `${cleanName}.png`;
          } else {
            filename = `${cleanName}.jpg`;
          }
          await downloadFile(freshUrl, filename);
          success = true;
        } catch (e) {
          console.log(
            `  ❌ Fallback download failed: ${e instanceof Error ? e.message : String(e)}`,
          );
        }
      } else {
        console.log(`  ❌ No app found in iTunes Search for "${key}"`);
      }
    }

    // MANDATORY WAIT
    await new Promise((r) => setTimeout(r, 1500));
  }
  console.log("All done.");
}

run();
