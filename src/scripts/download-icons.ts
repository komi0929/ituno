import fs from "fs";
import https from "https";
import path from "path";
import { IOS_OFFICIAL_ICONS } from "../lib/utils/itunes-api";

const DOWNLOAD_DIR = path.join(process.cwd(), "public", "icons");

if (!fs.existsSync(DOWNLOAD_DIR)) {
  fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
}

async function downloadFile(url: string, filename: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(path.join(DOWNLOAD_DIR, filename));

    // No headers (mimic debug script success)
    https
      .get(
        url,
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            Accept:
              "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
          },
        },
        (response) => {
          if (response.statusCode !== 200) {
            reject(
              new Error(
                `Failed to consume ${url}: Status Code ${response.statusCode}`,
              ),
            );
            return;
          }
          response.pipe(file);
          file.on("finish", () => {
            file.close(() => {
              console.log(`✅ Downloaded: ${filename}`);
              resolve();
            });
          });
        },
      )
      .on("error", (err) => {
        fs.unlink(path.join(DOWNLOAD_DIR, filename), () => {});
        reject(err);
      });
  });
}

async function downloadAll() {
  console.log("Downloading icons to public/icons/...");

  for (const [key, url] of Object.entries(IOS_OFFICIAL_ICONS)) {
    // safe filename
    const safeKey = key.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();

    // Determine extension from URL if possible, default to jpg
    const ext = url.includes(".png") ? "png" : "jpg";
    const actualFilename = `${safeKey}.${ext}`;

    try {
      await downloadFile(url, actualFilename);
      // Add a delay
      await new Promise((r) => setTimeout(r, 1000));
    } catch (e) {
      console.error(`❌ Error downloading ${key}:`, e);
    }
  }
}

downloadAll();
