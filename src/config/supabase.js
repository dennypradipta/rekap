import { createClient } from "@supabase/supabase-js";

// get keys via the settings page at https://app.supabase.io
const SupabaseClient = createClient(
  __myapp.env.SUPABASE_URL,
  __myapp.env.SUPABASE_API_KEY
);

export default SupabaseClient;
