import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_INTL } from '../lib/supabase';
import { useFormSubmit, trimTo } from '../lib/useFormSubmit';
import { track } from '../lib/track';

export default function Contact() {
  const { status, error, onSubmit, reset } = useFormSubmit('contact_messages', (d) => ({
    name: trimTo(d.name, 100),
    email: trimTo(d.email, 160),
    company: trimTo(d.company, 120) || null,
    service: trimTo(d.service, 60) || null,
    message: trimTo(d.message, 2000),
  }));

  return (
    <section id="contact" className="section-anchor" data-scene="contact">
      <div className="contact-box">
        <div className="section-label">08 / CONNECTION REQUEST</div>
        <h2>Let's Automate <span className="green">Something Great</span></h2>
        <p className="section-text centered">
          Tell me which task eats up your team's week. I'll map it out and show you how it could
          run on its own. The first call is free.
        </p>

        {status === 'sent' ? (
          <div className="form-success" role="status">
            <strong>Message received!</strong> I'll get back to you soon.
            <button type="button" className="btn" onClick={reset}>SEND ANOTHER</button>
          </div>
        ) : (
          <form className="site-form" onSubmit={onSubmit}>
            <div className="form-row">
              <label className="field">
                Name *
                <input name="name" required maxLength={100} autoComplete="name" />
              </label>
              <label className="field">
                Email *
                <input name="email" type="email" required maxLength={160} autoComplete="email" inputMode="email" />
              </label>
            </div>
            <div className="form-row">
              <label className="field">
                Company
                <input name="company" maxLength={120} autoComplete="organization" />
              </label>
              <label className="field">
                I need help with
                <select name="service" defaultValue="">
                  <option value="">Choose one (optional)</option>
                  <option>Lead &amp; form automation</option>
                  <option>CRM setup &amp; follow-ups</option>
                  <option>Notifications &amp; routing</option>
                  <option>Data cleanup &amp; reporting</option>
                  <option>AI-assisted workflows</option>
                  <option>Something else</option>
                </select>
              </label>
            </div>
            <label className="field">
              What would you like to automate? *
              <textarea name="message" required minLength={10} maxLength={2000} rows={5} />
            </label>
            <input type="text" name="website" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            {error && <p className="form-error" role="alert">{error}</p>}
            <button className="btn primary submit-wide" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'SENDING…' : 'SEND MESSAGE'}
            </button>
          </form>
        )}

        <div className="contact-direct">
          <span>Or reach me directly:</span>
          <a href={`mailto:${CONTACT_EMAIL}`} onClick={() => track('cta_click', 'contact_email')}>{CONTACT_EMAIL}</a>
          <a href={`tel:${CONTACT_PHONE_INTL}`} onClick={() => track('cta_click', 'contact_call')}>☎ {CONTACT_PHONE}</a>
        </div>
      </div>
    </section>
  );
}
