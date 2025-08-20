// Мобильное меню + тень хедера при скролле
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
const header = document.querySelector('.site-header');

if (burger) {
  burger.addEventListener('click', () => {
    const opened = navLinks.classList.toggle('open');
    burger.setAttribute('aria-expanded', opened ? 'true' : 'false');
  });
}

// Тень у хедера при прокрутке
const toggleHeaderShadow = () => {
  if (window.scrollY > 8) header.setAttribute('data-elevated', '');
  else header.removeAttribute('data-elevated');
};
toggleHeaderShadow();
window.addEventListener('scroll', toggleHeaderShadow);

// Галерея — лайтбокс
const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

if (gallery && lightbox && lightboxImg) {
  gallery.addEventListener('click', (e) => {
    const a = e.target.closest('a.gallery__item');
    if (!a) return;
    e.preventDefault();
    lightboxImg.src = a.getAttribute('href');
    lightboxImg.alt = a.querySelector('img')?.alt || 'Проект';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
}

if (lightbox && lightboxClose) {
  const closeLightbox = () => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) {
      e.preventDefault();
      closeLightbox();
    }
  });
}

// Простой фронтовый «отправлено»
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(form).entries());
    if (!data.name  !data.phone  !data.message) {
      formStatus.textContent = 'Пожалуйста, заполните все поля.';
      formStatus.style.color = '#ff6b6b';
      return;
    }
    formStatus.textContent = 'Спасибо! Мы свяжемся с вами в ближайшее время.';
    formStatus.style.color = 'var(--accent)';
    form.reset();

    // Здесь можно подключить отправку на бэкенд/почту:
    // fetch('/api/send', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(data) })
  });
}

// Текущий год в футере
const yearSpan = document.getElementById('year');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();