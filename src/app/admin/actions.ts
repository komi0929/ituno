"use server";

import { getAppIconUrl } from "@/lib/utils/app-icons";
import { getOfficialAppIcon, searchAppIcon } from "@/lib/utils/itunes-api";

export async function fetchUrlMetadata(url: string) {
  if (!url) return null;

  try {
    // Ensure protocol
    if (!url.startsWith("http")) {
      url = "https://" + url;
    }

    // Validate URL
    try {
      new URL(url);
    } catch {
      return null;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3s timeout

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
      },
    });
    clearTimeout(timeoutId);

    if (!res.ok) return null;

    const html = await res.text();

    // Extract Title
    let title = "";
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    if (titleMatch) title = titleMatch[1].trim();

    // Clean up title (remove common suffixes)
    title = title.split(/[-|] /)[0].trim();

    // === ICON STRATEGY (STRICT: Official Icons Only) ===

    // 1. Try to guess App Name from title or URL
    // e.g. "GitHub" -> search iTunes API
    let potentialAppName = title;
    if (!potentialAppName) {
      try {
        potentialAppName = new URL(url).hostname
          .replace("www.", "")
          .split(".")[0];
      } catch {}
    }

    let finalIconUrl = "";

    // 2. Search iTunes API for official icon
    if (potentialAppName) {
      const officialIcon = getOfficialAppIcon(potentialAppName);
      if (officialIcon) {
        finalIconUrl = officialIcon;
      } else {
        // Search iTunes API
        const searchedIcon = await searchAppIcon(potentialAppName);
        if (searchedIcon) {
          finalIconUrl = searchedIcon;
        }
      }
    }

    // 3. Fallback: Use getAppIconUrl (checks cached official list or favicon)
    if (!finalIconUrl) {
      finalIconUrl = getAppIconUrl(url);
    }

    return { title, icon_url: finalIconUrl };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return null;
  }
}
