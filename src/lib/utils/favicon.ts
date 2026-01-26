
/**
 * getFaviconUrl
 * 
 * Generates a high-quality favicon URL using Google's S2 service.
 * 
 * @param url - The website URL (e.g., "https://twitter.com")
 * @param size - Icon size (default: 128)
 * @returns string
 */
export function getFaviconUrl(url: string, size: number = 128): string {
  try {
    const domain = new URL(url).hostname
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=${size}`
  } catch {
    // Fallback for invalid URLs or empty strings
    return `https://www.google.com/s2/favicons?domain=example.com&sz=${size}`
  }
}
