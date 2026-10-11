import { createClient } from '@supabase/supabase-js';

// On récupère les clés de ton coffre-fort secret (.env.local)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// On crée l'outil "supabase" que tout notre site utilisera
export const supabase = createClient(supabaseUrl, supabaseAnonKey);