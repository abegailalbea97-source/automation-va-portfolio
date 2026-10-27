import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

// When the keys are missing, the site still works with its built-in content.
// Forms then fall back to email.
export const supabase =
  url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;

export const CONTACT_EMAIL = 'abegailalbea97@gmail.com';
export const CONTACT_PHONE = '09150210143';
export const CONTACT_PHONE_INTL = '+639150210143';
