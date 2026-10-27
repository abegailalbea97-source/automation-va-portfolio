import { useEffect, useState } from 'react';
import Reveal from './Reveal';
import { supabase } from '../lib/supabase';
import { useFormSubmit, trimTo } from '../lib/useFormSubmit';

// Only feedback you approve in Supabase (approved = true) is shown here.
export default function Testimonials() {
  const [items, setItems] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const { status, error, onSubmit, reset } = useFormSubmit('testimonials', (d) => ({
    name: trimTo(d.name, 80),
    role: trimTo(d.role, 120) || null,
    quote: trimTo(d.quote, 600),
  }));

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from('testimonials')
      .select('id,name,role,quote')
      .eq('approved', true)
      .order('created_at', { ascending: false })
      .limit(9)
      .then(({ data }) => Array.isArray(data) && setItems(data));
  }, []);

  return (
    <section id="testimonials" className="section-anchor" data-scene="testimonials">
      <div className="section-label">06 / FEEDBACK</div>
      <h2>Client <span className="green">Feedback</span></h2>

      {items.length > 0 ? (
        <div className="feedback-grid">
          {items.map((t, i) => (
            <Reveal as="figure" className="card quote-card" key={t.id} delay={(i % 3) * 70}>
              <blockquote className="quote-text">“{t.quote}”</blockquote>
              <figcaption className="quote-credit">
                <strong>{t.name}</strong>{t.role ? ` · ${t.role}` : ''}
              </figcaption>
            </Reveal>
          ))}
        </div>
      ) : (
        <p className="section-text">
          New feedback from clients and colleagues will show up here. Worked with me before? I'd
          love to hear from you.
        </p>
      )}

      {!formOpen ? (
        <button type="button" className="btn feedback-toggle" onClick={() => { reset(); setFormOpen(true); }}>
          ✎ LEAVE FEEDBACK
        </button>
      ) : status === 'sent' ? (
        <div className="form-success" role="status">
          Thank you! Your feedback was received and will appear once it's reviewed.
        </div>
      ) : (
        <form className="site-form" onSubmit={onSubmit} noValidate={false}>
          <div className="form-row">
            <label className="field">
              Your name *
              <input name="name" required maxLength={80} autoComplete="name" />
            </label>
            <label className="field">
              Role / company
              <input name="role" maxLength={120} placeholder="e.g. Owner, Bright Dental" autoComplete="organization-title" />
            </label>
          </div>
          <label className="field">
            Your feedback *
            <textarea name="quote" required minLength={10} maxLength={600} rows={4} />
          </label>
          <label className="field checkbox">
            <input type="checkbox" name="consent" required />
            <span>I agree that this feedback, my name, and my role can be shown on this website.</span>
          </label>
          <input type="text" name="website" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          {error && <p className="form-error" role="alert">{error}</p>}
          <div className="buttons">
            <button className="btn primary" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'SENDING…' : 'SUBMIT FEEDBACK'}
            </button>
            <button className="btn" type="button" onClick={() => setFormOpen(false)}>CANCEL</button>
          </div>
        </form>
      )}
    </section>
  );
}
