import { useEffect, useState } from 'react';

const MESSAGES = {
  home: ['HI, I’M AL', 'Hi, I’m AL. I’m here to guide you through Gail’s portfolio. How may I help you today?'],
  about: ['OPERATOR PROFILE', 'Meet Abegail Albea. She has built automations for clients since 2024, backed by data and operations work since 2019.'],
  skills: ['TECHNOLOGY MATRIX', 'Gail builds workflows in Zapier, Make.com, n8n, and HighLevel.'],
  certificates: ['CERTIFICATE DATABASE', 'Access four training completion certificates and view the original documents.'],
  projects: ['WORKFLOW CASE STUDIES', 'See four workflows Gail built. Each one has a live demo you can try.'],
  services: ['SERVICES', 'Here is what Gail can automate for your business, and how she works.'],
  testimonials: ['FEEDBACK', 'Read what people say about working with Gail, or leave your own feedback.'],
  experience: ['WORK HISTORY', "Review Gail's experience in branch operations, public service, and research."],
  contact: ['ESTABLISH CONNECTION', 'Have a task that eats up your week? Send Gail a message or book a free call.'],
};

const QUICK = [['about', 'PROFILE'], ['skills', 'SKILLS'], ['projects', 'PROJECTS'], ['services', 'SERVICES'], ['experience', 'EXPERIENCE'], ['contact', 'CONTACT']];

function RobotSvg() {
  return (
    <svg className="robot-art" viewBox="0 0 112 150" role="img" aria-label="Animated robot guide" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="robotMetal" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#a1bbaf" /><stop offset=".48" stopColor="#203e37" /><stop offset="1" stopColor="#091c16" /></linearGradient>
        <linearGradient id="robotFace" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#173d2f" /><stop offset="1" stopColor="#04120e" /></linearGradient>
      </defs>
      <ellipse cx="55" cy="141" rx="43" ry="6" fill="#39ff88" opacity=".5" />
      <g>
        <path d="M35 81L22 96l5 28 19-1 8-17M78 81l12 19-6 24-20-1-8-17" fill="url(#robotMetal)" stroke="#39ff88" strokeWidth="1.7" />
        <path d="M38 93h36l9 35H29z" fill="url(#robotMetal)" stroke="#39ff88" strokeWidth="2" />
        <path d="M39 101h34l3 21H36z" fill="#071f18" stroke="#39ff88" strokeOpacity=".5" />
        <circle className="robot-core" cx="56" cy="111" r="8" fill="#39ff88" opacity=".95" />
        <circle cx="56" cy="111" r="3" fill="#effff4" />
      </g>
      <g className="robot-arm">
        <path d="M82 85l16-2 8 18-6 5-17-8z" fill="url(#robotMetal)" stroke="#39ff88" strokeWidth="1.8" />
        <path d="M101 104l4 9-7 6-8-9z" fill="#1c4836" stroke="#39ff88" strokeWidth="1.5" />
      </g>
      <g className="robot-head">
        <path d="M56 8v12" stroke="#39ff88" strokeWidth="2.5" />
        <circle cx="56" cy="7" r="4" fill="#b5ff45" />
        <path d="M20 30L33 19h46l14 12v37L79 80H32L19 68z" fill="url(#robotMetal)" stroke="#8affbb" strokeWidth="2.5" />
        <path d="M25 34l11-8h40l11 8v29L76 73H36L25 63z" fill="url(#robotFace)" stroke="#39ff88" strokeOpacity=".7" />
        <path d="M31 49h50v12H31z" fill="#030f0a" />
        <rect className="robot-eye" x="35" y="48" width="16" height="9" rx="4" fill="#b5ff45" />
        <rect className="robot-eye" x="62" y="48" width="16" height="9" rx="4" fill="#b5ff45" />
        <path d="M46 65h20" stroke="#39ff88" strokeWidth="2" strokeLinecap="round" />
        <path d="M16 47h7v12h-7zM89 47h7v12h-7z" fill="#2e7958" stroke="#39ff88" strokeWidth="1.5" />
      </g>
    </svg>
  );
}

// Section-aware guide. Collapsed by default so it never covers content on phones.
export default function RobotGuide({ hidden }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');
  // On phones, wait until the visitor scrolls past the hero buttons so AL never covers them.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const check = () => setReady(window.innerWidth >= 900 || window.scrollY > 500);
    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check, { passive: true });
    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, []);

  useEffect(() => {
    const sections = [...document.querySelectorAll('[data-scene]')];
    if (!sections.length || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit) setActive(hit.target.dataset.scene);
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5] }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const go = (id) => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    setActive(id);
  };

  const [title, text] = MESSAGES[active] || MESSAGES.home;

  return (
    <aside className={`ai-presenter${open ? '' : ' is-collapsed'}${ready || open ? '' : ' is-waiting'}`} aria-label="Robot portfolio guide" hidden={hidden}>
      {open ? (
        <div className="presenter-panel">
          <RobotSvg />
          <div className="presenter-dialog" aria-live="polite">
            <div className="robot-meta">● AL // VIRTUAL ASSISTANT</div>
            <div className="presenter-topic">{title}</div>
            <p className="presenter-text" key={active}>{text}</p>
            <div className="robot-quick-nav">
              {QUICK.map(([id, label]) => (
                <button type="button" key={id} onClick={() => go(id)}>{label} ↗</button>
              ))}
            </div>
            <button type="button" className="robot-hide" onClick={() => setOpen(false)}>HIDE ROBOT</button>
          </div>
        </div>
      ) : (
        <button type="button" className="robot-toggle" onClick={() => setOpen(true)} aria-label="Open robot guide">
          <span className="mini-bot-face" aria-hidden="true"><span className="eye eye-left" /><span className="eye eye-right" /><span className="mouth" /></span>
          <span className="mini-bot-label">AL</span>
        </button>
      )}
    </aside>
  );
}
