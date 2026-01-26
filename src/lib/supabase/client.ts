
import { Database } from "@/lib/types/schema"
import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // In production, these should always be set
  // Return a client anyway - pages will handle the case where auth fails
  if (!supabaseUrl || !supabaseAnonKey) {
    // Return a mock client that will fail gracefully
    // This allows TypeScript to be happy while runtime handles missing config
    return createBrowserClient<Database>(
      "https://placeholder.supabase.co",
      "placeholder-key"
    )
  }

  return createBrowserClient<Database>(
    supabaseUrl,
    supabaseAnonKey
  )
}
