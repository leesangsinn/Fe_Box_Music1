/**
 * MACOLIZ BOX - Main Entry Point
 *
 * File khoi tao chung cho toan bo ung dung client.
 * Cac logic cu the da duoc tach ra thanh cac module rieng tai:
 *   - js/pages/home.js     : Trang chu & Lien he
 *   - js/pages/booking.js  : Dat phong truc tuyen
 *   - js/pages/menu.js     : Menu goi mon (in-room)
 *   - js/api/config.js     : Cau hinh API
 *   - js/api/bookingApi.js : Booking API calls
 *   - js/api/inRoomApi.js  : In-Room API calls
 *   - js/api/authApi.js    : Auth API calls
 *   - js/store/cartStore.js: Quan ly gio hang
 */

console.log('MACOLIZ BOX - Client App Loaded');

document.addEventListener('DOMContentLoaded', function () {

  // === GLOBAL: CTA button click handler ===
  document.querySelectorAll('.primary-btn, .secondary-btn, .cta-btn, .booking-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      if (this.tagName.toLowerCase() === 'a' && this.getAttribute('href')) {
        return;
      }
      if (this.type !== 'submit') {
        e.preventDefault();
      }
    });
  });

  // === GLOBAL: Room detail gallery switcher ===
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

  // === GLOBAL: Room booking summary ===
  (function () {
    const bookingForm = document.getElementById('room-booking-form');
    if (!bookingForm) return;

    const ROOM_BASE_PRICE = 300000;
    const durationSelect = document.getElementById('booking-duration');
    const summaryRoomPrice = document.getElementById('summary-room-price');
    const summaryTotal = document.getElementById('summary-total');

    function formatCurrency(value) {
      return value.toLocaleString('vi-VN') + 'd';
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

    durationSelect?.addEventListener('change', updateSummary);
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();
      window.location.href = 'deposit.html';
    });
    updateSummary();
  })();

});
