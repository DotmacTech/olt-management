import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

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

// Add a new user to the Users table
export async function addUser({ name, email, role_id }) {
  // Generate a UUID for id and use current timestamp for created_at
  const id = crypto.randomUUID ? crypto.randomUUID() : (self.crypto || window.crypto).randomUUID();
  const created_at = new Date().toISOString();
  const { data, error } = await supabase
    .from('Users')
    .insert([
      { id, name, email, role_id, created_at }
    ])
    .select()
    .single();
  if (error) throw error;
  return data;
}

// Update a user in the Users table
export async function updateUser({ id, name, email, role_id }) {
  const { data, error } = await supabase
    .from('Users')
    .update({ name, email, role_id })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// Delete a user from the Users table
export async function deleteUser(id) {
  const { error } = await supabase
    .from('Users')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return true;
}
