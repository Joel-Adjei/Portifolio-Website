import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as
  | string
  | undefined;

const isPlaceholder = (value?: string) =>
  !value || value.includes("your-project") || value === "your-anon-public-key";

export const isSupabaseConfigured =
  !isPlaceholder(supabaseUrl) && !isPlaceholder(supabaseAnonKey);

if (!isSupabaseConfigured) {
  console.error(
    "Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.",
  );
}

// Keep the client constructible so the static site still renders while the
// environment is being configured; data requests will fail until it is set.
export const supabase = createClient(
  isSupabaseConfigured ? supabaseUrl! : "https://placeholder.supabase.co",
  isSupabaseConfigured ? supabaseAnonKey! : "placeholder-anon-key",
);
