const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const activeAnimations = new Map<HTMLElement, Animation>();
let observer: IntersectionObserver | undefined;

function stopMotion() {
  observer?.disconnect();
  activeAnimations.forEach((animation) => animation.cancel());
  activeAnimations.clear();
}

function startMotion() {
  stopMotion();
  if (reducedMotion.matches || !('IntersectionObserver' in window)) return;

  const candidates = [...document.querySelectorAll<HTMLElement>(
    '.hero-copy, .hero-visual, .page-hero__inner, main .section > .container > *',
  )];
  // Animate each block once, without nesting effects or moving sticky containers.
  const targets = candidates.filter((element) =>
    !candidates.some((parent) => parent !== element && parent.contains(element)) &&
    getComputedStyle(element).position !== 'sticky',
  );
  observer = new IntersectionObserver((entries) => {
    let order = 0;
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const element = entry.target as HTMLElement;
      observer?.unobserve(element);
      if (element.contains(document.activeElement)) continue;
      const animation = element.animate(
        [{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'translateY(0)' }],
        { duration: 580, delay: Math.min(order++, 2) * 65, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'backwards' },
      );
      activeAnimations.set(element, animation);
      animation.onfinish = () => activeAnimations.delete(element);
    }
  }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });
  targets.forEach((element) => observer?.observe(element));
}

// Keyboard navigation must never wait for an animation to finish.
document.addEventListener('focusin', (event) => {
  if (!(event.target instanceof Node)) return;
  const target = event.target;
  activeAnimations.forEach((animation, element) => {
    if (element.contains(target)) {
      animation.cancel();
      activeAnimations.delete(element);
    }
  });
});
reducedMotion.addEventListener('change', startMotion);
window.addEventListener('pagehide', stopMotion);
window.addEventListener('pageshow', (event) => { if (event.persisted) startMotion(); });
startMotion();
