import { useEffect, type RefObject } from 'react';

/**
 * Reveals elements as their group scrolls into view, staggering siblings so lines appear one
 * after another, like a sentence being spoken. Each `[data-reveal]` group is observed once; when
 * it enters the viewport every `.sp` descendant gets the `in` class on a stagger. Honours
 * `prefers-reduced-motion` by revealing everything immediately.
 */
export default function useStaggerReveal(
  rootRef: RefObject<HTMLElement | null>,
  { groupSelector = '[data-reveal]', itemSelector = '.sp', step = 140, threshold = 0.22 } = {},
): void {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.querySelectorAll(itemSelector).forEach((el) => el.classList.add('in'));
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.querySelectorAll(itemSelector).forEach((el, i) => {
            timers.push(setTimeout(() => el.classList.add('in'), i * step));
          });
          io.unobserve(entry.target);
        });
      },
      { threshold },
    );
    root.querySelectorAll(groupSelector).forEach((group) => io.observe(group));
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [rootRef, groupSelector, itemSelector, step, threshold]);
}
