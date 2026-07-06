(function () {
  const slides = Array.from(document.querySelectorAll('.slide'));
  const dotsContainer = document.getElementById('deck-dots');
  const btnPrev = document.getElementById('deck-prev');
  const btnNext = document.getElementById('deck-next');
  let current = 0;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'deck-nav__dot' + (i === 0 ? ' deck-nav__dot--active' : '');
    dot.setAttribute('aria-label', 'Слайд ' + (i + 1));
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  const dots = () => Array.from(dotsContainer.querySelectorAll('.deck-nav__dot'));

  function goTo(index) {
    index = Math.max(0, Math.min(slides.length - 1, index));
    if (index === current) return;
    current = index;
    slides[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
    updateUI();
  }

  function updateUI() {
    dots().forEach((d, i) => d.classList.toggle('deck-nav__dot--active', i === current));
    btnPrev.disabled = current === 0;
    btnNext.disabled = current === slides.length - 1;
  }

  btnPrev.addEventListener('click', () => goTo(current - 1));
  btnNext.addEventListener('click', () => goTo(current + 1));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
      e.preventDefault();
      goTo(current + 1);
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      goTo(current - 1);
    }
    if (e.key === 'Home') goTo(0);
    if (e.key === 'End') goTo(slides.length - 1);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const idx = slides.indexOf(entry.target);
        if (idx !== -1) {
          current = idx;
          updateUI();
        }
      });
    },
    { threshold: 0.55 }
  );

  slides.forEach((s) => observer.observe(s));
  updateUI();
})();
