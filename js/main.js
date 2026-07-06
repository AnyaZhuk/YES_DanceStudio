(function () {
  const header = document.getElementById('header');
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');

  window.addEventListener('scroll', () => {
    header.classList.toggle('header--scrolled', window.scrollY > 20);
  }, { passive: true });

  function closeMobileNav() {
    nav.classList.remove('nav--open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('nav--open');
    burger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  nav.querySelectorAll('.nav-dropdown').forEach(dropdown => {
    const toggle = dropdown.querySelector('.nav-dropdown__toggle');

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.toggle('nav-dropdown--open');
      toggle.setAttribute('aria-expanded', isOpen);

      nav.querySelectorAll('.nav-dropdown').forEach(other => {
        if (other !== dropdown) {
          other.classList.remove('nav-dropdown--open');
          other.querySelector('.nav-dropdown__toggle').setAttribute('aria-expanded', 'false');
        }
      });
    });
  });

  document.addEventListener('click', () => {
    nav.querySelectorAll('.nav-dropdown').forEach(dropdown => {
      dropdown.classList.remove('nav-dropdown--open');
      dropdown.querySelector('.nav-dropdown__toggle').setAttribute('aria-expanded', 'false');
    });
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileNav();
      nav.querySelectorAll('.nav-dropdown').forEach(dropdown => {
        dropdown.classList.remove('nav-dropdown--open');
        dropdown.querySelector('.nav-dropdown__toggle').setAttribute('aria-expanded', 'false');
      });
    }
  });

  document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => e.preventDefault());
  });
})();
