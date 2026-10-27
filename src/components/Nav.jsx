import { useEffect, useState } from 'react';
import { CONTACT_PHONE_INTL } from '../lib/supabase';
import { track } from '../lib/track';

const LINKS = [
  ['about', 'PROFILE'],
  ['skills', 'SYSTEMS'],
  ['certificates', 'CERTIFICATES'],
  ['projects', 'PROJECTS'],
  ['services', 'SERVICES'],
  ['testimonials', 'FEEDBACK'],
  ['experience', 'EXPERIENCE'],
  ['contact', 'CONTACT'],
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const onResize = () => window.innerWidth > 900 && setOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <nav className="nav">
      <a className="logo" href="#home" onClick={close}>GAIL.SYS</a>

      <button
        type="button"
        className={`menu-btn${open ? ' is-open' : ''}`}
        aria-expanded={open}
        aria-controls="nav-links"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((v) => !v)}
      >
        <span /><span /><span />
      </button>

      <div id="nav-links" className={`nav-links${open ? ' is-open' : ''}`}>
        {LINKS.map(([id, label]) => (
          <a key={id} href={`#${id}`} onClick={close}>{label}</a>
        ))}
        <div className="nav-ctas">
          <a className="header-cta header-call" href={`tel:${CONTACT_PHONE_INTL}`} onClick={() => track('cta_click', 'nav_call')}>
            ☎ CALL NOW
          </a>
          <a className="header-cta header-book" href="#contact" onClick={() => { close(); track('cta_click', 'nav_book'); }}>
            BOOK NOW
          </a>
        </div>
      </div>
    </nav>
  );
}
