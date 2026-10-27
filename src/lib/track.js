import { supabase } from './supabase';

const ALLOWED = new Set(['page_view', 'demo_open', 'cta_click', 'certificate_open']);

function referrerHost() {
  try {
    return document.referrer ? new URL(document.referrer).hostname.slice(0, 120) : null;
  } catch {
    return null;
  }
}

// Anonymous counts only: no IP address, no cookies, no personal data.
export function track(type, label = null) {
  if (!supabase || !ALLOWED.has(type)) return;
  if (navigator.doNotTrack === '1') return;

  if (type === 'page_view') {
    try {
      if (sessionStorage.getItem('gail_pv')) return;
      sessionStorage.setItem('gail_pv', '1');
    } catch {
      /* storage blocked: still count it */
    }
  }

  supabase
    .from('events')
    .insert({
      type,
      label: label ? String(label).slice(0, 80) : null,
      path: location.pathname.slice(0, 120),
      referrer: type === 'page_view' ? referrerHost() : null,
    })
    .then(() => {});
}
