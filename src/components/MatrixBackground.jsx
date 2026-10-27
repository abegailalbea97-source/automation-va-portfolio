import { useEffect, useRef } from 'react';

const CHARS = '01アイウエオ{}[]<>/+-=';

// Lightweight falling-code background. About 10 to 18fps, paused when hidden,
// off for reduced-motion users, and sparser on phones.
export default function MatrixBackground({ paused }) {
  const ref = useRef(null);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let drops = [];
    let width = 0;
    let height = 0;
    let fontSize = 14;
    let raf = 0;
    let last = 0;

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      fontSize = width < 600 ? 16 : 14;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const spacing = width < 600 ? fontSize * 1.6 : fontSize;
      drops = Array.from({ length: Math.ceil(width / spacing) }, () => Math.random() * (height / fontSize));
      drops.spacing = spacing;
    };

    const draw = (now) => {
      raf = requestAnimationFrame(draw);
      const interval = width < 600 ? 110 : 95;
      if (document.hidden || pausedRef.current || now - last < interval) return;
      last = now;
      ctx.fillStyle = 'rgba(5, 8, 7, 0.09)';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = '#39ff88';
      ctx.font = `${fontSize}px monospace`;
      drops.forEach((y, i) => {
        ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], i * drops.spacing, y * fontSize);
        drops[i] = y * fontSize > height && Math.random() > 0.975 ? 0 : y + 0.45;
      });
    };

    setup();
    raf = requestAnimationFrame(draw);
    window.addEventListener('resize', setup);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', setup);
    };
  }, []);

  return <canvas ref={ref} className="matrix" aria-hidden="true" />;
}
