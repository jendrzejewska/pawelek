const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Zamknij menu' : 'Otwórz menu');
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Otwórz menu');
  }));
}
document.getElementById('year').textContent = new Date().getFullYear();


// Rotacyjna karuzela opinii Google — automatyczna zmiana co 6 sekund.
(() => {
  const carousel = document.querySelector('.review-carousel');
  if (!carousel) return;
  const slides = [...carousel.querySelectorAll('.review-slide')];
  const dots = [...carousel.querySelectorAll('.review-dot')];
  const previous = carousel.querySelector('[data-review-prev]');
  const next = carousel.querySelector('[data-review-next]');
  let current = 0;
  let timer;
  const show = (index) => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => { slide.hidden = i !== current; slide.classList.toggle('is-active', i === current); });
    dots.forEach((dot, i) => { dot.classList.toggle('is-active', i === current); if (i === current) dot.setAttribute('aria-current', 'true'); else dot.removeAttribute('aria-current'); });
  };
  const stop = () => window.clearInterval(timer);
  const start = () => { stop(); timer = window.setInterval(() => show(current + 1), 6000); };
  previous?.addEventListener('click', () => { show(current - 1); start(); });
  next?.addEventListener('click', () => { show(current + 1); start(); });
  dots.forEach(dot => dot.addEventListener('click', () => { show(Number(dot.dataset.reviewGo)); start(); }));
  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', start);
  carousel.addEventListener('focusin', stop);
  carousel.addEventListener('focusout', start);
  document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());
  show(0); start();
})();
