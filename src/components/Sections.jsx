import Reveal from './Reveal';
import { useTable } from '../lib/useTable';
import { track } from '../lib/track';
import * as defaults from '../data/defaults';

const asList = (v) => (Array.isArray(v) ? v : v ? String(v).split(',').map((s) => s.trim()).filter(Boolean) : []);

function formatDate(iso) {
  if (!iso) return '';
  const d = new Date(`${String(iso).slice(0, 10)}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return String(iso);
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC' }).toUpperCase();
}

function SectionHead({ label, title, accent, children }) {
  return (
    <>
      <div className="section-label">{label}</div>
      <h2>{title} <span className="green">{accent}</span></h2>
      {children && <p className="section-text">{children}</p>}
    </>
  );
}

export function About() {
  return (
    <section id="about" className="section-anchor" data-scene="about">
      <SectionHead label="01 / OPERATOR PROFILE" title="Operations first." accent="Then automation." />
      <p className="section-text">
        Good automation starts with knowing how the work is done. Before I built workflows, I
        did the work by hand: encoding and validating survey data for the Philippine Statistics
        Authority, keeping accurate contact records under pressure for the DILG, and running
        financial documentation, compliance, and reporting as an Assistant Branch Manager at
        M Lhuillier.
      </p>
      <p className="section-text">
        Since June 2024 I've automated that kind of work for clients and for my own branch. I connect forms, spreadsheets, email,
        CRMs, and messaging apps with Zapier, Make.com, n8n, and HighLevel. Leads get captured,
        data gets cleaned up, and follow-ups go out without anyone copy-pasting. I map your
        process first, build the workflow, test it against messy real-world data, and document
        it so your team can trust it.
      </p>
    </section>
  );
}

export function Skills() {
  const rows = useTable('skills', defaults.skills);
  return (
    <section id="skills" className="section-anchor" data-scene="skills">
      <SectionHead label="02 / TECHNOLOGY MATRIX" title="Tools &" accent="Capabilities" />
      <div className="cards">
        {rows.map((s, i) => (
          <Reveal as="article" className="card" key={s.id} delay={(i % 3) * 70}>
            <h3>{s.title}</h3>
            <p>{s.description}</p>
            {s.tag && <span className="tag">{s.tag}</span>}
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Certificates() {
  const rows = useTable('certificates', defaults.certificates);
  return (
    <section id="certificates" className="section-anchor" data-scene="certificates">
      <SectionHead label="03 / CERTIFICATION DATABASE" title="Training" accent="Certificates">
        Completed training certificates issued by Technical Virtual Assistants PH. Tap a
        certificate to view the original PDF.
      </SectionHead>
      <div className="certificate-grid">
        {rows.map((c, i) => (
          <Reveal as="article" className="certificate-card" key={c.id} delay={(i % 2) * 70}>
            <div className="certificate-card-top">
              <span>RECORD / {String(i + 1).padStart(2, '0')}</span>
              <span className="certificate-status">● TRAINING COMPLETED</span>
            </div>
            <a
              className="certificate-preview"
              href={c.pdf_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${c.platform} certificate PDF in a new tab`}
              onClick={() => track('certificate_open', c.platform)}
            >
              <img loading="lazy" src={c.image_url} alt={`Certificate of Completion for Abegail Albea: ${c.course}`} width="842" height="596" />
              <span className="certificate-scan" aria-hidden="true" />
            </a>
            <div className="certificate-details">
              <h3>{c.platform}</h3>
              <p>{c.course}</p>
              <p className="certificate-issuer">{c.issuer} · {formatDate(c.issued_on)}</p>
              {c.topics && <p className="certificate-topics">{c.topics}</p>}
              <a className="btn certificate-open" href={c.pdf_url} target="_blank" rel="noopener noreferrer" onClick={() => track('certificate_open', c.platform)}>
                VIEW CERTIFICATE ↗
              </a>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="certificate-note">These are training completion certificates, not professional licenses or vendor-issued certifications.</p>
    </section>
  );
}

export function Projects({ onDemo }) {
  const rows = useTable('projects', defaults.projects);
  return (
    <section id="projects" className="section-anchor" data-scene="projects">
      <SectionHead label="04 / PROJECT SHOWCASE" title="Workflow" accent="Case Studies">
        Four workflows I designed and built around common small-business problems. Each one has
        a live, interactive preview you can try right here.
      </SectionHead>
      <div className="showcase-grid">
        {rows.map((p, i) => (
          <Reveal as="article" className="card showcase-card" key={p.id} delay={(i % 2) * 70}>
            <div className="showcase-code">{p.code} <span className="showcase-type">DEMO BUILD</span></div>
            <h3>{p.title}</h3>
            {p.problem && <p><strong>Problem:</strong> {p.problem}</p>}
            {p.workflow && <p><strong>Workflow:</strong> {p.workflow}</p>}
            {p.value && <p><strong>Value:</strong> {p.value}</p>}
            <div className="showcase-skill">{asList(p.tags).map((t) => <span className="tag" key={t}>{t}</span>)}</div>
            {p.demo >= 1 && p.demo <= 4 && (
              <button className="btn demo-launch" type="button" onClick={() => onDemo(Number(p.demo))}>
                TRY LIVE DEMO ↗
              </button>
            )}
          </Reveal>
        ))}
      </div>
      <div className="proof-strip">
        <div><strong>Operational Support</strong><span>Documentation, records, financial reporting, and team coordination</span></div>
        <div><strong>Research &amp; Data Skills</strong><span>Survey support, structured records, data validation, and detail-focused work</span></div>
        <div><strong>Automation Toolkit</strong><span>Zapier, Make.com, n8n, HighLevel, Google Workspace, and Telegram</span></div>
      </div>
    </section>
  );
}

export function Services() {
  const rows = useTable('services', defaults.services);
  return (
    <section id="services" className="section-anchor" data-scene="services">
      <SectionHead label="05 / SERVICES" title="What I Can" accent="Do For You" />
      <div className="cards">
        {rows.map((s, i) => (
          <Reveal as="article" className="card" key={s.id} delay={(i % 3) * 70}>
            <h3>{s.title}</h3>
            <p>{s.description}</p>
            {asList(s.tags).map((t) => <span className="tag" key={t}>{t}</span>)}
          </Reveal>
        ))}
      </div>
      <ol className="process-steps">
        <li><strong>1 · Map</strong><span>We walk through how the task is done today.</span></li>
        <li><strong>2 · Build</strong><span>I build the workflow in the tool that fits your stack.</span></li>
        <li><strong>3 · Test</strong><span>I run it against real and edge-case data before launch.</span></li>
        <li><strong>4 · Hand over</strong><span>You get documentation and support after launch.</span></li>
      </ol>
    </section>
  );
}

export function Experience() {
  const rows = useTable('experience', defaults.experience);
  return (
    <section id="experience" className="section-anchor" data-scene="experience">
      <SectionHead label="07 / WORK HISTORY" title="Professional" accent="Experience" />
      <div className="timeline">
        {rows.map((e) => (
          <Reveal as="article" className="card" key={e.id}>
            <h3>{e.role}</h3>
            <p className="timeline-org">{e.org}{e.period ? ` · ${e.period}` : ''}</p>
            <ul>
              {asList(e.bullets).map((b) => <li key={b}>{b}</li>)}
              {e.skills && <li><strong>Key skills developed:</strong> {e.skills}</li>}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
