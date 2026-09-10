(() => {
  const header = document.querySelector('[data-header]');
  const menuBtn = document.querySelector('[data-menu-toggle]');
  const mobileNav = document.querySelector('[data-mobile-nav]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const setMenuOpen = (open) => {
    if (!mobileNav || !menuBtn) return;
    mobileNav.hidden = !open;
    menuBtn.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('overflow-hidden', open);
  };

  menuBtn?.addEventListener('click', () => {
    const isOpen = menuBtn.getAttribute('aria-expanded') === 'true';
    setMenuOpen(!isOpen);
  });

  mobileNav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuOpen(false));
  });

  const syncHeader = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };

  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const id = anchor.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      const headerOffset = header?.offsetHeight ?? 72;
      const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
      history.pushState(null, '', id);
    });
  });

  const slides = document.querySelectorAll('[data-slide]');
  const dots = document.querySelectorAll('[data-slide-dot]');
  let currentSlide = 0;
  let slideTimer = null;

  const showSlide = (index) => {
    if (!slides.length) return;
    currentSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('is-active', i === currentSlide));
    dots.forEach((dot, i) => dot.classList.toggle('is-active', i === currentSlide));
  };

  const startSlider = () => {
    if (!slides.length || reduceMotion) return;
    slideTimer = window.setInterval(() => showSlide(currentSlide + 1), 5000);
  };

  const resetSlider = () => {
    if (slideTimer) window.clearInterval(slideTimer);
    startSlider();
  };

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      showSlide(i);
      resetSlider();
    });
  });

  if (slides.length) {
    showSlide(0);
    startSlider();
  }

  document.querySelectorAll('[data-tabs]').forEach((tabsRoot) => {
    const buttons = tabsRoot.querySelectorAll('[data-tab-btn]');
    const panels = tabsRoot.querySelectorAll('[data-tab-panel]');

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-tab-btn');
        buttons.forEach((b) => {
          const active = b.getAttribute('data-tab-btn') === target;
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-selected', String(active));
        });
        panels.forEach((panel) => {
          const show = panel.getAttribute('data-tab-panel') === target;
          panel.hidden = !show;
        });
      });
    });
  });

  const openModal = (modal) => {
    if (!modal) return;
    modal.hidden = false;
    document.body.classList.add('overflow-hidden');
    const firstInput = modal.querySelector('input, textarea, button');
    firstInput?.focus();
  };

  const closeModal = (modal) => {
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove('overflow-hidden');
  };

  document.querySelectorAll('[data-modal-open]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const id = trigger.getAttribute('data-modal-open');
      const modal = document.querySelector(`[data-modal="${id}"]`);
      openModal(modal);
    });
  });

  document.querySelectorAll('[data-modal]').forEach((modal) => {
    modal.querySelectorAll('[data-modal-close]').forEach((el) => {
      el.addEventListener('click', () => closeModal(modal));
    });
    modal.querySelector('.modal__backdrop')?.addEventListener('click', () => closeModal(modal));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    setMenuOpen(false);
    document.querySelectorAll('[data-modal]:not([hidden])').forEach((modal) => closeModal(modal));
  });

  document.querySelectorAll('[data-accordion]').forEach((accordion) => {
    accordion.querySelectorAll('[data-accordion-trigger]').forEach((trigger) => {
      const panel = trigger.nextElementSibling;
      trigger.addEventListener('click', () => {
        const expanded = trigger.getAttribute('aria-expanded') === 'true';
        trigger.setAttribute('aria-expanded', String(!expanded));
        if (panel) panel.hidden = expanded;
      });
    });
  });

  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
