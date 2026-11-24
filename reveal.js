if (
  'IntersectionObserver' in window &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches
) {
  const revealTargets = document.querySelectorAll(
    '.site-header, .topbar, main > section, .profile-card > *, article, ' +
    '.stats > .stat, .stats-row > .stat, .tag-button, .mode-tags > span, ' +
    '.social-links > a, footer'
  );

  const revealTarget = (target) => {
    target.classList.add('is-visible');
    revealObserver.unobserve(target);
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        revealTarget(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.1
  });

  revealTargets.forEach((target, index) => {
    target.classList.add('appear-on-scroll');
    target.style.setProperty('--appear-delay', `${(index % 4) * 80}ms`);
    revealObserver.observe(target);
  });

  const revealSkippedTargets = () => {
    revealTargets.forEach((target) => {
      if (!target.classList.contains('is-visible') && target.getBoundingClientRect().top < 0) {
        revealTarget(target);
      }
    });
  };

  window.addEventListener('scroll', revealSkippedTargets, { passive: true });
  revealSkippedTargets();
}
