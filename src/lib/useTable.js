import { useEffect, useState } from 'react';
import { supabase } from './supabase';

// Loads published rows from a Supabase table, ordered by sort_order.
// Shows the built-in fallback until data arrives, or if Supabase is
// unreachable or the table is empty.
export function useTable(table, fallback) {
  const [rows, setRows] = useState(fallback);

  useEffect(() => {
    if (!supabase) return;
    let alive = true;
    supabase
      .from(table)
      .select('*')
      .eq('published', true)
      .order('sort_order', { ascending: true })
      .then(({ data, error }) => {
        if (alive && !error && Array.isArray(data) && data.length) setRows(data);
      });
    return () => {
      alive = false;
    };
  }, [table]);

  return rows;
}
