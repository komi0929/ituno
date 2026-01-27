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

    // 1. Fetch HTML content significantly for Title and Icon scraping
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout for better scraping

    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      },
    });
    clearTimeout(timeoutId);

    if (!res.ok) return null;

    const html = await res.text();

    // Extract Title
    let title = "";
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    if (titleMatch) title = titleMatch[1].trim();
    // Clean up title
    // Matches: " - ", " | ", " · ", " : "
    title = title.split(/[-|:·] /)[0].trim();

    // === ICON STRATEGY ===
    let finalIconUrl = "";

    // Strategy A: iTunes Official App Icon (Highest Priority for known apps)
    // ---------------------------------------------------------------------
    let potentialAppName = title;
    // Guess app name from domain if title is empty or generic
    if (!potentialAppName || potentialAppName.length < 2) {
      try {
        potentialAppName = new URL(url).hostname
          .replace("www.", "")
          .split(".")[0];
      } catch {}
    }

    // Check pre-defined official list first
    if (potentialAppName) {
      const officialIcon = getOfficialAppIcon(potentialAppName);
      if (officialIcon) {
        finalIconUrl = officialIcon;
      }
    }

    // Search iTunes API if not found in pre-defined list
    // BUT only if it looks like a major service or user didn't provide a specific page
    // (Skipping iTunes search for random blogs to avoid false positives is wise,
    // but user wanted "iTunes API integration". Let's keep it but maybe prioritize scraping for non-root?)
    if (!finalIconUrl && potentialAppName && potentialAppName.length > 2) {
      // Search iTunes
      const searchedIcon = await searchAppIcon(potentialAppName);
      if (searchedIcon) {
        finalIconUrl = searchedIcon;
      }
    }

    // Strategy B: PWA/Web Scraping (apple-touch-icon)
    // ---------------------------------------------------------------------
    // If no official App Store icon found, look for PWA icon in HTML
    if (!finalIconUrl) {
      const iconRegex =
        /<link[^>]*rel=["'](apple-touch-icon|icon|shortcut icon)["'][^>]*href=["']([^"']+)["'][^>]*>/gi;
      let match;
      let bestIcon = "";

      while ((match = iconRegex.exec(html)) !== null) {
        const rel = match[1].toLowerCase();
        const href = match[2];

        // Priority: apple-touch-icon > others
        if (rel === "apple-touch-icon") {
          bestIcon = href;
          break; // Found the best one
        }
        if (!bestIcon) bestIcon = href;
      }

      if (bestIcon) {
        try {
          finalIconUrl = new URL(bestIcon, url).toString();
        } catch {}
      }
    }

    // Strategy C: Fallback (Google Favicon / App Icons Util)
    // ---------------------------------------------------------------------
    if (!finalIconUrl) {
      finalIconUrl = getAppIconUrl(url);
    }

    return { title, icon_url: finalIconUrl };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return null; // Don't crash
  }
}
