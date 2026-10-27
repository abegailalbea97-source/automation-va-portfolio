import { useEffect, useRef } from 'react';

// Desktop-only robotic cursor. Phones and tablets keep their normal touch behavior.
export default function LogoCursor() {
  const ref = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!fine.matches) return;
    const el = ref.current;
    const img = new Image();
    let ready = false;
    img.onload = () => (ready = true);
    img.src = '/cursor-ready.png';

    const move = (e) => {
      if (!ready) return;
      el.style.transform = `translate3d(${e.clientX - 5}px, ${e.clientY - 4}px, 0)`;
      document.documentElement.classList.add('has-logo-cursor');
    };
    const over = (e) => el.classList.toggle('is-hovering', Boolean(e.target.closest?.('a, button, .btn, [role="button"]')));
    const leave = () => document.documentElement.classList.remove('has-logo-cursor');

    document.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', over);
    document.documentElement.addEventListener('pointerleave', leave);
    return () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
      document.documentElement.removeEventListener('pointerleave', leave);
      leave();
    };
  }, []);

  return (
    <div ref={ref} className="logo-cursor" aria-hidden="true">
      <img src="/cursor-ready.png" alt="" draggable="false" />
    </div>
  );
}
