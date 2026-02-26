/**
 * Home Page Logic
 * Xu ly cac tuong tac tren trang chu va trang lien he.
 */

document.addEventListener('DOMContentLoaded', function () {

  // Smooth scroll cho navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#login-modal') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Dong modal khi click ngoai
  document.addEventListener('click', function (e) {
    const modal = document.getElementById('login-modal');
    if (e.target === modal) {
      window.location.hash = '';
    }
  });

  // Scroll reveal animation
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.offer-card, .room-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
  });

  // Header shadow on scroll
  window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    if (!header) return;
    if (window.scrollY > 10) {
      header.style.boxShadow = '0 5px 20px rgba(214, 27, 138, 0.2)';
    } else {
      header.style.boxShadow = 'none';
    }
  });

  // Login form submit
  document.querySelector('.login-form')?.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Dang nhap thanh cong!');
    window.location.hash = '';
  });

  // Booking form submit
  document.querySelector('.booking-form')?.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Tim phong thanh cong! Vui long cho xac nhan.');
  });
});
