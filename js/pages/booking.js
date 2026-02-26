/**
 * Booking Page Logic
 * Xu ly cac tuong tac tren trang dat phong truc tuyen.
 */

document.addEventListener('DOMContentLoaded', function () {
  const branchSelect = document.getElementById('branchSelect');
  const roomSelect = document.getElementById('roomSelect');
  const dateSelect = document.getElementById('dateSelect');
  const timeSelect = document.getElementById('timeSelect');
  const durationSelect = document.getElementById('durationSelect');
  const priceOutput = document.getElementById('priceOutput');
  const pricingBoard = document.getElementById('pricingBoard');

  if (!branchSelect) return; // Khong phai trang booking

  function formatVnd(value) {
    return value.toLocaleString('vi-VN') + ' VND';
  }

  function isWeekend(dateStr) {
    if (!dateStr) return false;
    const date = new Date(dateStr + 'T00:00:00');
    const day = date.getDay();
    return day === 0 || day === 6;
  }

  function getBasePrice(timeValue, isWeekendFlag) {
    if (!timeValue) return 0;
    if (timeValue >= '18:00') return isWeekendFlag ? 130000 : 120000;
    if (timeValue >= '12:00') return isWeekendFlag ? 70000 : 60000;
    return 30000;
  }

  function calculatePrice() {
    const branch = branchSelect.value;
    if (pricingBoard) {
      pricingBoard.style.display = branch ? 'block' : 'none';
    }

    const time = timeSelect.value;
    const duration = parseFloat(durationSelect.value || '0');
    const weekendFlag = isWeekend(dateSelect.value);
    const base = getBasePrice(time, weekendFlag);

    if (!branch || !time || !duration || !roomSelect.value) {
      if (priceOutput) priceOutput.textContent = '0 VND';
      return;
    }

    const multiplier = duration === 1 ? 0.75 : duration;
    const total = Math.round(base * multiplier);
    if (priceOutput) priceOutput.textContent = formatVnd(total);
  }

  [branchSelect, roomSelect, dateSelect, timeSelect, durationSelect].forEach(el => {
    if (el) el.addEventListener('change', calculatePrice);
  });

  calculatePrice();

  // Cancel booking (booking-complete page)
  document.getElementById('cancelBookingBtn')?.addEventListener('click', () => {
    const confirmed = window.confirm('Ban co chac muon huy dat phong khong?');
    if (confirmed) {
      window.location.href = '../home/index.html';
    }
  });

  // Cancel booking (booking-lookup page)
  document.getElementById('cancelLookupBtn')?.addEventListener('click', () => {
    const confirmed = window.confirm('Ban co chac muon huy dat phong khong?');
    if (confirmed) {
      window.location.href = '../home/index.html';
    }
  });
});
