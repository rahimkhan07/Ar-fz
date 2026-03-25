import { useEffect, useRef } from 'react';

export default function BowCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    // Hide native cursor
    document.documentElement.style.cursor = 'none';

    const el = cursorRef.current;

    function move(e) {
      if (!el) return;
      el.style.left = e.clientX + 'px';
      el.style.top  = e.clientY + 'px';
      el.style.opacity = '1';
    }

    function hide() { if (el) el.style.opacity = '0'; }

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseleave', hide);

    return () => {
      document.documentElement.style.cursor = '';
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', hide);
    };
  }, []);

  return (
    <div ref={cursorRef} className="bow-cursor" aria-hidden="true">
      🎀
    </div>
  );
}
