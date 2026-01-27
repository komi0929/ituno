"use server";

import { getAppIconUrl } from "@/lib/utils/app-icons";

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
          "Mozilla/5.0 (compatible; itone-bot/1.0; +http://itone-six.vercel.app)",
      },
    });
    clearTimeout(timeoutId);

    if (!res.ok) return null;

    const html = await res.text();

    // Extract Title
    let title = "";
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    if (titleMatch) title = titleMatch[1].trim();

    // Icon Strategy:
    // 1. Check known high-quality cache first (iTunes)
    const { hasHighQualityIcon } = await import("@/lib/utils/app-icons");
    if (hasHighQualityIcon(url)) {
      return { title, icon_url: getAppIconUrl(url) };
    }

    // 2. Try scraping HTML for icons (better for specific local sites like Saizeriya)
    // Priority: apple-touch-icon > icon > shortcut icon
    let scraptedIcon = "";
    const iconRegex =
      /<link[^>]*rel=["'](apple-touch-icon|icon|shortcut icon)["'][^>]*href=["']([^"']+)["'][^>]*>/gi;
    let match;
    while ((match = iconRegex.exec(html)) !== null) {
      const rel = match[1].toLowerCase();
      const href = match[2];

      // Prefer apple-touch-icon
      if (rel === "apple-touch-icon") {
        scraptedIcon = href;
        break;
      }
      // Take first icon found if we don't have one yet
      if (!scraptedIcon) scraptedIcon = href;
    }

    let finalIconUrl = "";
    if (scraptedIcon) {
      // Resolve relative URL
      try {
        finalIconUrl = new URL(scraptedIcon, url).toString();
      } catch {
        finalIconUrl = "";
      }
    }

    // 3. Fallback to Clearbit/Google service
    if (!finalIconUrl) {
      finalIconUrl = getAppIconUrl(url);
    }

    return { title, icon_url: finalIconUrl };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return null;
  }
}
