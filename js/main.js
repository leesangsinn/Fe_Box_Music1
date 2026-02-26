// Main JavaScript File
console.log('MACOLIZ BOX - App Loaded');

// Smooth scroll behavior for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#login-modal') {
            return; // Let the modal handle itself with :target
        }
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('login-modal');
    if (e.target === modal) {
        window.location.hash = '';
    }
});

// Add animation to elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe offer cards and room cards
document.querySelectorAll('.offer-card, .room-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// CTA & common button click handler
document.querySelectorAll('.primary-btn, .secondary-btn, .cta-btn, .booking-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Nếu là thẻ <a> có href thì để trình duyệt điều hướng bình thường
        if (this.tagName.toLowerCase() === 'a' && this.getAttribute('href')) {
            return;
        }
        if (this.type !== 'submit') {
            e.preventDefault();
        }
        console.log('Button clicked:', this.textContent.trim());
    });
});

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 10) {
        header.style.boxShadow = '0 5px 20px rgba(214, 27, 138, 0.2)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// Handle form submissions
document.querySelector('.login-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Đăng nhập thành công!');
    window.location.hash = '';
});

document.querySelector('.booking-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Tìm phòng thành công! Vui lòng chờ xác nhận.');
});

// ============================
// ROOM DETAIL PAGE INTERACTIONS
// ============================

// Thumbnail gallery switcher
(function () {
    const mainImage = document.getElementById('room-main-image');
    const thumbsContainer = document.getElementById('room-gallery-thumbs');
    if (!mainImage || !thumbsContainer) return;

    thumbsContainer.addEventListener('click', function (event) {
        const thumb = event.target.closest('.room-thumb');
        if (!thumb) return;

        const newSrc = thumb.getAttribute('data-src');
        if (!newSrc) return;

        mainImage.src = newSrc;

        thumbsContainer.querySelectorAll('.room-thumb').forEach(t => {
            t.classList.toggle('is-active', t === thumb);
        });
    });
})();

// Booking summary (room detail page, đơn giản – không combo, không mã giảm giá)
(function () {
    const bookingForm = document.getElementById('room-booking-form');
    if (!bookingForm) return;

    const ROOM_BASE_PRICE = 300000; // 2 giờ

    const durationSelect = document.getElementById('booking-duration');
    const summaryRoomPrice = document.getElementById('summary-room-price');
    const summaryTotal = document.getElementById('summary-total');

    function formatCurrency(value) {
        return value.toLocaleString('vi-VN') + 'đ';
    }

    function getDurationMultiplier() {
        const hours = parseInt(durationSelect?.value || '2', 10);
        return Math.max(hours, 1) / 2;
    }

    function updateSummary() {
        const roomPrice = Math.round(ROOM_BASE_PRICE * getDurationMultiplier());
        const total = Math.max(roomPrice, 0);

        if (summaryRoomPrice) summaryRoomPrice.textContent = formatCurrency(roomPrice);
        if (summaryTotal) summaryTotal.textContent = formatCurrency(total);
    }

    // Duration change affects room price
    durationSelect?.addEventListener('change', updateSummary);

    // Booking submit -> chuyển sang trang QR đặt cọc
    bookingForm.addEventListener('submit', function (e) {
        e.preventDefault();
        window.location.href = 'deposit.html';
    });

    updateSummary();
})();
