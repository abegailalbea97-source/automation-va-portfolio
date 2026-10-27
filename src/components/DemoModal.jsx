import { useEffect, useRef, useState } from 'react';

const HEADINGS = {
  1: 'Form → Sheet Preview',
  2: 'Telegram Alert Simulation',
  3: 'Email Confirmation Preview',
  4: 'Conditional Router Simulation',
};

const FIELDS = {
  1: [['Customer name', 'name', 'Alex Rivera'], ['Service requested', 'service', 'Appointment scheduling']],
  2: [['Notification subject', 'subject', 'New lead received'], ['Team or channel', 'channel', 'Sales Team']],
  3: [['Recipient name', 'recipient', 'Jamie Cruz'], ['Request topic', 'topic', 'Pricing inquiry']],
};

const SUBMIT = { 1: 'ADD SAMPLE ROW', 2: 'SIMULATE ALERT', 3: 'PREVIEW EMAIL', 4: 'RUN ROUTER' };

const ROUTES = {
  quote: ['SALES QUEUE', 'Send pricing and quote inquiries to the sales team.'],
  support: ['SUPPORT QUEUE', 'Assign service issues to customer support.'],
  general: ['GENERAL INBOX', 'Direct all other requests to the general inbox.'],
};

export default function DemoModal({ id, onClose }) {
  const windowRef = useRef(null);
  const [rows, setRows] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    setResult(null);
    if (!id) return;
    const prev = document.activeElement;
    requestAnimationFrame(() => windowRef.current?.querySelector('input,select')?.focus({ preventScroll: true }));

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key !== 'Tab') return;
      const f = [...windowRef.current.querySelectorAll('button,input,select')];
      if (!f.length) return;
      const i = f.indexOf(document.activeElement);
      if (e.shiftKey && i === 0) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
    };
    document.addEventListener('keydown', onKey);
    document.body.classList.add('demo-open');
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('demo-open');
      prev?.focus?.();
    };
  }, [id, onClose]);

  if (!id) return null;

  const submit = (e) => {
    e.preventDefault();
    const v = Object.fromEntries(new FormData(e.currentTarget));
    if (id === 1) {
      const next = [{ name: v.name, service: v.service }, ...rows].slice(0, 5);
      setRows(next);
      setResult(
        <>
          <strong>Simulated Google Sheets rows</strong>
          <div className="demo-scroll">
            <table>
              <thead><tr><th>Customer</th><th>Service</th><th>Status</th></tr></thead>
              <tbody>{next.map((r, i) => <tr key={i}><td>{r.name}</td><td>{r.service}</td><td>Simulated</td></tr>)}</tbody>
            </table>
          </div>
        </>
      );
    } else if (id === 2) {
      setResult(
        <>
          <strong>Simulated Telegram notification</strong>
          <div className="demo-msg">🔔 {v.subject}<p>Send to: {v.channel}</p><small>Preview only · Nothing was delivered</small></div>
        </>
      );
    } else if (id === 3) {
      setResult(
        <>
          <strong>Simulated email confirmation</strong>
          <div className="demo-msg">
            <b>To:</b> {v.recipient} (sample)
            <p><b>Subject:</b> We received your {v.topic}</p>
            <p>Hello {v.recipient}, thank you for your inquiry. We've received your request regarding {v.topic} and will follow up shortly.</p>
            <small>Preview only · No email sent</small>
          </div>
        </>
      );
    } else {
      const [queue, note] = ROUTES[v.kind] || ROUTES.general;
      setResult(
        <>
          <strong>Conditional router: {queue}</strong>
          <div className="demo-msg">New Request → Condition Check → {queue}<p>{note}</p><small>Simulated branch, no external service connected</small></div>
        </>
      );
    }
  };

  return (
    <div className="demo-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="demo-window" role="dialog" aria-modal="true" aria-labelledby="demoTitle" ref={windowRef}>
        <div className="demo-window-top">
          <span>GAIL.SYS / SIMULATION LAB</span>
          <button type="button" onClick={onClose} aria-label="Close demonstration">✕ CLOSE</button>
        </div>
        <h2 id="demoTitle">{HEADINGS[id]}</h2>
        <p className="demo-disclaimer">
          Interactive simulation using fictional data. This demo does not connect to Google,
          Telegram, Gmail, or Make.com and does not send messages.
        </p>
        <form className="demo-form" onSubmit={submit} key={id}>
          {id === 4 ? (
            <label className="field">
              Request type
              <select name="kind" defaultValue="quote">
                <option value="quote">Pricing / Quote</option>
                <option value="support">Support request</option>
                <option value="general">General inquiry</option>
              </select>
            </label>
          ) : (
            FIELDS[id].map(([label, name, value]) => (
              <label className="field" key={name}>
                {label}
                <input name={name} type="text" defaultValue={value} required maxLength={140} />
              </label>
            ))
          )}
          <button className="btn primary" type="submit">{SUBMIT[id]}</button>
        </form>
        <div className="demo-result" aria-live="polite">{result || 'Ready to simulate.'}</div>
      </div>
    </div>
  );
}
