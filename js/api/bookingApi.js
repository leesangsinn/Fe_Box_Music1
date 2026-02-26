/**
 * Booking API
 * Xu ly cac thao tac lien quan den dat phong truc tuyen.
 */

/**
 * Lay danh sach co so
 */
async function getBranches() {
  return apiFetch(ENDPOINTS.BOOKING_BRANCHES);
}

/**
 * Lay danh sach phong theo co so
 * @param {string} branchId
 */
async function getRoomsByBranch(branchId) {
  return apiFetch(`${ENDPOINTS.BOOKING_ROOMS}?branchId=${branchId}`);
}

/**
 * Lay bang gia theo co so va ngay
 * @param {string} branchId
 * @param {string} date - YYYY-MM-DD
 */
async function getPricing(branchId, date) {
  return apiFetch(`${ENDPOINTS.BOOKING_PRICING}?branchId=${branchId}&date=${date}`);
}

/**
 * Tao booking moi
 * @param {Object} bookingData - { branchId, roomType, date, time, duration, name, phone, email }
 */
async function createBooking(bookingData) {
  return apiFetch(ENDPOINTS.BOOKING_CREATE, {
    method: 'POST',
    body: JSON.stringify(bookingData),
  });
}

/**
 * Tra cuu booking theo so dien thoai
 * @param {string} phone
 */
async function lookupBooking(phone) {
  return apiFetch(`${ENDPOINTS.BOOKING_LOOKUP}?phone=${encodeURIComponent(phone)}`);
}

/**
 * Huy booking
 * @param {string} bookingId
 */
async function cancelBooking(bookingId) {
  return apiFetch(ENDPOINTS.BOOKING_CANCEL, {
    method: 'POST',
    body: JSON.stringify({ bookingId }),
  });
}
