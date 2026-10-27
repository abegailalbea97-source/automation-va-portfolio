import { useRef, useState } from 'react';
import { supabase } from './supabase';

// Shared submit logic for public forms: a honeypot field plus a minimum fill time
// to stop basic spam bots. The database enforces length limits as well.
export function useFormSubmit(table, buildRow) {
  const startedAt = useRef(Date.now());
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    if (data.website) { setStatus('sent'); return; } // bot filled the hidden field
    if (Date.now() - startedAt.current < 2500) {
      setError('That was quick! Please check your details and try again.');
      setStatus('error');
      return;
    }
    if (!supabase) {
      setError('The form is not connected yet. Please use the email address below.');
      setStatus('error');
      return;
    }

    setStatus('sending');
    setError('');
    const { error: err } = await supabase.from(table).insert(buildRow(data));
    if (err) {
      setError('Something went wrong sending this. Please try again, or use the email address below.');
      setStatus('error');
    } else {
      setStatus('sent');
      form.reset();
    }
  };

  const reset = () => {
    startedAt.current = Date.now();
    setStatus('idle');
    setError('');
  };

  return { status, error, onSubmit, reset };
}

export const trimTo = (v, n) => String(v ?? '').trim().slice(0, n);
