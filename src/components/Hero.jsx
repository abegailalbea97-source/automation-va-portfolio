import { useRef, useState } from 'react';
import { track } from '../lib/track';

export default function Hero() {
  const stage = useRef(null);
  const [loaded, setLoaded] = useState(false);

  // 3D tilt on desktop mouse only.
  const onMove = (e) => {
    if (e.pointerType !== 'mouse') return;
    const b = stage.current.getBoundingClientRect();
    const x = (e.clientX - (b.left + b.width / 2)) / (b.width / 2);
    const y = (e.clientY - (b.top + b.height / 2)) / (b.height / 2);
    stage.current.style.setProperty('--stage-y', `${(x * 16).toFixed(1)}deg`);
    stage.current.style.setProperty('--stage-x', `${(-y * 14).toFixed(1)}deg`);
  };
  const onLeave = () => {
    stage.current.style.removeProperty('--stage-x');
    stage.current.style.removeProperty('--stage-y');
  };

  return (
    <header className="hero section-anchor" id="home" data-scene="home">
      <div className="hero-grid-floor" aria-hidden="true" />
      <div className="hero-copy">
        <div className="status">● OPEN TO REMOTE OPPORTUNITIES</div>
        <h1>ABEGAIL<br /><span>ALBEA</span></h1>
        <div className="subtitle">AUTOMATION VIRTUAL ASSISTANT</div>
        <p className="intro">
          I turn repetitive admin work into reliable, automated workflows. Since 2019 I've
          worked with data, records, and reports in government research, public health, and
          branch operations. Now I build the automations that handle that work for you, using
          Zapier, Make.com, n8n, and HighLevel.
        </p>
        <ul className="hero-proof">
          <li><strong>2019</strong><span>working with data &amp; records since</span></li>
          <li><strong>4</strong><span>automation platforms trained</span></li>
          <li><strong>3</strong><span>roles in data &amp; operations</span></li>
        </ul>
        <div className="buttons">
          <a className="btn primary" href="#projects" onClick={() => track('cta_click', 'hero_workflows')}>SEE MY WORKFLOWS</a>
          <a className="btn" href="#contact" onClick={() => track('cta_click', 'hero_book')}>BOOK A FREE CALL</a>
        </div>
      </div>

      <div
        ref={stage}
        className={`portrait-stage${loaded ? ' is-loaded' : ''}`}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
      >
        <span className="orbit-ring" aria-hidden="true" />
        <span className="orbit-ring outer" aria-hidden="true" />
        <span className="hud-chip top" aria-hidden="true">SYS / 100% ONLINE</span>
        <span className="hud-chip bottom" aria-hidden="true">AI // WORKFLOW OPERATOR</span>
        <div className="robot-frame">
          <div className="hologram-wrap">
            <img
              className="hologram-photo"
              src="/profile.jpg"
              alt="Portrait of Abegail Albea"
              width="720"
              height="957"
              fetchPriority="high"
              decoding="async"
              onLoad={() => setLoaded(true)}
              onError={() => setLoaded(true)}
            />
            <span className="holo-glitch" aria-hidden="true" />
            <span className="holo-beam" aria-hidden="true" />
          </div>
          <span className="frame-label" aria-hidden="true">OPERATOR // ABEGAIL ALBEA</span>
        </div>
      </div>
    </header>
  );
}
