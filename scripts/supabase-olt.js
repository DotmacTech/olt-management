import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

// Table: Olt
// Columns: name (text), ipaddress (text), username (text), status (text), created_at (timestamptz)

export async function getOlts() {
  const { data, error } = await supabase
    .from('Olt')
    .select(`
      id, name, ipaddress, username, status,
      DeviceModel(id,vendor,name,capabilities)
    `);
  if (error) throw error;
  return data;
}

// Add a new olt to the Olt table
export async function addOlt({ name, ipaddress, username, status }) {
  // Generate a UUID for id and use current timestamp for created_at
  const id = crypto.randomUUID ? crypto.randomUUID() : (self.crypto || window.crypto).randomUUID();
  const created_at = new Date().toISOString();
  const { data, error } = await supabase
    .from('Olt')
    .insert([
      { id, name, ipaddress, username, status, created_at }
    ])
    .select()
    .single();
  if (error) throw error;
  return data;
}

// Update an OLT in the Olt table
export async function updateOlt({ id, name, ipaddress, username, status }) {
  const { data, error } = await supabase
    .from('Olt')
    .update({ name, ipaddress, username, status })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// Delete a olt from the Olt table
export async function deleteOlt(id) {
  const { error } = await supabase
    .from('Olt')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return true;
}
