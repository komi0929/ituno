
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          theme_config: Json
          created_at: string
        }
        Insert: {
          id: string
          username: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          theme_config?: Json
          created_at?: string
        }
        Update: {
          id?: string
          username?: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          theme_config?: Json
          created_at?: string
        }
      }
      links: {
        Row: {
          id: string
          user_id: string
          title: string
          url: string
          icon_url: string | null
          is_docked: boolean
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          url: string
          icon_url?: string | null
          is_docked?: boolean
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          url?: string
          icon_url?: string | null
          is_docked?: boolean
          sort_order?: number
          created_at?: string
        }
      }
    }
  }
}
