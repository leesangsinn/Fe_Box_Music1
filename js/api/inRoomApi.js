/**
 * In-Room API
 * Xu ly cac thao tac trong phong (menu, order, goi nhan vien).
 */

/**
 * Xac nhan ma check-in
 * @param {string} checkinCode
 */
async function verifyCheckin(checkinCode) {
  return apiFetch(ENDPOINTS.ROOM_CHECKIN, {
    method: 'POST',
    body: JSON.stringify({ code: checkinCode }),
  });
}

/**
 * Lay menu theo phong
 * @param {string} roomId
 */
async function getMenu(roomId) {
  return apiFetch(`${ENDPOINTS.ROOM_MENU}?roomId=${roomId}`);
}

/**
 * Gui order moi
 * @param {Object} orderData - { roomId, items: [{ itemId, quantity }] }
 */
async function createOrder(orderData) {
  return apiFetch(ENDPOINTS.ROOM_ORDER_CREATE, {
    method: 'POST',
    body: JSON.stringify(orderData),
  });
}

/**
 * Lay danh sach order cua phong
 * @param {string} roomId
 */
async function getOrders(roomId) {
  return apiFetch(`${ENDPOINTS.ROOM_ORDER_LIST}?roomId=${roomId}`);
}

/**
 * Goi nhan vien
 * @param {string} roomId
 */
async function callStaff(roomId) {
  return apiFetch(ENDPOINTS.ROOM_CALL_STAFF, {
    method: 'POST',
    body: JSON.stringify({ roomId }),
  });
}
