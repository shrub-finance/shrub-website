'use client';

import { useEffect } from 'react';

/** Fades each block of the story in once, as it scrolls into view. The hidden state lives in globals.css. */
export default function RevealOnScroll() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );
    document.querySelectorAll('.story > *').forEach((block) => observer.observe(block));
    return () => observer.disconnect();
  }, []);

  return null;
}
