import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://dxzihajnqosrsuzqepdg.supabase.co"
const supabaseKey = "sb_publishable_PJ43LABO1IVcra1fb-UK5A_-2yzvP9A"
export const supabase = createClient(supabaseUrl, supabaseKey)