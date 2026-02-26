/**
 * API Configuration
 * Cau hinh chung cho tat ca API calls trong ung dung.
 */

const BASE_URL = 'https://api.macolizbox.vn/v1';

/**
 * Cac endpoint chinh cua he thong
 */
const ENDPOINTS = {
  // Auth
  AUTH_LOGIN: `${BASE_URL}/auth/login`,
  AUTH_FORGOT_PASSWORD: `${BASE_URL}/auth/forgot-password`,

  // Booking
  BOOKING_CREATE: `${BASE_URL}/bookings`,
  BOOKING_LOOKUP: `${BASE_URL}/bookings/lookup`,
  BOOKING_CANCEL: `${BASE_URL}/bookings/cancel`,
  BOOKING_BRANCHES: `${BASE_URL}/branches`,
  BOOKING_ROOMS: `${BASE_URL}/rooms`,
  BOOKING_PRICING: `${BASE_URL}/pricing`,

  // In-Room
  ROOM_CHECKIN: `${BASE_URL}/rooms/checkin`,
  ROOM_MENU: `${BASE_URL}/menu`,
  ROOM_ORDER_CREATE: `${BASE_URL}/orders`,
  ROOM_ORDER_LIST: `${BASE_URL}/orders/list`,
  ROOM_CALL_STAFF: `${BASE_URL}/rooms/call-staff`,
};

/**
 * Default fetch options
 */
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

/**
 * Helper: fetch wrapper voi error handling
 */
async function apiFetch(url, options = {}) {
  try {
    const response = await fetch(url, {
      headers: { ...DEFAULT_HEADERS, ...options.headers },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('[API Error]', error.message);
    throw error;
  }
}
