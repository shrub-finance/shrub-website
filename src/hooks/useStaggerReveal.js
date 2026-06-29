import { useEffect } from 'react';

/**
 * Reveals elements as their group scrolls into view, staggering siblings so
 * lines appear one after another — like a sentence being spoken.
 *
 * Each group (an element matching `groupSelector`) is observed once; when it
 * enters the viewport, every `itemSelector` descendant gets the `in` class on a
 * stagger. Honours `prefers-reduced-motion` by revealing everything immediately.
 *
 * @param {React.RefObject<HTMLElement>} rootRef  Scope to search within.
 * @param {object} [opts]
 * @param {string} [opts.groupSelector='[data-reveal]']
 * @param {string} [opts.itemSelector='.sp']
 * @param {number} [opts.step=140]        Stagger between items, ms.
 * @param {number} [opts.threshold=0.22]  Visibility ratio that triggers a group.
 */
export default function useStaggerReveal(rootRef, opts = {}) {
  const {
    groupSelector = '[data-reveal]',
    itemSelector = '.sp',
    step = 140,
    threshold = 0.22,
  } = opts;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.querySelectorAll(itemSelector).forEach((el) => el.classList.add('in'));
      return;
    }

    const timers = [];
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
      { threshold }
    );

    root.querySelectorAll(groupSelector).forEach((group) => io.observe(group));

    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [rootRef, groupSelector, itemSelector, step, threshold]);
}
