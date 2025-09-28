// main.js - small, well-documented

document.addEventListener('DOMContentLoaded', function () {
  // 1) Set dynamic year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 2) Mobile nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
      navToggle.setAttribute('aria-expanded', !expanded);
      mainNav.classList.toggle('open');
    });
  }

  // 3) Scroll reveal using IntersectionObserver
  const revealElems = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window && revealElems.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // optionally unobserve for performance
          observer.unobserve(entry.target);
        }
      });
    }, {threshold: 0.15});
    revealElems.forEach(el => observer.observe(el));
  } else {
    // fallback - reveal all
    revealElems.forEach(el => el.classList.add('revealed'));
  }

  // 4) Contact form validation + fake submit
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');
      const msg = document.getElementById('form-msg');

      // simple checks
      if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
        msg.textContent = 'Please fill in all required fields.';
        msg.style.color = 'crimson';
        return;
      }
      // rudimentary email regex
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.value.trim())) {
        msg.textContent = 'Please enter a valid email address.';
        msg.style.color = 'crimson';
        return;
      }

      // Emulate successful submit (replace with actual POST to API)
      msg.textContent = 'Thanks — your message has been sent!';
      msg.style.color = 'green';
      form.reset();

      // If you have a backend or Netlify forms you can send using fetch() here.
    });
  }
});
