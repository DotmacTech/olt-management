import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

// Table: communication_settings
// Columns: id (int, pk), smtp (json), welcome_template (text), reset_template (text)

// Table: Users
// Columns: id (uuid), name (text), email (text), role_id (text), created_at (timestamptz)

export async function getUsers() {
  const { data, error } = await supabase
    .from('Users')
    .select('id, name, email, role_id, created_at')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function getCommunicationSettings() {
  const { data, error } = await supabase
    .from('communication_settings')
    .select('*')
    .single();
  if (error) throw error;
  return data;
}

export async function upsertCommunicationSettings({ smtp, welcome_template, reset_template }) {
  const { data, error } = await supabase
    .from('communication_settings')
    .upsert([
      { id: 1, smtp, welcome_template, reset_template },
    ], { onConflict: ['id'] })
    .single();
  if (error) throw error;
  return data;
}
