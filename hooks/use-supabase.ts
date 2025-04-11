import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export function useSupabaseQuery<T>(
  table: string,
  options: {
    select?: string;
    filter?: Record<string, any>;
  } = {}
) {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        let query = supabase.from(table).select(options.select || '*');

        if (options.filter) {
          Object.entries(options.filter).forEach(([key, value]) => {
            query = query.eq(key, value);
          });
        }

        const { data: result, error } = await query;

        if (error) throw error;
        setData(result as T[]);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [table, options.select, JSON.stringify(options.filter)]);

  return { data, error, loading };
}

export async function createRecord<T>(
  table: string,
  data: Partial<T>
): Promise<T> {
  const { data: result, error } = await supabase
    .from(table)
    .insert([data])
    .select()
    .single();

  if (error) throw error;
  return result as T;
}

export async function updateRecord<T>(
  table: string,
  id: string,
  data: Partial<T>
): Promise<T> {
  const { data: result, error } = await supabase
    .from(table)
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return result as T;
}

export async function deleteRecord(
  table: string,
  id: string
): Promise<void> {
  const { error } = await supabase
    .from(table)
    .delete()
    .eq('id', id);

  if (error) throw error;
}