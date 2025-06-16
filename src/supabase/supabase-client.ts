import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

// Obtener las variables de entorno
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Validar que las variables de entorno estén definidas
if (!supabaseUrl) {
  throw new Error('SUPABASE_URL no está definida en las variables de entorno');
}

if (!supabaseAnonKey) {
  throw new Error('SUPABASE_ANON_KEY no está definida en las variables de entorno');
}

if (!supabaseServiceRoleKey) {
  throw new Error('SUPABASE_SERVICE_ROLE_KEY no está definida en las variables de entorno');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export const supabaseAdmin = createClient<Database>(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});
